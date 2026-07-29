// ===========================================================================
//  HỢP ĐỒNG NỘI DUNG BÀI HỌC — dùng chung cho 6 file cấp độ trong thư mục này.
//
//  Mỗi cấp một file (`pre-starters.ts`, `starters.ts`, …) export một mảng
//  `CHAPTERS: ChapterSeed[]`. `prisma/seed.ts` gom hết lại rồi ghi vào DB.
//  Tách file như vậy để soạn nội dung từng cấp độc lập, không giẫm chân nhau.
//
//  ⚠️ Câu hỏi Đọc/Nghe ở đây viết theo "ĐỊNH DẠNG TÁC GIẢ" (dễ gõ tay):
//     options là mảng CHUỖI, đáp án là `answer: <chỉ số 0-based>`.
//     `seed.ts` tự chuyển sang định dạng RoadmapQuestion mà player cần bằng
//     `authoringToRoadmapQuestions()`. ĐỪNG tự viết `correctAnswer` ở đây.
// ===========================================================================

/** Một từ vựng trong phần VOCAB của bài. */
export interface LessonWord {
  word: string;
  /** Phiên âm IPA, vd "/ˈmʌðər/". */
  ipa: string;
  /** Nghĩa tiếng Việt, ngắn gọn, hợp lứa tuổi. */
  meaning: string;
  /** Emoji minh hoạ — bắt buộc, vì trẻ nhỏ nhìn hình trước khi đọc chữ. */
  emoji: string;
}

/** Từ mẫu cho một âm trong phần PHONICS. */
export interface PhonicsWord {
  word: string;
  meaning: string;
  emoji: string;
}

/** Một âm được dạy trong bài (chữ cái đơn, phụ âm ghép, hoặc nguyên âm ghép). */
export interface LessonSound {
  /** Chữ cái hoặc cụm chữ: "m", "sh", "ai". */
  letters: string;
  /** Cách đọc trong hai gạch chéo: "/m/", "/ʃ/". */
  sound: string;
  /** Mẹo phát âm VIẾT CHO NGƯỜI VIỆT — nêu đúng lỗi trẻ Việt hay mắc. */
  hint: string;
  words: PhonicsWord[];
}

/** Câu hỏi trắc nghiệm nhiều lựa chọn (định dạng tác giả). */
export interface McqQuestion {
  type: "MCQ";
  prompt: string;
  promptTranslation: string;
  options: string[];
  /** Chỉ số 0-based của đáp án đúng. */
  answer: number;
  explanation: string;
  /** Trích NGUYÊN VĂN câu trong bài chứng minh đáp án. */
  supportingQuote?: string;
}

/** Câu hỏi đúng/sai (định dạng tác giả). */
export interface TrueFalseQuestion {
  type: "TRUE_FALSE";
  prompt: string;
  promptTranslation: string;
  answer: boolean;
  explanation: string;
  supportingQuote?: string;
}

export type LessonQuestion = McqQuestion | TrueFalseQuestion;

export interface LessonReading {
  title: string;
  /** Đoạn văn tiếng Anh. Độ dài theo cấp — xem hướng dẫn ở cuối file. */
  passage: string;
  /** Dịch tiếng Việt toàn bộ đoạn. */
  translation: string;
  questions: LessonQuestion[];
}

export interface LessonListening {
  title: string;
  /** Lời thoại tiếng Anh, có nhãn người nói (Girl:/Boy:/Mum:/Teacher:). */
  transcript: string;
  questions: LessonQuestion[];
}

export interface LessonSpeaking {
  /** Câu để bé nghe rồi NHẮC LẠI (phần 1 Cambridge Speaking). */
  sentences: string[];
  /** Câu hỏi mở để bé tự trả lời (phần 3). */
  questions: Array<{ question: string; sampleAnswer: string }>;
}

/** Một bài học trọn vẹn trong lộ trình — gồm đủ nội dung cho 7 kỹ năng. */
export interface LessonSeed {
  /** Chủ đề tiếng Anh, vd "My Family". */
  topic: string;
  /** Nhãn phụ tiếng Việt, vd "Gia đình của bé". */
  topicVi: string;
  /** Emoji hiển thị trên node bản đồ lộ trình. */
  icon: string;
  words: LessonWord[];
  sound: LessonSound;
  reading: LessonReading;
  listening: LessonListening;
  writingPrompt: string;
  /** Dàn ý gợi ý, mỗi ý một dòng, đánh số "1. …\n2. …". */
  writingOutline: string;
  speaking: LessonSpeaking;
}

