// ===========================================================================
//  GIỚI HẠN TẦN SUẤT — chặn chi phí cho các endpoint gọi API TRẢ TIỀN.
//
//  Vì sao cần: mỗi lần bé bấm micro là một lượt Deepgram (nhận dạng) + một lượt
//  Groq (chấm). Một tab để mở với script bấm liên tục, hay đơn giản là bé nghịch
//  bấm micro 500 lần, đều biến thẳng thành hoá đơn. Xác thực đăng nhập KHÔNG
//  chặn được việc này — người dùng thật vẫn tiêu tiền thật.
//
//  Cài đặt: cửa sổ trượt trong BỘ NHỚ tiến trình. Đủ cho triển khai một instance
//  trên Railway. Khi nào chạy nhiều instance thì thay ruột hàm này bằng Redis —
//  nơi gọi không phải sửa gì.
//
//  Lưu ý: giới hạn ở đây đặt RỘNG, chỉ để chặn lạm dụng. Người học thật không
//  bao giờ chạm tới; nếu chạm thì đường xử lý phải NHẸ NHÀNG (gợi ý nghỉ giải
//  lao) chứ không phải màn báo lỗi — người dùng cuối là trẻ 3–5 tuổi.
// ===========================================================================

/** Mốc thời gian các lượt gọi gần đây, theo khoá. */
const hits = new Map<string, number[]>();

/** Dọn rác định kỳ để Map không phình mãi theo số người dùng đã từng gọi. */
let lastSweep = 0;
const SWEEP_EVERY_MS = 5 * 60_000;

function sweep(now: number, windowMs: number) {
  if (now - lastSweep < SWEEP_EVERY_MS) return;
  lastSweep = now;
  for (const [key, times] of hits) {
    const alive = times.filter((t) => now - t < windowMs);
    if (alive.length === 0) hits.delete(key);
    else hits.set(key, alive);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Số lượt còn lại trong cửa sổ hiện tại. */
  remaining: number;
  /** Chờ bao nhiêu giây nữa thì có lượt mới (0 khi còn lượt). */
  retryAfterSec: number;
}

/**
 * Ghi nhận một lượt gọi và cho biết có được phép hay không.
 *
 * @param key      định danh, thường là `"<tên endpoint>:<userId>"`
 * @param limit    số lượt tối đa trong cửa sổ
 * @param windowMs độ dài cửa sổ (ms)
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now, windowMs);

  const times = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (times.length >= limit) {
    hits.set(key, times);
    const oldest = times[0] ?? now;
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }

  times.push(now);
  hits.set(key, times);
  return { ok: true, remaining: limit - times.length, retryAfterSec: 0 };
}
