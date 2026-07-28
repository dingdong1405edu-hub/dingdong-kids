// Nội dung RIÊNG của từng phần (section) trong một bài lộ trình, lưu ở
// RoadmapSection.content (Json). Mỗi kỹ năng có một shape khớp đúng với "player"
// có sẵn ở phần Luyện kỹ năng, nên người học chơi lại bằng chính trình chơi đó.
//
// File này dùng được ở CẢ server (validate khi lưu) lẫn client (editor) — chỉ
// phụ thuộc zod, KHÔNG import @prisma/client (chỉ dùng type SkillKey).
import { z } from "zod";
import type { SkillKey } from "@/lib/roadmap";
import type { VocabWordCard } from "@/types";

// ───────────────────────── Shared ─────────────────────────

// Câu ví dụ gắn với một từ vựng: câu tiếng Anh + nghĩa tiếng Việt (+ audio nếu
// đã sinh sẵn bằng TTS).
const exampleSchema = z.object({
  sentence: z.string().trim().min(1, "Ví dụ thiếu câu tiếng Anh"),
  meaning: z.string().trim().default(""),
  audioUrl: z.string().trim().nullish(),
});
export type WordExample = z.infer<typeof exampleSchema>;

const questionTypeSchema = z.enum([
  "MCQ",
  "TRUE_FALSE",
  "FILL_BLANK",
  "SHORT_ANSWER",
  "MATCHING",
]);

// Một lựa chọn: chữ + (tuỳ chọn) ảnh minh hoạ. Trẻ nhỏ chọn bằng HÌNH nhanh và
// vui hơn chọn bằng chữ, nên mọi lựa chọn nên có ảnh khi có thể.
const optionSchema = z.object({
  text: z.string(),
  imageUrl: z.string().trim().nullish(),
  translation: z.string().optional(),
});

const correctAnswerSchema = z.object({
  index: z.number().int().optional(),
  value: z.boolean().optional(),
  text: z.string().optional(),
  accepted: z.array(z.string()).optional(),
});

// Câu hỏi dùng chung cho Đọc hiểu + Nghe hiểu (khớp ReadingQuestion/ListeningQuestion).
const questionSchema = z.object({
  type: questionTypeSchema,
  prompt: z.string().trim().min(1, "Câu hỏi thiếu đề"),
  promptTranslation: z.string().nullish(),
  /** Ảnh của riêng câu hỏi (vd "Which one is the cat?"). */
  imageUrl: z.string().trim().nullish(),
  /** Audio đọc đề — để bé chưa đọc thạo vẫn làm được. */
  audioUrl: z.string().trim().nullish(),
  options: z.array(optionSchema).optional(),
  correctAnswer: correctAnswerSchema,
  explanation: z.string().nullish(),
  supportingQuote: z.string().nullish(),
  quoteTranslation: z.string().nullish(),
});
export type RoadmapQuestion = z.infer<typeof questionSchema>;

/**
 * Chuyển danh sách câu hỏi ở "định dạng tác giả" (dễ gõ tay / AI sinh: dùng
 * `answer` thay cho `correctAnswer`) → RoadmapQuestion[]. Bỏ qua mục không hợp lệ.
 * Dùng chung cho: ô nhập JSON câu hỏi, editor dán JSON cả phần, và nhập bài hàng loạt.
 */
