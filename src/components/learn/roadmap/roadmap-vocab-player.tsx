"use client";
import { useMemo, useState } from "react";
import { BookOpen, Sparkles, Play, ArrowLeft, Ear } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { isDue } from "@/lib/srs";
import { playWord, primeSpeech } from "@/lib/speech";
import { WordFlow } from "@/components/learn/vocab/word-flow";
import { ListenRepeatFlow } from "@/components/learn/vocab/listen-repeat-flow";
import { WordVisual } from "@/components/learn/vocab/word-visual";
import { ReviewFlow } from "@/components/learn/vocab/review/review-flow";
import { persistRoadmapReview } from "@/lib/roadmap-review-persist";
import type { VocabWordCard, WordReviewState } from "@/types";

interface Props {
  sectionId: string;
  title: string;
  words: VocabWordCard[];
  /** Trạng thái SRS đã lưu (RoadmapWordReview) cho các từ của phần này. */
  reviews: WordReviewState[];
  /** Phần Từ vựng đã hoàn thành (Học từ) → mở thẳng tab Ôn từ. */
  completed: boolean;
  passThreshold: number;
  backHref: string;
  /**
   * Cấp nhỏ (Pre-Starters / Starters) → mở sẵn mức "Nghe & nhắc lại" thay vì
   * "Học từ". Bé 4–6 tuổi chưa đọc được nên phải nghe – nói trước, ghép chữ sau.
   */
  simpleFirst?: boolean;
  /** Ghi hoàn thành phần Từ vựng cho bài lộ trình (cộng XP, đánh dấu skillsDone). */
  onComplete: (stats: {
    correct: number;
    total: number;
    durationSec: number;
  }) => Promise<{ ok: boolean; xpEarned?: number }>;
}

type View = "menu" | "listen" | "learn" | "review";

/** Số thẻ từ hiện trong ô "xem trước" — đủ để bé tò mò, không rối mắt. */
const PREVIEW_LIMIT = 6;

/**
 * Trình chơi phần Từ vựng của một bài LỘ TRÌNH — bản sao cấu trúc của LessonHub ở
 * Luyện kỹ năng: 2 chế độ dạng tab "Học từ" (WordFlow) và "Ôn từ" (flashcard lặp
 * lại ngắt quãng + mini-game). Khác biệt: Học từ ghi hoàn thành phần lộ trình
 * (onComplete), còn Ôn từ ghi lịch SRS vào RoadmapWordReview (khoá theo `word`).
 */
