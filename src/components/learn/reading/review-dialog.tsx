"use client";
import { Send, Flag, CircleHelp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  total: number;
  answeredCount: number;
  unanswered: number[];
  flagged: number[];
  onJump: (i: number) => void;
  onConfirm: () => void;
  submitting: boolean;
}

function Chips({
  nums,
  className,
  onJump,
  onOpenChange,
}: {
  nums: number[];
  className: string;
  onJump: (i: number) => void;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {nums.map((i) => (
        <button
          key={i}
          onClick={() => {
            onJump(i);
            onOpenChange(false);
          }}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-transform hover:scale-110",
            className,
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export function ReviewDialog({
  open,
  onOpenChange,
  total,
  answeredCount,
  unanswered,
  flagged,
  onJump,
  onConfirm,
  submitting,
}: ReviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85dvh] max-w-md overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle>Kiểm tra lại nào!</DialogTitle>
          <DialogDescription>
            Bé đã trả lời <b>{answeredCount}/{total}</b> câu.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {unanswered.length > 0 && (
            <div className="space-y-2">
              <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
                <CircleHelp className="h-4 w-4" /> Còn bỏ trống ({unanswered.length}) — bấm số để quay lại
              </span>
              <Chips
                nums={unanswered}
                className="border-primary/40 bg-primary/10 text-primary"
                onJump={onJump}
                onOpenChange={onOpenChange}
              />
            </div>
          )}

          {flagged.length > 0 && (
            <div className="space-y-2">
              <span className="flex items-center gap-1.5 text-sm font-bold text-amber-600 dark:text-amber-300">
                <Flag className="h-4 w-4" /> Bé đã đánh dấu ({flagged.length})
              </span>
              <Chips
                nums={flagged}
                className="border-sunny bg-sunny/20 text-amber-600 dark:text-amber-300"
                onJump={onJump}
                onOpenChange={onOpenChange}
              />
            </div>
          )}

          {unanswered.length === 0 && (
            <p className="rounded-2xl bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              Tuyệt vời — bé đã làm hết tất cả các câu! 🎉
            </p>
          )}
        </div>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" className="rounded-2xl" onClick={() => onOpenChange(false)} disabled={submitting}>
            Làm tiếp
          </Button>
          <Button onClick={onConfirm} disabled={submitting} className="btn-chunky gap-1.5 rounded-2xl">
            <Send className="h-4 w-4" /> {submitting ? "Đang nộp…" : "Nộp bài"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
