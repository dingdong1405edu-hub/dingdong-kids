// ===========================================================================
//  HỢP ĐỒNG NỘI DUNG TỪ VỰNG (khu "Luyện kỹ năng" → model VocabUnit/VocabWord).
//
//  Mỗi cấp một file (`pre-starters.ts`, `starters.ts`, …) export `UNITS`.
//  `index.ts` gom lại, `prisma/seed.ts` ghi vào DB.
//
//  Khác với từ vựng của BÀI LỘ TRÌNH (nằm trong `LessonSeed.words` ở
//  prisma/content/<cấp>.ts): phần này là kho tra cứu / luyện độc lập, mỗi unit
//  là một chủ đề trọn vẹn học được mà không cần theo lộ trình.
// ===========================================================================
import type { EnglishLevel } from "@prisma/client";

export interface WordSeed {
  word: string;
  /** Phiên âm IPA trong hai gạch chéo, vd "/ˈmʌðər/". */
  ipa: string;
  /** Nghĩa tiếng Việt ngắn gọn, hợp lứa tuổi. */
  meaning: string;
  /** Emoji minh hoạ — BẮT BUỘC. Cho tới khi có kho ảnh thật, đây là kênh
   *  truyền đạt nghĩa duy nhất với bé chưa đọc thạo. */
  emoji: string;
  /** Từ loại viết bằng tiếng Việt dễ hiểu: "danh từ", "động từ", "tính từ"… */
  partOfSpeech: string;
  examples: Array<{ sentence: string; meaning: string }>;
}

export interface VocabUnitSeed {
  /**
   * Slug DUY NHẤT TOÀN CỤC — id unit là `seed-vocab-unit-<slug>` và id từ là
   * `seed-word-<slug>-<word>`. Trùng slug giữa hai cấp sẽ khiến unit sau ghi đè
   * unit trước lúc seed.
   */
  slug: string;
  /** Tên tiếng Anh của chủ đề, vd "Animals". */
  title: string;
  /** Nhãn tiếng Việt hiện thành tag trên thẻ, vd "Con vật". */
  theme: string;
  level: EnglishLevel;
  /** Tên bài học bên trong unit, vd "Con vật quanh bé". */
  lessonTitle: string;
  words: WordSeed[];
}

/** Bộ dựng một từ cho gọn — mỗi từ viết đúng một dòng. */
export const w = (
  word: string,
  ipa: string,
  meaning: string,
  emoji: string,
  sentence: string,
  sentenceVi: string,
  partOfSpeech = "danh từ",
): WordSeed => ({
  word,
  ipa,
  meaning,
  emoji,
  partOfSpeech,
  examples: [{ sentence, meaning: sentenceVi }],
});

// ───────────────────────── Hướng dẫn soạn theo cấp ─────────────────────────
//
//  PRE_STARTERS (4–5 tuổi)  — danh từ cụ thể, 1 âm tiết là chính. Câu ví dụ 3–5 từ.
//  STARTERS     (6–7 tuổi)  — thêm tính từ, động từ hằng ngày. Câu ví dụ 5–7 từ.
//  MOVERS       (7–9 tuổi)  — động từ quá khứ, trạng từ tần suất. Câu 7–10 từ.
//  FLYERS       (9–11 tuổi) — tính từ trừu tượng nhẹ, cụm động từ. Câu 8–12 từ.
//  KET          (11–13)     — từ học thuật nhẹ, cụm từ cố định. Câu 10–14 từ.
//  PET          (13–15)     — từ trừu tượng, từ nối, cụm thành ngữ. Câu 12–18 từ.
//
//  LUẬT CHUNG:
//   • Emoji phải RÕ NGHĨA và KHÔNG TRÙNG trong cùng một unit.
//   • Câu ví dụ phải đúng ngữ pháp tuyệt đối — đây là câu mẫu bé học theo.
//   • Nghĩa tiếng Việt TỰ NHIÊN, xưng "tớ/bé", không dịch word-by-word.
//   • Nội dung vui, an toàn, hợp trẻ em.
