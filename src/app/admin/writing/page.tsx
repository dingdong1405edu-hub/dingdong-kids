import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/image-upload";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { ReorderList } from "@/components/admin/reorder-list";
import { levelLabel } from "@/lib/utils";
import { LEVELS, themeFor } from "@/lib/roadmap";
import {
  createWritingAction,
  deleteWritingAction,
  updateWritingAction,
  bulkImportWritingTasksAction,
} from "@/server/actions/admin";
import { BulkItemImport } from "@/components/admin/bulk-item-import";
import { EnglishLevel } from "@prisma/client";
import { Trash2, Plus } from "lucide-react";

const WRITING_SAMPLE = `[
  {
    "taskType": "FREE",
    "level": "MOVERS",
    "prompt": "Write about your favourite animal. What is it? What colour is it? What does it eat?",
    "minWords": 30,
    "timeLimit": 900
  },
  {
    "taskType": "GUIDED",
    "level": "FLYERS",
    "prompt": "Write about your weekend with your family.",
    "outline": "- Where did you go?\\n- Who was with you?\\n- What did you do?\\n- How did you feel?",
    "minWords": 50,
    "timeLimit": 1200
  }
]`;

const typeLabel: Record<string, string> = { FREE: "Tự do", GUIDED: "Có gợi ý", PICTURE_DESCRIPTION: "Nhìn tranh viết" };

export default async function AdminWritingPage() {
  const tasks = await db.writingTask.findMany({
    orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  // Gom theo cấp độ — mỗi cấp một <ReorderList> riêng (đổi thứ tự theo phạm vi cấp).
  const byLevel = new Map<EnglishLevel, typeof tasks>();
  for (const task of tasks) {
    if (!byLevel.has(task.level)) byLevel.set(task.level, []);
    byLevel.get(task.level)!.push(task);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Bài luyện viết</h1>
        <BulkItemImport
          action={bulkImportWritingTasksAction}
          title="Nhập hàng loạt bài viết"
          unitNoun="bài viết"
          sampleJson={WRITING_SAMPLE}
          sampleFileName="mau-bai-viet.json"
          description="Mỗi mục = 1 bài viết: taskType (FREE | GUIDED | PICTURE_DESCRIPTION) · prompt (đề bài) · level; tùy chọn outline (dàn ý) · minWords (số từ tối thiểu) · timeLimit (giây)."
        />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base"><Plus className="h-4 w-4 inline mr-2" />Thêm bài viết</CardTitle></CardHeader>
        <CardContent>
          <form
            action={async (fd: FormData) => {
              "use server";
              await createWritingAction(fd);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-1">
              <Label>Loại bài</Label>
              <select name="taskType" className="flex h-9 w-full rounded-md border px-3 py-1 text-sm">
                <option value="FREE">Tự do</option>
                <option value="GUIDED">Có gợi ý</option>
                <option value="PICTURE_DESCRIPTION">Nhìn tranh viết</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label>Cấp độ</Label>
              <select name="level" className="flex h-9 w-full rounded-md border px-3 py-1 text-sm">
                {LEVELS.map((l) => <option key={l} value={l}>{themeFor(l).label}</option>)}
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Tải ảnh đại diện lên</Label>
              <ImageUpload name="imageUrl" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Đề bài</Label>
              <Textarea name="prompt" placeholder="Write about your favourite animal..." required />
              <p className="text-xs text-muted-foreground">
                Với các bé nhỏ, hãy viết đề bằng tiếng Anh thật ngắn và tách thành vài câu hỏi gợi mở.
              </p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Dàn ý gợi ý (tùy chọn — mỗi ý một dòng)</Label>
              <Textarea name="outline" rows={4} placeholder={"VD:\n- What is it?\n- What colour is it?\n- What does it eat?\n- Why do you like it?"} />
              <p className="text-xs text-muted-foreground">Bé phải bấm “Gợi ý dàn ý” mới thấy. Dàn ý cũng được AI dùng để chấm độ bám sát đề.</p>
            </div>
            <div className="space-y-1">
              <Label>Số từ tối thiểu</Label>
              <Input name="minWords" type="number" defaultValue="30" />
            </div>
            <div className="space-y-1">
              <Label>Giới hạn thời gian (giây)</Label>
              <Input name="timeLimit" type="number" defaultValue="900" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Button type="submit">Tạo bài viết</Button>
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
              spec={{ kind: "content", model: "writing", level }}
              items={group.map((task) => ({
                id: task.id,
                content: (
                  <Card>
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div className="flex flex-1 items-start gap-3">
                        {task.imageUrl && (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={task.imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                          </>
                        )}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{levelLabel(task.level)}</Badge>
                            <Badge variant="secondary">{typeLabel[task.taskType]}</Badge>
                            <span className="text-xs text-muted-foreground">≥ {task.minWords} từ</span>
                          </div>
                          <p className="text-sm">{task.prompt}</p>
                          <details>
                            <summary className="cursor-pointer text-sm font-medium text-muted-foreground">Sửa</summary>
                            <form action={async (fd: FormData) => { "use server"; await updateWritingAction(fd); }} className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input type="hidden" name="id" value={task.id} />
                              <div className="space-y-1">
                                <Label>Loại bài</Label>
                                <select name="taskType" defaultValue={task.taskType} className="flex h-9 w-full rounded-md border px-3 py-1 text-sm">
                                  <option value="FREE">Tự do</option>
                                  <option value="GUIDED">Có gợi ý</option>
                                  <option value="PICTURE_DESCRIPTION">Nhìn tranh viết</option>
                                </select>
                              </div>
                              <div className="space-y-1">
                                <Label>Cấp độ</Label>
                                <select name="level" defaultValue={task.level} className="flex h-9 w-full rounded-md border px-3 py-1 text-sm">
                                  {LEVELS.map((l) => <option key={l} value={l}>{themeFor(l).label}</option>)}
                                </select>
                              </div>
                              <div className="space-y-1 md:col-span-2">
                                <Label>Tải ảnh đại diện lên</Label>
                                <ImageUpload name="imageUrl" defaultValue={task.imageUrl ?? undefined} />
                              </div>
                              <div className="space-y-1 md:col-span-2">
                                <Label>Đề bài</Label>
                                <Textarea name="prompt" defaultValue={task.prompt} required />
                              </div>
                              <div className="space-y-1 md:col-span-2">
                                <Label>Dàn ý gợi ý (tùy chọn — mỗi ý một dòng)</Label>
                                <Textarea name="outline" rows={4} defaultValue={task.outline ?? undefined} />
                              </div>
                              <div className="space-y-1">
                                <Label>Số từ tối thiểu</Label>
                                <Input name="minWords" type="number" defaultValue={task.minWords} />
                              </div>
                              <div className="space-y-1">
                                <Label>Giới hạn thời gian (giây)</Label>
                                <Input name="timeLimit" type="number" defaultValue={task.timeLimit} />
                              </div>
                              <div className="md:col-span-2">
                                <Button type="submit" size="sm">Lưu</Button>
                              </div>
                            </form>
                          </details>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <PublishToggle model="writing" id={task.id} published={task.published} />
                        <form action={async () => { "use server"; await deleteWritingAction(task.id); }}>
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
