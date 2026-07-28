import type { EnglishLevel, QuestionType } from "@prisma/client";

export interface ReadingOption {
  text: string;
  /** Ảnh cho lựa chọn — bé chưa đọc thạo vẫn chọn được bằng hình. */
  imageUrl?: string;
  /** Nghĩa tiếng Việt của lựa chọn (hiện khi chữa bài). */
  translation?: string;
}

export interface ReadingQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  /** Bản dịch tiếng Việt của câu hỏi (hiện khi chữa bài). */
  promptTranslation?: string | null;
  /** Ảnh minh hoạ riêng cho câu hỏi này. */
  imageUrl?: string | null;
  /** Audio đọc câu hỏi (TTS) — bé chưa đọc thạo vẫn làm được bài. */
  audioUrl?: string | null;
  options?: unknown;
  correctAnswer: unknown;
  explanation?: string | null;
  /** Câu/đoạn trích trong bài chứng minh đáp án (AI sinh khi admin thêm câu hỏi). */
  supportingQuote?: string | null;
  /** Bản dịch tiếng Việt của câu trích dẫn. */
  quoteTranslation?: string | null;
  order: number;
}

/** Một câu trong phần "phân tích từng câu" của đoạn đọc (hiện khi chữa bài). */
export interface PassageAnalysisSentence {
  /** Câu tiếng Anh — chép nguyên văn từ đoạn để bé đối chiếu. */
  en: string;
  /** Bản dịch tiếng Việt của câu. */
  vi: string;
  /** Ghi chú ngắn (từ mới / mẹo đọc, tiếng Việt) — tuỳ chọn. */
  note?: string;
}

export interface ReadingTestData {
  id: string;
  title: string;
  level: EnglishLevel;
  passage: string;
  /** Bản dịch tiếng Việt toàn bộ đoạn văn (hiện khi chữa bài). */
  passageTranslation?: string | null;
  /** Phân tích từng câu (hiện khi chữa bài). Prisma trả JsonValue → coerce ở component. */
  passageAnalysis?: unknown;
  imageUrl?: string | null;
  /** Audio đọc mẫu cả đoạn (TTS) — bé vừa nghe vừa nhìn chữ. */
  audioUrl?: string | null;
  timeLimit: number;
  questions: ReadingQuestion[];
}

export type ReadingTheme = "paper" | "white" | "soft" | "night";

export interface ReadingSettings {
  /** px */
  fontSize: number;
  /** unitless line-height */
  leading: number;
  theme: ReadingTheme;
  /** Hiện khay "Nghe cô đọc cả bài" (chỉ khi đề có audio đọc mẫu). */
  readAloud: boolean;
}

// Cỡ chữ khởi điểm LỚN hơn bản người lớn: mắt trẻ em đọc chữ nhỏ rất mau mỏi,
// và các em còn đang tập nhận mặt chữ nên cần nét rõ ràng.
export const FONT_SIZES = [
  { label: "Nhỏ", value: 18 },
  { label: "Vừa", value: 21 },
  { label: "To", value: 25 },
  { label: "Rất to", value: 30 },
];

export const LEADINGS = [
  { label: "Hẹp", value: 1.7 },
  { label: "Vừa", value: 2.0 },
  { label: "Rộng", value: 2.4 },
];

export const THEMES: { label: string; value: ReadingTheme }[] = [
  { label: "Giấy", value: "paper" },
  { label: "Trắng", value: "white" },
  { label: "Xám", value: "soft" },
  { label: "Tối", value: "night" },
];

/** Một mẩu của đoạn văn: hoặc là MỘT TỪ (bấm tra được), hoặc là phần ngăn cách
 *  (khoảng trắng, dấu câu, xuống dòng). Nối `text` của mọi mẩu lại = đoạn gốc. */
export interface PassageToken {
  text: string;
  isWord: boolean;
}

// Từ tiếng Anh: chuỗi chữ/số, cho phép dấu nháy và gạch nối Ở GIỮA để "don't",
// "ice-cream" vẫn là MỘT từ khi bé bấm tra.
const WORD_RE = /[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g;

/**
 * Tách đoạn văn tiếng Anh thành mảng token theo khoảng trắng/dấu câu.
 *
 * Dùng chung cho: (1) render đoạn văn — mỗi từ một `<span class="lookup-word">`
 * để bấm tra nghĩa; (2) định vị "chỗ chứa đáp án" — trang gọi map trích dẫn về
 * đúng chỉ số token mà pane đã gắn `data-idx`. Vì vậy hàm này phải là NGUỒN DUY
 * NHẤT để chia đoạn văn, và phải bảo toàn nguyên văn khi nối lại.
 */
export function splitPassageTokens(passage: string): PassageToken[] {
  const out: PassageToken[] = [];
  const re = new RegExp(WORD_RE.source, "g");
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(passage)) !== null) {
    if (m.index > last) out.push({ text: passage.slice(last, m.index), isWord: false });
    out.push({ text: m[0], isWord: true });
    last = m.index + m[0].length;
  }
  if (last < passage.length) out.push({ text: passage.slice(last), isWord: false });
  return out;
}
