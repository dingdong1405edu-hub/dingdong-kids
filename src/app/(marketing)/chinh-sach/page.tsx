import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { SUPPORT_EMAIL } from "@/lib/site";
import { MarketingNav } from "../_components/marketing-nav";
import { MarketingFooter } from "../_components/marketing-footer";
import styles from "../landing.module.css";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description:
    "Chính sách bảo mật của DingDong Kids: dữ liệu được thu thập, mục đích sử dụng, lưu trữ, chia sẻ với bên xử lý và quyền của người dùng.",
  alternates: { canonical: "/chinh-sach" },
};

export default async function PrivacyPage() {
  const session = await auth();

  return (
    <div className={styles.page}>
      <MarketingNav isAuthed={!!session?.user} />

      <main className={styles.legalMain}>
        <h1 className={styles.legalTitle}>Chính sách bảo mật</h1>
        <p className={styles.legalUpdated}>Cập nhật lần cuối: 03/07/2026</p>

        <div className={styles.legalProse}>
          <p>
            DingDong Kids tôn trọng quyền riêng tư của bạn. Chính sách này giải thích chúng tôi thu
            thập những dữ liệu gì, dùng vào việc gì và bạn có những quyền nào đối với dữ liệu của
            mình.
          </p>

          <h2>1. Dữ liệu chúng tôi thu thập</h2>
          <ul>
            <li>
              <strong>Thông tin tài khoản:</strong> khi bạn đăng ký bằng email, chúng tôi lưu tên hiển thị, địa chỉ email và mật khẩu đã mã hoá (bcrypt — không lưu mật khẩu gốc). Khi bạn đăng nhập bằng Google, chúng tôi nhận
              tên hiển thị, địa chỉ email và ảnh đại diện từ tài khoản Google của bạn. Chúng tôi
              không nhận và không lưu mật khẩu Google.
            </li>
            <li>
              <strong>Dữ liệu học tập:</strong> tiến độ bài học, điểm số, XP, chuỗi ngày học, bài
              viết luận và bản ghi âm luyện nói bạn gửi để chấm điểm.
            </li>
            <li>
              <strong>Dữ liệu thanh toán:</strong> tên, email người mua và trạng thái giao dịch do
              cổng PayOS thông báo. Thông tin thẻ/tài khoản ngân hàng được xử lý hoàn toàn bởi
              PayOS, không đi qua và không được lưu trên hệ thống của chúng tôi.
            </li>
            <li>
              <strong>Tùy chọn giao diện:</strong> lựa chọn giao diện sáng/tối được lưu ngay trên
              trình duyệt của bạn (localStorage). Phiên đăng nhập dùng cookie bắt buộc để duy trì
              trạng thái đăng nhập.
            </li>
          </ul>

          <h2>2. Mục đích sử dụng</h2>
          <ul>
            <li>Cung cấp và cá nhân hóa trải nghiệm học: lưu tiến độ, gợi ý bài học, thống kê kết quả.</li>
            <li>Vận hành các tính năng dùng AI: nội dung bạn gửi cho các tính năng này (bài viết luận, bản ghi âm luyện nói, tin nhắn với trợ lý học tập, từ cần tra nghĩa) được chuyển tới nhà cung cấp dịch vụ AI (xử lý văn bản và nhận dạng giọng nói) để phân tích và trả kết quả.</li>
            <li>Kích hoạt quyền lợi gói trả phí và hỗ trợ đối soát giao dịch.</li>
            <li>Liên hệ hỗ trợ khi bạn gửi góp ý hoặc yêu cầu trợ giúp.</li>
          </ul>
          <p>Chúng tôi không bán dữ liệu cá nhân của bạn cho bên thứ ba, và không dùng dữ liệu của bạn cho quảng cáo.</p>

          <h2>3. Lưu trữ và bảo vệ</h2>
          <p>
            Dữ liệu được lưu trên hạ tầng đám mây có kiểm soát truy cập; kết nối giữa trình duyệt
            và máy chủ được mã hóa qua HTTPS. Chỉ quản trị viên được cấp quyền mới truy cập được dữ
            liệu vận hành, phục vụ mục đích hỗ trợ người dùng.
          </p>

          <h2>4. Chia sẻ với bên xử lý dữ liệu</h2>
          <ul>
            <li><strong>Google:</strong> xác thực đăng nhập (OAuth).</li>
            <li><strong>PayOS:</strong> xử lý thanh toán.</li>
            <li><strong>Nhà cung cấp dịch vụ AI:</strong> xử lý nội dung bài làm, hội thoại với trợ lý học tập và yêu cầu tra từ.</li>
          </ul>
          <p>Các bên trên chỉ nhận phần dữ liệu cần thiết cho đúng chức năng của họ.</p>

          <h2>5. Quyền của bạn</h2>
          <ul>
            <li>Xem và cập nhật thông tin hồ sơ trong phần cài đặt tài khoản.</li>
            <li>
              Yêu cầu xóa tài khoản cùng toàn bộ dữ liệu học tập bằng cách gửi email tới{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> từ địa chỉ email đã đăng ký.
              Chúng tôi xử lý trong vòng 30 ngày.
            </li>
            <li>Yêu cầu trích xuất dữ liệu học tập của bạn qua cùng địa chỉ email.</li>
          </ul>

          <h2>6. Trẻ em</h2>
          <p>
            Dịch vụ hướng tới người học từ 13 tuổi trở lên. Nếu bạn là phụ huynh và cho rằng con
            mình đã cung cấp dữ liệu cá nhân cho chúng tôi khi chưa đủ tuổi, hãy liên hệ để được hỗ
            trợ xóa.
          </p>

          <h2>7. Thay đổi chính sách</h2>
          <p>
            Khi chính sách thay đổi, bản mới nhất sẽ được đăng tại trang này kèm ngày cập nhật.
            Thay đổi quan trọng sẽ được thông báo trên trang chủ hoặc qua email.
          </p>

          <h2>8. Liên hệ</h2>
          <p>
            Mọi câu hỏi về quyền riêng tư, vui lòng gửi về{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Xem thêm{" "}
            <Link href="/dieu-khoan">Điều khoản sử dụng</Link>.
          </p>
        </div>
      </main>

      <MarketingFooter isAuthed={!!session?.user} />
    </div>
  );
}
