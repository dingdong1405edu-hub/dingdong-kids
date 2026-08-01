// ===========================================================================
//  HỢP ĐỒNG NỘI DUNG NGỮ PHÁP — dùng chung cho 6 file cấp độ trong thư mục này.
//
//  Mỗi cấp một file (`pre-starters.ts`, `starters.ts`, …) export một mảng
//  `UNITS: GrammarUnitSeed[]`. `index.ts` gom lại, `prisma/seed.ts` ghi vào DB.
//
//  Nội dung đi thẳng vào `GrammarLesson.exercises` dưới dạng JSON v3
//  ({ version: 3, sections: [...], test: {...} }) — đúng thứ mà
//  `src/lib/grammar.ts::parseGrammarContent()` đọc khi trẻ vào học, và cũng là
//  thứ trang quản trị hiện ra để sửa. Vì vậy các kiểu ở đây IMPORT THẲNG từ
//  `@/types`: sai shape là hỏng typecheck ngay, không đợi tới lúc chạy.
//
//  ⚠️ LUẬT SỐ LƯỢNG: mỗi section cần đủ 8 minigame — 2× fill_blank,
//     2× sentence_order, 2× translate vi_to_en, 2× translate en_to_vi. Đây là
//     đúng luật mà `grammarStructureWarning()` trong src/server/actions/admin.ts
//     nhắc admin, và `npm run content:check` kiểm lại trước khi seed.
// ===========================================================================
import type { EnglishLevel } from "@prisma/client";
import type {
  Exercise,
  FormulaPart,
  GrammarLessonContent,
  GrammarMistake,
  GrammarSection,
  GrammarTest,
  SituationalExample,
} from "@/types";

/** Một bài học ngữ pháp = vài phần lý thuyết-kèm-luyện-tập + một bài kiểm tra. */
export interface GrammarLessonSeed {
  /**
   * Slug DUY NHẤT TOÀN CỤC (không chỉ trong unit) — id bài học là
   * `seed-grammar-lesson-<slug>`. Trùng slug ở hai unit khác nhau sẽ khiến bài
   * sau ghi đè bài trước lúc seed.
   */
  slug: string;
  /** Tiêu đề tiếng Việt hiển thị trong danh sách bài, vd "am · is · are". */
  title: string;
  sections: GrammarSection[];
  test: GrammarTest;
}

/** Một chủ đề ngữ pháp (thẻ trên trang /grammar) gồm nhiều bài học. */
export interface GrammarUnitSeed {
  /** Slug duy nhất — id unit là `seed-grammar-unit-<slug>`. */
  slug: string;
  /** Tên tiếng Anh của điểm ngữ pháp, vd "Verb to be". */
  title: string;
  /** Nhãn tiếng Việt hiện thành tag trên thẻ, vd "Động từ to be". */
  theme: string;
  level: EnglishLevel;
  lessons: GrammarLessonSeed[];
}

/** Dựng JSON v3 cho một bài — đúng shape `GrammarLesson.exercises` cần. */
export function lessonContent(l: GrammarLessonSeed): GrammarLessonContent {
  return { version: 3, sections: l.sections, test: l.test };
}

// ─────────────────── Ngữ pháp gắn vào bài LỘ TRÌNH ───────────────────
//
//  Khác với `GrammarUnitSeed` ở trên (dựng khu "Luyện kỹ năng" — model
//  GrammarUnit/GrammarLesson), phần này ghi vào `RoadmapSection.content` của
//  kỹ năng GRAMMAR trong một bài lộ trình, và dùng LẠI đúng chính từ vựng bài
//  đó vừa dạy để bé học mẫu câu bằng từ đã quen.
//
//  Mỗi cấp một file `roadmap-<cấp>.ts` export `LESSON_GRAMMAR`. Mảng này đi
//  SONG SONG với danh sách bài của cấp trong `prisma/content/<cấp>.ts`: phần tử
//  thứ i là ngữ pháp của bài thứ i (tính dồn qua các chương, đúng thứ tự
//  `order` mà seed sinh ra). Mỗi mục PHẢI khai lại `topic` của bài —
//  `validate.ts` đối chiếu chuỗi này với `topic` thật để bắt lệch hàng.
//
//  ⚠️ Trong lộ trình, `GrammarFlow` được gọi với `showTest={false}`
//     (xem roadmap-section-player.tsx) nên khối `test` KHÔNG bao giờ hiện ra.
//     Vì vậy mọi bài tập phải nằm trong `sections[].exercises`.

