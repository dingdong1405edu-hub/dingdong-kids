"use server";
// Lưu tiến độ cấp "Bé Tập Nói" (trước Pre-Starters). Chủ đề là dữ liệu TĨNH
// trong @/lib/first-words nên chỉ tiến độ của bé được lưu — model
// FirstWordsProgress, khoá theo (userId, unitId).
//
// Cùng khuôn với `completePhonicsLessonAction` (@/server/actions/phonics.ts):
// xác thực bằng auth(), kiểm tra đầu vào bằng zod, luôn trả { ok, error } và ghi
// một bản Attempt để thống kê.
//
// KHÁC một điểm quan trọng: cấp này MIỄN PHÍ hoàn toàn và KHÔNG trừ tim. Đây là
// cửa ngõ cho bé 3–5 tuổi — chặn bé lại vì hết tim ở màn tập nói từ đầu tiên thì
// bé (và bố mẹ) sẽ không quay lại nữa.
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Skill, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getEntitlements } from "@/lib/entitlements";
import { effectiveHearts, MAX_HEARTS } from "@/lib/hearts";
import { getFirstWordsUnit, maxStarsOf, XP_PER_UNIT } from "@/lib/first-words";

const schema = z.object({
  unitId: z.string().min(1),
  /** Tổng sao bé đạt trong lượt này. */
  stars: z.number().int().min(0).max(100),
  /** Số từ bé nói được (≥ 2 sao) trong lượt này. */
  wordsSaid: z.number().int().min(0).max(100),
  durationSec: z.number().int().min(0).optional(),
});

export async function completeFirstWordsUnitAction(params: z.infer<typeof schema>) {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Unauthorized" };

  const parsed = schema.safeParse(params);
  if (!parsed.success) return { ok: false, error: "Invalid input" };

  const { unitId, durationSec } = parsed.data;
  // Chủ đề là dữ liệu tĩnh — chặn id lạ để không sinh bản ghi tiến độ rác.
  const unit = getFirstWordsUnit(unitId);
  if (!unit) return { ok: false, error: "Unit not found" };

  // Kẹp theo kích thước THẬT của chủ đề: client có thể gửi số cao hơn số từ.
  const maxStars = maxStarsOf(unit);
  const stars = Math.min(parsed.data.stars, maxStars);
  const wordsSaid = Math.min(parsed.data.wordsSaid, unit.words.length);

  const userId = session.user.id;
  const xpForThisRun = Math.round((stars / maxStars) * XP_PER_UNIT);
  const perfect = stars === maxStars;

  try {
    const [existing, user, ent] = await Promise.all([
      db.firstWordsProgress.findUnique({
        where: { userId_unitId: { userId, unitId } },
        select: { bestStars: true, wordsSaid: true, xpEarned: true },
      }),
      db.user.findUnique({
        where: { id: userId },
        select: { hearts: true, heartsUpdatedAt: true },
      }),
      getEntitlements(userId, (session.user as { role?: string }).role),
    ]);
    if (!user) return { ok: false, error: "User not found" };

    // Thành tích chỉ ĐI LÊN — chơi lại kém hơn không xoá kết quả cũ.
    const bestStars = Math.max(existing?.bestStars ?? 0, stars);
    const bestWords = Math.max(existing?.wordsSaid ?? 0, wordsSaid);
    // XP chỉ cộng phần CHÊNH so với lần tốt nhất, nếu không bé chơi lại một chủ
    // đề là "cày" được XP vô hạn.
    const xpTotal = Math.max(existing?.xpEarned ?? 0, xpForThisRun);
    const xpAwarded = xpTotal - (existing?.xpEarned ?? 0);

    // Không trừ tim ở cấp này, nhưng nói trọn 3 sao mọi từ thì vẫn được TẶNG 1 tim
    // như các luồng học khác (người trả phí/admin đã có tim ∞ nên bỏ qua).
    const heartData: Prisma.UserUpdateInput = {};
    if (!ent.unlimitedHearts && perfect) {
      const now = new Date();
      const current = effectiveHearts(user.hearts, user.heartsUpdatedAt, now);
      heartData.hearts = { set: Math.min(MAX_HEARTS, current + 1) };
      heartData.heartsUpdatedAt = now;
    }

    await db.$transaction([
      db.firstWordsProgress.upsert({
        where: { userId_unitId: { userId, unitId } },
        update: {
          completed: true,
          bestStars,
          wordsSaid: bestWords,
          xpEarned: xpTotal,
          attempts: { increment: 1 },
        },
        create: {
          userId,
          unitId,
          completed: true,
          bestStars,
          wordsSaid: bestWords,
          xpEarned: xpTotal,
          attempts: 1,
        },
      }),
      db.attempt.create({
        data: {
          userId,
          skill: Skill.SPEAKING,
          refId: `first-words:${unitId}`,
          rawAnswer: { stars, wordsSaid, total: unit.words.length },
          score: Math.round((stars / maxStars) * 100),
          durationSec,
        },
      }),
      db.user.update({
        where: { id: userId },
        data: { xp: { increment: xpAwarded }, lastActiveAt: new Date(), ...heartData },
      }),
    ]);

    revalidatePath("/roadmap/tap-noi");
    revalidatePath("/roadmap");
    return { ok: true, xpEarned: xpAwarded, bestStars, heartGift: perfect };
  } catch {
    return { ok: false, error: "DB error" };
  }
}
