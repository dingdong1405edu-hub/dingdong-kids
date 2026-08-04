import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CreditCard,
  GraduationCap,
  HeartHandshake,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { FREESTYLE_PLANS, ROADMAP_PLANS, formatVnd } from "@/lib/payment-plans";
import { FREE_ROADMAP_LESSONS } from "@/lib/entitlements";
import { HEART_REGEN_MINUTES, MAX_HEARTS } from "@/lib/hearts";
import { CORE_FIRST_WORDS_COUNT, CORE_FIRST_WORDS_UNITS } from "@/lib/first-words";
import { SITE_NAME, SITE_URL, SOCIAL_LINKS, SUPPORT_EMAIL } from "@/lib/site";
import { DingMascot } from "@/components/marketing/ding-mascot";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { MarketingNav } from "./_components/marketing-nav";
import { MarketingFooter } from "./_components/marketing-footer";
import { BackToTop } from "./_components/back-to-top";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  // absolute: trang chủ tự mang tên thương hiệu, không để template root nối đuôi lần nữa.
  title: { absolute: "DingDong Kids — Tiếng Anh vui cho bé 3–15 tuổi" },
  description:
    "Học tiếng Anh online cho trẻ theo chuẩn Cambridge Young Learners: ghép vần, từ vựng, ngữ pháp, đọc, nghe, viết, nói. AI chấm bài viết và luyện nói, giao diện hoàn toàn tiếng Việt. Chặng Bé Tập Nói miễn phí 100%.",
  keywords: [
    "học tiếng Anh cho trẻ em",
    "tiếng Anh cho bé",
    "học tiếng Anh online",
    "phonics cho bé",
    "luyện thi Cambridge YLE",
    "Starters Movers Flyers",
    "DingDong Kids",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "DingDong Kids — Tiếng Anh vui cho bé 3–15 tuổi",
    description:
      "Ghép vần, từ vựng, ngữ pháp, đọc, nghe, viết, nói theo chuẩn Cambridge Young Learners. AI chấm từng bài, luôn khen trước khi sửa. Chặng đầu miễn phí 100%.",
    url: "/",
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    // Khai báo tường minh chứ không dựa vào kế thừa từ layout gốc: Next không
    // gộp sâu `openGraph`, trang nào tự khai `openGraph` mà thiếu `images` thì
    // ảnh xem trước biến mất khi chia sẻ lên Facebook/Zalo.
    images: [
      { url: "/og-cover.png", width: 1200, height: 630, alt: "DingDong Kids — Tiếng Anh vui cho bé" },
    ],
  },
};

const anchor = { scrollMarginTop: "96px" } as const;

// ---------------------------------------------------------------------------
//  NỘI DUNG TĨNH
//  Mọi CON SỐ trên trang này phải lấy từ code nguồn (import ở trên), không gõ
//  tay. Trang bán hàng nói sai một con số là mất lòng tin của phụ huynh.
// ---------------------------------------------------------------------------

const ages = [
  { emoji: "🧸", age: "3–5 tuổi", what: "Chưa biết chữ · nhìn hình nói theo" },
  { emoji: "🌱", age: "4–7 tuổi", what: "Làm quen mặt chữ · ghép vần" },
  { emoji: "🚀", age: "7–11 tuổi", what: "Đọc, viết thành câu" },
  { emoji: "🏆", age: "11–15 tuổi", what: "Luyện thi Key A2 · B1" },
];

