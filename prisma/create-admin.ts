/**
 * Tạo (hoặc cập nhật) một tài khoản QUẢN TRỊ đăng nhập bằng email + mật khẩu.
 *
 *   npm run admin:create -- ban@example.com 'MatKhauCuaBan'
 *
 * Hoặc dùng biến môi trường (tiện cho CI / Railway shell):
 *   SEED_ADMIN_EMAIL=... SEED_ADMIN_PASSWORD=... npm run admin:create
 *
 * Chạy lại với cùng email = ĐỔI MẬT KHẨU cho tài khoản đó. Không đụng tới XP,
 * tim, streak hay tiến độ học — nên dùng được cả khi lỡ quên mật khẩu.
 *
 * Tách khỏi `prisma/seed.ts` có chủ đích: seed chạy tự động mỗi lần deploy, còn
 * việc tạo tài khoản quản trị phải là hành động CÓ CHỦ Ý của con người.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const MIN_PASSWORD_LENGTH = 8;

function usage(msg: string): never {
  console.error(`\n❌ ${msg}\n`);
  console.error("Cách dùng:");
  console.error("  npm run admin:create -- <email> '<mật khẩu>'");
  console.error("  SEED_ADMIN_EMAIL=... SEED_ADMIN_PASSWORD=... npm run admin:create\n");
  process.exit(1);
}

async function main(): Promise<void> {
  // `npm run x -- a b` → process.argv = [node, script, "a", "b"]
  const [argEmail, argPassword] = process.argv.slice(2);
  const email = (argEmail ?? process.env.SEED_ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = argPassword ?? process.env.SEED_ADMIN_PASSWORD ?? "";

  if (!email) usage("Thiếu email.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) usage(`Email không hợp lệ: ${email}`);
  if (!password) usage("Thiếu mật khẩu.");
  if (password.length < MIN_PASSWORD_LENGTH) {
    usage(`Mật khẩu cần ít nhất ${MIN_PASSWORD_LENGTH} ký tự (đang ${password.length}).`);
  }
  if (!process.env.DATABASE_URL) {
    usage("Chưa có DATABASE_URL. Tạo .env.local rồi điền chuỗi kết nối Postgres.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true },
  });

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", banned: false },
    create: { email, name: "Quản trị viên", passwordHash, role: "ADMIN" },
    select: { id: true, email: true, role: true },
  });

  console.log(
    existing
      ? `\n✅ Đã CẬP NHẬT mật khẩu cho tài khoản sẵn có (vai trò cũ: ${existing.role} → ADMIN)`
      : "\n✅ Đã TẠO tài khoản quản trị mới",
  );
  console.log(`   Email : ${user.email}`);
  console.log(`   Vai trò: ${user.role}`);
  console.log(`   ID    : ${user.id}`);
  console.log("\n   Đăng nhập ở /login, vào trang quản trị ở /admin\n");
}

main()
  .catch((e: unknown) => {
    console.error("\n❌ Không tạo được tài khoản:", e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
