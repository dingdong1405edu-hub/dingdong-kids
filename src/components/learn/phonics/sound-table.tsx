"use client";
// BẢNG TRA CỨU ÂM — mọi âm tiếng Anh xếp theo 6 nhóm. Bấm vào một âm là nghe
// ngay từ ví dụ và xem mẹo đọc (mẹo viết riêng cho trẻ Việt: những lỗi bé nhà
// mình hay mắc như nuốt phụ âm cuối, đọc /θ/ thành /t/…).
//
// Đây là chỗ bố mẹ tra cùng con, nên vẫn hiển thị đủ ký hiệu âm; còn phần chơi
// thì nằm ở các bài học.
import { useState } from "react";
import { SOUND_GROUPS } from "@/lib/phonics-data";
import type { Sound } from "@/lib/phonics-data";
import { playWord } from "@/lib/speech";
import { cn } from "@/lib/utils";
import { SoundButton } from "./sound-button";
import { BigGlyph } from "./cards/card-ui";

/** Khoá duy nhất cho một âm — "th" xuất hiện 2 lần (/θ/ và /ð/) nên phải kèm ký hiệu âm. */
const keyOf = (s: Sound) => `${s.letter}-${s.sound}`;

export function SoundTable() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <p className="rounded-3xl bg-primary/5 p-4 text-center text-[15px] font-semibold text-muted-foreground">
        Bấm vào một ô để nghe âm đó và xem mẹo đọc nhé 👇
      </p>

      {SOUND_GROUPS.map((group) => {
        const openSound = group.sounds.find((s) => keyOf(s) === selected);
        return (
          <section key={group.id} className="space-y-3">
            <div>
              <h3 className="font-display text-lg font-extrabold">{group.title}</h3>
              <p className="text-sm text-muted-foreground">{group.subtitle}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {group.sounds.map((s) => {
                const key = keyOf(s);
                const active = key === selected;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelected(active ? null : key);
                      playWord({ word: s.word });
                    }}
                    aria-label={`Âm ${s.letter}, ví dụ ${s.word}`}
                    aria-pressed={active}
                    className={cn(
                      "flex min-h-[92px] flex-col items-center justify-center gap-0.5 rounded-3xl border-4 bg-card px-2 py-3 transition-all",
                      active
                        ? "animate-pop-in border-primary bg-primary/10"
                        : "border-border hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft active:translate-y-[2px]",
                    )}
                  >
                    <span className="text-2xl leading-none" aria-hidden>
                      {s.emoji}
                    </span>
                    <span className="font-primer text-3xl font-bold leading-none text-primary">{s.letter}</span>
                    <span className="text-[11px] font-bold text-muted-foreground">{s.sound}</span>
                  </button>
                );
              })}
            </div>

            {openSound && (
              <div className="animate-pop-in sticker space-y-4 rounded-3xl bg-card p-5">
                <BigGlyph>{openSound.letter}</BigGlyph>

                <div className="text-center font-display text-3xl font-extrabold text-primary">
                  {openSound.sound}
                </div>

                <div className="flex items-center justify-center gap-3 rounded-3xl bg-muted/40 p-4">
                  <span className="text-5xl" aria-hidden>
                    {openSound.emoji}
                  </span>
                  <div className="text-left">
                    <div className="font-primer text-3xl font-bold">{openSound.word}</div>
                    <div className="text-sm font-semibold text-muted-foreground">{openSound.meaning}</div>
                  </div>
                  <SoundButton text={openSound.word} variant="chip" />
                </div>

                <p className="rounded-3xl bg-sunny/15 p-4 text-[15px] leading-relaxed">
                  💡 <span className="font-bold">Mẹo đọc:</span> {openSound.hint}
                </p>

                <div className="flex justify-center">
                  <SoundButton text={openSound.word} label={`Nghe “${openSound.word}”`} />
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
