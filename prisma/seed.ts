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
import { CHAPTERS as PRE_STARTERS_CHAPTERS } from "./content/pre-starters";
import { CHAPTERS as STARTERS_CHAPTERS } from "./content/starters";
import { CHAPTERS as MOVERS_CHAPTERS } from "./content/movers";
import { CHAPTERS as FLYERS_CHAPTERS } from "./content/flyers";
import { CHAPTERS as KET_CHAPTERS } from "./content/ket";
import { CHAPTERS as PET_CHAPTERS } from "./content/pet";
// Ngữ pháp của bài lộ trình — tách riêng khỏi `LessonSeed` để soạn độc lập,
// khớp với bài theo THỨ TỰ (xem prisma/content/grammar/types.ts).
import { grammarForLesson } from "./content/grammar/roadmap";
import { roadmapGrammarContent } from "./content/grammar/types";

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

// ───────────────────────────── Từ vựng ─────────────────────────────

interface WordSeed {
  word: string;
  ipa: string;
  meaning: string;
  emoji: string;
  partOfSpeech: string;
  examples: Array<{ sentence: string; meaning: string }>;
}

interface VocabUnitSeed {
  slug: string;
  title: string;
  theme: string;
  level: EnglishLevel;
  lessonTitle: string;
  words: WordSeed[];
}

const w = (
  word: string,
  ipa: string,
  meaning: string,
  emoji: string,
  sentence: string,
  sentenceVi: string,
  partOfSpeech = "danh từ",
): WordSeed => ({
  word,
  ipa,
  meaning,
  // Emoji là hình minh hoạ DUY NHẤT cho tới khi có kho ảnh thật — bé chưa đọc
  // được chữ nên thiếu nó là bé không đoán được nghĩa.
  emoji,
  partOfSpeech,
  examples: [{ sentence, meaning: sentenceVi }],
});

