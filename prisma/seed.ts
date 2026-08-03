/**
 * Seed nội dung khởi đầu cho DingDong Kids.
 *
 * Chạy TRÊN MỖI LẦN DEPLOY (xem `startCommand` trong railway.toml) nên mọi thao
 * tác đều phải LŨY ĐẲNG — chỉ dùng `upsert` với id tất định, không bao giờ
 * `deleteMany`. Chạy lại nhiều lần cho ra đúng một kết quả.
 *
 * Phạm vi:
 *   • 6 Course (một khoá mỗi cấp Cambridge).
 *   • Bài lộ trình: nạp từ `prisma/content/<cấp>.ts` — 63 bài trên 6 cấp, mỗi
 *     bài đủ 7 kỹ năng. Cấp nào file nội dung còn rỗng thì tự rơi xuống khung
 *     "Sắp có" (sections `published: false`).
 *   • Từ vựng, ngữ pháp, đề đọc/nghe/viết/nói, tài liệu, 1 đề thi thử mẫu.
 *
 * Kiểm định nội dung TRƯỚC khi seed:  npm run content:check
 * Tạo tài khoản quản trị:             npm run admin:create -- <email> '<mật khẩu>'
 *
 * `audioUrl` để trống có chủ đích: admin bấm "🔊 Tạo audio" trong trang quản trị
 * để sinh giọng đọc bằng Deepgram Aura (xem src/lib/tts.ts). Sinh sẵn ở đây sẽ
 * tốn tiền API mỗi lần deploy.
 * `imageUrl` cũng để trống: cần kho ảnh thật, admin tải lên sau.
 */
import { PrismaClient, EnglishLevel, Skill } from "@prisma/client";
import bcrypt from "bcryptjs";
// Câu hỏi bên dưới viết ở "định dạng tác giả" (dễ gõ: options là mảng chuỗi,
// đáp án là `answer: 0`). Player và validator lại đòi định dạng RoadmapQuestion
// (options là mảng object, đáp án là `correctAnswer: { index }`). PHẢI chuyển
// đổi trước khi ghi DB — ghi thẳng định dạng tác giả sẽ làm mọi phần Đọc/Nghe
// trượt validate và bài học hiện ra lỗi.
import { authoringToRoadmapQuestions } from "@/lib/roadmap-content";
// Dùng CHUNG danh sách quản trị chính với lúc đăng nhập → không bao giờ lệch.
import { getAdminEmails } from "@/lib/admin-emails";
import { GOOGLE_LOGIN_ENABLED } from "@/lib/auth-flags";
// Nội dung bài học tách theo cấp — mỗi file một cấp để soạn độc lập.
// Xem hợp đồng ở prisma/content/types.ts.
import type { ChapterSeed as ContentChapter, LessonSeed as ContentLesson } from "./content/types";
// Danh sách bài của cả 6 cấp — gốc + phần bổ sung, đã nối sẵn. Dùng CHUNG với
// `npm run content:check` nên thứ tự bài lúc kiểm và lúc seed luôn trùng nhau.
import { CHAPTERS_BY_LEVEL } from "./content/all";
// Kho từ vựng & ngữ pháp độc lập (khu "Luyện kỹ năng") — mỗi cấp một file.
import { VOCAB_UNITS } from "./content/vocab";
import { GRAMMAR_UNITS } from "./content/grammar";
// Đề thi thử — mỗi cấp một file, xem hợp đồng ở content/exams/types.ts.
import { EXAMS } from "./content/exams";
// Ngữ pháp của bài lộ trình — tách riêng khỏi `LessonSeed` để soạn độc lập,
// khớp với bài theo THỨ TỰ (xem prisma/content/grammar/types.ts).
import { grammarForLesson } from "./content/grammar/roadmap";
import { lessonContent, roadmapGrammarContent } from "./content/grammar/types";

const prisma = new PrismaClient();

/**
 * Bảo đảm QUẢN TRỊ CHÍNH luôn vào được, chạy mỗi lần deploy.
 *
 * Hai việc, độc lập nhau:
 *
 *  1. THĂNG QUYỀN — mọi email trong `ADMIN_EMAILS` (cách nhau bằng dấu phẩy) mà
 *     đã có tài khoản thì được đặt về ADMIN. Không cần mật khẩu. Cùng danh sách
 *     mà src/lib/admin-emails.ts dùng khi đăng nhập, nên không bao giờ lệch.
 *
 *  2. ĐẶT MẬT KHẨU — nếu có `SEED_ADMIN_PASSWORD` thì tạo/cập nhật mật khẩu cho
 *     `SEED_ADMIN_EMAIL` (bỏ trống thì lấy email đầu trong ADMIN_EMAILS). Bước
 *     này CẦN THIẾT khi đăng nhập Google đang tắt — không có mật khẩu thì không
 *     có đường nào vào.
 *
 * Cố tình KHÔNG có mật khẩu mặc định trong mã nguồn: seed chạy mỗi lần deploy,
 * một mật khẩu mặc định sẽ thành cửa sau công khai trên production.
 *
 *   ADMIN_EMAILS=chu@gmail.com SEED_ADMIN_PASSWORD='...' npm run db:seed
 */
