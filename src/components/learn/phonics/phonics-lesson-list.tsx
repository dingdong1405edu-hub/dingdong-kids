// Danh sách 8 bài Ghép vần. Thẻ to, emoji lớn, ít chữ — bé nhìn hình là biết
// bấm vào đâu. Không cần "use client": chỉ hiển thị, không có tương tác riêng.
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface PhonicsLessonItem {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  /** Tổng số thẻ trong bài (cả thẻ dạy âm). */
  cardCount: number;
  /** Số thẻ có tính điểm. */
  scoredCount: number;
  /** % cao nhất bé từng đạt. */
  bestScore: number;
  completed: boolean;
}

export function PhonicsLessonList({ lessons }: { lessons: PhonicsLessonItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {lessons.map((l, i) => (
        <Link
          key={l.id}
          href={`/phonics/${l.id}`}
          className={cn(
            "sticker group flex flex-col gap-3 rounded-3xl bg-card p-5 transition-transform hover:-translate-y-1",
            l.completed && "bg-gradient-to-br from-emerald-50 to-card dark:from-emerald-500/10",
          )}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-primary/10 text-5xl">
              <span aria-hidden>{l.emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs font-extrabold text-muted-foreground">Bài {i + 1}</span>
                {l.completed && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> Đã xong
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-extrabold leading-tight">{l.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{l.subtitle}</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
              <span>
                {l.cardCount} thẻ · {l.scoredCount} câu hỏi
              </span>
              <span className="tabular-nums">{l.bestScore}%</span>
            </div>
            <Progress value={l.bestScore} className="h-3" />
          </div>

          <div className="flex items-center justify-end gap-1 font-display text-sm font-extrabold text-primary">
            {l.completed ? "Chơi lại" : l.bestScore > 0 ? "Học tiếp" : "Bắt đầu"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}
