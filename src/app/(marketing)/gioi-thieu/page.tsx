import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { SITE_NAME } from "@/lib/site";
import { BaoMascot } from "@/components/marketing/bao-mascot";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { MarketingNav } from "../_components/marketing-nav";
import { MarketingFooter } from "../_components/marketing-footer";
import { BackToTop } from "../_components/back-to-top";
import styles from "../landing.module.css";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Câu chuyện và giá trị của DingDong HSK, nền tảng học tiếng Trung cho người Việt: 7 module kỹ năng theo chuẩn HSK 1–6 và HSKK, hơn 3000 từ vựng và mẫu câu, AI chấm bài viết và luyện nói.",
  alternates: { canonical: "/gioi-thieu" },
  openGraph: {
    title: "Giới thiệu DingDong HSK — Học tiếng Trung cùng AI",
    description:
      "Sứ mệnh, hành trình và đội ngũ đứng sau nền tảng học tiếng Trung HSK 1–6 và HSKK cho người Việt.",
    url: "/gioi-thieu",
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    images: [{ url: "/bao-cover.png", width: 1376, height: 768, alt: "DingDong HSK — Học tiếng Trung chuẩn HSK" }],
  },
};

// Đối tượng người học
const audiences = [
  { icon: "🎓", label: "Sinh viên" },
  { icon: "💼", label: "Người đi làm" },
  { icon: "✈️", label: "Du học sinh" },
  { icon: "🀄", label: "Người mất gốc" },
  { icon: "🏆", label: "Luyện thi HSK" },
];

// Nỗi đau người học (cột trái)
const painPoints = [
  "Tài liệu rời rạc, toàn tiếng Anh hoặc tiếng Trung, khó cho người mới mất gốc.",
  "Viết luận, luyện nói mà không ai sửa, chẳng biết mình sai thanh điệu hay ngữ pháp ở đâu.",
  "Chữ Hán khó nhớ vì học vẹt, không nắm được thứ tự nét.",
  "Học vài hôm là nản, dễ bỏ vì không thấy mình tiến bộ.",
];

// Giải pháp (cột phải)
const solutions = [
  "Lộ trình HSK 1–6 bằng tiếng Việt, chia nhỏ từng bài, học như chơi.",
  "AI chấm bài viết và bài nói, chỉ rõ lỗi ngữ pháp, từ vựng, thanh điệu kèm bản sửa.",
  "Viết chữ Hán theo từng nét trên ô 田字格, có animation thứ tự nét chuẩn.",
  "XP, chuỗi ngày học, tim và chú bánh bao Bao giữ lửa cho bạn mỗi ngày.",
];

// 4 giá trị cốt lõi — tái dùng featureCard + tint có sẵn
const values = [
  {
    icon: "🤖",
    cls: styles.iconAi,
    title: "Học cùng AI thật sự",
    desc: "AI của DingDong không chỉ báo đúng hay sai: nó giải thích vì sao bạn sai và đưa bản sửa, như một gia sư kiên nhẫn luôn ở bên.",
  },
  {
    icon: "🇻🇳",
    cls: styles.iconHsk,
    title: "100% tiếng Việt, vì người Việt",
    desc: "Mọi giải thích, mọi mẹo học đều bằng tiếng Việt tự nhiên, lưu ý đúng những lỗi người Việt hay mắc, như nhầm thanh 3 với thanh 4.",
  },
  {
    icon: "🥟",
    cls: styles.iconCommunity,
    title: "Nhẹ nhàng và vui mỗi ngày",
    desc: "Giao diện ấm áp như tiệm bánh bao, linh vật dễ thương, XP và chuỗi ngày học biến việc học thành thói quen chứ không phải áp lực.",
  },
  {
    icon: "🎯",
    cls: styles.iconWriting,
    title: "Bám sát đề thi thật",
    desc: "Từ vựng, đọc, nghe, viết, nói đều theo đúng format HSK 1–6 và HSKK. Bạn luyện đúng thứ sẽ gặp trong phòng thi.",
  },
];

