import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { SITE_NAME } from "@/lib/site";
import { CORE_FIRST_WORDS_COUNT } from "@/lib/first-words";
import { DingMascot } from "@/components/marketing/ding-mascot";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { MarketingNav } from "../_components/marketing-nav";
import { MarketingFooter } from "../_components/marketing-footer";
import { BackToTop } from "../_components/back-to-top";
import styles from "../landing.module.css";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Câu chuyện và giá trị của DingDong Kids, nền tảng học tiếng Anh cho trẻ em Việt: 7 module kỹ năng theo chuẩn Cambridge Young Learners, có ghép vần Phonics và AI chấm bài viết, luyện nói.",
  alternates: { canonical: "/gioi-thieu" },
  openGraph: {
    title: "Giới thiệu DingDong Kids — Học tiếng Anh cùng AI",
    description:
      "Sứ mệnh, hành trình và đội ngũ đứng sau nền tảng học tiếng Anh cho trẻ em Việt, từ Pre-Starters đến B1 Preliminary.",
    url: "/gioi-thieu",
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    images: [
      { url: "/og-cover.png", width: 1200, height: 630, alt: "DingDong Kids — Tiếng Anh vui cho bé" },
    ],
  },
};

// Đối tượng người học.
// (Bản trước còn nguyên nhóm người lớn của DingDong HSK — "Sinh viên", "Người
//  đi làm", "Du học sinh" — kèm emoji 🀄 quân mạt chược. Sản phẩm này dạy trẻ
//  em tiếng Anh, không nhóm nào trong số đó đúng.)
const audiences = [
  { icon: "🧸", label: "Bé chưa biết chữ" },
  { icon: "🌱", label: "Bé mẫu giáo" },
  { icon: "🎒", label: "Bé tiểu học" },
  { icon: "🏆", label: "Luyện thi Cambridge" },
  { icon: "👨‍👩‍👧", label: "Bố mẹ đồng hành" },
];

// Nỗi đau người học (cột trái)
const painPoints = [
  "Tài liệu rời rạc, phần lớn viết cho người lớn, khó cho bé mới bắt đầu.",
  "Bé viết, bé nói mà không ai sửa, chẳng biết sai phát âm hay ngữ pháp ở đâu.",
  "Học vẹt mặt chữ nên bé không tự đọc được từ mới bao giờ.",
  "Học vài hôm là chán, dễ bỏ vì không thấy mình tiến bộ.",
];

// Giải pháp (cột phải)
const solutions = [
  "Lộ trình Bé Tập Nói → B1 bằng tiếng Việt, chia nhỏ từng bài, học như chơi.",
  "AI chấm bài viết và bài nói, chỉ rõ lỗi ngữ pháp, từ vựng, trọng âm kèm bản sửa.",
  "Ghép vần từ âm sang từ: nghe âm, chọn chữ, đọc trơn — nền tảng để bé tự đọc.",
  "XP, chuỗi ngày học, tim và chú gấu Ding giữ lửa cho bé mỗi ngày.",
];

// 4 giá trị cốt lõi — tái dùng featureCard + tint có sẵn
const values = [
  {
    icon: "🤖",
    cls: styles.iconAi,
    title: "Học cùng AI thật sự",
    desc: "AI của DingDong không chỉ báo đúng hay sai: nó chỉ rõ bé sai ở đâu, đưa bản sửa và giải thích bằng tiếng Việt — như một cô giáo kiên nhẫn luôn ở bên.",
  },
  {
    icon: "🇻🇳",
    cls: styles.iconExam,
    title: "100% tiếng Việt, vì trẻ em Việt",
    desc: "Mọi giải thích đều bằng tiếng Việt dễ hiểu, và nhắm đúng lỗi trẻ Việt hay mắc: nuốt phụ âm cuối, quên -s số nhiều, thiếu mạo từ, đọc đều mọi âm tiết.",
  },
  {
    icon: "🐻",
    cls: styles.iconCommunity,
    title: "Nhẹ nhàng và vui mỗi ngày",
    desc: "Chú gấu Ding, XP và chuỗi ngày học biến việc học thành thói quen vui chứ không phải áp lực. Chấm bài luôn khen trước khi sửa.",
  },
  {
    icon: "🎯",
    cls: styles.iconWriting,
    title: "Bám sát đề thi thật",
    desc: "Từ vựng, đọc, nghe, viết, nói đều theo đúng format Cambridge từ Pre-Starters đến B1 Preliminary. Bé luyện đúng thứ sẽ gặp trong phòng thi.",
  },
];

