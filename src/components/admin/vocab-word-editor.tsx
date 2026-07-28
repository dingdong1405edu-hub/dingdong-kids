"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, GripVertical, ImageOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteVocabWordAction, reorderVocabWordsAction } from "@/server/actions/admin";
import { VocabWordForm } from "./vocab-word-form";
import { VocabWordImport } from "./vocab-word-import";
import type { VocabWordCard } from "@/types";

interface Props {
  lessonId: string;
  unitId: string;
  words: VocabWordCard[];
}

export function VocabWordEditor({ lessonId, unitId, words }: Props) {
  const router = useRouter();
  const [items, setItems] = useState<VocabWordCard[]>(words);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const dragIndex = useRef<number | null>(null);

  // Re-sync when the server sends fresh data (after a mutation + refresh).
  useEffect(() => setItems(words), [words]);

  async function persistOrder(next: VocabWordCard[]) {
    setItems(next);
    await reorderVocabWordsAction(unitId, next.map((w) => w.id));
    router.refresh();
  }

  function handleDrop(target: number) {
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from === null || from === target) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(target, 0, moved);
    void persistOrder(next);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Xóa từ này khỏi bài học?")) return;
    await deleteVocabWordAction(id, unitId);
    router.refresh();
  }

  // Trẻ nhỏ học bằng HÌNH và ÂM THANH là chính, nên nhắc rõ những từ còn thiếu.
  const noImage = items.filter((w) => !w.imageUrl).length;

  return (
    <div className="space-y-3">
      {noImage > 0 && (
        <p className="flex items-start gap-1.5 rounded-md border border-amber-300 bg-amber-50 px-2.5 py-2 text-xs text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300">
          <ImageOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            {noImage} từ chưa có ảnh minh hoạ. Hãy thêm ảnh trước khi xuất bản bài — nhiều bé chưa
            đọc thạo, nhìn hình mới hiểu nghĩa.
          </span>
        </p>
      )}
      {items.length === 0 ? (
        <p className="rounded-md border border-dashed py-6 text-center text-xs text-muted-foreground">
          Chưa có từ nào. Nhấn “Thêm từ” để bắt đầu.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((w, i) => (
            <li key={w.id}>
              <div
                draggable
                onDragStart={() => (dragIndex.current = i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
                className="flex items-center gap-2 rounded-md border bg-background p-2"
              >
                <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
                <span className="w-5 shrink-0 text-center text-xs text-muted-foreground">{i + 1}</span>
                {w.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={w.imageUrl} alt="" className="h-9 w-9 shrink-0 rounded-lg border object-cover" />
                ) : (
                  <span
                    title="Chưa có ảnh minh hoạ"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-dashed border-amber-400 text-amber-600"
                  >
                    <ImageOff className="h-4 w-4" />
                  </span>
                )}
                <span className="font-primer text-lg">{w.word}</span>
                <span className="text-sm text-muted-foreground">{w.ipa}</span>
                <span className="truncate text-sm">— {w.meaning}</span>
                {w.audioUrl && <Volume2 className="h-3.5 w-3.5 shrink-0 text-sky-600" />}
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                  {w.examples.length} ví dụ
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(editing === w.id ? null : w.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(w.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {editing === w.id && (
                <div className="mt-1.5">
                  <VocabWordForm
                    lessonId={lessonId}
                    unitId={unitId}
                    word={w}
                    onSaved={() => {
                      setEditing(null);
                      router.refresh();
                    }}
                    onCancel={() => setEditing(null)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {editing === "new" ? (
        <VocabWordForm
          lessonId={lessonId}
          unitId={unitId}
          onSaved={() => {
            setEditing(null);
            router.refresh();
          }}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditing("new")}>
            <Plus className="mr-1 h-4 w-4" /> Thêm từ
          </Button>
          <VocabWordImport
            lessonId={lessonId}
            unitId={unitId}
            onImported={() => router.refresh()}
          />
        </div>
      )}
    </div>
  );
}
