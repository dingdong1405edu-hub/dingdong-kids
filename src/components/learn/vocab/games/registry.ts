// ===========================================================================
//  DANH MỤC TRÒ CHƠI TỪ VỰNG
//
//  Nơi DUY NHẤT khai báo có những game nào. Thêm game mới thì thêm một mục ở
//  đây là xong — trình chơi tự nhặt, không phải sửa chỗ nào khác.
//
//  `minWords` rất quan trọng: bài của cấp Pre-Starters chỉ có 4 từ, mà game lật
//  hình cần ít nhất 3 từ (6 thẻ). Chọn game mà không lọc theo số từ thì bé sẽ
//  gặp màn hình trống.
// ===========================================================================
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { VocabGameMeta, VocabGameProps } from "./types";

/**
 * Nạp động (dynamic import) từng game: bé chỉ chơi 2 game mỗi bài nên không cần
 * tải sẵn cả bốn vào bundle đầu tiên. `ssr: false` vì game nào cũng dùng audio +
 * hiệu ứng chuyển động, render ở server chẳng để làm gì.
 */
const load = (
  importer: () => Promise<{ default: ComponentType<VocabGameProps> }>,
): ComponentType<VocabGameProps> => dynamic(importer, { ssr: false });

export interface VocabGameEntry extends VocabGameMeta {
  Component: ComponentType<VocabGameProps>;
}

export const VOCAB_GAMES: VocabGameEntry[] = [
  {
    id: "tap-picture",
    title: "Chỉ đúng hình",
    hint: "Nghe từ rồi chạm vào đúng bức hình.",
    emoji: "👉",
    minWords: 2,
    Component: load(() =>
      import("./tap-picture-game").then((m) => ({ default: m.TapPictureGame })),
    ),
  },
  {
    id: "bubble-pop",
    title: "Chích bong bóng",
    hint: "Nghe từ rồi chích đúng bong bóng.",
    emoji: "🫧",
    minWords: 3,
    Component: load(() =>
      import("./bubble-pop-game").then((m) => ({ default: m.BubblePopGame })),
    ),
  },
  {
    id: "memory-match",
    title: "Lật hình tìm đôi",
    hint: "Lật thẻ tìm hai hình giống nhau. Lật đến đâu nghe từ đến đó.",
    emoji: "🃏",
    minWords: 3,
    Component: load(() =>
      import("./memory-match-game").then((m) => ({ default: m.MemoryMatchGame })),
    ),
  },
  {
    id: "feed-ding",
    title: "Cho Ding ăn",
    hint: "Ding muốn gì thì đưa cho Ding thứ đó.",
    emoji: "🐻",
    minWords: 3,
    Component: load(() =>
      import("./feed-ding-game").then((m) => ({ default: m.FeedDingGame })),
    ),
  },
];

/**
 * Chọn `count` game chơi được với số từ đang có.
 *
 * Xoay vòng theo `seed` (lấy từ id của phần học) để mỗi bài ra một bộ game khác
 * nhau — học 12 bài mà bài nào cũng đúng hai game đó thì bé chán ngay. Cùng một
 * bài thì luôn ra cùng bộ game, nên bé quay lại vẫn thấy quen thuộc.
 */
export function pickGames(wordCount: number, seed: string, count = 2): VocabGameEntry[] {
  const playable = VOCAB_GAMES.filter((g) => wordCount >= g.minWords);
  if (playable.length === 0) return [];

  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const start = h % playable.length;

  return Array.from({ length: Math.min(count, playable.length) }, (_, i) =>
    playable[(start + i) % playable.length],
  );
}
