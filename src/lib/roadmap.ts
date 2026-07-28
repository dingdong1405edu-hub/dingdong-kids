import {
  BookOpen,
  SpellCheck,
  Headphones,
  Mic,
  BookText,
  PenLine,
  AudioLines,
  type LucideIcon,
} from "lucide-react";

/**
 * Cấu hình hiển thị cho phần "Học theo lộ trình" (bản đồ kiểu Duolingo).
 * Tách phần trình bày (theme, icon kỹ năng) khỏi dữ liệu DB để dùng được ở cả
 * server lẫn client. KHÔNG import @prisma/client ở đây — cấp độ chỉ là chuỗi
 * nên dùng union string cho gọn và an toàn cho client bundle.
 */

export const LEVELS = [
  "PRE_STARTERS",
  "STARTERS",
  "MOVERS",
  "FLYERS",
  "KET",
  "PET",
] as const;
export type Level = (typeof LEVELS)[number];

/** Thứ tự tăng dần để so sánh cấp (số lớn hơn = khó hơn). */
export const LEVEL_ORDER: Record<Level, number> = {
  PRE_STARTERS: 0,
  STARTERS: 1,
  MOVERS: 2,
  FLYERS: 3,
  KET: 4,
  PET: 5,
};

/**
 * `chapterOrder` "ảo" cho bài CHƯA phân chương — đủ lớn để luôn xếp SAU mọi
 * chương thật (chương thật đánh số 1..n). Nhờ vậy khi sắp theo
 * (chapterOrder, order) các bài lẻ gom thành nhóm "Chưa phân chương" ở cuối.
 */
export const UNCHAPTERED_ORDER = 999999;

export type SkillKey =
  | "VOCAB"
  | "PHONICS"
  | "GRAMMAR"
  | "READING"
  | "LISTENING"
  | "WRITING"
  | "SPEAKING";

/**
 * Theme từng khoá — toàn class Tailwind dạng literal để JIT quét được.
 * Bảng màu theo hướng TƯƠI SÁNG, VUI MẮT cho trẻ nhỏ: mỗi cấp là một "thế giới"
 * màu riêng, đi từ ấm (nhỏ tuổi) sang lạnh/sâu (lớn tuổi).
 */
export interface CourseTheme {
  label: string; // "Starters"
  /** Nhãn phụ tiếng Việt hiện dưới tên cấp. */
  sub: string;
  /** Độ tuổi gợi ý. */
  age: string;
  /** Emoji trang trí (thay chữ số Hán ở bản cũ). */
  emoji: string;
  /** Cover thẻ "thế giới" ở trang chọn khóa. */
  cardCover: string;
  /** Banner đầu trang map. */
  hero: string;
  accentText: string;
  accentBg: string;
  accentSoft: string;
  accentBorder: string;
  /** Vòng nhấp nháy quanh node đang học. */
  ring: string;
  /** Mặt node (nút tròn). */
  nodeFace: string;
  /** Gờ 3D phía dưới node. */
  nodeBase: string;
  /** Đổ bóng phát sáng cho node hiện tại. */
  glow: string;
  /** Màu nét vẽ đường đi đã hoàn thành (mã màu SVG, không phải class). */
  pathColor: string;
}

export const COURSE_THEME: Record<Level, CourseTheme> = {
  PRE_STARTERS: {
    label: "Pre-Starters",
    sub: "Bé làm quen",
    age: "4–5 tuổi",
    emoji: "🌱",
    cardCover: "from-amber-300 via-yellow-400 to-orange-400",
    hero: "from-amber-400 to-orange-500",
    accentText: "text-amber-600",
    accentBg: "bg-amber-500",
    accentSoft: "bg-amber-50",
    accentBorder: "border-amber-200",
    ring: "ring-amber-300",
    nodeFace: "bg-gradient-to-b from-amber-300 to-amber-500",
    nodeBase: "bg-amber-700",
    glow: "shadow-amber-500/40",
    pathColor: "#f59e0b",
  },
  STARTERS: {
    label: "Starters",
    sub: "Khởi động",
    age: "6–7 tuổi",
    emoji: "🐣",
    cardCover: "from-lime-300 via-green-400 to-emerald-500",
    hero: "from-green-500 to-emerald-600",
    accentText: "text-emerald-600",
    accentBg: "bg-emerald-500",
    accentSoft: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    ring: "ring-emerald-300",
    nodeFace: "bg-gradient-to-b from-green-400 to-emerald-500",
    nodeBase: "bg-emerald-700",
    glow: "shadow-emerald-500/40",
    pathColor: "#10b981",
  },
  MOVERS: {
    label: "Movers",
    sub: "Tiến bước",
    age: "7–9 tuổi",
    emoji: "🚀",
    cardCover: "from-sky-300 via-sky-400 to-blue-500",
    hero: "from-sky-500 to-blue-600",
    accentText: "text-sky-600",
    accentBg: "bg-sky-500",
    accentSoft: "bg-sky-50",
    accentBorder: "border-sky-200",
    ring: "ring-sky-300",
    nodeFace: "bg-gradient-to-b from-sky-400 to-sky-500",
    nodeBase: "bg-sky-700",
    glow: "shadow-sky-500/40",
    pathColor: "#0ea5e9",
  },
  FLYERS: {
    label: "Flyers",
    sub: "Bay cao",
    age: "9–11 tuổi",
    emoji: "🦋",
    cardCover: "from-violet-300 via-violet-400 to-purple-500",
    hero: "from-violet-500 to-purple-600",
    accentText: "text-violet-600",
    accentBg: "bg-violet-500",
    accentSoft: "bg-violet-50",
    accentBorder: "border-violet-200",
    ring: "ring-violet-300",
    nodeFace: "bg-gradient-to-b from-violet-400 to-violet-500",
    nodeBase: "bg-violet-700",
    glow: "shadow-violet-500/40",
    pathColor: "#8b5cf6",
  },
  KET: {
    label: "Key (A2)",
    sub: "Vững vàng",
    age: "11–13 tuổi",
    emoji: "🔑",
    cardCover: "from-orange-300 via-orange-400 to-rose-500",
    hero: "from-orange-500 to-rose-500",
    accentText: "text-orange-600",
    accentBg: "bg-orange-500",
    accentSoft: "bg-orange-50",
    accentBorder: "border-orange-200",
    ring: "ring-orange-300",
    nodeFace: "bg-gradient-to-b from-orange-400 to-orange-500",
    nodeBase: "bg-orange-700",
    glow: "shadow-orange-500/40",
    pathColor: "#f97316",
  },
  PET: {
    label: "Preliminary (B1)",
    sub: "Chinh phục",
    age: "13–15 tuổi",
    emoji: "🏆",
    cardCover: "from-rose-300 via-rose-400 to-pink-600",
    hero: "from-rose-500 to-pink-600",
    accentText: "text-rose-600",
    accentBg: "bg-rose-500",
    accentSoft: "bg-rose-50",
    accentBorder: "border-rose-200",
    ring: "ring-rose-300",
    nodeFace: "bg-gradient-to-b from-rose-400 to-rose-500",
    nodeBase: "bg-rose-700",
    glow: "shadow-rose-500/40",
    pathColor: "#f43f5e",
  },
};

