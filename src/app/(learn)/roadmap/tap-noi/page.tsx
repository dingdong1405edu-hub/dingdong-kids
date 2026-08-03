import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { FirstWordsMap, type UnitProgressDTO } from "@/components/learn/first-words/first-words-map";
import { FIRST_WORDS_UNITS, FIRST_WORDS_LEVEL, getFirstWordsUnit } from "@/lib/first-words";
import { roadmapPlanForLevel } from "@/lib/payment-plans";

/**
 * Bản đồ cấp "Bé Tập Nói" — chặng ĐẦU TIÊN của lộ trình, đứng trước Pre-Starters.
 *
 * Route TĨNH nên Next.js ưu tiên nó hơn `/roadmap/[level]` (nơi `slugToLevel`
 * sẽ trả null vì "tap-noi" không phải một EnglishLevel). Cấp này cố ý nằm ngoài
 * enum `EnglishLevel`: nó không có Course, không chia 7 kỹ năng, không bán gói.
 */
export const metadata: Metadata = {
  title: `${FIRST_WORDS_LEVEL.label} — ${FIRST_WORDS_LEVEL.labelEn}`,
  description:
    "Tiếng Anh cho bé 3–5 tuổi chưa biết chữ: nhìn hình, nghe đọc rồi nhắc lại từng từ, AI chấm phát âm.",
};

/** Cột Json `wordStars` → mảng số đúng độ dài chủ đề (dữ liệu cũ có thể rỗng). */
function readWordStars(raw: unknown, length: number): number[] {
  const arr = Array.isArray(raw) ? raw : [];
  return Array.from({ length }, (_, i) => {
    const v = arr[i];
    return typeof v === "number" && v > 0 ? Math.round(v) : 0;
  });
}

export default async function FirstWordsMapPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const rows = await db.firstWordsProgress.findMany({
    where: { userId: session.user.id },
    select: { unitId: true, bestStars: true, wordsSaid: true, wordStars: true },
  });

  const progress: Record<string, UnitProgressDTO> = {};
  for (const r of rows) {
    const unit = getFirstWordsUnit(r.unitId);
    if (!unit) continue; // chủ đề đã bị gỡ khỏi code — bỏ qua bản ghi mồ côi
    progress[r.unitId] = {
      bestStars: r.bestStars,
      wordsSaid: r.wordsSaid,
      wordStars: readWordStars(r.wordStars, unit.words.length),
    };
  }

  return (
    <FirstWordsMap
      units={FIRST_WORDS_UNITS}
      progress={progress}
      childName={session.user.name ?? ""}
      upgradeHref={`/payment?plan=${roadmapPlanForLevel("PRE_STARTERS")?.id ?? ""}`}
    />
  );
}
