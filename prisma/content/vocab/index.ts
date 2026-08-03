// Gom kho từ vựng của cả 6 cấp thành MỘT danh sách, theo thứ tự lộ trình.
//
// `prisma/seed.ts` chỉ nhập từ đây, không biết có bao nhiêu file cấp — thêm cấp
// mới chỉ cần sửa đúng chỗ này.
import type { VocabUnitSeed } from "./types";
import { UNITS as PRE_STARTERS } from "./pre-starters";
import { UNITS as STARTERS } from "./starters";
import { UNITS as MOVERS } from "./movers";
import { UNITS as FLYERS } from "./flyers";
import { UNITS as KET } from "./ket";
import { UNITS as PET } from "./pet";

export const VOCAB_UNITS: VocabUnitSeed[] = [
  ...PRE_STARTERS,
  ...STARTERS,
  ...MOVERS,
  ...FLYERS,
  ...KET,
  ...PET,
];

export type { VocabUnitSeed, WordSeed } from "./types";
