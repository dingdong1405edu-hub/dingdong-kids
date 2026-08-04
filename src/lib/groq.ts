import Groq from "groq-sdk";
import { countWords } from "@/lib/utils";
import { levelLabelWithAge } from "@/lib/utils";

// Tạo client Groq lười (lazy). Khởi tạo lúc load module sẽ ném lỗi khi thiếu
// GROQ_API_KEY, làm vỡ `next build` (giai đoạn thu thập page-data) và mọi lệnh
// import module này. Tạo ở lần dùng đầu tiên giữ build luôn xanh và để các
// endpoint chấm bài báo lỗi gọn gàng khi chưa cấu hình.
let _groq: Groq | null = null;
function getGroq(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY_MISSING");
  }
  if (!_groq) _groq = new Groq({ apiKey });
  return _groq;
}

export function isGradingConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY);
}

// ===== Chuyển giọng nói → văn bản (dự phòng cho Deepgram) =====
// Groq phục vụ Whisper qua endpoint multipart tương thích OpenAI. Ta gọi thẳng
// bằng fetch (không dùng chat SDK) để hình dạng request rõ ràng và khớp với
// container audio gửi lên. Dùng bởi src/lib/stt.ts khi Deepgram không sẵn sàng.
const GROQ_TRANSCRIBE_ENDPOINT = "https://api.groq.com/openai/v1/audio/transcriptions";
const GROQ_STT_MODEL = process.env.GROQ_STT_MODEL || "whisper-large-v3";

/**
 * Chuyển audio tiếng Anh thành văn bản qua Groq Whisper. Trả "" khi không phát
 * hiện giọng nói. Ném lỗi khi thiếu key hoặc API lỗi.
 */
export async function transcribeWithGroq(audioBuffer: Buffer, mimeType: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY_MISSING");

  const form = new FormData();
  const mt = (mimeType || "audio/webm").toLowerCase();
  // Whisper (tương thích OpenAI) suy ra container từ ĐUÔI TỆP chứ không phải
  // Content-Type — nên tên tệp phải khớp bytes thật (mp3 từ TTS, webm/mp4 từ
  // MediaRecorder, wav/ogg/m4a từ tệp tải lên), nếu không sẽ lỗi 400.
  const ext =
    mt.includes("mpeg") || mt.includes("mp3") ? "mp3"
    : mt.includes("wav") ? "wav"
    : mt.includes("ogg") ? "ogg"
    : mt.includes("mp4") || mt.includes("m4a") ? "m4a"
    : "webm";
  const blob = new Blob([new Uint8Array(audioBuffer)], { type: mimeType || "audio/webm" });
  form.append("file", blob, `audio.${ext}`);
  form.append("model", GROQ_STT_MODEL);
  form.append("language", "en"); // tiếng Anh (ISO 639-1) — tăng độ chính xác + giảm độ trễ
  form.append("response_format", "json");

  const res = await fetch(GROQ_TRANSCRIBE_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Groq Whisper lỗi ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as { text?: string };
  return data.text ?? "";
}

// Model chấm viết. Bản tiếng Trung để Qwen đứng đầu vì cần model "Chinese-native";
// với TIẾNG ANH lý do đó không còn, nên mặc định là gpt-oss-120b (JSON chặt,
// tiếng Anh tốt) → llama → qwen. Gọi lần lượt: model lỗi hoặc trả JSON hỏng thì
// tự rớt sang model kế. Đổi không cần sửa code: đặt env
// GROQ_WRITING_MODELS="model1,model2,...".
const WRITING_MODELS = (
  process.env.GROQ_WRITING_MODELS ??
  "openai/gpt-oss-120b,llama-3.3-70b-versatile,qwen/qwen3.6-27b"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Model cho các luồng JSON CÒN LẠI (chấm nói, sinh câu hỏi đọc/nghe, giải thích
// đáp án, tra từ). Cùng triết lý với WRITING_MODELS. Tách env riêng
// (GROQ_GRADING_MODELS) để tinh chỉnh độc lập với phần chấm viết.
const GRADING_MODELS = (
  process.env.GROQ_GRADING_MODELS ??
  "openai/gpt-oss-120b,llama-3.3-70b-versatile,qwen/qwen3.6-27b"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * Gọi Groq lấy JSON, thử lần lượt `models` (rớt sang model kế khi lỗi/JSON hỏng).
 * Thêm `/no_think` để tắt reasoning của các model có chế độ suy nghĩ — tiết kiệm
 * output token. Trả về JSON đã parse (unknown) hoặc ném lỗi nếu mọi model đều
 * hỏng. Dùng chung cho chấm nói + sinh câu hỏi + giải thích đáp án + tra từ.
 */
async function runGroqJson(opts: {
  models: string[];
  system: string;
  user: string;
  maxTokens: number;
  temperature?: number;
}): Promise<unknown> {
  const { models, system, user, maxTokens, temperature = 0.2 } = opts;
  let lastErr: unknown = null;
  for (const model of models) {
    try {
      const response = await getGroq().chat.completions.create({
        model,
        max_tokens: maxTokens,
        temperature,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: `${system}\n/no_think` },
          { role: "user", content: user },
        ],
      });
      const choice = response.choices[0];
      const content = choice?.message?.content ?? "";
      const parsed = parseGraderJson(content);
      if (parsed === undefined) {
        console.error("Groq JSON parse thất bại", {
          model,
          finishReason: choice?.finish_reason,
          contentLength: content.length,
        });
        lastErr = new Error(`parse_failed:${model}`);
        continue;
      }
      return parsed;
    } catch (e) {
      console.error("Groq model lỗi", { model, error: String(e) });
      lastErr = e;
      continue;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Phản hồi AI không hợp lệ");
}

const WRITING_SYSTEM = `You are a certified Cambridge English examiner for YOUNG LEARNERS (ages 4-15) and a specialist teacher for Vietnamese children. Grade ONE short English composition written by a CHILD. Output ONLY one compact JSON object — no markdown, no code fences, no <think>, no analysis, no extra keys.

AUDIENCE — THIS IS A CHILD, NOT AN ADULT. Be encouraging and fair. Never grade a 6-year-old against adult prose. Reward effort and communication over perfection.

CALIBRATE to the stated level (Cambridge Young Learners framework):
- Pre-Starters (4-5): a few words or one very simple sentence; reward ANY correct English.
- Starters (6-7, Pre-A1): simple sentences with familiar words (I like..., This is...).
- Movers (7-9, A1): a few connected sentences, basic connectives (and, but, because).
- Flyers (9-11, A2): a short paragraph with past/future, more descriptive vocabulary.
- Key A2 (11-13): organized paragraphs, opinions with reasons.
- Preliminary B1 (13-15): developed multi-paragraph writing, varied structures.
Never penalize a lower level for lacking higher-level sophistication. At the stated level: 90+ fully meets that level with near-zero errors; ~70 communicates the idea but has several level-appropriate errors.

SCORE four axes INDEPENDENTLY (let them diverge — writing can be grammatical yet disorganized, or rich in vocabulary yet error-heavy):
- g (Grammar): sentence-level grammatical correctness.
- v (Vocabulary): word choice, accuracy and range.
- c (Coherence): organization and flow across sentences. For Pre-Starters/Starters, judge this leniently — one sentence cannot show organization; give ≥75 if the single sentence is on-topic.
- t (Task): fits the task/outline and reaches the required word count ONLY.
Bands by level-relative error density: 90-100 = ≤1 minor error; 75-89 = a few minor errors, meaning clear; 60-74 = many errors but main idea still understandable; 40-59 = errors block understanding in most sentences; 0-39 = off-topic OR far too short OR almost every sentence wrong.
s (overall): weight grammar+task at the younger levels, balance all four from Movers up, weight vocabulary+coherence more at Key/Preliminary. s MUST lie between the lowest and the highest of g/v/c/t.
CONSISTENCY: if "e" is empty, all four sub-scores must be ≥85; if you list serious errors, g and v must reflect them. Use the word count given in the user message — do NOT recount it yourself.

FIND every real error, checking these categories: grammar, vocabulary, word_order, spelling, article (a/an/the), tense, plural (-s), preposition, punctuation, capitalization.
Vietnamese-L1 pitfalls to check actively — these are the errors Vietnamese children actually make:
- Missing plural -s ("three cat" → "three cats").
- Missing/wrong article ("I have dog" → "I have a dog"); Vietnamese has no articles.
- Missing verb "to be" ("She happy" → "She is happy").
- Wrong/absent verb tense ("Yesterday I go" → "Yesterday I went"); Vietnamese verbs do not conjugate.
- Adjective after noun ("a car red" → "a red car"), copying Vietnamese word order.
- Missing 3rd-person -s ("He like" → "He likes").
- Subject omitted ("Is very big" → "It is very big").
- Word-by-word translation from Vietnamese.
- No capital letter at the start of a sentence or for "I".
CONFIDENCE over exhaustiveness: only report a span you are CONFIDENT is wrong at the stated level; when unsure, skip it. A correct composition returns "e": []. Prefer missing a marginal error to inventing one — a false correction confuses a child badly.

DIFF CONTRACT (the server rebuilds the corrected text from your error list by replacing each "o" with "f" — follow EXACTLY or the fix is lost):
- "o" = a NON-EMPTY contiguous substring copied VERBATIM, character-for-character, from the submission — including the child's EXACT spelling, capitalization and punctuation.
- "f" = "o" rewritten correctly: a MINIMAL edit that fixes ONLY this issue and preserves the child's meaning (do not restyle, do not add new content).
- OMISSION (missing article/verb/plural…): set "o" to a short EXISTING window (2-6 words) around the gap and "f" to that window with the element added. NEVER use an empty "o".
- Single wrong word: quote the WHOLE surrounding phrase (2-5 words), never a bare word, so it can be located uniquely.
- Make each "o" long enough to occur EXACTLY ONCE in the submission; spans must NOT overlap or nest — if two fixes touch the same region, merge them into one larger o→f span. List errors in the order they appear.

Write "n" (per error) and "fb" (overall) in natural Vietnamese that a CHILD or their PARENT can understand — SHORT, simple words, each on ONE line, no literal newlines, no unescaped quotes/backslashes. "fb" = 2-3 câu: KHEN một điểm mạnh trước, rồi một gợi ý chính.

Output EXACTLY these keys and nothing else:
{"s":<0-100>,"g":<0-100>,"v":<0-100>,"c":<0-100>,"t":<0-100>,"e":[{"o":"<verbatim wrong span>","f":"<bản sửa>","k":"<grammar|vocabulary|word_order|spelling|article|tense|plural|preposition|punctuation|capitalization>","n":"<giải thích ngắn, tiếng Việt, dễ hiểu với trẻ>"}],"fb":"<nhận xét ngắn, tiếng Việt, khen trước>"}
/no_think`;

const SPEAKING_SYSTEM = `You are a Cambridge English Young Learners speaking examiner. You evaluate spoken English by Vietnamese CHILDREN (ages 4-15). Be encouraging — the goal is to build confidence, not to find fault.

CRITICAL CAVEAT: the text you receive is an automatic speech-recognition TRANSCRIPT. Speech recognition on CHILDREN'S voices is significantly less accurate than on adults. Do NOT harshly penalize oddities that are plausibly recognizer errors rather than the child's mistakes. When unsure whether something is the child or the machine, give the child the benefit of the doubt.

Return ONLY valid JSON.`;

export async function gradeWriting(params: {
  submission: string;
  level: string;
  taskPrompt: string;
  minWords: number;
  outline?: string | null;
}): Promise<WritingGradeResult> {
  const { submission, level, taskPrompt, minWords, outline } = params;

  const outlineBlock = outline?.trim() ? outline.trim() : "Không có dàn ý gợi ý cho đề này.";

  // Đếm từ Ở SERVER rồi đưa số thật cho model: LLM đếm không đáng tin, nên không
  // để nó tự phán "đủ số từ chưa".
  const wordCount = countWords(submission);
  const tooShortNote =
    minWords > 0 && wordCount < minWords
      ? ` — bài viết NGẮN HƠN mức tối thiểu, hạ điểm "t" (Task) tương ứng.`
      : "";

  const userContent = `Level: ${levelLabelWithAge(level)}
Số từ của bài (đã đếm sẵn — DÙNG SỐ NÀY, đừng tự đếm lại): ${wordCount} (tối thiểu: ${minWords})${tooShortNote}

=== TASK PROMPT ===
${taskPrompt}

=== OUTLINE ===
${outlineBlock}

=== SUBMISSION (chấm bài này; trích "o" ĐÚNG NGUYÊN VĂN từ đây) ===
${submission}

Return ONLY the compact JSON object.`;

  // Gọi lần lượt các model trong WRITING_MODELS: model đầu cho chất lượng tốt
  // nhất; nếu nó lỗi (rate-limit / bị gỡ) hoặc trả JSON hỏng thì rớt sang model
  // kế — tự phục hồi.
  let lastErr: unknown = null;
  for (const model of WRITING_MODELS) {
    try {
      const response = await getGroq().chat.completions.create({
        model,
        // Output đã gọn (không có bản sửa toàn bài) → trần thấp vẫn dư, đồng thời
        // chặn chi phí nếu model "nghĩ" lan man.
        max_tokens: 3072,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: WRITING_SYSTEM },
          { role: "user", content: userContent },
        ],
      });

      const choice = response.choices[0];
      const content = choice?.message?.content ?? "";
      const parsed = parseGraderJson(content);
      if (parsed === undefined) {
        console.error("Chấm viết: parse thất bại", {
          model,
          finishReason: choice?.finish_reason,
          contentLength: content.length,
        });
        lastErr = new Error(`parse_failed:${model}`);
        continue;
      }
      return coerceCompactWriting(parsed, submission, level);
    } catch (e) {
      console.error("Chấm viết: model lỗi", { model, error: String(e) });
      lastErr = e;
      continue;
    }
  }

  throw lastErr instanceof Error ? lastErr : new Error("Phản hồi AI không hợp lệ");
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function asStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}
function asOptStr(v: unknown): string | undefined {
  return typeof v === "string" && v.trim().length > 0 ? v : undefined;
}
function asStrArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.trim().length > 0) : [];
}
function clampScore(v: unknown): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0;
}