// SỐ LIỆU THẬT của nền tảng — đã đối chiếu với dữ liệu bài học, đừng phóng đại.
const stats = [
  { to: 6, suffix: "", label: "Cấp độ HSK 1–6" },
  { to: 3000, suffix: "+", label: "Từ vựng & mẫu câu" },
  { to: 7, suffix: "", label: "Module kỹ năng" },
  { to: 2, suffix: "", label: "Kỹ năng AI chấm chi tiết" },
];

// Cột mốc phát triển của nền tảng.
const milestones = [
  {
    year: "2025",
    tag: "Khởi nguồn",
    title: "Ý tưởng ra đời",
    desc: "Từ chính trải nghiệm tự học tiếng Trung của người sáng lập, ý tưởng về một nền tảng học ấm áp dành riêng cho người Việt được phác thảo.",
  },
  {
    year: "2026",
    tag: "Nền móng",
    title: "Hoàn thiện 7 module kỹ năng",
    desc: "Từ vựng, ngữ pháp, chữ Hán, đọc, nghe, viết, nói được xây dựng xong cùng lộ trình HSK 1–6 bằng tiếng Việt.",
  },
  {
    year: "2026",
    tag: "Trí tuệ",
    title: "Đưa AI vào chấm bài viết & luyện nói",
    desc: "AI chấm ngữ pháp, từ vựng, thanh điệu, độ lưu loát và trả nhận xét kèm bản sửa lỗi ngay sau khi bạn nộp bài.",
  },
  {
    year: "Mục tiêu",
    tag: "Lớn lên",
    title: "Đồng hành cùng 10.000+ người học",
    desc: "Chặng tiếp theo của DingDong: giúp hơn mười nghìn người Việt học tiếng Trung đến nơi đến chốn.",
    target: true,
  },
];

// Lời nhắn từ đội ngũ — nội dung thật, không dùng hồ sơ cá nhân dựng sẵn.
const team = {
  avatar: "🥟",
  name: "Đội ngũ DingDong HSK",
  role: "Những người Việt từng tự học tiếng Trung",
  tags: ["🎯 Bám sát chuẩn HSK & HSKK", "🇻🇳 Nội dung 100% tiếng Việt", "🤖 Ứng dụng AI vào việc học"],
  quote:
    "“Chúng mình từng học tiếng Trung trong cô đơn và bỏ cuộc không biết bao nhiêu lần. DingDong là thứ chúng mình ước gì đã có ngày ấy: một lộ trình tử tế và một người đồng hành kiên nhẫn.”",
  paras: [
    "DingDong HSK bắt đầu từ trải nghiệm rất thật: đứng trước hàng nghìn chữ Hán và bốn thanh điệu, học chữ rồi quên, nói thì sợ sai, luyện thi HSK mà chẳng biết mình yếu ở đâu. Những năm tự học ấy dạy chúng mình rằng người học cần hai thứ: một lộ trình rõ ràng và ai đó chỉ ra lỗi sai ngay khi mắc phải.",
    "Vì thế chúng mình gói tất cả vào DingDong HSK: nội dung tiếng Việt gần gũi, AI chấm và sửa bài tận tình, cùng một chú bánh bao dễ thương để bạn mỉm cười mỗi khi mở app. Cảm ơn bạn đã ghé thăm. Hẹn gặp bạn ở bài học đầu tiên nhé!",
  ],
  sign: "— Đội ngũ DingDong HSK 🥟",
};

const anchor = { scrollMarginTop: "96px" } as const;

