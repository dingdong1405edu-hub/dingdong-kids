import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { SUPPORT_EMAIL } from "@/lib/site";
import { MarketingNav } from "../_components/marketing-nav";
import { MarketingFooter } from "../_components/marketing-footer";
import styles from "../landing.module.css";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description:
    "Điều khoản sử dụng dịch vụ DingDong HSK: tài khoản, gói trả phí, thanh toán qua PayOS, thời hạn quyền lợi và chính sách hỗ trợ.",
  alternates: { canonical: "/dieu-khoan" },
};

export default async function TermsPage() {
  const session = await auth();

  return (
    <div className={styles.page}>
      <MarketingNav isAuthed={!!session?.user} />

      <main className={styles.legalMain}>
        <h1 className={styles.legalTitle}>Điều khoản sử dụng</h1>
        <p className={styles.legalUpdated}>Cập nhật lần cuối: 03/07/2026</p>

        <div className={styles.legalProse}>
          <p>
            Chào mừng bạn đến với DingDong HSK. Khi tạo tài khoản hoặc sử dụng dịch vụ tại
            dingdonghsk.com, bạn đồng ý với các điều khoản dưới đây. Vui lòng đọc kỹ trước khi sử
            dụng.
          </p>

          <h2>1. Dịch vụ</h2>
          <p>
            DingDong HSK là nền tảng học tiếng Trung trực tuyến dành cho người Việt, gồm các nội
            dung: từ vựng, ngữ pháp, chữ Hán, đọc hiểu, nghe hiểu, viết và luyện nói theo chuẩn HSK
            1–6 và HSKK. Một số bài viết và bài nói được chấm bằng công nghệ trí tuệ nhân tạo (AI);
            kết quả chấm mang tính tham khảo cho việc luyện tập, không thay thế kết quả thi chính
            thức của bất kỳ kỳ thi nào.
          </p>

          <h2>2. Tài khoản</h2>
          <ul>
            <li>Bạn đăng nhập bằng tài khoản Google; tài khoản DingDong HSK được tạo tự động ở lần đăng nhập đầu tiên.</li>
            <li>Bạn chịu trách nhiệm bảo mật tài khoản Google của mình và mọi hoạt động thực hiện bằng tài khoản đó.</li>
            <li>Mỗi tài khoản dành cho một người học; không chia sẻ tài khoản trả phí cho nhiều người dùng chung.</li>
          </ul>

          <h2>3. Gói miễn phí và gói trả phí</h2>
          <ul>
            <li>Người dùng miễn phí được học một số bài đầu của mỗi cấp lộ trình và dùng các tính năng luyện tập theo cơ chế tim (hết tim cần chờ hồi).</li>
            <li>
              Gói trả phí gồm <strong>Gói Lộ trình</strong> (mở khóa toàn bộ lộ trình một cấp HSK,
              thời hạn 6 tháng) và <strong>Gói Tự do</strong> (mọi tính năng ngoài lộ trình, thời
              hạn theo gói). Quyền lợi chi tiết và giá niêm yết tại trang{" "}
              <Link href="/payment">Bảng giá</Link>.
            </li>
            <li>Mọi gói trả phí còn hạn đều được sử dụng tim không giới hạn.</li>
            <li>
              Gói <strong>không tự động gia hạn</strong>. Khi hết hạn, tài khoản trở về chế độ miễn
              phí; toàn bộ tiến độ học của bạn được giữ nguyên.
            </li>
          </ul>

          <h2>4. Thanh toán</h2>
          <ul>
            <li>Thanh toán được xử lý qua cổng PayOS (quét mã QR hoặc chuyển khoản ngân hàng). DingDong HSK không thu thập và không lưu trữ thông tin thẻ hay tài khoản ngân hàng của bạn.</li>
            <li>Quyền lợi được kích hoạt tự động ngay khi cổng thanh toán xác nhận giao dịch thành công.</li>
            <li>Việc mua gói yêu cầu đăng nhập, vì quyền lợi gắn với tài khoản của bạn.</li>
          </ul>

          <h2>5. Hoàn tiền</h2>
          <p>
            Nếu bạn đã thanh toán thành công nhưng quyền lợi không được kích hoạt, hoặc gặp lỗi kỹ
            thuật khiến không sử dụng được dịch vụ, hãy liên hệ{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> trong vòng 7 ngày kể từ ngày
            thanh toán. Chúng tôi sẽ kiểm tra và xử lý kích hoạt lại hoặc hoàn tiền theo từng trường
            hợp cụ thể.
          </p>

          <h2>6. Sở hữu trí tuệ</h2>
          <p>
            Toàn bộ nội dung bài học, đề luyện, hình ảnh, linh vật và phần mềm trên DingDong HSK
            thuộc quyền sở hữu của DingDong HSK. Bạn được sử dụng cho mục đích học tập cá nhân;
            không sao chép, phân phối lại hoặc khai thác thương mại khi chưa có sự đồng ý bằng văn
            bản.
          </p>

          <h2>7. Hành vi không được phép</h2>
          <ul>
            <li>Can thiệp, phá hoại hệ thống hoặc truy cập trái phép dữ liệu của người dùng khác.</li>
            <li>Sử dụng công cụ tự động để thu thập nội dung hoặc gian lận điểm số, phần thưởng.</li>
            <li>Đăng nội dung vi phạm pháp luật hoặc xúc phạm người khác trong các khu vực cộng đồng.</li>
          </ul>
          <p>Tài khoản vi phạm có thể bị tạm khóa hoặc chấm dứt mà không hoàn phí.</p>

          <h2>8. Giới hạn trách nhiệm</h2>
          <p>
            DingDong HSK nỗ lực duy trì dịch vụ ổn định và nội dung chính xác, nhưng không cam kết
            dịch vụ không bao giờ gián đoạn hay không có sai sót. Trong mọi trường hợp, trách nhiệm
            của DingDong HSK không vượt quá số tiền bạn đã thanh toán cho gói đang sử dụng.
          </p>

          <h2>9. Thay đổi điều khoản</h2>
          <p>
            Chúng tôi có thể cập nhật điều khoản này khi dịch vụ thay đổi. Bản mới nhất luôn được
            đăng tại trang này kèm ngày cập nhật; việc tiếp tục sử dụng dịch vụ sau khi cập nhật
            đồng nghĩa bạn chấp nhận điều khoản mới.
          </p>

          <h2>10. Liên hệ</h2>
          <p>
            Mọi câu hỏi về điều khoản sử dụng, vui lòng gửi về{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Xem thêm{" "}
            <Link href="/chinh-sach">Chính sách bảo mật</Link> để biết cách chúng tôi xử lý dữ liệu
            của bạn.
          </p>
        </div>
      </main>

      <MarketingFooter isAuthed={!!session?.user} />
    </div>
  );
}