/**
 * Nhãn band tiếng Việt suy từ điểm tổng + cấp độ (không tốn token của AI).
 * Giọng điệu hướng tới TRẺ EM: luôn tích cực, không có nhãn "Yếu"/"Kém".
 */
function bandLabelFor(score: number, level: string): string {
  const lbl = levelLabelWithAge(level).split(" · ")[0];
  if (score >= 90) return `Tuyệt vời – vượt chuẩn ${lbl} 🌟`;
  if (score >= 75) return `Rất tốt – đạt chuẩn ${lbl} 🎉`;
  if (score >= 60) return "Khá – cố thêm chút nữa nhé 💪";
  if (score >= 40) return "Đang tiến bộ – luyện thêm nào 🌱";
  return "Cùng làm lại nhé, bé sẽ làm được! 🤗";
}

/** Parse JSON từ model với vài lớp dự phòng (fences, chữ thừa quanh JSON). */
function parseGraderJson(content: string): unknown {
  if (!content) return undefined;
  const tryParse = (s: string): unknown => {
    try {
      return JSON.parse(s);
    } catch {
      return undefined;
    }
  };
  let v = tryParse(content);
  if (v !== undefined) return v;
  const stripped = content
    .replace(/^\s*```(?:json)?/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  v = tryParse(stripped);
  if (v !== undefined) return v;
  // Cắt từ "{" đầu tới "}" cuối (phòng khi có chữ thừa quanh JSON).
  const first = stripped.indexOf("{");
  const last = stripped.lastIndexOf("}");
  if (first >= 0 && last > first) {
    v = tryParse(stripped.slice(first, last + 1));
    if (v !== undefined) return v;
  }
  return undefined;
}

/**
 * Dựng "bản sửa" toàn bài Ở SERVER từ danh sách lỗi (o→f) — không nhờ AI viết
 * lại cả bài (tiết kiệm output token) và bản sửa luôn KHỚP 100% với phần lỗi đã
 * giải thích. Bền với các bẫy khi model trả span chưa chuẩn:
 *  - chuẩn hoá NFC hai phía trước khi tìm;
 *  - span lặp lại (cùng "o") → con trỏ chạy để vá lần lượt từng vị trí;
 *  - span không định vị được / rỗng → bỏ qua khi GHÉP, nhưng vẫn còn trong danh
 *    sách annotations nên không "mất" lỗi nào trước mắt học viên;
 *  - span chồng lấn → ưu tiên span dài hơn, span sau bị bỏ.
 */
function reconstructCorrected(
  original: string,
  errs: ReadonlyArray<{ original: string; correction: string }>
): string {
  const text = original.normalize("NFC");
  type Span = { start: number; end: number; rep: string; len: number };
  const spans: Span[] = [];
  const cursorByO = new Map<string, number>();
  for (const e of errs) {
    const o = (e.original ?? "").normalize("NFC");
    if (!o) continue; // không ghép span rỗng (indexOf("") === 0 sẽ phá bài)
    const f = (e.correction ?? "").normalize("NFC");
    const from = cursorByO.get(o) ?? 0;
    let idx = text.indexOf(o, from);
    if (idx < 0 && from > 0) idx = text.indexOf(o);
    if (idx < 0) continue; // không định vị được → không ghép
    cursorByO.set(o, idx + o.length);
    spans.push({ start: idx, end: idx + o.length, rep: f, len: o.length });
  }
  // Cùng vị trí thì span DÀI đứng trước để được giữ lại khi xử lý chồng lấn.
  spans.sort((a, b) => a.start - b.start || b.len - a.len);
  let out = "";
  let cursor = 0;
  for (const s of spans) {
    if (s.start < cursor) continue; // chồng lấn span đã ghép → bỏ
    out += text.slice(cursor, s.start) + s.rep;
    cursor = s.end;
  }
  out += text.slice(cursor);
  return out;
}

/**
 * Loại lỗi hợp lệ (khoá tiếng Anh AI trả về) → nhãn tiếng Việt hiển thị cho trẻ.
 * Dùng khoá tiếng Anh trong hợp đồng JSON vì model bám enum tiếng Anh ổn định
 * hơn; phần hiển thị mới dịch sang tiếng Việt.
 */
const ERROR_TYPE_LABEL: Record<string, string> = {
  grammar: "Ngữ pháp",
  vocabulary: "Từ vựng",
  word_order: "Trật tự từ",
  spelling: "Chính tả",
  article: "Mạo từ (a/an/the)",
  tense: "Thì của động từ",
  plural: "Số nhiều",
  preposition: "Giới từ",
  punctuation: "Dấu câu",
  capitalization: "Viết hoa",
};

/** Nhãn tiếng Việt của một loại lỗi; trả undefined nếu AI trả loại lạ. */
function errorTypeLabel(k: string): string | undefined {
  return ERROR_TYPE_LABEL[k.trim().toLowerCase()];
}

/**
 * Ép JSON gọn của model ({s,g,v,c,t,e,fb}) về `WritingGradeResult` mà UI / PDF /
 * module thi đang dùng. "Bản sửa" được dựng lại ở server từ danh sách lỗi.
 * Không tin shape AS-IS: clamp điểm, lọc lỗi rỗng, validate loại.
 */
function coerceCompactWriting(raw: unknown, submission: string, level: string): WritingGradeResult {
  const r = isRecord(raw) ? raw : {};

  const annotations = (Array.isArray(r.e) ? r.e : [])
    .filter(isRecord)
    .map((a) => ({
      original: asStr(a.o),
      type: errorTypeLabel(asStr(a.k)),
      issue: "",
      correction: asStr(a.f),
      explanation: asStr(a.n),
    }))
    .filter((a) => a.original || a.correction || a.explanation);

  const score = clampScore(r.s);
  return {
    score,
    bandLabel: bandLabelFor(score, level),
    criteria: {
      taskResponse: { score: clampScore(r.t), feedback: "" },
      grammar: { score: clampScore(r.g), feedback: "", errors: [] },
      vocabulary: { score: clampScore(r.v), feedback: "", suggestions: [] },
      coherence: { score: clampScore(r.c), feedback: "" },
    },
    annotations,
    correctedVersion: reconstructCorrected(submission, annotations),
    overallFeedback: asStr(r.fb),
  };
}

/** Ép kết quả chấm NÓI về đúng SpeakingGradeResult với mặc định an toàn (không
 *  tin shape thô từ AI) — tránh crash UI khi payload thiếu `criteria`/`score`. */
function coerceSpeakingResult(raw: unknown): SpeakingGradeResult {
  const r = isRecord(raw) ? raw : {};
  const c = isRecord(r.criteria) ? r.criteria : {};
  const p = isRecord(c.pronunciation) ? c.pronunciation : {};
  const i = isRecord(c.intonation) ? c.intonation : {};
  const f = isRecord(c.fluency) ? c.fluency : {};
  const rows = (v: unknown) => (Array.isArray(v) ? v.filter(isRecord) : []);
  return {
    score: clampScore(r.score),
    criteria: {
      pronunciation: {
        score: clampScore(p.score),
        errors: rows(p.errors).map((e) => ({ word: asStr(e.word), issue: asStr(e.issue), correct: asStr(e.correct) })),
      },
      intonation: {
        score: clampScore(i.score),
        errors: rows(i.errors).map((e) => ({ word: asStr(e.word), expected: asStr(e.expected), detected: asStr(e.detected) })),
      },
      fluency: {
        score: clampScore(f.score),
        wordsPerMinute: typeof f.wordsPerMinute === "number" ? f.wordsPerMinute : 0,
        feedback: asStr(f.feedback),
      },
    },
    transcript: asStr(r.transcript),
    overallFeedback: asStr(r.overallFeedback),
  };
}

export async function gradeSpeaking(params: {
  transcript: string;
  referenceText: string | null;
  part: "repeat" | "read" | "answer";
  question: string | null;
  level: string;
}): Promise<SpeakingGradeResult> {
  const { transcript, referenceText, part, question, level } = params;

  const partContext =
    part === "repeat"
      ? `Part 1 (Repeat after me): Reference sentence: "${referenceText}"`
      : part === "read"
        ? `Part 2 (Read aloud): Reference text: "${referenceText}"`
        : `Part 3 (Answer the question): Question: "${question}"`;

  const parsed = await runGroqJson({
    models: GRADING_MODELS,
    system: SPEAKING_SYSTEM,
    maxTokens: 1536,
    temperature: 0.3,
    user: `Evaluate this speaking submission by a Vietnamese child at ${levelLabelWithAge(level)} level.
${partContext}
Transcript (from automatic speech recognition): "${transcript}"

Judge THREE axes:
- pronunciation: individual sound accuracy. Vietnamese children commonly: drop final consonants (cat → ca), replace /θ/ (th) with /t/, replace /ʃ/ (sh) with /s/, omit final -s/-ed, and drop /r/ at the end of words. Report only errors you can actually infer from the transcript.
- intonation: word stress and sentence rhythm. Vietnamese is syllable-timed, so children often give every syllable equal weight instead of stressing one. "expected" = the stress or intonation that was needed; "detected" = what appears to have happened.
- fluency: speaking rate, pauses, repetition and filler words.

Be ENCOURAGING — this is a child. Write all feedback in simple Vietnamese a child understands, praising first.

Return JSON:
{
  "score": <0-100>,
  "criteria": {
    "pronunciation": { "score": <0-100>, "errors": [{ "word": "<word>", "issue": "<tiếng Việt, đơn giản>", "correct": "<cách đọc đúng>" }] },
    "intonation": { "score": <0-100>, "errors": [{ "word": "<word or phrase>", "expected": "<trọng âm/ngữ điệu đúng>", "detected": "<tiếng Việt>" }] },
    "fluency": { "score": <0-100>, "wordsPerMinute": <number>, "feedback": "<tiếng Việt, đơn giản>" }
  },
  "transcript": "${transcript}",
  "overallFeedback": "<nhận xét tổng bằng tiếng Việt, KHEN trước rồi mới góp ý>"
}`,
  });

  return coerceSpeakingResult(parsed);
}

// ===== Chấm MỘT TỪ cho bé CHƯA BIẾT CHỮ (cấp "Bé Tập Nói") =====
//
// Đây là thang chấm DỄ NHẤT toàn hệ thống, và cố ý như vậy:
//  • Người học là bé 3–5 tuổi vừa nghe tiếng Anh lần đầu. Mục tiêu của màn này
//    là bé DÁM MỞ MIỆNG NÓI, không phải phát âm chuẩn.
//  • Nhận dạng giọng nói trên giọng trẻ em kém hơn giọng người lớn rất nhiều;
//    thêm nữa bé hay nói lẫn tiếng Việt, cười, hoặc bố mẹ nói chen vào. Vì thế
//    transcript sai KHÔNG được mặc định coi là bé sai.
//  • KHÔNG BAO GIỜ trả 0 sao. Sàn là 1 sao — bé đã chịu nói là đáng khen.
// Output cực gọn (4 khoá) vì màn hình của bé chỉ hiện sao + một dòng chữ cho mẹ.
const KID_WORD_SYSTEM = `You are a warm, playful English teacher for VERY YOUNG Vietnamese children (ages 3-5) who CANNOT READ YET. A child looked at a picture, heard one English word, and tried to repeat it. You receive the ASR transcript of what the child said. Output ONLY one compact JSON object — no markdown, no code fences, no <think>, no extra keys.

SCORING (be extremely generous — this is a toddler's first contact with English):
- 3 = the transcript clearly contains the target word, or a very close attempt.
- 2 = a recognisable attempt: right vowel or first sound, a dropped final consonant (cat -> ca), th -> t, sh -> s, missing -s, missing final /r/. Vietnamese children ALWAYS do these; they are normal, not failure.
- 1 = the child spoke but nothing resembling the word came through, OR the transcript is empty/noise.
- NEVER return 0. The floor is 1.
- If the ASR text looks like nonsense, a Vietnamese word, or a homophone of the target, ASSUME THE RECOGNIZER FAILED, not the child: give the child the benefit of the doubt and lean to the HIGHER score.
- Set "ok" true when the child genuinely produced the word (score 2 or 3).

WRITING THE TEXT (Vietnamese, for the child and the parent sitting next to them):
- "p" = a short cheer, 3-8 words, always positive, may use one emoji. Address the child as "bé". Examples: "Bé nói giỏi quá! 🎉", "Đúng rồi, bé nói to lắm!".
- "t" = ONE tiny tip for the parent, max 12 words, gentle, no jargon; "" (empty) when the child got it right. Example: "Bé nhớ ngậm hơi ở cuối từ nhé".
- Never use negative words ("sai", "kém", "chưa được"). Nudge with "thử lại", "gần đúng rồi".

Return exactly: {"s":<1|2|3>,"ok":<true|false>,"p":"<lời khen tiếng Việt>","t":"<mẹo cho bố mẹ hoặc rỗng>"}`;

export interface KidWordGrade {
  /** 1–3 sao. Không bao giờ 0. */
  stars: number;
  /** Bé thực sự nói ra được từ đó (≥ 2 sao). */
  said: boolean;
  /** Lời khen ngắn tiếng Việt hiện dưới các ngôi sao. */
  praise: string;
  /** Mẹo rất ngắn cho bố mẹ (có thể rỗng). */
  tip: string;
  /** Máy nghe được gì — chỉ hiện cho bố mẹ khi bật "hiện chữ". */
  transcript: string;
}

/** Lời khen dự phòng khi Groq không dùng được — bé vẫn phải có phản hồi vui. */
function fallbackKidGrade(transcript: string, close: boolean): KidWordGrade {
  if (close) {
    return { stars: 3, said: true, praise: "Bé nói đúng rồi! 🎉", tip: "", transcript };
  }
  if (transcript.trim()) {
    return { stars: 2, said: true, praise: "Bé nói to lắm! 👏", tip: "Nghe cô đọc thêm một lần rồi nói lại nhé", transcript };
  }
  return { stars: 1, said: false, praise: "Bé thử lại nào! 🌟", tip: "Bé nói to hơn một chút cho máy nghe rõ nhé", transcript };
}

/**
 * Chấm một lần bé nhắc lại MỘT từ. `close` là kết quả so khớp máy móc ở server
 * (xem isAnswerAcceptable) — đưa vào prompt làm gợi ý, và dùng luôn làm đường lui
 * khi Groq lỗi để bé không bao giờ đứng chờ một màn hình trống.
 */
export async function gradeKidWord(params: {
  word: string;
  meaning: string | null;
  transcript: string;
  close: boolean;
}): Promise<KidWordGrade> {
  const { word, meaning, transcript, close } = params;

  // Máy đã nghe ra đúng từ → khỏi tốn một lượt gọi AI, khen ngay cho nhanh.
  // Trẻ nhỏ mất kiên nhẫn rất nhanh; mỗi giây chờ là một giây bé quay đi chỗ khác.
  if (close) return fallbackKidGrade(transcript, true);

  try {
    const parsed = await runGroqJson({
      models: GRADING_MODELS,
      system: KID_WORD_SYSTEM,
      maxTokens: 200,
      temperature: 0.4,
      user: `Target word: "${word}"${meaning ? ` (nghĩa tiếng Việt: ${meaning})` : ""}
What the speech recognizer heard the child say: "${transcript || "(im lặng — không nghe thấy gì)"}"
A simple string comparison says the transcript does NOT match the target word — but remember the recognizer is unreliable on toddlers' voices.`,
    });

    const r = isRecord(parsed) ? parsed : {};
    const rawStars = typeof r.s === "number" ? Math.round(r.s) : 0;
    const stars = Math.min(3, Math.max(1, rawStars || 1));
    const praise = asStr(r.p).trim();
    return {
      stars,
      said: r.ok === true || stars >= 2,
      praise: praise || fallbackKidGrade(transcript, false).praise,
      tip: asStr(r.t).trim(),
      transcript,
    };
  } catch {
    return fallbackKidGrade(transcript, false);
  }
}

