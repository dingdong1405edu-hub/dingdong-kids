# KẾ HOẠCH CHUYỂN ĐỔI 100% → **DingDong Kids**
### Từ "DingDong HSK" (tiếng Trung, người lớn) sang "Tiếng Anh cho trẻ nhỏ"

> Lập ngày 28/07/2026 · Dựa trên khảo sát toàn bộ mã nguồn hiện tại.

---

## 0. HIỆN TRẠNG ĐO ĐƯỢC

| Khu vực | Số file | Số dòng |
|---|---:|---:|
| `src/components/learn` | 98 | 12.588 |
| `src/lib` | 38 | 7.476 |
| `src/app/(learn)` | 52 | 6.946 |
| `src/server` (actions) | 21 | 6.317 |
| `src/components/admin` | 32 | 5.739 |
| `src/app/admin` | 28 | 5.404 |
| `prisma` (schema + loader) | 15 | 4.225 |
| `src/app/(marketing)` | 8 | 1.537 |
| `src/components/ui` (shadcn) | 13 | 636 |
| `src/app/api` | 17 | 615 |
| **TỔNG** | **347** | **~50.000** |

**Mật độ "chất Trung Quốc" cần bóc:**

| Từ khoá | Số lần xuất hiện |
|---|---:|
| `pinyin` / `Pinyin` | 1.229 |
| `HSK` | 836 |
| `hskLevel` | 721 |
| `hanzi` / `Hanzi` | 595 |
| `titleZh` | 177 |
| `HSKK` | 58 |
| `questionZh` / `promptZh` / `topicZh` / `labelZh` | 123 |

**Thư viện chỉ dùng cho tiếng Trung (sẽ gỡ):** `hanzi-writer`, `pinyin-pro`
**Font chỉ dùng cho tiếng Trung (sẽ gỡ):** `Noto Sans SC`, `Noto Serif` (pinyin)
**Dữ liệu nội dung tiếng Trung:** 39 file JSON trong `prisma/seed-data/` + 12 script `prisma/load-*.ts` → **xoá sạch**

---

## 1. QUYẾT ĐỊNH ĐÃ CHỐT

| # | Quyết định | Lựa chọn |
|---|---|---|
| 1 | Hệ thống cấp độ | **Cambridge YLE + Pre** (Pre-Starters → Starters → Movers → Flyers → KET → PET) |
| 2 | Module Chữ Hán + Pinyin | **Bỏ hẳn** — coi như làm lại dự án từ đầu, không port 1-1 |
| 3 | Database | **Dự án mới hoàn toàn** — DB mới trên Railway, DingDong HSK cũ chạy song song |
| 4 | Repo | **Repo mới `dingdongkids`**, copy source sang rồi chuyển đổi |

> **Giả định cần bạn xác nhận:** bạn chọn nhãn "5 cấp" nhưng bảng cấp trong lựa chọn có 6 mục.
> Tôi lấy **6 cấp** (thêm PET) để giữ nguyên cấu trúc 6 khoá lộ trình + 6 gói giá hiện có →
> ít phải sửa nhất. Nếu muốn 5 cấp, chỉ cần bỏ `PET` khỏi enum (làm ở Giai đoạn 1, rẻ).

---

## 2. BẢN ĐỒ CHUYỂN ĐỔI MIỀN DỮ LIỆU

### 2.1 Enum

```prisma
// XOÁ
enum HSKLevel { HSK1 HSK2 HSK3 HSK4 HSK5 HSK6 }

// THAY BẰNG
enum EnglishLevel {
  PRE_STARTERS   // 4–5 tuổi · làm quen, nghe–nói, nhận mặt chữ
  STARTERS       // 6–7 tuổi · Cambridge YLE Starters
  MOVERS         // 7–9 tuổi · Cambridge YLE Movers
  FLYERS         // 9–11 tuổi · Cambridge YLE Flyers
  KET            // 11–13 tuổi · Cambridge A2 Key for Schools
  PET            // 13–15 tuổi · Cambridge B1 Preliminary for Schools
}
```

```prisma
enum Skill {
  VOCAB  GRAMMAR  READING  LISTENING  WRITING  SPEAKING  MOCK   // GIỮ
  PHONICS                                                        // MỚI (thay chỗ PINYIN)
  // HANZI · PINYIN → XOÁ
}
```

### 2.2 Trường bị xoá / đổi tên trên toàn schema

