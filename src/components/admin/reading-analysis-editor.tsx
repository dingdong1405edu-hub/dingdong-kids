"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Loader2, Save, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  generateReadingAnalysisAction,
  saveReadingAnalysisAction,
} from "@/server/actions/admin";

const PLACEHOLDER = `{
  "translation": "Cuối tuần tôi đã đi công viên. Buổi sáng tôi cùng bạn chạy bộ, buổi chiều chúng tôi cùng xem phim.",
  "sentences": [
    { "zh": "周末我去了公园。", "vi": "Cuối tuần tôi đã đi công viên.", "note": "了 đứng sau động từ chỉ hành động đã hoàn thành." },
    { "zh": "早上我和朋友一起跑步。", "vi": "Buổi sáng tôi cùng bạn chạy bộ.", "note": "和…一起 = cùng với… làm gì." }
  ]
}`;

/**
 * Ô soạn "Dịch & phân tích bài đọc" trên trang chi tiết bài đọc. Hai lối vào,
 * cùng một định dạng JSON:
 *  - "AI tạo": Groq dịch + phân tích từng câu rồi LƯU + đổ JSON vào ô để admin sửa.
 *  - "Lưu": validate + ghi vào bài (ô rỗng = xoá dịch & phân tích).
 */
export function ReadingAnalysisEditor({
  readingId,
  initialJson,
}: {
  readingId: string;
  initialJson: string;
}) {
  const router = useRouter();
  const [json, setJson] = useState(initialJson);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const busy = generating || saving;

  async function handleGenerate() {
    if (busy) return;
    setGenerating(true);
    const res = await generateReadingAnalysisAction(readingId);
    setGenerating(false);
    if (res.ok) {
      setJson(res.json);
      toast.success(`AI đã tạo dịch + ${res.sentences} câu phân tích — đã lưu, bạn có thể sửa lại.`);
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  async function handleSave() {
    if (busy) return;
    setSaving(true);
    const res = await saveReadingAnalysisAction(readingId, json);
    setSaving(false);
    if (res.ok) {
      if (res.cleared) toast.success("Đã xoá dịch & phân tích.");
      else if (res.sentences != null) toast.success(`Đã lưu dịch + ${res.sentences} câu phân tích.`);
      else toast.success("Đã lưu bản dịch bài đọc.");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="space-y-3">
      <Button type="button" variant="outline" onClick={handleGenerate} disabled={busy} className="gap-1.5">
        {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-primary" />}
        AI tạo dịch + phân tích từ đoạn văn
      </Button>

      <div className="space-y-1">
        <Label className="flex items-center gap-1.5">
          <Languages className="h-4 w-4" /> JSON dịch &amp; phân tích
        </Label>
        <Textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder={PLACEHOLDER}
          className="min-h-64 font-mono text-xs"
          disabled={busy}
          spellCheck={false}
        />
        <p className="text-xs text-muted-foreground">
          Object gồm <code>translation</code> (dịch cả bài) và <code>sentences</code> (mảng phân tích từng câu:{" "}
          <code>zh</code> câu Hán · <code>vi</code> dịch · <code>note</code> giải thích, tùy chọn). Để trống rồi Lưu để
          xoá. Không cần nhập pinyin — máy tự sinh khi hiển thị.
        </p>
      </div>

      <Button type="button" onClick={handleSave} disabled={busy} className="gap-1.5">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Lưu dịch &amp; phân tích
      </Button>
    </div>
  );
}
