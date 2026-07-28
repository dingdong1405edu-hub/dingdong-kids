import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { themeFor } from "@/lib/roadmap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Đếm SỐ TỪ của một đoạn tiếng Anh (bản tiếng Trung trước đây đếm ký tự Hán).
 * Dùng cho bộ đếm realtime ở phần Viết và cho ngưỡng `minWords`.
 */
export function countWords(text: string): number {
  if (!text) return 0;
  const m = text.trim().match(/[A-Za-z0-9'’-]+/g);
  return m ? m.length : 0;
}

/**
 * Tách câu thành các đoạn, đánh dấu mọi lần xuất hiện của `word` để nơi gọi in
 * đậm (dùng để làm nổi từ đang học trong câu ví dụ). Khác bản tiếng Trung ở chỗ
 * tiếng Anh CÓ khoảng trắng nên phải khớp theo RANH GIỚI TỪ — nếu không "cat" sẽ
 * khớp nhầm bên trong "category". Không phân biệt hoa/thường.
 */
export function markWord(sentence: string, word: string): Array<{ text: string; match: boolean }> {
  const w = word.trim();
  if (!w) return [{ text: sentence, match: false }];

  const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let re: RegExp;
  try {
    re = new RegExp(`\\b${escaped}\\b`, "gi");
  } catch {
    return [{ text: sentence, match: false }];
  }

  const out: Array<{ text: string; match: boolean }> = [];
  let last = 0;
  for (const m of sentence.matchAll(re)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push({ text: sentence.slice(last, idx), match: false });
    out.push({ text: m[0], match: true });
    last = idx + m[0].length;
  }
  if (last === 0) return [{ text: sentence, match: false }];
  if (last < sentence.length) out.push({ text: sentence.slice(last), match: false });
  return out;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Nhãn hiển thị của một cấp độ, vd "Movers". Nguồn: src/lib/roadmap.ts. */
export function levelLabel(level: string): string {
  return themeFor(level).label;
}

/** Nhãn đầy đủ kèm độ tuổi, vd "Movers · 7–9 tuổi". */
export function levelLabelWithAge(level: string): string {
  const t = themeFor(level);
  return `${t.label} · ${t.age}`;
}

export function xpToLevel(xp: number): { level: number; progress: number; next: number } {
  const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000];
  let level = 1;
  for (let i = 1; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i + 1;
    else break;
  }
  const current = thresholds[level - 1] ?? 0;
  const next = thresholds[level] ?? thresholds[thresholds.length - 1];
  const progress = next > current ? Math.round(((xp - current) / (next - current)) * 100) : 100;
  return { level, progress, next };
}

/** Class badge đặc màu theo cấp độ (chip cấp trên các thẻ). */
export function levelBadgeClass(level: string): string {
  const map: Record<string, string> = {
    PRE_STARTERS: "bg-amber-500 text-white",
    STARTERS: "bg-emerald-500 text-white",
    MOVERS: "bg-sky-500 text-white",
    FLYERS: "bg-violet-500 text-white",
    KET: "bg-orange-500 text-white",
    PET: "bg-rose-600 text-white",
  };
  return map[level] ?? "bg-zinc-500 text-white";
}

// Ảnh bìa trang trí cho thẻ khi chưa có ảnh tải lên: một dải gradient mềm cộng
// một emoji lớn mờ, chọn tất định theo seed để không nhảy khi tải lại trang.
const COVER_GRADIENTS = [
  "from-rose-400 to-orange-300",
  "from-emerald-400 to-teal-300",
  "from-sky-400 to-indigo-300",
  "from-violet-400 to-fuchsia-300",
  "from-amber-400 to-rose-300",
  "from-teal-400 to-cyan-300",
  "from-indigo-400 to-purple-300",
  "from-red-400 to-amber-300",
];
/** Emoji bìa — thay cho chữ Hán trang trí ở bản cũ. Chọn theo chủ đề trẻ em. */
const COVER_EMOJI = [
  "🐻", "🚀", "🌈", "🎈", "🦊", "🐳", "🎨", "⭐",
  "🍎", "🐤", "🌻", "🎪", "🦁", "🐧", "🎵", "🧩",
];

function seedHash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}
export function coverGradient(seed: string): string {
  return COVER_GRADIENTS[seedHash(seed) % COVER_GRADIENTS.length];
}
export function coverEmoji(seed: string): string {
  return COVER_EMOJI[seedHash(seed + "·") % COVER_EMOJI.length];
}

/**
 * "Lượt làm" hiển thị trên thẻ bài — số lượt cộng đồng ước tính, cố định theo
 * từng đề (tất định theo seed nên không nhảy khi tải lại, và mỗi đề một con số
 * khác nhau cho tự nhiên). Nằm trong khoảng vài chục → vài trăm.
 */
export function socialProofCount(seed: string): number {
  const h = seedHash(seed);
  return 27 + (h % 61) + (seedHash(seed + "#") % 331);
}
