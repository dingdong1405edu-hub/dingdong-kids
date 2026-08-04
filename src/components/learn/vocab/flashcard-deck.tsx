"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { markWord } from "@/lib/utils";
import { playWord } from "@/lib/speech";
import type { VocabWordCard } from "@/types";

interface Props {
  words: VocabWordCard[];
  onDone: () => void;
}

/**
 * Bước 5: ôn lại các từ của bài bằng flashcard. Chạm vào thẻ để lật giữa mặt TỪ
 * tiếng Anh và mặt NGHĨA; chiều lật đổi được cả hai hướng.
 */
export function FlashcardDeck({ words, onDone }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [wordFront, setWordFront] = useState(true);

  const word = words[index];
  const isLast = index === words.length - 1;
  const pct = Math.round(((index + 1) / words.length) * 100);
  const example = word.examples[0];

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => Math.min(words.length - 1, Math.max(0, i + delta)));
  }

  const wordFace = (
    <div className="flex flex-col items-center gap-2">
      {/* Từ đang học ≥40px và dùng phông tập đọc — mặt chữ a/g một tầng. */}
      <div className="font-primer text-6xl font-bold leading-none tracking-wide">{word.word}</div>
      {word.ipa && <div className="text-lg font-semibold text-muted-foreground">{word.ipa}</div>}
    </div>
  );
  const meaningFace = (
    <div className="flex flex-col items-center gap-1.5 px-4 text-center">
      <div className="font-display text-2xl font-extrabold">{word.meaning}</div>
      {example && (
        <div className="mt-1 w-full border-t-2 border-border pt-2 text-sm">
          <div className="font-primer text-base">
            {markWord(example.sentence, word.word).map((seg, i) => (
              <span key={i} className={seg.match ? "font-bold text-brand-gold" : "text-foreground"}>
                {seg.text}
              </span>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">— {example.meaning}</div>
        </div>
      )}
    </div>
  );
  const front = wordFront ? wordFace : meaningFace;
  const back = wordFront ? meaningFace : wordFace;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Thanh tiến trình ôn flashcard — cho học viên thấy đang ôn tới đâu */}
      <div className="w-full max-w-sm space-y-1.5">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-display font-extrabold">
            Thẻ {index + 1}/{words.length}
          </span>
          <button
            type="button"
            onClick={() => {
              setWordFront((v) => !v);
              setFlipped(false);
            }}
            className="inline-flex items-center gap-1 rounded-full border-2 border-border bg-card px-3 py-0.5 text-xs font-extrabold transition-colors hover:bg-band-sun"
          >
            <RefreshCw className="h-3 w-3" />
            {wordFront ? "Từ → Nghĩa" : "Nghĩa → Từ"}
          </button>
        </div>
        <Progress value={pct} className="h-2.5" />
      </div>

      <div
        className="relative h-64 w-full max-w-sm cursor-pointer select-none"
        style={{ perspective: 1000 }}
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Hai mặt thẻ: nền gradient nắng ấm, bo cực lớn, bóng ám nâu. */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-b from-band-sun to-card shadow-soft-lg"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {front}
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-b from-band-mint to-card shadow-soft-lg"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {back}
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => go(-1)} disabled={index === 0}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        {/* Nút loa to hơn hai nút mũi tên — đây là hành động chính của thẻ từ. */}
        <Button
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            playWord({ word: word.word, audioUrl: word.audioUrl });
          }}
        >
          <Volume2 className="mr-1.5 h-5 w-5" /> Nghe
        </Button>
        {isLast ? (
          <Button variant="candy" onClick={onDone}>
            Hoàn thành
          </Button>
        ) : (
          <Button variant="outline" size="icon" onClick={() => go(1)}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
      <p className="text-sm font-semibold text-muted-foreground">Chạm vào thẻ để lật</p>
    </div>
  );
}
