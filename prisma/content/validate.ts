/**
 * Kiểm định nội dung bài học trước khi seed.
 *
 *   npx tsx prisma/content/validate.ts            # kiểm tất cả các cấp
 *   npx tsx prisma/content/validate.ts starters   # kiểm một cấp
 *
 * Bắt đúng những lỗi khiến bài học "mở lên bị lỗi": câu hỏi sai định dạng,
 * thiếu trường bắt buộc, `supportingQuote` không có thật trong bài đọc, đáp án
 * trỏ ra ngoài danh sách lựa chọn…
 *
 * Thoát mã 1 nếu có bất kỳ lỗi nào → dùng được trong CI.
 */
import { authoringToRoadmapQuestions, validateSectionContent } from "@/lib/roadmap-content";
import type { SkillKey } from "@/lib/roadmap";
import type { EnglishLevel } from "@prisma/client";
import type { ChapterSeed, LessonSeed, LessonQuestion } from "./types";
import { ROADMAP_GRAMMAR } from "./grammar/roadmap";
import { lessonContent, roadmapGrammarContent, type LessonGrammarSeed } from "./grammar/types";
// Đọc từ ĐÚNG nguồn mà seed.ts dùng (gốc + phần bổ sung đã nối) — nếu không,
// validator sẽ kiểm một danh sách còn seed lại ghi một danh sách khác.
import { CHAPTERS_BY_KEY } from "./all";
import { GRAMMAR_UNITS } from "./grammar";
import { VOCAB_UNITS } from "./vocab";
import { EXAMS } from "./exams";
// Cấp "Bé Tập Nói" nằm trong src/lib (nội dung tĩnh, không seed vào DB) nhưng
// vẫn cần một cổng kiểm — nó là cấp DUY NHẤT bé chưa biết chữ nào học được.
import { FIRST_WORDS_UNITS, TOTAL_FIRST_WORDS, REVIEW_UNIT_ID } from "@/lib/first-words";
import { PHONICS_LESSONS } from "@/lib/phonics-lessons";
// Khu "Xem hoạt hình" (Trải nghiệm) — cũng là nội dung tĩnh trong src/lib.
import { CARTOONS, CARTOON_LEVEL_LABEL, lineDuration } from "@/lib/cartoons";

const MODULES: Record<string, ChapterSeed[]> = CHAPTERS_BY_KEY;

/** Số từ tối thiểu / tối đa của đoạn đọc theo cấp (xem hướng dẫn ở types.ts). */
const PASSAGE_RANGE: Record<string, [number, number]> = {
  "pre-starters": [12, 35],
  starters: [25, 60],
  movers: [50, 100],
  flyers: [90, 150],
  ket: [140, 210],
  pet: [190, 280],
};

