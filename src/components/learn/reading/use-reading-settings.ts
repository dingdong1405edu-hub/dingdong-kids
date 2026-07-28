"use client";
import { useEffect, useState } from "react";
import type { ReadingSettings } from "./types";

// Đổi khoá lưu (v2) vì cỡ chữ mặc định đã to hơn hẳn cho trẻ em — giữ khoá cũ
// sẽ khôi phục cỡ chữ 17px của bản người lớn cho những máy đã từng dùng app.
const KEY = "dingdong:reading-settings-v2";
const DEFAULTS: ReadingSettings = { fontSize: 21, leading: 2.0, theme: "paper", readAloud: true };

/** Tuỳ chọn hiển thị bài đọc (cỡ chữ / giãn dòng / nền / đọc to), lưu ở localStorage. */
export function useReadingSettings() {
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSettings({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<ReadingSettings>) });
    } catch {
      /* ignore corrupt prefs */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* storage unavailable (private mode) — non-fatal */
    }
  }, [settings, loaded]);

  return { settings, setSettings };
}
