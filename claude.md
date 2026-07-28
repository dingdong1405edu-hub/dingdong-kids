# DingDong Kids — Tiếng Anh vui cho bé

> Nền tảng web học **tiếng Anh cho trẻ em 4–15 tuổi** theo chuẩn **Cambridge Young Learners**,
> với các module: Từ vựng, Ghép vần (Phonics), Ngữ pháp, Đọc, Nghe, Viết, Nói — chấm điểm bằng AI.
>
> Dự án chuyển đổi 100% từ "DingDong HSK" (học tiếng Trung). Xem
> [CONVERSION-CONTRACT.md](CONVERSION-CONTRACT.md) nếu gặp mã còn sót dấu vết bản cũ.

---

## 1. Mục tiêu sản phẩm

Giúp trẻ em Việt Nam học tiếng Anh một cách **vui, đều đặn và có lộ trình**:

- **Từ vựng** theo chủ đề quen thuộc (animals, family, food, colours…) — mỗi từ có **ảnh + audio**.
- **Ghép vần (Phonics)** — nền tảng để trẻ TỰ ĐỌC được: âm chữ cái, phụ âm ghép (sh/ch/th),
  nguyên âm ghép (ai/ee/oa), ghép vần CVC, từ cùng vần, sight words.
- **Ngữ pháp** trình bày bằng ví dụ tình huống, không phải bảng chia động từ khô khan.
- **Đọc hiểu** với đoạn văn ngắn + bấm vào từ để tra nghĩa + nghe đọc mẫu.
- **Nghe hiểu** với hội thoại tiếng Anh + câu hỏi, tốc độ chậm được cho trẻ.
- **Viết** — AI chấm Ngữ pháp / Từ vựng / Mạch lạc / Bám đề, luôn **khen trước khi sửa**.
- **Nói** — ghi âm trên trình duyệt → AI chấm Phát âm / Ngữ điệu / Lưu loát.
- **Thi thử** theo format Cambridge YLE.

Đối tượng đọc giao diện là **trẻ em Việt + phụ huynh Việt** → **giao diện tiếng Việt**,
**ngôn ngữ học là tiếng Anh**.

Giao diện: **tươi sáng, tròn trịa, nhiều hình, chữ to**, mobile-first.

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | **Next.js 15** (App Router) + TypeScript |
| Styling | Tailwind CSS + **shadcn/ui** (Radix primitives) |
| Icons | lucide-react |
| Animation | framer-motion |
| Database | **PostgreSQL** (Railway managed) |
| ORM | **Prisma** |
| Auth | **Auth.js (NextAuth v5)** — Google OAuth |
| AI chấm bài + sinh câu hỏi | **Groq API** (`groq-sdk`) — mặc định `openai/gpt-oss-120b`, dự phòng `llama-3.3-70b-versatile` → `qwen/qwen3.6-27b` |
| Speech-to-Text | **Deepgram** (Nova-3, `en-US`) — dự phòng **Groq Whisper** |
| **Text-to-Speech** | **Deepgram Aura** — sinh audio TỰ ĐỘNG cho mọi từ/câu (xem §6) |
| File Storage | Postgres `bytea` (model `Upload`) → phục vụ qua `/api/files/[id]` |
| Thanh toán | **PayOS** |
| State | React Server Components + Zustand cho client UI state |
| Forms | react-hook-form + zod |
| PDF | puppeteer-core (Chromium không giao diện, render ở server) |
| Deployment | **Railway** (web + Postgres), **GitHub** (source + CI) |

**Không dùng** `hanzi-writer`, `pinyin-pro` (đã gỡ — chỉ phục vụ tiếng Trung).

---

## 3. Cấu trúc thư mục

