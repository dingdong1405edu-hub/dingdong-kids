"use client";
// ===========================================================================
//  GAME 3 — "LẬT HÌNH TÌM ĐÔI"
//
//  Điểm mấu chốt khiến game này DẠY được chứ không chỉ là trò trí nhớ: MỖI LẦN
//  LẬT THẺ LÀ MÁY ĐỌC TỪ ĐÓ LÊN. Bé lật đi lật lại chục lần thì cũng nghe từ đó
//  chục lần, nên hình – âm – chữ dính vào nhau một cách tự nhiên.
//
//  Thẻ sai úp lại sau 1s (không phải 0.5s như game người lớn): trẻ nhỏ xử lý
//  hình ảnh chậm hơn, úp quá nhanh thì bé chưa kịp nhìn đã mất.
// ===========================================================================
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { playWord } from "@/lib/speech";
import { shuffle } from "@/lib/english";
import { cn } from "@/lib/utils";
import type { VocabWordCard } from "@/types";
import type { VocabGameProps } from "./types";
import { WordVisual } from "../word-visual";
import { GameShell, StarBurst, GameDone } from "./game-shell";

interface Tile {
  /** Khoá riêng của ô (mỗi từ có hai ô nên id từ bị trùng). */
  key: string;
  word: VocabWordCard;
}

/**
 * 3 từ (6 thẻ) là vừa với bé; 4 từ (8 thẻ) khi bài có nhiều từ hơn.
 *
 * LỌC TRÙNG `id` trước: nếu cùng một từ lọt vào hai lần thì sẽ sinh hai thẻ
 * cùng khoá (`id-a`) — React trùng key, và bàn cờ có tới 4 thẻ của một từ nên
 * logic ăn đôi vỡ hoàn toàn.
 */
function buildTiles(words: VocabWordCard[]): Tile[] {
  const unique = Array.from(new Map(words.map((w) => [w.id, w])).values());
  if (unique.length < 3) return [];
  const picked = shuffle(unique).slice(0, unique.length >= 4 ? 4 : 3);
  return shuffle(
    picked.flatMap((w) => [
      { key: `${w.id}-a`, word: w },
      { key: `${w.id}-b`, word: w },
    ]),
  );
}