const VOCAB_UNITS: VocabUnitSeed[] = [
  {
    slug: "animals",
    title: "Animals",
    theme: "Con vật",
    level: "PRE_STARTERS",
    lessonTitle: "Con vật quanh bé",
    words: [
      w("cat", "/kæt/", "con mèo", "🐱", "The cat is sleeping.", "Con mèo đang ngủ."),
      w("dog", "/dɒɡ/", "con chó", "🐶", "My dog is friendly.", "Chó của tớ rất thân thiện."),
      w("bird", "/bɜːrd/", "con chim", "🐦", "A bird can fly.", "Chim biết bay."),
      w("fish", "/fɪʃ/", "con cá", "🐟", "The fish swims in the water.", "Con cá bơi trong nước."),
      w("rabbit", "/ˈræbɪt/", "con thỏ", "🐰", "The rabbit likes carrots.", "Con thỏ thích cà rốt."),
      w("duck", "/dʌk/", "con vịt", "🦆", "The duck is in the pond.", "Con vịt ở dưới ao."),
      w("cow", "/kaʊ/", "con bò", "🐄", "The cow eats grass.", "Con bò ăn cỏ."),
      w("pig", "/pɪɡ/", "con lợn", "🐷", "The pig is pink.", "Con lợn màu hồng."),
    ],
  },
  {
    slug: "colours",
    title: "Colours",
    theme: "Màu sắc",
    level: "PRE_STARTERS",
    lessonTitle: "Bảy sắc cầu vồng",
    words: [
      w("red", "/red/", "màu đỏ", "🔴", "The apple is red.", "Quả táo màu đỏ.", "tính từ"),
      w("blue", "/bluː/", "màu xanh dương", "🔵", "The sky is blue.", "Bầu trời màu xanh.", "tính từ"),
      w("green", "/ɡriːn/", "màu xanh lá", "🟢", "The leaf is green.", "Chiếc lá màu xanh lá.", "tính từ"),
      w("yellow", "/ˈjeləʊ/", "màu vàng", "🟡", "The sun is yellow.", "Mặt trời màu vàng.", "tính từ"),
      w("pink", "/pɪŋk/", "màu hồng", "🌸", "I like pink flowers.", "Tớ thích hoa màu hồng.", "tính từ"),
      w("black", "/blæk/", "màu đen", "⚫", "My shoes are black.", "Giày của tớ màu đen.", "tính từ"),
      w("white", "/waɪt/", "màu trắng", "⚪", "The cloud is white.", "Đám mây màu trắng.", "tính từ"),
      w("orange", "/ˈɒrɪndʒ/", "màu cam", "🟠", "I have an orange ball.", "Tớ có quả bóng màu cam.", "tính từ"),
    ],
  },
  {
    slug: "family",
    title: "My Family",
    theme: "Gia đình",
    level: "PRE_STARTERS",
    lessonTitle: "Người thân của bé",
    words: [
      w("mother", "/ˈmʌðər/", "mẹ", "👩", "This is my mother.", "Đây là mẹ của tớ."),
      w("father", "/ˈfɑːðər/", "bố", "👨", "My father is tall.", "Bố tớ cao."),
      w("sister", "/ˈsɪstər/", "chị / em gái", "👧", "I have one sister.", "Tớ có một chị gái."),
      w("brother", "/ˈbrʌðər/", "anh / em trai", "👦", "My brother is six.", "Anh tớ sáu tuổi."),
      w("baby", "/ˈbeɪbi/", "em bé", "👶", "The baby is sleeping.", "Em bé đang ngủ."),
      w("grandma", "/ˈɡrænmɑː/", "bà", "👵", "My grandma makes cakes.", "Bà tớ làm bánh."),
      w("grandpa", "/ˈɡrænpɑː/", "ông", "👴", "Grandpa reads a book.", "Ông đọc sách."),
      w("family", "/ˈfæməli/", "gia đình", "👨‍👩‍👧", "I love my family.", "Tớ yêu gia đình tớ."),
    ],
  },
  {
    slug: "school",
    title: "At School",
    theme: "Trường học",
    level: "STARTERS",
    lessonTitle: "Đồ dùng học tập",
    words: [
      w("book", "/bʊk/", "quyển sách", "📕", "I read a book every day.", "Tớ đọc sách mỗi ngày."),
      w("pen", "/pen/", "cái bút", "🖊️", "My pen is blue.", "Bút của tớ màu xanh."),
      w("pencil", "/ˈpensl/", "bút chì", "✏️", "I draw with a pencil.", "Tớ vẽ bằng bút chì."),
      w("bag", "/bæɡ/", "cái cặp", "🎒", "My bag is very heavy.", "Cặp của tớ rất nặng."),
      w("desk", "/desk/", "cái bàn học", "🪑", "The desk is next to the window.", "Cái bàn ở cạnh cửa sổ."),
      w("teacher", "/ˈtiːtʃər/", "giáo viên", "👩‍🏫", "Our teacher is very kind.", "Cô giáo của chúng tớ rất tốt bụng."),
      w("friend", "/frend/", "bạn", "🧑‍🤝‍🧑", "Nam is my best friend.", "Nam là bạn thân của tớ."),
      w("classroom", "/ˈklɑːsruːm/", "lớp học", "🏫", "Our classroom is big.", "Lớp học của chúng tớ rộng."),
    ],
  },
  {
    slug: "food",
    title: "Food and Drink",
    theme: "Đồ ăn & thức uống",
    level: "STARTERS",
    lessonTitle: "Bé thích ăn gì?",
    words: [
      w("apple", "/ˈæpl/", "quả táo", "🍎", "I eat an apple after lunch.", "Tớ ăn một quả táo sau bữa trưa."),
      w("bread", "/bred/", "bánh mì", "🍞", "We have bread for breakfast.", "Chúng tớ ăn bánh mì vào bữa sáng."),
      w("milk", "/mɪlk/", "sữa", "🥛", "I drink milk every morning.", "Tớ uống sữa mỗi sáng."),
      w("rice", "/raɪs/", "cơm", "🍚", "My family eats rice for dinner.", "Gia đình tớ ăn cơm vào bữa tối."),
      w("water", "/ˈwɔːtər/", "nước", "💧", "Please give me some water.", "Cho tớ xin chút nước."),
      w("cake", "/keɪk/", "bánh ngọt", "🍰", "The cake is very sweet.", "Cái bánh rất ngọt."),
      w("egg", "/eɡ/", "quả trứng", "🥚", "I like eggs for breakfast.", "Tớ thích ăn trứng vào bữa sáng."),
      w("banana", "/bəˈnɑːnə/", "quả chuối", "🍌", "Monkeys love bananas.", "Khỉ rất thích chuối."),
    ],
  },
  {
    slug: "toys",
    title: "My Toys",
    theme: "Đồ chơi",
    level: "STARTERS",
    lessonTitle: "Hộp đồ chơi của bé",
    words: [
      w("ball", "/bɔːl/", "quả bóng", "⚽", "Let's play with the ball.", "Cùng chơi bóng nào."),
      w("doll", "/dɒl/", "búp bê", "🪆", "My doll has long hair.", "Búp bê của tớ tóc dài."),
      w("kite", "/kaɪt/", "cái diều", "🪁", "We fly a kite in the park.", "Chúng tớ thả diều ở công viên."),
      w("robot", "/ˈrəʊbɒt/", "người máy", "🤖", "My robot can walk.", "Người máy của tớ biết đi."),
      w("bike", "/baɪk/", "xe đạp", "🚲", "I ride my bike to school.", "Tớ đạp xe tới trường."),
      w("car", "/kɑːr/", "ô tô", "🚗", "This toy car is very fast.", "Chiếc ô tô đồ chơi này rất nhanh."),
      w("teddy", "/ˈtedi/", "gấu bông", "🧸", "I sleep with my teddy.", "Tớ ngủ cùng gấu bông."),
      w("puzzle", "/ˈpʌzl/", "trò xếp hình", "🧩", "This puzzle is hard.", "Trò xếp hình này khó."),
    ],
  },
];