const features = [
  {
    icon: "🔤",
    cls: styles.iconWriting,
    title: "Ghép vần (Phonics)",
    desc: "Bé học âm chữ cái, phụ âm ghép sh/ch/th, nguyên âm ghép ai/ee/oa rồi ghép thành từ. Đây là nền tảng để bé TỰ đọc được từ mới, thay vì học vẹt mặt chữ.",
    tag: "Nền tảng tự đọc",
  },
  {
    icon: "🃏",
    cls: styles.iconVocab,
    title: "Từ vựng có ảnh và tiếng",
    desc: "Từ vựng theo chủ đề quen thuộc: con vật, gia đình, đồ ăn, màu sắc. Mỗi từ đều nghe được giọng đọc chuẩn, kèm nghĩa tiếng Việt và câu ví dụ.",
  },
  {
    icon: "🧩",
    cls: styles.iconGrammar,
    title: "Ngữ pháp bằng tình huống",
    desc: "Không bảng chia động từ khô khan. Bé gặp mẫu câu trong tình huống thật, làm bài kéo thả, chọn từ và sắp xếp câu cho tới khi quen tay.",
  },
  {
    icon: "🎧",
    cls: styles.iconExam,
    title: "Đọc và nghe hiểu",
    desc: "Đoạn văn ngắn cùng hội thoại đọc chậm cho trẻ, đúng format đề Cambridge. Bé bấm vào từ lạ là hiện nghĩa, nghe lại được câu đọc mẫu.",
  },
  {
    icon: "🎙️",
    cls: styles.iconSpeaking,
    title: "Luyện nói, AI chấm phát âm",
    desc: "Bé bấm micro nói ngay trên trình duyệt. AI nhận xét phát âm, ngữ điệu và độ lưu loát — có nhắc đúng những lỗi trẻ Việt hay mắc như nuốt phụ âm cuối.",
    tag: "Có AI chấm",
  },
  {
    icon: "✍️",
    cls: styles.iconAi,
    title: "Tập viết, AI chữa từng lỗi",
    desc: "Bé viết câu hoặc đoạn ngắn, AI chấm ngữ pháp, từ vựng, mạch lạc và bám đề, chỉ rõ chỗ sai kèm bản sửa — bằng tiếng Việt, luôn khen trước khi sửa.",
    tag: "Có AI chấm",
  },
];

const steps = [
  {
    n: 1,
    title: "Tạo tài khoản miễn phí",
    desc: "Khoảng 30 giây, không cần thẻ ngân hàng. Bố mẹ chọn giúp bé chặng phù hợp với tuổi.",
  },
  {
    n: 2,
    title: "Bé học 10–15 phút mỗi ngày",
    desc: "Mỗi bài là một chuỗi hoạt động ngắn: nghe, chọn, nói, viết. Bé nhận sao và giữ chuỗi ngày học.",
  },
  {
    n: 3,
    title: "Xem bé tiến bộ tới đâu",
    desc: "Sau mỗi bài đều có điểm và nhận xét. Bố mẹ biết bé chắc phần nào, còn vướng từ nào.",
  },
];

// 7 chặng — màu và emoji khớp COURSE_THEME trong src/lib/roadmap.ts để bé thấy
// đúng màu ấy khi vào khu học.
const path = [
  { emoji: "🧸", name: "Bé Tập Nói", age: "3–5 tuổi", sub: "Nhìn hình, nói theo", color: "#ec4899", free: true },
  { emoji: "🌱", name: "Pre-Starters", age: "4–5 tuổi", sub: "Bé làm quen", color: "#f59e0b" },
  { emoji: "🐣", name: "Starters", age: "6–7 tuổi", sub: "Khởi động", color: "#10b981" },
  { emoji: "🚀", name: "Movers", age: "7–9 tuổi", sub: "Tiến bước", color: "#0ea5e9" },
  { emoji: "🦋", name: "Flyers", age: "9–11 tuổi", sub: "Bay cao", color: "#8b5cf6" },
  { emoji: "🔑", name: "Key (A2)", age: "11–13 tuổi", sub: "Vững vàng", color: "#f97316" },
  { emoji: "🏆", name: "Preliminary (B1)", age: "13–15 tuổi", sub: "Chinh phục", color: "#f43f5e" },
];

// Cam kết với phụ huynh — THAY cho mục "cảm nhận học viên".
// Ba lời chứng thực cũ là chỗ giữ chỗ ghi "Đang cập nhật" kèm 5 sao: một trang
// bán hàng hiển thị 5 sao cho nội dung trống là tự bắn vào chân mình. Khi nào
// có phản hồi THẬT của phụ huynh thì thêm mục mới, đừng bịa.
const commitments = [
  {
    icon: ShieldCheck,
    title: "Không quảng cáo, không bán hàng trong bài học",
    desc: "Bé học xong một bài là quay lại bản đồ, không có banner, không có cửa sổ mời mua. Mọi thông tin về gói học chỉ nằm ở khu vực của bố mẹ.",
  },
  {
    icon: CreditCard,
    title: "Thanh toán một lần, không tự động gia hạn",
    desc: "Mỗi gói có thời hạn rõ ràng và hết hạn thì dừng. DingDong không lưu thẻ và không tự trừ tiền lần sau.",
  },
  {
    icon: Lock,
    title: "Dữ liệu của bé được giữ tối thiểu",
    desc: "DingDong chỉ lưu tiến độ học và bản ghi âm phục vụ việc chấm bài.",
    href: "/chinh-sach",
    hrefLabel: "Đọc chính sách bảo mật",
  },
  {
    icon: HeartHandshake,
    title: "Chấm bài luôn khen trước khi sửa",
    desc: "Đây là nguyên tắc được viết thẳng vào hệ thống chấm điểm. Trẻ nhỏ bỏ cuộc rất nhanh khi bị chê, nên DingDong không dùng nhãn tiêu cực.",
  },
];