const countWords = (s: string) => (s.trim().match(/[A-Za-z0-9'’-]+/g) ?? []).length;

/** Khoá thư mục ↔ enum cấp trong DB, để tra ngữ pháp lộ trình. */
const LEVEL_BY_KEY: Record<string, EnglishLevel> = {
  "pre-starters": "PRE_STARTERS",
  starters: "STARTERS",
  movers: "MOVERS",
  flyers: "FLYERS",
  ket: "KET",
  pet: "PET",
};

let errors = 0;
let warnings = 0;
const fail = (where: string, msg: string) => {
  console.error(`  ❌ ${where}: ${msg}`);
  errors++;
};
const warn = (where: string, msg: string) => {
  console.warn(`  ⚠️  ${where}: ${msg}`);
  warnings++;
};

/** Câu hỏi có hợp lệ về mặt nội dung không (ngoài kiểm tra shape của zod)? */
function checkQuestions(where: string, questions: LessonQuestion[], source: string): void {
  if (questions.length === 0) {
    fail(where, "không có câu hỏi nào");
    return;
  }
  const normalizedSource = source.toLowerCase().replace(/\s+/g, " ");
  for (const [i, q] of questions.entries()) {
    const at = `${where} · câu ${i + 1}`;
    if (!q.prompt?.trim()) fail(at, "thiếu `prompt`");
    if (!q.promptTranslation?.trim()) fail(at, "thiếu `promptTranslation` (dịch câu hỏi)");
    if (!q.explanation?.trim()) fail(at, "thiếu `explanation`");

    if (q.type === "MCQ") {
      if (!Array.isArray(q.options) || q.options.length < 2) {
        fail(at, "MCQ cần ít nhất 2 lựa chọn");
      } else {
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
          fail(at, `\`answer\` = ${q.answer} nằm ngoài ${q.options.length} lựa chọn`);
        }
        if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== q.options.length) {
          fail(at, "có lựa chọn trùng nhau");
        }
      }
    }

    // Trích dẫn phải TÌM ĐƯỢC trong bài, nếu không phần "chỉ chỗ đáp án" sẽ
    // không tô sáng được gì khi chữa bài.
    if (q.supportingQuote) {
      const quote = q.supportingQuote.toLowerCase().replace(/\s+/g, " ").trim();
      if (quote && !normalizedSource.includes(quote)) {
        fail(at, `\`supportingQuote\` không có trong bài: "${q.supportingQuote.slice(0, 50)}…"`);
      }
    }
  }
}

/** Bỏ dấu câu + hạ chữ thường để so khớp "cùng bộ từ" cho bài sắp xếp câu. */
const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.,!?;:"]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

/**
 * Kiểm từng bài tập ngữ pháp. Bắt đúng những lỗi khiến minigame KHÔNG CHƠI ĐƯỢC
 * hoặc không bao giờ chấm đúng — thứ mà zod không thấy vì `Exercise` cố tình
 * lỏng (có index signature).
 */
function checkGrammarExercise(where: string, raw: unknown): void {
  const e = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const type = String(e.type ?? "");
  const list = (k: string) => (Array.isArray(e[k]) ? (e[k] as unknown[]).map(String) : []);

  if (type === "fill_blank") {
    const sentence = String(e.sentence ?? "");
    const blank = String(e.blank ?? "");
    const options = list("options");
    // Trình chơi tách câu tại "___"; thiếu nó thì bé không thấy chỗ trống nào.
    if (!sentence.includes("___")) fail(where, "fill_blank thiếu chỗ trống “___” trong `sentence`");
    if (!options.includes(blank)) {
      fail(where, `fill_blank có \`blank\` = "${blank}" KHÔNG nằm trong options → không bao giờ chọn đúng được`);
    }
    if (options.length < 2) fail(where, "fill_blank cần ít nhất 2 lựa chọn");
    if (new Set(options).size !== options.length) fail(where, "fill_blank có lựa chọn trùng nhau");
  } else if (type === "sentence_order" || type === "sentenceOrder") {
    const tiles = list("words");
    const answer = String(e.answer ?? "");
    if (!tiles.length) fail(where, "sentence_order thiếu `words`");
    if (!answer.trim()) fail(where, "sentence_order thiếu `answer`");
    // Thẻ từ phải là hoán vị ĐÚNG của câu trả lời, nếu không bé xếp kiểu gì
    // cũng sai (thừa/thiếu thẻ so với đáp án).
    const a = [...tiles.flatMap(words)].sort();
    const b = [...words(answer)].sort();
    if (a.join(" ") !== b.join(" ")) {
      fail(where, `sentence_order: thẻ từ [${tiles.join(", ")}] không khớp đáp án "${answer}"`);
    }
  } else if (type === "translate") {
    const answer = String(e.answer ?? "");
    const options = list("options");
    const dir = String(e.direction ?? "");
    if (dir !== "vi_to_en" && dir !== "en_to_vi") fail(where, `translate có \`direction\` lạ: "${dir}"`);
    if (!String(e.prompt ?? "").trim()) fail(where, "translate thiếu `prompt`");
    if (!options.includes(answer)) {
      fail(where, `translate có \`answer\` = "${answer}" KHÔNG nằm trong options → không bao giờ chọn đúng được`);
    }
    if (options.length < 2) fail(where, "translate cần ít nhất 2 lựa chọn");
    // Trình chơi dùng chính chuỗi lựa chọn làm React key → trùng là hỏng render.
    if (new Set(options).size !== options.length) fail(where, "translate có lựa chọn TRÙNG NHAU");
  }
}

/** Ngữ pháp lộ trình của một cấp: khớp hàng với bài, và chơi được. */
function checkRoadmapGrammar(levelKey: string, orderedTopics: string[]): void {
  const level = LEVEL_BY_KEY[levelKey];
  const entries: LessonGrammarSeed[] | undefined = level ? ROADMAP_GRAMMAR[level] : undefined;
  if (!entries) {
    warn(`${levelKey} · Ngữ pháp`, "chưa soạn — phần Ngữ pháp của cấp này sẽ hiện “Sắp có”");
    return;
  }

  if (entries.length !== orderedTopics.length) {
    fail(
      `${levelKey} · Ngữ pháp`,
      `có ${entries.length} mục nhưng cấp này có ${orderedTopics.length} bài — hai danh sách PHẢI dài bằng nhau`,
    );
  }

  for (const [i, topic] of orderedTopics.entries()) {
    const g = entries[i];
    const at = `${levelKey} · Ngữ pháp · bài ${i + 1} (${topic})`;
    if (!g) {
      fail(at, "thiếu ngữ pháp cho bài này");
      continue;
    }
    // Chốt chặn quan trọng nhất: lệch hàng thì bé học ngữ pháp của bài khác.
    if (g.topic !== topic) {
      fail(at, `LỆCH HÀNG — mục thứ ${i + 1} khai topic "${g.topic}" nhưng bài thứ ${i + 1} là "${topic}"`);
      continue;
    }
    if (!g.sections?.length) {
      fail(at, "không có phần lý thuyết nào");
      continue;
    }

    for (const [si, s] of g.sections.entries()) {
      const sat = `${at} · phần ${si + 1}`;
      if (!s.id?.trim()) fail(sat, "thiếu `id`");
      if (!s.title?.trim()) fail(sat, "thiếu `title`");
      if (!s.explanation?.trim()) fail(sat, "thiếu `explanation`");
      if (!s.examples?.length) fail(sat, "không có ví dụ nào");
      if (!s.exercises?.length) fail(sat, "không có bài tập nào");

      for (const [xi, x] of (s.exercises ?? []).entries()) {
        checkGrammarExercise(`${sat} · bài tập ${xi + 1}`, x);
      }

      // Luật chung của dự án: mỗi điểm ngữ pháp đủ 8 minigame (2× mỗi loại) —
      // giống hệt cảnh báo `grammarStructureWarning()` hiện cho admin.
      const c = { fill: 0, order: 0, vi2en: 0, en2vi: 0 };
      for (const x of (s.exercises ?? []) as Array<Record<string, unknown>>) {
        const t = String(x.type);
        if (t === "fill_blank") c.fill++;
        else if (t === "sentence_order" || t === "sentenceOrder") c.order++;
        else if (t === "translate") {
          if (x.direction === "vi_to_en") c.vi2en++;
          else if (x.direction === "en_to_vi") c.en2vi++;
        }
      }
      const missing: string[] = [];
      if (c.fill < 2) missing.push("chọn từ ×2");
      if (c.order < 2) missing.push("sắp xếp câu ×2");
      if (c.vi2en < 2) missing.push("dịch Việt→Anh ×2");
      if (c.en2vi < 2) missing.push("dịch Anh→Việt ×2");
      if (missing.length) warn(sat, `chưa đủ 8 minigame — thiếu ${missing.join(", ")}`);
    }

    // Cuối cùng: chạy qua ĐÚNG bộ validate mà player dùng khi mở bài.
    const res = validateSectionContent("GRAMMAR", roadmapGrammarContent(g));
    if (!res.ok) fail(at, `TRƯỢT VALIDATE — ${res.error}`);
  }
}

function checkLesson(levelKey: string, chapterTitle: string, l: LessonSeed): void {
  const where = `${levelKey} · ${chapterTitle} · ${l.topic}`;

  if (!l.topic?.trim()) fail(where, "thiếu `topic`");
  if (!l.topicVi?.trim()) fail(where, "thiếu `topicVi`");
  if (!l.icon?.trim()) fail(where, "thiếu `icon` (emoji)");

  // --- Từ vựng ---
  if (!l.words?.length) fail(where, "không có từ vựng");
  for (const w of l.words ?? []) {
    if (!w.word?.trim()) fail(where, "từ vựng thiếu `word`");
    if (!w.meaning?.trim()) fail(`${where} · ${w.word}`, "thiếu nghĩa tiếng Việt");
    if (!w.emoji?.trim()) fail(`${where} · ${w.word}`, "thiếu `emoji`");
    if (!/^\/.*\/$/.test(w.ipa ?? "")) {
      warn(`${where} · ${w.word}`, `IPA nên nằm trong hai gạch chéo, đang là "${w.ipa}"`);
    }
  }

  // --- Phonics ---
  if (!l.sound?.letters?.trim()) fail(where, "thiếu âm phonics (`sound.letters`)");
  if (!l.sound?.hint?.trim()) fail(where, "thiếu `sound.hint` (mẹo phát âm cho người Việt)");
  if (!l.sound?.words?.length) fail(where, "âm phonics không có từ mẫu");

  // --- Đọc ---
  const passageWords = countWords(l.reading?.passage ?? "");
  const [lo, hi] = PASSAGE_RANGE[levelKey] ?? [0, 9999];
  if (passageWords === 0) fail(where, "thiếu đoạn đọc");
  else if (passageWords < lo || passageWords > hi) {
    warn(where, `đoạn đọc ${passageWords} từ, ngoài khoảng gợi ý ${lo}–${hi} cho cấp này`);
  }
  if (!l.reading?.translation?.trim()) fail(where, "đoạn đọc thiếu bản dịch tiếng Việt");
  checkQuestions(`${where} · Đọc`, l.reading?.questions ?? [], l.reading?.passage ?? "");

  // --- Nghe ---
  if (!l.listening?.transcript?.trim()) fail(where, "thiếu lời thoại bài nghe");
  checkQuestions(`${where} · Nghe`, l.listening?.questions ?? [], l.listening?.transcript ?? "");

  // --- Viết / Nói ---
  if (!l.writingPrompt?.trim()) fail(where, "thiếu đề bài Viết");
  if (!l.writingOutline?.trim()) fail(where, "thiếu dàn ý Viết");
  if (!l.speaking?.sentences?.length) fail(where, "phần Nói thiếu câu nhắc lại");
  if (!l.speaking?.questions?.length) fail(where, "phần Nói thiếu câu hỏi mở");

  // --- Chạy qua ĐÚNG bộ validate mà player dùng ---
  // Đây là bước quan trọng nhất: nếu bước này trượt thì bài học sẽ hiện lỗi.
  const sections: Array<[SkillKey, unknown]> = [
    ["VOCAB", { title: l.topic, words: l.words.map((w) => ({ word: w.word, ipa: w.ipa, meaning: w.meaning, partOfSpeech: "danh từ", examples: [] })) }],
    ["PHONICS", { title: `Âm ${l.sound.letters}`, sounds: [l.sound] }],
    ["READING", {
      title: l.reading.title,
      timeLimit: 600,
      passages: [{ title: l.reading.title, passage: l.reading.passage, passageTranslation: l.reading.translation, questions: authoringToRoadmapQuestions(l.reading.questions) }],
    }],
    ["LISTENING", {
      title: l.listening.title,
      timeLimit: 480,
      clips: [{ title: l.listening.title, audioUrl: "", transcript: l.listening.transcript, questions: authoringToRoadmapQuestions(l.listening.questions) }],
    }],
    ["WRITING", { taskType: "GUIDED", prompt: l.writingPrompt, outline: l.writingOutline, minWords: 12, timeLimit: 900 }],
    ["SPEAKING", { part1Sentences: l.speaking.sentences.map((text) => ({ text })), part3Questions: l.speaking.questions }],
  ];
  for (const [skill, content] of sections) {
    const res = validateSectionContent(skill, content);
    if (!res.ok) fail(`${where} · ${skill}`, `TRƯỢT VALIDATE — ${res.error}`);
  }
}

/**
 * Kho NGỮ PHÁP độc lập (khu "Luyện kỹ năng"). Kiểm hai thứ seed.ts không tự
 * bắt được: slug bài TRÙNG NHAU (bài sau ghi đè bài trước, mất nội dung) và
 * bài tập không chơi được.
 */
function checkGrammarLibrary(): void {
  console.log(`\n▸ Kho ngữ pháp: ${GRAMMAR_UNITS.length} unit`);
  const unitSlugs = new Set<string>();
  const lessonSlugs = new Set<string>();
  let lessons = 0;

  for (const u of GRAMMAR_UNITS) {
    const where = `Ngữ pháp · ${u.slug}`;
    if (!u.slug?.trim()) fail("Ngữ pháp", "unit thiếu `slug`");
    if (unitSlugs.has(u.slug)) fail(where, "TRÙNG `slug` unit với unit khác");
    unitSlugs.add(u.slug);
    if (!u.title?.trim()) fail(where, "thiếu `title`");
    if (!u.theme?.trim()) fail(where, "thiếu `theme`");
    if (!u.lessons?.length) fail(where, "unit không có bài nào");

    for (const l of u.lessons ?? []) {
      const at = `${where} · ${l.slug}`;
      lessons++;
      // Id bài là `seed-grammar-lesson-<slug>` → slug phải duy nhất TOÀN CỤC.
      if (lessonSlugs.has(l.slug)) fail(at, "TRÙNG `slug` bài với bài khác — bài sau sẽ GHI ĐÈ bài trước");
      lessonSlugs.add(l.slug);
      if (!l.title?.trim()) fail(at, "thiếu `title`");
      if (!l.sections?.length) fail(at, "không có phần lý thuyết nào");

      for (const [si, s] of (l.sections ?? []).entries()) {
        const sat = `${at} · phần ${si + 1}`;
        if (!s.id?.trim()) fail(sat, "thiếu `id`");
        if (!s.title?.trim()) fail(sat, "thiếu `title`");
        if (!s.explanation?.trim()) fail(sat, "thiếu `explanation`");
        if (!s.examples?.length) fail(sat, "không có ví dụ nào");
        if (!s.exercises?.length) fail(sat, "không có bài tập nào");
        for (const [xi, x] of (s.exercises ?? []).entries()) {
          checkGrammarExercise(`${sat} · bài tập ${xi + 1}`, x);
        }
      }
      for (const [qi, q] of (l.test?.questions ?? []).entries()) {
        checkGrammarExercise(`${at} · kiểm tra · câu ${qi + 1}`, q);
      }
      // Chạy qua ĐÚNG bộ validate mà player dùng khi mở bài.
      const res = validateSectionContent("GRAMMAR", lessonContent(l));
      if (!res.ok) fail(at, `TRƯỢT VALIDATE — ${res.error}`);
    }
  }
  console.log(`  ${lessons} bài ngữ pháp.`);
}

/** Kho TỪ VỰNG độc lập. Slug unit và id từ phải duy nhất, mỗi từ phải có emoji. */
function checkVocabLibrary(): void {
  const totalWords = VOCAB_UNITS.reduce((n, u) => n + u.words.length, 0);
  console.log(`\n▸ Kho từ vựng: ${VOCAB_UNITS.length} unit · ${totalWords} từ`);
  const slugs = new Set<string>();

  for (const u of VOCAB_UNITS) {
    const where = `Từ vựng · ${u.slug}`;
    if (!u.slug?.trim()) fail("Từ vựng", "unit thiếu `slug`");
    if (slugs.has(u.slug)) fail(where, "TRÙNG `slug` với unit khác — unit sau sẽ GHI ĐÈ unit trước");
    slugs.add(u.slug);
    if (!u.title?.trim()) fail(where, "thiếu `title`");
    if (!u.theme?.trim()) fail(where, "thiếu `theme`");
    if (!u.lessonTitle?.trim()) fail(where, "thiếu `lessonTitle`");
    if (!u.words?.length) fail(where, "unit không có từ nào");

    // Id từ là `seed-word-<slug>-<word>` → trùng `word` trong cùng unit là mất từ.
    const seen = new Set<string>();
    for (const word of u.words ?? []) {
      const at = `${where} · ${word.word}`;
      if (!word.word?.trim()) fail(where, "từ thiếu `word`");
      if (seen.has(word.word.toLowerCase())) fail(at, "TRÙNG từ trong cùng unit");
      seen.add(word.word.toLowerCase());
      if (!word.meaning?.trim()) fail(at, "thiếu nghĩa tiếng Việt");
      if (!word.emoji?.trim()) fail(at, "thiếu `emoji`");
      if (!word.partOfSpeech?.trim()) fail(at, "thiếu `partOfSpeech`");
      if (!/^\/.*\/$/.test(word.ipa ?? "")) {
        warn(at, `IPA nên nằm trong hai gạch chéo, đang là "${word.ipa}"`);
      }
      if (!word.examples?.length) fail(at, "không có câu ví dụ nào");
      for (const e of word.examples ?? []) {
        if (!e.sentence?.trim()) fail(at, "câu ví dụ thiếu tiếng Anh");
        if (!e.meaning?.trim()) fail(at, "câu ví dụ thiếu bản dịch");
      }
    }
  }
}

/**
 * Cấp "Bé Tập Nói". Bắt đúng những lỗi phá vỡ luật của cấp này (CLAUDE.md §6.1):
 * bé chưa biết chữ nên hình phải rõ, và từ phải ngắn để máy nghe được giọng trẻ.
 */
function checkFirstWords(): void {
  const core = FIRST_WORDS_UNITS.filter((u) => !u.bonus);
  const bonus = FIRST_WORDS_UNITS.filter((u) => u.bonus);
  console.log(
    `\n▸ Bé Tập Nói: ${FIRST_WORDS_UNITS.length} chủ đề (${core.length} chính · ${bonus.length} thêm) · ${TOTAL_FIRST_WORDS} từ`,
  );

  const unitIds = new Set<string>();
  // Một từ chỉ được thuộc ĐÚNG MỘT chủ đề: `locateFirstWord()` trả về chỗ đầu
  // tiên tìm thấy, nên từ trùng sẽ luôn ghi sao về chủ đề trước và chủ đề sau
  // không bao giờ đủ sao — bé làm mãi không xong.
  const wordOwner = new Map<string, string>();

  for (const u of FIRST_WORDS_UNITS) {
    const where = `Bé Tập Nói · ${u.id}`;
    if (!u.id?.trim()) fail("Bé Tập Nói", "chủ đề thiếu `id`");
    if (u.id === REVIEW_UNIT_ID) fail(where, `\`id\` trùng với bài ôn tập ("${REVIEW_UNIT_ID}")`);
    if (unitIds.has(u.id)) fail(where, "TRÙNG `id` với chủ đề khác");
    unitIds.add(u.id);
    if (!u.title?.trim()) fail(where, "thiếu `title` (tiếng Việt)");
    if (!u.titleEn?.trim()) fail(where, "thiếu `titleEn`");
    if (!u.emoji?.trim()) fail(where, "thiếu `emoji` chủ đề");
    // Gradient phải là class literal, nếu không Tailwind JIT không quét ra và
    // ô chủ đề hiện ra trắng trơn.
    if (!/^from-\S+\s+via-\S+\s+to-\S+$/.test(u.cover ?? "")) {
      fail(where, `\`cover\` phải có dạng "from-… via-… to-…", đang là "${u.cover}"`);
    }
    if (!u.words?.length) fail(where, "chủ đề không có từ nào");
    if (u.words && u.words.length !== 8) {
      warn(where, `có ${u.words.length} từ — các chủ đề khác đều 8 từ, lệch sẽ khó so sánh tiến độ`);
    }

    for (const word of u.words ?? []) {
      const at = `${where} · ${word.word}`;
      if (!word.word?.trim()) fail(where, "từ thiếu `word`");
      if (!/^[a-z][a-z' ]*$/.test(word.word ?? "")) {
        fail(at, "`word` phải viết THƯỜNG, chỉ chữ cái (bé nghe rồi nhắc lại, không đọc chữ)");
      }
      const key = word.word.trim().toLowerCase();
      const owner = wordOwner.get(key);
      if (owner) fail(at, `TRÙNG từ với chủ đề "${owner}" — sao sẽ luôn ghi về chủ đề đó`);
      else wordOwner.set(key, u.id);
      if (!word.vi?.trim()) fail(at, "thiếu nghĩa tiếng Việt (cho bố mẹ đọc)");
      if (!word.emoji?.trim()) fail(at, "thiếu `emoji` — bé chưa đọc chữ, đây là kênh nghĩa DUY NHẤT");
      // Từ dài làm nhận dạng giọng trẻ em sai nhiều hơn → bé bị chấm oan.
      if (word.word.length > 9) warn(at, `từ hơi dài (${word.word.length} ký tự) — bé 3–5 tuổi khó nói tròn`);
    }

    // Emoji trùng trong cùng chủ đề = hai ô nhìn y hệt nhau, bé không phân biệt được.
    const emojis = (u.words ?? []).map((x) => x.emoji);
    const dupEmoji = emojis.filter((e, i) => emojis.indexOf(e) !== i);
    if (dupEmoji.length) fail(where, `emoji TRÙNG trong cùng chủ đề: ${[...new Set(dupEmoji)].join(" ")}`);
  }

  if (core.length === 0) fail("Bé Tập Nói", "không còn chủ đề CHÍNH nào — mốc tốt nghiệp sẽ không tính được");
}

/**
 * Khu "Xem hoạt hình". Bắt đúng những lỗi khiến phim "mở lên bị hụt":
 * mốc thời gian sai thứ tự, câu chồng lên nhau, câu dài quá sức nhớ của bé.
 *
 * Mốc thời gian là thứ DUY NHẤT quyết định bài chạy đúng hay hỏng, mà lại
 * không kiểm được bằng typecheck — nên cổng này là bắt buộc trước khi mở phim.
 */
function checkCartoons(): void {
  const open = CARTOONS.filter((c) => c.published);
  console.log(
    `\n▸ Xem hoạt hình (kho trong code): ${CARTOONS.length} phim (${open.length} đã mở cho bé)`,
  );
  // Kho trong code rỗng là chuyện BÌNH THƯỜNG: đường gắn phim thường dùng là
  // /admin/hoat-hinh → DB, mà cổng này không đọc DB được (chạy ngoài Next).
  if (CARTOONS.length === 0) {
    console.log("  (phim gắn từ /admin/hoat-hinh nằm trong DB, không kiểm ở đây)");
    return;
  }
  if (open.length === 0) {
    warn("Xem hoạt hình", "chưa phim nào trong code `published: true`");
  }

  const ids = new Set<string>();
  const videos = new Map<string, string>();

  for (const c of CARTOONS) {
    const where = `Hoạt hình · ${c.id}`;
    if (!c.id?.trim()) fail("Xem hoạt hình", "phim thiếu `id`");
    if (ids.has(c.id)) fail(where, "TRÙNG `id` với phim khác — phim sau sẽ ghi đè tiến độ phim trước");
    ids.add(c.id);
    // Cùng một video xuất hiện hai lần = bé xem lại đúng nội dung cũ mà tưởng
    // phim mới; tiến độ cũng chia đôi vô nghĩa.
    const owner = videos.get(c.youtubeId);
    if (owner) fail(where, `dùng chung \`youtubeId\` với phim "${owner}"`);
    else videos.set(c.youtubeId, c.id);

    if (!/^[\w-]{11}$/.test(c.youtubeId ?? "")) {
      fail(where, `\`youtubeId\` phải là mã 11 ký tự của YouTube, đang là "${c.youtubeId}"`);
    }
    if (!c.title?.trim()) fail(where, "thiếu `title` (tiếng Việt)");
    if (!c.titleEn?.trim()) fail(where, "thiếu `titleEn`");
    if (!c.emoji?.trim()) fail(where, "thiếu `emoji`");
    if (!c.channel?.trim()) fail(where, "thiếu `channel` — phải ghi rõ kênh gốc");
    if (!CARTOON_LEVEL_LABEL[c.level]) {
      fail(where, `\`level\` không hợp lệ: "${c.level}"`);
    }
    // Gradient phải là class literal, nếu không Tailwind JIT không quét ra và
    // thẻ phim hiện ra trắng trơn khi ảnh bìa YouTube chưa về.
    if (!/^from-\S+\s+via-\S+\s+to-\S+$/.test(c.cover ?? "")) {
      fail(where, `\`cover\` phải có dạng "from-… via-… to-…", đang là "${c.cover}"`);
    }

    if (!c.lines?.length) {
      fail(where, "phim không có câu nào — bé mở ra không có gì để nói");
      continue;
    }
    if (c.lines.length > 40) {
      warn(where, `${c.lines.length} câu là quá dài cho một buổi — 10–20 câu là vừa`);
    }

    let prevEnd = -Infinity;
    for (const [i, l] of c.lines.entries()) {
      const at = `${where} · câu ${i + 1}`;
      if (!Number.isFinite(l.start) || l.start < 0) fail(at, "`start` không hợp lệ");
      if (!Number.isFinite(l.end)) fail(at, "`end` không hợp lệ");
      if (l.end <= l.start) fail(at, `\`end\` (${l.end}) phải LỚN HƠN \`start\` (${l.start})`);
      // Câu phải xếp tăng dần và không chồng nhau: trình chơi tua thẳng tới
      // `start` rồi dừng ở `end`, câu chồng nhau là bé nghe lại nửa câu trước.
      if (l.start < prevEnd) {
        fail(at, `bắt đầu ở ${l.start}s, CHỒNG lên câu trước (kết thúc ${prevEnd}s)`);
      }
      prevEnd = l.end;

      const dur = lineDuration(l);
      if (dur > 12) {
        fail(at, `dài ${dur.toFixed(1)}s — bé không nhớ nổi cả câu để nhắc lại (trần 12s)`);
      } else if (dur > 6) {
        warn(at, `hơi dài (${dur.toFixed(1)}s) — câu 2–5 giây là dễ nói theo nhất`);
      }
      if (dur < 0.6) warn(at, `rất ngắn (${dur.toFixed(1)}s) — kiểm lại mốc có bị hụt không`);

      if (!l.text?.trim()) fail(at, "thiếu `text` — không có câu thì không chấm được");
      if (!l.vi?.trim()) fail(at, "thiếu nghĩa tiếng Việt (`vi`)");
      // Câu quá dài thì máy nghe giọng trẻ em sai nhiều hơn → bé bị chấm oan.
      const words = (l.text ?? "").trim().split(/\s+/).filter(Boolean).length;
      if (words > 12) warn(at, `${words} từ — dài quá sức nhắc lại của bé, nên tách câu`);
    }
  }
}

/**
 * Đề thi thử. Bắt đúng những lỗi khiến đề "mở lên không làm được": tiểu phần
 * không có gì để làm, phần nghe không có lời thoại, trích dẫn không có thật.
 */
function checkExams(): void {
  console.log(`\n▸ Đề thi thử: ${EXAMS.length} đề`);
  const slugs = new Set<string>();
  let questions = 0;

  for (const e of EXAMS) {
    const where = `Thi thử · ${e.slug}`;
    if (!e.slug?.trim()) fail("Thi thử", "đề thiếu `slug`");
    if (slugs.has(e.slug)) fail(where, "TRÙNG `slug` với đề khác — đề sau sẽ GHI ĐÈ đề trước");
    slugs.add(e.slug);
    if (!e.title?.trim()) fail(where, "thiếu `title`");
    if (!e.description?.trim()) fail(where, "thiếu `description`");
    if (!e.totalTime || e.totalTime < 60) fail(where, "`totalTime` (giây) phải là số dương hợp lý");
    if (!e.sections?.length) fail(where, "đề không có phần nào");

    for (const [si, s] of (e.sections ?? []).entries()) {
      const sat = `${where} · phần ${si + 1} (${s.skill})`;
      // Trình chạy đề KHÔNG có bộ ghi âm — section nói sẽ hiện ra sai hoàn toàn.
      if ((s.skill as string) === "SPEAKING") {
        fail(sat, "đề seed KHÔNG được có phần SPEAKING — trình chạy đề chưa có bộ ghi âm");
      }
      if (!s.parts?.length) fail(sat, "phần không có tiểu phần nào");

      for (const [pi, p] of (s.parts ?? []).entries()) {
        const pat = `${sat} · Part ${pi + 1}`;
        const isEssay = !!p.writingPrompt?.trim();
        const qs = p.questions ?? [];

        // Tiểu phần phải làm được: hoặc là ô viết, hoặc có câu hỏi.
        if (!isEssay && qs.length === 0) {
          fail(pat, "không có câu hỏi và cũng không phải ô viết — mở ra không làm được gì");
        }
        if (isEssay && qs.length > 0) {
          fail(pat, "vừa có `writingPrompt` vừa có câu hỏi — player coi tiểu phần này là ô viết và BỎ QUA hết câu hỏi");
        }
        if (isEssay && (!p.writingMinWords || p.writingMinWords < 5)) {
          warn(pat, "ô viết nên đặt `writingMinWords` (đếm TỪ, không đếm ký tự)");
        }
        if (s.skill === "LISTENING" && !p.transcript?.trim()) {
          fail(pat, "phần nghe thiếu `transcript` — không có MP3 thì đây là thứ DUY NHẤT phát ra tiếng");
        }
        if (s.skill === "READING" && !isEssay && !p.passage?.trim()) {
          warn(pat, "phần đọc không có `passage` — câu hỏi sẽ đứng trơ không có ngữ cảnh");
        }

        if (qs.length) {
          checkQuestions(pat, qs, `${p.passage ?? ""}\n${p.transcript ?? ""}`);
          questions += qs.length;
        }
      }
    }
  }
  console.log(`  ${questions} câu hỏi.`);
}

/**
 * Ghép vần (Phonics). Nội dung tĩnh trong `src/lib/phonics-lessons.ts`, dựng từ
 * `phonics-data.ts` bằng bộ dựng — nên lỗi hay gặp KHÔNG phải sai kiểu mà là
 * "đáp án không nằm trong lựa chọn" hoặc "lựa chọn trùng nhau", tức là thẻ bài
 * không bao giờ chơi đúng được.
 */
function checkPhonics(): void {
  console.log(`\n▸ Ghép vần: ${PHONICS_LESSONS.length} bài`);
  const ids = new Set<string>();
  let cards = 0;

  /** Đáp án phải nằm trong lựa chọn và lựa chọn không được trùng. */
  const checkChoice = (at: string, answer: string, options: string[]): void => {
    if (!options.includes(answer)) {
      fail(at, `đáp án "${answer}" KHÔNG nằm trong lựa chọn → không bao giờ chọn đúng được`);
    }
    if (options.length < 2) fail(at, "cần ít nhất 2 lựa chọn");
    if (new Set(options).size !== options.length) fail(at, "có lựa chọn TRÙNG NHAU");
  };

  for (const l of PHONICS_LESSONS) {
    const where = `Ghép vần · ${l.id}`;
    if (!l.id?.trim()) fail("Ghép vần", "bài thiếu `id`");
    if (ids.has(l.id)) fail(where, "TRÙNG `id` với bài khác");
    ids.add(l.id);
    if (!l.title?.trim()) fail(where, "thiếu `title`");
    if (!l.emoji?.trim()) fail(where, "thiếu `emoji`");
    if (!l.cards?.length) fail(where, "bài không có thẻ nào");

    // Bài toàn thẻ "teach" thì trẻ chỉ ngồi xem, không có gì để làm và không ghi
    // được tiến độ — PhonicsProgress tính theo thẻ CÓ chấm điểm.
    const scored = (l.cards ?? []).filter((c) => c.kind !== "teach").length;
    if (scored === 0) fail(where, "không có thẻ nào tính điểm — bé chỉ xem, không ghi được tiến độ");

    for (const [i, c] of (l.cards ?? []).entries()) {
      const at = `${where} · thẻ ${i + 1} (${c.kind})`;
      cards++;
      if (c.kind === "teach") {
        if (!c.big?.trim()) fail(at, "thiếu chữ hiển thị `big`");
        if (!c.sound?.trim()) fail(at, "thiếu cách đọc `sound`");
        if (!c.emoji?.trim()) fail(at, "thiếu `emoji`");
        // Mẹo phát âm là thứ DUY NHẤT nói cho trẻ Việt biết mình hay đọc sai chỗ nào.
        if (!c.hint?.trim()) fail(at, "thiếu `hint` (mẹo phát âm cho người Việt)");
      } else if (c.kind === "listen") {
        if (!c.word?.trim()) fail(at, "thiếu `word` (từ được đọc lên)");
        if (!c.emoji?.trim()) fail(at, "thiếu `emoji`");
        checkChoice(at, c.answer, c.options);
      } else if (c.kind === "blend") {
        if (!c.parts?.length) fail(at, "thiếu `parts` (các âm để ghép)");
        // Ghép các âm lại phải ra đúng từ, nếu không bé ghép kiểu gì cũng sai.
        if (c.parts.join("") !== c.answer) {
          fail(at, `ghép [${c.parts.join("-")}] ra "${c.parts.join("")}" chứ không phải "${c.answer}"`);
        }
        checkChoice(at, c.answer, c.options);
      } else if (c.kind === "rhyme") {
        if (!c.base?.word?.trim()) fail(at, "thiếu từ gốc `base`");
        checkChoice(at, c.answer, c.options.map((o) => o.word));
        if (c.options.some((o) => !o.emoji?.trim())) fail(at, "có lựa chọn thiếu emoji");
        if (c.answer === c.base.word) fail(at, "đáp án TRÙNG từ gốc");
      } else if (c.kind === "discriminate") {
        if (!c.a?.word?.trim() || !c.b?.word?.trim()) fail(at, "thiếu một trong hai từ so sánh");
        // Hai âm giống hệt nhau thì không có gì để phân biệt.
        if (c.a?.sound === c.b?.sound) fail(at, `hai âm so sánh giống nhau ("${c.a?.sound}")`);
        if (!c.note?.trim()) fail(at, "thiếu `note` giải thích khác nhau chỗ nào");
      }
    }
  }
  console.log(`  ${cards} thẻ.`);
}

/**
 * Các kho KHÔNG chia theo cấp. Gọi riêng được để soạn nội dung xong kiểm ngay
 * đúng phần mình vừa viết, không bị nhiễu bởi phần người khác đang sửa dở:
 *   npm run content:check exams
 */
const LIBRARIES: Record<string, () => void> = {
  grammar: checkGrammarLibrary,
  vocab: checkVocabLibrary,
  "first-words": checkFirstWords,
  phonics: checkPhonics,
  cartoons: checkCartoons,
  exams: checkExams,
};

function finish(): never {
  console.log(`\n${errors === 0 ? "✅" : "❌"} Kết quả: ${errors} lỗi · ${warnings} cảnh báo`);
  process.exit(errors > 0 ? 1 : 0);
}

function main(): void {
  const only = process.argv[2];

  // Kiểm riêng MỘT kho.
  const library = only ? LIBRARIES[only] : undefined;
  if (library) {
    library();
    finish();
  }

  const entries = Object.entries(MODULES).filter(([k]) => !only || k === only);
  if (entries.length === 0) {
    console.error(
      `Không có mục nào tên "${only}".\n` +
        `  Cấp:  ${Object.keys(MODULES).join(", ")}\n` +
        `  Kho:  ${Object.keys(LIBRARIES).join(", ")}\n` +
        `  (bỏ trống = kiểm tất cả)`,
    );
    process.exit(1);
  }

  for (const [levelKey, chapters] of entries) {
    const lessons = chapters.reduce((n, c) => n + c.lessons.length, 0);
    console.log(`\n▸ ${levelKey}: ${chapters.length} chương · ${lessons} bài`);
    if (chapters.length === 0) {
      warn(levelKey, "CHƯA CÓ NỘI DUNG");
      continue;
    }
    const topics = new Set<string>();
    // Thứ tự bài DỒN QUA CÁC CHƯƠNG — đúng thứ tự `order` mà seed.ts sinh ra,
    // cũng là thứ tự mà ngữ pháp lộ trình phải khớp theo.
    const orderedTopics: string[] = [];
    for (const ch of chapters) {
      if (!ch.title?.trim()) fail(levelKey, "chương thiếu tiêu đề");
      if (!ch.lessons?.length) fail(`${levelKey} · ${ch.title}`, "chương không có bài nào");
      for (const l of ch.lessons) {
        // Trùng `topic` sẽ làm trùng id đề luyện độc lập (`seed-reading-<level>-<topic>`)
        // → bài sau ghi đè bài trước, mất nội dung.
        if (topics.has(l.topic)) fail(`${levelKey} · ${l.topic}`, "TRÙNG `topic` với bài khác cùng cấp");
        topics.add(l.topic);
        orderedTopics.push(l.topic);
        checkLesson(levelKey, ch.title, l);
      }
    }
    checkRoadmapGrammar(levelKey, orderedTopics);
  }

  // Kho độc lập không chia theo cấp nên chỉ kiểm khi chạy toàn bộ.
  if (!only) for (const check of Object.values(LIBRARIES)) check();

  finish();
}

main();
