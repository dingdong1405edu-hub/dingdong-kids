import { Skill, type WritingTaskType } from "@prisma/client";
import { db } from "@/lib/db";
import { SKILL_META, type SkillKey } from "@/lib/roadmap";
import { getEntitlements, isRoadmapLessonLocked } from "@/lib/entitlements";
import {
  vocabContentSchema,
  writingContentSchema,
  writingReorderContentSchema,
  isReorderWriting,
  speakingContentSchema,
  normalizeReadingContent,
  normalizeListeningContent,
} from "@/lib/roadmap-content";
import { parseGrammarContent } from "@/lib/grammar";
import { toPdfQuestions } from "@/components/learn/roadmap/roadmap-pdf";
import type { PdfQuestion } from "@/components/learn/pdf/pdf-question-list";
import type { PdfPayload } from "@/components/learn/pdf/payload";

/**
 * Tải + map dữ liệu cho MỘT tài liệu PDF. Dùng chung cho trang xem trước (server
 * component) và route /api/pdf/* (tạo PDF). Không tự kiểm tra đăng nhập — caller
 * (đã `auth()`) truyền userId/role cho phần lộ trình.
 */
export type PdfLoadResult =
  | { status: "ok"; payload: PdfPayload; fileName: string; backHref?: string }
  | { status: "notfound" }
  | { status: "locked"; backHref: string };

const WRITING_TYPE_LABEL: Record<WritingTaskType, string> = {
  FREE: "Viết tự do",
  GUIDED: "Viết theo gợi ý",
  PICTURE_DESCRIPTION: "Mô tả tranh",
};
const ROADMAP_WRITING_LABEL: Record<string, string> = {
  FREE: "Viết tự do",
  GUIDED: "Viết có gợi ý",
  PICTURE_DESCRIPTION: "Tả tranh",
};
// Nhãn không dấu vì dùng làm TÊN TỆP tải về.
const SKILL_FILE_LABEL: Record<SkillKey, string> = {
  VOCAB: "Tu vung",
  GRAMMAR: "Ngu phap",
  PHONICS: "Ghep van",
  READING: "Doc hieu",
  LISTENING: "Nghe hieu",
  WRITING: "Viet",
  SPEAKING: "Luyen noi",
};

/** Tiền tố tên tệp cho mọi tài liệu tải về. */
const FILE_PREFIX = "DingDong Kids";

function mapQuestions(
  qs: {
    id: string;
    type: string;
    prompt: string;
    promptTranslation: string | null;
    options: unknown;
    correctAnswer: unknown;
    explanation: string | null;
    supportingQuote: string | null;
  }[]
): PdfQuestion[] {
  return qs.map((q) => ({
    id: q.id,
    type: q.type,
    prompt: q.prompt,
    promptTranslation: q.promptTranslation,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    supportingQuote: q.supportingQuote,
  }));
}

/** Câu ví dụ của một từ vựng: { sentence, meaning }. Audio bỏ qua — bản in không phát được. */
function toExamples(raw: unknown): { sentence: string; meaning: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((e) => {
    const o = (e ?? {}) as Record<string, unknown>;
    return { sentence: String(o.sentence ?? ""), meaning: String(o.meaning ?? "") };
  });
}
function toSentences(raw: unknown): { text: string; vi?: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s) => {
      const o = (s ?? {}) as Record<string, unknown>;
      return { text: String(o.text ?? ""), vi: o.vi ? String(o.vi) : undefined };
    })
    .filter((s) => s.text);
}
function toPassage(raw: unknown): { text: string; vi?: string } | null {
  const o = (raw ?? {}) as Record<string, unknown>;
  const text = String(o.text ?? "");
  return text ? { text, vi: o.vi ? String(o.vi) : undefined } : null;
}
function toSpeakingQuestions(raw: unknown): { question: string; vi?: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s) => {
      const o = (s ?? {}) as Record<string, unknown>;
      return { question: String(o.question ?? o.text ?? ""), vi: o.vi ? String(o.vi) : undefined };
    })
    .filter((q) => q.question);
}

export async function loadReadingPayload(testId: string): Promise<PdfLoadResult> {
  const test = await db.readingTest.findUnique({ where: { id: testId }, include: { questions: { orderBy: { order: "asc" } } } });
  if (!test || !test.published) return { status: "notfound" };
  return {
    status: "ok",
    fileName: `${FILE_PREFIX} - Doc hieu - ${test.title}`,
    payload: {
      kind: "reading",
      props: {
        title: test.title,
        level: test.level,
        passage: test.passage,
        passageTranslation: test.passageTranslation,
        questions: mapQuestions(test.questions),
      },
    },
  };
}

