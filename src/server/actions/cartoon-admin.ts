"use server";
// ===========================================================================
//  GẮN / SỬA / XOÁ PHIM cho khu "Xem hoạt hình" — thao tác của người vận hành.
//
//  Đây là thứ biến khu hoạt hình từ "phải sửa code rồi deploy lại" thành "dán
//  link là xong". Kho tĩnh trong code vẫn còn và vẫn chạy song song (xem
//  @/lib/cartoons-db), nhưng đường thường dùng là đường này.
//
//  Cùng khuôn với các server action quản trị khác: `requireAdminActor()` ở dòng
//  đầu (KHÔNG dựa vào layout /admin — server action là một POST gọi được từ bất
//  kỳ route nào), zod ở boundary, luôn trả { ok, error }, ghi audit log SAU khi
//  mutation thành công.
// ===========================================================================
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminActor } from "@/lib/admin-guard";
import { logAudit } from "@/lib/audit";
import { CARTOON_LEVEL_LABEL, lineDuration } from "@/lib/cartoons";
import { STATIC_CARTOON_IDS } from "@/lib/cartoons-db";

/** Trần độ dài một câu — bé không nhớ nổi câu dài hơn thế để nhắc lại. */
const MAX_LINE_SEC = 12;

const lineSchema = z.object({
  start: z.number().min(0).max(60 * 60 * 6),
  end: z.number().min(0).max(60 * 60 * 6),
  text: z.string().trim().min(1).max(300),
  vi: z.string().trim().max(300).default(""),
});

const cartoonSchema = z.object({
  /** Bỏ trống khi tạo mới. */
  id: z.string().cuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(60)
    // Chỉ chữ thường/số/gạch ngang: slug này đi thẳng vào URL và vào khoá tiến độ.
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang"),
  youtubeId: z.string().trim().regex(/^[\w-]{11}$/, "Mã video YouTube phải là 11 ký tự"),
  title: z.string().trim().min(1).max(120),
  titleEn: z.string().trim().min(1).max(120),
  emoji: z.string().trim().min(1).max(8),
  cover: z
    .string()
    .trim()
    // Phải là class literal, nếu không Tailwind JIT không quét ra và thẻ phim
    // hiện ra trắng trơn.
    .regex(/^from-\S+\s+via-\S+\s+to-\S+$/, 'Nền phải có dạng "from-… via-… to-…"'),
  level: z.enum(["tap-noi", "pre-starters", "starters", "movers", "flyers"]),
  channel: z.string().trim().max(120).default(""),
  published: z.boolean().default(false),
  order: z.number().int().min(0).max(9999).default(0),
  lines: z.array(lineSchema).min(1, "Phim phải có ít nhất một câu").max(200),
});

export type CartoonInput = z.input<typeof cartoonSchema>;

/**
 * Những lỗi mốc thời gian mà zod không bắt được, vì chúng nằm ở QUAN HỆ giữa
 * các câu chứ không ở từng câu. Đúng bộ kiểm mà `npm run content:check` chạy
 * cho kho tĩnh — nội dung vào bằng đường nào cũng phải qua một cửa như nhau.
 */
function checkLines(lines: z.infer<typeof lineSchema>[]): string | null {
  const sorted = [...lines].sort((a, b) => a.start - b.start);
  let prevEnd = -Infinity;
  for (const [i, l] of sorted.entries()) {
    const at = `Câu ${i + 1}`;
    if (l.end <= l.start) return `${at}: mốc kết thúc phải lớn hơn mốc bắt đầu.`;
    if (l.start < prevEnd) return `${at}: chồng lên câu trước (câu trước kết thúc ${prevEnd}s).`;
    if (lineDuration(l) > MAX_LINE_SEC) {
      return `${at}: dài ${lineDuration(l).toFixed(1)}s — quá ${MAX_LINE_SEC}s thì bé không nhắc lại nổi.`;
    }
    prevEnd = l.end;
  }
  return null;
}

