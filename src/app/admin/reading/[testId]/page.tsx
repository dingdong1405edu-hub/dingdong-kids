import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdminActor } from "@/lib/admin-guard";
import { logAudit } from "@/lib/audit";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/image-upload";
import { revalidatePath } from "next/cache";
import { db as prisma } from "@/lib/db";
import { QuestionType, Prisma } from "@prisma/client";
import { Plus, ArrowLeft, Trash2, Save, Pencil, Sparkles, Wand2, Languages, Volume2 } from "lucide-react";
import { deleteQuestionAction, updateReadingAction } from "@/server/actions/admin";
import { generateReadingExplanation, isGradingConfigured } from "@/lib/groq";
import { ensureAudio } from "@/lib/tts";
import { LEVELS, themeFor } from "@/lib/roadmap";
import { levelLabel } from "@/lib/utils";
import { ReadingQuestionsImporter } from "@/components/admin/reading-questions-importer";
import { ReadingAnalysisEditor } from "@/components/admin/reading-analysis-editor";

async function createQuestionAction(fd: FormData): Promise<void> {
  "use server";
  const { actor } = await requireAdminActor();
  const type = fd.get("type") as QuestionType;
  const readingId = fd.get("readingId") as string;
  const prompt = fd.get("prompt") as string;
  let options: Prisma.InputJsonValue | undefined = undefined;
  let correctAnswer: Prisma.InputJsonValue = {};
  let correctAnswerText = "";

  if (type === "MCQ") {
    const opts = (fd.get("options") as string)
      .split("\n")
      .filter(Boolean)
      .map((t) => ({ text: t.trim() }));
    options = opts as Prisma.InputJsonValue;
    const idx = parseInt(fd.get("correctIndex") as string) || 0;
    correctAnswer = { index: idx };
    correctAnswerText = opts[idx]?.text ?? "";
  } else if (type === "TRUE_FALSE") {
    const value = fd.get("correctBool") === "true";
    correctAnswer = { value };
    correctAnswerText = value ? "Đúng" : "Sai";
  } else if (type === "FILL_BLANK") {
    const accepted = ((fd.get("correctAccepted") as string) || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const text = ((fd.get("correctText") as string) || "").trim();
    correctAnswer = { text, accepted };
    correctAnswerText = text;
  }

  // Giải thích + chỗ trích dẫn: ưu tiên admin tự nhập; nếu để trống thì nhờ Groq
  // sinh sẵn (chỉ cho bé đáp án lấy ở đâu + giải thích ngắn gọn). Lỗi AI không
  // chặn việc tạo câu hỏi.
  let explanation = ((fd.get("explanation") as string) || "").trim() || undefined;
  let supportingQuote: string | undefined = undefined;
  if (!explanation && isGradingConfigured()) {
    try {
      const test = await prisma.readingTest.findUnique({
        where: { id: readingId },
        select: { passage: true, level: true },
      });
      if (test) {
        const r = await generateReadingExplanation({
          passage: test.passage,
          prompt,
          correctAnswer: correctAnswerText,
          level: test.level,
        });
        explanation = r.explanation || undefined;
        supportingQuote = r.supportingQuote || undefined;
      }
    } catch (e) {
      console.error("generateReadingExplanation failed:", e);
    }
  }

  // Audio đọc đề: bé chưa đọc thạo vẫn tự làm được bài. Lỗi TTS không chặn việc lưu.
  const audioUrl = await ensureAudio(null, prompt);

  // Append after existing questions so ordering is deterministic.
  const count = await prisma.question.count({ where: { readingId } });
  const created = await prisma.question.create({
    data: {
      type,
      prompt,
      promptTranslation: ((fd.get("promptTranslation") as string) || "").trim() || null,
      audioUrl,
      options: options ?? Prisma.JsonNull,
      correctAnswer,
      explanation,
      supportingQuote,
      readingId,
      order: count + 1,
    },
  });
  await logAudit({
    actor,
    action: "CREATE",
    entity: "Question",
    entityId: created.id,
    summary: `Tạo câu hỏi «${prompt.slice(0, 40)}»`,
    after: created,
  });
  revalidatePath(`/admin/reading/${readingId}`);
}

interface Props {
  params: Promise<{ testId: string }>;
}

export default async function AdminReadingDetailPage({ params }: Props) {
  const { testId } = await params;
  const test = await db.readingTest.findUnique({
    where: { id: testId },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!test) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/reading"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách đề đọc
      </Link>
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-bold">{test.title}</h1>
        <Badge variant="outline">{levelLabel(test.level)}</Badge>
        {test.audioUrl && (
          <Badge variant="secondary" className="gap-1">
            <Volume2 className="h-3 w-3" /> Có audio đọc mẫu
          </Badge>
        )}
      </div>

      {/* Edit test */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Pencil className="h-4 w-4" /> Sửa bài đọc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (fd: FormData) => {
              "use server";
              await updateReadingAction(fd);
            }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <input type="hidden" name="id" value={test.id} />
            <input type="hidden" name="audioUrl" value={test.audioUrl ?? ""} />
            <div className="space-y-1">
              <Label>Tiêu đề (VI)</Label>
              <Input name="title" defaultValue={test.title} required />
            </div>
            <div className="space-y-1">
              <Label>Cấp độ</Label>
              <select
                name="level"
                defaultValue={test.level}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                required
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {themeFor(l).label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Giới hạn thời gian (giây)</Label>
              <Input name="timeLimit" type="number" defaultValue={test.timeLimit} required />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Tải ảnh đại diện lên</Label>
              <ImageUpload name="imageUrl" defaultValue={test.imageUrl} />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Đoạn văn (tiếng Anh)</Label>
              <Textarea name="passage" className="min-h-32" defaultValue={test.passage} required />
              <p className="text-xs text-muted-foreground">
                Bài chưa có audio sẽ được đọc mẫu tự động bằng giọng máy. Bản dịch + phân tích từng câu quản lý ở
                mục “Dịch &amp; phân tích bài đọc” bên dưới.
              </p>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="gap-1.5">
                <Save className="h-4 w-4" /> Lưu thay đổi
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Dịch bài đọc + phân tích từng câu (chữa bài) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Languages className="h-4 w-4 text-primary" /> Dịch &amp; phân tích bài đọc (AI / JSON)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReadingAnalysisEditor
            readingId={test.id}
            initialJson={JSON.stringify(
              {
                translation: test.passageTranslation ?? "",
                sentences: Array.isArray(test.passageAnalysis) ? test.passageAnalysis : [],
              },
              null,
              2,
            )}
          />
        </CardContent>
      </Card>

      {/* Bulk add via AI / JSON */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wand2 className="h-4 w-4 text-primary" /> Thêm nhiều câu hỏi (AI / JSON)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReadingQuestionsImporter readingId={test.id} />
        </CardContent>
      </Card>

      {/* Add a single question manually */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Plus className="h-4 w-4" /> Thêm 1 câu hỏi (thủ công)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createQuestionAction} className="space-y-4">
            <input type="hidden" name="readingId" value={test.id} />
            <div className="space-y-1">
              <Label>Loại câu hỏi</Label>
              <select name="type" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm">
                <option value="MCQ">Trắc nghiệm (MCQ)</option>
                <option value="TRUE_FALSE">Đúng / Sai</option>
                <option value="FILL_BLANK">Điền chỗ trống</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label>Câu hỏi (tiếng Anh)</Label>
              <Input name="prompt" placeholder="What colour is the cat?" required />
              <p className="text-xs text-muted-foreground">Hệ thống tự tạo audio đọc câu hỏi cho bé.</p>
            </div>
            <div className="space-y-1">
              <Label>Dịch câu hỏi (tiếng Việt, tùy chọn)</Label>
              <Input name="promptTranslation" placeholder="Chú mèo màu gì?" />
            </div>
            <div className="space-y-1">
              <Label>Đáp án MCQ (mỗi dòng 1 lựa chọn)</Label>
              <Textarea
                name="options"
                placeholder="White and grey&#10;Black&#10;Brown&#10;Yellow"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <Label>MCQ · đáp án đúng (từ 0)</Label>
                <Input name="correctIndex" type="number" defaultValue="0" />
              </div>
              <div className="space-y-1">
                <Label>Đúng/Sai · đáp án</Label>
                <select name="correctBool" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm">
                  <option value="true">Đúng</option>
                  <option value="false">Sai</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label>Điền · đáp án đúng</Label>
                <Input name="correctText" placeholder="food" />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Điền · đáp án chấp nhận thêm (mỗi dòng 1, tùy chọn)</Label>
              <Textarea name="correctAccepted" placeholder="some food" />
            </div>
            <div className="space-y-1">
              <Label>Giải thích (tùy chọn)</Label>
              <Textarea name="explanation" className="min-h-16" placeholder="Giải thích đáp án bằng lời thật ngắn, dễ hiểu với trẻ..." />
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Để trống để AI (Groq) tự tạo giải thích + chỉ ra câu trong bài chứa đáp án.
              </p>
            </div>
            <Button type="submit">Thêm câu hỏi</Button>
          </form>
        </CardContent>
      </Card>

      {/* Questions list */}
      <div className="space-y-2">
        {test.questions.map((q, idx) => (
          <Card key={q.id}>
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1.5">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground">{idx + 1}. </span>
                    <span className="text-sm">{q.prompt}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="secondary" className="text-xs">
                      {q.type}
                    </Badge>
                    {q.audioUrl && (
                      <Badge variant="outline" className="gap-1 text-[10px]">
                        <Volume2 className="h-3 w-3" /> Audio
                      </Badge>
                    )}
                  </div>
                  {q.supportingQuote && (
                    <p className="rounded-md border border-brand-teal/40 bg-band-mint px-2 py-1 text-xs text-brand-teal">
                      📍 <span>{q.supportingQuote}</span>
                    </p>
                  )}
                  {q.explanation && (
                    <p className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">💡 {q.explanation}</p>
                  )}
                </div>
                <form
                  action={async () => {
                    "use server";
                    await deleteQuestionAction(q.id, { readingId: test.id });
                  }}
                >
                  <Button size="sm" variant="ghost" type="submit" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
        {test.questions.length === 0 && (
          <p className="rounded-xl border border-dashed py-8 text-center text-sm text-muted-foreground">
            Chưa có câu hỏi nào. Thêm câu hỏi ở trên.
          </p>
        )}
      </div>
    </div>
  );
}
