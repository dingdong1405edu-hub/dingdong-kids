import { Card, CardContent } from "@/components/ui/card";

/**
 * Beginner-friendly, in-page guide for authoring a grammar lesson's JSON.
 * Rendered on the admin grammar unit page so a new admin can read it and add a
 * lesson by hand. Pure presentational (server component, native <details>).
 */
function Code({ children }: { children: string }) {
  return (
    <pre className="mt-2 overflow-x-auto rounded-lg border bg-muted/50 p-3 font-mono text-[11px] leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function Field({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <li className="text-[13px]">
      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">{name}</code>{" "}
      <span className="text-muted-foreground">— {children}</span>
    </li>
  );
}

export function GrammarAuthorGuide() {
  return (
    <Card className="border-violet-200 bg-violet-50/40 dark:border-violet-400/25 dark:bg-violet-500/10">
      <CardContent className="p-4">
        <details>
          <summary className="cursor-pointer select-none text-sm font-bold text-violet-800 dark:text-violet-300">
            📘 Hướng dẫn thêm bài ngữ pháp (JSON) — bấm để mở
          </summary>

          <div className="mt-4 space-y-5 text-sm">
            {/* Overview */}
            <section className="space-y-2">
              <h3 className="font-semibold">1. Cấu trúc tổng thể</h3>
              <p className="text-muted-foreground">
                Mỗi bài học là một object gồm <b>sections</b> (các phần) và <b>test</b> (bài kiểm
                tra). Mỗi phần có <b>lý thuyết riêng</b> và <b>bài tập riêng</b> — học viên học xong
                lý thuyết phần nào sẽ luyện tập ngay phần đó, rồi sang phần tiếp theo.{" "}
                <b>Hoàn thành phần luyện tập là mở khoá bài kế tiếp</b> (KHÔNG bắt buộc làm bài kiểm
                tra). Bài <b>test</b> được <b>tách riêng</b> (nút “Kiểm tra”); chấm xong sẽ hiện đáp
                án và chỉ rõ câu sai, và chỉ khi đạt <b>≥ 80%</b> mới được điểm kinh nghiệm.
              </p>
              <div className="rounded-lg border border-violet-300 bg-violet-100/60 p-3 text-[13px] text-violet-900 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-200">
                <b>Bắt buộc về số lượng minigame:</b> mỗi điểm ngữ pháp (mỗi <b>section</b>) cần có
                đủ <b>8 minigame</b> — 2× <b>chọn từ</b> (<code>fill_blank</code>), 2× <b>sắp xếp
                câu</b> (<code>sentence_order</code>), 2× <b>dịch Việt→Trung</b> (
                <code>translate</code>, <code>direction: "vi_to_zh"</code>), 2× <b>dịch Trung→Việt</b>{" "}
                (<code>translate</code>, <code>direction: "zh_to_vi"</code>). Lưu thiếu vẫn được nhưng
                hệ thống sẽ nhắc.
              </div>
              <Code>{`{
  "version": 3,
  "sections": [ { ...phần 1 (đủ 8 minigame)... }, { ...phần 2... } ],
  "test": { "timeLimit": 180, "questions": [ ... ] }
}`}</Code>
            </section>

            {/* Section fields */}
            <section className="space-y-2">
              <h3 className="font-semibold">2. Một phần (section) gồm gì?</h3>
              <ul className="space-y-1">
                <Field name="id">mã ngắn, duy nhất trong bài (vd: "tobe-1").</Field>
                <Field name="title">tiêu đề tiếng Việt của phần.</Field>
                <Field name="titleEn">tên tiếng Anh của điểm ngữ pháp (tùy chọn, vd "Present Simple").</Field>
                <Field name="structure">công thức ngữ pháp — sẽ được tách thành các ô màu nổi bật, mỗi phần một màu (vd: "I + am + happy").</Field>
                <Field name="breakdown">
                  <b>(rất nên có)</b> mảng giải nghĩa <i>từng phần</i> của công thức, theo đúng thứ tự — mỗi phần
                  thành một thẻ màu riêng (khớp màu với ô trong công thức). Đây là thứ giúp người mới hiểu
                  công thức, không chỉ nhìn công thức suông.
                </Field>
                <Field name="explanation">giải thích chung bằng tiếng Việt (bắt buộc). Xuống dòng + bắt đầu bằng "- " để tạo gạch đầu dòng.</Field>
                <Field name="usage">(tùy chọn) khi nào / vì sao dùng cấu trúc này — hiện thành ô "Khi nào dùng" riêng.</Field>
                <Field name="mistakes">(tùy chọn) mảng lỗi thường gặp — hiện thành ô ❌ sai / ✔ đúng.</Field>
                <Field name="imageUrl">link ảnh minh hoạ (tùy chọn) — dán URL ảnh đã có trên mạng (vd: https://abc.com/anh.png). Bỏ field này nếu không có ảnh. Mỗi ví dụ cũng có thể có imageUrl riêng.</Field>
                <Field name="examples">mảng ví dụ theo ngữ cảnh (có thể để [] nếu chưa có).</Field>
                <Field name="exercises">
                  mảng bài tập của riêng phần này (học xong là làm luôn). <b>Nên đủ 8 minigame</b>:
                  2× fill_blank, 2× sentence_order, 2× translate vi_to_en, 2× translate en_to_vi.
                  Với Pre-Starters/Starters thì thay bớt bằng picture_match / listen_pick.
                </Field>
              </ul>
              <div className="rounded-lg border border-violet-200 bg-violet-50/60 p-3 dark:border-violet-400/25 dark:bg-violet-500/10">
                <p className="font-medium text-violet-900 dark:text-violet-200">
                  ⭐ breakdown — giải nghĩa từng phần công thức (nên có cho mọi bài)
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  Liệt kê theo <b>đúng thứ tự công thức</b>. Mỗi phần gồm <code>part</code> (ký hiệu/chữ
                  trong công thức), <code>role</code> (vai trò ngắn) và <code>meaning</code> (giải thích
                  dễ hiểu với trẻ).
                </p>
                <Code>{`"structure": "I + am + happy",
"breakdown": [
  { "part": "I", "role": "Chủ ngữ", "meaning": "Người/vật được nói đến (I, he, she…)." },
  { "part": "am", "role": "Động từ to be", "meaning": "Nghĩa là 'thì, là'. 'I' luôn đi với 'am'." },
  { "part": "happy", "role": "Tính từ", "meaning": "Điều muốn nói về chủ ngữ." }
]`}</Code>
              </div>

              <p className="text-muted-foreground">usage (khi nào dùng) &amp; mistakes (lỗi thường gặp) — tùy chọn:</p>
              <Code>{`"usage": "Dùng khi giới thiệu bản thân, nói cảm xúc, nói tuổi.",
"mistakes": [
  { "wrong": "She happy.", "right": "She is happy.", "note": "Thiếu 'is' — trẻ Việt hay quên." }
]`}</Code>

              <p className="text-muted-foreground">Mỗi ví dụ trong examples:</p>
              <Code>{`{
  "situation": "Khi giới thiệu bản thân",
  "sentence": "I am Mai.",
  "meaning": "Tớ là Mai.",
  "note": "Nói tên mình thì dùng 'I am'.",
  "audioUrl": ""   // để trống rồi bấm "Tạo audio"
}`}</Code>
            </section>

            {/* Exercise catalog */}
            <section className="space-y-3">
              <h3 className="font-semibold">3. Các loại bài tập (dùng cho exercises & test.questions)</h3>

              <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-[13px] dark:border-amber-400/25 dark:bg-amber-500/10">
                <b>Mẹo:</b> Mọi loại bài tập đều có thể thêm trường tùy chọn{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">explanation</code>{" "}
                — lời giải thích bằng tiếng Việt <b>tại sao đáp án đúng</b>. Khi học viên trả lời
                SAI, hệ thống sẽ hiện đáp án đúng kèm phần giải thích này (không chỉ hiện mỗi đáp án).
                Nên viết ngắn gọn, tập trung vào lỗi thường gặp.
              </div>

              <div>
                <p className="font-medium">a) Điền từ — trắc nghiệm (fill_blank)</p>
                <Code>{`{
  "type": "fill_blank",
  "sentence": "I ___ seven years old.",   // ___ là chỗ trống
  "blank": "am",                          // đáp án đúng
  "options": ["am", "is", "are", "be"],
  "hint": "Đi với 'I'",                   // tùy chọn
  "explanation": "Chủ ngữ 'I' luôn đi với 'am'. 'is' dùng cho he/she/it, 'are' cho we/you/they."  // hiện khi trả lời sai
}`}</Code>
              </div>

              <div>
                <p className="font-medium">b) Sắp xếp thành câu (sentence_order)</p>
                <Code>{`{
  "type": "sentence_order",
  "words": ["is", "She", "happy"],
  "answer": "She is happy",         // chuỗi đúng, các từ CÁCH NHAU bằng dấu cách
  "meaning": "Bạn ấy vui."          // tùy chọn
}`}</Code>
              </div>

              <div>
                <p className="font-medium">c) Trả lời câu hỏi — gõ tự do (answer_question)</p>
                <Code>{`{
  "type": "answer_question",
  "question": "Are you a student?",
  "accept": ["Yes I am", "Yes, I am", "I am a student"],  // các đáp án được chấp nhận
  "sampleAnswer": "Yes, I am.",                            // hiện ra khi chấm
  "hint": "Trả lời khẳng định"                             // tùy chọn
}`}</Code>
                <p className="text-[12px] text-muted-foreground">
                  Chấm bằng <b>accept</b> nhưng <b>nới cho trẻ</b>: tự bỏ dấu câu, không phân biệt
                  hoa/thường, và cho phép sai chính tả nhẹ (từ dài được sai 1–2 chữ cái). Hãy liệt kê
                  vài cách trả lời đúng phổ biến.
                </p>
              </div>

              <div>
                <p className="font-medium">d) Tự gõ câu hoàn chỉnh (type_sentence)</p>
                <Code>{`{
  "type": "type_sentence",
  "prompt": "Dịch sang tiếng Anh: Bạn ấy là bác sĩ.",
  "accept": ["She is a doctor", "He is a doctor"],  // các câu đúng được chấp nhận
  "meaning": "Bạn ấy là bác sĩ."                    // tùy chọn
}`}</Code>
              </div>

              <div>
                <p className="font-medium">e) Dịch — trắc nghiệm (translate)</p>
                <Code>{`{
  "type": "translate",
  "direction": "vi_to_en",     // hoặc "en_to_vi"
  "prompt": "Bạn ấy là bác sĩ.",
  "answer": "She is a doctor.",  // đáp án đúng, PHẢI nằm trong options
  "options": ["She is a doctor.", "He is a teacher.", "I am a student.", "She a doctor."]
}`}</Code>
              </div>

              <div className="rounded-lg border border-sky-200 bg-sky-50/60 p-3 dark:border-sky-400/25 dark:bg-sky-500/10">
                <p className="font-medium text-sky-900 dark:text-sky-200">
                  🧒 4 loại dành riêng cho trẻ nhỏ (chưa đọc thạo) — ưu tiên dùng ở Pre-Starters &amp; Starters
                </p>
                <Code>{`{ "type": "picture_match", "imageUrl": "...", "prompt": "Which one is a cat?",
  "options": ["cat", "dog", "pig"], "correct": 0 }

{ "type": "listen_pick", "audioUrl": "", "text": "apple",
  "options": [{ "imageUrl": "...", "label": "apple" }, { "imageUrl": "...", "label": "banana" }],
  "correct": 0 }

{ "type": "spell_drag", "word": "cat", "imageUrl": "...", "audioUrl": "",
  "distractors": ["s", "p"] }

{ "type": "rhyme_match", "pairs": [{ "a": "cat", "b": "hat" }, { "a": "dog", "b": "frog" }] }`}</Code>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  Để trống <code>audioUrl</code> rồi bấm &ldquo;Tạo audio&rdquo; — hệ thống tự sinh giọng
                  đọc bằng TTS. Trẻ 4–7 tuổi chưa đọc được nên <b>mọi câu hỏi đều cần audio hoặc ảnh</b>.
                </p>
              </div>

              <p className="text-[12px] text-muted-foreground">
                Còn có <code>match</code> (ghép Anh–Việt) nhưng loại này luôn đúng khi hoàn thành, nên
                chỉ dùng để luyện tập, KHÔNG nên đưa vào bài test.
              </p>
            </section>

            {/* Test + tips */}
            <section className="space-y-2">
              <h3 className="font-semibold">4. Bài kiểm tra & mẹo</h3>
              <ul className="space-y-1">
                <Field name="test.questions">mảng câu hỏi (dùng đúng các loại ở mục 3).</Field>
                <Field name="test.timeLimit">thời gian làm bài tính bằng giây (tùy chọn; bỏ qua nếu không giới hạn).</Field>
              </ul>
              <ul className="list-disc space-y-1 pl-5 text-[13px] text-muted-foreground">
                <li>
                  <b>Bài kiểm tra tách riêng</b> khỏi phần học (nút “Kiểm tra” ở danh sách bài). Chấm
                  xong hiện đáp án + chỉ rõ câu sai cho từng câu.
                </li>
                <li>
                  Đạt <b>≥ 80%</b> mới được điểm kinh nghiệm (mỗi bài chỉ thưởng một lần). Làm bài
                  kiểm tra <b>không bắt buộc</b> để sang bài tiếp theo.
                </li>
                <li>Học viên KHÔNG bị trừ tim ở phần ngữ pháp; mỗi bài luyện tập có nút Bỏ qua.</li>
                <li>Sau khi dán JSON, bấm lưu — nếu sai cấu trúc hệ thống sẽ báo lỗi cụ thể ngay.</li>
              </ul>
            </section>
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
