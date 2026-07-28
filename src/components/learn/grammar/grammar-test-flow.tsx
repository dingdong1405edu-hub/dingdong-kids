"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ClipboardCheck, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BaoBuddy } from "@/components/marketing/bao-buddy";
import { emitDing } from "@/lib/ding-bus";
import { GrammarTestRunner, type TestResult } from "./grammar-test-runner";
import { submitGrammarTestAction } from "@/server/actions/lesson";
import { describeExercise } from "@/lib/grammar";
import { cn } from "@/lib/utils";
import type { GrammarLessonContent } from "@/types";

interface Props {
  lesson: { id: string; title: string };
  content: GrammarLessonContent;
  unitId: string;
}

const PASS = 80;

type Stage = "intro" | "running" | "result";

interface Outcome {
  result: TestResult;
  passed: boolean;
  pct: number;
  xpEarned: number;
  alreadyAwarded: boolean;
}

/**
 * Bài "thử tài" mẫu câu — TÁCH RIÊNG khỏi luồng học. Làm xong sẽ chấm và chữa
 * từng câu cho bé xem. Chỉ đúng ≥ 80% mới được thưởng sao; làm bài này KHÔNG bắt
 * buộc để mở khoá bài tiếp theo (học xong là đã mở rồi).
 */
export function GrammarTestFlow({ lesson, content, unitId }: Props) {
  const router = useRouter();
  const questions = content.test.questions;
  const closeHref = `/grammar/${unitId}`;
  const [stage, setStage] = useState<Stage>("intro");
  const [attempt, setAttempt] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <BaoBuddy size={88} pose="idle" className="mx-auto" />
        <h2 className="font-display text-xl font-extrabold">Bài này chưa có phần thử tài</h2>
        <Button variant="outline" className="font-bold" onClick={() => router.push(closeHref)}>
          Quay lại
        </Button>
      </div>
    );
  }

  async function handleDone(result: TestResult) {
    setSubmitting(true);
    const res = await submitGrammarTestAction({
      lessonId: lesson.id,
      correct: result.correct,
      total: result.total,
    });
    setSubmitting(false);
    const pct = Math.round((result.correct / Math.max(1, result.total)) * 100);
    const passed = res.ok ? res.passed ?? pct >= PASS : pct >= PASS;
    if (res.ok) {
      setOutcome({
        result,
        passed,
        pct: res.pct ?? pct,
        xpEarned: res.xpEarned ?? 0,
        alreadyAwarded: res.alreadyAwarded ?? false,
      });
    } else {
      toast.error("Chưa lưu được kết quả, bé thử lại nhé");
      setOutcome({ result, passed, pct, xpEarned: 0, alreadyAwarded: false });
    }
    emitDing(passed ? "celebrate" : "complete");
    setStage("result");
  }

  function retake() {
    setOutcome(null);
    setAttempt((a) => a + 1);
    setStage("running");
  }

  if (stage === "intro") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="space-y-4 px-6 pb-6 pt-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <ClipboardCheck className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-extrabold">Thử tài nào! 💪</h2>
            <p className="text-[15px] text-muted-foreground">{lesson.title || "Mẫu câu"}</p>
            <div className="rounded-2xl bg-muted/60 p-3 text-[15px] text-muted-foreground">
              {questions.length} câu · Đúng <b>≥ {PASS}%</b> là bé được thưởng ⭐. Làm xong Ding sẽ chữa từng câu cho bé xem.
            </div>
            <div className="flex gap-2 pt-1">
              <Button variant="outline" className="flex-1 font-bold" onClick={() => router.push(closeHref)}>
                Để lát nữa
              </Button>
              <Button className="btn-chunky flex-1 font-extrabold" onClick={() => setStage("running")}>
                Bắt đầu!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (stage === "running") {
    return (
      <GrammarTestRunner key={attempt} test={content.test} closeHref={closeHref} onDone={handleDone} />
    );
  }

  // stage === "result"
  if (!outcome) return null;
  const { result, passed, pct, xpEarned, alreadyAwarded } = outcome;
  return (
    <div className="mx-auto max-w-2xl space-y-5 py-6">
      <Card className="text-center">
        <CardContent className="space-y-3 px-6 pb-6 pt-8">
          <BaoBuddy
            size={104}
            pose={passed ? "cheer" : "idle"}
            message={passed ? "Siêu quá!" : "Thử lại nhé!"}
            className="mx-auto"
          />
          <h2 className="font-display text-2xl font-extrabold">
            {passed ? "Bé làm được rồi! 🎉" : "Sắp được rồi, bé thử lại nhé 🌟"}
          </h2>
          <div className={cn("font-display text-4xl font-extrabold", passed ? "text-primary" : "text-orange-500")}>
            {pct}%
          </div>
          <div className="text-[15px] text-muted-foreground">
            Bé làm đúng {result.correct}/{result.total} câu · cần ≥ {PASS}%
          </div>
          {passed && xpEarned > 0 && (
            <div className="inline-flex items-center gap-1.5 font-extrabold text-amber-600 dark:text-amber-400">
              <Trophy className="h-5 w-5" /> +{xpEarned} ⭐
            </div>
          )}
          {passed && xpEarned === 0 && alreadyAwarded && (
            <div className="text-xs text-muted-foreground">Bé đã nhận sao của bài này rồi nhé.</div>
          )}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1 gap-1.5 font-bold" onClick={retake}>
              <RotateCcw className="h-4 w-4" /> Làm lại
            </Button>
            <Button className="btn-chunky flex-1 font-extrabold" onClick={() => router.push(closeHref)}>
              Về danh sách
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chữa bài — đáp án + chỉ câu cần xem lại */}
      <div className="space-y-2">
        <h3 className="font-display text-base font-extrabold text-muted-foreground">Cùng Ding chữa bài nhé 🐻</h3>
        {questions.map((q, i) => {
          const d = describeExercise(q);
          const ok = result.results[i] === true;
          return (
            <div
              key={i}
              className={cn(
                "rounded-2xl border-2 p-4",
                ok
                  ? "border-emerald-300 bg-emerald-50/40 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                  : "border-orange-300 bg-orange-50/40 dark:border-orange-500/30 dark:bg-orange-500/10",
              )}
            >
              <div className="flex items-start gap-2">
                {ok ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500 dark:text-orange-400" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
                    Câu {i + 1} · {d.typeLabel}
                  </div>
                  <div className="font-primer text-[15px]">{d.question}</div>
                  <div className="mt-1.5 text-[15px]">
                    <span className="font-extrabold text-emerald-700 dark:text-emerald-300">Câu đúng: </span>
                    <span className="font-primer font-bold">{d.answer}</span>
                  </div>
                  {d.explanation && (
                    <div className="mt-0.5 text-[13px] text-muted-foreground">💡 {d.explanation}</div>
                  )}
                  {!ok && (
                    <div className="mt-1 text-[13px] font-semibold text-orange-600 dark:text-orange-300">
                      {result.results[i] === undefined ? "Bé chưa kịp trả lời câu này." : "Bé xem lại câu này nhé!"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {submitting && <p className="text-center text-xs text-muted-foreground">Đang lưu…</p>}
    </div>
  );
}