// ===== Chấm NÓI THEO PHIM (shadowing một CÂU đã biết trước) =====
//
// Khác gradeKidWord ở chỗ đích là cả một CÂU, và server đã tự tính được bé nhắc
// lại trúng bao nhiêu từ (xem `wordCoverage` trong @/lib/english). Con số đó đưa
// thẳng vào prompt: model không phải đoán, chỉ việc viết lời khen và quyết có
// nâng sao cho bé hay không.
//
// Model KHÔNG BAO GIỜ được hạ sao xuống dưới mức máy đã đo — nơi gọi kẹp lại
// bằng Math.max. Máy đã nghe ra 5/6 từ mà AI chấm 1 sao là bé bị phạt oan.
const KID_SENTENCE_SYSTEM = `You are a warm, playful English teacher for young Vietnamese children (ages 4-11). The child watched ONE line of a cartoon, then tried to repeat that line out loud (shadowing). You receive the ASR transcript of the child's attempt plus a machine word-match count. Output ONLY one compact JSON object — no markdown, no code fences, no <think>, no extra keys.

SCORING (be generous — this is a child imitating a full sentence in a foreign language):
- 3 = the child clearly reproduced the line, or almost all of it.
- 2 = a recognisable attempt: most content words came through, or the child got the shape of the sentence with some words missing or mangled.
- 1 = the child spoke but almost nothing of the line came through, OR the transcript is empty/noise.
- NEVER return 0. The floor is 1.
- ASR is notably WORSE on children's voices and on connected speech. If the transcript looks like nonsense, a Vietnamese word, or a homophone of the target, ASSUME THE RECOGNIZER FAILED, not the child: lean to the HIGHER score.
- Vietnamese children normally drop final consonants (cat -> ca), say /t/ for th, /s/ for sh, drop -s and -ed, and flatten stress. These are NORMAL at this age — never treat them as failure.
- Set "ok" true when the child genuinely produced the line (score 2 or 3).

WRITING THE TEXT (Vietnamese, for the child and the parent sitting next to them):
- "p" = a short cheer, 3-9 words, always positive, may use one emoji. Address the child as "bé". Examples: "Bé nói cả câu rồi! 🎉", "Gần đúng hết rồi, giỏi lắm!".
- "t" = ONE tiny tip, max 14 words, gentle, no jargon; "" (empty) when the child got it right. If specific words were missed, name at most TWO of them. Example: "Bé thử nói to hơn chữ \\"puddles\\" nhé".
- Never use negative words ("sai", "kém", "chưa được"). Nudge with "thử lại", "gần đúng rồi".

Return exactly: {"s":<1|2|3>,"ok":<true|false>,"p":"<lời khen tiếng Việt>","t":"<mẹo ngắn hoặc rỗng>"}`;

