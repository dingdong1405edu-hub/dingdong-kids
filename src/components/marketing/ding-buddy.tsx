import styles from "./ding-buddy.module.css";
import { DingArt, type DingPose } from "./ding-art";

/**
 * DingBuddy — linh vật gấu con kích thước nhỏ, thuần CSS (không theo dõi con trỏ,
 * không hook → an toàn trong cả Server lẫn Client Component). Dùng để rải Ding quanh
 * app cho sinh động: lời chào, empty state, màn "vừa làm xong bài".
 *
 * Tư thế (pose):
 * - idle:  cười nhẹ + chớp mắt + nổi bồng bềnh (mặc định).
 * - wave:  vẫy tay chào — dành cho lời chào.
 * - cheer / proud: cười mở + lấp lánh + nảy lên — dành cho màn chúc mừng/kết quả.
 * - think: nghiêng đầu, tay lên cằm — dành cho lúc "đang xử lý".
 * - sad:   mếu nhẹ — dành cho kết quả chưa đạt / động viên.
 */
export function DingBuddy({
  size = 88,
  pose = "idle",
  message,
  className,
  "aria-label": ariaLabel,
}: {
  size?: number;
  pose?: DingPose;
  message?: string | null;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      className={`${styles.wrap}${className ? ` ${className}` : ""}`}
      style={{ "--ding-size": `${size}px` } as React.CSSProperties}
      role="img"
      aria-label={ariaLabel ?? "Linh vật gấu Ding"}
    >
      {message ? <div className={styles.bubble}>{message}</div> : null}
      <DingArt pose={pose} />
    </div>
  );
}
