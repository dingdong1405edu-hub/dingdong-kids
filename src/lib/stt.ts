// Chuyển giọng nói → văn bản (STT) hợp nhất: **Deepgram Nova-3** (chính) với
// **Groq Whisper** dự phòng, để việc chuyển lời thoại vẫn chạy khi Deepgram lỗi
// hoặc thiếu key. Bề mặt công khai: transcribeAudio + isTranscriptionConfigured
// — cửa vào STT duy nhất của toàn app (/api/transcribe và thao tác admin
// "Tạo lời thoại từ audio").

import { isDeepgramConfigured, transcribeWithDeepgram } from "@/lib/deepgram";
import { isGradingConfigured as isGroqConfigured, transcribeWithGroq } from "@/lib/groq";

export function isTranscriptionConfigured(): boolean {
  return isDeepgramConfigured() || isGroqConfigured();
}

/**
 * Chuyển audio tiếng Anh thành văn bản. Thử Deepgram trước; nếu API lỗi (không
 * phải kết quả rỗng) thì rơi sang Groq Whisper khi có key. Trả "" khi không phát
 * hiện giọng nói. Chỉ ném lỗi khi không có nhà cung cấp nào được cấu hình hoặc
 * nhà cung cấp cuối cùng cũng lỗi.
 */
export async function transcribeAudio(audioBuffer: Buffer, mimeType: string): Promise<string> {
  if (isDeepgramConfigured()) {
    try {
      return await transcribeWithDeepgram(audioBuffer, mimeType);
    } catch (e) {
      // Chỉ rơi sang dự phòng khi Groq thực sự sẵn sàng; nếu không, đẩy lỗi
      // Deepgram thật ra ngoài để nơi gọi hiển thị nguyên nhân có ý nghĩa.
      if (!isGroqConfigured()) throw e;
      console.error("Deepgram STT lỗi — chuyển sang Groq Whisper:", e);
    }
  }

  if (isGroqConfigured()) {
    return await transcribeWithGroq(audioBuffer, mimeType);
  }

  throw new Error("NO_STT_PROVIDER_CONFIGURED");
}
