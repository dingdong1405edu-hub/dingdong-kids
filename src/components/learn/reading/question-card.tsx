"use client";
import { CheckCircle2, XCircle, Flag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AnswerExplanation } from "@/components/learn/answer-explanation";
import { cn } from "@/lib/utils";
import { SpeakButton } from "./word-lookup";
import type { ReadingOption, ReadingQuestion } from "./types";

interface QuestionCardProps {
  question: ReadingQuestion;
  index: number;
  userAnswer: unknown;
  onAnswer: (value: unknown) => void;
  submitted: boolean;
  isCorrect?: boolean;
  flagged: boolean;
  onToggleFlag: () => void;
  isCurrent: boolean;
  onActivate: () => void;
  /** Tô sáng + cuộn tới chỗ chứa đáp án trong đoạn văn (chỉ dùng khi đã nộp). */
  onShowEvidence?: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

/** Ép `options` (JsonValue) về mảng lựa chọn; dữ liệu hỏng → mảng rỗng. */
function toOptions(raw: unknown): ReadingOption[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((o) => {
      if (typeof o === "string") return { text: o };
      if (o && typeof o === "object") {
        const r = o as Record<string, unknown>;
        return {
          text: typeof r.text === "string" ? r.text : "",
          imageUrl: typeof r.imageUrl === "string" && r.imageUrl ? r.imageUrl : undefined,
          translation: typeof r.translation === "string" ? r.translation : undefined,
        };
      }
      return { text: "" };
    })
    .filter((o) => o.text || o.imageUrl);
}

export function QuestionCard({
  question: q,
  index,
  userAnswer,
  onAnswer,
  submitted,
  isCorrect,
  flagged,
  onToggleFlag,
  isCurrent,
  onActivate,
  onShowEvidence,
  cardRef,
}: QuestionCardProps) {
  const ca = q.correctAnswer as { index?: number; value?: boolean; text?: string; accepted?: string[] };
  const correctText = ca.text ?? ca.accepted?.[0];
  const options = toOptions(q.options);
  // Có ảnh cho lựa chọn → xếp lưới 2 cột để bé chọn bằng hình.
  const pictureOptions = options.some((o) => o.imageUrl);

  return (
    <div
      ref={cardRef}
      onMouseDown={onActivate}
      className={cn(
        "relative rounded-3xl border-2 bg-card p-4 pl-5 transition-colors",
        submitted
          ? isCorrect
            ? "border-emerald-300 dark:border-emerald-500/40"
            : "border-rose-300 dark:border-rose-500/40"
          : isCurrent
            ? "border-primary/50"
            : "border-border",
      )}
    >
      {/* vạch nhấn câu hiện tại / đã gắn cờ */}
      <span
        className={cn(
          "absolute inset-y-4 left-0 w-1.5 rounded-full transition-colors",
          submitted
            ? isCorrect
              ? "bg-emerald-400"
              : "bg-rose-400"
            : flagged
              ? "bg-sunny"
              : isCurrent
                ? "bg-primary"
                : "bg-transparent",
        )}
      />

      <div className="flex items-start gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {index + 1}
        </span>
        {submitted &&
          (isCorrect ? (
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-500" />
          ) : (
            <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-rose-500" />
          ))}
        <div className="font-primer min-w-0 flex-1 text-[17px] font-semibold leading-snug">{q.prompt}</div>
        <SpeakButton text={q.prompt} audioUrl={q.audioUrl} label="Nghe đọc câu hỏi" />
        <button
          type="button"
          onClick={onToggleFlag}
          aria-label={flagged ? "Bỏ đánh dấu" : "Đánh dấu để xem lại"}
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 transition-colors",
            flagged
              ? "border-sunny bg-sunny/20 text-amber-600 dark:text-amber-300"
              : "border-transparent text-muted-foreground hover:bg-muted",
          )}
        >
          <Flag className={cn("h-4 w-4", flagged && "fill-current")} />
        </button>
      </div>

