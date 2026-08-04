"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Flag, Lock, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChapterPath } from "./chapter-path";
import { LessonDetailDialog } from "./lesson-detail-dialog";
import {
  themeFor,
  levelToSlug,
  type LessonStatus,
  type RoadmapLessonDTO,
} from "@/lib/roadmap";

interface RoadmapMapProps {
  level: string;
  courseTitle: string;
  /** Dòng phụ tiếng Việt của khoá (Course.subtitle). */
  courseSubtitle?: string | null;
  lessons: RoadmapLessonDTO[];
  /** Người dùng đã mở khoá toàn bộ lộ trình cấp này (đã mua / admin). */
  hasFullAccess: boolean;
  /** Id gói lộ trình của cấp này (để link sang trang thanh toán). */
  upgradePlanId: string | null;
  /** Số bài đầu được học miễn phí. */
  freePreviewCount: number;
  /** Số từ vựng lộ trình đến hạn ôn (SRS) — >0 thì hiện banner "Ôn tập tổng hợp". */
  reviewDueCount?: number;
  /** Admin: bỏ khoá tuần tự — bấm vào bài nào cũng vào được (để test nội dung). */
  freeNavigation?: boolean;
}

interface Chapter {
  order: number;
  title: string;
  unchaptered: boolean; // nhóm "Chưa phân chương" (bài chưa gán chương nào)
  lessons: RoadmapLessonDTO[];
  startIndex: number; // chỉ số toàn cục của bài đầu chương
  phaseOffset: number; // lệch pha sóng (gồm cả node phần thưởng các chương trước)
}