| Hiện tại | DingDong Kids | Ghi chú |
|---|---|---|
| `hskLevel` (mọi model) | `level: EnglishLevel` | 721 chỗ |
| `titleZh` `topicZh` `promptZh` `questionZh` `labelZh` | **XOÁ** | Tiếng Anh **là** ngôn ngữ đích — không cần cột song ngữ thứ hai. Giữ lại các trường dịch **tiếng Việt** (`*Vi`) vì đó mới là ngôn ngữ mẹ đẻ của học viên |
| `passagePinyin` `promptPinyin` `questionPinyin` `sampleAnswerPinyin` | **XOÁ** hoặc → `*Ipa` (tuỳ chọn) | Xem §3.2 |
| `VocabWord.hanzi` | `VocabWord.word` | |
| `VocabWord.pinyin` | `VocabWord.ipa` | Phiên âm quốc tế, tuỳ chọn |
| `SavedWord.hanzi` | `SavedWord.word` | khoá `@@unique([userId, word])` |
| `RoadmapWordReview.hanzi` | `RoadmapWordReview.word` | |
| `HanziCharacter` `HanziProgress` | **XOÁ MODEL** | |
| `PinyinProgress` | → `PhonicsProgress` | Giữ nguyên hình dạng (lessonId tĩnh + bestScore) |
| `HanziCharacter.tone` `.strokeCount` `.strokeOrder` | **XOÁ** | |
| `MaterialCategory.HANZI` `.PRONUNCIATION` | → `SPELLING` `.PHONICS` | |
| `WritingTask.minChars` | `minWords` | Tiếng Anh đếm **từ**, không đếm ký tự |
| `SpeakingTopic.minChars` | `minWords` | |
| `MockExamPart.writingMinChars` | `writingMinWords` | |

### 2.3 Loại bài tập (`src/types/index.ts`)

| Hiện tại | DingDong Kids |
|---|---|
| `match` (zh ↔ vi) | **GIỮ** — đổi `{zh, vi, pinyin}` → `{en, vi, imageUrl}` |
| `translate` (`zh_to_vi` / `vi_to_zh`) | **GIỮ** — `en_to_vi` / `vi_to_en` |
| `sentenceOrder` | **GIỮ** — sắp xếp từ thành câu tiếng Anh |
| `fill_blank` | **GIỮ** |
| `answer_question` | **GIỮ** |
| `type_sentence` | **GIỮ** |
| `toneSelect` (chọn thanh điệu) | **XOÁ** |
| `pinyinMatch` | **XOÁ** |
| `hanziInput` | **XOÁ** |
| — | **MỚI** `pictureMatch` — nhìn ảnh chọn từ (cốt lõi cho trẻ chưa đọc tốt) |
| — | **MỚI** `listenAndPick` — nghe audio chọn ảnh/từ |
| — | **MỚI** `spellDrag` — kéo thả chữ cái thành từ |
| — | **MỚI** `rhymeMatch` — nối từ cùng vần (phonics) |

---

## 3. BA THAY ĐỔI KIẾN TRÚC LỚN (không chỉ đổi tên)

### 3.1 🔊 TTS — thay đổi lớn nhất, theo hướng TỐT

Dự án hiện tại có ràng buộc nặng nề ghi rõ trong `CLAUDE.md`:

> *"Deepgram & Groq KHÔNG có giọng TTS tiếng Trung → admin **tự tải file MP3 thật** lên cho bài nghe."*

**Ràng buộc này biến mất với tiếng Anh.** Deepgram Aura có giọng TTS tiếng Anh chất lượng cao.
Với sản phẩm cho trẻ em điều này **cực kỳ quan trọng** — mỗi từ vựng, mỗi câu ví dụ, mỗi câu hỏi
đều **bắt buộc** phải có audio (trẻ 5 tuổi chưa đọc được).

**Việc phải làm:**
- Thêm `src/lib/tts.ts` — Deepgram Aura → lưu `Upload` (bytea) → trả `/api/files/<id>`
- `POST /api/admin/tts` — admin bấm nút "Tạo audio" cho từ / câu / bài nghe
- Sinh audio hàng loạt khi import từ vựng (mỗi `VocabWord.audioUrl` tự có)
- `use-listening-audio.ts`: fallback Web Speech đổi `zh-CN` → `en-US` / `en-GB`
- Env mới: `DEEPGRAM_TTS_MODEL` (giọng), `DEEPGRAM_TTS_VOICE`
- ⚠️ **Cần kiểm chứng giá Aura trước khi bật sinh hàng loạt** — chi phí theo ký tự

