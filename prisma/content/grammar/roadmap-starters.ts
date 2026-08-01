// Ngữ pháp cho 12 bài LỘ TRÌNH cấp STARTERS (6–7 tuổi · Pre-A1).
//
// Thứ tự PHẢI khớp `prisma/content/starters.ts`. Mỗi bài một mẫu câu, dựng
// bằng đúng từ vựng bài đó vừa dạy (My Classroom → board/window/clock…,
// Clothes → shirt/hat/shoes…) để bé không phải học hai thứ mới cùng lúc.
//
// Mỗi phần đủ 8 minigame: 2× fill_blank, 2× sentence_order, 2× dịch Việt→Anh,
// 2× dịch Anh→Việt.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 1 ───────────────────────────
  {
    topic: "At School",
    sections: [
      {
        id: "rm-st-01",
        title: "He is · She is · It is",
        titleEn: "Subject pronouns he / she / it",
        structure: "He / She / It + is + …",
        breakdown: [
          part("He / She", "Đại từ chỉ người", "He cho bạn nam, She cho bạn nữ — thay cho tên đã nhắc rồi."),
          part("It", "Đại từ chỉ vật", "Dùng cho đồ vật và con vật."),
          part("is my teacher", "Phần còn lại", "Điều mình muốn nói về người/vật đó."),
        ],
        explanation:
          "Nhắc tên một lần rồi thì lần sau thay bằng he / she / it.\n- Nam is my friend. He is nine.\n- Miss Lan is my teacher. She is kind.\n- This is my pen. It is blue.\nTiếng Việt dùng chung chữ “bạn ấy” cho cả nam và nữ, còn tiếng Anh phải chọn đúng he hay she.",
        usage: "Dùng khi bé giới thiệu bạn bè, thầy cô, hoặc đồ dùng học tập.",
        mistakes: [
          mis("Nam is my friend. She is nine.", "Nam is my friend. He is nine.", "Nam là bạn nam nên dùng “He”."),
          mis("My pen is blue. He is new.", "My pen is blue. It is new.", "Đồ vật thì dùng “It”, không dùng “He”."),
          mis("She my teacher.", "She is my teacher.", "Thiếu “is”."),
        ],
        examples: [
          ex("Khi giới thiệu bạn nam", "This is Nam. He is my friend.", "Đây là Nam. Bạn ấy là bạn của tớ."),
          ex("Khi nói về cô giáo", "She is my teacher.", "Cô ấy là cô giáo của tớ."),
          ex("Khi nói về đồ dùng", "This is my bag. It is red.", "Đây là cặp của tớ. Nó màu đỏ."),
        ],
        exercises: [
          fb("This is Nam. ___ is my friend.", "He", ["He", "She", "It", "They"], "Nam là bạn nam nên dùng “He”."),
          fb("This is my desk. ___ is new.", "It", ["It", "He", "She", "They"], "Đồ vật thì dùng “It”."),
          so(["She", "is", "my", "teacher"], "She is my teacher", "Cô ấy là cô giáo của tớ."),
          so(["is", "He", "my", "friend"], "He is my friend", "Bạn ấy là bạn của tớ."),
          viEn("Cô ấy là cô giáo của tớ.", "She is my teacher.", ["She is my teacher.", "He is my teacher.", "She my teacher.", "She is teacher."], "Cô giáo là nữ → She, và câu cần “is”."),
          viEn("Nó là quyển sách của tớ.", "It is my book.", ["It is my book.", "He is my book.", "It my book.", "It is book."], "Đồ vật → It, và cần “is”."),
          enVi("He is my friend.", "Bạn ấy là bạn của tớ.", ["Bạn ấy là bạn của tớ.", "Cô ấy là bạn của tớ.", "Bạn ấy là anh của tớ.", "Tớ có nhiều bạn."]),
          enVi("It is a new pen.", "Đó là một cái bút mới.", ["Đó là một cái bút mới.", "Đó là một cái bút cũ.", "Đó là một quyển sách mới.", "Cái bút của tớ đây."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 2 ───────────────────────────
  {
    topic: "My Classroom",
    sections: [
      {
        id: "rm-st-02",
        title: "Trong lớp có gì?",
        titleEn: "There is / There are",
        structure: "There is + a + một đồ · There are + số + đồ-s",
        breakdown: [
          part("There is", "Mẫu câu “có”", "Dùng khi CHỈ MỘT — There is a board."),
          part("There are", "Mẫu câu “có”", "Dùng khi TỪ HAI TRỞ LÊN — There are two windows."),
          part("in my classroom", "Nơi chốn", "Cho biết những thứ đó ở đâu."),
        ],
        explanation:
          "- Một cái: There is a clock. (nhớ “a”)\n- Nhiều cái: There are three windows. (nhớ -s)\nHỏi số lượng: How many chairs are there? → There are twenty.\nMẹo nhìn nhanh: sau “There is” luôn là a/an, sau “There are” luôn là danh từ có -s.",
        usage: "Dùng khi bé tả lớp học của mình hoặc tả một bức tranh.",
        mistakes: [
          mis("There is two windows.", "There are two windows.", "Nhiều cái thì dùng “are”."),
          mis("There are a clock.", "There is a clock.", "Một cái thì dùng “is”."),
          mis("There are three window.", "There are three windows.", "Danh từ số nhiều phải thêm -s."),
        ],
        examples: [
          ex("Khi tả lớp học", "There is a board in my classroom.", "Lớp tớ có một cái bảng."),
          ex("Khi đếm cửa sổ", "There are four windows.", "Có bốn cái cửa sổ."),
          ex("Khi nói về bàn ghế", "There are twenty chairs.", "Có hai mươi cái ghế."),
        ],
        exercises: [
          fb("There ___ a clock on the wall.", "is", ["is", "are", "am", "be"], "Một cái đồng hồ → “is”."),
          fb("There are two ___ in my classroom.", "doors", ["doors", "door", "doores", "a door"], "Có hai cái thì thêm -s."),
          so(["There", "is", "a", "board"], "There is a board", "Có một cái bảng."),
          so(["are", "There", "four", "windows"], "There are four windows", "Có bốn cái cửa sổ."),
          viEn("Có ba cái ghế.", "There are three chairs.", ["There are three chairs.", "There is three chairs.", "There are three chair.", "There have three chairs."], "Nhiều → are + danh từ có -s."),
          viEn("Có một cái cửa sổ.", "There is a window.", ["There is a window.", "There are a window.", "There is window.", "There is one windows."], "Một → is + a + danh từ số ít."),
          enVi("There are two doors.", "Có hai cái cửa.", ["Có hai cái cửa.", "Có một cái cửa.", "Có hai cái cửa sổ.", "Cửa đang mở."]),
          enVi("There is a ruler on the desk.", "Trên bàn có một cái thước.", ["Trên bàn có một cái thước.", "Trên bàn có hai cái thước.", "Trong cặp có một cái thước.", "Cái thước này của tớ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 3 ───────────────────────────
  {
    topic: "My Day",
    sections: [
      {
        id: "rm-st-03",
        title: "Mấy giờ bé làm việc gì?",
        titleEn: "Present simple + at / in",
        structure: "I + động từ + at + giờ · in the + buổi",
        breakdown: [
          part("I get up", "Chủ ngữ + động từ", "Với “I” thì động từ giữ nguyên."),
          part("at six", "at + giờ", "Nói giờ cụ thể thì dùng “at”."),
          part("in the morning", "in the + buổi", "Buổi trong ngày thì dùng “in the”."),
        ],
        explanation:
          "Kể thời gian biểu thì dùng hiện tại đơn.\n- I get up at six.\n- I have breakfast in the morning.\nHai giới từ hay nhầm:\n- at + giờ: at six, at seven o’clock\n- in the + buổi: in the morning, in the afternoon, in the evening\n- Riêng “at night” thì dùng “at”.",
        usage: "Dùng khi bé kể một ngày của mình từ sáng tới tối.",
        mistakes: [
          mis("I get up in six.", "I get up at six.", "Giờ cụ thể thì dùng “at”."),
          mis("I have lunch at the afternoon.", "I have lunch in the afternoon.", "Buổi trong ngày thì dùng “in the”."),
          mis("I am get up at six.", "I get up at six.", "Đã có động từ “get up” thì không thêm “am”."),
        ],
        examples: [
          ex("Khi kể buổi sáng", "I get up at six in the morning.", "Tớ dậy lúc sáu giờ sáng."),
          ex("Khi kể bữa trưa", "I have lunch at school.", "Tớ ăn trưa ở trường."),
          ex("Khi kể buổi tối", "I do my homework in the evening.", "Buổi tối tớ làm bài tập."),
        ],
        exercises: [
          fb("I get up ___ six o’clock.", "at", ["at", "in", "on", "to"], "Giờ cụ thể thì dùng “at”."),
          fb("I have breakfast ___ the morning.", "in", ["in", "at", "on", "of"], "Buổi trong ngày thì dùng “in the”."),
          so(["get", "I", "up", "at", "six"], "I get up at six", "Tớ dậy lúc sáu giờ."),
          so(["have", "I", "dinner", "at", "seven"], "I have dinner at seven", "Tớ ăn tối lúc bảy giờ."),
          viEn("Tớ làm bài tập vào buổi tối.", "I do my homework in the evening.", ["I do my homework in the evening.", "I do my homework at the evening.", "I am do my homework in the evening.", "I do my homework in evening."], "Buổi trong ngày → in the evening."),
          viEn("Tớ đi ngủ lúc chín giờ.", "I go to bed at nine.", ["I go to bed at nine.", "I go to bed in nine.", "I am go to bed at nine.", "I goes to bed at nine."], "Giờ cụ thể → at nine."),
          enVi("I have lunch at school.", "Tớ ăn trưa ở trường.", ["Tớ ăn trưa ở trường.", "Tớ ăn sáng ở trường.", "Tớ ăn trưa ở nhà.", "Trưa nay tớ ở trường."]),
          enVi("I get up early in the morning.", "Buổi sáng tớ dậy sớm.", ["Buổi sáng tớ dậy sớm.", "Buổi sáng tớ dậy muộn.", "Buổi tối tớ ngủ sớm.", "Tớ dậy lúc bảy giờ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 4 ───────────────────────────
  {
    topic: "My House",
    sections: [
      {
        id: "rm-st-04",
        title: "Đồ ở đâu trong nhà?",
        titleEn: "in / on / under",
        structure: "Chủ ngữ + is/are + in / on / under + the + nơi chốn",
        breakdown: [
          part("The sofa", "Chủ ngữ", "Đồ vật đang nói tới."),
          part("is", "Động từ to be", "Một cái → is · nhiều cái → are."),
          part("in the living room", "Giới từ + nơi chốn", "in = trong · on = trên · under = dưới."),
        ],
        explanation:
          "- in = ở TRONG một phòng, một hộp: The flower is in the garden.\n- on = ở TRÊN và chạm vào mặt phẳng: The TV is on the table.\n- under = ở DƯỚI: The cat is under the sofa.\nSau giới từ thường có “the”: in the kitchen, on the table.",
        usage: "Dùng khi bé tả nhà mình hoặc chỉ chỗ để đồ.",
        mistakes: [
          mis("The TV is in the table.", "The TV is on the table.", "Đặt trên mặt bàn thì dùng “on”."),
          mis("The cat is under sofa.", "The cat is under the sofa.", "Sau giới từ cần “the”."),
          mis("The flowers is in the garden.", "The flowers are in the garden.", "Nhiều bông hoa thì dùng “are”."),
        ],
        examples: [
          ex("Khi tả phòng khách", "The TV is on the table.", "Cái TV ở trên bàn."),
          ex("Khi tả khu vườn", "The flowers are in the garden.", "Những bông hoa ở trong vườn."),
          ex("Khi tìm mèo", "The cat is under the sofa.", "Con mèo ở dưới ghế sofa."),
        ],
        exercises: [
          fb("The TV is ___ the table.", "on", ["on", "in", "under", "at"], "Đặt trên mặt bàn → “on”."),
          fb("Mum is ___ the kitchen.", "in", ["in", "on", "under", "to"], "Ở trong phòng bếp → “in”."),
          so(["is", "The", "cat", "under", "the", "sofa"], "The cat is under the sofa", "Con mèo ở dưới ghế sofa."),
          so(["are", "The", "flowers", "in", "the", "garden"], "The flowers are in the garden", "Những bông hoa ở trong vườn."),
          viEn("Cái bàn ở trong bếp.", "The table is in the kitchen.", ["The table is in the kitchen.", "The table is on the kitchen.", "The table is in kitchen.", "The table in the kitchen."], "Ở trong phòng → in + the + kitchen."),
          viEn("Con mèo ở trên ghế sofa.", "The cat is on the sofa.", ["The cat is on the sofa.", "The cat is in the sofa.", "The cat is on sofa.", "The cat on the sofa."], "Nằm trên mặt ghế → on."),
          enVi("The flower is in the garden.", "Bông hoa ở trong vườn.", ["Bông hoa ở trong vườn.", "Bông hoa ở trên bàn.", "Những bông hoa ở trong vườn.", "Vườn nhà tớ có hoa."]),
          enVi("The bathroom is next to the kitchen.", "Phòng tắm ở ngay cạnh bếp.", ["Phòng tắm ở ngay cạnh bếp.", "Phòng tắm ở trong bếp.", "Bếp ở cạnh phòng khách.", "Nhà tớ có một phòng tắm."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 5 ───────────────────────────
  {
    topic: "My Room",
    sections: [
      {
        id: "rm-st-05",
        title: "Bên cạnh và đằng sau",
        titleEn: "next to / behind / in front of",
        structure: "Chủ ngữ + is + next to / behind / in front of + the + …",
        breakdown: [
          part("The lamp", "Chủ ngữ", "Đồ vật đang tả."),
          part("is next to", "Giới từ", "next to = ngay bên cạnh."),
          part("my bed", "Nơi chốn", "Mốc để so — đồ kia nằm cạnh cái gì."),
        ],
        explanation:
          "- next to = ngay bên cạnh: The lamp is next to my bed.\n- behind = đằng sau: The box is behind the door.\n- in front of = ở phía trước: The shelf is in front of the window.\nNhớ: “next” luôn đi với “to”, còn “behind” thì KHÔNG có “of”.",
        usage: "Dùng khi bé tả phòng ngủ của mình.",
        mistakes: [
          mis("The lamp is next my bed.", "The lamp is next to my bed.", "“next” phải đi kèm “to”."),
          mis("The box is behind of the door.", "The box is behind the door.", "“behind” không có “of”."),
          mis("The shelf is in front the window.", "The shelf is in front of the window.", "Thiếu “of”."),
        ],
        examples: [
          ex("Khi tả giường", "The lamp is next to my bed.", "Cái đèn ở ngay cạnh giường tớ."),
          ex("Khi tìm hộp đồ chơi", "The toy box is behind the door.", "Hộp đồ chơi ở sau cánh cửa."),
          ex("Khi tả giá sách", "My robot is on the shelf.", "Con rô-bốt của tớ ở trên giá."),
        ],
        exercises: [
          fb("The lamp is next ___ my bed.", "to", ["to", "of", "at", "in"], "“next” luôn đi với “to”."),
          fb("The toy box is ___ the door.", "behind", ["behind", "next", "front", "of"], "Ở đằng sau cánh cửa → behind."),
          so(["is", "The", "teddy", "on", "my", "bed"], "The teddy is on my bed", "Gấu bông ở trên giường tớ."),
          so(["is", "The", "lamp", "next", "to", "the", "bed"], "The lamp is next to the bed", "Cái đèn ở cạnh giường."),
          viEn("Cái gối ở trên giường.", "The pillow is on the bed.", ["The pillow is on the bed.", "The pillow is in the bed.", "The pillow on the bed.", "The pillow is on bed."], "Nằm trên mặt giường → on the bed."),
          viEn("Hộp đồ chơi ở dưới gầm giường.", "The toy box is under the bed.", ["The toy box is under the bed.", "The toy box is under bed.", "The toy box under the bed.", "The toy box is on the bed."], "under + the + bed, và câu cần “is”."),
          enVi("The shelf is next to the window.", "Cái giá ở ngay cạnh cửa sổ.", ["Cái giá ở ngay cạnh cửa sổ.", "Cái giá ở dưới cửa sổ.", "Cửa sổ ở cạnh giường.", "Trên giá có nhiều sách."]),
          enVi("My teddy bear is on the bed.", "Con gấu bông của tớ ở trên giường.", ["Con gấu bông của tớ ở trên giường.", "Con gấu bông của tớ ở dưới giường.", "Con rô-bốt của tớ ở trên giường.", "Tớ ngủ cùng gấu bông."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 6 ───────────────────────────
  {
    topic: "Clothes",
    sections: [
      {
        id: "rm-st-06",
        title: "Hôm nay bé mặc gì?",
        titleEn: "I am wearing…",
        structure: "Chủ ngữ + am/is/are + wearing + quần áo",
        breakdown: [
          part("I", "Chủ ngữ", "Người đang mặc."),
          part("am wearing", "am/is/are + V-ing", "Việc đang diễn ra ngay lúc này."),
          part("a red shirt", "a + màu + đồ", "Màu đứng trước tên đồ."),
        ],
        explanation:
          "Nói về quần áo đang mặc lúc này thì dùng am/is/are + wearing.\n- I am wearing a hat.\n- She is wearing a dress.\nMột số đồ luôn ở SỐ NHIỀU vì có hai phần: shoes, socks, shorts, trousers → dùng “are” khi làm chủ ngữ: My shoes are new.",
        usage: "Dùng khi bé tả quần áo của mình hoặc của bạn trong tranh.",
        mistakes: [
          mis("I wearing a hat.", "I am wearing a hat.", "Thiếu “am”."),
          mis("She is wear a dress.", "She is wearing a dress.", "Có “is” rồi thì động từ thêm -ing."),
          mis("My shoes is new.", "My shoes are new.", "“shoes” luôn số nhiều nên dùng “are”."),
        ],
        examples: [
          ex("Khi tả mình", "I am wearing a blue shirt.", "Tớ đang mặc áo sơ mi xanh."),
          ex("Khi tả bạn", "She is wearing a red dress.", "Bạn ấy đang mặc váy đỏ."),
          ex("Khi khoe giày mới", "My shoes are new.", "Giày của tớ mới."),
        ],
        exercises: [
          fb("I ___ wearing a hat.", "am", ["am", "is", "are", "be"], "Chủ ngữ “I” đi với “am”."),
          fb("She is ___ a dress.", "wearing", ["wearing", "wear", "wears", "wore"], "Sau “is” thì động từ thêm -ing."),
          so(["am", "I", "wearing", "a", "shirt"], "I am wearing a shirt", "Tớ đang mặc áo sơ mi."),
          so(["are", "My", "shoes", "new"], "My shoes are new", "Giày của tớ mới."),
          viEn("Bạn ấy đang mặc một chiếc váy đỏ.", "She is wearing a red dress.", ["She is wearing a red dress.", "She wearing a red dress.", "She is wear a red dress.", "She is wearing a dress red."], "is + wearing, và màu đứng trước tên đồ."),
          viEn("Tớ đang đội một chiếc mũ.", "I am wearing a hat.", ["I am wearing a hat.", "I wearing a hat.", "I am wear a hat.", "I am wearing hat."], "am + wearing + a + hat."),
          enVi("He is wearing a coat.", "Bạn ấy đang mặc áo khoác.", ["Bạn ấy đang mặc áo khoác.", "Bạn ấy đang mặc áo sơ mi.", "Bạn ấy có một chiếc áo khoác.", "Áo khoác của bạn ấy màu xanh."]),
          enVi("My socks are white.", "Tất của tớ màu trắng.", ["Tất của tớ màu trắng.", "Giày của tớ màu trắng.", "Tất của tớ màu đen.", "Tớ có một đôi tất."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 7 ───────────────────────────
  {
    topic: "Weather",
    sections: [
      {
        id: "rm-st-07",
        title: "Hôm nay trời thế nào?",
        titleEn: "It is sunny.",
        structure: "It is + tính từ thời tiết · What’s the weather like?",
        breakdown: [
          part("It", "Chủ ngữ giả", "Nói về thời tiết thì chủ ngữ LUÔN là “It”."),
          part("is", "Động từ to be", "Không được bỏ."),
          part("sunny", "Tính từ thời tiết", "sunny, rainy, windy, cloudy, hot, cold."),
        ],
        explanation:
          "Nói thời tiết thì chủ ngữ luôn là “It”, dù tiếng Việt không có chủ ngữ:\n- Tiếng Việt: “Trời nắng.”\n- Tiếng Anh: “It is sunny.”\nHỏi: What’s the weather like today? → It’s rainy.\nĐừng nói “Today is sunny weather” — người bản ngữ nói “It’s sunny today”.",
        usage: "Dùng khi bé nói về thời tiết trong ngày hoặc chọn quần áo theo trời.",
        mistakes: [
          mis("Today sunny.", "It is sunny today.", "Câu cần chủ ngữ “It” và động từ “is”."),
          mis("It is rain.", "It is rainy.", "Cần TÍNH TỪ “rainy”, không phải danh từ “rain”."),
          mis("Is hot today.", "It is hot today.", "Không được bỏ chủ ngữ “It”."),
        ],
        examples: [
          ex("Khi nhìn ra cửa sổ", "It is sunny today.", "Hôm nay trời nắng."),
          ex("Khi trời mưa", "It is rainy. Take an umbrella!", "Trời mưa. Mang ô đi nhé!"),
          ex("Khi trời lạnh", "It is cold in winter.", "Mùa đông trời lạnh."),
        ],
        exercises: [
          fb("___ is sunny today.", "It", ["It", "Today", "There", "That"], "Nói thời tiết thì chủ ngữ luôn là “It”."),
          fb("It is ___ . Take an umbrella!", "rainy", ["rainy", "rain", "rains", "raining a"], "Sau “is” cần tính từ “rainy”."),
          so(["is", "It", "windy", "today"], "It is windy today", "Hôm nay trời có gió."),
          so(["is", "It", "very", "cold"], "It is very cold", "Trời rất lạnh."),
          viEn("Hôm nay trời nắng.", "It is sunny today.", ["It is sunny today.", "Today is sunny weather.", "It sunny today.", "Is sunny today."], "Chủ ngữ “It” + is + tính từ."),
          viEn("Trời có mây.", "It is cloudy.", ["It is cloudy.", "It is cloud.", "There is cloudy.", "It cloudy."], "Cần tính từ “cloudy” sau “is”."),
          enVi("It is hot today.", "Hôm nay trời nóng.", ["Hôm nay trời nóng.", "Hôm nay trời lạnh.", "Hôm qua trời nóng.", "Tớ thấy nóng."]),
          enVi("Look! A rainbow!", "Nhìn kìa! Cầu vồng!", ["Nhìn kìa! Cầu vồng!", "Nhìn kìa! Trời mưa!", "Cầu vồng đã biến mất.", "Tớ thích cầu vồng."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 8 ───────────────────────────
  {
    topic: "The Park",
    sections: [
      {
        id: "rm-st-08",
        title: "Mọi người đang làm gì?",
        titleEn: "They are playing.",
        structure: "They/We + are + động từ-ing · What is he doing?",
        breakdown: [
          part("They", "Chủ ngữ số nhiều", "they, we → are."),
          part("are playing", "are + V-ing", "Việc đang diễn ra ngay lúc này."),
          part("in the park", "Nơi chốn", "Đang làm ở đâu."),
        ],
        explanation:
          "Tả cảnh đang diễn ra thì dùng am/is/are + V-ing.\n- He is riding a bike.\n- They are playing football.\nHỏi: What is he doing? → He is running.\nMột số động từ đổi chính tả khi thêm -ing: run → running, swim → swimming, ride → riding.",
        usage: "Dùng khi bé tả một bức tranh công viên hoặc kể chuyện đang xảy ra.",
        mistakes: [
          mis("They playing football.", "They are playing football.", "Thiếu “are”."),
          mis("He is runing.", "He is running.", "“run” gấp đôi chữ n trước -ing."),
          mis("What he is doing?", "What is he doing?", "Câu hỏi phải đảo “is” lên trước chủ ngữ."),
        ],
        examples: [
          ex("Khi tả tranh công viên", "They are playing in the park.", "Các bạn ấy đang chơi trong công viên."),
          ex("Khi tả bạn đạp xe", "He is riding his bike.", "Bạn ấy đang đạp xe."),
          ex("Khi hỏi bạn", "What is she doing?", "Bạn ấy đang làm gì thế?"),
        ],
        exercises: [
          fb("They ___ playing in the park.", "are", ["are", "is", "am", "be"], "“They” đi với “are”."),
          fb("He is ___ his bike.", "riding", ["riding", "ride", "rides", "rideing"], "“ride” bỏ e rồi thêm -ing."),
          so(["are", "They", "playing", "football"], "They are playing football", "Các bạn ấy đang chơi bóng."),
          so(["is", "What", "she", "doing"], "What is she doing", "Bạn ấy đang làm gì thế?"),
          viEn("Con vịt đang bơi.", "The duck is swimming.", ["The duck is swimming.", "The duck is swiming.", "The duck swimming.", "The duck are swimming."], "“swim” gấp đôi chữ m trước -ing."),
          viEn("Chúng tớ đang chơi ở công viên.", "We are playing in the park.", ["We are playing in the park.", "We is playing in the park.", "We playing in the park.", "We are play in the park."], "“We” + are + V-ing."),
          enVi("The children are running.", "Bọn trẻ đang chạy.", ["Bọn trẻ đang chạy.", "Bọn trẻ đang đi bộ.", "Bọn trẻ chạy mỗi ngày.", "Một bạn nhỏ đang chạy."]),
          enVi("She is playing on the swing.", "Bạn ấy đang chơi xích đu.", ["Bạn ấy đang chơi xích đu.", "Bạn ấy đang chơi cầu trượt.", "Bạn ấy thích chơi xích đu.", "Xích đu ở trong công viên."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 9 ───────────────────────────
  {
    topic: "Transport",
    sections: [
      {
        id: "rm-st-09",
        title: "Bé đi bằng gì?",
        titleEn: "I go to school by bus.",
        structure: "go to + nơi + by + phương tiện",
        breakdown: [
          part("I go to school", "Chủ ngữ + động từ + nơi đến", "Việc làm hằng ngày."),
          part("by", "Giới từ phương tiện", "Nghĩa là “bằng”."),
          part("bus", "Phương tiện — KHÔNG có “a”", "by bus, by car, by train… không dùng “a”."),
        ],
        explanation:
          "Nói mình đi bằng phương tiện gì thì dùng “by + phương tiện”, và KHÔNG có “a/the”:\n- by bus, by car, by train, by plane, by boat, by bike\nRiêng đi bộ thì nói “on foot” hoặc “I walk to school”.\nĐừng nói “by a bus”.",
        usage: "Dùng khi bé kể cách mình tới trường hoặc đi chơi.",
        mistakes: [
          mis("I go to school by a bus.", "I go to school by bus.", "Sau “by” không có “a”."),
          mis("I go to school by foot.", "I go to school on foot.", "Đi bộ thì dùng “on foot”."),
          mis("I am go to school by bike.", "I go to school by bike.", "Đã có động từ “go” thì không thêm “am”."),
        ],
        examples: [
          ex("Khi kể đường tới trường", "I go to school by bus.", "Tớ tới trường bằng xe buýt."),
          ex("Khi kể chuyến đi xa", "We go to Hue by train.", "Chúng tớ đi Huế bằng tàu hoả."),
          ex("Khi đi bộ", "I go to school on foot.", "Tớ đi bộ tới trường."),
        ],
        exercises: [
          fb("I go to school ___ bus.", "by", ["by", "on", "in", "with"], "Phương tiện thì dùng “by”."),
          fb("We go to Hue ___ train.", "by", ["by", "on", "at", "in"], "by + train, không có “a”."),
          so(["go", "I", "to", "school", "by", "bike"], "I go to school by bike", "Tớ tới trường bằng xe đạp."),
          so(["go", "We", "to", "Da", "Nang", "by", "plane"], "We go to Da Nang by plane", "Chúng tớ đi Đà Nẵng bằng máy bay."),
          viEn("Tớ tới trường bằng xe buýt.", "I go to school by bus.", ["I go to school by bus.", "I go to school by a bus.", "I go to school on bus.", "I go school by bus."], "by + bus, không có “a”."),
          viEn("Tớ đi bộ tới trường.", "I go to school on foot.", ["I go to school on foot.", "I go to school by foot.", "I go to school with foot.", "I go to school in foot."], "Đi bộ là “on foot”."),
          enVi("They go to work by car.", "Họ đi làm bằng ô tô.", ["Họ đi làm bằng ô tô.", "Họ đi học bằng ô tô.", "Họ đi làm bằng xe máy.", "Họ có một chiếc ô tô."]),
          enVi("We can go by boat.", "Chúng mình có thể đi bằng thuyền.", ["Chúng mình có thể đi bằng thuyền.", "Chúng mình đi bằng máy bay.", "Chúng mình không đi thuyền được.", "Chiếc thuyền rất to."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 10 ───────────────────────────
  {
    topic: "Sports",
    sections: [
      {
        id: "rm-st-10",
        title: "Bé làm được gì?",
        titleEn: "can / can’t",
        structure: "Chủ ngữ + can (+ ’t) + động từ nguyên thể",
        breakdown: [
          part("I", "Chủ ngữ", "Ai làm được việc đó."),
          part("can", "Động từ khuyết thiếu", "Dùng chung cho mọi chủ ngữ, không thêm -s."),
          part("swim", "Động từ nguyên thể", "Sau “can” là động từ trần: không -s, không to, không -ing."),
        ],
        explanation:
          "- I can swim. (biết bơi)\n- She can run fast.\n- I can’t jump high. (chưa làm được)\nCâu hỏi: Can you swim? → Yes, I can. / No, I can’t.\nNhớ: “can” không bao giờ thêm -s, và sau nó luôn là động từ trần.",
        usage: "Dùng khi bé kể mình chơi được môn thể thao nào.",
        mistakes: [
          mis("She cans swim.", "She can swim.", "“can” không thêm -s."),
          mis("I can to run fast.", "I can run fast.", "Sau “can” không có “to”."),
          mis("He can jumping.", "He can jump.", "Sau “can” là động từ nguyên thể."),
        ],
        examples: [
          ex("Khi kể tài lẻ", "I can swim very well.", "Tớ bơi rất giỏi."),
          ex("Khi nói về bạn", "She can catch the ball.", "Bạn ấy bắt được bóng."),
          ex("Khi chưa làm được", "I can’t throw far.", "Tớ chưa ném xa được."),
        ],
        exercises: [
          fb("I ___ swim.", "can", ["can", "cans", "can to", "am can"], "“can” dùng nguyên dạng cho mọi chủ ngữ."),
          fb("She can ___ the ball.", "catch", ["catch", "catches", "catching", "to catch"], "Sau “can” là động từ nguyên thể."),
          so(["can", "I", "run", "fast"], "I can run fast", "Tớ chạy nhanh được."),
          so(["can’t", "He", "jump", "high"], "He can’t jump high", "Bạn ấy chưa nhảy cao được."),
          viEn("Tớ chơi được bóng đá.", "I can play football.", ["I can play football.", "I can plays football.", "I can to play football.", "I am can play football."], "can + động từ trần."),
          viEn("Bạn ấy không bắt được bóng.", "She can’t catch the ball.", ["She can’t catch the ball.", "She can’t catches the ball.", "She doesn’t can catch the ball.", "She can’t to catch the ball."], "can’t + động từ trần."),
          enVi("Can you swim?", "Bạn biết bơi không?", ["Bạn biết bơi không?", "Bạn có thích bơi không?", "Bạn đang bơi à?", "Tớ biết bơi."]),
          enVi("Our team can win.", "Đội mình có thể thắng.", ["Đội mình có thể thắng.", "Đội mình đã thắng.", "Đội mình không thắng được.", "Đội mình muốn thắng."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 11 ───────────────────────────
  {
    topic: "Birthday Party",
    sections: [
      {
        id: "rm-st-11",
        title: "Có bao nhiêu cái?",
        titleEn: "How many…?",
        structure: "How many + danh từ số nhiều + are there?",
        breakdown: [
          part("How many", "Cụm hỏi số lượng", "Chỉ dùng với danh từ ĐẾM ĐƯỢC."),
          part("candles", "Danh từ SỐ NHIỀU", "Sau “How many” luôn là danh từ có -s."),
          part("are there?", "Phần còn lại", "Hỏi “có mấy cái”."),
        ],
        explanation:
          "Hỏi số lượng đồ đếm được:\n- How many candles are there? → There are six.\n- How many balloons have you got? → I’ve got ten.\nLuật vàng: sau “How many” danh từ LUÔN ở số nhiều.\nVới thứ không đếm được (juice, water) thì dùng “How much”.",
        usage: "Dùng khi bé đếm nến, bóng bay, quà trong bữa tiệc.",
        mistakes: [
          mis("How many candle are there?", "How many candles are there?", "Sau “How many” danh từ phải ở số nhiều."),
          mis("How much balloons?", "How many balloons?", "“balloons” đếm được nên dùng “How many”."),
          mis("How many candles is there?", "How many candles are there?", "Nhiều cái thì dùng “are”."),
        ],
        examples: [
          ex("Khi đếm nến trên bánh", "How many candles are there?", "Có bao nhiêu cây nến?"),
          ex("Khi đếm quà", "I have got five presents.", "Tớ được năm món quà."),
          ex("Khi trả lời", "There are ten balloons.", "Có mười quả bóng bay."),
        ],
        exercises: [
          fb("How many ___ are there?", "candles", ["candles", "candle", "candels", "a candle"], "Sau “How many” danh từ ở số nhiều."),
          fb("How many balloons ___ there?", "are", ["are", "is", "am", "be"], "Nhiều quả bóng → “are”."),
          so(["many", "How", "presents", "are", "there"], "How many presents are there", "Có bao nhiêu món quà?"),
          so(["are", "There", "six", "candles"], "There are six candles", "Có sáu cây nến."),
          viEn("Có bao nhiêu quả bóng bay?", "How many balloons are there?", ["How many balloons are there?", "How many balloon are there?", "How much balloons are there?", "How many balloons is there?"], "How many + danh từ số nhiều + are there."),
          viEn("Tớ được năm món quà.", "I have got five presents.", ["I have got five presents.", "I have got five present.", "I has got five presents.", "I have five presents got."], "Năm món → presents có -s."),
          enVi("There are ten candles on the cake.", "Trên bánh có mười cây nến.", ["Trên bánh có mười cây nến.", "Trên bánh có một cây nến.", "Trên bàn có mười cây nến.", "Chiếc bánh rất to."]),
          enVi("How many friends are at the party?", "Có bao nhiêu bạn ở bữa tiệc?", ["Có bao nhiêu bạn ở bữa tiệc?", "Bạn nào ở bữa tiệc?", "Bữa tiệc ở đâu?", "Tớ có nhiều bạn ở bữa tiệc."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 12 ───────────────────────────
  {
    topic: "Music",
    sections: [
      {
        id: "rm-st-12",
        title: "Thích làm việc gì",
        titleEn: "I like singing.",
        structure: "like / love + động từ-ing",
        breakdown: [
          part("I like", "Chủ ngữ + động từ chỉ sở thích", "like, love, enjoy."),
          part("singing", "Động từ + -ing", "Sau like/love thì động từ thứ hai thêm -ing."),
          part("with my friends", "Phần bổ sung", "Làm việc đó với ai, ở đâu."),
        ],
        explanation:
          "Muốn nói thích LÀM việc gì thì động từ thứ hai thêm -ing:\n- I like singing.\n- She loves playing the guitar.\nVới nhạc cụ thì nhớ “the”: play the guitar, play the piano, play the drums.\n(Còn môn thể thao thì KHÔNG có “the”: play football.)",
        usage: "Dùng khi bé kể sở thích âm nhạc của mình.",
        mistakes: [
          mis("I like sing.", "I like singing.", "Sau “like” thì động từ thêm -ing."),
          mis("She loves play guitar.", "She loves playing the guitar.", "Thêm -ing, và nhạc cụ cần “the”."),
          mis("I am like dancing.", "I like dancing.", "Đã có “like” thì không thêm “am”."),
        ],
        examples: [
          ex("Khi kể sở thích", "I like singing songs.", "Tớ thích hát."),
          ex("Khi nói về bạn", "She loves playing the piano.", "Bạn ấy rất thích chơi đàn piano."),
          ex("Khi nói về lớp nhạc", "We like dancing together.", "Chúng tớ thích nhảy cùng nhau."),
        ],
        exercises: [
          fb("I like ___ songs.", "singing", ["singing", "sing", "sings", "to singing"], "Sau “like” thì động từ thêm -ing."),
          fb("She loves playing ___ guitar.", "the", ["the", "a", "an", "some"], "Nhạc cụ thì dùng “the”: play the guitar."),
          so(["like", "I", "singing"], "I like singing", "Tớ thích hát."),
          so(["loves", "She", "playing", "the", "piano"], "She loves playing the piano", "Bạn ấy thích chơi đàn piano."),
          viEn("Tớ thích nhảy.", "I like dancing.", ["I like dancing.", "I like dance.", "I am like dancing.", "I likes dancing."], "Sau “like” thì thêm -ing."),
          viEn("Bạn ấy thích chơi trống.", "He likes playing the drums.", ["He likes playing the drums.", "He like playing the drums.", "He likes play the drums.", "He likes playing drums."], "“He” + likes, động từ sau thêm -ing, nhạc cụ cần “the”."),
          enVi("I love singing loud songs.", "Tớ rất thích hát những bài hát thật to.", ["Tớ rất thích hát những bài hát thật to.", "Tớ không thích hát to.", "Tớ thích nghe nhạc to.", "Bài hát này rất to."]),
          enVi("She likes playing the guitar.", "Bạn ấy thích chơi đàn ghi ta.", ["Bạn ấy thích chơi đàn ghi ta.", "Bạn ấy thích chơi đàn piano.", "Bạn ấy đang chơi ghi ta.", "Bạn ấy có một cây đàn ghi ta."]),
        ],
      },
    ],
  },
];
