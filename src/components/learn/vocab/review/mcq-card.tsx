"use client";
import { useEffect, useRef, useState } from "react";
import { Check, X, Volume2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { playWord } from "@/lib/speech";
import { AnswerExplanation } from "@/components/learn/answer-explanation";
import type { VocabWordCard } from "@/types";

export type OptionKind = "word" | "ipa" | "text";

export interface McqCardProps {
  /** Dòng hướng dẫn (vd "Từ này nghĩa là gì?"). */
  question: string;
  /** Vùng đề bài (từ tiếng Anh cỡ lớn / nghĩa / nút nghe) — do caller dựng. */
  promptNode: React.ReactNode;
  options: string[];
  optionKind: OptionKind;
  correctIndex: number;
  /** Nếu có: hiện nút "Nghe"; dùng cho dạng nghe-chọn. */
  audioWord?: VocabWordCard | null;
  /** Tự phát audio khi vào (mặc định false; bài "nghe" bật true). */
  autoPlay?: boolean;
  /** Giải thích đáp án (dựng từ dữ liệu từ: từ + phiên âm + nghĩa + ví dụ). */
  explanation?: string | null;
  onAnswered: (correct: boolean) => void;
}

/**
 * Thẻ trắc nghiệm dùng chung cho các mini-game ôn từ (chọn nghĩa / chọn từ tiếng
 * Anh / chọn phiên âm / nghe-chọn). Một lượt đoán → hiện phản hồi (đúng xanh,
 * chưa đúng đỏ + tô đáp án đúng) → "Tiếp tục".
 */
export function McqCard({
  question,
  promptNode,
  options,
  optionKind,
  correctIndex,
  audioWord,
  autoPlay,
  explanation,
  onAnswered,
}: McqCardProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === correctIndex;

  const played = useRef(false);
  useEffect(() => {
    if (autoPlay && audioWord && !played.current) {
      played.current = true;
      playWord({ word: audioWord.word, audioUrl: audioWord.audioUrl });
    }
  }, [autoPlay, audioWord]);

  // Từ tiếng Anh dùng phông tập đọc (Andika, chữ a/g một tầng) cho bé dễ nhận mặt chữ.
  const optionClass =
    optionKind === "word"
      ? "font-primer text-2xl font-bold"
      : optionKind === "ipa"
        ? "text-lg font-semibold tracking-wide"
        : "text-base font-bold";

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
        <p className="font-display text-lg font-extrabold text-muted-foreground">{question}</p>
        <div className="flex flex-col items-center gap-3">
          {promptNode}
          {/* Nút nghe lại to — nhiều câu chỉ giải được nếu bé nghe lại được. */}
          {audioWord && (
            <Button
              type="button"
              onClick={() => playWord({ word: audioWord.word, audioUrl: audioWord.audioUrl })}
            >
              <Volume2 className="mr-1.5 h-5 w-5" /> Nghe lại
            </Button>
          )}
        </div>
        <div className="grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
          {options.map((opt, i) => {
            const isCorrect = i === correctIndex;
            const isPicked = i === picked;
            const state = !answered ? "idle" : isCorrect ? "correct" : isPicked ? "wrong" : "idle";
            return (
              <button
                key={i}
                type="button"
                disabled={answered}
                onClick={() => !answered && setPicked(i)}
                className={cn(
                  // Đúng = bạc hà, chưa đúng = san hô. Dùng band-*/brand-* nên
                  // chế độ tối tự lo, không cần cặp dark: viết tay.
                  "flex min-h-[3.25rem] items-center justify-center rounded-xl border-[3px] px-4 py-3 text-center transition-all duration-200 ease-toy",
                  optionClass,
                  state === "idle" &&
                    "border-border bg-card hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-soft",
                  state === "correct" && "border-brand-lime bg-band-mint text-brand-teal",
                  state === "wrong" && "border-brand-coral bg-band-coral text-foreground",
                  answered && state === "idle" && "opacity-50",
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dải phản hồi dưới chân màn: xanh bạc hà khi đúng, san hô khi chưa đúng. */}
      <div
        className={cn(
          "rounded-t-3xl border-t-2 border-border px-4 py-4 transition-colors",
          answered && (correct ? "bg-band-mint" : "bg-band-coral"),
        )}
      >
        {answered ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div
                className={cn(
                  "flex items-center gap-2 font-display text-base font-extrabold",
                  correct ? "text-brand-teal" : "text-foreground",
                )}
              >
                {correct ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                {correct ? "Giỏi quá! 🎉" : "Chưa đúng rồi — cùng xem đáp án nhé 🌟"}
              </div>
              <Button size="lg" onClick={() => onAnswered(correct)}>
                Tiếp tục <ArrowRight className="ml-1.5 h-5 w-5" />
              </Button>
            </div>
            <AnswerExplanation explanation={explanation} />
          </div>
        ) : (
          <p className="text-center text-sm font-semibold text-muted-foreground">Chọn một đáp án</p>
        )}
      </div>
    </div>
  );
}
