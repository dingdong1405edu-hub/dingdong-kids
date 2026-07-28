"use client";
// Các mảnh giao diện dùng chung cho MỌI loại thẻ Ghép vần: chữ khổng lồ trên
// dòng kẻ tập viết, nút chọn đáp án cỡ ngón tay trẻ, và khối phản hồi
// "khen trước — sửa sau".
//
// Để riêng ở đây (không nhét vào @/lib) vì chỉ phần Phonics dùng.
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playWord } from "@/lib/speech";
import { emitDing } from "@/lib/ding-bus";
import { cn } from "@/lib/utils";

/**
 * PRNG có hạt giống: server và client xáo trộn ra CÙNG thứ tự nên không lệch
 * hydrate. (Math.random sẽ làm React cảnh báo và nhảy đáp án.)
 */
export function seededRandom(seed: number): () => number {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Câu lệnh của thẻ — ngắn, to, dễ đọc cho bé (và cho bố mẹ đọc hộ). */
export function CardPrompt({ children }: { children: React.ReactNode }) {
  return <p className="text-center font-display text-xl font-extrabold leading-snug sm:text-2xl">{children}</p>;
}

/**
 * Chữ/âm hiển thị RẤT TO trên nền dòng kẻ 4 ly — bé nhìn mặt chữ là chính, nên
 * cỡ chữ không được nhỏ hơn 96px.
 */
export function BigGlyph({
  children,
  className,
  tone = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "primary" | "ink";
}) {
  return (
    // Dùng <span> (không phải <div>) để đặt được bên trong <button> — thẻ dạy âm
    // cho phép bấm thẳng vào chữ để nghe.
    <span className="writing-lines mx-auto flex h-44 w-full max-w-sm items-center justify-center rounded-3xl bg-muted/30 sm:h-52">
      <span
        className={cn(
          "font-primer text-[96px] font-bold leading-none sm:text-[128px]",
          tone === "primary" ? "text-primary" : "text-foreground",
          className,
        )}
      >
        {children}
      </span>
    </span>
  );
}

export type ChoiceState = "idle" | "right" | "wrong" | "dim";

/** Nút chọn đáp án: to, bo tròn, viền dày — ngón tay bé bấm không trượt. */
export function ChoiceButton({
  children,
  state,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  state: ChoiceState;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex min-h-[96px] flex-col items-center justify-center gap-1 rounded-3xl border-4 px-4 py-4 text-center transition-all duration-150",
        state === "idle" &&
          "border-border bg-card hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft active:translate-y-[2px]",
        state === "right" && "animate-pop-in border-emerald-400 bg-emerald-50 dark:bg-emerald-500/15",
        state === "wrong" && "animate-wrong border-rose-400",
        state === "dim" && "border-border/60 bg-card opacity-45",
      )}
    >
      {children}
    </button>
  );
}

const PRAISE = ["Giỏi quá!", "Chuẩn luôn!", "Tuyệt vời!", "Bé nghe tinh thật!", "Đúng rồi đó!"];
const CHEER = [
  "Suýt đúng rồi! Nghe lại một lần nữa nhé.",
  "Không sao đâu, âm này khó mà. Bé thử lại nhé!",
  "Bé đã rất cố gắng! Cùng nghe lại nào.",
];

/**
 * Khối phản hồi sau khi bé chọn. Nguyên tắc: KHEN trước, rồi mới chỉ chỗ cần
 * sửa — không bao giờ dùng chữ "sai", "kém".
 * Trả lời đúng thì tự đọc lại từ để bé gắn âm với mặt chữ.
 */
export function AnswerFeedback({
  ok,
  answerLabel,
  reveal,
  note,
  onNext,
}: {
  ok: boolean;
  /** Đáp án đúng, hiện lại khi bé chọn chưa trúng. */
  answerLabel: string;
  reveal?: { emoji: string; word: string; meaning: string; audioUrl?: string | null };
  note?: string;
  onNext: () => void;
}) {
  // Chỉ mount sau khi bé bấm chọn (hoàn toàn phía client) nên random ở đây an toàn.
  const [line] = useState(() =>
    ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : CHEER[Math.floor(Math.random() * CHEER.length)],
  );

  useEffect(() => {
    emitDing(ok ? "correct" : "wrong");
    // Đúng → nghe lại từ ngay để nhớ âm; chưa đúng → nghe lại đáp án đúng.
    if (reveal?.word) playWord({ word: reveal.word, audioUrl: reveal.audioUrl });
  }, [ok, reveal?.word, reveal?.audioUrl]);

  return (
    <div
      className={cn(
        "animate-pop-in space-y-3 rounded-3xl border-4 p-4",
        ok
          ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-500/10"
          : "border-amber-300 bg-amber-50 dark:bg-amber-500/10",
      )}
    >
      <div className="flex items-center gap-2 font-display text-lg font-extrabold sm:text-xl">
        {ok ? (
          <span className="flex gap-0.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-star-pop text-2xl"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                ⭐
              </span>
            ))}
          </span>
        ) : (
          <span className="text-2xl" aria-hidden>
            🌈
          </span>
        )}
        <span>{ok ? line : `Chưa đúng rồi! Đáp án là “${answerLabel}”.`}</span>
      </div>

      {!ok && <p className="text-[15px] font-semibold text-muted-foreground">{line}</p>}

      {reveal && (
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 dark:bg-black/20">
          <span className="text-5xl" aria-hidden>
            {reveal.emoji}
          </span>
          <div>
            <div className="font-primer text-3xl font-bold">{reveal.word}</div>
            <div className="text-sm font-semibold text-muted-foreground">{reveal.meaning}</div>
          </div>
        </div>
      )}

      {note && <p className="text-[15px] leading-relaxed text-muted-foreground">💡 {note}</p>}

      <Button
        className="btn-chunky w-full gap-1.5 rounded-2xl py-6 font-display text-lg font-extrabold"
        onClick={onNext}
      >
        Tiếp tục <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
