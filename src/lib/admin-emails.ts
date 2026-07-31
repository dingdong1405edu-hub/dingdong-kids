// ===========================================================================
//  QUẢN TRỊ CHÍNH — danh sách email luôn có quyền quản trị.
//
//  Gồm email chủ sở hữu ghi cứng trong mã nguồn, CỘNG thêm bất kỳ email nào đặt
//  trong biến môi trường `ADMIN_EMAILS` (nhiều email cách nhau bằng dấu phẩy).
//  Ghi cứng chủ sở hữu để dự án KHÔNG BAO GIỜ rơi vào cảnh không ai vào được
//  trang quản trị chỉ vì quên đặt một biến môi trường.
//
//  Email trong danh sách này được TỰ ĐỘNG thăng lên ADMIN ngay khi đăng nhập —
//  bằng Google hay bằng email/mật khẩu đều được (xem src/lib/auth.ts).
//
//  ⚠️ AN TOÀN — hai quy tắc bắt buộc, đừng nới:
//   1. KHÔNG cho đăng ký công khai bằng các email này (xem registerAction trong
//      src/server/actions/auth.ts). Nếu không, người lạ chỉ cần vào /register gõ
//      đúng địa chỉ là chiếm được quyền quản trị.
//   2. Tài khoản quản trị chính chỉ được tạo bằng `npm run db:seed` hoặc
//      `npm run admin:create` — hai đường đều đòi quyền truy cập máy chủ.
//
//  Quản trị viên PHỤ thì cấp ở /admin/users, đừng thêm vào đây.
// ===========================================================================

/** Chủ sở hữu dự án — luôn là quản trị viên, không phụ thuộc cấu hình. */
const OWNER_EMAILS = ["dingdong1405edu@gmail.com"];

/** Email quản trị chính, đã chuẩn hoá về chữ thường, không trùng lặp. */
export function getAdminEmails(): string[] {
  const fromEnv = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return [...new Set([...OWNER_EMAILS, ...fromEnv])];
}

/** Email này có phải quản trị chính không? */
export function isPrimaryAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.trim().toLowerCase());
}
