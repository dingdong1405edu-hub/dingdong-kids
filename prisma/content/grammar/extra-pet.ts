// Ngữ pháp cho các bài BỔ SUNG của cấp này (../extra/pet.ts).
//
// Phần tử thứ i ↔ bài bổ sung thứ i (tính dồn qua các chương của file đó).
// `topic` PHẢI khớp từng chữ với `topic` của bài tương ứng.
//
// Sáu điểm ngữ pháp B1 chưa dùng ở ../grammar/roadmap-pet.ts, mỗi bài dựng bằng
// ĐÚNG từ vựng bài đó vừa dạy. Mỗi phần đủ 8 minigame: 2× fill_blank,
// 2× sentence_order, 2× dịch Việt→Anh, 2× dịch Anh→Việt.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 10 ───────────────────────────
  {
    topic: "Artificial Intelligence",
    sections: [
      {
        id: "rm-pe-ex-10",
        title: "Bị động với động từ khuyết thiếu",
        titleEn: "Modal + be + past participle",
        structure: "S + can / will / should / must (+ not) + be + V3 (+ by …)",
        breakdown: [
          part("Creative decisions", "Chủ ngữ", "Thứ BỊ tác động được đưa lên đầu câu."),
          part("must", "Động từ khuyết thiếu", "can · will · should · must — KHÔNG bao giờ thêm -s, không thêm to."),
          part("be", "Nguyên thể của to be", "Sau modal luôn là “be”, không phải is/are/was."),
          part("made", "V3 — quá khứ phân từ", "make → made · check → checked · replace → replaced."),
          part("by people", "by + người làm", "Chỉ thêm khi ai làm là thông tin quan trọng."),
        ],
        explanation:
          "Bài trước bé đã học bị động “be + V3”. Khi muốn thêm ý CÓ THỂ, SẼ, NÊN, PHẢI thì đặt động từ khuyết thiếu ra trước và giữ nguyên chữ “be”:\n- can be + V3 — This page can be translated in one second. (có thể được dịch)\n- will be + V3 — Many jobs will be changed in the future. (sẽ bị thay đổi)\n- should be + V3 — Every answer should be checked. (nên được kiểm tra)\n- must be + V3 — The data must be kept safe. (phải được giữ an toàn)\nDạng phủ định chỉ cần thêm “not” sau modal: must not be shared, should not be written.\nSau modal LUÔN là “be” ở dạng nguyên thể, và ngay sau đó là V3 — không có “is be”, không có “will is”.",
        usage:
          "Dùng khi bé viết về quy định, quy trình hoặc về những gì máy móc làm được — chỗ mà việc gì xảy ra quan trọng hơn ai làm việc đó.",
        mistakes: [
          mis("This page can be translate in one second.", "This page can be translated in one second.", "Sau “be” phải là V3, không để nguyên thể."),
          mis("Many jobs will are changed in the future.", "Many jobs will be changed in the future.", "Sau modal luôn là “be”, không phải am/is/are/was."),
          mis("The data must be checked from a teacher.", "The data must be checked by a teacher.", "Người làm đi sau “by”, không phải “from”."),
        ],
        examples: [
          ex("Khi nói về khả năng của một công cụ", "This page can be translated in one second.", "Trang này có thể được dịch chỉ trong một giây."),
          ex("Khi nói về tương lai của nghề nghiệp", "Many jobs will be changed by artificial intelligence.", "Nhiều nghề sẽ bị trí tuệ nhân tạo làm thay đổi."),
          ex("Khi nêu một quy tắc làm bài", "Homework should not be written by a machine.", "Bài tập về nhà thì không nên để máy viết hộ.", "should not be + V3 = không nên bị/được làm."),
        ],
        exercises: [
          fb("Many jobs ___ be changed by AI in the future.", "will", ["will", "are", "have", "will to"], "Nói về tương lai → will + be + V3."),
          fb("This page can be ___ in one second.", "translated", ["translated", "translate", "translating", "translates"], "Sau “be” luôn là V3: translate → translated."),
          so(["can", "The", "essay", "be", "checked", "by", "a", "machine"], "The essay can be checked by a machine", "Bài luận có thể được máy kiểm tra.", "can + be + V3, người/vật làm đi sau “by”."),
          so(["must", "Creative", "decisions", "still", "be", "made", "by", "people"], "Creative decisions must still be made by people", "Những quyết định sáng tạo thì vẫn phải do con người đưa ra.", "must + be + V3; “still” đứng giữa modal và “be”."),
          viEn(
            "Dữ liệu phải được kiểm tra cẩn thận.",
            "The data must be checked carefully.",
            [
              "The data must be checked carefully.",
              "The data must checked carefully.",
              "The data must be check carefully.",
              "The data must being checked carefully.",
            ],
            "must + be + V3 (checked).",
          ),
          viEn(
            "Bài tập về nhà không nên để máy viết hộ.",
            "Homework should not be written by a machine.",
            [
              "Homework should not be written by a machine.",
              "Homework should not written by a machine.",
              "Homework should not be write by a machine.",
              "Homework should not be wrote by a machine.",
            ],
            "should not + be + V3 (written).",
          ),
          enVi("This app can be used on any device.", "Ứng dụng này có thể dùng được trên mọi thiết bị.", [
            "Ứng dụng này có thể dùng được trên mọi thiết bị.",
            "Ứng dụng này chỉ dùng được trên một thiết bị.",
            "Thiết bị nào cũng cần tải ứng dụng này.",
            "Ứng dụng này không dùng được trên thiết bị nào.",
          ]),
          enVi("Every answer must be checked by the student.", "Mọi câu trả lời đều phải do chính học sinh kiểm tra lại.", [
            "Mọi câu trả lời đều phải do chính học sinh kiểm tra lại.",
            "Học sinh có thể nhờ máy kiểm tra mọi câu trả lời.",
            "Mọi câu trả lời đều đã được thầy cô kiểm tra.",
            "Học sinh không cần kiểm tra lại câu trả lời nào.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 11 ───────────────────────────
  {
    topic: "Fast Fashion",
    sections: [
      {
        id: "rm-pe-ex-11",
        title: "too much · too many · enough · fewer / less",
        titleEn: "Quantifiers: too much / too many / enough",
        structure: "too many + danh từ ĐẾM ĐƯỢC · too much + danh từ KHÔNG ĐẾM ĐƯỢC · enough + danh từ · tính từ + enough",
        breakdown: [
          part("too many", "+ danh từ số nhiều", "too many T-shirts — nhiều QUÁ MỨC, mang nghĩa xấu."),
          part("too much", "+ danh từ không đếm được", "too much water · too much waste."),
          part("enough", "+ danh từ", "enough space — đủ dùng (enough đứng TRƯỚC danh từ)."),
          part("warm enough", "tính từ + enough", "enough đứng SAU tính từ — không nói “enough warm”."),
          part("fewer / less", "so sánh ít hơn", "fewer + đếm được (fewer clothes) · less + không đếm được (less water)."),
        ],
        explanation:
          "Bốn từ này nói về SỐ LƯỢNG, và chọn sai là câu nghe sai ngay:\n- too many + danh từ đếm được số nhiều: I have too many T-shirts. (nhiều quá mức cần)\n- too much + danh từ không đếm được: We use too much water.\n- enough + DANH TỪ: We already have enough clothes.\n- TÍNH TỪ + enough: This jacket is not warm enough. (không nói “enough warm”)\nKhi so sánh ít hơn: fewer đi với danh từ ĐẾM ĐƯỢC (fewer items), less đi với danh từ KHÔNG ĐẾM ĐƯỢC (less water).\nNhớ: “too” luôn mang ý CHÊ (quá mức), còn “very” chỉ là nhấn mạnh — very cheap là rẻ lắm, too cheap là rẻ đến mức đáng ngờ.",
        usage: "Dùng khi bé viết bài thuyết phục về tiêu dùng: mua bao nhiêu là quá nhiều, thế nào là đủ.",
        mistakes: [
          mis("I have too much clothes.", "I have too many clothes.", "“clothes” đếm được, số nhiều → too many."),
          mis("This shirt is enough strong.", "This shirt is strong enough.", "enough đứng SAU tính từ."),
          mis("We should buy less clothes.", "We should buy fewer clothes.", "Danh từ đếm được thì dùng fewer, không dùng less."),
        ],
        examples: [
          ex("Khi mở tủ quần áo", "I have too many T-shirts and not enough space.", "Tớ có quá nhiều áo phông mà lại không đủ chỗ để."),
          ex("Khi nói về nhà máy dệt", "Factories use too much water to grow cotton.", "Các nhà máy dùng quá nhiều nước để trồng bông."),
          ex("Khi thử một chiếc áo khoác", "This jacket is not warm enough for winter.", "Chiếc áo khoác này không đủ ấm cho mùa đông.", "enough luôn đứng sau tính từ."),
        ],
        exercises: [
          fb("I have too ___ T-shirts and not enough space.", "many", ["many", "much", "lot", "more"], "“T-shirts” đếm được số nhiều → too many."),
          fb("This shirt is not strong ___ for winter.", "enough", ["enough", "too", "very", "much"], "Sau TÍNH TỪ thì dùng enough: strong enough."),
          so(["too", "We", "much", "water", "use"], "We use too much water", "Chúng ta dùng quá nhiều nước.", "“water” không đếm được → too much."),
          so(["enough", "This", "jacket", "is", "not", "warm"], "This jacket is not warm enough", "Chiếc áo khoác này không đủ ấm.", "enough đứng SAU tính từ warm."),
          viEn(
            "Tớ mua quá nhiều quần áo rẻ tiền.",
            "I buy too many cheap clothes.",
            [
              "I buy too many cheap clothes.",
              "I buy too much cheap clothes.",
              "I buy too many cheap clothe.",
              "I buy enough many cheap clothes.",
            ],
            "“clothes” đếm được số nhiều → too many.",
          ),
          viEn(
            "Chiếc áo này không đủ bền.",
            "This shirt is not strong enough.",
            [
              "This shirt is not strong enough.",
              "This shirt is not enough strong.",
              "This shirt is not too strong enough.",
              "This shirt is enough not strong.",
            ],
            "Tính từ + enough: strong enough.",
          ),
          enVi("There is too much waste outside the city.", "Ở ngoại ô thành phố có quá nhiều rác thải.", [
            "Ở ngoại ô thành phố có quá nhiều rác thải.",
            "Ở ngoại ô thành phố hầu như không có rác.",
            "Thành phố đã dọn hết rác ở ngoại ô.",
            "Rác thải trong thành phố nhiều hơn ở ngoại ô.",
          ]),
          enVi("If we bought fewer clothes, factories would use less water.", "Nếu chúng ta mua ít quần áo hơn thì các nhà máy sẽ dùng ít nước hơn.", [
            "Nếu chúng ta mua ít quần áo hơn thì các nhà máy sẽ dùng ít nước hơn.",
            "Nếu các nhà máy dùng ít nước hơn thì quần áo sẽ rẻ hơn.",
            "Chúng ta mua ít quần áo hơn vì nhà máy thiếu nước.",
            "Các nhà máy đã dùng ít nước hơn khi chúng ta mua ít quần áo.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 12 ───────────────────────────
  {
    topic: "Food Waste",
    sections: [
      {
        id: "rm-pe-ex-12",
        title: "Câu điều kiện loại 1 và “unless”",
        titleEn: "First conditional · unless",
        structure: "If + hiện tại đơn, S + will / will not + V (nguyên thể)",
        breakdown: [
          part("If", "Từ nối điều kiện", "Mở đầu vế điều kiện — chuyện CÓ THỂ xảy ra thật."),
          part("we plan our meals", "Hiện tại đơn", "Vế If KHÔNG bao giờ dùng “will”."),
          part("we will waste", "will + V nguyên thể", "Kết quả sẽ xảy ra nếu điều kiện thành."),
          part("less food", "Phần còn lại", "Nội dung của kết quả."),
          part("unless", "= if … not", "Unless we plan = If we do not plan — đã có nghĩa phủ định sẵn."),
        ],
        explanation:
          "Câu điều kiện loại 1 nói về chuyện RẤT CÓ THỂ xảy ra trong tương lai (khác loại 2 là chuyện tưởng tượng):\n- If we plan our meals, we will waste less food.\n- We will waste less food if we plan our meals. (đảo vế thì bỏ dấu phẩy)\nLuật vàng: vế có “If” dùng HIỆN TẠI ĐƠN, vế kia dùng “will” — không bao giờ “If we will…”.\n“Unless” = “if … not”, nên bản thân nó ĐÃ phủ định rồi:\n- Unless we check the use-by date, we will eat something rotten.\n  = If we do not check the use-by date, we will eat something rotten.\nVì thế sau “unless” KHÔNG được thêm “not” lần nữa.",
        usage: "Dùng khi bé viết bài kêu gọi thay đổi thói quen: nêu điều kiện và hậu quả rất cụ thể.",
        mistakes: [
          mis("If we will plan our meals, we will waste less.", "If we plan our meals, we will waste less.", "Vế “If” dùng hiện tại đơn, không dùng will."),
          mis("Unless we do not plan, we will waste food.", "Unless we plan, we will waste food.", "“Unless” đã mang nghĩa phủ định, không thêm “not” nữa."),
          mis("If the food smell bad, we will not eat it.", "If the food smells bad, we will not eat it.", "Chủ ngữ số ít ở hiện tại đơn phải có -s: smells."),
        ],
        examples: [
          ex("Khi lên thực đơn tuần", "If we plan our meals, we will waste less food.", "Nếu nhà mình lên thực đơn trước thì sẽ bớt phí đồ ăn."),
          ex("Khi mở tủ lạnh", "Unless you check the use-by date, you will eat something rotten.", "Nếu bé không xem hạn sử dụng thì sẽ ăn phải đồ hỏng."),
          ex("Khi còn thừa một bao gạo", "I will donate the rice if nobody eats it.", "Nếu không ai ăn thì tớ sẽ đem bao gạo đi cho.", "Đảo vế: vế kết quả lên trước thì không cần dấu phẩy."),
        ],
        exercises: [
          fb("If we ___ a shopping list, we will buy less food.", "make", ["make", "will make", "made", "making"], "Vế “If” dùng hiện tại đơn, không dùng will."),
          fb("___ we change these habits, the bin will stay full.", "Unless", ["Unless", "If", "Although", "Because"], "“Unless” = nếu KHÔNG — hợp với kết quả xấu ở vế sau."),
          so(["will", "We", "waste", "less", "if", "we", "plan"], "We will waste less if we plan", "Nếu lên kế hoạch thì nhà mình sẽ bớt lãng phí.", "Vế kết quả đứng trước, vế “if” dùng hiện tại đơn."),
          so(["donate", "I", "will", "the", "rice", "if", "nobody", "eats", "it"], "I will donate the rice if nobody eats it", "Nếu không ai ăn thì tớ sẽ đem gạo đi cho.", "“nobody” là số ít → eats có -s."),
          viEn(
            "Nếu nhà mình không lên kế hoạch, nhà mình sẽ lại phí đồ ăn.",
            "If we do not plan, we will waste food again.",
            [
              "If we do not plan, we will waste food again.",
              "If we will not plan, we will waste food again.",
              "If we not plan, we will waste food again.",
              "Unless we do not plan, we will waste food again.",
            ],
            "Vế “If” dùng hiện tại đơn: do not plan.",
          ),
          viEn(
            "Nếu bé không xem hạn sử dụng, bé sẽ ăn phải đồ hỏng.",
            "Unless you check the use-by date, you will eat something rotten.",
            [
              "Unless you check the use-by date, you will eat something rotten.",
              "Unless you do not check the use-by date, you will eat something rotten.",
              "Unless you will check the use-by date, you will eat something rotten.",
              "Unless you checked the use-by date, you will eat something rotten.",
            ],
            "Sau “unless” dùng thể khẳng định ở hiện tại đơn.",
          ),
          enVi("If the soup smells fine, we will eat it tonight.", "Nếu nồi canh vẫn còn thơm thì tối nay nhà tớ sẽ ăn.", [
            "Nếu nồi canh vẫn còn thơm thì tối nay nhà tớ sẽ ăn.",
            "Nồi canh có mùi lạ nên tối nay nhà tớ sẽ không ăn.",
            "Tối nay nhà tớ sẽ nấu một nồi canh mới.",
            "Nếu tối nay nhà tớ ăn canh thì canh sẽ còn thơm.",
          ]),
          enVi("Unless we keep the old food at the front, we will forget it.", "Nếu không để đồ cũ ra phía trước thì nhà mình sẽ quên mất nó.", [
            "Nếu không để đồ cũ ra phía trước thì nhà mình sẽ quên mất nó.",
            "Nhà mình để đồ cũ ra phía trước nên đã quên mất nó.",
            "Nếu để đồ cũ ra phía trước thì nhà mình sẽ quên mất nó.",
            "Nhà mình sẽ nhớ mua thêm đồ mới để ở phía trước.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 13 ───────────────────────────
  {
    topic: "Mental Health",
    sections: [
      {
        id: "rm-pe-ex-13",
        title: "Động từ + V-ing hay + to V",
        titleEn: "Gerund or infinitive",
        structure: "enjoy · keep · stop · avoid · practise + V-ing || decide · want · need · promise · learn + to + V",
        breakdown: [
          part("I enjoy", "Nhóm 1", "enjoy · keep · stop · avoid · practise · finish · mind."),
          part("running", "V-ing", "Sau nhóm 1 luôn là động từ thêm -ing."),
          part("I decided", "Nhóm 2", "decide · want · need · promise · hope · learn · try."),
          part("to tell", "to + V nguyên thể", "Sau nhóm 2 luôn là “to” + động từ nguyên thể."),
          part("after / before / at", "Giới từ", "Sau MỌI giới từ đều là V-ing: good at listening, before going."),
        ],
        explanation:
          "Trong tiếng Anh, động từ đứng sau một động từ khác phải đổi dạng — và đổi thế nào là do ĐỘNG TỪ ĐỨNG TRƯỚC quyết định:\n- Nhóm dùng V-ing: enjoy, keep, stop, avoid, practise, finish, mind\n  → I enjoy running. · He keeps worrying. · She stopped playing football.\n- Nhóm dùng to + V: decide, want, need, promise, hope, learn, try\n  → I decided to tell my mother. · She wants to share her worries.\nSau MỌI giới từ (at, of, about, before, after…) cũng luôn là V-ing:\n  → She is good at listening. · Think before posting.\nTiếng Việt không đổi dạng động từ (“tớ thích chạy”, “tớ quyết định kể”) nên phải học thuộc từng nhóm — đây là chỗ trẻ Việt hay sai nhất.",
        usage: "Dùng khi bé kể về thói quen, cảm xúc và quyết định của mình — đúng kiểu câu của bài viết về sức khoẻ tinh thần.",
        mistakes: [
          mis("I enjoy to run every morning.", "I enjoy running every morning.", "Sau “enjoy” luôn là V-ing."),
          mis("I decided telling my mother.", "I decided to tell my mother.", "Sau “decide” luôn là to + V nguyên thể."),
          mis("She is good at listen.", "She is good at listening.", "Sau giới từ “at” phải là V-ing."),
        ],
        examples: [
          ex("Khi kể cách mình thư giãn", "I enjoy running because it changes my mood.", "Tớ thích chạy bộ vì nó làm tâm trạng tớ đổi khác."),
          ex("Khi kể một quyết định khó", "I decided to tell my parents how I felt.", "Tớ quyết định kể cho bố mẹ nghe mình đang thấy thế nào."),
          ex("Khi kể chuyện của bạn mình", "Khoa stopped playing football last month.", "Tháng trước Khoa thôi không đá bóng nữa.", "stop + V-ing = thôi hẳn việc đang làm."),
        ],
        exercises: [
          fb("I enjoy ___ with my friends after school.", "running", ["running", "to run", "run", "runs"], "Sau “enjoy” luôn là V-ing."),
          fb("He decided ___ his teacher about the problem.", "to tell", ["to tell", "telling", "tell", "told"], "Sau “decide” luôn là to + V nguyên thể."),
          so(["stopped", "Khoa", "playing", "football", "last", "month"], "Khoa stopped playing football last month", "Tháng trước Khoa thôi không đá bóng nữa.", "stop + V-ing."),
          so(["to", "I", "want", "share", "my", "worries", "with", "you"], "I want to share my worries with you", "Tớ muốn chia sẻ những lo lắng của mình với cậu.", "want + to + V nguyên thể."),
          viEn(
            "Tớ thích chạy bộ buổi sáng vì nó giúp tớ bình tĩnh lại.",
            "I enjoy running in the morning because it helps me calm down.",
            [
              "I enjoy running in the morning because it helps me calm down.",
              "I enjoy to run in the morning because it helps me calm down.",
              "I enjoy run in the morning because it helps me calm down.",
              "I am enjoy running in the morning because it helps me calm down.",
            ],
            "enjoy + V-ing.",
          ),
          viEn(
            "Bạn ấy quyết định kể chuyện đó với cô giáo.",
            "She decided to tell her teacher about it.",
            [
              "She decided to tell her teacher about it.",
              "She decided telling her teacher about it.",
              "She decided tell her teacher about it.",
              "She decided to telling her teacher about it.",
            ],
            "decide + to + V nguyên thể.",
          ),
          enVi("He keeps worrying about his marks.", "Cậu ấy cứ lo mãi về điểm số của mình.", [
            "Cậu ấy cứ lo mãi về điểm số của mình.",
            "Cậu ấy đã thôi không lo về điểm số nữa.",
            "Cậu ấy muốn hỏi cô giáo về điểm số.",
            "Cậu ấy quên mất là sắp có bài kiểm tra.",
          ]),
          enVi("Try leaving your phone in another room tonight.", "Tối nay bé thử để điện thoại ở phòng khác xem sao.", [
            "Tối nay bé thử để điện thoại ở phòng khác xem sao.",
            "Tối nay bé phải bỏ hẳn điện thoại đi.",
            "Tối nay bé nhớ mang điện thoại sang phòng khác cho mẹ.",
            "Tối nay bé đã để quên điện thoại ở phòng khác.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 14 ───────────────────────────
  {
    topic: "Learning from Failure",
    sections: [
      {
        id: "rm-pe-ex-14",
        title: "should have + V3 — chuyện lẽ ra nên làm",
        titleEn: "should have / should not have + past participle",
        structure: "S + should (not) have + V3",
        breakdown: [
          part("We", "Chủ ngữ", "Mọi ngôi đều dùng “should have” — không có “shoulds”."),
          part("should have", "Cấu trúc tiếc nuối", "Nói về việc ĐÃ QUA, bây giờ không sửa được nữa."),
          part("tested", "V3 — quá khứ phân từ", "test → tested · ask → asked · give → given."),
          part("the car on a cloudy day", "Phần còn lại", "Việc lẽ ra nên làm mà đã không làm."),
        ],
        explanation:
          "“should have + V3” dùng để nói về một việc trong QUÁ KHỨ mà lẽ ra ta nên làm — nhưng đã không làm:\n- We should have tested the car on a cloudy day. (lẽ ra nên thử… nhưng đã không thử)\n- I should have practised the hard part first.\nNgược lại, “should not have + V3” nói về việc lẽ ra KHÔNG nên làm — mà ta đã trót làm:\n- I should not have blamed my friend. (đã trót trách bạn rồi)\nHai lỗi hay gặp: bỏ mất chữ “have” (❌ I should practised) và dùng V2 thay cho V3 (❌ should have gave → ✔ should have given).\nKhi nói nhanh, “should have” nghe như “should’ve” /ˈʃʊdəv/ — nghe kỹ để không tưởng là “should of”.",
        usage: "Dùng khi bé viết bài rút kinh nghiệm sau một lần thất bại — đúng thì để nói “lẽ ra…”.",
        mistakes: [
          mis("I should have practise more.", "I should have practised more.", "Sau “have” phải là V3: practised."),
          mis("I should practised more.", "I should have practised more.", "Thiếu “have” thì câu không còn nói về quá khứ nữa."),
          mis("He should not have gave up.", "He should not have given up.", "give → given (V3), không dùng V2 “gave”."),
        ],
        examples: [
          ex("Khi rút kinh nghiệm sau hội thi", "We should have tested the car on a cloudy day.", "Lẽ ra tụi tớ nên chạy thử xe vào một ngày nhiều mây."),
          ex("Khi nhận ra mình luyện sai cách", "I should have practised the hard part first.", "Lẽ ra tớ nên luyện đoạn khó trước."),
          ex("Khi xin lỗi một người bạn", "I should not have blamed my friend for the result.", "Lẽ ra tớ không nên trách bạn vì kết quả đó.", "should not have + V3 = việc lẽ ra không nên làm."),
        ],
        exercises: [
          fb("We should have ___ the car on a cloudy day.", "tested", ["tested", "test", "testing", "tests"], "Sau “have” luôn là V3: tested."),
          fb("I ___ have blamed my friend; it was not his fault.", "should not", ["should not", "do not", "was not", "should not to"], "Việc đã trót làm mà lẽ ra không nên → should not have + V3."),
          so(["should", "We", "have", "asked", "a", "teacher", "for", "help"], "We should have asked a teacher for help", "Lẽ ra tụi tớ nên nhờ thầy cô giúp.", "should + have + V3 (asked)."),
          so(["have", "I", "should", "practised", "the", "hard", "part", "first"], "I should have practised the hard part first", "Lẽ ra tớ nên luyện đoạn khó trước.", "should + have + V3 (practised)."),
          viEn(
            "Lẽ ra tớ nên luyện tập nhiều hơn.",
            "I should have practised more.",
            [
              "I should have practised more.",
              "I should have practise more.",
              "I should practised more.",
              "I should have practising more.",
            ],
            "should + have + V3.",
          ),
          viEn(
            "Lẽ ra cậu ấy không nên bỏ cuộc.",
            "He should not have given up.",
            [
              "He should not have given up.",
              "He should not have gave up.",
              "He should not gave up.",
              "He should not have give up.",
            ],
            "give → given (V3) sau “have”.",
          ),
          enVi("We should have tested it in the rain.", "Lẽ ra tụi tớ nên thử nó dưới trời mưa.", [
            "Lẽ ra tụi tớ nên thử nó dưới trời mưa.",
            "Tụi tớ đã thử nó dưới trời mưa rồi.",
            "Tụi tớ sẽ thử nó nếu trời mưa.",
            "Tụi tớ không nên thử nó khi trời mưa.",
          ]),
          enVi("You should not have blamed yourself.", "Lẽ ra bé không nên tự trách mình.", [
            "Lẽ ra bé không nên tự trách mình.",
            "Bé nên tự nhận lỗi về mình.",
            "Bé đừng để người khác trách mình.",
            "Lẽ ra bé nên trách bạn ấy mới đúng.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 15 ───────────────────────────
  {
    topic: "Life Online",
    sections: [
      {
        id: "rm-pe-ex-15",
        title: "must · must not · have to · do not have to",
        titleEn: "Obligation and prohibition",
        structure: "S + must (not) + V || S + have / has to + V || S + do / does not have to + V",
        breakdown: [
          part("You", "Chủ ngữ", "have to đổi theo ngôi: he / she has to."),
          part("must not", "CẤM", "Việc tuyệt đối không được làm."),
          part("give", "V nguyên thể", "Sau must / have to luôn là động từ nguyên thể — không “to”, không “-s”."),
          part("your password to anybody", "Phần còn lại", "Nội dung của việc bị cấm."),
          part("do not have to", "KHÔNG BẮT BUỘC", "Làm cũng được, không làm cũng chẳng sao."),
        ],
        explanation:
          "Bốn cấu trúc này rất giống nhau nhưng nghĩa khác hẳn:\n- must + V = phải (do chính người nói thấy cần): You must check your settings.\n- have to + V = phải (do quy định bên ngoài): You have to check those settings every few months.\n- must not + V = CẤM: You must not give your password to anybody.\n- do not have to + V = KHÔNG BẮT BUỘC: You do not have to answer every message.\nChỗ dễ nhầm nhất là hai cái cuối: “must not” là cấm, còn “do not have to” là tuỳ bé. Nói “You do not have to send your password” khi ý bé là CẤM thì người nghe hiểu ngược hẳn.\nSau must / must not / have to luôn là động từ NGUYÊN THỂ: must keep (❌ must to keep, ❌ must keeps).",
        usage: "Dùng khi bé viết nội quy, hướng dẫn an toàn hoặc lời khuyên cho các em nhỏ hơn.",
        mistakes: [
          mis("You must to keep your account private.", "You must keep your account private.", "Sau “must” không có “to”."),
          mis("He must has a strong password.", "He must have a strong password.", "Sau “must” luôn là động từ nguyên thể, không chia."),
          mis("You do not have to send your password to anybody.", "You must not send your password to anybody.", "Ý ở đây là CẤM → dùng “must not”, không dùng “do not have to”."),
        ],
        examples: [
          ex("Khi dặn em nhỏ về mật khẩu", "You must not give your password to anybody.", "Bé không được đưa mật khẩu cho bất kỳ ai."),
          ex("Khi nói về cài đặt riêng tư", "You have to check those settings every few months.", "Cứ vài tháng bé phải kiểm tra lại phần cài đặt đó."),
          ex("Khi có tin nhắn từ người lạ", "You do not have to be polite to a stranger online.", "Bé không nhất thiết phải lịch sự với một người lạ trên mạng.", "do not have to = không bắt buộc, khác hẳn must not (cấm)."),
        ],
        exercises: [
          fb("You ___ not give your password to anybody.", "must", ["must", "have", "are", "do"], "Cấm tuyệt đối → must not + V nguyên thể."),
          fb("She ___ to check her settings every few months.", "has", ["has", "have", "must", "is"], "Chủ ngữ “she” số ít → has to + V."),
          so(["must", "You", "block", "the", "stranger"], "You must block the stranger", "Bé phải chặn người lạ đó.", "must + V nguyên thể, không thêm “to”."),
          so(["have", "You", "do", "not", "to", "answer", "every", "comment"], "You do not have to answer every comment", "Bé không nhất thiết phải trả lời mọi bình luận.", "do not have to = không bắt buộc."),
          viEn(
            "Bé không được đưa mật khẩu cho ai cả.",
            "You must not give your password to anybody.",
            [
              "You must not give your password to anybody.",
              "You do not have to give your password to anybody.",
              "You must not to give your password to anybody.",
              "You must not giving your password to anybody.",
            ],
            "Ý là CẤM → must not + V nguyên thể.",
          ),
          viEn(
            "Bé không nhất thiết phải trả lời mọi bình luận.",
            "You do not have to answer every comment.",
            [
              "You do not have to answer every comment.",
              "You must not answer every comment.",
              "You do not must answer every comment.",
              "You have not to answer every comment.",
            ],
            "Không bắt buộc → do not have to (không phải must not).",
          ),
          enVi("You must report a rude post.", "Bé phải báo cáo bài đăng thô lỗ đó.", [
            "Bé phải báo cáo bài đăng thô lỗ đó.",
            "Bé không được báo cáo bài đăng đó.",
            "Bé có thể báo cáo bài đăng đó nếu muốn.",
            "Bé nên xoá bài đăng thô lỗ đó đi.",
          ]),
          enVi("He does not have to upload his photograph.", "Cậu ấy không nhất thiết phải tải ảnh của mình lên.", [
            "Cậu ấy không nhất thiết phải tải ảnh của mình lên.",
            "Cậu ấy không được phép tải ảnh của mình lên.",
            "Cậu ấy phải tải ảnh của mình lên.",
            "Cậu ấy đã tải ảnh của mình lên rồi.",
          ]),
        ],
      },
    ],
  },
];