### 3.2 🗣️ STT + Model AI

| Mục | Hiện tại | Mới |
|---|---|---|
| Deepgram language | `zh-CN` | `en-US` (trẻ VN học Anh–Mỹ) — đổi 1 biến env |
| Model chấm viết | `qwen/qwen3.6-27b` *(chọn vì Chinese-native)* | Lý do tồn tại biến mất → đổi mặc định sang `openai/gpt-oss-120b`. Cần **A/B thử lại** chứ không suy đoán |
| `/no_think` + `makeThinkStripper` | Cần cho Qwen | Giữ hạ tầng, vô hại |
| Prompt chấm viết | *"certified HSK examiner"*, tiêu chí 语法/词汇/连贯性 | *"Cambridge Young Learners examiner"*, tiêu chí **Grammar · Vocabulary · Spelling · Task completion** |
| Prompt chấm nói | *"HSKK examiner"*, chấm **thanh điệu** | Chấm **Pronunciation · Intonation · Fluency** — bỏ hẳn tiêu chí thanh điệu |
| Ghi chú người học | *"Vietnamese learner, tone confusion"* | *"Vietnamese child aged N, common L1 errors: final consonants (-s/-ed), /θ/ /ð/, word stress"* |
| Trợ lý chat "Bao" | Giải thích tiếng Trung | Giải thích tiếng Anh, **giọng điệu dành cho trẻ em**, câu ngắn, thân thiện |

**Cơ chế fallback nhiều model (`runGroqJson`) giữ nguyên 100%** — hạ tầng tốt, chỉ đổi danh sách model.

### 3.3 🖼️ Hình ảnh trở thành bắt buộc, không còn tuỳ chọn

Trẻ 4–8 tuổi chưa đọc thạo. Schema hiện đã có `imageUrl?` rải rác nhưng **đều là tuỳ chọn**.
Với DingDong Kids, hình ảnh là kênh truyền đạt chính:
- `VocabWord.imageUrl` → **bắt buộc** (thêm cột, hiện chưa có)
- `Question.imageUrl` → thêm cột (hiện chỉ `MockExamPart` có)
- Admin editor: bắt buộc upload ảnh trước khi publish từ vựng

---

## 4. PHÂN LOẠI: GIỮ / BỎ / LÀM MỚI

### ✅ GIỮ NGUYÊN (~60% mã nguồn — hạ tầng tốt, không phụ thuộc tiếng Trung)

| Hệ thống | File | Ghi chú |
|---|---|---|
| Auth (Google OAuth) | `lib/auth.ts`, `auth.config.ts`, `(auth)/**` | 100% giữ, chỉ đổi copy |
| Tim / XP / Streak | `lib/hearts.ts`, `heart-bar.tsx`, `xp-bar.tsx`, `streak-flame.tsx` | 100% giữ |
| SRS (SM-2) | `lib/srs.ts`, `review/**` | Thuật toán ngôn ngữ-trung lập, giữ nguyên |
| Thanh toán PayOS | `lib/payos.ts`, `entitlements.ts`, `api/payos/webhook` | Chỉ đổi tên gói + `hskLevel`→`level` |
| Bản đồ lộ trình Duolingo | `components/learn/roadmap/**` (17 file) | Giữ toàn bộ UI, đổi theme + nội dung |
| Admin CRUD + audit log | `lib/audit.ts`, `admin-guard.ts`, `admin/history` | 100% giữ |
| Upload file (Postgres bytea) | `lib/uploads.ts`, `api/files/[id]` | 100% giữ — giải pháp đúng cho Railway |
| Xuất PDF | `lib/pdf/**`, 7 route `api/pdf/**` | Giữ hạ tầng puppeteer, đổi template |
| shadcn/ui | `components/ui/**` (13 file) | 100% giữ |
| Diễn đàn cộng đồng | `lib/community-forum*.ts` | Giữ khung, **thay toàn bộ nội dung mẫu** |
| Góp ý / liên hệ | `feedback.ts`, `admin/feedback` | 100% giữ |
| Theme sáng/tối | `components/theme/**` | 100% giữ |

### ❌ XOÁ HẲN (~25 file + 51 file dữ liệu)

