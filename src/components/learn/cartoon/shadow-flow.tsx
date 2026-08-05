"use client";
// ===========================================================================
//  NÓI THEO PHIM (shadowing) — vòng lặp: XEM MỘT CÂU → PHIM TỰ DỪNG →
//  BÉ NHẮC LẠI → MÁY CHẤM → SAO → câu tiếp. Hết phim thì ăn mừng.
//
//  Ràng buộc chi phối mọi quyết định ở đây:
//   • Trình chơi YouTube KHÔNG BAO GIỜ bị che. Điều khiển của mình nằm BÊN
//     DƯỚI video, không phải đè lên — vừa đúng điều khoản nhúng của YouTube,
//     vừa để bé luôn nhìn thấy nhân vật đang nói.
//   • Không có ngõ cụt. Phim tắt nhúng, mạng hỏng, micro bị chặn — bé vẫn đi
//     hết được bài: câu được đọc bằng giọng trình duyệt, và vẫn có sao.
//   • Bé không phải bấm "nộp bài": thu âm xong là tự gửi đi chấm.
//
//  Nội dung là dữ liệu tĩnh (@/lib/cartoons); chỉ kết quả gửi về server qua
//  `completeCartoonAction`.
// ===========================================================================
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Eye, EyeOff, MicOff, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { MicOrb } from "@/components/learn/first-words/mic-orb";
import { emitDing } from "@/lib/ding-bus";
import { primeSpeech, speakEnglish } from "@/lib/speech";
import { cn } from "@/lib/utils";
import { useRecorder } from "@/lib/use-recorder";
import {
  CARTOON_SECTION,
  MAX_RECORD_SEC,
  STARS_PER_LINE,
  lineDuration,
  type Cartoon,
} from "@/lib/cartoons";
import { completeCartoonAction } from "@/server/actions/cartoon";
import { useYouTubePlayer } from "./use-youtube-player";
import { CartoonSentence } from "./cartoon-sentence";
import { LineResult, type LineResultData } from "./line-result";
import { CartoonComplete } from "./cartoon-complete";

const TEXT_PREF_KEY = "dd-cartoon-show-text";
/** Tốc độ phát cho nút "Nghe chậm" — chậm vừa đủ để tách chữ, không méo giọng. */
const SLOW_RATE = 0.75;

interface Props {
  cartoon: Cartoon;
  bestStars: number;
  next: { id: string; title: string; emoji: string } | null;
}

