"use client";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PenLine, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { emitDing } from "@/lib/ding-bus";
import { FlashcardPhase, type FlashResult } from "@/components/learn/grammar/flashcard-phase";
import { PassStatus } from "./pass-status";
import type { WritingReorderSentence } from "@/lib/roadmap-content";
import type { Exercise } from "@/types";

interface Props {
  title: string;
  sentences: WritingReorderSentence[];
  backHref: string;
  passThreshold: number;
  /** Ghi hoàn thành phần Viết cho bài lộ trình (đánh dấu skillsDone, cộng XP). */
  onComplete: (stats: { correct: number; total: number; durationSec: number }) => Promise<{ ok: boolean }>;
}

type Stage = "intro" | "practice" | "done";

// Câu đúng do người soạn nhập có dấu câu và viết hoa ("I like red apples."), còn
// bài tập sắp xếp chấm bằng cách ghép các thẻ từ lại ("I like red apples"). Bỏ
// dấu câu + gộp khoảng trắng để hai bên khớp nhau mà người soạn vẫn được nhập
// câu tự nhiên, đúng chính tả.
const PUNCT = /[.,!?;:"'`~…—–()[\]{}]/g;
const normalizeSentence = (s: string) =>
  s.normalize("NFC").replace(PUNCT, "").replace(/\s+/g, " ").trim();

/**
 * Trình chơi phần VIẾT kiểu "sắp xếp từ thành câu" — đúng format bài viết của đề
 * Cambridge cho trẻ. Mỗi câu là một bài tập sentence_order (kéo thẻ từ → tạo câu
 * đúng), chấm tự động KHÔNG dùng AI. Tái dùng FlashcardPhase của Ngữ pháp để có
 * sẵn kéo-thả + giải thích.
 */
export function RoadmapWritingPlayer({ title, sentences, backHref, passThreshold, onComplete }: Props) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("intro");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [resultPct, setResultPct] = useState<number | null>(null);
  const savedRef = useRef(false);

  const exercises = useMemo<Exercise[]>(
    () =>
      sentences.map((s) => ({
        type: "sentence_order",
        words: s.words,
        answer: normalizeSentence(s.answer),
        meaning: s.translation,
        explanation: s.explanation,
        audioUrl: s.audioUrl ?? undefined,
      })),
    [sentences]
  );

  async function finish(result: FlashResult) {
    if (savedRef.current) return;
    savedRef.current = true;
    const graded = result.correct + result.wrong;
    const total = Math.max(1, graded);
    const pct = graded > 0 ? Math.round((result.correct / total) * 100) : null;
    setResultPct(pct);
    emitDing(pct != null && pct >= 80 ? "celebrate" : "complete");
    const durationSec = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    const res = await onComplete({ correct: result.correct, total, durationSec });
    if (!res.ok) toast.error("Chưa lưu được kết quả, bé thử lại nhé");
    setStage("done");
  }

  if (stage === "practice") {
    return (
      <FlashcardPhase
        flashcards={exercises}
        closeHref={backHref}
        label="Tập viết câu"
        onDone={finish}
      />
    );
  }

  if (stage === "done") {
    const great = resultPct != null && resultPct >= passThreshold;
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md rounded-3xl text-center">
          <CardContent className="space-y-4 px-6 pb-6 pt-8">
            <div className="animate-star-pop text-6xl" aria-hidden>
              {great ? "✍️🌟" : "✍️🌈"}
            </div>
            <h2 className="font-display text-2xl font-extrabold">Xong phần Viết!</h2>
            <p className="text-[15px] text-muted-foreground">
              Bé vừa xếp được cả câu tiếng Anh trong bài “{title || "Tập viết câu"}”.
            </p>

            {resultPct != null && (
              <div className="flex flex-col items-center gap-2">
                <div className="text-gradient-sunny font-display text-4xl font-extrabold">{resultPct}%</div>
                <PassStatus score={resultPct} threshold={passThreshold} />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {/* <Button> đã tự lo bo tròn, phông Baloo và gờ 3D — chỉ thêm phần bố cục */}
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  savedRef.current = false;
                  setResultPct(null);
                  setStartTime(Date.now());
                  setStage("practice");
                }}
              >
                Chơi lại
              </Button>
              <Button
                className="flex-1"
                onClick={() => router.push(backHref)}
              >
                Quay lại bài học
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // intro
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-4xl" aria-hidden>
          ✍️
        </span>
        <h1 className="font-display text-2xl font-extrabold leading-tight">
          {title || "Tập viết câu"}
        </h1>
      </div>

      <Card className="rounded-3xl">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <PenLine className="h-6 w-6" />
            </div>
            <div>
              <div className="font-display text-lg font-extrabold">
                Sắp xếp thành câu · {sentences.length} câu
              </div>
              <p className="text-[15px] text-muted-foreground">
                Kéo các thẻ từ cho sẵn thành một câu tiếng Anh đúng. Có nghĩa tiếng Việt gợi ý và lời
                giải thích ngay bên dưới.
              </p>
            </div>
          </div>

          {sentences.length === 0 ? (
            <p className="rounded-2xl border-2 border-dashed py-6 text-center text-[15px] text-muted-foreground">
              Phần này cô đang soạn câu — bé quay lại sau nhé ✨
            </p>
          ) : (
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                setStartTime(Date.now());
                setStage("practice");
              }}
            >
              <Play className="mr-1.5 h-5 w-5" /> Bắt đầu xếp câu
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