```
dingdong-kids/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── src/
│   ├── app/
│   │   ├── (marketing)/        # Landing, giới thiệu, chính sách, điều khoản
│   │   ├── (auth)/             # login, register
│   │   ├── (learn)/            # khu vực học viên
│   │   │   ├── dashboard/
│   │   │   ├── roadmap/[level]/[lessonId]/[skill]/
│   │   │   ├── vocab/          ├── phonics/      ├── grammar/
│   │   │   ├── reading/        ├── listening/
│   │   │   ├── writing/        ├── speaking/
│   │   │   ├── exam/           ├── materials/    ├── so-tu/
│   │   │   └── community/ · goals/ · profile/ · lien-he/
│   │   ├── admin/              # dashboard quản trị (role: ADMIN)
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ · chat/ · health/
│   │   │   ├── grade/writing/ · grade/speaking/ · transcribe/
│   │   │   ├── admin/upload/ · admin/audio/ · admin/tts/
│   │   │   ├── files/[id]/ · payos/webhook/ · pdf/**
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn primitives
│   │   ├── learn/              # vocab, phonics, reading, listening, grammar,
│   │   │                       # roadmap, exercises, community, pdf
│   │   ├── admin/
│   │   ├── marketing/          # linh vật "Ding"
│   │   └── shared/ · chat/ · theme/ · motion/
│   ├── lib/                    # xem §5
│   ├── server/actions/         # Server Actions
│   └── types/
├── .env.example
├── railway.toml · nixpacks.toml
└── CLAUDE.md · CONVERSION-CONTRACT.md
```

---

## 4. Database Schema (Prisma)

Đầy đủ trong [prisma/schema.prisma](prisma/schema.prisma). Các điểm cần nhớ:

```prisma
enum EnglishLevel {
  PRE_STARTERS  // 4–5 tuổi · làm quen
  STARTERS      // 6–7 tuổi · Cambridge YLE Starters (Pre-A1)
  MOVERS        // 7–9 tuổi · Cambridge YLE Movers (A1)
  FLYERS        // 9–11 tuổi · Cambridge YLE Flyers (A2)
  KET           // 11–13 tuổi · A2 Key for Schools
  PET           // 13–15 tuổi · B1 Preliminary for Schools
}

enum Skill { READING LISTENING WRITING SPEAKING VOCAB GRAMMAR PHONICS MOCK }
enum Role { LEARNER ADMIN }
```

**Model chính**: `User` · `Course` → `RoadmapChapter` → `RoadmapLesson` → `RoadmapSection`
· `VocabUnit` → `VocabLesson` → `VocabWord` · `GrammarUnit` → `GrammarLesson`
· `ReadingTest` / `ListeningTest` → `Question` · `WritingTask` · `SpeakingSet` / `SpeakingTopic`
· `MockExam` → `MockExamSection` → `MockExamPart` → `Question` · `Material`
· `Attempt` · `Payment` / `Subscription` · `SavedWord` · `WordReport` · `Feedback`
· `Upload` · `AuditLog`
· Tiến độ: `VocabProgress` · `GrammarProgress` · `PhonicsProgress` · `RoadmapProgress`
· Ôn tập ngắt quãng: `VocabReview` · `RoadmapWordReview`

**Quy ước quan trọng:**
- Trường cấp độ tên là **`level`** (không phải `hskLevel`).
- `VocabWord`: `word` / `ipa` / `meaning` / `partOfSpeech` / `imageUrl` / `audioUrl`.
- Số lượng chữ viết đếm bằng **TỪ** (`minWords`), không phải ký tự.
- `User.parentId` + `User.birthYear`: hạ tầng sẵn cho tài khoản phụ huynh
  (chưa có giao diện — xem §11).
- `Upload.ttsKey`: khoá cache TTS, `@unique` → cùng (text, voice) chỉ gọi API một lần.

---

## 5. Thư viện lõi (`src/lib`)

