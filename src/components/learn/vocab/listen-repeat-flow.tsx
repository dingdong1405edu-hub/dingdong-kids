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
//  CỐ TÌNH KHÔNG GHI ÂM: nhận dạng giọng trẻ 4 tuổi rất kém chính xác, chấm sai
//  một lần là bé mất hứng. Ở mức này mục tiêu là bé DÁM MỞ MIỆNG NÓI, không phải
//  nói chuẩn. Việc chấm phát âm để dành cho phần Nói ở các cấp lớn hơn.
// ===========================================================================
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { X, ArrowLeft, Volume2, Mic, Check, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { playWord } from "@/lib/speech";
import { emitDing } from "@/lib/ding-bus";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { WordVisual } from "./word-visual";
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
        <Card className="w-full max-w-md rounded-3xl text-center">
          <CardContent className="space-y-4 px-6 pb-6 pt-8">
            <DingBuddy size={104} pose="cheer" message="Bé chơi giỏi lắm!" className="mx-auto" />
            <h2 className="font-display text-2xl font-extrabold">Xong rồi! 🎉</h2>
            <p className="text-[15px] text-muted-foreground">
              Bé đã học {words.length} từ trong bài “{title || "Từ vựng"}”.
            </p>

            {maxStars > 0 && (
              <div className="flex flex-col items-center gap-1">
                <div className="text-4xl font-extrabold text-sunny-foreground">
                  {"⭐".repeat(Math.max(1, stars))}
                </div>
                <p className="text-sm font-semibold text-muted-foreground">
                  {stars}/{maxStars} sao
                </p>
              </div>
            )}

            {xpEarned !== null && xpEarned > 0 && (
              <div className="font-display font-extrabold text-sunny-foreground">
                <span className="text-sunny">★</span> +{xpEarned} XP
              </div>
            )}

            <div className="grid gap-2 pt-2">
              {onNextLevel && (
                <Button
                  className="btn-chunky w-full rounded-2xl py-3 font-display font-extrabold"
                  onClick={onNextLevel}
                >
                  <Sparkles className="mr-1.5 h-5 w-5" /> Thử mức tiếp theo
                </Button>
              )}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-2xl" onClick={restart}>
                  <RotateCcw className="mr-1.5 h-4 w-4" /> Chơi lại
                </Button>
                <Button
                  variant={onNextLevel ? "outline" : "default"}
                  className="flex-1 rounded-2xl"
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
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col">
        <div className="flex items-center gap-3 py-4">
          <button
            type="button"
            onClick={onExit}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Thoát"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex-1">
            <div className="font-display text-base font-extrabold leading-tight">
              {emoji} {gameTitle}
            </div>
            <p className="text-xs text-muted-foreground">{hint}</p>
          </div>
        </div>
        <div className="flex-1 py-2">
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
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col">
      <div className="flex items-center gap-3 py-4">
        <button
          type="button"
          onClick={onExit}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Thoát"
        >
          <X className="h-6 w-6" />
        </button>
        <Progress value={progress} className="h-3 flex-1" />
        <span className="text-sm font-bold text-muted-foreground">
          {index + 1}/{words.length}
        </span>
      </div>

      <p className="pb-1 text-center font-display text-lg font-extrabold">
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
            <div className="sticker flex aspect-square w-52 items-center justify-center overflow-hidden bg-card sm:w-60">
              <WordVisual word={word} emojiClass="text-[7rem]" />
            </div>
            <p className="font-primer text-6xl font-bold leading-none tracking-wide sm:text-7xl">
              {word.word}
            </p>
            <p className="text-lg font-semibold text-muted-foreground">{word.meaning}</p>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => playWord({ word: word.word, audioUrl: word.audioUrl })}
          aria-label={`Nghe lại từ ${word.word}`}
          className={cn(
            "btn-chunky flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground",
            "transition-transform hover:scale-105 active:scale-95",
          )}
        >
          <Volume2 className="h-11 w-11" />
        </button>

        <div className="flex items-center gap-2 rounded-2xl bg-sunny/15 px-4 py-2.5">
          <Mic className="h-5 w-5 shrink-0 text-sunny-foreground" />
          <span className="font-display text-base font-extrabold text-sunny-foreground">
            Bé nói theo nào: <span className="font-primer">{word.word}</span>
          </span>
        </div>

        {heard && (
          <p className="animate-fade-in text-sm font-semibold text-muted-foreground">{praise}</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 border-t py-4">
        <Button
          variant="ghost"
          className="rounded-2xl"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Trước
        </Button>
        <Button
          className="btn-chunky rounded-2xl px-6 py-3 font-display text-base font-extrabold"
          onClick={() => (index < words.length - 1 ? setIndex((i) => i + 1) : onDone())}
        >
          <Check className="mr-1.5 h-5 w-5" />
          {index < words.length - 1 ? "Bé nói được rồi!" : "Chơi thôi! 🎮"}
        </Button>
      </div>
    </div>
  );
}