const faqs = [
  {
    q: "Bé chưa biết chữ thì học kiểu gì?",
    a: (
      <>
        Bắt đầu ở chặng <b>Bé Tập Nói</b> — chặng này không bắt bé đọc chữ. Bé nhìn tranh, nghe
        giọng đọc tự phát ra, rồi bấm micro nói theo. Chữ tiếng Anh mặc định được ẩn đi (bố mẹ bật
        lên bằng nút 👁️ nếu muốn). Toàn bộ chặng này miễn phí và không giới hạn số lần làm lại.
      </>
    ),
  },
  {
    q: "Mỗi ngày bé nên học bao lâu?",
    a: (
      <>
        Khoảng <b>10–15 phút</b> là đủ. Mỗi bài được chia thành nhiều hoạt động ngắn để bé không
        mỏi. Điều quan trọng với trẻ nhỏ là học đều mỗi ngày, không phải học nhiều trong một buổi —
        vì vậy DingDong có chuỗi ngày học thay vì bảng xếp hạng thành tích.
      </>
    ),
  },
  {
    q: "Có phải cài ứng dụng không?",
    a: (
      <>
        Không. DingDong Kids chạy thẳng trên trình duyệt của điện thoại, máy tính bảng hay máy tính.
        Phần luyện nói cần bé cho phép dùng micro. Nếu micro bị chặn, bé vẫn học và vẫn nhận sao
        bình thường.
      </>
    ),
  },
  {
    q: "Bố mẹ theo dõi con thế nào?",
    a: (
      <>
        Chặng Bé Tập Nói có bảng báo cáo cho bố mẹ ngay sau mỗi chủ đề: bé nói tốt từ nào, còn vướng
        từ nào. Ở các cấp trên, hồ sơ học tập hiển thị điểm từng bài, XP và chuỗi ngày học.{" "}
        <b>Tài khoản phụ huynh riêng đang được xây dựng</b> — hiện bố mẹ dùng chung tài khoản với bé.
      </>
    ),
  },
  {
    q: "AI chấm có chính xác với giọng trẻ em không?",
    a: (
      <>
        Máy nhận dạng giọng trẻ em kém chính xác hơn giọng người lớn khá nhiều, và DingDong xử lý
        điều đó một cách có chủ đích: khi bản ghi khó nghe, hệ thống mặc định <b>máy nghe nhầm chứ
        không phải bé nói sai</b>. Ở chặng Bé Tập Nói, điểm thấp nhất luôn là 1 sao — không bao giờ
        có màn báo lỗi hay số 0 nào hiện ra trước mặt bé.
      </>
    ),
  },
  {
    q: "Trả phí rồi mà bé không hợp thì sao?",
    a: (
      <>
        Vì vậy chặng đầu miễn phí trọn vẹn và mỗi cấp đều mở sẵn {FREE_ROADMAP_LESSONS} bài đầu —
        hãy để bé học thử hết phần miễn phí trước khi bố mẹ quyết định. Cần trao đổi thêm, viết thư
        cho DingDong tại <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </>
    ),
  },
];