async function seedAdmin(): Promise<void> {
  const adminEmails = getAdminEmails();

  // 1) TẠO tài khoản còn thiếu + thăng quyền tài khoản đã có.
  //
  //    Phải TẠO chứ không chỉ `updateMany`: khi đăng nhập Google đang tắt, một
  //    email chưa từng đăng ký thì chưa có bản ghi User nào để mà thăng quyền —
  //    và cũng không thể tự đăng ký (đăng ký bằng email quản trị chính bị chặn
  //    có chủ đích, xem registerAction). Không tạo ở đây thì không ai vào được.
  for (const email of adminEmails) {
    await prisma.user.upsert({
      where: { email },
      update: { role: "ADMIN", banned: false },
      // Tạo KHÔNG kèm mật khẩu — mật khẩu đặt ở bước 2 nếu có
      // SEED_ADMIN_PASSWORD. Tài khoản không mật khẩu vẫn đăng nhập Google được
      // (khi bật lại), và `authorize` từ chối đăng nhập bằng mật khẩu với tài
      // khoản chưa đặt mật khẩu, nên không mở thêm đường vào nào.
      create: { email, name: "Quản trị viên", role: "ADMIN" },
    });
  }
  console.log(`[seed] Quản trị chính: ${adminEmails.join(", ")}`);

  // 2) Đặt mật khẩu (BẮT BUỘC khi đăng nhập Google đang tắt).
  const email = (process.env.SEED_ADMIN_EMAIL ?? adminEmails[0] ?? "").trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!password) {
    // Cảnh báo to nếu chưa có ai đặt được mật khẩu — đây chính là tình huống
    // "tài khoản có tồn tại, có quyền ADMIN, nhưng không đăng nhập được".
    const withPassword = await prisma.user.count({
      where: { email: { in: adminEmails }, passwordHash: { not: null } },
    });
    if (withPassword === 0 && !GOOGLE_LOGIN_ENABLED) {
      console.warn(
        "[seed] ⚠️  Tài khoản quản trị CHƯA CÓ MẬT KHẨU và đăng nhập Google đang TẮT\n" +
          "        → hiện chưa có cách nào đăng nhập.\n" +
          "        Đặt biến SEED_ADMIN_PASSWORD rồi deploy lại, hoặc chạy:\n" +
          `        npm run admin:create -- ${email} '<mật khẩu>'`,
      );
    } else {
      console.log("[seed] Chưa đặt SEED_ADMIN_PASSWORD — giữ nguyên mật khẩu hiện tại.");
    }
    return;
  }

  if (password.length < 8) {
    console.warn("[seed] SEED_ADMIN_PASSWORD quá ngắn (cần ≥ 8 ký tự) — bỏ qua.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    // Chạy lại seed thì CẬP NHẬT mật khẩu (tiện khi quên) nhưng KHÔNG đụng tới
    // xp / tim / streak để không xoá tiến độ đang test.
    update: { passwordHash, role: "ADMIN", banned: false },
    create: { email, name: "Quản trị viên", passwordHash, role: "ADMIN" },
  });
  console.log(`[seed] ✅ Tài khoản quản trị sẵn sàng (có mật khẩu): ${email}`);
}

// ───────────────────────────── Khoá học ─────────────────────────────

interface CourseSeed {
  level: EnglishLevel;
  title: string;
  subtitle: string;
  description: string;
}

/** Nhãn & mô tả khớp với COURSE_THEME trong src/lib/roadmap.ts. */
const COURSES: CourseSeed[] = [
  {
    level: "PRE_STARTERS",
    title: "Pre-Starters",
    subtitle: "Bé làm quen · 4–5 tuổi",
    description:
      "Bước đầu tiên: nghe – nói, nhận mặt chữ cái và làm quen âm tiếng Anh qua bài hát, hình ảnh và trò chơi.",
  },
  {
    level: "STARTERS",
    title: "Starters",
    subtitle: "Khởi động · 6–7 tuổi",
    description:
      "Cambridge YLE Starters (Pre-A1). Bé ghép vần được, đọc được từ ngắn và nói được câu đơn giản về bản thân.",
  },
  {
    level: "MOVERS",
    title: "Movers",
    subtitle: "Tiến bước · 7–9 tuổi",
    description:
      "Cambridge YLE Movers (A1). Bé kể được chuyện ngắn, hỏi – đáp trôi chảy hơn và viết được vài câu liền mạch.",
  },
  {
    level: "FLYERS",
    title: "Flyers",
    subtitle: "Bay cao · 9–11 tuổi",
    description:
      "Cambridge YLE Flyers (A2). Bé đọc hiểu đoạn văn dài hơn, viết đoạn có mở – thân – kết và nói theo dàn ý.",
  },
  {
    level: "KET",
    title: "Key (A2)",
    subtitle: "Vững vàng · 11–13 tuổi",
    description:
      "A2 Key for Schools. Luyện bốn kỹ năng theo đúng format thi, nền tảng vững cho bậc trung học.",
  },
  {
    level: "PET",
    title: "Preliminary (B1)",
    subtitle: "Chinh phục · 13–15 tuổi",
    description:
      "B1 Preliminary for Schools. Diễn đạt ý kiến, viết bài có lập luận và nghe hiểu hội thoại tốc độ tự nhiên.",
  },
];

