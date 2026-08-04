"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { playWord } from "@/lib/speech";
import type { MatchExercise } from "@/types";

interface Props {
  exercise: MatchExercise;
  onAnswer: (correct: boolean, answer?: string) => void;
  disabled: boolean;
}

export function MatchExerciseUI({ exercise, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<{ en: string | null; vi: string | null }>({ en: null, vi: null });
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);

  const pairs = exercise.pairs;
  const enItems = pairs.map((p) => p.en);
  // Shuffle once per exercise — computing in the render body reshuffles on every
  // state change, making the column jump after each tap.
  // Giữ cả cặp (không chỉ chuỗi tiếng Việt) để còn hiện ảnh minh hoạ cho bé.
  const viItems = useMemo(() => [...pairs].sort(() => Math.random() - 0.5), [pairs]);

  function handleEn(en: string) {
    if (disabled || matched.has(en)) return;
    // Bé chưa đọc thạo: chạm vào từ tiếng Anh là nghe luôn cách đọc.
    const pair = pairs.find((p) => p.en === en);
    playWord({ word: en, audioUrl: pair?.audioUrl });
    setSelected((s) => ({ ...s, en }));
  }

  function handleVi(vi: string) {
    if (disabled || matched.has(vi)) return;
    setSelected((s) => ({ ...s, vi }));
  }

  useEffect(() => {
    if (!selected.en || !selected.vi) return;
    const pair = pairs.find((p) => p.en === selected.en);
    if (pair?.vi === selected.vi) {
      setMatched((m) => new Set([...m, selected.en!, selected.vi!]));
      setSelected({ en: null, vi: null });
      if (matched.size + 2 >= pairs.length * 2) {
        setTimeout(() => onAnswer(true), 300);
      }
    } else {
      setWrong(`${selected.en}-${selected.vi}`);
      setTimeout(() => {
        setWrong(null);
        setSelected({ en: null, vi: null });
      }, 600);
    }
  }, [selected, pairs, matched, onAnswer]);

  const allMatched = matched.size >= pairs.length * 2;

  useEffect(() => {
    if (allMatched) onAnswer(true);
  }, [allMatched, onAnswer]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center">Nối từ tiếng Anh với nghĩa</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {enItems.map((en) => (
            <motion.button
              key={en}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleEn(en)}
              disabled={matched.has(en)}
              className={cn(
                "answer-tile w-full border-primary/20 p-3 font-primer text-xl font-bold",
                matched.has(en) && "opacity-30 border-brand-lime bg-band-mint",
                selected.en === en && !matched.has(en) && "border-primary bg-primary/10",
                wrong?.startsWith(en) && "border-brand-coral bg-band-coral animate-wrong",
                !selected.en || selected.en === en ? "" : "hover:border-border"
              )}
            >
              {en}
            </motion.button>
          ))}
        </div>
        <div className="space-y-2">
          {viItems.map(({ vi, imageUrl }) => (
            <motion.button
              key={vi}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleVi(vi)}
              disabled={matched.has(vi)}
              className={cn(
                "answer-tile flex w-full items-center justify-center gap-2 border-primary/20 p-3 text-base font-bold",
                matched.has(vi) && "opacity-30 border-brand-lime bg-band-mint",
                selected.vi === vi && !matched.has(vi) && "border-primary bg-primary/10",
                wrong?.endsWith(vi) && "border-brand-coral bg-band-coral animate-wrong",
              )}
            >
              {/* Ảnh minh hoạ giúp bé chưa đọc thạo vẫn chọn được. */}
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
              )}
              <span>{vi}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
