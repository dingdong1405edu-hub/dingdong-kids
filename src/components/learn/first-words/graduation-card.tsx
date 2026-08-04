"use client";
// ===========================================================================
//  TỐT NGHIỆP "BÉ TẬP NÓI" → mời lên Pre-Starters.
//
//  Cấp này miễn phí và cố ý như vậy: nó là chỗ phụ huynh nhìn thấy con mình
//  THẬT SỰ nói được tiếng Anh. Thẻ này xuất hiện đúng lúc đó — không phải khi
//  bé vừa vào, cũng không phải mỗi lần mở trang.
//
//  Vì thế mốc hiện thẻ đặt theo THÀNH QUẢ chứ không theo thời gian: bé phải mở
//  gần hết chủ đề và nói được phần lớn số từ. Chào mời sớm hơn thì phụ huynh
//  chưa có gì để tin, mà chào mời muộn hơn thì bé đã hết nội dung để học.
// ===========================================================================
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DingBuddy } from "@/components/marketing/ding-buddy";

interface Props {
  /** Bé đã đủ điều kiện "tốt nghiệp" chưa. */
  ready: boolean;
  wordsSaid: number;
  totalWords: number;
  totalStars: number;
  /** Tên bé, để tấm bằng khen có tên riêng (rỗng thì dùng "Bé"). */
  childName: string;
  /** Link tới gói Pre-Starters, vd "/payment?plan=roadmap-pre-starters". */
  upgradeHref: string;
  /** Còn bao nhiêu từ nữa thì đủ điều kiện (chỉ dùng khi chưa sẵn sàng). */
  wordsToGo: number;
}

export function GraduationCard({
  ready,
  wordsSaid,
  totalWords,
  totalStars,
  childName,
  upgradeHref,
  wordsToGo,
}: Props) {
  // Chưa sẵn sàng: một dòng nhắc nhẹ, không phải quảng cáo. Bé còn đang học dở.
  if (!ready) {
    // Dải vàng nắng nhạt: một lời nhắc ấm, không phải quảng cáo.
    return (
      <div className="rounded-2xl bg-band-sun p-4 text-center">
        <p className="text-[13px] font-bold text-foreground/75">
          Bé nói được thêm <b className="text-brand-gold">{wordsToGo} từ</b> nữa là nhận được bằng khen
          “Bé Tập Nói” và sẵn sàng vào Pre-Starters 🎓
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      // Viền gradient mật ong → san hô làm "khung ảnh" cho tấm bằng bên trong.
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-sun via-brand-honey to-brand-coral p-1.5 shadow-soft-lg"
    >
      <div className="rounded-[2rem] bg-card p-5 sm:p-6">
        {/* Tấm bằng khen — thứ phụ huynh chụp màn hình gửi ông bà */}
        <div className="rounded-2xl border-4 border-dashed border-brand-honey bg-band-yel p-5 text-center">
          <DingBuddy size={72} pose="proud" className="mx-auto" />
          <p className="eyebrow mt-2 text-brand-gold">Bằng khen</p>
          <h3 className="font-display text-3xl font-extrabold text-foreground">{childName || "Bé"}</h3>
          <p className="mt-1 text-[13px] font-bold text-foreground/70">
            đã hoàn thành chặng <b>Bé Tập Nói</b>
          </p>
          <div className="mt-2 flex items-center justify-center gap-4 text-sm font-extrabold text-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-5 w-5 fill-sunny text-sunny" />
              {totalStars} sao
            </span>
            <span className="text-foreground/50">·</span>
            <span>
              {wordsSaid}/{totalWords} từ đầu tiên
            </span>
          </div>
        </div>

        <div className="mt-5 text-center">
          <h4 className="font-display text-xl font-extrabold">Bé sẵn sàng vào Pre-Starters rồi! 🌱</h4>
          <p className="mx-auto mt-1 max-w-md text-[14px] leading-relaxed text-muted-foreground">
            Bé đã nghe và nói được những từ đầu tiên. Chặng tiếp theo bé bắt đầu <b>nhận mặt chữ</b>,
            ghép vần và đọc được từ đầu tiên của mình — có đủ từ vựng, phonics, nghe, nói, đọc, viết
            theo chuẩn Cambridge.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link href={upgradeHref}>
              <Button className="btn-chunky h-14 w-full rounded-2xl px-6 font-display text-base font-extrabold sm:w-auto">
                <Sparkles className="mr-1.5 h-5 w-5" /> Xem gói Pre-Starters
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/roadmap/pre-starters">
              <Button
                variant="outline"
                className="btn-chunky h-14 w-full rounded-2xl border-4 px-6 font-display text-base font-extrabold sm:w-auto"
              >
                Học thử 3 bài miễn phí
              </Button>
            </Link>
          </div>
          <p className="mt-2 text-[12px] font-semibold text-muted-foreground">
            Bé vẫn quay lại Bé Tập Nói bất cứ lúc nào — chặng này miễn phí mãi mãi 💛
          </p>
        </div>
      </div>
    </motion.div>
  );
}
