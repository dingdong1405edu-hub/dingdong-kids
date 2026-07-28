"use client";
// Thẻ GHÉP VẦN: bé nghe từng âm c – a – t, xem chúng TRƯỢT VÀO NHAU thành một từ,
// rồi chọn mặt chữ đúng. Đây là bước quyết định để trẻ biết đọc: nghe rời từng âm
// và nối lại thành tiếng.
import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playWord } from "@/lib/speech";
import { shuffle } from "@/lib/english";
import { cn } from "@/lib/utils";
import type { BlendCard } from "@/lib/phonics-lessons";
import { AnswerFeedback, CardPrompt, ChoiceButton, seededRandom, type ChoiceState } from "./card-ui";

interface Props {
  card: BlendCard;
  seed: number;
  onDone: (correct: boolean) => void;
}

/** Khoảng cách giữa hai âm khi CHƯA ghép (px) — cũng là quãng trượt khi ghép lại. */
const GAP = 14;
/** Nhịp đọc từng âm (ms). Trẻ nhỏ cần chậm mới bắt kịp. */
const BEAT = 850;

export function BlendCardView({ card, seed, onDone }: Props) {
  const [options] = useState(() => shuffle(card.options, seededRandom(seed)));
  const [picked, setPicked] = useState<string | null>(null);
  // -1: chưa chạy · 0..n-1: đang đọc âm thứ i · n: đã ghép xong thành từ
  const [step, setStep] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  /** Đọc lần lượt từng âm rồi ghép lại và đọc cả từ. */
  const runSequence = useCallback(() => {
    clearTimers();
    setStep(-1);
    card.parts.forEach((p, i) => {
      timers.current.push(
        setTimeout(() => {
          setStep(i);
          playWord({ word: p });
        }, i * BEAT),
      );
    });
    timers.current.push(
      setTimeout(
        () => {
          setStep(card.parts.length);
          playWord({ word: card.answer });
        },
        card.parts.length * BEAT + 200,
      ),
    );
  }, [card.parts, card.answer, clearTimers]);

  // Tự chạy ngay khi vào thẻ — bé chưa đọc được nên phải nghe trước.
  useEffect(() => {
    runSequence();
    return clearTimers;
  }, [runSequence, clearTimers]);

  const blended = step >= card.parts.length;
  const mid = (card.parts.length - 1) / 2;
  const answered = picked !== null;
  const ok = picked === card.answer;

  return (
    <div className="space-y-5">
      <CardPrompt>{card.prompt}</CardPrompt>

      {/* Từng âm — bấm vào một ô để nghe riêng âm đó */}
      <div className="flex items-center justify-center py-2" style={{ gap: GAP }}>
        {card.parts.map((p, i) => (
          <button
            key={`${p}-${i}`}
            type="button"
            onClick={() => playWord({ word: p })}
            aria-label={`Nghe âm ${p}`}
            className={cn(
              "sticker flex h-24 w-20 items-center justify-center bg-card font-primer text-6xl font-bold transition-all duration-500 sm:h-28 sm:w-24",
              step === i && !blended ? "scale-110 border-primary bg-primary/10 text-primary" : "text-foreground",
              blended && "border-primary/60 bg-primary/10 text-primary",
            )}
            style={{ transform: blended ? `translateX(${(mid - i) * GAP}px)` : undefined }}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={runSequence}
          className="btn-chunky gap-2 rounded-2xl border-4 px-5 py-6 font-display text-base font-extrabold"
        >
          <Play className="h-5 w-5" /> Nghe lại và ghép
        </Button>
      </div>

      <p className="text-center text-sm font-semibold text-muted-foreground">
        Ghép lại được từ nào? Bé chọn nhé.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((w) => {
          const state: ChoiceState = !answered
            ? "idle"
            : w === card.answer
              ? "right"
              : w === picked
                ? "wrong"
                : "dim";
          return (
            <ChoiceButton key={w} state={state} disabled={answered} onClick={() => setPicked(w)}>
              <span className="font-primer text-4xl font-bold sm:text-5xl">{w}</span>
            </ChoiceButton>
          );
        })}
      </div>

      {answered && (
        <AnswerFeedback
          ok={ok}
          answerLabel={card.answer}
          reveal={{ emoji: card.emoji, word: card.answer, meaning: card.meaning }}
          onNext={() => onDone(ok)}
        />
      )}
    </div>
  );
}
