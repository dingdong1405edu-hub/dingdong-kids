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
import { DingArt } from "@/components/marketing/ding-art";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/shared/wave-divider";
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

// Thanh điều hướng là `position: fixed` → mọi neo (#features, #pricing…) phải
// chừa đúng chiều cao đó, nếu không tiêu đề mục bị thanh nav che mất.
const anchor = { scrollMarginTop: "96px" } as const;

/** Khung nội dung chuẩn. z-[3] để luôn nằm TRÊN lớp trang trí `.deco` (z-1). */
const WRAP = "relative z-[3] mx-auto w-full max-w-[1180px] px-5 sm:px-7";

/** Nhịp dọc chung của một khối màu. */
const SECTION = "relative overflow-hidden py-16 sm:py-20 lg:py-[88px]";

/** Cỡ tiêu đề mục — Baloo 2 mập tròn, co giãn theo bề ngang màn hình. */
const H2 = "font-display text-[clamp(1.6rem,3.7vw,2.6rem)]";

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

// Băng chữ chạy ngang trên nền cacao. Thuần trang trí (aria-hidden) nên mỗi câu
// phải là một điều SẢN PHẨM LÀM THẬT — không phải khẩu hiệu quảng cáo.
const marquee = [
  { emoji: "🧸", text: "Chặng đầu miễn phí 100%" },
  { emoji: "🌟", text: "Luôn khen trước khi sửa" },
  { emoji: "🎓", text: "Chuẩn Cambridge YLE" },
  { emoji: "🇻🇳", text: "Giải thích bằng tiếng Việt" },
  { emoji: "🎧", text: "Mọi từ đều nghe được" },
  { emoji: "🚫", text: "Không quảng cáo" },
];

// `tile` = nền ô biểu tượng. Mỗi kỹ năng một sắc pastel riêng để bé phân biệt
// bằng MÀU trước khi đọc được chữ.
const features = [
  {
    icon: "🔤",
    tile: "bg-band-yel",
    title: "Ghép vần (Phonics)",
    desc: "Bé học âm chữ cái, phụ âm ghép sh/ch/th, nguyên âm ghép ai/ee/oa rồi ghép thành từ. Đây là nền tảng để bé TỰ đọc được từ mới, thay vì học vẹt mặt chữ.",
    tag: "Nền tảng tự đọc",
  },
  {
    icon: "🃏",
    tile: "bg-band-mint",
    title: "Từ vựng có ảnh và tiếng",
    desc: "Từ vựng theo chủ đề quen thuộc: con vật, gia đình, đồ ăn, màu sắc. Mỗi từ đều nghe được giọng đọc chuẩn, kèm nghĩa tiếng Việt và câu ví dụ.",
  },
  {
    icon: "🧩",
    tile: "bg-band-lav",
    title: "Ngữ pháp bằng tình huống",
    desc: "Không bảng chia động từ khô khan. Bé gặp mẫu câu trong tình huống thật, làm bài kéo thả, chọn từ và sắp xếp câu cho tới khi quen tay.",
  },
  {
    icon: "🎧",
    tile: "bg-band-sky",
    title: "Đọc và nghe hiểu",
    desc: "Đoạn văn ngắn cùng hội thoại đọc chậm cho trẻ, đúng format đề Cambridge. Bé bấm vào từ lạ là hiện nghĩa, nghe lại được câu đọc mẫu.",
  },
  {
    icon: "🎙️",
    tile: "bg-band-coral",
    title: "Luyện nói, AI chấm phát âm",
    desc: "Bé bấm micro nói ngay trên trình duyệt. AI nhận xét phát âm, ngữ điệu và độ lưu loát — có nhắc đúng những lỗi trẻ Việt hay mắc như nuốt phụ âm cuối.",
    tag: "Có AI chấm",
  },
  {
    icon: "✍️",
    tile: "bg-band-sun",
    title: "Tập viết, AI chữa từng lỗi",
    desc: "Bé viết câu hoặc đoạn ngắn, AI chấm ngữ pháp, từ vựng, mạch lạc và bám đề, chỉ rõ chỗ sai kèm bản sửa — bằng tiếng Việt, luôn khen trước khi sửa.",
    tag: "Có AI chấm",
  },
];

// `edge` = màu gờ 3D dưới ô số — cùng họ với mặt ô, tối hơn một bậc.
const steps = [
  {
    n: 1,
    face: "bg-brand-pink",
    edge: "shadow-[0_6px_0_0_hsl(335_72%_49%)]",
    title: "Tạo tài khoản miễn phí",
    desc: "Khoảng 30 giây, không cần thẻ ngân hàng. Bố mẹ chọn giúp bé chặng phù hợp với tuổi.",
  },
  {
    n: 2,
    face: "bg-brand-sky",
    edge: "shadow-[0_6px_0_0_hsl(201_78%_40%)]",
    title: "Bé học 10–15 phút mỗi ngày",
    desc: "Mỗi bài là một chuỗi hoạt động ngắn: nghe, chọn, nói, viết. Bé nhận sao và giữ chuỗi ngày học.",
  },
  {
    n: 3,
    face: "bg-brand-lime",
    edge: "shadow-[0_6px_0_0_hsl(137_52%_36%)]",
    title: "Xem bé tiến bộ tới đâu",
    desc: "Sau mỗi bài đều có điểm và nhận xét. Bố mẹ biết bé chắc phần nào, còn vướng từ nào.",
  },
];

