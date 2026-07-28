"use client";
// Bộ chơi một bài GHÉP VẦN: lần lượt qua từng thẻ trong bài. Thẻ "dạy âm" chỉ để
// xem – nghe (không tính điểm); các thẻ còn lại tính điểm và điểm bài =
// % số thẻ bé chọn đúng NGAY LẦN ĐẦU.
//
// Nội dung bài nằm trong @/lib/phonics-lessons (dữ liệu tĩnh); chỉ kết quả được
// gửi về server qua `completePhonicsLessonAction`.
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { X, RotateCcw, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { emitDing } from "@/lib/ding-bus";
import { completePhonicsLessonAction } from "@/server/actions/phonics";
import type { PhonicsLesson } from "@/lib/phonics-lessons";
import { TeachCardView } from "./cards/teach-card";
import { ListenCardView } from "./cards/listen-card";
import { BlendCardView } from "./cards/blend-card";
import { RhymeCardView } from "./cards/rhyme-card";
import { DiscriminateCardView } from "./cards/discriminate-card";

interface Props {
  lesson: PhonicsLesson;
  /** Điểm cao nhất bé từng đạt ở bài này (để khoe ở màn kết quả). */
  bestScore: number;
  nextLesson?: { id: string; title: string } | null;
}

/** Lời khen theo mức điểm — luôn tích cực, không có nhãn "kém". */
function praiseFor(pct: number): { emoji: string; title: string; line: string } {
  if (pct >= 90)
    return { emoji: "🏆", title: "Xuất sắc!", line: "Bé nghe âm chuẩn lắm rồi. Thử bài tiếp theo nhé!" };
  if (pct >= 70)
    return { emoji: "🌟", title: "Giỏi quá!", line: "Bé nhớ được gần hết các âm rồi đấy." };
  if (pct >= 40)
    return { emoji: "🌈", title: "Cố lên nào!", line: "Bé đã thuộc một nửa rồi. Chơi lại một lượt là nhớ hết thôi!" };
  return { emoji: "🐣", title: "Bé đã rất chăm!", line: "Các âm này còn mới. Nghe lại một lượt nữa là quen ngay." };
}

export function PhonicsFlow({ lesson, bestScore, nextLesson }: Props) {
  const cards = lesson.cards;
  const scoredTotal = useMemo(() => cards.filter((c) => c.kind !== "teach").length, [cards]);

  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [stage, setStage] = useState<"play" | "done">("play");
  const [saving, setSaving] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const startedAt = useRef(Date.now());
  const savedRef = useRef(false);

  const card = cards[index];
  const progress = cards.length > 0 ? Math.round((index / cards.length) * 100) : 0;
  const pct = scoredTotal > 0 ? Math.round((correct / scoredTotal) * 100) : 100;

  async function finish(finalCorrect: number) {
    if (savedRef.current) return;
    savedRef.current = true;
    const finalPct = scoredTotal > 0 ? Math.round((finalCorrect / scoredTotal) * 100) : 100;
    setSaving(true);
    const res = await completePhonicsLessonAction({
      lessonId: lesson.id,
      score: finalPct,
      durationSec: Math.round((Date.now() - startedAt.current) / 1000),
    });
    setSaving(false);
    if (!res.ok) {
      // Không chặn bé xem kết quả — chỉ báo là chưa lưu được.
      savedRef.current = false;
      toast.error("Chưa lưu được kết quả, bé thử lại nhé");
    } else {
      setXpEarned(res.xpEarned ?? 0);
    }
    emitDing(finalPct >= 80 ? "celebrate" : "complete");
    setStage("done");
  }

  function goNext(gained: number) {
    const next = correct + gained;
    setCorrect(next);
    if (index < cards.length - 1) setIndex((i) => i + 1);
    else void finish(next);
  }

  function restart() {
    savedRef.current = false;
    startedAt.current = Date.now();
    setCorrect(0);
    setIndex(0);
    setXpEarned(0);
    setStage("play");
  }

  if (cards.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <span className="text-7xl" aria-hidden>
          🔤
        </span>
        <h2 className="font-display text-xl font-extrabold">Bài này chưa có nội dung</h2>
        <Link href="/phonics">
          <Button variant="outline" className="btn-chunky rounded-2xl border-4">
            Quay lại
          </Button>
        </Link>
      </div>
    );
  }

  if (stage === "done") {
    const p = praiseFor(pct);
    const newBest = pct > bestScore;
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="sticker w-full max-w-md rounded-3xl text-center">
          <CardContent className="space-y-4 px-6 pb-6 pt-8">
            <div className="flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <Star
                  key={i}
                  className={`animate-star-pop h-10 w-10 ${
                    pct >= (i + 1) * 33 ? "fill-sunny text-sunny" : "text-muted-foreground/30"
                  }`}
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
            <div className="animate-star-pop text-7xl" aria-hidden>
              {p.emoji}
            </div>
            <h2 className="font-display text-2xl font-extrabold">{p.title}</h2>
            <p className="text-[15px] text-muted-foreground">{p.line}</p>

            <div className="text-gradient-sunny font-display text-5xl font-extrabold">{pct}%</div>
            <p className="text-sm font-semibold text-muted-foreground">
              Bé làm đúng {correct}/{scoredTotal} câu
              {newBest && bestScore > 0 && " · Điểm cao nhất mới! 🎉"}
            </p>
            {xpEarned > 0 && (
              <p className="font-display text-base font-extrabold text-primary">+{xpEarned} sao kinh nghiệm</p>
            )}
            {saving && <p className="text-sm text-muted-foreground">Đang lưu kết quả…</p>}

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Button
                variant="outline"
                className="btn-chunky flex-1 rounded-2xl border-4 py-6 font-display font-extrabold"
                onClick={restart}
              >
                <RotateCcw className="mr-1.5 h-5 w-5" /> Chơi lại
              </Button>
              {nextLesson ? (
                <Link href={`/phonics/${nextLesson.id}`} className="flex-1">
                  <Button className="btn-chunky w-full rounded-2xl py-6 font-display font-extrabold">
                    Bài tiếp theo <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/phonics" className="flex-1">
                  <Button className="btn-chunky w-full rounded-2xl py-6 font-display font-extrabold">
                    Về trang Ghép vần
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center gap-3">
        <Link
          href="/phonics"
          aria-label="Thoát bài học"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-6 w-6" />
        </Link>
        <Progress value={progress} className="h-4 flex-1" />
        <span className="font-display text-sm font-extrabold tabular-nums text-muted-foreground">
          {index + 1}/{cards.length}
        </span>
      </div>

      <Card className="sticker rounded-3xl">
        <CardContent className="space-y-5 p-4 sm:p-6">
          {card.kind === "teach" && <TeachCardView key={index} card={card} onNext={() => goNext(0)} />}
          {card.kind === "listen" && (
            <ListenCardView key={index} card={card} seed={index} onDone={(ok) => goNext(ok ? 1 : 0)} />
          )}
          {card.kind === "blend" && (
            <BlendCardView key={index} card={card} seed={index} onDone={(ok) => goNext(ok ? 1 : 0)} />
          )}
          {card.kind === "rhyme" && (
            <RhymeCardView key={index} card={card} seed={index} onDone={(ok) => goNext(ok ? 1 : 0)} />
          )}
          {card.kind === "discriminate" && (
            <DiscriminateCardView key={index} card={card} seed={index} onDone={(ok) => goNext(ok ? 1 : 0)} />
          )}
        </CardContent>
      </Card>

      <p className="text-center text-xs font-semibold text-muted-foreground">
        {lesson.emoji} {lesson.title}
      </p>
    </div>
  );
}
