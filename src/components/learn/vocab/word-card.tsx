"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markWord } from "@/lib/utils";
import { playWord } from "@/lib/speech";
import { WordReportButton } from "@/components/learn/vocab/word-report-button";
import type { VocabWordCard } from "@/types";

interface Props {
  word: VocabWordCard;
}

/**
 * Bước 1 của luồng học từng-từ: hiện từ và tự đọc to, kèm ảnh minh hoạ, phiên âm
 * IPA, nghĩa tiếng Việt và câu ví dụ có in đậm từ đang học.
 */
export function WordCard({ word }: Props) {
  // Tự đọc khi mở. Khoá theo word.id để phát lại mỗi khi luồng sang từ mới.
  useEffect(() => {
    playWord({ word: word.word, audioUrl: word.audioUrl });
  }, [word.id, word.word, word.audioUrl]);

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        {/* Với trẻ chưa đọc thạo, ảnh là kênh truyền đạt chính (CLAUDE.md §6). */}
        {word.imageUrl && (
          <Image
            src={word.imageUrl}
            alt={word.meaning}
            width={220}
            height={220}
            className="sticker mb-2 h-44 w-44 object-cover sm:h-52 sm:w-52"
          />
        )}
        <div className="font-primer text-6xl font-bold sm:text-7xl">{word.word}</div>
        {word.ipa && <div className="text-2xl text-muted-foreground">{word.ipa}</div>}
        <div className="text-lg font-medium">{word.meaning}</div>
        {word.partOfSpeech && (
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            {word.partOfSpeech}
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          className="mt-1"
          onClick={() => playWord({ word: word.word, audioUrl: word.audioUrl })}
        >
          <Volume2 className="mr-1.5 h-4 w-4" /> Nghe lại
        </Button>
        <WordReportButton wordId={word.id} word={word.word} />
      </div>

      {word.examples.length > 0 && (
        <div className="w-full max-w-md space-y-3 text-left">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Ví dụ
          </div>
          {word.examples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => playWord({ word: ex.sentence, audioUrl: ex.audioUrl })}
              className="block w-full rounded-lg border bg-card p-3 text-left transition-colors hover:border-primary/40 hover:bg-accent"
            >
              <div className="font-primer text-xl">
                {markWord(ex.sentence, word.word).map((seg, j) =>
                  seg.match ? (
                    <span key={j} className="font-bold text-primary">
                      {seg.text}
                    </span>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  )
                )}
              </div>
              {ex.meaning && <div className="mt-0.5 text-sm">{ex.meaning}</div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
