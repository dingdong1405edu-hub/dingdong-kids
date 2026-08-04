"use server";
// Lưu tiến độ khu "Xem hoạt hình" (Trải nghiệm). Phim là dữ liệu TĨNH trong
// @/lib/cartoon-data nên chỉ tiến độ của bé được lưu — model CartoonProgress,
// khoá theo (userId, cartoonId).
//
// NGUỒN SỰ THẬT là `lineStars`: sao cao nhất của TỪNG câu, cùng thứ tự với mảng
// `lines` của phim. `bestStars` / `linesSaid` chỉ là số tổng tính sẵn.
//
// Cùng khuôn với `completeFirstWordsUnitAction` (@/server/actions/first-words.ts):
// xác thực bằng auth(), kiểm đầu vào bằng zod, luôn trả { ok, error } và ghi một
// bản Attempt để thống kê.
//
// KHÁC một điểm: khu Trải nghiệm KHÔNG trừ tim và KHÔNG tặng tim. Đây là chỗ bé
// vào để xem cho vui — chặn bé bằng tim thì mất luôn lý do quay lại app, còn
// tặng tim thì bé cày phim để lấy tim thay vì học lộ trình.
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Skill, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCartoon, maxStarsOf, STARS_PER_LINE, XP_PER_CARTOON } from "@/lib/cartoons";

const schema = z.object({
  cartoonId: z.string().min(1).max(80),
  /** Sao mỗi câu: 0 = bé bỏ qua. Client gửi đúng một phần tử cho mỗi câu. */
  lineStars: z.array(z.number().int().min(0).max(STARS_PER_LINE)).max(200),
  durationSec: z.number().int().min(0).max(60 * 60 * 4).optional(),
});

/** Đọc cột Json `lineStars` về mảng số có độ dài đúng bằng số câu của phim. */
function readLineStars(raw: Prisma.JsonValue | null | undefined, length: number): number[] {
  const arr = Array.isArray(raw) ? raw : [];
  return Array.from({ length }, (_, i) => {
    const v = arr[i];
    return typeof v === "number" && v > 0 ? Math.min(STARS_PER_LINE, Math.round(v)) : 0;
  });
}

export async function completeCartoonAction(params: z.infer<typeof schema>) {
  const session = await auth();
  if (!session?.user) return { ok: false as const, error: "Unauthorized" };

  const parsed = schema.safeParse(params);
  if (!parsed.success) return { ok: false as const, error: "Invalid input" };

  const { cartoonId, durationSec } = parsed.data;
  // Phim là dữ liệu tĩnh — chặn id lạ để không sinh bản ghi tiến độ rác.
  const cartoon = getCartoon(cartoonId);
  if (!cartoon) return { ok: false as const, error: "Cartoon not found" };

  const userId = session.user.id;
  const maxStars = maxStarsOf(cartoon);
  if (maxStars === 0) return { ok: false as const, error: "Cartoon has no lines" };

  // Kẹp theo số câu THẬT của phim: không tin độ dài mảng client gửi lên.
  const runStars = Array.from(
    { length: cartoon.lines.length },
    (_, i) => parsed.data.lineStars[i] ?? 0,
  );

  try {
    const existing = await db.cartoonProgress.findUnique({
      where: { userId_cartoonId: { userId, cartoonId } },
      select: { lineStars: true, xpEarned: true },
    });

    // Thành tích chỉ ĐI LÊN, xét theo TỪNG CÂU. Bé xem lại phim mà lần này nói
    // kém hơn thì không bị tụt — tụt sao là bé không dám thử lại nữa.
    const prev = readLineStars(existing?.lineStars, cartoon.lines.length);
    const merged = prev.map((s, i) => Math.max(s, runStars[i] ?? 0));

    const bestStars = merged.reduce((n, s) => n + s, 0);
    const linesSaid = merged.filter((s) => s >= 2).length;

    // XP chỉ cộng phần CHÊNH so với lần tốt nhất, nếu không xem lại một phim là
    // "cày" được XP vô hạn.
    const xpTotal = Math.round((bestStars / maxStars) * XP_PER_CARTOON);
    const xpAwarded = Math.max(0, xpTotal - (existing?.xpEarned ?? 0));

    const runTotal = runStars.reduce((n, s) => n + s, 0);

    await db.$transaction([
      db.cartoonProgress.upsert({
        where: { userId_cartoonId: { userId, cartoonId } },
        update: {
          completed: true,
          lineStars: merged,
          bestStars,
          linesSaid,
          xpEarned: Math.max(existing?.xpEarned ?? 0, xpTotal),
          attempts: { increment: 1 },
        },
        create: {
          userId,
          cartoonId,
          completed: true,
          lineStars: merged,
          bestStars,
          linesSaid,
          xpEarned: xpTotal,
          attempts: 1,
        },
      }),
      db.attempt.create({
        data: {
          userId,
          skill: Skill.SPEAKING,
          refId: `cartoon:${cartoonId}`,
          rawAnswer: { stars: runTotal, lines: cartoon.lines.length },
          score: Math.round((runTotal / maxStars) * 100),
          durationSec,
        },
      }),
      db.user.update({
        where: { id: userId },
        data: { xp: { increment: xpAwarded }, lastActiveAt: new Date() },
      }),
    ]);

    revalidatePath("/hoat-hinh");
    revalidatePath(`/hoat-hinh/${cartoonId}`);
    return { ok: true as const, xpEarned: xpAwarded, bestStars };
  } catch {
    return { ok: false as const, error: "DB error" };
  }
}
