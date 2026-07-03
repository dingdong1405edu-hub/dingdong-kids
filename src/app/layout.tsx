import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  // metadataBase để Next resolve canonical/og:image tương đối về domain thật
  // (thiếu nó, canonical trên Railway sẽ trỏ về localhost).
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DingDong HSK — Học tiếng Trung chuẩn HSK cho người Việt",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Nền tảng học tiếng Trung chuẩn HSK 1–6 cho người Việt: từ vựng, ngữ pháp, chữ Hán, đọc, nghe, viết, nói và luyện thi HSKK, có AI chấm điểm từng bài.",
  keywords: ["học tiếng Trung", "học tiếng Trung online", "HSK", "HSKK", "luyện thi HSK", "DingDong HSK"],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "vi_VN",
    images: [{ url: "/bao-cover.png", width: 1376, height: 768, alt: "DingDong HSK — Học tiếng Trung chuẩn HSK" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/bao-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Khai báo hỗ trợ cả 2 giao diện để trình duyệt KHÔNG tự "bôi đen" trang.
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1118" },
  ],
};

/**
 * Chạy TRƯỚC khi trình duyệt vẽ: đặt class `.dark` + `color-scheme` theo lựa
 * chọn đã lưu (hoặc cài đặt thiết bị) để tránh nhấp nháy (FOUC) và chặn trình
 * duyệt tự động đảo màu. Key phải trùng THEME_STORAGE_KEY trong theme-provider.
 */
const themeScript = `(function(){try{var k='dingdong-theme';var s=localStorage.getItem(k);if(s!=='light'&&s!=='dark'&&s!=='system')s='system';var d=s==='dark'||(s==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;if(d)r.classList.add('dark');r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" theme="system" />
      </body>
    </html>
  );
}