/** Các kỹ năng trong mỗi bài lộ trình, theo thứ tự hiển thị. */
export interface SkillMeta {
  key: SkillKey;
  label: string;
  /** Nhãn tiếng Anh hiện nhỏ dưới nhãn tiếng Việt. */
  labelEn: string;
  icon: LucideIcon;
  iconBg: string;
  iconText: string;
}

export const SKILL_META: SkillMeta[] = [
  { key: "VOCAB", label: "Từ vựng", labelEn: "Vocabulary", icon: BookOpen, iconBg: "bg-emerald-100", iconText: "text-emerald-600" },
  { key: "PHONICS", label: "Ghép vần", labelEn: "Phonics", icon: AudioLines, iconBg: "bg-amber-100", iconText: "text-amber-600" },
  { key: "GRAMMAR", label: "Ngữ pháp", labelEn: "Grammar", icon: SpellCheck, iconBg: "bg-sky-100", iconText: "text-sky-600" },
  { key: "READING", label: "Đọc", labelEn: "Reading", icon: BookText, iconBg: "bg-orange-100", iconText: "text-orange-600" },
  { key: "LISTENING", label: "Nghe", labelEn: "Listening", icon: Headphones, iconBg: "bg-violet-100", iconText: "text-violet-600" },
  { key: "WRITING", label: "Viết", labelEn: "Writing", icon: PenLine, iconBg: "bg-teal-100", iconText: "text-teal-600" },
  { key: "SPEAKING", label: "Nói", labelEn: "Speaking", icon: Mic, iconBg: "bg-rose-100", iconText: "text-rose-600" },
];

/** "PRE_STARTERS" → "pre-starters" (dùng cho URL). */
export function levelToSlug(level: string): string {
  return level.toLowerCase().replace(/_/g, "-");
}

/** "pre-starters" → "PRE_STARTERS". Trả null nếu slug không hợp lệ. */
export function slugToLevel(slug: string): Level | null {
  const upper = slug.toUpperCase().replace(/-/g, "_");
  return (LEVELS as readonly string[]).includes(upper) ? (upper as Level) : null;
}

export function isLevel(value: string): value is Level {
  return (LEVELS as readonly string[]).includes(value);
}

/** Theme an toàn (fallback về cấp thấp nhất nếu cấp không hợp lệ). */
export function themeFor(level: string): CourseTheme {
  return isLevel(level) ? COURSE_THEME[level] : COURSE_THEME.PRE_STARTERS;
}

/** Nhãn hiển thị ngắn của một cấp, vd "Movers". */
export function levelLabel(level: string): string {
  return themeFor(level).label;
}

// ===== DTO truyền từ server → client (đã serialize, không chứa Date/Prisma) =====

// done = đã xong · current = bài kế tiếp đang mở (có hiệu ứng "Bắt đầu") ·
// available = mở sẵn nhưng chưa học · locked = khoá.
export type LessonStatus = "done" | "current" | "available" | "locked";

export interface RoadmapSectionDTO {
  skill: SkillKey;
  published: boolean;
}

export interface RoadmapLessonDTO {
  id: string;
  order: number;
  topic: string;
  topicVi: string;
  icon: string | null;
  description: string | null;
  chapter: string | null;
  chapterOrder: number;
  xpReward: number;
  completed: boolean;
  skillsDone: SkillKey[];
  sections: RoadmapSectionDTO[];
  /** Khoá vì chưa mua gói lộ trình cấp này (ngoài N bài xem trước miễn phí). */
  accessLocked: boolean;
}
