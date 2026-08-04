"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { normalizeAnswer } from "@/lib/english";
import type { SentenceOrderExercise } from "@/types";

interface Props {
  exercise: SentenceOrderExercise;
  onAnswer: (correct: boolean, answer?: string) => void;
  disabled: boolean;
}

export function SentenceOrderExerciseUI({ exercise, onAnswer, disabled }: Props) {
  const [bank, setBank] = useState<string[]>(() => [...exercise.words].sort(() => Math.random() - 0.5));
  const [chosen, setChosen] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function pickWord(word: string, idx: number) {
    if (disabled || submitted) return;
    setBank((b) => b.filter((_, i) => i !== idx));
    setChosen((c) => [...c, word]);
  }

  function removeWord(word: string, idx: number) {
    if (disabled || submitted) return;
    setChosen((c) => c.filter((_, i) => i !== idx));
    setBank((b) => [...b, word]);
  }

  function submit() {
    // Ghép bằng DẤU CÁCH rồi so khớp chuẩn hoá: `answer` tác giả viết là câu
    // hoàn chỉnh ("She is happy.") — có dấu cách, viết hoa và dấu chấm — còn
    // các thẻ từ thì không. Ghép trần (`join("")`) sẽ không bao giờ khớp.
    const attempt = normalizeAnswer(chosen.join(" "));
    const correct = attempt === normalizeAnswer(exercise.answer);
    setSubmitted(true);
    onAnswer(correct, exercise.answer);
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Sắp xếp thành câu đúng</p>
        {(exercise.hint ?? exercise.meaning) && (
          <p className="text-muted-foreground text-sm italic">"{exercise.hint ?? exercise.meaning}"</p>
        )}
      </div>

      {/* Khay ghép câu — viền đứt nét, bo lớn, trông như một "ô trống" cần điền */}
      <div className="flex min-h-20 flex-wrap items-center gap-2 rounded-2xl border-4 border-dashed border-border bg-muted/40 p-4">
        {chosen.length === 0 ? (
          <span className="text-muted-foreground text-sm">Chọn từ bên dưới...</span>
        ) : (
          chosen.map((w, i) => (
            <motion.button
              key={`${w}-${i}`}
              layout
              onClick={() => removeWord(w, i)}
              /* Thẻ từ ĐÃ ghép: nền vàng nắng có gờ cam — nhìn là biết "đang ở
                 trong câu". Rê chuột chuyển sang san hô để báo bấm là gỡ ra. */
              className="btn-chunky [--edge:hsl(var(--c-sun))] bg-sunny px-4 py-2 font-primer text-lg font-bold text-sunny-foreground hover:bg-brand-coral hover:text-white"
            >
              {w}
            </motion.button>
          ))
        )}
      </div>

      {/* Kho từ — thẻ trắng có gờ, nhô lên khi rê chuột */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {bank.map((w, i) => (
          <motion.button
            key={`bank-${w}-${i}`}
            layout
            onClick={() => pickWord(w, i)}
            className="btn-chunky [--edge:hsl(var(--border))] bg-card px-4 py-2 font-primer text-lg font-bold"
          >
            {w}
          </motion.button>
        ))}
      </div>

      <Button
        className="w-full"
        disabled={chosen.length === 0 || disabled}
        onClick={submit}
      >
        Kiểm tra
      </Button>
    </div>
  );
}
