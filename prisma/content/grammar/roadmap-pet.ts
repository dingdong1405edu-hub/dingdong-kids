// Ngữ pháp gắn vào BÀI LỘ TRÌNH của cấp pet — đi song song với danh sách bài
// trong ../pet.ts (phần tử thứ i ↔ bài thứ i, tính dồn qua các chương).
//
// Trọng tâm B1 Preliminary, mỗi bài một điểm khác nhau, dựng bằng ĐÚNG từ vựng
// bài đó vừa dạy (Technology → device/screen/limit…, Money and Saving →
// afford/borrow/discount…). Mỗi phần đủ 8 minigame: 2× fill_blank,
// 2× sentence_order, 2× dịch Việt→Anh, 2× dịch Anh→Việt.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 1 ───────────────────────────
  {
    topic: "Technology in Our Lives",
    sections: [
      {
        id: "rm-pe-01",
        title: "Câu bị động — be + V3",
        titleEn: "The passive voice",
        structure: "Tân ngữ + be (am/is/are/was/were) + V3 (+ by + người làm)",
        breakdown: [
          part("Our phones", "Chủ ngữ mới", "Thứ BỊ tác động được đưa lên đầu câu."),
          part("are", "Động từ to be", "Chia theo THÌ và theo chủ ngữ mới: is/are · was/were."),
          part("collected", "V3 — quá khứ phân từ", "collect → collected · make → made · take → taken."),
          part("by the school", "by + người làm", "Chỉ thêm khi AI LÀM là thông tin quan trọng."),
        ],
        explanation:
          "Câu chủ động nói AI LÀM; câu bị động nói CHUYỆN GÌ XẢY RA với vật.\n- Chủ động: The school collects our phones.\n- Bị động: Our phones are collected by the school.\nCách đổi: đưa tân ngữ lên đầu → thêm “be” đúng thì → động từ chính chuyển sang V3.\n- Hiện tại: is / are + V3 — The screen is cleaned every day.\n- Quá khứ: was / were + V3 — The app was made in Da Nang.\nDùng bị động khi người làm không quan trọng, không rõ, hoặc ai cũng đoán ra.",
        usage: "Dùng khi bé viết về quy định của trường hoặc mô tả một quy trình — chỗ mà việc xảy ra quan trọng hơn ai làm.",
        mistakes: [
          mis("Our phones are collect before class.", "Our phones are collected before class.", "Bị động phải dùng V3, không để động từ nguyên thể."),
          mis("The rule is make by the school.", "The rule is made by the school.", "make → made; sau “is” luôn là V3."),
          mis("A daily limit was set from my parents.", "A daily limit was set by my parents.", "Người làm đi sau “by”, không phải “from”."),
        ],
        examples: [
          ex("Khi kể quy định của trường", "Every morning our phones are collected in a box.", "Sáng nào điện thoại của tụi tớ cũng bị thu vào một chiếc hộp."),
          ex("Khi nói về một ứng dụng", "The weather app was made by our science club.", "Ứng dụng thời tiết do câu lạc bộ khoa học của tụi tớ làm ra."),
          ex("Khi nói về giới hạn thời gian", "A daily limit is set by my parents.", "Bố mẹ tớ đặt giới hạn thời gian mỗi ngày."),
        ],
        exercises: [
          fb("Every morning our phones ___ collected in a box.", "are", ["are", "is", "have", "do"], "“phones” số nhiều, việc lặp lại hằng ngày → are + V3."),
          fb("The weather app was ___ by our science club.", "made", ["made", "make", "makes", "making"], "Sau “was” luôn là V3: make → made."),
          so(["are", "Screens", "cleaned", "every", "day"], "Screens are cleaned every day", "Màn hình được lau mỗi ngày.", "Bị động ở hiện tại: are + V3."),
          so(["was", "The", "limit", "set", "by", "my", "parents"], "The limit was set by my parents", "Giới hạn do bố mẹ tớ đặt ra.", "Bị động ở quá khứ: was + V3, người làm đi sau “by”."),
          viEn(
            "Điện thoại bị thu vào một chiếc hộp.",
            "The phones are collected in a box.",
            [
              "The phones are collected in a box.",
              "The phones are collect in a box.",
              "The phones is collected in a box.",
              "The phones were collect in a box.",
            ],
            "Bị động ở hiện tại: are + V3 (collected).",
          ),
          viEn(
            "Ứng dụng này được làm ra năm ngoái.",
            "This app was made last year.",
            [
              "This app was made last year.",
              "This app was make last year.",
              "This app is made last year.",
              "This app was making last year.",
            ],
            "“last year” là quá khứ → was + V3 (made).",
          ),
          enVi("Technology is used in every lesson.", "Công nghệ được dùng trong mọi tiết học.", [
            "Công nghệ được dùng trong mọi tiết học.",
            "Công nghệ chỉ được dùng trong một tiết học.",
            "Công nghệ không được dùng trong tiết học nào.",
            "Mọi tiết học đều dạy về công nghệ.",
          ]),
          enVi("The rules were changed last month.", "Các quy định đã được thay đổi hồi tháng trước.", [
            "Các quy định đã được thay đổi hồi tháng trước.",
            "Các quy định sẽ được thay đổi vào tháng sau.",
            "Các quy định chưa hề thay đổi.",
            "Tháng trước tụi tớ đã đổi lớp.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 2 ───────────────────────────
  {
    topic: "Growing Up",
    sections: [
      {
        id: "rm-pe-02a",
        title: "Câu tường thuật — kể lại lời người khác",
        titleEn: "Reported speech",
        structure: "S + told me (that) + mệnh đề LÙI MỘT THÌ",
        breakdown: [
          part("My mother", "Người nói", "Chủ ngữ của câu tường thuật."),
          part("told me", "tell + NGƯỜI nghe", "“tell” phải có người nghe · “say” thì không."),
          part("(that)", "Từ nối", "Có thể lược bỏ, câu vẫn đúng."),
          part("she was proud of me", "Mệnh đề lùi thì", "am/is → was · are → were · V1 → V2 · will → would · can → could."),
        ],
        explanation:
          "Khi kể lại lời người khác, động từ LÙI MỘT THÌ và đại từ đổi theo người kể:\n- “I am proud of you.” → She told me that she was proud of me.\n- “I will phone you.” → I told her that I would phone her.\n- “I have finished my chores.” → I said that I had finished my chores.\nNhớ: tell + NGƯỜI (tell me, tell my mother) · say KHÔNG có người ngay sau (say that…).\nĐây không phải câu hỏi nên KHÔNG đảo trật tự: … that she was proud, chứ không phải … that was she proud.",
        usage: "Dùng khi bé thuật lại một cuộc nói chuyện xin phép với bố mẹ.",
        mistakes: [
          mis("My mother told that she was proud.", "My mother told me that she was proud.", "“tell” phải có người nghe: tell ME."),
          mis("She said me that I could go.", "She told me that I could go.", "“say” không đi kèm người nghe ngay sau; dùng “tell me”."),
          mis("He told me that he will phone me.", "He told me that he would phone me.", "Lùi thì: will → would."),
        ],
        examples: [
          ex("Khi kể lời khen của mẹ", "My mother told me that she was proud of me.", "Mẹ bảo mẹ tự hào về tớ."),
          ex("Khi kể lời hứa của mình", "I told my mother that I would be home by nine.", "Tớ nói với mẹ là chín giờ tớ sẽ về đến nhà."),
          ex("Khi thuật lại lời xin phép", "I said that I had finished all my chores.", "Tớ nói rằng tớ đã làm xong hết việc nhà."),
        ],
        exercises: [
          fb("My mother ___ me that she trusted me.", "told", ["told", "said", "spoke", "talked"], "Có người nghe (“me”) ngay sau nên dùng “told”."),
          fb("He told me that he ___ phone his parents.", "would", ["would", "will", "wills", "would to"], "Lùi thì: will → would."),
          so(["told", "She", "me", "that", "she", "was", "proud"], "She told me that she was proud", "Mẹ bảo mẹ tự hào.", "tell + me, rồi mệnh đề lùi thì: is → was."),
          so(["said", "I", "that", "I", "had", "finished", "my", "chores"], "I said that I had finished my chores", "Tớ nói rằng tớ đã làm xong việc nhà.", "“say” không có người nghe ngay sau; have finished → had finished."),
          viEn(
            "Bố nói với tớ rằng tớ có thể tự đạp xe đi học.",
            "My father told me that I could cycle to school on my own.",
            [
              "My father told me that I could cycle to school on my own.",
              "My father said me that I could cycle to school on my own.",
              "My father told me that I can cycle to school on my own.",
              "My father told that I could cycle to school on my own.",
            ],
            "tell + người nghe, và “can” lùi thành “could”.",
          ),
          viEn(
            "Chị ấy nói với tớ rằng chị ấy sẽ giúp tớ.",
            "She told me that she would help me.",
            [
              "She told me that she would help me.",
              "She said me that she would help me.",
              "She told me that she will help me.",
              "She told that she would help me.",
            ],
            "tell + me, và “will” lùi thành “would”.",
          ),
          enVi("She admitted that she had forgotten her chores.", "Bạn ấy thừa nhận là mình đã quên làm việc nhà.", [
            "Bạn ấy thừa nhận là mình đã quên làm việc nhà.",
            "Bạn ấy nói rằng mình không bao giờ quên việc nhà.",
            "Bạn ấy quên mất là phải làm việc nhà cùng mẹ.",
            "Bạn ấy hứa từ mai sẽ làm việc nhà.",
          ]),
          enVi("My parents told me that they trusted me.", "Bố mẹ nói với tớ rằng bố mẹ tin tưởng tớ.", [
            "Bố mẹ nói với tớ rằng bố mẹ tin tưởng tớ.",
            "Tớ nói với bố mẹ rằng tớ tin bố mẹ.",
            "Bố mẹ bảo tớ phải tin bố mẹ.",
            "Bố mẹ vẫn chưa tin tưởng tớ.",
          ]),
        ],
      },
      {
        id: "rm-pe-02b",
        title: "Quá khứ hoàn thành — việc nào xảy ra trước",
        titleEn: "Past perfect",
        structure: "Việc TRƯỚC: had + V3 · Việc SAU: quá khứ đơn",
        breakdown: [
          part("I came home late", "Quá khứ đơn", "Việc xảy ra SAU — mốc thời gian của câu chuyện."),
          part("because", "Từ nối", "Nối hai việc đã qua."),
          part("I had stopped", "had + V3", "Việc xảy ra TRƯỚC đó."),
          part("to help a classmate", "Chi tiết", "Nội dung của việc xảy ra trước."),
        ],
        explanation:
          "Khi kể HAI việc đã qua, việc nào xảy ra TRƯỚC thì dùng had + V3; việc xảy ra SAU dùng quá khứ đơn:\n- I came home late because I had stopped to help a classmate.\n- By the time my mother came home, I had already finished my chores.\n“had” dùng chung cho MỌI chủ ngữ — không có “hads”, không có “haded”.\nSau “had” luôn là V3: go → gone, do → done, make → made, wash → washed.\nTừ hay đi kèm: already, just, never, by the time, before, after.",
        usage: "Dùng khi bé kể lại một chuyện đã qua và muốn nói rõ việc nào xảy ra trước.",
        mistakes: [
          mis("She had went to the market.", "She had gone to the market.", "Sau “had” là V3 (gone), không phải V2 (went)."),
          mis("By the time she phoned, I already finished.", "By the time she phoned, I had already finished.", "Thiếu “had” thì không thấy việc nào xảy ra trước."),
          mis("I had wash the dishes before dinner.", "I had washed the dishes before dinner.", "Sau “had” phải đủ đuôi -ed của V3."),
        ],
        examples: [
          ex("Khi giải thích vì sao về muộn", "I came home late because I had stopped to help a classmate.", "Tớ về muộn vì tớ đã dừng lại giúp một bạn cùng lớp."),
          ex("Khi khoe đã làm xong việc nhà", "By the time my mother came home, I had already finished my chores.", "Lúc mẹ về đến nhà là tớ đã làm xong việc nhà rồi."),
          ex("Khi kể một lần đầu tiên", "I had never cycled to school on my own before that summer.", "Trước mùa hè đó tớ chưa từng tự đạp xe tới trường."),
        ],
        exercises: [
          fb("By the time my mother came home, I ___ already finished my chores.", "had", ["had", "have", "has", "was"], "Việc xảy ra trước một mốc quá khứ → had + V3."),
          fb("I was late because I had ___ to help a classmate.", "stopped", ["stopped", "stop", "stopping", "stops"], "Sau “had” luôn là V3."),
          so(["had", "She", "never", "done", "the", "chores", "on", "her", "own", "before"], "She had never done the chores on her own before", "Trước đó chị ấy chưa từng tự làm việc nhà một mình.", "do → done; “never” đứng giữa had và V3."),
          so(["had", "I", "washed", "the", "dishes", "before", "dinner"], "I had washed the dishes before dinner", "Tớ đã rửa bát xong trước bữa tối.", "Việc rửa bát xảy ra trước bữa tối → had + V3."),
          viEn(
            "Lúc bố về đến nhà, tớ đã làm xong bài tập.",
            "When my father got home, I had finished my homework.",
            [
              "When my father got home, I had finished my homework.",
              "When my father got home, I have finished my homework.",
              "When my father got home, I had finish my homework.",
              "When my father got home, I finished already my homework.",
            ],
            "Việc xảy ra trước → had + V3.",
          ),
          viEn(
            "Trước mùa hè đó tớ chưa bao giờ tự đạp xe tới trường.",
            "I had never cycled to school on my own before that summer.",
            [
              "I had never cycled to school on my own before that summer.",
              "I have never cycled to school on my own before that summer.",
              "I had never cycle to school on my own before that summer.",
              "I was never cycled to school on my own before that summer.",
            ],
            "Mốc trong quá khứ (“that summer”) → had + V3, không dùng “have”.",
          ),
          enVi("He admitted that he had made a mistake.", "Bạn ấy thừa nhận rằng mình đã mắc một lỗi.", [
            "Bạn ấy thừa nhận rằng mình đã mắc một lỗi.",
            "Bạn ấy nói rằng mình không mắc lỗi nào.",
            "Bạn ấy sẽ thừa nhận lỗi vào ngày mai.",
            "Bạn ấy đã sửa xong lỗi của mình.",
          ]),
          enVi("My parents had already given me permission.", "Bố mẹ tớ đã cho phép tớ từ trước rồi.", [
            "Bố mẹ tớ đã cho phép tớ từ trước rồi.",
            "Bố mẹ tớ vẫn chưa cho phép tớ.",
            "Bố mẹ tớ sẽ cho phép tớ vào tuần sau.",
            "Tớ đang xin phép bố mẹ.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 3 ───────────────────────────
  {
    topic: "Money and Saving",
    sections: [
      {
        id: "rm-pe-03",
        title: "Câu điều kiện loại 2 — nếu… thì…",
        titleEn: "Second conditional",
        structure: "If + S + V2 / were, S + would + V nguyên thể",
        breakdown: [
          part("If I saved", "If + quá khứ đơn", "Điều kiện KHÔNG có thật ở hiện tại."),
          part("more money", "Tân ngữ", "Chi tiết của điều kiện."),
          part("I would buy", "would + động từ nguyên thể", "Kết quả tưởng tượng, chưa xảy ra."),
          part("that guitar", "Tân ngữ", "Thứ mình sẽ mua nếu điều kiện thành sự thật."),
        ],
        explanation:
          "Câu điều kiện loại 2 nói chuyện KHÔNG CÓ THẬT hoặc khó xảy ra ở hiện tại:\n- If I saved more, I would buy that guitar. (thực tế: tớ chưa để dành đủ)\nVế “If” dùng QUÁ KHỨ ĐƠN nhưng KHÔNG nói về quá khứ; vế còn lại dùng would + động từ nguyên thể.\nVới động từ “to be”, tiếng Anh chuẩn dùng “were” cho mọi chủ ngữ: If I were you…\nHai vế đổi chỗ được: I would buy that guitar if I saved more. (đổi chỗ thì bỏ dấu phẩy)",
        usage: "Dùng khi bé bàn chuyện tiền nong tưởng tượng: nếu để dành thì sao, nếu đủ tiền thì mua gì.",
        mistakes: [
          mis("If I would save more, I would buy a guitar.", "If I saved more, I would buy a guitar.", "Vế “If” KHÔNG dùng “would”."),
          mis("If I saved more, I will buy a guitar.", "If I saved more, I would buy a guitar.", "Loại 2 dùng “would”, không dùng “will”."),
          mis("If I had enough money, I would bought it.", "If I had enough money, I would buy it.", "Sau “would” là động từ nguyên thể."),
        ],
        examples: [
          ex("Khi mơ về cây đàn", "If I saved every week, I would buy that guitar.", "Nếu tuần nào cũng để dành, tớ sẽ mua được cây đàn đó."),
          ex("Khi nói về chuyến đi của trường", "If I saved nothing, I would miss every school trip.", "Nếu chẳng để dành gì, tớ sẽ lỡ hết các chuyến đi của trường."),
          ex("Khi khuyên bạn", "If I were you, I would keep track of every purchase.", "Nếu tớ là bạn, tớ sẽ ghi lại từng khoản mình mua."),
        ],
        exercises: [
          fb("If I ___ more money, I would buy that guitar.", "saved", ["saved", "save", "would save", "will save"], "Vế “If” dùng quá khứ đơn, không dùng “would”."),
          fb("If she had a discount, she ___ afford the trip.", "would", ["would", "will", "would to", "did"], "Kết quả tưởng tượng dùng “would” + động từ nguyên thể."),
          so(["saved", "If", "I", "nothing", "I", "would", "miss", "every", "trip"], "If I saved nothing, I would miss every trip", "Nếu không để dành gì, tớ sẽ lỡ mọi chuyến đi.", "Vế If dùng quá khứ đơn, vế sau dùng would + V nguyên thể."),
          so(["were", "If", "I", "you", "I", "would", "keep", "track", "of", "it"], "If I were you, I would keep track of it", "Nếu tớ là bạn, tớ sẽ ghi lại các khoản chi.", "“If I were you” là mẫu câu khuyên nhủ quen thuộc."),
          viEn(
            "Nếu đủ tiền, tớ sẽ mua cây đàn đó.",
            "If I could afford it, I would buy that guitar.",
            [
              "If I could afford it, I would buy that guitar.",
              "If I can afford it, I would buy that guitar.",
              "If I could afford it, I will buy that guitar.",
              "If I would afford it, I would buy that guitar.",
            ],
            "Loại 2: vế If lùi về “could”, vế sau dùng “would” + động từ nguyên thể.",
          ),
          viEn(
            "Nếu tớ là bạn, tớ sẽ không mượn tiền.",
            "If I were you, I would not borrow money.",
            [
              "If I were you, I would not borrow money.",
              "If I am you, I would not borrow money.",
              "If I were you, I will not borrow money.",
              "If I were you, I would not borrowed money.",
            ],
            "“If I were you” + would + động từ nguyên thể.",
          ),
          enVi("If the bike were cheaper, I would buy it today.", "Nếu chiếc xe đạp rẻ hơn thì hôm nay tớ sẽ mua.", [
            "Nếu chiếc xe đạp rẻ hơn thì hôm nay tớ sẽ mua.",
            "Chiếc xe đạp rẻ nên hôm nay tớ đã mua rồi.",
            "Hôm nay tớ mua được một chiếc xe đạp rẻ.",
            "Nếu tớ mua chiếc xe đó thì nó sẽ rẻ hơn.",
          ]),
          enVi("If I wasted less, I would have more pocket money.", "Nếu bớt lãng phí đi, tớ sẽ có nhiều tiền tiêu vặt hơn.", [
            "Nếu bớt lãng phí đi, tớ sẽ có nhiều tiền tiêu vặt hơn.",
            "Tớ ít lãng phí nên tớ có nhiều tiền tiêu vặt.",
            "Nếu có nhiều tiền tiêu vặt hơn, tớ sẽ bớt lãng phí.",
            "Tớ muốn xin thêm tiền tiêu vặt.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 4 ───────────────────────────
  {
    topic: "The Environment",
    sections: [
      {
        id: "rm-pe-04",
        title: "although · however · therefore — nối ý khi lập luận",
        titleEn: "Linking words for arguments",
        structure: "Although + MĐ, MĐ · MĐ. However, MĐ. · MĐ. Therefore, MĐ.",
        breakdown: [
          part("Although", "Từ nối trái ý — nằm TRONG câu", "Nối hai mệnh đề trong CÙNG một câu: Although it rained, we cleaned the beach."),
          part("However", "Trạng từ trái ý — mở CÂU MỚI", "Đứng đầu câu và luôn có dấu phẩy ngay sau: However, the litter came back."),
          part("Therefore", "Từ nối chỉ kết quả", "“Vì vậy” — nêu kết luận rút ra: Therefore, we must reduce plastic."),
        ],
        explanation:
          "Ba từ nối làm đoạn văn nghe có lập luận:\n- although + MỘT MỆNH ĐỀ (đủ chủ ngữ + động từ), nằm trong cùng một câu:\n  Although we collected four hundred kilograms, the beach was dirty again.\n- however mở MỘT CÂU MỚI và luôn có dấu phẩy ngay sau nó:\n  We collected a lot of rubbish. However, the litter came back.\n- therefore nêu KẾT QUẢ, cũng mở một câu mới:\n  Plastic damages the sea. Therefore, we must reduce it.\nĐừng nhầm “although” với “but”: một câu chỉ cần MỘT trong hai, không dùng cả hai.",
        usage: "Dùng khi bé viết đoạn nêu ý kiến về môi trường: nêu mặt tốt, nêu mặt trái, rồi rút ra kết luận.",
        mistakes: [
          mis("Although we cleaned the beach, but the litter came back.", "Although we cleaned the beach, the litter came back.", "Đã có “although” thì bỏ “but”."),
          mis("Although the pollution, the fish came back.", "Although there was pollution, the fish came back.", "Sau “although” phải là mệnh đề đủ chủ ngữ + động từ."),
          mis("We recycle paper, however we still waste plastic.", "We recycle paper. However, we still waste plastic.", "“However” mở một câu mới và có dấu phẩy ngay sau."),
        ],
        examples: [
          ex("Khi nêu mặt trái", "Although we collected four hundred kilograms, the beach was dirty again.", "Mặc dù tụi tớ nhặt được bốn trăm ki-lô-gam, bãi biển vẫn bẩn như cũ."),
          ex("Khi nối hai câu trái ý", "Recycling is easy. However, most people still throw plastic away.", "Tái chế thì dễ. Tuy nhiên, phần lớn mọi người vẫn vứt nhựa đi."),
          ex("Khi rút ra kết luận", "Plastic damages the sea. Therefore, we must reduce it.", "Nhựa làm hại biển. Vì vậy, chúng ta phải giảm nhựa lại."),
        ],
        exercises: [
          fb("___ we cleaned the beach, the litter came back a month later.", "Although", ["Although", "However", "Therefore", "Because of"], "“Although” nối hai mệnh đề trong cùng một câu."),
          fb("Plastic damages the sea. ___, we must reduce it.", "Therefore", ["Therefore", "Although", "Because", "But"], "Câu sau nêu KẾT LUẬN nên dùng “Therefore”."),
          so(["Although", "it", "rained", "we", "cleaned", "the", "beach"], "Although it rained, we cleaned the beach", "Mặc dù trời mưa, tụi tớ vẫn dọn bãi biển.", "Sau “although” là một mệnh đề đủ, rồi tới mệnh đề chính."),
          so(["However", "the", "rubbish", "came", "back", "very", "quickly"], "However, the rubbish came back very quickly", "Tuy nhiên, rác quay lại rất nhanh.", "“However” mở câu mới, có dấu phẩy ngay sau."),
          viEn(
            "Mặc dù tớ có tái chế giấy, tớ vẫn dùng quá nhiều nhựa.",
            "Although I recycle paper, I still use too much plastic.",
            [
              "Although I recycle paper, I still use too much plastic.",
              "Although I recycle paper, but I still use too much plastic.",
              "Although recycle paper, I still use too much plastic.",
              "However I recycle paper, I still use too much plastic.",
            ],
            "Đã có “although” thì không thêm “but”, và sau nó phải là mệnh đề đủ.",
          ),
          viEn(
            "Ô nhiễm đang nặng thêm. Vì vậy, chúng ta phải hành động ngay.",
            "Pollution is getting worse. Therefore, we must take action now.",
            [
              "Pollution is getting worse. Therefore, we must take action now.",
              "Pollution is getting worse. Therefore, we must to take action now.",
              "Pollution is getting worse. Although, we must take action now.",
              "Pollution is getting worse. Therefore, we must taking action now.",
            ],
            "“Therefore” mở câu kết luận; sau “must” là động từ nguyên thể.",
          ),
          enVi("Although the campaign was small, it made a difference.", "Mặc dù chiến dịch nhỏ, nó vẫn tạo ra khác biệt.", [
            "Mặc dù chiến dịch nhỏ, nó vẫn tạo ra khác biệt.",
            "Chiến dịch nhỏ nên chẳng thay đổi được gì.",
            "Một chiến dịch lớn đã tạo ra khác biệt.",
            "Vì chiến dịch nhỏ nên nó mới tạo ra khác biệt.",
          ]),
          enVi("We reduced our rubbish. However, we still used plastic bags.", "Tụi tớ đã giảm được rác. Tuy nhiên, tụi tớ vẫn dùng túi ni lông.", [
            "Tụi tớ đã giảm được rác. Tuy nhiên, tụi tớ vẫn dùng túi ni lông.",
            "Tụi tớ đã giảm rác và bỏ hẳn túi ni lông.",
            "Tụi tớ chưa giảm được rác nên vẫn dùng túi ni lông.",
            "Tụi tớ dùng túi ni lông để giảm rác.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 5 ───────────────────────────
  {
    topic: "Sports and Competition",
    sections: [
      {
        id: "rm-pe-05",
        title: "have been + V-ing — việc kéo dài tới bây giờ",
        titleEn: "Present perfect continuous",
        structure: "S + have / has been + V-ing (+ for / since …)",
        breakdown: [
          part("I", "Chủ ngữ", "I / you / we / they → have · he / she / it → has."),
          part("have been", "have / has + been", "Bắt đầu trong quá khứ và VẪN đang tiếp diễn."),
          part("practising", "V-ing", "Hành động kéo dài, chưa dừng lại."),
          part("for three years", "for / since", "for + KHOẢNG thời gian · since + MỐC bắt đầu."),
        ],
        explanation:
          "Dùng khi việc bắt đầu trong quá khứ và VẪN còn tiếp tục đến bây giờ:\n- I have been practising for three years. (giờ vẫn đang tập)\n- Our coach has been training us since June.\nfor + khoảng thời gian (for two hours, for a month) · since + mốc bắt đầu (since June, since 2023).\nhe / she / it dùng “has been”, các chủ ngữ còn lại dùng “have been”. Sau “been” luôn là V-ing.\nKhác nhau nhỏ: “I have practised” nhấn KẾT QUẢ, còn “I have been practising” nhấn QUÁ TRÌNH kéo dài.",
        usage: "Dùng khi bé kể mình đã luyện tập môn thể thao bao lâu và tiến bộ ra sao.",
        mistakes: [
          mis("I have been practise for three years.", "I have been practising for three years.", "Sau “been” phải là V-ing."),
          mis("She have been training since June.", "She has been training since June.", "“She” đi với “has”."),
          mis("We have been playing since two hours.", "We have been playing for two hours.", "“two hours” là khoảng thời gian → dùng “for”."),
        ],
        examples: [
          ex("Khi kể mình tập bao lâu", "I have been practising with the team for three years.", "Tớ tập cùng đội đã ba năm rồi."),
          ex("Khi nói về huấn luyện viên", "Our coach has been encouraging us all season.", "Cả mùa giải huấn luyện viên vẫn luôn động viên tụi tớ."),
          ex("Khi nói về tiến bộ của đồng đội", "My teammates have been improving since the tournament started.", "Các đồng đội của tớ tiến bộ dần từ khi giải đấu bắt đầu."),
        ],
        exercises: [
          fb("I have ___ practising for three years.", "been", ["been", "be", "being", "was"], "Cấu trúc là have / has BEEN + V-ing."),
          fb("Our coach has been training us ___ June.", "since", ["since", "for", "from", "during"], "“June” là MỐC bắt đầu nên dùng “since”."),
          so(["been", "I", "have", "practising", "for", "two", "hours"], "I have been practising for two hours", "Tớ tập được hai tiếng rồi.", "have been + V-ing; “two hours” là khoảng → for."),
          so(["has", "She", "been", "improving", "since", "the", "tournament"], "She has been improving since the tournament", "Chị ấy tiến bộ dần từ giải đấu đó.", "“She” đi với “has”; “the tournament” là mốc → since."),
          viEn(
            "Tớ đã tập cùng đồng đội suốt ba năm nay.",
            "I have been practising with my teammates for three years.",
            [
              "I have been practising with my teammates for three years.",
              "I have been practise with my teammates for three years.",
              "I has been practising with my teammates for three years.",
              "I have been practising with my teammates since three years.",
            ],
            "have BEEN + V-ing, và “three years” là khoảng nên dùng “for”.",
          ),
          viEn(
            "Huấn luyện viên đã động viên tụi tớ từ đầu mùa giải.",
            "Our coach has been encouraging us since the start of the season.",
            [
              "Our coach has been encouraging us since the start of the season.",
              "Our coach have been encouraging us since the start of the season.",
              "Our coach has been encourage us since the start of the season.",
              "Our coach has been encouraging us for the start of the season.",
            ],
            "“Our coach” số ít → has been; “the start” là mốc → since.",
          ),
          enVi("He has been playing football since he was six.", "Bạn ấy chơi bóng đá từ hồi sáu tuổi tới giờ.", [
            "Bạn ấy chơi bóng đá từ hồi sáu tuổi tới giờ.",
            "Bạn ấy chơi bóng đá năm sáu tuổi rồi bỏ hẳn.",
            "Bạn ấy đã chơi bóng đá được đúng sáu năm.",
            "Năm sáu tuổi bạn ấy mới bắt đầu thích bóng đá.",
          ]),
          enVi("We have been waiting for the results all morning.", "Tụi tớ đã chờ kết quả suốt cả buổi sáng.", [
            "Tụi tớ đã chờ kết quả suốt cả buổi sáng.",
            "Tụi tớ sẽ chờ kết quả vào buổi sáng mai.",
            "Sáng nay tụi tớ đã biết kết quả rồi.",
            "Tụi tớ chỉ chờ kết quả một lát thôi.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 6 ───────────────────────────
  {
    topic: "News and Media",
    sections: [
      {
        id: "rm-pe-06",
        title: "who · which · that — mệnh đề quan hệ",
        titleEn: "Defining & non-defining relative clauses",
        structure: "Danh từ + who / which / that + mệnh đề · Danh từ, who / which + mệnh đề, …",
        breakdown: [
          part("a journalist", "Danh từ đứng trước", "Người hoặc vật được nói tới."),
          part("who", "Đại từ quan hệ", "who cho NGƯỜI · which cho VẬT · that thay được cả hai (chỉ ở mệnh đề xác định)."),
          part("checks the facts", "Mệnh đề quan hệ", "Phần bổ nghĩa, cho biết thêm về danh từ đứng trước."),
          part(", who …,", "Cặp dấu phẩy", "Có phẩy = thông tin THÊM; bỏ đi câu vẫn đủ nghĩa."),
        ],
        explanation:
          "Mệnh đề quan hệ giúp gộp hai câu thành một câu dài, mạch lạc:\n- XÁC ĐỊNH (KHÔNG có phẩy) — thông tin bắt buộc, thiếu nó thì không biết đang nói về ai:\n  A journalist who checks the facts is reliable.\n  This is the article that changed my opinion.  ← ở đây “that” thay được cho who / which.\n- KHÔNG XÁC ĐỊNH (CÓ phẩy) — thông tin thêm, bỏ đi câu vẫn đủ:\n  My aunt, who is a journalist, never shares fake news.\n  Loại này KHÔNG BAO GIỜ dùng “that”.\nwho → người · which → vật, sự việc · where → nơi chốn.",
        usage: "Dùng khi bé mô tả một bài báo, một nguồn tin hay một nhà báo, và khi viết câu dài có lập luận.",
        mistakes: [
          mis("A journalist which checks the facts is reliable.", "A journalist who checks the facts is reliable.", "Nói về NGƯỜI thì dùng “who”, không dùng “which”."),
          mis("My aunt, that is a journalist, checks the facts.", "My aunt, who is a journalist, checks the facts.", "Mệnh đề có dấu phẩy KHÔNG dùng “that”."),
          mis("This is the article which it changed my opinion.", "This is the article which changed my opinion.", "“which” đã đóng vai chủ ngữ rồi, không thêm “it”."),
        ],
        examples: [
          ex("Khi tả một nhà báo đáng tin", "A journalist who checks the facts is reliable.", "Một nhà báo chịu kiểm chứng thông tin là người đáng tin."),
          ex("Khi nói về một bài báo", "This is the article that changed my opinion.", "Đây là bài báo đã làm tớ đổi ý kiến."),
          ex("Khi thêm thông tin phụ", "My aunt, who is a journalist, never shares fake news.", "Dì tớ, người làm nhà báo, không bao giờ chia sẻ tin giả."),
        ],
        exercises: [
          fb("A journalist ___ checks the facts is reliable.", "who", ["who", "which", "where", "what"], "Nói về NGƯỜI nên dùng “who”."),
          fb("This is the article ___ changed my opinion.", "which", ["which", "who", "whose", "where"], "Nói về VẬT (bài báo) nên dùng “which”."),
          so(["who", "A", "reporter", "checks", "the", "facts", "is", "reliable"], "A reporter who checks the facts is reliable", "Một phóng viên chịu kiểm chứng là người đáng tin.", "“who” bổ nghĩa cho “a reporter”, rồi mới tới động từ chính “is”."),
          so(["which", "The", "headline", "spread", "quickly", "was", "fake"], "The headline which spread quickly was fake", "Cái tiêu đề lan đi rất nhanh ấy là tin giả.", "“which” bổ nghĩa cho “the headline”; động từ chính của câu là “was”."),
          viEn(
            "Tớ không tin những bài báo không nêu nguồn.",
            "I do not trust articles that have no source.",
            [
              "I do not trust articles that have no source.",
              "I do not trust articles who have no source.",
              "I do not trust articles that they have no source.",
              "I do not trust articles which has no source.",
            ],
            "Nói về VẬT nên dùng “that / which”, và không thêm chủ ngữ “they”.",
          ),
          viEn(
            "Dì tớ, người làm nhà báo, luôn kiểm chứng thông tin.",
            "My aunt, who is a journalist, always checks the facts.",
            [
              "My aunt, who is a journalist, always checks the facts.",
              "My aunt, that is a journalist, always checks the facts.",
              "My aunt, which is a journalist, always checks the facts.",
              "My aunt, who is a journalist, always check the facts.",
            ],
            "Mệnh đề có dấu phẩy chỉ dùng “who / which”; động từ chính vẫn chia theo “My aunt”.",
          ),
          enVi("The website which spreads fake news is not reliable.", "Trang web lan truyền tin giả ấy không đáng tin.", [
            "Trang web lan truyền tin giả ấy không đáng tin.",
            "Trang web đáng tin ấy lan truyền tin giả.",
            "Tin giả lan truyền trên mọi trang web.",
            "Trang web ấy đăng tin giả nhưng vẫn đáng tin.",
          ]),
          enVi("My teacher, who reads three newspapers, showed us the evidence.", "Thầy tớ, người đọc tới ba tờ báo, đã cho tụi tớ xem bằng chứng.", [
            "Thầy tớ, người đọc tới ba tờ báo, đã cho tụi tớ xem bằng chứng.",
            "Thầy tớ bảo tụi tớ đọc ba tờ báo để tìm bằng chứng.",
            "Ba tờ báo đều đăng bằng chứng mà thầy tớ đưa ra.",
            "Thầy tớ đọc ba tờ báo nhưng không tìm được bằng chứng.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 7 ───────────────────────────
  {
    topic: "Choosing a Career",
    sections: [
      {
        id: "rm-pe-07",
        title: "Cụm động từ — apply for · look for · find out",
        titleEn: "Phrasal verbs",
        structure: "Động từ + từ nhỏ (for / out / up …) = một nghĩa MỚI",
        breakdown: [
          part("apply", "Động từ chính", "Nghĩa gốc là “áp dụng”."),
          part("for", "Từ nhỏ đi kèm", "Ghép vào thành “apply for” = nộp đơn xin."),
          part("a part-time job", "Tân ngữ", "Thứ mình nộp đơn xin."),
        ],
        explanation:
          "Cụm động từ = động từ + một từ nhỏ (for, out, up, after…), và nghĩa MỚI thường không đoán được từ nghĩa gốc:\n- apply for = nộp đơn xin (a job, a course)\n- look for = đang đi tìm\n- find out = tìm hiểu ra, biết được\n- take up = bắt đầu học / làm một việc mới\n- give up = bỏ cuộc\n- end up = cuối cùng lại thành\nTừ nhỏ đi kèm là CỐ ĐỊNH, phải học thuộc cả cụm chứ đừng dịch từng chữ: apply FOR a job (không phải “apply to a job”).\nKhi tân ngữ là ĐẠI TỪ thì đặt vào GIỮA: give it up (không nói “give up it”).",
        usage: "Dùng khi bé kể về việc tìm hiểu một nghề, xin việc làm thêm hoặc chọn hướng đi tương lai.",
        mistakes: [
          mis("She applied to a part-time job.", "She applied for a part-time job.", "“apply” đi với “for” khi xin việc."),
          mis("He gave up it after one week.", "He gave it up after one week.", "Tân ngữ là đại từ (it) thì phải đặt GIỮA hai phần."),
          mis("I am looking a summer job.", "I am looking for a summer job.", "“look” phải có “for” mới mang nghĩa “đi tìm”."),
        ],
        examples: [
          ex("Khi nói về việc làm thêm", "My sister applied for a part-time job at a bookshop.", "Chị tớ nộp đơn xin làm bán thời gian ở một hiệu sách."),
          ex("Khi tìm hiểu một nghề", "I want to find out what skills a nurse needs.", "Tớ muốn tìm hiểu xem một y tá cần những kỹ năng gì."),
          ex("Khi bắt đầu học nghề mới", "He took up coding because he wanted to be an engineer.", "Bạn ấy bắt đầu học lập trình vì muốn làm kỹ sư."),
        ],
        exercises: [
          fb("She applied ___ a part-time job at a bookshop.", "for", ["for", "to", "in", "on"], "“apply” luôn đi với “for” khi xin việc."),
          fb("I want to find ___ what qualifications a nurse needs.", "out", ["out", "in", "up", "off"], "“find out” = tìm hiểu ra, biết được."),
          so(["up", "He", "took", "coding", "last", "year"], "He took up coding last year", "Năm ngoái bạn ấy bắt đầu học lập trình.", "“take up” = bắt đầu học một việc mới."),
          so(["for", "I", "am", "looking", "a", "summer", "job"], "I am looking for a summer job", "Tớ đang tìm một việc làm hè.", "“look for” = đang đi tìm; thiếu “for” là mất nghĩa."),
          viEn(
            "Chị tớ đã nộp đơn xin công việc bán thời gian đó.",
            "My sister applied for that part-time job.",
            [
              "My sister applied for that part-time job.",
              "My sister applied to that part-time job.",
              "My sister applied that part-time job.",
              "My sister applied for to that part-time job.",
            ],
            "“apply for” là cụm cố định khi nói về xin việc.",
          ),
          viEn(
            "Tớ muốn tìm hiểu xem một kỹ sư kiếm được bao nhiêu.",
            "I want to find out how much an engineer earns.",
            [
              "I want to find out how much an engineer earns.",
              "I want to find how much an engineer earns out.",
              "I want to find out how much does an engineer earn.",
              "I want to find on how much an engineer earns.",
            ],
            "“find out” đi liền nhau, và câu hỏi gián tiếp giữ trật tự thường: how much an engineer earns.",
          ),
          enVi("She took up nursing and ended up loving it.", "Chị ấy bắt đầu học nghề điều dưỡng rồi cuối cùng lại rất yêu nghề.", [
            "Chị ấy bắt đầu học nghề điều dưỡng rồi cuối cùng lại rất yêu nghề.",
            "Chị ấy bỏ nghề điều dưỡng vì không thích.",
            "Chị ấy yêu nghề điều dưỡng nên mới bắt đầu học.",
            "Chị ấy học điều dưỡng để kiếm được nhiều tiền hơn.",
          ]),
          enVi("I am looking for a job that matches my skills.", "Tớ đang tìm một công việc hợp với kỹ năng của mình.", [
            "Tớ đang tìm một công việc hợp với kỹ năng của mình.",
            "Tớ đã tìm được một công việc hợp với kỹ năng của mình.",
            "Tớ đang học thêm kỹ năng để đi xin việc.",
            "Công việc này đòi hỏi rất nhiều kỹ năng.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 8 ───────────────────────────
  {
    topic: "Studying Abroad",
    sections: [
      {
        id: "rm-pe-08",
        title: "used to · get used to — ngày xưa và dần quen",
        titleEn: "used to / get used to",
        structure: "used to + V nguyên thể (ngày xưa) · get / be used to + V-ing (dần quen)",
        breakdown: [
          part("I used to", "used to + động từ NGUYÊN THỂ", "Thói quen NGÀY XƯA, bây giờ không còn."),
          part("feel homesick", "Động từ nguyên thể", "Không thêm -ed, không thêm -ing."),
          part("I am getting used to", "get / be used to", "ĐANG dần quen · ĐÃ quen với."),
          part("living abroad", "V-ing hoặc danh từ", "Sau “used to” trong cụm này là V-ing, không phải nguyên thể."),
        ],
        explanation:
          "Hai cụm nhìn rất giống nhau nhưng nghĩa khác hẳn:\n- used to + ĐỘNG TỪ NGUYÊN THỂ = ngày xưa thường… nhưng bây giờ thì không:\n  I used to feel homesick every evening. (giờ hết rồi)\n- be / get used to + V-ING (hoặc danh từ) = đã quen / đang dần quen với:\n  I am getting used to living with my host family.\n  She is used to speaking English all day.\nPhủ định và câu hỏi của “used to” dùng “did”, và lúc đó BỎ chữ “d”:\n  I didn’t use to like the food here. · Did you use to live abroad?",
        usage: "Dùng khi bé kể sự thay đổi của bản thân khi sống ở nước ngoài hoặc ở cùng gia đình bản xứ.",
        mistakes: [
          mis("I used to feeling homesick.", "I used to feel homesick.", "Sau “used to” (ngày xưa) là động từ NGUYÊN THỂ."),
          mis("I am getting used to eat with a fork.", "I am getting used to eating with a fork.", "Sau “get used to” là V-ing."),
          mis("I didn’t used to like the weather.", "I didn’t use to like the weather.", "Đã có “did” thì viết “use to”, bỏ chữ “d”."),
        ],
        examples: [
          ex("Khi kể ngày mới sang", "I used to feel homesick every evening.", "Hồi mới sang, tối nào tớ cũng nhớ nhà."),
          ex("Khi kể mình đã quen dần", "Now I am getting used to living with my host family.", "Giờ tớ đang dần quen với việc sống cùng gia đình bản xứ."),
          ex("Khi nói về ngôn ngữ", "She is used to speaking English all day.", "Chị ấy đã quen với việc nói tiếng Anh cả ngày."),
        ],
        exercises: [
          fb("I used to ___ homesick every evening.", "feel", ["feel", "feeling", "felt", "feels"], "Sau “used to” (ngày xưa) là động từ nguyên thể."),
          fb("I am getting used to ___ with a host family.", "living", ["living", "live", "lived", "to live"], "Sau “get used to” là V-ing."),
          so(["used", "I", "to", "miss", "my", "family", "every", "day"], "I used to miss my family every day", "Ngày xưa ngày nào tớ cũng nhớ gia đình.", "used to + động từ nguyên thể: nói thói quen đã qua."),
          so(["used", "She", "is", "to", "speaking", "English", "all", "day"], "She is used to speaking English all day", "Chị ấy đã quen nói tiếng Anh cả ngày.", "be used to + V-ing: đã quen với việc gì."),
          viEn(
            "Hồi trước tớ không thích đồ ăn ở đây.",
            "I didn’t use to like the food here.",
            [
              "I didn’t use to like the food here.",
              "I didn’t used to like the food here.",
              "I didn’t use to liking the food here.",
              "I don’t used to like the food here.",
            ],
            "Đã có “did” thì viết “use to” và động từ để nguyên thể.",
          ),
          viEn(
            "Tớ đang dần quen với chi phí sinh hoạt ở đây.",
            "I am getting used to the cost of living here.",
            [
              "I am getting used to the cost of living here.",
              "I am getting use to the cost of living here.",
              "I am getting used to live cost here.",
              "I used to the cost of living here.",
            ],
            "“get used to” + danh từ; nhớ giữ chữ “d” trong “used”.",
          ),
          enVi("She used to be very shy, but now she makes friends easily.", "Ngày trước chị ấy rất nhút nhát, còn giờ chị ấy kết bạn rất dễ.", [
            "Ngày trước chị ấy rất nhút nhát, còn giờ chị ấy kết bạn rất dễ.",
            "Chị ấy vẫn nhút nhát nên rất khó kết bạn.",
            "Chị ấy quen với việc nhút nhát khi kết bạn.",
            "Chị ấy kết bạn dễ nên ngày trước không hề nhút nhát.",
          ]),
          enVi("He is not used to the cold weather yet.", "Bạn ấy vẫn chưa quen với thời tiết lạnh.", [
            "Bạn ấy vẫn chưa quen với thời tiết lạnh.",
            "Bạn ấy đã quen với thời tiết lạnh rồi.",
            "Ngày xưa bạn ấy hay bị lạnh.",
            "Bạn ấy chỉ không thích thời tiết lạnh thôi.",
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 9 ───────────────────────────
  {
    topic: "Dreams and Goals",
    sections: [
      {
        id: "rm-pe-09",
        title: "I wish… — ước gì",
        titleEn: "wish + past simple / past perfect",
        structure: "I wish + S + V2 (tiếc HIỆN TẠI) · I wish + S + had + V3 (tiếc QUÁ KHỨ)",
        breakdown: [
          part("I wish", "Động từ “ước”", "Nói điều mình mong khác đi với thực tế."),
          part("I had more patience", "quá khứ đơn", "Tiếc chuyện HIỆN TẠI — thực tế là tớ chưa đủ kiên nhẫn."),
          part("I had started earlier", "had + V3", "Tiếc chuyện ĐÃ QUA — thực tế là tớ bắt đầu muộn."),
          part("would keep going", "wish + would", "Mong NGƯỜI KHÁC đổi thói quen."),
        ],
        explanation:
          "“wish” nói điều mình ước khác đi, và động từ luôn LÙI MỘT BƯỚC:\n- Tiếc chuyện HIỆN TẠI → wish + QUÁ KHỨ ĐƠN:\n  I wish I had more patience. (thực tế: tớ chưa đủ kiên nhẫn)\n  I wish my goal were more realistic. (dùng “were” cho mọi chủ ngữ)\n- Tiếc chuyện ĐÃ QUA → wish + had + V3:\n  I wish I had started practising earlier. (thực tế: tớ bắt đầu muộn)\n- Mong người khác đổi thói quen → wish + would:\n  I wish my brother would keep going.\nSau “wish” KHÔNG dùng “will” và cũng không dùng hiện tại đơn. Muốn nói điều CÓ THỂ xảy ra thì dùng “hope”: I hope I will succeed.",
        usage: "Dùng khi bé nói về mục tiêu chưa đạt được và điều mình muốn làm khác đi.",
        mistakes: [
          mis("I wish I have more patience.", "I wish I had more patience.", "Tiếc chuyện hiện tại thì lùi về quá khứ đơn."),
          mis("I wish I will succeed next year.", "I hope I will succeed next year.", "Mong điều CÓ THỂ xảy ra thì dùng “hope”, không dùng “wish + will”."),
          mis("I wish I started earlier.", "I wish I had started earlier.", "Tiếc chuyện ĐÃ QUA thì dùng had + V3."),
        ],
        examples: [
          ex("Khi thấy mình thiếu kiên nhẫn", "I wish I had more patience.", "Ước gì tớ kiên nhẫn hơn."),
          ex("Khi tiếc vì bắt đầu muộn", "I wish I had started step by step last year.", "Ước gì năm ngoái tớ đã bắt đầu làm từng bước một."),
          ex("Khi mong anh mình đừng bỏ cuộc", "I wish my brother would keep going.", "Ước gì anh tớ đừng bỏ cuộc."),
        ],
        exercises: [
          fb("I wish I ___ more patience.", "had", ["had", "have", "will have", "am having"], "Tiếc chuyện hiện tại → wish + quá khứ đơn."),
          fb("I wish I had ___ practising earlier.", "started", ["started", "start", "starting", "starts"], "Tiếc chuyện đã qua → wish + had + V3."),
          so(["wish", "I", "I", "had", "more", "motivation"], "I wish I had more motivation", "Ước gì tớ có nhiều động lực hơn.", "wish + quá khứ đơn khi tiếc chuyện hiện tại."),
          so(["wish", "I", "I", "had", "made", "a", "realistic", "plan"], "I wish I had made a realistic plan", "Ước gì tớ đã lập một kế hoạch khả thi.", "wish + had + V3 khi tiếc chuyện đã qua."),
          viEn(
            "Ước gì tớ quyết tâm hơn.",
            "I wish I were more determined.",
            [
              "I wish I were more determined.",
              "I wish I am more determined.",
              "I wish I will be more determined.",
              "I wish I being more determined.",
            ],
            "Sau “wish” động từ lùi một bước; với “to be” thì dùng “were”.",
          ),
          viEn(
            "Ước gì năm ngoái tớ đã không bỏ cuộc.",
            "I wish I had not given up last year.",
            [
              "I wish I had not given up last year.",
              "I wish I did not give up last year.",
              "I wish I have not given up last year.",
              "I wish I will not give up last year.",
            ],
            "Tiếc chuyện đã qua → wish + had (not) + V3.",
          ),
          enVi("I wish my dream would come true.", "Ước gì ước mơ của tớ thành sự thật.", [
            "Ước gì ước mơ của tớ thành sự thật.",
            "Ước mơ của tớ đã thành sự thật rồi.",
            "Tớ tin chắc ước mơ của tớ sẽ thành sự thật.",
            "Tớ mơ về một điều có thật.",
          ]),
          enVi("She wishes she had made more effort last year.", "Chị ấy ước gì năm ngoái mình đã cố gắng nhiều hơn.", [
            "Chị ấy ước gì năm ngoái mình đã cố gắng nhiều hơn.",
            "Chị ấy đã cố gắng rất nhiều trong năm ngoái.",
            "Chị ấy sẽ cố gắng nhiều hơn trong năm tới.",
            "Chị ấy mong năm tới sẽ bớt vất vả hơn.",
          ]),
        ],
      },
    ],
  },
];
