import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { transcribeAudio, isTranscriptionConfigured } from "@/lib/stt";
import { gradeKidWord, isGradingConfigured } from "@/lib/groq";
import { isAnswerAcceptable, normalizeAnswer, splitWords } from "@/lib/english";
import { firstWordMeaning, isFirstWord } from "@/lib/first-words";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Bé nhắc lại MỘT từ ở cấp "Bé Tập Nói": ghi âm → chữ → sao.
 *
 * Gộp cả hai bước (nhận dạng giọng nói + chấm) vào MỘT request thay vì gọi
 * /api/transcribe rồi /api/grade/... như phần Luyện nói của các cấp lớn. Lý do
 * là người dùng ở đây mới 3–5 tuổi: cắt được một vòng mạng là bớt được khoảng
 * lặng, mà mỗi khoảng lặng là một lần bé quay đi chỗ khác.
 *
 * Endpoint này KHÔNG BAO GIỜ trả lỗi cho những trục trặc ngoài tầm với của bé
 * (chưa cấu hình API, máy nghe hỏng…) — luôn trả về ít nhất 1 sao kèm lời động
 * viên, vì màn hình báo lỗi đỏ với một đứa trẻ chưa biết chữ là vô nghĩa.
 */

/**
 * Mỗi lượt chấm = 1 lượt Deepgram + 1 lượt Groq, đều tính tiền. Một buổi học
 * thật của bé rơi vào 8–25 lượt (một chủ đề 8 từ, nói lại đôi ba lần); 90 lượt
 * mỗi 15 phút là rộng gấp mấy lần mà vẫn chặn được kịch bản bấm liên tục.
 */
const GRADE_LIMIT = 90;
const GRADE_WINDOW_MS = 15 * 60_000;

/** Bản ghi 5 giây của trình duyệt chỉ vài chục KB; 5 MB là trần chống tệp rác. */
const MAX_AUDIO_BYTES = 5 * 1024 * 1024;

/** Bé có nói ra được từ đó không — so khớp máy móc, chấp nhận cả câu có thừa từ. */
function looksLikeWord(transcript: string, word: string): boolean {
  const clean = normalizeAnswer(transcript);
  if (!clean) return false;
  if (isAnswerAcceptable(clean, [word])) return true;
  // Bé hay nói cả cụm ("a dog", "it's a cat") hoặc lặp lại hai lần → xét từng từ.
  return splitWords(clean).some((t) => isAnswerAcceptable(t, [word]));
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Bé hãy đăng nhập nhé!" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("audio");
  const word = String(form?.get("word") ?? "").trim().toLowerCase();

  if (!isFirstWord(word)) {
    return NextResponse.json({ error: "Từ không hợp lệ" }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Chưa có bản ghi âm nào" }, { status: 400 });
  }
  if (file.size > MAX_AUDIO_BYTES) {
    return NextResponse.json({ error: "Bản ghi dài quá" }, { status: 413 });
  }

  // Vượt hạn mức → KHÔNG báo lỗi. Trả về một lời rủ nghỉ giải lao: vừa dừng
  // được chi phí, vừa là lời khuyên đúng với một đứa trẻ đã nói liên tục 15 phút.
  if (!rateLimit(`first-words:${session.user.id}`, GRADE_LIMIT, GRADE_WINDOW_MS).ok) {
    return NextResponse.json({
      stars: 1,
      said: false,
      praise: "Bé nghỉ tay một chút nhé! 🍎",
      tip: "Bé đã nói rất nhiều rồi. Nghỉ vài phút rồi mình học tiếp nha.",
      transcript: "",
    });
  }

  // 1) Ghi âm → chữ. Hỏng thì coi như "không nghe rõ" chứ không chặn bé lại.
  let transcript = "";
  if (isTranscriptionConfigured()) {
    try {
      transcript = await transcribeAudio(Buffer.from(await file.arrayBuffer()), file.type);
    } catch (e) {
      console.error("First words transcribe error:", e);
    }
  }

  const close = looksLikeWord(transcript, word);

  // 2) Chấm. Chưa có GROQ_API_KEY → vẫn chấm được bằng so khớp máy móc, chỉ là
  // không có lời khen do AI viết riêng.
  if (!isGradingConfigured()) {
    return NextResponse.json(
      close
        ? { stars: 3, said: true, praise: "Bé nói đúng rồi! 🎉", tip: "", transcript }
        : transcript
          ? { stars: 2, said: true, praise: "Bé nói to lắm! 👏", tip: "Nghe cô đọc rồi nói lại nhé", transcript }
          : { stars: 1, said: false, praise: "Bé thử lại nào! 🌟", tip: "Bé nói to hơn cho máy nghe rõ nhé", transcript },
    );
  }

  const grade = await gradeKidWord({
    word,
    meaning: firstWordMeaning(word),
    transcript,
    close,
  });
  return NextResponse.json(grade);
}
