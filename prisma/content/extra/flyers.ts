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

  // ═══════════════════════════════════════════════════════════════════════
  // CHƯƠNG 5 · EM HỌC VÀ EM LỚN LÊN
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 5 · Em học và em lớn lên",
    subtitle: "Máy móc trong nhà, kỹ năng mới và sức mạnh của cả nhóm.",
    lessons: [
      // ───────────────────── Bài 13 · Robots at Home ─────────────────────
      {
        topic: "Robots at Home",
        topicVi: "Người máy trong nhà",
        icon: "🤖",
        words: [
          word("robot", "/ˈrəʊbɒt/", "người máy", "🤖"),
          word("machine", "/məˈʃiːn/", "cỗ máy", "⚙️"),
          word("future", "/ˈfjuːtʃə/", "tương lai", "🔮"),
          word("screen", "/skriːn/", "màn hình", "📱"),
          word("battery", "/ˈbætri/", "cục pin", "🔋"),
          word("remote control", "/rɪˌməʊt kənˈtrəʊl/", "cái điều khiển từ xa", "🎮"),
          word("vacuum cleaner", "/ˈvækjuːm ˌkliːnə/", "máy hút bụi", "🧹"),
          word("chores", "/tʃɔːz/", "việc nhà lặt vặt", "🧺"),
          word("repair", "/rɪˈpeə/", "sửa chữa", "🔧"),
          word("helpful", "/ˈhelpfl/", "hữu ích, giúp được nhiều việc", "🙌"),
          word("clever", "/ˈklevə/", "thông minh, lanh lợi", "🧠"),
          word("mistake", "/mɪˈsteɪk/", "lỗi sai", "❌"),
        ],
        sound: {
          letters: "-ture",
          sound: "/tʃə/",
          hint:
            "Đuôi '-ture' KHÔNG đọc rời từng chữ thành 'tu-rê' hay 'tua'. Nó biến thành /tʃə/, " +
            "nghe gần như 'chơ': future = 'fiu-chơ', picture = 'pic-chơ', nature = 'nây-chơ'. " +
            "Trẻ Việt hay mắc hai lỗi ngược nhau: một là đọc tách chữ t và chữ u ra ('fu-tu-rê'), " +
            "hai là bật thật mạnh âm /r/ ở cuối — giọng Anh–Anh gần như không đọc /r/ cuối từ, " +
            "chỉ còn một tiếng 'ơ' nhẹ. Cứ nhớ: thấy '-ture' là đọc 'chơ'.",
          words: [
            { word: "future", meaning: "tương lai — /ˈfjuːtʃə/, 'fiu-chơ'", emoji: "🔮" },
            { word: "picture", meaning: "bức tranh — /ˈpɪktʃə/, 'pic-chơ'", emoji: "🖼️" },
            { word: "nature", meaning: "thiên nhiên — /ˈneɪtʃə/, 'nây-chơ'", emoji: "🌳" },
            { word: "adventure", meaning: "cuộc phiêu lưu — /ədˈventʃə/, 'ơd-ven-chơ'", emoji: "🗺️" },
            { word: "creature", meaning: "sinh vật — /ˈkriːtʃə/, 'cri-chơ'", emoji: "🐾" },
          ],
        },
        reading: {
          title: "The Robot in Our Kitchen",
          passage:
            "My grandfather is a man who loves new machines. Last month he bought a small robot that cleans the floor.\n\n" +
            "It is round and orange, and it has a screen which shows a happy face when the battery is full. Every morning it starts at seven o'clock. It moves under the table, finds the corners that we always forget, and it never complains about the chores.\n\n" +
            "Of course it makes mistakes. Once it pushed a pair of shoes into the garden, and once it fell down the step by the door. My grandfather had to repair it with a screwdriver and a lot of patience.\n\n" +
            "He says that in the future every family will have a helpful robot. My sister says she would rather have a dog.",
          translation:
            "Ông tớ là người rất mê máy móc mới. Tháng trước ông mua một con robot nhỏ chuyên lau sàn nhà.\n\n" +
            "Nó tròn tròn, màu cam, và có một màn hình hiện mặt cười mỗi khi pin đầy. Sáng nào nó cũng bắt đầu làm việc lúc bảy giờ. Nó chui xuống gầm bàn, tìm ra đúng những góc mà cả nhà hay quên, và chẳng bao giờ càu nhàu về việc nhà.\n\n" +
            "Tất nhiên là nó cũng mắc lỗi. Có lần nó đẩy một đôi giày ra tận vườn, có lần nó lăn cả xuống bậc thềm cạnh cửa. Ông tớ phải lấy tuốc nơ vít ra sửa, và phải rất kiên nhẫn nữa.\n\n" +
            "Ông bảo trong tương lai nhà nào cũng sẽ có một con robot hữu ích như thế. Còn chị tớ thì bảo chị thà nuôi một chú chó còn hơn.",
          questions: [
            mcq(
              "What does the robot do?",
              "Con robot làm việc gì?",
              ["It cleans the floor", "It cooks dinner", "It washes the clothes", "It cuts the grass"],
              0,
              "Bài đọc viết 'a small robot that cleans the floor' — đó là con robot chuyên lau sàn.",
              "a small robot that cleans the floor",
            ),
            mcq(
              "What does the screen show when the battery is full?",
              "Màn hình hiện gì khi pin đầy?",
              ["A happy face", "A red light", "The time", "A map of the house"],
              0,
              "Câu 'a screen which shows a happy face when the battery is full' cho biết màn hình hiện mặt cười.",
              "a screen which shows a happy face when the battery is full",
            ),
            mcq(
              "What did the robot push into the garden?",
              "Con robot đã đẩy thứ gì ra vườn?",
              ["A pair of shoes", "A chair", "A box of toys", "The rubbish bin"],
              0,
              "Bài viết 'it pushed a pair of shoes into the garden' — nó đẩy một đôi giày ra vườn.",
              "it pushed a pair of shoes into the garden",
            ),
            tf(
              "The grandfather repaired the robot himself.",
              "Chính ông đã tự sửa con robot.",
              true,
              "Đúng rồi! Bài viết 'My grandfather had to repair it with a screwdriver' — ông tự lấy tuốc nơ vít ra sửa.",
              "My grandfather had to repair it with a screwdriver",
            ),
            mcq(
              "What does the last sentence tell us about the sister?",
              "Câu cuối cho ta biết gì về người chị?",
              [
                "She wants a robot too",
                "She likes animals more than machines",
                "She is afraid of the robot",
                "She repairs the robot every day",
              ],
              1,
              "Bài không nói thẳng, bé phải tự suy ra: chị thà nuôi một chú chó hơn là có robot — nghĩa là chị thích động vật hơn máy móc.",
            ),
          ],
        },
        listening: {
          title: "Choosing a Present",
          transcript:
            "Girl: Dad, we must choose a present for Grandma today.\n" +
            "Dad: What about the small vacuum cleaner that we saw in the shop?\n" +
            "Girl: She already has one. I think she would like the clever speaker which answers questions.\n" +
            "Dad: That is a good idea. She can ask it about the weather, and she does not need a remote control.\n" +
            "Girl: And it plays her favourite old songs too.\n" +
            "Dad: Perfect. Let us go and buy it this afternoon.",
          questions: [
            mcq(
              "Who is the present for?",
              "Món quà này dành cho ai?",
              ["Grandma", "The girl", "Dad", "A teacher"],
              0,
              "Bạn nhỏ nói 'we must choose a present for Grandma today' — quà dành cho bà.",
              "we must choose a present for Grandma today",
            ),
            mcq(
              "Why does the girl say no to the vacuum cleaner?",
              "Vì sao bạn nhỏ không chọn máy hút bụi?",
              ["Because Grandma already has one", "Because it is too expensive", "Because it is too noisy", "Because the shop is closed"],
              0,
              "Bạn nhỏ trả lời 'She already has one.' — bà đã có một cái rồi.",
              "She already has one.",
            ),
            mcq(
              "What can the clever speaker do?",
              "Chiếc loa thông minh làm được gì?",
              [
                "It answers questions and plays songs",
                "It cleans the floor",
                "It cooks food",
                "It repairs other machines",
              ],
              0,
              "Bạn nhỏ nói 'the clever speaker which answers questions', rồi thêm 'it plays her favourite old songs too' — vừa trả lời câu hỏi vừa mở nhạc.",
              "the clever speaker which answers questions",
            ),
            tf(
              "They will buy the present next week.",
              "Hai bố con sẽ mua quà vào tuần sau.",
              false,
              "Không phải tuần sau đâu! Bố nói 'Let us go and buy it this afternoon.' — mua ngay chiều nay.",
              "Let us go and buy it this afternoon.",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về một cỗ máy hoặc đồ dùng trong nhà mà bé thấy hữu ích nhất: nó là gì, nó làm được việc gì, ai trong nhà hay dùng nó? Nhớ dùng mệnh đề quan hệ (who / which / that) để tả rõ hơn.",
        writingOutline:
          "1. Mở bài: The most helpful machine in my house is …\n" +
          "2. Tả bằng which/that: It is a machine which …\n" +
          "3. Người hay dùng: My … is the person who uses it every day.\n" +
          "4. Việc nó giúp: It helps us with the chores that …\n" +
          "5. Nhược điểm: Sometimes it makes mistakes. Once it …\n" +
          "6. Cảm nghĩ: I think it is clever because …\n" +
          "7. Kết bài: In the future I would like a robot which …",
        speaking: {
          sentences: [
            "My grandfather is a man who loves new machines.",
            "He bought a small robot that cleans the floor.",
            "It has a screen which shows a happy face.",
            "The robot never complains about the chores.",
            "In the future every family will have a helpful robot.",
          ],
          questions: [
            {
              question: "Which machine in your home is the most helpful? Why?",
              sampleAnswer:
                "The washing machine is the most helpful. It is a machine which saves my mother two hours every day.",
            },
            {
              question: "What would you like a robot to do for you?",
              sampleAnswer:
                "I would like a robot that washes the dishes, because that is the job I do not enjoy.",
            },
            {
              question: "Do you think robots will do all our chores in the future? Why?",
              sampleAnswer:
                "They may do many of them, but I think people will still cook, because cooking for your family is fun.",
            },
          ],
        },
      },

      // ─────────────────── Bài 14 · Learning a New Skill ───────────────────
      {
        topic: "Learning a New Skill",
        topicVi: "Học một kỹ năng mới",
        icon: "🎸",
        words: [
          word("skill", "/skɪl/", "kỹ năng", "🎯"),
          word("practise", "/ˈpræktɪs/", "luyện tập, tập đi tập lại", "🔁"),
          word("guitar", "/ɡɪˈtɑː/", "cây đàn ghi ta", "🎸"),
          word("chess", "/tʃes/", "cờ vua", "♟️"),
          word("climb", "/klaɪm/", "leo, trèo", "🧗"),
          word("coach", "/kəʊtʃ/", "người hướng dẫn, huấn luyện viên", "🧑‍🏫"),
          word("beginner", "/bɪˈɡɪnə/", "người mới bắt đầu", "🐣"),
          word("progress", "/ˈprəʊɡres/", "sự tiến bộ", "📈"),
          word("improve", "/ɪmˈpruːv/", "làm cho tốt hơn", "⬆️"),
          word("patient", "/ˈpeɪʃnt/", "kiên nhẫn", "😌"),
          word("proud", "/praʊd/", "tự hào", "😊"),
          word("confident", "/ˈkɒnfɪdənt/", "tự tin", "💪"),
        ],
        sound: {
          letters: "-mb (b câm)",
          sound: "/m/",
          hint:
            "Ở nhóm từ kết thúc bằng '-mb', chữ b hoàn toàn CÂM: climb đọc /klaɪm/, thumb đọc " +
            "/θʌm/, lamb đọc /læm/. Trẻ Việt có thói quen 'thấy chữ nào đọc chữ nấy' nên hay " +
            "thêm hẳn một vần mới ở cuối: 'clim-bờ', 'thăm-bơ'. Từ kết thúc ngay ở /m/ — hai môi " +
            "ngậm lại và dừng. Nhưng ngậm môi KHÔNG có nghĩa là nuốt: vẫn phải nghe rõ tiếng /m/ " +
            "ngân nhẹ. Lỗi thứ hai là chèn nguyên âm vào cụm đầu 'cl-': climb không phải 'cờ-lai', " +
            "/k/ và /l/ phải dính liền nhau.",
          words: [
            { word: "climb", meaning: "leo trèo — /klaɪm/, chữ b CÂM", emoji: "🧗" },
            { word: "thumb", meaning: "ngón tay cái — /θʌm/, lưỡi chạm răng cho âm /θ/", emoji: "👍" },
            { word: "comb", meaning: "cái lược — /kəʊm/, không đọc 'com-bờ'", emoji: "🪮" },
            { word: "lamb", meaning: "con cừu non — /læm/, dừng lại ở /m/", emoji: "🐑" },
            { word: "crumb", meaning: "vụn bánh — /krʌm/, cụm 'cr-' phải liền nhau", emoji: "🥐" },
          ],
        },
        reading: {
          title: "The Hardest Song",
          passage:
            "Two years ago I asked my parents for a guitar. On the first day I could not even hold it properly, and my fingers hurt.\n\n" +
            "My uncle came to our house every Saturday to teach me. He is a patient coach. “A beginner needs small steps,” he said. “Practise ten minutes a day to build strong fingers, and do not look at the clock.”\n\n" +
            "At first I only learned three chords. To remember them, I drew little pictures and put them on my wall. Slowly my hands stopped hurting and my progress became real.\n\n" +
            "Last month I played a whole song at my school concert. My hands were shaking, but I did not stop. Now I understand something important: you do not need a special talent to learn a skill. You need time, and you need to enjoy the climb.",
          translation:
            "Hai năm trước tớ xin bố mẹ mua cho một cây đàn ghi ta. Ngày đầu tiên tớ còn chưa biết ôm đàn cho đúng, mà mấy đầu ngón tay thì đau nhức.\n\n" +
            "Thứ Bảy nào cậu tớ cũng sang nhà dạy tớ. Cậu là một người hướng dẫn rất kiên nhẫn. “Người mới bắt đầu thì cần những bước thật nhỏ,” cậu bảo. “Mỗi ngày tập mười phút thôi để ngón tay khoẻ dần, và đừng có nhìn đồng hồ.”\n\n" +
            "Lúc đầu tớ chỉ học được ba hợp âm. Để nhớ chúng, tớ vẽ mấy hình nho nhỏ rồi dán lên tường. Dần dần bàn tay tớ hết đau, và sự tiến bộ trở nên rõ rệt.\n\n" +
            "Tháng trước tớ đã chơi trọn một bài trong buổi hoà nhạc của trường. Tay tớ run bần bật, nhưng tớ không dừng lại. Giờ thì tớ hiểu một điều quan trọng: học một kỹ năng không cần tài năng đặc biệt nào cả. Chỉ cần thời gian, và cần biết tận hưởng chặng đường leo dốc ấy.",
          questions: [
            mcq(
              "How often did the uncle come to teach?",
              "Người cậu tới dạy bao lâu một lần?",
              ["Every day", "Every Saturday", "Once a month", "Twice a year"],
              1,
              "Bài đọc viết 'My uncle came to our house every Saturday to teach me.' — thứ Bảy nào cậu cũng tới.",
              "My uncle came to our house every Saturday to teach me.",
            ),
            mcq(
              "What advice did the uncle give?",
              "Người cậu đã khuyên điều gì?",
              [
                "Practise ten minutes a day",
                "Practise three hours a day",
                "Learn ten songs first",
                "Buy a bigger guitar",
              ],
              0,
              "Cậu dặn 'Practise ten minutes a day to build strong fingers' — mỗi ngày mười phút thôi.",
              "Practise ten minutes a day to build strong fingers",
            ),
            mcq(
              "Why did the writer draw little pictures?",
              "Vì sao bạn nhỏ vẽ những hình nho nhỏ?",
              [
                "To remember the three chords",
                "To decorate the guitar",
                "To give them to the uncle",
                "To show them at the concert",
              ],
              0,
              "Câu 'To remember them, I drew little pictures' cho biết bạn nhỏ vẽ để nhớ ba hợp âm.",
              "To remember them, I drew little pictures",
            ),
            tf(
              "The writer's fingers hurt on the first day.",
              "Ngày đầu tiên các ngón tay của bạn nhỏ bị đau.",
              true,
              "Đúng rồi! Bài viết 'my fingers hurt' ngay trong ngày đầu cầm đàn.",
              "my fingers hurt",
            ),
            mcq(
              "How did the writer feel at the school concert?",
              "Bạn nhỏ cảm thấy thế nào trong buổi hoà nhạc?",
              ["Bored", "Nervous but determined", "Angry", "Sleepy"],
              1,
              "Bài không nói thẳng cảm xúc, bé phải tự suy ra: tay run bần bật (lo lắng) nhưng vẫn chơi hết bài, không dừng lại (quyết tâm).",
            ),
          ],
        },
        listening: {
          title: "At the Chess Club",
          transcript:
            "Boy: Are you going to the chess club today?\n" +
            "Girl: Yes. I joined it to learn something new, but I am still a beginner.\n" +
            "Boy: I played chess for a year and I only won two games.\n" +
            "Girl: Did you give up?\n" +
            "Boy: No. My coach told me to play one game every evening, and now I am much better. My parents were really proud last week when I won the school cup.\n" +
            "Girl: Then I will practise every day too. I want to improve and be as confident as you.",
          questions: [
            mcq(
              "Why did the girl join the chess club?",
              "Vì sao bạn gái tham gia câu lạc bộ cờ vua?",
              ["To learn something new", "To meet her cousin", "To win a prize", "To help the teacher"],
              0,
              "Bạn gái nói 'I joined it to learn something new' — tham gia để học điều mới.",
              "I joined it to learn something new",
            ),
            mcq(
              "What did the coach tell the boy to do?",
              "Huấn luyện viên bảo bạn trai làm gì?",
              [
                "Play one game every evening",
                "Read a book about chess",
                "Stop playing for a month",
                "Change to another club",
              ],
              0,
              "Bạn trai kể 'My coach told me to play one game every evening' — mỗi tối chơi một ván.",
              "My coach told me to play one game every evening",
            ),
            tf(
              "The boy won the school cup.",
              "Bạn trai đã giành cúp của trường.",
              true,
              "Đúng! Bạn trai kể 'when I won the school cup' và bố mẹ rất tự hào.",
              "when I won the school cup",
            ),
            mcq(
              "What will the girl do now?",
              "Bây giờ bạn gái sẽ làm gì?",
              ["She will practise every day", "She will leave the club", "She will teach the boy", "She will buy a chess set"],
              0,
              "Bạn gái nói 'Then I will practise every day too.' — bạn ấy quyết tâm tập mỗi ngày.",
              "Then I will practise every day too.",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về một kỹ năng bé đang học (đàn, bơi, vẽ, cờ vua, đá bóng…): bé bắt đầu thế nào, ai dạy bé, bé tập để làm gì? Nhớ dùng 'to + động từ' khi nói MỤC ĐÍCH của việc mình làm.",
        writingOutline:
          "1. Mở bài: Two years ago I started to learn …\n" +
          "2. Lúc mới bắt đầu: At first it was difficult because …\n" +
          "3. Người dạy: My … comes every … to teach me.\n" +
          "4. Mục đích của việc tập: I practise … minutes a day to …\n" +
          "5. Mẹo riêng của bé: To remember … , I …\n" +
          "6. Sự tiến bộ: Now I can … , and I feel more confident.\n" +
          "7. Kết bài: I will keep practising to become …",
        speaking: {
          sentences: [
            "My uncle came to our house every Saturday to teach me.",
            "Practise ten minutes a day to build strong fingers.",
            "To remember the chords, I drew little pictures.",
            "My hands were shaking, but I did not stop.",
            "You do not need a special talent to learn a skill.",
          ],
          questions: [
            {
              question: "What new skill are you learning now?",
              sampleAnswer:
                "I am learning to swim. I go to the pool twice a week to practise with my coach.",
            },
            {
              question: "What do you do when something is too difficult?",
              sampleAnswer:
                "I take a short break, and then I try again slowly. My mother says a beginner needs small steps.",
            },
            {
              question: "Tell me about a time you felt proud of yourself.",
              sampleAnswer:
                "I felt proud last month when I played a whole song at the school concert. My hands were shaking, but I finished it.",
            },
          ],
        },
      },

      // ───────────────────────── Bài 15 · Teamwork ─────────────────────────
      {
        topic: "Teamwork",
        topicVi: "Sức mạnh của cả nhóm",
        icon: "🤝",
        words: [
          word("teammate", "/ˈtiːmmeɪt/", "bạn cùng đội", "🧑‍🤝‍🧑"),
          word("captain", "/ˈkæptɪn/", "đội trưởng", "🧢"),
          word("share", "/ʃeə/", "chia sẻ, chia nhau", "🤲"),
          word("agree", "/əˈɡriː/", "đồng ý", "✅"),
          word("argue", "/ˈɑːɡjuː/", "cãi nhau, tranh luận", "💬"),
          word("encourage", "/ɪnˈkʌrɪdʒ/", "động viên, cổ vũ", "📣"),
          word("support", "/səˈpɔːt/", "ủng hộ, giúp đỡ", "🙌"),
          word("race", "/reɪs/", "cuộc đua", "🏁"),
          word("prize", "/praɪz/", "giải thưởng", "🏆"),
          word("fair", "/feə/", "công bằng", "⚖️"),
          word("plan", "/plæn/", "kế hoạch", "📋"),
          word("succeed", "/səkˈsiːd/", "thành công", "🎉"),
        ],
        sound: {
          letters: "c mềm (ce · ci · cy)",
          sound: "/s/",
          hint:
            "Chữ c đứng trước e, i hoặc y thì đọc là /s/ chứ KHÔNG phải /k/: race /reɪs/, city " +
            "/ˈsɪti/, circle /ˈsɜːkl/, pencil /ˈpensl/. Đứng trước a, o, u thì mới là /k/: cat, " +
            "cold, cup. Trẻ Việt quen đọc c là 'k' nên hay ra 'ra-kê', 'ki-ti' — nhìn thấy chữ " +
            "ngay sau c là biết ngay đọc kiểu nào. Lỗi thứ hai: âm /s/ ở CUỐI từ hay bị nuốt, " +
            "'race' thành 'rây'. Phải để hơi xì ra rõ ràng ở cuối, giữ khoảng một nhịp.",
          words: [
            { word: "race", meaning: "cuộc đua — /reɪs/, chữ c đọc là /s/", emoji: "🏁" },
            { word: "city", meaning: "thành phố — /ˈsɪti/, không phải 'ki-ti'", emoji: "🏙️" },
            { word: "circle", meaning: "vòng tròn — /ˈsɜːkl/, chữ c ĐẦU là /s/, chữ c SAU là /k/", emoji: "⭕" },
            { word: "pencil", meaning: "bút chì — /ˈpensl/, c trước i nên là /s/", emoji: "✏️" },
            { word: "ice", meaning: "nước đá — /aɪs/, để hơi xì rõ ở cuối", emoji: "🧊" },
          ],
        },
        reading: {
          title: "The Best Team of the Day",
          passage:
            "Last month our class joined the school boat race. There were six of us in the boat, although only two had rowed before.\n\n" +
            "At the beginning we argued a lot. Nam wanted to go fast, but Linh wanted to count “one, two” so that everybody moved together. Our captain listened to both of them and made a simple plan: Linh would count, and Nam would sit at the front.\n\n" +
            "The race was hard because the wind was against us. Our arms hurt, but nobody stopped. Every time somebody felt tired, the others shouted their name to encourage them.\n\n" +
            "We did not win the big prize. We came third. Still, our teacher said we were the best team of the day, because we finished together and nobody was left behind.",
          translation:
            "Tháng trước lớp tớ tham gia cuộc đua thuyền của trường. Trên thuyền có sáu đứa, mặc dù chỉ hai bạn từng chèo thuyền bao giờ.\n\n" +
            "Lúc đầu cả bọn cãi nhau ghê lắm. Nam muốn chèo thật nhanh, còn Linh lại muốn đếm “một, hai” để cả thuyền cùng nhịp. Bạn đội trưởng nghe cả hai rồi đưa ra một kế hoạch đơn giản: Linh sẽ đếm nhịp, còn Nam ngồi lên đầu thuyền.\n\n" +
            "Cuộc đua rất vất vả vì gió thổi ngược. Tay đứa nào cũng mỏi nhừ, nhưng chẳng ai bỏ cuộc. Cứ hễ có bạn nào thấy đuối là những bạn còn lại gọi tên bạn ấy thật to để động viên.\n\n" +
            "Bọn tớ không giành được giải lớn. Bọn tớ về thứ ba. Nhưng cô giáo vẫn bảo bọn tớ là đội hay nhất hôm đó, vì cả nhóm về đích cùng nhau và không bỏ lại ai phía sau.",
          questions: [
            mcq(
              "How many students were in the boat?",
              "Có bao nhiêu bạn ngồi trên thuyền?",
              ["Two", "Four", "Six", "Ten"],
              2,
              "Bài đọc viết 'There were six of us in the boat' — cả thảy sáu bạn.",
              "There were six of us in the boat",
            ),
            mcq(
              "What was the captain's plan?",
              "Kế hoạch của bạn đội trưởng là gì?",
              [
                "Linh would count, and Nam would sit at the front",
                "Everybody would row as fast as possible",
                "They would change places every minute",
                "Nam would count, and Linh would rest",
              ],
              0,
              "Bài viết rõ kế hoạch: 'Linh would count, and Nam would sit at the front' — Linh đếm nhịp, Nam ngồi đầu thuyền.",
              "Linh would count, and Nam would sit at the front",
            ),
            mcq(
              "Why was the race hard?",
              "Vì sao cuộc đua lại vất vả?",
              [
                "Because the wind was against them",
                "Because the boat was very old",
                "Because it was raining",
                "Because nobody could swim",
              ],
              0,
              "Câu 'The race was hard because the wind was against us' nêu đúng lý do: gió thổi ngược.",
              "The race was hard because the wind was against us",
            ),
            tf(
              "The class won the big prize.",
              "Lớp của bạn nhỏ đã giành giải lớn.",
              false,
              "Chưa đâu! Bài viết 'We did not win the big prize.' — cả đội chỉ về thứ ba thôi.",
              "We did not win the big prize.",
            ),
            mcq(
              "What does this story teach us about teamwork?",
              "Câu chuyện dạy ta điều gì về làm việc nhóm?",
              [
                "Winning is the only thing that matters",
                "A team is strong when everybody helps each other",
                "The fastest person should decide everything",
                "It is better to work alone",
              ],
              1,
              "Bài không nói thẳng bài học, bé phải tự rút ra: cả đội cãi nhau nhưng chịu nghe nhau, động viên nhau và về đích cùng nhau — đó mới là điều làm nên một đội mạnh.",
            ),
          ],
        },
        listening: {
          title: "Planning the Class Project",
          transcript:
            "Teacher: You will work in groups of four for this project. Remember to share the work fairly.\n" +
            "Boy: Can I do the drawings? I am not very good at writing.\n" +
            "Girl: That is fine with me. I agree. I will write the text if you draw.\n" +
            "Teacher: Good. And who will speak in front of the class?\n" +
            "Girl: Mai will. She is our best speaker, and we will all support her.\n" +
            "Teacher: Excellent. A group succeeds when everybody has a job they enjoy.",
          questions: [
            mcq(
              "How many students are in each group?",
              "Mỗi nhóm có bao nhiêu bạn?",
              ["Two", "Three", "Four", "Six"],
              2,
              "Cô giáo nói 'You will work in groups of four for this project' — mỗi nhóm bốn bạn.",
              "You will work in groups of four for this project",
            ),
            mcq(
              "What will the boy do?",
              "Bạn trai sẽ làm phần nào?",
              ["The drawings", "The writing", "The speaking", "Nothing at all"],
              0,
              "Bạn trai xin làm phần vẽ: 'Can I do the drawings?'",
              "Can I do the drawings?",
            ),
            tf(
              "Mai will speak in front of the class.",
              "Mai sẽ là người thuyết trình trước lớp.",
              true,
              "Đúng rồi! Bạn gái nói 'Mai will. She is our best speaker' — Mai nói giỏi nhất nhóm.",
              "Mai will. She is our best speaker",
            ),
            mcq(
              "What does the teacher say about a good group?",
              "Cô giáo nói gì về một nhóm tốt?",
              [
                "It succeeds when everybody has a job they enjoy",
                "It always needs a leader",
                "It must finish before the others",
                "It should work in silence",
              ],
              0,
              "Cô giáo kết lại: 'A group succeeds when everybody has a job they enjoy.'",
              "A group succeeds when everybody has a job they enjoy.",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về một lần bé làm việc cùng nhóm (bài tập nhóm, trận đấu, buổi biểu diễn): nhóm bé làm gì, chia việc ra sao, kết quả thế nào? Nhớ dùng because / so / but / although để nối các ý lại.",
        writingOutline:
          "1. Mở bài: Last … my class joined a …\n" +
          "2. Nhóm gồm những ai: There were … of us, although only …\n" +
          "3. Khó khăn lúc đầu: At the beginning we argued because …\n" +
          "4. Cách chia việc: Our captain made a plan, so …\n" +
          "5. Lúc khó khăn: The … was hard because … , but nobody …\n" +
          "6. Kết quả: We did not win, although …\n" +
          "7. Bài học: Now I know that a team succeeds when …",
        speaking: {
          sentences: [
            "Our class joined the school boat race last month.",
            "At the beginning we argued a lot.",
            "Our captain listened to both of them and made a simple plan.",
            "The race was hard because the wind was against us.",
            "We finished together and nobody was left behind.",
          ],
          questions: [
            {
              question: "Do you prefer working alone or in a team? Why?",
              sampleAnswer:
                "I prefer a team, because my friends have ideas that I never think of. We also finish faster.",
            },
            {
              question: "What do you do when your group cannot agree?",
              sampleAnswer:
                "I listen to everybody first, and then we choose the simplest plan. Sometimes we ask our teacher to help.",
            },
            {
              question: "How can you encourage a teammate who feels tired?",
              sampleAnswer:
                "I shout their name and tell them they are doing well. A little support makes people much stronger.",
            },
          ],
        },
      },
    ],
  },
];