/**
 * Chấm một lần bé nhắc lại MỘT CÂU trong phim.
 *
 * `matched`/`total` là kết quả so khớp máy móc ở server — vừa là gợi ý cho
 * model, vừa là đường lui khi Groq lỗi để bé không bao giờ đứng chờ màn hình
 * trống. `missing` là những từ máy không nghe thấy (đã cắt ngắn ở nơi gọi).
 */
export async function gradeKidSentence(params: {
  sentence: string;
  vi: string | null;
  transcript: string;
  matched: number;
  total: number;
  missing: string[];
  floorStars: number;
}): Promise<KidWordGrade> {
  const { sentence, vi, transcript, matched, total, missing, floorStars } = params;
  const fallback = fallbackKidSentence(transcript, floorStars);

  try {
    const parsed = await runGroqJson({
      models: GRADING_MODELS,
      system: KID_SENTENCE_SYSTEM,
      maxTokens: 220,
      temperature: 0.4,
      user: `Target line: "${sentence}"${vi ? ` (nghĩa tiếng Việt: ${vi})` : ""}
What the speech recognizer heard the child say: "${transcript || "(im lặng — không nghe thấy gì)"}"
Machine word match: ${matched}/${total} words of the target line were recognised${missing.length ? `; not heard: ${missing.join(", ")}` : ""}.`,
    });

    const r = isRecord(parsed) ? parsed : {};
    const rawStars = typeof r.s === "number" ? Math.round(r.s) : 0;
    // Kẹp trong 1–3 VÀ không bao giờ thấp hơn mức máy đã đo được.
    const stars = Math.min(3, Math.max(floorStars, Math.max(1, rawStars || 1)));
    const praise = asStr(r.p).trim();
    return {
      stars,
      said: r.ok === true || stars >= 2,
      praise: praise || fallback.praise,
      tip: asStr(r.t).trim(),
      transcript,
    };
  } catch {
    return fallback;
  }
}

/** Phản hồi dự phòng khi Groq không dùng được — bé vẫn phải có lời khen. */
export function fallbackKidSentence(transcript: string, stars: number): KidWordGrade {
  if (stars >= 3) {
    return { stars: 3, said: true, praise: "Bé nói cả câu rồi! 🎉", tip: "", transcript };
  }
  if (stars === 2) {
    return {
      stars: 2,
      said: true,
      praise: "Gần đúng hết rồi! 👏",
      tip: "Bé nghe lại câu rồi nói to hơn một chút nhé",
      transcript,
    };
  }
  return {
    stars: 1,
    said: false,
    praise: "Bé thử lại nào! 🌟",
    tip: transcript.trim()
      ? "Bé nói chậm và rõ từng chữ nhé"
      : "Bé nói to hơn cho máy nghe rõ nhé",
    transcript,
  };
}