// Từ vựng và ngữ pháp KHÔNG còn viết thẳng trong file này nữa — xem
// `prisma/content/vocab/` và `prisma/content/grammar/`, mỗi cấp một file.

// ───────────────────────────── Lộ trình ─────────────────────────────

// Kiểu bài học dùng CHUNG với prisma/content/types.ts — đừng khai báo lại ở đây,
// hai bản sao sẽ lệch nhau (đúng cái đã làm mất trường `emoji` của từ vựng).
type LessonSeed = ContentLesson;
type ChapterSeed = ContentChapter;

const mcq = (
  prompt: string,
  promptVi: string,
  options: string[],
  answer: number,
  explanation: string,
  quote?: string,
) => ({
  type: "MCQ",
  prompt,
  promptTranslation: promptVi,
  options,
  answer,
  explanation,
  ...(quote ? { supportingQuote: quote } : {}),
});

const tf = (prompt: string, promptVi: string, answer: boolean, explanation: string) => ({
  type: "TRUE_FALSE",
  prompt,
  promptTranslation: promptVi,
  answer,
  explanation,
});

// Cả 6 cấp giờ đều có file nội dung riêng trong prisma/content/. Bảng nội dung
// viết thẳng trong file này (FALLBACK_ROADMAP) đã được xoá — không còn cấp nào
// cần rơi về dự phòng nữa.

/** Khung "sắp có" cho 4 cấp còn lại — có chương + bài, sections chưa xuất bản. */
const COMING_SOON: Partial<Record<EnglishLevel, Array<{ topic: string; topicVi: string; icon: string }>>> = {
  MOVERS: [
    { topic: "My Week", topicVi: "Tuần của bé", icon: "📅" },
    { topic: "In the City", topicVi: "Trong thành phố", icon: "🏙️" },
  ],
  FLYERS: [
    { topic: "Holidays", topicVi: "Kỳ nghỉ", icon: "🏖️" },
    { topic: "Jobs", topicVi: "Nghề nghiệp", icon: "👩‍🚒" },
  ],
  KET: [
    { topic: "Free Time", topicVi: "Thời gian rảnh", icon: "🎧" },
    { topic: "Travel", topicVi: "Du lịch", icon: "✈️" },
  ],
  PET: [
    { topic: "Environment", topicVi: "Môi trường", icon: "🌍" },
    { topic: "Technology", topicVi: "Công nghệ", icon: "💻" },
  ],
};

// ───────────────────────────── Tài liệu ─────────────────────────────