export async function loadListeningPayload(testId: string): Promise<PdfLoadResult> {
  const test = await db.listeningTest.findUnique({ where: { id: testId }, include: { questions: { orderBy: { order: "asc" } } } });
  if (!test || !test.published) return { status: "notfound" };
  return {
    status: "ok",
    fileName: `${FILE_PREFIX} - Nghe hieu - ${test.title}`,
    payload: {
      kind: "listening",
      props: { title: test.title, level: test.level, transcript: test.transcript, questions: mapQuestions(test.questions) },
    },
  };
}

export async function loadWritingPayload(taskId: string): Promise<PdfLoadResult> {
  const task = await db.writingTask.findUnique({ where: { id: taskId } });
  if (!task || !task.published) return { status: "notfound" };
  const shortPrompt = task.prompt.length > 60 ? task.prompt.slice(0, 60) + "…" : task.prompt;
  return {
    status: "ok",
    fileName: `${FILE_PREFIX} - Viet - ${shortPrompt || task.id}`,
    payload: {
      kind: "writing",
      props: {
        title: shortPrompt || "Bài viết",
        taskTypeLabel: WRITING_TYPE_LABEL[task.taskType],
        level: task.level,
        prompt: task.prompt,
        outline: task.outline,
        minWords: task.minWords,
        timeLimit: task.timeLimit,
      },
    },
  };
}

export async function loadSpeakingPayload(setId: string): Promise<PdfLoadResult> {
  const set = await db.speakingSet.findUnique({ where: { id: setId } });
  if (!set || !set.published) return { status: "notfound" };
  const title = set.title || "Bài luyện nói";
  return {
    status: "ok",
    fileName: `${FILE_PREFIX} - Luyen noi - ${title}`,
    payload: {
      kind: "speaking",
      props: { title, level: set.level, part1: toSentences(set.part1Sentences), part2: toPassage(set.part2Passage), part3: toSpeakingQuestions(set.part3Questions) },
    },
  };
}

export async function loadVocabPayload(lessonId: string): Promise<PdfLoadResult> {
  const lesson = await db.vocabLesson.findUnique({ where: { id: lessonId }, include: { unit: true, words: { orderBy: { order: "asc" } } } });
  if (!lesson || !lesson.published || !lesson.unit.published) return { status: "notfound" };
  const title = lesson.title || "Bài từ vựng";
  return {
    status: "ok",
    fileName: `${FILE_PREFIX} - Tu vung - ${title}`,
    payload: {
      kind: "vocab",
      props: {
        lessonTitle: title,
        unitTitle: lesson.unit.title,
        unitTheme: lesson.unit.theme,
        level: lesson.unit.level,
        words: lesson.words.map((w) => ({
          id: w.id,
          word: w.word,
          ipa: w.ipa,
          meaning: w.meaning,
          partOfSpeech: w.partOfSpeech,
          examples: toExamples(w.examples),
        })),
      },
    },
  };
}

export async function loadGrammarPayload(lessonId: string): Promise<PdfLoadResult> {
  const lesson = await db.grammarLesson.findUnique({ where: { id: lessonId }, include: { unit: true } });
  if (!lesson || !lesson.published || !lesson.unit.published) return { status: "notfound" };
  const title = lesson.title || "Bài ngữ pháp";
  return {
    status: "ok",
    fileName: `${FILE_PREFIX} - Ngu phap - ${title}`,
    payload: {
      kind: "grammar",
      props: { lessonTitle: title, unitTitle: lesson.unit.title, unitTheme: lesson.unit.theme, level: lesson.unit.level, content: parseGrammarContent(lesson.exercises) },
    },
  };
}

const SKILL_KEYS = SKILL_META.map((m) => m.key);

