import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { Provider } from "next-auth/providers";
import { db } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";
import { GOOGLE_LOGIN_ENABLED, CREDENTIALS_LOGIN_ENABLED } from "@/lib/auth-flags";

// Provider được lắp theo CỜ trong src/lib/auth-flags.ts — cùng nguồn với các nút
// trên trang đăng nhập, nên giao diện và server không bao giờ lệch nhau (nút
// hiện mà server không nhận, hoặc ngược lại).
//
// Chiến lược phiên là JWT (xem auth.config.ts). Đây là điều kiện BẮT BUỘC để
// Credentials chạy được: Auth.js KHÔNG hỗ trợ Credentials với phiên lưu trong
// DB. Prisma adapter vẫn giữ để Google (khi bật lại) tự tạo User/Account.
const providers: Provider[] = [];

if (GOOGLE_LOGIN_ENABLED) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // Google đã xác thực quyền sở hữu email nên có thể gắn đăng nhập Google
      // vào tài khoản cùng email đã tồn tại. Thiếu dòng này thì trường hợp đó
      // báo lỗi OAuthAccountNotLinked.
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

if (CREDENTIALS_LOGIN_ENABLED) {
  providers.push(
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(raw) {
        const email = typeof raw?.email === "string" ? raw.email.trim().toLowerCase() : "";
        const password = typeof raw?.password === "string" ? raw.password : "";
        if (!email || !password) return null;

        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            role: true,
            banned: true,
            passwordHash: true,
          },
        });

        // Không tồn tại, hoặc tồn tại nhưng tạo bằng Google (chưa đặt mật khẩu)
        // → từ chối. Vẫn chạy một phép so sánh giả để thời gian phản hồi không
        // tiết lộ email nào đang có trong hệ thống.
        if (!user?.passwordHash) {
          await bcrypt.compare(password, "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidiu");
          return null;
        }
        if (user.banned) return null;
        if (!(await bcrypt.compare(password, user.passwordHash))) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers,
  callbacks: {
    ...authConfig.callbacks,
    // Chặn tài khoản bị khoá hoàn tất đăng nhập.
    //
    // QUAN TRỌNG: phải FAIL-OPEN. Nếu truy vấn DB lỗi (khởi động lạnh, rớt kết
    // nối chốc lát, schema chưa push) thì KHÔNG được chặn đăng nhập — nếu không
    // một lỗi DB thoáng qua sẽ khoá cửa TẤT CẢ mọi người. Thứ duy nhất ta chủ
    // động từ chối là người dùng đã xác nhận `banned`.
    //
    // (Với Credentials, `authorize` ở trên đã kiểm tra `banned` rồi; đây là lớp
    // chặn thứ hai, dành cho Google.)
    async signIn({ user }) {
      if (!user?.email) return true;
      try {
        const existing = await db.user.findUnique({
          where: { email: user.email },
          select: { banned: true },
        });
        if (existing?.banned) return false;
      } catch (err) {
        console.error("[auth] kiểm tra khoá tài khoản lỗi, vẫn cho đăng nhập:", err);
      }
      return true;
    },
  },
});