const MATERIALS = [
  {
    slug: "phonics-intro",
    title: "Ghép vần là gì và vì sao bé cần học?",
    category: "PHONICS" as const,
    level: "PRE_STARTERS" as EnglishLevel,
    summary:
      "Phonics dạy bé mối liên hệ giữa CHỮ và ÂM. Học xong, bé tự đọc được từ mới mà không cần ai đọc mẫu.",
    content: [
      { type: "heading", text: "Vì sao học ghép vần trước?" },
      {
        type: "paragraph",
        text: "Tiếng Anh có 26 chữ cái nhưng khoảng 44 âm. Nếu bé chỉ học thuộc mặt chữ từng từ, gặp từ mới là bé chịu. Học ghép vần thì bé tự giải mã được từ chưa từng thấy.",
      },
      { type: "heading", text: "Thứ tự dạy" },
      {
        type: "list",
        items: [
          "Nhóm 1: s a t p i n — ghép được nhiều từ nhất ngay từ đầu",
          "Nhóm 2: m d g o c k",
          "Nhóm 3: e u r h b f l — đủ 5 nguyên âm ngắn",
          "Nhóm 4: j v w x y z qu",
          "Phụ âm ghép: sh ch th ng",
          "Nguyên âm ghép: ai ee oa oo ar or",
        ],
      },
      { type: "example", en: "c-a-t → cat", vi: "Ghép ba âm lại thành một từ." },
      {
        type: "note",
        text: "Đừng vội bắt bé viết. Nghe ra âm trước, nhận mặt chữ sau, viết sau cùng.",
      },
    ],
  },
  {
    slug: "final-consonants",
    title: "Lỗi nuốt phụ âm cuối — sửa thế nào?",
    category: "PHONICS" as const,
    level: "STARTERS" as EnglishLevel,
    summary:
      "Trẻ Việt hay đọc “cat” thành “ca”, “book” thành “bu”. Đây là lỗi phát âm phổ biến nhất và sửa được.",
    content: [
      { type: "heading", text: "Vì sao bé mắc lỗi này?" },
      {
        type: "paragraph",
        text: "Tiếng Việt có phụ âm cuối nhưng không bật hơi ra. Tiếng Anh thì phải bật. Bé bê nguyên thói quen tiếng Việt sang nên âm cuối bị mất.",
      },
      { type: "heading", text: "Cách luyện" },
      {
        type: "list",
        ordered: true,
        items: [
          "Cho bé đặt tay trước miệng — đọc đúng thì thấy hơi bật ra.",
          "Kéo dài âm cuối thật lâu: cat-t-t, book-k-k.",
          "So sánh cặp từ: car / cart, ba / bat.",
        ],
      },
      { type: "example", en: "cat, hat, book, dog", vi: "Đọc rõ âm cuối của từng từ." },
      { type: "note", text: "Khen bé mỗi lần bật được âm cuối, đừng chê khi bé quên." },
    ],
  },
  {
    slug: "plural-rules",
    title: "Quy tắc thêm -s cho danh từ số nhiều",
    category: "GRAMMAR" as const,
    level: "STARTERS" as EnglishLevel,
    summary: "Tiếng Việt không đổi từ khi có nhiều. Tiếng Anh thì phải thêm -s. Đây là lỗi ngữ pháp trẻ Việt hay mắc nhất.",
    content: [
      { type: "heading", text: "Ba quy tắc chính" },
      {
        type: "list",
        ordered: true,
        items: [
          "Hầu hết danh từ: thêm -s → dog / dogs",
          "Kết thúc bằng s, x, ch, sh: thêm -es → box / boxes",
          "Từ đặc biệt phải học thuộc: man / men, child / children, foot / feet",
        ],
      },
      { type: "example", en: "I have three cats.", vi: "Tớ có ba con mèo." },
      { type: "note", text: "Mẹo: cứ thấy số đếm từ 2 trở lên là nhắc bé kiểm tra đuôi -s." },
    ],
  },
  {
    slug: "greetings",
    title: "10 câu chào hỏi bé dùng được ngay",
    category: "CONVERSATION" as const,
    level: "PRE_STARTERS" as EnglishLevel,
    summary: "Những câu đầu tiên để bé mở lời — ngắn, dễ nhớ, dùng được hằng ngày.",
    content: [
      { type: "heading", text: "Chào hỏi" },
      {
        type: "vocab",
        items: [
          { word: "Hello!", ipa: "/həˈləʊ/", vi: "Xin chào!" },
          { word: "Good morning!", ipa: "/ɡʊd ˈmɔːnɪŋ/", vi: "Chào buổi sáng!" },
          { word: "How are you?", ipa: "/haʊ ɑːr juː/", vi: "Bạn khoẻ không?" },
          { word: "I'm fine, thank you.", ipa: "/aɪm faɪn/", vi: "Tớ khoẻ, cảm ơn bạn." },
          { word: "What's your name?", ipa: "/wɒts jɔːr neɪm/", vi: "Bạn tên gì?" },
          { word: "My name is…", ipa: "/maɪ neɪm ɪz/", vi: "Tớ tên là…" },
          { word: "Nice to meet you.", ipa: "/naɪs tə miːt juː/", vi: "Rất vui được gặp bạn." },
          { word: "Goodbye!", ipa: "/ɡʊdˈbaɪ/", vi: "Tạm biệt!" },
          { word: "See you tomorrow!", ipa: "/siː juː təˈmɒrəʊ/", vi: "Hẹn gặp lại ngày mai!" },
          { word: "Thank you!", ipa: "/ˈθæŋk juː/", vi: "Cảm ơn bạn!" },
        ],
      },
      { type: "note", text: "Cho bé dùng thật với bố mẹ mỗi sáng — nhớ nhanh hơn học thuộc rất nhiều." },
    ],
  },
  {
    slug: "exam-starters",
    title: "Đề thi Cambridge Starters có gì?",
    category: "EXAM_TIPS" as const,
    level: "STARTERS" as EnglishLevel,
    summary: "Bố mẹ cần biết gì trước khi cho con thi Starters: cấu trúc đề, thời gian, cách chấm.",
    content: [
      { type: "heading", text: "Cấu trúc đề" },
      {
        type: "list",
        items: [
          "Listening — 20 phút, 4 phần, nghe 2 lần mỗi phần",
          "Reading & Writing — 20 phút, 5 phần",
          "Speaking — 3–5 phút, nói trực tiếp với giám khảo",
        ],
      },
      { type: "heading", text: "Điều bố mẹ nên yên tâm" },
      {
        type: "paragraph",
        text: "Cambridge YLE KHÔNG có đỗ/trượt. Bé nhận huy hiệu từ 1 đến 5 khiên cho mỗi kỹ năng. Mục tiêu là khuyến khích bé, không phải loại bé.",
      },
      { type: "note", text: "Đừng luyện đề quá sớm. Bé cần vốn từ và sự tự tin trước, kỹ thuật làm bài sau." },
    ],
  },
];

// ───────────────────────────── Hàm seed ─────────────────────────────

async function seedCourses(): Promise<Map<EnglishLevel, string>> {
  const ids = new Map<EnglishLevel, string>();
  for (const [i, c] of COURSES.entries()) {
    const course = await prisma.course.upsert({
      where: { level: c.level },
      update: { title: c.title, subtitle: c.subtitle, description: c.description, order: i },
      create: {
        level: c.level,
        title: c.title,
        subtitle: c.subtitle,
        description: c.description,
        order: i,
        published: true,
      },
    });
    ids.set(c.level, course.id);
  }
  console.log(`[seed] ${COURSES.length} khoá học đã sẵn sàng.`);
  return ids;
}