/** Trang bản đồ học của một khoá tiếng Anh (Duolingo-style). */
export function RoadmapMap({
  level,
  courseTitle,
  courseSubtitle,
  lessons,
  hasFullAccess,
  upgradePlanId,
  freePreviewCount,
  reviewDueCount = 0,
  freeNavigation = false,
}: RoadmapMapProps) {
  const theme = themeFor(level);
  const [selected, setSelected] = useState<RoadmapLessonDTO | null>(null);
  const slug = levelToSlug(level);

  const total = lessons.length;
  const doneCount = lessons.filter((l) => l.completed).length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const currentIndex = lessons.findIndex((l) => !l.completed);

  const upgradeHref = upgradePlanId ? `/payment?plan=${upgradePlanId}` : "/payment";

  // Bài bị khoá vì chưa mua luôn hiển thị "locked"; còn lại theo tiến độ tuần tự.
  // Admin (freeNavigation): các bài chưa xong đều "available" — mở sẵn để test,
  // không cần hoàn thành bài/chương trước.
  const statusFor = (index: number): LessonStatus => {
    const l = lessons[index];
    if (l.accessLocked) return "locked";
    if (l.completed) return "done";
    if (index === currentIndex) return "current";
    return freeNavigation ? "available" : "locked";
  };

  // Gom bài thành chương, giữ nguyên thứ tự; tính lệch pha cho sóng sin liền mạch.
  const chapters = useMemo<Chapter[]>(() => {
    const out: Chapter[] = [];
    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i];
      const last = out[out.length - 1];
      if (!last || last.order !== l.chapterOrder) {
        out.push({
          order: l.chapterOrder,
          // chapter=null ⟺ bài chưa phân chương (chương thật luôn có tên trong cache).
          title: l.chapter ?? "Chưa phân chặng",
          unchaptered: l.chapter == null,
          lessons: [l],
          startIndex: i,
          phaseOffset: 0,
        });
      } else {
        last.lessons.push(l);
      }
    }
    // Sau khi biết kích thước từng chương: mỗi chương chiếm (số bài + 1 node thưởng) bước pha.
    let phase = 0;
    for (const c of out) {
      c.phaseOffset = phase;
      phase += c.lessons.length + 1;
    }
    return out;
  }, [lessons]);

  function handleSelect(lesson: RoadmapLessonDTO) {
    // Khoá do chưa mua → mở hộp thoại ở chế độ "nâng cấp".
    if (lesson.accessLocked) {
      setSelected(lesson);
      return;
    }
    const idx = lessons.findIndex((l) => l.id === lesson.id);
    if (statusFor(idx) === "locked") {
      toast.info("Bé học xong bài trước để mở bài này nhé 🔒");
      return;
    }
    setSelected(lesson);
  }

  function handleTrophy(unlocked: boolean) {
    toast[unlocked ? "success" : "info"](
      unlocked
        ? "🎉 Giỏi quá! Bé đã đi hết cả chặng này."
        : "Học hết các bài trong chặng để mở hộp quà nhé 🎁",
    );
  }

  return (
    <div className="space-y-6">
      {/* Header khoá học */}
      <div className={cn("relative overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-white shadow-soft-lg sm:p-6", theme.hero)}>
        <div className="relative z-10">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white/85 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Tất cả lộ trình
          </Link>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-card/20 px-2.5 py-0.5 text-xs font-extrabold backdrop-blur">
                <span aria-hidden>{theme.emoji}</span> {theme.label} · {theme.age}
              </div>
              <h1 className="mt-1.5 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                {courseTitle}
              </h1>
              {courseSubtitle && <p className="text-sm font-semibold text-white/85">{courseSubtitle}</p>}
            </div>
            <div className="shrink-0 text-right">
              <div className="font-display text-3xl font-extrabold tabular-nums">{pct}%</div>
              <div className="text-[11px] font-semibold text-white/80">
                {doneCount}/{total} bài
              </div>
            </div>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-black/15">
            <div className="h-full rounded-full bg-card/90 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <span
          className="pointer-events-none absolute -right-4 -top-8 select-none text-[150px] leading-none opacity-15"
          aria-hidden
        >
          {theme.emoji}
        </span>
      </div>

      {/* Banner xem trước / nâng cấp (ẩn khi đã mở khoá đầy đủ).
          Nền và viền lấy thẳng từ theme (nhóm band-/brand-) nên đã tự dịu ở chế độ
          tối — không viết cặp dark: thủ công vì chúng đè mất màu thế giới của cấp. */}
      {!hasFullAccess && (
        <div className={cn("flex flex-col gap-3 rounded-3xl border-2 p-4 sm:flex-row sm:items-center sm:justify-between", theme.accentBorder, theme.accentSoft)}>
          <div className="flex items-start gap-3">
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white", theme.accentBg)}>
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="text-sm">
              <p className="font-display text-base font-extrabold">Bé đang học bản dùng thử</p>
              <p className="text-muted-foreground">
                {freePreviewCount} bài đầu miễn phí. Mở khoá {theme.label} để học trọn lộ trình.
              </p>
            </div>
          </div>
          <Link
            href={upgradeHref}
            className={cn(
              // Gờ 3D trung tính (cacao mờ) vì mặt nút mang màu riêng của từng cấp.
              "btn-chunky inline-flex shrink-0 items-center justify-center gap-1.5 px-5 py-2.5 font-display text-sm font-extrabold text-white transition-transform [--edge:hsl(var(--shadow-hue)/0.45)]",
              theme.accentBg
            )}
          >
            <Lock className="h-4 w-4" /> Mở khoá lộ trình
          </Link>
        </div>
      )}

      {/* Ôn tập tổng hợp: gom mọi từ vựng lộ trình đến hạn ôn (SRS).
          Dải nắng band-sun + viền mật ong — nhóm token này tự đổi theo chế độ tối
          nên không cần (và không được) viết cặp dark: thủ công. */}
      {reviewDueCount > 0 && (
        <Link
          href={`/roadmap/review?level=${slug}`}
          className="flex items-center justify-between gap-3 rounded-3xl border-2 border-brand-honey/45 bg-band-sun p-4 shadow-soft transition-colors hover:border-brand-gold"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-card text-2xl shadow-soft">
              <span aria-hidden>🔁</span>
            </div>
            <div>
              <div className="font-display text-base font-extrabold">Ôn lại từ đã học</div>
              <p className="text-sm text-muted-foreground">
                {reviewDueCount} từ đang chờ bé ôn — ôn đúng lúc thì nhớ rất lâu.
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-brand-gold" />
        </Link>
      )}

      {/* Bản đồ các chặng */}
      <div className="space-y-2 pb-6">
        {chapters.map((ch, ci) => {
          const statuses = ch.lessons.map((_, i) => statusFor(ch.startIndex + i));
          return (
            <div key={ch.startIndex} className="space-y-2">
              {ci > 0 && (
                <div className="flex justify-center gap-1.5 py-1" aria-hidden>
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/25" />
                  ))}
                </div>
              )}
              <ChapterPath
                index={ch.order}
                title={ch.title}
                unchaptered={ch.unchaptered}
                lessons={ch.lessons}
                statuses={statuses}
                phaseOffset={ch.phaseOffset}
                theme={theme}
                onSelect={handleSelect}
                onTrophy={handleTrophy}
              />
            </div>
          );
        })}

        {/* Cờ đích cuối lộ trình */}
        <div className="flex flex-col items-center gap-2 pt-4 text-center">
          <div className={cn("flex h-16 w-16 items-center justify-center rounded-3xl text-white shadow-chunky-sm", theme.accentBg)}>
            <Flag className="h-8 w-8 fill-white/30" />
          </div>
          <p className="font-display text-base font-extrabold">
            {pct === 100 ? "Về đích rồi! 🎊" : `Còn ${total - doneCount} bài nữa là tới đích`}
          </p>
        </div>
      </div>

      <LessonDetailDialog
        lesson={selected}
        levelLabel={theme.label}
        levelSlug={slug}
        theme={theme}
        locked={selected?.accessLocked ?? false}
        upgradeHref={upgradeHref}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </div>
  );
}
