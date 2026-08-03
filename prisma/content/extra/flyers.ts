// Bài học BỔ SUNG cho cấp này — nối SAU danh sách gốc trong ../flyers.ts.
//
// Tách file riêng để soạn thêm bài mà không phải mở file gốc (đã rất dài).
// ⚠️ Mỗi bài thêm ở đây PHẢI có một mục ngữ pháp tương ứng, ĐÚNG THỨ TỰ, trong
//    ../grammar/extra-flyers.ts — nếu không `npm run content:check` sẽ báo lệch hàng.
//
// 2 chương × 3 bài = 6 bài (Chương 4 và Chương 5 của cấp FLYERS).
// "Phonics" ở cấp này là QUY TẮC CHÍNH TẢ, tiếp nối 9 quy tắc của file gốc
// (silent e · -tion · ph · kn- · wr- · g mềm · -ed đọc /t/ /d/ /ɪd/):
//   ea hai cách đọc · -le cuối từ · ow hai cách đọc · -ture · b câm (-mb) · c mềm
// Ngữ pháp đi kèm (không lặp lại 9 điểm của file gốc): hiện tại hoàn thành ·
//   quá khứ tiếp diễn · may/might · mệnh đề quan hệ who/which/that ·
//   to + động từ chỉ mục đích · because/so/but/although
import { type ChapterSeed, mcq, tf, word } from "../types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // CHƯƠNG 4 · BÍ ẨN CỦA THẾ GIỚI
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 4 · Bí ẩn của thế giới",
    subtitle: "Đáy đại dương, dấu tích người xưa và thời tiết muôn nơi — bé kể lại bằng tiếng Anh.",
    lessons: [
      // ──────────────────── Bài 10 · Living Underwater ────────────────────
      {
        topic: "Living Underwater",
        topicVi: "Cuộc sống dưới đại dương",
        icon: "🐠",
        words: [
          word("ocean", "/ˈəʊʃn/", "đại dương", "🌊"),
          word("coral", "/ˈkɒrəl/", "san hô", "🪸"),
          word("dolphin", "/ˈdɒlfɪn/", "cá heo", "🐬"),
          word("octopus", "/ˈɒktəpəs/", "con bạch tuộc", "🐙"),
          word("jellyfish", "/ˈdʒelifɪʃ/", "con sứa", "🪼"),
          word("turtle", "/ˈtɜːtl/", "con rùa biển", "🐢"),
          word("seaweed", "/ˈsiːwiːd/", "rong biển", "🌿"),
          word("diver", "/ˈdaɪvə/", "thợ lặn", "🤿"),
          word("breathe", "/briːð/", "hít thở", "💨"),
          word("discover", "/dɪˈskʌvə/", "khám phá ra điều mới", "🔍"),
          word("deep", "/diːp/", "sâu", "⬇️"),
          word("amazing", "/əˈmeɪzɪŋ/", "tuyệt vời đến kinh ngạc", "🤩"),
        ],
        sound: {
          letters: "ea",
          sound: "/iː/ và /e/",
          hint:
            "Cụm 'ea' có HAI cách đọc. Hay gặp nhất là /iː/ — âm 'i' KÉO DÀI, môi cười rộng: " +
            "sea, team, eat, read. Trẻ Việt hay đọc thành 'i' ngắn kiểu tiếng Việt nên 'sea' " +
            "thành 'si', 'team' thành 'tim' — phải giữ hơi lâu gấp đôi. Cách thứ hai là /e/ ngắn " +
            "ở một nhóm từ quen: head, bread, weather, feather. Không có mẹo nào đoán được, chỉ " +
            "học thuộc theo mặt chữ. Và dù đọc kiểu nào cũng phải BẬT RÕ phụ âm cuối: team có " +
            "/m/ (ngậm môi lại), bread có /d/ — tiếng Việt hay nuốt phụ âm cuối nên hai từ này " +
            "dễ bị cụt.",
          words: [
            { word: "sea", meaning: "biển — /siː/, kéo dài âm 'i'", emoji: "🌊" },
            { word: "team", meaning: "đội, nhóm — /tiːm/, nhớ ngậm môi cho ra /m/", emoji: "👥" },
            { word: "eat", meaning: "ăn — /iːt/, bật rõ /t/ ở cuối", emoji: "🍽️" },
            { word: "bread", meaning: "bánh mì — /bred/, ở đây 'ea' đọc NGẮN là /e/", emoji: "🍞" },
            { word: "weather", meaning: "thời tiết — /ˈweðə/, cũng là /e/ ngắn", emoji: "🌦️" },
          ],
        },
        reading: {
          title: "The World Under the Waves",
          passage:
            "Have you ever put your face under the water and opened your eyes? I have, and that day changed everything for me.\n\n" +
            "Last year my uncle took me to a diving school near Nha Trang. He is a diver, and he has explored the ocean for twenty years. He taught me how to breathe slowly through a tube. Under the waves I saw a garden of coral in pink and orange, tall seaweed, and a jellyfish that floated like a small umbrella. A turtle swam past me, calm and quiet, and I have never forgotten its old, kind face.\n\n" +
            "I have not seen a dolphin yet, but my uncle says they often visit the deep water further out. One day I will go with him again.\n\n" +
            "The ocean is an amazing place, and most of it is still a secret.",
          translation:
            "Bạn đã bao giờ úp mặt xuống nước rồi mở mắt ra chưa? Tớ thì rồi, và ngày hôm đó đã thay đổi mọi thứ trong tớ.\n\n" +
            "Năm ngoái cậu tớ dẫn tớ tới một trường dạy lặn gần Nha Trang. Cậu là thợ lặn, và cậu đã khám phá đại dương suốt hai mươi năm. Cậu dạy tớ cách thở thật chậm qua ống thở. Dưới những con sóng, tớ thấy cả một vườn san hô hồng và cam, những đám rong biển cao, và một con sứa trôi lững lờ như chiếc ô nhỏ. Một chú rùa biển bơi ngang qua tớ, bình thản và lặng lẽ — tớ chẳng bao giờ quên được gương mặt già nua hiền lành ấy.\n\n" +
            "Tớ vẫn chưa được thấy cá heo, nhưng cậu bảo cá heo hay ra vùng nước sâu xa hơn ngoài kia. Một ngày nào đó tớ sẽ lại đi cùng cậu.\n\n" +
            "Đại dương là một nơi tuyệt vời, và phần lớn nó vẫn còn là một bí mật.",
          questions: [
            mcq(
              "Where did the writer learn to dive?",
              "Bạn nhỏ học lặn ở đâu?",
              [
                "At a diving school near Nha Trang",
                "In a swimming pool at school",
                "In a river behind the house",
                "At an aquarium in the city",
              ],
              0,
              "Bài đọc kể rõ: cậu dẫn bạn nhỏ tới một trường dạy lặn gần Nha Trang.",
              "my uncle took me to a diving school near Nha Trang",
            ),
            mcq(
              "How long has the uncle explored the ocean?",
              "Người cậu đã khám phá đại dương bao lâu rồi?",
              ["For two years", "For ten years", "For twenty years", "For a hundred years"],
              2,
              "Câu 'he has explored the ocean for twenty years' cho biết cậu đã lặn biển suốt hai mươi năm.",
              "he has explored the ocean for twenty years",
            ),
            mcq(
              "Which animal swam past the writer?",
              "Con vật nào đã bơi ngang qua bạn nhỏ?",
              ["A dolphin", "A turtle", "An octopus", "A big fish"],
              1,
              "Bài viết 'A turtle swam past me' — một chú rùa biển bơi ngang qua.",
              "A turtle swam past me",
            ),
            tf(
              "The writer has already seen a dolphin.",
              "Bạn nhỏ đã được nhìn thấy cá heo rồi.",
              false,
              "Chưa đâu! Bài viết 'I have not seen a dolphin yet' — bạn nhỏ vẫn CHƯA thấy cá heo lần nào.",
              "I have not seen a dolphin yet",
            ),
            mcq(
              "How does the writer feel about the ocean?",
              "Bạn nhỏ cảm thấy thế nào về đại dương?",
              ["Frightened", "Bored", "Curious and excited", "Angry"],
              2,
              "Bài không nói thẳng cảm xúc, bé phải tự suy ra: bạn nhỏ nhớ từng chi tiết dưới nước, tiếc vì chưa thấy cá heo và muốn quay lại — đó là sự tò mò và háo hức.",
            ),
          ],
        },
        listening: {
          title: "In the Ocean Room",
          transcript:
            "Guide: Welcome to the ocean room. Have you ever seen a real octopus?\n" +
            "Boy: No, I have not. Where is it?\n" +
            "Guide: Behind the coral, in that dark corner. It has eight arms and it can change colour.\n" +
            "Girl: Amazing! And what is that white animal near the seaweed?\n" +
            "Guide: That is a jellyfish. Please do not touch the glass, because the light hurts its eyes.\n" +
            "Boy: How deep do these animals live in the sea?\n" +
            "Guide: Some of them live a hundred metres down, where the water is very dark and cold.",
          questions: [
            mcq(
              "What can the octopus do?",
              "Con bạch tuộc có thể làm gì?",
              ["Change colour", "Sing a song", "Jump out of the water", "Sleep for a year"],
              0,
              "Hướng dẫn viên nói 'it can change colour' — bạch tuộc đổi được màu.",
              "it can change colour",
            ),
            mcq(
              "What is the white animal near the seaweed?",
              "Con vật màu trắng cạnh đám rong biển là con gì?",
              ["A turtle", "A jellyfish", "A small shark", "A dolphin"],
              1,
              "Hướng dẫn viên trả lời ngay: 'That is a jellyfish.' — đó là một con sứa.",
              "That is a jellyfish.",
            ),
            tf(
              "The children may touch the glass.",
              "Các bạn nhỏ được phép chạm vào lớp kính.",
              false,
              "Không được đâu! Hướng dẫn viên dặn 'Please do not touch the glass' vì ánh sáng làm đau mắt con sứa.",
              "Please do not touch the glass",
            ),
            mcq(
              "How deep do some of these animals live?",
              "Một số con vật ở đây sống sâu bao nhiêu?",
              ["Ten metres down", "A hundred metres down", "A thousand metres down", "Just under the waves"],
              1,
              "Hướng dẫn viên nói 'Some of them live a hundred metres down' — sâu khoảng một trăm mét.",
              "Some of them live a hundred metres down",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về một nơi có nước mà bé đã từng tới (biển, hồ, sông hay thuỷ cung): bé đã thấy con vật nào, đã làm gì ở đó? Nhớ dùng thì hiện tại hoàn thành (have/has + V3) khi kể những điều bé ĐÃ TỪNG thấy.",
        writingOutline:
          "1. Mở bài: I have been to … with my …\n" +
          "2. Lúc nào: I went there last …\n" +
          "3. Con vật đã thấy: I have seen … and …\n" +
          "4. Con vật chưa thấy: I have never seen a … , but I would love to.\n" +
          "5. Việc bé đã làm: At the beach I … / In the aquarium I …\n" +
          "6. Điều thích nhất: The most amazing animal was … because …\n" +
          "7. Kết bài: One day I will go back to discover more.",
        speaking: {
          sentences: [
            "Have you ever seen a real dolphin?",
            "I have never touched a jellyfish.",
            "My uncle has explored the ocean for twenty years.",
            "The coral under the waves is pink and orange.",
            "The deep ocean is still a secret.",
          ],
          questions: [
            {
              question: "Have you ever been to the seaside? What did you do there?",
              sampleAnswer:
                "Yes, I have. I went to Sam Son beach last summer, and I swam with my cousins every morning.",
            },
            {
              question: "Which sea animal do you like best? Why?",
              sampleAnswer:
                "I like dolphins best, because they are clever and they always look happy.",
            },
            {
              question: "Would you like to be a diver one day? Why or why not?",
              sampleAnswer:
                "Yes, I would. I want to see coral and turtles with my own eyes, but first I must learn to swim better.",
            },
          ],
        },
      },

      // ────────────────────── Bài 11 · Ancient Times ──────────────────────
      {
        topic: "Ancient Times",
        topicVi: "Ngày xửa ngày xưa",
        icon: "🏺",
        words: [
          word("ancient", "/ˈeɪnʃənt/", "cổ xưa, có từ rất lâu đời", "🏺"),
          word("castle", "/ˈkɑːsl/", "lâu đài", "🏰"),
          word("temple", "/ˈtempl/", "ngôi đền", "🛕"),
          word("king", "/kɪŋ/", "nhà vua", "👑"),
          word("queen", "/kwiːn/", "hoàng hậu, nữ hoàng", "👸"),
          word("statue", "/ˈstætʃuː/", "bức tượng", "🗿"),
          word("museum", "/mjuˈziːəm/", "viện bảo tàng", "🏛️"),
          word("history", "/ˈhɪstri/", "lịch sử", "📜"),
          word("build", "/bɪld/", "xây dựng", "🧱"),
          word("stone", "/stəʊn/", "đá", "🪨"),
          word("candle", "/ˈkændl/", "cây nến", "🕯️"),
          word("drum", "/drʌm/", "cái trống", "🥁"),
        ],
        sound: {
          letters: "-le (cuối từ)",
          sound: "/l̩/ — nghe như một tiếng 'ơl' rất nhẹ",
          hint:
            "Rất nhiều từ tiếng Anh kết thúc bằng '-le': castle, temple, candle, little, table. " +
            "Hai chữ này KHÔNG đọc là 'lê' hay 'lơ' rõ ràng. Đầu lưỡi bật lên chạm lợi trên rồi " +
            "GIỮ NGUYÊN ở đó — chỉ nghe thấy một tiếng 'ơl' mờ. Trẻ Việt hay thêm hẳn một vần " +
            "mới ('ta-bồ', 'can-đồ') vì tiếng Việt không có âm /l/ đứng cuối. Bẫy lớn nhất là " +
            "'castle': chữ t Ở GIỮA hoàn toàn CÂM, đọc /ˈkɑːsl/ chứ không phải 'cát-sờ-tồ'. " +
            "Cùng nhóm t câm còn có listen /ˈlɪsn/ và whistle /ˈwɪsl/.",
          words: [
            { word: "castle", meaning: "lâu đài — /ˈkɑːsl/, chữ t CÂM", emoji: "🏰" },
            { word: "temple", meaning: "ngôi đền — /ˈtempl/, kết thúc bằng 'ơl' mờ", emoji: "🛕" },
            { word: "candle", meaning: "cây nến — /ˈkændl/, đừng đọc 'can-đồ'", emoji: "🕯️" },
            { word: "little", meaning: "nhỏ bé — /ˈlɪtl/, hai chữ t đọc gọn rồi tới 'ơl'", emoji: "🤏" },
            { word: "table", meaning: "cái bàn — /ˈteɪbl/, không thêm nguyên âm ở cuối", emoji: "🪑" },
          ],
        },
        reading: {
          title: "The Old Temple in Our Town",
          passage:
            "Last Sunday our class visited an ancient temple outside the town. Our teacher said it was more than four hundred years old.\n\n" +
            "While the guide was talking about the old kings, I was looking at the wall behind her. Suddenly I saw a small picture of a boy with a drum. The stone was grey and rough, but the little picture was still clear. The guide told us that a queen built the temple for her father, and that people came here with candles every spring.\n\n" +
            "When we were leaving, it started to rain. We stood under the wide roof and listened to the water falling on the old stones. For a moment I felt that the temple was listening too.\n\n" +
            "History is not only in books. Sometimes it is standing quietly beside us.",
          translation:
            "Chủ nhật tuần trước lớp tớ đi thăm một ngôi đền cổ ở ngoại ô thị trấn. Cô giáo bảo ngôi đền đã hơn bốn trăm tuổi.\n\n" +
            "Trong lúc cô hướng dẫn viên đang kể về các vị vua ngày xưa, tớ lại đang ngắm bức tường phía sau cô. Bỗng nhiên tớ thấy một hình khắc nhỏ vẽ một cậu bé cầm trống. Mặt đá xám xịt và sần sùi, nhưng hình khắc nhỏ ấy vẫn còn rõ. Cô hướng dẫn kể rằng một vị hoàng hậu đã xây ngôi đền này cho cha mình, và mùa xuân nào người dân cũng mang nến tới đây.\n\n" +
            "Lúc cả lớp ra về thì trời đổ mưa. Chúng tớ đứng dưới mái hiên rộng và nghe tiếng nước rơi trên những phiến đá cũ. Trong một khoảnh khắc, tớ có cảm giác ngôi đền cũng đang lắng nghe.\n\n" +
            "Lịch sử không chỉ nằm trong sách vở. Đôi khi nó đứng lặng lẽ ngay bên cạnh mình.",
          questions: [
            mcq(
              "How old is the temple?",
              "Ngôi đền bao nhiêu tuổi rồi?",
              [
                "About forty years old",
                "More than four hundred years old",
                "Exactly one hundred years old",
                "Nobody knows",
              ],
              1,
              "Cô giáo cho biết ngôi đền đã hơn bốn trăm năm tuổi.",
              "it was more than four hundred years old",
            ),
            mcq(
              "What did the writer see on the wall?",
              "Bạn nhỏ nhìn thấy gì trên bức tường?",
              [
                "A picture of a boy with a drum",
                "A picture of a king on a horse",
                "The name of the temple",
                "A big golden statue",
              ],
              0,
              "Bài đọc viết 'I saw a small picture of a boy with a drum' — một hình khắc cậu bé cầm trống.",
              "I saw a small picture of a boy with a drum",
            ),
            mcq(
              "Who built the temple?",
              "Ai đã xây ngôi đền?",
              ["A king, for his son", "A queen, for her father", "The people of the town", "A famous artist"],
              1,
              "Câu 'a queen built the temple for her father' cho biết một vị hoàng hậu xây đền cho cha mình.",
              "a queen built the temple for her father",
            ),
            tf(
              "It began to rain when the class was leaving.",
              "Trời bắt đầu mưa lúc cả lớp đang ra về.",
              true,
              "Đúng rồi! Bài viết 'When we were leaving, it started to rain.'",
              "When we were leaving, it started to rain.",
            ),
            mcq(
              "What does the writer mean in the last two sentences?",
              "Bạn nhỏ muốn nói gì ở hai câu cuối?",
              [
                "The temple can really hear people talking",
                "History feels alive when you stand in an old place",
                "Books about history are boring",
                "Schools should not visit old temples",
              ],
              1,
              "Bài không nói thẳng, bé phải tự suy ra: 'ngôi đền cũng đang lắng nghe' là cách nói hình ảnh — khi đứng giữa một nơi cổ kính, bạn nhỏ thấy lịch sử như đang sống ngay bên cạnh.",
            ),
          ],
        },
        listening: {
          title: "At the History Museum",
          transcript:
            "Boy: Look at this statue! Who was he?\n" +
            "Guide: He was a famous king. While he was ruling, his people built the great stone castle by the river.\n" +
            "Girl: Is the castle still there?\n" +
            "Guide: Yes, but only two walls. The rest fell down a long time ago.\n" +
            "Boy: Can we visit it after the museum?\n" +
            "Guide: Of course. It is only ten minutes away by bus, and the garden around it is beautiful.",
          questions: [
            mcq(
              "Who was the man in the statue?",
              "Người trong bức tượng là ai?",
              ["A famous king", "A young soldier", "The first teacher of the town", "The guide's grandfather"],
              0,
              "Cô hướng dẫn trả lời 'He was a famous king.' — đó là một vị vua nổi tiếng.",
              "He was a famous king.",
            ),
            mcq(
              "What did his people build?",
              "Người dân của ông đã xây gì?",
              ["A long bridge", "A great stone castle", "A tall temple", "A new school"],
              1,
              "Câu 'his people built the great stone castle by the river' cho biết họ xây một toà lâu đài đá lớn bên sông.",
              "his people built the great stone castle by the river",
            ),
            tf(
              "The whole castle is still standing today.",
              "Toà lâu đài ngày nay vẫn còn nguyên vẹn.",
              false,
              "Không đâu! Cô hướng dẫn nói 'Yes, but only two walls.' — chỉ còn lại hai bức tường thôi.",
              "Yes, but only two walls.",
            ),
            mcq(
              "How far is the castle from the museum?",
              "Lâu đài cách bảo tàng bao xa?",
              ["Ten minutes away by bus", "One hour away by train", "Two days away", "Just next door"],
              0,
              "Cô hướng dẫn nói 'It is only ten minutes away by bus' — đi xe buýt mười phút là tới.",
              "It is only ten minutes away by bus",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu kể một lần bé đi thăm nơi cổ kính (ngôi đền, ngôi chùa, lâu đài hay bảo tàng): bé thấy gì, lúc đó mọi người đang làm gì? Nhớ dùng quá khứ tiếp diễn (was/were + V-ing) cho những việc ĐANG diễn ra.",
        writingOutline:
          "1. Mở bài: Last … my class visited an ancient …\n" +
          "2. Nơi đó ở đâu: It is in … and it is more than … years old.\n" +
          "3. Việc đang diễn ra: While the guide was talking, I was looking at …\n" +
          "4. Điều bé thấy: I saw a … made of stone.\n" +
          "5. Câu chuyện nghe được: The guide told us that a king / queen built it for …\n" +
          "6. Chuyện xảy ra lúc về: When we were leaving, …\n" +
          "7. Kết bài: I will never forget that day because …",
        speaking: {
          sentences: [
            "Our class visited an ancient temple last Sunday.",
            "While the guide was talking, I was looking at the wall.",
            "A queen built the temple for her father.",
            "The old stone was grey and rough.",
            "History is not only in books.",
          ],
          questions: [
            {
              question: "Have you visited an old temple or a museum? Tell me about it.",
              sampleAnswer:
                "Yes, I visited the Temple of Literature in Hanoi. I was reading the old names on the stones when it started to rain.",
            },
            {
              question: "Why is it important to keep ancient buildings?",
              sampleAnswer:
                "They tell us how people lived long ago. If we lose them, we lose our history too.",
            },
            {
              question: "If you could meet a king or a queen from the past, what would you ask?",
              sampleAnswer:
                "I would ask a queen how her people built such a big temple without machines.",
            },
          ],
        },
      },

      // ─────────────── Bài 12 · Weather Around the World ───────────────
      {
        topic: "Weather Around the World",
        topicVi: "Thời tiết muôn nơi",
        icon: "🌦️",
        words: [
          word("weather", "/ˈweðə/", "thời tiết", "🌦️"),
          word("storm", "/stɔːm/", "cơn bão", "⛈️"),
          word("thunder", "/ˈθʌndə/", "tiếng sấm", "🌩️"),
          word("lightning", "/ˈlaɪtnɪŋ/", "tia chớp", "⚡"),
          word("snow", "/snəʊ/", "tuyết", "❄️"),
          word("fog", "/fɒɡ/", "sương mù", "🌫️"),
          word("shower", "/ˈʃaʊə/", "cơn mưa rào ngắn", "🌧️"),
          word("rainbow", "/ˈreɪnbəʊ/", "cầu vồng", "🌈"),
          word("desert", "/ˈdezət/", "sa mạc", "🏜️"),
          word("freezing", "/ˈfriːzɪŋ/", "lạnh cóng", "🥶"),
          word("forecast", "/ˈfɔːkɑːst/", "bản tin dự báo thời tiết", "📺"),
          word("umbrella", "/ʌmˈbrelə/", "cái ô, cây dù", "☂️"),
        ],
        sound: {
          letters: "ow",
          sound: "/əʊ/ và /aʊ/",
          hint:
            "Cụm 'ow' cũng có hai cách đọc. Kiểu thứ nhất là /əʊ/ — bắt đầu ở 'ơ' rồi TRÒN MÔI " +
            "trượt sang 'u', gần giống 'âu' của tiếng Việt: snow, rainbow, window, blow. Kiểu thứ " +
            "hai là /aʊ/ — nghe như 'ao': shower, town, now, flower. Đọc nhầm là ra từ khác hẳn " +
            "('snow' thành 'sờ-nao'), nên phải nhớ theo từng từ. Thêm hai lỗi hay gặp: (1) chèn " +
            "nguyên âm vào cụm phụ âm đầu — 'snow' bị tách thành 'sờ-now', trong khi /s/ và /n/ " +
            "phải dính liền; (2) đọc /aʊə/ của 'shower' thành một tiếng cụt 'sao' — từ này có hai " +
            "nhịp: 'sha-ơ'.",
          words: [
            { word: "snow", meaning: "tuyết — /snəʊ/, môi tròn lại ở cuối", emoji: "❄️" },
            { word: "rainbow", meaning: "cầu vồng — /ˈreɪnbəʊ/, cũng là /əʊ/", emoji: "🌈" },
            { word: "window", meaning: "cửa sổ — /ˈwɪndəʊ/, đuôi 'ow' đọc nhẹ", emoji: "🪟" },
            { word: "shower", meaning: "cơn mưa rào — /ˈʃaʊə/, ở đây 'ow' là 'ao'", emoji: "🌧️" },
            { word: "town", meaning: "thị trấn — /taʊn/, 'ao' rồi mới tới /n/", emoji: "🏘️" },
          ],
        },
        reading: {
          title: "Two Girls, Two Skies",
          passage:
            "My cousin and I write to each other every month. She lives in Canada and I live in Hue, so our weather is never the same.\n\n" +
            "In January she walks to school through deep snow, and the wind outside her window is freezing. Here in Hue, January is only cool and grey, with a light shower almost every afternoon.\n\n" +
            "In summer everything changes. Her town becomes warm and green, while my city turns hot and wet. In September we may have a big storm with thunder and lightning, so I always carry an umbrella in my bag.\n\n" +
            "Last week she sent me a photo of a rainbow over her garden. I sent her a photo of the white fog on the Perfume River. She says my photo looks like a dream. I think hers does too.",
          translation:
            "Chị họ tớ với tớ tháng nào cũng viết thư cho nhau. Chị sống ở Canada còn tớ ở Huế, nên thời tiết hai nơi chẳng bao giờ giống nhau.\n\n" +
            "Tháng Một, chị lội qua lớp tuyết dày để tới trường, và gió ngoài cửa sổ nhà chị thì lạnh cóng. Còn Huế tháng Một chỉ mát và xám trời, chiều nào cũng có một cơn mưa rào nhẹ.\n\n" +
            "Sang hè thì mọi thứ đổi khác. Thị trấn của chị trở nên ấm áp và xanh mướt, còn thành phố của tớ thì nóng và ẩm. Tháng Chín nhà tớ có thể gặp bão lớn kèm sấm chớp, nên lúc nào tớ cũng để sẵn một cái ô trong cặp.\n\n" +
            "Tuần trước chị gửi cho tớ tấm ảnh cầu vồng bắc ngang khu vườn nhà chị. Tớ gửi lại chị tấm ảnh sương mù trắng xoá trên sông Hương. Chị bảo ảnh của tớ trông như một giấc mơ. Tớ thấy ảnh của chị cũng thế.",
          questions: [
            mcq(
              "Where does the writer live?",
              "Bạn nhỏ sống ở đâu?",
              ["In Canada", "In Hue", "In Hanoi", "In a small village"],
              1,
              "Ngay câu đầu: 'She lives in Canada and I live in Hue' — chị họ ở Canada, còn bạn nhỏ ở Huế.",
              "I live in Hue",
            ),
            mcq(
              "What is January like in Hue?",
              "Tháng Một ở Huế thời tiết thế nào?",
              [
                "Cool and grey, with a light shower most afternoons",
                "Hot and dry all day",
                "Full of deep snow",
                "Windy and freezing",
              ],
              0,
              "Bài viết 'January is only cool and grey, with a light shower almost every afternoon' — mát, trời xám và hay có mưa rào nhẹ buổi chiều.",
              "January is only cool and grey, with a light shower almost every afternoon",
            ),
            mcq(
              "Why does the writer always carry an umbrella in September?",
              "Vì sao tháng Chín bạn nhỏ luôn mang theo ô?",
              [
                "Because there may be a big storm",
                "Because the sun is too strong",
                "Because it snows in September",
                "Because the umbrella is new",
              ],
              0,
              "Câu 'In September we may have a big storm with thunder and lightning, so I always carry an umbrella in my bag.' giải thích lý do.",
              "In September we may have a big storm with thunder and lightning",
            ),
            tf(
              "The cousin sent a photo of a rainbow.",
              "Chị họ đã gửi một tấm ảnh chụp cầu vồng.",
              true,
              "Đúng rồi! Bài viết 'she sent me a photo of a rainbow over her garden'.",
              "she sent me a photo of a rainbow over her garden",
            ),
            mcq(
              "What can we guess about the two cousins?",
              "Ta đoán được điều gì về hai chị em họ?",
              [
                "They have never written to each other before",
                "They enjoy hearing about each other's lives",
                "They live in the same city",
                "They do not like taking photos",
              ],
              1,
              "Bài không nói thẳng, bé phải tự suy ra: hai chị em viết thư đều đặn hằng tháng, còn gửi ảnh cho nhau và khen ảnh của nhau — rõ ràng họ rất thích nghe chuyện của nhau.",
            ),
          ],
        },
        listening: {
          title: "The Weather Forecast",
          transcript:
            "Woman: Good morning. Here is the weather forecast for Saturday.\n" +
            "Boy: Dad, be quiet please! I want to hear it.\n" +
            "Woman: The morning will be foggy and cold, but the fog may go away by ten o'clock. In the afternoon there might be a short shower in the south. Sunday will be dry and sunny everywhere.\n" +
            "Boy: So we might not go to the beach on Saturday.\n" +
            "Dad: Then we can go on Sunday instead. The forecast says it will be perfect.",
          questions: [
            mcq(
              "What will Saturday morning be like?",
              "Sáng thứ Bảy thời tiết sẽ ra sao?",
              ["Foggy and cold", "Hot and sunny", "Windy with snow", "Rainy all morning"],
              0,
              "Người dẫn bản tin nói 'The morning will be foggy and cold' — sáng có sương mù và lạnh.",
              "The morning will be foggy and cold",
            ),
            mcq(
              "What might happen in the afternoon in the south?",
              "Buổi chiều ở miền Nam có thể xảy ra chuyện gì?",
              ["A short shower", "A big storm", "Heavy snow", "Thick fog"],
              0,
              "Bản tin nói 'there might be a short shower in the south' — có thể có một cơn mưa rào ngắn.",
              "there might be a short shower in the south",
            ),
            tf(
              "Sunday will be dry and sunny.",
              "Chủ nhật trời sẽ khô ráo và có nắng.",
              true,
              "Đúng! Bản tin nói 'Sunday will be dry and sunny everywhere.'",
              "Sunday will be dry and sunny everywhere.",
            ),
            mcq(
              "When will the family go to the beach?",
              "Cả nhà sẽ đi biển vào hôm nào?",
              ["On Saturday morning", "On Saturday afternoon", "On Sunday", "They will not go at all"],
              2,
              "Bố nói 'Then we can go on Sunday instead.' — cả nhà đổi sang chủ nhật.",
              "Then we can go on Sunday instead.",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về thời tiết ở nơi bé sống: mùa hè thế nào, mùa đông thế nào, và cuối tuần này trời có thể ra sao? Nhớ dùng may / might khi nói điều CÓ THỂ xảy ra.",
        writingOutline:
          "1. Mở bài: I live in … , and the weather here is …\n" +
          "2. Mùa hè: In summer it is … We often have …\n" +
          "3. Mùa đông: In winter it is … but it never …\n" +
          "4. Kiểu thời tiết bé thích: My favourite weather is … because …\n" +
          "5. Kiểu thời tiết bé không thích: I do not like … because …\n" +
          "6. Dự đoán cuối tuần: This weekend it might … , so I may …\n" +
          "7. Kết bài: Whatever the weather, I will …",
        speaking: {
          sentences: [
            "The morning may be foggy and cold.",
            "There might be a short shower this afternoon.",
            "In January the wind outside her window is freezing.",
            "We may have a big storm with thunder and lightning.",
            "She sent me a photo of a rainbow over her garden.",
          ],
          questions: [
            {
              question: "What is the weather like in your city today?",
              sampleAnswer:
                "It is hot and cloudy today. I think there might be a shower this afternoon, so I have my umbrella.",
            },
            {
              question: "Which season do you like best? Why?",
              sampleAnswer:
                "I like autumn best, because it is cool and dry and I can play outside after school.",
            },
            {
              question: "Would you like to live in a country with snow? Why or why not?",
              sampleAnswer:
                "Yes, I would love it for one winter. I have never touched snow, but I think freezing weather every day may be difficult.",
            },
          ],
        },
      },
    ],
  },
];
