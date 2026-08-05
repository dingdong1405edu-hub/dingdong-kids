"use client";
// ===========================================================================
//  TRÌNH CHƠI YOUTUBE ĐIỀU KHIỂN ĐƯỢC — hook dùng chung cho khu "Xem hoạt hình"
//  và cho studio bắt mốc thời gian ở /admin/hoat-hinh.
//
//  Việc DUY NHẤT hook này tồn tại để làm: phát ĐÚNG MỘT ĐOẠN [start, end] rồi
//  tự dừng. YouTube KHÔNG có sự kiện "chạy tới giây X thì báo" — cách chuẩn là
//  tự đọc `getCurrentTime()` liên tục và dừng khi tới nơi. Ở đây dùng
//  requestAnimationFrame (theo nhịp khung hình, mượt hơn setInterval và tự ngủ
//  khi tab bị ẩn — lúc đó video cũng đứng nên không lệch).
//
//  Những chỗ dễ sai đã xử lý sẵn:
//   • Script iframe_api chỉ được nạp MỘT LẦN cho cả trang, dù có bao nhiêu
//     trình chơi. Nạp hai lần thì `onYouTubeIframeAPIReady` của lần trước bị
//     ghi đè và trình chơi kia treo ở trạng thái "đang tải" mãi mãi.
//   • YT.Player THAY THẾ phần tử DOM được trỏ tới bằng một <iframe>. Đưa cho nó
//     một node do React quản lý là hai bên tranh nhau — nên node đó được tạo
//     bằng tay ở đây và React không bao giờ đụng vào.
//   • Video tắt nhúng (lỗi 101/150) hoặc bị gỡ (100) là chuyện THƯỜNG XUYÊN với
//     phim hoạt hình. Phải phân biệt được để báo cho đúng, không để bé ngồi
//     nhìn ô đen.
//   • React StrictMode gọi effect hai lần ở môi trường dev → chốt bằng ref để
//     không tạo hai trình chơi chồng nhau.
// ===========================================================================
import { useCallback, useEffect, useRef, useState } from "react";

/** Phần API của YouTube mà dự án thực sự dùng. Khai ở đây để khỏi thêm @types. */
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  setPlaybackRate(rate: number): void;
  /** <iframe> thật của trình chơi — cần để ép kích thước, xem `sizeToFill`. */
  getIframe?(): HTMLIFrameElement;
  destroy(): void;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data?: number;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement | string,
    opts: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: YTPlayerEvent) => void;
        onStateChange?: (e: YTPlayerEvent) => void;
        onError?: (e: YTPlayerEvent) => void;
      };
    },
  ) => YTPlayer;
}

interface YTWindow extends Window {
  YT?: YTNamespace;
  onYouTubeIframeAPIReady?: () => void;
}

/** Mã trạng thái của trình chơi (YT.PlayerState) — chỉ cần đúng "đã hết video". */
const STATE_ENDED = 0;

/**
 * Dừng SỚM hơn mốc `end` một chút.
 *
 * `getCurrentTime()` không phải đồng hồ thật: nó là con số nội suy của một
 * playhead nằm trong iframe khác miền, được đồng bộ về bằng postMessage khoảng
 * 4 lần/giây; `pauseVideo()` lại tốn thêm một vòng postMessage nữa. Cộng lại,
 * dừng đúng lúc `now >= end` thì thực tế luôn LỐ vài trăm mili giây — tức là bé
 * nghe lẹm sang câu sau. Trừ trước một nhịp cho về gần đúng.
 */
const PAUSE_LEAD_SEC = 0.12;

/**
 * Sau khi ra lệnh phát mà chừng này vẫn chưa nhúc nhích thì coi như trình duyệt
 * CHẶN tự phát (iOS hay chặn lại sau khi micro vừa dùng xong).
 */
const AUTOPLAY_CHECK_MS = 1200;

let apiPromise: Promise<YTNamespace> | null = null;

/** Nạp script iframe_api đúng MỘT lần cho cả trang. */
function loadYouTubeApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  const w = window as YTWindow;
  if (w.YT?.Player) return Promise.resolve(w.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const previous = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (w.YT?.Player) resolve(w.YT);
      else reject(new Error("YT missing after ready"));
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    // Mạng của bé hỏng / bị chặn → không treo mãi, để giao diện chuyển sang
    // đường lui (đọc câu bằng giọng trình duyệt).
    script.onerror = () => reject(new Error("iframe_api load failed"));
    document.head.appendChild(script);
  });
  return apiPromise;
}

export type YouTubeStatus =
  | "loading"
  /** Sẵn sàng phát. */
  | "ready"
  /** Kênh TẮT NHÚNG hoặc video đã bị gỡ — phim này coi như hỏng, phải đổi phim. */
  | "blocked"
  /** Không nạp được API (mạng hỏng, bị chặn) — có thể thử lại sau. */
  | "offline";

