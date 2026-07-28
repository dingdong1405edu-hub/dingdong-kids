"use client";
import { useMemo, useState } from "react";
import { splitPassageTokens } from "@/components/learn/reading/types";
import { WordLookup, type LookupAnchor } from "@/components/learn/reading/word-lookup";
import { cn } from "@/lib/utils";

interface LookupTextProps {
  text: string;
  className?: string;
}

/**
 * Hiển thị một câu tiếng Anh mà MỖI TỪ đều bấm được để tra nghĩa: chạm vào từ sẽ
 * bật popup phiên âm IPA + nghĩa tiếng Việt + câu ví dụ (dùng chung WordLookup
 * của module Đọc).
 *
 * Chỉ dùng cho câu NGỮ CẢNH (câu bé đọc để hiểu bài), tuyệt đối không dùng cho
 * các lựa chọn đáp án — nếu không sẽ lộ đáp án.
 *
 * Đơn vị tra là TỪ chứ không phải ký tự: tiếng Anh có khoảng trắng làm ranh giới
 * từ nên chỉ cần tách theo khoảng trắng/dấu câu là đủ. Dấu câu và chữ tiếng Việt
 * render bình thường, không bấm được.
 */
export function LookupText({ text, className }: LookupTextProps) {
  const tokens = useMemo(() => splitPassageTokens(text), [text]);
  const [anchor, setAnchor] = useState<LookupAnchor | null>(null);

  return (
    <>
      <span className={cn("font-primer", className)}>
        {tokens.map((tk, i) =>
          tk.isWord ? (
            <span
              key={i}
              role="button"
              tabIndex={0}
              onClick={(e) => setAnchor({ word: tk.text, x: e.clientX, y: e.clientY })}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  setAnchor({ word: tk.text, x: r.left + r.width / 2, y: r.bottom });
                }
              }}
              className="cursor-pointer rounded underline decoration-dotted decoration-muted-foreground/50 underline-offset-4 transition-colors hover:bg-primary/15 hover:decoration-primary"
            >
              {tk.text}
            </span>
          ) : (
            <span key={i}>{tk.text}</span>
          ),
        )}
      </span>
      {anchor && <WordLookup anchor={anchor} onClose={() => setAnchor(null)} />}
    </>
  );
}
