"use client";
// Lộ trình — phần GHÉP VẦN (Phonics). Chơi lần lượt các thẻ PhonicsCard lấy từ
// RoadmapSection.content; nếu admin chưa soạn nội dung riêng thì lấy bài dựng sẵn
// trong @/lib/phonics-lessons để bé vẫn có bài học tử tế.
//
// Thẻ "teach" chỉ để xem–nghe (không tính điểm); các thẻ còn lại tính điểm và
// điểm phần này = % số thẻ trả lời đúng ngay lần đầu.
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Volume2, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PassStatus } from "./pass-status";
import { playWord } from "@/lib/speech";
import { shuffle } from "@/lib/english";
import { emitDing } from "@/lib/ding-bus";
import { cn } from "@/lib/utils";
import {
  PHONICS_LESSONS,
  getPhonicsLesson,
  type PhonicsCard,
  type TeachCard,
  type ListenCard,
  type BlendCard,
  type DiscriminateCard,
} from "@/lib/phonics-lessons";

interface Props {
  title: string;
  /** RoadmapSection.content — xem `parsePhonicsContent` bên dưới. */
  content: unknown;
  closeHref: string;
  passThreshold: number;
  /** Ghi hoàn thành phần Ghép vần cho bài lộ trình (đánh dấu skillsDone, cộng XP). */
  onComplete: (stats: { correct: number; total: number; durationSec: number }) => Promise<{ ok: boolean }>;
}

const CARD_KINDS = ["teach", "listen", "blend", "rhyme", "discriminate"] as const;

/** Một âm do admin soạn — khớp `phonicsContentSchema` trong @/lib/roadmap-content. */
interface AuthoredSound {
  letters: string;
  sound?: string;
  hint?: string;
  words?: Array<{ word: string; meaning?: string; emoji?: string }>;
}

function readAuthoredSounds(raw: unknown): AuthoredSound[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((s) => {
    if (!s || typeof s !== "object") return [];
    const o = s as Record<string, unknown>;
    const letters = typeof o.letters === "string" ? o.letters.trim() : "";
    if (!letters) return [];
    const words = Array.isArray(o.words)
      ? o.words.flatMap((w) => {
          if (!w || typeof w !== "object") return [];
          const wo = w as Record<string, unknown>;
          const word = typeof wo.word === "string" ? wo.word.trim() : "";
          if (!word) return [];
          return [
            {
              word,
              meaning: typeof wo.meaning === "string" ? wo.meaning : "",
              emoji: typeof wo.emoji === "string" ? wo.emoji : "",
            },
          ];
        })
      : [];
    return [
      {
        letters,
        sound: typeof o.sound === "string" ? o.sound : "",
        hint: typeof o.hint === "string" ? o.hint : "",
        words,
      },
    ];
  });
}

/**
 * Dựng chuỗi thẻ chơi được từ danh sách âm admin soạn: mỗi âm cho một thẻ DẠY
 * (xem–nghe) và, khi có đủ âm khác làm phương án nhiễu, thêm một thẻ NGHE–CHỌN
 * để bé thực sự được luyện chứ không chỉ xem.
 */
function soundsToCards(sounds: AuthoredSound[]): PhonicsCard[] {
  const out: PhonicsCard[] = [];
  const allLetters = sounds.map((s) => s.letters);

  for (const s of sounds) {
    const sample = s.words?.[0];
    const word = sample?.word ?? s.letters;
    const meaning = sample?.meaning ?? "";
    const emoji = sample?.emoji || "🔤";

    const teachCard: TeachCard = {
      kind: "teach",
      category: "Âm mới",
      big: s.letters,
      sound: s.sound || `/${s.letters}/`,
      word,
      meaning,
      emoji,
      hint: s.hint ?? "",
    };
    out.push(teachCard);

    const distractors = allLetters.filter((l) => l !== s.letters).slice(0, 3);
    if (distractors.length >= 1 && sample) {
      const listenCard: ListenCard = {
        kind: "listen",
        prompt: "Nghe từ rồi chọn chữ tạo ra âm đầu nhé",
        word: sample.word,
        meaning,
        emoji,
        answer: s.letters,
        options: [s.letters, ...distractors],
      };
      out.push(listenCard);
    }
  }
  return out;
}

