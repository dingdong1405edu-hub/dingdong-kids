"use server";
// Lưu tiến độ phần GHÉP VẦN (Phonics). Bài học là dữ liệu TĨNH trong
// @/lib/phonics-lessons (không nằm DB) nên chỉ có tiến độ của bé được lưu —
// model PhonicsProgress, khoá theo (userId, lessonId).
//
// Cùng khuôn với `completeLessonAction` (@/server/actions/lesson.ts): xác thực
// bằng auth(), kiểm tra đầu vào bằng zod, luôn trả { ok, error } và ghi một bản
// Attempt để thống kê.
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Skill, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getEntitlements } from "@/lib/entitlements";
import { effectiveHearts, MAX_HEARTS } from "@/lib/hearts";
import { getPhonicsLesson } from "@/lib/phonics-lessons";

/** XP tối đa cho một bài ghép vần (đạt 100% mới lấy đủ). */
const MAX_XP_PER_LESSON = 20;

const schema = z.object({
  lessonId: z.string().min(1),
  /** % số thẻ có tính điểm mà bé làm đúng ngay lần đầu (0–100). */
  score: z.number().int().min(0).max(100),
  durationSec: z.number().int().min(0).optional(),
});

export async function completePhonicsLessonAction(params: z.infer<typeof schema>) {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Unauthorized" };

  const parsed = schema.safeParse(params);
  if (!parsed.success) return { ok: false, error: "Invalid input" };

  const { lessonId, score, durationSec } = parsed.data;
  // Bài học là dữ liệu tĩnh — chặn id lạ để không sinh bản ghi tiến độ rác.
  if (!getPhonicsLesson(lessonId)) return { ok: false, error: "Lesson not found" };

  const userId = session.user.id;
  const xpForThisScore = Math.round((score / 100) * MAX_XP_PER_LESSON);

  try {
    const [existing, user, ent] = await Promise.all([
      db.phonicsProgress.findUnique({
        where: { userId_lessonId: { userId, lessonId } },
        select: { bestScore: true, xpEarned: true },
      }),
      db.user.findUnique({
        where: { id: userId },
        select: { hearts: true, heartsUpdatedAt: true },
      }),
      getEntitlements(userId, (session.user as { role?: string }).role),
    ]);
    if (!user) return { ok: false, error: "User not found" };

    // Điểm cao nhất chỉ ĐI LÊN — chơi lại điểm thấp hơn không xoá thành tích cũ.
    const bestScore = Math.max(existing?.bestScore ?? 0, score);
    // XP cũng chỉ cộng phần CHÊNH so với lần tốt nhất trước đó, nếu không bé chơi
    // đi chơi lại một bài là "cày" được XP vô hạn.
    const xpTotal = Math.max(existing?.xpEarned ?? 0, xpForThisScore);
    const xpAwarded = xpTotal - (existing?.xpEarned ?? 0);

    // Tim: phần Ghép vần dành cho bé 4–7 tuổi nên KHÔNG trừ tim khi chọn sai —
    // sai ở đây là chuyện bình thường khi mới nhận mặt chữ. Nhưng làm đúng trọn
    // bài thì vẫn được TẶNG 1 tim như các luồng học khác (người trả phí/admin có
    // tim không giới hạn nên bỏ qua).
    const heartData: Prisma.UserUpdateInput = {};
    if (!ent.unlimitedHearts && score === 100) {
      const now = new Date();
      const current = effectiveHearts(user.hearts, user.heartsUpdatedAt, now);
      heartData.hearts = { set: Math.min(MAX_HEARTS, current + 1) };
      heartData.heartsUpdatedAt = now;
    }

    await db.$transaction([
      db.phonicsProgress.upsert({
        where: { userId_lessonId: { userId, lessonId } },
        update: {
          completed: true,
          bestScore,
          xpEarned: xpTotal,
          attempts: { increment: 1 },
        },
        create: {
          userId,
          lessonId,
          completed: true,
          bestScore,
          xpEarned: xpTotal,
          attempts: 1,
        },
      }),
      db.attempt.create({
        data: {
          userId,
          skill: Skill.PHONICS,
          refId: lessonId,
          rawAnswer: { score },
          score,
          durationSec,
        },
      }),
      db.user.update({
        where: { id: userId },
        data: { xp: { increment: xpAwarded }, lastActiveAt: new Date(), ...heartData },
      }),
    ]);

    revalidatePath("/phonics");
    return { ok: true, xpEarned: xpAwarded, bestScore, heartGift: score === 100 };
  } catch {
    return { ok: false, error: "DB error" };
  }
}