export function authoringToRoadmapQuestions(arr: unknown): RoadmapQuestion[] {
  if (!Array.isArray(arr)) throw new Error("Danh sách câu hỏi phải là một mảng [].");
  const out: RoadmapQuestion[] = [];
  for (const raw of arr) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    // Đã ở dạng RoadmapQuestion (có correctAnswer) → giữ nguyên (sau khi lọc tối thiểu).
    if (r.correctAnswer && typeof r.correctAnswer === "object") {
      const parsed = questionSchema.safeParse(r);
      if (parsed.success) out.push(parsed.data);
      continue;
    }
    const type = String(r.type ?? "").toUpperCase();
    const prompt = typeof r.prompt === "string" ? r.prompt.trim() : "";
    if (!prompt) continue;
    const base = {
      prompt,
      promptTranslation: typeof r.promptTranslation === "string" ? r.promptTranslation : undefined,
      imageUrl: typeof r.imageUrl === "string" ? r.imageUrl : undefined,
      audioUrl: typeof r.audioUrl === "string" ? r.audioUrl : undefined,
      explanation: typeof r.explanation === "string" ? r.explanation : undefined,
      supportingQuote: typeof r.supportingQuote === "string" ? r.supportingQuote : undefined,
      quoteTranslation: typeof r.quoteTranslation === "string" ? r.quoteTranslation : undefined,
    };
    if (type === "MCQ") {
      // Lựa chọn có thể là chuỗi ("cat") hoặc object ({ text, imageUrl }).
      const rawOpts = Array.isArray(r.options) ? r.options : [];
      const opts = rawOpts.map((o) =>
        o && typeof o === "object"
          ? {
              text: String((o as Record<string, unknown>).text ?? ""),
              imageUrl:
                typeof (o as Record<string, unknown>).imageUrl === "string"
                  ? ((o as Record<string, unknown>).imageUrl as string)
                  : undefined,
            }
          : { text: String(o), imageUrl: undefined },
      );
      if (opts.length < 2) continue;
      const tr = Array.isArray(r.optionsTranslation) ? r.optionsTranslation.map((o) => String(o)) : [];
      const answer = typeof r.answer === "number" ? r.answer : 0;
      out.push({
        ...base,
        type: "MCQ",
        options: opts.map((o, i) => ({
          text: o.text,
          ...(o.imageUrl ? { imageUrl: o.imageUrl } : {}),
          ...(tr[i] ? { translation: tr[i] } : {}),
        })),
        correctAnswer: { index: Math.max(0, Math.min(opts.length - 1, answer)) },
      });
    } else if (type === "TRUE_FALSE") {
      out.push({ ...base, type: "TRUE_FALSE", correctAnswer: { value: r.answer === true || r.answer === "true" } });
    } else if (type === "FILL_BLANK" || type === "SHORT_ANSWER") {
      out.push({
        ...base,
        type: "FILL_BLANK",
        correctAnswer: {
          text: typeof r.answer === "string" ? r.answer : "",
          accepted: Array.isArray(r.accepted) ? r.accepted.map((a) => String(a)) : [],
        },
      });
    }
  }
  return out;
}

// ───────────────────────── VOCAB (Vocabulary) ─────────────────────────

const vocabWordSchema = z.object({
  word: z.string().trim().min(1, "Thiếu từ tiếng Anh"),
  ipa: z.string().trim().default(""),
  meaning: z.string().trim().min(1, "Thiếu nghĩa tiếng Việt"),
  /** Từ loại viết ngắn, dễ hiểu với trẻ: "danh từ", "động từ", "tính từ"… */
  partOfSpeech: z.string().trim().default(""),
  /** Ảnh minh hoạ — với trẻ nhỏ, ẢNH quan trọng hơn cả nghĩa tiếng Việt. */
  imageUrl: z.string().trim().nullish(),
  audioUrl: z.string().trim().nullish(),
  examples: z.array(exampleSchema).default([]),
});
export const vocabContentSchema = z.object({
  title: z.string().trim().optional(),
  words: z.array(vocabWordSchema).min(1, "Cần ít nhất 1 từ vựng"),
});
export type VocabSectionContent = z.infer<typeof vocabContentSchema>;

/**
 * Dựng danh sách thẻ từ vựng (VocabWordCard) từ content phần VOCAB của một bài lộ
 * trình. Id tổng hợp `${sectionId}-w${i}` PHẢI khớp giữa trình chơi (RoadmapVocabPlayer)
 * và trang server (để map đúng trạng thái SRS — `RoadmapWordReview` — theo từng từ).
 * Dùng chung một nguồn ⇒ không lệch thứ tự/khoá.
 */
