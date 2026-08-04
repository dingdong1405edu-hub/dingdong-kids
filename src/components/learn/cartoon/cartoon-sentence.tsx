"use client";
// Câu tiếng Anh của một cảnh phim.
//
// Sau khi bé nói xong, mỗi từ được tô theo kết quả máy nghe được (`flags`):
// từ nghe rõ thì sáng lên, từ chưa nghe thấy thì mờ đi. Đây là phần phản hồi có
// giá trị nhất của cả bài — nó chỉ đúng CHỖ bé cần nói lại, thay vì chỉ đưa ra
// một con số. Trước khi nói thì không có `flags`, câu hiện bình thường.
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  vi: string;
  /** Kết quả khớp theo từng từ (cùng thứ tự với từ trong `text`). */
  flags?: boolean[];
  /** Ẩn chữ tiếng Anh — chế độ khó, bé chỉ nghe rồi nhắc lại. */
  hideEnglish?: boolean;
  className?: string;
}

export function CartoonSentence({ text, vi, flags, hideEnglish, className }: Props) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <div className={cn("text-center", className)}>
      {hideEnglish ? (
        <p className="font-display text-2xl font-extrabold tracking-[0.3em] text-muted-foreground/50">
          • • • • •
        </p>
      ) : (
        <p className="font-primer text-2xl font-bold leading-snug sm:text-3xl">
          {words.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className={cn(
                "transition-colors",
                flags
                  ? flags[i]
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground/45"
                  : undefined,
              )}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      )}
      <p className="mt-1.5 text-sm font-semibold text-muted-foreground">{vi}</p>
    </div>
  );
}
