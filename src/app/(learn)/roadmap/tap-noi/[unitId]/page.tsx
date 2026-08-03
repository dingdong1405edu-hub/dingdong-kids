import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { FirstWordsFlow } from "@/components/learn/first-words/first-words-flow";
import { getFirstWordsUnit, nextFirstWordsUnit, FIRST_WORDS_LEVEL } from "@/lib/first-words";
import { cachedSpeechUrls } from "@/lib/tts";

interface Props {
  params: Promise<{ unitId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { unitId } = await params;
  const unit = getFirstWordsUnit(unitId);
  if (!unit) return { title: FIRST_WORDS_LEVEL.label };
  return {
    title: `${unit.title} — ${FIRST_WORDS_LEVEL.label}`,
    description: `Bé nghe và nhắc lại ${unit.words.length} từ tiếng Anh chủ đề ${unit.title.toLowerCase()}.`,
  };
}

export default async function FirstWordsUnitPage({ params }: Props) {
  const { unitId } = await params;
  const unit = getFirstWordsUnit(unitId);
  if (!unit) notFound();

  const session = await auth();
  if (!session?.user) redirect("/login");

  const [prog, audio] = await Promise.all([
    db.firstWordsProgress.findUnique({
      where: { userId_unitId: { userId: session.user.id, unitId } },
      select: { bestStars: true },
    }),
    // CHỈ tra cache, không gọi Deepgram: bài phải mở ra là chạy ngay. Từ nào
    // chưa có audio thì client xin sinh ở nền (POST /api/speak), trong lúc chờ
    // đã có giọng en-US của trình duyệt đọc tạm.
    cachedSpeechUrls(unit.words.map((w) => w.word)),
  ]);

  const next = nextFirstWordsUnit(unitId);

  return (
    <FirstWordsFlow
      unit={unit}
      audio={audio}
      bestStars={prog?.bestStars ?? 0}
      next={next ? { id: next.id, title: next.title, emoji: next.emoji } : null}
    />
  );
}
