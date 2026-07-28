// Phát âm tiếng Anh phía CLIENT cho khu vực Đọc & Nghe.
//
// Thứ tự ưu tiên: file audio thật (do TTS server sinh sẵn — xem src/lib/tts.ts)
// → giọng đọc en-US của trình duyệt (Web Speech) khi chưa có file hoặc file lỗi.
// Vì gần như câu nào cũng đã có file audio thật, Web Speech chỉ còn là lưới an
// toàn để bé không bao giờ bấm loa mà không nghe thấy gì.
//
// Giữ helper ở đây (không nhét vào lib dùng chung) để module Đọc/Nghe tự chủ.

/** Giọng en-US/en-* đầu tiên của trình duyệt, nếu có. */
function pickEnglishVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith("en-us")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en-gb")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en"))
  );
}

/** Trình duyệt có giọng tiếng Anh để đọc dự phòng hay không. */
export function hasEnglishVoice(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  return window.speechSynthesis.getVoices().some((v) => v.lang?.toLowerCase().startsWith("en"));
}

// File audio đang phát do chính module này khởi động. Giữ ở phạm vi module để
// bé bấm liên tiếp nhiều nút loa thì tiếng CŨ tắt hẳn thay vì chồng lên nhau —
// hai giọng nói cùng lúc khiến trẻ không nghe ra từ nào cả.
let currentAudio: HTMLAudioElement | null = null;

/** Dừng mọi tiếng đang phát: cả giọng trình duyệt lẫn file audio module này mở. */
export function stopSpeaking(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      /* phần tử đã bị gỡ — bỏ qua */
    }
    currentAudio = null;
  }
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* trình duyệt không hỗ trợ — bỏ qua */
  }
}

/**
 * Đọc một câu/từ tiếng Anh bằng giọng en-US của trình duyệt.
 * `rate` mặc định chậm (0.85) — trẻ cần nghe rõ từng âm.
 *
 * `onEnd` báo lúc đọc xong (kể cả khi lỗi) để bên gọi trả nút về trạng thái
 * "Nghe" — không có nó thì nút phát sẽ kẹt ở "Tạm dừng" mãi sau khi đọc hết.
 */
export function speakEnglish(text: string, rate = 0.85, onEnd?: () => void): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onEnd?.();
    return;
  }
  if (!text.trim()) {
    onEnd?.();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = Math.max(0.5, Math.min(1.5, rate));
    const voice = pickEnglishVoice();
    if (voice) utter.voice = voice;
    if (onEnd) {
      utter.onend = () => onEnd();
      utter.onerror = () => onEnd();
    }
    window.speechSynthesis.speak(utter);
  } catch {
    /* không hỗ trợ TTS — im lặng, không làm hỏng luồng học */
    onEnd?.();
  }
}

/**
 * Phát audio thật nếu có; hỏng/không có thì rơi về giọng đọc trình duyệt.
 * Trả về phần tử `<audio>` đang phát (nếu dùng file) để bên gọi tự dừng khi cần.
 */
export function playEnglish(opts: {
  text: string;
  audioUrl?: string | null;
  rate?: number;
  onEnd?: () => void;
}): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  const { text, audioUrl, rate, onEnd } = opts;
  stopSpeaking();
  if (audioUrl?.trim()) {
    try {
      const audio = new Audio(audioUrl);
      audio.playbackRate = rate ?? 1;
      if (onEnd) audio.addEventListener("ended", onEnd);
      // File hỏng/404 → rơi về giọng trình duyệt, không để bé bấm vào chỗ chết.
      audio.play().catch(() => speakEnglish(text, rate, onEnd));
      currentAudio = audio;
      return audio;
    } catch {
      speakEnglish(text, rate, onEnd);
      return null;
    }
  }
  speakEnglish(text, rate, onEnd);
  return null;
}
