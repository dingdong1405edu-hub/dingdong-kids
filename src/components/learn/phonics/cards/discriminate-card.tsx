"use client";
// Thẻ PHÂN BIỆT hai âm dễ lẫn (/b/–/p/, /f/–/v/, /s/–/ʃ/, /t/–/θ/…). Máy đọc
// MỘT trong hai từ, bé nghe rồi chỉ ra vừa nghe âm nào. Đây là những cặp âm trẻ
// Việt hay nhầm nhất nên luôn kèm một mẹo đọc ở phần phản hồi.
import { useEffect, useState } from "react";
import { playWord } from "@/lib/speech";
import type { DiscriminateCard } from "@/lib/phonics-lessons";
import { SoundButton } from "../sound-button";
import { AnswerFeedback, CardPrompt, ChoiceButton, seededRandom, type ChoiceState } from "./card-ui";

interface Props {
  card: DiscriminateCard;
  seed: number;
  onDone: (correct: boolean) => void;
}

export function DiscriminateCardView({ card, seed, onDone }: Props) {
  // Chọn sẵn âm sẽ phát bằng PRNG có hạt giống → server và client ra cùng kết quả,
  // không lệch hydrate.
  const [played] = useState(() => (seededRandom(seed + 99)() < 0.5 ? card.a : card.b));
  const [picked, setPicked] = useState<string | null>(null);

  // Tự phát ngay khi vào thẻ.
  useEffect(() => {
    playWord({ word: played.word });
  }, [played.word]);

  const answered = picked !== null;
  const ok = picked === played.sound;

  return (
    <div className="space-y-5">
      <CardPrompt>{card.prompt}</CardPrompt>

      <div className="flex justify-center">
        <SoundButton text={played.word} variant="circle" />
      </div>
      <p className="text-center text-sm font-semibold text-muted-foreground">
        Nghe kỹ nhé — hai âm này rất giống nhau!
      </p>

      <div className="grid grid-cols-2 gap-3">
        {[card.a, card.b].map((item) => {
          const state: ChoiceState = !answered
            ? "idle"
            : item.sound === played.sound
              ? "right"
              : item.sound === picked
                ? "wrong"
                : "dim";
          return (
            <ChoiceButton key={item.sound} state={state} disabled={answered} onClick={() => setPicked(item.sound)}>
              <span className="text-5xl" aria-hidden>
                {item.emoji}
              </span>
              <span className="font-display text-4xl font-extrabold text-primary">{item.sound}</span>
              <span className="font-primer text-xl font-bold">{item.word}</span>
            </ChoiceButton>
          );
        })}
      </div>

      {answered && (
        <AnswerFeedback
          ok={ok}
          answerLabel={played.sound}
          reveal={{ emoji: played.emoji, word: played.word, meaning: played.meaning }}
          note={card.note}
          onNext={() => onDone(ok)}
        />
      )}
    </div>
  );
}