/**
 * Đọc nội dung phần Ghép vần. Chấp nhận 4 kiểu (dễ cho người soạn bài):
 *  1. `{ cards: [...] }` — thẻ tự soạn, đúng shape PhonicsCard.
 *  2. `{ sounds: [...] }` — shape của trình soạn bài (xem `phonicsContentSchema`),
 *     tự dựng thành thẻ dạy + thẻ nghe–chọn.
 *  3. `{ lessonId: "phonics-satpin" }` — dùng lại một bài dựng sẵn.
 *  4. rỗng / không hợp lệ — rơi về bài dựng sẵn đầu tiên để bé vẫn có bài học.
 * Viết tại chỗ (không thêm vào lib dùng chung) vì chỉ trình chơi này cần.
 */
function parsePhonicsContent(content: unknown): { title: string; cards: PhonicsCard[] } {
  const o = content && typeof content === "object" ? (content as Record<string, unknown>) : {};
  const title = typeof o.title === "string" ? o.title : "";

  const rawCards = Array.isArray(o.cards) ? o.cards : Array.isArray(content) ? content : [];
  const cards = rawCards.filter(
    (c): c is PhonicsCard =>
      !!c &&
      typeof c === "object" &&
      (CARD_KINDS as readonly string[]).includes(String((c as { kind?: unknown }).kind)),
  );
  if (cards.length > 0) return { title, cards };

  const authored = soundsToCards(readAuthoredSounds(o.sounds));
  if (authored.length > 0) return { title, cards: authored };

  const preset =
    (typeof o.lessonId === "string" ? getPhonicsLesson(o.lessonId) : undefined) ?? PHONICS_LESSONS[0];
  return { title: preset?.title ?? "", cards: preset?.cards ?? [] };
}

/** PRNG có hạt giống — xáo trộn đáp án ổn định giữa server và client (tránh lệch hydrate). */
function seededRandom(seed: number): () => number {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const isScored = (c: PhonicsCard) => c.kind !== "teach";

// ── Mảnh dựng dùng chung ─────────────────────────────────────────────────────

function SpeakButton({ text, label = "Nghe lại" }: { text: string; label?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={() => playWord({ word: text })}
    >
      <Volume2 className="h-5 w-5" /> {label}
    </Button>
  );
}

/** Nút chọn đáp án to, bo tròn — đủ lớn cho ngón tay trẻ nhỏ. */
function ChoiceButton({
  children,
  state,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  state: "idle" | "right" | "wrong" | "dim";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-3xl border-4 px-4 py-3 text-center transition-all duration-150 active:translate-y-[2px]",
        state === "idle" && "border-border bg-card hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft",
        // Phản hồi đúng/sai dùng .animate-correct / .animate-wrong dựng sẵn: nảy
        // xanh bạc hà khi đúng, rung hồng san hô khi sai — cả hai đã tự lo chế độ tối.
        state === "right" && "animate-correct",
        state === "wrong" && "animate-wrong",
        state === "dim" && "border-border/60 bg-card opacity-50",
      )}
    >
      {children}
    </button>
  );
}

// ── Trình chơi ───────────────────────────────────────────────────────────────

