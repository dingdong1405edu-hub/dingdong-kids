import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileDown } from "lucide-react";

interface Props {
  params: Promise<{ unitId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { unitId } = await params;
  const u = await db.vocabUnit.findUnique({
    where: { id: unitId },
    select: { title: true, theme: true },
  });
  if (!u) return { title: "Từ vựng" };
  return {
    title: u.title,
    description: `Chủ đề từ vựng tiếng Anh cho bé${u.theme ? ` · ${u.theme}` : ""} — học qua tranh và tiếng đọc.`,
  };
}

export default async function VocabUnitPage({ params }: Props) {
  const { unitId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const unit = await db.vocabUnit.findUnique({
    where: { id: unitId },
    include: {
      lessons: {
        where: { published: true }, // ẩn bài nháp khỏi học viên
        orderBy: { order: "asc" },
        include: {
          progress: { where: { userId: session.user.id } },
          _count: { select: { words: true } },
        },
      },
    },
  });
  if (!unit || !unit.published) notFound(); // ẩn unit nháp khỏi học viên

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-3xl font-extrabold">{unit.title}</h1>
        {unit.theme && (
          <p className="font-primer text-lg text-muted-foreground">{unit.theme}</p>
        )}
      </div>
      <div className="space-y-3">
        {unit.lessons.map((lesson, idx) => {
          const done = lesson.progress.length > 0 && lesson.progress[0].completed;
          return (
            <Card key={lesson.id} className="sticker transition-transform duration-200 ease-toy hover:-translate-y-1">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Số thứ tự / dấu tích: bài đã xong mang khối bạc hà, bài chưa
                      học mang khối nắng — bé nhìn màu là biết, không cần đọc. */}
                  <div
                    className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center font-display text-xl font-extrabold ${
                      done ? "bg-band-mint text-brand-teal" : "bg-band-sun text-brand-gold"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-7 w-7" /> : idx + 1}
                  </div>
                  <div>
                    <div className="font-display text-lg font-extrabold">
                      {lesson.title || `Bài ${idx + 1}`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {lesson._count.words} từ mới
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link href={`/vocab/${unitId}/lesson/${lesson.id}`}>
                    <Button size="sm" variant={done ? "outline" : "default"}>
                      {done ? "Ôn lại" : "Bắt đầu"}
                    </Button>
                  </Link>
                  <Button asChild size="sm" variant="ghost" className="gap-1.5 text-muted-foreground">
                    <Link href={`/vocab-pdf/${unitId}/${lesson.id}`}>
                      <FileDown className="h-4 w-4" /> PDF
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
