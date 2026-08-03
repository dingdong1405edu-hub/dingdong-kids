// Gom kho NGỮ PHÁP độc lập (khu "Luyện kỹ năng" → model GrammarUnit /
// GrammarLesson) của cả 6 cấp thành MỘT danh sách, theo thứ tự lộ trình.
//
// Khác với `./roadmap.ts` — file đó gom ngữ pháp GẮN VÀO BÀI LỘ TRÌNH.
import type { GrammarUnitSeed } from "./types";
import { UNITS as PRE_STARTERS } from "./pre-starters";
import { UNITS as STARTERS } from "./starters";
import { UNITS as MOVERS } from "./movers";
import { UNITS as FLYERS } from "./flyers";
import { UNITS as KET } from "./ket";
import { UNITS as PET } from "./pet";

export const GRAMMAR_UNITS: GrammarUnitSeed[] = [
  ...PRE_STARTERS,
  ...STARTERS,
  ...MOVERS,
  ...FLYERS,
  ...KET,
  ...PET,
];

export type { GrammarUnitSeed, GrammarLessonSeed } from "./types";
