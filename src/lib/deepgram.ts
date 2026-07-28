// Chuyển giọng nói → văn bản (STT) tiếng Anh bằng **Deepgram Nova-3**.
// Gọi thẳng REST endpoint qua fetch (không thêm SDK) để giữ số phụ thuộc tối
// thiểu. Key được kiểm tra lười (lazy) nên thiếu key không bao giờ làm vỡ
// `next build` hay việc import module — nơi gọi nhận lỗi rõ ràng thay vì crash.
//
// KHÁC BẢN TIẾNG TRUNG: Deepgram CÓ giọng đọc (TTS) tiếng Anh — xem src/lib/tts.ts.
// Nhờ vậy toàn bộ audio bài nghe / từ vựng / câu hỏi đều sinh tự động được,
// không phải bắt admin tự tải MP3 lên như dự án tiếng Trung trước đây.

const DEEPGRAM_ENDPOINT = "https://api.deepgram.com/v1/listen";
const DEEPGRAM_MODEL = process.env.DEEPGRAM_STT_MODEL || "nova-3";
// Anh–Mỹ. Đổi sang "en-GB" qua env nếu muốn giọng Anh–Anh (chuẩn Cambridge).
const DEEPGRAM_LANGUAGE = process.env.DEEPGRAM_STT_LANGUAGE || "en-US";

export function isDeepgramConfigured(): boolean {
  return Boolean(process.env.DEEPGRAM_API_KEY);
}

interface DeepgramResponse {
  results?: {
    channels?: Array<{
      alternatives?: Array<{ transcript?: string }>;
    }>;
  };
}

/**
 * Chuyển một buffer audio thành văn bản tiếng Anh. Gửi bytes thô kèm
 * Content-Type gốc — Deepgram tự nhận diện container. Trả "" khi không phát hiện
 * giọng nói (đây là kết quả hợp lệ, không phải lỗi). Ném Error có mô tả khi
 * thiếu key hoặc API lỗi, để nơi gọi (src/lib/stt.ts) quyết định có rơi sang
 * Groq Whisper hay không.
 *
 * LƯU Ý VỀ GIỌNG TRẺ EM: độ chính xác STT trên giọng trẻ nhỏ thấp hơn giọng
 * người lớn đáng kể. Phần chấm nói vì thế nới ngưỡng và thiên về khuyến khích —
 * xem gradeSpeaking trong src/lib/groq.ts.
 */
export async function transcribeWithDeepgram(audioBuffer: Buffer, mimeType: string): Promise<string> {
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) throw new Error("DEEPGRAM_API_KEY_MISSING");

  const params = new URLSearchParams({
    model: DEEPGRAM_MODEL,
    language: DEEPGRAM_LANGUAGE,
    smart_format: "true",
    punctuate: "true",
  });

  const res = await fetch(`${DEEPGRAM_ENDPOINT}?${params.toString()}`, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": mimeType || "audio/webm",
    },
    body: new Uint8Array(audioBuffer),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Deepgram error ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as DeepgramResponse;
  return data.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? "";
}
