"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const saveSchema = z.object({
  word: z.string().trim().min(1).max(64),
  ipa: z.string().trim().max(64),
  meaning: z.string().trim().min(1).max(500),
  level: z.string().max(16).optional(),
  source: z.string().max(64).optional(),
});

/**
 * Lưu một từ vào "Sổ từ" của bé. Idempotent theo (userId, word): lưu lại cùng
 * một từ chỉ cập nhật nghĩa/phiên âm mới nhất. Chỉ nên gọi cho từ đã tra được
 * (client kiểm tra trước khi cho lưu).
 */
export async function saveWordAction(params: z.infer<typeof saveSchema>) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Cần đăng nhập" };

  const parsed = saveSchema.safeParse(params);
  if (!parsed.success) return { ok: false, error: "Dữ liệu không hợp lệ" };

  const { word, ipa, meaning, level, source } = parsed.data;
  try {
    await db.savedWord.upsert({
      where: { userId_word: { userId: session.user.id, word } },
      update: { ipa, meaning, level: level ?? null, source: source ?? null },
      create: { userId: session.user.id, word, ipa, meaning, level: level ?? null, source: source ?? null },
    });
    revalidatePath("/so-tu");
    return { ok: true };
  } catch {
    return { ok: false, error: "Lỗi máy chủ" };
  }
}

export async function removeSavedWordAction(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Cần đăng nhập" };
  try {
    // deleteMany scoped to userId — không cho xoá của người khác dù biết id.
    await db.savedWord.deleteMany({ where: { id, userId: session.user.id } });
    revalidatePath("/so-tu");
    return { ok: true };
  } catch {
    return { ok: false, error: "Lỗi máy chủ" };
  }
}
