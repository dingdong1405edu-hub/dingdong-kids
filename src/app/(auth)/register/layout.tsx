import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký miễn phí",
  description: "Tạo tài khoản DingDong HSK miễn phí trong 30 giây bằng Google và bắt đầu bài học tiếng Trung đầu tiên.",
  alternates: { canonical: "/register" },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
