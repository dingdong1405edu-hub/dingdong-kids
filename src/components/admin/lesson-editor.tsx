"use client";
import { useActionState, useEffect, useRef } from "react";
import { saveLessonAction } from "@/server/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle2, Save, Info } from "lucide-react";

const VOCAB_TEMPLATE = `[
  {
    "type": "translate",
    "direction": "en_to_vi",
    "prompt": "hello",
    "answer": "xin chào",
    "options": ["xin chào", "tạm biệt", "cảm ơn", "xin lỗi"]
  },
  {
    "type": "picture_match",
    "imageUrl": "",
    "prompt": "Which word matches the picture?",
    "options": ["cat", "dog", "pig", "cow"],
    "correct": 0,
    "explanation": "Trong ảnh là một chú mèo — cat."
  },
  {
    "type": "listen_pick",
    "audioUrl": "",
    "text": "apple",
    "options": [
      { "imageUrl": "", "label": "apple" },
      { "imageUrl": "", "label": "banana" },
      { "imageUrl": "", "label": "orange" }
    ],
    "correct": 0
  },
  {
    "type": "spell_drag",
    "word": "cat",
    "imageUrl": "",
    "audioUrl": "",
    "distractors": ["s", "p"]
  }
]`;

// Grammar lessons use the v3 object: an ordered list of "sections" (mỗi phần =
// lý thuyết + bài tập của chính phần đó, học xong là luyện tập ngay) rồi tới
// "test" (bài kiểm tra tổng hợp — TÁCH RIÊNG, đạt ≥ 80% mới được XP).
//
// CHUẨN: mỗi điểm ngữ pháp (section) cần ĐỦ 8 MINIGAME — 2× chọn từ (fill_blank)
// + 2× sắp xếp câu (sentence_order) + 2× dịch Việt→Anh (translate vi_to_en)
// + 2× dịch Anh→Việt (translate en_to_vi). Với cấp nhỏ (Pre-Starters/Starters)
// nên thay bớt bằng picture_match / listen_pick vì trẻ chưa đọc thạo.
const GRAMMAR_TEMPLATE = `{
  "version": 3,
  "sections": [
    {
      "id": "tobe-1",
      "title": "Câu với động từ to be",
      "titleEn": "Verb to be (am / is / are)",
      "structure": "I + am · He/She/It + is · We/You/They + are",
      "breakdown": [
        { "part": "I", "role": "Chủ ngữ", "meaning": "Người hoặc vật được nói đến (I, he, she, it, we, they)." },
        { "part": "am", "role": "Động từ to be", "meaning": "Nghĩa là 'thì, là, ở'. 'I' luôn đi với 'am'." },
        { "part": "happy", "role": "Tính từ / Danh từ", "meaning": "Điều mình muốn nói về chủ ngữ." }
      ],
      "explanation": "Tiếng Việt nói 'Tớ vui' là đủ. Tiếng Anh BẮT BUỘC phải có am/is/are ở giữa. I → am; he, she, it → is; we, you, they → are.",
      "usage": "Dùng khi giới thiệu bản thân, nói cảm xúc, nói tuổi, hoặc tả người và vật.",
      "mistakes": [
        { "wrong": "She happy.", "right": "She is happy.", "note": "Thiếu 'is'. Trẻ Việt hay quên vì tiếng Việt không có động từ này." },
        { "wrong": "I is six.", "right": "I am six.", "note": "'I' luôn đi với 'am'." },
        { "wrong": "They is my friends.", "right": "They are my friends.", "note": "'They' số nhiều nên dùng 'are'." }
      ],
      "examples": [
        {
          "situation": "Khi giới thiệu bản thân",
          "sentence": "I am Mai.",
          "meaning": "Tớ là Mai.",
          "note": "Nói tên mình thì dùng 'I am'."
        },
        {
          "situation": "Khi nói về bạn",
          "sentence": "He is my friend.",
          "meaning": "Bạn ấy là bạn của tớ."
        }
      ],
      "exercises": [
        { "type": "fill_blank", "sentence": "I ___ seven years old.", "blank": "am", "options": ["am", "is", "are", "be"], "hint": "Đi với 'I'" },
        { "type": "fill_blank", "sentence": "She ___ my sister.", "blank": "is", "options": ["is", "am", "are", "be"] },
        { "type": "sentence_order", "words": ["is", "She", "happy"], "answer": "She is happy", "meaning": "Bạn ấy vui." },
        { "type": "sentence_order", "words": ["am", "I", "a", "student"], "answer": "I am a student", "meaning": "Tớ là học sinh." },
        { "type": "translate", "direction": "vi_to_en", "prompt": "Tớ là học sinh.", "answer": "I am a student", "options": ["I am a student", "I is a student", "I are student", "I a student"] },
        { "type": "translate", "direction": "vi_to_en", "prompt": "Bạn ấy vui.", "answer": "She is happy", "options": ["She is happy", "She happy", "She am happy", "She are happy"] },
        { "type": "translate", "direction": "en_to_vi", "prompt": "He is my friend.", "answer": "Bạn ấy là bạn của tớ.", "options": ["Bạn ấy là bạn của tớ.", "Bạn ấy là anh của tớ.", "Bạn ấy vui.", "Tớ có một người bạn."] },
        { "type": "translate", "direction": "en_to_vi", "prompt": "They are my parents.", "answer": "Họ là bố mẹ của tớ.", "options": ["Họ là bố mẹ của tớ.", "Họ là bạn của tớ.", "Đó là nhà của tớ.", "Tớ yêu bố mẹ."] }
      ]
    }
  ],
  "test": {
    "timeLimit": 180,
    "questions": [
      { "type": "fill_blank", "sentence": "He ___ a teacher.", "blank": "is", "options": ["is", "am", "are", "be"] },
      { "type": "sentence_order", "words": ["are", "We", "friends"], "answer": "We are friends" },
      { "type": "translate", "direction": "en_to_vi", "prompt": "I am happy.", "answer": "Tớ vui.", "options": ["Tớ vui.", "Tớ buồn.", "Tớ mệt.", "Tớ đói."] }
    ]
  }
}`;

