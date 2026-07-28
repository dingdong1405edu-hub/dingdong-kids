// Hàm thuần cho phần Nghe: tách lời thoại ("tapescript") thành từng câu kèm
// nhãn người nói, và tìm câu nào chứa căn cứ cho đáp án đúng (phục vụ phần chữa
// bài "câu trả lời nằm ở đoạn nào"). Không dùng DOM/Node API — chạy được ở cả
// server (seed/util) lẫn client.

export interface TranscriptSegment {
  /** Nhãn người nói nếu dòng có tiền tố (vd "A", "B", "Girl", "Boy", "Man"); nếu không thì null. */
  speaker: string | null;
  /** Nội dung lời thoại của đoạn này (đã bỏ tiền tố người nói). */
  text: string;
  /** Số thứ tự (0-based) của dòng gốc sinh ra đoạn này. */
  line: number;
}

// Nhãn người nói = một chữ cái đơn (A/B) hoặc một từ ngắn quen thuộc trong đề
// Cambridge cho trẻ (Girl / Boy / Man / Woman / Teacher / Mum / Dad / Narrator…)
// theo sau là dấu hai chấm. Cố ý viết hẹp để một câu bình thường có dấu hai chấm
// không bị hiểu nhầm là lượt nói.
const SPEAKER_RE =
  /^\s*([A-Za-z]|Girl|Boy|Man|Woman|Teacher|Mum|Mom|Dad|Sister|Brother|Narrator|Speaker\s*\d?)\s*:\s*/i;

/** Ký tự kết thúc câu tiếng Anh. */
const SENTENCE_ENDERS = ".!?";

/** Viết tắt hay gặp — dấu chấm ở đây KHÔNG kết thúc câu, tránh cắt vụn
 *  "Mr. Brown" thành hai đoạn. */
const ABBREVIATIONS = ["mr", "mrs", "ms", "dr", "st", "mt", "vs", "etc", "e.g", "i.e"];

function endsWithAbbreviation(buf: string): boolean {
  const m = buf.trim().toLowerCase().match(/([a-z.]+)\.$/);
  if (!m) return false;
  const wordBefore = m[1].slice(0, -1);
  return ABBREVIATIONS.includes(wordBefore);
}

/** Tách thành từng câu, giữ nguyên dấu kết câu. Không dùng lookbehind của regex
 *  để chạy được trên webview cũ. */
function splitSentences(text: string): string[] {
  const out: string[] = [];
  let buf = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    buf += ch;
    if (!SENTENCE_ENDERS.includes(ch)) continue;
    // Gom cả cụm dấu liền nhau ("?!", "...") vào cùng một câu.
    while (i + 1 < text.length && (SENTENCE_ENDERS.includes(text[i + 1]) || text[i + 1] === '"' || text[i + 1] === "'")) {
      buf += text[++i];
    }
    if (ch === "." && endsWithAbbreviation(buf)) continue;
    const t = buf.trim();
    if (t) out.push(t);
    buf = "";
  }
  const tail = buf.trim();
  if (tail) out.push(tail);
  return out;
}

export function splitTranscript(transcript: string | null | undefined): TranscriptSegment[] {
  if (!transcript) return [];
  const segments: TranscriptSegment[] = [];
  const lines = transcript.split(/\r?\n/);
  lines.forEach((rawLine, lineIdx) => {
    const line = rawLine.trim();
    if (!line) return;
    let speaker: string | null = null;
    let content = line;
    const m = line.match(SPEAKER_RE);
    if (m) {
      speaker = m[1].trim();
      content = line.slice(m[0].length).trim();
    }
    if (!content) return;
    const parts = splitSentences(content);
    for (const part of parts.length ? parts : [content]) {
      segments.push({ speaker, text: part, line: lineIdx });
    }
  });
  return segments;
}

/** Tách một câu tiếng Anh thành các từ đã chuẩn hoá (chữ thường, bỏ dấu câu).
 *  Dùng để so khớp căn cứ: tiếng Anh có khoảng trắng ngăn từ nên so theo TỪ
 *  (chính xác hơn hẳn so theo từng ký tự). */
function words(s: string): string[] {
  return (s.toLowerCase().match(/[a-z0-9'’-]+/g) ?? []).filter((w) => w.length > 0);
}

/** Từ chức năng quá phổ biến — có mặt ở mọi câu nên không phải "căn cứ" gì cả. */
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "am", "was", "were", "be", "do", "does", "did",
  "i", "you", "he", "she", "it", "we", "they", "my", "your", "his", "her", "its",
  "and", "or", "but", "to", "of", "in", "on", "at", "for", "with", "this", "that",
  "what", "who", "where", "when", "how", "yes", "no", "not", "can", "will", "have", "has",
]);

export interface EvidenceQuestion {
  type: string;
  prompt: string;
  options?: unknown;
  correctAnswer: unknown;
}

/**
 * Đoán xem câu nào trong lời thoại là căn cứ cho đáp án đúng.
 * Cách chấm điểm: khớp nguyên văn đáp án là tín hiệu mạnh nhất, sau đó tới số từ
 * (bỏ từ chức năng) trùng với đáp án, cuối cùng là trùng với đề bài. Trả về -1
 * khi không câu nào đủ điểm tin cậy (để không bao giờ tô sáng bừa).
 */
export function findEvidenceIndex(segments: TranscriptSegment[], q: EvidenceQuestion): number {
  if (!segments.length) return -1;

  const ca = (q.correctAnswer ?? {}) as { index?: number; value?: boolean; text?: string };
  const opts = Array.isArray(q.options) ? (q.options as Array<{ text?: string }>) : [];
  let answerText = typeof ca.text === "string" ? ca.text : "";
  if (!answerText && typeof ca.index === "number") {
    answerText = opts[ca.index]?.text ?? "";
  }

  const answerWords = answerText ? words(answerText).filter((w) => !STOP_WORDS.has(w)) : [];
  const promptWords = words(q.prompt).filter((w) => !STOP_WORDS.has(w));
  const answerLower = answerText.trim().toLowerCase();

  let best = -1;
  let bestScore = 0;
  segments.forEach((seg, i) => {
    const segWords = new Set(words(seg.text));
    let score = 0;
    if (answerLower && seg.text.toLowerCase().includes(answerLower)) {
      score += 50 + answerWords.length * 5;
    }
    for (const w of answerWords) if (segWords.has(w)) score += 6;
    for (const w of promptWords) if (segWords.has(w)) score += 2;
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  });

  return bestScore >= 6 ? best : -1;
}
