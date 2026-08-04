"use client";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ambient } from "@/components/motion/ambient";
import { Logo, Wordmark } from "@/components/shared/logo";
import { AuthError } from "@/components/auth/auth-error";
import { registerAction, type RegisterState } from "@/server/actions/auth";
import {
  GOOGLE_LOGIN_ENABLED,
  CREDENTIALS_LOGIN_ENABLED,
  MIN_PASSWORD_LENGTH,
} from "@/lib/auth-flags";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [creds, setCreds] = useState<{ email: string; password: string } | null>(null);

  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    registerAction,
    { ok: false },
  );

  function handleGoogle() {
    setLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  }

  // Tạo tài khoản xong thì đăng nhập luôn cho bé, khỏi phải gõ lại.
  // Phải làm ở client (không làm trong server action) để Auth.js đặt được cookie
  // phiên qua đúng luồng của nó.
  useEffect(() => {
    if (!state.ok || !creds || signingIn) return;
    setSigningIn(true);
    void (async () => {
      const res = await signIn("credentials", { ...creds, redirect: false });
      if (res?.error) {
        // Tài khoản đã tạo thành công nhưng đăng nhập tự động hỏng — đẩy sang
        // trang đăng nhập thay vì để bé mắc kẹt ở màn hình trắng.
        router.push("/login");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    })();
  }, [state.ok, creds, signingIn, router]);

  const busy = pending || signingIn;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="absolute inset-0 aurora-bg" />
      <Ambient />

      {/* Chữ cái & bong bóng bay quanh thẻ đăng ký — cùng ngôn ngữ trang trí với
          trang đăng nhập để hai trang cảm giác là một chỗ. */}
      <div className="deco" aria-hidden="true">
        <b className="left-[8%] top-[18%] text-[4rem] text-brand-pink/25 [--rot:11deg]">g</b>
        <b className="right-[8%] top-[13%] text-[4.5rem] text-brand-sun/25 [--rot:-13deg] [animation-delay:-4s]">D</b>
        <b className="bottom-[14%] left-[13%] text-[3.2rem] text-brand-grape/22 [--rot:-7deg] [animation-delay:-7s]">o</b>
        <b className="bottom-[20%] right-[12%] text-[3.6rem] text-brand-teal/25 [--rot:9deg] [animation-delay:-2s]">K</b>
        <s className="left-[15%] top-[58%] h-28 w-28 bg-brand-lime/22" />
        <s className="right-[18%] top-[70%] h-24 w-24 bg-brand-coral/20 [animation-delay:-6s]" />
      </div>

      <div className="animate-fade-up relative z-10 w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link href="/" className="flex flex-col items-center gap-2">
            {/* Gấu Ding nhún nhẹ như đang vẫy chào bé */}
            <Logo className="h-20 w-20 animate-bob drop-shadow-[0_8px_0_hsl(var(--shadow-hue)/0.12)]" />
            <Wordmark className="text-[1.4rem]" />
          </Link>
        </div>

        <Card className="rounded-2xl border-2 border-border shadow-soft-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl font-extrabold">Tạo tài khoản 🎈</CardTitle>
            <CardDescription>Bắt đầu hành trình học tiếng Anh của bé</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthError />

            {CREDENTIALS_LOGIN_ENABLED && (
              <form
                action={formAction}
                onSubmit={(e) => {
                  // Giữ lại email/mật khẩu để tự đăng nhập sau khi tạo xong.
                  const fd = new FormData(e.currentTarget);
                  setCreds({
                    email: String(fd.get("email") ?? ""),
                    password: String(fd.get("password") ?? ""),
                  });
                }}
                className="space-y-3"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="name">Tên của bé</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Bé Mai"
                    required
                    disabled={busy}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="ten@email.com"
                    required
                    disabled={busy}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    minLength={MIN_PASSWORD_LENGTH}
                    required
                    disabled={busy}
                  />
                  <p className="text-xs text-muted-foreground">
                    Ít nhất {MIN_PASSWORD_LENGTH} ký tự.
                  </p>
                </div>

                {state.error && (
                  <p
                    role="alert"
                    className="rounded-xl border-2 border-destructive/40 bg-band-coral px-3.5 py-2.5 text-sm font-bold text-brand-coral"
                  >
                    {state.error}
                  </p>
                )}

                {/* Hồng kẹo: đăng ký là hành động vui nhất trang, nổi hơn nút vàng thường. */}
                <Button type="submit" variant="candy" className="mt-1 w-full text-[1.05rem]" disabled={busy}>
                  {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {signingIn ? "Đang đăng nhập..." : pending ? "Đang tạo tài khoản..." : "Đăng ký"}
                </Button>
              </form>
            )}

            {CREDENTIALS_LOGIN_ENABLED && GOOGLE_LOGIN_ENABLED && (
              <div className="my-5 flex items-center gap-3">
                <span className="h-0.5 flex-1 rounded-full bg-border" />
                <span className="eyebrow text-muted-foreground">hoặc</span>
                <span className="h-0.5 flex-1 rounded-full bg-border" />
              </div>
            )}

            {GOOGLE_LOGIN_ENABLED && (
              <Button
                type="button"
                variant={CREDENTIALS_LOGIN_ENABLED ? "outline" : "default"}
                className="w-full text-[1.02rem]"
                disabled={loading}
                onClick={handleGoogle}
              >
                <svg className="mr-1 h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {loading ? "Đang chuyển tới Google..." : "Đăng ký với Google"}
              </Button>
            )}

            {CREDENTIALS_LOGIN_ENABLED && (
              <p className="mt-5 text-center text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link href="/login" className="font-display font-extrabold text-brand-gold hover:underline">
                  Đăng nhập
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
              . Trẻ dưới 13 tuổi cần có phụ huynh đồng ý.
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-card/70 px-4 py-2 font-display font-extrabold transition-colors hover:bg-card hover:text-foreground"
          >
            ← Về trang chủ
          </Link>
        </p>
      </div>
    </div>
  );
}
