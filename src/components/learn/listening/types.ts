import type { EnglishLevel, QuestionType } from "@prisma/client";

export interface ListeningOption {
  text: string;
  /** Ảnh cho lựa chọn — bé chưa đọc thạo vẫn chọn được bằng hình. */
  imageUrl?: string;
  /** Nghĩa tiếng Việt của lựa chọn (hiện khi chữa bài). */
  translation?: string;
}

export interface ListeningQuestion {
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
  /** Câu/đoạn trích trong lời thoại chứng minh đáp án. */
  supportingQuote?: string | null;
  /** Bản dịch tiếng Việt của câu trích dẫn. */
  quoteTranslation?: string | null;
  order: number;
}

export interface ListeningTestData {
  id: string;
  title: string;
  level: EnglishLevel;
  audioUrl: string;
  transcript?: string | null;
  /** Bản dịch + giảng lời thoại (tiếng Việt) — hiện khi chữa bài. */
  transcriptExplanation?: string | null;
  imageUrl?: string | null;
  timeLimit: number;
  questions: ListeningQuestion[];
}
