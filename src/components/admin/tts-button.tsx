"use client";
import { useState } from "react";
import { Loader2, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/**
 * Nút "🔊 Tạo audio" dùng chung cho MỌI ô nhập văn bản tiếng Anh trong trang
 * quản trị (từ vựng, câu hỏi, lời thoại bài nghe, câu hỏi bài nói, câu ví dụ…).
 *
 * Vì sao cần: người học là TRẺ EM 4–15 tuổi — rất nhiều bé chưa đọc thạo, nên
 * mọi từ và mọi câu tiếng Anh đều phải NGHE được. Trước đây admin phải tự thu
 * MP3; giờ máy chủ có giọng đọc tiếng Anh nên chỉ cần bấm một nút.
 *
 * Gọi `POST /api/admin/tts` với `{ text }` → nhận `{ url }` rồi trả về qua
 * `onDone` để form điền thẳng vào ô `audioUrl` tương ứng. Kết quả được máy chủ
 * cache theo nội dung câu, nên bấm lại cho cùng một câu không tốn thêm chi phí.
 */
export function TtsButton({
  text,
  onDone,
  disabled,
  label = "Tạo audio",
  title,
  className,
  size = "sm",
}: {
  /** Văn bản TIẾNG ANH cần đọc. Rỗng → nút bị khoá. */
  text: string;
  /** Nhận URL audio vừa tạo (dạng /api/files/...). */
  onDone: (url: string) => void;
  disabled?: boolean;
  label?: string;
  title?: string;
  className?: string;
  size?: "sm" | "xs";
}) {
  const [busy, setBusy] = useState(false);
  const clean = (text ?? "").trim();
  const off = disabled || busy || clean.length === 0;

  async function run() {
    if (off) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: clean }),
      });
      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (data.ok && data.url) {
        onDone(data.url);
        toast.success("Đã tạo audio.");
      } else {
        toast.error(data.error ?? "Tạo audio chưa được, thử lại nhé.");
      }
    } catch {
      toast.error("Lỗi kết nối khi tạo audio.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={run}
      disabled={off}
      title={title ?? (clean ? "Tạo audio đọc câu này" : "Nhập câu tiếng Anh trước đã")}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-brand-sky bg-band-sky font-semibold text-brand-sky transition hover:bg-band-sky disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-brand-sky/20",
        size === "xs" ? "h-8 px-2 text-xs" : "px-3 py-1.5 text-sm",
        className,
      )}
    >
      {busy ? (
        <Loader2 className={cn("animate-spin", size === "xs" ? "h-3.5 w-3.5" : "h-4 w-4")} />
      ) : (
        <Volume2 className={size === "xs" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      )}
      {busy ? "Đang tạo…" : label}
    </button>
  );
}
