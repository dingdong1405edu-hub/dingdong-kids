import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { FREESTYLE_PLANS, ROADMAP_PLANS, formatVnd } from "@/lib/payment-plans";
import { SITE_NAME, SITE_URL, SOCIAL_LINKS, SUPPORT_EMAIL } from "@/lib/site";
import { BaoMascot } from "@/components/marketing/bao-mascot";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { MarketingNav } from "./_components/marketing-nav";
import { MarketingFooter } from "./_components/marketing-footer";
import { BackToTop } from "./_components/back-to-top";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  // absolute: trang chủ tự mang tên thương hiệu, không để template root nối đuôi lần nữa.
  title: { absolute: "DingDong HSK — Học tiếng Trung cùng AI cho người Việt" },
  description:
    "Học tiếng Trung online theo chuẩn HSK 1–6 và HSKK: từ vựng, ngữ pháp, chữ Hán, đọc, nghe, viết, nói. AI chấm bài viết và luyện nói, lộ trình hoàn toàn bằng tiếng Việt. Bắt đầu miễn phí.",
  keywords: [
    "học tiếng Trung",
    "học tiếng Trung online",
    "app học tiếng Trung",
    "luyện thi HSK",
    "luyện thi HSKK",
    "học tiếng Trung cho người Việt",
    "DingDong HSK",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "DingDong HSK — Học tiếng Trung cùng AI cho người Việt",
    description:
      "Từ vựng, ngữ pháp, chữ Hán, đọc, nghe, viết, nói theo chuẩn HSK 1–6 và HSKK. AI chấm điểm từng bài. Bắt đầu miễn phí.",
    url: "/",
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    images: [{ url: "/bao-cover.png", width: 1376, height: 768, alt: "DingDong HSK — Học tiếng Trung chuẩn HSK" }],
  },
};

// JSON-LD giúp Google liên kết entity DingDong HSK với website + các kênh chính thức.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-hsk.png`,
      email: SUPPORT_EMAIL,
      description:
        "Nền tảng học tiếng Trung trực tuyến cho người Việt theo chuẩn HSK 1–6 và HSKK, có AI chấm bài viết và luyện nói.",
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
  ],
};

const audiences = [
  { icon: "🎓", label: "Sinh viên" },
  { icon: "💼", label: "Người đi làm" },
  { icon: "✈️", label: "Du học sinh" },
  { icon: "🀄", label: "Người mất gốc" },
  { icon: "🏆", label: "Luyện thi HSK" },
];

const features = [
  {
    icon: "🤖",
    cls: styles.iconAi,
    title: "AI chấm điểm chi tiết",
    desc: "AI chấm bài viết luận và bài nói của bạn: ngữ pháp, từ vựng, thanh điệu, độ lưu loát, kèm bản sửa lỗi cụ thể.",
  },
  {
    icon: "📚",
    cls: styles.iconVocab,
    title: "Từ vựng & ngữ pháp",
    desc: "Học như chơi game: nhận XP, giữ chuỗi ngày học, có tim. Chạm vào từ là thấy ngay pinyin, nghĩa và thanh điệu tô màu.",
  },
  {
    icon: "✍️",
    cls: styles.iconWriting,
    title: "Chữ cái, phát âm & viết chữ Hán",
    desc: "Học pinyin từ đầu qua flashcard (thanh mẫu, vận mẫu, thanh điệu, âm dễ lẫn) và xem thứ tự nét bút trên ô 田字格.",
  },
  {
    icon: "🎙️",
    cls: styles.iconSpeaking,
    title: "Luyện nói HSKK",
    desc: "Ghi âm ngay trên trình duyệt; AI phân tích phát âm, thanh điệu và độ lưu loát theo đúng 3 phần của bài thi HSKK.",
  },
  {
    icon: "📖",
    cls: styles.iconHsk,
    title: "Đọc & nghe hiểu",
    desc: "Đoạn văn và audio theo format đề HSK: bật/tắt pinyin, nhấn vào từ để tra nghĩa, chấm điểm tự động sau khi nộp bài.",
  },
  {
    icon: "🏆",
    cls: styles.iconCommunity,
    title: "Lộ trình thi HSK 1–6",
    desc: "Mở khóa bài học theo thứ tự, thấy rõ mình tiến bộ tới đâu trên con đường tới mục tiêu HSK của bạn.",
  },
];