export function RoadmapPhonicsPlayer({ title, content, closeHref, passThreshold, onComplete }: Props) {
  const parsed = useMemo(() => parsePhonicsContent(content), [content]);
  const cards = parsed.cards;

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [stage, setStage] = useState<"play" | "done">("play");
  const [saving, setSaving] = useState(false);
  const startedAt = useRef(Date.now());
  const savedRef = useRef(false);

  const card = cards[index];
  const scoredTotal = useMemo(() => cards.filter(isScored).length, [cards]);
  const progress = cards.length > 0 ? Math.round((index / cards.length) * 100) : 0;

  async function finish(finalCorrect: number) {
    if (savedRef.current) return;
    savedRef.current = true;
    setSaving(true);
    const durationSec = Math.round((Date.now() - startedAt.current) / 1000);
    const res = await onComplete({
      correct: finalCorrect,
      total: Math.max(1, scoredTotal),
      durationSec,
    });
    setSaving(false);
    if (!res.ok) {
      savedRef.current = false;
      toast.error("Chưa lưu được kết quả, bé thử lại nhé");
      return;
    }
    emitDing(scoredTotal > 0 && finalCorrect / scoredTotal >= 0.8 ? "celebrate" : "complete");
    setStage("done");
  }

  function goNext(gained: number) {
    const nextCorrect = correctCount + gained;
    setCorrectCount(nextCorrect);
    setPicked(null);
    if (index < cards.length - 1) {
      setIndex((i) => i + 1);
    } else {
      void finish(nextCorrect);
    }
  }

  function restart() {
    savedRef.current = false;
    startedAt.current = Date.now();
    setCorrectCount(0);
    setPicked(null);
    setIndex(0);
    setStage("play");
  }

  if (cards.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <span className="text-6xl" aria-hidden>
          🔤
        </span>
        <h2 className="font-display text-xl font-extrabold">Phần Ghép vần chưa có nội dung</h2>
        <Link href={closeHref}>
          <Button variant="outline">Quay lại bài học</Button>
        </Link>
      </div>
    );
  }

  if (stage === "done") {
    const pct = scoredTotal > 0 ? Math.round((correctCount / scoredTotal) * 100) : 100;
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md rounded-3xl text-center">
          <CardContent className="space-y-4 px-6 pb-6 pt-8">
            <div className="animate-star-pop text-6xl" aria-hidden>
              {pct >= passThreshold ? "🌟" : "🌈"}
            </div>
            <h2 className="font-display text-2xl font-extrabold">Xong phần Ghép vần!</h2>
            <p className="text-[15px] text-muted-foreground">
              Bé đã học {cards.length} thẻ âm. Đọc trơn được từ mới là nhờ phần này đấy!
            </p>
            {scoredTotal > 0 && (
              <div className="flex flex-col items-center gap-2">
                <div className="text-gradient-sunny font-display text-4xl font-extrabold">{pct}%</div>
                <PassStatus score={pct} threshold={passThreshold} />
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={restart}>
                <RotateCcw className="mr-1.5 h-4 w-4" /> Chơi lại
              </Button>
              <Link href={closeHref} className="flex-1">
                <Button className="w-full">Quay lại bài học</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center gap-3">
        <Link href={closeHref} aria-label="Quay lại bài học" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <Progress value={progress} className="h-3 flex-1" />
        <span className="font-display text-sm font-extrabold tabular-nums text-muted-foreground">
          {index + 1}/{cards.length}
        </span>
      </div>

      <Card className="rounded-3xl">
        <CardContent className="space-y-5 p-5">
          {card.kind === "teach" && <TeachView card={card} onNext={() => goNext(0)} />}
          {card.kind === "listen" && (
            <QuizView
              key={index}
              seed={index}
              prompt={card.prompt}
              speakText={card.word}
              options={card.options.map((o) => ({ key: o, big: o }))}
              answer={card.answer}
              reveal={{ emoji: card.emoji, word: card.word, meaning: card.meaning }}
              picked={picked}
              onPick={setPicked}
              onNext={(ok) => goNext(ok ? 1 : 0)}
            />
          )}
          {card.kind === "blend" && (
            <BlendView
              key={index}
              seed={index}
              card={card}
              picked={picked}
              onPick={setPicked}
              onNext={(ok) => goNext(ok ? 1 : 0)}
            />
          )}
          {card.kind === "rhyme" && (
            <QuizView
              key={index}
              seed={index}
              prompt={card.prompt}
              speakText={card.base.word}
              header={
                <div className="flex flex-col items-center gap-1">
                  <span className="text-6xl" aria-hidden>
                    {card.base.emoji}
                  </span>
                  <span className="font-primer text-4xl font-bold">{card.base.word}</span>
                </div>
              }
              options={card.options.map((o) => ({ key: o.word, big: o.word, emoji: o.emoji }))}
              answer={card.answer}
              picked={picked}
              onPick={setPicked}
              onNext={(ok) => goNext(ok ? 1 : 0)}
            />
          )}
          {card.kind === "discriminate" && (
            <DiscriminateView
              key={index}
              seed={index}
              card={card}
              picked={picked}
              onPick={setPicked}
              onNext={(ok) => goNext(ok ? 1 : 0)}
            />
          )}

          {saving && <p className="text-center text-sm text-muted-foreground">Đang lưu kết quả…</p>}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        {parsed.title || title || "Ghép vần"}
      </p>
    </div>
  );
}

// ── Thẻ dạy âm ───────────────────────────────────────────────────────────────

function TeachView({ card, onNext }: { card: TeachCard; onNext: () => void }) {
  useEffect(() => {
    playWord({ word: card.word });
  }, [card.word]);

  return (
    <div className="space-y-5 text-center">
      <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{card.category}</div>

      <div className="writing-lines mx-auto flex h-40 w-full max-w-xs items-center justify-center rounded-3xl bg-muted/30">
        <span className="font-primer text-8xl font-bold leading-none text-primary">{card.big}</span>
      </div>

      <div className="font-display text-3xl font-extrabold text-primary">{card.sound}</div>

      <div className="flex items-center justify-center gap-3 rounded-3xl bg-muted/40 p-4">
        <span className="text-5xl" aria-hidden>
          {card.emoji}
        </span>
        <div className="text-left">
          <div className="font-primer text-3xl font-bold">{card.word}</div>
          <div className="text-sm font-semibold text-muted-foreground">{card.meaning}</div>
        </div>
      </div>

      {card.hint && <p className="text-[15px] leading-relaxed text-muted-foreground">💡 {card.hint}</p>}

      <div className="flex flex-col gap-2 sm:flex-row">
        <SpeakButton text={card.word} label="Nghe lại" />
        <Button size="lg" className="flex-1" onClick={onNext}>
          Tiếp tục <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

// ── Thẻ trắc nghiệm dùng chung (listen / rhyme) ──────────────────────────────

interface Choice {
  key: string;
  big: string;
  emoji?: string;
}

function QuizView({
  seed,
  prompt,
  speakText,
  header,
  options,
  answer,
  reveal,
  picked,
  onPick,
  onNext,
}: {
  seed: number;
  prompt: string;
  speakText: string;
  header?: React.ReactNode;
  options: Choice[];
  answer: string;
  reveal?: { emoji: string; word: string; meaning: string };
  picked: string | null;
  onPick: (v: string) => void;
  onNext: (ok: boolean) => void;
}) {
  // Xáo trộn MỘT lần khi thẻ xuất hiện (component được `key` theo chỉ số thẻ nên
  // mỗi thẻ là một lần mount mới) — tránh đảo lại vị trí đáp án sau khi bé chọn.
  const [shuffled] = useState(() => shuffle(options, seededRandom(seed)));

  // Đọc từ ngay khi thẻ hiện ra: bé chưa đọc thạo, phải nghe mới làm được bài.
  useEffect(() => {
    playWord({ word: speakText });
  }, [speakText]);

  const answered = picked !== null;
  const ok = picked === answer;

  return (
    <div className="space-y-5">
      <p className="text-center font-display text-lg font-extrabold">{prompt}</p>

      {header ?? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => playWord({ word: speakText })}
            aria-label="Nghe lại từ"
            className="btn-chunky flex h-24 w-24 items-center justify-center rounded-full bg-sunny text-sunny-foreground [--edge:hsl(var(--c-sun))]"
          >
            <Volume2 className="h-10 w-10" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {shuffled.map((o) => {
          const state = !answered
            ? "idle"
            : o.key === answer
              ? "right"
              : o.key === picked
                ? "wrong"
                : "dim";
          return (
            <ChoiceButton key={o.key} state={state} disabled={answered} onClick={() => onPick(o.key)}>
              {o.emoji && (
                <span className="text-4xl" aria-hidden>
                  {o.emoji}
                </span>
              )}
              <span className="font-primer text-3xl font-bold">{o.big}</span>
            </ChoiceButton>
          );
        })}
      </div>

      {answered && (
        <Feedback
          ok={ok}
          answer={answer}
          reveal={reveal}
          onNext={() => onNext(ok)}
        />
      )}
    </div>
  );
}

// ── Thẻ ghép âm thành từ ─────────────────────────────────────────────────────

function BlendView({
  seed,
  card,
  picked,
  onPick,
  onNext,
}: {
  seed: number;
  card: BlendCard;
  picked: string | null;
  onPick: (v: string) => void;
  onNext: (ok: boolean) => void;
}) {
  const [shuffled] = useState(() => shuffle(card.options, seededRandom(seed)));
  const answered = picked !== null;
  const ok = picked === card.answer;

  return (
    <div className="space-y-5">
      <p className="text-center font-display text-lg font-extrabold">{card.prompt}</p>

      {/* Từng âm — bấm vào để nghe lại từng mảnh */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {card.parts.map((p, i) => (
          <span key={`${p}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span className="text-2xl font-bold text-muted-foreground">–</span>}
            <button
              type="button"
              onClick={() => playWord({ word: p })}
              aria-label={`Nghe âm ${p}`}
              className="sticker flex h-16 w-16 items-center justify-center bg-card font-primer text-3xl font-bold text-primary"
            >
              {p}
            </button>
          </span>
        ))}
      </div>

      <div className="flex justify-center">
        <SpeakButton text={card.answer} label="Nghe từ ghép" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shuffled.map((w) => {
          const state = !answered ? "idle" : w === card.answer ? "right" : w === picked ? "wrong" : "dim";
          return (
            <ChoiceButton key={w} state={state} disabled={answered} onClick={() => onPick(w)}>
              <span className="font-primer text-3xl font-bold">{w}</span>
            </ChoiceButton>
          );
        })}
      </div>

      {answered && (
        <Feedback
          ok={ok}
          answer={card.answer}
          reveal={{ emoji: card.emoji, word: card.answer, meaning: card.meaning }}
          onNext={() => onNext(ok)}
        />
      )}
    </div>
  );
}

// ── Thẻ phân biệt hai âm dễ lẫn ──────────────────────────────────────────────

function DiscriminateView({
  seed,
  card,
  picked,
  onPick,
  onNext,
}: {
  seed: number;
  card: DiscriminateCard;
  picked: string | null;
  onPick: (v: string) => void;
  onNext: (ok: boolean) => void;
}) {
  // Chọn sẵn âm sẽ phát bằng PRNG có hạt giống → server và client ra cùng kết quả.
  const [played] = useState(() => (seededRandom(seed + 99)() < 0.5 ? card.a : card.b));

  useEffect(() => {
    playWord({ word: played.word });
  }, [played.word]);

  const answered = picked !== null;
  const ok = picked === played.sound;

  return (
    <div className="space-y-5">
      <p className="text-center font-display text-lg font-extrabold">{card.prompt}</p>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => playWord({ word: played.word })}
          aria-label="Nghe lại"
          className="btn-chunky flex h-24 w-24 items-center justify-center rounded-full bg-sunny text-sunny-foreground [--edge:hsl(var(--c-sun))]"
        >
          <Volume2 className="h-10 w-10" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[card.a, card.b].map((item) => {
          const state = !answered
            ? "idle"
            : item.sound === played.sound
              ? "right"
              : item.sound === picked
                ? "wrong"
                : "dim";
          return (
            <ChoiceButton key={item.sound} state={state} disabled={answered} onClick={() => onPick(item.sound)}>
              <span className="text-4xl" aria-hidden>
                {item.emoji}
              </span>
              <span className="font-display text-2xl font-extrabold text-primary">{item.sound}</span>
              <span className="font-primer text-lg">{item.word}</span>
            </ChoiceButton>
          );
        })}
      </div>

      {answered && (
        <Feedback
          ok={ok}
          answer={played.sound}
          reveal={{ emoji: played.emoji, word: played.word, meaning: played.meaning }}
          note={card.note}
          onNext={() => onNext(ok)}
        />
      )}
    </div>
  );
}

// ── Khối phản hồi: KHEN trước, rồi mới chỉ chỗ cần sửa ───────────────────────

function Feedback({
  ok,
  answer,
  reveal,
  note,
  onNext,
}: {
  ok: boolean;
  answer: string;
  reveal?: { emoji: string; word: string; meaning: string };
  note?: string;
  onNext: () => void;
}) {
  useEffect(() => {
    emitDing(ok ? "correct" : "wrong");
  }, [ok]);

  return (
    <div
      className={cn(
        "animate-pop-in space-y-3 rounded-3xl border-4 p-4",
        // Đúng → dải bạc hà viền xanh lá; chưa đúng → dải nắng viền mật ong (KHÔNG
        // dùng sắc đỏ: với trẻ, "gần đúng rồi" phải trông ấm áp chứ không báo động).
        // band-*/brand-* tự đổi theo chế độ tối nên bỏ hẳn cặp dark: thủ công.
        ok ? "border-brand-lime bg-band-mint" : "border-brand-honey bg-band-sun",
      )}
    >
      <div className="flex items-center gap-2 font-display text-lg font-extrabold">
        <span className="text-2xl" aria-hidden>
          {ok ? "🌟" : "🌈"}
        </span>
        {ok ? "Chính xác! Bé giỏi lắm." : `Gần đúng rồi! Đáp án là “${answer}”.`}
      </div>

      {reveal && (
        <div className="flex items-center gap-3 rounded-2xl bg-card/70 p-3">
          <span className="text-4xl" aria-hidden>
            {reveal.emoji}
          </span>
          <div>
            <div className="font-primer text-2xl font-bold">{reveal.word}</div>
            <div className="text-sm font-semibold text-muted-foreground">{reveal.meaning}</div>
          </div>
        </div>
      )}

      {note && <p className="text-[15px] leading-relaxed text-muted-foreground">💡 {note}</p>}

      <Button size="lg" className="w-full" onClick={onNext}>
        Tiếp tục <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
