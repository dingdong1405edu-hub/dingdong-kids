/**
 * Seed nội dung khởi đầu cho DingDong Kids.
 *
 * Chạy TRÊN MỖI LẦN DEPLOY (xem `startCommand` trong railway.toml) nên mọi thao
 * tác đều phải LŨY ĐẲNG — chỉ dùng `upsert` với id tất định, không bao giờ
 * `deleteMany`. Chạy lại nhiều lần cho ra đúng một kết quả.
 *
 * Phạm vi:
 *   • 6 Course (một khoá mỗi cấp Cambridge).
 *   • PRE_STARTERS + STARTERS: nội dung ĐẦY ĐỦ — 2 chương × 3 bài mỗi khoá,
 *     mỗi bài đủ 7 kỹ năng, đã xuất bản.
 *   • 4 cấp còn lại: khung chương/bài, sections để `published: false` ("Sắp có").
 *   • Từ vựng, ngữ pháp, đề đọc/nghe/viết/nói, tài liệu, 1 đề thi thử mẫu.
 *
 * `audioUrl` để trống có chủ đích: admin bấm "🔊 Tạo audio" trong trang quản trị
 * để sinh giọng đọc bằng Deepgram Aura (xem src/lib/tts.ts). Sinh sẵn ở đây sẽ
 * tốn tiền API mỗi lần deploy.
 * `imageUrl` cũng để trống: cần kho ảnh thật, admin tải lên sau.
 */
import { PrismaClient, EnglishLevel, Skill } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Tài khoản ADMIN để đăng nhập thử bằng email + mật khẩu.
 *
 * CHỈ tạo khi CẢ HAI biến môi trường được đặt. Cố tình KHÔNG có mật khẩu mặc
 * định: seed chạy trên mỗi lần deploy, một mật khẩu mặc định nằm sẵn trong mã
 * nguồn sẽ thành cửa sau công khai trên production.
 *
 *   SEED_ADMIN_EMAIL=ban@example.com SEED_ADMIN_PASSWORD='...' npm run db:seed
 */
