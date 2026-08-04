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
 * màu riêng, đi từ ẤM (nhỏ tuổi) sang SÂU (lớn tuổi).
 *
 * Dùng hệ `brand-*` / `band-*` của hệ thiết kế (xem DESIGN-SYSTEM.md §2) chứ
 * KHÔNG dùng bảng màu mặc định của Tailwind: `brand-*` bọc biến CSS nên tự dịu
 * lại ở chế độ tối, còn `amber-400`/`sky-500`… thì không biết tới chế độ tối.
 *
 * ⚠️ Mọi giá trị phải là chuỗi class VIẾT ĐỦ, không ghép chuỗi động — JIT chỉ
 * quét văn bản nguồn, ghép chuỗi là màu biến mất ở bản production mà không có
 * lỗi nào báo ra.
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
  /**
   * Gờ 3D phía dưới node. Viết bằng `hsl(...)` literal tối hơn mặt node một
   * bậc — bảng `brand-*` không có bậc đậm, và ở chế độ tối `brand-*` còn SÁNG
   * lên nên gờ sẽ biến mất. Gờ tối cố định thì nút vẫn nổi khối ở cả hai chế độ
   * (cùng cách làm với `--edge` của <Button>).
   */
  nodeBase: string;
  /** Đổ bóng phát sáng cho node hiện tại. */
  glow: string;
  /** Màu nét vẽ đường đi đã hoàn thành (mã màu SVG, không phải class). */
  pathColor: string;
}