// 7 chặng — màu lấy từ biến CSS thương hiệu (KHÔNG hex cứng) để chế độ tối tự
// hạ chroma, và để khớp `COURSE_THEME` trong src/lib/roadmap.ts: bé thấy đúng
// màu ấy khi bước vào khu học.
const path = [
  { emoji: "🧸", name: "Bé Tập Nói", age: "3–5 tuổi", sub: "Nhìn hình, nói theo", color: "hsl(var(--c-pink))", free: true },
  { emoji: "🌱", name: "Pre-Starters", age: "4–5 tuổi", sub: "Bé làm quen", color: "hsl(var(--c-sun))" },
  { emoji: "🐣", name: "Starters", age: "6–7 tuổi", sub: "Khởi động", color: "hsl(var(--c-lime))" },
  { emoji: "🚀", name: "Movers", age: "7–9 tuổi", sub: "Tiến bước", color: "hsl(var(--c-sky))" },
  { emoji: "🦋", name: "Flyers", age: "9–11 tuổi", sub: "Bay cao", color: "hsl(var(--c-coral))" },
  { emoji: "🔑", name: "Key (A2)", age: "11–13 tuổi", sub: "Vững vàng", color: "hsl(var(--c-grape))" },
  { emoji: "🏆", name: "Preliminary (B1)", age: "13–15 tuổi", sub: "Chinh phục", color: "hsl(var(--c-blue))" },
];

