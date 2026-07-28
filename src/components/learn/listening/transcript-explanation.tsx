"use client";
import { BookOpenText } from "lucide-react";
import { SpeakButton } from "@/components/learn/reading/word-lookup";

// Dòng từ vựng do admin lưu có dạng:  "• sunny (/ˈsʌn.i/) — trời nắng"
// (phần IPA trong ngoặc có thể vắng). Tách ra để hiển thị từ tiếng Anh TO, có
// nút loa — thay cho cách in cả dòng như một chuỗi trơn.
const VOCAB_LINE = /^•\s*(.+?)\s*(?:\(([^)]*)\)\s*)?[—–-]\s*(.*)$/;

interface VocabRow {
  en: string;
  ipa: string;
  vi: string;
}

function parseVocab(line: string): VocabRow | null {
  const m = line.match(VOCAB_LINE);
  if (!m) return null;
  const en = m[1].trim();
  if (!en) return null;
  return { en, ipa: (m[2] ?? "").trim(), vi: (m[3] ?? "").trim() };
}

/**
 * Hiển thị bản dịch & giảng lời thoại (tiếng Việt) ở phần chữa bài. Nội dung là
 * text gọn do admin lưu (AI sinh): tóm tắt + "— Dịch lời thoại —" + "— Từ vựng —"
 * với các dòng "• …". Ta tô đậm các tiêu đề mục và dựng lại thẻ từ vựng cho dễ học.
 */
export function TranscriptExplanation({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-violet-200 bg-gradient-to-b from-violet-50/70 to-white shadow-soft dark:border-violet-500/25 dark:from-violet-500/10 dark:to-transparent">
      <div className="flex items-center gap-2 border-b border-violet-100 bg-violet-50/70 px-4 py-3 text-sm font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/15 dark:text-violet-300">
        <BookOpenText className="h-4 w-4" /> Dịch &amp; giảng lời thoại
      </div>
      <div className="space-y-1.5 p-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        {lines.map((raw, i) => {
          const line = raw.trim();
          if (!line) return <div key={i} className="h-1" aria-hidden />;
          const header = line.match(/^—\s*(.+?)\s*—$/);
          if (header) {
            return (
              <div
                key={i}
                className="pt-1.5 text-xs font-bold uppercase tracking-wide text-violet-600 dark:text-violet-300"
              >
                {header[1]}
              </div>
            );
          }
          if (line.startsWith("•")) {
            const v = parseVocab(line);
            if (!v) {
              return (
                <div key={i} className="flex gap-1.5 pl-1">
                  <span className="text-violet-400 dark:text-violet-300">•</span>
                  <span>{line.replace(/^•\s*/, "")}</span>
                </div>
              );
            }
            return (
              <div
                key={i}
                className="flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 dark:bg-white/[0.04]"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-primer text-base font-bold text-violet-700 dark:text-violet-200">{v.en}</span>
                  {v.ipa && <span className="ml-1.5 text-xs text-muted-foreground">{v.ipa}</span>}
                  <span className="block text-sm">{v.vi}</span>
                </div>
                <SpeakButton text={v.en} className="h-10 w-10" />
              </div>
            );
          }
          return <p key={i}>{line}</p>;
        })}
      </div>
    </div>
  );
}