// ===== Chấm NÓI THEO CHỦ ĐỀ (trả lời câu hỏi mở) =====
// Khác gradeSpeaking (chấm 3 tiêu chí phát âm/ngữ điệu/lưu loát cho câu ngắn):
// đây là bài trả lời MỞ, DÀI. Đầu vào là transcript do ASR tạo ra, nên prompt dặn
// model BỎ QUA dấu câu + lỗi đồng âm nghi do máy nghe nhầm, tập trung ngữ pháp /
// từ vựng / mạch lạc / nội dung — và sửa lỗi o→f giống chấm viết để server tự
// dựng "bản sửa". Trả JSON gọn rồi coerce ở dưới.
const SPEAKING_TOPIC_SYSTEM = `You are a certified Cambridge English Young Learners speaking examiner and a specialist coach for Vietnamese children. You grade ONE extended spoken answer to an open topic question. The text you receive is an ASR (speech-to-text) TRANSCRIPT of a CHILD speaking — treat it as speech, not writing. Output ONLY one compact JSON object — no markdown, no code fences, no <think>, no extra keys.

ASR-AWARE RULES (critical — the input came from a machine recognizer, and recognizers are notably WORSE on children's voices):
- IGNORE punctuation and capitalization entirely (the recognizer inserted them): never score or "fix" them.
- Do NOT report a span as a spelling error if it is plausibly an ASR mis-hearing (similar-sounding word) rather than the child's error; when unsure whether an oddity is the child or the recognizer, SKIP it.
- Focus your error list on issues clearly the SPEAKER'S: grammar, vocabulary, word order, tense, plural, article, preposition, missing connectives.
- A very short or near-empty transcript = the child barely spoke: score LOW on content + delivery and say so kindly.

CALIBRATE to the stated level — never grade a child against adult fluency:
- Pre-Starters/Starters: a few simple sentences on the topic; judge basic correctness + staying on topic. Reward ANY successful communication.
- Movers: a connected short paragraph with basic connectives (and, but, because), some detail.
- Flyers: several connected sentences with past/future and reasons.
- Key A2 / Preliminary B1: developed, organized discourse with varied structures, examples and opinions.
At the stated level: 90+ = fully meets it, near-zero speaker errors, well developed; ~70 = communicates the idea with several level-appropriate errors or thin development.

SCORE FIVE axes 0-100 INDEPENDENTLY (let them diverge):
- ct (Content): does the answer ADDRESS the question and DEVELOP it with enough relevant content & length for the level? (use the word count + min-words given; too short ⇒ low ct).
- g (Grammar): sentence-level grammatical correctness of what was said.
- v (Vocabulary): word-choice accuracy and range.
- co (Coherence): logical flow, ordering, use of connectives.
- d (Delivery): fluency, judged from length, speaking rate (words/min given) and repetition/fillers. Do NOT judge pronunciation (not recoverable from a transcript).
s (overall): weight content + grammar heavily at the younger levels, add vocabulary + coherence from Flyers up. s MUST lie between the lowest and highest of ct/g/v/co/d.

ERROR LIST "e" (the server rebuilds a corrected transcript by replacing each "o" with "f" — follow EXACTLY or the fix is lost):
- "o" = a NON-EMPTY contiguous substring copied VERBATIM from the transcript — including any punctuation INSIDE the span (it must be locatable by exact match, so never strip or normalize anything you quote). This is separate from grading: you still do NOT score punctuation. Make "o" long enough to occur EXACTLY ONCE; spans must NOT overlap or nest; list in order of appearance.
- Single wrong word (an article, a verb form, a plural): quote the WHOLE surrounding phrase (2-5 words), NEVER the bare word — otherwise it cannot be located uniquely in a long answer where that word repeats.
- "f" = "o" rewritten correctly with a MINIMAL edit that fixes ONLY this issue and preserves the child's meaning. For an omission, set "o" to a short existing window (2-6 words) and "f" to that window with the missing element added.
- "k" = one of grammar|vocabulary|word_order|tense|plural|article|preposition (do NOT use punctuation or capitalization; avoid spelling unless certain it is the child).
- "n" = SHORT explanation in simple Vietnamese, ONE line, understandable by a child.
CONFIDENCE over exhaustiveness: only list a span you are confident is a real SPEAKER error at this level; a clean answer returns "e": []. CONSISTENCY: if "e" is empty, all five axis scores must be ≥85.

ALSO return:
- "str": 1-3 strengths in Vietnamese (SHORT, what the child did well) — always find at least one.
- "imp": 1-3 concrete improvements in Vietnamese (what to try next time).
- "sa": a MODEL answer in natural English AT THE STATED LEVEL that fully answers the SAME question (Pre-Starters/Starters: 2-3 câu rất ngắn; Movers/Flyers: 4-6 câu; Key/Preliminary: một đoạn ngắn mạch lạc). English only, no translation.
- "fb": 2-3 câu nhận xét tổng bằng tiếng Việt, KHEN trước rồi mới nêu hướng cải thiện.

Write every Vietnamese field on ONE line, no literal newlines, no unescaped quotes/backslashes. Output EXACTLY these keys and nothing else:
{"s":<0-100>,"ct":<0-100>,"g":<0-100>,"v":<0-100>,"co":<0-100>,"d":<0-100>,"e":[{"o":"<verbatim>","f":"<sửa>","k":"<grammar|vocabulary|word_order|tense|plural|article|preposition>","n":"<tiếng Việt>"}],"str":["<tiếng Việt>"],"imp":["<tiếng Việt>"],"sa":"<câu trả lời mẫu, tiếng Anh>","fb":"<nhận xét tổng, tiếng Việt>"}
/no_think`;

export interface SpeakingTopicGradeResult {
  score: number;
  bandLabel: string;
  criteria: {
    content: { score: number };
    grammar: { score: number };
    vocabulary: { score: number };
    coherence: { score: number };
    delivery: { score: number; wordsPerMinute: number };
  };
  annotations: Array<{
    original: string;
    type?: string;
    correction: string;
    explanation: string;
  }>;
  correctedVersion: string;
  strengths: string[];
  improvements: string[];
  /** Câu trả lời mẫu (tiếng Anh) do AI gợi ý ở cấp độ tương ứng. */
  sampleAnswer: string;
  transcript: string;
  /** Số từ nói được (đếm ở server từ transcript). */
  wordCount: number;
  overallFeedback: string;
}

/**
 * Chấm một bài "Nói theo chủ đề": transcript trả lời mở → điểm 5 trục + danh sách
 * lỗi o→f (server dựng bản sửa) + điểm mạnh/cải thiện + câu trả lời mẫu. Đếm từ &
 * tốc độ nói Ở SERVER (LLM đếm không đáng tin) rồi đưa số thật cho model.
 */
export async function gradeSpeakingTopic(params: {
  transcript: string;
  topic: string;
  question: string;
  referenceTranscript: string | null;
  outline: string | null;
  level: string;
  minWords: number;
  durationSec: number | null;
}): Promise<SpeakingTopicGradeResult> {
  const { transcript, topic, question, referenceTranscript, outline, level, minWords, durationSec } = params;

  const wordCount = countWords(transcript);
  const wpm =
    durationSec && durationSec > 0 ? Math.round((wordCount / durationSec) * 60) : 0;
  const tooShortNote =
    minWords > 0 && wordCount < minWords
      ? ` — NGẮN HƠN mức gợi ý, hạ "ct" và "d" tương ứng.`
      : "";
  const refBlock = referenceTranscript?.trim()
    ? `\n=== LỜI GIÁM KHẢO (transcript MP3, chỉ để hiểu câu hỏi) ===\n${referenceTranscript.trim()}`
    : "";
  // Dàn ý gợi ý (nếu admin nhập): đưa vào để chấm "ct" (nội dung) thưởng điểm khi
  // bài bao quát các ý — KHÔNG ép trẻ phải theo đúng từng ý.
  const outlineBlock = outline?.trim()
    ? `\n=== DÀN Ý GỢI Ý (cho điểm "ct"/"co" cao hơn nếu bài bao quát được các ý này; chỉ là gợi ý, không bắt buộc) ===\n${outline.trim()}`
    : "";

  const userContent = `Level: ${levelLabelWithAge(level)}
Chủ đề: ${topic || "(không ghi)"}
Câu hỏi của giám khảo: ${question}
Số từ trẻ nói (đã đếm sẵn — DÙNG SỐ NÀY): ${wordCount} (gợi ý tối thiểu: ${minWords})${tooShortNote}
Tốc độ nói: ${wpm > 0 ? `${wpm} từ/phút (thời lượng ${durationSec}s)` : "không rõ thời lượng"}${refBlock}${outlineBlock}

=== TRANSCRIPT TRẢ LỜI CỦA TRẺ (chấm bài này; trích "o" ĐÚNG NGUYÊN VĂN từ đây) ===
${transcript}

Return ONLY the compact JSON object.`;

  const parsed = await runGroqJson({
    models: GRADING_MODELS,
    // Output này nặng nhất trong các grader: 6 điểm + danh sách lỗi o→f + str/imp
    // + cả một câu trả lời mẫu. Trần cao để bài dài không bị cắt cụt JSON.
    system: SPEAKING_TOPIC_SYSTEM,
    maxTokens: 6144,
    temperature: 0.2,
    user: userContent,
  });

  return coerceSpeakingTopic(parsed, transcript, level, wordCount, wpm);
}

/** Ép JSON gọn của model về `SpeakingTopicGradeResult`; không tin shape thô. */
function coerceSpeakingTopic(
  raw: unknown,
  transcript: string,
  level: string,
  wordCount: number,
  wpm: number,
): SpeakingTopicGradeResult {
  const r = isRecord(raw) ? raw : {};

  const annotations = (Array.isArray(r.e) ? r.e : [])
    .filter(isRecord)
    .map((a) => ({
      original: asStr(a.o),
      type: errorTypeLabel(asStr(a.k)),
      correction: asStr(a.f),
      explanation: asStr(a.n),
    }))
    .filter((a) => a.original || a.correction || a.explanation);

  const score = clampScore(r.s);
  return {
    score,
    bandLabel: bandLabelFor(score, level),
    criteria: {
      content: { score: clampScore(r.ct) },
      grammar: { score: clampScore(r.g) },
      vocabulary: { score: clampScore(r.v) },
      coherence: { score: clampScore(r.co) },
      delivery: { score: clampScore(r.d), wordsPerMinute: wpm },
    },
    annotations,
    correctedVersion: reconstructCorrected(transcript, annotations),
    strengths: asStrArr(r.str),
    improvements: asStrArr(r.imp),
    sampleAnswer: asStr(r.sa).trim(),
    transcript,
    wordCount,
    overallFeedback: asStr(r.fb),
  };
}

const READING_EXPLAIN_SYSTEM = `You are an English reading teacher for Vietnamese CHILDREN. For a reading-comprehension question, you explain (in simple Vietnamese a child understands) why the correct answer is correct, and you point to the exact place in the passage that proves it. Return ONLY valid JSON.`;

/**
 * Sinh sẵn (lúc admin thêm câu hỏi) phần CHỮA BÀI cho một câu hỏi đọc hiểu:
 *  - `supportingQuote`: câu/cụm TRÍCH NGUYÊN VĂN từ đoạn văn chứng minh đáp án
 *    (để chỉ cho trẻ đáp án lấy ở đâu).
 *  - `explanation`: giải thích bằng tiếng Việt đơn giản vì sao đáp án đúng.
 */
