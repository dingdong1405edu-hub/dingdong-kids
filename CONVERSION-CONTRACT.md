# HỢP ĐỒNG CHUYỂN ĐỔI — DingDong HSK → DingDong Kids

> **BẮT BUỘC ĐỌC TRƯỚC KHI SỬA BẤT KỲ FILE NÀO.**
> Dự án đang chuyển 100% từ *học tiếng Trung (HSK, người lớn)* sang
> *học tiếng Anh cho TRẺ EM (4–15 tuổi)*, theo chuẩn Cambridge Young Learners.
> Tầng nền tảng (schema + lib lõi) ĐÃ XONG. Việc còn lại là sửa tầng trên cho khớp.

---

## 1. QUY TẮC VÀNG

1. **KHÔNG còn một chữ Hán, một chữ pinyin, một chữ "HSK" nào** trong mã nguồn.
2. Ngôn ngữ **giao diện = TIẾNG VIỆT** (người dùng là trẻ em Việt + phụ huynh Việt).
   Ngôn ngữ **học = TIẾNG ANH**. Đừng dịch giao diện sang tiếng Anh.
3. Văn phong hướng **TRẺ EM**: câu ngắn, từ đơn giản, luôn khen trước khi sửa,
   không dùng nhãn tiêu cực ("Yếu", "Kém", "Sai bét"). Emoji dùng vừa phải.
4. **Không đổi kiến trúc**. Giữ nguyên cấu trúc component, luồng dữ liệu, tên file
   (trừ khi mục 6 yêu cầu xoá). Đây là chuyển đổi nội dung + kiểu dữ liệu, không
   phải viết lại kiến trúc.
5. Nếu một file **chỉ phục vụ tiếng Trung** và không có tương đương → xoá phần đó,
   đừng cố "dịch" gượng ép.

---

## 2. BẢNG ĐỔI KIỂU DỮ LIỆU (Prisma — đã đổi xong trong schema)

| CŨ | MỚI |
|---|---|
| `HSKLevel` (enum) | `EnglishLevel` (enum) |
| `HSK1 HSK2 HSK3 HSK4 HSK5 HSK6` | `PRE_STARTERS STARTERS MOVERS FLYERS KET PET` |
| `hskLevel` (mọi field) | `level` |
| `Subscription.hskLevel` | `Subscription.level` |
| `User.hskLevel` | `User.level` |
| `Skill.HANZI`, `Skill.PINYIN` | **XOÁ** · thêm `Skill.PHONICS` |
| `titleZh` | **XOÁ** (dùng `theme` trên VocabUnit/GrammarUnit; `subtitle` trên Course/RoadmapChapter) |
| `topicZh` | `topicVi` (nhãn phụ TIẾNG VIỆT của chủ đề) |
| `promptZh`, `questionZh` | `prompt`, `question` (bản tiếng Anh là bản chính) |
| `questionVi` | giữ nguyên |
| `passagePinyin`, `promptPinyin`, `sampleAnswerPinyin` | **XOÁ** |
| `VocabWord.hanzi` | `VocabWord.word` |
| `VocabWord.pinyin` | `VocabWord.ipa` |
| `VocabWord` thêm | `partOfSpeech`, `imageUrl` |
| `SavedWord.hanzi` | `SavedWord.word` · `SavedWord.pinyin` → `ipa` · `hskLevel` → `level` |
| `RoadmapWordReview.hanzi` | `.word` · `.pinyin` → `.ipa` · thêm `.imageUrl` |
| `HanziCharacter`, `HanziProgress` | **XOÁ MODEL** |
| `PinyinProgress` | `PhonicsProgress` |
| `minChars` (Writing/Speaking/Exam) | `minWords` |
| `MockExamPart.writingMinChars` | `writingMinWords` |
| `MaterialCategory.HANZI/PRONUNCIATION` | `SPELLING` / `PHONICS` |
| `Question` thêm | `imageUrl`, `audioUrl` |
| `ReadingTest` thêm | `audioUrl` (đọc mẫu bằng TTS) |
| `Upload` thêm | `ttsKey` (khoá cache TTS) |
| `MockExam.titleZh` | **XOÁ** |
| `Course.titleZh` | `Course.subtitle` |
| `RoadmapChapter.titleZh` | `RoadmapChapter.subtitle` |