export interface UseYouTubePlayer {
  /** Gắn vào một <div>; trình chơi được dựng bên trong. */
  hostRef: (el: HTMLDivElement | null) => void;
  status: YouTubeStatus;
  /** Mã lỗi thô của YouTube (chỉ để ghi log / hiện cho quản trị). */
  errorCode: number | null;
  /**
   * Trình duyệt CHẶN lệnh phát, phải có một cú chạm thật mới chạy tiếp.
   * Giao diện phải hiện một nút to để bé chạm — `resume()`.
   */
  needsTap: boolean;
  /** Phát đoạn [start, end] rồi TỰ DỪNG và gọi `onEnd`. */
  playRange: (start: number, end: number, onEnd?: () => void) => void;
  /** Gọi TỪ TRONG một sự kiện chạm thật để gỡ trạng thái `needsTap`. */
  resume: () => void;
  /** Dừng ngay, huỷ luôn đoạn đang theo dõi. */
  pause: () => void;
  /** Phát tiếp từ chỗ đang đứng (không theo dõi mốc kết thúc nào). */
  play: () => void;
  /** Nhảy tới một mốc mà không phát. */
  seek: (seconds: number) => void;
  /** Đọc giây hiện tại — dùng cho studio bắt mốc. */
  currentTime: () => number;
  /** Đổi tốc độ phát (0.75 giúp bé nghe rõ từng chữ). */
  setRate: (rate: number) => void;
}

