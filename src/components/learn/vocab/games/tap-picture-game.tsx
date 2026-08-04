"use client";
// ===========================================================================
//  GAME 1 — "CHỈ ĐÚNG HÌNH" (dễ nhất, game đầu tiên bé gặp)
//
//  Máy ĐỌC LÊN một từ tiếng Anh, bé nhìn 2–3 ô hình và chạm vào ô đúng.
//  Đây là bài kiểm tra NGHE thuần tuý: trước khi bé chọn, dưới ô KHÔNG hiện
//  chữ tiếng Anh — nếu hiện thì bé chỉ cần dò chữ là xong, mất hết phần luyện
//  nghe. Chữ chỉ bật lên SAU khi bé chọn đúng, để bé đối chiếu âm với mặt chữ.
//
//  Chọn sai không bị phạt: ô rung nhẹ (rung KHÔNG đổi màu — không có nền đỏ
//  doạ bé), máy đọc lại từ đúng, bé thử tiếp cho tới khi đúng. Số lần sai chỉ
//  dùng để tính sao (tối thiểu vẫn 1 sao).
// ===========================================================================
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import { playWord } from "@/lib/speech";
import { shuffle } from "@/lib/english";
import { cn } from "@/lib/utils";
import type { VocabWordCard } from "@/types";
import type { VocabGameProps } from "./types";
import { WordVisual } from "../word-visual";
import { GameShell, StarBurst, GameDone } from "./game-shell";

/** 5 lượt — đủ để bé nhớ mặt từ mà chưa kịp chán (xem nguyên tắc 5). */
const TOTAL_ROUNDS = 5;

/** Lời khen xoay vòng — trẻ chán rất nhanh nếu lúc nào cũng một câu. */
const PRAISE = [
  "Bé chọn đúng rồi! 🌟",
  "Giỏi quá đi! 🎉",
  "Tai bé thính ghê! 👂",
  "Chính xác luôn! 👏",
  "Tuyệt vời! 🐻",
];

/** Câu nhắc khi bé chạm nhầm — không bao giờ nói "sai" (xem CLAUDE.md §8). */
const NUDGE = "Bé nghe lại rồi thử ô khác nhé! 🌟";

interface Round {
  target: VocabWordCard;
  options: VocabWordCard[];
}

/**
 * Dựng sẵn 5 lượt chơi.
 * Số lựa chọn tăng dần cho đỡ nhàm: lượt 1–2 có 2 ô, từ lượt 3 có 3 ô
 * (không bao giờ vượt quá số từ đang có).
 */
function buildRounds(words: VocabWordCard[]): Round[] {
  // Lọc trùng id trước: nếu bài lỡ có hai bản ghi cùng id thì vòng "tránh hai
  // lượt liền nhau trùng từ" bên dưới có thể quay mãi không thoát.
  const pool = words.filter((w, i, all) => all.findIndex((x) => x.id === w.id) === i);
  if (pool.length < 2) return [];

  // Chọn từ cho từng lượt: xáo trộn rồi lấy lần lượt, hết thì xáo lại. Tránh
  // hai lượt liền nhau trùng từ để bé không tưởng là màn hình bị đứng.
  const targets: VocabWordCard[] = [];
  while (targets.length < TOTAL_ROUNDS) {
    for (const w of shuffle(pool)) {
      if (targets.length >= TOTAL_ROUNDS) break;
      const prev = targets[targets.length - 1];
      if (prev && prev.id === w.id) continue;
      targets.push(w);
    }
  }

  return targets.map((target, i) => {
    const optionCount = Math.min(i < 2 ? 2 : 3, pool.length);
    const distractors = shuffle(pool.filter((w) => w.id !== target.id)).slice(
      0,
      optionCount - 1,
    );
    return { target, options: shuffle([target, ...distractors]) };
  });
}

