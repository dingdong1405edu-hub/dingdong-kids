// ===========================================================================
//  MỘT NGUỒN SỰ THẬT cho danh sách bài lộ trình của cả 6 cấp.
//
//  Mỗi cấp = file gốc (`<cấp>.ts`) + file bổ sung (`extra/<cấp>.ts`) nối SAU.
//  Cả `prisma/seed.ts` lẫn `prisma/content/validate.ts` đều đọc từ đây, nên
//  thứ tự bài mà validator kiểm và thứ tự bài mà seed ghi vào DB luôn TRÙNG
//  NHAU — đây chính là thứ tự mà ngữ pháp lộ trình phải khớp theo.
// ===========================================================================
import type { EnglishLevel } from "@prisma/client";
import type { ChapterSeed } from "./types";

import { CHAPTERS as PRE_STARTERS_BASE } from "./pre-starters";
import { CHAPTERS as STARTERS_BASE } from "./starters";
import { CHAPTERS as MOVERS_BASE } from "./movers";
import { CHAPTERS as FLYERS_BASE } from "./flyers";
import { CHAPTERS as KET_BASE } from "./ket";
import { CHAPTERS as PET_BASE } from "./pet";

import { CHAPTERS as PRE_STARTERS_EXTRA } from "./extra/pre-starters";
import { CHAPTERS as STARTERS_EXTRA } from "./extra/starters";
import { CHAPTERS as MOVERS_EXTRA } from "./extra/movers";
import { CHAPTERS as FLYERS_EXTRA } from "./extra/flyers";
import { CHAPTERS as KET_EXTRA } from "./extra/ket";
import { CHAPTERS as PET_EXTRA } from "./extra/pet";

/** Khoá thư mục (tên file, cũng là tham số của `npm run content:check <cấp>`). */
export type LevelKey = "pre-starters" | "starters" | "movers" | "flyers" | "ket" | "pet";

export const LEVEL_BY_KEY: Record<LevelKey, EnglishLevel> = {
  "pre-starters": "PRE_STARTERS",
  starters: "STARTERS",
  movers: "MOVERS",
  flyers: "FLYERS",
  ket: "KET",
  pet: "PET",
};

export const CHAPTERS_BY_KEY: Record<LevelKey, ChapterSeed[]> = {
  "pre-starters": [...PRE_STARTERS_BASE, ...PRE_STARTERS_EXTRA],
  starters: [...STARTERS_BASE, ...STARTERS_EXTRA],
  movers: [...MOVERS_BASE, ...MOVERS_EXTRA],
  flyers: [...FLYERS_BASE, ...FLYERS_EXTRA],
  ket: [...KET_BASE, ...KET_EXTRA],
  pet: [...PET_BASE, ...PET_EXTRA],
};

export const CHAPTERS_BY_LEVEL: Record<EnglishLevel, ChapterSeed[]> = {
  PRE_STARTERS: CHAPTERS_BY_KEY["pre-starters"],
  STARTERS: CHAPTERS_BY_KEY.starters,
  MOVERS: CHAPTERS_BY_KEY.movers,
  FLYERS: CHAPTERS_BY_KEY.flyers,
  KET: CHAPTERS_BY_KEY.ket,
  PET: CHAPTERS_BY_KEY.pet,
};

/** Tổng số bài toàn lộ trình — dùng cho log seed và trang giới thiệu. */
export const TOTAL_ROADMAP_LESSONS = Object.values(CHAPTERS_BY_KEY).reduce(
  (n, chapters) => n + chapters.reduce((m, c) => m + c.lessons.length, 0),
  0,
);