/** Tạo mới hoặc cập nhật một bộ phim. */
export async function saveCartoonAction(input: CartoonInput) {
  let actor;
  try {
    ({ actor } = await requireAdminActor());
  } catch {
    return { ok: false as const, error: "Bạn không có quyền thực hiện thao tác này." };
  }

  const parsed = cartoonSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  }
  const data = parsed.data;

  // Slug dùng CHUNG không gian tên với id phim tĩnh — trùng thì hai phim cùng
  // ghi vào một hàng CartoonProgress và số sao của bé trộn vào nhau.
  if (STATIC_CARTOON_IDS.has(data.slug)) {
    return { ok: false as const, error: `Slug "${data.slug}" đã thuộc một phim trong code. Đổi slug khác.` };
  }
  if (!CARTOON_LEVEL_LABEL[data.level]) {
    return { ok: false as const, error: "Cấp không hợp lệ." };
  }

  const lineError = checkLines(data.lines);
  if (lineError) return { ok: false as const, error: lineError };

  const lines = [...data.lines].sort((a, b) => a.start - b.start);
  const payload = {
    slug: data.slug,
    youtubeId: data.youtubeId,
    title: data.title,
    titleEn: data.titleEn,
    emoji: data.emoji,
    cover: data.cover,
    level: data.level,
    channel: data.channel,
    published: data.published,
    order: data.order,
    lines,
  };

  try {
    const before = data.id
      ? await db.cartoon.findUnique({ where: { id: data.id } })
      : null;
    if (data.id && !before) return { ok: false as const, error: "Không tìm thấy phim này." };

    const saved = data.id
      ? await db.cartoon.update({ where: { id: data.id }, data: payload })
      : await db.cartoon.create({ data: payload });

    await logAudit({
      actor,
      action: data.id ? "UPDATE" : "CREATE",
      entity: "Cartoon",
      entityId: saved.id,
      summary: `${data.id ? "Sửa" : "Gắn"} phim hoạt hình «${data.title}» (${lines.length} câu)`,
      before: before ?? undefined,
      after: saved,
    });

    revalidatePath("/admin/hoat-hinh");
    revalidatePath("/hoat-hinh");
    revalidatePath(`/hoat-hinh/${data.slug}`);
    if (before && before.slug !== data.slug) revalidatePath(`/hoat-hinh/${before.slug}`);

    return { ok: true as const, id: saved.id, slug: saved.slug };
  } catch (e) {
    // Vi phạm @unique là lỗi người dùng gây ra được, phải nói rõ chứ không nuốt.
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("Unique constraint")) {
      return {
        ok: false as const,
        error: msg.includes("youtubeId")
          ? "Video này đã được gắn rồi (mỗi video chỉ gắn một lần)."
          : `Slug "${data.slug}" đã có phim khác dùng.`,
      };
    }
    console.error("saveCartoonAction error:", e);
    return { ok: false as const, error: "Không lưu được. Thử lại giúp mình nhé." };
  }
}

const toggleSchema = z.object({ id: z.string().cuid(), published: z.boolean() });

/** Mở / đóng một phim với bé. */
export async function toggleCartoonAction(input: z.infer<typeof toggleSchema>) {
  let actor;
  try {
    ({ actor } = await requireAdminActor());
  } catch {
    return { ok: false as const, error: "Bạn không có quyền thực hiện thao tác này." };
  }

  const parsed = toggleSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Dữ liệu không hợp lệ." };

  try {
    const saved = await db.cartoon.update({
      where: { id: parsed.data.id },
      data: { published: parsed.data.published },
    });
    await logAudit({
      actor,
      action: "UPDATE",
      entity: "Cartoon",
      entityId: saved.id,
      summary: `${parsed.data.published ? "Mở" : "Đóng"} phim hoạt hình «${saved.title}»`,
      after: { published: saved.published },
    });
    revalidatePath("/admin/hoat-hinh");
    revalidatePath("/hoat-hinh");
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "Không đổi được trạng thái." };
  }
}

const deleteSchema = z.object({ id: z.string().cuid() });

/**
 * Xoá một phim.
 *
 * KHÔNG xoá `CartoonProgress` kèm theo: tiến độ khoá theo slug chứ không có
 * khoá ngoại, và giữ lại nghĩa là gắn lại đúng slug đó thì bé thấy nguyên số
 * sao cũ. Xoá nhầm không mất thành tích của bé.
 */
export async function deleteCartoonAction(input: z.infer<typeof deleteSchema>) {
  let actor;
  try {
    ({ actor } = await requireAdminActor());
  } catch {
    return { ok: false as const, error: "Bạn không có quyền thực hiện thao tác này." };
  }

  const parsed = deleteSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Dữ liệu không hợp lệ." };

  try {
    const before = await db.cartoon.findUnique({ where: { id: parsed.data.id } });
    if (!before) return { ok: false as const, error: "Không tìm thấy phim này." };

    await db.cartoon.delete({ where: { id: parsed.data.id } });
    await logAudit({
      actor,
      action: "DELETE",
      entity: "Cartoon",
      entityId: before.id,
      summary: `Xoá phim hoạt hình «${before.title}»`,
      before,
    });

    revalidatePath("/admin/hoat-hinh");
    revalidatePath("/hoat-hinh");
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "Không xoá được." };
  }
}