export function TapPictureGame({ words, onDone }: VocabGameProps) {
  // Khoá theo DANH SÁCH ID, không theo tham chiếu mảng: nếu nơi gọi truyền
  // `words={lesson.words.filter(...)}` thì mỗi lần render là một mảng mới —
  // dựng lại lượt chơi giữa chừng sẽ đổi đáp án ngay dưới tay bé.
  const wordKey = words.map((w) => w.id).join("|");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rounds = useMemo(() => buildRounds(words), [wordKey]);

  const [roundIndex, setRoundIndex] = useState(0);
  /** Lượt này đã chọn đúng chưa — đúng rồi thì khoá ô lại và hiện chữ. */
  const [solved, setSolved] = useState(false);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [nudge, setNudge] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [burst, setBurst] = useState(0);
  const [praise, setPraise] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  /** Chặn gọi `onDone` hai lần (bấm nhanh / effect chạy lại). */
  const finished = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  /** Hẹn giờ đọc lại sau khi bé chạm nhầm — giữ riêng để không chồng tiếng. */
  const replayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf = useRef<number | null>(null);

  const current: Round | undefined = rounds[roundIndex];
  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }, []);

  // Dọn hẹn giờ khi rời màn — tránh setState trên component đã gỡ.
  useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach(clearTimeout);
      list.length = 0;
      if (replayTimer.current) clearTimeout(replayTimer.current);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Không dựng nổi lượt nào (bài có ít hơn 2 từ khác nhau) → coi như xong,
  // tặng 1 sao để bé không kẹt ở màn hình trống.
  useEffect(() => {
    if (rounds.length > 0 || finished.current) return;
    finished.current = true;
    onDone(1);
  }, [rounds.length, onDone]);

  // NGUYÊN TẮC 2: tự đọc từ ngay khi vào lượt mới. Bé chưa đọc được chữ và
  // cũng chưa biết nút loa ở đâu — chờ hiệu ứng vào xong (350ms) rồi đọc.
  useEffect(() => {
    if (done || !current) return;
    const t = setTimeout(() => {
      playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
    }, 350);
    return () => clearTimeout(t);
  }, [roundIndex, done, current]);

  // Rung xong thì trả ô về bình thường — không để lại vệt gì trên màn hình.
  useEffect(() => {
    if (!shakeId) return;
    const t = setTimeout(() => setShakeId(null), 500);
    return () => clearTimeout(t);
  }, [shakeId]);

  // Câu nhắc "thử ô khác" tự tắt, để câu nhắc gốc quay lại.
  useEffect(() => {
    if (!nudge) return;
    const t = setTimeout(() => setNudge(false), 2200);
    return () => clearTimeout(t);
  }, [nudge]);

  const replay = useCallback(() => {
    if (!current) return;
    playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
  }, [current]);

  function handleTap(option: VocabWordCard) {
    if (!current || solved || done) return;

    if (option.id !== current.target.id) {
      // NGUYÊN TẮC 3: không thua, không trừ điểm — chỉ rung nhẹ rồi đọc LẠI từ
      // đúng để bé nghe thêm một lần nữa, và cho thử tiếp.
      setMistakes((m) => m + 1);
      setNudge(true);
      // Gán null trước rồi mới gán id ở khung hình sau: bé hay chạm liên tiếp
      // vào đúng một ô, mà React bỏ qua setState khi giá trị không đổi nên
      // hiệu ứng rung sẽ không chạy lại.
      setShakeId(null);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setShakeId(option.id));

      if (replayTimer.current) clearTimeout(replayTimer.current);
      replayTimer.current = setTimeout(replay, 220);
      return;
    }

    // Đúng: sao bay + đọc lại từ + hiện chữ để bé đối chiếu.
    if (replayTimer.current) clearTimeout(replayTimer.current);
    setSolved(true);
    setNudge(false);
    setBurst((b) => b + 1);
    setPraise(PRAISE[roundIndex % PRAISE.length]);
    replay();
    later(() => {
      if (roundIndex < rounds.length - 1) {
        setRoundIndex((i) => i + 1);
        setSolved(false);
        setPraise(null);
      } else {
        setDone(true);
      }
    }, 1200);
  }

  if (!current) return null;

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

  const cols = current.options.length >= 3 ? "grid-cols-3" : "grid-cols-2";
  const prompt = solved && praise ? praise : nudge ? NUDGE : "Bé nghe rồi chỉ đúng hình nhé! 👂";

  return (
    <>
      <StarBurst trigger={burst} />
      <GameShell prompt={prompt} round={roundIndex + 1} totalRounds={rounds.length}>
        <div className="flex flex-col items-center gap-4">
          {/* Nút loa to ở giữa — bé bấm nghe lại bao nhiêu lần cũng được */}
          <button
            type="button"
            onClick={replay}
            aria-label="Nghe lại từ"
            className={cn(
              "btn-chunky flex h-24 w-24 items-center justify-center rounded-full",
              // Vàng nắng = nút hành động chính của cả hệ thiết kế (§2.1).
              "bg-sunny text-sunny-foreground transition-transform hover:scale-105 active:scale-95",
            )}
          >
            <Volume2 className="h-11 w-11" />
          </button>
          <p className="text-sm font-semibold text-muted-foreground">
            Bấm loa để nghe lại
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={roundIndex}
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.25 }}
              className={cn("grid w-full gap-2 sm:gap-3", cols)}
            >
              {current.options.map((opt) => {
                const isTarget = opt.id === current.target.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleTap(opt)}
                    disabled={solved}
                    // Nhãn cho trình đọc màn hình dùng NGHĨA TIẾNG VIỆT: bé chưa
                    // đọc được, nhưng bố mẹ / công nghệ hỗ trợ thì hiểu ngay.
                    aria-label={`Hình ${opt.meaning || opt.word}`}
                    className={cn(
                      // Ô chơi chính: cao 128px (nguyên tắc 4 cần ≥ 96px). Bề
                      // ngang để co giãn theo cột — đặt min-w cứng thì 3 ô sẽ
                      // tràn ngang trên máy hẹp 320px và trang bị kéo ngang.
                      "sticker flex min-h-[8rem] w-full min-w-0 flex-col items-center justify-center",
                      "overflow-hidden bg-card p-2 transition-transform active:scale-95",
                      // Rung KHÔNG đổi màu: `animate-wrong` của dự án ép nền đỏ
                      // + viền đỏ, quá doạ với bé 4 tuổi (nguyên tắc 3).
                      shakeId === opt.id && "animate-wrong-shake",
                      solved && isTarget && "animate-pop-in ring-4 ring-sunny",
                      solved && !isTarget && "opacity-40",
                    )}
                  >
                    <span className="flex aspect-square w-full max-w-[6rem] items-center justify-center overflow-hidden rounded-2xl">
                      <WordVisual word={opt} emojiClass="text-5xl sm:text-6xl" quiz />
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Chữ chỉ hiện SAU khi bé chọn đúng — hiện trước thì bé dò chữ chứ
              không nghe nữa. Chỉ hiện chữ của từ ĐÚNG để bé khỏi lẫn với các
              hình còn lại. */}
          {solved && (
            <div className="animate-pop-in flex flex-col items-center gap-0.5 rounded-2xl bg-band-sun px-5 py-2 text-center shadow-soft">
              <span className="font-primer text-2xl font-bold leading-none">
                {current.target.word}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {current.target.meaning}
              </span>
            </div>
          )}
        </div>
      </GameShell>
    </>
  );
}
