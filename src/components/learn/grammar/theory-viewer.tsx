"use client";
import { Fragment } from "react";
import { MapPin, Lightbulb, Sparkles, Target, AlertTriangle, ListTree } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { SpeakButton } from "@/components/learn/reading/word-lookup";
import { LookupText } from "./lookup-text";
import type { TheorySection } from "@/types";

/** Chỉ render ảnh khi URL trông thật (http(s) tuyệt đối hoặc đường dẫn gốc, không
 *  có khoảng trắng) — để chỗ trống mẫu còn sót như "https://... (tuỳ chọn)" không
 *  biến thành ảnh hỏng trên màn hình của bé. */
function isImageUrl(u?: string): boolean {
  return !!u && /^(https?:\/\/|\/)\S+$/.test(u.trim());
}

/** Bộ màu cho từng ô của công thức — thẻ chip, số thứ tự, viền trái của thẻ giải
 *  nghĩa và nhãn vai trò dùng CHUNG một màu, nhờ vậy bé nhìn là biết ô nào trong
 *  công thức ứng với lời giải nghĩa nào bên dưới. Đánh theo vị trí ô. */
const PART_COLORS = [
  {
    chip: "border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-500/45 dark:bg-sky-500/15 dark:text-sky-100",
    badge: "bg-sky-500 text-white",
    accent: "border-l-sky-400 dark:border-l-sky-500/50",
    pill: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200",
  },
  {
    chip: "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-500/45 dark:bg-rose-500/15 dark:text-rose-100",
    badge: "bg-rose-500 text-white",
    accent: "border-l-rose-400 dark:border-l-rose-500/50",
    pill: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
  },
  {
    chip: "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/45 dark:bg-emerald-500/15 dark:text-emerald-100",
    badge: "bg-emerald-500 text-white",
    accent: "border-l-emerald-400 dark:border-l-emerald-500/50",
    pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  },
  {
    chip: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-500/45 dark:bg-amber-500/15 dark:text-amber-100",
    badge: "bg-amber-500 text-white",
    accent: "border-l-amber-400 dark:border-l-amber-500/50",
    pill: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  },
  {
    chip: "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-500/45 dark:bg-violet-500/15 dark:text-violet-100",
    badge: "bg-violet-500 text-white",
    accent: "border-l-violet-400 dark:border-l-violet-500/50",
    pill: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200",
  },
  {
    chip: "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-900 dark:border-fuchsia-500/45 dark:bg-fuchsia-500/15 dark:text-fuchsia-100",
    badge: "bg-fuchsia-500 text-white",
    accent: "border-l-fuchsia-400 dark:border-l-fuchsia-500/50",
    pill: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-200",
  },
] as const;

function colorAt(i: number) {
  return PART_COLORS[i % PART_COLORS.length];
}

