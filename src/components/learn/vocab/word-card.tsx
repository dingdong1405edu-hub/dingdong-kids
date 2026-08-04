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
      {/* Khối thẻ từ — "ngôi sao" của phần Từ vựng: nền gradient nắng ấm, bo rất
          tròn, từ tiếng Anh cỡ đại. Bé nhận ra thẻ trước cả khi kịp đọc chữ. */}
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-band-sun to-card p-6 shadow-soft-lg sm:p-7">
        <div className="flex flex-col items-center gap-2">
          {/* Với trẻ chưa đọc thạo, ảnh là kênh truyền đạt chính (CLAUDE.md §6).
              Nhún nhẹ để thẻ trông "sống", trẻ dán mắt vào hình lâu hơn. */}
          {word.imageUrl && (
            <Image
              src={word.imageUrl}
              alt={word.meaning}
              width={220}
              height={220}
              className="sticker mb-2 h-44 w-44 animate-bob rounded-2xl object-cover sm:h-52 sm:w-52"
            />
          )}
          <div className="font-primer text-6xl font-bold leading-none tracking-wide text-foreground sm:text-7xl">
            {word.word}
          </div>
          {/* Phiên âm nhỏ hơn và màu chữ phụ — nó phục vụ bố mẹ, không phải bé. */}
          {word.ipa && <div className="text-2xl font-semibold text-muted-foreground">{word.ipa}</div>}
          <div className="font-display text-xl font-extrabold text-foreground">{word.meaning}</div>
          {word.partOfSpeech && <div className="eyebrow text-brand-gold">{word.partOfSpeech}</div>}
          {/* Nút loa TO và luôn thấy — với bé chưa đọc chữ, đây là nút chính. */}
          <Button
            size="lg"
            className="mt-3"
            onClick={() => playWord({ word: word.word, audioUrl: word.audioUrl })}
          >
            <Volume2 className="mr-1.5 h-6 w-6" /> Nghe lại
          </Button>
          <WordReportButton wordId={word.id} word={word.word} />
        </div>
      </div>

      {word.examples.length > 0 && (
        <div className="w-full max-w-md space-y-3 text-left">
          <div className="eyebrow text-brand-gold">Ví dụ</div>
          {word.examples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => playWord({ word: ex.sentence, audioUrl: ex.audioUrl })}
              className="block w-full rounded-xl bg-card p-4 text-left shadow-soft transition-all duration-200 ease-toy hover:-translate-y-0.5 hover:shadow-soft-lg"
            >
              <div className="font-primer text-xl">
                {markWord(ex.sentence, word.word).map((seg, j) =>
                  seg.match ? (
                    <span key={j} className="font-bold text-brand-gold">
                      {seg.text}
                    </span>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  )
                )}
              </div>
              {ex.meaning && (
                <div className="mt-0.5 text-sm text-muted-foreground">{ex.meaning}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