export default async function AboutPage() {
  const session = await auth();
  const isAuthed = !!session?.user;

  return (
    <div className={styles.page}>
      <MarketingNav isAuthed={isAuthed} />

      {/* ============ HERO GIỚI THIỆU ============ */}
      <section
        className={`${styles.hero} ${styles.heroAbout}`}
        id="gioi-thieu-hero"
        aria-labelledby="gioi-thieu-hero-title"
      >
        <div className={styles.heroBgPattern} />
        <div className={styles.heroGridBg} />
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.dot} />
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Câu chuyện DingDong HSK
            </div>
            <h1 id="gioi-thieu-hero-title" className={styles.heroTitle}>
              Học tiếng Trung cho người Việt:<br />
              tử tế, thông minh<br />
              <span className={styles.highlight}>và ấm như bánh bao</span>
            </h1>
            <p className={styles.heroDesc}>
              DingDong HSK là nền tảng học tiếng Trung toàn diện, thiết kế riêng cho người Việt.
              Một nơi duy nhất để học từ vựng, ngữ pháp, viết chữ Hán và luyện đọc, nghe, viết, nói
              theo chuẩn HSK 1–6 và HSKK, có AI chấm điểm từng bài.
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
              <a href="#cau-chuyen" className={`${styles.btn} ${styles.btnSecondary}`}>
                Đọc câu chuyện của DingDong <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
            <div className={styles.aboutHeroChips}>
              <span className={styles.aboutHeroChipsLabel}>Được tạo ra cho:</span>
              {audiences.map((a) => (
                <span key={a.label} className={styles.aboutChip}>
                  <span aria-hidden>{a.icon}</span> {a.label}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroVisualInner}>
              <BaoMascot transparent />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DINGDONG LÀ GÌ (vấn đề → giải pháp) ============ */}
      <section className={styles.section} id="cau-chuyen" style={anchor} aria-labelledby="cau-chuyen-title">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>📖 DingDong HSK là gì?</div>
              <h2 id="cau-chuyen-title" className={styles.sectionTitle}>
                Một nền tảng, trọn hành trình tiếng Trung
              </h2>
              <p className={styles.sectionSubtitle}>
                Không còn cảnh nhảy giữa năm ứng dụng khác nhau. Tất cả những gì người Việt cần để
                học tiếng Trung nghiêm túc, gói gọn trong một nơi ấm áp.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className={`${styles.aboutProse} ${styles.aboutProseLead}`}>
              Cái tên DingDong là tiếng chuông lảnh lót báo một điều vui sắp đến, còn chú bánh bao
              mũm mĩm là lời nhắc rằng học tiếng Trung có thể ấm áp và dễ như ăn bánh bao. DingDong
              ra đời để bạn không phải học một mình nữa.
            </p>
          </Reveal>

          <div className={styles.aboutSplit}>
            <Reveal className="h-full">
              <div className={`${styles.aboutSplitCard} ${styles.aboutSplitProblem}`}>
                <h3>Học tiếng Trung kiểu cũ thật mệt</h3>
                <ul className={styles.aboutList}>
                  {painPoints.map((p) => (
                    <li key={p}>
                      <span aria-hidden>😮‍💨</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className={`${styles.aboutSplitCard} ${styles.aboutSplitSolution}`}>
                <h3>Với DingDong thì khác</h3>
                <ul className={styles.aboutList}>
                  {solutions.map((s) => (
                    <li key={s}>
                      <span aria-hidden>✅</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ GIÁ TRỊ CỐT LÕI ============ */}
      <section className={styles.sectionCream} id="gia-tri" style={anchor} aria-labelledby="gia-tri-title">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>💛 Giá trị cốt lõi</div>
              <h2 id="gia-tri-title" className={styles.sectionTitle}>
                Điều khiến DingDong khác biệt
              </h2>
              <p className={styles.sectionSubtitle}>
                Bốn nguyên tắc định hình mọi bài học, mọi dòng phản hồi và mọi nét vẽ bánh bao trên
                DingDong HSK.
              </p>
            </div>
          </Reveal>
          <div className={styles.featuresGrid}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.08} className="h-full">
                <article className={styles.featureCard}>
                  <div className={`${styles.featureIcon} ${v.cls}`} aria-hidden>
                    {v.icon}
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DẢI SỐ LIỆU ============ */}
      <section className={styles.statsSection} aria-label="Những con số của DingDong">
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.statsBandHeading}>Những con số làm nên DingDong HSK</h2>
          </Reveal>
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
          <Reveal>
            <p className={styles.statsBandNote}>
              Viết · Nói được AI chấm chi tiết; Đọc · Nghe chấm tự động theo đáp án đề HSK.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ TIMELINE CỘT MỐC ============ */}
      <section className={styles.section} id="thanh-tich" style={anchor} aria-labelledby="thanh-tich-title">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>🏆 Cột mốc &amp; hành trình</div>
              <h2 id="thanh-tich-title" className={styles.sectionTitle}>
                Hành trình DingDong HSK
              </h2>
              <p className={styles.sectionSubtitle}>
                Những dấu mốc trên chặng đường xây một nền tảng học tiếng Trung tử tế cho người
                Việt.
              </p>
            </div>
          </Reveal>
          <div className={styles.aboutTimeline}>
            {milestones.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.08}>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineYear}>
                    {m.year}
                    <span>{m.tag}</span>
                  </div>
                  <div>
                    <h3>
                      {m.title}
                      {m.target && <span className={styles.sampleBadge}>Mục tiêu</span>}
                    </h3>
                    <p>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LỜI NHẮN TỪ ĐỘI NGŨ ============ */}
      <section
        className={styles.sectionCream}
        id="doi-ngu"
        style={anchor}
        aria-labelledby="doi-ngu-title"
      >
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>👋 Đội ngũ</div>
              <h2 id="doi-ngu-title" className={styles.sectionTitle}>
                Những người đứng sau chú bánh bao
              </h2>
              <p className={styles.sectionSubtitle}>
                Những người Việt từng tự học tiếng Trung, nay muốn con đường ấy nhẹ nhàng hơn cho
                người đi sau.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.founderCard}>
              <aside className={styles.founderAside}>
                <div className={styles.founderAvatar} aria-hidden>
                  {team.avatar}
                </div>
                <p className={styles.founderName}>{team.name}</p>
                <p className={styles.founderRole}>{team.role}</p>
                <div className={styles.founderTags}>
                  {team.tags.map((t) => (
                    <span key={t} className={styles.founderTag}>
                      {t}
                    </span>
                  ))}
                </div>
              </aside>
              <div>
                <blockquote className={styles.founderQuote}>{team.quote}</blockquote>
                <div className={styles.aboutProse}>
                  {team.paras.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <p className={styles.founderSign}>{team.sign}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className={styles.cta} id="cta" aria-labelledby="cta-title">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.ctaContent}>
              {isAuthed ? (
                <>
                  <h2 id="cta-title">Tiếp tục học cùng DingDong nhé!</h2>
                  <p>Quay lại lộ trình của bạn và học tiếp bài tiếng Trung dang dở cùng bạn bánh bao.</p>
                  <Link href="/dashboard" className={styles.btnWhite}>
                    <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học ngay
                  </Link>
                  <p className={styles.ctaSub}>Học mọi lúc trên điện thoại · Giữ vững chuỗi ngày học.</p>
                </>
              ) : (
                <>
                  <h2 id="cta-title">Cùng DingDong bắt đầu hôm nay nhé!</h2>
                  <p>
                    Tạo tài khoản miễn phí trong 30 giây và học bài tiếng Trung đầu tiên cùng bạn
                    bánh bao DingDong.
                  </p>
                  <Link href="/register" className={styles.btnWhite}>
                    <Rocket className="h-[18px] w-[18px]" aria-hidden="true" /> Đăng ký miễn phí ngay
                  </Link>
                  <p className={styles.ctaSub}>Không cần thẻ tín dụng · Học mọi lúc trên điện thoại.</p>
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