---

## 3. LIB LÕI (đã viết xong — DÙNG, ĐỪNG VIẾT LẠI)

| File | Cung cấp |
|---|---|
| `src/lib/roadmap.ts` | `LEVELS`, `Level`, `LEVEL_ORDER`, `COURSE_THEME`, `themeFor()`, `levelLabel()`, `levelToSlug()`, `slugToLevel()`, `isLevel()`, `SKILL_META`, `SkillKey`, `RoadmapLessonDTO` |
| `src/lib/utils.ts` | `cn()`, **`countWords()`** (thay `countChineseChars`), `markWord()`, `formatDuration()`, **`levelLabel()`**, **`levelLabelWithAge()`** (thay `hskLevelLabel`), `xpToLevel()`, **`levelBadgeClass()`** (thay `hskBadgeClass`), `coverGradient()`, **`coverEmoji()`** (thay `coverChar`), `socialProofCount()` |
| `src/lib/english.ts` | `normalizeAnswer()`, `editDistance()`, **`isAnswerAcceptable()`** (chấm nới cho trẻ), `splitWords()`, `countSyllables()`, `letters()`, `shuffle()`, `rime()`, `rhymesWith()`, `capitalize()` |
| `src/lib/tts.ts` | **MỚI** — `synthesizeSpeech()`, `synthesizeMany()`, `ensureAudio()`, `TTS_VOICES`, `isTtsConfigured()` |
| `src/lib/phonics-data.ts` | `SOUND_GROUPS`, `ALL_LETTER_SOUNDS`, `DIGRAPHS`, `VOWEL_TEAMS`, `CVC_WORDS`, `RHYME_SETS`, `SIGHT_WORDS`, type `Sound` |
| `src/lib/phonics-lessons.ts` | `PHONICS_LESSONS`, `getPhonicsLesson()`, `scoredCardCount()`, type `PhonicsCard` |
| `src/lib/groq.ts` | `gradeWriting({submission, level, taskPrompt, minWords, outline})`, `gradeSpeaking({..., level})`, `gradeSpeakingTopic({..., question, level, minWords})`, `generateReadingQuestions({passage, level, count})`, `generateListeningQuestions({transcript, level, count})`, `generatePassageAnalysis({passage, level})`, `generateReadingExplanation({..., level})`, **`generateWordLookup(word)`** (thay `generateHanziLookup`), `generateTranscriptExplanation({transcript, level})` |
| `src/lib/chat.ts` | **`streamDingReply({messages, level, name})`** (thay `streamBaoReply`), `makeThinkStripper()` |
| `src/lib/payment-plans.ts` | `PAYMENT_PLANS`, `ROADMAP_PLANS`, `FREESTYLE_PLANS`, `getPlan()`, `roadmapPlanForLevel()`, `formatVnd()`; `PlanGrant.level` (không còn `hskLevel`) |
| `src/lib/entitlements.ts` | `getEntitlements()`, `hasRoadmapLevel(ent, level)`, `isRoadmapLessonLocked()`, `FREE_ROADMAP_LESSONS` |

### ĐÃ XOÁ — đừng import
`src/lib/pinyin.ts`, `pinyin-data.ts`, `pinyin-lessons.ts`, `pinyin-confusions.ts`,
`src/server/actions/hanzi.ts`, `hanzi-lookup.ts`, `pinyin.ts`,
`src/components/hanzi/**`, `src/components/learn/pinyin/**`, `src/components/learn/hanzi/**`,
`stroke-cell.tsx`, `stroke-quiz.tsx`, `freehand-pad.tsx`, `pinyin-text.tsx`, `char-lookup.tsx`,
`hanzi-section-editor.tsx`, `src/app/(learn)/hanzi/**`, `src/app/admin/hanzi/**`.
Package `hanzi-writer` và `pinyin-pro` đã gỡ.

