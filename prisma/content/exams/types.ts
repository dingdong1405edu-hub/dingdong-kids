// ===========================================================================
//  HỢP ĐỒNG ĐỀ THI THỬ — mỗi cấp một file trong thư mục này, export `EXAMS`.
//  `index.ts` gom lại, `prisma/seed.ts` ghi vào MockExam → Section → Part → Question.
//
//  ⚠️ CHỈ SOẠN 3 PHẦN: LISTENING · READING · WRITING.
//     Trình chạy đề (`src/app/(learn)/exam/[examId]/exam-part.tsx`) render được
//     lời thoại nghe, đoạn đọc, ô viết (AI chấm) và câu hỏi trắc nghiệm — nhưng
//     KHÔNG có bộ ghi âm cho phần Nói. Soạn một section SPEAKING sẽ khiến câu
//     hỏi nói hiện ra như câu trắc nghiệm thường, tức là sai đề.
//     Phần Nói của người học nằm ở khu "Luyện kỹ năng" (`/speaking`).
//
//  ⚠️ KHÔNG cần MP3. Phần nghe chỉ cần `transcript`: `ExamAudio` đọc lời thoại
//     bằng giọng trình duyệt và giới hạn số lần nghe đúng như thi thật (cấp nhỏ
//     3 lần, cấp lớn 2 lần). Admin có thể gắn MP3 sau bằng nút 🔊 trong trang
//     quản trị mà không phải sửa file này.
//
//  Câu hỏi viết ở "ĐỊNH DẠNG TÁC GIẢ" giống bài lộ trình — dùng `mcq()` / `tf()`
//  từ `../types`. `seed.ts` tự chuyển sang shape mà player cần.
// ===========================================================================
import type { EnglishLevel } from "@prisma/client";
import type { LessonQuestion } from "../types";

/** Kỹ năng được phép trong đề seed — xem cảnh báo ở đầu file. */
export type ExamSkill = "LISTENING" | "READING" | "WRITING";

/** Một tiểu phần ("Part 1", "Part 2"…). */
export interface ExamPartSeed {
  /** Để trống thì player tự đặt "Part 1", "Part 2"… theo thứ tự. */
  title?: string;
  /** Hướng dẫn / ví dụ mẫu, hiện trong khung xanh đầu tiểu phần. */
  instructions?: string;
  /** READING: đoạn văn. Bé bấm vào từ để tra nghĩa. */
  passage?: string;
  /** LISTENING: lời thoại có nhãn người nói (Girl:/Boy:/Mum:/Teacher:). */
  transcript?: string;
  /** WRITING: có trường này thì tiểu phần thành MỘT ô viết, AI chấm. */
  writingPrompt?: string;
  /** Số TỪ tối thiểu (tiếng Anh đếm từ, không đếm ký tự). */
  writingMinWords?: number;
  /** Câu hỏi trắc nghiệm. Tiểu phần viết thì để trống. */
  questions?: LessonQuestion[];
}

export interface ExamSectionSeed {
  skill: ExamSkill;
  /** Để trống thì suy từ `skill` ("Listening · Nghe"). */
  title?: string;
  instructions?: string;
  parts: ExamPartSeed[];
}

export interface ExamSeed {
  /** Slug DUY NHẤT TOÀN CỤC — id đề là `seed-exam-<slug>`. */
  slug: string;
  /** Vd "Đề thi thử Starters — Đề 1". */
  title: string;
  level: EnglishLevel;
  description: string;
  /** Tổng thời gian làm bài, tính bằng GIÂY. */
  totalTime: number;
  sections: ExamSectionSeed[];
}

// ───────────────────────── Hướng dẫn soạn theo cấp ─────────────────────────
//
//  Bám đúng format kỳ thi thật, nhưng RÚT GỌN cho vừa một buổi luyện ở nhà.
//
//  PRE_STARTERS (4–5 tuổi) — chưa có kỳ thi Cambridge thật. Đề "làm quen":
//     Nghe 4 câu · Đọc 4 câu · KHÔNG có phần Viết. ~15 phút (900s).
//  STARTERS (Pre-A1)  — Nghe 5 · Đọc 5 · Viết 1 đề ~20 từ. ~25 phút (1500s).
//  MOVERS   (A1)      — Nghe 6 · Đọc 6 · Viết 1 đề ~35 từ. ~35 phút (2100s).
//  FLYERS   (A2)      — Nghe 6 · Đọc 7 · Viết 1 đề ~50 từ. ~40 phút (2400s).
//  KET      (A2 Key)  — Nghe 7 · Đọc 8 · Viết 1 đề ~70 từ. ~50 phút (3000s).
//  PET      (B1)      — Nghe 8 · Đọc 8 · Viết 1 đề ~100 từ. ~60 phút (3600s).
//
//  LUẬT CHUNG (giống bài lộ trình — `validate.ts` kiểm lại hết):
//   • `supportingQuote` phải TRÍCH NGUYÊN VĂN từ `passage` / `transcript`.
//   • Mọi câu hỏi phải có `promptTranslation` và `explanation` bằng tiếng Việt.
//   • Lựa chọn KHÔNG được trùng nhau; `answer` là chỉ số 0-based hợp lệ.
//   • Nội dung vui, an toàn, hợp trẻ em; tiếng Anh đúng ngữ pháp tuyệt đối.