export function RoadmapVocabPlayer({
  sectionId,
  title,
  words,
  reviews,
  completed,
  passThreshold,
  backHref,
  simpleFirst = false,
  onComplete,
}: Props) {
  const [view, setView] = useState<View>("menu");

  const dueCount = useMemo(() => {
    const now = new Date();
    const byId = new Map(reviews.map((r) => [r.wordId, r]));
    return words.filter((w) => isDue(byId.get(w.id)?.dueAt ?? null, now)).length;
  }, [words, reviews]);

  if (view === "listen") {
    return (
      <ListenRepeatFlow
        title={title}
        words={words}
        seed={sectionId}
        onExit={() => setView("menu")}
        onNextLevel={() => setView("learn")}
        onComplete={onComplete}
      />
    );
  }

  if (view === "learn") {
    return (
      <WordFlow
        lesson={{ id: `roadmap:${sectionId}`, title }}
        words={words}
        unitId=""
        disablePositionSave
        passThreshold={passThreshold}
        onExit={() => setView("menu")}
        onReviewNow={() => setView("review")}
        onComplete={onComplete}
      />
    );
  }

  if (view === "review") {
    return (
      <ReviewFlow
        words={words}
        reviews={reviews}
        persist={persistRoadmapReview}
        reportable={false}
        onExit={() => setView("menu")}
      />
    );
  }

  const preview = words.slice(0, PREVIEW_LIMIT);
  const hidden = words.length - preview.length;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại bài học
      </Link>

      <div className="flex items-center gap-3">
        <span className="text-4xl" aria-hidden>
          🧺
        </span>
        <div>
          <h1 className="font-display text-2xl font-extrabold leading-tight">{title || "Từ vựng"}</h1>
          <p className="text-sm font-semibold text-muted-foreground">
            {words.length} từ mới đang chờ bé khám phá
          </p>
        </div>
      </div>

      {/* Xem trước các từ — bấm vào để nghe ngay, chưa cần vào bài */}
      {preview.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {preview.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => { primeSpeech(); playWord({ word: w.word, audioUrl: w.audioUrl }); }}
              aria-label={`Nghe từ ${w.word}`}
              className="sticker flex items-center gap-2 bg-card px-3 py-2 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg">
                <WordVisual word={w} emojiClass="text-2xl" />
              </span>
              <span className="font-primer text-lg font-bold">{w.word}</span>
            </button>
          ))}
          {hidden > 0 && (
            <span className="flex items-center px-2 text-sm font-bold text-muted-foreground">
              +{hidden} từ nữa
            </span>
          )}
        </div>
      )}

      <Tabs
        defaultValue={completed ? "review" : simpleFirst ? "listen" : "learn"}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 rounded-2xl">
          {/* Nhãn RÚT GỌN trên màn hẹp: "Nghe & nhắc lại" trong ô ~100px ở máy
              320px sẽ tràn/xuống dòng xấu. Từ sm trở lên mới hiện đủ chữ. */}
          <TabsTrigger value="listen" className="min-w-0 rounded-xl font-display text-[13px] font-extrabold">
            <Ear className="mr-1 h-4 w-4 shrink-0" />
            <span className="truncate sm:hidden">Nghe</span>
            <span className="hidden truncate sm:inline">Nghe &amp; nhắc lại</span>
          </TabsTrigger>
          <TabsTrigger value="learn" className="min-w-0 rounded-xl font-display text-[13px] font-extrabold">
            <BookOpen className="mr-1 h-4 w-4 shrink-0" />
            <span className="truncate">Học từ</span>
          </TabsTrigger>
          <TabsTrigger value="review" className="min-w-0 rounded-xl font-display text-[13px] font-extrabold">
            <Sparkles className="mr-1 h-4 w-4 shrink-0" />
            <span className="truncate">Ôn từ</span>
          </TabsTrigger>
        </TabsList>

        {/* NGHE & NHẮC LẠI — mức dễ nhất, không chấm điểm */}
        <TabsContent value="listen">
          <Card className="rounded-3xl">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sunny/20 text-2xl">
                  <span aria-hidden>👂</span>
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold">
                    Nghe rồi nói theo
                    {/* Huy hiệu độ khó: dải bạc hà + chữ xanh ngọc, tự đổi theo chế độ tối */}
                    <span className="ml-2 rounded-full bg-band-mint px-2 py-0.5 align-middle text-[11px] font-extrabold text-brand-teal">
                      Dễ nhất
                    </span>
                  </div>
                  <p className="text-[15px] text-muted-foreground">
                    Làm quen mặt từ rồi chơi <b>2 trò chơi</b> bốc từ 8 trò: ấp trứng,
                    câu cá, ú oà, xây tháp, chích bong bóng… Mỗi bài một bộ khác nhau.
                    Chưa cần ghép chữ, không chấm sai bao giờ.
                  </p>
                </div>
              </div>

              {words.length === 0 ? (
                <p className="rounded-2xl border-2 border-dashed py-6 text-center text-[15px] text-muted-foreground">
                  Phần này cô đang soạn từ vựng — bé quay lại sau nhé ✨
                </p>
              ) : (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => { primeSpeech(); setView("listen"); }}
                >
                  <Play className="mr-1.5 h-5 w-5" /> Bắt đầu nghe
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* HỌC TỪ */}
        <TabsContent value="learn">
          <Card className="rounded-3xl">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                  <span aria-hidden>🖼️</span>
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold">
                    Học {words.length} từ mới
                    {/* Huy hiệu độ khó mức giữa — dải trời xanh cho khác hẳn mức "Dễ nhất" */}
                    <span className="ml-2 rounded-full bg-band-sky px-2 py-0.5 align-middle text-[11px] font-extrabold text-brand-sky">
                      Vừa
                    </span>
                  </div>
                  <p className="text-[15px] text-muted-foreground">
                    Xem thẻ từ đầy đủ: ảnh, phiên âm, nghĩa và câu ví dụ — rồi ôn nhanh bằng
                    thẻ lật.
                  </p>
                </div>
              </div>

              {words.length === 0 ? (
                <p className="rounded-2xl border-2 border-dashed py-6 text-center text-[15px] text-muted-foreground">
                  Phần này cô đang soạn từ vựng — bé quay lại sau nhé ✨
                </p>
              ) : (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => { primeSpeech(); setView("learn"); }}
                >
                  <Play className="mr-1.5 h-5 w-5" /> {completed ? "Học lại" : "Bắt đầu học"}
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ÔN TỪ */}
        <TabsContent value="review">
          <Card className="rounded-3xl">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-band-sun text-2xl">
                  <span aria-hidden>🔁</span>
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold">Ôn từ bằng thẻ &amp; trò chơi</div>
                  <p className="text-[15px] text-muted-foreground">
                    Hệ thống nhớ giúp bé: từ nào sắp quên sẽ tự hiện lên để bé ôn đúng lúc.
                  </p>
                </div>
              </div>

              {words.length === 0 ? (
                <p className="rounded-2xl border-2 border-dashed py-6 text-center text-[15px] text-muted-foreground">
                  Chưa có từ nào để ôn. Bé học phần Từ vựng trước nhé!
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                    {dueCount > 0 ? (
                      <span className="inline-flex items-center rounded-full bg-band-sun px-3 py-1 font-extrabold text-brand-gold">
                        {dueCount} từ đang chờ bé ôn
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Chưa tới hạn ôn — bé vẫn ôn sớm được để nhớ lâu hơn.
                      </span>
                    )}
                    <span className="text-muted-foreground">/ {words.length} từ</span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => { primeSpeech(); setView("review"); }}
                  >
                    <Sparkles className="mr-1.5 h-5 w-5" />
                    {dueCount > 0 ? "Bắt đầu ôn" : "Ôn sớm"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