// SỐ LIỆU THẬT của nền tảng — đã đối chiếu với dữ liệu bài học, đừng phóng đại.
const stats = [
  { to: 6, suffix: "", label: "Cấp độ HSK" },
  { to: 3000, suffix: "+", label: "Từ vựng & mẫu câu" },
  { to: 7, suffix: "", label: "Module kỹ năng" },
  { to: 2, suffix: "", label: "Kỹ năng AI chấm chi tiết" },
];

const steps = [
  {
    n: 1,
    title: "Đăng ký miễn phí",
    desc: "Tạo tài khoản trong 30 giây và chọn cấp độ HSK mục tiêu của bạn.",
  },
  {
    n: 2,
    title: "Học theo lộ trình",
    desc: "Từ vựng, ngữ pháp, chữ Hán, đọc, nghe, viết, nói được sắp xếp sẵn theo từng bài.",
  },
  {
    n: 3,
    title: "Luyện tập & tiến bộ",
    desc: "Làm bài được chấm tự động, giữ chuỗi ngày học và theo dõi XP qua từng mốc HSK.",
  },
];

const levels = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];

const testimonials = [
  {
    text: "“Mình mất gốc tiếng Trung, nhờ lộ trình chia nhỏ và AI sửa lỗi bài viết mà sau 3 tháng đã tự tin nhắn tin với đối tác.”",
    name: "Minh Anh",
    role: "Nhân viên xuất nhập khẩu",
    initial: "M",
  },
  {
    text: "“Phần luyện nói HSKK chấm phát âm cực chi tiết, chỉ ra mình hay sai thanh 3. Giao diện dễ thương như đang chơi game vậy.”",
    name: "Hoàng Long",
    role: "Sinh viên năm 2",
    initial: "H",
  },
  {
    text: "“Tính năng viết chữ Hán theo từng nét giúp con mình nhớ mặt chữ nhanh hẳn. Cả nhà cùng học mỗi tối, vui lắm.”",
    name: "Thu Hà",
    role: "Phụ huynh",
    initial: "T",
  },
];

