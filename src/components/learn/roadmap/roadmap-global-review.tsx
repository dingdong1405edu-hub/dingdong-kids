"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewFlow } from "@/components/learn/vocab/review/review-flow";
import { persistRoadmapReview } from "@/lib/roadmap-review-persist";
import type { VocabWordCard, WordReviewState } from "@/types";

interface Props {
  words: VocabWordCard[];
  reviews: WordReviewState[];
  /** Nơi quay lại (trang map cấp đã vào, mặc định danh sách lộ trình). */
  backHref: string;
}

/** Số từ hiện trong dải "xem trước" trước khi bé bấm vào ôn. */
const PREVIEW_LIMIT = 8;

/**
 * Hub ôn tập tổng hợp cho LỘ TRÌNH: gom mọi từ vựng lộ trình đã đến hạn ôn (SRS)
 * về một phiên. Bản sao của GlobalReview (Luyện kỹ năng) nhưng ghi lịch vào
 * RoadmapWordReview (khoá theo `word`) và quay về trang lộ trình.
 */
export function RoadmapGlobalReview({ words, reviews, backHref }: Props) {
  const router = useRouter();
  const [started, setStarted] = useState(false);

  if (started && words.length > 0) {
    return (
      <ReviewFlow
        words={words}
        reviews={reviews}
        persist={persistRoadmapReview}
        reportable={false}
        title="Ôn lại từ đã học"
        onExit={() => router.push(backHref)}
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
        <ArrowLeft className="h-4 w-4" /> Quay lại lộ trình
      </Link>

      <Card className="rounded-3xl">
        <CardContent className="space-y-4 p-6 text-center">
          <div className="animate-float-y text-6xl" aria-hidden>
            🔁
          </div>
          <h1 className="font-display text-2xl font-extrabold">Ôn lại từ đã học</h1>

          {words.length > 0 ? (
            <>
              <p className="text-[15px] text-muted-foreground">
                Có <b className="text-foreground">{words.length} từ</b> đang chờ bé ôn. Ôn đúng lúc
                thì nhớ rất lâu đấy!
              </p>

              {/* Nhìn thấy trước những từ sắp gặp — bé hào hứng bấm vào hơn */}
              <div className="flex flex-wrap justify-center gap-2">
                {preview.map((w) => (
                  <span
                    key={w.id}
                    className="sticker bg-card px-3 py-1.5 font-primer text-base font-bold"
                  >
                    {w.word}
                  </span>
                ))}
                {hidden > 0 && (
                  <span className="flex items-center px-1 text-sm font-bold text-muted-foreground">
                    +{hidden} nữa
                  </span>
                )}
              </div>

              {/* <Button> đã có sẵn gờ 3D + bo tròn + phông Baloo — chỉ thêm bố cục */}
              <Button
                size="lg"
                className="w-full"
                onClick={() => setStarted(true)}
              >
                <Sparkles className="mr-1.5 h-5 w-5" /> Ôn {words.length} từ nào!
              </Button>
            </>
          ) : (
            <>
              <p className="text-[15px] text-muted-foreground">
                Bé ôn hết rồi, giỏi quá! 🌟 Học thêm từ mới ở các bài lộ trình, hệ thống sẽ tự nhắc
                bé ôn đúng lúc.
              </p>
              <Link href={backHref}>
                <Button variant="outline" className="w-full">
                  Quay lại lộ trình
                </Button>
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
