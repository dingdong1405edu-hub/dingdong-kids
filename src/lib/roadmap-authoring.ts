// Chuyển JSON do admin DÁN (định dạng "tác giả" dễ gõ / AI sinh) → nội dung
// chuẩn của từng phần kỹ năng trong lộ trình.
//
// Dùng được ở CẢ client (editor "dán JSON cả phần") lẫn server (nhập bài hàng
// loạt): chỉ phụ thuộc zod + roadmap-content, KHÔNG import prisma.
//
// Ở đây KHÔNG tự sinh phiên âm: IPA do người soạn nhập (hoặc bỏ trống), còn
// audio thì sinh bằng TTS ở server (src/lib/tts.ts) chứ không sinh ở bước này.
import {
  authoringToRoadmapQuestions,
  normalizeReadingContent,
  normalizeListeningContent,
  type RoadmapQuestion,
} from "@/lib/roadmap-content";

/** Chuỗi đã cắt khoảng trắng, hoặc undefined nếu rỗng. */
function trimmed(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

// ───────────────────────── READING ─────────────────────────

/**
 * Nhận: object đầy đủ `{ title?, timeLimit?, passages:[…] }`, shape cũ một-đoạn
 * `{ passage, questions }`, hoặc một MẢNG đoạn `[{ passage, questions }]`.
 * Trả về content Đọc dạng chuẩn `passages[]` (câu hỏi đã đổi `answer→correctAnswer`).
 */
export function buildReadingContent(input: unknown, fallbackTitle = ""): unknown {
  let obj: Record<string, unknown>;
  if (Array.isArray(input)) {
    // Chấp nhận cả MẢNG "bài đọc đầy đủ" ([{ title, passage, questions }, …])
    // — đúng định dạng JSON nhập hàng loạt ở /admin/reading. Mỗi phần tử thành 1 đoạn;
    // tiêu đề/thời gian của PHẦN lấy từ phần tử đầu (title riêng mỗi đoạn vẫn giữ).
    const first = (input.find((x) => x && typeof x === "object") ?? {}) as Record<string, unknown>;
    obj = { passages: input, title: first.title, timeLimit: first.timeLimit };
  } else if (input && typeof input === "object") obj = { ...(input as Record<string, unknown>) };
  else throw new Error("Nội dung đọc phải là object hoặc mảng đoạn.");

  const norm = normalizeReadingContent(obj);
  if (norm.passages.length === 0) throw new Error("Thiếu đoạn đọc (passages).");

  const passages = norm.passages.map((p) => {
    const questions: RoadmapQuestion[] = authoringToRoadmapQuestions(p.questions);
    const analysis = Array.isArray(p.passageAnalysis)
      ? p.passageAnalysis
          .map((s) => {
            const x = (s ?? {}) as Record<string, unknown>;
            const en = typeof x.en === "string" ? x.en.trim() : "";
            if (!en) return null;
            return {
              en,
              vi: typeof x.vi === "string" ? x.vi.trim() : "",
              ...(typeof x.note === "string" && x.note.trim() ? { note: x.note.trim() } : {}),
            };
          })
          .filter((s): s is { en: string; vi: string; note?: string } => s !== null)
      : [];
    return {
      passage: p.passage,
      ...(p.audioUrl ? { audioUrl: p.audioUrl } : {}),
      ...(p.imageUrl ? { imageUrl: p.imageUrl } : {}),
      ...(p.title ? { title: p.title } : {}),
      ...(p.passageTranslation ? { passageTranslation: p.passageTranslation } : {}),
      ...(analysis.length ? { passageAnalysis: analysis } : {}),
      questions,
    };
  });

  return {
    title: norm.title || fallbackTitle,
    timeLimit: norm.timeLimit,
    passages,
  };
}

// ───────────────────────── LISTENING ─────────────────────────

/**
 * Nhận: object `{ title?, timeLimit?, clips:[…] }`, shape cũ một-đoạn
 * `{ audioUrl, transcript, questions }`, hoặc MẢNG đoạn nghe. Trả về content Nghe
 * dạng chuẩn `clips[]` (câu hỏi đã chuẩn hoá).
 */
export function buildListeningContent(input: unknown, fallbackTitle = ""): unknown {
  let obj: Record<string, unknown>;
  if (Array.isArray(input)) {
    // Chấp nhận cả MẢNG "bài nghe đầy đủ" ([{ title, audioUrl, transcript, questions }, …]).
    // Mỗi phần tử thành 1 đoạn nghe; tiêu đề/thời gian của PHẦN lấy từ phần tử đầu.
    const first = (input.find((x) => x && typeof x === "object") ?? {}) as Record<string, unknown>;
    obj = { clips: input, title: first.title, timeLimit: first.timeLimit };
  } else if (input && typeof input === "object") obj = { ...(input as Record<string, unknown>) };
  else throw new Error("Nội dung nghe phải là object hoặc mảng đoạn.");

  const norm = normalizeListeningContent(obj);
  if (norm.clips.length === 0) throw new Error("Thiếu đoạn nghe (clips).");

  const clips = norm.clips.map((c) => ({
    ...(c.title ? { title: c.title } : {}),
    audioUrl: c.audioUrl ?? "",
    ...(c.transcript ? { transcript: c.transcript } : {}),
    ...(c.transcriptExplanation ? { transcriptExplanation: c.transcriptExplanation } : {}),
    ...(c.imageUrl ? { imageUrl: c.imageUrl } : {}),
    questions: authoringToRoadmapQuestions(c.questions),
  }));

  return {
    title: norm.title || fallbackTitle,
    timeLimit: norm.timeLimit,
    clips,
  };
}

// ───────────────────────── SPEAKING (Cambridge Speaking) ─────────────────────────

/** Chuẩn hoá content Nói: giữ audio/ảnh đã có, bỏ mục trống. */
export function buildSpeakingContent(input: unknown): unknown {
  const o = input && typeof input === "object" ? (input as Record<string, unknown>) : {};

  const p1 = Array.isArray(o.part1Sentences)
    ? (o.part1Sentences as unknown[])
        .map((s) => {
          const x = (s ?? {}) as Record<string, unknown>;
          const text = String(x.text ?? "").trim();
          if (!text) return null;
          return {
            text,
            ...(trimmed(x.audioUrl) ? { audioUrl: trimmed(x.audioUrl) } : {}),
            ...(trimmed(x.imageUrl) ? { imageUrl: trimmed(x.imageUrl) } : {}),
          };
        })
        .filter((s) => s !== null)
    : [];

  const rawP2 = o.part2Passage as Record<string, unknown> | null | undefined;
  const p2Text = rawP2 && typeof rawP2 === "object" ? String(rawP2.text ?? "").trim() : "";
  const p2 = p2Text
    ? {
        text: p2Text,
        ...(trimmed(rawP2?.audioUrl) ? { audioUrl: trimmed(rawP2?.audioUrl) } : {}),
        ...(trimmed(rawP2?.imageUrl) ? { imageUrl: trimmed(rawP2?.imageUrl) } : {}),
      }
    : null;

  const p3 = Array.isArray(o.part3Questions)
    ? (o.part3Questions as unknown[])
        .map((q) => {
          const x = (q ?? {}) as Record<string, unknown>;
          const question = String(x.question ?? "").trim();
          if (!question) return null;
          return {
            question,
            ...(trimmed(x.audioUrl) ? { audioUrl: trimmed(x.audioUrl) } : {}),
            ...(trimmed(x.imageUrl) ? { imageUrl: trimmed(x.imageUrl) } : {}),
            ...(trimmed(x.sampleAnswer) ? { sampleAnswer: trimmed(x.sampleAnswer) } : {}),
          };
        })
        .filter((q) => q !== null)
    : [];

  return { part1Sentences: p1, part2Passage: p2, part3Questions: p3 };
}

// ───────────────────────── WRITING ─────────────────────────

/**
 * Chuẩn hoá content Viết. Nhận: object `{ taskType?, prompt, outline?, imageUrl?,
 * minWords?, timeLimit? }` HOẶC mảng (lấy phần tử đầu hợp lệ — khớp định dạng
 * JSON nhập hàng loạt ở /admin/writing). Điền mặc định, chuẩn hoá taskType.
 */
export function buildWritingContent(input: unknown): unknown {
  const src = Array.isArray(input)
    ? (input.find((x) => x && typeof x === "object") ?? {})
    : input && typeof input === "object"
      ? input
      : {};
  const o = src as Record<string, unknown>;
  const prompt = typeof o.prompt === "string" ? o.prompt.trim() : "";
  if (!prompt) throw new Error("Thiếu đề bài (prompt).");
  const tt = String(o.taskType ?? "FREE").toUpperCase();
  const taskType =
    tt === "GUIDED" || tt === "PICTURE_DESCRIPTION" ? tt : "FREE";
  const str = (val: unknown) => (typeof val === "string" && val.trim() ? val.trim() : null);
  const num = (val: unknown, dflt: number) => {
    const n = typeof val === "number" ? val : Number(val);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : dflt;
  };
  return {
    taskType,
    prompt,
    outline: str(o.outline),
    imageUrl: str(o.imageUrl),
    minWords: num(o.minWords, 20),
    timeLimit: num(o.timeLimit, 900),
  };
}

// ───────────────────────── Bộ bài hàng loạt (bulk lessons) ─────────────────────────

import type { SkillKey } from "@/lib/roadmap";

export interface LessonBundleInput {
  topic: string;
  /** Nhãn phụ TIẾNG VIỆT của chủ đề, vd "Các con vật". */
  topicVi: string;
  icon?: string;
  description?: string;
  xpReward: number;
  chapter?: string; // tên chương để khớp (không tự tạo chương mới)
  sections: Partial<Record<SkillKey, unknown>>; // content thô của các kỹ năng có mặt
}

/** Đổi content thô của một kỹ năng → shape đúng để validate + lưu. */
export function buildSectionContent(skill: SkillKey, raw: unknown, fallbackTitle = ""): unknown {
  switch (skill) {
    case "READING":
      return buildReadingContent(raw, fallbackTitle);
    case "LISTENING":
      return buildListeningContent(raw, fallbackTitle);
    case "SPEAKING":
      return buildSpeakingContent(raw);
    case "WRITING":
      return buildWritingContent(raw);
    default:
      // VOCAB / GRAMMAR / PHONICS: admin cung cấp đúng shape, để validate lo.
      return raw;
  }
}

const SKILL_SET: SkillKey[] = ["VOCAB", "GRAMMAR", "PHONICS", "READING", "LISTENING", "WRITING", "SPEAKING"];

/**
 * Phân tích MẢNG JSON các bài để nhập hàng loạt. Mỗi phần tử có metadata bài +
 * (các) khoá kỹ năng ở cấp gốc (reading/listening/…) hoặc trong `sections`.
 * Trả về danh sách bài đã chuẩn hoá; ném lỗi nếu JSON không phải mảng.
 */
export function parseLessonsBundle(input: unknown): LessonBundleInput[] {
  if (!Array.isArray(input)) throw new Error("Cần một MẢNG JSON: [ { …bài… } ].");
  const lessons: LessonBundleInput[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const topic = typeof r.topic === "string" ? r.topic.trim() : "";
    if (!topic) continue;
    const sections: Partial<Record<SkillKey, unknown>> = {};
    const srcSections =
      r.sections && typeof r.sections === "object" ? (r.sections as Record<string, unknown>) : {};
    for (const skill of SKILL_SET) {
      const key = skill.toLowerCase();
      const val = srcSections[skill] ?? srcSections[key] ?? r[skill] ?? r[key];
      if (val !== undefined && val !== null) sections[skill] = val;
    }
    lessons.push({
      topic,
      topicVi: typeof r.topicVi === "string" ? r.topicVi : "",
      icon: typeof r.icon === "string" ? r.icon : undefined,
      description: typeof r.description === "string" ? r.description : undefined,
      xpReward: typeof r.xpReward === "number" ? r.xpReward : Number(r.xpReward) || 20,
      chapter: typeof r.chapter === "string" ? r.chapter.trim() : undefined,
      sections,
    });
  }
  if (lessons.length === 0) throw new Error("Không có bài hợp lệ (mỗi bài cần ít nhất `topic`).");
  return lessons;
}
