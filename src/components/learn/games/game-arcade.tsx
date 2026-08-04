"use client";
// ===========================================================================
//  SÂN CHƠI — chọn trò → chọn bộ từ → chơi.
//
//  Khác hoàn toàn với game trong bài học: ở đây KHÔNG chấm điểm, KHÔNG ghi tiến
//  độ, KHÔNG mất tim. Chơi xong chỉ hiện sao rồi mời chơi tiếp.
//
//  Vì sao tách riêng: trong bài học, game là phần thưởng SAU khi học xong — bé
//  phải qua phần làm quen mới tới. Nhiều lúc bé chỉ muốn chơi luôn, và ép học
//  trước là bé đóng app. Có một chỗ "chơi tự do" khiến bé quay lại mỗi ngày, mà
//  chơi trò nào cũng vẫn là nghe tiếng Anh và nhớ mặt từ.
// ===========================================================================
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shuffle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { VOCAB_GAMES, type VocabGameEntry } from "@/components/learn/vocab/games/registry";
import { WordVisual } from "@/components/learn/vocab/word-visual";
import { themeFor } from "@/lib/roadmap";
import { shuffle } from "@/lib/english";
import { primeSpeech } from "@/lib/speech";
import { cn } from "@/lib/utils";
import type { VocabWordCard } from "@/types";

/**
 * Màu nền cho từng ô trò chơi, xoay vòng theo thứ tự. Viết NGUYÊN chuỗi class
 * (không ghép động) để Tailwind quét ra khi build production.
 */
const TILE_TINTS = [
  "bg-band-sky",
  "bg-band-coral",
  "bg-band-mint",
  "bg-band-lav",
  "bg-band-yel",
  "bg-band-sun",
];

export interface ArcadePack {
  id: string;
  title: string;
  theme: string;
  level: string;
  words: VocabWordCard[];
}

type View =
  | { kind: "pick-game" }
  | { kind: "pick-pack"; game: VocabGameEntry }
  | { kind: "play"; game: VocabGameEntry; pack: ArcadePack; round: number }
  | { kind: "result"; game: VocabGameEntry; pack: ArcadePack; stars: number };

