"use client";
// Thẻ DẠY một âm: chỉ xem – nghe, KHÔNG tính điểm. Đây là lúc bé gắn mặt chữ với
// tiếng đọc, nên chữ phải thật to và từ ví dụ phải tự phát ngay khi thẻ hiện ra.
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playWord } from "@/lib/speech";
import type { TeachCard } from "@/lib/phonics-lessons";
import { SoundButton } from "../sound-button";
import { BigGlyph } from "./card-ui";

interface Props {
  card: TeachCard;
  onNext: () => void;
}

export function TeachCardView({ card, onNext }: Props) {
  // Bé chưa đọc được chữ — nghe trước, nhìn sau. Tự đọc từ ví dụ ngay khi vào thẻ.
  useEffect(() => {
    playWord({ word: card.word });
  }, [card.word]);

  return (
    <div className="space-y-5 text-center">
      <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{card.category}</div>

      {/* Bấm thẳng vào chữ cũng nghe được — trẻ hay chạm vào thứ to nhất màn hình. */}
      <button
        type="button"
        onClick={() => playWord({ word: card.word })}
        aria-label={`Nghe từ ${card.word}`}
        className="block w-full"
      >
        <BigGlyph>{card.big}</BigGlyph>
      </button>

      <div className="font-display text-4xl font-extrabold text-primary">{card.sound}</div>

      <div className="flex items-center justify-center gap-3 rounded-3xl bg-muted/40 p-4">
        <span className="animate-bounce-soft text-6xl" aria-hidden>
          {card.emoji}
        </span>
        <div className="text-left">
          <div className="font-primer text-4xl font-bold">{card.word}</div>
          <div className="text-sm font-semibold text-muted-foreground">{card.meaning}</div>
        </div>
        <SoundButton text={card.word} variant="chip" />
      </div>

      {card.hint && (
        <p className="rounded-3xl bg-sunny/15 p-4 text-left text-[15px] leading-relaxed text-foreground/80">
          💡 <span className="font-bold">Mẹo đọc:</span> {card.hint}
        </p>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <SoundButton text={card.word} label="Nghe lại" className="sm:w-44" />
        <Button
          className="btn-chunky flex-1 gap-1.5 rounded-2xl py-6 font-display text-lg font-extrabold"
          onClick={onNext}
        >
          Tiếp tục <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