const anchor = { scrollMarginTop: "96px" } as const;

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

  const pricingCards = [
    {
      name: "Miễn phí",
      price: "0đ",
      note: "mãi mãi",
      desc: "Trải nghiệm đầy đủ cách DingDong dạy trước khi quyết định trả phí.",
      features: [
        "Các bài đầu của mỗi cấp lộ trình",
        "Luyện tập tự do với hệ thống tim (tự hồi)",
        "Theo dõi XP và chuỗi ngày học",
      ],
      cta: { label: "Học thử ngay", href: primaryHref, primary: false },
      highlighted: false,
    },
    {
      name: "Gói Tự do",
      price: `từ ${formatVnd(freestyleFrom)}`,
      note: "/ tháng",
      desc: "Mọi tính năng luyện tập ngoài lộ trình, dành cho người thích tự học theo cách của mình.",
      features: [
        "Tất cả tính năng luyện tập tự do",
        "AI chấm bài viết & luyện nói",
        "Tim không giới hạn",
        "Gói 3 tháng: tháng đầu chỉ 100.000đ",
      ],
      cta: { label: "Xem Gói Tự do", href: "/payment", primary: true },
      highlighted: true,
    },
    {
      name: "Gói Lộ trình",
      price: `từ ${formatVnd(roadmapFrom)}`,
      note: "/ 6 tháng",
      desc: "Mở khóa toàn bộ lộ trình một cấp HSK, học bài bản từ bài đầu đến bài cuối.",
      features: [
        "Toàn bộ bài học lộ trình cấp bạn chọn",
        "Tim không giới hạn",
        "Từ HSK 3: tặng kèm Gói Tự do",
      ],
      cta: { label: "Chọn cấp HSK", href: "/payment", primary: false },
      highlighted: false,
    },
  ];

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav isAuthed={isAuthed} />

      {/* ============ HERO ============ */}
      <section className={styles.hero} id="hero" aria-labelledby="hero-title">
        <div className={styles.heroBgPattern} />
        <div className={styles.heroGridBg} />
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.dot} />
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />{" "}
              {isAuthed
                ? firstName
                  ? `Chào mừng trở lại, ${firstName}!`
                  : "Chào mừng trở lại!"
                : "Có AI chấm bài cho bạn"}
            </div>
            <h1 id="hero-title" className={styles.heroTitle}>
              Học tiếng Trung cùng AI,<br />
              <span className={styles.highlight}>dễ như ăn bánh bao!</span>
            </h1>
            <p className={styles.heroDesc}>
              DingDong HSK là nền tảng học tiếng Trung toàn diện cho người Việt: từ vựng, ngữ pháp,
              chữ Hán, đọc, nghe, viết, nói theo chuẩn HSK 1–6 và HSKK. AI chấm điểm và sửa lỗi cho
              bạn từng bài.
            </p>
            <div className={styles.heroButtons}>
              {isAuthed ? (
                <Link href="/dashboard" className={`${styles.btn} ${styles.btnPrimary}`}>
                  <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học ngay
                </Link>
              ) : (
                <Link href="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                  <Rocket className="h-[18px] w-[18px]" aria-hidden="true" /> Bắt đầu miễn phí
                </Link>
              )}
              <a href="#features" className={`${styles.btn} ${styles.btnSecondary}`}>
                Khám phá tính năng <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
            <div className={styles.heroStatsRow}>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNum}>HSK 1–6</div>
                <div className={styles.heroStatLbl}>+ HSKK</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNum}>7</div>
                <div className={styles.heroStatLbl}>Kỹ năng</div>
              </div>
              <div className={styles.heroStatItem}>
                <div className={styles.heroStatNum}>3000+</div>
                <div className={styles.heroStatLbl}>Từ vựng & mẫu câu</div>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroVisualInner}>
              <BaoMascot transparent />
            </div>
          </div>
        </div>
      </section>

      {/* ============ AUDIENCE STRIP ============ */}
      <section className={styles.trusted} aria-label="Phù hợp với">
        <div className={styles.container}>
          <div className={styles.trustedLabel}>Phù hợp với mọi người học tiếng Trung</div>
          <div className={styles.trustedLogos}>
            {audiences.map((a) => (
              <span key={a.label} className={styles.trustedLogo}>
                <span aria-hidden>{a.icon}</span> {a.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className={styles.section} id="features" style={anchor} aria-labelledby="features-title">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>✨ Tính năng nổi bật</div>
              <h2 id="features-title" className={styles.sectionTitle}>
                Học tiếng Trung chưa bao giờ dễ đến thế
              </h2>
              <p className={styles.sectionSubtitle}>
                Bảy kỹ năng luyện tập bám sát đề thi HSK và HSKK, có AI chấm điểm, tất cả bằng tiếng
                Việt.
              </p>
            </div>
          </Reveal>
          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href={primaryHref}
                  className={styles.featureCard}
                  aria-label={isAuthed ? `${f.title} — vào học` : `${f.title} — bắt đầu học miễn phí`}
                >
                  <div className={`${styles.featureIcon} ${f.cls}`} aria-hidden>
                    {f.icon}
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className={styles.statsSection} aria-label="Thống kê">
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <Reveal key={s.label}>
                <div className={styles.statItem}>
                  <div className={styles.statNum}>
                    <AnimatedNumber value={s.to} />
                    {s.suffix}
                  </div>
                  <div className={styles.statLbl}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className={styles.sectionCream} id="how" style={anchor} aria-labelledby="how-title">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>🎯 Cách thức hoạt động</div>
              <h2 id="how-title" className={styles.sectionTitle}>
                3 bước đơn giản để bắt đầu
              </h2>
              <p className={styles.sectionSubtitle}>
                Lộ trình học được cá nhân hóa cho từng người, từ con số 0 đến HSK 6.
              </p>
            </div>
          </Reveal>
          <div className={styles.stepsGrid}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="h-full">
                <div className={styles.stepCard}>
                  <div className={styles.stepNumber}>{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LEVELS ============ */}
      <section className={styles.section} id="levels" style={anchor} aria-labelledby="levels-title">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>📈 Lộ trình</div>
              <h2 id="levels-title" className={styles.sectionTitle}>
                Từ HSK 1 đến HSK 6
              </h2>
              <p className={styles.sectionSubtitle}>
                Từ 150 từ đầu tiên đến hơn 5000 từ theo chuẩn HSK, DingDong đi cùng bạn suốt hành
                trình.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.levelPills}>
              {levels.map((l, i) => (
                <span key={l} className={`${styles.levelPill}${i === 0 ? ` ${styles.levelPillActive}` : ""}`}>
                  {l}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className={styles.sectionCream} id="pricing" style={anchor} aria-labelledby="pricing-title">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>💰 Bảng giá</div>
              <h2 id="pricing-title" className={styles.sectionTitle}>
                Học miễn phí, nâng cấp khi bạn sẵn sàng
              </h2>
              <p className={styles.sectionSubtitle}>
                Bắt đầu không mất phí. Gói trả phí mở khóa nội dung theo gói bạn chọn, kèm tim
                không giới hạn; thanh toán một lần, không tự gia hạn.
              </p>
            </div>
          </Reveal>
          <div className={styles.pricingGrid}>
            {pricingCards.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08} className="h-full">
                <article className={`${styles.priceCard}${p.highlighted ? ` ${styles.priceCardHi}` : ""}`}>
                  {p.highlighted && <div className={styles.priceBadge}>Phổ biến nhất</div>}
                  <h3 className={styles.priceName}>{p.name}</h3>
                  <div className={styles.priceAmount}>
                    {p.price} <span>{p.note}</span>
                  </div>
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
              <Link href="/payment">Xem bảng giá chi tiết theo từng cấp HSK →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section
        className={styles.section}
        id="testimonials"
        style={anchor}
        aria-labelledby="testimonials-title"
      >
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>💬 Cảm nhận học viên</div>
              <h2 id="testimonials-title" className={styles.sectionTitle}>
                Người học nói gì về DingDong HSK
              </h2>
              <p className={styles.sectionSubtitle}>
                Một vài chia sẻ từ những người học đầu tiên của DingDong.
              </p>
            </div>
          </Reveal>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="h-full">
                <article className={styles.testimonialCard}>
                  <div className={styles.stars} role="img" aria-label="5 trên 5 sao">
                    ★★★★★
                  </div>
                  <p className={styles.testimonialText}>{t.text}</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar} aria-hidden>
                      {t.initial}
                    </div>
                    <div>
                      <div className={styles.testimonialName}>{t.name}</div>
                      <div className={styles.testimonialRole}>{t.role}</div>
                    </div>
                  </div>
                </article>
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
                  <h2 id="cta-title">Tiếp tục hành trình của bạn!</h2>
                  <p>Quay lại bài học, giữ chuỗi ngày học và bước tiếp tới mốc HSK kế tiếp.</p>
                  <Link href="/dashboard" className={styles.btnWhite}>
                    <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học ngay
                  </Link>
                </>
              ) : (
                <>
                  <h2 id="cta-title">Sẵn sàng chinh phục tiếng Trung?</h2>
                  <p>Tạo tài khoản miễn phí và học bài đầu tiên cùng DingDong ngay hôm nay.</p>
                  <Link href="/register" className={styles.btnWhite}>
                    <Rocket className="h-[18px] w-[18px]" aria-hidden="true" /> Đăng ký miễn phí ngay
                  </Link>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <MarketingFooter isAuthed={isAuthed} />

      <BackToTop />
    </div>
  );
}
