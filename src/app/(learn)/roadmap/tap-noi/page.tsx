import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { FirstWordsMap, type UnitProgressDTO } from "@/components/learn/first-words/first-words-map";
import { FIRST_WORDS_UNITS, FIRST_WORDS_LEVEL } from "@/lib/first-words";

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

export default async function FirstWordsMapPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const rows = await db.firstWordsProgress.findMany({
    where: { userId: session.user.id },
    select: { unitId: true, bestStars: true, wordsSaid: true },
  });

  const progress: Record<string, UnitProgressDTO> = {};
  for (const r of rows) {
    progress[r.unitId] = { bestStars: r.bestStars, wordsSaid: r.wordsSaid };
  }

  return <FirstWordsMap units={FIRST_WORDS_UNITS} progress={progress} />;
}
