"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Loader2, Save, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  bulkCreateReadingQuestionsAction,
  generateReadingQuestionsAction,
} from "@/server/actions/admin";

const PLACEHOLDER = `[
  {
    "type": "MCQ",
    "prompt": "What pet does Mai have?",
    "promptTranslation": "Bé Mai nuôi con vật gì?",
    "options": ["a dog", "a cat", "a fish", "a bird"],
    "optionsTranslation": ["một chú chó", "một chú mèo", "một chú cá", "một chú chim"],
    "answer": 0,
    "explanation": "Bài đọc nói Mai có một chú chó nhỏ tên Bông.",
    "supportingQuote": "Mai has a little dog.",
    "quoteTranslation": "Bé Mai có một chú chó nhỏ."
  },
  {
    "type": "TRUE_FALSE",
    "prompt": "Mai and Bong run in the garden.",
    "promptTranslation": "Mai và Bông chạy chơi trong vườn.",
    "answer": true,
    "explanation": "Bài đọc kể sáng nào hai bạn cũng chạy trong vườn.",
    "supportingQuote": "They run in the garden every morning.",
    "quoteTranslation": "Sáng nào hai bạn cũng chạy trong vườn."
  },
  {
    "type": "FILL_BLANK",
    "prompt": "The dog's name is ___.",
    "promptTranslation": "Chú chó tên là ___.",
    "answer": "Bong",
    "accepted": ["bong"],
    "explanation": "Câu thứ hai cho biết tên chú chó.",
    "supportingQuote": "His name is Bong.",
    "quoteTranslation": "Tên bạn ấy là Bông."
  }
]`;

/**
 * Ô nhập câu hỏi đọc hiểu dùng chung cho 2 luồng:
 *  - "AI tạo câu hỏi": Groq sinh JSON từ đoạn văn → đổ vào ô để admin DUYỆT.
 *  - "Lưu tất cả câu hỏi": validate + thêm hàng loạt vào bài đọc.
 * Cả hai dùng đúng một định dạng JSON (xem PLACEHOLDER).
 */
export function ReadingQuestionsImporter({ readingId }: { readingId: string }) {
  const router = useRouter();
  const [json, setJson] = useState("");
  const [count, setCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleGenerate() {
    if (generating || saving) return;
    setGenerating(true);
    const res = await generateReadingQuestionsAction(readingId, count);
    setGenerating(false);
    if (res.ok) {
      setJson(res.json);
      toast.success("AI đã tạo câu hỏi — hãy kiểm tra/sửa rồi bấm Lưu.");
    } else {
      toast.error(res.error);
    }
  }

  async function handleSave() {
    if (generating || saving) return;
    if (!json.trim()) {
      toast.error("Ô JSON đang trống.");
      return;
    }
    setSaving(true);
    const res = await bulkCreateReadingQuestionsAction(readingId, json);
    setSaving(false);
    if (res.ok) {
      toast.success(`Đã thêm ${res.count} câu hỏi.`);
      setJson("");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  const busy = generating || saving;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <Label>Số câu AI tạo</Label>
          <Input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
            className="w-24"
            disabled={busy}
          />
        </div>
        <Button type="button" variant="outline" onClick={handleGenerate} disabled={busy} className="gap-1.5">
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-primary" />}
          AI tạo câu hỏi từ đoạn văn
        </Button>
      </div>

      <div className="space-y-1">
        <Label>JSON câu hỏi</Label>
        <Textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder={PLACEHOLDER}
          className="min-h-64 font-mono text-xs"
          disabled={busy}
          spellCheck={false}
        />
        <p className="text-xs text-muted-foreground">
          Dán JSON một mảng câu hỏi (hoặc bấm “AI tạo câu hỏi”). Loại hỗ trợ:{" "}
          <span className="font-medium">MCQ</span> (kèm <code>options</code> + <code>answer</code> là chỉ số từ 0),{" "}
          <span className="font-medium">TRUE_FALSE</span> (<code>answer</code> true/false),{" "}
          <span className="font-medium">FILL_BLANK</span> (<code>answer</code> là từ tiếng Anh). Nên kèm bản dịch
          tiếng Việt: <code>promptTranslation</code>, <code>optionsTranslation</code>,{" "}
          <code>quoteTranslation</code> — hiện ở phần chữa bài để bé hiểu mình sai ở đâu. Audio đọc đề được
          tạo tự động khi lưu.
        </p>
      </div>

      <Button type="button" onClick={handleSave} disabled={busy} className="gap-1.5">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        <ListPlus className="h-4 w-4" /> Lưu tất cả câu hỏi
      </Button>
    </div>
  );
}
