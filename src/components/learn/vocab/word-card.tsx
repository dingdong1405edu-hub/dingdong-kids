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
 *
 * KÍCH THƯỚC CO THEO CHIỀU CAO MÀN HÌNH (`clamp(... , ??vh, ...)`), không đặt
 * cứng. Thẻ này nằm trong `.study-frame` — khung cao đúng bằng màn hình — nên
 * nếu ảnh và chữ đặt cứng thì trên laptop 13" tổng chiều cao vượt khung, đẩy nút
 * "Tiếp tục" xuống dưới mép và bé phải cuộn mới bấm được. Dùng `vh` thì thẻ tự
 * thu lại trên màn thấp và nở ra trên màn cao, luôn vừa một khung hình.
 */
export function WordCard({ word }: Props) {
  // Tự đọc khi mở. Khoá theo word.id để phát lại mỗi khi luồng sang từ mới.
  useEffect(() => {
    playWord({ word: word.word, audioUrl: word.audioUrl });
  }, [word.id, word.word, word.audioUrl]);

  return (
    <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
      {/* Khối thẻ từ — "ngôi sao" của phần Từ vựng: nền gradient nắng ấm, bo rất
          tròn, từ tiếng Anh cỡ đại. Bé nhận ra thẻ trước cả khi kịp đọc chữ. */}
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-band-sun to-card p-4 shadow-soft-lg sm:p-6">
        <div className="flex flex-col items-center gap-1.5">
          {/* Với trẻ chưa đọc thạo, ảnh là kênh truyền đạt chính (CLAUDE.md §6).
              KHÔNG gắn hoạt hình nhún ở đây: ảnh nằm ngay giữa vùng bé đang nhìn,
              cho nó nhấp nhô liên tục thì cả thẻ trông như đang rung. */}
          {word.imageUrl && (
            <Image
              src={word.imageUrl}
              alt={word.meaning}
              width={220}
              height={220}
              className="sticker mb-1 aspect-square h-[clamp(88px,17vh,208px)] w-auto rounded-2xl object-cover"
            />
          )}
          <div className="font-primer text-[clamp(2.1rem,6.5vh,4.5rem)] font-bold leading-none tracking-wide text-foreground">
            {word.word}
          </div>
          {/* Phiên âm nhỏ hơn và màu chữ phụ — nó phục vụ bố mẹ, không phải bé. */}
          {word.ipa && (
            <div className="text-[clamp(0.95rem,2.2vh,1.5rem)] font-semibold leading-tight text-muted-foreground">
              {word.ipa}
            </div>
          )}
          <div className="font-display text-[clamp(1rem,2.4vh,1.35rem)] font-extrabold leading-tight text-foreground">
            {word.meaning}
          </div>
          {word.partOfSpeech && <div className="eyebrow text-brand-gold">{word.partOfSpeech}</div>}
          {/* Nút loa TO và luôn thấy — với bé chưa đọc chữ, đây là nút chính. */}
          <Button
            size="lg"
            className="mt-2"
            onClick={() => playWord({ word: word.word, audioUrl: word.audioUrl })}
          >
            <Volume2 className="mr-1.5 h-6 w-6" /> Nghe lại
          </Button>
          <WordReportButton wordId={word.id} word={word.word} />
        </div>
      </div>

      {word.examples.length > 0 && (
        <div className="w-full max-w-md space-y-2 text-left">
          <div className="eyebrow text-brand-gold">Ví dụ</div>
          {word.examples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => playWord({ word: ex.sentence, audioUrl: ex.audioUrl })}
              className="block w-full rounded-xl bg-card p-3 text-left shadow-soft transition-shadow duration-200 hover:shadow-soft-lg"
            >
              <div className="font-primer text-[clamp(0.95rem,2.2vh,1.25rem)] leading-snug">
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
                <div className="mt-0.5 text-sm leading-snug text-muted-foreground">{ex.meaning}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