export function buildRoadmapVocabCards(sectionId: string, content: unknown): VocabWordCard[] {
  const c = (content && typeof content === "object" ? content : {}) as Partial<VocabSectionContent>;
  return (c.words ?? []).map((w, i) => ({
    id: `${sectionId}-w${i}`,
    lessonId: `roadmap:${sectionId}`,
    order: i + 1,
    word: w.word,
    ipa: w.ipa ?? "",
    meaning: w.meaning,
    partOfSpeech: w.partOfSpeech ?? "",
    examples: (w.examples ?? []).map((e) => ({
      sentence: e.sentence,
      meaning: e.meaning ?? "",
      ...(e.audioUrl ? { audioUrl: e.audioUrl } : {}),
    })),
    imageUrl: w.imageUrl ?? null,
    audioUrl: w.audioUrl ?? null,
  }));
}

// ───────────────────────── PHONICS (Ghép vần) ─────────────────────────
// Nền tảng đọc cho trẻ nhỏ: mỗi mục là MỘT âm (chữ cái đơn "s", phụ âm ghép
// "sh", hay nguyên âm ghép "ai") kèm vài từ mẫu có ảnh/emoji để bé liên tưởng.

const phonicsWordSchema = z.object({
  word: z.string().trim().min(1, "Thiếu từ mẫu"),
  meaning: z.string().trim().default(""),
  emoji: z.string().trim().optional(),
  imageUrl: z.string().trim().nullish(),
  audioUrl: z.string().trim().nullish(),
});

const phonicsSoundSchema = z.object({
  /** Chữ cái hoặc cụm chữ cái: "s", "sh", "ai". */
  letters: z.string().trim().min(1, "Thiếu chữ cái / cụm chữ"),
  /** Cách đọc ghi giữa hai gạch chéo: "/s/", "/ʃ/". */
  sound: z.string().trim().default(""),
  /** Mẹo nhớ ngắn cho bé, vd "Rắn kêu sss…". */
  hint: z.string().trim().optional(),
  words: z.array(phonicsWordSchema).min(1, "Mỗi âm cần ít nhất 1 từ mẫu"),
});

export const phonicsContentSchema = z.object({
  title: z.string().trim().optional(),
  sounds: z.array(phonicsSoundSchema).min(1, "Cần ít nhất 1 âm"),
});
export type PhonicsSectionContent = z.infer<typeof phonicsContentSchema>;

// ───────────────────────── READING ─────────────────────────
// level KHÔNG lưu ở đây — lấy từ Course cha khi dựng props cho player.
//
// Một phần Đọc có thể chứa NHIỀU đoạn văn (passages), mỗi đoạn có câu hỏi riêng.
// Học viên làm lần lượt từng đoạn rồi chấm chung. Shape cũ một-đoạn
// ({ passage, questions }) vẫn đọc được nhờ `normalizeReadingContent` gói lại
// thành `passages: [ … ]` trước khi validate (tương thích ngược 100%).

// Một câu trong phần "phân tích từng câu" của đoạn đọc (dịch + giải thích).
const passageAnalysisSentenceSchema = z.object({
  en: z.string().trim().min(1, "Câu phân tích thiếu câu tiếng Anh"),
  vi: z.string().trim().default(""),
  note: z.string().trim().optional(),
});
export type PassageAnalysisSentenceContent = z.infer<typeof passageAnalysisSentenceSchema>;

const readingPassageSchema = z.object({
  passage: z.string().trim().min(1, "Thiếu đoạn văn"),
  /** Bản đọc mẫu (TTS) của cả đoạn — bé vừa nghe vừa dò theo chữ. */
  audioUrl: z.string().trim().nullish(),
  // Dịch toàn bộ đoạn + phân tích từng câu (hiện khi chữa bài) — đều tuỳ chọn.
  passageTranslation: z.string().nullish(),
  passageAnalysis: z.array(passageAnalysisSentenceSchema).nullish(),
  imageUrl: z.string().nullish(),
  /** Tên riêng của đoạn này (vd "My pet dog"). */
  title: z.string().trim().optional(),
  questions: z.array(questionSchema).min(1, "Cần ít nhất 1 câu hỏi"),
});
export type ReadingPassageContent = z.infer<typeof readingPassageSchema>;

