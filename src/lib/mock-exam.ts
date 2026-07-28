import type { Skill } from "@prisma/client";

// Nhãn cho từng phần của đề thi thử — đặt theo đúng tên các "paper" trong kỳ thi
// Cambridge English cho trẻ em (Young Learners: Starters/Movers/Flyers, rồi
// A2 Key & B1 Preliminary for Schools).
export const EXAM_SECTION_META: Record<string, { label: string; en: string }> = {
  LISTENING: { label: "Nghe", en: "Listening" },
  READING: { label: "Đọc", en: "Reading" },
  WRITING: { label: "Viết", en: "Writing" },
  SPEAKING: { label: "Nói", en: "Speaking" },
};

/** Các kỹ năng được phép trong đề thi thử — đúng bộ bài thi Cambridge cho trẻ:
 *  Listening · Reading & Writing · Speaking. */
export const EXAM_SKILLS: Skill[] = ["LISTENING", "READING", "WRITING", "SPEAKING"];

/** Thứ tự các phần đúng như thứ tự thi thật. */
const SECTION_ORDER: Skill[] = ["LISTENING", "READING", "WRITING", "SPEAKING"];

/** Tên phần hiển thị: ưu tiên tiêu đề admin nhập, nếu trống suy từ kỹ năng.
 *  VD: "Listening · Nghe". */
export function sectionLabel(skill: Skill, title?: string | null): string {
  if (title && title.trim()) return title.trim();
  const m = EXAM_SECTION_META[skill];
  return m ? `${m.en} · ${m.label}` : String(skill);
}

/** Cấu thành đề (vd "Nghe · Đọc · Viết · Nói") để hiện trên thẻ đề. */
export function examComposition(skills: Skill[]): string {
  const present = SECTION_ORDER.filter((s) => skills.includes(s));
  return present.map((s) => EXAM_SECTION_META[s]?.label ?? s).join(" · ");
}

/**
 * Tên tiểu phần theo cách gọi của đề Cambridge: "Part 1", "Part 2"…
 * `order` là số thứ tự 0-based lưu ở MockExamPart.order.
 */
export function partLabel(order: number, title?: string | null): string {
  if (title && title.trim()) return title.trim();
  return `Part ${order + 1}`;
}