// Cam kết với phụ huynh — THAY cho mục "cảm nhận học viên".
// Ba lời chứng thực cũ là chỗ giữ chỗ ghi "Đang cập nhật" kèm 5 sao: một trang
// bán hàng hiển thị 5 sao cho nội dung trống là tự bắn vào chân mình. Khi nào
// có phản hồi THẬT của phụ huynh thì thêm mục mới, đừng bịa.
const commitments = [
  {
    icon: ShieldCheck,
    tile: "bg-band-coral",
    ink: "text-brand-coral",
    title: "Không quảng cáo, không bán hàng trong bài học",
    desc: "Bé học xong một bài là quay lại bản đồ, không có banner, không có cửa sổ mời mua. Mọi thông tin về gói học chỉ nằm ở khu vực của bố mẹ.",
  },
  {
    icon: CreditCard,
    tile: "bg-band-sun",
    ink: "text-brand-gold",
    title: "Thanh toán một lần, không tự động gia hạn",
    desc: "Mỗi gói có thời hạn rõ ràng và hết hạn thì dừng. DingDong không lưu thẻ và không tự trừ tiền lần sau.",
  },
  {
    icon: Lock,
    tile: "bg-band-sky",
    ink: "text-brand-blue",
    title: "Dữ liệu của bé được giữ tối thiểu",
    desc: "DingDong chỉ lưu tiến độ học và bản ghi âm phục vụ việc chấm bài.",
    href: "/chinh-sach",
    hrefLabel: "Đọc chính sách bảo mật",
  },
  {
    icon: HeartHandshake,
    tile: "bg-band-lav",
    ink: "text-brand-grape",
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

/** Chấm màu đầu mỗi câu hỏi — bé/bố mẹ định vị bằng màu, không phải bằng số thứ tự. */
const faqDots = [
  "bg-brand-coral",
  "bg-brand-sun",
  "bg-brand-yellow",
  "bg-brand-lime",
  "bg-brand-sky",
  "bg-brand-grape",
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

  /** Ba con số nhỏ dưới khung video hero. */
  const heroStats = [
    { num: `${path.length}`, lbl: "Chặng học", ink: "text-brand-coral" },
    { num: "7", lbl: "Kỹ năng", ink: "text-brand-sky" },
    { num: "3–15", lbl: "Tuổi phù hợp", ink: "text-brand-grape" },
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
      tone: "bg-band-mint",
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
      tone: "bg-band-yel",
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
      tone: "bg-band-sky",
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
        {/* ============ HERO ============
            Bố cục CHỮ TRÊN – KHUNG MEDIA DƯỚI. Tuyệt đối không đặt chữ đè lên
            khung video: trên màn hình hẹp chữ sẽ chồng vào hình và không đọc nổi. */}
        <section
          id="hero"
          aria-labelledby="hero-title"
          className="hero-grid relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20"
        >
          {/* Chữ cái và bong bóng bay trang trí — nằm DƯỚI nội dung, không bắt chuột. */}
          <div className="deco" aria-hidden="true">
            <b style={{ "--rot": "-14deg", left: "3%", top: "16%", fontSize: "clamp(2rem,3.6vw,3.4rem)", color: "hsl(var(--c-coral))", opacity: 0.45 } as React.CSSProperties}>A</b>
            <b style={{ "--rot": "12deg", left: "92%", top: "20%", fontSize: "clamp(2.2rem,4vw,3.6rem)", color: "hsl(var(--c-blue))", opacity: 0.45, animationDelay: "1.2s" } as React.CSSProperties}>B</b>
            <b style={{ "--rot": "-9deg", left: "6%", top: "76%", fontSize: "clamp(1.8rem,3.2vw,2.9rem)", color: "hsl(var(--c-sun))", opacity: 0.45, animationDelay: "2.4s" } as React.CSSProperties}>C</b>
            <b style={{ "--rot": "17deg", left: "94%", top: "78%", fontSize: "clamp(1.5rem,2.6vw,2.3rem)", color: "hsl(var(--c-grape))", opacity: 0.45, animationDelay: "0.7s" } as React.CSSProperties}>✦</b>
            <s style={{ left: "13%", top: "60%", width: "46px", height: "46px", background: "hsl(var(--c-yellow))" } as React.CSSProperties} />
            <s style={{ left: "85%", top: "52%", width: "30px", height: "30px", background: "hsl(var(--c-lime))", animationDelay: "3s" } as React.CSSProperties} />
          </div>

          <div className={WRAP}>
            <div className="mx-auto max-w-[860px] text-center">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-5 py-2 text-[0.9rem] font-extrabold shadow-soft">
                <span className="h-2.5 w-2.5 flex-none rounded-full bg-brand-lime animate-dot-pulse" aria-hidden />
                <Sparkles className="h-4 w-4 text-brand-gold" aria-hidden="true" />{" "}
                {isAuthed
                  ? firstName
                    ? `Chào mừng trở lại, ${firstName}!`
                    : "Chào mừng trở lại!"
                  : "Chặng đầu miễn phí 100%"}
              </p>
              <h1
                id="hero-title"
                className="font-display text-[clamp(1.95rem,4.8vw,3.5rem)] leading-[1.06]"
              >
                Bé học tiếng Anh mỗi ngày,
                <br />
                <span className="hl">vui như một trò chơi</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[56ch] text-[1.04rem] font-semibold text-muted-foreground sm:text-[1.12rem]">
                Lộ trình {path.length} chặng theo chuẩn Cambridge Young Learners cho bé 3–15 tuổi,
                giải thích hoàn toàn bằng tiếng Việt. Bé nghe, nói, ghép vần và viết — AI chấm từng
                bài và luôn khen trước khi sửa.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {isAuthed ? (
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" /> Vào học ngay
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg">
                    <Link href="/register">
                      <Rocket className="h-5 w-5" aria-hidden="true" /> Cho bé học thử miễn phí
                    </Link>
                  </Button>
                )}
                <Button asChild size="lg" variant="secondary">
                  <a href="#levels">
                    Xem lộ trình {path.length} chặng{" "}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.9rem] font-bold text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="tick" aria-hidden>
                    ✓
                  </span>
                  Không cần thẻ ngân hàng
                </li>
                <li className="flex items-center gap-2">
                  <span className="tick" aria-hidden>
                    ✓
                  </span>
                  Không cần cài ứng dụng
                </li>
                <li className="flex items-center gap-2">
                  <span className="tick" aria-hidden>
                    ✓
                  </span>
                  Không quảng cáo
                </li>
              </ul>
            </div>

            {/* ▶ CHỖ ĐẶT VIDEO GIỚI THIỆU (16:9)
                Khi có video thật: đặt file vào thư mục `public/` (vd
                public/hero.mp4 và public/hero-poster.jpg) rồi THAY nguyên khối
                <div> "chỗ chờ" bên dưới bằng:

                  <video
                    className="h-full w-full object-cover"
                    autoPlay muted loop playsInline preload="auto"
                    poster="/hero-poster.jpg"
                    aria-label="Gấu Ding chào bé và chơi cùng chữ cái tiếng Anh"
                  >
                    <source src="/hero.mp4" type="video/mp4" />
                  </video>

                GIỮ NGUYÊN lớp bọc bên ngoài (aspect-video + viền trắng dày + bo
                góc lớn + bóng đổ) — đó mới là phần tạo ra dáng "màn hình đồ chơi".
                autoPlay bắt buộc đi kèm muted, nếu không trình duyệt chặn phát. */}
            <div className="mx-auto mt-10 w-full max-w-[940px] sm:mt-12">
              <div className="relative aspect-video overflow-hidden rounded-3xl border-[7px] border-card bg-band-cream shadow-soft-xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
                  <div className="w-[42%] min-w-[130px] max-w-[250px]">
                    <DingMascot transparent />
                  </div>
                  <p className="font-display text-[0.9rem] text-muted-foreground sm:text-[1rem]">
                    Chỗ đặt video giới thiệu — Ding đang chuẩn bị quay 🎬
                  </p>
                </div>
              </div>

              {/* Ba con số nhỏ, xếp như dãy chip dưới màn hình. */}
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                {heroStats.map((s) => (
                  <div key={s.lbl} className="rounded-xl bg-card px-2 py-3 text-center shadow-soft">
                    <div className={`font-display text-[clamp(1.25rem,3vw,1.7rem)] leading-none ${s.ink}`}>
                      {s.num}
                    </div>
                    <div className="mt-1 text-[0.72rem] font-extrabold text-muted-foreground sm:text-[0.8rem]">
                      {s.lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ BĂNG CHỮ CHẠY NGANG ============
            Thuần trang trí. Nền dùng `bg-foreground` (cacao ở chế độ sáng, kem ở
            chế độ tối) + chữ `text-background` → luôn tương phản, không cần cặp
            dark: viết tay. Nội dung track phải NHÂN ĐÔI thì vòng lặp mới liền. */}
        <div className="relative z-[5] overflow-hidden bg-foreground py-3.5" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0">
                {marquee.map((m) => (
                  <span
                    key={`${dup}-${m.text}`}
                    className="flex items-center gap-3 whitespace-nowrap px-5 font-display text-[1rem] text-background sm:text-[1.12rem]"
                  >
                    <span>{m.emoji}</span>
                    {m.text}
                    <span className="text-[0.7rem] opacity-70">★</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ============ DẢI ĐỘ TUỔI ============ */}
        <section className="relative overflow-hidden bg-band-sun py-12 sm:py-16" aria-labelledby="ages-title">
          <div className={WRAP}>
            <h2 id="ages-title" className="mb-7 text-center font-display text-[clamp(1.3rem,2.8vw,1.85rem)]">
              Bé nhà mình bắt đầu từ đâu?
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {ages.map((a) => (
                <div key={a.age} className="card-toy flex flex-col items-center gap-1 px-3 py-6 text-center">
                  <span className="animate-bob text-[2.1rem] leading-none" aria-hidden>
                    {a.emoji}
                  </span>
                  <span className="font-display text-[1.08rem]">{a.age}</span>
                  <span className="text-[0.82rem] font-bold text-muted-foreground">{a.what}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider top="sun" bottom="white" />

        {/* ============ TÍNH NĂNG ============ */}
        <section className={`${SECTION} bg-card`} id="features" style={anchor} aria-labelledby="features-title">
          <div className={WRAP}>
            <Reveal>
              <div className="mx-auto mb-10 max-w-[56ch] text-center sm:mb-14">
                <p className="eyebrow text-brand-pink">✨ Bé học những gì</p>
                <h2 id="features-title" className={`mt-2.5 ${H2}`}>
                  Bảy kỹ năng, một lộ trình duy nhất
                </h2>
                <p className="mt-3.5 font-semibold text-muted-foreground">
                  Ghép vần, từ vựng, ngữ pháp, đọc, nghe, viết và nói — bám sát format Cambridge
                  Young Learners, giải thích bằng tiếng Việt để bé không phải đoán.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 0.08} className="h-full">
                  <Link
                    href={primaryHref}
                    className="card-toy group flex h-full flex-col p-7"
                    aria-label={isAuthed ? `${f.title} — vào học` : `${f.title} — học thử miễn phí`}
                  >
                    <span
                      className={`mb-4 grid h-16 w-16 place-items-center rounded-2xl text-[1.95rem] transition-transform duration-300 ease-toy group-hover:-rotate-12 group-hover:scale-110 ${f.tile}`}
                      aria-hidden
                    >
                      {f.icon}
                    </span>
                    <h3 className="mb-2 font-display text-[1.24rem]">{f.title}</h3>
                    <p className="font-semibold text-muted-foreground">{f.desc}</p>
                    {f.tag && (
                      <Badge variant="secondary" className="mt-4 w-fit">
                        {f.tag}
                      </Badge>
                    )}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider top="white" bottom="coral" flip />

        {/* ============ CHẶNG BÉ TẬP NÓI (phễu miễn phí) ============ */}
        <section className={`${SECTION} bg-band-coral`} id="tap-noi" style={anchor} aria-labelledby="tap-noi-title">
          <div className="deco" aria-hidden="true">
            <b style={{ "--rot": "-16deg", left: "3%", top: "14%", fontSize: "3.2rem", color: "hsl(var(--c-coral))", opacity: 0.4 } as React.CSSProperties}>A</b>
            <b style={{ "--rot": "14deg", left: "94%", top: "66%", fontSize: "3.4rem", color: "hsl(var(--c-sun))", opacity: 0.4, animationDelay: "1.5s" } as React.CSSProperties}>C</b>
            <s style={{ left: "11%", top: "74%", width: "44px", height: "44px", background: "hsl(var(--card))" } as React.CSSProperties} />
          </div>
          <div className={WRAP}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <div>
                  <p className="eyebrow text-brand-coral">🧸 Chặng đầu tiên — miễn phí 100%</p>
                  <h2 id="tap-noi-title" className={`mt-2.5 ${H2}`}>
                    Bé chưa biết chữ vẫn học được
                  </h2>
                  <p className="mt-4 font-semibold text-muted-foreground">
                    Chặng <b className="text-foreground">Bé Tập Nói</b> dành cho bé 3–5 tuổi chưa đọc được chữ. Không có bước
                    nào bắt bé phải đọc mới đi tiếp được: bé nhìn tranh, nghe giọng đọc tự vang lên,
                    rồi bấm micro nói theo.
                  </p>
                  <ul className="mt-6 grid gap-3.5">
                    <li className="flex gap-3">
                      <Check className="mt-1 h-5 w-5 flex-none text-brand-teal" aria-hidden="true" />
                      <span className="font-semibold text-muted-foreground">
                        <b className="text-foreground">
                          {coreUnitCount} chủ đề, {CORE_FIRST_WORDS_COUNT} từ đầu đời
                        </b>{" "}
                        — con vật, đồ ăn, gia đình, màu sắc, đồ chơi, số đếm…
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="mt-1 h-5 w-5 flex-none text-brand-teal" aria-hidden="true" />
                      <span className="font-semibold text-muted-foreground">
                        AI nghe bé nói và tặng sao. <b className="text-foreground">Thấp nhất luôn là 1 sao</b> — bé không bao
                        giờ nhìn thấy màn báo lỗi hay điểm 0.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="mt-1 h-5 w-5 flex-none text-brand-teal" aria-hidden="true" />
                      <span className="font-semibold text-muted-foreground">
                        Có bài <b className="text-foreground">ôn riêng những từ bé còn vướng</b>, dựng tự động từ chính kết quả
                        của bé.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="mt-1 h-5 w-5 flex-none text-brand-teal" aria-hidden="true" />
                      <span className="font-semibold text-muted-foreground">
                        Nói được 80% số từ, bé nhận <b className="text-foreground">tấm bằng khen có tên mình</b>.
                      </span>
                    </li>
                  </ul>
                  <Button asChild size="lg" variant="candy" className="mt-7">
                    <Link href={isAuthed ? "/roadmap/tap-noi" : "/register"}>
                      {isAuthed ? "Vào chặng Bé Tập Nói" : "Cho bé học thử ngay"}{" "}
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                {/* Bảng từ mẫu — thay cho ảnh chụp màn hình. Khi có ảnh thật của
                    khu "Bé Tập Nói", đặt vào public/ và thay khối này bằng <Image>. */}
                <div className="card-toy p-5 sm:p-6">
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                    {previewWords.map((w) => (
                      <div
                        key={w.word}
                        className="flex flex-col items-center gap-1 rounded-xl bg-band-cream px-1 py-3 text-center shadow-soft transition-transform duration-300 ease-toy hover:-translate-y-1 hover:rotate-[-3deg]"
                      >
                        <span className="text-[clamp(24px,4vw,36px)] leading-none" aria-hidden>
                          {w.emoji}
                        </span>
                        <span className="text-[0.68rem] font-extrabold text-muted-foreground sm:text-[0.78rem]">
                          {w.vi}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-center text-[0.86rem] font-bold text-muted-foreground">
                    Chủ đề đầu tiên bé gặp — mỗi thẻ đều có giọng đọc chuẩn
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <WaveDivider top="coral" bottom="sky" />

        {/* ============ AI CHẤM BÀI ============
            Cột đảo chiều so với khối trên (hình TRÁI – chữ PHẢI) để mắt không
            trôi thẳng một mạch xuống dưới. */}
        <section className={`${SECTION} bg-band-sky`} id="ai" style={anchor} aria-labelledby="ai-title">
          <div className={WRAP}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <div className="card-toy p-6 sm:p-7">
                  <div className="mb-4 flex items-center gap-3 border-b-2 border-dashed border-border pb-4">
                    <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-band-sun text-[1.6rem]" aria-hidden>
                      🐻
                    </span>
                    <span>
                      <span className="block font-display text-[1.06rem]">Nhận xét của Ding</span>
                      <span className="block text-[0.8rem] font-bold text-muted-foreground">
                        Bài viết · Starters · vừa xong
                      </span>
                    </span>
                  </div>
                  <div className="mb-4 grid grid-cols-3 gap-2.5">
                    <div className="rounded-xl bg-band-mint px-2 py-3 text-center">
                      <div className="font-display text-[1.7rem] leading-none text-brand-teal">82</div>
                      <div className="mt-1 text-[0.75rem] font-extrabold text-muted-foreground">Ngữ pháp</div>
                    </div>
                    <div className="rounded-xl bg-band-mint px-2 py-3 text-center">
                      <div className="font-display text-[1.7rem] leading-none text-brand-teal">88</div>
                      <div className="mt-1 text-[0.75rem] font-extrabold text-muted-foreground">Từ vựng</div>
                    </div>
                    <div className="rounded-xl bg-band-mint px-2 py-3 text-center">
                      <div className="font-display text-[1.7rem] leading-none text-brand-teal">85</div>
                      <div className="mt-1 text-[0.75rem] font-extrabold text-muted-foreground">Mạch lạc</div>
                    </div>
                  </div>
                  <p className="mb-3 rounded-xl bg-band-mint px-4 py-3 font-bold">
                    🌟 Bé viết câu rất rõ ràng và dùng đúng từ chỉ màu sắc. Giỏi lắm!
                  </p>
                  <p className="rounded-xl bg-band-yel px-4 py-3 font-semibold leading-relaxed">
                    Có một chỗ nhỏ mình sửa giúp bé nhé:{" "}
                    <del lang="en" className="text-brand-coral">I have two cat</del> →{" "}
                    <ins lang="en" className="rounded-md bg-brand-lime/25 px-1.5 font-extrabold no-underline">
                      I have two cats
                    </ins>{" "}
                    <br />
                    Nhiều hơn một con thì thêm <b>-s</b> vào cuối từ nha!
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <p className="eyebrow text-brand-blue">🤖 AI chấm bài</p>
                  <h2 id="ai-title" className={`mt-2.5 ${H2}`}>
                    Như một cô giáo kiên nhẫn, không bao giờ mắng
                  </h2>
                  <p className="mt-4 font-semibold text-muted-foreground">
                    Bài viết và bài nói của bé được chấm ngay sau khi nộp. AI không chỉ báo đúng hay
                    sai — nó chỉ rõ chỗ sai, đưa bản sửa và giải thích bằng tiếng Việt cho bé hiểu.
                  </p>
                  <ul className="mt-6 grid gap-3.5">
                    <li className="flex gap-3">
                      <Check className="mt-1 h-5 w-5 flex-none text-brand-teal" aria-hidden="true" />
                      <span className="font-semibold text-muted-foreground">
                        <b className="text-foreground">Bài viết</b> chấm 4 mặt: ngữ pháp, từ vựng, mạch lạc và bám đề.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="mt-1 h-5 w-5 flex-none text-brand-teal" aria-hidden="true" />
                      <span className="font-semibold text-muted-foreground">
                        <b className="text-foreground">Bài nói</b> chấm phát âm, ngữ điệu và độ lưu loát.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="mt-1 h-5 w-5 flex-none text-brand-teal" aria-hidden="true" />
                      <span className="font-semibold text-muted-foreground">
                        Nhận diện đúng những lỗi trẻ Việt hay mắc: thiếu <i lang="en">-s</i> số
                        nhiều, quên mạo từ, nuốt phụ âm cuối, đọc đều mọi âm tiết.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="mt-1 h-5 w-5 flex-none text-brand-teal" aria-hidden="true" />
                      <span className="font-semibold text-muted-foreground">
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

        <WaveDivider top="sky" bottom="yel" flip />

        {/* ============ DẢI SỐ LIỆU ============ */}
        <section
          className="relative overflow-hidden bg-band-yel py-12 sm:py-16"
          aria-label="Những con số của DingDong Kids"
        >
          <div className={WRAP}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06} className="h-full">
                  <div className="card-toy flex h-full flex-col items-center justify-center px-3 py-7 text-center">
                    <div className="font-display text-[clamp(1.75rem,3.6vw,2.7rem)] leading-none text-gradient-brand">
                      <AnimatedNumber value={s.to} />
                    </div>
                    <div className="mt-2 text-[0.82rem] font-extrabold text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider top="yel" bottom="cream" />

        {/* ============ 3 BƯỚC ============ */}
        <section className={`${SECTION} bg-band-cream`} id="how" style={anchor} aria-labelledby="how-title">
          <div className={WRAP}>
            <Reveal>
              <div className="mx-auto mb-10 max-w-[52ch] text-center sm:mb-14">
                <p className="eyebrow text-brand-teal">🎯 Bắt đầu thế nào</p>
                <h2 id="how-title" className={`mt-2.5 ${H2}`}>
                  Ba bước là bé vào học
                </h2>
                <p className="mt-3.5 font-semibold text-muted-foreground">
                  Không cần chuẩn bị gì ngoài một chiếc điện thoại hoặc máy tính bảng.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1} className="h-full">
                  <div className="card-toy flex h-full flex-col p-7">
                    <div
                      className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl font-display text-[1.4rem] text-white ${s.face} ${s.edge}`}
                      aria-hidden
                    >
                      {s.n}
                    </div>
                    <h3 className="mb-2 font-display text-[1.2rem]">{s.title}</h3>
                    <p className="font-semibold text-muted-foreground">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider top="cream" bottom="lav" flip />

        {/* ============ LỘ TRÌNH ============ */}
        <section className={`${SECTION} bg-band-lav`} id="levels" style={anchor} aria-labelledby="levels-title">
          <div className="deco" aria-hidden="true">
            <b style={{ "--rot": "12deg", left: "3%", top: "80%", fontSize: "3.2rem", color: "hsl(var(--c-grape))", opacity: 0.35 } as React.CSSProperties}>B</b>
            <s style={{ left: "91%", top: "10%", width: "48px", height: "48px", background: "hsl(var(--card))" } as React.CSSProperties} />
          </div>
          <div className={WRAP}>
            <Reveal>
              <div className="mx-auto mb-10 max-w-[56ch] text-center sm:mb-14">
                <p className="eyebrow text-brand-grape">📈 Lộ trình</p>
                <h2 id="levels-title" className={`mt-2.5 ${H2}`}>
                  Từ chưa biết chữ đến Preliminary B1
                </h2>
                <p className="mt-3.5 font-semibold text-muted-foreground">
                  Bảy chặng nối tiếp nhau. Bé vào ở chặng hợp tuổi và đi tiếp — DingDong đi cùng bé
                  suốt hành trình, không phải đổi ứng dụng giữa chừng.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {path.map((p) => (
                  <div
                    key={p.name}
                    className="card-toy relative w-[calc(50%-0.375rem)] overflow-hidden px-3 pb-5 pt-6 text-center sm:w-[178px] sm:gap-4"
                    style={{ "--stop": p.color } as React.CSSProperties}
                  >
                    {/* Vạch màu đầu thẻ — dấu hiệu nhận biết chặng, thấy được từ xa. */}
                    <span className="absolute inset-x-0 top-0 h-[9px]" style={{ background: "var(--stop)" }} aria-hidden />
                    {p.free && (
                      <Badge variant="success" className="absolute right-2.5 top-3.5">
                        Miễn phí
                      </Badge>
                    )}
                    <span
                      className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-full text-[2rem]"
                      style={{ background: "color-mix(in srgb, var(--stop) 20%, transparent)" }}
                      aria-hidden
                    >
                      {p.emoji}
                    </span>
                    <span className="block font-display text-[1.02rem] leading-tight">{p.name}</span>
                    <span className="mt-0.5 block text-[0.78rem] font-extrabold text-muted-foreground">
                      {p.age}
                    </span>
                    <span className="mt-1 block text-[0.82rem] font-extrabold" style={{ color: "var(--stop)" }}>
                      {p.sub}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <p className="mx-auto mt-9 max-w-[62ch] rounded-2xl bg-card px-6 py-5 text-center font-semibold text-muted-foreground shadow-soft">
                Mỗi cấp Cambridge đều mở sẵn{" "}
                <b className="text-foreground">{FREE_ROADMAP_LESSONS} bài đầu miễn phí</b>, nên bố
                mẹ luôn xem được nội dung thật trước khi quyết định trả phí.
              </p>
            </Reveal>
          </div>
        </section>

        <WaveDivider top="lav" bottom="mint" />

        {/* ============ CAM KẾT VỚI PHỤ HUYNH ============ */}
        <section
          className={`${SECTION} bg-band-mint`}
          id="cam-ket"
          style={anchor}
          aria-labelledby="cam-ket-title"
        >
          <div className={WRAP}>
            <div className="card-toy p-6 sm:p-10 lg:p-12">
              <Reveal>
                <div className="mx-auto mb-8 max-w-[56ch] text-center">
                  <p className="eyebrow text-brand-teal">🤝 Cam kết với bố mẹ</p>
                  <h2 id="cam-ket-title" className={`mt-2.5 ${H2}`}>
                    Bố mẹ giao màn hình cho con với sự yên tâm
                  </h2>
                  <p className="mt-3.5 font-semibold text-muted-foreground">
                    Đây là những ràng buộc DingDong tự đặt ra cho mình và viết thẳng vào sản phẩm.
                  </p>
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {commitments.map((c, i) => (
                  <Reveal key={c.title} delay={(i % 2) * 0.08} className="h-full">
                    <article
                      className={`flex h-full gap-4 rounded-xl p-5 transition-transform duration-300 ease-toy hover:translate-x-1.5 ${c.tile}`}
                    >
                      <span
                        className={`grid h-12 w-12 flex-none place-items-center rounded-2xl bg-card shadow-soft ${c.ink}`}
                        aria-hidden
                      >
                        <c.icon className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="mb-1 font-display text-[1.08rem]">{c.title}</h3>
                        <p className="text-[0.95rem] font-semibold text-muted-foreground">
                          {c.desc}
                          {c.href && (
                            <>
                              {" "}
                              <Link
                                href={c.href}
                                className="font-extrabold text-brand-gold underline underline-offset-4"
                              >
                                {c.hrefLabel}
                              </Link>
                              .
                            </>
                          )}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WaveDivider top="mint" bottom="white" flip />

        {/* ============ BẢNG GIÁ ============ */}
        <section className={`${SECTION} bg-card`} id="pricing" style={anchor} aria-labelledby="pricing-title">
          <div className={WRAP}>
            <Reveal>
              <div className="mx-auto mb-10 max-w-[56ch] text-center sm:mb-14">
                <p className="eyebrow text-brand-gold">💰 Bảng giá</p>
                <h2 id="pricing-title" className={`mt-2.5 ${H2}`}>
                  Học thử miễn phí, trả phí khi thấy hợp
                </h2>
                <p className="mt-3.5 font-semibold text-muted-foreground">
                  Thanh toán một lần cho trọn thời hạn, không lưu thẻ và không tự động gia hạn.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-5 lg:grid-cols-3">
              {pricingCards.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.08} className="h-full">
                  <article
                    className={`relative flex h-full flex-col rounded-2xl p-7 shadow-soft-lg ${p.tone}${
                      p.highlighted ? " ring-4 ring-brand-sun lg:-translate-y-3" : ""
                    }`}
                  >
                    {p.highlighted && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-soft">
                        Phổ biến nhất
                      </Badge>
                    )}
                    <h3 className="font-display text-[1.3rem]">{p.name}</h3>
                    <p className="mt-1 font-display text-[clamp(1.7rem,3.4vw,2.2rem)] leading-tight">
                      {p.price}{" "}
                      <span className="text-[0.95rem] font-bold text-muted-foreground">{p.note}</span>
                    </p>
                    <p className="mt-2.5 text-[0.95rem] font-semibold text-muted-foreground">{p.desc}</p>
                    <ul className="mb-7 mt-5 grid flex-1 gap-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3 text-[0.95rem] font-bold">
                          <span className="tick mt-1" aria-hidden>
                            ✓
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      size="lg"
                      variant={p.cta.primary ? "default" : "secondary"}
                      className="w-full"
                    >
                      <Link href={p.cta.href}>{p.cta.label}</Link>
                    </Button>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-10 text-center">
                <Link
                  href="/payment"
                  className="font-display text-[1.05rem] font-extrabold text-brand-gold underline underline-offset-8"
                >
                  Xem bảng giá chi tiết theo từng cấp Cambridge →
                </Link>
              </p>
              <p className="mx-auto mt-4 max-w-[62ch] text-center text-[0.9rem] font-semibold text-muted-foreground">
                Gói Lộ trình có thời hạn 6 tháng cho một cấp. Từ Movers trở lên được tặng kèm Gói Tự
                do trong cùng thời hạn.
              </p>
            </Reveal>
          </div>
        </section>

        <WaveDivider top="white" bottom="sun" />

        {/* ============ CÂU HỎI THƯỜNG GẶP ============ */}
        <section className={`${SECTION} bg-band-sun`} id="faq" style={anchor} aria-labelledby="faq-title">
          <div className={WRAP}>
            <Reveal>
              <div className="mx-auto mb-10 max-w-[56ch] text-center sm:mb-12">
                <p className="eyebrow text-brand-coral">💬 Bố mẹ hay hỏi</p>
                <h2 id="faq-title" className={`mt-2.5 ${H2}`}>
                  Câu hỏi thường gặp
                </h2>
                <p className="mt-3.5 font-semibold text-muted-foreground">
                  Chưa thấy câu trả lời cần tìm? Viết thư cho DingDong tại{" "}
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="font-extrabold text-brand-gold underline underline-offset-4"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
            <div className="mx-auto grid max-w-[840px] gap-3">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <details className="group card-toy overflow-hidden">
                    <summary className="flex cursor-pointer list-none items-center gap-3 p-5 font-display text-[1.05rem] [&::-webkit-details-marker]:hidden">
                      <span className={`h-3.5 w-3.5 flex-none rounded-full ${faqDots[i]}`} aria-hidden />
                      {f.q}
                      <span
                        className="ml-auto flex-none font-display text-[1.6rem] leading-none text-brand-gold transition-transform duration-300 ease-toy group-open:rotate-[135deg]"
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-5 pb-5 pl-[46px] font-semibold text-muted-foreground [&_a]:font-extrabold [&_a]:text-brand-gold [&_a]:underline [&_a]:underline-offset-4 [&_b]:text-foreground">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider top="sun" bottom="cream" flip />

        {/* ============ CTA ============ */}
        <section className={`${SECTION} bg-band-cream`} id="cta" aria-labelledby="cta-title">
          <div className={WRAP}>
            <Reveal>
              <div className="mx-auto max-w-[900px] rounded-3xl bg-gradient-to-br from-band-yel via-band-coral to-band-lav p-8 text-center shadow-soft-xl sm:p-12">
                {/* Linh vật cổ vũ — kích thước điều khiển bằng biến --ding-size. */}
                <div
                  className="mx-auto mb-4 flex justify-center"
                  style={{ "--ding-size": "128px" } as React.CSSProperties}
                  aria-hidden="true"
                >
                  <DingArt pose="cheer" />
                </div>
                {isAuthed ? (
                  <>
                    <h2 id="cta-title" className={H2}>
                      Tiếp tục hành trình của bé nhé!
                    </h2>
                    <p className="mx-auto mt-3 max-w-[52ch] font-semibold text-foreground/80">
                      Quay lại bài học dang dở, giữ chuỗi ngày học và bước tiếp tới chặng kế tiếp.
                    </p>
                    <Button asChild size="lg" className="mt-7">
                      <Link href="/dashboard">
                        <GraduationCap className="h-5 w-5" aria-hidden="true" /> Vào học ngay
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <h2 id="cta-title" className={H2}>
                      Cho bé nói câu tiếng Anh đầu tiên hôm nay
                    </h2>
                    <p className="mx-auto mt-3 max-w-[52ch] font-semibold text-foreground/80">
                      Tạo tài khoản trong 30 giây và học thử trọn chặng đầu — không mất phí, không
                      cần thẻ ngân hàng.
                    </p>
                    <Button asChild size="lg" className="mt-7">
                      <Link href="/register">
                        <Rocket className="h-5 w-5" aria-hidden="true" /> Bắt đầu miễn phí
                      </Link>
                    </Button>
                    <p className="mx-auto mt-5 max-w-[54ch] text-[0.88rem] font-bold text-foreground/70">
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
