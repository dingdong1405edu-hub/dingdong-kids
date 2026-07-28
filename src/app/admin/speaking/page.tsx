import { db } from "@/lib/db";
import { requireAdminActor } from "@/lib/admin-guard";
import { logAudit } from "@/lib/audit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/image-upload";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { ReorderList } from "@/components/admin/reorder-list";
import { levelLabel } from "@/lib/utils";
import { LEVELS, themeFor } from "@/lib/roadmap";
import {
  deleteSpeakingAction,
  updateSpeakingAction,
  bulkImportSpeakingSetsAction,
} from "@/server/actions/admin";
import { BulkItemImport } from "@/components/admin/bulk-item-import";
import { Trash2, Plus, MessagesSquare } from "lucide-react";
import Link from "next/link";
import { db as prisma } from "@/lib/db";
import { EnglishLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";

const SPEAKING_SET_SAMPLE = `[
  {
    "title": "Cambridge Speaking · Starters — Bài 1",
    "level": "STARTERS",
    "part1Sentences": [
      { "text": "Hello! My name is Mai.", "vi": "Xin chào! Mình tên là Mai." },
      { "text": "I am six years old.", "vi": "Mình sáu tuổi." }
    ],
    "part2Passage": { "text": "This is my family. I have a mum, a dad and a little brother. We live in a small house with a big garden.", "vi": "Đây là gia đình mình. Mình có mẹ, bố và một em trai. Nhà mình nhỏ nhưng có khu vườn rộng." },
    "part3Questions": [
      { "question": "What is your favourite colour?", "vi": "Màu bé thích nhất là màu gì?" },
      { "question": "What do you like to eat?", "vi": "Bé thích ăn món gì?" }
    ]
  }
]`;

async function createSpeakingAction(fd: FormData) {
  "use server";
  const { actor } = await requireAdminActor();
  // Bọc JSON.parse để dữ liệu dán sai định dạng báo lỗi rõ ràng thay vì crash.
  const parseJson = (key: string, label: string) => {
    try {
      return JSON.parse(fd.get(key) as string);
    } catch {
      throw new Error(`${label} không phải JSON hợp lệ.`);
    }
  };
  const created = await prisma.speakingSet.create({
    data: {
      title: fd.get("title") as string,
      level: fd.get("level") as EnglishLevel,
      imageUrl: (fd.get("imageUrl") as string) || undefined,
      part1Sentences: parseJson("part1Sentences", "Part 1"),
      part2Passage: parseJson("part2Passage", "Part 2"),
      part3Questions: parseJson("part3Questions", "Part 3"),
      published: false,
    },
  });
  await logAudit({
    actor,
    action: "CREATE",
    entity: "SpeakingSet",
    entityId: created.id,
    summary: `Tạo bộ luyện nói «${created.title || created.id}»`,
    after: created,
  });
  revalidatePath("/admin/speaking");
}

export default async function AdminSpeakingPage() {
  const sets = await db.speakingSet.findMany({
    orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  // Gom theo cấp độ — mỗi cấp một <ReorderList> riêng (đổi thứ tự theo phạm vi cấp).
  const byLevel = new Map<EnglishLevel, typeof sets>();
  for (const set of sets) {
    if (!byLevel.has(set.level)) byLevel.set(set.level, []);
    byLevel.get(set.level)!.push(set);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Bộ luyện nói (Cambridge Speaking)</h1>
        <div className="flex flex-wrap items-center gap-2">
          <BulkItemImport
            action={bulkImportSpeakingSetsAction}
            title="Nhập hàng loạt bộ nói"
            unitNoun="bộ nói"
            sampleJson={SPEAKING_SET_SAMPLE}
            sampleFileName="mau-bo-noi.json"
            description="Mỗi mục = 1 bộ nói: title (tùy chọn) · level · part1Sentences[] (nhắc lại câu) · part2Passage{} (đọc to đoạn văn) · part3Questions[] (trả lời câu hỏi). Mỗi câu/đoạn có { text/question, vi? } — vi là bản dịch tiếng Việt (tùy chọn)."
          />
          <Link href="/admin/speaking/topics">
            <Button variant="outline" size="sm">
              <MessagesSquare className="mr-1 h-4 w-4" /> Nói theo chủ đề
            </Button>
          </Link>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base"><Plus className="h-4 w-4 inline mr-2" />Thêm bộ nói</CardTitle></CardHeader>
        <CardContent>
          <form action={createSpeakingAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Tiêu đề</Label>
                <Input name="title" placeholder="Cambridge Speaking · Starters — Bài 1" />
              </div>
              <div className="space-y-1">
                <Label>Cấp độ</Label>
                <select name="level" className="flex h-9 w-full rounded-md border px-3 py-1 text-sm">
                  {LEVELS.map((l) => <option key={l} value={l}>{themeFor(l).label}</option>)}
                </select>
              </div>
              <div className="space-y-1 col-span-2">
                <Label>Tải ảnh đại diện lên</Label>
                <ImageUpload name="imageUrl" />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Part 1 · Nhắc lại câu (JSON array)</Label>
              <textarea
                name="part1Sentences"
                className="flex min-h-24 w-full rounded-md border px-3 py-2 text-xs font-mono"
                defaultValue={`[{"text":"Hello! My name is Mai.","vi":"Xin chào! Mình tên là Mai."}]`}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Part 2 · Đọc to đoạn văn (JSON object)</Label>
              <textarea
                name="part2Passage"
                className="flex min-h-16 w-full rounded-md border px-3 py-2 text-xs font-mono"
                defaultValue={`{"text":"This is my family.","vi":"Đây là gia đình mình."}`}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Part 3 · Trả lời câu hỏi (JSON array)</Label>
              <textarea
                name="part3Questions"
                className="flex min-h-16 w-full rounded-md border px-3 py-2 text-xs font-mono"
                defaultValue={`[{"question":"What is your favourite colour?","vi":"Màu bé thích nhất là màu gì?"}]`}
                required
              />
            </div>
            <div className="space-y-2">
              <Button type="submit">Tạo bộ nói</Button>
              <p className="text-xs text-muted-foreground">Bài mới sẽ ở trạng thái Bản nháp — bấm “Đang hiện/Bản nháp” để xuất bản.</p>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {[...byLevel.entries()].map(([level, group]) => (
          <div key={level} className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">{levelLabel(level)}</h2>
            <ReorderList
              spec={{ kind: "content", model: "speaking", level }}
              items={group.map((set) => ({
                id: set.id,
                content: (
                  <Card>
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div className="flex flex-1 items-start gap-3">
                        {set.imageUrl && (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={set.imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                          </>
                        )}
                        <div className="flex-1 space-y-2">
                          <div className="font-semibold">{set.title || set.id}</div>
                          <Badge variant="outline" className="mt-1">{levelLabel(set.level)}</Badge>
                          <details>
                            <summary className="cursor-pointer text-sm font-medium text-muted-foreground">Sửa</summary>
                            <form action={async (fd: FormData) => { "use server"; await updateSpeakingAction(fd); }} className="mt-3 space-y-3">
                              <input type="hidden" name="id" value={set.id} />
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <Label>Tiêu đề</Label>
                                  <Input name="title" defaultValue={set.title ?? ""} />
                                </div>
                                <div className="space-y-1">
                                  <Label>Cấp độ</Label>
                                  <select name="level" defaultValue={set.level} className="flex h-9 w-full rounded-md border px-3 py-1 text-sm">
                                    {LEVELS.map((l) => <option key={l} value={l}>{themeFor(l).label}</option>)}
                                  </select>
                                </div>
                                <div className="space-y-1 col-span-2">
                                  <Label>Tải ảnh đại diện lên</Label>
                                  <ImageUpload name="imageUrl" defaultValue={set.imageUrl ?? undefined} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label>Part 1 · Nhắc lại câu (JSON array)</Label>
                                <textarea
                                  name="part1Sentences"
                                  className="flex min-h-24 w-full rounded-md border px-3 py-2 text-xs font-mono"
                                  defaultValue={JSON.stringify(set.part1Sentences, null, 2)}
                                  required
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Part 2 · Đọc to đoạn văn (JSON object)</Label>
                                <textarea
                                  name="part2Passage"
                                  className="flex min-h-16 w-full rounded-md border px-3 py-2 text-xs font-mono"
                                  defaultValue={JSON.stringify(set.part2Passage, null, 2)}
                                  required
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Part 3 · Trả lời câu hỏi (JSON array)</Label>
                                <textarea
                                  name="part3Questions"
                                  className="flex min-h-16 w-full rounded-md border px-3 py-2 text-xs font-mono"
                                  defaultValue={JSON.stringify(set.part3Questions, null, 2)}
                                  required
                                />
                              </div>
                              <Button type="submit" size="sm">Lưu</Button>
                            </form>
                          </details>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <PublishToggle model="speaking" id={set.id} published={set.published} />
                        <form action={async () => { "use server"; await deleteSpeakingAction(set.id); }}>
                          <Button size="sm" variant="destructive" type="submit"><Trash2 className="h-4 w-4" /></Button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                ),
              }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
