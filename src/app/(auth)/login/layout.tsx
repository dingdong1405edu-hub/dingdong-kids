import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập DingDong Kids để tiếp tục học tiếng Anh theo lộ trình Cambridge của bé.",
  alternates: { canonical: "/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
