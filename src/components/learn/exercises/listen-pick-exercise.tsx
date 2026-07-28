"use client";
// NGHE audio → chọn ẢNH đúng. Chiều ngược lại của picture_match: ở đây bé phải
// giải mã ÂM THANH rồi mới nối sang hình. Không hiện chữ trước khi trả lời —
// nếu hiện thì bé đọc nhãn là xong, mất hẳn phần luyện nghe. Chữ chỉ bật lên
// sau khi đã chọn, để bé đối chiếu âm ↔ chữ.
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { playWord } from "@/lib/speech";
import { SoundButton } from "@/components/learn/phonics/sound-button";
import type { ListenPickExercise } from "@/types";

interface Props {
  exercise: ListenPickExercise;
  onAnswer: (correct: boolean, answer?: string) => void;
  disabled: boolean;
}

export function ListenPickExerciseUI({ exercise, onAnswer, disabled }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const answerLabel = exercise.options[exercise.correct]?.label ?? exercise.text;

  // Tự phát audio khi vào bài — trẻ chưa đọc được hướng dẫn nên phải nghe ngay.
  useEffect(() => {
    playWord({ word: exercise.text, audioUrl: exercise.audioUrl });
    // Chỉ phát lại khi ĐỔI sang câu khác, không phát lại mỗi lần render.
  }, [exercise.text, exercise.audioUrl]);

  function handlePick(i: number) {
    if (disabled || picked !== null) return;
    setPicked(i);
    onAnswer(i === exercise.correct, answerLabel);
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-sm font-semibold text-muted-foreground">
        Nghe rồi chọn tranh đúng nhé!
      </p>

      <div className="flex justify-center">
        <SoundButton text={exercise.text} audioUrl={exercise.audioUrl} variant="circle" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {exercise.options.map((opt, i) => (
          <motion.button
            key={`${opt.label}-${i}`}
            whileTap={{ scale: 0.96 }}
            onClick={() => handlePick(i)}
            disabled={disabled}
            aria-label={`Lựa chọn ${i + 1}`}
            className={cn(
              "overflow-hidden rounded-2xl border-4 bg-card transition-colors",
              picked === null && "border-primary/20 hover:border-primary/50",
              picked === i && i === exercise.correct && "animate-pop-in border-green-500",
              picked === i && i !== exercise.correct && "animate-wrong border-red-400",
              picked !== null && picked !== i && i === exercise.correct && "border-green-400",
              picked !== null && picked !== i && i !== exercise.correct && "border-transparent opacity-50",
            )}
          >
            <div className="relative aspect-square w-full bg-muted">
              {opt.imageUrl ? (
                <Image src={opt.imageUrl} alt="" fill sizes="(max-width: 640px) 45vw, 200px" className="object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-muted-foreground">
                  <ImageOff className="h-8 w-8" />
                  {/* Chưa có ảnh thì phải hiện nhãn, nếu không bé không có gì để chọn. */}
                  <span className="px-1 font-primer text-sm font-bold">{opt.label}</span>
                </div>
              )}
            </div>
            {/* Nhãn chữ CHỈ hiện sau khi đã chọn — trước đó sẽ làm mất phần luyện nghe. */}
            {picked !== null && (
              <div className="px-2 py-1.5 font-primer text-base font-bold">{opt.label}</div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
