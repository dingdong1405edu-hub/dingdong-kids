// Ngữ pháp cho các bài BỔ SUNG của cấp này (../extra/ket.ts).
//
// Phần tử thứ i ↔ bài bổ sung thứ i (tính dồn qua các chương của file đó).
// `topic` PHẢI khớp từng chữ với `topic` của bài tương ứng.
//
// Sáu điểm ngữ pháp A2 Key, KHÔNG lặp lại 9 điểm đã dạy trong roadmap-ket.ts:
//   10 Part-time Jobs for Teens — be going to (kế hoạch đã định)
//   11 Saving Money            — much / many / a lot of / a few / a little
//   12 Pets and Responsibility — too + tính từ · tính từ + enough
//   13 City and Countryside    — as … as / not as … as (so sánh bằng)
//   14 Public Transport        — bị động hiện tại đơn (is / are + V3)
//   15 Family Traditions       — used to (thói quen ngày xưa)
//
// Ví dụ và bài tập dựng bằng ĐÚNG từ vựng bài đó vừa dạy.
// Mỗi phần đủ 8 minigame: 2× fill_blank, 2× sentence_order, 2× dịch Việt→Anh,
// 2× dịch Anh→Việt.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 10 ───────────────────────────
  {
    topic: "Part-time Jobs for Teens",
    sections: [
      {
        id: "rm-ke-ex-01",
        title: "am · is · are going to — kế hoạch đã định",
        titleEn: "be going to (plans and intentions)",
        structure: "Chủ ngữ + am / is / are + going to + động từ nguyên thể",
        breakdown: [
          part("Trang", "Chủ ngữ", "Người có dự định. I → am · he/she/it → is · you/we/they → are."),
          part("is going to", "be + going to", "Việc đã QUYẾT ĐỊNH từ trước, không phải nghĩ ra ngay lúc nói."),
          part("keep the job", "Động từ nguyên thể", "Sau “to” là động từ trần: không thêm -s, không thêm -ed."),
        ],
        explanation:
          "“be going to + động từ” dùng cho việc mình ĐÃ ĐỊNH TRƯỚC sẽ làm:\n- I am going to apply for a Saturday job.\n- She is going to save most of her wage.\nKhác với “will”:\n- be going to — đã tính rồi, đã có kế hoạch: I am going to work at the bakery this summer.\n- will — quyết định ngay lúc nói, hoặc lời hứa: The shop is busy? OK, I will help you.\nCòn dùng “be going to” khi có DẤU HIỆU rõ ràng trước mắt: Look at those clouds — it is going to rain.\nCâu hỏi đảo “be” lên đầu: Are you going to apply for the job?\nPhủ định: I am not going to give up.",
        usage: "Dùng khi em nói về dự định đi làm thêm, kiếm tiền và tiêu tiền của mình.",
        mistakes: [
          mis("I going to apply for the job.", "I am going to apply for the job.", "Không được thiếu “am / is / are”."),
          mis("She is going to works on Saturday.", "She is going to work on Saturday.", "Sau “to” là động từ trần, không thêm -s."),
          mis("He is going to buy a bicycle yesterday.", "He bought a bicycle yesterday.", "“be going to” nói chuyện SẮP tới, không đi với mốc quá khứ."),
        ],
        examples: [
          ex("Khi nói về mùa hè", "I am going to apply for a job at the bakery.", "Hè này tớ sẽ nộp đơn xin làm ở tiệm bánh."),
          ex("Khi nói về tiền công", "She is going to save most of her wage.", "Chị ấy định để dành gần hết tiền công."),
          ex("Khi hỏi bạn", "Are you going to work every Saturday?", "Cậu định làm mọi thứ Bảy à?"),
        ],
        exercises: [
          fb("I ___ going to apply for a Saturday job.", "am", ["am", "is", "are", "be"], "Chủ ngữ “I” luôn đi với “am”."),
          fb("She is going to ___ most of her wage.", "save", ["save", "saves", "saved", "saving"], "Sau “going to” là động từ trần."),
          so(["going", "I", "am", "to", "deliver", "cakes", "on", "Saturday"], "I am going to deliver cakes on Saturday", "Thứ Bảy tớ sẽ đi giao bánh."),
          so(["you", "Are", "going", "to", "keep", "the", "job"], "Are you going to keep the job", "Cậu định giữ công việc đó chứ?"),
          viEn(
            "Tớ định xin làm ở tiệm bánh.",
            "I am going to apply for a job at the bakery.",
            [
              "I am going to apply for a job at the bakery.",
              "I going to apply for a job at the bakery.",
              "I am going to applies for a job at the bakery.",
              "I am go to apply for a job at the bakery.",
            ],
            "Phải đủ “am + going to”, và sau “to” là động từ trần.",
          ),
          viEn(
            "Chị ấy định để dành tiền công của mình.",
            "She is going to save her wage.",
            [
              "She is going to save her wage.",
              "She going to save her wage.",
              "She is going to saves her wage.",
              "She is going save her wage.",
            ],
            "“She” + is + going to + động từ trần.",
          ),
          enVi(
            "I am going to ask the manager for more hours.",
            "Tớ định xin quản lý cho làm thêm giờ.",
            [
              "Tớ định xin quản lý cho làm thêm giờ.",
              "Tớ đã xin quản lý cho làm thêm giờ rồi.",
              "Quản lý định cho tớ làm thêm giờ.",
              "Tớ không muốn làm thêm giờ nữa.",
            ],
          ),
          enVi(
            "They are going to look for a part-time job in June.",
            "Các bạn ấy định tìm việc làm thêm vào tháng Sáu.",
            [
              "Các bạn ấy định tìm việc làm thêm vào tháng Sáu.",
              "Các bạn ấy đã tìm được việc làm thêm hồi tháng Sáu.",
              "Tháng Sáu các bạn ấy sẽ nghỉ làm.",
              "Các bạn ấy phải làm cả ngày vào tháng Sáu.",
            ],
          ),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 11 ───────────────────────────
  {
    topic: "Saving Money",
    sections: [
      {
        id: "rm-ke-ex-02",
        title: "much · many · a lot of · a few · a little",
        titleEn: "Quantifiers",
        structure: "many / a few + danh từ ĐẾM ĐƯỢC · much / a little + danh từ KHÔNG đếm được · a lot of + cả hai",
        breakdown: [
          part("many snacks", "many + đếm được số nhiều", "Đếm được thì có số nhiều: snack → snacks, coin → coins."),
          part("much money", "much + không đếm được", "money, time, food… không có dạng số nhiều."),
          part("a lot of both", "a lot of + cả hai loại", "An toàn nhất trong câu khẳng định."),
        ],
        explanation:
          "Tiếng Việt chỉ có một chữ “nhiều”, tiếng Anh phải chọn theo LOẠI danh từ:\n- ĐẾM ĐƯỢC (books, coins, snacks): many · a few (một vài) · How many …?\n- KHÔNG ĐẾM ĐƯỢC (money, time, food): much · a little (một chút) · How much …?\n- a lot of — dùng được cho cả hai, hợp với câu khẳng định: I spend a lot of money on snacks.\nTrong câu khẳng định, người bản xứ ít khi dùng “much” một mình: ✔ I have a lot of money. ✘ I have much money.\n“a few / a little” mang nghĩa tích cực — vẫn còn một ít: I keep a little money for the week.",
        usage: "Dùng khi em nói về tiền tiêu vặt, giá cả và những thứ mình mua.",
        mistakes: [
          mis("I have many money.", "I have a lot of money.", "“money” không đếm được nên không đi với “many”."),
          mis("How much snacks do you buy?", "How many snacks do you buy?", "“snacks” đếm được → dùng “How many”."),
          mis("I keep a few money for the week.", "I keep a little money for the week.", "“money” không đếm được → “a little”."),
        ],
        examples: [
          ex("Khi kể thói quen tiêu tiền", "I spend a lot of money on snacks.", "Tớ tiêu khá nhiều tiền vào đồ ăn vặt."),
          ex("Khi đếm đồ mình mua", "I do not buy many snacks any more.", "Giờ tớ không mua nhiều đồ ăn vặt nữa."),
          ex("Khi giữ lại một ít", "I keep a little money for the week.", "Tớ giữ lại một chút tiền tiêu trong tuần."),
        ],
        exercises: [
          fb("I do not buy ___ snacks any more.", "many", ["many", "much", "a little", "a lot"], "“snacks” đếm được → many."),
          fb("I keep ___ money for the week.", "a little", ["a little", "a few", "many", "how many"], "“money” không đếm được → a little."),
          so(["a", "I", "lot", "spend", "of", "money", "on", "snacks"], "I spend a lot of money on snacks", "Tớ tiêu nhiều tiền vào đồ ăn vặt."),
          so(["much", "How", "is", "the", "dictionary"], "How much is the dictionary", "Cuốn từ điển giá bao nhiêu?"),
          viEn(
            "Tuần này tớ đã tiêu quá nhiều tiền.",
            "I have spent too much money this week.",
            [
              "I have spent too much money this week.",
              "I have spent too many money this week.",
              "I have spent too much moneys this week.",
              "I have spend too much money this week.",
            ],
            "“money” không đếm được → much; sau “have” là V3 “spent”.",
          ),
          viEn(
            "Cậu để dành được bao nhiêu tiền rồi?",
            "How much money have you saved?",
            [
              "How much money have you saved?",
              "How many money have you saved?",
              "How much moneys have you saved?",
              "How much money you have saved?",
            ],
            "Hỏi số lượng của danh từ không đếm được → How much.",
          ),
          enVi(
            "There are a lot of books on this table.",
            "Trên bàn này có rất nhiều sách.",
            [
              "Trên bàn này có rất nhiều sách.",
              "Trên bàn này chỉ có vài cuốn sách.",
              "Trên bàn này không có quyển sách nào.",
              "Sách trên bàn này rất đắt.",
            ],
          ),
          enVi(
            "I only have a few coins in my pocket.",
            "Trong túi tớ chỉ còn vài đồng xu.",
            [
              "Trong túi tớ chỉ còn vài đồng xu.",
              "Trong túi tớ có rất nhiều đồng xu.",
              "Tớ không có đồng xu nào trong túi.",
              "Tớ đã cho bạn hết chỗ xu trong túi.",
            ],
          ),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 12 ───────────────────────────
  {
    topic: "Pets and Responsibility",
    sections: [
      {
        id: "rm-ke-ex-03",
        title: "too … · … enough — quá và đủ",
        titleEn: "too + adjective / adjective + enough",
        structure: "too + tính từ (quá … nên không được) · tính từ + enough (đủ … nên làm được)",
        breakdown: [
          part("too young", "too + tính từ", "“quá …” theo nghĩa xấu: quá đến mức KHÔNG làm được."),
          part("old enough", "tính từ + enough", "“đủ …”: enough đứng SAU tính từ, không đứng trước."),
          part("enough space", "enough + danh từ", "Trước DANH TỪ thì enough lại đứng trước."),
        ],
        explanation:
          "Hai cấu trúc rất dễ lẫn:\n- too + tính từ = quá … (nên KHÔNG làm được): Our flat is too small for a big dog.\n- tính từ + enough = đủ … (nên LÀM ĐƯỢC): Milo is old enough to walk to the park.\nNhớ vị trí của “enough”:\n- SAU tính từ hoặc trạng từ: old enough, patient enough, gently enough\n- TRƯỚC danh từ: enough space, enough time, enough food\nDạng phủ định “not … enough” nghĩa là chưa đủ: Milo is not old enough to walk far.\nSau cả hai cấu trúc thường có “to + động từ”: too young to have a dog · old enough to walk far.",
        usage: "Dùng khi em nói mình đã đủ lớn, đủ kiên nhẫn để chăm một con thú cưng hay chưa.",
        mistakes: [
          mis("Milo is enough old to walk far.", "Milo is old enough to walk far.", "“enough” đứng SAU tính từ."),
          mis("The flat is too much small.", "The flat is too small.", "Trước tính từ chỉ cần “too”, không thêm “much”."),
          mis("We do not have space enough.", "We do not have enough space.", "Trước DANH TỪ thì “enough” đứng trước."),
        ],
        examples: [
          ex("Khi mẹ chưa đồng ý", "You are too young to look after a dog.", "Con còn quá nhỏ để chăm một chú chó."),
          ex("Khi chó con còn bé", "Milo is not old enough to walk far.", "Milo chưa đủ lớn để đi dạo xa."),
          ex("Khi nói về chỗ ở", "Our flat is too small for a big dog.", "Căn hộ nhà tớ quá chật cho một chú chó to."),
        ],
        exercises: [
          fb("Milo is not old ___ to walk far.", "enough", ["enough", "too", "very", "much"], "“enough” đứng sau tính từ."),
          fb("A goldfish is ___ quiet for me.", "too", ["too", "enough", "many", "a little"], "“too + tính từ” = quá … đến mức không hợp."),
          so(["too", "You", "are", "young", "to", "have", "a", "dog"], "You are too young to have a dog", "Con còn quá nhỏ để nuôi chó."),
          so(["enough", "Are", "you", "patient", "to", "train", "a", "kitten"], "Are you patient enough to train a kitten", "Cậu có đủ kiên nhẫn để dạy một chú mèo con không?"),
          viEn(
            "Căn hộ nhà tớ quá chật cho một chú chó to.",
            "Our flat is too small for a big dog.",
            [
              "Our flat is too small for a big dog.",
              "Our flat is too much small for a big dog.",
              "Our flat is small enough for a big dog.",
              "Our flat is enough small for a big dog.",
            ],
            "“too + tính từ” là đủ, không thêm “much”.",
          ),
          viEn(
            "Nhà tớ không có đủ chỗ cho một cái lồng.",
            "We do not have enough space for a cage.",
            [
              "We do not have enough space for a cage.",
              "We do not have space enough for a cage.",
              "We do not have too space for a cage.",
              "We do not have enough spaces for a cage.",
            ],
            "Trước danh từ thì “enough” đứng trước; “space” không đếm được.",
          ),
          enVi(
            "My brother is gentle enough to hold the rabbit.",
            "Em trai tớ đủ nhẹ tay để bế chú thỏ.",
            [
              "Em trai tớ đủ nhẹ tay để bế chú thỏ.",
              "Em trai tớ quá mạnh tay nên không bế thỏ được.",
              "Em trai tớ muốn nuôi một chú thỏ.",
              "Chú thỏ quá nặng với em trai tớ.",
            ],
          ),
          enVi(
            "The bowl is too heavy for a kitten.",
            "Cái bát quá nặng với một chú mèo con.",
            [
              "Cái bát quá nặng với một chú mèo con.",
              "Cái bát đủ nhẹ cho một chú mèo con.",
              "Chú mèo con đã đủ lớn để ăn bằng bát.",
              "Cái bát này dành cho chó chứ không cho mèo.",
            ],
          ),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 13 ───────────────────────────
  {
    topic: "City and Countryside",
    sections: [
      {
        id: "rm-ke-ex-04",
        title: "as … as — so sánh bằng",
        titleEn: "as + adjective + as",
        structure: "A + be + as + tính từ + as + B · phủ định: not as + tính từ + as",
        breakdown: [
          part("The village", "Vế A", "Thứ mình đem ra so sánh."),
          part("is as quiet as", "as + tính từ + as", "Tính từ giữ NGUYÊN DẠNG: không -er, không “more”."),
          part("a library", "Vế B", "Thứ được lấy làm chuẩn để so."),
        ],
        explanation:
          "So sánh BẰNG dùng “as … as”, khác hẳn so sánh hơn:\n- The village is as quiet as a library. (bằng nhau)\n- The village is quieter than the city. (hơn)\nDạng phủ định “not as … as” nghĩa là KÉM hơn:\n- The air in Hanoi is not as fresh as the air in the countryside. (= không trong lành bằng)\nHai lỗi phải tránh:\n- Tính từ ở giữa luôn giữ nguyên dạng gốc: ✘ as fresher as · ✘ as more fresh as\n- Vế sau là “as”, KHÔNG phải “than”: ✘ as noisy than yours\nDùng được với cả trạng từ: He runs as fast as his brother.",
        usage: "Dùng khi em so sánh thành phố với vùng quê, hoặc hai nơi mình từng sống.",
        mistakes: [
          mis("The city is as noisier as before.", "The city is as noisy as before.", "Giữa “as … as” thì tính từ giữ nguyên dạng."),
          mis("My street is as noisy than yours.", "My street is as noisy as yours.", "“as … as” đi với “as”; “than” chỉ dùng cho so sánh hơn."),
          mis("The air is not so fresh than the countryside.", "The air is not as fresh as the air in the countryside.", "Cấu trúc đúng là “not as … as”."),
        ],
        examples: [
          ex("Khi nói về không khí", "The air here is not as fresh as the air in the countryside.", "Không khí ở đây không trong lành bằng ở quê."),
          ex("Khi nói về sự yên tĩnh", "My grandmother's village is as quiet as a library.", "Làng của bà tớ yên tĩnh y như một thư viện."),
          ex("Khi so hai ngôi trường", "The new school is as good as mine.", "Trường mới tốt ngang trường của tớ."),
        ],
        exercises: [
          fb("The air here is not as ___ as the air in the countryside.", "fresh", ["fresh", "fresher", "freshest", "more fresh"], "Giữa “as … as” tính từ giữ nguyên dạng."),
          fb("The village is as quiet ___ a library at night.", "as", ["as", "than", "then", "that"], "Cấu trúc là “as … as”, không dùng “than”."),
          so(["as", "The", "new", "school", "is", "good", "as", "mine"], "The new school is as good as mine", "Trường mới tốt ngang trường của tớ."),
          so(["Nothing", "is", "as", "noisy", "as", "my", "street"], "Nothing is as noisy as my street", "Chẳng có gì ồn bằng con phố nhà tớ."),
          viEn(
            "Không khí ở đây không trong lành bằng ở quê.",
            "The air here is not as fresh as the air in the countryside.",
            [
              "The air here is not as fresh as the air in the countryside.",
              "The air here is not as fresher as the air in the countryside.",
              "The air here is not as fresh than the air in the countryside.",
              "The air here is not so fresh than the air in the countryside.",
            ],
            "“not as + tính từ nguyên dạng + as”.",
          ),
          viEn(
            "Con phố nhà tớ ồn như một khu chợ.",
            "My street is as noisy as a market.",
            [
              "My street is as noisy as a market.",
              "My street is as noisier as a market.",
              "My street is as noisy than a market.",
              "My street is more noisy as a market.",
            ],
            "So sánh bằng: as + noisy + as.",
          ),
          enVi(
            "The countryside is not as busy as the city.",
            "Vùng quê không nhộn nhịp bằng thành phố.",
            [
              "Vùng quê không nhộn nhịp bằng thành phố.",
              "Vùng quê nhộn nhịp hơn thành phố.",
              "Vùng quê nhộn nhịp y như thành phố.",
              "Thành phố không nhộn nhịp bằng vùng quê.",
            ],
          ),
          enVi(
            "This shopping centre is as big as a football pitch.",
            "Trung tâm mua sắm này rộng bằng một sân bóng đá.",
            [
              "Trung tâm mua sắm này rộng bằng một sân bóng đá.",
              "Trung tâm mua sắm này rộng hơn một sân bóng đá.",
              "Sân bóng đá rộng hơn trung tâm mua sắm này.",
              "Cạnh sân bóng đá có một trung tâm mua sắm.",
            ],
          ),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 14 ───────────────────────────
  {
    topic: "Public Transport",
    sections: [
      {
        id: "rm-ke-ex-05",
        title: "is · are + V3 — câu bị động ở hiện tại",
        titleEn: "Present simple passive",
        structure: "Chủ ngữ (vật) + am / is / are + V3 (+ by + người làm)",
        breakdown: [
          part("Tickets", "Chủ ngữ", "Thứ ĐƯỢC / BỊ tác động, không phải người làm."),
          part("are sold", "am / is / are + V3", "Số ít → is · số nhiều → are. V3: sold, cleaned, checked, announced."),
          part("by the driver", "by + người làm", "Chỉ thêm khi cần nói rõ AI làm; không cần thì bỏ hẳn."),
        ],
        explanation:
          "Câu bị động dùng khi việc XẢY RA VỚI cái gì quan trọng hơn ai làm ra nó — biển báo và thông báo nhà xe rất hay dùng:\n- The bus is cleaned every night. (không cần biết ai lau)\n- Tickets are sold by the driver. (muốn nói rõ ai bán)\nCách đổi từ chủ động sang bị động:\n- The driver sells tickets. → Tickets are sold by the driver.\nTân ngữ nhảy lên đầu câu, thêm is/are, động từ đổi sang V3, người làm lùi ra sau “by”.\nHai lỗi hay gặp:\n- Quên “be”: ✘ Tickets sold here. → ✔ Tickets are sold here.\n- Dùng tính từ thay V3: ✘ The bus is clean every night. → ✔ The bus is cleaned every night.",
        usage: "Dùng khi em đọc bảng thông báo ở bến xe, nhà ga, hoặc kể xe buýt của mình được dọn dẹp thế nào.",
        mistakes: [
          mis("Tickets sold on the bus.", "Tickets are sold on the bus.", "Câu bị động phải có “am / is / are”."),
          mis("The bus is clean every night.", "The bus is cleaned every night.", "Sau “is” phải là V3 “cleaned”, không phải tính từ “clean”."),
          mis("Each stop are announced through a speaker.", "Each stop is announced through a speaker.", "“Each stop” số ít → “is”."),
        ],
        examples: [
          ex("Khi đọc bảng ở bến xe", "Tickets are sold by the driver.", "Vé do bác tài bán ngay trên xe."),
          ex("Khi nói về xe buổi tối", "The bus is cleaned every night.", "Tối nào xe buýt cũng được dọn sạch."),
          ex("Khi nghe loa trên xe", "Each stop is announced through a speaker.", "Mỗi điểm dừng đều được thông báo qua loa."),
        ],
        exercises: [
          fb("Tickets ___ sold by the driver.", "are", ["are", "is", "am", "be"], "“Tickets” số nhiều → are."),
          fb("The bus is ___ every night at the depot.", "cleaned", ["cleaned", "clean", "cleans", "cleaning"], "Sau “is” trong câu bị động là V3."),
          so(["are", "Tickets", "sold", "on", "the", "bus"], "Tickets are sold on the bus", "Vé được bán ngay trên xe buýt."),
          so(["is", "Each", "stop", "announced", "through", "a", "speaker"], "Each stop is announced through a speaker", "Mỗi điểm dừng đều được báo qua loa."),
          viEn(
            "Tối nào xe buýt cũng được dọn sạch.",
            "The bus is cleaned every night.",
            [
              "The bus is cleaned every night.",
              "The bus is clean every night.",
              "The bus are cleaned every night.",
              "The bus cleaned every night.",
            ],
            "Bị động = is + V3; “The bus” số ít nên dùng “is”.",
          ),
          viEn(
            "Những ghế gần cửa được dành cho hành khách lớn tuổi.",
            "The seats near the door are kept for older passengers.",
            [
              "The seats near the door are kept for older passengers.",
              "The seats near the door is kept for older passengers.",
              "The seats near the door are keep for older passengers.",
              "The seats near the door kept for older passengers.",
            ],
            "“The seats” số nhiều → are + V3 “kept”.",
          ),
          enVi(
            "The fare is written on the window.",
            "Giá vé được ghi ngay trên cửa kính.",
            [
              "Giá vé được ghi ngay trên cửa kính.",
              "Bác tài viết giá vé lên cửa kính.",
              "Giá vé đã bị xoá khỏi cửa kính.",
              "Cửa kính xe buýt rất sạch.",
            ],
          ),
          enVi(
            "This route is used by hundreds of students every day.",
            "Tuyến xe này được hàng trăm học sinh đi mỗi ngày.",
            [
              "Tuyến xe này được hàng trăm học sinh đi mỗi ngày.",
              "Hàng trăm học sinh đang chờ ở tuyến xe này.",
              "Tuyến xe này chỉ dành cho học sinh.",
              "Mỗi ngày có hàng trăm chuyến xe chạy tuyến này.",
            ],
          ),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 15 ───────────────────────────
  {
    topic: "Family Traditions",
    sections: [
      {
        id: "rm-ke-ex-06",
        title: "used to — ngày xưa hay làm, giờ thì không",
        titleEn: "used to",
        structure: "Chủ ngữ + used to + động từ nguyên thể · phủ định: didn’t use to · hỏi: Did … use to …?",
        breakdown: [
          part("My grandmother", "Chủ ngữ", "Dùng chung một dạng cho mọi chủ ngữ, không chia."),
          part("used to", "used to", "Thói quen CŨ trong quá khứ, bây giờ không còn nữa."),
          part("wrap forty cakes", "Động từ nguyên thể", "Sau “to” là động từ trần: không -ed, không -s."),
        ],
        explanation:
          "“used to + động từ” kể thói quen ngày xưa mà bây giờ đã khác:\n- My grandmother used to wrap forty cakes in one evening. (giờ bà không gói nữa)\n- The whole village used to make rice cakes together. (bây giờ mỗi nhà làm riêng)\nChú ý dạng câu:\n- Phủ định: We didn’t use to have a gas cooker. (đã có “did” thì BỎ -d)\n- Câu hỏi: Did you use to help your mother at Tet?\nDùng được cho cả suy nghĩ, trạng thái: I used to think Tet was only about food.\nMuốn nói thói quen BÂY GIỜ thì dùng hiện tại đơn, không dùng “use to”.",
        usage: "Dùng khi ông bà kể chuyện ngày xưa, hoặc khi em so sánh Tết hồi bé với Tết bây giờ.",
        mistakes: [
          mis("My grandmother used to wrapped forty cakes.", "My grandmother used to wrap forty cakes.", "Sau “used to” là động từ trần."),
          mis("We didn’t used to have a gas cooker.", "We didn’t use to have a gas cooker.", "Đã có “did” thì bỏ -d, chỉ còn “use to”."),
          mis("I use to think Tet was only about food.", "I used to think Tet was only about food.", "Chuyện ngày xưa thì phải là “used to”."),
        ],
        examples: [
          ex("Khi bà kể chuyện", "My grandmother used to wrap forty cakes in one evening.", "Ngày xưa bà tớ gói bốn mươi cái bánh trong một tối."),
          ex("Khi nói về cả làng", "The whole village used to make rice cakes together.", "Ngày trước cả làng cùng gói bánh với nhau."),
          ex("Khi hỏi bà", "Did you use to help your mother at Tet?", "Hồi bé bà có hay giúp cụ dịp Tết không ạ?"),
        ],
        exercises: [
          fb("My grandmother used to ___ forty cakes in one evening.", "wrap", ["wrap", "wrapped", "wraps", "wrapping"], "Sau “used to” là động từ trần."),
          fb("We didn’t ___ to have a gas cooker.", "use", ["use", "used", "using", "uses"], "Đã có “didn’t” thì bỏ -d."),
          so(["used", "The", "whole", "village", "to", "make", "rice", "cakes", "together"], "The whole village used to make rice cakes together", "Ngày xưa cả làng cùng gói bánh."),
          so(["you", "Did", "use", "to", "help", "your", "mother"], "Did you use to help your mother", "Ngày xưa bà có hay giúp cụ không ạ?"),
          viEn(
            "Ngày xưa bà tớ gói bốn mươi cái bánh trong một tối.",
            "My grandmother used to wrap forty cakes in one evening.",
            [
              "My grandmother used to wrap forty cakes in one evening.",
              "My grandmother used to wrapped forty cakes in one evening.",
              "My grandmother use to wrap forty cakes in one evening.",
              "My grandmother is used to wrap forty cakes in one evening.",
            ],
            "“used to” + động từ trần.",
          ),
          viEn(
            "Hồi đó nhà tớ không có bếp ga.",
            "We didn’t use to have a gas cooker.",
            [
              "We didn’t use to have a gas cooker.",
              "We didn’t used to have a gas cooker.",
              "We don’t use to have a gas cooker.",
              "We didn’t use to had a gas cooker.",
            ],
            "Có “didn’t” rồi thì bỏ -d và giữ động từ trần.",
          ),
          enVi(
            "I used to think Tet was only about lucky money.",
            "Hồi bé tớ cứ nghĩ Tết chỉ là chuyện tiền lì xì.",
            [
              "Hồi bé tớ cứ nghĩ Tết chỉ là chuyện tiền lì xì.",
              "Bây giờ tớ nghĩ Tết chỉ là chuyện tiền lì xì.",
              "Tớ chưa bao giờ được lì xì dịp Tết.",
              "Tớ nghĩ tiền lì xì nên để dành hết.",
            ],
          ),
          enVi(
            "My cousins used to come home every year.",
            "Ngày trước năm nào các anh chị họ cũng về nhà.",
            [
              "Ngày trước năm nào các anh chị họ cũng về nhà.",
              "Năm nào các anh chị họ cũng sẽ về nhà.",
              "Các anh chị họ chưa bao giờ về nhà dịp Tết.",
              "Năm nay các anh chị họ sẽ về nhà ăn Tết.",
            ],
          ),
        ],
      },
    ],
  },
];
