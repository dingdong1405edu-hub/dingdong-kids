"use client";
// Nối các từ CÙNG VẦN (cat–hat, dog–frog). Nghe ra vần là bước quyết định để trẻ
// đọc được cả "họ" từ mới mà không cần học thuộc từng từ một.
//
// Cách chơi: cột trái là từ gốc, cột phải đã xáo trộn. Bấm một từ bên trái rồi
// bấm từ bên phải để nối. Nối sai thì bỏ chọn và cho thử lại — chỉ chấm điểm
// MỘT LẦN khi nối xong tất cả, dựa trên số lần sai.
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { shuffle } from "@/lib/english";
import { playWord } from "@/lib/speech";
import type { RhymeMatchExercise } from "@/types";

interface Props {
  exercise: RhymeMatchExercise;
  onAnswer: (correct: boolean, answer?: string) => void;
  disabled: boolean;
}

export function RhymeMatchExerciseUI({ exercise, onAnswer, disabled }: Props) {
  const pairs = exercise.pairs;

  // Xáo trộn cột phải MỘT LẦN cho mỗi câu, giữ index gốc để biết cặp nào đúng.
  const right = useMemo(
    () => shuffle(pairs.map((p, i) => ({ i, word: p.b }))),
    [pairs],
  );

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [done, setDone] = useState(false);

  function pickLeft(i: number) {
    if (disabled || done || matched.has(i)) return;
    setSelectedLeft(i);
    playWord({ word: pairs[i].a });
  }

  function pickRight(origIndex: number) {
    if (disabled || done || matched.has(origIndex) || selectedLeft === null) return;
    playWord({ word: pairs[origIndex].b });

    if (origIndex === selectedLeft) {
      const next = new Set(matched);
      next.add(origIndex);
      setMatched(next);
      setSelectedLeft(null);
      if (next.size === pairs.length) {
        setDone(true);
        // Đúng khi nối hết mà sai không quá 1 lần — nới tay cho trẻ nhỏ.
        onAnswer(mistakes <= 1, pairs.map((p) => `${p.a} – ${p.b}`).join(", "));
      }
    } else {
      setMistakes((m) => m + 1);
      setWrongFlash(origIndex);
      setTimeout(() => setWrongFlash(null), 420);
      setSelectedLeft(null);
    }
  }

  const cell =
    "btn-chunky flex min-h-[60px] w-full items-center justify-center gap-2 rounded-2xl border-4 bg-card px-3 font-primer text-2xl font-bold transition-colors";

  return (
    <div className="space-y-6">
      <p className="text-center text-sm font-semibold text-muted-foreground">
        Nối hai từ có cùng vần nhé! (cat – hat)
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          {pairs.map((p, i) => (
            <motion.button
              key={`l-${p.a}-${i}`}
              whileTap={{ scale: 0.96 }}
              onClick={() => pickLeft(i)}
              disabled={disabled || matched.has(i)}
              className={cn(
                cell,
                matched.has(i) && "animate-pop-in border-green-500 bg-green-50 dark:bg-green-500/15",
                !matched.has(i) && selectedLeft === i && "border-primary bg-primary/10",
                !matched.has(i) && selectedLeft !== i && "border-primary/20 hover:border-primary/50",
              )}
            >
              <Volume2 className="h-4 w-4 shrink-0 opacity-50" />
              {p.a}
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          {right.map((r) => (
            <motion.button
              key={`r-${r.word}-${r.i}`}
              whileTap={{ scale: 0.96 }}
              onClick={() => pickRight(r.i)}
              disabled={disabled || matched.has(r.i)}
              className={cn(
                cell,
                matched.has(r.i) && "animate-pop-in border-green-500 bg-green-50 dark:bg-green-500/15",
                wrongFlash === r.i && "animate-wrong border-red-400 bg-red-50 dark:bg-red-500/15",
                !matched.has(r.i) && wrongFlash !== r.i && "border-primary/20 hover:border-primary/50",
              )}
            >
              <Volume2 className="h-4 w-4 shrink-0 opacity-50" />
              {r.word}
            </motion.button>
          ))}
        </div>
      </div>

      {selectedLeft !== null && !done && (
        <p className="text-center text-sm text-muted-foreground">
          Giờ chọn từ cùng vần với{" "}
          <span className="font-primer text-lg font-bold">{pairs[selectedLeft].a}</span>
        </p>
      )}
      {done && (
        <p className="text-center font-display text-lg font-bold text-primary">
          {mistakes <= 1 ? "Giỏi quá! Bé nối đúng hết rồi 🌟" : "Xong rồi! Lần sau bé sẽ nhanh hơn 💪"}
        </p>
      )}
    </div>
  );
}
