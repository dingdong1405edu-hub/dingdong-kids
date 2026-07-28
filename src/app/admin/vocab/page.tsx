import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdminActor } from "@/lib/admin-guard";
import { logAudit } from "@/lib/audit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/image-upload";
import { levelLabel } from "@/lib/utils";
import { LEVELS, themeFor } from "@/lib/roadmap";
import { EnglishLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import { db as prisma } from "@/lib/db";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { ReorderList, type ReorderItem } from "@/components/admin/reorder-list";
import { updateUnitAction } from "@/server/actions/admin";

async function createUnitAction(fd: FormData) {
  "use server";
  const { actor } = await requireAdminActor();
  const level = fd.get("level") as EnglishLevel;
  const count = await prisma.vocabUnit.count({ where: { level } });
  const created = await prisma.vocabUnit.create({
    data: {
      title: fd.get("title") as string,
      theme: (fd.get("theme") as string) || "",
      level,
      imageUrl: (fd.get("imageUrl") as string) || undefined,
      order: count + 1,
      published: false,
    },
  });
  await logAudit({
    actor,
    action: "CREATE",
    entity: "VocabUnit",
    entityId: created.id,
    summary: `Tạo unit từ vựng «${created.title}»`,
    after: created,
  });
  revalidatePath("/admin/vocab");
}

async function deleteUnitAction(id: string) {
  "use server";
  const { actor } = await requireAdminActor();
  const deleted = await prisma.vocabUnit.delete({ where: { id } });
  await logAudit({
    actor,
    action: "DELETE",
    entity: "VocabUnit",
    entityId: deleted.id,
    summary: `Xóa unit từ vựng «${deleted.title}»`,
    before: deleted,
  });
  revalidatePath("/admin/vocab");
}

export default async function AdminVocabPage() {
  const units = await db.vocabUnit.findMany({
    orderBy: [{ level: "asc" }, { order: "asc" }],
    include: { _count: { select: { lessons: true } } },
  });

  // Reorder is scoped per level → group units by level, one ReorderList each.
  const byLevel = new Map<EnglishLevel, typeof units>();
  for (const u of units) {
    if (!byLevel.has(u.level)) byLevel.set(u.level, []);
    byLevel.get(u.level)!.push(u);
  }
  const levels = [...byLevel.keys()];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Từ vựng — Units</h1>
      <Card>
        <CardHeader><CardTitle className="text-base"><Plus className="h-4 w-4 inline mr-2" />Thêm unit</CardTitle></CardHeader>
        <CardContent>
          <form action={createUnitAction} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div className="space-y-1">
              <Label>Tên (VI)</Label>
              <Input name="title" placeholder="VD: Các con vật" required />
            </div>
            <div className="space-y-1">
              <Label>Chủ đề (EN)</Label>
              <Input name="theme" placeholder="Animals" required />
            </div>
            <div className="space-y-1">
              <Label>Cấp độ</Label>
              <select name="level" className="flex h-9 w-full rounded-md border px-3 py-1 text-sm">
                {LEVELS.map((l) => <option key={l} value={l}>{themeFor(l).label}</option>)}
              </select>
            </div>
            <div className="space-y-1 sm:col-span-4">
              <Label>Tải ảnh đại diện cho unit lên</Label>
              <ImageUpload name="imageUrl" />
            </div>
            <Button type="submit">Tạo</Button>
            <p className="text-[11px] text-muted-foreground sm:col-span-4">
              Unit mới sẽ ở trạng thái Bản nháp — bấm “Đang hiện/Bản nháp” để xuất bản.
            </p>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-8">
        {levels.map((level) => {
          const group = byLevel.get(level)!;
          return (
            <div key={level} className="space-y-2">
              <h2 className="text-lg font-bold">{levelLabel(level)}</h2>
              <ReorderList
                spec={{ kind: "units", skill: "vocab", level }}
                items={group.map<ReorderItem>((u) => ({
                  id: u.id,
                  content: (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {u.imageUrl && (
                              <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={u.imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                              </>
                            )}
                            <div>
                              <span className="font-semibold">{u.title}</span>
                              <span className="ml-2 text-sm text-muted-foreground">{u.theme}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{levelLabel(u.level)}</Badge>
                                <span className="text-xs text-muted-foreground">{u._count.lessons} bài học</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                            <PublishToggle model="vocabUnit" id={u.id} published={u.published} />
                            <Link href={`/admin/vocab/${u.id}`}>
                              <Button size="sm" variant="outline">
                                <ChevronRight className="h-4 w-4" /> Bài học
                              </Button>
                            </Link>
                            <form action={async () => { "use server"; await deleteUnitAction(u.id); }}>
                              <Button size="sm" variant="destructive" type="submit"><Trash2 className="h-4 w-4" /></Button>
                            </form>
                          </div>
                        </div>

                        <details className="mt-3 border-t pt-3">
                          <summary className="cursor-pointer text-sm font-medium text-muted-foreground">Sửa</summary>
                          <form action={async (fd: FormData) => { "use server"; await updateUnitAction("vocab", fd); }} className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4 sm:items-end">
                            <input type="hidden" name="id" value={u.id} />
                            <div className="space-y-1">
                              <Label>Tên (VI)</Label>
                              <Input name="title" defaultValue={u.title} required />
                            </div>
                            <div className="space-y-1">
                              <Label>Chủ đề (EN)</Label>
                              <Input name="theme" defaultValue={u.theme} required />
                            </div>
                            <div className="space-y-1">
                              <Label>Cấp độ</Label>
                              <select name="level" defaultValue={u.level} className="flex h-9 w-full rounded-md border px-3 py-1 text-sm">
                                {LEVELS.map((l) => <option key={l} value={l}>{themeFor(l).label}</option>)}
                              </select>
                            </div>
                            <div className="space-y-1 sm:col-span-4">
                              <Label>Ảnh đại diện</Label>
                              <ImageUpload name="imageUrl" defaultValue={u.imageUrl} />
                            </div>
                            <Button type="submit" size="sm">Lưu</Button>
                          </form>
                        </details>
                      </CardContent>
                    </Card>
                  ),
                }))}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
