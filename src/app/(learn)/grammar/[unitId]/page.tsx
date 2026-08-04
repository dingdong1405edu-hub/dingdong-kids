import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Repeat, BookOpen, FileDown, Lock, ClipboardCheck } from "lucide-react";
import { grammarItemCount, grammarTestCount } from "@/lib/grammar";

interface Props {
  params: Promise<{ unitId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { unitId } = await params;
  const u = await db.grammarUnit.findUnique({
    where: { id: unitId },
    select: { title: true, theme: true },
  });
  if (!u) return { title: "Ngữ pháp" };
  return {
    title: u.title,
    description: `Ngữ pháp tiếng Anh cho bé${u.theme ? ` · ${u.theme}` : ""} — học rồi luyện ngay từng bước.`,
  };
}

export default async function GrammarUnitPage({ params }: Props) {
  const { unitId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const unit = await db.grammarUnit.findUnique({
    where: { id: unitId },
    include: {
      lessons: {
        where: { published: true }, // ẩn bài nháp khỏi học viên
        orderBy: { order: "asc" },
        include: { progress: { where: { userId: session.user.id } } },
      },
    },
  });
  if (!unit || !unit.published) notFound(); // ẩn unit nháp khỏi học viên

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">{unit.title}</h1>
          {unit.theme && <p className="font-primer text-muted-foreground">{unit.theme}</p>}
        </div>
        <Link href={`/grammar/${unitId}/review`} className="shrink-0">
          <Button variant="outline" size="sm" className="gap-1.5 border-brand-grape text-brand-grape">
            <Repeat className="h-4 w-4" /> Ôn cả chủ đề
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {unit.lessons.map((lesson, idx) => {
          const started = lesson.progress.length > 0;
          const done = started && lesson.progress[0].completed;
          const prevDone =
            idx === 0 ||
            (unit.lessons[idx - 1].progress.length > 0 && unit.lessons[idx - 1].progress[0].completed);
          const available = idx === 0 || prevDone;
          // "Học" label: Bắt đầu (mới) · Học tiếp (đang dở) · Học lại (đã xong).
          const studyLabel = done ? "Học lại" : started ? "Học tiếp" : "Bắt đầu";
          const base = `/grammar/${unitId}/lesson/${lesson.id}`;
          const hasTest = grammarTestCount(lesson.exercises) > 0;
          return (
            <Card key={lesson.id} className={`sticker ${!available ? "opacity-60" : ""}`}>
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl font-bold ${
                      done
                        ? "bg-band-mint text-brand-teal"
                        : available
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-5 w-5" /> : available ? idx + 1 : <Lock className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold">{lesson.title || `Bài ${idx + 1}`}</div>
                    <div className="text-xs text-muted-foreground">
                      {grammarItemCount(lesson.exercises)} bài tập
                    </div>
                  </div>
                </div>

                {available ? (
                  <div className="flex flex-wrap gap-2">
                    <Link href={base}>
                      <Button size="sm" variant={done ? "outline" : "default"} className={`gap-1.5 ${done ? "" : "btn-chunky"}`}>
                        <BookOpen className="h-4 w-4" /> {studyLabel}
                      </Button>
                    </Link>
                    <Link href={`${base}/review`}>
                      <Button size="sm" variant="outline" className="gap-1.5 border-brand-grape text-brand-grape">
                        <Repeat className="h-4 w-4" /> Ôn tập
                      </Button>
                    </Link>
                    {hasTest && (
                      <Link href={`${base}/test`}>
                        <Button size="sm" variant="outline" className="gap-1.5 border-brand-yellow text-brand-gold">
                          <ClipboardCheck className="h-4 w-4" /> Kiểm tra
                        </Button>
                      </Link>
                    )}
                    <Button asChild size="sm" variant="ghost" className="gap-1.5 text-muted-foreground">
                      <Link href={`/grammar-pdf/${unitId}/${lesson.id}`}>
                        <FileDown className="h-4 w-4" /> Tải PDF
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Bé học xong bài trước là bài này mở ra nhé 🔓</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
