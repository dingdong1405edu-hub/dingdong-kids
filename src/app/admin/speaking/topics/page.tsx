import Link from "next/link";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublishToggle } from "@/components/admin/publish-toggle";
import {
  SpeakingTopicForm,
  type TopicHint,
  type TopicFormDefaults,
} from "@/components/admin/speaking-topic-fields";
import { levelLabel } from "@/lib/utils";
import {
  createSpeakingTopicAction,
  updateSpeakingTopicAction,
  deleteSpeakingTopicAction,
  bulkImportSpeakingTopicsAction,
} from "@/server/actions/admin";
import { BulkItemImport } from "@/components/admin/bulk-item-import";
import { Trash2, Plus, ArrowLeft, MessagesSquare } from "lucide-react";
import { EnglishLevel } from "@prisma/client";

const SPEAKING_TOPIC_SAMPLE = `[
  {
    "title": "Thú cưng của em",
    "level": "MOVERS",
    "topic": "My pets",
    "question": "Tell me about your pet. What is it? What does it like doing?",
    "questionVi": "Hãy kể về thú cưng của bé. Đó là con gì? Nó thích làm gì?",
    "outline": "- Đó là con gì, tên là gì\\n- Nó trông thế nào\\n- Nó thích ăn gì, thích chơi gì\\n- Vì sao bé quý nó",
    "hints": [
      { "text": "fluffy", "vi": "lông xù, mềm" },
      { "text": "play with a ball", "vi": "chơi với quả bóng" }
    ],
    "minWords": 40,
    "prepSeconds": 20
  }
]`;

// Bọc về Promise<void> để dùng làm `action` của <form> trong client component.
async function createAction(fd: FormData) {
  "use server";
  await createSpeakingTopicAction(fd);
}
async function updateAction(fd: FormData) {
  "use server";
  await updateSpeakingTopicAction(fd);
}

function asHints(v: unknown): TopicHint[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((h): h is Record<string, unknown> => !!h && typeof h === "object")
    .map((h) => ({
      text: typeof h.text === "string" ? h.text : "",
      vi: typeof h.vi === "string" ? h.vi : "",
    }));
}

export default async function AdminSpeakingTopicsPage() {
  const topics = await db.speakingTopic.findMany({
    orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  const byLevel = new Map<EnglishLevel, typeof topics>();
  for (const t of topics) {
    if (!byLevel.has(t.level)) byLevel.set(t.level, []);
    byLevel.get(t.level)!.push(t);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <MessagesSquare className="h-6 w-6 text-indigo-600" /> Nói theo chủ đề
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <BulkItemImport
            action={bulkImportSpeakingTopicsAction}
            title="Nhập hàng loạt chủ đề nói"
            unitNoun="chủ đề"
            sampleJson={SPEAKING_TOPIC_SAMPLE}
            sampleFileName="mau-chu-de-noi.json"
            description="Mỗi mục = 1 chủ đề: level + question (câu hỏi tiếng Anh, bắt buộc); tùy chọn title · topic · questionVi · outline · hints[] ({text, vi?}) · sampleAnswer · minWords · prepSeconds. Audio câu hỏi sinh tự động khi mở từng chủ đề và bấm “Tạo audio”."
          />
          <Link href="/admin/speaking">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-1 h-4 w-4" /> Bộ luyện nói
            </Button>
          </Link>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Giám khảo đặt một câu hỏi mở theo chủ đề (kèm audio + gợi ý từ + dàn ý). Bé ghi âm trả lời thành một đoạn
        → AI chấm nội dung, từ vựng, ngữ pháp, phát âm và độ trôi chảy, khen trước rồi mới gợi ý sửa. Mẹo: bấm{" "}
        <b>“Điền nhanh bằng JSON”</b> để dán một lần cho mọi ô chữ.
      </p>

      {/* Create */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            <Plus className="mr-2 inline h-4 w-4" />
            Thêm chủ đề
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SpeakingTopicForm action={createAction} submitLabel="Tạo chủ đề" idSuffix="-new" />
          <p className="mt-2 text-xs text-muted-foreground">
            Chủ đề mới ở trạng thái Bản nháp — bấm “Đang hiện/Bản nháp” để xuất bản.
          </p>
        </CardContent>
      </Card>

      {/* List */}
      {topics.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-12 text-center text-muted-foreground">
          Chưa có chủ đề nói nào. Thêm chủ đề đầu tiên ở trên.
        </div>
      ) : (
        <div className="space-y-6">
          {[...byLevel.entries()].map(([level, group]) => (
            <div key={level} className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground">{levelLabel(level)}</h2>
              <div className="space-y-3">
                {group.map((t) => {
                  const defaults: TopicFormDefaults = {
                    title: t.title,
                    level: t.level,
                    topic: t.topic,
                    question: t.question,
                    questionVi: t.questionVi,
                    outline: t.outline,
                    audioUrl: t.audioUrl,
                    transcript: t.transcript,
                    hints: asHints(t.hints),
                    sampleAnswer: t.sampleAnswer,
                    minWords: t.minWords,
                    prepSeconds: t.prepSeconds,
                    order: t.order,
                    imageUrl: t.imageUrl,
                  };
                  return (
                    <Card key={t.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold">{t.title || t.topic || "(chưa đặt tên)"}</span>
                              <Badge variant="outline">{levelLabel(t.level)}</Badge>
                              {t.audioUrl && <Badge variant="secondary">Có audio</Badge>}
                            </div>
                            <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.question}</div>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-2">
                            <PublishToggle model="speakingTopic" id={t.id} published={t.published} />
                            <form
                              action={async () => {
                                "use server";
                                await deleteSpeakingTopicAction(t.id);
                              }}
                            >
                              <Button size="sm" variant="destructive" type="submit">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </form>
                          </div>
                        </div>

                        <details className="mt-3">
                          <summary className="cursor-pointer text-sm font-medium text-muted-foreground">Sửa</summary>
                          <div className="mt-3">
                            <SpeakingTopicForm
                              action={updateAction}
                              id={t.id}
                              defaults={defaults}
                              submitLabel="Lưu"
                              idSuffix={`-${t.id}`}
                            />
                          </div>
                        </details>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