```
src/app/(learn)/hanzi/**                    (4 page: hanzi, [characterId], pinyin, pinyin/[lessonId])
src/app/admin/hanzi/page.tsx
src/components/hanzi/stroke-order-canvas.tsx
src/components/learn/pinyin/**              (6 file: pinyin-cards, pinyin-flow, pinyin-intro,
                                             pinyin-lesson-list, pinyin-table, sound-button)
src/components/learn/hanzi/hanzi-pdf.tsx
src/components/learn/vocab/stroke-cell.tsx
src/components/learn/vocab/stroke-quiz.tsx
src/components/learn/vocab/freehand-pad.tsx
src/components/learn/pinyin-text.tsx
src/components/learn/reading/char-lookup.tsx      (tra chữ Hán)
src/components/admin/roadmap/hanzi-section-editor.tsx
src/lib/pinyin.ts  ·  pinyin-data.ts  ·  pinyin-lessons.ts  ·  pinyin-confusions.ts
src/lib/transcript.ts                       (xử lý transcript tiếng Trung — viết lại)
src/server/actions/hanzi.ts  ·  hanzi-lookup.ts  ·  pinyin.ts
prisma/load-*.ts                            (12 script nạp nội dung tiếng Trung)
prisma/seed-data/*.json                     (39 file JSON nội dung tiếng Trung)
```

**Gỡ khỏi `package.json`:** `hanzi-writer`, `pinyin-pro`
**Gỡ khỏi `globals.css` + `tailwind.config.ts`:** font `Noto Sans SC`, `Noto Serif`,
class `.font-chinese`, `.font-pinyin`, toàn bộ CSS `ruby`/`rt` (dòng 287–316)

### 🆕 LÀM MỚI

| Hạng mục | Mô tả |
|---|---|
| **Module Phonics** | `(learn)/phonics/**` — âm chữ cái, digraph (sh/ch/th/ph), blend (bl/st/tr), CVC words, sight words (Dolch/Fry). Dữ liệu tĩnh trong `lib/phonics-lessons.ts` (mô phỏng cách `pinyin-lessons.ts` đã làm — kiến trúc đó đúng) |
| **`lib/tts.ts`** | Deepgram Aura → Upload → URL. Xem §3.1 |
| **4 loại bài tập mới** | `pictureMatch`, `listenAndPick`, `spellDrag`, `rhymeMatch` |
| **`lib/english.ts`** | Thay `pinyin.ts`: đếm từ, chuẩn hoá đáp án (bỏ dấu câu/hoa thường), so khớp "gần đúng" (chấp nhận sai chính tả nhẹ cho trẻ nhỏ) |
| **UI trẻ em** | Font tròn (Nunito đã có ✅ — giữ), màu tươi hơn, icon lớn hơn, chạm ≥ 48px, ít chữ – nhiều hình |
| **Mascot** | Bao (gấu trúc) hiện có → cần nhân vật mới hợp trẻ em học tiếng Anh. `components/marketing/bao-*.tsx` (5 file) viết lại |

---

## 5. KẾ HOẠCH THEO GIAI ĐOẠN

### **Giai đoạn 0 — Khởi tạo repo** *(nửa buổi)*
1. `git init` repo mới `dingdongkids` trên GitHub
2. Copy source (loại `.next/`, `node_modules/`, `tsconfig.tsbuildinfo`, `prisma/seed-data/`, `prisma/load-*.ts`)
3. `package.json`: `name` → `dingdong-kids`, gỡ `hanzi-writer` + `pinyin-pro`
4. Railway: project mới + Postgres mới + env mới
5. Viết `CLAUDE.md` mới cho DingDong Kids (bản hiện tại 28KB nói toàn về HSK — **viết lại từ đầu**)

> ⚠️ Trước khi copy: repo hiện có **10 file đang sửa dở chưa commit** (`reading-pdf`, `roadmap-pdf`,
> `pinyin.ts`, `admin.ts`…). Cần `git commit` hoặc `git stash` trước, nếu không sẽ copy nhầm trạng thái nửa vời.

### **Giai đoạn 1 — Schema + nền tảng** *(1–2 ngày)* — **chặn mọi thứ khác**
1. Viết lại `prisma/schema.prisma` theo §2 (911 dòng → ~800 dòng)
2. `npx prisma db push` lên DB mới
3. `src/types/index.ts` — loại bài tập mới, bỏ tone/pinyin
4. `src/lib/site.ts` — `SITE_NAME`, `SITE_URL`, email, mạng xã hội
5. `src/lib/levels.ts` (thay `roadmap.ts`) — 6 theme màu theo cấp YLE
6. `src/lib/payment-plans.ts` — 6 gói lộ trình + 2 gói tự do, đổi tên & giá
7. `src/lib/entitlements.ts` — `HSKLevel` → `EnglishLevel` (đổi kiểu là xong)