---

## 4. ĐỔI KIỂU BÀI TẬP (`src/types/index.ts`)

**GIỮ:** `match`, `translate`, `fill_blank`, `sentence_order`/`sentenceOrder`,
`answer_question`, `type_sentence`.

**XOÁ:** `toneSelect`, `pinyinMatch`, `hanziInput` — cùng mọi component render chúng.

**THÊM MỚI (cho trẻ nhỏ):**
- `picture_match` — nhìn ẢNH → chọn từ. `{ imageUrl, audioUrl?, options[], correct }`
- `listen_pick` — nghe AUDIO → chọn ảnh. `{ audioUrl, text, options[{imageUrl,label}], correct }`
- `spell_drag` — kéo thả chữ cái ghép từ. `{ word, imageUrl?, audioUrl?, distractors? }`
- `rhyme_match` — nối từ cùng vần. `{ pairs[{a,b,imageUrlA?,imageUrlB?}] }`

Chi tiết field: xem interface trong `src/types/index.ts`.

**Đổi shape:**
- `MatchExercise.pairs`: `{zh, vi, pinyin}` → `{en, vi, imageUrl?, audioUrl?}`
- `TranslateExercise.direction`: `zh_to_vi|vi_to_zh` → `en_to_vi|vi_to_en`
- `SituationalExample`: `{situation, hanzi, pinyin, meaning, ...}` → `{situation, sentence, meaning, audioUrl?, imageUrl?, note?}`
- `TheorySection.titleZh` → `titleEn`
- `FormulaPart`: bỏ `pinyin`
- `WordExample`: `{hanzi, pinyin, meaning}` → `{sentence, meaning, audioUrl?}`
- `VocabWordCard`: `{hanzi, pinyin, ...}` → `{word, ipa, partOfSpeech, imageUrl, ...}`
- `QuestionOption`: `{text, pinyin?}` → `{text, imageUrl?}`
- `SpeakingGradeResult.criteria.tones` → `.intonation`
- `SpeakingTopicGradeResult.charCount` → `.wordCount`

---

## 5. HỆ THIẾT KẾ MỚI (đã cấu hình xong)

Giao diện phải **tươi sáng, tròn trịa, cuốn hút trẻ em**. Đã có sẵn:

**Màu** (CSS vars trong `globals.css`): `--primary` = xanh biển tươi
`hsl(202 90% 48%)`, `--sunny` = vàng nắng (dùng cho sao/streak/thưởng), nền kem ấm.
Dùng `bg-primary`, `text-sunny`, … như bình thường. Bo góc mặc định `--radius: 1.25rem` (rất tròn).

**Font**: `font-display` = Baloo 2 (tiêu đề, tròn mập) · `font-sans` = Nunito (thân) ·
`font-primer` = Andika (phông DẠY ĐỌC, chữ a/g một tầng — dùng cho từ mẫu Phonics,
thẻ từ vựng, mọi chỗ trẻ đang tập nhận mặt chữ).

**Class tiện ích mới**:
- `.btn-chunky` — nút 3D có gờ, nhấn xuống lún. Dùng cho MỌI nút hành động chính.
- `.sticker` — thẻ viền dày + bóng lệch, như miếng dán.
- `.writing-lines` — nền kẻ 4 ly như vở tập viết tiếng Anh.
- `.text-gradient-brand`, `.text-gradient-sunny`
- `.hero-brand`, `.aurora-bg`, `.hero-grid`, `.glass`, `.peaceful-bg`
- Animation: `animate-pop-in`, `animate-wiggle`, `animate-bounce-soft`,
  `animate-star-pop`, `animate-emoji`, `animate-fade-up`, `animate-float-y`
- Shadow: `shadow-chunky`, `shadow-chunky-sm`, `shadow-soft`, `shadow-soft-lg`

