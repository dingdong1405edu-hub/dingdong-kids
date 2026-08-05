"use client";
// ===========================================================================
//  NGHE & NHẮC LẠI — mức DỄ NHẤT của phần Từ vựng.
//
//  Dành cho bé 4–6 tuổi CHƯA ĐỌC ĐƯỢC CHỮ. Bé không phải ghép chữ, không bị
//  chấm sai, không "trượt" bao giờ.
//
//  CẤU TRÚC: làm quen → 2 trò chơi → nhận sao.
//
//  Bản đầu tiên chỉ có phần "làm quen" (xem thẻ → bấm Tiếp), và nó CHÁN: bé 4
//  tuổi ngồi bấm Tiếp năm lần rồi bỏ đi. Trẻ mầm non học bằng cách CHƠI, không
//  phải bằng cách lật thẻ. Nên giờ phần làm quen rút ngắn lại chỉ để giới thiệu
//  mặt từ, còn phần chính là hai trò chơi ngay sau đó.
//
//  GHI ÂM để bé NGHE LẠI GIỌNG MÌNH — nhưng KHÔNG CHẤM ĐIỂM. Nhận dạng giọng
//  trẻ 4 tuổi kém chính xác tới mức chấm sai là chuyện thường, mà chấm sai một
//  lần là bé mất hứng. Ở mức này mục tiêu là bé DÁM MỞ MIỆNG NÓI, không phải nói
//  chuẩn. Nghe lại chính giọng mình là thứ trẻ con cực thích và tự nó đã đủ
//  động lực. Việc chấm phát âm để dành cho phần Nói ở các cấp lớn hơn.
// ===========================================================================
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { X, ArrowLeft, Volume2, Mic, Square, Check, RotateCcw, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { playWord } from "@/lib/speech";
import { emitDing } from "@/lib/ding-bus";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { WordVisual } from "./word-visual";
import { useRecorder } from "@/lib/use-recorder";
import { pickGames, type VocabGameEntry } from "./games/registry";
import { cn } from "@/lib/utils";
import type { VocabWordCard } from "@/types";

interface Props {
  title: string;
  words: VocabWordCard[];
  onExit: () => void;
  /** Sang mức tiếp theo ("Học từ") sau khi chơi xong. */
  onNextLevel?: () => void;
  /** Khoá xoay vòng trò chơi — truyền id phần học để mỗi bài ra bộ game khác nhau. */
  seed?: string;
  onComplete?: (stats: {
    correct: number;
    total: number;
    durationSec: number;
  }) => Promise<{ ok: boolean; xpEarned?: number }>;
}

/** Lời khen xoay vòng — trẻ chán rất nhanh nếu lúc nào cũng một câu. */
const PRAISE = [
  "Giỏi quá! 🌟",
  "Bé nói hay lắm! 🎉",
  "Tuyệt vời! 👏",
  "Đúng rồi đó! 💫",
  "Bé làm tốt lắm! 🐻",
];

type Stage = { kind: "meet" } | { kind: "game"; entry: VocabGameEntry } | { kind: "done" };

export function ListenRepeatFlow({
  title,
  words,
  onExit,
  onNextLevel,
  seed,
  onComplete,
}: Props) {
  const games = useMemo(
    () => pickGames(words.length, seed ?? title ?? "vocab", 2),
    [words.length, seed, title],
  );
  const stages = useMemo<Stage[]>(
    () => [
      { kind: "meet" as const },
      ...games.map((entry) => ({ kind: "game" as const, entry })),
      { kind: "done" as const },
    ],
    [games],
  );

  const [stageIndex, setStageIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [xpEarned, setXpEarned] = useState<number | null>(null);
  const [startTime] = useState(Date.now());
  const saving = useRef(false);

  const stage = stages[stageIndex];

  const finish = useCallback(async () => {
    if (saving.current) return;
    saving.current = true;
    const total = Math.max(1, words.length);
    const durationSec = Math.round((Date.now() - startTime) / 1000);
    if (onComplete) {
      const res = await onComplete({ correct: total, total, durationSec });
      if (res.ok) setXpEarned(res.xpEarned ?? 0);
      else toast.error("Lỗi lưu kết quả");
    }
    emitDing("complete");
  }, [words.length, startTime, onComplete]);

  // Tới màn cuối thì ghi kết quả (một lần duy nhất).
  useEffect(() => {
    if (stage?.kind === "done") void finish();
  }, [stage?.kind, finish]);

  function nextStage(gained = 0) {
    setStars((s) => s + gained);
    setStageIndex((i) => Math.min(i + 1, stages.length - 1));
  }

  function restart() {
    saving.current = false;
    setStars(0);
    setXpEarned(null);
    setStageIndex(0);
  }

  if (words.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <DingBuddy size={96} pose="idle" className="mx-auto" />
        <h2 className="font-display text-xl font-extrabold">Phần này chưa có từ nào</h2>
        <p className="max-w-sm text-[15px] text-muted-foreground">
          Cô đang soạn từ vựng cho bài này. Bé quay lại sau nhé!
        </p>
        <Button variant="outline" onClick={onExit}>
          Quay lại
        </Button>
      </div>
    );
  }

  // ───────────────────────── Màn kết ─────────────────────────
  if (stage?.kind === "done") {
    const maxStars = games.length * 3;
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md rounded-3xl text-center shadow-soft-lg">
          <CardContent className="space-y-4 px-6 pb-6 pt-8">
            <DingBuddy size={104} pose="cheer" message="Bé chơi giỏi lắm!" className="mx-auto" />
            <h2 className="font-display text-2xl font-extrabold">Xong rồi! 🎉</h2>
            <p className="text-[15px] text-muted-foreground">
              Bé đã học {words.length} từ trong bài “{title || "Từ vựng"}”.
            </p>

            {maxStars > 0 && (
              <div className="flex flex-col items-center gap-1">
                <div className="text-4xl font-extrabold">
                  {"⭐".repeat(Math.max(1, stars))}
                </div>
                <p className="text-sm font-semibold text-muted-foreground">
                  {stars}/{maxStars} sao
                </p>
              </div>
            )}

            {/* Số sao thưởng dùng mật ong đậm: `sunny-foreground` là màu chữ TRÊN
                nền vàng nên ở chế độ tối nó gần như biến mất trên nền thẻ. */}
            {xpEarned !== null && xpEarned > 0 && (
              <div className="font-display text-lg font-extrabold text-brand-gold">
                <span>★</span> +{xpEarned} XP
              </div>
            )}

            <div className="grid gap-2 pt-2">
              {onNextLevel && (
                <Button size="lg" className="w-full" onClick={onNextLevel}>
                  <Sparkles className="mr-1.5 h-5 w-5" /> Thử mức tiếp theo
                </Button>
              )}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={restart}>
                  <RotateCcw className="mr-1.5 h-5 w-5" /> Chơi lại
                </Button>
                <Button
                  variant={onNextLevel ? "outline" : "default"}
                  className="flex-1"
                  onClick={onExit}
                >
                  Hoàn tất
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ───────────────────────── Màn chơi ─────────────────────────
  if (stage?.kind === "game") {
    const { Component, title: gameTitle, emoji, hint } = stage.entry;
    return (
      <div className="study-frame mx-auto w-full max-w-2xl">
        <div className="flex items-center gap-3 py-4">
          <button
            type="button"
            onClick={onExit}
            className="text-muted-foreground transition-colors hover:text-brand-coral"
            aria-label="Thoát"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex-1">
            <div className="font-display text-lg font-extrabold leading-tight">
              {emoji} {gameTitle}
            </div>
            <p className="text-sm text-muted-foreground">{hint}</p>
          </div>
        </div>
        <div className="study-body py-2">
          <Component words={words} onDone={(gained) => nextStage(gained)} />
        </div>
      </div>
    );
  }

  return <MeetWords title={title} words={words} onExit={onExit} onDone={() => nextStage(0)} />;
}

// ───────────────────────── Màn "làm quen" ─────────────────────────

/**
 * Lướt qua từng từ: hình to, tự đọc lên, bé nói theo rồi bấm tiếp.
 * Cố ý GỌN — đây chỉ là phần giới thiệu mặt từ trước khi vào chơi, không phải
 * phần chính. Kéo dài ở đây là bé chán trước khi kịp chơi.
 */
function MeetWords({
  title,
  words,
  onExit,
  onDone,
}: {
  title: string;
  words: VocabWordCard[];
  onExit: () => void;
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [heard, setHeard] = useState(false);

  const word = words[index];
  const progress = words.length ? Math.round((index / words.length) * 100) : 0;
  const praise = useMemo(() => PRAISE[index % PRAISE.length], [index]);

  // Tự đọc ngay khi thẻ mới hiện ra — bé chưa đọc được chữ nên PHẢI nghe trước.
  useEffect(() => {
    if (!word) return;
    setHeard(false);
    const t = setTimeout(() => {
      playWord({ word: word.word, audioUrl: word.audioUrl });
      setHeard(true);
    }, 350); // chờ hiệu ứng trượt vào xong mới đọc, nghe rõ hơn
    return () => clearTimeout(t);
  }, [index, word]);

  if (!word) return null;

  return (
    <div className="study-frame mx-auto w-full max-w-2xl">
      <div className="flex items-center gap-3 py-4">
        <button
          type="button"
          onClick={onExit}
          className="text-muted-foreground transition-colors hover:text-brand-coral"
          aria-label="Thoát"
        >
          <X className="h-6 w-6" />
        </button>
        <Progress value={progress} className="h-3 flex-1" />
        <span className="font-display text-sm font-extrabold text-muted-foreground">
          {index + 1}/{words.length}
        </span>
      </div>

      <p className="pb-1 text-center font-display text-xl font-extrabold">
        Làm quen với từ mới 👋
      </p>

      <div className="flex flex-1 flex-col items-center justify-center gap-5 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={word.id}
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.25 }}
            className="flex w-full flex-col items-center gap-4"
          >
            {/* Hình/emoji cỡ đại nhún nhẹ trong khung gradient ấm — kênh truyền
                đạt chính cho bé chưa đọc được chữ. */}
            <div className="sticker flex aspect-square w-52 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-band-sun to-card sm:w-60">
              <WordVisual word={word} emojiClass="text-[7rem]" />
            </div>
            <p className="font-primer text-6xl font-bold leading-none tracking-wide sm:text-7xl">
              {word.word}
            </p>
            <p className="font-display text-xl font-extrabold text-foreground">{word.meaning}</p>
          </motion.div>
        </AnimatePresence>

        {/* Nút loa khổng lồ: với bé chưa đọc chữ đây là nút quan trọng nhất màn
            hình, nên nó phải to hơn mọi thứ khác và luôn nằm cùng một chỗ. */}
        <button
          type="button"
          onClick={() => playWord({ word: word.word, audioUrl: word.audioUrl })}
          aria-label={`Nghe lại từ ${word.word}`}
          className={cn(
            "btn-chunky [--edge:hsl(30_80%_38%)] flex h-28 w-28 items-center justify-center rounded-full bg-primary text-primary-foreground",
          )}
        >
          <Volume2 className="h-12 w-12" />
        </button>

        <RepeatRecorder word={word.word} />

        {heard && (
          <p className="animate-pop-in font-display text-base font-extrabold text-brand-teal">
            {praise}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 border-t-2 border-border py-4">
        <Button
          variant="ghost"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ArrowLeft className="mr-1.5 h-5 w-5" /> Trước
        </Button>
        <Button
          size="lg"
          onClick={() => (index < words.length - 1 ? setIndex((i) => i + 1) : onDone())}
        >
          <Check className="mr-1.5 h-5 w-5" />
          {index < words.length - 1 ? "Bé nói được rồi!" : "Chơi thôi! 🎮"}
        </Button>
      </div>
    </div>
  );
}

// ───────────────────────── Ghi âm & nghe lại ─────────────────────────

/**
 * Bé bấm mic → nói theo → nghe lại chính giọng mình, đặt cạnh giọng mẫu.
 *
 * KHÔNG CHẤM ĐIỂM, không gửi lên server: nhận dạng giọng trẻ 4–6 tuổi sai rất
 * nhiều, chấm oan một lần là bé không dám nói nữa. Chỉ riêng việc nghe lại giọng
 * mình đã đủ hấp dẫn với trẻ con, và so hai giọng cạnh nhau là cách tự sửa phát
 * âm tự nhiên nhất ở tuổi này.
 *
 * Tự dừng sau 6 giây vì bé rất hay quên bấm dừng.
 */
function RepeatRecorder({ word }: { word: string }) {
  const rec = useRecorder(6);

  // Đổi sang từ khác thì xoá bản ghi cũ — nếu không bé bấm "nghe lại giọng con"
  // ở từ mới lại nghe ra từ trước đó.
  useEffect(() => {
    rec.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word]);

  if (rec.state === "insecure") {
    return (
      <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-band-yel px-4 py-3 text-center">
        <p className="text-sm font-extrabold text-brand-gold">
          Trang này chưa chạy HTTPS nên trình duyệt khoá micro
        </p>
        <p className="text-xs text-muted-foreground">
          Mở bằng địa chỉ <b>https://…</b> hoặc <b>localhost</b> thì ghi âm được ngay.
          Bé cứ nói to theo, phần nghe vẫn dùng bình thường nhé!
        </p>
      </div>
    );
  }

  if (rec.state === "unsupported") {
    return (
      <p className="rounded-2xl bg-muted px-4 py-2.5 text-center text-sm font-semibold text-muted-foreground">
        Máy này chưa ghi âm được — bé cứ nói to theo nhé! 🗣️
      </p>
    );
  }

  if (rec.state === "denied") {
    return (
      <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-muted px-4 py-3 text-center">
        <p className="text-sm font-semibold text-muted-foreground">
          Chưa bật micro nên chưa ghi âm được.
        </p>
        <p className="text-xs text-muted-foreground">
          Bố mẹ bấm vào 🔒 trên thanh địa chỉ → cho phép Micro, rồi tải lại trang.
        </p>
        <button
          type="button"
          onClick={() => void rec.start()}
          className="mt-1 text-sm font-extrabold text-brand-gold hover:underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // Đã ghi xong → so hai giọng cạnh nhau
  if (rec.state === "ready" && rec.audioUrl) {
    return (
      <div className="flex w-full max-w-xs flex-col items-center gap-2">
        <p className="font-display text-base font-extrabold text-brand-gold">
          Nghe lại xem giống chưa nhé! 👂
        </p>
        {/* Hai giọng đặt cạnh nhau, phân biệt bằng MÀU khối chứ không bằng chữ —
            bé chưa đọc được nhãn "Ding nói" / "Con nói". */}
        <div className="grid w-full grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => playWord({ word })}
            className="btn-chunky [--edge:hsl(var(--c-blue))] flex min-h-[64px] flex-col items-center justify-center rounded-2xl bg-band-sky px-2 py-2"
          >
            <span className="text-xs font-extrabold text-muted-foreground">Ding nói</span>
            <span className="flex items-center gap-1 font-display text-sm font-extrabold text-brand-blue">
              <Volume2 className="h-5 w-5" /> Nghe
            </span>
          </button>
          <button
            type="button"
            onClick={() => void new Audio(rec.audioUrl!).play().catch(() => {})}
            className="btn-chunky [--edge:hsl(var(--c-sun))] flex min-h-[64px] flex-col items-center justify-center rounded-2xl bg-band-yel px-2 py-2"
          >
            <span className="text-xs font-extrabold text-muted-foreground">Con nói</span>
            <span className="flex items-center gap-1 font-display text-sm font-extrabold text-brand-gold">
              <Play className="h-5 w-5" /> Nghe
            </span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => void rec.start()}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-extrabold text-muted-foreground transition-colors hover:text-brand-gold"
        >
          <Mic className="h-5 w-5" /> Nói lại lần nữa
        </button>
      </div>
    );
  }

  const recording = rec.state === "recording";
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => (recording ? rec.stop() : void rec.start())}
        aria-label={recording ? "Dừng ghi âm" : `Ghi âm bé nói từ ${word}`}
        className={cn(
          "btn-chunky relative flex h-24 w-24 items-center justify-center rounded-full",
          recording
            ? "[--edge:hsl(6_72%_50%)] bg-destructive text-destructive-foreground"
            : "[--edge:hsl(var(--c-sun))] bg-sunny text-sunny-foreground",
        )}
      >
        {recording && (
          <motion.span
            className="absolute inset-0 rounded-full bg-destructive/40"
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
        {recording ? <Square className="h-9 w-9 fill-current" /> : <Mic className="h-10 w-10" />}
      </button>
      {/* Dòng nhắc dùng chữ chính, KHÔNG dùng `sunny-foreground` — đó là màu chữ
          trên nền vàng, đặt lên nền trang thì chế độ tối coi như mất chữ. */}
      <span className="font-display text-base font-extrabold text-foreground">
        {recording ? "Đang nghe bé nói… bấm để dừng" : "Bấm mic rồi nói theo nhé!"}
      </span>
      {!recording && (
        <span className="font-primer text-xl font-bold text-brand-gold">{word}</span>
      )}
    </div>
  );
}
