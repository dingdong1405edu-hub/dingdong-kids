// ===========================================================================
//  GỘP HAI NGUỒN PHIM của khu "Xem hoạt hình".
//
//   1. Kho TĨNH trong code (@/lib/cartoon-data) — nội dung "chính chủ", theo
//      dõi được bằng git, đi qua `npm run content:check`.
//   2. Kho DB (model `Cartoon`) — phim người vận hành gắn từ /admin/hoat-hinh.
//      Không phải sửa code, không phải deploy lại.
//
//  Cả hai ghi tiến độ vào CÙNG một cột `CartoonProgress.cartoonId`, nên id tĩnh
//  và `slug` trong DB dùng CHUNG một không gian tên. Trùng nhau thì bản tĩnh
//  thắng (nó là nội dung đã qua kiểm duyệt) và bản DB bị bỏ qua — server action
//  chặn từ lúc lưu để chuyện này không xảy ra.
//
//  ⚠️ File này CHỈ được import từ server component / server action / route
//  handler — nó kéo theo Prisma. Component client vẫn phải dùng @/lib/cartoons
//  (thuần dữ liệu tĩnh, không đụng DB).
// ===========================================================================
import { db } from "@/lib/db";
import { CARTOONS, type Cartoon, type CartoonLevel, CARTOON_LEVEL_LABEL } from "@/lib/cartoons";
import type { CartoonLine } from "@/lib/cartoon-data/types";
import type { Prisma } from "@prisma/client";

/** Đọc cột Json `lines` về mảng câu, bỏ mọi phần tử hỏng. */
export function readLines(raw: Prisma.JsonValue | null | undefined): CartoonLine[] {
  if (!Array.isArray(raw)) return [];
  const out: CartoonLine[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const r = item as Record<string, unknown>;
    const start = Number(r.start);
    const end = Number(r.end);
    const text = typeof r.text === "string" ? r.text.trim() : "";
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || !text) continue;
    out.push({ start, end, text, vi: typeof r.vi === "string" ? r.vi.trim() : "" });
  }
  // Trình chơi tua thẳng tới `start` rồi dừng ở `end` — câu phải tăng dần.
  return out.sort((a, b) => a.start - b.start);
}

/** Nhãn cấp lạ trong DB → về mặc định thay vì làm vỡ trang. */
function readLevel(value: string): CartoonLevel {
  return (value in CARTOON_LEVEL_LABEL ? value : "starters") as CartoonLevel;
}

type CartoonRow = {
  slug: string;
  youtubeId: string;
  title: string;
  titleEn: string;
  emoji: string;
  cover: string;
  level: string;
  channel: string;
  published: boolean;
  lines: Prisma.JsonValue;
};

/** Một hàng DB → cùng hình dạng với phim tĩnh, để mọi nơi dùng chung một kiểu. */
export function rowToCartoon(row: CartoonRow): Cartoon {
  return {
    id: row.slug,
    youtubeId: row.youtubeId,
    title: row.title,
    titleEn: row.titleEn,
    emoji: row.emoji,
    cover: row.cover,
    level: readLevel(row.level),
    channel: row.channel,
    published: row.published,
    lines: readLines(row.lines),
  };
}

const SELECT = {
  slug: true,
  youtubeId: true,
  title: true,
  titleEn: true,
  emoji: true,
  cover: true,
  level: true,
  channel: true,
  published: true,
  lines: true,
} as const;

/**
 * Toàn bộ kho phim: tĩnh trước, DB sau.
 *
 * @param opts.publishedOnly chỉ lấy phim đã mở cho bé (mặc định: lấy hết)
 */
export async function listCartoons({ publishedOnly = false } = {}): Promise<Cartoon[]> {
  const rows = await db.cartoon.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: SELECT,
  });

  const staticIds = new Set(CARTOONS.map((c) => c.id));
  const all = [
    ...CARTOONS,
    // Trùng id với phim tĩnh → bỏ bản DB, nếu không hai phim cùng ghi tiến độ
    // vào một hàng và số sao của bé trộn lẫn.
    ...rows.filter((r) => !staticIds.has(r.slug)).map(rowToCartoon),
  ];

  return publishedOnly ? all.filter((c) => c.published) : all;
}

/** Tra một phim theo id/slug ở CẢ HAI nguồn. Bản tĩnh được ưu tiên. */
export async function findCartoon(id: string): Promise<Cartoon | null> {
  const fromCode = CARTOONS.find((c) => c.id === id);
  if (fromCode) return fromCode;

  const row = await db.cartoon.findUnique({ where: { slug: id }, select: SELECT });
  return row ? rowToCartoon(row) : null;
}

/** Phim kế tiếp trong danh sách ĐÃ MỞ (null nếu đang ở phim cuối). */
export async function findNextCartoon(id: string): Promise<Cartoon | null> {
  const open = await listCartoons({ publishedOnly: true });
  const i = open.findIndex((c) => c.id === id);
  return i >= 0 ? (open[i + 1] ?? null) : null;
}

/** Những id đã bị chiếm bởi kho tĩnh — server action dùng để chặn trùng slug. */
export const STATIC_CARTOON_IDS: ReadonlySet<string> = new Set(CARTOONS.map((c) => c.id));
