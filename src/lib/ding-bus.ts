/**
 * Ding bus — kênh sự kiện cực nhẹ để mọi luồng học "ra hiệu" cho linh vật Ding
 * (chú gấu con) phản ứng (đúng/sai/hoàn thành/đang chấm…) mà KHÔNG phải truyền
 * prop xuyên nhiều tầng.
 *
 * Cơ chế: phát/nhận qua `window` CustomEvent. An toàn SSR (mọi hàm tự bỏ qua khi
 * không có `window`). Ding companion nổi ở góc màn hình (xem ding-companion.tsx)
 * là nơi lắng nghe chính; bất kỳ component nào cũng có thể `emitDing(...)`.
 */

export type DingReaction =
  | "correct" // trả lời đúng → nảy lên, mặt vui
  | "wrong" // trả lời chưa đúng → nghiêng đầu, động viên thử lại
  | "complete" // xong một bài/phần → reo nhẹ
  | "celebrate" // hoàn thành lớn (đạt điểm cao) → reo + lấp lánh
  | "streak" // giữ chuỗi / cột mốc → tự hào
  | "heartGift" // được tặng tim → tự hào
  | "heartLost" // mất tim → buồn/lo
  | "thinking" // AI đang chấm → suy nghĩ
  | "wave"; // chào hỏi

export interface DingSignal {
  reaction: DingReaction;
  /** Lời thoại ngắn hiện trên bong bóng (tuỳ chọn). */
  message?: string;
}

const EVENT = "ding:react";

/** Phát một tín hiệu cho Ding. Gọi được từ bất kỳ đâu phía client. */
export function emitDing(reaction: DingReaction, message?: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<DingSignal>(EVENT, { detail: { reaction, message } }),
  );
}

/** Đăng ký nhận tín hiệu Ding. Trả về hàm huỷ đăng ký. */
export function onDing(handler: (signal: DingSignal) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<DingSignal>).detail;
    if (detail) handler(detail);
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
