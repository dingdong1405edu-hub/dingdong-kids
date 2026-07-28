import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Library, Clock, ArrowRight } from "lucide-react";
import { cn, levelLabel, levelBadgeClass } from "@/lib/utils";
import { MATERIAL_CATEGORIES, categoryMeta } from "@/lib/materials";
import { DingCover } from "@/components/learn/ding-cover";
import { LEVELS } from "@/lib/roadmap";
import { EnglishLevel, MaterialCategory, Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Tài liệu",
  description: "Ghi chú ngữ pháp, từ vựng, ghép vần và mẹo thi Cambridge cho bé học tiếng Anh.",
};

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; cat?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const sp = await searchParams;
  const level = (LEVELS as readonly string[]).includes(sp.level ?? "")
    ? (sp.level as EnglishLevel)
    : undefined;
  const cat = MATERIAL_CATEGORIES.some((c) => c.value === sp.cat) ? (sp.cat as MaterialCategory) : undefined;

  const where: Prisma.MaterialWhereInput = { published: true };
  if (level) where.level = level;
  if (cat) where.category = cat;

  const materials = await db.material.findMany({
    where,
    orderBy: [{ level: "asc" }, { category: "asc" }, { order: "asc" }],
  });

  const qs = (next: { level?: string; cat?: string }) => {
    const params = new URLSearchParams();
    const l = next.level ?? sp.level;
    const c = next.cat ?? sp.cat;
    if (next.level !== "" && l) params.set("level", l);
    if (next.cat !== "" && c) params.set("cat", c);
    const s = params.toString();
    return s ? `/materials?${s}` : "/materials";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="hero-brand relative overflow-hidden rounded-3xl p-6 text-white shadow-soft-lg sm:p-8">
        <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[7rem] leading-none opacity-20">
          📚
        </span>
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/25">
              <Library className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Tài liệu</h1>
              <p className="text-[15px] text-white/85">
                Ghi chú ngữ pháp, từ vựng, ghép vần và mẹo thi Cambridge cho bé
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bộ lọc theo cấp Cambridge */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cấp độ</span>
          <FilterChip href={qs({ level: "" })} active={!level}>
            Tất cả
          </FilterChip>
          {LEVELS.map((l) => (
            <FilterChip key={l} href={qs({ level: l })} active={level === l}>
              {levelLabel(l)}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phân loại</span>
          <FilterChip href={qs({ cat: "" })} active={!cat}>
            Tất cả
          </FilterChip>
          {MATERIAL_CATEGORIES.map((c) => (
            <FilterChip key={c.value} href={qs({ cat: c.value })} active={cat === c.value}>
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Grid */}
      {materials.length === 0 ? (
        <div className="sticker rounded-3xl border-dashed py-16 text-center text-muted-foreground">
          <Library className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p>Chưa có tài liệu nào ở mục này. Bé thử chọn cấp độ khác nhé 🌟</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m) => {
            const meta = categoryMeta(m.category);
            const Icon = meta.icon;
            const tags = Array.isArray(m.tags) ? (m.tags as string[]) : [];
            return (
              <Link key={m.id} href={`/materials/${m.id}`} className="group">
                <article className="sticker flex h-full flex-col p-4 transition-all hover:-translate-y-1 hover:shadow-soft-lg">
                  {m.imageUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.imageUrl} alt={m.title} loading="lazy" className="mb-3 h-32 w-full rounded-xl object-cover" />
                    </>
                  ) : (
                    // Chưa có ảnh minh hoạ → hiện linh vật cho thẻ đỡ trống.
                    <DingCover className="mb-3 h-32 w-full rounded-2xl" seed={m.id} />
                  )}
                  <div className="flex items-center justify-between">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", meta.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", levelBadgeClass(m.level))}>
                      {levelLabel(m.level)}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-[17px] font-bold leading-snug text-foreground">{m.title}</h3>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-muted-foreground">{m.summary}</p>
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <span className="text-xs font-medium text-muted-foreground">{meta.label}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {m.readMinutes} phút
                      <ArrowRight className="ml-1 h-3.5 w-3.5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </div>
                  {tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterChip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3 py-1 text-sm font-medium transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
      )}
    >
      {children}
    </Link>
  );
}
