"use client";

import { motion } from "framer-motion";
import { ChapterBanner } from "./chapter-banner";
import { LessonNode } from "./lesson-node";
import type { CourseTheme, LessonStatus, RoadmapLessonDTO } from "@/lib/roadmap";

// ===== Hình học đường đi uốn lượn (toạ độ px, không gian cố định 320px) =====
const COL_W = 320;
const CENTER = COL_W / 2;
const AMP = 92; // biên độ lệch ngang — càng lớn đường càng uốn lượn
const SIZE = 84; // đường kính node (to cho ngón tay trẻ nhỏ)
const R = SIZE / 2;
const STEP = 126; // khoảng cách dọc giữa tâm các node
// Chừa đủ chỗ phía trên node đầu tiên cho bong bóng "Bắt đầu" (đặt ở -top-10 so
// với node + chiều cao bong bóng). Cần >= R + ~55 để bong bóng không tràn lên banner.
const TOP = 96;
const BOTTOM = 48;
const ANG = 0.78; // bước pha của sóng sin

/** Emoji cảnh vật rải hai bên đường đi cho bản đồ sinh động (thuần trang trí). */
const SCENERY = ["🌳", "☁️", "🌼", "🦋", "🌈", "🐦", "🍄", "⭐"];

interface Point {
  x: number;
  y: number;
}

/** Đường cong mượt (cubic) đi qua các tâm node — điểm điều khiển ở giữa theo trục Y. */
function buildPath(pts: Point[]): string {
  if (pts.length === 0) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const my = (p0.y + p1.y) / 2;
    d += ` C ${p0.x.toFixed(1)} ${my.toFixed(1)}, ${p1.x.toFixed(1)} ${my.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }
  return d;
}

interface ChapterPathProps {
  index: number;
  title: string;
  /** Nhóm "Chưa phân chương" — ẩn nhãn "Chặng N". */
  unchaptered?: boolean;
  lessons: RoadmapLessonDTO[];
  statuses: LessonStatus[];
  /** Lệch pha sóng sin để đường đi nối liền mạch giữa các chương. */
  phaseOffset: number;
  theme: CourseTheme;
  onSelect: (lesson: RoadmapLessonDTO) => void;
  onTrophy: (unlocked: boolean) => void;
}

export function ChapterPath({
  index,
  title,
  unchaptered = false,
  lessons,
  statuses,
  phaseOffset,
  theme,
  onSelect,
  onTrophy,
}: ChapterPathProps) {
  const count = lessons.length + 1; // + node phần thưởng cuối chương
  const pts: Point[] = Array.from({ length: count }, (_, i) => ({
    x: CENTER + Math.sin((phaseOffset + i) * ANG) * AMP,
    y: TOP + i * STEP,
  }));
  const height = TOP + (count - 1) * STEP + R + BOTTOM;

  const doneInChapter = statuses.filter((s) => s === "done").length;
  const currentLocal = statuses.indexOf("current");
  const chapterComplete = doneInChapter === lessons.length;

  // Node "đã đi tới" (để vẽ phần đường tô màu): nếu chương hoàn tất thì kéo tới
  // node phần thưởng; nếu có bài đang học thì tô đúng tới node đó (đúng cả khi
  // tiến độ không liền mạch); ngược lại dừng ở bài xong cuối cùng.
  let reachedIndex: number;
  if (chapterComplete) reachedIndex = count - 1;
  else if (currentLocal >= 0) reachedIndex = currentLocal;
  else reachedIndex = doneInChapter - 1;

  const fullD = buildPath(pts);
  const progressD = reachedIndex >= 1 ? buildPath(pts.slice(0, reachedIndex + 1)) : "";

  return (
    <section className="space-y-3">
      <ChapterBanner
        index={index}
        title={title}
        unchaptered={unchaptered}
        theme={theme}
        done={doneInChapter}
        total={lessons.length}
      />

      <div className="relative mx-auto" style={{ width: COL_W, height }}>
        {/* Cảnh vật hai bên đường — đặt lệch khỏi node để không che vùng chạm */}
        {pts.slice(0, -1).map((p, i) => {
          const left = p.x < CENTER; // node lệch trái → cảnh vật bên phải
          const emoji = SCENERY[(phaseOffset + i) % SCENERY.length];
          return (
            <span
              key={`deco-${i}`}
              aria-hidden
              className="pointer-events-none absolute select-none text-2xl opacity-45"
              style={{
                left: left ? p.x + R + 26 : p.x - R - 50,
                top: p.y - 6,
              }}
            >
              {emoji}
            </span>
          );
        })}

        <svg
          width={COL_W}
          height={height}
          viewBox={`0 0 ${COL_W} ${height}`}
          fill="none"
          className="absolute inset-0 text-zinc-300 dark:text-zinc-700"
          aria-hidden
        >
          {/* Đường nền: nét chấm tròn như những viên đá lát */}
          <path
            d={fullD}
            stroke="currentColor"
            strokeWidth={9}
            strokeLinecap="round"
            strokeDasharray="1 22"
            opacity={0.85}
          />
          {/* Đường tiến độ tô màu, vẽ dần khi cuộn tới */}
          {progressD && (
            <>
              <motion.path
                d={progressD}
                stroke={theme.pathColor}
                strokeWidth={11}
                strokeLinecap="round"
                opacity={0.22}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
              <motion.path
                d={progressD}
                stroke={theme.pathColor}
                strokeWidth={6}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            </>
          )}
        </svg>

        {lessons.map((lesson, i) => (
          <div
            key={lesson.id}
            className="absolute"
            style={{ left: pts[i].x - R, top: pts[i].y - R, width: SIZE, height: SIZE }}
          >
            <LessonNode
              status={statuses[i]}
              order={lesson.order}
              icon={lesson.icon}
              label={lesson.topic}
              theme={theme}
              size={SIZE}
              onClick={() => onSelect(lesson)}
            />
          </div>
        ))}

        {/* Node phần thưởng cuối chương */}
        <div
          className="absolute"
          style={{
            left: pts[count - 1].x - R,
            top: pts[count - 1].y - R,
            width: SIZE,
            height: SIZE,
          }}
        >
          <LessonNode
            kind="trophy"
            status={chapterComplete ? "done" : "locked"}
            theme={theme}
            size={SIZE}
            label={unchaptered ? "Phần thưởng" : `Phần thưởng chặng ${index}`}
            onClick={() => onTrophy(chapterComplete)}
          />
        </div>
      </div>
    </section>
  );
}
