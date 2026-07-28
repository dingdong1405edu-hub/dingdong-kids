import styles from "./ding-buddy.module.css";

/** Các tư thế của linh vật Ding. */
export type DingPose = "idle" | "cheer" | "wave" | "think" | "sad" | "proud";

/**
 * DingArt — phần "vẽ" thuần CSS/SVG của linh vật **Ding**, chú gấu con màu vàng
 * mật của DingDong Kids. Tách riêng để dùng lại ở DingBuddy (trang trí,
 * server-safe) và DingCompanion (bong bóng nổi có tương tác). Không state,
 * không hook → đặt được ở mọi nơi, kể cả Server Component.
 *
 * Kích thước điều khiển bằng biến CSS `--ding-size` đặt ở phần tử cha.
 */
export function DingArt({
  pose = "idle",
  className,
}: {
  pose?: DingPose;
  className?: string;
}) {
  const poseClass = styles[pose] ?? styles.idle;
  const open = pose === "cheer" || pose === "proud";

  return (
    <div className={`${styles.stage} ${poseClass}${className ? ` ${className}` : ""}`}>
      {open && (
        <>
          <div className={`${styles.spark} ${styles.s1}`} />
          <div className={`${styles.spark} ${styles.s2}`} />
          <div className={`${styles.spark} ${styles.s3}`} />
          <div className={`${styles.spark} ${styles.s4}`} />
        </>
      )}

      <div className={styles.ground} />

      <div className={styles.bob}>
        <div className={`${styles.arm} ${styles.l}`} />
        <div className={`${styles.arm} ${styles.r}`} />

        <svg className={styles.bodySvg} viewBox="0 0 300 300" aria-hidden="true">
          {/* Tai — vẽ TRƯỚC thân để viền tai nằm dưới, trông liền khối */}
          <circle className={styles.ear} cx="76" cy="84" r="36" />
          <circle className={styles.ear} cx="224" cy="84" r="36" />
          <circle className={styles.earInner} cx="76" cy="84" r="17" />
          <circle className={styles.earInner} cx="224" cy="84" r="17" />

          {/* Thân/đầu tròn */}
          <path
            className={styles.body}
            d="M52,162 C52,92 95,62 150,62 C205,62 248,92 248,162 C248,228 205,252 150,252 C95,252 52,228 52,162 Z"
          />

          {/* Mõm sáng màu — chỗ đặt mũi và miệng */}
          <ellipse className={styles.muzzle} cx="150" cy="196" rx="58" ry="42" />

          {/* Mũi */}
          <path
            className={styles.nose}
            d="M133,175 C133,166 167,166 167,175 C167,185 156,192 150,192 C144,192 133,185 133,175 Z"
          />

          {/* Đốm sáng cho khối tròn */}
          <ellipse
            className={styles.hi}
            cx="103"
            cy="112"
            rx="24"
            ry="16"
            transform="rotate(-22 103 112)"
          />
        </svg>

        <div className={styles.face}>
          <div className={`${styles.eye} ${styles.l}`} />
          <div className={`${styles.eye} ${styles.r}`} />
          <div className={`${styles.cheek} ${styles.l}`} />
          <div className={`${styles.cheek} ${styles.r}`} />
          {open ? (
            <div className={styles.mouthOpen}>
              <div className={styles.tongue} />
            </div>
          ) : pose === "sad" ? (
            <div className={styles.frown} />
          ) : (
            <div className={styles.smile} />
          )}
        </div>
      </div>
    </div>
  );
}
