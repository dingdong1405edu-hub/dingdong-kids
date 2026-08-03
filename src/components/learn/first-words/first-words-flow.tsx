"use client";
// ===========================================================================
//  Bộ chơi một chủ đề "Bé Tập Nói" — vòng lặp: NHÌN HÌNH → NGHE → NHẮC LẠI →
//  AI CHẤM → SAO. Lặp lại cho từng từ, hết chủ đề thì ăn mừng.
//
//  Ràng buộc chi phối mọi quyết định ở đây: NGƯỜI DÙNG CHƯA BIẾT ĐỌC.
//   • Không có bước nào bắt bé đọc chữ mới đi tiếp được. Chữ trên nút là cho
//     bố mẹ; bé đi theo hình + màu + vị trí.
//   • Bài tự phát tiếng khi mở từ mới — bé không phải tìm nút loa.
//   • Không có màn báo lỗi. Mic bị chặn, mạng hỏng, API chưa cấu hình → bé vẫn
//     nhận được sao và lời khen; phần "vì sao" viết cho bố mẹ đọc.
//
//  Nội dung là dữ liệu tĩnh (@/lib/first-words); chỉ kết quả gửi về server qua
//  `completeFirstWordsUnitAction`.
// ===========================================================================
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Eye, EyeOff, MicOff, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { emitDing } from "@/lib/ding-bus";
import { primeSpeech } from "@/lib/speech";
import { cn } from "@/lib/utils";
import {
  FIRST_WORDS_LEVEL,
  STARS_PER_WORD,
  type FirstWordsUnit,
} from "@/lib/first-words";
import { useRecorder } from "@/lib/use-recorder";
import { completeFirstWordsUnitAction } from "@/server/actions/first-words";
import { useWordAudio } from "./use-word-audio";
import { PictureCard } from "./picture-card";
import { MicOrb } from "./mic-orb";
import { WordResult, type WordResultData } from "./word-result";
import { UnitComplete } from "./unit-complete";

/** Bé 3–5 tuổi nói một từ mất chưa tới 2 giây; 5 giây là quá đủ và không lê thê. */
const MAX_RECORD_SEC = 5;
const TEXT_PREF_KEY = "dd-first-words-show-text";

interface Props {
  unit: FirstWordsUnit;
  /** Audio đã có sẵn trong cache (server tra khi render, không gọi API). */
  audio: Record<string, string>;
  bestStars: number;
  next: { id: string; title: string; emoji: string } | null;
}

