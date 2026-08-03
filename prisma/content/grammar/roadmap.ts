// Gom ngữ pháp của LỘ TRÌNH theo cấp.
//
// Mỗi cấp gồm hai mảng nối tiếp nhau, khớp ĐÚNG cách `prisma/content/all.ts`
// nối bài học:
//   • `roadmap-<cấp>.ts`  ↔ các bài trong `prisma/content/<cấp>.ts`
//   • `extra-<cấp>.ts`    ↔ các bài trong `prisma/content/extra/<cấp>.ts`
//
// Phần tử thứ i của mảng đã nối ↔ bài thứ i của cấp (tính dồn qua các chương,
// đúng thứ tự `order` mà seed sinh ra). `validate.ts` đối chiếu `topic` từng
// mục với `topic` thật của bài để bắt lệch hàng.
//
// Cấp nào CHƯA soạn mục nào thì bị loại khỏi bảng (mảng rỗng) — phần Ngữ pháp
// của cấp đó tự rơi về khung "Sắp có" thay vì hiện ra một bài rỗng.
import type { EnglishLevel } from "@prisma/client";
import type { LessonGrammarSeed } from "./types";

import { LESSON_GRAMMAR as PRE_STARTERS_BASE } from "./roadmap-pre-starters";
import { LESSON_GRAMMAR as STARTERS_BASE } from "./roadmap-starters";
import { LESSON_GRAMMAR as MOVERS_BASE } from "./roadmap-movers";
import { LESSON_GRAMMAR as FLYERS_BASE } from "./roadmap-flyers";
import { LESSON_GRAMMAR as KET_BASE } from "./roadmap-ket";
import { LESSON_GRAMMAR as PET_BASE } from "./roadmap-pet";

import { LESSON_GRAMMAR as PRE_STARTERS_EXTRA } from "./extra-pre-starters";
import { LESSON_GRAMMAR as STARTERS_EXTRA } from "./extra-starters";
import { LESSON_GRAMMAR as MOVERS_EXTRA } from "./extra-movers";
import { LESSON_GRAMMAR as FLYERS_EXTRA } from "./extra-flyers";
import { LESSON_GRAMMAR as KET_EXTRA } from "./extra-ket";
import { LESSON_GRAMMAR as PET_EXTRA } from "./extra-pet";

const ALL: Record<EnglishLevel, LessonGrammarSeed[]> = {
  PRE_STARTERS: [...PRE_STARTERS_BASE, ...PRE_STARTERS_EXTRA],
  STARTERS: [...STARTERS_BASE, ...STARTERS_EXTRA],
  MOVERS: [...MOVERS_BASE, ...MOVERS_EXTRA],
  FLYERS: [...FLYERS_BASE, ...FLYERS_EXTRA],
  KET: [...KET_BASE, ...KET_EXTRA],
  PET: [...PET_BASE, ...PET_EXTRA],
};

export const ROADMAP_GRAMMAR: Partial<Record<EnglishLevel, LessonGrammarSeed[]>> =
  Object.fromEntries(
    (Object.entries(ALL) as Array<[EnglishLevel, LessonGrammarSeed[]]>).filter(
      ([, list]) => list.length > 0,
    ),
  ) as Partial<Record<EnglishLevel, LessonGrammarSeed[]>>;

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
