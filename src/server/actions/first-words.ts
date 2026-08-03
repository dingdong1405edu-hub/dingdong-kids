"use server";
// Lưu tiến độ cấp "Bé Tập Nói" (trước Pre-Starters). Chủ đề là dữ liệu TĨNH
// trong @/lib/first-words nên chỉ tiến độ của bé được lưu — model
// FirstWordsProgress, khoá theo (userId, unitId).
//
// NGUỒN SỰ THẬT là `wordStars`: sao cao nhất của TỪNG từ, cùng thứ tự với mảng
// `words` của chủ đề. `bestStars` / `wordsSaid` chỉ là số tổng tính sẵn. Lưu
// theo từng từ mới trả lời được câu hỏi mà phụ huynh trả tiền để biết: "con tôi
// đang vướng từ nào?" — và mới dựng được bài ôn đúng chỗ bé vấp.
//
// Cùng khuôn với `completePhonicsLessonAction` (@/server/actions/phonics.ts):
// xác thực bằng auth(), kiểm tra đầu vào bằng zod, luôn trả { ok, error } và ghi
// một bản Attempt để thống kê.
//
// KHÁC một điểm quan trọng: cấp này MIỄN PHÍ hoàn toàn và KHÔNG trừ tim. Đây là
// cửa ngõ cho bé 3–5 tuổi — chặn bé lại vì hết tim ở màn tập nói đầu tiên thì bé
// (và bố mẹ) sẽ không quay lại nữa.
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Skill, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getEntitlements } from "@/lib/entitlements";
import { effectiveHearts, MAX_HEARTS } from "@/lib/hearts";
import {
  getFirstWordsUnit,
  locateFirstWord,
  maxStarsOf,
  STARS_PER_WORD,
  XP_PER_UNIT,
} from "@/lib/first-words";

/** Sao mỗi từ: 0 = chưa thử. Client gửi đúng một phần tử cho mỗi từ của chủ đề. */
const starsSchema = z.array(z.number().int().min(0).max(STARS_PER_WORD)).max(64);

const unitSchema = z.object({
  unitId: z.string().min(1),
  wordStars: starsSchema,
  durationSec: z.number().int().min(0).optional(),
});

/** Đọc cột Json `wordStars` về mảng số có độ dài đúng bằng số từ của chủ đề. */
function readWordStars(raw: Prisma.JsonValue | null | undefined, length: number): number[] {
  const arr = Array.isArray(raw) ? raw : [];
  return Array.from({ length }, (_, i) => {
    const v = arr[i];
    return typeof v === "number" && v > 0 ? Math.min(STARS_PER_WORD, Math.round(v)) : 0;
  });
}

/** Gộp hai mảng sao, giữ giá trị TỐT NHẤT ở từng vị trí. */
function mergeBest(oldStars: number[], newStars: number[]): number[] {
  return oldStars.map((s, i) => Math.max(s, newStars[i] ?? 0));
}

const summarize = (stars: number[]) => ({
  total: stars.reduce((n, s) => n + s, 0),
  said: stars.filter((s) => s >= 2).length,
});