// SỐ LIỆU THẬT của nền tảng — đếm từ chính nguồn dữ liệu, đừng gõ tay và đừng
// phóng đại. (Bản trước có mục "15 · Tuổi phù hợp (từ 4)": một con số đếm lên
// tới 15 mang nhãn "tuổi phù hợp" vừa khó hiểu vừa đã sai kể từ khi có chặng
// Bé Tập Nói cho bé 3 tuổi.)
const stats = [
  { to: 7, suffix: "", label: "Chặng học, từ 3 đến 15 tuổi" },
  { to: 7, suffix: "", label: "Module kỹ năng" },
  { to: CORE_FIRST_WORDS_COUNT, suffix: "", label: "Từ đầu đời học miễn phí" },
  { to: 2, suffix: "", label: "Kỹ năng AI chấm chi tiết" },
];

// Cột mốc phát triển của nền tảng.
const milestones = [
  {
    year: "2025",
    tag: "Khởi nguồn",
    title: "Ý tưởng ra đời",
    desc: "Từ chính trải nghiệm dạy tiếng Anh cho con của người sáng lập, ý tưởng về một nền tảng học ấm áp dành riêng cho trẻ em Việt được phác thảo.",
  },
  {
    year: "2026",
    tag: "Nền móng",
    title: "Hoàn thiện 7 module kỹ năng",
    desc: "Từ vựng, ghép vần, ngữ pháp, đọc, nghe, viết, nói được xây dựng xong cùng lộ trình Cambridge bằng tiếng Việt.",
  },
  {
    year: "2026",
    tag: "Trí tuệ",
    title: "Đưa AI vào chấm bài viết & luyện nói",
    desc: "AI chấm ngữ pháp, từ vựng, trọng âm, độ lưu loát và trả nhận xét kèm bản sửa lỗi ngay sau khi bạn nộp bài.",
  },
  {
    year: "Mục tiêu",
    tag: "Lớn lên",
    title: "Đồng hành cùng 10.000 bạn nhỏ",
    desc: "Chặng tiếp theo của DingDong: giúp hơn mười nghìn bạn nhỏ Việt Nam nói được tiếng Anh một cách tự nhiên.",
    target: true,
  },
];

// Lời nhắn từ đội ngũ — nội dung thật, không dùng hồ sơ cá nhân dựng sẵn.
const team = {
  avatar: "🐻",
  name: "Đội ngũ DingDong Kids",
  role: "Những người Việt từng tự học tiếng Anh",
  tags: ["🎯 Bám sát chuẩn Cambridge YLE", "🇻🇳 Nội dung 100% tiếng Việt", "🤖 Ứng dụng AI vào việc học"],
  quote:
    "“Chúng mình từng học tiếng Anh trong cô đơn và bỏ cuộc không biết bao nhiêu lần. DingDong Kids là thứ chúng mình ước gì đã có ngày bé: một lộ trình tử tế và một người đồng hành kiên nhẫn.”",
  paras: [
    "DingDong Kids bắt đầu từ một trải nghiệm rất thật: đứng trước hàng nghìn từ mới và cách phát âm lạ tai, học chữ rồi quên, nói thì sợ sai, chẳng biết mình yếu ở đâu. Những năm tự học ấy dạy chúng mình rằng một đứa trẻ đang học tiếng Anh cần hai thứ: một lộ trình rõ ràng và ai đó chỉ ra lỗi sai ngay khi mắc phải — bằng giọng tử tế.",
    "Vì thế chúng mình gói tất cả vào DingDong Kids: nội dung tiếng Việt gần gũi, AI chấm và sửa bài tận tình nhưng luôn khen trước khi sửa, cùng một chú gấu Ding dễ thương để bé mỉm cười mỗi lần mở bài học. Cảm ơn bố mẹ đã ghé thăm. Hẹn gặp bé ở bài học đầu tiên nhé!",
  ],
  sign: "— Đội ngũ DingDong Kids 🐻",
};