interface Props {
  skill: "vocab" | "grammar";
  unitId: string;
  /** Present → edit mode; absent → create mode. */
  lesson?: { id: string; title: string; exercises: unknown };
}

export function LessonEditor({ skill, unitId, lesson }: Props) {
  const [state, action, pending] = useActionState(saveLessonAction, {
    ok: false,
  } as { ok: boolean; error?: string; warning?: string });
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!lesson;
  const isGrammar = skill === "grammar";
  const template = isGrammar ? GRAMMAR_TEMPLATE : VOCAB_TEMPLATE;

  // After a successful CREATE, clear the form so the next lesson starts fresh.
  useEffect(() => {
    if (state.ok && !isEdit) formRef.current?.reset();
  }, [state, isEdit]);

  return (
    <form ref={formRef} action={action} className="space-y-3">
      <input type="hidden" name="skill" value={skill} />
      <input type="hidden" name="unitId" value={unitId} />
      {lesson && <input type="hidden" name="lessonId" value={lesson.id} />}

      <div className="space-y-1">
        <Label>Tên bài học</Label>
        <Input name="title" defaultValue={lesson?.title ?? ""} placeholder="VD: Chào hỏi cơ bản" />
      </div>

      <div className="space-y-1">
        <Label>{isGrammar ? "Nội dung bài học (JSON)" : "Bài tập (mảng JSON)"}</Label>
        <Textarea
          name="exercises"
          defaultValue={lesson ? JSON.stringify(lesson.exercises, null, 2) : ""}
          placeholder={template}
          className="min-h-48 font-mono text-xs"
          spellCheck={false}
          required
        />
        {isGrammar ? (
          <p className="text-[11px] text-muted-foreground">
            Object gồm <code>sections</code> (mỗi phần: <code>title</code>, <code>structure</code>,{" "}
            <code>breakdown</code> — giải nghĩa từng phần công thức, <code>explanation</code>,{" "}
            <code>usage</code>, <code>mistakes</code>, <code>examples</code>, <code>imageUrl</code> tùy
            chọn, và <code>exercises</code> — bài tập của chính phần đó) và <code>test</code> (bài kiểm
            tra — tách riêng khỏi luồng học, đạt ≥ 80% mới được điểm kinh nghiệm).{" "}
            <b>
              Mỗi điểm ngữ pháp nên có đủ 8 minigame: 2× chọn từ (fill_blank), 2× sắp xếp câu
              (sentence_order), 2× dịch Việt→Anh (translate vi_to_en), 2× dịch Anh→Việt
              (translate en_to_vi).
            </b>{" "}
            Với Pre-Starters/Starters, nên thay bớt bằng <code>picture_match</code> và{" "}
            <code>listen_pick</code> vì trẻ chưa đọc thạo. Để trống ô trên sẽ hiện mẫu ví dụ chuẩn.
          </p>
        ) : (
          <p className="text-[11px] text-muted-foreground">
            Các loại được hỗ trợ: <code>match</code>, <code>translate</code>, <code>fill_blank</code>,{" "}
            <code>sentence_order</code>, <code>answer_question</code>, <code>type_sentence</code>, và
            4 loại dành riêng cho trẻ nhỏ: <code>picture_match</code>, <code>listen_pick</code>,{" "}
            <code>spell_drag</code>, <code>rhyme_match</code>. Để trống <code>audioUrl</code> rồi bấm
            &ldquo;Tạo audio&rdquo; — hệ thống tự sinh giọng đọc. Để trống ô trên sẽ hiện mẫu ví dụ.
          </p>
        )}
      </div>

      {state.error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}
      {state.ok && (
        <div className="flex items-center gap-2 rounded-md border border-brand-lime/40 bg-band-mint px-3 py-2 text-sm text-brand-teal">
          <CheckCircle2 className="h-4 w-4" /> Đã lưu bài học.
        </div>
      )}
      {state.ok && state.warning && (
        <div className="flex items-start gap-2 rounded-md border border-brand-yellow bg-band-sun px-3 py-2 text-sm text-brand-gold">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.warning}</span>
        </div>
      )}

      <Button type="submit" disabled={pending}>
        <Save className="mr-1.5 h-4 w-4" />
        {pending ? "Đang lưu..." : isEdit ? "Cập nhật bài học" : "Tạo bài học"}
      </Button>
    </form>
  );
}
