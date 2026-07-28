"use client";
// Thẻ TÌM TỪ CÙNG VẦN: cat – hat – bat. Nghe ra vần là bé đọc được cả "họ" từ,
// nên phần đuôi vần được tô màu khác để mắt bé nhận ra ngay.
import { useEffect, useState } from "react";
import { playWord } from "@/lib/speech";
import { shuffle, rime } from "@/lib/english";
import type { RhymeCard } from "@/lib/phonics-lessons";
import { SoundButton } from "../sound-button";
import { AnswerFeedback, CardPrompt, ChoiceButton, seededRandom, type ChoiceState } from "./card-ui";

interface Props {
  card: RhymeCard;
  seed: number;
  onDone: (correct: boolean) => void;
}

/** Tách từ thành phần đầu + phần vần để tô màu riêng phần vần. */
function splitRime(word: string): [string, string] {
  const r = rime(word);
  if (!r || !word.toLowerCase().endsWith(r)) return [word, ""];
  return [word.slice(0, word.length - r.length), word.slice(word.length - r.length)];
}

function RimeWord({ word, className }: { word: string; className?: string }) {
  const [head, tail] = splitRime(word);
  return (
    <span className={className}>
      {head}
      <span className="text-primary">{tail}</span>
    </span>
  );
}

export function RhymeCardView({ card, seed, onDone }: Props) {
  const [options] = useState(() => shuffle(card.options, seededRandom(seed)));
  const [picked, setPicked] = useState<string | null>(null);

  // Tự đọc từ gốc khi vào thẻ để bé nghe được phần vần.
  useEffect(() => {
    playWord({ word: card.base.word });
  }, [card.base.word]);

  const answered = picked !== null;
  const ok = picked === card.answer;
  const answerOption = card.options.find((o) => o.word === card.answer);

  return (
    <div className="space-y-5">
      <CardPrompt>{card.prompt}</CardPrompt>

      {/* Từ gốc */}
      <div className="flex flex-col items-center gap-2 rounded-3xl bg-muted/40 p-5">
        <span className="animate-bounce-soft text-7xl" aria-hidden>
          {card.base.emoji}
        </span>
        <div className="flex items-center gap-3">
          <RimeWord word={card.base.word} className="font-primer text-6xl font-bold" />
          <SoundButton text={card.base.word} variant="chip" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((o) => {
          const state: ChoiceState = !answered
            ? "idle"
            : o.word === card.answer
              ? "right"
              : o.word === picked
                ? "wrong"
                : "dim";
          return (
            <ChoiceButton key={o.word} state={state} disabled={answered} onClick={() => setPicked(o.word)}>
              <span className="text-5xl" aria-hidden>
                {o.emoji}
              </span>
              <RimeWord word={o.word} className="font-primer text-3xl font-bold" />
            </ChoiceButton>
          );
        })}
      </div>

      {answered && (
        <AnswerFeedback
          ok={ok}
          answerLabel={card.answer}
          reveal={{
            emoji: answerOption?.emoji ?? "🎵",
            word: card.answer,
            meaning: `Cùng vần “-${rime(card.answer)}” với “${card.base.word}”`,
          }}
          onNext={() => onDone(ok)}
        />
      )}
    </div>
  );
}