| File | Vai trò |
|---|---|
| `roadmap.ts` | `LEVELS`, `LEVEL_ORDER`, `COURSE_THEME` (6 theme màu), `themeFor()`, `levelToSlug()`, `SKILL_META` |
| `utils.ts` | `cn()`, `countWords()`, `markWord()`, `levelLabel()`, `levelLabelWithAge()`, `levelBadgeClass()`, `xpToLevel()`, `coverEmoji()` |
| `english.ts` | `normalizeAnswer()`, `isAnswerAcceptable()` (chấm **nới** cho trẻ), `countSyllables()`, `rime()`, `rhymesWith()`, `letters()`, `shuffle()` |
| `tts.ts` | `synthesizeSpeech()`, `ensureAudio()`, `synthesizeMany()`, `TTS_VOICES` |
| `stt.ts` / `deepgram.ts` | Deepgram Nova-3 `en-US` → Groq Whisper dự phòng |
| `groq.ts` | Toàn bộ chấm bài + sinh câu hỏi + tra từ |
| `chat.ts` | Trợ lý **"Ding"** (`streamDingReply`) |
| `phonics-data.ts` / `phonics-lessons.ts` | Dữ liệu + bài học Phonics (**tĩnh trong code**, chỉ tiến độ lưu DB) |
| `payment-plans.ts` | Giá & gói — **sửa giá chỉ ở đây** |
| `entitlements.ts` | Suy ra quyền lợi từ vai trò + subscription |
| `hearts.ts` | Hệ thống tim |
| `srs.ts` | Lặp lại ngắt quãng SM-2 |

---

## 6. Âm thanh — điểm khác biệt lớn nhất so với bản tiếng Trung

Bản DingDong HSK ghi rõ: *"Deepgram & Groq KHÔNG có giọng TTS tiếng Trung → admin tự tải MP3"*.

**Với tiếng Anh, ràng buộc đó biến mất.** Deepgram Aura có giọng tiếng Anh chất lượng cao.

- Trẻ 4–7 tuổi **chưa đọc được** → mọi từ, mọi câu hỏi, mọi câu ví dụ **bắt buộc** phải nghe được.
- Sinh audio: `ensureAudio(existing, text)` hoặc `synthesizeSpeech(text, voice)` từ `@/lib/tts`.
- Admin bấm nút **🔊 Tạo audio** → `POST /api/admin/tts`.
- **Cache**: kết quả lưu ở `Upload.ttsKey = sha256(voice + text)`. Cùng câu, cùng giọng →
  **không gọi API lần hai**. Aura tính tiền theo ký tự nên cache là bắt buộc, không phải tối ưu.
- Dự phòng ở client: Web Speech `en-US` khi chưa có `audioUrl`.

---

## 7. AI — chấm bài & sinh nội dung

Prompt trong [src/lib/groq.ts](src/lib/groq.ts). Nguyên tắc chung:

- **Giám khảo Cambridge Young Learners**, không phải giám khảo người lớn.
  Hiệu chuẩn theo 6 cấp; không bao giờ trừ điểm cấp thấp vì thiếu sự tinh tế của cấp cao.
- **Luôn khen trước khi sửa.** Không dùng nhãn tiêu cực. `bandLabelFor()` chỉ có nhãn tích cực.
- **Lỗi đặc thù trẻ Việt** được nêu thẳng trong prompt: thiếu `-s` số nhiều, thiếu mạo từ,
  thiếu động từ `to be`, không chia thì, tính từ đứng sau danh từ, thiếu `-s` ngôi thứ ba,
  lược chủ ngữ, dịch word-by-word, quên viết hoa.
- **Chấm nói có cảnh báo ASR**: nhận dạng giọng trẻ em kém chính xác hơn giọng người lớn
  đáng kể → prompt dặn model *cho trẻ hưởng lợi thế nghi ngờ*, không phạt oan lỗi do máy nghe nhầm.
- **Tiết kiệm token**: AI chỉ trả JSON gọn (điểm + danh sách lỗi `o→f` + nhận xét).
  Server tự dựng "bản sửa" bằng `reconstructCorrected()` → bản sửa luôn khớp 100% với lỗi đã giải thích.
- **Fallback nhiều model**: `runGroqJson` thử lần lượt; model lỗi hoặc JSON hỏng thì rớt sang model kế.

JSON gọn AI trả về cho Writing:
```json
{ "s": 78, "g": 75, "v": 80, "c": 80, "t": 82,
  "e": [ { "o": "<trích nguyên văn đoạn sai>", "f": "<bản sửa>",
           "k": "grammar|vocabulary|word_order|spelling|article|tense|plural|preposition|punctuation|capitalization",
           "n": "<giải thích ngắn, tiếng Việt, dễ hiểu với trẻ>" } ],
  "fb": "<nhận xét tổng, KHEN trước>" }
```

