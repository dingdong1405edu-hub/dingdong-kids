// Gói chủ đề KHÁM PHÁ THÊM số 05 cho cấp "Bé Tập Nói".
//
// Luật của cấp này (xem CLAUDE.md §6.1) — bé 3–5 tuổi CHƯA BIẾT CHỮ:
//  • Mỗi từ phải "vẽ được" bằng ĐÚNG MỘT emoji rõ nghĩa.
//  • Từ phải NGẮN (1–2 âm tiết) — máy nhận giọng trẻ em vốn đã kém.
//  • Không có từ trừu tượng mà emoji không diễn tả nổi.
//  • KHÔNG trùng từ với bất kỳ chủ đề nào khác (npm run content:check bắt lỗi này).
import type { FirstWordsUnit } from "./types";

export const UNITS: FirstWordsUnit[] = [
  {
    id: "actions",
    title: "Hành động",
    titleEn: "Actions",
    emoji: "🏃",
    cover: "from-yellow-300 via-amber-400 to-orange-500",
    words: [
      { word: "run", vi: "chạy", emoji: "🏃" },
      { word: "jump", vi: "nhảy lên", emoji: "🤸" },
      { word: "walk", vi: "đi bộ", emoji: "🚶" },
      { word: "sit", vi: "ngồi", emoji: "🧘" },
      { word: "eat", vi: "ăn", emoji: "🍽️" },
      { word: "drink", vi: "uống", emoji: "🧃" },
      { word: "sleep", vi: "ngủ", emoji: "😴" },
      { word: "dance", vi: "nhảy múa", emoji: "💃" },
    ],
  },
  {
    id: "feelings",
    title: "Cảm xúc",
    titleEn: "Feelings",
    emoji: "😊",
    cover: "from-fuchsia-300 via-pink-400 to-rose-500",
    words: [
      { word: "happy", vi: "vui", emoji: "😄" },
      { word: "sad", vi: "buồn", emoji: "😢" },
      { word: "angry", vi: "giận", emoji: "😠" },
      { word: "tired", vi: "mệt", emoji: "🥱" },
      { word: "scared", vi: "sợ", emoji: "😨" },
      { word: "shy", vi: "ngại ngùng", emoji: "😳" },
      { word: "sick", vi: "ốm", emoji: "🤒" },
      { word: "love", vi: "yêu", emoji: "🥰" },
    ],
  },
  {
    id: "sports",
    title: "Thể thao",
    titleEn: "Sports",
    emoji: "🏅",
    cover: "from-emerald-300 via-teal-400 to-cyan-500",
    words: [
      { word: "swim", vi: "bơi", emoji: "🏊" },
      { word: "football", vi: "bóng đá", emoji: "⚽" },
      { word: "tennis", vi: "quần vợt", emoji: "🎾" },
      { word: "skate", vi: "trượt băng", emoji: "⛸️" },
      { word: "ski", vi: "trượt tuyết", emoji: "🎿" },
      { word: "golf", vi: "gôn", emoji: "⛳" },
      { word: "race", vi: "đua xe", emoji: "🏎️" },
      { word: "bowling", vi: "ném bóng bô-linh", emoji: "🎳" },
    ],
  },
  {
    id: "music",
    title: "Âm nhạc",
    titleEn: "Music",
    emoji: "🎼",
    cover: "from-violet-300 via-purple-400 to-indigo-500",
    words: [
      { word: "song", vi: "bài hát", emoji: "🎤" },
      { word: "piano", vi: "đàn piano", emoji: "🎹" },
      { word: "guitar", vi: "đàn ghi-ta", emoji: "🎸" },
      { word: "violin", vi: "đàn vi-ô-lông", emoji: "🎻" },
      { word: "flute", vi: "cái sáo", emoji: "🪈" },
      { word: "bell", vi: "cái chuông", emoji: "🔔" },
      { word: "note", vi: "nốt nhạc", emoji: "🎵" },
      { word: "horn", vi: "cái kèn", emoji: "🎺" },
    ],
  },
  {
    id: "my-day",
    title: "Một ngày của bé",
    titleEn: "My day",
    emoji: "🧒",
    cover: "from-sky-300 via-cyan-400 to-teal-500",
    words: [
      { word: "wash", vi: "rửa tay", emoji: "🧼" },
      { word: "play", vi: "chơi", emoji: "🧩" },
      { word: "read", vi: "đọc sách", emoji: "📖" },
      { word: "write", vi: "viết", emoji: "✏️" },
      { word: "draw", vi: "vẽ", emoji: "🖍️" },
      { word: "sing", vi: "hát", emoji: "🎶" },
      { word: "laugh", vi: "cười", emoji: "😂" },
      { word: "hello", vi: "xin chào", emoji: "👋" },
    ],
  },
];