export const COURSE_THEME: Record<Level, CourseTheme> = {
  /** 🌱 Thế giới MẬT ONG — ấm nhất, dành cho bé nhỏ nhất. */
  PRE_STARTERS: {
    label: "Pre-Starters",
    sub: "Bé làm quen",
    age: "4–5 tuổi",
    emoji: "🌱",
    cardCover: "from-brand-yellow via-brand-honey to-brand-sun",
    hero: "from-brand-sun to-brand-gold",
    accentText: "text-brand-gold",
    accentBg: "bg-brand-gold",
    accentSoft: "bg-band-yel",
    accentBorder: "border-brand-honey/45",
    ring: "ring-brand-yellow",
    nodeFace: "bg-gradient-to-b from-brand-yellow to-brand-sun",
    nodeBase: "bg-[hsl(36_92%_34%)]",
    glow: "shadow-brand-sun/40",
    pathColor: "#FFA51F",
  },
  /** 🐣 Thế giới XANH LÁ — gà con vàng chuyển sang bạc hà. */
  STARTERS: {
    label: "Starters",
    sub: "Khởi động",
    age: "6–7 tuổi",
    emoji: "🐣",
    cardCover: "from-brand-yellow via-brand-lime to-brand-teal",
    hero: "from-brand-lime to-brand-teal",
    // brand-lime quá nhạt để làm CHỮ trên nền sáng → chữ xanh lá dùng brand-teal.
    accentText: "text-brand-teal",
    accentBg: "bg-brand-teal",
    accentSoft: "bg-band-mint",
    accentBorder: "border-brand-lime/45",
    ring: "ring-brand-lime",
    nodeFace: "bg-gradient-to-b from-brand-lime to-brand-teal",
    nodeBase: "bg-[hsl(168_78%_24%)]",
    glow: "shadow-brand-lime/40",
    pathColor: "#4CD473",
  },
  /** 🚀 Thế giới TRỜI XANH — bay lên khỏi mặt đất. */
  MOVERS: {
    label: "Movers",
    sub: "Tiến bước",
    age: "7–9 tuổi",
    emoji: "🚀",
    cardCover: "from-brand-teal via-brand-sky to-brand-blue",
    hero: "from-brand-sky to-brand-blue",
    accentText: "text-brand-sky",
    accentBg: "bg-brand-sky",
    accentSoft: "bg-band-sky",
    accentBorder: "border-brand-sky/45",
    ring: "ring-brand-sky",
    nodeFace: "bg-gradient-to-b from-brand-sky to-brand-blue",
    nodeBase: "bg-[hsl(214_78%_36%)]",
    glow: "shadow-brand-sky/40",
    pathColor: "#25AEF5",
  },
  /** 🦋 Thế giới SAN HÔ – HỒNG — cánh bướm rực rỡ. */
  FLYERS: {
    label: "Flyers",
    sub: "Bay cao",
    age: "9–11 tuổi",
    emoji: "🦋",
    cardCover: "from-brand-honey via-brand-coral to-brand-pink",
    hero: "from-brand-coral to-brand-pink",
    accentText: "text-brand-pink",
    accentBg: "bg-brand-pink",
    accentSoft: "bg-band-coral",
    accentBorder: "border-brand-coral/45",
    ring: "ring-brand-pink",
    nodeFace: "bg-gradient-to-b from-brand-coral to-brand-pink",
    nodeBase: "bg-[hsl(340_78%_42%)]",
    glow: "shadow-brand-pink/40",
    pathColor: "#FF6B5A",
  },
  /** 🔑 Thế giới TÍM NHO — bắt đầu ra dáng "học sinh lớn". */
  KET: {
    label: "Key (A2)",
    sub: "Vững vàng",
    age: "11–13 tuổi",
    emoji: "🔑",
    cardCover: "from-brand-pink via-brand-grape to-brand-blue",
    hero: "from-brand-grape to-brand-blue",
    accentText: "text-brand-grape",
    accentBg: "bg-brand-grape",
    accentSoft: "bg-band-lav",
    accentBorder: "border-brand-grape/45",
    ring: "ring-brand-grape",
    nodeFace: "bg-gradient-to-b from-brand-grape to-brand-blue",
    nodeBase: "bg-[hsl(261_62%_42%)]",
    glow: "shadow-brand-grape/40",
    pathColor: "#8B4EFF",
  },
  /** 🏆 Thế giới BIỂN SÂU — trầm và chín chắn nhất lộ trình. */
  PET: {
    label: "Preliminary (B1)",
    sub: "Chinh phục",
    age: "13–15 tuổi",
    emoji: "🏆",
    cardCover: "from-brand-grape via-brand-blue to-brand-teal",
    hero: "from-brand-blue to-brand-teal",
    accentText: "text-brand-blue",
    accentBg: "bg-brand-blue",
    accentSoft: "bg-band-sky",
    accentBorder: "border-brand-blue/45",
    ring: "ring-brand-blue",
    nodeFace: "bg-gradient-to-b from-brand-teal to-brand-blue",
    nodeBase: "bg-[hsl(196_84%_24%)]",
    glow: "shadow-brand-blue/40",
    pathColor: "#3D6FE0",
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

/**
 * Mỗi kỹ năng một sắc `brand-*` riêng để bé nhận ra bằng MÀU trước khi đọc chữ.
 * Nền chip dùng chính màu đó ở độ mờ 15% (`/15`) nên tự hoà theo nền sáng/tối,
 * không cần cặp `dark:` viết tay.
 */
export const SKILL_META: SkillMeta[] = [
  { key: "VOCAB", label: "Từ vựng", labelEn: "Vocabulary", icon: BookOpen, iconBg: "bg-brand-teal/15", iconText: "text-brand-teal" },
  { key: "PHONICS", label: "Ghép vần", labelEn: "Phonics", icon: AudioLines, iconBg: "bg-brand-gold/15", iconText: "text-brand-gold" },
  { key: "GRAMMAR", label: "Ngữ pháp", labelEn: "Grammar", icon: SpellCheck, iconBg: "bg-brand-blue/15", iconText: "text-brand-blue" },
  { key: "READING", label: "Đọc", labelEn: "Reading", icon: BookText, iconBg: "bg-brand-coral/15", iconText: "text-brand-coral" },
  { key: "LISTENING", label: "Nghe", labelEn: "Listening", icon: Headphones, iconBg: "bg-brand-grape/15", iconText: "text-brand-grape" },
  { key: "WRITING", label: "Viết", labelEn: "Writing", icon: PenLine, iconBg: "bg-brand-sky/15", iconText: "text-brand-sky" },
  { key: "SPEAKING", label: "Nói", labelEn: "Speaking", icon: Mic, iconBg: "bg-brand-pink/15", iconText: "text-brand-pink" },
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
