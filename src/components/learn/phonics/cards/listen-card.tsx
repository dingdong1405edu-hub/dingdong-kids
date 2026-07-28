"use client";
// Thẻ NGHE – CHỌN CHỮ: bé nghe một từ rồi chọn chữ cái tạo ra âm đầu của từ đó.
// Đây là bước kiểm tra xem bé đã nối được "tiếng" với "mặt chữ" chưa.
import { useEffect, useState } from "react";
import { playWord } from "@/lib/speech";
import { shuffle } from "@/lib/english";
import type { ListenCard } from "@/lib/phonics-lessons";
import { SoundButton } from "../sound-button";
import { AnswerFeedback, CardPrompt, ChoiceButton, seededRandom, type ChoiceState } from "./card-ui";

interface Props {
  card: ListenCard;
  /** Hạt giống xáo trộn (chỉ số thẻ) — giữ thứ tự đáp án ổn định giữa server và client. */
  seed: number;
  onDone: (correct: boolean) => void;
}

export function ListenCardView({ card, seed, onDone }: Props) {
  // Xáo MỘT lần lúc mount (thẻ được `key` theo chỉ số nên mỗi thẻ là một lần mount).
  const [options] = useState(() => shuffle(card.options, seededRandom(seed)));
  const [picked, setPicked] = useState<string | null>(null);

  // Tự đọc từ ngay khi thẻ hiện ra — không nghe thì bé không có cách nào làm bài.
  useEffect(() => {
    playWord({ word: card.word });
  }, [card.word]);

  const answered = picked !== null;
  const ok = picked === card.answer;

  return (
    <div className="space-y-5">
      <CardPrompt>{card.prompt}</CardPrompt>

      <div className="flex justify-center">
        <SoundButton text={card.word} variant="circle" />
      </div>
      <p className="text-center text-sm font-semibold text-muted-foreground">Bấm loa để nghe lại nhé</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((o) => {
          const state: ChoiceState = !answered
            ? "idle"
            : o === card.answer
              ? "right"
              : o === picked
                ? "wrong"
                : "dim";
          return (
            <ChoiceButton key={o} state={state} disabled={answered} onClick={() => setPicked(o)}>
              <span className="font-primer text-5xl font-bold sm:text-6xl">{o}</span>
            </ChoiceButton>
          );
        })}
      </div>

      {answered && (
        <AnswerFeedback
          ok={ok}
          answerLabel={card.answer}
          reveal={{ emoji: card.emoji, word: card.word, meaning: card.meaning }}
          onNext={() => onDone(ok)}
        />
      )}
    </div>
  );
}
