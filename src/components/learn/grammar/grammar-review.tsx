"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { emitDing } from "@/lib/ding-bus";
import { EXERCISE_TYPE_LABEL } from "@/lib/grammar";
import { FlashcardPhase, type FlashResult } from "./flashcard-phase";
import type { Exercise } from "@/types";

interface Props {
  /** Display title of the scope being reviewed (lesson or unit). */
  title: string;
  /** All practice items gathered from the scope, mixed together. */
  exercises: Exercise[];
  /** Where the close button / "Xong" returns to. */
  closeHref: string;
}

type Stage = "review" | "done";

// Nhãn tiếng Việt của từng dạng bài — dùng chung với PDF & bộ chấm (src/lib/grammar.ts)
// để chỗ nào cũng gọi một dạng bài bằng đúng một cái tên.
const TYPE_LABEL = EXERCISE_TYPE_LABEL;

/** Màu điểm. Mức thấp dùng CAM ẤM chứ không đỏ gắt — trẻ nhìn con số của mình,
 *  màu đỏ dễ khiến bé thấy như bị mắng. */
function scoreTone(pct: number): string {
  if (pct >= 80) return "text-green-600 dark:text-green-400";
  if (pct >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-orange-600 dark:text-orange-400";
}

/**
 * "Ôn tập" runner. Mixes all practice items of a lesson (or a whole unit) into
 * one shuffled, no-theory session — quiz + flashcard trộn hết — then shows a
 * detailed percentage score: overall %, đúng/sai/bỏ qua, độ chính xác, and a
 * per-type breakdown. Reuses FlashcardPhase, so the click-to-lookup context
 * words and the wrong-answer explanations work here too.
 */
export function GrammarReview({ title, exercises, closeHref }: Props) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("review");
  const [result, setResult] = useState<FlashResult | null>(null);
  // Shuffle only AFTER mount: server and the first client render must produce the
  // same DOM (a stable placeholder), or deck[0] would differ and React would
  // throw a hydration mismatch. The randomised order is applied client-side.
  const [deck, setDeck] = useState<Exercise[] | null>(null);
  useEffect(() => {
    setDeck([...exercises].sort(() => Math.random() - 0.5));
  }, [exercises]);

  if (exercises.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <DingBuddy size={88} pose="idle" className="mx-auto" />
        <h2 className="font-display text-xl font-extrabold">Chưa có gì để ôn</h2>
        <p className="max-w-sm text-[15px] text-muted-foreground">
          Phần này chưa có thẻ hay bài chơi nào. Bé quay lại sau nhé! 🐻
        </p>
        <Link href={closeHref}>
          <Button variant="outline" className="font-bold">Quay lại</Button>
        </Link>
      </div>
    );
  }

  if (stage === "review") {
    if (!deck) {
      return (
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
          <div className="h-48 w-full animate-pulse rounded-2xl bg-muted/50" />
        </div>
      );
    }
    return (
      <FlashcardPhase
        flashcards={deck}
        closeHref={closeHref}
        label={`Ôn tập · ${title}`}
        onDone={(r) => {
          const totalCards = r.correct + r.wrong + r.skipped;
          const pct = totalCards > 0 ? Math.round((r.correct / totalCards) * 100) : 0;
          emitDing(pct >= 80 ? "celebrate" : "complete");
          setResult(r);
          setStage("done");
        }}
      />
    );
  }

  // ===== Detailed score =====
  const total = (result?.correct ?? 0) + (result?.wrong ?? 0) + (result?.skipped ?? 0);
  const correct = result?.correct ?? 0;
  const wrong = result?.wrong ?? 0;
  const skipped = result?.skipped ?? 0;
  const answered = correct + wrong;
  // The headline score counts every item: skipped & wrong both cost points.
  const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const accuracyPct = answered > 0 ? Math.round((correct / answered) * 100) : null;

  // Per-type breakdown from the per-card log.
  const byType = new Map<string, { correct: number; total: number }>();
  for (const d of result?.details ?? []) {
    const e = byType.get(d.type) ?? { correct: 0, total: 0 };
    e.total += 1;
    if (d.outcome === "correct") e.correct += 1;
    byType.set(d.type, e);
  }
  const typeRows = Array.from(byType.entries()).map(([type, v]) => ({
    label: TYPE_LABEL[type] ?? type,
    correct: v.correct,
    total: v.total,
    pct: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
  }));

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center py-6">
      <Card className="w-full text-center">
        <CardContent className="space-y-5 px-6 pb-6 pt-8">
          <DingBuddy
            size={96}
            pose={scorePct >= 80 ? "cheer" : "idle"}
            message={scorePct >= 80 ? "Siêu quá!" : "Cố lên nhé!"}
            className="mx-auto"
          />
          <h2 className="font-display text-2xl font-extrabold">Bé ôn xong rồi! 🌟</h2>
          <p className="text-[15px] text-muted-foreground">{title}</p>

          {/* Điểm to nhất màn hình */}
          <div>
            <div className={`font-display text-5xl font-extrabold ${scoreTone(scorePct)}`}>{scorePct}%</div>
            <div className="mt-1 text-[15px] text-muted-foreground">
              Bé làm đúng {correct}/{total} câu
              {accuracyPct !== null && answered !== total && (
                <> · trong những câu đã trả lời thì đúng {accuracyPct}%</>
              )}
            </div>
          </div>

          {/* Đúng / Cần xem lại / Để lát nữa */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-green-50 p-3 dark:bg-green-500/15">
              <CheckCircle2 className="mx-auto h-6 w-6 text-green-600 dark:text-green-300" />
              <div className="mt-1 font-display text-xl font-extrabold text-green-700 dark:text-green-300">{correct}</div>
              <div className="text-[11px] font-semibold text-muted-foreground">Đúng</div>
            </div>
            <div className="rounded-2xl bg-orange-50 p-3 dark:bg-orange-500/15">
              <XCircle className="mx-auto h-6 w-6 text-orange-500 dark:text-orange-300" />
              <div className="mt-1 font-display text-xl font-extrabold text-orange-600 dark:text-orange-300">{wrong}</div>
              <div className="text-[11px] font-semibold text-muted-foreground">Xem lại</div>
            </div>
            <div className="rounded-2xl bg-muted p-3">
              <SkipForward className="mx-auto h-6 w-6 text-muted-foreground" />
              <div className="mt-1 font-display text-xl font-extrabold text-foreground">{skipped}</div>
              <div className="text-[11px] font-semibold text-muted-foreground">Để lát nữa</div>
            </div>
          </div>

          {/* Chi tiết theo dạng bài */}
          {typeRows.length > 0 && (
            <div className="space-y-2 text-left">
              <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                Bé làm tốt dạng nào nhất?
              </div>
              <ul className="space-y-2">
                {typeRows.map((r, i) => (
                  <li key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="min-w-0 truncate">{r.label}</span>
                      <span className="shrink-0 tabular-nums text-muted-foreground">
                        {r.correct}/{r.total} · {r.pct}%
                      </span>
                    </div>
                    <Progress value={r.pct} className="h-1.5" />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1 font-bold" onClick={() => window.location.reload()}>
              Ôn lại
            </Button>
            <Button className="btn-chunky flex-1 font-extrabold" onClick={() => router.push(closeHref)}>
              Xong rồi!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