export async function generateReadingExplanation(params: {
  passage: string;
  prompt: string;
  correctAnswer: string;
  level?: string;
}): Promise<{ explanation: string; supportingQuote: string }> {
  const { passage, prompt, correctAnswer, level } = params;

  const parsed = await runGroqJson({
    models: GRADING_MODELS,
    system: READING_EXPLAIN_SYSTEM,
    maxTokens: 1024,
    temperature: 0.3,
    user: `Đoạn văn tiếng Anh${level ? ` — trình độ ${levelLabelWithAge(level)}` : ""}:
${passage}

Câu hỏi: ${prompt}
Đáp án đúng: ${correctAnswer}

Trả về JSON đúng cấu trúc sau (không thêm gì ngoài JSON):
{
  "supportingQuote": "<TRÍCH NGUYÊN VĂN một câu hoặc cụm tiếng Anh có trong đoạn văn, chứng minh đáp án>",
  "explanation": "<giải thích bằng tiếng Việt ĐƠN GIẢN, dễ hiểu với trẻ em, vì sao đáp án đúng, có nhắc tới chỗ trích dẫn>"
}`,
  });
  const p = isRecord(parsed) ? parsed : {};
  return { explanation: asStr(p.explanation), supportingQuote: asStr(p.supportingQuote) };
}

const PASSAGE_ANALYSIS_SYSTEM = `You are an English reading teacher for Vietnamese CHILDREN. Given ONE English reading passage, produce (in Vietnamese) a full translation AND a sentence-by-sentence breakdown so the child fully understands the text. Return ONLY valid JSON.

Rules:
- "translation": dịch TOÀN BỘ đoạn văn sang tiếng Việt TỰ NHIÊN, dễ hiểu với trẻ em. Mỗi câu một dòng. Chỉ tiếng Việt — KHÔNG chèn tiếng Anh.
- "sentences": tách đoạn văn thành TỪNG CÂU theo dấu câu (. ! ?). Mỗi phần tử là { "en": "<nguyên văn câu tiếng Anh — chép ĐÚNG từ đoạn, không thêm/bớt/sửa>", "vi": "<dịch câu sang tiếng Việt>", "note": "<giải thích NGẮN GỌN bằng tiếng Việt đơn giản: cấu trúc câu, từ mới quan trọng, điểm dễ nhầm>" }.
- "en" PHẢI chép nguyên văn để trẻ đối chiếu được với đoạn gốc.
- Bám sát trình độ đã cho: cấp nhỏ phân tích thật gọn và dễ; cấp lớn nêu rõ cấu trúc ngữ pháp.
- Viết "note" bằng ngôn ngữ trẻ em hiểu được, tránh thuật ngữ ngữ pháp khô khan.

Output: Return ONLY one valid JSON object of the form { "translation": "...", "sentences": [ ... ] }. No markdown fences, no text before or after.
/no_think`;

export interface PassageAnalysisResult {
  /** Bản dịch tiếng Việt toàn bộ đoạn văn. */
  translation: string;
  /** Phân tích từng câu: câu tiếng Anh + dịch + giải thích ngắn (tiếng Việt). */
  sentences: Array<{ en: string; vi: string; note: string }>;
}

/**
 * Cho admin: dịch + phân tích TỪNG CÂU của một đoạn đọc (tiếng Việt) để lưu vào
 * ReadingTest.passageTranslation + passageAnalysis và hiện ở phần chữa bài.
 */
export async function generatePassageAnalysis(params: {
  passage: string;
  level: string;
}): Promise<PassageAnalysisResult> {
  const { passage, level } = params;

  const parsed = await runGroqJson({
    models: GRADING_MODELS,
    system: PASSAGE_ANALYSIS_SYSTEM,
    // Đoạn dài sinh ra dịch + phân tích từng câu khá nặng token → co giãn theo độ
    // dài đoạn để JSON không bị cắt cụt, có trần chống tràn.
    maxTokens: Math.max(4096, Math.min(16000, passage.length * 6)),
    temperature: 0.2,
    user: `Dịch & phân tích đoạn đọc sau (trình độ ${levelLabelWithAge(level)}).

=== ĐOẠN VĂN (tiếng Anh) ===
${passage}

=== YÊU CẦU ===
Trả về DUY NHẤT một JSON object đúng cấu trúc:
{
  "translation": "<dịch toàn bộ đoạn văn sang tiếng Việt, mỗi câu một dòng>",
  "sentences": [
    { "en": "<nguyên văn câu tiếng Anh>", "vi": "<dịch câu>", "note": "<giải thích ngắn, tiếng Việt đơn giản>" }
  ]
}`,
  });

  const r = isRecord(parsed) ? parsed : {};
  const sentences = (Array.isArray(r.sentences) ? r.sentences : [])
    .filter(isRecord)
    .map((s) => ({ en: asStr(s.en).trim(), vi: asStr(s.vi).trim(), note: asStr(s.note).trim() }))
    .filter((s) => s.en);
  return { translation: asStr(r.translation).trim(), sentences };
}

// ===== Tra từ Anh–Việt (bấm vào từ trong bài đọc) =====
// Từ điển nội bộ chỉ có các từ đã soạn, nên khi trẻ bấm vào một từ chưa có, ta
// sinh nghĩa bằng AI rồi cache lại (xem word-lookup.ts).
const WORD_LOOKUP_SYSTEM = `Bạn là TỪ ĐIỂN Anh-Việt dành cho TRẺ EM Việt Nam học tiếng Anh. Cho MỘT từ tiếng Anh, trả về phiên âm IPA, nghĩa tiếng Việt NGẮN GỌN dễ hiểu với trẻ, loại từ, cấp độ ước lượng và 1-2 ví dụ đơn giản. Output CHỈ một JSON object compact — không markdown, không code fences, không <think>, không chữ thừa.
- "ipa": phiên âm quốc tế trong hai dấu gạch chéo, vd "/ˈæpəl/". Dùng giọng Anh-Mỹ.
- "meaning": nghĩa tiếng Việt NGẮN, dùng từ trẻ em hiểu (có thể 2-3 nghĩa chính, cách nhau bằng dấu phẩy). KHÔNG giải thích dài dòng.
- "partOfSpeech": một trong "noun","verb","adjective","adverb","preposition","pronoun","conjunction","determiner","interjection","number".
- "level": một trong "PRE_STARTERS","STARTERS","MOVERS","FLYERS","KET","PET" (ước lượng độ phổ biến/độ khó của từ).
- "examples": 1-2 phần tử {"sentence":"<câu tiếng Anh RẤT ĐƠN GIẢN chứa từ này>","meaning":"<nghĩa tiếng Việt của câu>"}. Câu ví dụ phải ngắn và hợp lứa tuổi.
Output ĐÚNG cấu trúc: {"ipa":"...","meaning":"...","partOfSpeech":"noun","level":"STARTERS","examples":[{"sentence":"...","meaning":"..."}]}
/no_think`;

export interface WordLookupGen {
  ipa: string;
  meaning: string;
  partOfSpeech: string;
  level: string;
  examples: Array<{ sentence: string; meaning: string }>;
}

const VALID_LOOKUP_LEVELS = new Set([
  "PRE_STARTERS",
  "STARTERS",
  "MOVERS",
  "FLYERS",
  "KET",
  "PET",
]);

/**
 * Sinh IPA + nghĩa tiếng Việt + ví dụ cho MỘT từ tiếng Anh bằng Groq. Trả `null`
 * khi không cấu hình được / AI hỏng để bên gọi xử lý nhẹ nhàng. `level` được
 * kiểm tra, mặc định "MOVERS" nếu AI trả sai.
 */
export async function generateWordLookup(word: string): Promise<WordLookupGen | null> {
  const w = word?.trim();
  if (!w) return null;
  let parsed: unknown;
  try {
    parsed = await runGroqJson({
      models: GRADING_MODELS,
      system: WORD_LOOKUP_SYSTEM,
      maxTokens: 512,
      temperature: 0.2,
      user: `Từ tiếng Anh: ${w}\nTrả về JSON đúng cấu trúc đã nêu, nghĩa bằng tiếng Việt dễ hiểu với trẻ em.`,
    });
  } catch {
    return null;
  }
  const p = isRecord(parsed) ? parsed : {};
  const meaning = asStr(p.meaning).trim();
  if (!meaning) return null; // không có nghĩa thì coi như tra hỏng
  const lv = asStr(p.level).trim().toUpperCase();
  const level = VALID_LOOKUP_LEVELS.has(lv) ? lv : "MOVERS";
  const examples = (Array.isArray(p.examples) ? p.examples : [])
    .filter(isRecord)
    .map((e) => ({ sentence: asStr(e.sentence), meaning: asStr(e.meaning) }))
    .filter((e) => e.sentence)
    .slice(0, 3);
  return {
    ipa: asStr(p.ipa).trim(),
    meaning,
    partOfSpeech: asStr(p.partOfSpeech).trim(),
    level,
    examples,
  };
}

