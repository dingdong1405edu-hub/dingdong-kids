"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, RotateCcw, Play, CheckCircle2, Ear } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { isDue } from "@/lib/srs";
import { primeSpeech } from "@/lib/speech";
import { WordFlow } from "./word-flow";
import { ListenRepeatFlow } from "./listen-repeat-flow";
import { ReviewFlow } from "./review/review-flow";
import type { VocabWordCard, WordReviewState } from "@/types";

interface Props {
  lesson: { id: string; title: string };
  unitId: string;
  words: VocabWordCard[];
  reviews: WordReviewState[];
  /** Vị trí học dở (cho "Học tiếp"). null = chưa có / đã hoàn thành. */
  resume: { wordIndex: number; step: number } | null;
  completed: boolean;
  nextLessonId: string | null;
}

type View = "menu" | "listen" | "learn" | "review";

/**
 * Trang vào một bài từ vựng: 3 mức khó tăng dần dưới dạng tab —
 *  1. "Nghe & nhắc lại": nhìn hình, nghe, nói theo. Không chấm điểm. Dành cho bé
 *     chưa đọc được chữ.
 *  2. "Học từ": thẻ từ đầy đủ (phiên âm, nghĩa, ví dụ), có Học tiếp/Học lại.
 *  3. "Ôn từ": flashcard lặp lại ngắt quãng + mini-game.
 * Chọn mức → mở luồng tương ứng toàn màn hình, thoát thì quay lại menu này.
 */
export function LessonHub({ lesson, unitId, words, reviews, resume, completed, nextLessonId }: Props) {
  const [view, setView] = useState<View>("menu");
  const [learnStart, setLearnStart] = useState<{ index: number; step: number }>({ index: 0, step: 0 });

  const { dueCount } = useMemo(() => {
    const now = new Date();
    const byId = new Map(reviews.map((r) => [r.wordId, r]));
    const due = words.filter((w) => isDue(byId.get(w.id)?.dueAt ?? null, now)).length;
    return { dueCount: due };
  }, [words, reviews]);

  if (view === "listen") {
    return (
      <ListenRepeatFlow
        title={lesson.title}
        words={words}
        seed={lesson.id}
        onExit={() => setView("menu")}
        onNextLevel={() => setView("learn")}
      />
    );
  }

  if (view === "learn") {
    return (
      <WordFlow
        lesson={lesson}
        words={words}
        unitId={unitId}
        startIndex={learnStart.index}
        startStep={learnStart.step}
        nextLessonId={nextLessonId}
        onExit={() => setView("menu")}
        onReviewNow={() => setView("review")}
      />
    );
  }

  if (view === "review") {
    return <ReviewFlow words={words} reviews={reviews} onExit={() => setView("menu")} />;
  }

  const startLearn = (index: number, step: number) => {
    setLearnStart({ index, step });
    setView("learn");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        href={`/vocab/${unitId}`}
        className="inline-flex items-center gap-1.5 text-sm font-extrabold text-muted-foreground transition-colors hover:text-brand-gold"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách bài
      </Link>

      <div className="flex items-center gap-2">
        <h1 className="font-display text-2xl font-extrabold">{lesson.title || "Từ vựng"}</h1>
        {completed && (
          <span className="inline-flex items-center gap-1 rounded-full bg-band-mint px-3 py-1 text-xs font-extrabold text-brand-teal">
            <CheckCircle2 className="h-3.5 w-3.5" /> Đã học
          </span>
        )}
      </div>

      <Tabs defaultValue={completed ? "review" : "listen"} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="listen" className="min-w-0 text-[13px]">
            <Ear className="mr-1 h-4 w-4 shrink-0" />
            <span className="truncate sm:hidden">Nghe</span>
            <span className="hidden truncate sm:inline">Nghe &amp; nhắc lại</span>
          </TabsTrigger>
          <TabsTrigger value="learn" className="text-[13px]">
            <BookOpen className="mr-1 h-4 w-4" /> Học từ
          </TabsTrigger>
          <TabsTrigger value="review" className="text-[13px]">
            <Sparkles className="mr-1 h-4 w-4" /> Ôn từ
          </TabsTrigger>
        </TabsList>

        {/* NGHE & NHẮC LẠI — mức dễ nhất, không chấm điểm */}
        <TabsContent value="listen">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-band-sun text-3xl">
                  <span aria-hidden>👂</span>
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold">
                    Nghe rồi nói theo
                    <span className="ml-2 rounded-full bg-band-mint px-2.5 py-0.5 align-middle text-[11px] font-extrabold text-brand-teal">
                      Dễ nhất
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nhìn hình, nghe từ rồi nói theo. Chưa cần ghép chữ, không chấm điểm.
                  </p>
                </div>
              </div>
              {words.length === 0 ? (
                <p className="rounded-xl border-2 border-dashed border-border py-6 text-center text-sm font-semibold text-muted-foreground">
                  Bài này chưa có từ vựng.
                </p>
              ) : (
                <Button className="w-full" onClick={() => { primeSpeech(); setView("listen"); }}>
                  <Play className="mr-1.5 h-5 w-5" /> Bắt đầu nghe
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* HỌC TỪ */}
        <TabsContent value="learn">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-band-sky text-brand-blue">
                  <BookOpen className="h-7 w-7" />
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold">Học {words.length} từ</div>
                  <p className="text-sm text-muted-foreground">
                    Xem nghĩa &amp; nghe → tập viết từng nét → ôn nhanh bằng flashcard.
                  </p>
                </div>
              </div>

              {words.length === 0 ? (
                <p className="rounded-xl border-2 border-dashed border-border py-6 text-center text-sm font-semibold text-muted-foreground">
                  Bài này chưa có từ vựng.
                </p>
              ) : resume ? (
                <div className="space-y-3">
                  <p className="rounded-xl bg-band-sun px-4 py-2.5 text-sm font-semibold text-foreground">
                    Bạn đang học dở ở <b>từ {Math.min(resume.wordIndex + 1, words.length)}</b>.
                  </p>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => startLearn(resume.wordIndex, resume.step)}>
                      <Play className="mr-1.5 h-5 w-5" /> Học tiếp
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => startLearn(0, 0)}>
                      <RotateCcw className="mr-1.5 h-5 w-5" /> Học lại
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => startLearn(0, 0)}>
                    <Play className="mr-1.5 h-5 w-5" /> {completed ? "Học lại" : "Bắt đầu học"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ÔN TỪ */}
        <TabsContent value="review">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-band-lav text-brand-grape">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold">
                    Ôn từ bằng flashcard &amp; mini-game
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lặp lại ngắt quãng (SRS): hệ thống tự xếp lịch ôn theo trí nhớ của bạn.
                  </p>
                </div>
              </div>

              {words.length === 0 ? (
                <p className="rounded-xl border-2 border-dashed border-border py-6 text-center text-sm font-semibold text-muted-foreground">
                  Bài này chưa có từ để ôn.
                </p>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    {dueCount > 0 ? (
                      <span className="inline-flex items-center rounded-full bg-band-yel px-3 py-1 font-extrabold text-brand-gold">
                        {dueCount} từ đến hạn ôn
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Không có từ đến hạn — có thể ôn sớm để nhớ lâu hơn.
                      </span>
                    )}
                    <span className="text-muted-foreground">/ {words.length} từ</span>
                  </div>
                  <Button className="w-full" onClick={() => { primeSpeech(); setView("review"); }}>
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