**Sau bước này `npm run typecheck` sẽ báo hàng trăm lỗi** — đó là danh sách việc của các giai đoạn sau.
Đây là chiến lược đúng: để trình biên dịch dẫn đường thay vì tự dò tay 347 file.

### **Giai đoạn 2 — Tầng lib + server actions** *(2–3 ngày)*
- `lib/groq.ts` (1.092 dòng) — viết lại toàn bộ prompt theo §3.2, giữ nguyên `runGroqJson` + fallback
- `lib/chat.ts` — prompt trợ lý Bao cho trẻ em
- `lib/deepgram.ts` + `lib/stt.ts` — `zh-CN` → `en-US`
- **`lib/tts.ts` — MỚI** (§3.1)
- `lib/english.ts` — MỚI, thay `pinyin.ts`
- `lib/phonics-lessons.ts` — MỚI
- `src/server/actions/**` (21 file, 6.317 dòng) — sửa theo lỗi typecheck
- Xoá `actions/hanzi.ts`, `hanzi-lookup.ts`, `pinyin.ts`

### **Giai đoạn 3 — Module học viên** *(4–6 ngày, phần nặng nhất)*
`src/components/learn` 98 file / 12.588 dòng + `src/app/(learn)` 52 file / 6.946 dòng

| Thứ tự | Module | Việc |
|---|---|---|
| 1 | **Vocab** | `word-flow.tsx` bỏ bước tô nét → thay bằng ảnh + audio + phát âm. `word-card`, `flashcard-deck`, `review/**` |
| 2 | **Phonics** (mới) | Dựng từ đầu, tham chiếu kiến trúc `pinyin/**` cũ |
| 3 | **Listening** | Bỏ ràng buộc upload MP3 → TTS tự động. `audio-player` thêm tốc độ chậm cho trẻ |
| 4 | **Reading** | Bỏ ruby/pinyin overlay, bỏ `char-lookup`. Giữ tra từ (từ điển Anh–Việt) |
| 5 | **Speaking** | Bỏ format HSKK 3 phần → Repeat / Read aloud / Answer. Bỏ tiêu chí thanh điệu |
| 6 | **Writing** | Đếm **từ** thay ký tự. Bỏ IME composition handler (không cần cho tiếng Anh) |
| 7 | **Grammar** | Giữ kiến trúc theory+practice+test (rất tốt), thay nội dung |
| 8 | **Roadmap** | 7 kỹ năng → 6 (bỏ HANZI). Theme 6 cấp YLE |
| 9 | **Exam** | Format đề HSK → format Cambridge YLE (Listening/Reading&Writing/Speaking) |

### **Giai đoạn 4 — Admin** *(2–3 ngày)*
`src/app/admin` 28 file + `src/components/admin` 32 file (~11.000 dòng)
- Xoá `admin/hanzi`, `hanzi-section-editor`
- Thêm nút "Tạo audio (TTS)" ở mọi nơi có audio
- Bắt buộc ảnh khi publish từ vựng
- Bộ lọc HSK1–6 → Pre-Starters…PET (toàn bộ trang admin)

### **Giai đoạn 5 — Xuất PDF** *(1 ngày)*
7 route `api/pdf/**` + 8 page `*-pdf/**` + 8 component `*-pdf.tsx`
- Bỏ toàn bộ ruby/pinyin trong template
- Xoá `hanzi-pdf.tsx`
- Thêm mẫu bài tập tô chữ / nối hình cho trẻ (in ra giấy — phụ huynh rất thích)

### **Giai đoạn 6 — Thương hiệu + marketing** *(1–2 ngày)*
- `(marketing)/**` 8 file / 1.537 dòng — landing viết lại hướng **phụ huynh**, không phải người học
- `app/layout.tsx` — metadata, từ khoá SEO, OG image
- Mascot mới (5 file `bao-*`)
- `logo-hsk.png`, `bao-cover.png` → ảnh mới
- `globals.css` + `tailwind.config.ts` — bỏ font Trung, bảng màu trẻ em
- Trang chính sách / điều khoản: thêm mục **quyền riêng tư trẻ em** (bắt buộc về pháp lý khi thu thập dữ liệu trẻ dưới 13 tuổi)