export interface ChapterSeed {
  /** Vd "Chương 1 · Bé và gia đình". */
  title: string;
  subtitle: string;
  lessons: LessonSeed[];
}

// ───────────────────────── Bộ dựng câu hỏi ─────────────────────────

export const mcq = (
  prompt: string,
  promptTranslation: string,
  options: string[],
  answer: number,
  explanation: string,
  supportingQuote?: string,
): McqQuestion => ({
  type: "MCQ",
  prompt,
  promptTranslation,
  options,
  answer,
  explanation,
  ...(supportingQuote ? { supportingQuote } : {}),
});

export const tf = (
  prompt: string,
  promptTranslation: string,
  answer: boolean,
  explanation: string,
  supportingQuote?: string,
): TrueFalseQuestion => ({
  type: "TRUE_FALSE",
  prompt,
  promptTranslation,
  answer,
  explanation,
  ...(supportingQuote ? { supportingQuote } : {}),
});

/** Bộ dựng một từ vựng cho gọn. */
export const word = (w: string, ipa: string, meaning: string, emoji: string): LessonWord => ({
  word: w,
  ipa,
  meaning,
  emoji,
});

// ───────────────────────── Hướng dẫn soạn theo cấp ─────────────────────────
//
//  PRE_STARTERS (4–5 tuổi)
//    • Đoạn đọc 15–25 từ, câu đơn 3–5 từ. Chỉ thì hiện tại đơn.
//    • 4–6 từ vựng/bài, toàn danh từ cụ thể nhìn thấy được.
//    • 1–2 câu hỏi/bài, 3 lựa chọn, mỗi lựa chọn 1 từ.
//    • Lời thoại nghe 2–3 lượt, mỗi lượt ≤ 8 từ.
//
//  STARTERS (6–7 tuổi · Pre-A1)
//    • Đoạn đọc 30–50 từ. Thêm tính từ, giới từ chỉ nơi chốn (in/on/under).
//    • 6–8 từ vựng/bài. 2–3 câu hỏi, 3 lựa chọn.
//    • Lời thoại 4–6 lượt.
//
//  MOVERS (7–9 tuổi · A1)
//    • Đoạn đọc 60–90 từ. Thì quá khứ đơn, hiện tại tiếp diễn, "can/can't".
//    • 8–10 từ vựng. 3–4 câu hỏi, 4 lựa chọn.
//
//  FLYERS (9–11 tuổi · A2)
//    • Đoạn đọc 100–140 từ, có mở–thân–kết. Thì tương lai, so sánh hơn/nhất.
//    • 10–12 từ vựng, bắt đầu có động từ và tính từ trừu tượng nhẹ.
//    • 4–5 câu hỏi, có 1 câu suy luận (không tìm thấy nguyên văn trong bài).
//
//  KET (11–13 tuổi · A2 Key for Schools)
//    • Đoạn đọc 150–200 từ. Câu ghép, mệnh đề quan hệ đơn giản.
//    • 12–15 từ vựng. 5 câu hỏi, có câu hỏi về thái độ người nói.
//
//  PET (13–15 tuổi · B1 Preliminary)
//    • Đoạn đọc 200–260 từ, có lập luận/ý kiến. Câu điều kiện, bị động.
//    • 15 từ vựng. 5–6 câu hỏi, có câu hỏi về ý chính và hàm ý.
//
//  LUẬT CHUNG CHO MỌI CẤP:
//    • Nội dung phải VUI, AN TOÀN, hợp trẻ em. Không bạo lực, không đáng sợ,
//      không chủ đề người lớn.
//    • Tiếng Anh phải ĐÚNG NGỮ PHÁP tuyệt đối — đây là bài mẫu trẻ học theo.
//    • Nghĩa tiếng Việt phải TỰ NHIÊN, xưng "tớ/bé", không dịch word-by-word.
//    • `explanation` viết bằng tiếng Việt ĐƠN GIẢN, giải thích VÌ SAO đúng.
//    • `supportingQuote` phải TRÍCH NGUYÊN VĂN, khớp từng chữ với `passage`
//      hoặc `transcript` — nếu không sẽ không tô sáng được khi chữa bài.
//    • `sound.hint` phải nêu lỗi ĐẶC THÙ TRẺ VIỆT (nuốt phụ âm cuối, /θ/→/t/,
//      /ʃ/→/s/, quên -s, mất /r/ cuối từ…).