async function seedAdmin(): Promise<void> {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("[seed] Bỏ qua tài khoản admin (chưa đặt SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD).");
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
  console.log(`[seed] Tài khoản ADMIN sẵn sàng: ${email}`);
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
  sentence: string,
  sentenceVi: string,
  partOfSpeech = "danh từ",
): WordSeed => ({
  word,
  ipa,
  meaning,
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
      w("cat", "/kæt/", "con mèo", "The cat is sleeping.", "Con mèo đang ngủ."),
      w("dog", "/dɒɡ/", "con chó", "My dog is friendly.", "Chó của tớ rất thân thiện."),
      w("bird", "/bɜːrd/", "con chim", "A bird can fly.", "Chim biết bay."),
      w("fish", "/fɪʃ/", "con cá", "The fish swims in the water.", "Con cá bơi trong nước."),
      w("rabbit", "/ˈræbɪt/", "con thỏ", "The rabbit likes carrots.", "Con thỏ thích cà rốt."),
      w("duck", "/dʌk/", "con vịt", "The duck is in the pond.", "Con vịt ở dưới ao."),
      w("cow", "/kaʊ/", "con bò", "The cow eats grass.", "Con bò ăn cỏ."),
      w("pig", "/pɪɡ/", "con lợn", "The pig is pink.", "Con lợn màu hồng."),
    ],
  },
  {
    slug: "colours",
    title: "Colours",
    theme: "Màu sắc",
    level: "PRE_STARTERS",
    lessonTitle: "Bảy sắc cầu vồng",
    words: [
      w("red", "/red/", "màu đỏ", "The apple is red.", "Quả táo màu đỏ.", "tính từ"),
      w("blue", "/bluː/", "màu xanh dương", "The sky is blue.", "Bầu trời màu xanh.", "tính từ"),
      w("green", "/ɡriːn/", "màu xanh lá", "The leaf is green.", "Chiếc lá màu xanh lá.", "tính từ"),
      w("yellow", "/ˈjeləʊ/", "màu vàng", "The sun is yellow.", "Mặt trời màu vàng.", "tính từ"),
      w("pink", "/pɪŋk/", "màu hồng", "I like pink flowers.", "Tớ thích hoa màu hồng.", "tính từ"),
      w("black", "/blæk/", "màu đen", "My shoes are black.", "Giày của tớ màu đen.", "tính từ"),
      w("white", "/waɪt/", "màu trắng", "The cloud is white.", "Đám mây màu trắng.", "tính từ"),
      w("orange", "/ˈɒrɪndʒ/", "màu cam", "I have an orange ball.", "Tớ có quả bóng màu cam.", "tính từ"),
    ],
  },
  {
    slug: "family",
    title: "My Family",
    theme: "Gia đình",
    level: "PRE_STARTERS",
    lessonTitle: "Người thân của bé",
    words: [
      w("mother", "/ˈmʌðər/", "mẹ", "This is my mother.", "Đây là mẹ của tớ."),
      w("father", "/ˈfɑːðər/", "bố", "My father is tall.", "Bố tớ cao."),
      w("sister", "/ˈsɪstər/", "chị / em gái", "I have one sister.", "Tớ có một chị gái."),
      w("brother", "/ˈbrʌðər/", "anh / em trai", "My brother is six.", "Anh tớ sáu tuổi."),
      w("baby", "/ˈbeɪbi/", "em bé", "The baby is sleeping.", "Em bé đang ngủ."),
      w("grandma", "/ˈɡrænmɑː/", "bà", "My grandma makes cakes.", "Bà tớ làm bánh."),
      w("grandpa", "/ˈɡrænpɑː/", "ông", "Grandpa reads a book.", "Ông đọc sách."),
      w("family", "/ˈfæməli/", "gia đình", "I love my family.", "Tớ yêu gia đình tớ."),
    ],
  },
  {
    slug: "school",
    title: "At School",
    theme: "Trường học",
    level: "STARTERS",
    lessonTitle: "Đồ dùng học tập",
    words: [
      w("book", "/bʊk/", "quyển sách", "I read a book every day.", "Tớ đọc sách mỗi ngày."),
      w("pen", "/pen/", "cái bút", "My pen is blue.", "Bút của tớ màu xanh."),
      w("pencil", "/ˈpensl/", "bút chì", "I draw with a pencil.", "Tớ vẽ bằng bút chì."),
      w("bag", "/bæɡ/", "cái cặp", "My bag is very heavy.", "Cặp của tớ rất nặng."),
      w("desk", "/desk/", "cái bàn học", "The desk is next to the window.", "Cái bàn ở cạnh cửa sổ."),
      w("teacher", "/ˈtiːtʃər/", "giáo viên", "Our teacher is very kind.", "Cô giáo của chúng tớ rất tốt bụng."),
      w("friend", "/frend/", "bạn", "Nam is my best friend.", "Nam là bạn thân của tớ."),
      w("classroom", "/ˈklɑːsruːm/", "lớp học", "Our classroom is big.", "Lớp học của chúng tớ rộng."),
    ],
  },
  {
    slug: "food",
    title: "Food and Drink",
    theme: "Đồ ăn & thức uống",
    level: "STARTERS",
    lessonTitle: "Bé thích ăn gì?",
    words: [
      w("apple", "/ˈæpl/", "quả táo", "I eat an apple after lunch.", "Tớ ăn một quả táo sau bữa trưa."),
      w("bread", "/bred/", "bánh mì", "We have bread for breakfast.", "Chúng tớ ăn bánh mì vào bữa sáng."),
      w("milk", "/mɪlk/", "sữa", "I drink milk every morning.", "Tớ uống sữa mỗi sáng."),
      w("rice", "/raɪs/", "cơm", "My family eats rice for dinner.", "Gia đình tớ ăn cơm vào bữa tối."),
      w("water", "/ˈwɔːtər/", "nước", "Please give me some water.", "Cho tớ xin chút nước."),
      w("cake", "/keɪk/", "bánh ngọt", "The cake is very sweet.", "Cái bánh rất ngọt."),
      w("egg", "/eɡ/", "quả trứng", "I like eggs for breakfast.", "Tớ thích ăn trứng vào bữa sáng."),
      w("banana", "/bəˈnɑːnə/", "quả chuối", "Monkeys love bananas.", "Khỉ rất thích chuối."),
    ],
  },
  {
    slug: "toys",
    title: "My Toys",
    theme: "Đồ chơi",
    level: "STARTERS",
    lessonTitle: "Hộp đồ chơi của bé",
    words: [
      w("ball", "/bɔːl/", "quả bóng", "Let's play with the ball.", "Cùng chơi bóng nào."),
      w("doll", "/dɒl/", "búp bê", "My doll has long hair.", "Búp bê của tớ tóc dài."),
      w("kite", "/kaɪt/", "cái diều", "We fly a kite in the park.", "Chúng tớ thả diều ở công viên."),
      w("robot", "/ˈrəʊbɒt/", "người máy", "My robot can walk.", "Người máy của tớ biết đi."),
      w("bike", "/baɪk/", "xe đạp", "I ride my bike to school.", "Tớ đạp xe tới trường."),
      w("car", "/kɑːr/", "ô tô", "This toy car is very fast.", "Chiếc ô tô đồ chơi này rất nhanh."),
      w("teddy", "/ˈtedi/", "gấu bông", "I sleep with my teddy.", "Tớ ngủ cùng gấu bông."),
      w("puzzle", "/ˈpʌzl/", "trò xếp hình", "This puzzle is hard.", "Trò xếp hình này khó."),
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

interface LessonSeed {
  topic: string;
  topicVi: string;
  icon: string;
  /** Từ vựng của bài — dùng cho cả phần VOCAB lẫn các bài tập khác. */
  words: Array<{ word: string; ipa: string; meaning: string }>;
  /** Âm phonics dạy trong bài. */
  sound: { letters: string; sound: string; hint: string; words: Array<{ word: string; meaning: string; emoji: string }> };
  reading: { title: string; passage: string; translation: string; questions: unknown[] };
  listening: { title: string; transcript: string; questions: unknown[] };
  writingPrompt: string;
  writingOutline: string;
  speaking: { sentences: string[]; questions: Array<{ question: string; sampleAnswer: string }> };
}

interface ChapterSeed {
  title: string;
  subtitle: string;
  lessons: LessonSeed[];
}

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

const ROADMAP: Partial<Record<EnglishLevel, ChapterSeed[]>> = {
  PRE_STARTERS: [
    {
      title: "Chương 1 · Bé và gia đình",
      subtitle: "Những từ đầu tiên về người thân",
      lessons: [
        {
          topic: "My Family",
          topicVi: "Gia đình của bé",
          icon: "👨‍👩‍👧",
          words: [
            { word: "mother", ipa: "/ˈmʌðər/", meaning: "mẹ" },
            { word: "father", ipa: "/ˈfɑːðər/", meaning: "bố" },
            { word: "sister", ipa: "/ˈsɪstər/", meaning: "chị / em gái" },
            { word: "brother", ipa: "/ˈbrʌðər/", meaning: "anh / em trai" },
          ],
          sound: {
            letters: "m",
            sound: "/m/",
            hint: "Ngậm môi lại rồi ngân qua mũi — giống chữ “m” tiếng Việt.",
            words: [
              { word: "mother", meaning: "mẹ", emoji: "👩" },
              { word: "moon", meaning: "mặt trăng", emoji: "🌙" },
              { word: "milk", meaning: "sữa", emoji: "🥛" },
            ],
          },
          reading: {
            title: "My family",
            passage: "This is my family. I have a mother and a father. I have one sister. We are happy.",
            translation: "Đây là gia đình tớ. Tớ có mẹ và bố. Tớ có một chị gái. Chúng tớ rất vui.",
            questions: [
              mcq("How many sisters?", "Có mấy chị gái?", ["One", "Two", "Three"], 0, "Bài đọc viết: I have one sister.", "I have one sister."),
              tf("The family is happy.", "Gia đình này vui vẻ.", true, "Câu cuối viết: We are happy."),
            ],
          },
          listening: {
            title: "Hello, my family",
            transcript: "Girl: Hello! I am Mai. This is my mother. This is my father. I love my family.",
            questions: [
              mcq("What is her name?", "Bạn ấy tên gì?", ["Lan", "Mai", "Anna"], 1, "Bạn ấy nói: I am Mai."),
            ],
          },
          writingPrompt: "Write about your family. Who is in your family?",
          writingOutline: "1. Tớ có ai trong nhà\n2. Tên của họ\n3. Tớ yêu gia đình tớ",
          speaking: {
            sentences: ["This is my mother.", "I love my family."],
            questions: [{ question: "Who is in your family?", sampleAnswer: "I have a mother, a father and a sister." }],
          },
        },
        {
          topic: "Animals",
          topicVi: "Con vật",
          icon: "🐱",
          words: [
            { word: "cat", ipa: "/kæt/", meaning: "con mèo" },
            { word: "dog", ipa: "/dɒɡ/", meaning: "con chó" },
            { word: "bird", ipa: "/bɜːrd/", meaning: "con chim" },
            { word: "fish", ipa: "/fɪʃ/", meaning: "con cá" },
          ],
          sound: {
            letters: "c",
            sound: "/k/",
            hint: "Bật hơi mạnh ở cuống họng. Chữ “c” và “k” đọc GIỐNG NHAU.",
            words: [
              { word: "cat", meaning: "con mèo", emoji: "🐱" },
              { word: "cow", meaning: "con bò", emoji: "🐄" },
              { word: "cake", meaning: "bánh ngọt", emoji: "🍰" },
            ],
          },
          reading: {
            title: "My pet",
            passage: "I have a cat. My cat is small and white. It likes fish. I love my cat.",
            translation: "Tớ có một con mèo. Mèo của tớ nhỏ và màu trắng. Nó thích cá. Tớ yêu con mèo của tớ.",
            questions: [
              mcq("What colour is the cat?", "Con mèo màu gì?", ["Black", "White", "Brown"], 1, "Bài đọc viết: My cat is small and white.", "My cat is small and white."),
              tf("The cat likes fish.", "Con mèo thích cá.", true, "Bài đọc viết: It likes fish."),
            ],
          },
          listening: {
            title: "At the farm",
            transcript: "Boy: Look! A cow and a duck. Girl: I like the duck. It is yellow.",
            questions: [
              mcq("What colour is the duck?", "Con vịt màu gì?", ["Yellow", "White", "Brown"], 0, "Bạn gái nói: It is yellow."),
            ],
          },
          writingPrompt: "Write about an animal you like.",
          writingOutline: "1. Con vật gì\n2. Màu gì\n3. Nó thích ăn gì",
          speaking: {
            sentences: ["I have a cat.", "The dog is big."],
            questions: [{ question: "What animal do you like?", sampleAnswer: "I like cats. My cat is white." }],
          },
        },
        {
          topic: "Colours",
          topicVi: "Màu sắc",
          icon: "🌈",
          words: [
            { word: "red", ipa: "/red/", meaning: "màu đỏ" },
            { word: "blue", ipa: "/bluː/", meaning: "màu xanh dương" },
            { word: "green", ipa: "/ɡriːn/", meaning: "màu xanh lá" },
            { word: "yellow", ipa: "/ˈjeləʊ/", meaning: "màu vàng" },
          ],
          sound: {
            letters: "r",
            sound: "/r/",
            hint: "Cong lưỡi lên nhưng KHÔNG chạm vào đâu cả. Đừng rung lưỡi như “r” tiếng Việt.",
            words: [
              { word: "red", meaning: "màu đỏ", emoji: "🔴" },
              { word: "rain", meaning: "mưa", emoji: "🌧️" },
              { word: "rabbit", meaning: "con thỏ", emoji: "🐰" },
            ],
          },
          reading: {
            title: "My box",
            passage: "I have a box. In the box I have a red ball and a blue car. My favourite colour is green.",
            translation: "Tớ có một cái hộp. Trong hộp tớ có quả bóng đỏ và ô tô xanh. Màu tớ thích nhất là màu xanh lá.",
            questions: [
              mcq("What colour is the ball?", "Quả bóng màu gì?", ["Red", "Blue", "Green"], 0, "Bài đọc viết: a red ball.", "a red ball"),
              mcq("What is the favourite colour?", "Màu yêu thích là gì?", ["Red", "Blue", "Green"], 2, "Câu cuối viết: My favourite colour is green."),
            ],
          },
          listening: {
            title: "What colour?",
            transcript: "Girl: Look at my new bag! Boy: Wow! It is blue and yellow.",
            questions: [
              tf("The bag is blue and yellow.", "Cái cặp màu xanh dương và vàng.", true, "Bạn trai nói: It is blue and yellow."),
            ],
          },
          writingPrompt: "What is your favourite colour? Write one or two sentences.",
          writingOutline: "1. Màu tớ thích\n2. Đồ vật nào có màu đó",
          speaking: {
            sentences: ["My ball is red.", "I like blue."],
            questions: [{ question: "What is your favourite colour?", sampleAnswer: "My favourite colour is green." }],
          },
        },
      ],
    },
    {
      title: "Chương 2 · Thế giới quanh bé",
      subtitle: "Số đếm, cơ thể và đồ ăn",
      lessons: [
        {
          topic: "Numbers",
          topicVi: "Số đếm",
          icon: "🔢",
          words: [
            { word: "one", ipa: "/wʌn/", meaning: "số một" },
            { word: "two", ipa: "/tuː/", meaning: "số hai" },
            { word: "three", ipa: "/θriː/", meaning: "số ba" },
            { word: "four", ipa: "/fɔːr/", meaning: "số bốn" },
          ],
          sound: {
            letters: "th",
            sound: "/θ/",
            hint: "ĐẶT LƯỠI GIỮA HAI HÀM RĂNG rồi thổi. Trẻ Việt hay đọc thành /t/ — sai.",
            words: [
              { word: "three", meaning: "số ba", emoji: "3️⃣" },
              { word: "think", meaning: "nghĩ", emoji: "🤔" },
              { word: "thank", meaning: "cảm ơn", emoji: "🙏" },
            ],
          },
          reading: {
            title: "Count with me",
            passage: "I have two hands. I have two feet. I have one nose. I can count to ten!",
            translation: "Tớ có hai bàn tay. Tớ có hai bàn chân. Tớ có một cái mũi. Tớ đếm được tới mười!",
            questions: [
              mcq("How many hands?", "Có mấy bàn tay?", ["One", "Two", "Three"], 1, "Bài đọc viết: I have two hands.", "I have two hands."),
            ],
          },
          listening: {
            title: "How many?",
            transcript: "Boy: How many cats do you have? Girl: I have three cats.",
            questions: [
              mcq("How many cats?", "Có mấy con mèo?", ["Two", "Three", "Four"], 1, "Bạn gái nói: I have three cats."),
            ],
          },
          writingPrompt: "How many toys do you have? Write about them.",
          writingOutline: "1. Bao nhiêu món\n2. Đó là những đồ chơi gì",
          speaking: {
            sentences: ["I have two hands.", "I can count to ten."],
            questions: [{ question: "How old are you?", sampleAnswer: "I am five years old." }],
          },
        },
        {
          topic: "My Body",
          topicVi: "Cơ thể của bé",
          icon: "🖐️",
          words: [
            { word: "head", ipa: "/hed/", meaning: "cái đầu" },
            { word: "hand", ipa: "/hænd/", meaning: "bàn tay" },
            { word: "eye", ipa: "/aɪ/", meaning: "con mắt" },
            { word: "nose", ipa: "/nəʊz/", meaning: "cái mũi" },
          ],
          sound: {
            letters: "h",
            sound: "/h/",
            hint: "Chỉ là hơi thở ra nhẹ, không dùng cổ họng.",
            words: [
              { word: "head", meaning: "cái đầu", emoji: "🧠" },
              { word: "hand", meaning: "bàn tay", emoji: "✋" },
              { word: "hat", meaning: "cái mũ", emoji: "🎩" },
            ],
          },
          reading: {
            title: "This is me",
            passage: "This is my head. These are my eyes. I have a small nose and two big ears. I am happy.",
            translation: "Đây là đầu của tớ. Đây là mắt của tớ. Tớ có cái mũi nhỏ và hai cái tai to. Tớ rất vui.",
            questions: [
              mcq("How many ears?", "Có mấy cái tai?", ["One", "Two", "Three"], 1, "Bài đọc viết: two big ears.", "two big ears"),
              tf("The nose is small.", "Cái mũi thì nhỏ.", true, "Bài đọc viết: a small nose."),
            ],
          },
          listening: {
            title: "Touch your head",
            transcript: "Teacher: Touch your head! Touch your nose! Now touch your hands!",
            questions: [
              tf("The teacher says touch your nose.", "Cô giáo bảo chạm vào mũi.", true, "Cô nói: Touch your nose!"),
            ],
          },
          writingPrompt: "Draw yourself and write about it.",
          writingOutline: "1. Tớ có mấy mắt\n2. Mũi tớ to hay nhỏ",
          speaking: {
            sentences: ["This is my nose.", "I have two eyes."],
            questions: [{ question: "How many eyes do you have?", sampleAnswer: "I have two eyes." }],
          },
        },
        {
          topic: "Food",
          topicVi: "Đồ ăn",
          icon: "🍎",
          words: [
            { word: "apple", ipa: "/ˈæpl/", meaning: "quả táo" },
            { word: "milk", ipa: "/mɪlk/", meaning: "sữa" },
            { word: "bread", ipa: "/bred/", meaning: "bánh mì" },
            { word: "rice", ipa: "/raɪs/", meaning: "cơm" },
          ],
          sound: {
            letters: "a",
            sound: "/æ/",
            hint: "Mở miệng rộng, âm nằm giữa “a” và “e” tiếng Việt.",
            words: [
              { word: "apple", meaning: "quả táo", emoji: "🍎" },
              { word: "cat", meaning: "con mèo", emoji: "🐱" },
              { word: "bag", meaning: "cái cặp", emoji: "🎒" },
            ],
          },
          reading: {
            title: "My lunch",
            passage: "I eat rice and fish for lunch. I drink milk. My sister eats bread. We like our lunch.",
            translation: "Tớ ăn cơm và cá vào bữa trưa. Tớ uống sữa. Chị tớ ăn bánh mì. Chúng tớ thích bữa trưa của mình.",
            questions: [
              mcq("What does the sister eat?", "Chị gái ăn gì?", ["Rice", "Bread", "Fish"], 1, "Bài đọc viết: My sister eats bread.", "My sister eats bread."),
              tf("I drink milk.", "Tớ uống sữa.", true, "Bài đọc viết: I drink milk."),
            ],
          },
          listening: {
            title: "At the shop",
            transcript: "Girl: Hello! I want an apple, please. Man: Here you are. Girl: Thank you!",
            questions: [
              mcq("What does the girl want?", "Bạn gái muốn mua gì?", ["An apple", "Some bread", "Some milk"], 0, "Bạn gái nói: I want an apple, please."),
            ],
          },
          writingPrompt: "What do you eat for lunch? Write one or two sentences.",
          writingOutline: "1. Tớ ăn gì\n2. Tớ uống gì",
          speaking: {
            sentences: ["I like apples.", "I drink milk."],
            questions: [{ question: "What food do you like?", sampleAnswer: "I like rice and fish." }],
          },
        },
      ],
    },
  ],
  STARTERS: [
    {
      title: "Chương 1 · Ngày của bé",
      subtitle: "Trường lớp, đồ chơi và quần áo",
      lessons: [
        {
          topic: "At School",
          topicVi: "Ở trường",
          icon: "🎒",
          words: [
            { word: "book", ipa: "/bʊk/", meaning: "quyển sách" },
            { word: "pen", ipa: "/pen/", meaning: "cái bút" },
            { word: "teacher", ipa: "/ˈtiːtʃər/", meaning: "giáo viên" },
            { word: "friend", ipa: "/frend/", meaning: "bạn" },
          ],
          sound: {
            letters: "sh",
            sound: "/ʃ/",
            hint: "Chu môi ra trước như khi bảo “suỵt”. Trẻ Việt hay đọc nhầm thành /s/.",
            words: [
              { word: "ship", meaning: "con tàu", emoji: "🚢" },
              { word: "shop", meaning: "cửa hàng", emoji: "🏪" },
              { word: "fish", meaning: "con cá", emoji: "🐟" },
            ],
          },
          reading: {
            title: "My school day",
            passage:
              "I go to school every morning. My school is big and beautiful. I have many friends there. My favourite teacher is Miss Lan. She is very kind. After school, I play football with my friends.",
            translation:
              "Tớ đi học mỗi sáng. Trường tớ to và đẹp. Tớ có nhiều bạn ở đó. Cô giáo tớ thích nhất là cô Lan. Cô rất tốt bụng. Sau giờ học, tớ chơi bóng đá với các bạn.",
            questions: [
              mcq("Who is the favourite teacher?", "Cô giáo được yêu thích là ai?", ["Miss Mai", "Miss Lan", "Miss Anna", "Miss Hoa"], 1, "Bài đọc viết: My favourite teacher is Miss Lan.", "My favourite teacher is Miss Lan."),
              mcq("What does the child do after school?", "Bạn nhỏ làm gì sau giờ học?", ["Reads books", "Plays football", "Goes home", "Watches TV"], 1, "Câu cuối viết: I play football with my friends.", "I play football with my friends."),
              tf("The school is small.", "Trường thì nhỏ.", false, "Bài đọc viết: My school is big and beautiful."),
            ],
          },
          listening: {
            title: "In the classroom",
            transcript:
              "Teacher: Good morning, children! Children: Good morning, Miss Lan! Teacher: Open your books, please. Today we learn about animals. Nam: I like animals! Teacher: Very good, Nam.",
            questions: [
              mcq("What do they learn about today?", "Hôm nay các bạn học về gì?", ["Colours", "Animals", "Numbers"], 1, "Cô giáo nói: Today we learn about animals."),
              tf("The teacher's name is Miss Lan.", "Cô giáo tên là Lan.", true, "Các bạn chào: Good morning, Miss Lan!"),
            ],
          },
          writingPrompt: "Write about your school. What do you like about it?",
          writingOutline: "1. Trường tớ tên gì\n2. Trường như thế nào\n3. Tớ thích điều gì ở trường\n4. Bạn thân của tớ",
          speaking: {
            sentences: ["My school is big.", "I have many friends."],
            questions: [
              { question: "Tell me about your school.", sampleAnswer: "My school is big. I have many friends. My teacher is very kind." },
            ],
          },
        },
        {
          topic: "My Toys",
          topicVi: "Đồ chơi của bé",
          icon: "🧸",
          words: [
            { word: "ball", ipa: "/bɔːl/", meaning: "quả bóng" },
            { word: "doll", ipa: "/dɒl/", meaning: "búp bê" },
            { word: "kite", ipa: "/kaɪt/", meaning: "cái diều" },
            { word: "robot", ipa: "/ˈrəʊbɒt/", meaning: "người máy" },
          ],
          sound: {
            letters: "oo",
            sound: "/uː/",
            hint: "“u” kéo dài, môi tròn nhỏ.",
            words: [
              { word: "moon", meaning: "mặt trăng", emoji: "🌕" },
              { word: "food", meaning: "đồ ăn", emoji: "🍜" },
              { word: "zoo", meaning: "sở thú", emoji: "🦓" },
            ],
          },
          reading: {
            title: "My toy box",
            passage:
              "I have a big toy box in my room. There are many toys inside. I have three balls, one doll and a red robot. My favourite toy is the robot because it can walk and talk.",
            translation:
              "Tớ có một hộp đồ chơi to trong phòng. Có nhiều đồ chơi bên trong. Tớ có ba quả bóng, một con búp bê và một người máy màu đỏ. Đồ chơi tớ thích nhất là người máy vì nó biết đi và biết nói.",
            questions: [
              mcq("How many balls are there?", "Có mấy quả bóng?", ["One", "Two", "Three", "Four"], 2, "Bài đọc viết: I have three balls.", "I have three balls"),
              mcq("Why is the robot the favourite toy?", "Vì sao người máy là món yêu thích?", ["It is red", "It can walk and talk", "It is big", "It is new"], 1, "Bài đọc viết: because it can walk and talk.", "it can walk and talk"),
            ],
          },
          listening: {
            title: "Let's play",
            transcript:
              "Boy: Look at my new kite! Girl: Wow, it is beautiful! What colour is it? Boy: It is blue and yellow. Let's fly it in the park!",
            questions: [
              mcq("What is the new toy?", "Đồ chơi mới là gì?", ["A ball", "A kite", "A robot"], 1, "Bạn trai nói: Look at my new kite!"),
              mcq("Where do they want to play?", "Các bạn muốn chơi ở đâu?", ["At school", "In the park", "At home"], 1, "Bạn trai nói: Let's fly it in the park!"),
            ],
          },
          writingPrompt: "Write about your favourite toy.",
          writingOutline: "1. Đồ chơi gì\n2. Màu gì, to hay nhỏ\n3. Vì sao tớ thích nó\n4. Tớ chơi với ai",
          speaking: {
            sentences: ["This is my robot.", "I play with my friends."],
            questions: [{ question: "What is your favourite toy?", sampleAnswer: "My favourite toy is a red robot. It can walk and talk." }],
          },
        },
        {
          topic: "Clothes",
          topicVi: "Quần áo",
          icon: "👕",
          words: [
            { word: "shirt", ipa: "/ʃɜːrt/", meaning: "áo sơ mi" },
            { word: "shoes", ipa: "/ʃuːz/", meaning: "đôi giày" },
            { word: "hat", ipa: "/hæt/", meaning: "cái mũ" },
            { word: "dress", ipa: "/dres/", meaning: "cái váy" },
          ],
          sound: {
            letters: "ch",
            sound: "/tʃ/",
            hint: "Giống “ch” tiếng Việt nhưng chu môi và bật mạnh hơn.",
            words: [
              { word: "chair", meaning: "cái ghế", emoji: "🪑" },
              { word: "cheese", meaning: "phô mai", emoji: "🧀" },
              { word: "chicken", meaning: "con gà", emoji: "🐔" },
            ],
          },
          reading: {
            title: "Getting ready",
            passage:
              "Today is Monday. I put on my white shirt and my blue trousers. I wear black shoes. My sister wears a pink dress and a hat. We are ready for school.",
            translation:
              "Hôm nay là thứ Hai. Tớ mặc áo sơ mi trắng và quần xanh. Tớ đi giày đen. Chị tớ mặc váy hồng và đội mũ. Chúng tớ đã sẵn sàng đi học.",
            questions: [
              mcq("What colour is the shirt?", "Cái áo màu gì?", ["Blue", "White", "Black", "Pink"], 1, "Bài đọc viết: my white shirt.", "my white shirt"),
              tf("The sister wears a dress.", "Chị gái mặc váy.", true, "Bài đọc viết: My sister wears a pink dress."),
            ],
          },
          listening: {
            title: "At the shop",
            transcript:
              "Mum: Do you like this red hat? Girl: Yes, I do! It is nice. Mum: OK, let's buy it. Girl: Thank you, Mum!",
            questions: [
              mcq("What do they buy?", "Họ mua gì?", ["A red hat", "A blue shirt", "Black shoes"], 0, "Mẹ hỏi về chiếc mũ đỏ và nói: let's buy it."),
            ],
          },
          writingPrompt: "What are you wearing today? Write about your clothes.",
          writingOutline: "1. Tớ mặc áo gì, màu gì\n2. Tớ đi giày gì\n3. Tớ thích bộ nào nhất",
          speaking: {
            sentences: ["I wear a white shirt.", "My shoes are black."],
            questions: [{ question: "What are you wearing today?", sampleAnswer: "I am wearing a blue shirt and black shoes." }],
          },
        },
      ],
    },
    {
      title: "Chương 2 · Nhà và thiên nhiên",
      subtitle: "Ngôi nhà, thời tiết và thể thao",
      lessons: [
        {
          topic: "My House",
          topicVi: "Ngôi nhà của bé",
          icon: "🏠",
          words: [
            { word: "house", ipa: "/haʊs/", meaning: "ngôi nhà" },
            { word: "room", ipa: "/ruːm/", meaning: "căn phòng" },
            { word: "kitchen", ipa: "/ˈkɪtʃɪn/", meaning: "nhà bếp" },
            { word: "garden", ipa: "/ˈɡɑːrdn/", meaning: "khu vườn" },
          ],
          sound: {
            letters: "ar",
            sound: "/ɑːr/",
            hint: "“a” dài rồi cong lưỡi. NHỚ phát âm chữ r ở cuối.",
            words: [
              { word: "star", meaning: "ngôi sao", emoji: "⭐" },
              { word: "car", meaning: "ô tô", emoji: "🚗" },
              { word: "garden", meaning: "khu vườn", emoji: "🌷" },
            ],
          },
          reading: {
            title: "Welcome to my house",
            passage:
              "My house is not very big, but it is warm. There are three rooms. My room is small and it is next to the kitchen. We have a garden behind the house. My mother grows flowers there.",
            translation:
              "Nhà tớ không to lắm nhưng ấm cúng. Có ba căn phòng. Phòng tớ nhỏ và ở cạnh nhà bếp. Chúng tớ có một khu vườn sau nhà. Mẹ tớ trồng hoa ở đó.",
            questions: [
              mcq("How many rooms are there?", "Có mấy phòng?", ["Two", "Three", "Four"], 1, "Bài đọc viết: There are three rooms.", "There are three rooms."),
              mcq("Where is the garden?", "Khu vườn ở đâu?", ["In front of the house", "Behind the house", "Next to the kitchen"], 1, "Bài đọc viết: a garden behind the house.", "a garden behind the house"),
            ],
          },
          listening: {
            title: "Where is it?",
            transcript:
              "Boy: Mum, where is my ball? Mum: Is it in your room? Boy: No, it isn't. Mum: Look in the garden! Boy: Yes! It is under the tree.",
            questions: [
              mcq("Where is the ball?", "Quả bóng ở đâu?", ["In the room", "Under the tree", "In the kitchen"], 1, "Bạn trai nói: It is under the tree."),
            ],
          },
          writingPrompt: "Write about your house. What rooms are there?",
          writingOutline: "1. Nhà tớ to hay nhỏ\n2. Có những phòng nào\n3. Phòng tớ thích nhất\n4. Nhà tớ có vườn không",
          speaking: {
            sentences: ["My house is small.", "There is a garden."],
            questions: [{ question: "Tell me about your house.", sampleAnswer: "My house has three rooms. My room is small but I like it." }],
          },
        },
        {
          topic: "Weather",
          topicVi: "Thời tiết",
          icon: "☀️",
          words: [
            { word: "sunny", ipa: "/ˈsʌni/", meaning: "có nắng" },
            { word: "rainy", ipa: "/ˈreɪni/", meaning: "có mưa" },
            { word: "windy", ipa: "/ˈwɪndi/", meaning: "có gió" },
            { word: "cold", ipa: "/kəʊld/", meaning: "lạnh" },
          ],
          sound: {
            letters: "ai",
            sound: "/eɪ/",
            hint: "Trượt từ “ê” sang “i”, hai âm dính liền thành một.",
            words: [
              { word: "rain", meaning: "mưa", emoji: "🌧️" },
              { word: "train", meaning: "tàu hoả", emoji: "🚂" },
              { word: "tail", meaning: "cái đuôi", emoji: "🐒" },
            ],
          },
          reading: {
            title: "The weather today",
            passage:
              "Today it is sunny and warm. I can play outside with my friends. Yesterday it was rainy, so we stayed at home. I like sunny days best because I can ride my bike.",
            translation:
              "Hôm nay trời nắng và ấm. Tớ được chơi ngoài trời với các bạn. Hôm qua trời mưa nên chúng tớ ở nhà. Tớ thích ngày nắng nhất vì tớ được đạp xe.",
            questions: [
              mcq("What is the weather today?", "Hôm nay thời tiết thế nào?", ["Rainy", "Sunny", "Windy", "Cold"], 1, "Câu đầu viết: Today it is sunny and warm.", "Today it is sunny and warm."),
              tf("Yesterday was rainy.", "Hôm qua trời mưa.", true, "Bài đọc viết: Yesterday it was rainy."),
            ],
          },
          listening: {
            title: "Rainy day",
            transcript:
              "Girl: Oh no, it is raining! Boy: Don't worry. We can play inside. Girl: OK. Let's play a game!",
            questions: [
              mcq("What is the weather?", "Thời tiết thế nào?", ["Sunny", "Raining", "Windy"], 1, "Bạn gái nói: it is raining!"),
            ],
          },
          writingPrompt: "What is the weather like today? What do you do?",
          writingOutline: "1. Hôm nay trời thế nào\n2. Tớ làm gì\n3. Tớ thích thời tiết nào nhất",
          speaking: {
            sentences: ["It is sunny today.", "I like rainy days."],
            questions: [{ question: "What is the weather like today?", sampleAnswer: "Today it is sunny. I can play outside." }],
          },
        },
        {
          topic: "Sports",
          topicVi: "Thể thao",
          icon: "⚽",
          words: [
            { word: "football", ipa: "/ˈfʊtbɔːl/", meaning: "bóng đá" },
            { word: "swim", ipa: "/swɪm/", meaning: "bơi" },
            { word: "run", ipa: "/rʌn/", meaning: "chạy" },
            { word: "jump", ipa: "/dʒʌmp/", meaning: "nhảy" },
          ],
          sound: {
            letters: "j",
            sound: "/dʒ/",
            hint: "Giống “ch” tiếng Việt nhưng CÓ rung dây thanh và tròn môi hơn.",
            words: [
              { word: "jump", meaning: "nhảy", emoji: "🤸" },
              { word: "jam", meaning: "mứt", emoji: "🍓" },
              { word: "juice", meaning: "nước ép", emoji: "🧃" },
            ],
          },
          reading: {
            title: "Sports day",
            passage:
              "Today is sports day at my school. I can run fast and I can jump high. My friend Nam plays football very well. My sister likes swimming. We all have fun together.",
            translation:
              "Hôm nay là ngày hội thể thao ở trường tớ. Tớ chạy nhanh và nhảy cao. Bạn Nam của tớ đá bóng rất giỏi. Chị tớ thích bơi. Chúng tớ đều vui vẻ cùng nhau.",
            questions: [
              mcq("What does Nam play well?", "Nam chơi giỏi môn gì?", ["Swimming", "Football", "Running"], 1, "Bài đọc viết: Nam plays football very well.", "Nam plays football very well"),
              mcq("What does the sister like?", "Chị gái thích gì?", ["Running", "Jumping", "Swimming"], 2, "Bài đọc viết: My sister likes swimming.", "My sister likes swimming."),
            ],
          },
          listening: {
            title: "Can you swim?",
            transcript:
              "Boy: Can you swim? Girl: Yes, I can. I swim every Sunday. Boy: Wow! I can't swim, but I can run fast.",
            questions: [
              tf("The girl can swim.", "Bạn gái biết bơi.", true, "Bạn gái nói: Yes, I can. I swim every Sunday."),
              mcq("What can the boy do?", "Bạn trai làm được gì?", ["Swim", "Run fast", "Jump high"], 1, "Bạn trai nói: I can run fast."),
            ],
          },
          writingPrompt: "What sport do you like? Write about it.",
          writingOutline: "1. Môn thể thao tớ thích\n2. Tớ chơi khi nào\n3. Tớ chơi với ai\n4. Vì sao tớ thích",
          speaking: {
            sentences: ["I can run fast.", "I like football."],
            questions: [{ question: "What sport can you do?", sampleAnswer: "I can swim and run. I like football best." }],
          },
        },
      ],
    },
  ],
};

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

/** Dựng content JSON cho từng kỹ năng của một bài lộ trình. */
function sectionContent(l: LessonSeed, skill: Skill): unknown {
  switch (skill) {
    case "VOCAB":
      return {
        title: l.topic,
        words: l.words.map((x) => ({
          word: x.word,
          ipa: x.ipa,
          meaning: x.meaning,
          partOfSpeech: "danh từ",
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
            questions: l.reading.questions,
          },
        ],
      };
    case "LISTENING":
      return {
        title: l.listening.title,
        timeLimit: 480,
        clips: [{ title: l.listening.title, audioUrl: "", transcript: l.listening.transcript, questions: l.listening.questions }],
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
    case "GRAMMAR":
      // Ngữ pháp của bài dùng chung giáo án của cấp — trỏ về unit ngữ pháp đã seed.
      return null;
    default:
      return null;
  }
}

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
          const content = sectionContent(l, skill);
          // Phần Ngữ pháp chưa có content riêng cho từng bài → để "Sắp có" thay
          // vì tạo một phần rỗng mà bấm vào không có gì.
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

  // --- 4 cấp còn lại: khung "Sắp có" ---
  for (const [level, lessons] of Object.entries(COMING_SOON) as Array<
    [EnglishLevel, Array<{ topic: string; topicVi: string; icon: string }>]
  >) {
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
