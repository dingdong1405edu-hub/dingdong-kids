"use client";
// Nhìn ẢNH → chọn TỪ đúng. Đây là loại bài quan trọng nhất với trẻ 4–7 tuổi:
// bé chưa đọc thạo nên hình ảnh mới là kênh truyền đạt chính, chữ chỉ là thứ
// bé đang tập nhận mặt. Trả lời đúng thì tự phát âm từ đó để gắn hình ↔ âm ↔ chữ.
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { playWord } from "@/lib/speech";
import { SoundButton } from "@/components/learn/phonics/sound-button";
import type { PictureMatchExercise } from "@/types";

interface Props {
  exercise: PictureMatchExercise;
  onAnswer: (correct: boolean, answer?: string) => void;
  disabled: boolean;
}

export function PictureMatchExerciseUI({ exercise, onAnswer, disabled }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const answer = exercise.options[exercise.correct] ?? "";

  function handlePick(i: number) {
    if (disabled || picked !== null) return;
    setPicked(i);
    const ok = i === exercise.correct;
    // Luôn đọc từ ĐÚNG lên — kể cả khi bé chọn sai — để bé nghe được mẫu chuẩn.
    playWord({ word: answer, audioUrl: exercise.audioUrl });
    onAnswer(ok, answer);
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-sm font-semibold text-muted-foreground">
        Nhìn tranh và chọn từ đúng nhé!
      </p>

      {/* Ảnh to ở giữa — trọng tâm của bài */}
      <div className="mx-auto flex max-w-xs flex-col items-center gap-3">
        <div className="sticker relative aspect-square w-full overflow-hidden bg-muted">
          {exercise.imageUrl ? (
            <Image
              src={exercise.imageUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 80vw, 320px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageOff className="h-10 w-10" />
              <span className="text-xs">Chưa có ảnh</span>
            </div>
          )}
        </div>
        {picked !== null && <SoundButton text={answer} audioUrl={exercise.audioUrl} label="Nghe lại" />}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {exercise.options.map((opt, i) => (
          <motion.button
            key={`${opt}-${i}`}
            whileTap={{ scale: 0.96 }}
            onClick={() => handlePick(i)}
            disabled={disabled}
            className={cn(
              "btn-chunky min-h-[64px] rounded-2xl border-4 bg-card p-4 font-primer text-2xl font-bold transition-colors",
              picked === null && "border-primary/20 hover:border-primary/50 hover:bg-primary/5",
              picked === i && i === exercise.correct && "animate-pop-in border-green-500 bg-green-50 dark:bg-green-500/15",
              picked === i && i !== exercise.correct && "animate-wrong border-red-400 bg-red-50 dark:bg-red-500/15",
              picked !== null && picked !== i && i === exercise.correct && "border-green-400 bg-green-50/60 dark:bg-green-500/10",
              picked !== null && picked !== i && i !== exercise.correct && "border-transparent opacity-50",
            )}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
