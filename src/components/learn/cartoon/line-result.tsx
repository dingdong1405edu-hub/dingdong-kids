"use client";
// Kết quả một lần bé nhắc lại câu trong phim.
//
// Thứ tự trên màn hình cố tình là SAO → LỜI KHEN → câu (đã tô màu) → mẹo: bé
// nhìn thấy phần thưởng trước, phần "cần sửa" sau. Không có nhãn tiêu cực nào;
// ít sao thì rủ bé nghe lại, không chê.
import { RotateCcw, Mic, ArrowRight, Volume2, Turtle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRow } from "@/components/learn/first-words/star-row";
import { CartoonSentence } from "./cartoon-sentence";
import { STARS_PER_LINE } from "@/lib/cartoons";

export interface LineResultData {
  stars: number;
  said: boolean;
  praise: string;
  tip: string;
  transcript: string;
  /** Khớp theo từng từ — để tô câu. Rỗng khi chưa chấm được (mạng hỏng…). */
  flags: boolean[];
}

interface Props {
  result: LineResultData;
  text: string;
  vi: string;
  /** Bố mẹ đã bật "hiện chữ máy nghe được" chưa. */
  showTranscript: boolean;
  isLast: boolean;
  onReplay: () => void;
  onReplaySlow: () => void;
  onRetry: () => void;
  onNext: () => void;
}

export function LineResult({
  result,
  text,
  vi,
  showTranscript,
  isLast,
  onReplay,
  onReplaySlow,
  onRetry,
  onNext,
}: Props) {
  return (
    <div className="w-full space-y-4">
      <StarRow value={result.stars} max={STARS_PER_LINE} size="lg" animate />

      <p className="text-center font-display text-xl font-extrabold">{result.praise}</p>

      <CartoonSentence
        text={text}
        vi={vi}
        flags={result.flags.length ? result.flags : undefined}
      />

      {result.tip && (
        <p className="mx-auto max-w-sm rounded-2xl bg-muted/60 px-4 py-2.5 text-center text-[13px] font-semibold text-muted-foreground">
          💡 {result.tip}
        </p>
      )}

      {/* Chỉ hiện khi bố mẹ bật — với bé thì "máy nghe thành gì" là thông tin
          gây rối, còn với bố mẹ thì đây là chỗ hiểu vì sao con bị ít sao. */}
      {showTranscript && (
        <p className="text-center text-xs font-semibold text-muted-foreground/70">
          Máy nghe được: {result.transcript.trim() ? `"${result.transcript}"` : "(không rõ tiếng)"}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          onClick={onReplay}
          className="h-14 flex-col gap-0.5 rounded-2xl text-[11px] font-bold"
        >
          <Volume2 className="h-5 w-5" />
          Nghe lại
        </Button>
        <Button
          variant="outline"
          onClick={onReplaySlow}
          className="h-14 flex-col gap-0.5 rounded-2xl text-[11px] font-bold"
        >
          <Turtle className="h-5 w-5" />
          Nghe chậm
        </Button>
        <Button
          variant="outline"
          onClick={onRetry}
          className="h-14 flex-col gap-0.5 rounded-2xl text-[11px] font-bold"
        >
          <Mic className="h-5 w-5" />
          Nói lại
        </Button>
      </div>

      <Button
        onClick={onNext}
        className="btn-chunky h-16 w-full rounded-2xl font-display text-lg font-extrabold"
      >
        {isLast ? "Xong rồi!" : "Xem tiếp"}
        {isLast ? <RotateCcw className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
      </Button>
    </div>
  );
}