// ───────────────────────────── Ngữ pháp ─────────────────────────────

interface GrammarSeed {
  slug: string;
  unitTitle: string;
  theme: string;
  level: EnglishLevel;
  lessonTitle: string;
  content: unknown;
}

const GRAMMAR_UNITS: GrammarSeed[] = [
  {
    slug: "to-be",
    unitTitle: "Verb to be",
    theme: "Động từ to be",
    level: "PRE_STARTERS",
    lessonTitle: "am · is · are",
    content: {
      version: 3,
      sections: [
        {
          id: "tobe-1",
          title: "Câu với động từ to be",
          titleEn: "Verb to be (am / is / are)",
          structure: "I + am · He/She/It + is · We/You/They + are",
          breakdown: [
            { part: "I", role: "Chủ ngữ", meaning: "Người hoặc vật được nói đến." },
            { part: "am", role: "Động từ to be", meaning: "Nghĩa là “thì, là, ở”. “I” luôn đi với “am”." },
            { part: "happy", role: "Tính từ", meaning: "Điều mình muốn nói về chủ ngữ." },
          ],
          explanation:
            "Tiếng Việt nói “Tớ vui” là đủ. Tiếng Anh thì BẮT BUỘC phải có am/is/are ở giữa.\n- I → am\n- he, she, it → is\n- we, you, they → are",
          usage: "Dùng khi giới thiệu bản thân, nói cảm xúc, nói tuổi, hoặc tả người và vật.",
          mistakes: [
            { wrong: "She happy.", right: "She is happy.", note: "Thiếu “is” — tiếng Việt không có từ này nên bé hay quên." },
            { wrong: "I is six.", right: "I am six.", note: "“I” luôn đi với “am”." },
            { wrong: "They is my friends.", right: "They are my friends.", note: "“They” số nhiều nên dùng “are”." },
          ],
          examples: [
            { situation: "Khi giới thiệu bản thân", sentence: "I am Mai.", meaning: "Tớ là Mai." },
            { situation: "Khi nói về bạn", sentence: "He is my friend.", meaning: "Bạn ấy là bạn của tớ." },
            { situation: "Khi tả đồ vật", sentence: "The cats are small.", meaning: "Những con mèo thì nhỏ." },
          ],
          exercises: [
            { type: "fill_blank", sentence: "I ___ seven years old.", blank: "am", options: ["am", "is", "are", "be"], hint: "Đi với “I”", explanation: "Chủ ngữ “I” luôn đi với “am”." },
            { type: "fill_blank", sentence: "She ___ my sister.", blank: "is", options: ["is", "am", "are", "be"], explanation: "“She” là ngôi thứ ba số ít nên dùng “is”." },
            { type: "sentence_order", words: ["is", "She", "happy"], answer: "She is happy", meaning: "Bạn ấy vui." },
            { type: "sentence_order", words: ["am", "I", "a", "student"], answer: "I am a student", meaning: "Tớ là học sinh." },
            { type: "translate", direction: "vi_to_en", prompt: "Tớ là học sinh.", answer: "I am a student", options: ["I am a student", "I is a student", "I are student", "I a student"] },
            { type: "translate", direction: "en_to_vi", prompt: "He is my friend.", answer: "Bạn ấy là bạn của tớ.", options: ["Bạn ấy là bạn của tớ.", "Bạn ấy là anh của tớ.", "Bạn ấy vui.", "Tớ có một người bạn."] },
          ],
        },
      ],
      test: {
        timeLimit: 180,
        passThreshold: 60,
        questions: [
          { type: "fill_blank", sentence: "He ___ a teacher.", blank: "is", options: ["is", "am", "are", "be"] },
          { type: "sentence_order", words: ["are", "We", "friends"], answer: "We are friends" },
          { type: "translate", direction: "en_to_vi", prompt: "I am happy.", answer: "Tớ vui.", options: ["Tớ vui.", "Tớ buồn.", "Tớ mệt.", "Tớ đói."] },
        ],
      },
    },
  },
  {
    slug: "plural-s",
    unitTitle: "Plural nouns",
    theme: "Danh từ số nhiều",
    level: "STARTERS",
    lessonTitle: "Thêm -s khi có nhiều",
    content: {
      version: 3,
      sections: [
        {
          id: "plural-1",
          title: "Danh từ số nhiều thêm -s",
          titleEn: "Plural nouns with -s",
          structure: "one cat → two cats",
          breakdown: [
            { part: "two", role: "Số đếm", meaning: "Cho biết có nhiều hơn một." },
            { part: "cat", role: "Danh từ", meaning: "Tên của con vật / đồ vật." },
            { part: "-s", role: "Đuôi số nhiều", meaning: "Thêm vào cuối danh từ khi có từ 2 trở lên." },
          ],
          explanation:
            "Tiếng Việt nói “hai con mèo” — chữ “mèo” không đổi. Tiếng Anh thì phải thêm -s vào cuối: two cats.\n- Hầu hết danh từ: thêm -s (dog → dogs)\n- Kết thúc bằng s, x, ch, sh: thêm -es (box → boxes)\n- Một số từ đặc biệt: man → men, child → children",
          usage: "Dùng khi nói về từ hai đồ vật / con vật / người trở lên.",
          mistakes: [
            { wrong: "I have three cat.", right: "I have three cats.", note: "Thiếu -s. Đây là lỗi phổ biến NHẤT của trẻ Việt." },
            { wrong: "two boxs", right: "two boxes", note: "Từ kết thúc bằng -x thì thêm -es." },
            { wrong: "many childs", right: "many children", note: "“child” là từ đặc biệt, số nhiều là “children”." },
          ],
          examples: [
            { situation: "Đếm đồ chơi", sentence: "I have five balls.", meaning: "Tớ có năm quả bóng." },
            { situation: "Nói về bạn bè", sentence: "My friends are here.", meaning: "Các bạn của tớ ở đây." },
            { situation: "Từ thêm -es", sentence: "There are two buses.", meaning: "Có hai chiếc xe buýt." },
          ],
          exercises: [
            { type: "fill_blank", sentence: "I have two ___.", blank: "cats", options: ["cats", "cat", "cates", "catz"], explanation: "Có hai con nên phải thêm -s: cats." },
            { type: "fill_blank", sentence: "There are three ___.", blank: "boxes", options: ["boxes", "boxs", "box", "boxies"], explanation: "Từ kết thúc bằng -x thì thêm -es." },
            { type: "sentence_order", words: ["have", "I", "four", "books"], answer: "I have four books", meaning: "Tớ có bốn quyển sách." },
            { type: "translate", direction: "vi_to_en", prompt: "Tớ có hai con chó.", answer: "I have two dogs", options: ["I have two dogs", "I have two dog", "I has two dogs", "I have two doges"] },
            { type: "rhyme_match", pairs: [{ a: "cat", b: "hat" }, { a: "dog", b: "frog" }] },
          ],
        },
      ],
      test: {
        timeLimit: 180,
        passThreshold: 60,
        questions: [
          { type: "fill_blank", sentence: "She has six ___.", blank: "pens", options: ["pens", "pen", "penes", "penz"] },
          { type: "sentence_order", words: ["are", "There", "two", "buses"], answer: "There are two buses" },
        ],
      },
    },
  },
];

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
  for (const [i, g] of GRAMMAR_UNITS.entries()) {
    const unitId = `seed-grammar-unit-${g.slug}`;
    const lessonId = `seed-grammar-lesson-${g.slug}`;
    await prisma.grammarUnit.upsert({
      where: { id: unitId },
      update: { title: g.unitTitle, theme: g.theme, level: g.level, order: i },
      create: { id: unitId, title: g.unitTitle, theme: g.theme, level: g.level, order: i, published: true },
    });
    await prisma.grammarLesson.upsert({
      where: { id: lessonId },
      update: { title: g.lessonTitle, exercises: g.content as object, order: 0 },
      create: {
        id: lessonId,
        unitId,
        title: g.lessonTitle,
        order: 0,
        exercises: g.content as object,
        published: true,
      },
    });
  }
  console.log(`[seed] ${GRAMMAR_UNITS.length} unit ngữ pháp.`);
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

