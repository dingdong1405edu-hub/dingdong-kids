// Gom các gói chủ đề KHÁM PHÁ THÊM của cấp "Bé Tập Nói".
//
// Chặng chính (10 chủ đề đầu, quyết định mốc tốt nghiệp) vẫn nằm trong
// `@/lib/first-words`. Mọi chủ đề ở đây được đánh `bonus: true` TỰ ĐỘNG bên
// dưới, nên người soạn nội dung không phải nhớ đặt cờ.
import type { FirstWordsUnit } from "./types";
import { UNITS as PACK_01 } from "./pack-01";
import { UNITS as PACK_02 } from "./pack-02";
import { UNITS as PACK_03 } from "./pack-03";
import { UNITS as PACK_04 } from "./pack-04";
import { UNITS as PACK_05 } from "./pack-05";
import { UNITS as PACK_06 } from "./pack-06";

export const EXTRA_UNITS: FirstWordsUnit[] = [
  ...PACK_01,
  ...PACK_02,
  ...PACK_03,
  ...PACK_04,
  ...PACK_05,
  ...PACK_06,
].map((u) => ({ ...u, bonus: true }));

export type { FirstWord, FirstWordsUnit } from "./types";