export function ShadowFlow({ cartoon, bestStars, next }: Props) {
  const lines = cartoon.lines;
  const maxStars = lines.length * STARS_PER_LINE;

  const [stage, setStage] = useState<"intro" | "play" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<"watch" | "speak" | "checking" | "result">("watch");
  const [results, setResults] = useState<Array<LineResultData | null>>(() => lines.map(() => null));
  const [showText, setShowText] = useState(true);
  const [xpEarned, setXpEarned] = useState(0);
  const [saving, setSaving] = useState(false);

  const startedAt = useRef(Date.now());
  const savedRef = useRef(false);
  const submittedRef = useRef(false);
  /** Đã từng thu âm thành công → những câu sau tự bật micro, bé khỏi phải bấm. */
  const micGrantedRef = useRef(false);

  const rec = useRecorder(MAX_RECORD_SEC);
  const player = useYouTubePlayer(cartoon.youtubeId);

  const line = lines[index];
  const result = results[index];
  const micBlocked =
    rec.state === "denied" || rec.state === "insecure" || rec.state === "unsupported";
  /** Phim hỏng (tắt nhúng / mạng chết) → chuyển sang đọc câu bằng giọng trình duyệt. */
  const videoDown = player.status === "blocked" || player.status === "offline";

  // Bố mẹ chọn hiện/ẩn chữ tiếng Anh một lần, nhớ cho những lần sau.
  useEffect(() => {
    try {
      setShowText(window.localStorage.getItem(TEXT_PREF_KEY) !== "0");
    } catch {
      /* trình duyệt chặn localStorage — cứ để mặc định hiện */
    }
  }, []);

  function toggleText() {
    setShowText((v) => {
      const nv = !v;
      try {
        window.localStorage.setItem(TEXT_PREF_KEY, nv ? "1" : "0");
      } catch {
        /* bỏ qua */
      }
      return nv;
    });
  }

  /**
   * Phát ĐÚNG một câu rồi gọi `onEnd`.
   *
   * Phim hỏng thì đọc câu bằng giọng trình duyệt và ước lượng thời gian đọc —
   * bé vẫn nghe được mẫu, bài học không đứt.
   */
  const playLine = useCallback(
    (i: number, onEnd?: () => void, slow = false) => {
      const l = lines[i];
      if (!l) return;
      if (videoDown) {
        speakEnglish(l.text);
        const ms = Math.max(1600, Math.round(lineDuration(l) * 1000) || l.text.length * 90);
        window.setTimeout(() => onEnd?.(), ms);
        return;
      }
      player.setRate(slow ? SLOW_RATE : 1);
      player.playRange(l.start, l.end, () => {
        if (slow) player.setRate(1);
        onEnd?.();
      });
    },
    [lines, player, videoDown],
  );

  // Vào một câu mới → xem cảnh đó ngay, không bắt bé bấm thêm nút nào.
  //
  // PHẢI chờ trình chơi dựng xong. Script của YouTube nạp bất đồng bộ, mà lệnh
  // phát gọi lúc chưa có trình chơi thì `playRange` báo "xong" ngay lập tức —
  // hậu quả là câu ĐẦU TIÊN bị nhảy thẳng sang bước nói, bé chưa nghe gì đã bị
  // bắt nhắc lại. Phim hỏng hẳn (`videoDown`) thì không chờ, đọc bằng giọng
  // trình duyệt luôn.
  useEffect(() => {
    if (stage !== "play" || step !== "watch") return;
    if (!videoDown && player.status !== "ready") return;
    playLine(index, () => setStep("speak"));
    // `playLine` đổi theo player nên chỉ chạy lại khi thật sự sang câu khác.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, step, index, player.status, videoDown]);

  // Sang bước nói mà micro đã được cấp quyền từ trước → tự bật thu luôn.
  useEffect(() => {
    if (step !== "speak" || !micGrantedRef.current || micBlocked) return;
    if (rec.state !== "idle") return;
    const t = window.setTimeout(() => void rec.start(), 350);
    return () => window.clearTimeout(t);
  }, [step, rec, micBlocked]);

  const applyResult = useCallback(
    (data: LineResultData) => {
      setResults((prev) => {
        const nextResults = [...prev];
        const old = prev[index];
        // Nói lại nhiều lần thì luôn giữ lần TỐT NHẤT — tụt sao là bé không dám
        // thử lại nữa.
        nextResults[index] = !old || data.stars >= old.stars ? data : old;
        return nextResults;
      });
      emitDing(data.stars >= 3 ? "celebrate" : data.stars >= 2 ? "correct" : "wave", data.praise);
      setStep("result");
    },
    [index],
  );

  const submit = useCallback(
    async (blob: Blob) => {
      setStep("checking");
      emitDing("thinking", "Để cô nghe nào…");
      try {
        const fd = new FormData();
        fd.append("audio", blob, "voice.webm");
        fd.append("cartoonId", cartoon.id);
        fd.append("lineIndex", String(index));
        const res = await fetch("/api/grade/shadow", { method: "POST", body: fd });
        const data = (await res.json()) as Partial<LineResultData> & { error?: string };
        if (!res.ok) throw new Error(data.error ?? "grade failed");
        applyResult({
          stars: Math.min(STARS_PER_LINE, Math.max(1, Math.round(data.stars ?? 1))),
          said: data.said === true,
          praise: data.praise?.trim() || "Bé nói to lắm! 👏",
          tip: data.tip?.trim() ?? "",
          transcript: data.transcript ?? "",
          flags: Array.isArray(data.flags) ? data.flags : [],
        });
      } catch {
        // Mạng/AI hỏng KHÔNG phải lỗi của bé → vẫn có sao và lời động viên.
        applyResult({
          stars: 1,
          said: false,
          praise: "Bé nói hay lắm! 🌟",
          tip: "Máy chưa nghe được lần này, bé thử lại nhé",
          transcript: "",
          flags: [],
        });
      }
    },
    [applyResult, cartoon.id, index],
  );

  // Thu âm xong → gửi đi chấm ngay, bé không phải bấm thêm nút "nộp bài" nào.
  useEffect(() => {
    if (rec.state !== "ready" || !rec.blob || submittedRef.current) return;
    submittedRef.current = true;
    micGrantedRef.current = true;
    void submit(rec.blob);
  }, [rec.state, rec.blob, submit]);

  const finish = useCallback(
    async (final: Array<LineResultData | null>) => {
      if (savedRef.current) return;
      savedRef.current = true;

      const lineStars = final.map((r) => r?.stars ?? 0);
      const stars = lineStars.reduce((n, s) => n + s, 0);
      const durationSec = Math.round((Date.now() - startedAt.current) / 1000);

      player.pause();
      setSaving(true);
      const res = await completeCartoonAction({ cartoonId: cartoon.id, lineStars, durationSec });
      setSaving(false);
      if (res.ok) setXpEarned(res.xpEarned ?? 0);
      else savedRef.current = false; // cho phép thử lưu lại ở lần xem sau

      emitDing(stars >= maxStars * 0.8 ? "celebrate" : "complete");
      setStage("done");
    },
    [cartoon.id, maxStars, player],
  );

  function goNext() {
    rec.reset();
    submittedRef.current = false;
    if (index < lines.length - 1) {
      setIndex((i) => i + 1);
      setStep("watch");
    } else {
      void finish(results);
    }
  }

  function retry() {
    rec.reset();
    submittedRef.current = false;
    setStep("speak");
  }

  function restart() {
    savedRef.current = false;
    submittedRef.current = false;
    startedAt.current = Date.now();
    rec.reset();
    setResults(lines.map(() => null));
    setIndex(0);
    setXpEarned(0);
    setStep("watch");
    setStage("play");
  }

  // ===== Màn chào =====
  // Cũng là nơi "mồi" bộ đọc của trình duyệt: iOS/Safari chặn phát tiếng nếu
  // chưa có thao tác chạm thật, mà đường lui khi phim hỏng lại cần đọc ngay.
  if (stage === "intro") {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-6 text-center">
        <div
          className={cn(
            "flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-gradient-to-br shadow-soft-lg ring-8 ring-white/60 dark:ring-white/10",
            cartoon.cover,
          )}
        >
          <span className="animate-bounce-soft select-none text-[86px] leading-none drop-shadow" aria-hidden>
            {cartoon.emoji}
          </span>
        </div>

        <div>
          <h1 className="font-display text-3xl font-extrabold">{cartoon.title}</h1>
          <p className="mt-1 text-[15px] font-semibold text-muted-foreground">
            {lines.length} câu · Bé xem rồi nói theo nhân vật nhé!
          </p>
        </div>

        <Button
          onClick={() => {
            primeSpeech(); // PHẢI gọi trong chính cú chạm này
            setStage("play");
            setStep("watch");
          }}
          className="btn-chunky h-20 w-full rounded-3xl font-display text-2xl font-extrabold"
        >
          <Play className="mr-2 h-8 w-8 fill-current" /> Xem thôi!
        </Button>

        <Link
          href={CARTOON_SECTION.href}
          className="text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          ← Chọn phim khác
        </Link>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <CartoonComplete
        title={cartoon.title}
        stars={results.reduce((n, r) => n + (r?.stars ?? 0), 0)}
        maxStars={maxStars}
        linesSaid={results.filter((r) => r?.said).length}
        totalLines={lines.length}
        xpEarned={xpEarned}
        saving={saving}
        bestStars={bestStars}
        next={next}
        onRestart={restart}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Thanh trên: thoát + chấm tiến độ (đếm được bằng mắt, không cần đọc) */}
      <div className="flex items-center gap-3">
        <Link
          href={CARTOON_SECTION.href}
          aria-label="Thoát, chọn phim khác"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-6 w-6" />
        </Link>
        <div className="flex flex-1 flex-wrap items-center gap-1.5">
          {lines.map((l, i) => (
            <span
              key={`${l.start}-${i}`}
              className={cn(
                "h-3 flex-1 rounded-full transition-colors",
                results[i] ? "bg-sunny" : i === index ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={toggleText}
          aria-label={showText ? "Ẩn chữ tiếng Anh" : "Hiện chữ tiếng Anh"}
          title={showText ? "Ẩn chữ tiếng Anh (bé chỉ nghe)" : "Hiện chữ tiếng Anh"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {showText ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
        </button>
      </div>

      {/* Trình chơi YouTube — KHÔNG BAO GIỜ bị che bởi giao diện của mình. */}
      <div className="overflow-hidden rounded-3xl bg-black shadow-soft-lg ring-4 ring-white/60 dark:ring-white/10">
        <div ref={player.hostRef} className="aspect-video w-full" />
      </div>

      {videoDown && (
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-amber-50 px-4 py-2.5 text-center text-[13px] font-semibold text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
          <span>Phim này chưa xem được ở đây — bé cứ nghe cô đọc rồi nói theo nhé!</span>
          <a
            href={`https://www.youtube.com/watch?v=${cartoon.youtubeId}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 underline underline-offset-2"
          >
            Mở trên YouTube <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      <Card className="sticker rounded-3xl">
        <CardContent className="flex flex-col items-center gap-5 p-5 sm:p-6">
          {step === "result" && result ? (
            <LineResult
              result={result}
              text={line.text}
              vi={line.vi}
              showTranscript={showText}
              isLast={index === lines.length - 1}
              onReplay={() => playLine(index)}
              onReplaySlow={() => playLine(index, undefined, true)}
              onRetry={retry}
              onNext={goNext}
            />
          ) : (
            <>
              <CartoonSentence
                text={line.text}
                vi={line.vi}
                hideEnglish={!showText}
                className="w-full"
              />

              {step === "watch" ? (
                // Trình chơi chưa dựng xong → nói rõ đang tải. Không có dòng này
                // thì bé ngồi trước một ô đen mà không biết chuyện gì đang xảy ra.
                !videoDown && player.status === "loading" ? (
                  <p className="font-display text-lg font-extrabold text-muted-foreground">
                    Đang mở phim cho bé… 🎬
                  </p>
                ) : // iOS hay chặn lệnh phát do script gọi (nhất là ngay sau khi
                // micro vừa tắt) → xin bé một cú chạm thật. Nút phải TO và ở
                // ngay dưới video, KHÔNG được đè lên trình chơi.
                player.needsTap ? (
                  <Button
                    onClick={player.resume}
                    className="btn-chunky h-16 w-full rounded-2xl font-display text-lg font-extrabold"
                  >
                    <Play className="mr-2 h-6 w-6 fill-current" /> Chạm để xem tiếp
                  </Button>
                ) : (
                  <p className="font-display text-lg font-extrabold text-muted-foreground">
                    👂 Bé nghe nhé…
                  </p>
                )
              ) : micBlocked ? (
                <div className="w-full space-y-3 text-center">
                  <MicOff className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="font-display text-lg font-extrabold">Bé cứ nghe thật nhiều nhé! 👂</p>
                  <p className="mx-auto max-w-sm text-[13px] font-semibold text-muted-foreground">
                    {rec.state === "insecure"
                      ? "Trình duyệt chỉ cho dùng micro trên địa chỉ https. Bố mẹ mở lại trang bằng https giúp bé nhé."
                      : rec.state === "denied"
                        ? "Bố mẹ bật quyền micro cho trang này để bé nói theo phim và được chấm điểm nhé."
                        : "Trình duyệt này chưa ghi âm được. Bố mẹ thử mở bằng Chrome hoặc Safari giúp bé nhé."}
                  </p>
                  <Button
                    onClick={() =>
                      applyResult({
                        stars: 1,
                        said: false,
                        praise: "Bé nghe giỏi lắm! 👂",
                        tip: "Bật micro để bé nói theo và được chấm sao nhé",
                        transcript: "",
                        flags: [],
                      })
                    }
                    className="btn-chunky h-16 w-full rounded-2xl font-display text-lg font-extrabold"
                  >
                    Nghe xong rồi, đi tiếp
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <MicOrb
                    state={
                      step === "checking"
                        ? "checking"
                        : rec.state === "recording"
                          ? "recording"
                          : "idle"
                    }
                    maxSeconds={MAX_RECORD_SEC}
                    onStart={() => void rec.start()}
                    onStop={rec.stop}
                  />
                  <p className="font-display text-lg font-extrabold text-muted-foreground">
                    {step === "checking"
                      ? "Cô đang nghe bé nói…"
                      : rec.state === "recording"
                        ? "Bé nói đi nào!"
                        : "Bấm micro rồi nói theo nhé"}
                  </p>
                  {step === "checking" && (
                    <DingBuddy size={64} pose="think" className="animate-bounce-soft" />
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-xs font-semibold text-muted-foreground">
        {cartoon.emoji} {cartoon.title} · câu {index + 1}/{lines.length}
      </p>
    </div>
  );
}