**Đã xoá khỏi CSS**: `.font-chinese`, `.font-pinyin`, `ruby rt`, `.tone-1..4`,
`.tianzi-grid`, `.text-gradient-green`, `.hero-green`, `.animate-hanzi`.
→ Nếu file bạn sửa dùng các class này, thay bằng tương đương ở trên hoặc bỏ.

**Nguyên tắc bố cục cho trẻ**:
- Vùng chạm ≥ 48px (đã ép trong `globals.css`, đừng ghi đè nhỏ hơn).
- Ít chữ – nhiều hình. Mọi lựa chọn nên có ảnh/emoji đi kèm khi có thể.
- Cỡ chữ nội dung ≥ 17px; từ vựng đang học hiển thị RẤT TO (≥ 40px).
- Mọi từ/câu tiếng Anh nên có nút loa phát audio bên cạnh.

---

## 6. ÂM THANH — THAY ĐỔI QUAN TRỌNG

Bản tiếng Trung KHÔNG có TTS nên bắt admin tự tải MP3. **Với tiếng Anh thì có.**
- Sinh audio: `import { synthesizeSpeech, ensureAudio } from "@/lib/tts"` (server-side).
- Trong admin: mọi ô nhập văn bản tiếng Anh nên có nút **"🔊 Tạo audio"**.
- Web Speech dự phòng ở client: đổi `zh-CN`/`cmn-CN` → **`en-US`**.
- STT: `src/lib/stt.ts` đã đổi sang `en-US`, không phải sửa gì.

---

## 7. CÁCH VIẾT LẠI NỘI DUNG TIẾNG VIỆT

| Cũ | Mới |
|---|---|
| "Học tiếng Trung" | "Học tiếng Anh" |
| "chữ Hán", "Hán tự" | (bỏ) hoặc "mặt chữ", "từ" |
| "pinyin", "phiên âm" | "phát âm" / "phiên âm IPA" |
| "thanh điệu" | "trọng âm" / "ngữ điệu" |
| "HSK 3" | "Movers" (dùng `levelLabel(level)`) |
| "HSKK" | "Cambridge Speaking" |
| "học viên" | "bé" / "con" (với trẻ) hoặc "học viên" (với phụ huynh/admin) |
| "Chữ Hán" (tên module) | "Ghép vần" (Phonics) |
| "Bao" (trợ lý, bánh bao) | **"Ding"** (chú gấu con) |
| "DingDong HSK" | "DingDong Kids" |

Giọng điệu ví dụ: ~~"Bạn đã trả lời sai. Đáp án đúng là..."~~
→ **"Chưa đúng rồi! Đáp án đúng là... Bé thử lại nhé 🌟"**

---

## 8. CÁCH LÀM VIỆC

1. Chỉ sửa file trong phạm vi được giao. **Không sửa file ngoài phạm vi** —
   agent khác đang làm, sẽ xung đột.
2. Đọc file trước khi sửa. Giữ nguyên comment tiếng Việt giải thích *tại sao*
   (chúng có giá trị), chỉ cập nhật phần nói về tiếng Trung.
3. Không chạy `npm run build` (chậm, và agent khác đang sửa dở).
   Có thể chạy `npx tsc --noEmit` để tự kiểm tra nhưng **lỗi ở file ngoài phạm vi
   của bạn là bình thường** — bỏ qua chúng.
4. Nếu cần một hàm chưa có trong lib lõi, **tự viết trong file của bạn**, đừng sửa
   file lib dùng chung.
5. Khi gặp nội dung mẫu tiếng Trung (câu ví dụ, đề bài, từ vựng) → **viết nội dung
   tiếng Anh mới hợp lứa tuổi**, đừng dịch máy móc. Chủ đề hợp trẻ em: animals,
   family, food, colours, numbers, toys, school, weather, body, clothes, sports,
   my day, my house, seasons, jobs.
6. Báo cáo cuối: liệt kê file đã sửa + việc gì chưa làm được và vì sao.
