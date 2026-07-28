"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ambient } from "@/components/motion/ambient";
import { Logo } from "@/components/shared/logo";
import { AuthError } from "@/components/auth/auth-error";
import { GOOGLE_LOGIN_ENABLED, CREDENTIALS_LOGIN_ENABLED } from "@/lib/auth-flags";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleGoogle() {
    setLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  }

  async function handleCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    // `redirect: false` để tự xử lý lỗi tại chỗ thay vì bị đá về /login?error=…
    // Auth.js gộp MỌI lỗi Credentials thành "CredentialsSignin" nên trang lỗi
    // chung không nói được gì hữu ích.
    const res = await signIn("credentials", {
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
      redirect: false,
    });

    if (res?.error) {
      setError("Email hoặc mật khẩu chưa đúng.");
      setPending(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 aurora-bg" />
      <Ambient />
      <div className="animate-fade-up relative w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-11 w-11" />
            <span className="font-display text-lg font-extrabold tracking-tight">
              DingDong <span className="text-primary">Kids</span>
            </span>
          </Link>
        </div>

        <Card className="border-border/60 shadow-soft-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl font-extrabold">Chào mừng trở lại 👋</CardTitle>
            <CardDescription>Đăng nhập để tiếp tục học tiếng Anh</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthError />

            {CREDENTIALS_LOGIN_ENABLED && (
              <form onSubmit={handleCredentials} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="ten@email.com"
                    required
                    disabled={pending}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    disabled={pending}
                  />
                </div>

                {error && (
                  <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <Button type="submit" className="btn-chunky h-12 w-full text-[15px]" disabled={pending}>
                  {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {pending ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>
            )}

            {CREDENTIALS_LOGIN_ENABLED && GOOGLE_LOGIN_ENABLED && (
              <div className="my-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">hoặc</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            )}

            {GOOGLE_LOGIN_ENABLED && (
              <Button
                type="button"
                variant={CREDENTIALS_LOGIN_ENABLED ? "outline" : "default"}
                className="h-12 w-full text-[15px]"
                disabled={loading}
                onClick={handleGoogle}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {loading ? "Đang chuyển tới Google..." : "Đăng nhập với Google"}
              </Button>
            )}

            {CREDENTIALS_LOGIN_ENABLED && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Chưa có tài khoản?{" "}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                  Đăng ký ngay
                </Link>
              </p>
            )}

            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              Bằng việc tiếp tục, bạn đồng ý với{" "}
              <Link href="/dieu-khoan" className="underline hover:text-foreground">
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link href="/chinh-sach" className="underline hover:text-foreground">
                Chính sách bảo mật
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            ← Về trang chủ
          </Link>
        </p>
      </div>
    </div>
  );
}
