// Ngữ pháp cho các bài BỔ SUNG của cấp này (../extra/flyers.ts).
//
// Phần tử thứ i ↔ bài bổ sung thứ i (tính dồn qua các chương của file đó).
// `topic` PHẢI khớp từng chữ với `topic` của bài tương ứng.
//
// Sáu điểm ngữ pháp ở đây KHÔNG lặp lại 9 điểm của roadmap-flyers.ts (quá khứ
// đơn bất quy tắc · so sánh nhất · hiện tại đơn · will · bị động quá khứ ·
// must/should · want to be · too much/many/enough · câu điều kiện loại 1):
//   hiện tại hoàn thành · quá khứ tiếp diễn · may/might ·
//   mệnh đề quan hệ who/which/that · to + động từ chỉ mục đích ·
//   because / so / but / although
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 10 ───────────────────────────
  {
    topic: "Living Underwater",
    sections: [
      {
        id: "rm-fl-ex-01",
        title: "Đã từng làm chưa?",
        titleEn: "Present perfect: ever / never / yet",
        structure: "Chủ ngữ + have/has + V3 (+ ever / never / yet)",
        breakdown: [
          part("I / We / They", "Chủ ngữ", "I, you, we, they → have · he, she, it → has."),
          part("have seen", "have/has + V3", "V3 là cột thứ ba: see – saw – seen, be – was – been."),
          part("a turtle", "Phần còn lại", "Không cần nói lúc nào — điều quan trọng là ĐÃ TỪNG."),
        ],
        explanation:
          "Hiện tại hoàn thành kể chuyện mình ĐÃ TỪNG trải qua, không cần nói rõ lúc nào:\n- I have seen a turtle. (Tớ từng thấy rùa biển rồi.)\nBa người bạn hay đi kèm:\n- ever trong câu hỏi: Have you ever seen a dolphin?\n- never = chưa bao giờ: I have never touched a jellyfish.\n- yet ở cuối câu phủ định: I have not seen a dolphin yet.\nNhớ kỹ: hễ có mốc thời gian quá khứ rõ ràng (yesterday, last year) thì phải dùng QUÁ KHỨ ĐƠN chứ không dùng have/has.",
        usage: "Dùng khi bé kể những nơi đã tới, những con vật đã thấy trong đời.",
        mistakes: [
          mis("I have saw a turtle.", "I have seen a turtle.", "Sau “have” phải là V3 (seen), không phải V2 (saw)."),
          mis("Have you ever see an octopus?", "Have you ever seen an octopus?", "Trong câu hỏi cũng vẫn dùng V3."),
          mis("My uncle have explored the ocean.", "My uncle has explored the ocean.", "“My uncle” = he → has."),
        ],
        examples: [
          ex("Khi hỏi bạn về trải nghiệm", "Have you ever seen a dolphin?", "Cậu đã bao giờ nhìn thấy cá heo chưa?"),
          ex("Khi kể điều chưa từng làm", "I have never touched a jellyfish.", "Tớ chưa bao giờ chạm vào con sứa."),
          ex("Khi nói việc vẫn chưa xong", "I have not seen the coral yet.", "Tớ vẫn chưa được xem rạn san hô."),
        ],
        exercises: [
          fb("I have never ___ a jellyfish.", "seen", ["seen", "saw", "see", "seeing"], "Sau “have” phải là V3: see – saw – seen."),
          fb("___ you ever visited an aquarium?", "Have", ["Have", "Has", "Did", "Are"], "Chủ ngữ “you” → Have + you + ever + V3."),
          so(["have", "We", "explored", "the", "coral"], "We have explored the coral", "Chúng tớ đã khám phá rạn san hô."),
          so(["has", "My", "uncle", "been", "a", "diver", "for", "twenty", "years"], "My uncle has been a diver for twenty years", "Cậu tớ làm thợ lặn được hai mươi năm rồi."),
          viEn("Tớ chưa bao giờ nhìn thấy cá heo.", "I have never seen a dolphin.", ["I have never seen a dolphin.", "I have never saw a dolphin.", "I never have seen a dolphin.", "I have never see a dolphin."], "“never” đứng giữa “have” và V3."),
          viEn("Cậu đã bao giờ lặn biển chưa?", "Have you ever dived in the sea?", ["Have you ever dived in the sea?", "Have you ever dive in the sea?", "Do you ever dived in the sea?", "Are you ever dived in the sea?"], "Câu hỏi hiện tại hoàn thành: Have + chủ ngữ + ever + V3."),
          enVi("She has discovered a new kind of fish.", "Chị ấy đã khám phá ra một loài cá mới.", ["Chị ấy đã khám phá ra một loài cá mới.", "Chị ấy sẽ khám phá một loài cá mới.", "Chị ấy đang tìm một loài cá mới.", "Chị ấy thích các loài cá mới."]),
          enVi("I have not seen an octopus yet.", "Tớ vẫn chưa được thấy con bạch tuộc nào.", ["Tớ vẫn chưa được thấy con bạch tuộc nào.", "Tớ vừa thấy một con bạch tuộc.", "Tớ chưa bao giờ thích bạch tuộc.", "Tớ sẽ không đi xem bạch tuộc."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 11 ───────────────────────────
  {
    topic: "Ancient Times",
    sections: [
      {
        id: "rm-fl-ex-02",
        title: "Lúc ấy đang làm gì?",
        titleEn: "Past continuous with when / while",
        structure: "was/were + V-ing … when + quá khứ đơn",
        breakdown: [
          part("I", "Chủ ngữ", "I, he, she, it → was · you, we, they → were."),
          part("was looking", "was/were + V-ing", "Việc ĐANG diễn ra, kéo dài một lúc."),
          part("when I saw the drum", "when + quá khứ đơn", "Việc NGẮN xen vào giữa chừng."),
        ],
        explanation:
          "Quá khứ tiếp diễn tả việc ĐANG diễn ra tại một thời điểm trong quá khứ:\n- At three o’clock we were walking around the temple.\nRất hay dùng chung với quá khứ đơn để kể hai việc cùng lúc:\n- việc DÀI → was/were + V-ing\n- việc NGẮN xen vào → quá khứ đơn\nI was looking at the wall when I saw a small picture.\nMẹo phân biệt: “while” đi với việc dài, “when” đi với việc ngắn.\nWhile the guide was talking, I was looking at the wall.",
        usage: "Dùng khi bé kể một chuyến đi tham quan: lúc đó ai đang làm gì thì chuyện gì xảy ra.",
        mistakes: [
          mis("I was look at the wall.", "I was looking at the wall.", "Sau “was/were” động từ phải thêm -ing."),
          mis("We was leaving the temple.", "We were leaving the temple.", "“We” số nhiều → were."),
          mis("When I was seeing the picture, I shouted.", "When I saw the picture, I shouted.", "Việc xảy ra trong chớp mắt thì dùng quá khứ đơn."),
        ],
        examples: [
          ex("Khi kể việc đang làm dở", "I was looking at the wall when I saw a small picture.", "Tớ đang ngắm bức tường thì thấy một hình khắc nhỏ."),
          ex("Khi kể hai việc cùng lúc", "While the guide was talking, the children were drawing.", "Trong lúc cô hướng dẫn kể chuyện, bọn trẻ đang vẽ."),
          ex("Khi kể chuyện bất ngờ", "When we were leaving, it started to rain.", "Lúc chúng tớ ra về thì trời đổ mưa."),
        ],
        exercises: [
          fb("While the guide ___ talking, I looked at the wall.", "was", ["was", "were", "is", "did"], "“the guide” số ít → was + V-ing."),
          fb("We were ___ the museum when it started to rain.", "leaving", ["leaving", "leave", "left", "leaves"], "Sau “were” phải là V-ing."),
          so(["was", "I", "looking", "at", "the", "old", "stone"], "I was looking at the old stone", "Lúc ấy tớ đang ngắm phiến đá cổ."),
          so(["were", "The", "children", "drawing", "the", "castle"], "The children were drawing the castle", "Bọn trẻ lúc ấy đang vẽ toà lâu đài."),
          viEn("Lúc chúng tớ ra về thì trời bắt đầu mưa.", "When we were leaving, it started to rain.", ["When we were leaving, it started to rain.", "When we were leaving, it starts to rain.", "When we leaved, it started to rain.", "When we were leave, it started to rain."], "Việc dài → were leaving; việc ngắn xen vào → started."),
          viEn("Trong lúc cô giáo đang kể chuyện, tớ nhìn ra ngoài cửa sổ.", "While the teacher was telling a story, I looked out of the window.", ["While the teacher was telling a story, I looked out of the window.", "While the teacher told a story, I was look out of the window.", "While the teacher was tell a story, I looked out of the window.", "While the teacher were telling a story, I looked out of the window."], "Việc dài dùng was + V-ing, việc ngắn dùng quá khứ đơn."),
          enVi("They were building a temple at that time.", "Lúc đó họ đang xây một ngôi đền.", ["Lúc đó họ đang xây một ngôi đền.", "Họ đã xây xong một ngôi đền.", "Họ sẽ xây một ngôi đền.", "Ngôi đền đó rất cổ kính."]),
          enVi("I was reading about ancient kings all evening.", "Cả buổi tối tớ ngồi đọc về các vị vua thời xưa.", ["Cả buổi tối tớ ngồi đọc về các vị vua thời xưa.", "Tối nay tớ sẽ đọc về các vị vua thời xưa.", "Tớ đọc xong quyển sách về các vị vua.", "Tớ rất thích các câu chuyện về vua chúa."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 12 ───────────────────────────
  {
    topic: "Weather Around the World",
    sections: [
      {
        id: "rm-fl-ex-03",
        title: "Có thể sẽ …",
        titleEn: "may / might for possibility",
        structure: "Chủ ngữ + may / might (+ not) + động từ nguyên thể",
        breakdown: [
          part("It", "Chủ ngữ", "may/might dùng chung cho mọi chủ ngữ, không bao giờ đổi."),
          part("might rain", "may/might + động từ trần", "Không -s, không -ing, không “to”."),
          part("this afternoon", "Thời gian", "Chuyện chưa chắc chắn, thường ở tương lai gần."),
        ],
        explanation:
          "“will” là CHẮC CHẮN, còn “may/might” là CÓ THỂ — mình chưa biết chắc:\n- It will rain tomorrow. (chắc chắn mưa)\n- It might rain tomorrow. (có thể mưa, cũng có thể không)\nmay và might gần như giống nhau; “might” nghe ít chắc hơn một chút.\nPhủ định là “may not” / “might not” — KHÔNG dùng “don’t”.\nSau may/might luôn là động từ TRẦN: might be, may go. Không bao giờ có “might is” hay “might to go”.",
        usage: "Dùng khi bé đoán thời tiết, đoán kế hoạch cuối tuần — những chuyện chưa chắc.",
        mistakes: [
          mis("It might rains tomorrow.", "It might rain tomorrow.", "Sau “might” là động từ trần, không thêm -s."),
          mis("It may to be cold tonight.", "It may be cold tonight.", "Sau “may” không có “to”."),
          mis("We don’t might go to the beach.", "We might not go to the beach.", "Phủ định là “might not”, không dùng “don’t”."),
        ],
        examples: [
          ex("Khi đoán thời tiết", "It might rain this afternoon.", "Chiều nay trời có thể mưa."),
          ex("Khi nói kế hoạch chưa chắc", "We may not go to the beach on Saturday.", "Thứ Bảy có thể nhà tớ sẽ không đi biển."),
          ex("Khi nói điều hay xảy ra", "The fog may go away by ten o’clock.", "Sương mù có thể tan trước mười giờ."),
        ],
        exercises: [
          fb("The fog ___ go away by ten o’clock.", "may", ["may", "mays", "may to", "is may"], "may + động từ trần."),
          fb("There ___ be a short shower this afternoon.", "might", ["might", "might to", "mights", "might is"], "might + be, không thêm gì cả."),
          so(["might", "It", "rain", "this", "afternoon"], "It might rain this afternoon", "Chiều nay trời có thể mưa."),
          so(["may", "We", "not", "go", "to", "the", "beach"], "We may not go to the beach", "Có thể nhà tớ sẽ không đi biển."),
          viEn("Ngày mai có thể sẽ có bão.", "There might be a storm tomorrow.", ["There might be a storm tomorrow.", "There might is a storm tomorrow.", "There might to be a storm tomorrow.", "There mights be a storm tomorrow."], "might + be."),
          viEn("Chiều nay có thể trời không mưa.", "It may not rain this afternoon.", ["It may not rain this afternoon.", "It does not may rain this afternoon.", "It may not rains this afternoon.", "It not may rain this afternoon."], "Phủ định: may not + động từ trần."),
          enVi("The weather might change tonight.", "Tối nay thời tiết có thể thay đổi.", ["Tối nay thời tiết có thể thay đổi.", "Tối nay thời tiết chắc chắn sẽ đẹp.", "Thời tiết tối qua đã thay đổi.", "Thời tiết ở đây không bao giờ đổi."]),
          enVi("We may see a rainbow after the shower.", "Sau cơn mưa rào, có thể chúng ta sẽ thấy cầu vồng.", ["Sau cơn mưa rào, có thể chúng ta sẽ thấy cầu vồng.", "Chúng ta đã thấy cầu vồng sau cơn mưa.", "Trời mưa rào nên không có cầu vồng.", "Chúng ta phải xem cầu vồng ngay."]),
        ],
      },
    ],
  },
];