export function useYouTubePlayer(videoId: string): UseYouTubePlayer {
  const [status, setStatus] = useState<YouTubeStatus>("loading");
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [needsTap, setNeedsTap] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  /**
   * Khung chứa để STATE chứ không phải ref.
   *
   * Đây là chỗ đã làm bé nhìn thấy ô đen: khung video của trang học chỉ xuất
   * hiện SAU khi bấm "Xem thôi!", nên lúc component vừa gắn thì nó chưa có trên
   * trang. Cất vào `useRef` thì effect chạy một lần, không thấy khung, bỏ cuộc —
   * và vì danh sách phụ thuộc không đổi, nó KHÔNG BAO GIỜ chạy lại. Để ở state
   * thì lúc khung hiện ra là effect tự chạy lại và dựng trình chơi.
   */
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  /** Đoạn đang theo dõi: dừng khi `getCurrentTime()` chạm `end`. */
  const rangeRef = useRef<{ end: number; onEnd?: () => void } | null>(null);
  const rafRef = useRef<number | null>(null);
  /** Hẹn giờ kiểm "trình duyệt có thật sự phát không". */
  const autoplayTimerRef = useRef<number | null>(null);

  const stopWatching = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (autoplayTimerRef.current !== null) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    rangeRef.current = null;
  }, []);

  /** Vòng theo dõi: tới mốc kết thúc thì dừng video và báo ra ngoài. */
  const watch = useCallback(() => {
    const tick = () => {
      const range = rangeRef.current;
      const player = playerRef.current;
      if (!range || !player) {
        rafRef.current = null;
        return;
      }
      let now = 0;
      try {
        now = player.getCurrentTime();
      } catch {
        // Trình chơi vừa bị huỷ giữa chừng — im lặng dừng lại.
        rafRef.current = null;
        return;
      }
      if (now >= range.end - PAUSE_LEAD_SEC) {
        const done = range.onEnd;
        rangeRef.current = null;
        rafRef.current = null;
        try {
          player.pauseVideo();
        } catch {
          /* trình chơi đã biến mất */
        }
        done?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
  }, []);

  const hostRef = useCallback((el: HTMLDivElement | null) => setHost(el), []);

  useEffect(() => {
    if (!host || !videoId) return;

    let cancelled = false;
    // Node do TA tạo, không phải node của React: YT.Player sẽ thay thế nó bằng
    // <iframe>, mà React thì không được biết chuyện đó.
    const mount = document.createElement("div");
    mount.className = "h-full w-full";
    host.appendChild(mount);

    void loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        playerRef.current = new YT.Player(mount, {
          videoId,
          // YT.Player THAY THẾ `mount` bằng một <iframe> mới và KHÔNG giữ lại
          // class của node cũ — mặc định nó đặt cứng 640×360. Trên điện thoại
          // thì khung 640px nằm trong ô rộng 360px, bé chỉ nhìn thấy góc trái
          // phóng to. Phải nói rõ 100% ngay từ đầu.
          width: "100%",
          height: "100%",
          playerVars: {
            // Bé không tự tua — mọi điều khiển đi qua giao diện của mình, vốn
            // có vùng chạm to hơn nhiều so với thanh điều khiển của YouTube.
            controls: 0,
            disablekb: 1,
            // Không gợi ý video khác khi hết phim: đây là app cho trẻ con.
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            // BẮT BUỘC trên iOS, nếu không video nhảy ra chế độ toàn màn hình
            // của hệ điều hành và mọi lệnh dừng theo câu mất tác dụng.
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              if (cancelled) return;
              // Chốt hạ về kích thước: thuộc tính width/height ở trên có thể bị
              // trình duyệt hiểu khác nhau, còn style thì luôn thắng.
              try {
                const frame = e.target.getIframe?.();
                if (frame) {
                  frame.style.width = "100%";
                  frame.style.height = "100%";
                  frame.style.display = "block";
                  frame.style.border = "0";
                }
              } catch {
                /* không lấy được iframe — kích thước theo thuộc tính vẫn ổn */
              }
              setStatus("ready");
            },
            onStateChange: (e) => {
              // Hết video mà vẫn đang theo dõi một đoạn (mốc `end` đặt quá dài)
              // → coi như đoạn đó đã xong, nếu không bé ngồi chờ mãi.
              if (e.data === STATE_ENDED && rangeRef.current) {
                const done = rangeRef.current.onEnd;
                stopWatching();
                done?.();
              }
            },
            onError: (e) => {
              if (cancelled) return;
              const code = typeof e.data === "number" ? e.data : 0;
              setErrorCode(code);
              // 101/150 = kênh TẮT NHÚNG · 100 = video đã bị gỡ.
              setStatus(code === 101 || code === 150 || code === 100 ? "blocked" : "offline");
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("offline");
      });

    return () => {
      cancelled = true;
      stopWatching();
      try {
        playerRef.current?.destroy();
      } catch {
        /* đã bị gỡ khỏi DOM rồi */
      }
      playerRef.current = null;
      mount.remove();
      setStatus("loading");
    };
  }, [host, videoId, stopWatching]);

  const playRange = useCallback(
    (start: number, end: number, onEnd?: () => void) => {
      const player = playerRef.current;
      if (!player) {
        // Chưa có trình chơi (đang tải / phim hỏng) → báo xong ngay để luồng học
        // đi tiếp sang bước nói. Không bao giờ để bé kẹt ở một màn hình chết.
        onEnd?.();
        return;
      }
      stopWatching();
      setNeedsTap(false);
      rangeRef.current = { end, onEnd };
      try {
        player.seekTo(start, true);
        player.playVideo();
      } catch {
        stopWatching();
        onEnd?.();
        return;
      }
      watch();

      // iOS coi `playVideo()` là lệnh của script chứ không phải cú chạm của
      // người dùng, và hay chặn lại — đặc biệt ngay sau khi micro vừa nhả
      // AVAudioSession. Không kiểm thì bé ngồi nhìn khung hình đứng im mà không
      // hiểu vì sao. Chưa nhúc nhích sau một nhịp → xin bé một cú chạm.
      autoplayTimerRef.current = window.setTimeout(() => {
        autoplayTimerRef.current = null;
        if (!rangeRef.current) return;
        let now = start;
        try {
          now = player.getCurrentTime();
        } catch {
          return;
        }
        if (now <= start + 0.05) setNeedsTap(true);
      }, AUTOPLAY_CHECK_MS);
    },
    [stopWatching, watch],
  );

  const pause = useCallback(() => {
    stopWatching();
    try {
      playerRef.current?.pauseVideo();
    } catch {
      /* bỏ qua */
    }
  }, [stopWatching]);

  const play = useCallback(() => {
    try {
      playerRef.current?.playVideo();
    } catch {
      /* bỏ qua */
    }
  }, []);

  /** Chạm để chạy tiếp sau khi trình duyệt chặn tự phát. */
  const resume = useCallback(() => {
    setNeedsTap(false);
    play();
    // Vòng theo dõi có thể đã dừng lúc rời tab → bật lại nếu còn đoạn dở.
    if (rangeRef.current) watch();
  }, [play, watch]);

  // Rời tab thì DỪNG phim. Vòng theo dõi chạy bằng requestAnimationFrame nên bị
  // treo khi tab ẩn, trong khi video vẫn chạy tiếp — không dừng ở đây thì lúc
  // bé quay lại phim đã trôi qua mấy câu. Dừng luôn cũng đúng với trẻ con: rời
  // màn hình thì không có tiếng phát ở nền.
  useEffect(() => {
    const onHidden = () => {
      if (document.visibilityState !== "hidden") return;
      try {
        playerRef.current?.pauseVideo();
      } catch {
        /* bỏ qua */
      }
      if (rangeRef.current) setNeedsTap(true);
    };
    document.addEventListener("visibilitychange", onHidden);
    return () => document.removeEventListener("visibilitychange", onHidden);
  }, []);

  const seek = useCallback((seconds: number) => {
    try {
      playerRef.current?.seekTo(seconds, true);
    } catch {
      /* bỏ qua */
    }
  }, []);

  const currentTime = useCallback(() => {
    try {
      return playerRef.current?.getCurrentTime() ?? 0;
    } catch {
      return 0;
    }
  }, []);

  const setRate = useCallback((rate: number) => {
    try {
      playerRef.current?.setPlaybackRate(rate);
    } catch {
      /* trình duyệt/video không cho đổi tốc độ */
    }
  }, []);

  return {
    hostRef,
    status,
    errorCode,
    needsTap,
    playRange,
    resume,
    pause,
    play,
    seek,
    currentTime,
    setRate,
  };
}