export function MemoryMatchGame({ words, onDone }: VocabGameProps) {
  // Khoá theo DANH SÁCH ID, không theo tham chiếu mảng: nơi gọi có thể truyền
  // `words={...filter(...)}` (mảng mới mỗi lần render) — bám tham chiếu thì bàn
  // cờ xáo lại giữa chừng, thẻ bé vừa nhớ vị trí lại nhảy đi chỗ khác.
  const wordKey = words.map((w) => w.id).join("|");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tiles = useMemo(() => buildTiles(words), [wordKey]);

  /** Các ô đang lật ngửa nhưng CHƯA ăn đôi (tối đa 2). */
  const [flipped, setFlipped] = useState<string[]>([]);
  /** id của các TỪ đã ăn đôi. */
  const [matched, setMatched] = useState<string[]>([]);
  const [wrongPairs, setWrongPairs] = useState(0);
  const [burst, setBurst] = useState(0);
  const [done, setDone] = useState(false);
  /** Khoá bàn cờ trong lúc chờ úp hai thẻ sai lại. */
  const [locked, setLocked] = useState(false);

  const finished = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const totalPairs = tiles.length / 2;
  const stars = wrongPairs <= 1 ? 3 : wrongPairs <= 4 ? 2 : 1;

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach(clearTimeout);
      list.length = 0;
    };
  }, []);

  // Không dựng được bàn cờ (ít hơn 3 từ KHÁC NHAU) → coi như xong, tặng 1 sao.
  // Bám `tiles` chứ không bám `words.length`: bài có 3 bản ghi nhưng trùng id
  // thì `words.length` vẫn là 3, mà bàn cờ lại rỗng — trước đây bé kẹt ở màn
  // trắng vĩnh viễn vì `onDone` không bao giờ được gọi.
  useEffect(() => {
    if (tiles.length > 0 || finished.current) return;
    finished.current = true;
    onDone(1);
  }, [tiles.length, onDone]);

  // Ăn hết các đôi → xong game.
  useEffect(() => {
    if (totalPairs > 0 && matched.length === totalPairs && !done) {
      later(() => setDone(true), 700);
    }
  }, [matched.length, totalPairs, done, later]);

  function handleFlip(tile: Tile) {
    if (locked || done) return;
    if (matched.includes(tile.word.id)) return; // đã ăn rồi
    if (flipped.includes(tile.key)) return; // đang ngửa rồi
    if (flipped.length >= 2) return;

    // ĐỌC TỪ MỖI LẦN LẬT — đây là phần dạy học của game, đừng bỏ.
    playWord({ word: tile.word.word, audioUrl: tile.word.audioUrl });

    const next = [...flipped, tile.key];
    setFlipped(next);
    if (next.length < 2) return;

    const [aKey, bKey] = next;
    const a = tiles.find((t) => t.key === aKey);
    const b = tiles.find((t) => t.key === bKey);
    if (!a || !b) return;

    if (a.word.id === b.word.id) {
      setBurst((x) => x + 1);
      setMatched((m) => [...m, a.word.id]);
      setFlipped([]);
      return;
    }

    // Sai đôi: khoá bàn, chờ 1s cho bé kịp nhìn rồi mới úp lại.
    setWrongPairs((n) => n + 1);
    setLocked(true);
    later(() => {
      setFlipped([]);
      setLocked(false);
    }, 1000);
  }

  if (tiles.length === 0) return null;

  if (done) {
    return (
      <GameDone
        stars={stars}
        onNext={() => {
          if (finished.current) return;
          finished.current = true;
          onDone(stars);
        }}
      />
    );
  }

  const cols = tiles.length > 6 ? "grid-cols-4" : "grid-cols-3";

  return (
    <>
      <StarBurst trigger={burst} />
      <GameShell
        prompt="Lật thẻ tìm hai hình giống nhau nhé! 🃏"
        round={matched.length + 1}
        totalRounds={totalPairs}
      >
        <div className={cn("grid gap-2 sm:gap-3", cols)}>
          {tiles.map((tile) => {
            const isMatched = matched.includes(tile.word.id);
            const isFaceUp = isMatched || flipped.includes(tile.key);
            return (
              <motion.button
                key={tile.key}
                type="button"
                onClick={() => handleFlip(tile)}
                disabled={isMatched || locked}
                aria-label={isFaceUp ? `Thẻ ${tile.word.meaning || tile.word.word}` : "Thẻ úp"}
                whileTap={{ scale: 0.94 }}
                animate={{ rotateY: isFaceUp ? 180 : 0 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  // Ô chơi ≥ 96px (nguyên tắc 4)
                  "relative flex aspect-square w-full min-w-0 items-center justify-center rounded-2xl border-4",
                  isMatched
                    ? "animate-pop-in border-emerald-400 bg-emerald-50 dark:bg-emerald-500/15"
                    : isFaceUp
                      ? "border-primary/40 bg-card"
                      : "border-primary/20 bg-gradient-to-br from-primary/80 to-primary",
                )}
              >
                {/* Nội dung phải xoay ngược lại để không bị lộn khi thẻ lật */}
                <span
                  className="flex flex-col items-center justify-center gap-1"
                  style={{ transform: isFaceUp ? "rotateY(180deg)" : undefined }}
                >
                  {isFaceUp ? (
                    <>
                      <WordVisual word={tile.word} emojiClass="text-4xl sm:text-5xl" quiz />
                      {isMatched && (
                        <span className="font-primer text-xs font-bold leading-none sm:text-sm">
                          {tile.word.word}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-4xl text-primary-foreground/90" aria-hidden>
                      ⭐
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>

        <p className="text-center text-sm font-semibold text-muted-foreground">
          Đã tìm được {matched.length}/{totalPairs} đôi
        </p>
      </GameShell>
    </>
  );
}