/** Nội dung bài học của từng cấp — mỗi cấp một file trong prisma/content/. */
const CONTENT_BY_LEVEL: Record<EnglishLevel, ContentChapter[]> = {
  PRE_STARTERS: PRE_STARTERS_CHAPTERS,
  STARTERS: STARTERS_CHAPTERS,
  MOVERS: MOVERS_CHAPTERS,
  FLYERS: FLYERS_CHAPTERS,
  KET: KET_CHAPTERS,
  PET: PET_CHAPTERS,
};

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

async function seedMockExam(courseIds: Map<EnglishLevel, string>): Promise<void> {
  if (!courseIds.has("STARTERS")) return;
  const examId = "seed-exam-starters-1";
  await prisma.mockExam.upsert({
    where: { id: examId },
    update: { title: "Đề thi thử Starters — Đề 1", level: "STARTERS" },
    create: {
      id: examId,
      title: "Đề thi thử Starters — Đề 1",
      level: "STARTERS",
      description:
        "Đề mẫu theo format Cambridge YLE Starters: Listening · Reading & Writing · Speaking. Bản nháp — admin bổ sung câu hỏi và audio trước khi xuất bản.",
      totalTime: 2400,
      order: 0,
      published: false,
    },
  });

  const sections: Array<{ skill: Skill; title: string; instructions: string }> = [
    { skill: Skill.LISTENING, title: "Listening", instructions: "Nghe và chọn đáp án đúng. Mỗi đoạn được nghe hai lần." },
    { skill: Skill.READING, title: "Reading & Writing", instructions: "Đọc và trả lời câu hỏi. Viết câu trả lời ngắn." },
    { skill: Skill.SPEAKING, title: "Speaking", instructions: "Nói chuyện với giám khảo. Trả lời câu hỏi về bản thân." },
  ];
  for (const [i, s] of sections.entries()) {
    const sectionId = `${examId}-s${i}`;
    await prisma.mockExamSection.upsert({
      where: { id: sectionId },
      update: { title: s.title, instructions: s.instructions, order: i },
      create: { id: sectionId, examId, skill: s.skill, title: s.title, instructions: s.instructions, order: i },
    });
    // Mỗi phần có sẵn Part 1 để admin điền câu hỏi vào.
    const partId = `${sectionId}-p0`;
    await prisma.mockExamPart.upsert({
      where: { id: partId },
      update: { title: "Part 1", order: 0 },
      create: { id: partId, sectionId, title: "Part 1", order: 0 },
    });
  }
  console.log("[seed] 1 đề thi thử mẫu (bản nháp).");
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
