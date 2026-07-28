import { db } from "@/lib/db";
import { db as prisma } from "@/lib/db";
import { requireAdminActor } from "@/lib/admin-guard";
import { logAudit } from "@/lib/audit";
import { ensureAudio } from "@/lib/tts";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/image-upload";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { ReorderList, type ReorderItem } from "@/components/admin/reorder-list";
import { levelLabel } from "@/lib/utils";
import { LEVELS, themeFor } from "@/lib/roadmap";
import { deleteReadingAction, bulkImportReadingTestsAction } from "@/server/actions/admin";
import { BulkItemImport } from "@/components/admin/bulk-item-import";
import { redirect } from "next/navigation";
import { EnglishLevel } from "@prisma/client";
import { Trash2, Plus, ChevronRight } from "lucide-react";

async function createReadingAction(fd: FormData): Promise<void> {
  "use server";
  const { actor } = await requireAdminActor();
  const passage = fd.get("passage") as string;
  // Đọc mẫu cả đoạn bằng TTS: bé vừa nghe vừa nhìn chữ. Lỗi TTS không chặn việc
  // lưu bài (ensureAudio tự nuốt lỗi, trả null) — admin bổ sung audio sau.
  const audioUrl = await ensureAudio(null, passage);
  const created = await prisma.readingTest.create({
    data: {
      title: fd.get("title") as string,
      level: fd.get("level") as EnglishLevel,
      passage,
      audioUrl,
      imageUrl: (fd.get("imageUrl") as string) || undefined,
      timeLimit: parseInt(fd.get("timeLimit") as string),
      published: false,
    },
  });
  await logAudit({
    actor,
    action: "CREATE",
    entity: "ReadingTest",
    entityId: created.id,
    summary: `Tạo bài đọc «${created.title}»`,
    after: created,
  });
  revalidatePath("/admin/reading");
  // Vào thẳng trang chi tiết — nơi form "Thêm câu hỏi" nằm ngay dưới bài đọc, để
  // admin thêm câu hỏi liền mạch (không phải tìm và bấm sang mục khác).
  redirect(`/admin/reading/${created.id}`);
}

const READING_SAMPLE = `[
  {
    "title": "Chú mèo của Lan",
    "level": "STARTERS",
    "timeLimit": 600,
    "passage": "Lan has a small cat. The cat is white and grey. It likes milk and it likes to sleep on the sofa. Every morning Lan gives the cat some food before school.",
    "passageTranslation": "Lan có một chú mèo nhỏ. Chú mèo màu trắng và xám. Nó thích sữa và thích ngủ trên ghế sofa. Mỗi sáng, Lan cho mèo ăn trước khi đi học.",
    "passageAnalysis": [
      { "en": "Lan has a small cat.", "vi": "Lan có một chú mèo nhỏ.", "note": "has = có (dùng với he/she/it)." },
      { "en": "It likes milk and it likes to sleep on the sofa.", "vi": "Nó thích sữa và thích ngủ trên ghế sofa.", "note": "like + danh từ hoặc like to + động từ." }
    ],
    "questions": [
      { "type": "MCQ", "prompt": "What colour is the cat?", "options": ["White and grey", "Black", "Brown", "Yellow"], "answer": 0, "explanation": "Bài đọc nói chú mèo màu trắng và xám." },
      { "type": "TRUE_FALSE", "prompt": "The cat likes milk.", "answer": true },
      { "type": "FILL_BLANK", "prompt": "Lan gives the cat some ___ before school.", "answer": "food", "accepted": ["some food"] }
    ]
  }
]`;

export default async function AdminReadingPage() {
  const tests = await db.readingTest.findMany({
    orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { questions: true } } },
  });

  // Nhóm theo cấp độ — đổi thứ tự được giới hạn trong từng cấp.
  const byLevel = new Map<EnglishLevel, typeof tests>();
  for (const t of tests) {
    if (!byLevel.has(t.level)) byLevel.set(t.level, []);
    byLevel.get(t.level)!.push(t);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Bài đọc hiểu</h1>
        <BulkItemImport
          action={bulkImportReadingTestsAction}
          title="Nhập hàng loạt bài đọc"
          unitNoun="bài đọc"
          hasQuestions
          sampleJson={READING_SAMPLE}
          sampleFileName="mau-bai-doc.json"
          description="Mỗi mục = 1 bài đọc đầy đủ: title (VI) · level · passage (đoạn văn tiếng Anh) · timeLimit (giây, tùy chọn) · passageTranslation (dịch cả bài, tùy chọn) · passageAnalysis[] (phân tích từng câu: en·vi·note, tùy chọn) · questions[]. Câu hỏi: MCQ (kèm options + answer là chỉ số từ 0), TRUE_FALSE (answer true/false), FILL_BLANK (answer là từ/cụm tiếng Anh). Dịch & phân tích hiện cho bé khi chữa bài."
        />
      </div>

      {/* Create form */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Plus className="h-4 w-4" /> Thêm bài đọc mới</CardTitle></CardHeader>
        <CardContent>
          <form action={createReadingAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Tiêu đề (VI)</Label>
              <Input name="title" placeholder="VD: Chú mèo của Lan" required />
            </div>
            <div className="space-y-1">
              <Label>Cấp độ</Label>
              <select name="level" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" required>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{themeFor(l).label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Giới hạn thời gian (giây)</Label>
              <Input name="timeLimit" type="number" defaultValue="600" required />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Tải ảnh đại diện lên</Label>
              <ImageUpload name="imageUrl" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Đoạn văn (tiếng Anh)</Label>
              <Textarea name="passage" className="min-h-32" placeholder="Lan has a small cat..." required />
              <p className="text-xs text-muted-foreground">
                Hệ thống tự tạo audio đọc mẫu cả đoạn để bé vừa nghe vừa nhìn chữ.
              </p>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Button type="submit">Tạo bài đọc &amp; thêm câu hỏi</Button>
              <p className="text-xs text-muted-foreground">
                Sau khi tạo, bạn sẽ vào ngay trang thêm câu hỏi cho bài này. Bài mới ở trạng thái Bản nháp — bấm
                “Đang hiện/Bản nháp” để xuất bản.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* List — nhóm theo cấp độ, mỗi cấp một ReorderList riêng */}
      <div className="space-y-8">
        {[...byLevel.entries()].map(([level, group]) => {
          const items: ReorderItem[] = group.map((test) => ({
            id: test.id,
            content: (
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {test.imageUrl && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={test.imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                      </>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{test.title}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{levelLabel(test.level)}</Badge>
                        <span className="text-xs text-muted-foreground">{test._count.questions} câu hỏi</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <PublishToggle model="reading" id={test.id} published={test.published} />
                    <Link href={`/admin/reading/${test.id}`}>
                      <Button size="sm" variant="outline">
                        <ChevronRight className="h-4 w-4" /> Câu hỏi
                      </Button>
                    </Link>
                    <form action={async () => { "use server"; await deleteReadingAction(test.id); }}>
                      <Button size="sm" variant="destructive" type="submit">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            ),
          }));
          return (
            <div key={level} className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground">{levelLabel(level)}</h2>
              <ReorderList spec={{ kind: "content", model: "reading", level }} items={items} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
