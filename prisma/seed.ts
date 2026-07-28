/**
 * Seed tối thiểu cho DingDong Kids.
 *
 * Chạy TRÊN MỖI LẦN DEPLOY (xem `startCommand` trong railway.toml) nên mọi thao
 * tác đều phải LŨY ĐẲNG — chỉ dùng `upsert`, không bao giờ `deleteMany`. Mục
 * tiêu duy nhất là để ứng dụng không trống trơn khi vừa dựng xong:
 *   1. 6 Course, mỗi cấp độ Cambridge một khoá.
 *   2. Một unit từ vựng demo (Animals) với vài từ tiếng Anh vỡ lòng.
 *
 * Nội dung dạy học THẬT (lộ trình, đề đọc/nghe/viết/nói, đề thi thử) do admin
 * biên soạn trong trang quản trị — cố tình KHÔNG bịa ở đây.
 */
import { PrismaClient, EnglishLevel } from "@prisma/client";

const prisma = new PrismaClient();

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

interface WordSeed {
  word: string;
  ipa: string;
  meaning: string;
  partOfSpeech: string;
  examples: Array<{ sentence: string; meaning: string }>;
}

/** Bộ từ vỡ lòng chủ đề Animals — đủ để luồng học/ôn chạy được ngay. */
const DEMO_WORDS: WordSeed[] = [
  {
    word: "cat",
    ipa: "/kæt/",
    meaning: "con mèo",
    partOfSpeech: "noun",
    examples: [{ sentence: "The cat is sleeping.", meaning: "Con mèo đang ngủ." }],
  },
  {
    word: "dog",
    ipa: "/dɒɡ/",
    meaning: "con chó",
    partOfSpeech: "noun",
    examples: [{ sentence: "My dog is very friendly.", meaning: "Chó của tớ rất thân thiện." }],
  },
  {
    word: "bird",
    ipa: "/bɜːd/",
    meaning: "con chim",
    partOfSpeech: "noun",
    examples: [{ sentence: "A bird can fly.", meaning: "Chim biết bay." }],
  },
  {
    word: "fish",
    ipa: "/fɪʃ/",
    meaning: "con cá",
    partOfSpeech: "noun",
    examples: [{ sentence: "The fish swims in the water.", meaning: "Con cá bơi trong nước." }],
  },
  {
    word: "rabbit",
    ipa: "/ˈræbɪt/",
    meaning: "con thỏ",
    partOfSpeech: "noun",
    examples: [{ sentence: "The rabbit likes carrots.", meaning: "Con thỏ thích cà rốt." }],
  },
  {
    word: "elephant",
    ipa: "/ˈelɪfənt/",
    meaning: "con voi",
    partOfSpeech: "noun",
    examples: [{ sentence: "An elephant is very big.", meaning: "Con voi rất to." }],
  },
];

// Id cố định cho unit/lesson demo → chạy lại seed thì cập nhật đúng bản ghi cũ
// thay vì đẻ thêm bản sao.
const DEMO_UNIT_ID = "seed-vocab-unit-animals";
const DEMO_LESSON_ID = "seed-vocab-lesson-animals-1";

async function seedCourses(): Promise<void> {
  for (const [i, c] of COURSES.entries()) {
    await prisma.course.upsert({
      where: { level: c.level },
      update: {
        title: c.title,
        subtitle: c.subtitle,
        description: c.description,
        order: i,
      },
      create: {
        level: c.level,
        title: c.title,
        subtitle: c.subtitle,
        description: c.description,
        order: i,
        published: true,
      },
    });
  }
  console.log(`[seed] ${COURSES.length} khoá học đã sẵn sàng.`);
}

async function seedDemoVocab(): Promise<void> {
  await prisma.vocabUnit.upsert({
    where: { id: DEMO_UNIT_ID },
    update: { title: "Animals", theme: "Animals", level: "STARTERS", order: 0 },
    create: {
      id: DEMO_UNIT_ID,
      title: "Animals",
      theme: "Animals",
      level: "STARTERS",
      order: 0,
      published: true,
    },
  });

  await prisma.vocabLesson.upsert({
    where: { id: DEMO_LESSON_ID },
    update: { title: "Con vật quanh bé", order: 0 },
    create: {
      id: DEMO_LESSON_ID,
      unitId: DEMO_UNIT_ID,
      title: "Con vật quanh bé",
      order: 0,
      exercises: [],
      published: true,
    },
  });

  for (const [i, w] of DEMO_WORDS.entries()) {
    // VocabWord không có khoá tự nhiên duy nhất → khoá theo id tất định.
    const id = `seed-word-${w.word}`;
    await prisma.vocabWord.upsert({
      where: { id },
      update: {
        order: i,
        word: w.word,
        ipa: w.ipa,
        meaning: w.meaning,
        partOfSpeech: w.partOfSpeech,
        examples: w.examples,
      },
      create: {
        id,
        lessonId: DEMO_LESSON_ID,
        order: i,
        word: w.word,
        ipa: w.ipa,
        meaning: w.meaning,
        partOfSpeech: w.partOfSpeech,
        examples: w.examples,
      },
    });
  }
  console.log(`[seed] Unit từ vựng demo với ${DEMO_WORDS.length} từ đã sẵn sàng.`);
}

async function main(): Promise<void> {
  await seedCourses();
  await seedDemoVocab();
}

main()
  .catch((e: unknown) => {
    console.error("[seed] thất bại:", e);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