async function seedVocab(): Promise<void> {
  for (const [ui, u] of VOCAB_UNITS.entries()) {
    const unitId = `seed-vocab-unit-${u.slug}`;
    const lessonId = `seed-vocab-lesson-${u.slug}`;
    await prisma.vocabUnit.upsert({
      where: { id: unitId },
      update: { title: u.title, theme: u.theme, level: u.level, order: ui },
      create: { id: unitId, title: u.title, theme: u.theme, level: u.level, order: ui, published: true },
    });
    await prisma.vocabLesson.upsert({
      where: { id: lessonId },
      update: { title: u.lessonTitle, order: 0 },
      create: { id: lessonId, unitId, title: u.lessonTitle, order: 0, exercises: [], published: true },
    });
    for (const [i, word] of u.words.entries()) {
      const id = `seed-word-${u.slug}-${word.word}`;
      const data = {
        order: i,
        word: word.word,
        ipa: word.ipa,
        meaning: word.meaning,
        emoji: word.emoji,
        partOfSpeech: word.partOfSpeech,
        examples: word.examples,
      };
      await prisma.vocabWord.upsert({
        where: { id },
        update: data,
        create: { id, lessonId, ...data },
      });
    }
  }
  const total = VOCAB_UNITS.reduce((n, u) => n + u.words.length, 0);
  console.log(`[seed] ${VOCAB_UNITS.length} unit từ vựng · ${total} từ.`);
}

async function seedGrammar(): Promise<void> {
  let lessons = 0;
  for (const [i, u] of GRAMMAR_UNITS.entries()) {
    const unitId = `seed-grammar-unit-${u.slug}`;
    await prisma.grammarUnit.upsert({
      where: { id: unitId },
      update: { title: u.title, theme: u.theme, level: u.level, order: i },
      create: { id: unitId, title: u.title, theme: u.theme, level: u.level, order: i, published: true },
    });
    // Một unit có NHIỀU bài. Slug bài là duy nhất TOÀN CỤC (xem hợp đồng ở
    // content/grammar/types.ts) nên id bài không kèm slug unit — trùng slug
    // giữa hai unit sẽ khiến bài sau ghi đè bài trước, `content:check` bắt lỗi này.
    for (const [li, l] of u.lessons.entries()) {
      const lessonId = `seed-grammar-lesson-${l.slug}`;
      const content = lessonContent(l) as object;
      await prisma.grammarLesson.upsert({
        where: { id: lessonId },
        update: { title: l.title, exercises: content, order: li },
        create: { id: lessonId, unitId, title: l.title, order: li, exercises: content, published: true },
      });
      lessons++;
    }
  }
  console.log(`[seed] ${GRAMMAR_UNITS.length} unit ngữ pháp · ${lessons} bài.`);
}

/**
 * Dựng content JSON cho từng kỹ năng của một bài lộ trình.
 * `level` + `index` (thứ tự bài trong cấp, 0-based) chỉ dùng để tra ngữ pháp —
 * ngữ pháp soạn ở `prisma/content/grammar/roadmap-<cấp>.ts`, không nằm trong
 * `LessonSeed`.
 */
function sectionContent(
  l: LessonSeed,
  skill: Skill,
  level: EnglishLevel,
  index: number,
): unknown {
  switch (skill) {
    case "VOCAB":
      return {
        title: l.topic,
        words: l.words.map((x) => ({
          word: x.word,
          ipa: x.ipa,
          meaning: x.meaning,
          partOfSpeech: "danh từ",
          // Emoji là hình minh hoạ DUY NHẤT cho tới khi có kho ảnh thật —
          // đừng bỏ, nếu không bé chỉ nhìn thấy chữ.
          emoji: x.emoji,
          examples: [],
        })),
      };
    case "PHONICS":
      return { title: `Âm ${l.sound.letters}`, sounds: [l.sound] };
    case "READING":
      return {
        title: l.reading.title,
        timeLimit: 600,
        passages: [
          {
            title: l.reading.title,
            passage: l.reading.passage,
            passageTranslation: l.reading.translation,
            questions: authoringToRoadmapQuestions(l.reading.questions),
          },
        ],
      };
    case "LISTENING":
      return {
        title: l.listening.title,
        timeLimit: 480,
        clips: [
          {
            title: l.listening.title,
            audioUrl: "",
            transcript: l.listening.transcript,
            questions: authoringToRoadmapQuestions(l.listening.questions),
          },
        ],
      };
    case "WRITING":
      return {
        taskType: "GUIDED",
        prompt: l.writingPrompt,
        outline: l.writingOutline,
        minWords: 12,
        timeLimit: 900,
      };
    case "SPEAKING":
      return {
        part1Sentences: l.speaking.sentences.map((text) => ({ text })),
        part3Questions: l.speaking.questions,
      };
    case "GRAMMAR": {
      // Ngữ pháp soạn riêng cho từng bài, dùng lại đúng từ vựng bài đó vừa dạy.
      // Cấp chưa soạn → null → phần Ngữ pháp để "Sắp có" như trước.
      const g = grammarForLesson(level, index);
      return g ? roadmapGrammarContent(g) : null;
    }
    default:
      return null;
  }
}

