"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, markWord } from "@/lib/utils";
import { playWord } from "@/lib/speech";
import { WordReportButton } from "@/components/learn/vocab/word-report-button";
import type { SrsRating } from "@/lib/srs";
import type { VocabWordCard } from "@/types";

interface Props {
  word: VocabWordCard;
  /** Từ mới (chưa từng ôn) → đổi lời nhắc cho phù hợp. */
  isNew?: boolean;
  /** Cho phép "Phản ánh từ này" — tắt ở lộ trình (từ là JSON, không có VocabWord). */
  allowReport?: boolean;
  onRate: (rating: SrsRating) => void;
}

/**
 * Bốn mức nhớ, mỗi mức một khối màu brand riêng để bé/phụ huynh phân biệt bằng
 * MÀU chứ không phải bằng chữ. Dùng token brand + band nên chế độ tối tự lo —
 * trước đây bảng này là bảng màu mặc định Tailwind kèm cặp `dark:` viết tay.
 */
const RATINGS: { rating: SrsRating; label: string; hint: string; cls: string }[] = [
  { rating: "again", label: "Quên", hint: "1 phút", cls: "border-brand-coral text-brand-coral hover:bg-band-coral" },
  { rating: "hard", label: "Khó", hint: "1 ngày", cls: "border-brand-sun text-brand-gold hover:bg-band-sun" },
  { rating: "good", label: "Tốt", hint: "3 ngày", cls: "border-brand-lime text-brand-teal hover:bg-band-mint" },
  { rating: "easy", label: "Dễ", hint: "5 ngày+", cls: "border-brand-sky text-brand-blue hover:bg-band-sky" },
];

/**
 * Flashcard có lặp lại ngắt quãng: lật thẻ (hiệu ứng 3D) để xem phiên âm + nghĩa +
 * câu ví dụ, rồi TỰ ĐÁNH GIÁ mức nhớ (Quên/Khó/Tốt/Dễ). Mức này quy đổi thành
 * điểm chất lượng để xếp lịch ôn (src/lib/srs.ts).
 */
export function SrsFlashcard({ word, isNew, allowReport = true, onRate }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [rated, setRated] = useState(false);

  // Thẻ mới khi đổi từ.
  useEffect(() => {
    setRevealed(false);
    setRated(false);
  }, [word.id]);

  function reveal() {
    if (revealed) return;
    setRevealed(true);
    playWord({ word: word.word, audioUrl: word.audioUrl });
  }

  // Chặn bấm 2 lần (tránh chấm/đi tiếp 2 lần, bỏ sót thẻ kế).
  function rate(r: SrsRating) {
    if (rated) return;
    setRated(true);
    onRate(r);
  }

  const example = word.examples[0];

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
      <p className="font-display text-lg font-extrabold text-muted-foreground">
        {isNew ? "Từ mới — ghi nhớ rồi tự đánh giá" : "Bạn còn nhớ nghĩa từ này?"}
      </p>

      {/* Thẻ lật 3D */}
      <div className="w-full max-w-sm" style={{ perspective: 1200 }}>
        <motion.div
          onClick={reveal}
          animate={{ rotateY: revealed ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn("relative h-[19rem] w-full", !revealed && "cursor-pointer select-none")}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* MẶT TRƯỚC — từ tiếng Anh, nền gradient nắng ấm */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-b from-band-sun to-card p-6 text-center shadow-soft-lg"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <div className="font-primer text-6xl font-bold leading-none tracking-wide">
              {word.word}
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-sm font-extrabold text-muted-foreground">
              <RotateCw className="h-4 w-4" /> Chạm để lật thẻ &amp; nghe
            </div>
          </div>

          {/* MẶT SAU — phiên âm + nghĩa + ví dụ (luôn hiển thị) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-y-auto rounded-3xl bg-gradient-to-b from-band-mint to-card p-5 text-center shadow-soft-lg"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="font-primer text-4xl font-bold leading-none">{word.word}</div>
            {word.ipa && <div className="text-xl font-semibold text-muted-foreground">{word.ipa}</div>}
            <div className="font-display text-xl font-extrabold">{word.meaning}</div>
            {example ? (
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
            ) : (
              <div className="mt-1 border-t-2 border-border pt-2 text-xs italic text-muted-foreground">
                (Chưa có câu ví dụ cho từ này)
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {revealed ? (
        <>
          <div className="grid w-full max-w-sm grid-cols-4 gap-2">
            {RATINGS.map((r) => (
              <button
                key={r.rating}
                type="button"
                disabled={rated}
                onClick={() => rate(r.rating)}
                className={cn(
                  "flex flex-col items-center justify-center rounded-2xl border-[3px] bg-card py-2.5 font-display text-sm font-extrabold transition-all duration-200 ease-toy hover:-translate-y-0.5 disabled:opacity-50",
                  r.cls,
                )}
              >
                {r.label}
                {r.hint && (
                  <span className="text-[10px] font-bold text-muted-foreground">{r.hint}</span>
                )}
              </button>
            ))}
          </div>
          {allowReport && <WordReportButton wordId={word.id} word={word.word} />}
        </>
      ) : (
        <Button size="lg" onClick={reveal}>
          <Volume2 className="mr-1.5 h-5 w-5" /> Xem nghĩa &amp; nghe
        </Button>
      )}
    </div>
  );
}
