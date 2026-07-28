// ===========================================================================
//  BẬT / TẮT CÁC CÁCH ĐĂNG NHẬP
//
//  Dùng được ở CẢ server (src/lib/auth.ts) lẫn client (trang login/register) —
//  chỉ là hằng số boolean, không import gì nặng.
//
//  ĐỔI Ở ĐÂY LÀ ĐỔI TOÀN BỘ: nút trên giao diện và provider phía server đều
//  đọc chung hai cờ này, nên không bao giờ lệch nhau (nút hiện mà server không
//  nhận, hoặc ngược lại).
// ===========================================================================

/**
 * Đăng nhập bằng Google.
 *
 * 👉 ĐANG TẮT TẠM THỜI theo yêu cầu — bật lại chỉ cần đổi thành `true`
 *    (nhớ có sẵn AUTH_GOOGLE_ID + AUTH_GOOGLE_SECRET trong .env).
 */
export const GOOGLE_LOGIN_ENABLED = false;

/**
 * Đăng nhập bằng email + mật khẩu.
 *
 * ⚠️ Bật để TEST. Trước khi mở bán thật nên cân nhắc tắt lại và chỉ dùng
 *    Google: nền tảng cho trẻ em thì càng ít mật khẩu tự quản càng an toàn,
 *    và Google đã xác thực sẵn quyền sở hữu email.
 */
export const CREDENTIALS_LOGIN_ENABLED = true;

/** Độ dài mật khẩu tối thiểu khi đăng ký bằng email. */
export const MIN_PASSWORD_LENGTH = 8;
