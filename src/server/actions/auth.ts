"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { CREDENTIALS_LOGIN_ENABLED, MIN_PASSWORD_LENGTH } from "@/lib/auth-flags";
import { isPrimaryAdmin } from "@/lib/admin-emails";

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

const registerSchema = z.object({
  name: z.string().trim().min(1, "Hãy nhập tên của bé.").max(60, "Tên quá dài."),
  email: z.string().trim().toLowerCase().email("Email chưa đúng định dạng."),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `Mật khẩu cần ít nhất ${MIN_PASSWORD_LENGTH} ký tự.`)
    // bcrypt chỉ dùng 72 byte đầu — chặn ở đây cho rõ ràng thay vì âm thầm cắt.
    .max(72, "Mật khẩu quá dài."),
});

export interface RegisterState {
  ok: boolean;
  error?: string;
}

/**
 * Đăng ký bằng email + mật khẩu (dùng để TEST — xem src/lib/auth-flags.ts).
 *
 * Sau khi tạo xong KHÔNG tự đăng nhập ở đây: trang gọi action này sẽ tự `signIn`
 * phía client để Auth.js đặt cookie phiên đúng cách.
 */
export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  if (!CREDENTIALS_LOGIN_ENABLED) {
    return { ok: false, error: "Đăng ký bằng email đang tắt." };
  }

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Thông tin chưa hợp lệ." };
  }
  const { name, email, password } = parsed.data;

  // CHẶN đăng ký công khai bằng email QUẢN TRỊ CHÍNH.
  //
  // Các email này được tự động thăng lên ADMIN khi đăng nhập (xem
  // src/lib/admin-emails.ts). Nếu để đăng ký tự do, người lạ chỉ cần biết địa
  // chỉ email của chủ sở hữu là tạo được tài khoản đó và chiếm luôn quyền quản
  // trị. Tài khoản quản trị chính CHỈ được tạo bằng `npm run db:seed` hoặc
  // `npm run admin:create` — hai đường đều đòi quyền truy cập máy chủ.
  //
  // Báo lỗi chung chung giống hệt trường hợp email đã tồn tại, để không tiết lộ
  // địa chỉ nào là địa chỉ quản trị.
  if (isPrimaryAdmin(email)) {
    console.warn(`[auth] Chặn đăng ký bằng email quản trị chính: ${email}`);
    return { ok: false, error: "Email này đã được đăng ký. Bé hãy đăng nhập nhé." };
  }

  try {
    const existing = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    // Email đã tồn tại → TỪ CHỐI, kể cả khi tài khoản đó chưa có mật khẩu.
    //
    // Cố tình KHÔNG "đặt mật khẩu cho tài khoản chưa có mật khẩu": tài khoản tạo
    // bằng Google không có passwordHash, nếu cho phép đặt thì bất kỳ ai biết địa
    // chỉ Gmail của người khác cũng chiếm được tài khoản đó.
    if (existing) {
      return { ok: false, error: "Email này đã được đăng ký. Bé hãy đăng nhập nhé." };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await db.user.create({
      data: { name, email, passwordHash },
      select: { id: true },
    });
    return { ok: true };
  } catch (err) {
    console.error("[auth] đăng ký thất bại:", err);
    return { ok: false, error: "Không tạo được tài khoản. Vui lòng thử lại." };
  }
}
