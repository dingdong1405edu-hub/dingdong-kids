import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập DingDong Kids bằng tài khoản Google để tiếp tục học tiếng Anh theo lộ trình Cambridge của bạn.",
  alternates: { canonical: "/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
