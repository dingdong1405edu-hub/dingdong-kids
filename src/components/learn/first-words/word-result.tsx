"use client";
// Kết quả một lần bé nhắc lại. Thứ tự thông tin cố ý xếp theo mức độ bé hiểu
// được: SAO (bé hiểu) → lời khen ngắn (mẹ đọc cho bé) → mẹo nhỏ (cho mẹ).
//
// Hai nút nghe đặt cạnh nhau để bé so giọng mình với giọng cô — cách học phát âm
// hiệu quả nhất ở tuổi này, và cũng là trò bé thích lặp đi lặp lại.
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw, Volume2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRow } from "./star-row";

export interface WordResultData {
  stars: number;
  said: boolean;
  praise: string;
  tip: string;
  /** Máy nghe được gì — chỉ hiện khi bố mẹ bật "hiện chữ". */
  transcript?: string;
}

interface Props {
  result: WordResultData;
  showText: boolean;
  /** Có bản ghi giọng bé để nghe lại không. */
  hasRecording: boolean;
  isLast: boolean;
  onPlayModel: () => void;
  onPlayMine: () => void;
  onRetry: () => void;
  onNext: () => void;
}

export function WordResult({
  result,
  showText,
  hasRecording,
  isLast,
  onPlayModel,
  onPlayMine,
  onRetry,
  onNext,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full space-y-4"
    >
      <StarRow value={result.stars} size="lg" animate />

      <p className="text-center font-display text-xl font-extrabold">{result.praise}</p>

      {result.tip && (
        <p className="mx-auto max-w-sm rounded-2xl bg-muted/60 px-4 py-2.5 text-center text-[13px] font-semibold text-muted-foreground">
          💡 {result.tip}
        </p>
      )}

      {showText && result.transcript !== undefined && (
        <p className="text-center text-xs text-muted-foreground">
          Máy nghe được: <span className="font-primer">{result.transcript || "(không rõ)"}</span>
        </p>
      )}

      {/* So giọng: cô đọc ↔ bé đọc */}
      <div className="flex justify-center gap-3">
        <Button
          variant="outline"
          onClick={onPlayModel}
          className="btn-chunky h-14 rounded-2xl border-4 px-5 font-display font-extrabold"
        >
          <Volume2 className="mr-1.5 h-5 w-5" /> Giọng cô
        </Button>
        <Button
          variant="outline"
          onClick={onPlayMine}
          disabled={!hasRecording}
          className="btn-chunky h-14 rounded-2xl border-4 px-5 font-display font-extrabold"
        >
          <Headphones className="mr-1.5 h-5 w-5" /> Giọng bé
        </Button>
      </div>

      <div className="flex gap-3 pt-1">
        <Button
          variant="outline"
          onClick={onRetry}
          aria-label="Nói lại từ này"
          className="btn-chunky h-16 w-16 shrink-0 rounded-2xl border-4 p-0"
        >
          <RotateCcw className="h-7 w-7" strokeWidth={2.5} />
        </Button>
        <Button
          onClick={onNext}
          className="btn-chunky h-16 flex-1 rounded-2xl font-display text-lg font-extrabold"
        >
          {isLast ? "Xong rồi!" : "Từ tiếp theo"}
          <ArrowRight className="ml-1.5 h-6 w-6" strokeWidth={2.5} />
        </Button>
      </div>
    </motion.div>
  );
}
