// ===========================================================================
//  ADMIN CHÍNH — danh sách email luôn có quyền quản trị.
//
//  Đặt biến môi trường `ADMIN_EMAILS` (nhiều email cách nhau bằng dấu phẩy):
//      ADMIN_EMAILS="dingdong1405edu@gmail.com"
//
//  Email trong danh sách này được TỰ ĐỘNG thăng lên ADMIN ngay khi đăng nhập —
//  bằng Google hay bằng email/mật khẩu đều được.
//
//  VÌ SAO LÀM THẾ NÀY thay vì chỉ tạo sẵn một tài khoản trong DB:
//   • Không phải cất mật khẩu quản trị trong biến môi trường mãi mãi.
//   • Sống sót qua việc reset/đổi database — deploy DB mới vẫn vào được ngay.
//   • Không bao giờ bị "khoá ngoài": lỡ ai đó hạ quyền chủ sở hữu ở /admin/users
//     thì lần đăng nhập kế tiếp quyền tự được trả lại.
//   • Dùng chung một cơ chế cho cả hai cách đăng nhập.
//
//  Đây là quyền CAO NHẤT và chỉ chủ sở hữu hạ tầng mới đặt được (ai sửa được
//  biến môi trường thì cũng đã kiểm soát toàn bộ máy chủ rồi). Cấp quyền cho
//  quản trị viên phụ thì làm ở /admin/users, đừng nhét thêm vào đây.
// ===========================================================================

/** Email quản trị chính, đã chuẩn hoá về chữ thường. */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** Email này có phải quản trị chính không? */
export function isPrimaryAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.trim().toLowerCase());
}
