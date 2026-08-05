"use client";
// Danh sách câu của một bộ phim, sửa được tại chỗ.
//
// Nghe thử từng câu là thao tác QUAN TRỌNG NHẤT ở đây: mốc thời gian chỉ đúng
// khi tai người xác nhận, không có cách nào kiểm bằng mắt. Nút ▶ vì vậy đứng
// ngay cạnh mỗi dòng chứ không nằm trong menu.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Trash2, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { lineDuration, type CartoonLine } from "@/lib/cartoons";

/** Trần độ dài một câu — khớp với server action và validate.ts. */
const MAX_LINE_SEC = 12;

interface Props {
  lines: CartoonLine[];
  onChange: (lines: CartoonLine[]) => void;
  onPreview: (line: CartoonLine) => void;
}

const fmt = (n: number) => n.toFixed(1);

export function LineList({ lines, onChange, onPreview }: Props) {
  function patch(i: number, next: Partial<CartoonLine>) {
    onChange(lines.map((l, j) => (j === i ? { ...l, ...next } : l)));
  }

  /** Xê dịch một mốc. Bấm nút nhanh hơn gõ số, và không gõ nhầm được. */
  function nudge(i: number, field: "start" | "end", delta: number) {
    const value = Number((lines[i][field] + delta).toFixed(1));
    patch(i, { [field]: Math.max(0, value) } as Partial<CartoonLine>);
  }

  if (lines.length === 0) {
    return (
      <p className="rounded-xl border-2 border-dashed p-6 text-center text-sm font-semibold text-muted-foreground">
        Chưa có câu nào. Dán phụ đề hoặc bắt mốc bằng tay ở trên.
      </p>
    );
  }

  const sorted = [...lines].sort((a, b) => a.start - b.start);
  let prevEnd = -Infinity;
  const problems = sorted.map((l) => {
    const bad =
      l.end <= l.start
        ? "Mốc kết thúc phải lớn hơn mốc bắt đầu"
        : l.start < prevEnd
          ? "Chồng lên câu trước"
          : lineDuration(l) > MAX_LINE_SEC
            ? `Dài quá ${MAX_LINE_SEC}s — bé không nhắc lại nổi`
            : "";
    prevEnd = l.end;
    return bad;
  });

  return (
    <div className="space-y-2">
      {sorted.map((l, i) => {
        const problem = problems[i];
        // Index trong mảng GỐC — danh sách hiển thị đã sắp lại theo thời gian.
        const at = lines.indexOf(l);
        return (
          <div
            key={`${l.start}-${at}`}
            className={cn(
              "space-y-2 rounded-xl border p-3",
              problem ? "border-rose-300 bg-rose-50/60 dark:bg-rose-500/5" : "bg-muted/40",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-6 shrink-0 text-center text-xs font-bold text-muted-foreground">
                {i + 1}
              </span>

              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" onClick={() => nudge(at, "start", -0.2)} aria-label="Lùi mốc đầu">
                  −
                </Button>
                <span className="w-12 text-center font-mono text-xs">{fmt(l.start)}</span>
                <Button size="sm" variant="ghost" onClick={() => nudge(at, "start", 0.2)} aria-label="Tiến mốc đầu">
                  +
                </Button>
              </div>

              <ArrowLeftRight className="h-3.5 w-3.5 text-muted-foreground" />

              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" onClick={() => nudge(at, "end", -0.2)} aria-label="Lùi mốc cuối">
                  −
                </Button>
                <span className="w-12 text-center font-mono text-xs">{fmt(l.end)}</span>
                <Button size="sm" variant="ghost" onClick={() => nudge(at, "end", 0.2)} aria-label="Tiến mốc cuối">
                  +
                </Button>
              </div>

              <span className="text-xs font-semibold text-muted-foreground">
                {fmt(lineDuration(l))}s
              </span>

              <div className="ml-auto flex items-center gap-1">
                <Button size="sm" variant="ghost" onClick={() => onPreview(l)} aria-label="Nghe thử câu này">
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onChange(lines.filter((_, j) => j !== at))}
                  aria-label="Xoá câu"
                >
                  <Trash2 className="h-4 w-4 text-rose-500" />
                </Button>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Input
                value={l.text}
                onChange={(e) => patch(at, { text: e.target.value })}
                placeholder="Câu tiếng Anh"
                className="font-primer"
              />
              <Input
                value={l.vi}
                onChange={(e) => patch(at, { vi: e.target.value })}
                placeholder="Nghĩa tiếng Việt (cho bố mẹ — có thể để trống)"
              />
            </div>

            {problem && <p className="text-xs font-bold text-rose-600">⚠ {problem}</p>}
          </div>
        );
      })}
    </div>
  );
}