Chấm nói trả 3 trục: `pronunciation` · **`intonation`** (trọng âm & ngữ điệu — thay "thanh điệu")
· `fluency`.

---

## 8. UI/UX — thiết kế cho trẻ em

Chi tiết trong [CONVERSION-CONTRACT.md §5](CONVERSION-CONTRACT.md).

- **Màu**: `--primary` xanh biển tươi `hsl(202 90% 48%)`, `--sunny` vàng nắng (sao/streak/thưởng),
  nền kem ấm. Mỗi cấp độ có một "thế giới màu" riêng trong `COURSE_THEME`.
- **Font**: `font-display` = **Baloo 2** (tròn mập) · `font-sans` = **Nunito** ·
  `font-primer` = **Andika** (chữ `a`/`g` **một tầng** như chữ trẻ tập viết — dùng cho
  từ mẫu Phonics và thẻ từ vựng).
- **Bo góc lớn**: `--radius: 1.25rem`.
- **Vùng chạm ≥ 48px** — ép trong `globals.css`, đừng ghi đè nhỏ hơn. Ngón tay trẻ kém chính xác.
- **Cỡ chữ nền 17px**; từ đang học hiển thị ≥ 40px.
- Class riêng: `.btn-chunky` (nút 3D có gờ, nhấn lún) · `.sticker` (thẻ viền dày, bóng lệch)
  · `.writing-lines` (nền kẻ 4 ly) · `.text-gradient-brand` · `.hero-brand`.
- Animation: `animate-pop-in`, `animate-star-pop`, `animate-wiggle`, `animate-bounce-soft`.
- **Ít chữ – nhiều hình.** Mọi lựa chọn nên có ảnh/emoji. Mọi câu tiếng Anh nên có nút loa.

**Văn phong**: câu ngắn, từ đơn giản, khen trước khi sửa.
~~"Bạn đã trả lời sai."~~ → **"Chưa đúng rồi! Bé thử lại nhé 🌟"**

Linh vật: **"Ding"** — chú gấu con (thay "Bao" bánh bao của bản cũ).

---

## 9. Chính sách giá & Phân quyền

> Cấu hình GIÁ/GÓI: [src/lib/payment-plans.ts](src/lib/payment-plans.ts) — **sửa giá chỉ ở đây**.
> Suy ra quyền: [src/lib/entitlements.ts](src/lib/entitlements.ts). Tim: [src/lib/hearts.ts](src/lib/hearts.ts).

**Gói Lộ trình** (theo cấp, 6 tháng): Pre-Starters 900k · Starters 1.2tr · Movers 1.5tr
· Flyers 1.8tr · Key A2 2.1tr · Preliminary B1 2.4tr. Từ Movers trở lên **tặng kèm Gói Tự do**.

**Gói Tự do** (mọi tính năng ngoài lộ trình): 1 tháng 250k · 3 tháng 600k (tháng đầu 100k).

**Freemium**:
- Lộ trình: miễn phí `FREE_ROADMAP_LESSONS` bài đầu mỗi cấp (mặc định **3**).
- Tính năng tự do: miễn phí tới khi **hết tim**. Tối đa 5 tim, hồi 1 tim / 30 phút.
  Hoàn thành bài không sai câu nào → +1 tim.
- **Mọi gói trả phí còn hạn → tim không giới hạn.** ADMIN → mở hết.

> ⚠️ **Cần xem lại**: bảng giá này kế thừa nguyên từ bản HSK (định giá cho người lớn học thi).
> Thị trường tiếng Anh trẻ em cạnh tranh khác hẳn — nên khảo giá lại trước khi mở bán.

---

## 10. Development Commands

```bash
npm install
cp .env.example .env.local      # điền giá trị

npx prisma db push              # đẩy schema lên DB (dự án chưa dùng migrations)
npm run db:seed                 # seed nội dung mẫu
npm run dev                     # http://localhost:3000

npm run typecheck
npm run lint
npm run build && npm start

npx prisma studio               # GUI cho DB
```

---

## 11. Việc còn mở / quyết định chưa chốt