      {/* Ảnh minh hoạ của riêng câu hỏi */}
      {q.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={q.imageUrl}
          alt=""
          className="mt-3 h-40 w-full rounded-2xl object-cover sm:h-48"
        />
      )}

      {/* Câu hỏi dịch (khi chữa bài) */}
      {submitted && q.promptTranslation && (
        <p className="mt-1.5 pl-9 text-sm italic text-muted-foreground">{q.promptTranslation}</p>
      )}

      {/* MCQ */}
      {q.type === "MCQ" && (
        <div className={cn("mt-3", pictureOptions ? "grid grid-cols-2 gap-2.5" : "space-y-2.5")}>
          {options.map((opt, oi) => (
            <button
              key={oi}
              onClick={() => onAnswer(oi)}
              disabled={submitted}
              className={cn(
                "flex w-full gap-2 rounded-2xl border-2 p-3 text-left text-[15px] transition-colors",
                pictureOptions ? "flex-col items-stretch" : "items-start",
                userAnswer === oi
                  ? submitted
                    ? oi === ca.index
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15"
                      : "border-rose-400 bg-rose-50 dark:bg-rose-500/15"
                    : "border-primary bg-primary/10"
                  : submitted && oi === ca.index
                    ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                    : "border-input hover:border-primary/50",
              )}
            >
              {opt.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={opt.imageUrl} alt="" className="h-24 w-full rounded-xl object-cover" />
              )}
              <span className={cn("flex gap-2", pictureOptions ? "items-center" : "min-w-0 flex-1 items-start")}>
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                    submitted && oi === ca.index && "border-emerald-500 bg-emerald-500 text-white",
                  )}
                >
                  {String.fromCharCode(65 + oi)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-primer block font-semibold leading-snug">{opt.text}</span>
                  {submitted && opt.translation && (
                    <span className="mt-0.5 block font-sans text-xs font-normal not-italic text-muted-foreground">
                      {opt.translation}
                    </span>
                  )}
                </span>
                {submitted && oi === ca.index && (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Đúng / Sai */}
      {q.type === "TRUE_FALSE" && (
        <div className="mt-3 flex gap-2.5">
          {[true, false].map((val) => (
            <button
              key={String(val)}
              onClick={() => onAnswer(val)}
              disabled={submitted}
              className={cn(
                "flex-1 rounded-2xl border-2 p-3 text-base font-bold transition-colors",
                userAnswer === val
                  ? submitted
                    ? val === ca.value
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15"
                      : "border-rose-400 bg-rose-50 dark:bg-rose-500/15"
                    : "border-primary bg-primary/10"
                  : submitted && val === ca.value
                    ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                    : "border-input hover:border-primary/50",
              )}
            >
              {val ? "Đúng 👍" : "Sai 👎"}
            </button>
          ))}
        </div>
      )}

      {/* Điền từ / trả lời ngắn */}
      {(q.type === "FILL_BLANK" || q.type === "SHORT_ANSWER") && (
        <div className="mt-3 space-y-2">
          <Input
            value={(userAnswer as string) ?? ""}
            onChange={(e) => onAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Bé viết câu trả lời ở đây…"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className={cn(
              "font-primer h-12 rounded-2xl text-base",
              submitted &&
                (isCorrect
                  ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-500/15"
                  : "border-rose-300 bg-rose-50 dark:bg-rose-500/15"),
            )}
          />
          {submitted && !isCorrect && correctText && (
            <p className="flex items-center gap-1.5 text-sm text-emerald-700 dark:text-emerald-300">
              Đáp án đúng là <span className="font-primer font-bold">{correctText}</span>
              <SpeakButton text={correctText} />
            </p>
          )}
        </div>
      )}

      {/* Loại câu hỏi chưa hỗ trợ thì báo nhẹ nhàng thay vì chặn cả bài */}
      {q.type === "MATCHING" && (
        <p className="mt-3 rounded-2xl bg-muted p-3 text-sm text-muted-foreground">
          Dạng bài nối chưa có ở phiên bản này.
        </p>
      )}

      {submitted &&
        q.supportingQuote &&
        (onShowEvidence ? (
          <button
            type="button"
            onClick={onShowEvidence}
            className="mt-3 block w-full rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-left text-sm text-emerald-800 transition-colors hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/25"
          >
            <span className="font-semibold">📍 Câu trả lời nằm ở đây:</span>{" "}
            <span className="font-primer font-semibold">{q.supportingQuote}</span>
            {q.quoteTranslation && (
              <span className="mt-1 block italic text-emerald-700/80 dark:text-emerald-300/80">
                “{q.quoteTranslation}”
              </span>
            )}
            <span className="mt-1 block text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Bấm để xem chỗ đó trong bài đọc →
            </span>
          </button>
        ) : (
          <div className="mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-200">
            <span className="font-semibold">📍 Câu trả lời nằm ở đây:</span>{" "}
            <span className="font-primer font-semibold">{q.supportingQuote}</span>
            {q.quoteTranslation && (
              <span className="mt-1 block italic text-emerald-700/80 dark:text-emerald-300/80">
                “{q.quoteTranslation}”
              </span>
            )}
          </div>
        ))}
      {submitted && <AnswerExplanation explanation={q.explanation} className="mt-2" />}
    </div>
  );
}