/** Gói nội dung Đọc (cũ một-đoạn hoặc mới nhiều-đoạn) về dạng chuẩn `passages[]`. */
export function normalizeReadingContent(raw: unknown): {
  title: string;
  timeLimit: number;
  passages: Array<{
    passage: string;
    audioUrl?: string | null;
    passageTranslation?: string | null;
    passageAnalysis?: PassageAnalysisSentenceContent[] | null;
    imageUrl?: string | null;
    title?: string;
    questions: RoadmapQuestion[];
  }>;
} {
  const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const toPassage = (r: unknown) => {
    const p = r && typeof r === "object" ? (r as Record<string, unknown>) : {};
    return {
      passage: typeof p.passage === "string" ? p.passage : "",
      audioUrl: typeof p.audioUrl === "string" ? p.audioUrl : null,
      passageTranslation: typeof p.passageTranslation === "string" ? p.passageTranslation : null,
      passageAnalysis: Array.isArray(p.passageAnalysis)
        ? (p.passageAnalysis as PassageAnalysisSentenceContent[])
        : null,
      imageUrl: typeof p.imageUrl === "string" ? p.imageUrl : null,
      title: typeof p.title === "string" ? p.title : undefined,
      questions: Array.isArray(p.questions) ? (p.questions as RoadmapQuestion[]) : [],
    };
  };
  let passages: ReturnType<typeof toPassage>[];
  if (Array.isArray(o.passages)) {
    passages = (o.passages as unknown[]).map(toPassage);
  } else if (typeof o.passage === "string" || Array.isArray(o.questions)) {
    passages = [toPassage(o)]; // shape cũ một-đoạn
  } else {
    passages = [];
  }
  return {
    title: typeof o.title === "string" ? o.title : "",
    timeLimit:
      typeof o.timeLimit === "number" ? o.timeLimit : Number(o.timeLimit) || 600,
    passages,
  };
}

export const readingContentSchema = z.preprocess(
  (raw) => normalizeReadingContent(raw),
  z.object({
    title: z.string().trim().min(1, "Thiếu tiêu đề"),
    timeLimit: z.coerce.number().int().min(0).default(600),
    passages: z.array(readingPassageSchema).min(1, "Cần ít nhất 1 đoạn đọc"),
  })
);
export type ReadingSectionContent = z.infer<typeof readingContentSchema>;

// ───────────────────────── LISTENING ─────────────────────────
// Một phần Nghe có thể chứa NHIỀU đoạn nghe (clips), mỗi đoạn có audio + lời
// thoại + câu hỏi riêng. Shape cũ một-đoạn vẫn đọc được nhờ
// `normalizeListeningContent`.

const listeningClipSchema = z.object({
  title: z.string().trim().optional(),
  audioUrl: z.string().trim().default(""),
  transcript: z.string().nullish(),
  transcriptExplanation: z.string().nullish(),
  imageUrl: z.string().nullish(),
  questions: z.array(questionSchema).min(1, "Cần ít nhất 1 câu hỏi"),
});
export type ListeningClipContent = z.infer<typeof listeningClipSchema>;

/** Gói nội dung Nghe (cũ một-đoạn hoặc mới nhiều-đoạn) về dạng chuẩn `clips[]`. */
export function normalizeListeningContent(raw: unknown): {
  title: string;
  timeLimit: number;
  clips: Array<{
    title?: string;
    audioUrl: string;
    transcript?: string | null;
    transcriptExplanation?: string | null;
    imageUrl?: string | null;
    questions: RoadmapQuestion[];
  }>;
} {
  const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const toClip = (r: unknown) => {
    const c = r && typeof r === "object" ? (r as Record<string, unknown>) : {};
    return {
      title: typeof c.title === "string" ? c.title : undefined,
      audioUrl: typeof c.audioUrl === "string" ? c.audioUrl : "",
      transcript: typeof c.transcript === "string" ? c.transcript : null,
      transcriptExplanation:
        typeof c.transcriptExplanation === "string" ? c.transcriptExplanation : null,
      imageUrl: typeof c.imageUrl === "string" ? c.imageUrl : null,
      questions: Array.isArray(c.questions) ? (c.questions as RoadmapQuestion[]) : [],
    };
  };
  let clips: ReturnType<typeof toClip>[];
  if (Array.isArray(o.clips)) {
    clips = (o.clips as unknown[]).map(toClip);
  } else if (
    typeof o.audioUrl === "string" ||
    typeof o.transcript === "string" ||
    Array.isArray(o.questions)
  ) {
    clips = [toClip(o)]; // shape cũ một-đoạn
  } else {
    clips = [];
  }
  return {
    title: typeof o.title === "string" ? o.title : "",
    timeLimit:
      typeof o.timeLimit === "number" ? o.timeLimit : Number(o.timeLimit) || 180,
    clips,
  };
}