const anchor = { scrollMarginTop: "96px" } as const;

export default async function AboutPage() {
  const session = await auth();
  const isAuthed = !!session?.user;

  return (
    <div className={styles.page}>
      <a href="#noi-dung" className={styles.skipLink}>
        Bỏ qua điều hướng
      </a>

      <MarketingNav isAuthed={isAuthed} />

      <main id="noi-dung">
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
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Câu chuyện DingDong Kids
            </div>
            <h1 id="gioi-thieu-hero-title" className={styles.heroTitle}>
              Tiếng Anh vui cho bé:<br />
              tử tế, thông minh<br />
              <span className={styles.highlight}>và ấm như gấu Ding</span>
            </h1>
            <p className={styles.heroDesc}>
              DingDong Kids là nền tảng học tiếng Anh toàn diện, thiết kế riêng cho trẻ em Việt.
              Một nơi duy nhất để học từ vựng, ghép vần, ngữ pháp và luyện đọc, nghe, viết, nói
              theo chuẩn Cambridge Young Learners, có AI chấm điểm từng bài.
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
              <DingMascot transparent />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DINGDONG LÀ GÌ (vấn đề → giải pháp) ============ */}
      <section className={styles.section} id="cau-chuyen" style={anchor} aria-labelledby="cau-chuyen-title">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>📖 DingDong Kids là gì?</div>
              <h2 id="cau-chuyen-title" className={styles.sectionTitle}>
                Một nền tảng, trọn hành trình tiếng Anh
              </h2>
              <p className={styles.sectionSubtitle}>
                Không còn cảnh nhảy giữa năm ứng dụng khác nhau. Tất cả những gì bé cần để học
                tiếng Anh nghiêm túc, gói gọn trong một nơi ấm áp.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className={`${styles.aboutProse} ${styles.aboutProseLead}`}>
              Cái tên DingDong là tiếng chuông lảnh lót báo một điều vui sắp đến, còn chú gấu Ding
              mũm mĩm là lời nhắc rằng học tiếng Anh có thể ấm áp và nhẹ nhàng như một trò chơi.
              DingDong ra đời để bé không phải học một mình nữa.
            </p>
          </Reveal>

          <div className={styles.aboutSplit}>
            <Reveal className="h-full">
              <div className={`${styles.aboutSplitCard} ${styles.aboutSplitProblem}`}>
                <h3>Học tiếng Anh kiểu cũ thật mệt</h3>
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
                Bốn nguyên tắc định hình mọi bài học, mọi dòng phản hồi và mọi nét vẽ gấu Ding trên
                DingDong Kids.
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
            <h2 className={styles.statsBandHeading}>Những con số làm nên DingDong Kids</h2>
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
              Viết · Nói được AI chấm chi tiết; Đọc · Nghe chấm tự động theo đáp án đề Cambridge.
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
                Hành trình DingDong Kids
              </h2>
              <p className={styles.sectionSubtitle}>
                Những dấu mốc trên chặng đường xây một nền tảng học tiếng Anh tử tế cho trẻ
                em Việt.
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
                Những người đứng sau chú gấu Ding
              </h2>
              <p className={styles.sectionSubtitle}>
                Những người Việt từng tự học tiếng Anh, nay muốn con đường ấy nhẹ nhàng hơn cho
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
                  <p>Quay lại lộ trình của bạn và học tiếp bài tiếng Anh dang dở cùng bạn gấu Ding.</p>
                  <Link href="/dashboard" className={styles.btnWhite}>
                    <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học ngay
                  </Link>
                  <p className={styles.ctaSub}>Học mọi lúc trên điện thoại · Giữ vững chuỗi ngày học.</p>
                </>
              ) : (
                <>
                  <h2 id="cta-title">Cùng DingDong bắt đầu hôm nay nhé!</h2>
                  <p>
                    Tạo tài khoản miễn phí trong 30 giây và học bài tiếng Anh đầu tiên cùng bạn
                    gấu Ding.
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
      </main>

      <MarketingFooter isAuthed={isAuthed} />

      <BackToTop />
    </div>
  );
}
