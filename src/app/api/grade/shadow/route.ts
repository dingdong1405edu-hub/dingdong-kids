import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { transcribeAudio, isTranscriptionConfigured } from "@/lib/stt";
import { gradeKidSentence, fallbackKidSentence, isGradingConfigured } from "@/lib/groq";
import { wordCoverage } from "@/lib/english";
import { getCartoon, starsForShadow } from "@/lib/cartoons";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Bé nhắc lại MỘT CÂU trong phim hoạt hình: ghi âm → chữ → sao.
 *
 * Gộp nhận dạng giọng nói + chấm vào MỘT request (giống /api/grade/first-words):
 * bé đang xem phim, mỗi vòng mạng thừa là một khoảng lặng giữa hai câu.
 *
 * Khác phần Luyện nói của các cấp lớn ở chỗ CÂU ĐÍCH ĐÃ BIẾT TRƯỚC. Nhờ vậy sao
 * được tính bằng phép so khớp máy móc (`wordCoverage`) — tức thì, không tốn
 * tiền, và ổn định. AI chỉ được gọi khi bé CHƯA nói trọn câu, và chỉ để viết
 * lời khen + một mẹo nhỏ; nó không bao giờ được hạ sao xuống dưới mức máy đã đo.
 *
 * Endpoint này KHÔNG BAO GIỜ trả lỗi cho những trục trặc ngoài tầm với của bé
 * (chưa cấu hình API, máy nghe hỏng, hết hạn mức…) — luôn trả về ít nhất 1 sao
 * kèm lời động viên.
 */

/**
 * Mỗi lượt chấm = 1 lượt Deepgram + (có thể) 1 lượt Groq, đều tính tiền. Một
 * phim thật có 10–20 câu, bé nói lại đôi lần → 30–50 lượt mỗi buổi. 80 lượt mỗi
 * 15 phút là rộng gấp mấy lần mà vẫn chặn được kịch bản bấm liên tục.
 */
const GRADE_LIMIT = 80;
const GRADE_WINDOW_MS = 15 * 60_000;

/** Bản ghi 9 giây của trình duyệt chỉ vài trăm KB; 6 MB là trần chống tệp rác. */
const MAX_AUDIO_BYTES = 6 * 1024 * 1024;

/** Số từ tối đa nêu tên trong mẹo — kể ra cả câu thì bố mẹ không đọc nổi. */
const MAX_MISSING_HINTS = 3;

export interface ShadowGradeResponse {
  stars: number;
  said: boolean;
  praise: string;
  tip: string;
  transcript: string;
  /** Khớp hay không theo TỪNG từ của câu mẫu — client tô màu câu theo mảng này. */
  flags: boolean[];
  matched: number;
  total: number;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Bé hãy đăng nhập nhé!" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("audio");
  const cartoonId = String(form?.get("cartoonId") ?? "").trim();
  const lineIndex = Number(form?.get("lineIndex"));

  // DANH SÁCH TRẮNG: câu đích phải là một câu có thật trong kho phim tĩnh. Chặn
  // ở đây để không ai biến endpoint thành cổng nhận dạng giọng nói tuỳ ý.
  const cartoon = getCartoon(cartoonId);
  const line =
    cartoon && Number.isInteger(lineIndex) ? cartoon.lines[lineIndex] : undefined;
  if (!line) {
    return NextResponse.json({ error: "Câu không hợp lệ" }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Chưa có bản ghi âm nào" }, { status: 400 });
  }
  if (file.size > MAX_AUDIO_BYTES) {
    return NextResponse.json({ error: "Bản ghi dài quá" }, { status: 413 });
  }

  // `flags` RỖNG chứ không phải "toàn sai": client chỉ tô câu khi có cờ, nên
  // mảng rỗng nghĩa là "lượt này không chấm", không phải "bé nói trượt hết".
  const empty = { flags: [] as boolean[], matched: 0, total: 0 };

  // Vượt hạn mức → KHÔNG báo lỗi. Rủ bé nghỉ giải lao: vừa dừng được chi phí,
  // vừa là lời khuyên đúng với một đứa trẻ đã xem liên tục 15 phút.
  if (!rateLimit(`shadow:${session.user.id}`, GRADE_LIMIT, GRADE_WINDOW_MS).ok) {
    return NextResponse.json<ShadowGradeResponse>({
      stars: 1,
      said: false,
      praise: "Bé nghỉ mắt một chút nhé! 🍿",
      tip: "Bé xem và nói nhiều rồi đấy. Nghỉ vài phút rồi mình xem tiếp nha.",
      transcript: "",
      ...empty,
    });
  }

  // 1) Ghi âm → chữ. Hỏng thì coi như "không nghe rõ" chứ không chặn bé lại.
  let transcript = "";
  if (isTranscriptionConfigured()) {
    try {
      transcript = await transcribeAudio(Buffer.from(await file.arrayBuffer()), file.type);
    } catch (e) {
      console.error("Shadow transcribe error:", e);
    }
  }

  // 2) So khớp máy móc với câu đích — đây mới là thứ quyết định số sao.
  const cover = wordCoverage(transcript, line.text);
  const stars = starsForShadow(cover.ratio);
  const base = {
    transcript,
    flags: cover.flags,
    matched: cover.matched,
    total: cover.total,
  };

  // Bé đã nói trọn câu, hoặc chưa cấu hình Groq → khỏi tốn một lượt gọi AI.
  // Trẻ mất kiên nhẫn rất nhanh; mỗi giây chờ là một giây bé quay đi chỗ khác.
  if (stars >= 3 || !isGradingConfigured()) {
    return NextResponse.json<ShadowGradeResponse>({
      ...fallbackKidSentence(transcript, stars),
      ...base,
    });
  }

  const grade = await gradeKidSentence({
    sentence: line.text,
    vi: line.vi,
    transcript,
    matched: cover.matched,
    total: cover.total,
    missing: cover.words.filter((_, i) => !cover.flags[i]).slice(0, MAX_MISSING_HINTS),
    floorStars: stars,
  });

  return NextResponse.json<ShadowGradeResponse>({ ...grade, ...base });
}
