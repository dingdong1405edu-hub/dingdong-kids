// TEMP — đếm kho nội dung thật. Xoá sau khi dùng.
import { CHAPTERS_BY_KEY, TOTAL_ROADMAP_LESSONS } from "./all";
import { VOCAB_UNITS } from "./vocab";
import { GRAMMAR_UNITS } from "./grammar";
import { EXAMS } from "./exams";
import { ROADMAP_GRAMMAR } from "./grammar/roadmap";

const out: Record<string, unknown> = {};

// 1. Roadmap lessons
const roadmap: Record<string, { chapters: number; lessons: number; words: number }> = {};
let roadmapWords = 0;
let roadmapChapters = 0;
for (const [k, chapters] of Object.entries(CHAPTERS_BY_KEY)) {
  let lessons = 0;
  let words = 0;
  for (const c of chapters) {
    lessons += c.lessons.length;
    for (const l of c.lessons) words += l.words.length;
  }
  roadmap[k] = { chapters: chapters.length, lessons, words };
  roadmapWords += words;
  roadmapChapters += chapters.length;
}
out.roadmap = roadmap;
out.roadmapTotals = {
  chapters: roadmapChapters,
  lessons: TOTAL_ROADMAP_LESSONS,
  lessonWords: roadmapWords,
};

// 2. Vocab store
const vocabByLevel: Record<string, { units: number; words: number }> = {};
let vocabWords = 0;
for (const u of VOCAB_UNITS) {
  const e = (vocabByLevel[u.level] ??= { units: 0, words: 0 });
  e.units += 1;
  e.words += u.words.length;
  vocabWords += u.words.length;
}
out.vocab = {
  byLevel: vocabByLevel,
  units: VOCAB_UNITS.length,
  lessons: VOCAB_UNITS.length, // 1 lessonTitle / unit
  words: vocabWords,
  uniqueWords: new Set(VOCAB_UNITS.flatMap((u) => u.words.map((w) => w.word.toLowerCase()))).size,
};

// 3. Grammar (kho độc lập)
const gByLevel: Record<string, { units: number; lessons: number }> = {};
let gLessons = 0;
let gExercises = 0;
for (const u of GRAMMAR_UNITS) {
  const e = (gByLevel[u.level] ??= { units: 0, lessons: 0 });
  e.units += 1;
  e.lessons += u.lessons.length;
  gLessons += u.lessons.length;
  for (const l of u.lessons) {
    for (const s of l.sections) gExercises += s.exercises?.length ?? 0;
    gExercises += l.test?.questions?.length ?? 0;
  }
}
// Grammar gắn vào bài lộ trình
const roadmapGrammar: Record<string, number> = {};
let roadmapGrammarTotal = 0;
let roadmapGrammarEx = 0;
for (const [k, list] of Object.entries(ROADMAP_GRAMMAR) as Array<[string, typeof ROADMAP_GRAMMAR[keyof typeof ROADMAP_GRAMMAR] & object]>) {
  if (!list) continue;
  roadmapGrammar[k] = list.length;
  roadmapGrammarTotal += list.length;
  for (const g of list) for (const s of g.sections) roadmapGrammarEx += s.exercises?.length ?? 0;
}
out.grammar = {
  standalone: { byLevel: gByLevel, units: GRAMMAR_UNITS.length, lessons: gLessons, exercises: gExercises },
  roadmapAttached: { byLevel: roadmapGrammar, lessons: roadmapGrammarTotal, exercises: roadmapGrammarEx },
};

// 4. Exams
const exByLevel: Record<string, number> = {};
let examQuestions = 0;
let examSections = 0;
let examParts = 0;
for (const e of EXAMS) {
  exByLevel[e.level] = (exByLevel[e.level] ?? 0) + 1;
  examSections += e.sections.length;
  for (const s of e.sections) {
    examParts += s.parts.length;
    for (const p of s.parts) examQuestions += p.questions?.length ?? 0;
  }
}
out.exams = {
  byLevel: exByLevel,
  total: EXAMS.length,
  sections: examSections,
  parts: examParts,
  questions: examQuestions,
};

// Tổng câu hỏi lộ trình (reading + listening)
let rqs = 0;
for (const chapters of Object.values(CHAPTERS_BY_KEY))
  for (const c of chapters)
    for (const l of c.lessons) rqs += l.reading.questions.length + l.listening.questions.length;
out.roadmapQuestions = rqs;

console.log(JSON.stringify(out, null, 2));
