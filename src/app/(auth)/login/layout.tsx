import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập DingDong HSK bằng tài khoản Google để tiếp tục học tiếng Trung theo lộ trình HSK của bạn.",
  alternates: { canonical: "/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