// JSON-LD: giúp Google hiểu đây là một tổ chức giáo dục + hiện FAQ ngay trên
// trang kết quả tìm kiếm. Phần FAQ phải khớp NGUYÊN VĂN nội dung hiển thị.
const faqPlainText: string[] = [
  "Bắt đầu ở chặng Bé Tập Nói — chặng này không bắt bé đọc chữ. Bé nhìn tranh, nghe giọng đọc tự phát ra, rồi bấm micro nói theo. Chữ tiếng Anh mặc định được ẩn đi. Toàn bộ chặng này miễn phí và không giới hạn số lần làm lại.",
  "Khoảng 10–15 phút là đủ. Mỗi bài được chia thành nhiều hoạt động ngắn để bé không mỏi. Điều quan trọng với trẻ nhỏ là học đều mỗi ngày, không phải học nhiều trong một buổi.",
  "Không. DingDong Kids chạy thẳng trên trình duyệt của điện thoại, máy tính bảng hay máy tính. Phần luyện nói cần bé cho phép dùng micro.",
  "Chặng Bé Tập Nói có bảng báo cáo cho bố mẹ ngay sau mỗi chủ đề. Ở các cấp trên, hồ sơ học tập hiển thị điểm từng bài, XP và chuỗi ngày học. Tài khoản phụ huynh riêng đang được xây dựng.",
  "Máy nhận dạng giọng trẻ em kém chính xác hơn giọng người lớn, nên khi bản ghi khó nghe hệ thống mặc định là máy nghe nhầm chứ không phải bé nói sai. Ở chặng Bé Tập Nói, điểm thấp nhất luôn là 1 sao.",
  `Chặng đầu miễn phí trọn vẹn và mỗi cấp đều mở sẵn ${FREE_ROADMAP_LESSONS} bài đầu để bé học thử trước khi bố mẹ quyết định. Cần trao đổi thêm, viết thư cho DingDong tại ${SUPPORT_EMAIL}.`,
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-kids.png`,
      email: SUPPORT_EMAIL,
      description:
        "Nền tảng học tiếng Anh trực tuyến cho trẻ em Việt theo chuẩn Cambridge Young Learners, có AI chấm bài viết và luyện nói.",
      sameAs: SOCIAL_LINKS.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "vi",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f, i) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: faqPlainText[i] },
      })),
    },
  ],
};

export default async function LandingPage() {
  const session = await auth();
  const isAuthed = !!session?.user;
  const firstName = session?.user?.name?.trim().split(/\s+/).pop() ?? null;

  // CTA chính đổi đích theo trạng thái đăng nhập — đã đăng nhập thì vào thẳng
  // khu vực học, KHÔNG bắt đăng nhập lại.
  const primaryHref = isAuthed ? "/dashboard" : "/register";

  // Giá "từ ..." lấy trực tiếp từ cấu hình gói để không bao giờ lệch bảng giá.
  const freestyleFrom = Math.min(...FREESTYLE_PLANS.map((p) => p.amount));
  const roadmapFrom = Math.min(...ROADMAP_PLANS.map((p) => p.amount));

  // Số liệu chặng Bé Tập Nói — đếm từ chính nguồn dữ liệu, không gõ tay.
  const coreUnitCount = CORE_FIRST_WORDS_UNITS.length;
  const previewWords = CORE_FIRST_WORDS_UNITS[0]?.words.slice(0, 8) ?? [];

  const stats = [
    { to: path.length, label: "Chặng học, từ 3 đến 15 tuổi" },
    { to: 7, label: "Kỹ năng luyện mỗi ngày" },
    { to: CORE_FIRST_WORDS_COUNT, label: "Từ đầu đời học miễn phí" },
    { to: FREE_ROADMAP_LESSONS, label: "Bài đầu miễn phí ở mọi cấp" },
  ];

  const pricingCards = [
    {
      name: "Miễn phí",
      price: "0đ",
      note: "mãi mãi",
      desc: "Đủ để bố mẹ biết bé có hợp với cách học này không, trước khi trả bất kỳ đồng nào.",
      features: [
        `Trọn chặng Bé Tập Nói — ${coreUnitCount} chủ đề, ${CORE_FIRST_WORDS_COUNT} từ, AI chấm phát âm`,
        `${FREE_ROADMAP_LESSONS} bài đầu của mỗi cấp lộ trình`,
        `Luyện tập tự do với ${MAX_HEARTS} tim, tự hồi 1 tim mỗi ${HEART_REGEN_MINUTES} phút`,
        "Theo dõi XP và chuỗi ngày học",
      ],
      cta: { label: isAuthed ? "Vào học ngay" : "Học thử miễn phí", href: primaryHref, primary: false },
      highlighted: false,
    },
    {
      name: "Gói Tự do",
      price: `từ ${formatVnd(freestyleFrom)}`,
      note: "/ tháng",
      desc: "Mở hết phần luyện tập ngoài lộ trình, hợp với bé thích tự chọn cái mình muốn học.",
      features: [
        "Tất cả tính năng luyện tập tự do",
        "AI chấm bài viết và luyện nói không giới hạn lượt",
        "Tim không giới hạn — bé sai vẫn học tiếp",
        "Gói 3 tháng: tháng đầu chỉ 100.000đ",
      ],
      cta: { label: "Xem Gói Tự do", href: "/payment", primary: true },
      highlighted: true,
    },
    {
      name: "Gói Lộ trình",
      price: `từ ${formatVnd(roadmapFrom)}`,
      note: "/ 6 tháng",
      desc: "Mở khoá trọn một cấp Cambridge, bé học bài bản từ bài đầu tới bài cuối.",
      features: [
        "Toàn bộ bài lộ trình của cấp bố mẹ chọn",
        "Tim không giới hạn",
        "Từ Movers trở lên: tặng kèm Gói Tự do",
      ],
      cta: { label: "Chọn cấp cho bé", href: "/payment", primary: false },
      highlighted: false,
    },
  ];

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a href="#noi-dung" className={styles.skipLink}>
        Bỏ qua điều hướng
      </a>

      <MarketingNav isAuthed={isAuthed} />

      <main id="noi-dung">
        {/* ============ HERO ============ */}
        <section className={styles.hero} id="hero" aria-labelledby="hero-title">
          <div className={styles.heroBgPattern} />
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <p className={styles.heroBadge}>
                <span className={styles.dot} />
                <Sparkles className="h-4 w-4" aria-hidden="true" />{" "}
                {isAuthed
                  ? firstName
                    ? `Chào mừng trở lại, ${firstName}!`
                    : "Chào mừng trở lại!"
                  : "Chặng đầu miễn phí 100%"}
              </p>
              <h1 id="hero-title" className={styles.heroTitle}>
                Bé học tiếng Anh mỗi ngày,
                <br />
                <span className={styles.highlight}>vui như một trò chơi</span>
              </h1>
              <p className={styles.heroDesc}>
                Lộ trình {path.length} chặng theo chuẩn Cambridge Young Learners cho bé 3–15 tuổi,
                giải thích hoàn toàn bằng tiếng Việt. Bé nghe, nói, ghép vần và viết — AI chấm từng
                bài và luôn khen trước khi sửa.
              </p>
              <div className={styles.heroButtons}>
                {isAuthed ? (
                  <Link href="/dashboard" className={`${styles.btn} ${styles.btnPrimary}`}>
                    <GraduationCap className="h-5 w-5" aria-hidden="true" /> Vào học ngay
                  </Link>
                ) : (
                  <Link href="/register" className={`${styles.btn} ${styles.btnSunny}`}>
                    <Rocket className="h-5 w-5" aria-hidden="true" /> Cho bé học thử miễn phí
                  </Link>
                )}
                <a href="#levels" className={`${styles.btn} ${styles.btnSecondary}`}>
                  Xem lộ trình {path.length} chặng{" "}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
              <ul className={styles.heroAssure}>
                <li>
                  <Check className="h-[18px] w-[18px]" aria-hidden="true" /> Không cần thẻ ngân hàng
                </li>
                <li>
                  <Check className="h-[18px] w-[18px]" aria-hidden="true" /> Không cần cài ứng dụng
                </li>
                <li>
                  <Check className="h-[18px] w-[18px]" aria-hidden="true" /> Không quảng cáo
                </li>
              </ul>
              <div className={styles.heroStatsRow}>
                <div className={styles.heroStatItem}>
                  <div className={styles.heroStatNum}>{path.length}</div>
                  <div className={styles.heroStatLbl}>Chặng học</div>
                </div>
                <div className={styles.heroStatItem}>
                  <div className={styles.heroStatNum}>7</div>
                  <div className={styles.heroStatLbl}>Kỹ năng</div>
                </div>
                <div className={styles.heroStatItem}>
                  <div className={styles.heroStatNum}>3–15</div>
                  <div className={styles.heroStatLbl}>Tuổi phù hợp</div>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroVisualInner}>
                <DingMascot transparent />
              </div>
            </div>
          </div>
          <div className={styles.heroGridBg} />
        </section>

        {/* ============ DẢI ĐỘ TUỔI ============ */}
        <section className={styles.trusted} aria-labelledby="ages-title">
          <div className={styles.container}>
            <h2 id="ages-title" className={styles.trustedLabel}>
              Bé nhà mình bắt đầu từ đâu?
            </h2>
            <div className={styles.trustedLogos}>
              {ages.map((a) => (
                <div key={a.age} className={styles.trustedLogo}>
                  <span className={styles.trustedEmoji} aria-hidden>
                    {a.emoji}
                  </span>
                  <span className={styles.trustedAge}>{a.age}</span>
                  <span className={styles.trustedWhat}>{a.what}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TÍNH NĂNG ============ */}
        <section className={styles.section} id="features" style={anchor} aria-labelledby="features-title">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>✨ Bé học những gì</p>
                <h2 id="features-title" className={styles.sectionTitle}>
                  Bảy kỹ năng, một lộ trình duy nhất
                </h2>
                <p className={styles.sectionSubtitle}>
                  Ghép vần, từ vựng, ngữ pháp, đọc, nghe, viết và nói — bám sát format Cambridge
                  Young Learners, giải thích bằng tiếng Việt để bé không phải đoán.
                </p>
              </div>
            </Reveal>
            <div className={styles.featuresGrid}>
              {features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 0.08} className="h-full">
                  <Link
                    href={primaryHref}
                    className={styles.featureCard}
                    aria-label={isAuthed ? `${f.title} — vào học` : `${f.title} — học thử miễn phí`}
                  >
                    <span className={`${styles.featureIcon} ${f.cls}`} aria-hidden>
                      {f.icon}
                    </span>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                    {f.tag && <span className={styles.featureTag}>{f.tag}</span>}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CHẶNG BÉ TẬP NÓI (phễu miễn phí) ============ */}
        <section className={styles.spotlight} id="tap-noi" style={anchor} aria-labelledby="tap-noi-title">
          <div className={styles.container}>
            <div className={styles.spotlightGrid}>
              <Reveal>
                <div className={styles.spotlightBody}>
                  <p className={styles.sectionLabel}>🧸 Chặng đầu tiên — miễn phí 100%</p>
                  <h2 id="tap-noi-title">Bé chưa biết chữ vẫn học được</h2>
                  <p className={styles.spotlightLead}>
                    Chặng <b>Bé Tập Nói</b> dành cho bé 3–5 tuổi chưa đọc được chữ. Không có bước
                    nào bắt bé phải đọc mới đi tiếp được: bé nhìn tranh, nghe giọng đọc tự vang lên,
                    rồi bấm micro nói theo.
                  </p>
                  <ul className={styles.spotlightList}>
                    <li>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      <span>
                        <b>
                          {coreUnitCount} chủ đề, {CORE_FIRST_WORDS_COUNT} từ đầu đời
                        </b>{" "}
                        — con vật, đồ ăn, gia đình, màu sắc, đồ chơi, số đếm…
                      </span>
                    </li>
                    <li>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      <span>
                        AI nghe bé nói và tặng sao. <b>Thấp nhất luôn là 1 sao</b> — bé không bao
                        giờ nhìn thấy màn báo lỗi hay điểm 0.
                      </span>
                    </li>
                    <li>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      <span>
                        Có bài <b>ôn riêng những từ bé còn vướng</b>, dựng tự động từ chính kết quả
                        của bé.
                      </span>
                    </li>
                    <li>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      <span>
                        Nói được 80% số từ, bé nhận <b>tấm bằng khen có tên mình</b>.
                      </span>
                    </li>
                  </ul>
                  <Link
                    href={isAuthed ? "/roadmap/tap-noi" : "/register"}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    {isAuthed ? "Vào chặng Bé Tập Nói" : "Cho bé học thử ngay"}{" "}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className={styles.wordBoard}>
                  {previewWords.map((w) => (
                    <div key={w.word} className={styles.wordChip}>
                      <span className={styles.wordChipEmoji} aria-hidden>
                        {w.emoji}
                      </span>
                      <span className={styles.wordChipVi}>{w.vi}</span>
                    </div>
                  ))}
                  <p className={styles.wordBoardCaption}>
                    Chủ đề đầu tiên bé gặp — mỗi thẻ đều có giọng đọc chuẩn
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ AI CHẤM BÀI ============ */}
        <section className={styles.section} id="ai" style={anchor} aria-labelledby="ai-title">
          <div className={styles.container}>
            <div className={styles.aiGrid}>
              <Reveal>
                <div className={styles.aiCard}>
                  <div className={styles.aiCardHead}>
                    <span className={styles.aiAvatar} aria-hidden>
                      🐻
                    </span>
                    <span>
                      <span className={styles.aiWho}>Nhận xét của Ding</span>
                      <span className={styles.aiWhen}>Bài viết · Starters · vừa xong</span>
                    </span>
                  </div>
                  <div className={styles.aiScores}>
                    <div className={styles.aiScore}>
                      <div className={styles.aiScoreNum}>82</div>
                      <div className={styles.aiScoreLbl}>Ngữ pháp</div>
                    </div>
                    <div className={styles.aiScore}>
                      <div className={styles.aiScoreNum}>88</div>
                      <div className={styles.aiScoreLbl}>Từ vựng</div>
                    </div>
                    <div className={styles.aiScore}>
                      <div className={styles.aiScoreNum}>85</div>
                      <div className={styles.aiScoreLbl}>Mạch lạc</div>
                    </div>
                  </div>
                  <p className={styles.aiPraise}>
                    🌟 Bé viết câu rất rõ ràng và dùng đúng từ chỉ màu sắc. Giỏi lắm!
                  </p>
                  <p className={styles.aiFix}>
                    Có một chỗ nhỏ mình sửa giúp bé nhé:{" "}
                    <del lang="en">I have two cat</del> → <ins lang="en">I have two cats</ins>{" "}
                    <br />
                    Nhiều hơn một con thì thêm <b>-s</b> vào cuối từ nha!
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className={styles.spotlightBody}>
                  <p className={styles.sectionLabel}>🤖 AI chấm bài</p>
                  <h2 id="ai-title">Như một cô giáo kiên nhẫn, không bao giờ mắng</h2>
                  <p className={styles.spotlightLead}>
                    Bài viết và bài nói của bé được chấm ngay sau khi nộp. AI không chỉ báo đúng hay
                    sai — nó chỉ rõ chỗ sai, đưa bản sửa và giải thích bằng tiếng Việt cho bé hiểu.
                  </p>
                  <ul className={styles.spotlightList}>
                    <li>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      <span>
                        <b>Bài viết</b> chấm 4 mặt: ngữ pháp, từ vựng, mạch lạc và bám đề.
                      </span>
                    </li>
                    <li>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      <span>
                        <b>Bài nói</b> chấm phát âm, ngữ điệu và độ lưu loát.
                      </span>
                    </li>
                    <li>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      <span>
                        Nhận diện đúng những lỗi trẻ Việt hay mắc: thiếu <i lang="en">-s</i> số
                        nhiều, quên mạo từ, nuốt phụ âm cuối, đọc đều mọi âm tiết.
                      </span>
                    </li>
                    <li>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      <span>
                        Hiệu chuẩn theo đúng cấp của bé — không lấy chuẩn người lớn để trừ điểm trẻ
                        con.
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ DẢI SỐ LIỆU ============ */}
        <section className={styles.statsSection} aria-label="Những con số của DingDong Kids">
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              {stats.map((s) => (
                <Reveal key={s.label}>
                  <div className={styles.statItem}>
                    <div className={styles.statNum}>
                      <AnimatedNumber value={s.to} />
                    </div>
                    <div className={styles.statLbl}>{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 3 BƯỚC ============ */}
        <section className={styles.sectionCream} id="how" style={anchor} aria-labelledby="how-title">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>🎯 Bắt đầu thế nào</p>
                <h2 id="how-title" className={styles.sectionTitle}>
                  Ba bước là bé vào học
                </h2>
                <p className={styles.sectionSubtitle}>
                  Không cần chuẩn bị gì ngoài một chiếc điện thoại hoặc máy tính bảng.
                </p>
              </div>
            </Reveal>
            <div className={styles.stepsGrid}>
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1} className="h-full">
                  <div className={styles.stepCard}>
                    <div className={styles.stepNumber} aria-hidden>
                      {s.n}
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ LỘ TRÌNH ============ */}
        <section className={styles.section} id="levels" style={anchor} aria-labelledby="levels-title">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>📈 Lộ trình</p>
                <h2 id="levels-title" className={styles.sectionTitle}>
                  Từ chưa biết chữ đến Preliminary B1
                </h2>
                <p className={styles.sectionSubtitle}>
                  Bảy chặng nối tiếp nhau. Bé vào ở chặng hợp tuổi và đi tiếp — DingDong đi cùng bé
                  suốt hành trình, không phải đổi ứng dụng giữa chừng.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className={styles.pathTrack}>
                {path.map((p) => (
                  <div
                    key={p.name}
                    className={styles.pathStop}
                    style={{ "--stop": p.color } as React.CSSProperties}
                  >
                    {p.free && <span className={styles.pathFreeBadge}>Miễn phí</span>}
                    <span className={styles.pathDot} aria-hidden>
                      {p.emoji}
                    </span>
                    <span className={styles.pathName}>{p.name}</span>
                    <span className={styles.pathAge}>{p.age}</span>
                    <span className={styles.pathSub}>{p.sub}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <p className={styles.pathNote}>
                Mỗi cấp Cambridge đều mở sẵn <b>{FREE_ROADMAP_LESSONS} bài đầu miễn phí</b>, nên bố
                mẹ luôn xem được nội dung thật trước khi quyết định trả phí.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ CAM KẾT VỚI PHỤ HUYNH ============ */}
        <section
          className={styles.sectionCream}
          id="cam-ket"
          style={anchor}
          aria-labelledby="cam-ket-title"
        >
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>🤝 Cam kết với bố mẹ</p>
                <h2 id="cam-ket-title" className={styles.sectionTitle}>
                  Bố mẹ giao màn hình cho con với sự yên tâm
                </h2>
                <p className={styles.sectionSubtitle}>
                  Đây là những ràng buộc DingDong tự đặt ra cho mình và viết thẳng vào sản phẩm.
                </p>
              </div>
            </Reveal>
            <div className={styles.trustGrid}>
              {commitments.map((c, i) => (
                <Reveal key={c.title} delay={(i % 2) * 0.08} className="h-full">
                  <article className={styles.trustCard}>
                    <span className={styles.trustIcon} aria-hidden>
                      <c.icon className="h-6 w-6" />
                    </span>
                    <h3>{c.title}</h3>
                    <p>
                      {c.desc}
                      {c.href && (
                        <>
                          {" "}
                          <Link href={c.href} className={styles.inlineLink}>
                            {c.hrefLabel}
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ BẢNG GIÁ ============ */}
        <section className={styles.section} id="pricing" style={anchor} aria-labelledby="pricing-title">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>💰 Bảng giá</p>
                <h2 id="pricing-title" className={styles.sectionTitle}>
                  Học thử miễn phí, trả phí khi thấy hợp
                </h2>
                <p className={styles.sectionSubtitle}>
                  Thanh toán một lần cho trọn thời hạn, không lưu thẻ và không tự động gia hạn.
                </p>
              </div>
            </Reveal>
            <div className={styles.pricingGrid}>
              {pricingCards.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.08} className="h-full">
                  <article className={`${styles.priceCard}${p.highlighted ? ` ${styles.priceCardHi}` : ""}`}>
                    {p.highlighted && <div className={styles.priceBadge}>Phổ biến nhất</div>}
                    <h3 className={styles.priceName}>{p.name}</h3>
                    <p className={styles.priceAmount}>
                      {p.price} <span>{p.note}</span>
                    </p>
                    <p className={styles.priceDesc}>{p.desc}</p>
                    <ul className={styles.priceList}>
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <Link
                      href={p.cta.href}
                      className={`${styles.btn} ${p.cta.primary ? styles.btnPrimary : styles.btnSecondary} ${styles.priceCta}`}
                    >
                      {p.cta.label}
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className={styles.pricingMore}>
                <Link href="/payment">Xem bảng giá chi tiết theo từng cấp Cambridge →</Link>
              </p>
              <p className={styles.pricingFine}>
                Gói Lộ trình có thời hạn 6 tháng cho một cấp. Từ Movers trở lên được tặng kèm Gói Tự
                do trong cùng thời hạn.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ CÂU HỎI THƯỜNG GẶP ============ */}
        <section className={styles.sectionCream} id="faq" style={anchor} aria-labelledby="faq-title">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>💬 Bố mẹ hay hỏi</p>
                <h2 id="faq-title" className={styles.sectionTitle}>
                  Câu hỏi thường gặp
                </h2>
                <p className={styles.sectionSubtitle}>
                  Chưa thấy câu trả lời cần tìm? Viết thư cho DingDong tại{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className={styles.inlineLink}>
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
            <div className={styles.faqList}>
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <details className={styles.faqItem}>
                    <summary className={styles.faqQ}>{f.q}</summary>
                    <p className={styles.faqA}>{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className={styles.cta} id="cta" aria-labelledby="cta-title">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.ctaContent}>
                {isAuthed ? (
                  <>
                    <h2 id="cta-title">Tiếp tục hành trình của bé nhé!</h2>
                    <p>Quay lại bài học dang dở, giữ chuỗi ngày học và bước tiếp tới chặng kế tiếp.</p>
                    <Link href="/dashboard" className={styles.btnWhite}>
                      <GraduationCap className="h-5 w-5" aria-hidden="true" /> Vào học ngay
                    </Link>
                  </>
                ) : (
                  <>
                    <h2 id="cta-title">Cho bé nói câu tiếng Anh đầu tiên hôm nay</h2>
                    <p>
                      Tạo tài khoản trong 30 giây và học thử trọn chặng đầu — không mất phí, không
                      cần thẻ ngân hàng.
                    </p>
                    <Link href="/register" className={styles.btnWhite}>
                      <Rocket className="h-5 w-5" aria-hidden="true" /> Bắt đầu miễn phí
                    </Link>
                    <p className={styles.ctaSub}>
                      Học ngay trên trình duyệt · Không quảng cáo · Huỷ lúc nào cũng được vì không
                      có gia hạn tự động
                    </p>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <MarketingFooter isAuthed={isAuthed} />

      <BackToTop />
    </div>
  );
}
