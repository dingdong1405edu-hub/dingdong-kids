import { db } from "@/lib/db";
import { requireAdminActor } from "@/lib/admin-guard";
import { logAudit } from "@/lib/audit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/image-upload";
import { levelLabel } from "@/lib/utils";
import { LEVELS, themeFor } from "@/lib/roadmap";
import { MATERIAL_CATEGORIES, categoryMeta, parseMaterialContent } from "@/lib/materials";
import { bulkImportMaterialsAction } from "@/server/actions/admin";
import { BulkItemImport } from "@/components/admin/bulk-item-import";
import { EnglishLevel, MaterialCategory, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Plus, Trash2, Clock, FileText } from "lucide-react";

const MATERIAL_SAMPLE = `[
  {
    "title": "Câu hỏi với “Where”",
    "category": "GRAMMAR",
    "level": "MOVERS",
    "summary": "Cách hỏi “ở đâu” trong tiếng Anh, kèm ví dụ về nhà cửa và trường lớp.",
    "readMinutes": 4,
    "tags": ["ngữ pháp", "câu hỏi"],
    "content": "# Where là gì?\\nWhere dùng để hỏi VỊ TRÍ — một nơi nào đó.\\n- Where is my bag?\\n- Where are the cats?\\n> Nhớ nhé: sau Where là is (một cái) hoặc are (nhiều cái).\\nWhere is the dog? | Con chó ở đâu?"
  }
]`;

async function createMaterialAction(fd: FormData): Promise<void> {
  "use server";
  const { actor } = await requireAdminActor();
  const category = fd.get("category") as MaterialCategory;
  const level = fd.get("level") as EnglishLevel;
  const order = await db.material.count({ where: { category, level } });
  const blocks = parseMaterialContent((fd.get("content") as string) || "");
  const tags = ((fd.get("tags") as string) || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const created = await db.material.create({
    data: {
      title: fd.get("title") as string,
      category,
      level,
      summary: fd.get("summary") as string,
      imageUrl: (fd.get("imageUrl") as string) || undefined,
      content: blocks as unknown as Prisma.InputJsonValue,
      tags: tags as unknown as Prisma.InputJsonValue,
      readMinutes: parseInt(fd.get("readMinutes") as string) || 5,
      order: order + 1,
    },
  });
  await logAudit({
    actor,
    action: "CREATE",
    entity: "Material",
    entityId: created.id,
    summary: `Tạo tài liệu «${created.title}»`,
    after: created,
  });
  revalidatePath("/admin/materials");
  revalidatePath("/materials");
}

async function deleteMaterialAction(id: string): Promise<void> {
  "use server";
  const { actor } = await requireAdminActor();
  const deleted = await db.material.delete({ where: { id } });
  await logAudit({
    actor,
    action: "DELETE",
    entity: "Material",
    entityId: deleted.id,
    summary: `Xóa tài liệu «${deleted.title}»`,
    before: deleted,
  });
  revalidatePath("/admin/materials");
  revalidatePath("/materials");
}

export default async function AdminMaterialsPage() {
  const materials = await db.material.findMany({
    orderBy: [{ level: "asc" }, { category: "asc" }, { order: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Tài liệu học tập</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý ghi chú ngữ pháp, mẹo thi Cambridge và bài đọc khám phá cho các bé và phụ huynh.
          </p>
        </div>
        <BulkItemImport
          action={bulkImportMaterialsAction}
          title="Nhập hàng loạt tài liệu"
          unitNoun="tài liệu"
          draft={false}
          sampleJson={MATERIAL_SAMPLE}
          sampleFileName="mau-tai-lieu.json"
          description="Mỗi mục = 1 tài liệu: title · category (GRAMMAR | VOCABULARY | SPELLING | PHONICS | EXAM_TIPS | CULTURE | CONVERSATION) · level · summary · content (chuỗi markup '# - > câu tiếng Anh | nghĩa tiếng Việt' hoặc mảng block); tùy chọn tags · readMinutes."
        />
      </div>

      {/* Create form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Plus className="h-4 w-4" /> Thêm tài liệu mới
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createMaterialAction} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1 md:col-span-2">
              <Label>Tiêu đề</Label>
              <Input name="title" placeholder="VD: Câu hỏi với “Where”" required />
            </div>
            <div className="space-y-1">
              <Label>Phân loại</Label>
              <select name="category" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" required>
                {MATERIAL_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label} ({c.labelEn})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Cấp độ</Label>
              <select name="level" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" required>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {themeFor(l).label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Thời gian đọc (phút)</Label>
              <Input name="readMinutes" type="number" defaultValue="5" min="1" />
            </div>
            <div className="space-y-1">
              <Label>Tags (phân tách bằng dấu phẩy)</Label>
              <Input name="tags" placeholder="ngữ pháp, câu hỏi, trường lớp" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Tải ảnh đại diện lên</Label>
              <ImageUpload name="imageUrl" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Tóm tắt</Label>
              <Textarea name="summary" className="min-h-16" placeholder="Mô tả ngắn gọn nội dung tài liệu..." required />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Nội dung</Label>
              <Textarea
                name="content"
                className="min-h-48 font-mono text-sm"
                placeholder={"# Tiêu đề mục\nĐoạn văn bình thường.\n- Mục danh sách\n> Ghi chú quan trọng\nWhere is the dog? | Con chó ở đâu?"}
              />
              <p className="text-xs text-muted-foreground">
                Cú pháp: <code># </code> = tiêu đề · <code>- </code> = danh sách · <code>&gt; </code> = ghi chú ·{" "}
                <code>câu tiếng Anh | nghĩa tiếng Việt</code> = ví dụ · dòng trống ngăn đoạn văn.
              </p>
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Tạo tài liệu</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{materials.length} tài liệu</p>
        {materials.map((m) => {
          const meta = categoryMeta(m.category);
          const Icon = meta.icon;
          return (
            <Card key={m.id}>
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex min-w-0 items-start gap-3">
                  {m.imageUrl && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                    </>
                  )}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{m.title}</span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{m.summary}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{levelLabel(m.level)}</Badge>
                      <Badge variant="secondary">{meta.label}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {m.readMinutes} phút
                      </span>
                    </div>
                  </div>
                </div>
                <form action={async () => { "use server"; await deleteMaterialAction(m.id); }}>
                  <Button size="sm" variant="destructive" type="submit">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          );
        })}
        {materials.length === 0 && (
          <div className="rounded-2xl border border-dashed py-12 text-center text-muted-foreground">
            <FileText className="mx-auto mb-3 h-10 w-10 opacity-30" />
            <p>Chưa có tài liệu nào. Thêm tài liệu đầu tiên ở trên.</p>
          </div>
        )}
      </div>
    </div>
  );
}
