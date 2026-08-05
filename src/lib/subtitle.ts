// ===========================================================================
//  ĐỌC PHỤ ĐỀ SRT / WebVTT → danh sách câu có mốc thời gian.
//
//  Đây là đường NHANH NHẤT để gắn một bộ phim vào khu "Xem hoạt hình": thay vì
//  ngồi bấm mốc từng câu, dán nguyên tệp phụ đề vào là xong.
//
//  Vì sao phải tự viết thay vì lấy phụ đề của YouTube bằng API: `captions.download`
//  đòi quyền SỬA video (chỉ chủ kênh có), còn `timedtext` là endpoint không
//  chính thức và vi phạm điều khoản. Nên phụ đề phải do NGƯỜI VẬN HÀNH cung cấp
//  — tự gõ, tải từ kênh của mình, hoặc xin của chủ kênh.
//
//  Thuần hàm, không phụ thuộc DB/mạng — dùng được ở cả server lẫn client.
// ===========================================================================
import type { CartoonLine } from "./cartoon-data/types";

/** Một khối phụ đề thô, trước khi gộp thành câu. */
export interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

/**
 * `00:01:02,500` · `00:01:02.500` · `01:02.5` → giây.
 * Trả `NaN` nếu không phải mốc thời gian.
 */
function toSeconds(stamp: string): number {
  const m = stamp.trim().match(/^(?:(\d+):)?(\d{1,2}):(\d{1,2})(?:[.,](\d{1,3}))?$/);
  if (!m) return NaN;
  const [, h, mm, ss, ms] = m;
  return (
    Number(h ?? 0) * 3600 +
    Number(mm) * 60 +
    Number(ss) +
    Number((ms ?? "0").padEnd(3, "0")) / 1000
  );
}

/** Bỏ thẻ định dạng của WebVTT/SRT (`<c>`, `<00:00:01.000>`, `{\an8}`). */
function stripTags(line: string): string {
  return line
    .replace(/<[^>]*>/g, "")
    .replace(/\{[^}]*\}/g, "")
    .trim();
}

/**
 * Đọc nội dung SRT hoặc WebVTT thành các khối phụ đề.
 *
 * Chấp nhận cả hai định dạng vì người dùng không phân biệt được: khác nhau chỉ
 * ở dòng `WEBVTT` mở đầu, số thứ tự của SRT, và dấu phân cách mili giây
 * (`,` với SRT · `.` với VTT) — cả ba đều được bỏ qua ở đây.
 */
export function parseSubtitles(raw: string): SubtitleCue[] {
  const cues: SubtitleCue[] = [];
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");

  for (let i = 0; i < lines.length; i++) {
    const arrow = lines[i].split("-->");
    if (arrow.length !== 2) continue;

    const start = toSeconds(arrow[0]);
    // Dòng mốc của VTT có thể kèm tham số vị trí sau mốc kết thúc
    // ("00:00:05.000 align:start position:0%") → chỉ lấy cụm đầu tiên.
    const end = toSeconds(arrow[1].trim().split(/\s+/)[0]);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) continue;

    // Gom mọi dòng chữ tới khi gặp dòng trống hoặc khối kế tiếp.
    const parts: string[] = [];
    for (let j = i + 1; j < lines.length; j++) {
      const t = lines[j];
      if (!t.trim()) break;
      if (t.includes("-->")) break;
      // Số thứ tự khối của SRT đứng ngay trước dòng mốc kế tiếp → bỏ.
      if (/^\d+$/.test(t.trim()) && lines[j + 1]?.includes("-->")) break;
      parts.push(stripTags(t));
      i = j;
    }

    const text = parts.join(" ").replace(/\s+/g, " ").trim();
    if (text) cues.push({ start, end, text });
  }

  return cues;
}

/** Khối này đã kết thúc một câu chưa? */
const ENDS_SENTENCE = /[.!?…]["')\]]?$/;

export interface MergeOptions {
  /** Câu dài hơn ngần này thì cắt, dù chưa gặp dấu chấm câu. */
  maxSeconds?: number;
  /** Hai khối cách nhau quá lâu thì coi như hai câu, dù chưa có dấu chấm. */
  maxGapSeconds?: number;
}

/**
 * Gộp các khối phụ đề thành CÂU.
 *
 * Phụ đề hay cắt một câu làm hai ba khối cho vừa màn hình
 * ("I really like" / "muddy puddles!"). Bắt bé nhắc lại nửa câu là vô nghĩa,
 * nên phải gộp lại tới khi gặp dấu chấm câu.
 *
 * Hai chốt chặn để không gộp quá tay:
 *  • `maxSeconds` — phụ đề tự động của YouTube gần như không có dấu chấm câu,
 *    không chặn thì cả phim dồn thành một "câu".
 *  • `maxGapSeconds` — im lặng dài giữa hai khối là đã sang cảnh khác.
 */
export function mergeCuesToSentences(
  cues: SubtitleCue[],
  { maxSeconds = 6, maxGapSeconds = 1.5 }: MergeOptions = {},
): SubtitleCue[] {
  const out: SubtitleCue[] = [];
  let current: SubtitleCue | null = null;

  for (const cue of cues) {
    if (!current) {
      current = { ...cue };
      continue;
    }
    const gap = cue.start - current.end;
    const wouldBe = cue.end - current.start;
    const done = ENDS_SENTENCE.test(current.text) || gap > maxGapSeconds || wouldBe > maxSeconds;

    if (done) {
      out.push(current);
      current = { ...cue };
    } else {
      current = {
        start: current.start,
        end: cue.end,
        text: `${current.text} ${cue.text}`.replace(/\s+/g, " "),
      };
    }
  }
  if (current) out.push(current);
  return out;
}

export interface ImportOptions extends MergeOptions {
  /** Bỏ câu ngắn hơn ngần này (khối "♪♪" hoặc tiếng động). */
  minSeconds?: number;
  /** Bỏ câu ít hơn ngần này số từ — không đủ để tập nói. */
  minWords?: number;
}

/**
 * Đường một-bước: nội dung tệp phụ đề → danh sách câu dùng được ngay.
 *
 * Nghĩa tiếng Việt (`vi`) để trống — phụ đề gốc không có, người vận hành điền
 * sau ở studio. Câu vẫn học được khi thiếu nghĩa, chỉ là bố mẹ không đọc được
 * nội dung.
 */
export function subtitlesToLines(raw: string, opts: ImportOptions = {}): CartoonLine[] {
  const { minSeconds = 0.6, minWords = 2, ...merge } = opts;

  return mergeCuesToSentences(parseSubtitles(raw), merge)
    .filter((c) => {
      if (c.end - c.start < minSeconds) return false;
      // Nốt nhạc = lời BÀI HÁT. Bỏ hẳn: hát kéo dài nguyên âm và lệch nhịp nói,
      // bắt bé "nhắc lại" một câu hát thì máy chấm kiểu gì cũng ra ít sao.
      if (/[♪♫]/.test(c.text)) return false;
      // Chú thích tiếng động: "[Music]", "(laughs)" — không phải lời thoại.
      const clean = c.text.replace(/[[(].*?[\])]/g, "").trim();
      return clean.split(/\s+/).filter(Boolean).length >= minWords;
    })
    .map((c) => ({
      start: Number(c.start.toFixed(1)),
      end: Number(c.end.toFixed(1)),
      text: c.text.replace(/[[(].*?[\])]/g, "").replace(/\s+/g, " ").trim(),
      vi: "",
    }));
}