/** Tách công thức kiểu "I + am + happy" thành từng ô đã cắt khoảng trắng. */
function splitFormula(structure: string): string[] {
  return structure
    .split("+")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Tiêu đề nhỏ của một khối, kèm biểu tượng. */
function SectionLabel({
  icon: Icon,
  children,
  className,
}: {
  icon: typeof Sparkles;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2 text-sm font-extrabold", className)}>
      <Icon className="h-4 w-4" /> {children}
    </div>
  );
}

/** Phần giải thích tự do: một đoạn thì giữ nguyên, nhiều dòng thì tách thành các
 *  dòng có chấm tròn cho những dòng bắt đầu bằng "-", "•" hoặc "*". */
function ExplanationBody({ text }: { text: string }) {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return (
      <p className="whitespace-pre-line text-[17px] leading-relaxed text-foreground/90">{text}</p>
    );
  }
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const bullet = /^[-–•*]\s+/.test(line);
        const content = bullet ? line.replace(/^[-–•*]\s+/, "") : line;
        return (
          <div key={i} className="flex gap-2 text-[17px] leading-relaxed text-foreground/90">
            {bullet && (
              <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
            )}
            <span>{content}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Trình bày MỘT mẫu câu tiếng Anh cho bé mới học: tên mẫu câu, ảnh minh hoạ,
 *  KHUNG công thức chia thành các ô màu, giải nghĩa từng ô (mỗi ô một thẻ), khi
 *  nào dùng, phần giải thích, lỗi hay gặp, và các ví dụ theo tình huống (mỗi ví
 *  dụ có nút loa để nghe đọc). Chỉ đọc các trường lý thuyết nên nhận cả một
 *  GrammarSection đầy đủ. */
export function TheoryViewer({ section }: { section: TheorySection }) {
  const breakdown = section.breakdown ?? [];
  const hasBreakdown = breakdown.length > 0;

  // Các ô của công thức: ưu tiên dựng từ phần giải nghĩa tác giả viết (để ô và
  // thẻ giải nghĩa trùng màu theo thứ tự), nếu không có thì cắt từ chuỗi công thức.
  const chips = hasBreakdown
    ? breakdown.map((p) => p.part)
    : section.structure
      ? splitFormula(section.structure)
      : [];

  return (
    <div className="space-y-5">
      {/* Tiêu đề */}
      <div className="space-y-1 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">{section.title}</h2>
        {section.titleEn && (
          <p className="font-primer text-lg font-bold text-primary">{section.titleEn}</p>
        )}
      </div>

      {/* Ảnh minh hoạ của mục (nếu có) */}
      {isImageUrl(section.imageUrl) && (
        <div className="overflow-hidden rounded-3xl border-2 bg-muted/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={section.imageUrl}
            alt={section.title}
            className="mx-auto max-h-64 w-full object-contain"
          />
        </div>
      )}

      {/* Khung công thức — mỗi ô là một chip có màu riêng */}
      {chips.length > 0 && (
        <div className="relative rounded-3xl border-2 border-primary/25 bg-gradient-to-br from-sky-50 to-white px-4 py-6 shadow-soft dark:border-primary/30 dark:from-primary/15 dark:to-transparent">
          <span className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-primary-foreground">
            Mẫu câu
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2.5">
            {chips.map((c, i) => {
              const color = colorAt(i);
              return (
                <Fragment key={i}>
                  {i > 0 && (
                    <span className="text-2xl font-extrabold text-primary/40">+</span>
                  )}
                  <span
                    className={cn(
                      "font-primer inline-flex items-center gap-1.5 rounded-2xl border-2 px-3 py-1.5 text-2xl font-bold leading-none",
                      color.chip,
                    )}
                  >
                    {hasBreakdown && (
                      <span
                        className={cn(
                          "font-sans flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold",
                          color.badge,
                        )}
                      >
                        {i + 1}
                      </span>
                    )}
                    {c}
                  </span>
                </Fragment>
              );
            })}
          </div>
          {section.structure && (
            <div className="mt-3 flex justify-center">
              <SpeakButton text={section.structure.replace(/\s*\+\s*/g, " ")} label="Nghe mẫu câu" />
            </div>
          )}
        </div>
      )}

      {/* Giải nghĩa từng ô — phần quan trọng nhất: ô nào cũng được nói rõ */}
      {hasBreakdown && (
        <div className="space-y-2.5">
          <SectionLabel icon={ListTree} className="text-primary">
            Từng phần nghĩa là gì?
          </SectionLabel>
          {breakdown.map((p, i) => {
            const color = colorAt(i);
            return (
              <div
                key={i}
                className={cn("rounded-2xl border-2 border-l-[6px] bg-card px-4 py-3", color.accent)}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
                      color.badge,
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="font-primer text-xl font-bold">{p.part}</span>
                      {p.role && (
                        <span className={cn("rounded-full px-2 py-0.5 text-xs font-bold", color.pill)}>
                          {p.role}
                        </span>
                      )}
                    </div>
                    {p.meaning && (
                      <p className="text-[15px] leading-relaxed text-foreground/85">{p.meaning}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Khi nào dùng */}
      {section.usage && (
        <div className="rounded-2xl border-2 border-sky-200 bg-sky-50/70 px-4 py-3 dark:border-sky-500/30 dark:bg-sky-500/10">
          <SectionLabel icon={Target} className="mb-1 text-sky-700 dark:text-sky-300">
            Khi nào dùng?
          </SectionLabel>
          <p className="whitespace-pre-line text-[17px] leading-relaxed text-foreground/90">
            {section.usage}
          </p>
        </div>
      )}

      {/* Giải thích */}
      {section.explanation && (
        <div className="rounded-2xl border-l-[6px] border-primary/60 bg-primary/5 px-4 py-3">
          <SectionLabel icon={Lightbulb} className="mb-1.5 text-primary">
            Ding giải thích
          </SectionLabel>
          <ExplanationBody text={section.explanation} />
        </div>
      )}

      {/* Lỗi các bạn hay quên */}
      {section.mistakes && section.mistakes.length > 0 && (
        <div className="space-y-2.5">
          <SectionLabel icon={AlertTriangle} className="text-orange-600 dark:text-orange-400">
            Bạn nào cũng hay quên chỗ này
          </SectionLabel>
          {section.mistakes.map((m, i) => (
            <div
              key={i}
              className="space-y-1.5 rounded-2xl border-2 border-orange-200 bg-orange-50/60 px-4 py-3 dark:border-orange-500/30 dark:bg-orange-500/10"
            >
              {m.wrong && (
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 font-extrabold text-orange-500">✕</span>
                  <span className="font-primer text-base text-orange-700/90 line-through decoration-orange-400/70 dark:text-orange-200/90">
                    {m.wrong}
                  </span>
                </div>
              )}
              {m.right && (
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 font-extrabold text-emerald-600 dark:text-emerald-400">✓</span>
                  <LookupText text={m.right} className="text-base font-bold" />
                  <SpeakButton text={m.right} className="h-9 w-9" label="Nghe câu đúng" />
                </div>
              )}
              {m.note && <p className="pl-6 text-[13px] text-muted-foreground">{m.note}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Ví dụ theo tình huống */}
      {section.examples.length > 0 && (
        <div className="space-y-2.5">
          <SectionLabel icon={Sparkles} className="text-amber-600 dark:text-amber-400">
            Nghe thử trong đời thật
          </SectionLabel>
          {section.examples.map((ex, i) => (
            <Card key={i} className="overflow-hidden border-l-[6px] border-l-sunny">
              <CardContent className="space-y-2 p-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                  <MapPin className="h-3 w-3" /> {ex.situation}
                </div>
                {isImageUrl(ex.imageUrl) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ex.imageUrl}
                    alt={ex.situation}
                    className="max-h-48 w-full rounded-2xl border-2 object-contain"
                  />
                )}
                <div className="flex w-full items-start gap-2 text-left">
                  <LookupText text={ex.sentence} className="text-xl font-bold leading-relaxed" />
                  <SpeakButton text={ex.sentence} audioUrl={ex.audioUrl} label="Nghe câu này" />
                </div>
                <div className="text-[15px] text-foreground/80">{ex.meaning}</div>
                {ex.note && (
                  <div className="flex items-start gap-1.5 rounded-2xl bg-amber-50 px-3 py-2 text-[13px] text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                    <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{ex.note}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
