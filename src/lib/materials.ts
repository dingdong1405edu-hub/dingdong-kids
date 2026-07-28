import {
  BookOpen,
  SpellCheck,
  PenTool,
  AudioLines,
  GraduationCap,
  Globe2,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import type { MaterialCategory } from "@prisma/client";

/**
 * A study-material document body is stored as an ordered array of these blocks
 * (Material.content Json). The learner renderer (components/learn/material-content)
 * and the bulk seed (prisma/seed-data/*.json) both speak this shape.
 */
export type MaterialBlock =
  | { type: "heading"; text: string; en?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  /** Một câu mẫu tiếng Anh + nghĩa tiếng Việt. */
  | { type: "example"; en: string; vi?: string }
  /** Bảng từ mới: từ tiếng Anh + phiên âm IPA + nghĩa tiếng Việt. */
  | { type: "vocab"; items: Array<{ word: string; ipa: string; vi: string }> }
  | { type: "note"; text: string };

export interface CategoryMeta {
  value: MaterialCategory;
  label: string; // nhãn tiếng Việt (giao diện)
  labelEn: string; // tên tiếng Anh của chuyên mục
  icon: LucideIcon;
  color: string; // tailwind classes for the icon chip / badge
}

export const MATERIAL_CATEGORIES: CategoryMeta[] = [
  { value: "GRAMMAR", label: "Ngữ pháp", labelEn: "Grammar", icon: SpellCheck, color: "bg-violet-100 text-violet-600" },
  { value: "VOCABULARY", label: "Từ vựng", labelEn: "Vocabulary", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
  { value: "SPELLING", label: "Chính tả", labelEn: "Spelling", icon: PenTool, color: "bg-amber-100 text-amber-600" },
  { value: "PHONICS", label: "Ghép vần", labelEn: "Phonics", icon: AudioLines, color: "bg-teal-100 text-teal-600" },
  { value: "EXAM_TIPS", label: "Mẹo thi Cambridge", labelEn: "Exam tips", icon: GraduationCap, color: "bg-rose-100 text-rose-600" },
  { value: "CULTURE", label: "Khám phá thế giới", labelEn: "Culture", icon: Globe2, color: "bg-orange-100 text-orange-600" },
  { value: "CONVERSATION", label: "Giao tiếp", labelEn: "Conversation", icon: MessagesSquare, color: "bg-sky-100 text-sky-600" },
];

export function categoryMeta(c: string): CategoryMeta {
  return MATERIAL_CATEGORIES.find((m) => m.value === c) ?? MATERIAL_CATEGORIES[0];
}

export function materialCategoryLabel(c: string): string {
  return categoryMeta(c).label;
}

/**
 * Convert an admin textarea into structured content blocks. Lightweight markup:
 *   "# Tiêu đề"                -> heading
 *   "- mục" / "* mục"          -> bullet list (consecutive lines grouped)
 *   "> ghi chú"                -> note callout
 *   "I like cats. | Mình thích mèo." -> example line (câu tiếng Anh | nghĩa tiếng Việt)
 *   (blank line separates)     -> paragraph
 */
export function parseMaterialContent(text: string): MaterialBlock[] {
  const blocks: MaterialBlock[] = [];
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let para: string[] = [];
  let list: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "paragraph", text: para.join(" ").trim() });
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list.slice() });
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    if (line.startsWith("# ")) {
      flushPara();
      flushList();
      blocks.push({ type: "heading", text: line.slice(2).trim() });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      flushPara();
      list.push(line.slice(2).trim());
    } else if (line.startsWith("> ")) {
      flushPara();
      flushList();
      blocks.push({ type: "note", text: line.slice(2).trim() });
    } else if (line.includes("|")) {
      flushPara();
      flushList();
      const [en, vi] = line.split("|").map((s) => s.trim());
      blocks.push({ type: "example", en, vi: vi || undefined });
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return blocks;
}
