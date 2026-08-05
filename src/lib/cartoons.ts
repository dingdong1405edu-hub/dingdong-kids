// ===========================================================================
//  XEM HOẠT HÌNH (nói theo phim — shadowing) — khu "Trải nghiệm".
//
//  Vòng lặp: phim chạy ĐÚNG MỘT CÂU rồi tự dừng → bé nhắc lại câu đó vào micro
//  → máy nghe và chấm sao → xem tiếp câu sau. Hết phim thì ăn mừng.
//
//  Vì sao lại là "nói theo phim" chứ không phải "xem cho vui": trẻ nhớ ngữ điệu
//  của cả câu qua bắt chước, không qua ghép từ. Nhưng nếu chỉ để phim chạy
//  thẳng một mạch thì bé xem thụ động — dừng lại bắt nói chính là chỗ biến giờ
//  xem YouTube thành giờ học.
//
//  Nội dung CỐ ĐỊNH trong code (cùng khuôn @/lib/first-words): phim và mốc thời
//  gian nằm ở @/lib/cartoon-data, chỉ tiến độ của bé lưu DB qua CartoonProgress.
//  KHÔNG import @prisma/client ở đây — file này chạy cả phía client.
// ===========================================================================
import { ALL_CARTOONS } from "./cartoon-data";
import type { Cartoon, CartoonLine, CartoonLevel } from "./cartoon-data/types";

export type { Cartoon, CartoonLine, CartoonLevel };

/** Mỗi câu tối đa 3 sao — giống cấp "Bé Tập Nói" để bé không phải học lại luật. */
export const STARS_PER_LINE = 3;

/** XP tối đa cho một phim (đủ 3 sao mọi câu mới lấy trọn). */
export const XP_PER_CARTOON = 25;

/**
 * Trần thời gian một lần thu.
 *
 * Dài hơn cấp "Bé Tập Nói" (5 giây) vì ở đây bé nhắc lại cả CÂU chứ không phải
 * một từ; nhưng vẫn phải có trần, bé rất hay quên bấm dừng.
 */
export const MAX_RECORD_SEC = 9;

/** Toàn bộ kho — kể cả phim chưa mở. Dùng cho validate và trang quản trị. */
export const CARTOONS: Cartoon[] = ALL_CARTOONS;

/** Chỉ những phim ĐÃ MỞ cho bé xem. */
export const PUBLISHED_CARTOONS: Cartoon[] = ALL_CARTOONS.filter((c) => c.published);

/**
 * Tra một phim theo id — kể cả phim chưa mở.
 *
 * Trang xem phải tự kiểm `published`: người quản trị cần xem thử trước khi mở,
 * còn bé thì không được vào phim chưa duyệt.
 */
export function getCartoon(id: string): Cartoon | undefined {
  return ALL_CARTOONS.find((c) => c.id === id);
}

/** Phim kế tiếp trong danh sách ĐÃ MỞ (null nếu đang ở phim cuối). */
export function nextCartoon(id: string): Cartoon | null {
  const i = PUBLISHED_CARTOONS.findIndex((c) => c.id === id);
  return i >= 0 ? (PUBLISHED_CARTOONS[i + 1] ?? null) : null;
}

/** Số sao tối đa của một phim. */
export function maxStarsOf(cartoon: Cartoon): number {
  return cartoon.lines.length * STARS_PER_LINE;
}

/**
 * Đổi tỉ lệ từ khớp được thành số sao.
 *
 * Ngưỡng đặt RỘNG có chủ đích. Máy nhận dạng giọng trẻ em sai nhiều — bắt bé
 * đọc trúng 100% từ mới cho 3 sao thì phần lớn lượt nói đúng vẫn bị chấm 1 sao,
 * và bé bỏ cuộc sau vài câu. Sàn LUÔN là 1 sao, không bao giờ 0.
 *
 * @param ratio tỉ lệ từ trong câu mẫu mà máy nghe ra được (0–1)
 */
export function starsForShadow(ratio: number): number {
  if (ratio >= 0.7) return 3;
  if (ratio >= 0.3) return 2;
  return 1;
}

/** Độ dài (giây) của một câu. */
export function lineDuration(line: CartoonLine): number {
  return Math.max(0, line.end - line.start);
}

/** Nhãn cấp hiển thị cho bố mẹ chọn phim. */
export const CARTOON_LEVEL_LABEL: Record<CartoonLevel, string> = {
  "tap-noi": "Bé Tập Nói",
  "pre-starters": "Pre-Starters",
  starters: "Starters",
  movers: "Movers",
  flyers: "Flyers",
};

/**
 * Nền thẻ phim để chọn sẵn ở trang quản trị.
 *
 * PHẢI là chuỗi literal viết thẳng ở đây: Tailwind quét mã nguồn để sinh CSS,
 * gradient ghép chuỗi lúc chạy sẽ không có class nào và thẻ phim hiện ra trắng
 * trơn. Muốn thêm màu thì thêm một dòng vào đây, đừng dựng chuỗi động.
 */
export const CARTOON_COVERS: readonly string[] = [
  "from-violet-300 via-fuchsia-400 to-rose-400",
  "from-sky-300 via-blue-400 to-indigo-400",
  "from-amber-300 via-orange-400 to-rose-400",
  "from-lime-300 via-green-400 to-emerald-400",
  "from-pink-300 via-rose-400 to-orange-400",
  "from-cyan-300 via-teal-400 to-emerald-400",
  "from-indigo-300 via-violet-400 to-purple-400",
  "from-yellow-300 via-amber-400 to-orange-400",
];

/** Emoji gợi ý cho thẻ phim — bé chọn phim bằng hình trước khi đọc chữ. */
export const CARTOON_EMOJIS: readonly string[] = [
  "🎬", "🐷", "🐶", "🐱", "🐻", "🚂", "🦖", "🐟",
  "🚗", "🌈", "⭐", "🎈", "🦄", "🐝", "🍎", "🏰",
];

/** Thứ tự cấp — phim dễ lên trước trong danh sách. */
export const CARTOON_LEVEL_ORDER: CartoonLevel[] = [
  "tap-noi",
  "pre-starters",
  "starters",
  "movers",
  "flyers",
];

/**
 * Hằng số hiển thị của khu "Xem hoạt hình".
 *
 * Gom một chỗ để trang danh sách, trình chơi và điều hướng dùng chung — cùng
 * cách làm với `FIRST_WORDS_LEVEL`.
 */
export const CARTOON_SECTION = {
  href: "/hoat-hinh",
  label: "Xem hoạt hình",
  labelEn: "Watch & Repeat",
  sub: "Xem phim rồi nói theo nhân vật",
  emoji: "🍿",
  hero: "from-violet-500 via-fuchsia-500 to-rose-500",
  cardCover: "from-violet-300 via-fuchsia-400 to-rose-400",
} as const;
