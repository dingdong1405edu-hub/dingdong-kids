"use client";
// Ghép CHỮ CÁI thành từ. Bước cuối của chuỗi nghe → nhận mặt chữ → tự viết ra.
//
// Dùng BẤM chứ không kéo-thả thật: kéo-thả trên màn hình cảm ứng rất khó với
// ngón tay trẻ nhỏ (và HTML5 drag-and-drop không chạy trên mobile). Bấm chữ để
// thêm vào ô, bấm ô để trả chữ về — cùng kết quả học tập, ít ức chế hơn nhiều.
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Delete, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { letters, shuffle } from "@/lib/english";
import { playWord } from "@/lib/speech";
import { SoundButton } from "@/components/learn/phonics/sound-button";
import type { SpellDragExercise } from "@/types";

interface Props {
  exercise: SpellDragExercise;
  onAnswer: (correct: boolean, answer?: string) => void;
  disabled: boolean;
}

interface Tile {
  /** Khoá ổn định để React không nhảy vị trí khi có chữ cái trùng nhau. */
  id: string;
  ch: string;
}

export function SpellDragExerciseUI({ exercise, onAnswer, disabled }: Props) {
  // Memo hoá để `target` giữ nguyên tham chiếu giữa các lần render — nếu tính
  // lại mỗi render thì `pool` bên dưới cũng xáo lại theo, làm các ô chữ nhảy
  // loạn xạ ngay dưới ngón tay bé.
  const target = useMemo(() => letters(exercise.word), [exercise.word]);

  const pool = useMemo<Tile[]>(() => {
    const extra = (exercise.distractors ?? []).map((d) => d.toLowerCase());
    const all = [...target, ...extra];
    return shuffle(all.map((ch, i) => ({ id: `${ch}-${i}`, ch })));
  }, [target, exercise.distractors]);

  const [slots, setSlots] = useState<Tile[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);

  const usedIds = new Set(slots.map((t) => t.id));
  const built = slots.map((t) => t.ch).join("");
  const full = slots.length === target.length;

  function addLetter(tile: Tile) {
    if (disabled || checked !== null || usedIds.has(tile.id) || slots.length >= target.length) return;
    const next = [...slots, tile];
    setSlots(next);
    if (next.length === target.length) {
      const ok = next.map((t) => t.ch).join("") === target.join("");
      setChecked(ok);
      playWord({ word: exercise.word, audioUrl: exercise.audioUrl });
      onAnswer(ok, exercise.word);
    }
  }

  function removeAt(i: number) {
    if (disabled || checked !== null) return;
    setSlots((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-sm font-semibold text-muted-foreground">
        Ghép các chữ cái thành từ đúng nhé!
      </p>

      {/* Manh mối: ảnh + nút nghe. Bé dựa vào đây để biết cần ghép từ nào. */}
      <div className="flex flex-col items-center gap-3">
        {exercise.imageUrl && (
          <div className="sticker relative aspect-square w-40 overflow-hidden bg-muted">
            <Image src={exercise.imageUrl} alt="" fill sizes="160px" className="object-cover" />
          </div>
        )}
        <SoundButton text={exercise.word} audioUrl={exercise.audioUrl} variant="circle" />
      </div>

      {/* Ô ghép — nền kẻ 4 ly như vở tập viết tiếng Anh */}
      <div className="writing-lines flex min-h-[88px] flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-primary/25 p-3">
        {slots.length === 0 && (
          <span className="text-sm text-muted-foreground">Bấm chữ cái ở dưới…</span>
        )}
        {slots.map((t, i) => (
          <motion.button
            key={t.id}
            layout
            whileTap={{ scale: 0.94 }}
            onClick={() => removeAt(i)}
            disabled={disabled || checked !== null}
            aria-label={`Bỏ chữ ${t.ch}`}
            className={cn(
              "flex h-14 w-12 items-center justify-center rounded-xl border-4 font-primer text-3xl font-bold",
              checked === null && "border-primary/30 bg-card",
              checked === true && "border-green-500 bg-green-50 dark:bg-green-500/15",
              checked === false && "border-red-400 bg-red-50 dark:bg-red-500/15",
            )}
          >
            {t.ch}
          </motion.button>
        ))}
      </div>

      {/* Kho chữ cái */}
      <div className="flex flex-wrap justify-center gap-2">
        {pool.map((t) => (
          <motion.button
            key={t.id}
            whileTap={{ scale: 0.94 }}
            onClick={() => addLetter(t)}
            disabled={disabled || checked !== null || usedIds.has(t.id)}
            className={cn(
              "btn-chunky flex h-14 w-12 items-center justify-center rounded-xl border-4 border-primary/25",
              "bg-card font-primer text-3xl font-bold text-foreground",
              usedIds.has(t.id) && "invisible",
            )}
          >
            {t.ch}
          </motion.button>
        ))}
      </div>

      {slots.length > 0 && checked === null && (
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => removeAt(slots.length - 1)}
            className="inline-flex min-h-[48px] items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <Delete className="h-4 w-4" /> Xoá chữ cuối
          </button>
          <button
            type="button"
            onClick={() => setSlots([])}
            className="inline-flex min-h-[48px] items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" /> Làm lại
          </button>
        </div>
      )}

      {checked === false && (
        <p className="text-center font-display text-lg font-bold text-primary">
          Chưa đúng rồi! Từ đúng là{" "}
          <span className="font-primer text-2xl">{exercise.word}</span> 🌟
        </p>
      )}
      {checked === null && full && null}
      {built && checked === null && (
        <p className="text-center text-sm text-muted-foreground">
          Đang ghép: <span className="font-primer text-lg font-bold">{built}</span>
        </p>
      )}
    </div>
  );
}