/** Nội dung bài học của từng cấp — gốc `prisma/content/<cấp>.ts` nối với phần
 *  bổ sung `prisma/content/extra/<cấp>.ts` (xem prisma/content/all.ts). */
const CONTENT_BY_LEVEL: Record<EnglishLevel, ContentChapter[]> = CHAPTERS_BY_LEVEL;

/**
 * Chỉ giữ những cấp THỰC SỰ có bài. Cấp có file rỗng sẽ rơi xuống khung
 * "Sắp có" ở `seedRoadmap` thay vì tạo chương trống không bấm vào được.
 */
const ROADMAP: Partial<Record<EnglishLevel, ChapterSeed[]>> = Object.fromEntries(
  (Object.entries(CONTENT_BY_LEVEL) as Array<[EnglishLevel, ContentChapter[]]>).filter(
    ([, chapters]) => chapters.length > 0,
  ),
) as Partial<Record<EnglishLevel, ChapterSeed[]>>;

const ROADMAP_SKILLS: Skill[] = [
  Skill.VOCAB,
  Skill.PHONICS,
  Skill.GRAMMAR,
  Skill.READING,
  Skill.LISTENING,
  Skill.WRITING,
  Skill.SPEAKING,
];

async function seedRoadmap(courseIds: Map<EnglishLevel, string>): Promise<void> {
  let lessonCount = 0;
  let sectionCount = 0;

  // --- 2 cấp đầu: nội dung đầy đủ, đã xuất bản ---
  for (const [level, chapters] of Object.entries(ROADMAP) as Array<[EnglishLevel, ChapterSeed[]]>) {
    const courseId = courseIds.get(level);
    if (!courseId) continue;
    let order = 0;

    for (const [ci, ch] of chapters.entries()) {
      const chapterId = `seed-chapter-${level}-${ci}`;
      await prisma.roadmapChapter.upsert({
        where: { id: chapterId },
        update: { title: ch.title, subtitle: ch.subtitle, order: ci + 1 },
        create: { id: chapterId, courseId, title: ch.title, subtitle: ch.subtitle, order: ci + 1 },
      });

      for (const l of ch.lessons) {
        const lessonId = `seed-lesson-${level}-${order}`;
        const lessonData = {
          topic: l.topic,
          topicVi: l.topicVi,
          icon: l.icon,
          chapterId,
          chapter: ch.title,
          chapterOrder: ci + 1,
          xpReward: 20,
        };
        await prisma.roadmapLesson.upsert({
          where: { id: lessonId },
          update: { ...lessonData, order },
          create: { id: lessonId, courseId, order, ...lessonData },
        });
        lessonCount++;

        for (const [si, skill] of ROADMAP_SKILLS.entries()) {
          // `order` là số thứ tự bài trong cấp (dồn qua các chương) — cũng chính
          // là khoá tra ngữ pháp ở prisma/content/grammar/roadmap-<cấp>.ts.
          const content = sectionContent(l, skill, level, order);
          // Kỹ năng nào chưa soạn nội dung (vd Ngữ pháp ở cấp chưa làm) → để
          // "Sắp có" thay vì tạo một phần rỗng mà bấm vào không có gì.
          const published = content !== null;
          await prisma.roadmapSection.upsert({
            where: { lessonId_skill: { lessonId, skill } },
            update: { order: si, content: content as object, published },
            create: { lessonId, skill, order: si, content: content as object, published },
          });
          sectionCount++;
        }
        order++;
      }
    }
  }

  // --- Cấp CHƯA có nội dung: dựng khung "Sắp có" ---
  for (const [level, lessons] of Object.entries(COMING_SOON) as Array<
    [EnglishLevel, Array<{ topic: string; topicVi: string; icon: string }>]
  >) {
    // Cấp đã có bài thật ở trên rồi thì bỏ qua khung tạm, nếu không sẽ ghi đè
    // bài thật bằng bài rỗng (id `seed-lesson-<level>-<i>` trùng nhau).
    if (ROADMAP[level]?.length) continue;
    const courseId = courseIds.get(level);
    if (!courseId) continue;
    const chapterId = `seed-chapter-${level}-0`;
    await prisma.roadmapChapter.upsert({
      where: { id: chapterId },
      update: { title: "Chương 1 · Khởi đầu", subtitle: "Nội dung đang được biên soạn", order: 1 },
      create: {
        id: chapterId,
        courseId,
        title: "Chương 1 · Khởi đầu",
        subtitle: "Nội dung đang được biên soạn",
        order: 1,
      },
    });
    for (const [i, l] of lessons.entries()) {
      const lessonId = `seed-lesson-${level}-${i}`;
      const data = {
        topic: l.topic,
        topicVi: l.topicVi,
        icon: l.icon,
        chapterId,
        chapter: "Chương 1 · Khởi đầu",
        chapterOrder: 1,
        xpReward: 20,
      };
      await prisma.roadmapLesson.upsert({
        where: { id: lessonId },
        update: { ...data, order: i },
        create: { id: lessonId, courseId, order: i, ...data },
      });
      lessonCount++;
      for (const [si, skill] of ROADMAP_SKILLS.entries()) {
        await prisma.roadmapSection.upsert({
          where: { lessonId_skill: { lessonId, skill } },
          update: { order: si },
          create: { lessonId, skill, order: si, published: false },
        });
        sectionCount++;
      }
    }
  }

  console.log(`[seed] Lộ trình: ${lessonCount} bài · ${sectionCount} phần kỹ năng.`);
}