const READING_QUESTIONS_SYSTEM = `You are a certified Cambridge English Young Learners reading examiner who writes exam questions for Vietnamese CHILDREN.

Your job: read ONE English passage and write high-quality reading-comprehension questions answerable from the passage ALONE.

Rules:
- Calibrate difficulty to the stated level (Pre-Starters/Starters: very simple facts, 3 short options, single familiar words; Movers: detail + simple inference; Flyers: main idea, sequence; Key/Preliminary: nuance, implied meaning, attitude).
- Write every question prompt and all answer options in SIMPLE ENGLISH suited to the age. Keep options SHORT (1-5 words at the younger levels).
- Mix question types: mostly MCQ (3 options at Pre-Starters/Starters, 4 from Movers up), with some TRUE_FALSE and the occasional FILL_BLANK.
- MCQ: exactly ONE correct option; "answer" is its 0-based index; distractors must be plausible but clearly wrong per the passage.
- TRUE_FALSE: "answer" is a boolean clearly verifiable from the passage.
- FILL_BLANK: the prompt contains a blank "___"; "answer" is the exact English word the passage supports.
- Every question MUST be answerable strictly from the passage — never invent facts that are not present.
- Keep all content age-appropriate and cheerful. No violence, no frightening themes.

ANSWER EVIDENCE — BOTH fields below are REQUIRED on every question (never omit them, never leave them empty):
- "supportingQuote": the EXACT sentence or phrase COPIED VERBATIM from the passage (word-for-word) that contains or proves the answer. Do NOT paraphrase, translate, or invent — it must be findable in the passage word-for-word. Pick the shortest span that fully proves the answer.
- "explanation": a clear explanation in SIMPLE Vietnamese (tiếng Việt dễ hiểu với trẻ) of WHY the answer is correct, explicitly pointing at the evidence. For MCQ, state why the correct option is right and, when useful, briefly why the most tempting distractor is wrong. 2-3 câu, cụ thể.

VIETNAMESE TRANSLATIONS — also REQUIRED on every question so the child can study the review:
- "promptTranslation": natural Vietnamese translation of the question prompt.
- "optionsTranslation" (MCQ only): an array translating EACH option into Vietnamese, in the SAME order and SAME length as "options".
- "quoteTranslation": natural Vietnamese translation of "supportingQuote".

Output: Return ONLY one valid JSON object of the form { "questions": [ ... ] }. No markdown fences, no text before or after.`;

export interface GeneratedReadingQuestion {
  type: "MCQ" | "TRUE_FALSE" | "FILL_BLANK";
  prompt: string;
  /** Bản dịch tiếng Việt của câu hỏi (dùng cho phần chữa bài). */
  promptTranslation?: string;
  options?: string[];
  /** Bản dịch tiếng Việt của từng lựa chọn, cùng thứ tự với options. */
  optionsTranslation?: string[];
  answer: number | boolean | string;
  accepted?: string[];
  explanation?: string;
  supportingQuote?: string;
  /** Bản dịch tiếng Việt của câu trích dẫn (supportingQuote). */
  quoteTranslation?: string;
}

/** Chuẩn hoá 1 câu hỏi do AI sinh về đúng shape `GeneratedReadingQuestion`; trả null nếu không dùng được. */
function coerceGeneratedQuestion(raw: unknown): GeneratedReadingQuestion | null {
  if (!isRecord(raw)) return null;
  const prompt = asStr(raw.prompt).trim();
  if (!prompt) return null;
  const explanation = asOptStr(raw.explanation);
  const supportingQuote = asOptStr(raw.supportingQuote);
  const promptTranslation = asOptStr(raw.promptTranslation);
  const quoteTranslation = asOptStr(raw.quoteTranslation);

  if (raw.type === "MCQ") {
    // Ghép option ↔ bản dịch TRƯỚC khi lọc để giữ đúng thứ tự nếu có option rỗng.
    const rawOpts = Array.isArray(raw.options) ? raw.options : [];
    const rawTrans = Array.isArray(raw.optionsTranslation) ? raw.optionsTranslation : [];
    const pairs = rawOpts
      .map((o, i) => ({
        text: typeof o === "string" ? o.trim() : "",
        tr: typeof rawTrans[i] === "string" ? (rawTrans[i] as string).trim() : "",
      }))
      .filter((p) => p.text.length > 0);
    if (pairs.length < 2) return null;
    const options = pairs.map((p) => p.text);
    const optionsTranslation = pairs.some((p) => p.tr) ? pairs.map((p) => p.tr) : undefined;
    // Chấp nhận answer là chỉ số 0-based, hoặc (khi AI nhầm) là chính nội dung lựa chọn.
    const a = raw.answer;
    let idx: number;
    if (typeof a === "number") idx = a;
    else if (typeof a === "string") {
      const byText = options.indexOf(a.trim());
      idx = byText >= 0 ? byText : Number(a);
    } else idx = NaN;
    // Index không dùng được → bỏ câu (đừng âm thầm gán 0 = đáp án sai trông như đúng).
    if (!Number.isInteger(idx) || idx < 0 || idx >= options.length) return null;
    return { type: "MCQ", prompt, promptTranslation, options, optionsTranslation, answer: idx, explanation, supportingQuote, quoteTranslation };
  }
  if (raw.type === "TRUE_FALSE") {
    const a = raw.answer;
    let answer: boolean | null = null;
    if (typeof a === "boolean") answer = a;
    else if (typeof a === "number") answer = a === 1 ? true : a === 0 ? false : null;
    else if (typeof a === "string") {
      const s = a.trim().toLowerCase();
      if (["true", "1", "yes", "correct", "đúng"].includes(s)) answer = true;
      else if (["false", "0", "no", "incorrect", "sai"].includes(s)) answer = false;
    }
    if (answer === null) return null; // bỏ câu mơ hồ thay vì đoán "false"
    return { type: "TRUE_FALSE", prompt, promptTranslation, answer, explanation, supportingQuote, quoteTranslation };
  }
  if (raw.type === "FILL_BLANK") {
    const answer = asStr(raw.answer).trim();
    if (!answer) return null;
    return { type: "FILL_BLANK", prompt, promptTranslation, answer, accepted: asStrArr(raw.accepted), explanation, supportingQuote, quoteTranslation };
  }
  return null;
}

/**
 * Cho admin: từ một đoạn văn, nhờ Groq soạn sẵn `count` câu hỏi đọc hiểu (MCQ /
 * Đúng-Sai / điền chỗ trống) kèm đáp án + giải thích + trích dẫn. Kết quả được
 * admin DUYỆT trong ô JSON trước khi lưu, nên hàm chỉ trả về mảng đã chuẩn hoá.
 */
export async function generateReadingQuestions(params: {
  passage: string;
  level: string;
  count: number;
}): Promise<GeneratedReadingQuestion[]> {
  const { passage, level, count } = params;
  const n = Math.max(1, Math.min(20, Math.round(count) || 5));

  // Mọi model hỏng → trả mảng rỗng thay vì văng lỗi (admin sẽ bấm tạo lại).
  let parsed: unknown = null;
  try {
    parsed = await runGroqJson({
      models: GRADING_MODELS,
      system: READING_QUESTIONS_SYSTEM,
      maxTokens: Math.min(16000, 2200 + n * 800),
      temperature: 0.3,
      user: `Soạn ${n} câu hỏi đọc hiểu cho đoạn văn sau (trình độ ${levelLabelWithAge(level)}).

=== ĐOẠN VĂN (tiếng Anh) ===
${passage}

=== YÊU CẦU ===
Mỗi câu BẮT BUỘC có đủ: "explanation" (giải thích bằng tiếng Việt ĐƠN GIẢN, dễ hiểu với trẻ, chỉ rõ dựa vào câu nào trong đoạn), "supportingQuote" (TRÍCH NGUYÊN VĂN câu/cụm trong đoạn chứa đáp án — không để trống), "promptTranslation" (dịch câu hỏi sang tiếng Việt), "quoteTranslation" (dịch câu trích dẫn). Riêng MCQ thêm "optionsTranslation" (mảng dịch TỪNG lựa chọn, cùng thứ tự & độ dài với options).
Trả về DUY NHẤT một JSON object đúng cấu trúc:
{
  "questions": [
    { "type": "MCQ", "prompt": "<tiếng Anh>", "promptTranslation": "<dịch>", "options": ["<en>","<en>","<en>","<en>"], "optionsTranslation": ["<dịch>","<dịch>","<dịch>","<dịch>"], "answer": <chỉ số 0-based>, "explanation": "<giải thích, tiếng Việt đơn giản>", "supportingQuote": "<trích NGUYÊN VĂN>", "quoteTranslation": "<dịch câu trích>" },
    { "type": "TRUE_FALSE", "prompt": "<tiếng Anh>", "promptTranslation": "<dịch>", "answer": <true|false>, "explanation": "<giải thích>", "supportingQuote": "<trích NGUYÊN VĂN>", "quoteTranslation": "<dịch>" },
    { "type": "FILL_BLANK", "prompt": "<câu tiếng Anh có chỗ trống ___>", "promptTranslation": "<dịch>", "answer": "<từ tiếng Anh>", "accepted": ["<đáp án thay thế nếu có>"], "explanation": "<giải thích>", "supportingQuote": "<trích NGUYÊN VĂN>", "quoteTranslation": "<dịch>" }
  ]
}`,
    });
  } catch {
    parsed = null;
  }
  const arr = isRecord(parsed) && Array.isArray(parsed.questions) ? parsed.questions : [];
  return arr
    .map(coerceGeneratedQuestion)
    .filter((q): q is GeneratedReadingQuestion => q !== null);
}

