import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { GameArcade, type ArcadePack } from "@/components/learn/games/game-arcade";
import type { VocabWordCard } from "@/types";

export const metadata: Metadata = {
  title: "Sân chơi",
  description:
    "Khu trò chơi tiếng Anh của DingDong Kids — bé chơi để nhớ từ vựng: ấp trứng, câu cá, ú oà, xây tháp và nhiều trò khác.",
};

/** Số bộ từ đưa ra cho bé chọn. Nhiều quá thì trẻ rối, ít quá thì mau chán. */
const MAX_PACKS = 12;

/**
 * SÂN CHƠI — khu trò chơi ĐỘC LẬP, tách hẳn khỏi lộ trình và các bài học.
 *
 * Ở lộ trình, game là phần thưởng gắn với một bài cụ thể và có ghi tiến độ. Còn
 * ở đây bé tự chọn bộ từ mình thích rồi chơi thoải mái, KHÔNG tính điểm, KHÔNG
 * ghi tiến độ, không mất tim. Đây là chỗ bé vào khi chỉ muốn chơi — và với trẻ
 * con thì "được chơi tự do" là lý do quay lại app mạnh hơn bất kỳ nhiệm vụ nào.
 */
export default async function GamesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const level = (session.user as { level?: string }).level ?? undefined;

  // Ưu tiên bộ từ ĐÚNG CẤP của bé; thiếu thì lấy thêm cấp khác cho đủ, để sân
  // chơi không bao giờ trống trơn với tài khoản mới.
  const lessons = await db.vocabLesson.findMany({
    where: {
      published: true,
      unit: { published: true },
      // Cần đủ từ để dựng được ván chơi (game ít đòi hỏi nhất cần 3 từ).
      words: { some: {} },
    },
    select: {
      id: true,
      title: true,
      unit: { select: { title: true, theme: true, level: true, imageUrl: true } },
      words: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          word: true,
          ipa: true,
          meaning: true,
          partOfSpeech: true,
          emoji: true,
          imageUrl: true,
          audioUrl: true,
        },
      },
    },
    orderBy: [{ unit: { order: "asc" } }, { order: "asc" }],
  });

  const packs: ArcadePack[] = lessons
    .filter((l) => l.words.length >= 3)
    .map((l) => ({
      id: l.id,
      title: l.title || l.unit.title,
      theme: l.unit.theme || l.unit.title,
      level: l.unit.level,
      words: l.words.map<VocabWordCard>((w, i) => ({
        id: w.id,
        lessonId: l.id,
        order: i + 1,
        word: w.word,
        ipa: w.ipa,
        meaning: w.meaning,
        partOfSpeech: w.partOfSpeech,
        emoji: w.emoji,
        examples: [],
        imageUrl: w.imageUrl,
        audioUrl: w.audioUrl,
      })),
    }))
    // Bộ từ đúng cấp của bé lên trước.
    .sort((a, b) => Number(b.level === level) - Number(a.level === level))
    .slice(0, MAX_PACKS);

  return <GameArcade packs={packs} />;
}