async function seedStandaloneTests(): Promise<void> {
  // Rút các bài đọc/nghe/viết/nói của 2 cấp đầu ra thành đề luyện độc lập, để
  // phần "Luyện kỹ năng" (ngoài lộ trình) cũng có nội dung ngay từ đầu.
  let r = 0;
  let li = 0;
  let wr = 0;
  let sp = 0;

  for (const [level, chapters] of Object.entries(ROADMAP) as Array<[EnglishLevel, ChapterSeed[]]>) {
    for (const ch of chapters) {
      for (const l of ch.lessons) {
        const key = l.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        // Đọc hiểu
        const readingId = `seed-reading-${level}-${key}`;
        await prisma.readingTest.upsert({
          where: { id: readingId },
          update: {
            title: l.reading.title,
            level,
            passage: l.reading.passage,
            passageTranslation: l.reading.translation,
            timeLimit: 600,
            order: r,
          },
          create: {
            id: readingId,
            title: l.reading.title,
            level,
            passage: l.reading.passage,
            passageTranslation: l.reading.translation,
            timeLimit: 600,
            order: r,
            published: true,
          },
        });
        r++;

        // Nghe hiểu — audioUrl rỗng, admin bấm "Tạo audio" để sinh bằng TTS.
        const listeningId = `seed-listening-${level}-${key}`;
        await prisma.listeningTest.upsert({
          where: { id: listeningId },
          update: { title: l.listening.title, level, transcript: l.listening.transcript, order: li },
          create: {
            id: listeningId,
            title: l.listening.title,
            level,
            audioUrl: "",
            transcript: l.listening.transcript,
            timeLimit: 300,
            order: li,
            published: true,
          },
        });
        li++;

        // Viết
        const writingId = `seed-writing-${level}-${key}`;
        await prisma.writingTask.upsert({
          where: { id: writingId },
          update: { prompt: l.writingPrompt, outline: l.writingOutline, level, minWords: 12, order: wr },
          create: {
            id: writingId,
            taskType: "GUIDED",
            prompt: l.writingPrompt,
            outline: l.writingOutline,
            minWords: 12,
            timeLimit: 900,
            level,
            order: wr,
            published: true,
          },
        });
        wr++;

        // Nói
        const speakingId = `seed-speaking-${level}-${key}`;
        const speakingData = {
          title: l.topic,
          level,
          part1Sentences: l.speaking.sentences.map((text) => ({ text })),
          part2Passage: { text: l.reading.passage },
          part3Questions: l.speaking.questions,
          order: sp,
        };
        await prisma.speakingSet.upsert({
          where: { id: speakingId },
          update: speakingData,
          create: { id: speakingId, ...speakingData, published: true },
        });
        sp++;
      }
    }
  }

  // Bài "Nói theo chủ đề" — trả lời mở, chấm chi tiết bằng AI.
  const topics = [
    {
      slug: "my-family",
      title: "Kể về gia đình bé",
      level: "STARTERS" as EnglishLevel,
      topic: "Family — Gia đình",
      question: "Tell me about your family. Who is in your family?",
      questionVi: "Hãy kể về gia đình của bé. Trong nhà bé có những ai?",
      outline: "1. Nhà bé có mấy người\n2. Họ tên là gì\n3. Bé thích làm gì cùng họ",
      hints: [
        { text: "I have a mother and a father.", vi: "Tớ có mẹ và bố." },
        { text: "My sister is five years old.", vi: "Chị tớ năm tuổi." },
        { text: "We play together.", vi: "Chúng tớ chơi cùng nhau." },
      ],
      sampleAnswer:
        "There are four people in my family: my mother, my father, my sister and me. My sister is five years old. We like playing games together. I love my family very much.",
    },
    {
      slug: "favourite-animal",
      title: "Con vật bé thích nhất",
      level: "STARTERS" as EnglishLevel,
      topic: "Animals — Con vật",
      question: "What is your favourite animal? Why do you like it?",
      questionVi: "Con vật bé thích nhất là gì? Vì sao bé thích nó?",
      outline: "1. Con vật gì\n2. Nó trông thế nào\n3. Nó ăn gì\n4. Vì sao bé thích",
      hints: [
        { text: "My favourite animal is a cat.", vi: "Con vật tớ thích nhất là mèo." },
        { text: "It is small and soft.", vi: "Nó nhỏ và mềm." },
        { text: "It likes fish.", vi: "Nó thích cá." },
      ],
      sampleAnswer:
        "My favourite animal is a cat. It is small and white. It has soft fur and green eyes. It likes fish and milk. I like cats because they are quiet and friendly.",
    },
  ];
  for (const [i, t] of topics.entries()) {
    const id = `seed-topic-${t.slug}`;
    const data = {
      title: t.title,
      level: t.level,
      topic: t.topic,
      question: t.question,
      questionVi: t.questionVi,
      outline: t.outline,
      hints: t.hints,
      sampleAnswer: t.sampleAnswer,
      minWords: 25,
      prepSeconds: 15,
      order: i,
    };
    await prisma.speakingTopic.upsert({
      where: { id },
      update: data,
      create: { id, ...data, published: true },
    });
  }

  console.log(`[seed] Đề luyện: ${r} đọc · ${li} nghe · ${wr} viết · ${sp} bộ nói · ${topics.length} chủ đề nói.`);
}

