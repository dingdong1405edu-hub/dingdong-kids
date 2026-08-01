// Gom ngữ pháp của LỘ TRÌNH theo cấp.
//
// Mỗi cấp một file `roadmap-<cấp>.ts` export `LESSON_GRAMMAR`, đi song song với
// danh sách bài của cấp đó trong `prisma/content/<cấp>.ts` (phần tử thứ i ↔ bài
// thứ i). Cấp nào chưa soạn thì KHÔNG khai ở đây — phần Ngữ pháp của cấp đó tự
// rơi về khung "Sắp có" thay vì hiện ra một bài rỗng.
import type { EnglishLevel } from "@prisma/client";
import type { LessonGrammarSeed } from "./types";
import { LESSON_GRAMMAR as PRE_STARTERS } from "./roadmap-pre-starters";

export const ROADMAP_GRAMMAR: Partial<Record<EnglishLevel, LessonGrammarSeed[]>> = {
  PRE_STARTERS,
};

/**
 * Ngữ pháp của bài thứ `index` (0-based, tính dồn qua các chương) ở một cấp.
 * Trả về `undefined` nếu cấp chưa soạn hoặc bài đó chưa có ngữ pháp.
 */
export function grammarForLesson(
  level: EnglishLevel,
  index: number,
): LessonGrammarSeed | undefined {
  return ROADMAP_GRAMMAR[level]?.[index];
}
