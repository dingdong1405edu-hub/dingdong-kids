"use client";
// ===========================================================================
//  Giọng đọc mẫu cho cấp "Bé Tập Nói".
//
//  Trang server chỉ tra CACHE khi render (không gọi Deepgram) nên mở bài là
//  chạy ngay. Hook này lo phần còn lại:
//   • Xin sinh audio cho những từ chưa có, MỘT lần, ở nền (POST /api/speak).
//   • Trong lúc chờ, đọc tạm bằng giọng en-US của trình duyệt → bé không bao
//     giờ gặp một tấm hình câm.
//   • Theo dõi "đang phát" để tấm hình nảy theo tiếng, giúp bé nối được HÌNH
//     với TIẾNG — điều cốt lõi khi bé chưa đọc được chữ.
// ===========================================================================
import { useCallback, useEffect, useRef, useState } from "react";
import { speakEnglish } from "@/lib/speech";

/** Ước lượng thời gian đọc một từ khi dùng giọng trình duyệt (không có sự kiện kết thúc). */
const SPOKEN_WORD_MS = 1300;

export function useWordAudio(words: string[], initial: Record<string, string>) {
  const [urls, setUrls] = useState<Record<string, string>>(initial);
  const [speaking, setSpeaking] = useState(false);

  const urlsRef = useRef(urls);
  urlsRef.current = urls;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sinh nốt audio còn thiếu của cả chủ đề, một lần duy nhất khi vào bài.
  useEffect(() => {
    const missing = words.filter((w) => !initial[w]);
    if (missing.length === 0) return;

    let alive = true;
    void fetch("/api/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: missing }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { urls?: Record<string, string> } | null) => {
        if (!alive || !data?.urls) return;
        setUrls((prev) => ({ ...prev, ...data.urls }));
      })
      .catch(() => {
        // Không sinh được thì thôi — giọng trình duyệt vẫn đọc được cho bé.
      });

    return () => {
      alive = false;
    };
    // Chủ đề không đổi trong vòng đời component → chạy đúng một lần.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  /** Đọc một từ. Ưu tiên file Aura đã sinh; chưa có thì dùng giọng trình duyệt. */
  const speak = useCallback(
    (word: string) => {
      stop();
      setSpeaking(true);

      const done = () => {
        setSpeaking(false);
        audioRef.current = null;
      };
      const viaBrowser = () => {
        speakEnglish(word);
        timerRef.current = setTimeout(() => setSpeaking(false), SPOKEN_WORD_MS);
      };

      const url = urlsRef.current[word];
      if (!url) {
        viaBrowser();
        return;
      }

      try {
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = done;
        // Tệp hỏng / bị chặn tự phát → rơi về giọng trình duyệt, đừng để im ru.
        audio.onerror = viaBrowser;
        void audio.play().catch(viaBrowser);
      } catch {
        viaBrowser();
      }
    },
    [stop],
  );

  useEffect(() => stop, [stop]);

  return { speak, speaking, urls };
}
