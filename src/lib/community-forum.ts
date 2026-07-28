import { RAW_FORUM_CATEGORIES } from "./community-forum-data";

/** Một câu trả lời trong chủ đề diễn đàn. */
export interface ForumReply {
  author: string;
  text: string;
  time: string;
  likes: number;
}

/** Chủ đề thô như dữ liệu sinh sẵn (chưa gắn id/chuyên mục). */
export interface RawThread {
  author: string;
  title: string;
  body: string;
  /** Cấp độ liên quan (EnglishLevel: "STARTERS", "MOVERS"…) — "" nếu không gắn cấp nào. */
  level: string;
  tag: string;
  likes: number;
  views: number;
  time: string;
  solved: boolean;
  hot: boolean;
  replies: ForumReply[];
}

export interface RawForumCategory {
  key: string;
  label: string;
  threads: RawThread[];
}

/** Chủ đề đã chuẩn hoá để render (có id, chuyên mục, cờ ghim...). */
export interface ForumThread extends RawThread {
  id: string;
  category: string;
  categoryLabel: string;
  pinned: boolean;
  replyCount: number;
}

export interface ForumCategoryMeta {
  key: string;
  label: string;
  count: number;
}

export interface ForumStats {
  members: number;
  online: number;
  threads: number;
  posts: number;
}

// Bài ghim của ban quản trị — để diễn đàn trông có người điều phối, chỉn chu.
const PINNED: Array<{ category: string; categoryLabel: string; thread: RawThread }> = [
  {
    category: "general",
    categoryLabel: "Hỏi đáp chung",
    thread: {
      author: "Ban Quản Trị DingDong",
      title: "🎉 Chào mừng ba mẹ đến với Cộng đồng DingDong Kids!",
      body:
        "Đây là nơi ba mẹ cùng hỏi đáp, chia sẻ mẹo đồng hành với con học tiếng Anh, khoe thành tích của bé và cổ vũ nhau. Ba mẹ cứ thoải mái đặt câu hỏi, kể cả những câu tưởng là nhỏ xíu — thường thì rất nhiều nhà đang thắc mắc giống mình. Chỉ xin một điều: giữ giọng nhẹ nhàng và không so sánh con nhà này với con nhà kia nhé 💛",
      level: "",
      tag: "Thông báo",
      likes: 214,
      views: 5820,
      time: "2 ngày trước",
      solved: false,
      hot: true,
      replies: [
        { author: "Mẹ Bắp 5 tuổi", text: "Diễn đàn có tâm ghê, chào cả nhà mình mới tham gia nè 🙌", time: "2 ngày trước", likes: 28 },
        { author: "an_nguyen", text: "Cảm ơn admin, cộng đồng dễ thương quá, quyết tâm cùng con học đều mỗi ngày!", time: "hôm qua", likes: 19 },
        { author: "Trần Thu Hà", text: "Hóng có thêm mục thi đua tuần cho các bé nữa thì tuyệt 🥰", time: "hôm qua", likes: 14 },
      ],
    },
  },
  {
    category: "general",
    categoryLabel: "Hỏi đáp chung",
    thread: {
      author: "Ban Quản Trị DingDong",
      title: "📌 Mẹo đặt câu hỏi để được ba mẹ khác trả lời nhanh nhất",
      body:
        "Khi hỏi về việc học của con, ba mẹ nên ghi rõ: (1) bé mấy tuổi và đang ở cấp nào (Pre-Starters, Starters, Movers…), (2) bé học được bao lâu rồi, (3) tình huống cụ thể đang gặp — ví dụ 'bé đọc được chữ nhưng không chịu nói'. Càng cụ thể thì mọi người càng gợi ý đúng chỗ. Chúc cả nhà học vui!",
      level: "",
      tag: "Hướng dẫn",
      likes: 156,
      views: 3410,
      time: "tuần trước",
      solved: false,
      hot: false,
      replies: [
        { author: "Hoàng Minh Đức", text: "Chuẩn luôn, hỏi có tình huống cụ thể là được trả lời cái rẹt 😄", time: "tuần trước", likes: 17 },
        { author: "susu_mom", text: "Ghim luôn bài này cho ba mẹ mới đọc ạ 📌", time: "6 ngày trước", likes: 11 },
      ],
    },
  },
];

/** Chủ đề đã gắn id + cờ, sắp xếp: ghim trước, rồi tới nội dung sinh sẵn. */
export const FORUM_THREADS: ForumThread[] = [
  ...PINNED.map((p, i) => ({
    ...p.thread,
    id: `pinned-${i}`,
    category: p.category,
    categoryLabel: p.categoryLabel,
    pinned: true,
    replyCount: p.thread.replies.length,
  })),
  ...RAW_FORUM_CATEGORIES.flatMap((c) =>
    c.threads.map((t, i) => ({
      ...t,
      id: `${c.key}-${i}`,
      category: c.key,
      categoryLabel: c.label,
      pinned: false,
      replyCount: t.replies.length,
    })),
  ),
];

/** Danh sách chuyên mục kèm số lượng chủ đề (dùng cho bộ lọc). */
export const FORUM_CATEGORIES: ForumCategoryMeta[] = RAW_FORUM_CATEGORIES.map((c) => ({
  key: c.key,
  label: c.label,
  count: FORUM_THREADS.filter((t) => t.category === c.key).length,
}));

const TOTAL_REPLIES = FORUM_THREADS.reduce((n, t) => n + t.replies.length, 0);

/** Thống kê cộng đồng hiển thị ở đầu trang (số thành viên/online là ước lượng). */
export const FORUM_STATS: ForumStats = {
  members: 2913,
  online: 84,
  threads: FORUM_THREADS.length,
  posts: FORUM_THREADS.length + TOTAL_REPLIES,
};

/** Thành viên tích cực (đếm số bài + trả lời) — bảng "đóng góp nổi bật". */
export function topContributors(limit = 5): Array<{ name: string; posts: number }> {
  const count = new Map<string, number>();
  for (const t of FORUM_THREADS) {
    if (t.pinned) continue; // bỏ tài khoản ban quản trị khỏi bảng
    count.set(t.author, (count.get(t.author) ?? 0) + 1);
    for (const r of t.replies) count.set(r.author, (count.get(r.author) ?? 0) + 1);
  }
  return [...count.entries()]
    .map(([name, posts]) => ({ name, posts }))
    .sort((a, b) => b.posts - a.posts)
    .slice(0, limit);
}

const AVATAR_COLORS = [
  "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
  "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300",
  "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
];

/** Màu avatar cố định theo tên (để mỗi người một màu ổn định). */
export function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

/** Ký tự đầu để làm avatar chữ. */
export function avatarInitial(name: string): string {
  const c = name.trim().charAt(0);
  return c ? c.toUpperCase() : "?";
}
