// ===========================================================================
//  PHÁT ÂM THANH — ưu tiên `audioUrl` có sẵn (admin tải lên hoặc sinh bằng TTS
//  ở server, xem src/lib/tts.ts); chưa có thì đọc bằng Web Speech API của trình
//  duyệt với giọng tiếng Anh. Chỉ chạy ở trình duyệt (đã chặn SSR).
//
//  Web Speech API có BA cái bẫy khiến "bấm loa mà không nghe thấy gì", và cả ba
//  đều đã cắn dự án này:
//
//   1. `getVoices()` trả MẢNG RỖNG ở lần gọi đầu — danh sách giọng nạp bất đồng
//      bộ. Không chọn được giọng thì trình duyệt dùng giọng MẶC ĐỊNH của hệ
//      điều hành, mà máy người Việt thì mặc định là giọng TIẾNG VIỆT đang đọc
//      chữ tiếng Anh → ra tiếng méo mó hoặc im hẳn. Phải chờ `voiceschanged`.
//
//   2. `cancel()` rồi `speak()` NGAY lập tức thì Chrome nuốt luôn câu vừa gọi.
//      Phải nhường một nhịp cho hàng đợi dọn xong.
//
//   3. iOS/Safari CHẶN speechSynthesis nếu chưa có thao tác chạm của người dùng.
//      Bài học tự đọc từ khi vừa mở màn hình → bị chặn im lặng. Phải "mồi"
//      (prime) bằng một câu rỗng ngay TRONG sự kiện chạm đầu tiên.
// ===========================================================================

/** Danh sách giọng đã nạp xong (null = chưa nạp lần nào). */
let cachedVoices: SpeechSynthesisVoice[] | null = null;
/** Đã mồi trong một thao tác chạm của người dùng chưa (bẫy số 3). */
let primed = false;

function synth(): SpeechSynthesis | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  return window.speechSynthesis;
}

function loadVoices(): SpeechSynthesisVoice[] {
  const s = synth();
  if (!s) return [];
  const v = s.getVoices();
  if (v.length > 0) cachedVoices = v;
  return cachedVoices ?? [];
}

// Đăng ký sớm: danh sách giọng nạp xong lúc nào thì cache lúc đó.
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cachedVoices = window.speechSynthesis.getVoices();
  });
}

function pickEnglishVoice(): SpeechSynthesisVoice | undefined {
  const voices = loadVoices();
  return (
    // Giọng chất lượng cao của Google/Microsoft nếu máy có.
    voices.find((v) => /en[-_]us/i.test(v.lang) && /google|natural|premium/i.test(v.name)) ??
    voices.find((v) => /en[-_]us/i.test(v.lang)) ??
    voices.find((v) => /en[-_]gb/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang))
  );
}

/**
 * "Mồi" bộ đọc trong một thao tác chạm của người dùng.
 *
 * PHẢI gọi từ trong handler của một sự kiện bấm/chạm THẬT (onClick), KHÔNG gọi
 * từ useEffect — gọi trong effect thì iOS/Safari vẫn coi là tự động và chặn.
 * Gọi nhiều lần vô hại, chỉ chạy thật ở lần đầu.
 */
export function primeSpeech(): void {
  const s = synth();
  if (primed || !s) return;
  primed = true;
  try {
    // Câu rỗng, âm lượng 0 — người dùng không nghe thấy gì, nhưng đủ để trình
    // duyệt ghi nhận "trang này đã được phép phát tiếng".
    const u = new SpeechSynthesisUtterance("");
    u.volume = 0;
    s.speak(u);
    loadVoices(); // kích cho danh sách giọng bắt đầu nạp
  } catch {
    // Trình duyệt không hỗ trợ — `speakEnglish` sẽ tự im lặng.
  }
}

/** Bộ đọc đã sẵn sàng chưa — dùng để hiện gợi ý "bấm loa để nghe" khi chưa mồi. */
export function isSpeechPrimed(): boolean {
  return primed;
}

/**
 * Đọc văn bản tiếng Anh bằng giọng trình duyệt, chậm lại một chút cho bé nghe
 * rõ từng âm. Danh sách giọng chưa nạp xong thì CHỜ rồi mới đọc (bẫy số 1).
 */
export function speakEnglish(text: string): void {
  const s = synth();
  if (!s) return;
  const clean = text.trim();
  if (!clean) return;

  const say = () => {
    try {
      s.cancel();
      // Nhường một nhịp cho hàng đợi dọn xong, nếu không Chrome nuốt câu (bẫy 2).
      setTimeout(() => {
        try {
          const utter = new SpeechSynthesisUtterance(clean);
          utter.lang = "en-US";
          // Trẻ nhỏ cần nghe chậm hơn người lớn để bắt được từng âm.
          utter.rate = 0.8;
          utter.pitch = 1.1;
          const voice = pickEnglishVoice();
          if (voice) utter.voice = voice;
          s.speak(utter);
        } catch {
          /* bỏ qua */
        }
      }, 60);
    } catch {
      /* bỏ qua */
    }
  };

  // Chưa có giọng nào → chờ `voiceschanged` (tối đa 1 giây) rồi mới đọc.
  if (loadVoices().length === 0) {
    let fired = false;
    const go = () => {
      if (fired) return;
      fired = true;
      cachedVoices = s.getVoices();
      say();
    };
    s.addEventListener?.("voiceschanged", go, { once: true });
    setTimeout(go, 1000); // máy không bắn sự kiện thì vẫn phải đọc
    return;
  }

  say();
}

/**
 * Phát cách đọc của một từ: dùng file audio nếu có, không thì đọc bằng giọng
 * trình duyệt. File audio lỗi/404/bị chặn cũng tự chuyển sang giọng trình duyệt.
 */
export function playWord(opts: { word: string; audioUrl?: string | null }): void {
  if (typeof window === "undefined") return;
  const { word, audioUrl } = opts;

  if (audioUrl) {
    try {
      const audio = new Audio(audioUrl);
      // `.play()` trả Promise và BỊ TỪ CHỐI khi trình duyệt chặn tự phát hoặc
      // khi tệp hỏng — bắt lại để còn rơi về giọng trình duyệt, đừng để im ru.
      void audio.play().catch(() => speakEnglish(word));
      return;
    } catch {
      speakEnglish(word);
      return;
    }
  }
  speakEnglish(word);
}

/** Thiết bị hiện tại có ưu tiên cảm ứng không (con trỏ "thô")? — dùng để quyết
 *  định các bước kéo/thả là bắt buộc (cảm ứng) hay bỏ qua được (máy tính). */
export function isCoarsePointer(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(pointer: coarse)").matches;
}