export async function loadRoadmapPayload(lessonId: string, skillSlug: string, userId: string, role?: string): Promise<PdfLoadResult> {
  const skillKey = skillSlug.toUpperCase() as SkillKey;
  if (!SKILL_KEYS.includes(skillKey)) return { status: "notfound" };

  const section = await db.roadmapSection.findUnique({
    where: { lessonId_skill: { lessonId, skill: skillKey as Skill } },
    include: { lesson: { include: { course: true } } },
  });
  if (!section || !section.published) return { status: "notfound" };
  const { lesson } = section;
  if (!lesson.course.published) return { status: "notfound" };

  const { levelToSlug } = await import("@/lib/roadmap");
  const slug = levelToSlug(lesson.course.level);
  const backHref = `/roadmap/${slug}`;

  const ent = await getEntitlements(userId, role);
  const lessonIndex = await db.roadmapLesson.count({ where: { courseId: lesson.courseId, order: { lt: lesson.order } } });
  if (isRoadmapLessonLocked(ent, lesson.course.level, lessonIndex)) return { status: "locked", backHref };

  const level = lesson.course.level;
  const content = section.content;
  const fileName = `${FILE_PREFIX} - ${SKILL_FILE_LABEL[skillKey]} - ${lesson.topic}`;

  let payload: PdfPayload;
  switch (skillKey) {
    case "VOCAB": {
      const p = vocabContentSchema.safeParse(content);
      if (!p.success) return { status: "notfound" };
      payload = {
        kind: "vocab",
        props: {
          lessonTitle: lesson.topic,
          unitTitle: "Lộ trình · Từ vựng",
          level,
          words: p.data.words.map((w, i) => ({
            id: `w${i}`,
            word: w.word,
            ipa: w.ipa,
            meaning: w.meaning,
            partOfSpeech: w.partOfSpeech ?? "",
            examples: w.examples ?? [],
          })),
        },
      };
      break;
    }
    case "GRAMMAR":
      payload = { kind: "grammar", props: { lessonTitle: lesson.topic, unitTitle: "Lộ trình · Ngữ pháp", level, content: parseGrammarContent(content) } };
      break;
    case "PHONICS":
      // Ghép vần là hoạt động NGHE–CHẠM (nghe âm, kéo chữ cái, nối vần) — in ra
      // giấy thì mất hết phần âm thanh nên không có mẫu PDF. Trả "không tìm thấy"
      // để nút tải PDF không hiện ở kỹ năng này.
      return { status: "notfound" };
    case "READING": {
      const c = normalizeReadingContent(content);
      if (!c.passages.length) return { status: "notfound" };
      payload = {
        kind: "roadmap-reading",
        props: {
          title: c.title || lesson.topic,
          level,
          passages: c.passages.map((p) => ({ passage: p.passage, questions: toPdfQuestions(p.questions) })),
        },
      };
      break;
    }
    case "LISTENING": {
      const c = normalizeListeningContent(content);
      if (!c.clips.length) return { status: "notfound" };
      payload = {
        kind: "roadmap-listening",
        props: { title: c.title || lesson.topic, level, clips: c.clips.map((cl) => ({ title: cl.title, transcript: cl.transcript, questions: toPdfQuestions(cl.questions) })) },
      };
      break;
    }
    case "WRITING": {
      // Sắp xếp từ thành câu: in thẻ từ cho sẵn + câu đúng & bản dịch.
      if (isReorderWriting(content)) {
        const p = writingReorderContentSchema.safeParse(content);
        if (!p.success) return { status: "notfound" };
        payload = {
          kind: "roadmap-writing-reorder",
          props: {
            title: lesson.topic,
            subtitle: lesson.topicVi || p.data.title || null,
            level,
            sentences: p.data.sentences.map((s) => ({ words: s.words, answer: s.answer, translation: s.translation })),
          },
        };
        break;
      }
      const p = writingContentSchema.safeParse(content);
      if (!p.success) return { status: "notfound" };
      const d = p.data;
      payload = {
        kind: "writing",
        props: { title: lesson.topic, taskTypeLabel: ROADMAP_WRITING_LABEL[d.taskType] ?? "Bài viết", level, prompt: d.prompt, outline: d.outline, minWords: d.minWords, timeLimit: d.timeLimit },
      };
      break;
    }
    case "SPEAKING": {
      const p = speakingContentSchema.safeParse(content);
      if (!p.success) return { status: "notfound" };
      const d = p.data;
      payload = { kind: "speaking", props: { title: lesson.topic, level, part1: d.part1Sentences ?? [], part2: d.part2Passage ?? null, part3: d.part3Questions ?? [] } };
      break;
    }
    default:
      return { status: "notfound" };
  }

  return { status: "ok", payload, fileName, backHref };
}
