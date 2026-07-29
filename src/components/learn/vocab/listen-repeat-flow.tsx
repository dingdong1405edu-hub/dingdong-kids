"use client";
// ===========================================================================
//  NGHE & NHẮC LẠI — mức DỄ NHẤT của phần Từ vựng.
//
//  Dành cho bé 4–6 tuổi CHƯA ĐỌC ĐƯỢC CHỮ. Ở mức này bé KHÔNG phải ghép chữ,
//  không phải chọn đáp án, không bị chấm sai: chỉ nhìn hình – nghe – nói theo.
//  Đó là cách trẻ học tiếng mẹ đẻ, và là bước phải đi trước khi ghép vần.
//
//  CỐ TÌNH KHÔNG GHI ÂM: nhận dạng giọng trẻ 4 tuổi rất kém chính xác, chấm sai
//  một lần là bé mất hứng. Ở mức này mục tiêu là bé DÁM MỞ MIỆNG NÓI, không phải
//  nói chuẩn. Việc chấm phát âm để dành cho phần Nói ở các cấp lớn hơn.
// ===========================================================================
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { X, ArrowLeft, Volume2, Mic, Check, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { playWord } from "@/lib/speech";
import { emitDing } from "@/lib/ding-bus";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { cn } from "@/lib/utils";
import type { VocabWordCard } from "@/types";

interface Props {
  title: string;
  words: VocabWordCard[];
  onExit: () => void;
  /** Sang mức tiếp theo ("Học từ") sau khi nghe hết. */
  onNextLevel?: () => void;
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

export function ListenRepeatFlow({ title, words, onExit, onNextLevel, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [plays, setPlays] = useState(0);
  const [done, setDone] = useState(false);
  const [xpEarned, setXpEarned] = useState<number | null>(null);
  const [startTime] = useState(Date.now());
  // Chống bấm "Tiếp theo" hai lần khi đang lưu kết quả.
  const finishing = useRef(false);

  const word = words[index];
  const progress = words.length ? Math.round((index / words.length) * 100) : 0;
  const praise = useMemo(() => PRAISE[index % PRAISE.length], [index]);

  // Tự đọc từ ngay khi thẻ mới hiện ra — bé chưa đọc được chữ nên PHẢI nghe
  // trước. Không chờ bé bấm nút.
  useEffect(() => {
    if (done || !word) return;
    setPlays(0);
    const t = setTimeout(() => {
      playWord({ word: word.word, audioUrl: word.audioUrl });
      setPlays(1);
    }, 350); // chờ hiệu ứng trượt vào xong mới đọc, nghe rõ hơn
    return () => clearTimeout(t);
  }, [index, done, word]);

  function replay() {
    if (!word) return;
    playWord({ word: word.word, audioUrl: word.audioUrl });
    setPlays((p) => p + 1);
  }

  async function next() {
    if (index < words.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    if (finishing.current) return;
    finishing.current = true;

    // Mức này không chấm điểm: đi hết là xong (100%).
    const total = Math.max(1, words.length);
    const durationSec = Math.round((Date.now() - startTime) / 1000);
    if (onComplete) {
      const res = await onComplete({ correct: total, total, durationSec });
      if (res.ok) setXpEarned(res.xpEarned ?? 0);
      else toast.error("Lỗi lưu kết quả");
    }
    emitDing("complete");
    setDone(true);
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

  if (done) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md rounded-3xl text-center">
          <CardContent className="space-y-4 px-6 pb-6 pt-8">
            <DingBuddy size={104} pose="cheer" message="Bé nghe giỏi lắm!" className="mx-auto" />
            <h2 className="font-display text-2xl font-extrabold">Xong rồi! 🎉</h2>
            <p className="text-[15px] text-muted-foreground">
              Bé đã nghe và nhắc lại {words.length} từ trong bài “{title || "Từ vựng"}”.
            </p>
            {xpEarned !== null && xpEarned > 0 && (
              <div className="font-display font-extrabold text-sunny-foreground">
                <span className="text-sunny">★</span> +{xpEarned} XP
              </div>
            )}
            <div className="grid gap-2 pt-2">
              {onNextLevel && (
                <Button className="btn-chunky w-full rounded-2xl py-3 font-display font-extrabold" onClick={onNextLevel}>
                  <Sparkles className="mr-1.5 h-5 w-5" /> Thử mức tiếp theo
                </Button>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl"
                  onClick={() => {
                    finishing.current = false;
                    setIndex(0);
                    setXpEarned(null);
                    setDone(false);
                  }}
                >
                  <RotateCcw className="mr-1.5 h-4 w-4" /> Nghe lại
                </Button>
                <Button variant={onNextLevel ? "outline" : "default"} className="flex-1 rounded-2xl" onClick={onExit}>
                  Hoàn tất
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={word.id}
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.25 }}
            className="flex w-full flex-col items-center gap-4"
          >
            {/* Ảnh minh hoạ — kênh truyền đạt CHÍNH ở mức này */}
            <div className="sticker flex aspect-square w-56 items-center justify-center overflow-hidden bg-card sm:w-64">
              {word.imageUrl ? (
                // Ảnh do admin tải lên: dùng <img> thường để mọi URL đều hiện
                // được mà không phải khai báo remotePatterns cho next/image.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={word.imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-8xl" aria-hidden>
                  🖼️
                </span>
              )}
            </div>

            {/* Từ — RẤT TO, phông dạy đọc (a/g một tầng) */}
            <p className="font-primer text-6xl font-bold leading-none tracking-wide sm:text-7xl">
              {word.word}
            </p>
            <p className="text-lg font-semibold text-muted-foreground">{word.meaning}</p>
          </motion.div>
        </AnimatePresence>

        {/* Nút loa to — bé bấm nghe lại bao nhiêu lần cũng được */}
        <button
          type="button"
          onClick={replay}
          aria-label={`Nghe lại từ ${word.word}`}
          className={cn(
            "btn-chunky flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground",
            "transition-transform hover:scale-105 active:scale-95",
          )}
        >
          <Volume2 className="h-11 w-11" />
        </button>

        {/* Lời nhắc bé nói theo */}
        <div className="flex items-center gap-2 rounded-2xl bg-sunny/15 px-4 py-2.5">
          <Mic className="h-5 w-5 shrink-0 text-sunny-foreground" />
          <span className="font-display text-base font-extrabold text-sunny-foreground">
            Bé nói theo nào: <span className="font-primer">{word.word}</span>
          </span>
        </div>

        {plays > 0 && (
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
        <Button className="btn-chunky rounded-2xl px-6 py-3 font-display text-base font-extrabold" onClick={next}>
          <Check className="mr-1.5 h-5 w-5" />
          {index < words.length - 1 ? "Bé nói được rồi!" : "Xong bài"}
        </Button>
      </div>
    </div>
  );
}
