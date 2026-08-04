"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LookupText } from "@/components/learn/grammar/lookup-text";
import type { TranslateExercise } from "@/types";

interface Props {
  exercise: TranslateExercise;
  onAnswer: (correct: boolean, answer?: string) => void;
  disabled: boolean;
}

export function TranslateExerciseUI({ exercise, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(opt: string) {
    if (disabled || selected) return;
    setSelected(opt);
    onAnswer(opt === exercise.answer, exercise.answer);
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {exercise.direction === "vi_to_en" ? "Dịch sang tiếng Anh" : "Dịch sang tiếng Việt"}
        </p>
        <div className="text-3xl font-primer font-bold bg-muted/50 rounded-xl p-4">
          {exercise.direction === "en_to_vi" ? (
            <LookupText text={exercise.prompt} />
          ) : (
            exercise.prompt
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {exercise.options.map((opt) => (
          <motion.button
            key={opt}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(opt)}
            disabled={disabled}
            className={cn(
              "answer-tile flex w-full items-center px-4 py-3 text-left font-primer text-lg font-semibold",
              selected === null && "border-primary/20 hover:border-primary/50 hover:bg-primary/5",
              selected === opt && opt === exercise.answer && "border-brand-lime bg-band-mint",
              selected === opt && opt !== exercise.answer && "border-brand-coral bg-band-coral",
              selected && selected !== opt && opt === exercise.answer && "border-brand-lime bg-band-mint/50"
            )}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