const LISTENING_QUESTIONS_SYSTEM = `You are a certified Cambridge English Young Learners listening examiner who writes exam questions for Vietnamese CHILDREN.

Your job: read ONE English listening tapescript (it may be a dialogue with speaker labels like A:/B:/Girl:/Boy:) and write high-quality listening-comprehension questions answerable from the tapescript ALONE.

Rules:
- Calibrate difficulty to the stated level (Pre-Starters/Starters: simple facts — who/what/where, 3 short options; Movers: detail + simple inference; Flyers: sequence, main idea; Key/Preliminary: speaker attitude, implied meaning).
- Write every question prompt and all answer options in SIMPLE ENGLISH suited to the age. Keep options SHORT.
- Mix question types: mostly MCQ (3 options at the younger levels, 4 from Movers up), with some TRUE_FALSE. Use FILL_BLANK only when a number/name/word is explicitly spoken.
- MCQ: exactly ONE correct option; "answer" is its 0-based index; distractors must be plausible but clearly wrong per the tapescript.
- TRUE_FALSE: "answer" is a boolean clearly verifiable from the tapescript.
- Every question MUST be answerable strictly from the tapescript — never invent facts.
- Keep all content age-appropriate and cheerful.

ANSWER EVIDENCE — these fields are REQUIRED on every question (never omit them, never leave them empty):
- "supportingQuote": the EXACT sentence or phrase COPIED VERBATIM from the tapescript (word-for-word) that proves the answer. Pick the shortest span that fully proves it.
- "explanation": a clear explanation in SIMPLE Vietnamese of WHY the answer is correct, explicitly pointing at the evidence. 2-3 câu, cụ thể.

VIETNAMESE TRANSLATIONS — also REQUIRED on every question:
- "promptTranslation": natural Vietnamese translation of the question prompt.
- "optionsTranslation" (MCQ only): an array translating EACH option into Vietnamese, in the SAME order and SAME length as "options".
- "quoteTranslation": natural Vietnamese translation of "supportingQuote".

Output: Return ONLY one valid JSON object of the form { "questions": [ ... ] }. No markdown fences, no text before or after.`;

/**
 * Cho admin: từ LỜI THOẠI của bài nghe, nhờ Groq soạn sẵn `count` câu hỏi nghe
 * hiểu kèm đáp án + giải thích + trích dẫn. Dùng chung shape
 * `GeneratedReadingQuestion` với phần đọc hiểu (cấu trúc câu hỏi giống nhau).
 */
export async function generateListeningQuestions(params: {
  transcript: string;
  level: string;
  count: number;
}): Promise<GeneratedReadingQuestion[]> {
  const { transcript, level, count } = params;
  const n = Math.max(1, Math.min(20, Math.round(count) || 5));

  let parsed: unknown = null;
  try {
    parsed = await runGroqJson({
      models: GRADING_MODELS,
      system: LISTENING_QUESTIONS_SYSTEM,
      // Câu hỏi NGHE nặng token hơn ĐỌC (mỗi câu thêm promptTranslation +
      // optionsTranslation×4 + quoteTranslation). Co giãn theo n để JSON không
      // bị cắt cụt → parse hỏng → trả [] âm thầm.
      maxTokens: Math.min(16000, 2200 + n * 800),
      temperature: 0.3,
      user: `Soạn ${n} câu hỏi nghe hiểu cho lời thoại sau (trình độ ${levelLabelWithAge(level)}).

=== LỜI THOẠI (tiếng Anh) ===
${transcript}

=== YÊU CẦU ===
Mỗi câu BẮT BUỘC có đủ: "explanation" (giải thích tiếng Việt đơn giản), "supportingQuote" (TRÍCH NGUYÊN VĂN trong lời thoại — không để trống), "promptTranslation" (dịch câu hỏi), "quoteTranslation" (dịch câu trích dẫn). Riêng MCQ thêm "optionsTranslation" (mảng dịch TỪNG lựa chọn, cùng thứ tự & độ dài với options).
Trả về DUY NHẤT một JSON object đúng cấu trúc:
{
  "questions": [
    { "type": "MCQ", "prompt": "<tiếng Anh>", "promptTranslation": "<dịch>", "options": ["<en>","<en>","<en>","<en>"], "optionsTranslation": ["<dịch>","<dịch>","<dịch>","<dịch>"], "answer": <chỉ số 0-based>, "explanation": "<giải thích, tiếng Việt>", "supportingQuote": "<trích NGUYÊN VĂN>", "quoteTranslation": "<dịch>" },
    { "type": "TRUE_FALSE", "prompt": "<tiếng Anh>", "promptTranslation": "<dịch>", "answer": <true|false>, "explanation": "<giải thích>", "supportingQuote": "<trích NGUYÊN VĂN>", "quoteTranslation": "<dịch>" }
  ]
}`,
    });
  } catch {
    parsed = null;
  }
  const arr = isRecord(parsed) && Array.isArray(parsed.questions) ? parsed.questions : [];
  return arr
    .map(coerceGeneratedQuestion)
    .filter((q): q is GeneratedReadingQuestion => q !== null);
}

const TRANSCRIPT_EXPLAIN_SYSTEM = `You are an English-listening teacher for Vietnamese CHILDREN. Given ONE English listening tapescript (possibly a dialogue with speaker labels like A:/B:/Girl:/Boy:), produce a clear explanation IN VIETNAMESE so the child fully understands what they heard.

Rules:
- "translation": dịch TOÀN BỘ lời thoại sang tiếng Việt TỰ NHIÊN, theo từng lượt thoại/câu, giữ nhãn người nói (A:/B:/Girl:/Boy:) ở đầu dòng nếu có. Mỗi câu/lượt một dòng. KHÔNG chèn tiếng Anh — chỉ tiếng Việt.
- "summary": 1-2 câu tiếng Việt ĐƠN GIẢN tóm tắt tình huống chính của đoạn nghe.
- "vocab": liệt kê 4-10 từ/cụm QUAN TRỌNG hoặc KHÓ trong lời thoại; mỗi mục { "en": "<từ tiếng Anh>", "ipa": "<phiên âm IPA trong hai gạch chéo>", "vi": "<nghĩa tiếng Việt ngắn>" }. Chọn từ thực sự đáng học ở trình độ đề.

Output: Return ONLY one valid JSON object. No markdown fences, no text before or after.`;

export interface TranscriptExplanation {
  translation: string;
  summary: string;
  vocab: Array<{ en: string; ipa: string; vi: string }>;
}

/**
 * Cho admin: dịch + giải thích toàn bộ lời thoại của bài nghe (tiếng Việt) để
 * lưu vào ListeningTest.transcriptExplanation và hiện ở phần chữa bài.
 */
export async function generateTranscriptExplanation(params: {
  transcript: string;
  level: string;
}): Promise<TranscriptExplanation> {
  const { transcript, level } = params;

  const parsed = await runGroqJson({
    models: GRADING_MODELS,
    system: TRANSCRIPT_EXPLAIN_SYSTEM,
    maxTokens: 4096,
    temperature: 0.2,
    user: `Dịch & giải thích lời thoại bài nghe sau (trình độ ${levelLabelWithAge(level)}).

=== LỜI THOẠI (tiếng Anh) ===
${transcript}

=== YÊU CẦU ===
Trả về DUY NHẤT một JSON object đúng cấu trúc:
{
  "translation": "<dịch toàn bộ lời thoại sang tiếng Việt, mỗi câu/lượt một dòng>",
  "summary": "<1-2 câu tóm tắt tiếng Việt đơn giản>",
  "vocab": [ { "en": "<từ>", "ipa": "<IPA>", "vi": "<nghĩa tiếng Việt>" } ]
}`,
  });

  const r = isRecord(parsed) ? parsed : {};
  const vocab = (Array.isArray(r.vocab) ? r.vocab : [])
    .filter(isRecord)
    .map((v) => ({ en: asStr(v.en).trim(), ipa: asStr(v.ipa).trim(), vi: asStr(v.vi).trim() }))
    .filter((v) => v.en && v.vi);
  return {
    translation: asStr(r.translation).trim(),
    summary: asStr(r.summary).trim(),
    vocab,
  };
}

export interface WritingGradeResult {
  score: number;
  /** Nhãn ngắn gọn tiếng Việt, vd "Rất tốt – đạt chuẩn Movers 🎉". */
  bandLabel?: string;
  criteria: {
    /** Mức độ bám sát đề + dàn ý + đủ số từ. */
    taskResponse?: { score: number; feedback: string };
    grammar: { score: number; feedback: string; errors: string[] };
    vocabulary: { score: number; feedback: string; suggestions: string[] };
    coherence: { score: number; feedback: string };
  };
  annotations: Array<{
    original: string;
    /** Nhãn loại lỗi tiếng Việt (Ngữ pháp | Từ vựng | Chính tả | …). */
    type?: string;
    issue: string;
    correction: string;
    explanation: string;
  }>;
  strengths?: string[];
  improvements?: string[];
  correctedVersion: string;
  overallFeedback: string;
}

export interface SpeakingGradeResult {
  score: number;
  criteria: {
    pronunciation: { score: number; errors: Array<{ word: string; issue: string; correct: string }> };
    /** Trọng âm & ngữ điệu — thay cho "thanh điệu" của bản tiếng Trung. */
    intonation: { score: number; errors: Array<{ word: string; expected: string; detected: string }> };
    fluency: { score: number; wordsPerMinute: number; feedback: string };
  };
  transcript: string;
  overallFeedback: string;
}
