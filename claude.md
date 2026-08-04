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
│   ├── seed.ts                 # CHỈ ghi DB — nội dung nằm ở content/
│   └── content/                # TOÀN BỘ nội dung seed, tách theo cấp
│       ├── types.ts            # hợp đồng bài lộ trình + hướng dẫn soạn theo cấp
│       ├── all.ts              # ⭐ gom bài của 6 cấp (gốc + extra) — seed & validate dùng CHUNG
│       ├── validate.ts         # npm run content:check
│       ├── <cấp>.ts            # bài lộ trình gốc (pre-starters … pet)
│       ├── extra/<cấp>.ts      # bài lộ trình BỔ SUNG, nối sau bài gốc
│       ├── vocab/              # kho từ vựng độc lập — index.ts + 1 file/cấp
│       ├── exams/              # đề thi thử — index.ts + 1 file/cấp
│       │                       # (Trải nghiệm: nội dung ở src/lib, xem §6.2)
│       └── grammar/            # ngữ pháp — index.ts (kho độc lập)
│           │                   #   + roadmap.ts (ngữ pháp gắn vào bài lộ trình)
│           ├── <cấp>.ts        #   kho độc lập theo cấp
│           ├── roadmap-<cấp>.ts#   ↔ bài trong content/<cấp>.ts
│           └── extra-<cấp>.ts  #   ↔ bài trong content/extra/<cấp>.ts
├── public/
├── src/
│   ├── app/
│   │   ├── (marketing)/        # Landing, giới thiệu, chính sách, điều khoản
│   │   ├── (auth)/             # login, register
│   │   ├── (learn)/            # khu vực học viên
│   │   │   ├── dashboard/
│   │   │   ├── roadmap/[level]/[lessonId]/[skill]/
│   │   │   ├── roadmap/tap-noi/[unitId]/     # "Bé Tập Nói" — trước Pre-Starters (§6.1)
│   │   │   ├── games/          # Trải nghiệm — Sân chơi (§6.2)
│   │   │   ├── hoat-hinh/[cartoonId]/        # Trải nghiệm — Xem hoạt hình (§6.2)
│   │   │   ├── vocab/          ├── phonics/      ├── grammar/
│   │   │   ├── reading/        ├── listening/
│   │   │   ├── writing/        ├── speaking/
│   │   │   ├── exam/           ├── materials/    ├── so-tu/
│   │   │   └── community/ · goals/ · profile/ · lien-he/
│   │   ├── admin/              # dashboard quản trị (role: ADMIN)
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ · chat/ · health/
│   │   │   ├── grade/writing/ · grade/speaking/ · grade/first-words/ · grade/shadow/
│   │   │   ├── transcribe/
│   │   │   ├── speak/          # TTS theo yêu cầu cho "Bé Tập Nói" (danh sách trắng)
│   │   │   ├── admin/upload/ · admin/audio/ · admin/tts/
│   │   │   ├── files/[id]/ · payos/webhook/ · pdf/**
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn primitives
│   │   ├── learn/              # vocab, phonics, reading, listening, grammar,
│   │   │                       # roadmap, exercises, community, pdf,
│   │   │                       # games (arcade) · cartoon (nói theo phim)
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

> ⚠️ **Cấp "Bé Tập Nói" KHÔNG nằm trong enum này.** Nó đứng TRƯỚC `PRE_STARTERS`
> trên lộ trình nhưng không có `Course`, không chia 7 kỹ năng, không bán theo gói
> — nội dung tĩnh trong [src/lib/first-words.ts](src/lib/first-words.ts), tiến độ
> ở model `FirstWordsProgress`. Xem §6.1.

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
· Tiến độ: `VocabProgress` · `GrammarProgress` · `PhonicsProgress` · `FirstWordsProgress`
· `CartoonProgress` · `RoadmapProgress`
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
| `first-words.ts` | Cấp **Bé Tập Nói** — chặng chính `CORE_UNITS` (**tĩnh trong code**), `FIRST_WORDS_LEVEL`, `isFirstWord()` (danh sách trắng cho `/api/speak`) |
| `first-words-data/` | Kiểu dữ liệu + các **gói chủ đề "Khám phá thêm"** (`pack-*.ts`), tự gắn `bonus: true` |
| `cartoons.ts` / `cartoon-data/` | Khu **Xem hoạt hình** (§6.2) — phim + mốc thời gian **tĩnh trong code**, `starsForShadow()` |
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

## 6.1. Cấp "Bé Tập Nói" (First Words) — trước Pre-Starters

Chặng ĐẦU TIÊN của lộ trình, cho bé **3–5 tuổi CHƯA BIẾT CHỮ**. **Miễn phí hoàn toàn**,
không trừ tim — đây là cửa ngõ hút phụ huynh vào hệ thống.

| Thành phần | Nơi ở |
|---|---|
| Nội dung — **chặng chính** | [src/lib/first-words.ts](src/lib/first-words.ts) `CORE_UNITS` — **tĩnh trong code** |
| Nội dung — **khám phá thêm** | [src/lib/first-words-data/](src/lib/first-words-data/) `pack-*.ts` — tự gắn `bonus: true` |
| Bản đồ chủ đề | `/roadmap/tap-noi` (route TĨNH, thắng `/roadmap/[level]`) |
| Luồng học | `/roadmap/tap-noi/[unitId]` |
| Ôn từ khó | `/roadmap/tap-noi/on-tap` (route TĨNH, thắng `[unitId]`) |
| Giao diện | [src/components/learn/first-words/](src/components/learn/first-words/) |
| Sinh audio theo yêu cầu | `POST /api/speak` — **chỉ nhận từ trong danh sách trắng** `isFirstWord()` |
| Chấm phát âm | `POST /api/grade/first-words` — gộp STT + chấm trong MỘT request |
| Chấm bằng AI | `gradeKidWord()` trong [src/lib/groq.ts](src/lib/groq.ts) |
| Lưu tiến độ | `completeFirstWordsUnitAction` / `saveFirstWordsReviewAction` → `FirstWordsProgress` |
| Chặn chi phí AI | [src/lib/rate-limit.ts](src/lib/rate-limit.ts) — cửa sổ trượt trong bộ nhớ |

**Luật bất di bất dịch của cấp này** — bé chưa đọc được chữ:

- **Không bước nào bắt bé đọc chữ mới đi tiếp được.** Chữ trên nút là cho bố mẹ;
  bé đi theo hình, màu và vị trí. Chữ tiếng Anh **ẩn mặc định** (công tắc 👁️).
- **Tiếng phải tự đến**: mở từ mới là tự phát giọng đọc, bé không phải đi tìm nút loa.
- **Không có màn báo lỗi.** Mic bị chặn / mạng hỏng / thiếu API key → bé vẫn nhận
  được sao và lời khen; phần giải thích viết cho bố mẹ đọc.
- **Sàn là 1 sao, không bao giờ 0.** `gradeKidWord` chấm rộng lượng nhất hệ thống:
  ASR nghe giọng trẻ em rất kém, transcript lạ thì mặc định **máy sai, không phải bé sai**.
- Nói lại nhiều lần luôn giữ kết quả **tốt nhất** — tụt sao thì bé không dám thử nữa.

**Audio**: trang server chỉ tra cache (`cachedSpeechUrls`, không gọi Deepgram) nên mở là
chạy ngay; từ nào thiếu thì client xin sinh ở nền. Trong lúc chờ có Web Speech đọc tạm.
Chi phí không phụ thuộc số chủ đề: mỗi trang chỉ nạp audio của ĐÚNG 8 từ trong chủ đề đang
mở, và mỗi từ chỉ gọi Aura **một lần cho toàn bộ vòng đời dự án** (cache theo `Upload.ttsKey`).

**Dữ liệu theo TỪNG TỪ** — `FirstWordsProgress.wordStars` là nguồn sự thật (`bestStars` /
`wordsSaid` chỉ là số tổng tính sẵn). Nhờ đó có: báo cáo "bé vướng từ nào" cho phụ huynh
(`ParentReport`), bài **ôn từ khó** dựng động từ các từ 1–2 sao, và mốc **tốt nghiệp**.
Bài ôn KHÔNG có hàng tiến độ riêng — điểm ghi ngược về chủ đề gốc của từng từ, nếu không
mọi số tổng sẽ bị đếm hai lần.

**Chặng chính vs Khám phá thêm** — mốc tốt nghiệp tính theo **80% số từ của CHẶNG CHÍNH**,
KHÔNG phải toàn bộ kho. Đây là ràng buộc bắt buộc: nếu tính cả chủ đề thêm thì mỗi lần bổ
sung nội dung là một lần đẩy tấm bằng ra xa, bé học chăm vẫn thấy mục tiêu lùi lại và phễu
thương mại bên dưới hỏng theo. Thêm chủ đề mới → luôn cho vào `first-words-data/pack-*.ts`
(tự gắn `bonus: true`); chỉ đổi `CORE_UNITS` khi thực sự muốn dời mốc tốt nghiệp.

**Phễu thương mại**: cấp này miễn phí là có chủ đích — nó là chỗ phụ huynh thấy con mình
thật sự nói được tiếng Anh. Nói được **80% số từ chặng chính** → hiện `GraduationCard`
(bằng khen có tên bé + mời lên gói Pre-Starters). Chưa đủ thì chỉ nhắc một dòng, không chào mời.

**Giới hạn tần suất** (bắt buộc, không phải tối ưu): mỗi lượt chấm = 1 Deepgram + 1 Groq,
đều mất tiền và đăng nhập KHÔNG chặn được. `/api/grade/first-words` 90 lượt/15 phút,
`/api/speak` 20 lượt/10 phút. Chạm trần thì **không báo lỗi**: phần chấm trả lời rủ bé nghỉ
giải lao, phần audio trả map rỗng để Web Speech đọc tiếp.

---

## 6.2. Khu "Trải nghiệm" — Sân chơi & Xem hoạt hình

Nhóm điều hướng riêng trong sidebar (`NAV_GROUPS`, [src/components/shared/sidebar.tsx](src/components/shared/sidebar.tsx)),
gồm hai khu **chơi**, không phải khu học: không bài tập, không trừ tim, không khoá theo gói.

| Khu | Route | Trạng thái |
|---|---|---|
| **Sân chơi** | `/games` | Đã có sẵn — 8 game, thêm game mới chỉ cần thêm một mục vào [registry.ts](src/components/learn/vocab/games/registry.ts) |
| **Xem hoạt hình** | `/hoat-hinh` · `/hoat-hinh/[cartoonId]` | Máy chạy xong, **kho phim rỗng** — xem "Thêm phim" bên dưới |

### Xem hoạt hình (nói theo phim — shadowing)

Phim YouTube chạy **đúng một câu rồi tự dừng** → bé nhắc lại vào micro → máy chấm sao → câu tiếp.

| Thành phần | Nơi ở |
|---|---|
| Nội dung (phim + mốc thời gian) | [src/lib/cartoon-data/](src/lib/cartoon-data/) `pack-*.ts` — **tĩnh trong code** |
| Kiểu dữ liệu + hằng số | [src/lib/cartoons.ts](src/lib/cartoons.ts) |
| Điều khiển YouTube | [use-youtube-player.ts](src/components/learn/cartoon/use-youtube-player.ts) — `playRange(start, end, onEnd)` |
| Luồng học | [shadow-flow.tsx](src/components/learn/cartoon/shadow-flow.tsx) |
| Chấm | `POST /api/grade/shadow` |
| Lưu tiến độ | `completeCartoonAction` → `CartoonProgress.lineStars` |
| **Studio bắt mốc thời gian** | `/admin/hoat-hinh` |

**Chấm điểm KHÔNG giống các phần khác**: câu đích đã biết trước, nên sao được tính bằng
`wordCoverage()` ([english.ts](src/lib/english.ts)) — so khớp từng từ, **tức thì và miễn phí**.
Groq chỉ được gọi khi bé chưa nói trọn câu, và **chỉ để viết lời khen**; nó không bao giờ được
hạ sao xuống dưới mức máy đã đo (`floorStars` trong `gradeKidSentence`). Sàn luôn là 1 sao.
Hạn mức: `/api/grade/shadow` 80 lượt/15 phút — chạm trần thì rủ bé nghỉ, không báo lỗi.

**Thêm phim** — mốc thời gian là thứ duy nhất quyết định bài chạy đúng hay hỏng, mà **không có
nguồn tự động hợp lệ** (`captions.download` của YouTube đòi quyền sửa video; `timedtext` là API
không chính thức, vi phạm ToS). Vì vậy phải bắt bằng tay:

1. `/admin/hoat-hinh` → dán link → studio tự kiểm phim có cho nhúng không.
2. Bấm "Đặt ĐẦU" / "Đặt CUỐI" cho từng câu, gõ câu + nghĩa.
3. "Chép mã" → dán vào `pack-01.ts` → `npm run content:check cartoons` → xem thử ở
   `/hoat-hinh/<id>` → mới đặt `published: true`.

Phim mới luôn ra đời `published: false`; bé chỉ thấy phim đã bật.

**Ràng buộc BẮT BUỘC của điều khoản nhúng YouTube** (vi phạm là bị chặn API, không phải góp ý):

- **KHÔNG được đặt khu này sau tường phí.** Developer Policies cấm *"charge people a fee for
  services that are offered free of charge on YouTube"* và *"restricting access to a video by
  requiring a user to subscribe"*. Đây là lý do khu Trải nghiệm miễn phí — **không phải** lựa
  chọn về marketing, và đừng gắn `getEntitlements()` vào đây.
- **KHÔNG được che trình chơi.** Mọi thứ của mình (nút micro, sao, câu, Ding) phải nằm **BÊN
  DƯỚI** khung video, không đè lên. `shadow-flow.tsx` đang tuân thủ — giữ nguyên khi sửa layout.
- **Không chặn được quảng cáo** và cũng không được phép chặn. Quảng cáo sẽ chạy trong bài học
  của bé — xem cảnh báo ở §11.

**Ba chỗ dễ vỡ đã xử lý sẵn** (đừng gỡ):

- `PAUSE_LEAD_SEC` — `getCurrentTime()` là số nội suy qua postMessage (~4 lần/giây), dừng đúng
  mốc thì luôn lố vài trăm ms và bé nghe lẹm sang câu sau. Phải dừng sớm một nhịp.
- `needsTap` — iOS chặn `playVideo()` do script gọi, hay gặp ngay sau khi micro vừa tắt. Không
  bắt trạng thái này thì bé ngồi nhìn khung hình đứng im.
- Rời tab → dừng phim. `requestAnimationFrame` treo khi tab ẩn còn video vẫn chạy → quay lại là
  phim đã trôi mấy câu.

**Không có ngõ cụt**: kênh tắt nhúng (lỗi 101/150), mạng hỏng, micro bị chặn — bé vẫn đi hết bài.
Phim hỏng thì câu được đọc bằng Web Speech; micro hỏng thì vẫn có sao và lời khen.

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

> ⭐ **Hợp đồng giao diện đầy đủ: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).**
> Đọc file đó TRƯỚC khi sửa bất kỳ thứ gì thuộc về hình thức. Phần dưới chỉ là bản tóm tắt.
> (CONVERSION-CONTRACT.md §5 mô tả bảng màu XANH BIỂN cũ — đã thay, đừng theo nữa.)

Hệ thiết kế: **"Sân chơi kem & mật ong"** — nền kem ấm như giấy vẽ, chữ nâu cacao
(không bao giờ đen/xám), khối màu pastel xen kẽ ngăn nhau bằng dải sóng, nút 3D có gờ.

- **Ba nhóm màu, dùng đúng nhóm** (chi tiết + bảng quy đổi ở DESIGN-SYSTEM.md §2, §7):
  1. Nền/chữ/thẻ/viền → token ngữ nghĩa (`bg-background`, `text-foreground`, `bg-card`,
     `text-muted-foreground`, `border-border`, `bg-sunny`…). **Chỉ nhóm này tự đổi
     theo chế độ sáng/tối.**
  2. Màu nhấn → `brand-*` (yellow · sun · gold · honey · coral · pink · lime · teal ·
     sky · blue · grape · cocoa · mocha).
  3. Nền `<section>` → `band-*` (cream · sun · coral · lav · yel · mint · sky).
- ⛔ **KHÔNG dùng bảng màu mặc định Tailwind** (`bg-sky-500`, `text-rose-600`, `bg-white`…)
  — chúng không biết tới chế độ tối và lệch tông thương hiệu.
- **Font**: `font-display` = **Baloo 2** (tròn mập, mọi tiêu đề + chữ trên nút) ·
  `font-sans` = **Nunito** (thân chữ, nét 600) · `font-primer` = **Andika**
  (chữ `a`/`g` **một tầng** như chữ trẻ tập viết — dùng cho từ mẫu Phonics và thẻ từ vựng).
- **Bo góc lớn**: `--radius: 1.25rem`; `rounded-xl` = 26px (thẻ), `rounded-2xl` = 34px
  (khung lớn), `rounded-full` cho nút & huy hiệu.
- **Bóng ám nâu**: `shadow-soft` / `shadow-soft-lg` / `shadow-soft-xl`. Bóng xám mặc
  định của Tailwind trông bẩn trên nền kem — đừng dùng.
- **Vùng chạm ≥ 48px** — ép trong `globals.css`, đừng ghi đè nhỏ hơn. Ngón tay trẻ kém chính xác.
- **Cỡ chữ nền 17px**; từ đang học hiển thị ≥ 40px.
- Class riêng: `.btn-chunky` (nút 3D có gờ, màu gờ đặt qua `[--edge:…]`) · `.answer-tile`
  (ô đáp án dùng chung cho MỌI dạng bài) · `.card-toy` · `.sticker` · `.tick` · `.eyebrow`
  · `.hl` (bút highlight) · `.deco` (chữ cái bay trang trí) · `.marquee-track`
  · `.text-rainbow` (mỗi trang tối đa MỘT cụm từ) · `.writing-lines` · `.text-gradient-brand`.
- Component dựng sẵn: `<WaveDivider top="sun" bottom="coral">` (dải sóng ngăn section)
  · `<Logo>` + `<Wordmark>` (đầu gấu Ding + chữ ba màu) · `<Button variant="candy">`.
- Animation: `animate-pop-in` · `animate-star-pop` · `animate-wiggle` · `animate-bounce-soft`
  · `animate-bob` · `animate-tilt` · `animate-drift` · `animate-float-blob` · `animate-marquee`
  · `animate-wave-slide` · `animate-dot-pulse`. Tất cả tự tắt ở `prefers-reduced-motion`.
- **Chế độ tối = "đêm cacao"** (nâu ấm, không phải xanh đêm). Vẫn là tính năng, đừng bỏ.
  Vì `--c-cocoa` ĐẢO NGHĨA ở chế độ tối, chỗ nào cần nền nâu đậm cố định ở CẢ hai chế độ
  (chân trang, băng chữ marquee) thì dùng `bg-foreground` + `text-background`.
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
- **Bé Tập Nói** (§6.1): **miễn phí 100%**, không trừ tim, không giới hạn chủ đề.
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
npm run content:check           # ⭐ KIỂM NỘI DUNG TRƯỚC KHI SEED (xem dưới)
npm run db:seed                 # seed nội dung mẫu
npm run dev                     # http://localhost:3000

npm run typecheck
npm run lint
npm run build && npm start

npx prisma studio               # GUI cho DB
```

**`npm run content:check` là cổng bắt buộc trước mọi thay đổi nội dung.** Nó chạy đúng bộ
validate mà player dùng khi mở bài, nên bắt được lớp lỗi khiến "bài học mở lên bị lỗi" mà
typecheck không thấy:

- Bài lộ trình: `supportingQuote` không có thật trong đoạn văn, đáp án trỏ ra ngoài danh
  sách lựa chọn, trùng `topic`, đoạn đọc lệch độ dài so với cấp.
- Ngữ pháp: `fill_blank` thiếu `___`, đáp án không nằm trong options, thẻ `sentence_order`
  không phải hoán vị đúng của câu trả lời, trùng slug bài (bài sau **ghi đè** bài trước).
- **Lệch hàng ngữ pháp lộ trình**: `grammar/roadmap-<cấp>.ts` phải dài đúng bằng danh sách
  bài của cấp và `topic` khớp từng chữ — lệch một mục là bé học ngữ pháp của bài khác.
- Từ vựng: trùng slug unit, thiếu emoji, thiếu câu ví dụ.
- Bé Tập Nói: trùng từ giữa hai chủ đề (sao sẽ luôn ghi về chủ đề đầu → bé làm mãi không
  xong), trùng emoji trong cùng chủ đề, `cover` không phải class Tailwind literal.
- Thi thử: tiểu phần không có gì để làm, phần nghe thiếu lời thoại, tiểu phần vừa có ô viết
  vừa có câu hỏi (player bỏ qua hết câu hỏi), và phần `SPEAKING` — xem cảnh báo ở §7.1.

- Ghép vần: đáp án không nằm trong lựa chọn, lựa chọn trùng nhau, thẻ `blend` ghép các âm
  lại KHÔNG ra đúng từ, thẻ `discriminate` so sánh hai âm giống hệt nhau, bài không có thẻ
  nào tính điểm (bé chỉ ngồi xem, không ghi được tiến độ).

- Xem hoạt hình: mốc thời gian ngược (`end` ≤ `start`), hai câu chồng lên nhau, câu dài quá
  12 giây (bé không nhớ nổi để nhắc lại), trùng `id` hoặc trùng `youtubeId`, `cover` không phải
  class Tailwind literal.

Kiểm riêng một phần cho nhanh: `npm run content:check <cấp>` (pre-starters…pet) hoặc
`npm run content:check <kho>` (`grammar` · `vocab` · `first-words` · `phonics` · `cartoons`
· `exams`).

## 7.1. Thi thử — giới hạn cần biết

Trình chạy đề ([src/app/(learn)/exam/[examId]/](src/app/(learn)/exam/[examId]/)) render được
**Nghe · Đọc · Viết**, KHÔNG có bộ ghi âm cho phần **Nói** — soạn một section `SPEAKING`
vào đề sẽ khiến câu hỏi nói hiện ra như câu trắc nghiệm thường. `validate.ts` chặn thẳng
việc này. Phần Nói của người học nằm ở khu Luyện kỹ năng (`/speaking`).

Phần nghe **không cần MP3**: `ExamAudio` đọc `transcript` bằng giọng trình duyệt và giới
hạn số lần nghe đúng như thi thật (Pre-Starters/Starters/Movers 3 lần, cấp trên 2 lần).
Admin gắn MP3 sau mà không phải sửa file nội dung.

---

## 11. Việc còn mở / quyết định chưa chốt

1. **Tài khoản phụ huynh** — schema đã có `User.parentId` + `birthYear` nhưng **chưa có giao diện**.
   Trẻ 5 tuổi không tự đăng ký/thanh toán được. Cần: phụ huynh tạo hồ sơ con, xem báo cáo tiến độ.
2. **Bảng giá** — xem cảnh báo ở §9.
2b. **Thi thử chưa có phân quyền** — `/exam` chỉ lọc theo cờ `published`, KHÔNG gọi
   `getEntitlements()` và KHÔNG trừ tim. Nghĩa là 12 đề đang mở miễn phí cho mọi tài khoản
   đăng nhập. Trước đây điều này không lộ ra vì kho đề rỗng (1 đề nháp, 0 câu hỏi), giờ có
   nội dung thật thì phải chốt: (a) để miễn phí như hiện tại, (b) chỉ xuất bản Đề 1 mỗi cấp
   làm bản dùng thử — Đề 2 để nháp, hoặc (c) đưa Thi thử vào **Gói Tự do** như §9 mô tả cho
   "tính năng ngoài lộ trình". Chọn (c) thì phải sửa cả `exam/page.tsx` lẫn `exam/[examId]/page.tsx`.
3. **Anh–Mỹ vs Anh–Anh** — hiện đặt `en-US` (trẻ VN quen giọng Mỹ) nhưng Cambridge YLE là
   chuẩn Anh–Anh. Đổi bằng env `DEEPGRAM_STT_LANGUAGE` + `DEEPGRAM_TTS_VOICE`.
4. **Chi phí TTS** — cần đo giá Aura thực tế trước khi sinh audio hàng loạt cho toàn kho từ vựng.
5. **Ảnh minh hoạ** — `VocabWord.imageUrl` là kênh truyền đạt chính cho trẻ chưa đọc thạo
   nhưng hiện chưa có kho ảnh. Cần nguồn ảnh (mua bộ, tự vẽ, hoặc sinh bằng AI).
6b. **Quảng cáo YouTube trong khu Xem hoạt hình** — quyết định chưa chốt, cần chốt TRƯỚC khi
   mở phim đầu tiên cho bé. Video nhúng vẫn chạy quảng cáo của YouTube (pre-roll mỗi lần tải,
   có thể cả mid-roll giữa câu), và điều khoản **cấm chặn** chúng. Nghĩa là một quảng cáo bên
   thứ ba chưa qua kiểm duyệt sẽ hiện ra trước mặt trẻ 4 tuổi, trong một sản phẩm bán bằng lời
   hứa "khu vườn an toàn". Ba đường: (a) chấp nhận và nói rõ với phụ huynh, (b) chỉ chọn phim
   của kênh ít quảng cáo — không kiểm soát được, (c) **tự quay/dựng phim rồi tải lên kênh riêng**
   — hết quảng cáo, hết rủi ro phim bị gỡ, và mở luôn cửa dùng `captions.download` hợp lệ để
   bắt mốc thời gian tự động. (c) là đường bền nhất nhưng tốn công sản xuất.
6c. **Kho phim đang rỗng** — toàn bộ máy móc đã chạy nhưng `src/lib/cartoon-data/pack-01.ts`
   chưa có phim nào. Cố ý: mốc thời gian đoán bừa còn tệ hơn không có phim. Xem §6.2.
7. **Diễn đàn cộng đồng** — đã chuyển thành diễn đàn PHỤ HUYNH. Nội dung trẻ em cần kiểm duyệt
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