### **Giai đoạn 7 — Nội dung + kiểm thử + deploy** *(3–5 ngày)*
- `prisma/seed.ts` viết lại: 6 khoá, mỗi khoá ≥ 10 bài, mỗi bài 6 kỹ năng
- Nội dung mẫu Pre-Starters + Starters đầy đủ (2 cấp còn lại làm dần)
- Sinh audio TTS hàng loạt cho toàn bộ từ vựng
- `npm run typecheck && npm run build` sạch
- Kiểm thử trên màn hình 375px (mobile-first)
- Deploy Railway + domain `dingdongkids.com` (hoặc `.vn`)

---

## 6. TỔNG THỜI GIAN & THỨ TỰ ƯU TIÊN

| Giai đoạn | Ước tính | Chặn ai |
|---|---|---|
| 0 · Khởi tạo repo | 0,5 ngày | tất cả |
| 1 · Schema + nền tảng | 1–2 ngày | **tất cả** |
| 2 · Lib + actions | 2–3 ngày | GĐ 3, 4 |
| 3 · Module học viên | 4–6 ngày | GĐ 7 |
| 4 · Admin | 2–3 ngày | GĐ 7 |
| 5 · PDF | 1 ngày | — |
| 6 · Thương hiệu | 1–2 ngày | — |
| 7 · Nội dung + deploy | 3–5 ngày | — |
| **TỔNG** | **15–23 ngày làm việc** | |

**Có thể làm song song:** GĐ 5 (PDF) và GĐ 6 (thương hiệu) độc lập với GĐ 3–4, làm xen kẽ được.

**Đường tới bản chạy được sớm nhất (MVP):** GĐ 0 → 1 → 2 → 3 (chỉ Vocab + Phonics + Listening)
→ 4 (admin tối thiểu) → 7 (seed 1 cấp Pre-Starters). Khoảng **8–10 ngày**, đủ để cho phụ huynh xem thử.

---

## 7. RỦI RO & ĐIỂM CẦN QUYẾT THÊM

| # | Vấn đề | Cần quyết |
|---|---|---|
| 1 | **Giá bán** | Bảng giá hiện tại 900k–2,4tr/6 tháng là giá cho người lớn học HSK. Thị trường tiếng Anh trẻ em cạnh tranh gay gắt (Monkey Junior, Khan Academy Kids miễn phí). **Giữ nguyên giá hay đổi?** |
| 2 | **Chi phí TTS** | Sinh audio hàng loạt cho hàng nghìn từ tốn tiền theo ký tự. Cần kiểm tra giá Deepgram Aura → có thể cần cache mạnh (đã có sẵn `Upload` bytea ✅) |
| 3 | **Tài khoản phụ huynh** | Trẻ 5 tuổi không tự đăng ký/thanh toán được. Có cần **vai trò PARENT** (1 phụ huynh ↔ nhiều hồ sơ con, xem báo cáo tiến độ) không? Schema hiện chỉ có `LEARNER` / `ADMIN` — thêm sau sẽ tốn công |
| 4 | **Pháp lý trẻ em** | Thu thập dữ liệu trẻ dưới 13 tuổi (email, ghi âm giọng nói) chịu ràng buộc riêng. Cần bổ sung điều khoản + cơ chế đồng ý của phụ huynh |
| 5 | **Ghi âm cho trẻ nhỏ** | STT trên giọng trẻ em kém chính xác hơn giọng người lớn đáng kể → điểm chấm nói có thể oan. Nên **nới ngưỡng chấm** hoặc chuyển sang "khuyến khích" thay vì chấm điểm khắt khe |
| 6 | **Anh–Mỹ hay Anh–Anh** | Cambridge YLE là chuẩn Anh–Anh (`en-GB`), nhưng trẻ VN quen giọng Mỹ. Ảnh hưởng giọng TTS + STT + chính tả (colour/color) |
| 7 | **Diễn đàn cộng đồng** | `community-forum-data.ts` chứa nội dung mẫu người lớn. Diễn đàn cho trẻ em cần **kiểm duyệt chặt** — hay chuyển thành diễn đàn cho **phụ huynh**? |
| 8 | **Domain** | `dingdongkids.com` đã đăng ký chưa? |

---

## 8. BƯỚC TIẾP THEO

Xác nhận 3 điều rồi tôi bắt đầu **Giai đoạn 0 + 1**:

1. **6 cấp** (thêm PET) hay **5 cấp** (dừng ở KET)?
2. **Có cần vai trò PARENT** không? (quyết sớm, thêm sau rất tốn)
3. **Anh–Mỹ (`en-US`)** hay **Anh–Anh (`en-GB`)**?

Các câu hỏi còn lại (giá, domain, diễn đàn) có thể quyết dần trong lúc làm.
