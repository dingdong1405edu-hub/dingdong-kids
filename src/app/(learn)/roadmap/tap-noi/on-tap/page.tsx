import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { FirstWordsFlow } from "@/components/learn/first-words/first-words-flow";
import {
  buildReviewUnit,
  collectWeakWords,
  FIRST_WORDS_LEVEL,
  FIRST_WORDS_UNITS,
  getFirstWordsUnit,
} from "@/lib/first-words";
import { cachedSpeechUrls } from "@/lib/tts";

/**
 * Ôn lại những từ bé nói chưa tốt, gom từ MỌI chủ đề.
 *
 * Route TĨNH `on-tap` nên Next.js ưu tiên hơn `[unitId]` — cùng cách "tap-noi"
 * thắng `[level]` ở tầng trên. Bài ôn không có bản ghi tiến độ riêng: kết quả
 * ghi ngược về chủ đề gốc của từng từ (xem `saveFirstWordsReviewAction`).
 */
export const metadata: Metadata = {
  title: `Ôn từ khó — ${FIRST_WORDS_LEVEL.label}`,
  description: "Bé nói lại những từ tiếng Anh còn chưa quen, AI chấm phát âm và tặng sao.",
};

function readWordStars(raw: unknown, length: number): number[] {
  const arr = Array.isArray(raw) ? raw : [];
  return Array.from({ length }, (_, i) => {
    const v = arr[i];
    return typeof v === "number" && v > 0 ? Math.round(v) : 0;
  });
}

export default async function FirstWordsReviewPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const rows = await db.firstWordsProgress.findMany({
    where: { userId: session.user.id },
    select: { unitId: true, wordStars: true },
  });

  const byUnit: Record<string, number[] | undefined> = {};
  for (const r of rows) {
    const unit = getFirstWordsUnit(r.unitId);
    if (unit) byUnit[r.unitId] = readWordStars(r.wordStars, unit.words.length);
  }

  const weak = collectWeakWords(byUnit);

  // Không có gì để ôn là chuyện TỐT — báo bằng lời khen, không phải trang trống.
  if (weak.length === 0) {
    const firstUnit = FIRST_WORDS_UNITS[0];
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-5 text-center">
        <DingBuddy size={104} pose="proud" className="animate-bounce-soft" />
        <div>
          <h1 className="font-display text-2xl font-extrabold">Chưa có từ nào cần ôn! 🌟</h1>
          <p className="mt-1.5 text-[15px] text-muted-foreground">
            Những từ bé đã thử đều đạt 3 sao rồi. Bé mở một chủ đề mới nhé!
          </p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Link href={FIRST_WORDS_LEVEL.href}>
            <Button className="btn-chunky h-16 w-full rounded-2xl font-display text-lg font-extrabold">
              Chọn chủ đề mới
            </Button>
          </Link>
          {firstUnit && (
            <Link href={`${FIRST_WORDS_LEVEL.href}/${firstUnit.id}`}>
              <Button
                variant="outline"
                className="btn-chunky h-14 w-full rounded-2xl border-4 font-display font-extrabold"
              >
                <span className="mr-2 text-xl" aria-hidden>
                  {firstUnit.emoji}
                </span>
                Học {firstUnit.title}
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  const unit = buildReviewUnit(weak);
  const audio = await cachedSpeechUrls(unit.words.map((w) => w.word));

  return <FirstWordsFlow unit={unit} audio={audio} bestStars={0} next={null} mode="review" />;
}
