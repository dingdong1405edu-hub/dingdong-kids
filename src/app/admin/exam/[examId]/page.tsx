import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pencil, Plus, Save } from "lucide-react";
import { EXAM_SECTION_META, EXAM_SKILLS } from "@/lib/mock-exam";
import { createSectionAction, updateMockExamAction } from "@/server/actions/mock-exam";
import { LEVELS, themeFor } from "@/lib/roadmap";
import { levelLabel } from "@/lib/utils";
import { SectionBlock } from "./section-block";

interface Props {
  params: Promise<{ examId: string }>;
}

export default async function AdminExamDetailPage({ params }: Props) {
  const { examId } = await params;
  const exam = await db.mockExam.findUnique({
    where: { id: examId },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          parts: {
            orderBy: { order: "asc" },
            include: { questions: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });
  if (!exam) notFound();

  const usedSkills = new Set(exam.sections.map((s) => s.skill));

  return (
    <div className="space-y-6">
      <Link
        href="/admin/exam"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách đề thi
      </Link>
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-bold">{exam.title}</h1>
        <Badge variant="outline">{levelLabel(exam.level)}</Badge>
      </div>

      {/* Edit exam meta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Pencil className="h-4 w-4" /> Thông tin đề
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (fd: FormData) => {
              "use server";
              await updateMockExamAction(fd);
            }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <input type="hidden" name="id" value={exam.id} />
            <div className="space-y-1">
              <Label>Tiêu đề</Label>
              <Input name="title" defaultValue={exam.title} required />
            </div>
            <div className="space-y-1">
              <Label>Cấp độ</Label>
              <select
                name="level"
                defaultValue={exam.level}
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
              <Label>Tổng thời gian (phút)</Label>
              <Input
                name="totalTime"
                type="number"
                min="0"
                defaultValue={exam.totalTime ? Math.round(exam.totalTime / 60) : ""}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Mô tả</Label>
              <Textarea name="description" className="min-h-16" defaultValue={exam.description ?? ""} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="gap-1.5">
                <Save className="h-4 w-4" /> Lưu thay đổi
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Các phần thi</h2>
        {exam.sections.length === 0 ? (
          <p className="rounded-xl border border-dashed py-8 text-center text-sm text-muted-foreground">
            Chưa có phần nào. Thêm phần Listening / Reading / Writing / Speaking ở dưới.
          </p>
        ) : (
          exam.sections.map((section) => (
            <SectionBlock key={section.id} section={section} examId={exam.id} />
          ))
        )}
      </div>

      {/* Add section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Plus className="h-4 w-4" /> Thêm phần
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (fd: FormData) => {
              "use server";
              await createSectionAction(fd);
            }}
            className="flex flex-wrap items-end gap-3"
          >
            <input type="hidden" name="examId" value={exam.id} />
            <div className="space-y-1">
              <Label>Kỹ năng</Label>
              <select name="skill" className="flex h-9 w-56 rounded-md border px-3 py-1 text-sm">
                {EXAM_SKILLS.map((s) => (
                  <option key={s} value={s} disabled={usedSkills.has(s)}>
                    {EXAM_SECTION_META[s].en} · {EXAM_SECTION_META[s].label}
                    {usedSkills.has(s) ? " (đã có)" : ""}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit">Thêm phần</Button>
            <p className="w-full text-xs text-muted-foreground">
              Thứ tự khuyến nghị: Listening → Reading → Writing → Speaking (đúng thứ tự thi Cambridge).
              Phần được thêm theo thứ tự bạn tạo.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
