// Gom các gói phim của khu "Xem hoạt hình".
//
// Thêm một gói mới (`pack-02.ts`, `pack-03.ts`…) thì import và nối vào mảng
// dưới đây — cùng khuôn với `@/lib/first-words-data`. Tách theo gói để một file
// nội dung không phình lên hàng nghìn dòng khi kho phim lớn dần.
import type { Cartoon } from "./types";
import { CARTOONS as PACK_01 } from "./pack-01";

export const ALL_CARTOONS: Cartoon[] = [...PACK_01];

export type { Cartoon, CartoonLine, CartoonLevel } from "./types";
