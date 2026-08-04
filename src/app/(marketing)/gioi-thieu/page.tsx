import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { SITE_NAME } from "@/lib/site";
import { CORE_FIRST_WORDS_COUNT } from "@/lib/first-words";
import { DingMascot } from "@/components/marketing/ding-mascot";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/shared/wave-divider";
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

// 4 giá trị cốt lõi. `cls` là cặp màu cho ô emoji — mỗi giá trị một "thế giới
// màu" pastel để phân biệt bằng MÀU chứ không phải bằng chữ.
const values = [
  {
    icon: "🤖",
    cls: "bg-band-lav text-brand-grape",
    title: "Học cùng AI thật sự",
    desc: "AI của DingDong không chỉ báo đúng hay sai: nó chỉ rõ bé sai ở đâu, đưa bản sửa và giải thích bằng tiếng Việt — như một cô giáo kiên nhẫn luôn ở bên.",
  },
  {
    icon: "🇻🇳",
    cls: "bg-band-coral text-brand-coral",
    title: "100% tiếng Việt, vì trẻ em Việt",
    desc: "Mọi giải thích đều bằng tiếng Việt dễ hiểu, và nhắm đúng lỗi trẻ Việt hay mắc: nuốt phụ âm cuối, quên -s số nhiều, thiếu mạo từ, đọc đều mọi âm tiết.",
  },
  {
    icon: "🐻",
    cls: "bg-band-sun text-brand-gold",
    title: "Nhẹ nhàng và vui mỗi ngày",
    desc: "Chú gấu Ding, XP và chuỗi ngày học biến việc học thành thói quen vui chứ không phải áp lực. Chấm bài luôn khen trước khi sửa.",
  },
  {
    icon: "🎯",
    cls: "bg-band-mint text-brand-teal",
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

/** Nhãn nhỏ trên đầu mỗi phần: viên thuốc trắng nổi trên khối màu pastel. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow inline-block rounded-full bg-card px-4 py-2 text-brand-gold shadow-soft">
      {children}
    </span>
  );
}

export default async function AboutPage() {
  const session = await auth();
  const isAuthed = !!session?.user;

  return (
    <div className={styles.page}>
      <a
        href="#noi-dung"
        className="absolute left-1/2 top-2 z-[1200] -translate-x-1/2 -translate-y-[160%] rounded-full bg-primary px-6 py-3 font-display text-base font-extrabold text-primary-foreground shadow-soft-lg transition-transform focus-visible:translate-y-0"
      >
        Bỏ qua điều hướng
      </a>

      <MarketingNav isAuthed={isAuthed} />

      <main id="noi-dung">
      {/* ============ HERO GIỚI THIỆU ============ */}
      <section
        className="relative overflow-hidden bg-band-sun pb-16 pt-32 md:pb-24 md:pt-36"
        id="gioi-thieu-hero"
        aria-labelledby="gioi-thieu-hero-title"
      >
        {/* Chữ cái & bong bóng bay — lớp trang trí luôn nằm DƯỚI nội dung. */}
        <div className="deco" aria-hidden="true">
          <b className="text-[68px] text-brand-sun/45" style={{ left: "4%", top: "24%" }}>A</b>
          <b className="text-[52px] text-brand-coral/40" style={{ right: "7%", top: "16%" }}>B</b>
          <b className="text-[44px] text-brand-grape/35" style={{ left: "13%", bottom: "10%" }}>C</b>
          <s className="h-28 w-28 bg-brand-pink/25" style={{ right: "14%", bottom: "12%" }} />
          <s className="h-20 w-20 bg-brand-sky/30" style={{ left: "42%", top: "6%" }} />
        </div>

        <div className="container relative z-[2] grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-soft">
              <span className="h-2.5 w-2.5 animate-dot-pulse rounded-full bg-brand-lime" aria-hidden="true" />
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
              <span className="eyebrow text-brand-gold">Câu chuyện DingDong Kids</span>
            </span>

            <h1
              id="gioi-thieu-hero-title"
              className="mt-5 font-display text-[clamp(2.1rem,6vw,3.6rem)] text-foreground"
            >
              Tiếng Anh vui cho bé:<br />
              tử tế, thông minh<br />
              <span className="hl">và ấm như gấu Ding</span>
            </h1>

            <p className="mx-auto mt-5 max-w-[62ch] text-lg text-muted-foreground lg:mx-0">
              DingDong Kids là nền tảng học tiếng Anh toàn diện, thiết kế riêng cho trẻ em Việt.
              Một nơi duy nhất để học từ vựng, ghép vần, ngữ pháp và luyện đọc, nghe, viết, nói
              theo chuẩn Cambridge Young Learners, có AI chấm điểm từng bài.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              {isAuthed ? (
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học ngay
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link href="/register">
                    <Rocket className="h-[18px] w-[18px]" aria-hidden="true" /> Bắt đầu miễn phí
                  </Link>
                </Button>
              )}
              <Button asChild size="lg" variant="secondary">
                <a href="#cau-chuyen">
                  Đọc câu chuyện của DingDong <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              <span className="eyebrow text-brand-mocha">Được tạo ra cho:</span>
              {audiences.map((a) => (
                <span
                  key={a.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-[0.95rem] font-bold text-foreground shadow-soft"
                >
                  <span aria-hidden>{a.icon}</span> {a.label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-[2]">
            <div className="mx-auto w-full max-w-[440px]">
              <DingMascot transparent />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider top="sun" bottom="cream" />

      {/* ============ DINGDONG LÀ GÌ (vấn đề → giải pháp) ============ */}
      <section
        className="bg-band-cream py-16 md:py-24"
        id="cau-chuyen"
        style={anchor}
        aria-labelledby="cau-chuyen-title"
      >
        <div className="container">
          <Reveal>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <SectionLabel>📖 DingDong Kids là gì?</SectionLabel>
              <h2
                id="cau-chuyen-title"
                className="mt-4 font-display text-[clamp(1.7rem,4.4vw,2.7rem)] text-foreground"
              >
                Một nền tảng, trọn hành trình tiếng Anh
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Không còn cảnh nhảy giữa năm ứng dụng khác nhau. Tất cả những gì bé cần để học
                tiếng Anh nghiêm túc, gói gọn trong một nơi ấm áp.
              </p>
            </div>
          </Reveal>

          <Reveal>
            {/* ~70 ký tự mỗi dòng — dài hơn là mắt bị lạc dòng khi đọc. */}
            <p className="mx-auto mb-12 max-w-[68ch] text-center text-lg text-foreground">
              Cái tên DingDong là tiếng chuông lảnh lót báo một điều vui sắp đến, còn chú gấu Ding
              mũm mĩm là lời nhắc rằng học tiếng Anh có thể ấm áp và nhẹ nhàng như một trò chơi.
              DingDong ra đời để bé không phải học một mình nữa.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl bg-card p-7 shadow-soft-lg ring-4 ring-brand-coral/25">
                <h3 className="font-display text-2xl text-brand-coral">Học tiếng Anh kiểu cũ thật mệt</h3>
                <ul className="mt-5 space-y-4">
                  {painPoints.map((p) => (
                    <li key={p} className="flex gap-3 text-[1.02rem] text-muted-foreground">
                      <span aria-hidden className="text-xl leading-none">😮‍💨</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full rounded-2xl bg-card p-7 shadow-soft-lg ring-4 ring-brand-lime/30">
                <h3 className="font-display text-2xl text-brand-teal">Với DingDong thì khác</h3>
                <ul className="mt-5 space-y-4">
                  {solutions.map((s) => (
                    <li key={s} className="flex gap-3 text-[1.02rem] text-foreground">
                      <span aria-hidden className="text-xl leading-none">✅</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <WaveDivider top="cream" bottom="lav" />

      {/* ============ GIÁ TRỊ CỐT LÕI ============ */}
      <section
        className="bg-band-lav py-16 md:py-24"
        id="gia-tri"
        style={anchor}
        aria-labelledby="gia-tri-title"
      >
        <div className="container">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <SectionLabel>💛 Giá trị cốt lõi</SectionLabel>
              <h2
                id="gia-tri-title"
                className="mt-4 font-display text-[clamp(1.7rem,4.4vw,2.7rem)] text-foreground"
              >
                Điều khiến DingDong khác biệt
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Bốn nguyên tắc định hình mọi bài học, mọi dòng phản hồi và mọi nét vẽ gấu Ding trên
                DingDong Kids.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.08} className="h-full">
                <article className="card-toy h-full p-7">
                  <div
                    className={`grid h-16 w-16 place-items-center rounded-xl text-[2rem] ${v.cls}`}
                    aria-hidden
                  >
                    {v.icon}
                  </div>
                  <h3 className="mt-5 font-display text-xl text-foreground">{v.title}</h3>
                  <p className="mt-2.5 text-muted-foreground">{v.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider top="lav" bottom="coral" flip />

      {/* ============ DẢI SỐ LIỆU ============ */}
      <section className="bg-band-coral py-16 md:py-20" aria-label="Những con số của DingDong">
        <div className="container">
          <Reveal>
            <h2 className="mb-10 text-center font-display text-[clamp(1.6rem,4vw,2.4rem)] text-foreground">
              Những con số làm nên DingDong Kids
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <div className="h-full rounded-2xl bg-card p-6 text-center shadow-soft">
                  <div className="text-gradient-brand font-display text-[clamp(2.4rem,6vw,3.2rem)]">
                    <AnimatedNumber value={s.to} />
                    {s.suffix}
                  </div>
                  <div className="mt-1 font-bold text-muted-foreground">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-8 max-w-[68ch] text-center text-muted-foreground">
              Viết · Nói được AI chấm chi tiết; Đọc · Nghe chấm tự động theo đáp án đề Cambridge.
            </p>
          </Reveal>
        </div>
      </section>

      <WaveDivider top="coral" bottom="cream" />

      {/* ============ TIMELINE CỘT MỐC ============ */}
      <section
        className="bg-band-cream py-16 md:py-24"
        id="thanh-tich"
        style={anchor}
        aria-labelledby="thanh-tich-title"
      >
        <div className="container">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <SectionLabel>🏆 Cột mốc &amp; hành trình</SectionLabel>
              <h2
                id="thanh-tich-title"
                className="mt-4 font-display text-[clamp(1.7rem,4.4vw,2.7rem)] text-foreground"
              >
                Hành trình DingDong Kids
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Những dấu mốc trên chặng đường xây một nền tảng học tiếng Anh tử tế cho trẻ
                em Việt.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto flex max-w-4xl flex-col gap-5">
            {milestones.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.08}>
                <div className="flex flex-col gap-5 rounded-2xl bg-card p-6 shadow-soft sm:flex-row sm:items-start sm:gap-7">
                  <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-band-sun px-5 py-4 text-center sm:w-40">
                    <span className="font-display text-2xl text-brand-gold">{m.year}</span>
                    <span className="eyebrow mt-1 text-brand-mocha">{m.tag}</span>
                  </div>
                  <div>
                    <h3 className="flex flex-wrap items-center gap-2 font-display text-xl text-foreground">
                      {m.title}
                      {m.target && (
                        <span className="rounded-full bg-band-mint px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-teal">
                          Mục tiêu
                        </span>
                      )}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider top="cream" bottom="mint" flip />

      {/* ============ LỜI NHẮN TỪ ĐỘI NGŨ ============ */}
      <section
        className="bg-band-mint py-16 md:py-24"
        id="doi-ngu"
        style={anchor}
        aria-labelledby="doi-ngu-title"
      >
        <div className="container">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <SectionLabel>👋 Đội ngũ</SectionLabel>
              <h2
                id="doi-ngu-title"
                className="mt-4 font-display text-[clamp(1.7rem,4.4vw,2.7rem)] text-foreground"
              >
                Những người đứng sau chú gấu Ding
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Những người Việt từng tự học tiếng Anh, nay muốn con đường ấy nhẹ nhàng hơn cho
                người đi sau.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="mx-auto grid max-w-5xl gap-8 rounded-2xl bg-card p-7 shadow-soft-lg md:grid-cols-[260px_1fr] md:p-10">
              <aside className="flex flex-col items-center rounded-2xl bg-band-sun p-6 text-center">
                <div className="grid h-24 w-24 animate-bob place-items-center rounded-full bg-card text-[3rem] shadow-soft" aria-hidden>
                  {team.avatar}
                </div>
                <p className="mt-4 font-display text-xl text-foreground">{team.name}</p>
                <p className="mt-1 text-sm font-bold text-brand-mocha">{team.role}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {team.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-card px-3 py-1.5 text-sm font-bold text-foreground shadow-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </aside>
              <div>
                <blockquote className="rounded-xl bg-band-cream p-5 font-display text-xl leading-relaxed text-foreground">
                  {team.quote}
                </blockquote>
                {/* Đoạn văn dài → giữ dưới ~70 ký tự mỗi dòng cho dễ đọc. */}
                <div className="mt-5 max-w-[70ch] space-y-4 text-[1.02rem] text-muted-foreground">
                  {team.paras.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <p className="mt-5 font-display text-lg text-brand-gold">{team.sign}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <WaveDivider top="mint" bottom="cream" />

      {/* ============ CTA ============ */}
      <section className="bg-band-cream py-16 md:py-24" id="cta" aria-labelledby="cta-title">
        <div className="container">
          <Reveal>
            {/* Khối cacao đậm: chữ trên nền này luôn sáng ở CẢ hai chế độ nên
                dùng màu trắng cố định, không dùng token ngữ nghĩa. */}
            <div className="hero-brand mx-auto max-w-4xl rounded-3xl px-6 py-14 text-center shadow-soft-xl md:px-12">
              {isAuthed ? (
                <>
                  <h2 id="cta-title" className="font-display text-[clamp(1.7rem,4.4vw,2.6rem)] text-white">
                    Tiếp tục học cùng DingDong nhé!
                  </h2>
                  <p className="mx-auto mt-4 max-w-[56ch] text-lg text-white/85">
                    Quay lại lộ trình của bạn và học tiếp bài tiếng Anh dang dở cùng bạn gấu Ding.
                  </p>
                  <Button asChild size="lg" className="mt-7">
                    <Link href="/dashboard">
                      <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học ngay
                    </Link>
                  </Button>
                  <p className="mt-5 text-sm font-bold text-white/70">
                    Học mọi lúc trên điện thoại · Giữ vững chuỗi ngày học.
                  </p>
                </>
              ) : (
                <>
                  <h2 id="cta-title" className="font-display text-[clamp(1.7rem,4.4vw,2.6rem)] text-white">
                    Cùng DingDong bắt đầu hôm nay nhé!
                  </h2>
                  <p className="mx-auto mt-4 max-w-[56ch] text-lg text-white/85">
                    Tạo tài khoản miễn phí trong 30 giây và học bài tiếng Anh đầu tiên cùng bạn
                    gấu Ding.
                  </p>
                  <Button asChild size="lg" className="mt-7">
                    <Link href="/register">
                      <Rocket className="h-[18px] w-[18px]" aria-hidden="true" /> Đăng ký miễn phí ngay
                    </Link>
                  </Button>
                  <p className="mt-5 text-sm font-bold text-white/70">
                    Không cần thẻ tín dụng · Học mọi lúc trên điện thoại.
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
