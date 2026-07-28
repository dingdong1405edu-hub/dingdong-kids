// ===========================================================================
//  TIỆN ÍCH XỬ LÝ TIẾNG ANH — thay cho src/lib/pinyin.ts của bản tiếng Trung.
//  Thuần hàm, không phụ thuộc DB/mạng, dùng được ở cả server lẫn client.
// ===========================================================================

/**
 * Chuẩn hoá một câu trả lời để so khớp: bỏ khoảng trắng thừa, đưa về chữ
 * thường, bỏ dấu câu ở hai đầu, quy đổi dấu nháy cong → nháy thẳng.
 * KHÔNG bỏ dấu câu ở giữa câu (vd "I'm" phải giữ nguyên dấu nháy).
 */
export function normalizeAnswer(text: string): string {
  return text
    .normalize("NFC")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .replace(/[.,!?;:"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Khoảng cách Levenshtein — dùng để chấm "gần đúng" cho trẻ nhỏ.
 * Cài đặt hai hàng (O(min(a,b)) bộ nhớ) vì chuỗi ở đây luôn ngắn.
 */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let curr = new Array<number>(b.length + 1);

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

/**
 * Câu trả lời của trẻ có được coi là ĐÚNG không?
 *
 * Trẻ nhỏ gõ sai chính tả liên tục (thiếu chữ, đảo chữ, quên -s). Bắt đúng từng
 * ký tự sẽ khiến trẻ nản. Vì vậy ta cho phép sai lệch nhỏ theo ĐỘ DÀI đáp án:
 *   ≤ 3 ký tự  → phải khớp tuyệt đối (từ ngắn, sai 1 chữ là thành từ khác)
 *   4–7 ký tự  → cho sai 1 ký tự
 *   ≥ 8 ký tự  → cho sai 2 ký tự
 *
 * `strict = true` (dùng cho bài kiểm tra / thi thử) tắt hoàn toàn phần nới lỏng.
 */
export function isAnswerAcceptable(
  input: string,
  accepted: string[],
  strict = false
): boolean {
  const got = normalizeAnswer(input);
  if (!got) return false;

  for (const raw of accepted) {
    const want = normalizeAnswer(raw);
    if (!want) continue;
    if (got === want) return true;
    if (strict) continue;

    const tolerance = want.length <= 3 ? 0 : want.length <= 7 ? 1 : 2;
    if (tolerance > 0 && editDistance(got, want) <= tolerance) return true;
  }
  return false;
}

/** Tách câu thành mảng từ (bỏ dấu câu). Dùng cho bài "sắp xếp câu". */
export function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

/**
 * Ước lượng SỐ ÂM TIẾT của một từ tiếng Anh — dùng để gợi ý chỗ ngắt khi dạy
 * trẻ đọc và để xếp độ khó từ vựng.
 *
 * Đây là phép heuristic, KHÔNG chính xác tuyệt đối (tiếng Anh có rất nhiều
 * ngoại lệ). Quy tắc: đếm cụm nguyên âm liền nhau, trừ đi "e" câm cuối từ, và
 * luôn trả về tối thiểu 1.
 */
export function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;

  const groups = w
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "") // bỏ đuôi câm -es/-ed/-e
    .replace(/^y/, "") // "y" đầu từ là phụ âm (yes, you)
    .match(/[aeiouy]{1,2}/g);

  return Math.max(1, groups ? groups.length : 1);
}

/**
 * Tách một từ thành các chữ cái để dựng bài kéo–thả ghép chữ (`spell_drag`).
 * Trả về mảng chữ cái viết thường.
 */
export function letters(word: string): string[] {
  return word.toLowerCase().replace(/[^a-z]/g, "").split("");
}

/**
 * Trộn mảng theo thuật toán Fisher–Yates. Nhận `rand` để test tất định được;
 * mặc định dùng Math.random.
 */
export function shuffle<T>(items: T[], rand: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Phần vần (rime) của một từ đơn âm tiết — từ nguyên âm đầu tiên tới hết từ.
 * "cat" → "at", "ship" → "ip". Dùng cho bài nối từ cùng vần (`rhyme_match`)
 * và cho phần Phonics. Trả "" nếu không tìm thấy nguyên âm.
 */
export function rime(word: string): string {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  const idx = w.search(/[aeiou]/);
  return idx === -1 ? "" : w.slice(idx);
}

/** Hai từ có cùng vần không? Dùng để kiểm tra dữ liệu bài rhyme_match. */
export function rhymesWith(a: string, b: string): boolean {
  const ra = rime(a);
  return ra !== "" && ra === rime(b);
}

/**
 * Viết hoa chữ cái đầu câu — trẻ hay quên, ta tự sửa khi hiển thị đáp án mẫu
 * thay vì bắt lỗi.
 */
export function capitalize(text: string): string {
  const t = text.trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
}
