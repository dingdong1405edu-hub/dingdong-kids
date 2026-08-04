import { Lightbulb } from "lucide-react";
import type { MaterialBlock } from "@/lib/materials";

/**
 * Render các khối nội dung của một tài liệu học. Server component thuần — không
 * tương tác, chỉ trình bày chữ. Từ/câu tiếng Anh dùng phông dạy đọc
 * (`font-primer`) để bé nhận mặt chữ giống trong sách tập đọc.
 */
export function MaterialContent({ blocks }: { blocks: MaterialBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: MaterialBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="flex flex-wrap items-baseline gap-2 border-b pb-1.5 pt-2 font-display text-xl font-extrabold text-foreground">
          <span>{block.text}</span>
          {block.en && <span className="font-primer text-base font-bold text-primary">{block.en}</span>}
        </h2>
      );

    case "paragraph":
      return <p className="text-[17px] leading-relaxed text-foreground/90">{block.text}</p>;

    case "list":
      return block.ordered ? (
        <ol className="list-decimal space-y-1.5 pl-5 text-[17px] leading-relaxed text-foreground/90 marker:font-extrabold marker:text-primary">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-1.5 pl-5 text-[17px] leading-relaxed text-foreground/90 marker:text-primary">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );

    case "example":
      return (
        <div className="sticker bg-muted/30 p-4">
          <p className="font-primer text-2xl leading-snug text-foreground">{block.en}</p>
          {block.vi && <p className="mt-1.5 text-[15px] text-muted-foreground">{block.vi}</p>}
        </div>
      );

    case "vocab":
      return (
        <div className="overflow-x-auto rounded-2xl border-2">
          <table className="w-full min-w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5">Từ tiếng Anh</th>
                <th className="px-4 py-2.5">Phát âm</th>
                <th className="px-4 py-2.5">Nghĩa</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {block.items.map((it, i) => (
                <tr key={i} className="hover:bg-muted/20">
                  <td className="font-primer px-4 py-2.5 text-lg font-bold text-foreground">{it.word}</td>
                  <td className="px-4 py-2.5 font-serif text-muted-foreground">{it.ipa}</td>
                  <td className="px-4 py-2.5 text-[15px] text-muted-foreground">{it.vi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "note":
      return (
        <div className="flex gap-3 rounded-2xl border-2 border-brand-yellow/40 bg-band-sun p-4">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
          <p className="text-[17px] leading-relaxed text-brand-gold">{block.text}</p>
        </div>
      );

    default:
      return null;
  }
}
