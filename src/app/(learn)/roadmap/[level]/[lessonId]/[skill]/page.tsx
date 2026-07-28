import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileDown } from "lucide-react";
import { Skill } from "@prisma/client";
import { slugToLevel, SKILL_META, type SkillKey } from "@/lib/roadmap";
import { getEntitlements, isRoadmapLessonLocked } from "@/lib/entitlements";
import { buildRoadmapVocabCards } from "@/lib/roadmap-content";
import { RoadmapSectionPlayer } from "@/components/learn/roadmap/roadmap-section-player";
import type { WordReviewState } from "@/types";

interface Props {
  params: Promise<{ level: string; lessonId: string; skill: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { skill: skillSlug } = await params;
  const meta = SKILL_META.find((m) => m.key === (skillSlug.toUpperCase() as SkillKey));
  return {
    title: meta ? `${meta.label} · Lộ trình` : "Lộ trình",
    description: "Bài học tiếng Anh cho bé trong lộ trình Cambridge của DingDong Kids.",
  };
}

const SKILL_KEYS = SKILL_META.map((m) => m.key);

export default async function RoadmapSectionPlayPage({ params }: Props) {
  const { level: slug, lessonId, skill: skillSlug } = await params;
  const level = slugToLevel(slug);
  if (!level) notFound();
  const skillKey = skillSlug.toUpperCase() as SkillKey;
  if (!SKILL_KEYS.includes(skillKey)) notFound();

  const session = await auth();
  if (!session?.user) redirect("/login");
  const userId = session.user.id;
  const ent = await getEntitlements(userId, (session.user as { role?: string }).role);

  const section = await db.roadmapSection.findUnique({
    where: { lessonId_skill: { lessonId, skill: skillKey as Skill } },
    include: { lesson: { include: { course: true } } },
  });
  if (!section || !section.published) notFound();
  const { lesson } = section;
  if (lesson.course.level !== level || !lesson.course.published) notFound();

  // Khoá theo gói: người miễn phí chỉ mở FREE_ROADMAP_LESSONS bài đầu mỗi cấp.
  const lessonIndex = await db.roadmapLesson.count({
    where: { courseId: lesson.courseId, order: { lt: lesson.order } },
  });
  if (isRoadmapLessonLocked(ent, level, lessonIndex)) redirect(`/roadmap/${slug}`);

  const meta = SKILL_META.find((m) => m.key === skillKey)!;
  const backHref = `/roadmap/${slug}`;
  // Từ vựng/Ghép vần/Ngữ pháp/Đọc/Nghe đã có nút thoát riêng; Viết/Nói thì cần thanh quay lại.
  const showHeader = skillKey === "WRITING" || skillKey === "SPEAKING";

  // Từ vựng: nạp lịch lặp lại ngắt quãng (RoadmapWordReview, khoá theo từ) cho
  // các từ của phần + trạng thái đã-hoàn-thành để mở thẳng tab "Ôn từ".
  let vocabReviews: WordReviewState[] = [];
  let vocabCompleted = false;
  if (skillKey === "VOCAB") {
    const cards = buildRoadmapVocabCards(section.id, section.content);
    const wordList = cards.map((c) => c.word);
    const [rows, progress] = await Promise.all([
      wordList.length
        ? db.roadmapWordReview.findMany({
            where: { userId, word: { in: wordList } },
            select: { word: true, dueAt: true, repetitions: true },
          })
        : Promise.resolve([]),
      db.roadmapProgress.findUnique({
        where: { userId_lessonId: { userId, lessonId: lesson.id } },
        select: { skillsDone: true },
      }),
    ]);
    const byWord = new Map(rows.map((r) => [r.word, r]));
    vocabReviews = cards.flatMap((c) => {
      const r = byWord.get(c.word);
      return r ? [{ wordId: c.id, dueAt: r.dueAt.toISOString(), repetitions: r.repetitions }] : [];
    });
    const rawSkillsDone = progress?.skillsDone;
    const skillsDone = Array.isArray(rawSkillsDone)
      ? rawSkillsDone.filter((x): x is string => typeof x === "string")
      : [];
    vocabCompleted = skillsDone.includes("VOCAB");
  }

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại bài học
          </Link>
          <span className="text-sm text-muted-foreground">
            · {meta.label} · {lesson.topic}
          </span>
          <Link
            href={`/roadmap-pdf/${lessonId}/${skillKey.toLowerCase()}`}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <FileDown className="h-4 w-4" /> Tải PDF
          </Link>
        </div>
      )}
      <RoadmapSectionPlayer
        skill={skillKey}
        lessonId={lesson.id}
        sectionId={section.id}
        level={lesson.course.level}
        title={lesson.topic}
        content={section.content}
        backHref={backHref}
        vocabReviews={vocabReviews}
        vocabCompleted={vocabCompleted}
      />
    </div>
  );
}
