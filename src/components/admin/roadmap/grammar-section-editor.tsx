"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { parseGrammarContent } from "@/lib/grammar";

const TEMPLATE = `{
  "version": 3,
  "sections": [
    {
      "id": "s1",
      "title": "Câu với động từ to be",
      "titleEn": "Verb to be (am / is / are)",
      "structure": "I + am / He + is / They + are",
      "breakdown": [
        { "part": "I", "role": "Chủ ngữ", "meaning": "Người hoặc vật được nói đến (I, he, she, it, we, they)." },
        { "part": "am", "role": "Động từ to be", "meaning": "Nghĩa là 'thì, là, ở'. Đi với 'I' thì luôn dùng 'am'." },
        { "part": "happy", "role": "Tính từ / Danh từ", "meaning": "Điều mình muốn nói về chủ ngữ." }
      ],
      "explanation": "Tiếng Việt nói 'Tớ vui' không cần chữ 'là'. Tiếng Anh thì BẮT BUỘC có am/is/are. I đi với am, he/she/it đi với is, we/you/they đi với are.",
      "usage": "Dùng khi giới thiệu bản thân, nói cảm xúc, nói tuổi, hoặc tả người và vật.",
      "mistakes": [
        { "wrong": "She happy.", "right": "She is happy.", "note": "Thiếu 'is'. Trẻ Việt hay quên vì tiếng Việt không cần động từ này." },
        { "wrong": "I is six.", "right": "I am six.", "note": "'I' luôn đi với 'am', không dùng 'is'." }
      ],
      "examples": [
        { "situation": "Giới thiệu bản thân", "sentence": "I am Mai.", "meaning": "Tớ là Mai." },
        { "situation": "Nói cảm xúc", "sentence": "She is happy.", "meaning": "Bạn ấy vui." },
        { "situation": "Tả đồ vật", "sentence": "The cats are small.", "meaning": "Những con mèo thì nhỏ." }
      ],
      "exercises": [
        { "type": "fill_blank", "sentence": "I ___ seven years old.", "blank": "am", "options": ["am", "is", "are", "be"], "explanation": "Chủ ngữ 'I' luôn đi với 'am'." },
        { "type": "sentence_order", "words": ["is", "She", "happy"], "answer": "She is happy", "meaning": "Bạn ấy vui." },
        { "type": "translate", "direction": "vi_to_en", "prompt": "Tớ là học sinh.", "answer": "I am a student", "options": ["I am a student", "I is a student", "I are student", "I a student"] },
        { "type": "picture_match", "imageUrl": "", "prompt": "Which one is a cat?", "options": ["cat", "dog", "pig"], "correct": 0 }
      ]
    }
  ],
  "test": { "timeLimit": 180, "passThreshold": 60, "questions": [] }
}`;

export function GrammarSectionEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const [text, setText] = useState(() => {
    const v = value as { sections?: unknown[] } | null;
    const hasContent = v && Array.isArray(v.sections) && v.sections.length > 0;
    if (hasContent) {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return TEMPLATE;
      }
    }
    return TEMPLATE;
  });
  const [err, setErr] = useState<string | null>(null);
  const [stat, setStat] = useState<string | null>(null);

  function handle(next: string) {
    setText(next);
    try {
      const obj = JSON.parse(next);
      const parsed = parseGrammarContent(obj);
      setErr(null);
      setStat(`${parsed.sections.length} phần lý thuyết · ${parsed.test.questions.length} câu kiểm tra`);
      onChange(obj);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "JSON không hợp lệ");
      setStat(null);
    }
  }

  // Đồng bộ nội dung mẫu/đang có lên panel ngay khi mở (để bấm Lưu là khớp).
  useEffect(() => {
    handle(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Soạn theo JSON v3 (gồm các phần lý thuyết + bài tập + bài kiểm tra). Để trống mảng test.questions nếu
          không cần bài kiểm tra.
        </p>
        <Button type="button" size="sm" variant="ghost" onClick={() => handle(TEMPLATE)}>
          Chèn mẫu
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => handle(e.target.value)}
        spellCheck={false}
        className="min-h-72 font-mono text-xs"
      />
      {err ? (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5" /> {err}
        </p>
      ) : stat ? (
        <p className="flex items-center gap-1.5 text-xs text-brand-teal">
          <CheckCircle2 className="h-3.5 w-3.5" /> {stat}
        </p>
      ) : null}

      <details className="rounded-xl border bg-muted/20 p-3 text-xs">
        <summary className="cursor-pointer font-medium">Hướng dẫn cấu trúc &amp; loại bài tập</summary>
        <div className="mt-2 space-y-1.5 text-muted-foreground">
          <p>
            Mỗi <code>section</code> gồm: <b>title</b>, <b>structure</b> (công thức), <b>breakdown</b> (giải
            nghĩa <i>từng phần</i> của công thức — phần quan trọng nhất cho người mới), <b>explanation</b>,{" "}
            <b>usage</b> (khi nào dùng), <b>mistakes</b> (lỗi thường gặp), <b>examples</b> (tình huống) và{" "}
            <b>exercises</b> (minigame luyện tập). <code>test.questions</code> là bài kiểm tra (để trống nếu không cần).
          </p>
          <p className="rounded-lg border border-brand-grape/40 bg-band-lav/60 p-2">
            <b>breakdown</b> là mảng theo đúng thứ tự công thức, mỗi phần:{" "}
            <code>{`{ "part": "am", "role": "Động từ to be", "meaning": "Nghĩa là 'thì, là'" }`}</code>.
            Mỗi phần sẽ thành một thẻ màu riêng, khớp màu với ô trong công thức.{" "}
            <b>mistakes</b>: <code>{`{ "wrong": "She happy", "right": "She is happy", "note": "..." }`}</code>.
          </p>
          <p>Các loại bài tập (mỗi câu tự chứa đáp án đúng):</p>
          <ul className="ml-4 list-disc space-y-0.5">
            <li><code>fill_blank</code>: {`{ sentence: "I ___ six.", blank: "am", options: [...] }`}</li>
            <li><code>sentence_order</code>: {`{ words: [...], answer: "She is happy" }`}</li>
            <li><code>translate</code>: {`{ direction: "vi_to_en"|"en_to_vi", prompt, answer, options: [...] }`}</li>
            <li><code>picture_match</code>: {`{ imageUrl, prompt, options: [...], correct: 0 }`} — nhìn ảnh chọn từ</li>
            <li><code>listen_pick</code>: {`{ audioUrl, text, options: [{ imageUrl, label }], correct: 0 }`} — nghe chọn ảnh</li>
            <li><code>spell_drag</code>: {`{ word: "cat", imageUrl, audioUrl }`} — kéo chữ cái ghép từ</li>
            <li><code>rhyme_match</code>: {`{ pairs: [{ a: "cat", b: "hat" }] }`} — nối từ cùng vần</li>
          </ul>
          <p className="rounded-lg border border-brand-sky/40 bg-band-sky/60 p-2">
            Với trẻ nhỏ chưa đọc thạo, ưu tiên <code>picture_match</code> và <code>listen_pick</code>.
            Để trống <code>audioUrl</code> rồi bấm &ldquo;Tạo audio&rdquo; — hệ thống tự sinh giọng đọc.
          </p>
        </div>
      </details>
    </div>
  );
}
