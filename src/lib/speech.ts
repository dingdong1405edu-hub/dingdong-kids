// Phát âm thanh cho luồng từ vựng. Thứ tự ưu tiên: `audioUrl` đã có sẵn (admin
// tải lên hoặc sinh bằng TTS ở server — xem src/lib/tts.ts), nếu không có thì
// dùng Web Speech API của trình duyệt với giọng tiếng Anh (en-US) làm phương án
// dự phòng. Cả hai đều chỉ chạy ở trình duyệt — đã chặn SSR.

function pickEnglishVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith("en-us")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en-gb")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en"))
  );
}

/** Đọc văn bản tiếng Anh bằng giọng trình duyệt (en-US), chậm lại một chút cho
 *  bé nghe rõ từng âm. */
export function speakEnglish(text: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  if (!text.trim()) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    // Trẻ nhỏ cần nghe chậm hơn người lớn để bắt được từng âm.
    utter.rate = 0.8;
    utter.pitch = 1.1;
    const voice = pickEnglishVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  } catch {
    // Trình duyệt không hỗ trợ TTS — bỏ qua im lặng.
  }
}

/**
 * Phát cách đọc của một từ: dùng file audio nếu có, không thì đọc bằng giọng
 * trình duyệt. Nếu file audio lỗi cũng tự chuyển sang giọng trình duyệt.
 */
export function playWord(opts: { word: string; audioUrl?: string | null }): void {
  if (typeof window === "undefined") return;
  const { word, audioUrl } = opts;
  if (audioUrl) {
    try {
      const audio = new Audio(audioUrl);
      audio.play().catch(() => speakEnglish(word));
      return;
    } catch {
      speakEnglish(word);
      return;
    }
  }
  speakEnglish(word);
}

/** Thiết bị hiện tại có ưu tiên cảm ứng không (con trỏ "thô")? — dùng để quyết
 *  định các bước kéo/thả, viết tay là bắt buộc (cảm ứng) hay bỏ qua được (máy tính). */
export function isCoarsePointer(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(pointer: coarse)").matches;
}