export async function completeFirstWordsUnitAction(params: z.infer<typeof unitSchema>) {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Unauthorized" };

  const parsed = unitSchema.safeParse(params);
  if (!parsed.success) return { ok: false, error: "Invalid input" };

  const { unitId, durationSec } = parsed.data;
  // Chủ đề là dữ liệu tĩnh — chặn id lạ để không sinh bản ghi tiến độ rác.
  const unit = getFirstWordsUnit(unitId);
  if (!unit) return { ok: false, error: "Unit not found" };

  const userId = session.user.id;
  const maxStars = maxStarsOf(unit);
  // Kẹp theo kích thước THẬT của chủ đề: không tin độ dài mảng client gửi lên.
  const runStars = Array.from(
    { length: unit.words.length },
    (_, i) => parsed.data.wordStars[i] ?? 0,
  );

  try {
    const [existing, user, ent] = await Promise.all([
      db.firstWordsProgress.findUnique({
        where: { userId_unitId: { userId, unitId } },
        select: { wordStars: true, xpEarned: true },
      }),
      db.user.findUnique({
        where: { id: userId },
        select: { hearts: true, heartsUpdatedAt: true },
      }),
      getEntitlements(userId, (session.user as { role?: string }).role),
    ]);
    if (!user) return { ok: false, error: "User not found" };

    // Thành tích chỉ ĐI LÊN, xét theo TỪNG TỪ. Bé nói lại một từ mà lần này kém
    // hơn thì không bị tụt — tụt sao là bé không dám thử lại nữa.
    const merged = mergeBest(readWordStars(existing?.wordStars, unit.words.length), runStars);
    const { total: bestStars, said: wordsSaid } = summarize(merged);

    // XP chỉ cộng phần CHÊNH so với lần tốt nhất, nếu không bé chơi lại một chủ
    // đề là "cày" được XP vô hạn.
    const xpTotal = Math.round((bestStars / maxStars) * XP_PER_UNIT);
    const xpAwarded = Math.max(0, xpTotal - (existing?.xpEarned ?? 0));
    const perfect = bestStars === maxStars;

    // Không trừ tim ở cấp này, nhưng nói trọn 3 sao mọi từ thì vẫn được TẶNG 1 tim
    // như các luồng học khác (người trả phí/admin đã có tim ∞ nên bỏ qua).
    const heartData: Prisma.UserUpdateInput = {};
    if (!ent.unlimitedHearts && perfect) {
      const now = new Date();
      const current = effectiveHearts(user.hearts, user.heartsUpdatedAt, now);
      heartData.hearts = { set: Math.min(MAX_HEARTS, current + 1) };
      heartData.heartsUpdatedAt = now;
    }

    const runTotal = runStars.reduce((n, s) => n + s, 0);

    await db.$transaction([
      db.firstWordsProgress.upsert({
        where: { userId_unitId: { userId, unitId } },
        update: {
          completed: true,
          wordStars: merged,
          bestStars,
          wordsSaid,
          xpEarned: Math.max(existing?.xpEarned ?? 0, xpTotal),
          attempts: { increment: 1 },
        },
        create: {
          userId,
          unitId,
          completed: true,
          wordStars: merged,
          bestStars,
          wordsSaid,
          xpEarned: xpTotal,
          attempts: 1,
        },
      }),
      db.attempt.create({
        data: {
          userId,
          skill: Skill.SPEAKING,
          refId: `first-words:${unitId}`,
          rawAnswer: { stars: runTotal, words: unit.words.length },
          score: Math.round((runTotal / maxStars) * 100),
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

// ===== Bài ÔN TỪ KHÓ =====

const reviewSchema = z.object({
  items: z
    .array(z.object({ word: z.string().min(1).max(40), stars: z.number().int().min(0).max(STARS_PER_WORD) }))
    .min(1)
    .max(32),
  durationSec: z.number().int().min(0).optional(),
});

/**
 * Lưu kết quả một lượt ôn. Bài ôn KHÔNG có bản ghi tiến độ riêng: từ nào bé nói
 * tốt hơn thì điểm được ghi thẳng vào chủ đề GỐC của từ đó.
 *
 * Làm vậy vì nếu tạo một hàng "on-tap" riêng thì mọi số tổng (sao toàn cấp, %
 * hoàn thành) sẽ bị đếm hai lần, và báo cáo cho bố mẹ vẫn báo bé yếu ở đúng từ
 * mà bé vừa nói tốt.
 */
export async function saveFirstWordsReviewAction(params: z.infer<typeof reviewSchema>) {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Unauthorized" };

  const parsed = reviewSchema.safeParse(params);
  if (!parsed.success) return { ok: false, error: "Invalid input" };

  const userId = session.user.id;

  // Gom kết quả theo chủ đề gốc; một chủ đề có thể có nhiều từ trong cùng lượt ôn.
  const byUnit = new Map<string, Map<number, number>>();
  for (const item of parsed.data.items) {
    const at = locateFirstWord(item.word);
    if (!at) continue; // từ lạ → bỏ qua, không tin dữ liệu client
    const slots = byUnit.get(at.unitId) ?? new Map<number, number>();
    slots.set(at.index, Math.max(slots.get(at.index) ?? 0, item.stars));
    byUnit.set(at.unitId, slots);
  }
  if (byUnit.size === 0) return { ok: false, error: "No known words" };

  try {
    const rows = await db.firstWordsProgress.findMany({
      where: { userId, unitId: { in: [...byUnit.keys()] } },
      select: { unitId: true, wordStars: true, xpEarned: true },
    });
    const existing = new Map(rows.map((r) => [r.unitId, r]));

    let xpAwarded = 0;
    const writes: Prisma.PrismaPromise<unknown>[] = [];

    for (const [unitId, slots] of byUnit) {
      const unit = getFirstWordsUnit(unitId);
      if (!unit) continue;

      const prev = readWordStars(existing.get(unitId)?.wordStars, unit.words.length);
      const merged = prev.map((s, i) => Math.max(s, slots.get(i) ?? 0));
      const { total: bestStars, said: wordsSaid } = summarize(merged);

      const xpTotal = Math.round((bestStars / maxStarsOf(unit)) * XP_PER_UNIT);
      const prevXp = existing.get(unitId)?.xpEarned ?? 0;
      xpAwarded += Math.max(0, xpTotal - prevXp);

      writes.push(
        db.firstWordsProgress.upsert({
          where: { userId_unitId: { userId, unitId } },
          update: { wordStars: merged, bestStars, wordsSaid, xpEarned: Math.max(prevXp, xpTotal) },
          create: {
            userId,
            unitId,
            completed: true,
            wordStars: merged,
            bestStars,
            wordsSaid,
            xpEarned: xpTotal,
            attempts: 1,
          },
        }),
      );
    }

    const gained = parsed.data.items.reduce((n, i) => n + i.stars, 0);
    writes.push(
      db.attempt.create({
        data: {
          userId,
          skill: Skill.SPEAKING,
          refId: "first-words:review",
          rawAnswer: { words: parsed.data.items.length, stars: gained },
          score: Math.round((gained / (parsed.data.items.length * STARS_PER_WORD)) * 100),
          durationSec: parsed.data.durationSec,
        },
      }),
      db.user.update({
        where: { id: userId },
        data: { xp: { increment: xpAwarded }, lastActiveAt: new Date() },
      }),
    );

    await db.$transaction(writes);

    revalidatePath("/roadmap/tap-noi");
    revalidatePath("/roadmap");
    return { ok: true, xpEarned: xpAwarded, bestStars: gained, heartGift: false };
  } catch {
    return { ok: false, error: "DB error" };
  }
}
