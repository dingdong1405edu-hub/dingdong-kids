export type { EnglishLevel, Role, Skill, QuestionType, WritingTaskType } from "@prisma/client";

export interface Exercise {
  type:
    | "match"
    | "translate"
    | "fill_blank"
    | "sentence_order"
    | "sentenceOrder"
    | "answer_question"
    | "type_sentence"
    // --- dành riêng cho trẻ nhỏ (chưa đọc thạo) ---
    | "picture_match"
    | "listen_pick"
    | "spell_drag"
    | "rhyme_match";
  /** Giải thích tác giả viết sẵn, hiện khi trẻ trả lời sai — nói VÌ SAO đáp án
   *  đúng là như vậy, không chỉ đưa ra đáp án. */
  explanation?: string;
  [key: string]: unknown;
}

export interface MatchExercise extends Exercise {
  type: "match";
  pairs: Array<{ en: string; vi: string; imageUrl?: string; audioUrl?: string }>;
}

export interface TranslateExercise extends Exercise {
  type: "translate";
  direction: "en_to_vi" | "vi_to_en";
  prompt: string;
  answer: string;
  audioUrl?: string;
  options: string[];
}

export interface SentenceOrderExercise extends Exercise {
  type: "sentenceOrder" | "sentence_order";
  words: string[];
  answer: string;
  hint?: string;
  meaning?: string;
  audioUrl?: string;
}

export interface FillBlankExercise extends Exercise {
  type: "fill_blank";
  sentence: string;
  blank: string;
  options: string[];
  hint?: string;
}

/** Trả lời ngắn tự gõ. Chấm bằng cách so khớp chuẩn hoá với `accept`. */
export interface AnswerQuestionExercise extends Exercise {
  type: "answer_question";
  question: string;
  accept: string[];
  sampleAnswer: string;
  hint?: string;
  audioUrl?: string;
}

/** Gõ cả câu (vd dịch câu tiếng Việt sang tiếng Anh). */
export interface TypeSentenceExercise extends Exercise {
  type: "type_sentence";
  prompt: string;
  accept: string[];
  meaning?: string;
  hint?: string;
}

// ===== Bài tập dành riêng cho trẻ nhỏ =====

/** Nhìn ẢNH → chọn từ đúng. Loại bài CỐT LÕI cho trẻ chưa đọc thạo:
 *  không cần đọc đề, chỉ cần nhìn và nghe. */
export interface PictureMatchExercise extends Exercise {
  type: "picture_match";
  imageUrl: string;
  /** Audio đọc từ đúng — phát khi trẻ trả lời đúng. */
  audioUrl?: string;
  options: string[];
  correct: number;
}

/** Nghe AUDIO → chọn ảnh đúng. Ngược chiều với picture_match. */
export interface ListenPickExercise extends Exercise {
  type: "listen_pick";
  audioUrl: string;
  /** Văn bản của audio (dùng để sinh TTS và hiện khi chữa bài). */
  text: string;
  options: Array<{ imageUrl: string; label: string }>;
  correct: number;
}

/** Kéo thả chữ cái để ghép thành từ. Luyện chính tả bằng thao tác, không gõ. */
export interface SpellDragExercise extends Exercise {
  type: "spell_drag";
  word: string;
  imageUrl?: string;
  audioUrl?: string;
  /** Chữ cái gây nhiễu trộn thêm vào (ngoài các chữ của `word`). */
  distractors?: string[];
}

/** Nối các từ cùng vần (cat–hat). Nền tảng phonics. */
export interface RhymeMatchExercise extends Exercise {
  type: "rhyme_match";
  pairs: Array<{ a: string; b: string; imageUrlA?: string; imageUrlB?: string }>;
}

// ===== Nội dung bài ngữ pháp (mỗi phần: lý thuyết + luyện tập → bài kiểm tra) =====

/** Một ví dụ tình huống minh hoạ cho một điểm ngữ pháp. */
export interface SituationalExample {
  situation: string;
  sentence: string;
  meaning: string;
  note?: string;
  audioUrl?: string;
  /** Ảnh minh hoạ cho ngữ cảnh này. */
  imageUrl?: string;
}

