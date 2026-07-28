import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { cn, levelLabel, levelBadgeClass } from "@/lib/utils";
import { categoryMeta, type MaterialBlock } from "@/lib/materials";
import { MaterialContent } from "@/components/learn/material-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ materialId: string }>;
}): Promise<Metadata> {
  const { materialId } = await params;
  const m = await db.material.findUnique({
    where: { id: materialId },
    select: { title: true, summary: true, published: true },
  });
  if (!m || !m.published) return { title: "Tài liệu" };
  return { title: m.title, description: m.summary.slice(0, 160) };
}

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { materialId } = await params;
  const material = await db.material.findUnique({ where: { id: materialId } });
  if (!material || !material.published) notFound();

  const meta = categoryMeta(material.category);
  const Icon = meta.icon;
  const blocks = (Array.isArray(material.content) ? material.content : []) as unknown as MaterialBlock[];
  const tags = Array.isArray(material.tags) ? (material.tags as string[]) : [];

  const related = await db.material.findMany({
    where: { published: true, category: material.category, id: { not: material.id } },
    orderBy: [{ level: "asc" }, { order: "asc" }],
    take: 4,
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/materials"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Tất cả tài liệu
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", meta.color)}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">{meta.label}</span>
          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", levelBadgeClass(material.level))}>
            {levelLabel(material.level)}
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{material.title}</h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground">{material.summary}</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> {material.readMinutes} phút đọc
        </div>
      </header>

      {/* Body */}
      <article className="sticker p-5 sm:p-7">
        {blocks.length > 0 ? (
          <MaterialContent blocks={blocks} />
        ) : (
          <p className="text-sm text-muted-foreground">Nội dung đang được cô chuẩn bị, bé quay lại sau nhé 🌟</p>
        )}
      </article>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Tài liệu liên quan
          </h2>
          <div className="divide-y rounded-2xl border">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/materials/${r.id}`}
                className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted/30"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{r.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.summary}</div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
