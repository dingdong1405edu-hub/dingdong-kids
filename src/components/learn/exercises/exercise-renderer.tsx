"use client";
// Single switch that maps any Exercise to its UI. Shared by the grammar
// flashcard phase and the comprehensive test runner so both stay in sync as
// new exercise types are added. Every UI honours the same
// `{ exercise, onAnswer, disabled }` contract.
import { MatchExerciseUI } from "./match-exercise";
import { TranslateExerciseUI } from "./translate-exercise";
import { SentenceOrderExerciseUI } from "./sentence-order-exercise";
import { FillBlankExerciseUI } from "./fill-blank-exercise";
import { AnswerQuestionExerciseUI } from "./answer-question-exercise";
import { TypeSentenceExerciseUI } from "./type-sentence-exercise";
import { PictureMatchExerciseUI } from "./picture-match-exercise";
import { ListenPickExerciseUI } from "./listen-pick-exercise";
import { SpellDragExerciseUI } from "./spell-drag-exercise";
import { RhymeMatchExerciseUI } from "./rhyme-match-exercise";
import type { Exercise } from "@/types";

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean, answer?: string) => void;
  disabled: boolean;
}

export function ExerciseRenderer({ exercise, onAnswer, disabled }: Props) {
  const common = { onAnswer, disabled } as const;
  switch (exercise.type) {
    case "match":
      return <MatchExerciseUI exercise={exercise as never} {...common} />;
    case "translate":
      return <TranslateExerciseUI exercise={exercise as never} {...common} />;
    case "sentenceOrder":
    case "sentence_order":
      return <SentenceOrderExerciseUI exercise={exercise as never} {...common} />;
    case "fill_blank":
      return <FillBlankExerciseUI exercise={exercise as never} {...common} />;
    case "answer_question":
      return <AnswerQuestionExerciseUI exercise={exercise as never} {...common} />;
    case "type_sentence":
      return <TypeSentenceExerciseUI exercise={exercise as never} {...common} />;
    // --- dành riêng cho trẻ nhỏ (chưa đọc thạo): ảnh + audio là chính ---
    case "picture_match":
      return <PictureMatchExerciseUI exercise={exercise as never} {...common} />;
    case "listen_pick":
      return <ListenPickExerciseUI exercise={exercise as never} {...common} />;
    case "spell_drag":
      return <SpellDragExerciseUI exercise={exercise as never} {...common} />;
    case "rhyme_match":
      return <RhymeMatchExerciseUI exercise={exercise as never} {...common} />;
    default:
      return (
        <div className="text-center text-sm text-muted-foreground">
          Loại bài tập không hỗ trợ: {String(exercise.type)}
        </div>
      );
  }
}