/** Một thành phần trong công thức ngữ pháp. Chú giải từng ô/từ của `structure`
 *  để trẻ thấy MỌI phần nghĩa là gì — không chỉ công thức trần. Liệt kê theo
 *  đúng thứ tự công thức; trình xem tô màu từng phần + thẻ tương ứng. */
export interface FormulaPart {
  /** Ô hoặc từ đúng như xuất hiện trong công thức (vd "I", "am", "happy"). */
  part: string;
  /** Vai trò ngữ pháp ngắn, vd "Chủ ngữ", "Động từ to be", "Tính từ". */
  role?: string;
  /** Nghĩa dễ hiểu — phần này làm gì trong câu. */
  meaning: string;
}

/** Lỗi trẻ hay mắc: dạng sai, dạng đúng, và lý do ngắn.
 *  Hiển thị thành hàng ❌ sai / ✔ đúng. */
export interface GrammarMistake {
  wrong: string;
  right: string;
  note?: string;
}

/** Phần lý thuyết (hiển thị) của một mục ngữ pháp. */
export interface TheorySection {
  id: string;
  title: string;
  /** Tên tiếng Anh của điểm ngữ pháp, vd "Present Simple". */
  titleEn?: string;
  structure?: string;
  /** Chú giải từng phần của công thức, theo thứ tự. */
  breakdown?: FormulaPart[];
  explanation: string;
  /** Khi nào / vì sao dùng cấu trúc này. */
  usage?: string;
  mistakes?: GrammarMistake[];
  imageUrl?: string;
  examples: SituationalExample[];
}

/** Một "phần nhỏ" của bài ngữ pháp: lý thuyết ở trên CỘNG bài luyện tập cho
 *  đúng phần đó — trẻ học rồi luyện ngay, trước khi sang phần kế. */
export interface GrammarSection extends TheorySection {
  exercises: Exercise[];
}

/** Bài kiểm tra cuối bài: chấm theo khối, có thể đếm ngược,
 *  đạt khi ≥ `passThreshold`% (mặc định 60). */
export interface GrammarTest {
  timeLimit?: number;
  passThreshold?: number;
  questions: Exercise[];
}

/** Cấu trúc JSON của `GrammarLesson.exercises` (phiên bản 3): danh sách phần
 *  có thứ tự (mỗi phần = lý thuyết + luyện tập) rồi tới một bài kiểm tra tổng.
 *  Bộ giải mã cũng chấp nhận mảng `Exercise[]` trần (bản cũ). */
export interface GrammarLessonContent {
  version: 3;
  sections: GrammarSection[];
  test: GrammarTest;
}

/** Một câu ví dụ gắn với từ vựng. */
export interface WordExample {
  sentence: string;
  meaning: string;
  audioUrl?: string;
}

/** Một từ vựng như luồng học từng-từ tiêu thụ (serialise từ model VocabWord). */
export interface VocabWordCard {
  id: string;
  lessonId: string;
  order: number;
  word: string;
  ipa: string;
  meaning: string;
  partOfSpeech: string;
  examples: WordExample[];
  imageUrl: string | null;
  /** Emoji minh hoạ — dùng khi chưa có `imageUrl`. Với bé chưa đọc được chữ,
   *  màn hình luôn phải có hình; emoji là mức tối thiểu luôn có sẵn. */
  emoji: string;
  audioUrl: string | null;
}

/** Trạng thái lặp lại ngắt quãng của một từ, đã serialise cho client.
 *  `dueAt` = ISO string thời điểm đến hạn, null = từ mới (chưa từng ôn).
 *  `repetitions` phân biệt từ mới (0 → ưu tiên flashcard) với từ đã thuộc
 *  (>0 → kiểm tra bằng mini-game). */
export interface WordReviewState {
  wordId: string;
  dueAt: string | null;
  repetitions: number;
}

export interface QuestionOption {
  text: string;
  /** Ảnh cho lựa chọn — trẻ nhỏ chọn bằng hình thay vì đọc chữ. */
  imageUrl?: string;
}

export interface MCQAnswer {
  index: number;
  text: string;
}

export interface TrueFalseAnswer {
  value: boolean;
}

export interface LessonResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  heartsLost: number;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
    };
  }
  interface User {
    role?: string;
  }
}