async function seedMaterials(): Promise<void> {
  for (const [i, m] of MATERIALS.entries()) {
    const id = `seed-material-${m.slug}`;
    const data = {
      title: m.title,
      category: m.category,
      level: m.level,
      summary: m.summary,
      content: m.content,
      readMinutes: 4,
      order: i,
    };
    await prisma.material.upsert({
      where: { id },
      update: data,
      create: { id, ...data, published: true },
    });
  }
  console.log(`[seed] ${MATERIALS.length} tài liệu.`);
}

/**
 * Đề thi thử — nội dung soạn ở `prisma/content/exams/<cấp>.ts`.
 *
 * Câu hỏi bị XOÁ RỒI GHI LẠI mỗi lần seed thay vì upsert từng câu: `Question`
 * không có id tất định (id do Prisma sinh), nên upsert theo id là không làm
 * được, mà giữ nguyên thì sửa nội dung sẽ đẻ ra câu trùng. Xoá theo `examPartId`
 * chỉ đụng đúng câu của đề seed — bài làm của người học nằm ở bảng `Attempt`,
 * không tham chiếu tới `Question.id` nên không mất gì.
 */
async function seedMockExam(courseIds: Map<EnglishLevel, string>): Promise<void> {
  let questionCount = 0;

  for (const [i, e] of EXAMS.entries()) {
    // Cấp chưa có khoá học thì bỏ qua — đề sẽ mồ côi trên trang thi thử.
    if (!courseIds.has(e.level)) continue;

    const examId = `seed-exam-${e.slug}`;
    const examData = {
      title: e.title,
      level: e.level,
      description: e.description,
      totalTime: e.totalTime,
      order: i,
      published: true,
    };
    await prisma.mockExam.upsert({
      where: { id: examId },
      update: examData,
      create: { id: examId, ...examData },
    });

    for (const [si, s] of e.sections.entries()) {
      const sectionId = `${examId}-s${si}`;
      const sectionData = {
        skill: s.skill as Skill,
        title: s.title ?? "",
        instructions: s.instructions ?? null,
        order: si,
      };
      await prisma.mockExamSection.upsert({
        where: { id: sectionId },
        update: sectionData,
        create: { id: sectionId, examId, ...sectionData },
      });

      for (const [pi, p] of s.parts.entries()) {
        const partId = `${sectionId}-p${pi}`;
        const partData = {
          title: p.title ?? "",
          instructions: p.instructions ?? null,
          passage: p.passage ?? null,
          // `audioUrl` để trống có chủ đích: phần nghe chạy được bằng giọng
          // trình duyệt đọc `transcript`. Admin gắn MP3 sau bằng nút 🔊.
          transcript: p.transcript ?? null,
          writingPrompt: p.writingPrompt ?? null,
          writingMinWords: p.writingMinWords ?? null,
          order: pi,
        };
        await prisma.mockExamPart.upsert({
          where: { id: partId },
          update: partData,
          create: { id: partId, sectionId, ...partData },
        });

        await prisma.question.deleteMany({ where: { examPartId: partId } });
        const questions = authoringToRoadmapQuestions(p.questions ?? []);
        for (const [qi, q] of questions.entries()) {
          await prisma.question.create({
            data: {
              examPartId: partId,
              order: qi,
              type: q.type,
              prompt: q.prompt,
              promptTranslation: q.promptTranslation ?? null,
              options: (q.options ?? null) as object | undefined,
              correctAnswer: q.correctAnswer as object,
              explanation: q.explanation ?? null,
              supportingQuote: q.supportingQuote ?? null,
              quoteTranslation: q.quoteTranslation ?? null,
            },
          });
          questionCount++;
        }
      }
    }
  }
  console.log(`[seed] ${EXAMS.length} đề thi thử · ${questionCount} câu hỏi.`);
}

async function main(): Promise<void> {
  await seedAdmin();
  const courseIds = await seedCourses();
  await seedVocab();
  await seedGrammar();
  await seedRoadmap(courseIds);
  await seedStandaloneTests();
  await seedMaterials();
  await seedMockExam(courseIds);
  console.log("[seed] Xong.");
}

main()
  .catch((e: unknown) => {
    console.error("[seed] thất bại:", e);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