export function FirstWordsFlow({ unit, audio, bestStars, next }: Props) {
  const words = unit.words;
  const maxStars = words.length * STARS_PER_WORD;

  const [stage, setStage] = useState<"intro" | "play" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<"listen" | "checking" | "result">("listen");
  const [results, setResults] = useState<Array<WordResultData | null>>(() => words.map(() => null));
  const [showText, setShowText] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [saving, setSaving] = useState(false);

  const startedAt = useRef(Date.now());
  const savedRef = useRef(false);
  const submittedRef = useRef(false);
  const myVoiceRef = useRef<HTMLAudioElement | null>(null);

  const rec = useRecorder(MAX_RECORD_SEC);
  const { speak, speaking } = useWordAudio(
    words.map((w) => w.word),
    audio,
  );

  const word = words[index];
  const result = results[index];
  const micBlocked = rec.state === "denied" || rec.state === "insecure" || rec.state === "unsupported";

  // Bố mẹ chọn hiện/ẩn chữ một lần, nhớ cho những lần sau.
  useEffect(() => {
    try {
      setShowText(window.localStorage.getItem(TEXT_PREF_KEY) === "1");
    } catch {
      /* trình duyệt chặn localStorage — cứ để mặc định ẩn */
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

  // Mở một từ mới → tự đọc mẫu. Bé chưa đọc được chữ nên KHÔNG được bắt bé đi
  // tìm nút loa; tiếng phải tự đến.
  useEffect(() => {
    if (stage !== "play" || step !== "listen") return;
    const t = setTimeout(() => speak(words[index].word), 400);
    return () => clearTimeout(t);
  }, [stage, step, index, words, speak]);

  const applyResult = useCallback(
    (data: WordResultData) => {
      setResults((prev) => {
        const nextResults = [...prev];
        const old = prev[index];
        // Bé nói lại được nhiều lần — luôn giữ lần TỐT NHẤT, không ghi đè bằng
        // lần sau kém hơn (nói lại mà bị tụt sao thì bé sẽ không dám thử nữa).
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
        fd.append("word", words[index].word);
        const res = await fetch("/api/grade/first-words", { method: "POST", body: fd });
        const data = (await res.json()) as Partial<WordResultData> & { error?: string };
        if (!res.ok) throw new Error(data.error ?? "grade failed");
        applyResult({
          stars: Math.min(3, Math.max(1, Math.round(data.stars ?? 1))),
          said: data.said === true,
          praise: data.praise?.trim() || "Bé nói to lắm! 👏",
          tip: data.tip?.trim() ?? "",
          transcript: data.transcript ?? "",
        });
      } catch {
        // Mạng/AI hỏng KHÔNG phải lỗi của bé → vẫn có sao và lời động viên.
        applyResult({
          stars: 1,
          said: false,
          praise: "Bé nói hay lắm! 🌟",
          tip: "Máy chưa nghe được lần này, bé thử lại nhé",
          transcript: "",
        });
      }
    },
    [applyResult, index, words],
  );

  // Ghi âm xong → gửi đi chấm ngay, bé không phải bấm thêm nút "nộp bài" nào.
  useEffect(() => {
    if (rec.state !== "ready" || !rec.blob || submittedRef.current) return;
    submittedRef.current = true;
    void submit(rec.blob);
  }, [rec.state, rec.blob, submit]);

  const finish = useCallback(
    async (final: Array<WordResultData | null>) => {
      if (savedRef.current) return;
      savedRef.current = true;
      const stars = final.reduce((n, r) => n + (r?.stars ?? 0), 0);
      const wordsSaid = final.filter((r) => r?.said).length;

      setSaving(true);
      const res = await completeFirstWordsUnitAction({
        unitId: unit.id,
        stars,
        wordsSaid,
        durationSec: Math.round((Date.now() - startedAt.current) / 1000),
      });
      setSaving(false);
      if (res.ok) setXpEarned(res.xpEarned ?? 0);
      else savedRef.current = false; // cho phép thử lưu lại ở lần chơi sau
      emitDing(stars >= maxStars * 0.8 ? "celebrate" : "complete");
      setStage("done");
    },
    [maxStars, unit.id],
  );

  function goNext() {
    rec.reset();
    submittedRef.current = false;
    if (index < words.length - 1) {
      setIndex((i) => i + 1);
      setStep("listen");
    } else {
      void finish(results);
    }
  }

  function retry() {
    rec.reset();
    submittedRef.current = false;
    setStep("listen");
  }

  function playMine() {
    if (!rec.audioUrl) return;
    myVoiceRef.current?.pause();
    const a = new Audio(rec.audioUrl);
    myVoiceRef.current = a;
    void a.play().catch(() => {});
  }

  function restart() {
    savedRef.current = false;
    submittedRef.current = false;
    startedAt.current = Date.now();
    rec.reset();
    setResults(words.map(() => null));
    setIndex(0);
    setXpEarned(0);
    setStep("listen");
    setStage("play");
  }

  // ===== Màn chào: cũng là nơi "mồi" bộ đọc của trình duyệt =====
  // iOS/Safari chặn phát tiếng nếu chưa có thao tác chạm thật, mà bài này tự phát
  // tiếng ngay khi mở từ đầu tiên → phải có đúng một cú chạm trước đó.
  if (stage === "intro") {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-6 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className={cn(
            "flex h-44 w-44 items-center justify-center rounded-[2.5rem] bg-gradient-to-br shadow-soft-lg ring-8 ring-white/60 dark:ring-white/10",
            unit.cover,
          )}
        >
          <span className="animate-bounce-soft select-none text-[92px] leading-none drop-shadow" aria-hidden>
            {unit.emoji}
          </span>
        </motion.div>

        <div>
          <h1 className="font-display text-3xl font-extrabold">{unit.title}</h1>
          <p className="mt-1 text-[15px] font-semibold text-muted-foreground">
            {words.length} từ · Bé nghe cô đọc rồi nói theo nhé!
          </p>
        </div>

        <Button
          onClick={() => {
            primeSpeech(); // PHẢI gọi trong chính cú chạm này
            setStage("play");
          }}
          className="btn-chunky h-20 w-full rounded-3xl font-display text-2xl font-extrabold"
        >
          <Play className="mr-2 h-8 w-8 fill-current" /> Bắt đầu
        </Button>

        <Link href={FIRST_WORDS_LEVEL.href} className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          ← Chọn chủ đề khác
        </Link>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <UnitComplete
        unitTitle={unit.title}
        stars={results.reduce((n, r) => n + (r?.stars ?? 0), 0)}
        maxStars={maxStars}
        wordsSaid={results.filter((r) => r?.said).length}
        totalWords={words.length}
        xpEarned={xpEarned}
        saving={saving}
        bestStars={bestStars}
        next={next}
        onRestart={restart}
      />
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      {/* Thanh trên: thoát + chấm tiến độ (bé đếm được số chấm, không cần đọc) */}
      <div className="flex items-center gap-3">
        <Link
          href={FIRST_WORDS_LEVEL.href}
          aria-label="Thoát bài học"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-6 w-6" />
        </Link>
        <div className="flex flex-1 flex-wrap items-center gap-1.5">
          {words.map((w, i) => (
            <span
              key={w.word}
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
          aria-label={showText ? "Ẩn chữ" : "Hiện chữ cho bố mẹ"}
          title={showText ? "Ẩn chữ" : "Hiện chữ cho bố mẹ"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {showText ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
        </button>
      </div>

      <Card className="sticker rounded-3xl">
        <CardContent className="flex flex-col items-center gap-5 p-5 sm:p-6">
          <PictureCard
            key={word.word}
            word={word}
            cover={unit.cover}
            showText={showText}
            speaking={speaking}
            onPlay={() => speak(word.word)}
          />

          {step === "result" && result ? (
            <WordResult
              result={result}
              showText={showText}
              hasRecording={Boolean(rec.audioUrl)}
              isLast={index === words.length - 1}
              onPlayModel={() => speak(word.word)}
              onPlayMine={playMine}
              onRetry={retry}
              onNext={goNext}
            />
          ) : micBlocked ? (
            <div className="w-full space-y-3 text-center">
              <MicOff className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="font-display text-lg font-extrabold">Bé cứ nghe thật nhiều nhé! 👂</p>
              <p className="mx-auto max-w-sm text-[13px] font-semibold text-muted-foreground">
                {rec.state === "insecure"
                  ? "Trình duyệt chỉ cho dùng micro trên địa chỉ https. Bố mẹ mở lại trang bằng https giúp bé nhé."
                  : rec.state === "denied"
                    ? "Bố mẹ bật quyền micro cho trang này để bé tập nói và được cô chấm điểm nhé."
                    : "Trình duyệt này chưa ghi âm được. Bố mẹ thử mở bằng Chrome hoặc Safari giúp bé nhé."}
              </p>
              <Button
                onClick={() =>
                  applyResult({
                    stars: 1,
                    said: false,
                    praise: "Bé nghe giỏi lắm! 👂",
                    tip: "Bật micro để bé tập nói và được chấm sao nhé",
                    transcript: "",
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
                state={step === "checking" ? "checking" : rec.state === "recording" ? "recording" : "idle"}
                maxSeconds={MAX_RECORD_SEC}
                onStart={() => void rec.start()}
                onStop={rec.stop}
              />
              <p className="font-display text-lg font-extrabold text-muted-foreground">
                {step === "checking"
                  ? "Cô đang nghe bé nói…"
                  : rec.state === "recording"
                    ? "Bé nói đi nào!"
                    : "Bấm micro rồi nói theo cô"}
              </p>
              {step === "checking" && <DingBuddy size={64} pose="think" className="animate-bounce-soft" />}
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-xs font-semibold text-muted-foreground">
        {unit.emoji} {unit.title} · từ {index + 1}/{words.length}
      </p>
    </div>
  );
}
