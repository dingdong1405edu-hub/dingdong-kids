"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LookupText } from "@/components/learn/grammar/lookup-text";
import type { FillBlankExercise } from "@/types";

interface Props {
  exercise: FillBlankExercise;
  onAnswer: (correct: boolean, answer?: string) => void;
  disabled: boolean;
}

export function FillBlankExerciseUI({ exercise, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const parts = exercise.sentence.split("___");

  function handleSelect(opt: string) {
    if (disabled || selected !== null) return;
    setSelected(opt);
    onAnswer(opt === exercise.blank, exercise.blank);
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">Điền từ còn thiếu</p>
        <div className="text-2xl font-primer font-semibold bg-muted/50 rounded-xl p-4">
          <LookupText text={parts[0]} />
          <span
            className={cn(
              "inline-block border-b-2 min-w-[3rem] px-2 mx-1",
              selected === null ? "border-primary" : selected === exercise.blank ? "border-brand-lime text-brand-teal" : "border-brand-coral text-brand-coral"
            )}
          >
            {selected ?? "___"}
          </span>
          <LookupText text={parts[1] ?? ""} />
        </div>
        {exercise.hint && <p className="text-sm text-muted-foreground italic">Gợi ý: {exercise.hint}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {exercise.options.map((opt) => (
          <motion.button
            key={opt}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(opt)}
            disabled={disabled}
            className={cn(
              "answer-tile p-3 font-primer text-2xl font-bold",
              selected === null && "border-primary/20 hover:border-primary/50 hover:bg-primary/5",
              selected === opt && opt === exercise.blank && "border-brand-lime bg-band-mint",
              selected === opt && opt !== exercise.blank && "border-brand-coral bg-band-coral",
              selected && selected !== opt && opt === exercise.blank && "border-brand-lime bg-band-mint/50"
            )}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