export const listeningContentSchema = z.preprocess(
  (raw) => normalizeListeningContent(raw),
  z.object({
    title: z.string().trim().min(1, "Thiếu tiêu đề"),
    timeLimit: z.coerce.number().int().min(0).default(180),
    clips: z.array(listeningClipSchema).min(1, "Cần ít nhất 1 đoạn nghe"),
  })
);
export type ListeningSectionContent = z.infer<typeof listeningContentSchema>;

// ───────────────────────── WRITING ─────────────────────────

export const writingContentSchema = z.object({
  taskType: z.enum(["FREE", "GUIDED", "PICTURE_DESCRIPTION"]).default("FREE"),
  prompt: z.string().trim().min(1, "Thiếu đề bài"),
  /** Gợi ý dàn ý / các từ nên dùng — bé nhìn vào là biết viết gì. */
  outline: z.string().nullish(),
  imageUrl: z.string().nullish(),
  /** Số TỪ tối thiểu bé cần viết (đếm bằng countWords — src/lib/utils.ts). */
  minWords: z.coerce.number().int().min(0).default(20),
  timeLimit: z.coerce.number().int().min(0).default(900),
});
export type WritingSectionContent = z.infer<typeof writingContentSchema>;

// Dạng "sắp xếp từ thành câu" — đúng format bài viết của đề Cambridge cho trẻ.
// Mỗi câu có ngân hàng thẻ từ (words), câu đúng (answer, có dấu câu và viết hoa)
// và bản dịch tiếng Việt. Chấm tự động (giống bài tập sentence_order của Ngữ
// pháp), KHÔNG dùng AI.
const writingReorderSentenceSchema = z.object({
  words: z.array(z.string().trim().min(1)).min(2, "Cần ít nhất 2 thẻ từ"),
  answer: z.string().trim().min(1, "Thiếu câu đúng"),
  translation: z.string().trim().default(""),
  imageUrl: z.string().trim().nullish(),
  audioUrl: z.string().trim().nullish(),
  explanation: z.string().trim().optional(),
});
export type WritingReorderSentence = z.infer<typeof writingReorderSentenceSchema>;

export const writingReorderContentSchema = z.object({
  mode: z.literal("reorder"),
  title: z.string().trim().optional(),
  sentences: z.array(writingReorderSentenceSchema).min(1, "Cần ít nhất 1 câu"),
});
export type WritingReorderSectionContent = z.infer<typeof writingReorderContentSchema>;

/** Phần Viết kiểu "sắp xếp câu" thay vì viết đoạn chấm bằng AI. */
export function isReorderWriting(content: unknown): content is WritingReorderSectionContent {
  return (
    !!content &&
    typeof content === "object" &&
    (content as { mode?: unknown }).mode === "reorder"
  );
}

// ───────────────────────── SPEAKING (Cambridge Speaking) ─────────────────────────
// Phần 1: nghe rồi nhắc lại câu · Phần 2: đọc to đoạn văn ·
// Phần 3: trả lời câu hỏi về bản thân.

