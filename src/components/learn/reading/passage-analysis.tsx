"use client";
import { useState } from "react";
import { BookOpenText, ChevronDown, Languages, ListTree } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpeakButton } from "./word-lookup";
import type { PassageAnalysisSentence } from "./types";

/** Coerce dữ liệu JSON thô (Prisma JsonValue) → danh sách câu phân tích an toàn. */
function coerceSentences(raw: unknown): PassageAnalysisSentence[] {
  if (!Array.isArray(raw)) return [];
  const out: PassageAnalysisSentence[] = [];
  for (const it of raw) {
    if (!it || typeof it !== "object") continue;
    const r = it as Record<string, unknown>;
    const en = typeof r.en === "string" ? r.en.trim() : "";
    if (!en) continue;
    out.push({
      en,
      vi: typeof r.vi === "string" ? r.vi.trim() : "",
      note: typeof r.note === "string" && r.note.trim() ? r.note.trim() : undefined,
    });
  }
  return out;
}

/**
 * Khối "Dịch & giảng bài đọc" hiện ở phần CHỮA BÀI (sau khi nộp) của cả lộ trình
 * lẫn luyện kỹ năng. Gồm hai mục:
 *  - Dịch bài đọc: bản dịch tiếng Việt toàn bộ đoạn văn.
 *  - Từng câu một: câu tiếng Anh (có nút loa) + dịch + ghi chú ngắn.
 * Không có nội dung → không render gì.
 */
export function PassageAnalysis({
  translation,
  analysis,
}: {
  translation?: string | null;
  analysis?: unknown;
}) {
  const sentences = coerceSentences(analysis);
  const translationLines = (translation ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const [open, setOpen] = useState(true);

  if (translationLines.length === 0 && sentences.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-sky-200 bg-gradient-to-b from-sky-50/70 to-white shadow-soft dark:border-sky-500/25 dark:from-sky-500/10 dark:to-transparent">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 border-b border-sky-100 bg-sky-50/70 px-4 py-3 text-left text-sm font-bold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/15 dark:text-sky-300"
      >
        <BookOpenText className="h-4 w-4 shrink-0" />
        <span className="flex-1">Dịch &amp; giảng bài đọc</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="space-y-4 p-4">
          {translationLines.length > 0 && (
            <section className="space-y-1.5">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-sky-600 dark:text-sky-300">
                <Languages className="h-3.5 w-3.5" /> Cả bài nói gì?
              </h4>
              <div className="space-y-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                {translationLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </section>
          )}

          {sentences.length > 0 && (
            <section className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-sky-600 dark:text-sky-300">
                <ListTree className="h-3.5 w-3.5" /> Từng câu một
              </h4>
              <ol className="space-y-2.5">
                {sentences.map((s, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-sky-100 bg-white/70 p-3 dark:border-sky-500/15 dark:bg-white/[0.03]"
                  >
                    <div className="flex gap-2">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[11px] font-bold text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-start gap-1.5">
                          <span className="font-primer min-w-0 flex-1 text-[15px] font-semibold leading-snug text-foreground">
                            {s.en}
                          </span>
                          <SpeakButton text={s.en} className="h-9 w-9" label="Nghe đọc câu này" />
                        </div>
                        {s.vi && <p className="text-sm italic text-muted-foreground">{s.vi}</p>}
                        {s.note && (
                          <p className="rounded-xl bg-sky-50 px-2.5 py-1.5 text-xs leading-relaxed text-sky-800 dark:bg-sky-500/10 dark:text-sky-200">
                            {s.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
