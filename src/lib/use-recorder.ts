"use client";
// ===========================================================================
//  GHI ÂM TRÊN TRÌNH DUYỆT — hook dùng chung.
//
//  Tách ra từ phần Nói để cả "Nghe & nhắc lại" (bé nghe lại giọng mình) lẫn
//  phần chấm phát âm đều dùng một đường, không phải chép lại logic MediaRecorder
//  ở hai chỗ rồi lệch nhau.
//
//  Những chỗ dễ sai đã xử lý sẵn:
//   • Safari/iOS KHÔNG nhận "audio/webm" và ném lỗi nếu ép → dò định dạng được
//     hỗ trợ, không dò ra thì để trình duyệt tự chọn.
//   • Rời trang khi đang ghi → phải tắt track, nếu không đèn micro sáng mãi.
//   • Bé quên bấm dừng → tự dừng sau `maxSeconds`.
//   • `URL.createObjectURL` phải được thu hồi, nếu không rò bộ nhớ sau vài chục
//     lần ghi (trẻ bấm ghi lại rất nhiều lần).
// ===========================================================================
import { useCallback, useEffect, useRef, useState } from "react";

export type RecorderState = "idle" | "recording" | "ready" | "denied" | "unsupported";

export interface UseRecorder {
  state: RecorderState;
  /** URL phát lại bản ghi vừa xong (null khi chưa có). */
  audioUrl: string | null;
  /** Blob thô — dùng khi cần gửi lên server chấm điểm. */
  blob: Blob | null;
  durationSec: number;
  start: () => Promise<void>;
  stop: () => void;
  /** Xoá bản ghi hiện tại để ghi lại từ đầu. */
  reset: () => void;
}

export function useRecorder(maxSeconds = 8): UseRecorder {
  const [state, setState] = useState<RecorderState>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [durationSec, setDurationSec] = useState(0);

  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const startedAt = useRef(0);
  const autoStop = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** URL đang được dùng — giữ ref để thu hồi đúng cái cũ khi ghi lại. */
  const urlRef = useRef<string | null>(null);

  const cleanupStream = useCallback(() => {
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
  }, []);

  const stop = useCallback(() => {
    if (autoStop.current) {
      clearTimeout(autoStop.current);
      autoStop.current = null;
    }
    // `onstop` mới là chỗ dựng blob — ở đây chỉ ra lệnh dừng.
    if (recorder.current?.state === "recording") recorder.current.stop();
  }, []);

  const reset = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setAudioUrl(null);
    setBlob(null);
    setDurationSec(0);
    setState("idle");
  }, []);

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setState("unsupported");
      return;
    }

    // Xoá bản ghi cũ trước khi ghi mới (thu hồi URL để không rò bộ nhớ).
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setAudioUrl(null);
    setBlob(null);

    let s: MediaStream;
    try {
      s = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      // Bé/bố mẹ bấm "Chặn", hoặc trang không chạy trên HTTPS.
      setState("denied");
      return;
    }

    try {
      stream.current = s;
      // Safari/iOS không nhận "audio/webm" → dò cái được hỗ trợ trước.
      const mime =
        typeof MediaRecorder !== "undefined"
          ? ["audio/webm", "audio/mp4", "audio/ogg"].find((c) =>
              MediaRecorder.isTypeSupported?.(c),
            )
          : undefined;
      const mr = new MediaRecorder(s, mime ? { mimeType: mime } : undefined);

      chunks.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      mr.onstop = () => {
        const type = mr.mimeType || mime || "audio/webm";
        const b = new Blob(chunks.current, { type });
        const secs = Math.max(1, Math.round((Date.now() - startedAt.current) / 1000));
        cleanupStream();

        // Không có tiếng nào (mic câm / bé chưa kịp nói) → coi như chưa ghi.
        if (b.size === 0) {
          setState("idle");
          return;
        }
        const url = URL.createObjectURL(b);
        urlRef.current = url;
        setBlob(b);
        setAudioUrl(url);
        setDurationSec(secs);
        setState("ready");
      };

      startedAt.current = Date.now();
      mr.start();
      recorder.current = mr;
      setState("recording");

      // Bé rất hay quên bấm dừng → tự dừng.
      autoStop.current = setTimeout(stop, maxSeconds * 1000);
    } catch {
      cleanupStream();
      setState("unsupported");
    }
  }, [maxSeconds, stop, cleanupStream]);

  // Rời trang: tắt mic + thu hồi URL.
  useEffect(
    () => () => {
      if (autoStop.current) clearTimeout(autoStop.current);
      stream.current?.getTracks().forEach((t) => t.stop());
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  return { state, audioUrl, blob, durationSec, start, stop, reset };
}
