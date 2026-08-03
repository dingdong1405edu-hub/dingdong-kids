// Gom đề thi thử của cả 6 cấp, theo thứ tự lộ trình.
import type { ExamSeed } from "./types";
import { EXAMS as PRE_STARTERS } from "./pre-starters";
import { EXAMS as STARTERS } from "./starters";
import { EXAMS as MOVERS } from "./movers";
import { EXAMS as FLYERS } from "./flyers";
import { EXAMS as KET } from "./ket";
import { EXAMS as PET } from "./pet";

export const EXAMS: ExamSeed[] = [
  ...PRE_STARTERS,
  ...STARTERS,
  ...MOVERS,
  ...FLYERS,
  ...KET,
  ...PET,
];

export type { ExamSeed, ExamSectionSeed, ExamPartSeed } from "./types";