const sentenceSchema = z.object({
  text: z.string().trim().min(1),
  /** Audio đọc mẫu để bé nghe trước khi nhắc lại. */
  audioUrl: z.string().trim().nullish(),
  imageUrl: z.string().trim().nullish(),
});
const passageSchema = z.object({
  text: z.string().trim().min(1),
  audioUrl: z.string().trim().nullish(),
  imageUrl: z.string().trim().nullish(),
});
const questionItemSchema = z.object({
  question: z.string().trim().min(1),
  audioUrl: z.string().trim().nullish(),
  imageUrl: z.string().trim().nullish(),
  /** Câu trả lời mẫu để bé tham khảo khi bí. */
  sampleAnswer: z.string().trim().optional(),
});
export const speakingContentSchema = z
  .object({
    part1Sentences: z.array(sentenceSchema).default([]),
    part2Passage: passageSchema.nullish(),
    part3Questions: z.array(questionItemSchema).default([]),
  })
  .refine(
    (c) =>
      (c.part1Sentences?.length ?? 0) > 0 ||
      (c.part3Questions?.length ?? 0) > 0 ||
      !!c.part2Passage?.text,
    "Cần ít nhất một phần nội dung (nhắc lại câu / đọc to đoạn văn / trả lời câu hỏi)"
  );
export type SpeakingSectionContent = z.infer<typeof speakingContentSchema>;

// ───────────────────────── GRAMMAR ─────────────────────────
// Shape v3 phức tạp (Exercise union) được parseGrammarContent() chuẩn hoá khi
// chơi; ở đây chỉ kiểm tra cấu trúc tối thiểu.

export const grammarContentSchema = z
  .object({
    version: z.number().optional(),
    sections: z
      .array(
        z
          .object({
            title: z.string().trim().min(1, "Phần lý thuyết thiếu tiêu đề"),
            explanation: z.string().trim().min(1, "Phần lý thuyết thiếu giải thích"),
          })
          .passthrough()
      )
      .min(1, "Cần ít nhất 1 phần lý thuyết"),
    test: z.unknown().optional(),
  })
  .passthrough();
export type GrammarSectionContent = z.infer<typeof grammarContentSchema>;

// ───────────────────────── Registry + validate ─────────────────────────

const SCHEMA_BY_SKILL: Record<SkillKey, z.ZodTypeAny> = {
  VOCAB: vocabContentSchema,
  GRAMMAR: grammarContentSchema,
  PHONICS: phonicsContentSchema,
  READING: readingContentSchema,
  LISTENING: listeningContentSchema,
  // Viết: chấp nhận cả viết đoạn (chấm AI) lẫn sắp xếp câu (chấm tự động).
  WRITING: z.union([writingReorderContentSchema, writingContentSchema]),
  SPEAKING: speakingContentSchema,
};

export type SectionValidation =
  | { ok: true; data: unknown }
  | { ok: false; error: string };

/** Validate (và chuẩn hoá) content của một section theo kỹ năng. */
export function validateSectionContent(skill: SkillKey, content: unknown): SectionValidation {
  const schema = SCHEMA_BY_SKILL[skill];
  if (!schema) return { ok: false, error: `Kỹ năng không hợp lệ: ${skill}` };
  const parsed = schema.safeParse(content);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Nội dung không hợp lệ" };
  }
  return { ok: true, data: parsed.data };
}

/**
 * Id ổn định cho câu hỏi thứ i (0-based) của Đọc/Nghe trong lộ trình. Player và
 * action chấm điểm PHẢI dùng cùng hàm này để khớp khoá `answers`.
 */
export function roadmapQuestionId(i: number): string {
  return `q${i + 1}`;
}

/** Mẫu content khởi tạo cho editor mỗi kỹ năng. */
export function emptyContentFor(skill: SkillKey): unknown {
  switch (skill) {
    case "VOCAB":
      return { words: [] };
    case "PHONICS":
      return { sounds: [] };
    case "GRAMMAR":
      return { version: 3, sections: [], test: { questions: [] } };
    case "READING":
      return {
        title: "",
        timeLimit: 600,
        passages: [{ passage: "", questions: [] }],
      };
    case "LISTENING":
      return {
        title: "",
        timeLimit: 180,
        clips: [{ audioUrl: "", transcript: "", questions: [] }],
      };
    case "WRITING":
      return { taskType: "FREE", prompt: "", minWords: 20, timeLimit: 900 };
    case "SPEAKING":
      return { part1Sentences: [], part2Passage: { text: "" }, part3Questions: [] };
    default:
      return {};
  }
}
