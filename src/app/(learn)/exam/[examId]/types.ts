import type { EnglishLevel, QuestionType, Skill } from "@prisma/client";

// Cấu trúc đề thi thử nạp cho runner (sections → parts → questions).
export interface ExamQuestionData {
  id: string;
  type: QuestionType;
  prompt: string;
  /** Bản dịch tiếng Việt của câu hỏi — hiện khi chữa bài. */
  promptTranslation: string | null;
  /** Ảnh minh hoạ riêng cho câu hỏi (bé chọn đáp án bằng hình). */
  imageUrl: string | null;
  /** Audio đọc câu hỏi (TTS) — bé chưa đọc thạo vẫn làm được bài. */
  audioUrl: string | null;
  options: unknown;
  correctAnswer: unknown;
  explanation: string | null;
  supportingQuote: string | null;
  quoteTranslation: string | null;
  order: number;
}

export interface ExamPartData {
  id: string;
  title: string;
  instructions: string | null;
  imageUrl: string | null;
  passage: string | null;
  audioUrl: string | null;
  transcript: string | null;
  writingPrompt: string | null;
  /** Số TỪ tối thiểu cho phần viết (tiếng Anh đếm từ, không đếm ký tự). */
  writingMinWords: number | null;
  questions: ExamQuestionData[];
}

export interface ExamSectionData {
  id: string;
  skill: Skill;
  title: string;
  instructions: string | null;
  parts: ExamPartData[];
}

export interface ExamData {
  id: string;
  title: string;
  level: EnglishLevel;
  description: string | null;
  totalTime: number | null; // giây
  sections: ExamSectionData[];
}
