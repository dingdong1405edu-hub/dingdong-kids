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
import type { ChapterSeed, LessonSeed, LessonQuestion } from "./types";

import { CHAPTERS as PRE_STARTERS } from "./pre-starters";
import { CHAPTERS as STARTERS } from "./starters";
import { CHAPTERS as MOVERS } from "./movers";
import { CHAPTERS as FLYERS } from "./flyers";
import { CHAPTERS as KET } from "./ket";
import { CHAPTERS as PET } from "./pet";

const MODULES: Record<string, ChapterSeed[]> = {
  "pre-starters": PRE_STARTERS,
  starters: STARTERS,
  movers: MOVERS,
  flyers: FLYERS,
  ket: KET,
  pet: PET,
};

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

function main(): void {
  const only = process.argv[2];
  const entries = Object.entries(MODULES).filter(([k]) => !only || k === only);
  if (entries.length === 0) {
    console.error(`Không có cấp nào tên "${only}". Hợp lệ: ${Object.keys(MODULES).join(", ")}`);
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
    for (const ch of chapters) {
      if (!ch.title?.trim()) fail(levelKey, "chương thiếu tiêu đề");
      if (!ch.lessons?.length) fail(`${levelKey} · ${ch.title}`, "chương không có bài nào");
      for (const l of ch.lessons) {
        // Trùng `topic` sẽ làm trùng id đề luyện độc lập (`seed-reading-<level>-<topic>`)
        // → bài sau ghi đè bài trước, mất nội dung.
        if (topics.has(l.topic)) fail(`${levelKey} · ${l.topic}`, "TRÙNG `topic` với bài khác cùng cấp");
        topics.add(l.topic);
        checkLesson(levelKey, ch.title, l);
      }
    }
  }

  console.log(
    `\n${errors === 0 ? "✅" : "❌"} Kết quả: ${errors} lỗi · ${warnings} cảnh báo`,
  );
  if (errors > 0) process.exit(1);
}

main();
