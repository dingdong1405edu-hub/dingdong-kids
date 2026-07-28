"use server";
import { generateWordLookup, isGradingConfigured } from "@/lib/groq";

export interface WordLookupResult {
  word: string;
  /** Phiên âm quốc tế, vd "/ˈelɪfənt/". Có thể rỗng nếu AI không trả. */
  ipa: string;
  /** Nghĩa tiếng Việt, viết dễ hiểu với trẻ. */
  meaning: string;
  /** noun | verb | adjective | ... (có thể rỗng). */
  partOfSpeech: string;
  /** Cấp độ ước lượng của từ (PRE_STARTERS … PET). */
  level: string;
  /** Mảng [{ sentence, meaning }] — câu ví dụ ngắn, hợp lứa tuổi. */
  examples: unknown;
}

/**
 * Tra một từ tiếng Anh cho popup "chạm vào từ để tra" ở bài đọc / bài nghe.
 *
 * KHÔNG CACHE VÀO DB — cố ý. Dự án không có bảng từ điển chung để lưu kết quả
 * tra (VocabWord gắn với từng bài học, không phải từ điển), nên ở đây gọi thẳng
 * AI rồi trả kết quả. Chi phí vẫn thấp: trẻ thường chỉ tra vài từ trong một bài
 * và client tự nhớ kết quả trong phiên làm bài.
 *
 * Trả `null` khi chưa cấu hình AI hoặc tra hỏng — popup vẫn hiện được từ đang
 * chạm, nên đây chỉ là phần "có thì tốt", không phải đường đi bắt buộc.
 */
export async function lookupWordAction(word: string): Promise<WordLookupResult | null> {
  const w = word?.trim();
  if (!w) return null;

  // Chỉ tra chữ cái Latin — tránh gọi AI cho dấu câu / chữ số lọt qua từ client.
  if (!/^[A-Za-z][A-Za-z'’-]*$/.test(w)) return null;
  if (!isGradingConfigured()) return null;

  try {
    const gen = await generateWordLookup(w);
    if (!gen) return null;
    return {
      word: w,
      ipa: gen.ipa,
      meaning: gen.meaning,
      partOfSpeech: gen.partOfSpeech,
      level: gen.level,
      examples: gen.examples,
    };
  } catch {
    return null;
  }
}