1. **Tài khoản phụ huynh** — schema đã có `User.parentId` + `birthYear` nhưng **chưa có giao diện**.
   Trẻ 5 tuổi không tự đăng ký/thanh toán được. Cần: phụ huynh tạo hồ sơ con, xem báo cáo tiến độ.
2. **Bảng giá** — xem cảnh báo ở §9.
3. **Anh–Mỹ vs Anh–Anh** — hiện đặt `en-US` (trẻ VN quen giọng Mỹ) nhưng Cambridge YLE là
   chuẩn Anh–Anh. Đổi bằng env `DEEPGRAM_STT_LANGUAGE` + `DEEPGRAM_TTS_VOICE`.
4. **Chi phí TTS** — cần đo giá Aura thực tế trước khi sinh audio hàng loạt cho toàn kho từ vựng.
5. **Ảnh minh hoạ** — `VocabWord.imageUrl` là kênh truyền đạt chính cho trẻ chưa đọc thạo
   nhưng hiện chưa có kho ảnh. Cần nguồn ảnh (mua bộ, tự vẽ, hoặc sinh bằng AI).
6. **Diễn đàn cộng đồng** — đã chuyển thành diễn đàn PHỤ HUYNH. Nội dung trẻ em cần kiểm duyệt
   chặt; `WordReport` đã có cơ chế duyệt trước khi hiển thị công khai.

---

## 12. Coding Conventions

- **TypeScript strict**: không dùng `any`, ưu tiên `unknown` + type guard.
- **Server Actions** ưu tiên hơn API routes cho mutations từ form.
- **Validation**: mọi input từ client phải qua zod schema ở boundary.
- **Error handling**: try/catch ở server actions + return `{ ok, error }`. UI dùng `toast.error()`.
- **File limits**: 1 component / file. File > 300 dòng cần tách.
- **Naming**: PascalCase cho components, camelCase cho utils, kebab-case cho route folders.
- **Imports**: dùng `@/` alias.
- **Encoding**: UTF-8 (nội dung tiếng Việt có dấu).
- **Không tự ý thêm thư viện mới** — hỏi trước.
- **Không commit secrets**; `.gitignore` đã có `.env*` (trừ `.env.example`).
- **Test trước khi báo done**: chạy `npm run typecheck && npm run build`.

## 13. Đặc thù dạy tiếng Anh cho trẻ Việt — lưu ý khi code

- **Phonics trước, spelling sau.** Trẻ phải nghe ra âm rồi mới ghép được chữ.
- **Lỗi phát âm phổ biến** (đã đưa vào prompt AI, nên dùng lại khi viết nội dung):
  nuốt phụ âm cuối (`cat` → `ca`), `/θ/` (th) → `/t/`, `/ʃ/` (sh) → `/s/`,
  quên `-s`/`-ed` cuối, mất `/r/` cuối từ, đọc đều mọi âm tiết (tiếng Việt không có trọng âm từ).
- **Lỗi ngữ pháp phổ biến**: thiếu `-s` số nhiều, thiếu mạo từ, thiếu `to be`,
  không chia thì, tính từ sau danh từ.
- **Chấm nới, không chấm chặt**: dùng `isAnswerAcceptable()` — sai chính tả nhẹ vẫn tính đúng
  (trừ khi `strict = true` cho bài kiểm tra/thi thử).
- **Không dùng IME composition handler** (chỉ cần cho tiếng Trung).
- **Audio là bắt buộc, không phải tuỳ chọn** — xem §6.

---

## 14. Khi user yêu cầu thay đổi

- Thay đổi nhỏ (style, copy): làm trực tiếp.
- Feature mới hoặc đổi schema: tóm tắt plan ngắn → đợi xác nhận → làm.
- Sửa bug AI: kiểm tra prompt + log raw Groq response trước.
- Khi user paste token (Groq / Deepgram / PayOS / Railway): **không** echo lại token;
  chỉ confirm "đã nhận" và lưu vào `.env.local`.

## 15. Liên hệ

- Owner: dingdong1405edu@gmail.com
- Tokens cần thiết: `GROQ_API_KEY`, `DEEPGRAM_API_KEY`, `PAYOS_*`, `AUTH_GOOGLE_*`.
- Mọi quyết định kiến trúc lớn → hỏi user trước.