/** Ngữ pháp của MỘT bài lộ trình. */
export interface LessonGrammarSeed {
  /** PHẢI khớp `topic` của bài cùng thứ tự trong file cấp. */
  topic: string;
  sections: GrammarSection[];
}

/** Dựng content JSON cho phần GRAMMAR của một bài lộ trình. */
export function roadmapGrammarContent(g: LessonGrammarSeed): GrammarLessonContent {
  // `test` để rỗng có chủ đích: lộ trình không có trang bài kiểm tra riêng.
  return { version: 3, sections: g.sections, test: { questions: [], passThreshold: 60 } };
}

// ───────────────────────── Bộ dựng lý thuyết ─────────────────────────

/** Một ô trong công thức + nghĩa của nó. Liệt kê ĐÚNG THỨ TỰ công thức. */
export const part = (p: string, role: string, meaning: string): FormulaPart => ({
  part: p,
  role,
  meaning,
});

/** Lỗi trẻ Việt hay mắc: dạng sai → dạng đúng → vì sao. */
export const mis = (wrong: string, right: string, note: string): GrammarMistake => ({
  wrong,
  right,
  note,
});

/** Ví dụ gắn với một tình huống có thật, không phải câu mẫu khô khan. */
export const ex = (
  situation: string,
  sentence: string,
  meaning: string,
  note?: string,
): SituationalExample => ({
  situation,
  sentence,
  meaning,
  ...(note ? { note } : {}),
});

// ───────────────────────── Bộ dựng bài tập ─────────────────────────
//
//  Viết một dòng một bài tập. Ràng buộc (validate.ts kiểm lại hết):
//   • fill_blank    — `sentence` PHẢI chứa "___", `blank` PHẢI nằm trong options.
//   • sentence_order— `words` phải là hoán vị đúng của `answer.split(" ")`.
//   • translate     — `answer` PHẢI nằm trong `options`, các lựa chọn không trùng.

/** Điền chỗ trống — trắc nghiệm. `sentence` dùng "___" làm chỗ trống. */
export const fb = (
  sentence: string,
  blank: string,
  options: string[],
  explanation?: string,
  hint?: string,
): Exercise => ({
  type: "fill_blank",
  sentence,
  blank,
  options,
  ...(hint ? { hint } : {}),
  ...(explanation ? { explanation } : {}),
});

/** Sắp xếp các từ thành câu. `answer` KHÔNG có dấu câu cuối. */
export const so = (
  words: string[],
  answer: string,
  meaning?: string,
  explanation?: string,
): Exercise => ({
  type: "sentence_order",
  words,
  answer,
  ...(meaning ? { meaning } : {}),
  ...(explanation ? { explanation } : {}),
});

/** Dịch Việt → Anh (trắc nghiệm). */
export const viEn = (
  prompt: string,
  answer: string,
  options: string[],
  explanation?: string,
): Exercise => ({
  type: "translate",
  direction: "vi_to_en",
  prompt,
  answer,
  options,
  ...(explanation ? { explanation } : {}),
});

/** Dịch Anh → Việt (trắc nghiệm). */
export const enVi = (
  prompt: string,
  answer: string,
  options: string[],
  explanation?: string,
): Exercise => ({
  type: "translate",
  direction: "en_to_vi",
  prompt,
  answer,
  options,
  ...(explanation ? { explanation } : {}),
});

/** Nối từ cùng vần — thêm cho cấp nhỏ, không cần ảnh nên dùng được ngay. */
export const rhyme = (pairs: Array<[string, string]>): Exercise => ({
  type: "rhyme_match",
  pairs: pairs.map(([a, b]) => ({ a, b })),
});

/** Bài kiểm tra cuối bài. Mặc định 3 phút, đạt từ 60%. */
export const quiz = (questions: Exercise[], timeLimit = 180): GrammarTest => ({
  timeLimit,
  passThreshold: 60,
  questions,
});