export function GameArcade({ packs }: { packs: ArcadePack[] }) {
  const [view, setView] = useState<View>({ kind: "pick-game" });

  if (packs.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 text-center">
        <DingBuddy size={110} pose="idle" />
        <h1 className="font-display text-2xl font-extrabold text-foreground">
          Sân chơi đang dọn dẹp 🧹
        </h1>
        <p className="text-[15px] text-muted-foreground">
          Chưa có bộ từ nào để chơi. Bé học vài bài Từ vựng trước rồi quay lại nhé!
        </p>
      </div>
    );
  }

  // ── Đang chơi ──
  if (view.kind === "play") {
    const { Component, title, emoji } = view.game;
    return (
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={() => setView({ kind: "pick-game" })}
          className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-card px-4 text-sm font-bold text-muted-foreground shadow-soft transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Thoát trò chơi
        </button>
        {/* Tên trò đang chơi đặt trên dải màu kem để tách khỏi khu vực chơi. */}
        <div className="mb-3 rounded-2xl bg-band-cream px-4 py-2 font-display text-lg font-extrabold text-foreground shadow-soft">
          {emoji} {title}
          <span className="ml-2 text-sm font-semibold text-muted-foreground">
            · {view.pack.title}
          </span>
        </div>
        <Component
          // `round` đổi → React dựng lại game từ đầu khi bé bấm "Chơi lại".
          key={`${view.game.id}-${view.pack.id}-${view.round}`}
          words={view.pack.words}
          onDone={(stars) =>
            setView({ kind: "result", game: view.game, pack: view.pack, stars })
          }
        />
      </div>
    );
  }

  // ── Chơi xong ──
  if (view.kind === "result") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center">
        <Card className="w-full rounded-3xl text-center">
          <CardContent className="space-y-4 px-6 pb-6 pt-8">
            <DingBuddy size={104} pose="cheer" message="Chơi vui quá!" className="mx-auto" />
            <h2 className="font-display text-2xl font-extrabold">
              {"⭐".repeat(Math.max(1, view.stars))}
            </h2>
            <p className="text-[15px] text-muted-foreground">
              Bé vừa chơi <b>{view.game.title}</b> với bộ từ “{view.pack.title}”.
            </p>
            <div className="grid gap-2 pt-1">
              <Button
                className="btn-chunky w-full rounded-2xl py-3 font-display font-extrabold"
                onClick={() =>
                  setView({ kind: "play", game: view.game, pack: view.pack, round: Date.now() })
                }
              >
                <Sparkles className="mr-1.5 h-5 w-5" /> Chơi lại
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl"
                  onClick={() => setView({ kind: "pick-pack", game: view.game })}
                >
                  Đổi bộ từ
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl"
                  onClick={() => setView({ kind: "pick-game" })}
                >
                  Trò khác
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Chọn bộ từ cho trò đã chọn ──
  if (view.kind === "pick-pack") {
    const playable = packs.filter((p) => p.words.length >= (view.game.minWords ?? 3));
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <button
          type="button"
          onClick={() => setView({ kind: "pick-game" })}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Chọn trò khác
        </button>

        <div className="flex items-center gap-3">
          <span className="text-5xl" aria-hidden>
            {view.game.emoji}
          </span>
          <div>
            <h1 className="font-display text-2xl font-extrabold leading-tight">
              {view.game.title}
            </h1>
            <p className="text-[15px] text-muted-foreground">Bé muốn chơi với bộ từ nào?</p>
          </div>
        </div>

        {playable.length === 0 ? (
          <p className="rounded-2xl border-2 border-dashed py-8 text-center text-[15px] text-muted-foreground">
            Trò này cần bộ từ có ít nhất {view.game.minWords ?? 3} từ. Bé chọn trò khác nhé!
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {playable.map((p) => {
              const t = themeFor(p.level);
              return (
                <motion.button
                  key={p.id}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    setView({ kind: "play", game: view.game, pack: p, round: Date.now() })
                  }
                  className="sticker flex items-center gap-3 bg-card p-3 text-left transition-transform hover:-translate-y-0.5"
                >
                  <span
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl",
                      t.accentSoft,
                    )}
                  >
                    {p.words[0]?.emoji || t.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-extrabold leading-tight">
                      {p.title}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {p.words.length} từ · {t.label}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── Chọn trò chơi (màn đầu) ──
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <DingBuddy size={72} pose="wave" />
        <div>
          <h1 className="font-display text-3xl font-extrabold leading-tight">Sân chơi 🎮</h1>
          <p className="text-[15px] text-muted-foreground">
            Chơi thoải mái, không chấm điểm — mà vẫn nhớ được từ mới!
          </p>
        </div>
      </div>

      {/* Chơi ngẫu nhiên — bé lười chọn thì bấm cái này */}
      <Button
        className="btn-chunky w-full rounded-2xl py-4 font-display text-base font-extrabold"
        onClick={() => {
          primeSpeech();
          const game = shuffle(VOCAB_GAMES)[0];
          const playable = packs.filter((p) => p.words.length >= (game.minWords ?? 3));
          const pack = shuffle(playable.length ? playable : packs)[0];
          setView({ kind: "play", game, pack, round: Date.now() });
        }}
      >
        <Shuffle className="mr-2 h-5 w-5" /> Chơi ngẫu nhiên!
      </Button>

      <div className="grid gap-3 sm:grid-cols-2">
        {VOCAB_GAMES.map((g) => (
          <motion.button
            key={g.id}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => { primeSpeech(); setView({ kind: "pick-pack", game: g }); }}
            className="sticker flex items-center gap-3 bg-card p-4 text-left transition-transform hover:-translate-y-0.5"
          >
            <span className="text-4xl" aria-hidden>
              {g.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-extrabold leading-tight">
                {g.title}
              </span>
              <span className="block text-sm text-muted-foreground">{g.hint}</span>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Xem trước vài từ để bé tò mò */}
      {packs[0] && (
        <div className="rounded-3xl bg-muted/40 p-4">
          <p className="mb-2 text-sm font-bold text-muted-foreground">
            Hôm nay chơi với những từ này nhé:
          </p>
          <div className="flex flex-wrap gap-2">
            {packs[0].words.slice(0, 8).map((w) => (
              <span
                key={w.id}
                className="flex items-center gap-1.5 rounded-2xl bg-card px-3 py-1.5"
              >
                <WordVisual word={w} emojiClass="text-xl" />
                <span className="font-primer text-base font-bold">{w.word}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
