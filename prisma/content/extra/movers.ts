// Bài học BỔ SUNG cho cấp này — nối SAU danh sách gốc trong ../movers.ts.
//
// Tách file riêng để soạn thêm bài mà không phải mở file gốc (đã rất dài).
// ⚠️ Mỗi bài thêm ở đây PHẢI có một mục ngữ pháp tương ứng, ĐÚNG THỨ TỰ, trong
//    ../grammar/extra-movers.ts — nếu không `npm run content:check` sẽ báo lệch hàng.
//
// 2 chương × 3 bài = 6 bài (Chương 5 và Chương 6 của cấp MOVERS).
// Chính tả: Anh–Anh (Mum / favourite / colour / practise) như file gốc.
//
// Âm phonics tiếp nối 12 âm đã dạy ở file gốc (ai·ay·ee·ea·igh·oa·oo·ar·or·ur·ow·oi):
//   ou · ir · ew · oy · air · aw   (mỗi âm ghép đôi với một âm đã học)
// Ngữ pháp đi kèm (không lặp 12 điểm đã dạy ở ../grammar/roadmap-movers.ts):
//   Did…? / didn't · hiện tại tiếp diễn · there was / there were ·
//   câu mệnh lệnh + First-Then-Next-Finally · have got / has got · tân ngữ me-him-her-us-them
import { type ChapterSeed, mcq, tf, word } from "../types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 5 · Những chuyến đi vui",
    subtitle: "Vườn thú, ngày hội thể thao và chuyến dã ngoại của cả lớp",
    lessons: [
      // ─────────────────────────── Bài 13 ───────────────────────────
      {
        topic: "A Day at the Zoo",
        topicVi: "Một ngày ở vườn thú",
        icon: "🦁",
        words: [
          word("ticket", "/ˈtɪkɪt/", "vé vào cửa", "🎫"),
          word("zookeeper", "/ˈzuːkiːpə/", "cô chú chăm sóc thú", "🧑‍🌾"),
          word("penguin", "/ˈpeŋɡwɪn/", "chim cánh cụt", "🐧"),
          word("parrot", "/ˈpærət/", "con vẹt", "🦜"),
          word("feed", "/fiːd/", "cho ăn (quá khứ: fed)", "🥕"),
          word("loud", "/laʊd/", "ồn ào, to tiếng", "🔊"),
          word("mouth", "/maʊθ/", "cái miệng, cái mỏ", "👄"),
          word("ground", "/ɡraʊnd/", "mặt đất", "🟫"),
          word("clap", "/klæp/", "vỗ tay", "👏"),
          word("funny", "/ˈfʌni/", "buồn cười, vui nhộn", "😂"),
        ],
        sound: {
          letters: "ou",
          sound: "/aʊ/",
          hint: "'ou' trong loud, mouth đọc là âm ĐÔI /aʊ/ — giống 'ow' trong cow mà bé đã học: bắt đầu ở 'a' rồi trượt sang 'u', môi tròn dần trong MỘT hơi. Trẻ Việt hay dừng lại ở 'ao' rồi nuốt phụ âm cuối: loud phải bật /d/ (đừng thành 'lao'), around phải bật /n/ + /d/. Riêng mouth kết thúc bằng /θ/ — thè nhẹ đầu lưỡi ra giữa hai hàm răng rồi thổi hơi, đừng đổi thành /t/ ('mao-t').",
          words: [
            { word: "loud", meaning: "ồn ào", emoji: "🔊" },
            { word: "mouth", meaning: "cái miệng", emoji: "👄" },
            { word: "house", meaning: "ngôi nhà", emoji: "🏠" },
            { word: "around", meaning: "xung quanh", emoji: "🔄" },
          ],
        },
        reading: {
          title: "Our day at the zoo",
          passage:
            "Last Sunday my class went to the zoo. Dad bought our tickets, and then we walked to the penguins. They were very funny. They jumped into the water and swam fast. After that, a zookeeper fed the parrots. One parrot was very loud! It opened its mouth and said, 'Hello!' We all clapped. At twelve o'clock we sat on the ground and ate our sandwiches. I did not want to go home.",
          translation:
            "Chủ nhật tuần trước, lớp tớ đi vườn thú. Bố mua vé cho cả nhóm, rồi chúng tớ đi bộ tới chỗ chim cánh cụt. Mấy bạn ấy buồn cười lắm. Các bạn ấy nhảy tùm xuống nước và bơi rất nhanh. Sau đó, một cô chăm sóc thú cho lũ vẹt ăn. Có một chú vẹt kêu to ơi là to! Chú ấy há mỏ ra và nói: 'Xin chào!' Cả lớp vỗ tay. Đúng mười hai giờ, chúng tớ ngồi xuống đất và ăn bánh mì kẹp. Tớ chẳng muốn về nhà chút nào.",
          questions: [
            mcq(
              "Where did the class go last Sunday?",
              "Chủ nhật tuần trước lớp đi đâu?",
              ["To the zoo", "To the beach", "To the park", "To the museum"],
              0,
              "Câu đầu bài kể rõ: 'Last Sunday my class went to the zoo.' — cả lớp đi vườn thú. Chữ 'went' là dạng quá khứ của 'go'.",
              "Last Sunday my class went to the zoo.",
            ),
            mcq(
              "What did the penguins do?",
              "Mấy chú chim cánh cụt đã làm gì?",
              [
                "They jumped into the water",
                "They ate the sandwiches",
                "They said hello",
                "They slept on the ground",
              ],
              0,
              "Bài viết: 'They jumped into the water and swam fast.' — chim cánh cụt nhảy xuống nước rồi bơi rất nhanh. Con nói 'Hello' là chú vẹt, không phải chim cánh cụt.",
              "They jumped into the water and swam fast.",
            ),
            mcq(
              "Who fed the parrots?",
              "Ai đã cho lũ vẹt ăn?",
              ["A zookeeper", "The writer's dad", "The teacher", "The children"],
              0,
              "Câu 'a zookeeper fed the parrots' cho biết người cho vẹt ăn là cô chăm sóc thú. Bố chỉ mua vé thôi.",
              "a zookeeper fed the parrots",
            ),
            tf(
              "The children ate their sandwiches at twelve o'clock.",
              "Các bạn nhỏ ăn bánh mì kẹp lúc mười hai giờ.",
              true,
              "Đúng rồi! Bài viết: 'At twelve o'clock we sat on the ground and ate our sandwiches.' — đúng mười hai giờ cả lớp ngồi xuống đất ăn bánh.",
              "At twelve o'clock we sat on the ground and ate our sandwiches.",
            ),
          ],
        },
        listening: {
          title: "At the penguin pool",
          transcript:
            "Girl: Look, Nam! The penguins are swimming.\nBoy: Wow, they are so fast!\nGirl: My favourite animal is the parrot. It can talk.\nBoy: Really? What did it say?\nGirl: It said hello, and everybody clapped.\nBoy: That is funny! Where did you get your ticket?\nGirl: My dad bought it at the gate.\nBoy: Let's go and see the elephants now.",
          questions: [
            mcq(
              "What are the penguins doing?",
              "Mấy chú chim cánh cụt đang làm gì?",
              ["Swimming", "Sleeping", "Eating", "Singing"],
              0,
              "Bạn gái nói 'The penguins are swimming.' — 'are swimming' là đang bơi, chuyện xảy ra ngay lúc này.",
              "The penguins are swimming.",
            ),
            mcq(
              "Which animal does the girl like best?",
              "Bạn gái thích con vật nào nhất?",
              ["The parrot", "The penguin", "The elephant", "The monkey"],
              0,
              "Bạn ấy nói 'My favourite animal is the parrot.' — 'favourite' nghĩa là thích nhất.",
              "My favourite animal is the parrot.",
            ),
            tf(
              "The girl's dad bought her ticket.",
              "Bố bạn gái đã mua vé cho bạn ấy.",
              true,
              "Đúng rồi! Khi Nam hỏi vé ở đâu, bạn gái trả lời 'My dad bought it at the gate.' — bố mua vé ở cổng.",
              "My dad bought it at the gate.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh kể về một lần bé đi vườn thú (hoặc công viên). Bé đi với ai? Bé nhìn thấy con gì? Con vật đó làm gì? Bé thích nhất điều gì? Dùng thì quá khứ đơn (went, saw, ate, clapped).",
        writingOutline:
          "1. Mở đầu: Last Sunday I went to the zoo with …\n2. Con vật bé thấy: I saw some penguins / parrots / monkeys.\n3. Con vật làm gì: They jumped into the water. / It opened its mouth and said hello.\n4. Bé làm gì: We clapped. / We ate our sandwiches on the ground.\n5. Cảm nghĩ: It was a funny day. I did not want to go home.",
        speaking: {
          sentences: [
            "Last Sunday my class went to the zoo.",
            "Dad bought our tickets at the gate.",
            "The penguins jumped into the water.",
            "One parrot was very loud.",
            "We sat on the ground and ate our sandwiches.",
          ],
          questions: [
            {
              question: "Did you go to the zoo last year?",
              sampleAnswer: "Yes, I did. I went to the zoo with my family last summer.",
            },
            {
              question: "Which animal do you like best? Why?",
              sampleAnswer: "I like penguins best, because they are funny and they swim very fast.",
            },
            {
              question: "What did you eat on your last day out?",
              sampleAnswer: "I ate a sandwich and a banana, and I drank some water.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 14 ───────────────────────────
      {
        topic: "Sports Day",
        topicVi: "Ngày hội thể thao",
        icon: "🏅",
        words: [
          word("race", "/reɪs/", "cuộc đua", "🏁"),
          word("team", "/tiːm/", "đội, nhóm", "👥"),
          word("shirt", "/ʃɜːt/", "cái áo", "👕"),
          word("first", "/fɜːst/", "đầu tiên, về nhất", "🥇"),
          word("fast", "/fɑːst/", "nhanh", "💨"),
          word("jump", "/dʒʌmp/", "nhảy", "🤸"),
          word("catch", "/kætʃ/", "bắt lấy (quá khứ: caught)", "🧤"),
          word("cheer", "/tʃɪə/", "reo hò cổ vũ", "📣"),
          word("prize", "/praɪz/", "phần thưởng", "🎁"),
          word("win", "/wɪn/", "chiến thắng (quá khứ: won)", "🏆"),
        ],
        sound: {
          letters: "ir",
          sound: "/ɜː/",
          hint: "'ir' KHÔNG đọc thành 'i-rờ'. Đây là MỘT âm dài /ɜː/, nghe gần như 'ơ' kéo dài, môi để dẹt, lưỡi nằm giữa miệng — giống hệt âm 'ur' bé đã học (nurse). Chữ r ở cuối KHÔNG bật ra tiếng (giọng Anh–Anh). Trẻ Việt hay quên phụ âm cuối: first phải bật /t/ (đừng thành 'phợt'), bird phải bật /d/. Và shirt bắt đầu bằng /ʃ/ — chu môi thổi 'sh…', đừng đổi thành /s/ ('sớt').",
          words: [
            { word: "first", meaning: "đầu tiên", emoji: "🥇" },
            { word: "shirt", meaning: "cái áo", emoji: "👕" },
            { word: "girl", meaning: "bạn gái", emoji: "👧" },
            { word: "bird", meaning: "con chim", emoji: "🐦" },
          ],
        },
        reading: {
          title: "Sports Day at my school",
          passage:
            "It is Sports Day at my school. All the children are wearing red or blue shirts. I am in the blue team. This morning we played a ball game, and I caught the ball six times. Right now my friend Nam is running in the last race. He is very fast, and our teacher is shouting, 'Come on, Nam!' We are all cheering. Look — Nam is first! He is jumping and smiling, and Miss Lan is giving him a prize.",
          translation:
            "Hôm nay trường tớ có Ngày hội thể thao. Tất cả các bạn đều mặc áo đỏ hoặc áo xanh. Tớ ở đội xanh. Sáng nay chúng tớ chơi trò ném bắt bóng, tớ bắt được bóng sáu lần. Ngay lúc này, bạn Nam đang chạy ở cuộc đua cuối cùng. Bạn ấy nhanh lắm, còn cô giáo thì đang hò lên: 'Cố lên, Nam ơi!' Cả bọn tớ đang reo hò cổ vũ. Nhìn kìa — Nam về nhất! Bạn ấy đang nhảy cẫng lên và cười tươi, còn cô Lan thì đang trao thưởng cho bạn ấy.",
          questions: [
            mcq(
              "Which team is the writer in?",
              "Bạn nhỏ ở đội nào?",
              ["The blue team", "The red team", "The green team", "The yellow team"],
              0,
              "Bạn nhỏ tự giới thiệu: 'I am in the blue team.' — bạn ấy ở đội xanh, nên bạn ấy mặc áo xanh.",
              "I am in the blue team.",
            ),
            mcq(
              "What is Nam doing right now?",
              "Ngay lúc này Nam đang làm gì?",
              [
                "He is running in a race",
                "He is playing a ball game",
                "He is watching the race",
                "He is eating his lunch",
              ],
              0,
              "Bài viết: 'Nam is running in the last race.' — 'is running' nghĩa là đang chạy NGAY LÚC NÀY. Trò ném bắt bóng là chuyện của buổi sáng rồi.",
              "Nam is running in the last race",
            ),
            mcq(
              "How many times did the writer catch the ball?",
              "Bạn nhỏ bắt được bóng bao nhiêu lần?",
              ["Six", "Five", "Four", "Three"],
              0,
              "Câu 'I caught the ball six times' cho biết bạn ấy bắt được sáu lần. 'caught' là dạng quá khứ của 'catch'.",
              "I caught the ball six times",
            ),
            tf(
              "Nam is the first runner in the last race.",
              "Nam về nhất trong cuộc đua cuối cùng.",
              true,
              "Đúng rồi! Bài viết reo lên 'Look — Nam is first!' — Nam về nhất, thế nên bạn ấy được cô Lan trao thưởng.",
              "Nam is first!",
            ),
          ],
        },
        listening: {
          title: "Where is my team?",
          transcript:
            "Teacher: Good morning, everyone. Sports Day starts at nine o'clock.\nGirl: Miss Lan, where is my team?\nTeacher: The blue team is standing near the big tree.\nGirl: Thank you. What is Nam doing? He is not with us.\nTeacher: He is putting on his shirt. He is running in the first race.\nGirl: I am not running today. I am catching the ball for my team.\nTeacher: That is a very important job! Good luck.\nGirl: Thank you, Miss Lan.",
          questions: [
            mcq(
              "What time does Sports Day start?",
              "Ngày hội thể thao bắt đầu lúc mấy giờ?",
              ["At nine o'clock", "At eight o'clock", "At ten o'clock", "At twelve o'clock"],
              0,
              "Cô giáo nói ngay đầu bài: 'Sports Day starts at nine o'clock.' — chín giờ bắt đầu.",
              "Sports Day starts at nine o'clock.",
            ),
            mcq(
              "What is Nam doing now?",
              "Bây giờ Nam đang làm gì?",
              [
                "He is putting on his shirt",
                "He is running a race",
                "He is catching the ball",
                "He is standing near the tree",
              ],
              0,
              "Cô giáo trả lời 'He is putting on his shirt.' — Nam đang mặc áo. Bạn ấy sẽ chạy, nhưng chưa chạy lúc này.",
              "He is putting on his shirt.",
            ),
            tf(
              "The girl is running in a race today.",
              "Hôm nay bạn gái có chạy đua.",
              false,
              "Chưa đúng rồi! Bạn gái nói 'I am not running today. I am catching the ball for my team.' — hôm nay bạn ấy bắt bóng cho đội chứ không chạy.",
              "I am not running today.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh kể về ngày hội thể thao ở trường bé. Bé ở đội nào, mặc áo màu gì? Bé chơi môn gì? Các bạn đang làm gì? Ai được thưởng? Dùng thì hiện tại tiếp diễn (is / are + V-ing).",
        writingOutline:
          "1. Mở đầu: It is Sports Day at my school.\n2. Đội của bé: I am in the blue team and I am wearing a blue shirt.\n3. Việc đang diễn ra: My friends are running / jumping / cheering.\n4. Việc bé làm: I am catching the ball for my team.\n5. Kết: Nam is first! Our teacher is giving him a prize.",
        speaking: {
          sentences: [
            "It is Sports Day at my school.",
            "I am in the blue team.",
            "Nam is running in the last race.",
            "We are all cheering for him.",
            "Miss Lan is giving him a prize.",
          ],
          questions: [
            {
              question: "What are you wearing today?",
              sampleAnswer: "I am wearing a blue shirt and black shoes.",
            },
            {
              question: "Do you like running or jumping? Why?",
              sampleAnswer: "I like running, because I am fast and I love races.",
            },
            {
              question: "What is your friend doing now?",
              sampleAnswer: "My friend is playing football in the playground.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 15 ───────────────────────────
      {
        topic: "A School Trip",
        topicVi: "Chuyến dã ngoại của lớp",
        icon: "🚌",
        words: [
          word("trip", "/trɪp/", "chuyến đi chơi", "🧳"),
          word("museum", "/mjuˈziːəm/", "viện bảo tàng", "🏛️"),
          word("guide", "/ɡaɪd/", "người hướng dẫn", "🧭"),
          word("map", "/mæp/", "tấm bản đồ", "🗺️"),
          word("dinosaur", "/ˈdaɪnəsɔː/", "con khủng long", "🦕"),
          word("photo", "/ˈfəʊtəʊ/", "tấm ảnh", "📷"),
          word("picnic", "/ˈpɪknɪk/", "buổi ăn ngoài trời", "🧺"),
          word("quiet", "/ˈkwaɪət/", "yên tĩnh", "🤫"),
          word("new", "/njuː/", "mới", "✨"),
          word("exciting", "/ɪkˈsaɪtɪŋ/", "thú vị, hào hứng", "🤩"),
        ],
        sound: {
          letters: "ew",
          sound: "/juː/",
          hint: "'ew' đọc là âm 'u' DÀI. Sau n, f thì tiếng Anh–Anh thêm một chút /j/ ở đầu: new = /njuː/ ('niu'), few = /fjuː/ ('phiu'). Sau r, l, thr thì chỉ là /uː/: grew, flew, threw. Chữ w ở cuối KHÔNG kêu thành tiếng — đừng đọc 'niu-ơ'. Trẻ Việt hay cắt ngắn thành 'niu' cụt; phải KÉO DÀI âm u, môi tròn lại. Với flew, threw nhớ đọc liền cụm phụ âm fl-, thr-, đừng chèn thêm 'ơ' vào giữa ('phờ-le').",
          words: [
            { word: "new", meaning: "mới", emoji: "✨" },
            { word: "few", meaning: "một vài", emoji: "🤏" },
            { word: "flew", meaning: "đã bay", emoji: "🕊️" },
            { word: "grew", meaning: "đã lớn lên", emoji: "🌱" },
          ],
        },
        reading: {
          title: "Our trip to the museum",
          passage:
            "Last Friday there was a school trip to the museum. There were forty children on the bus, and it was very noisy! Inside the museum, there was a big dinosaur. Its head was near the ceiling! There were only a few people, so the rooms were quiet. Our guide gave us a map and told us a funny story. After that we had a picnic in the garden, and Miss Hoa took a photo of my class. It was a new museum, and everything was exciting.",
          translation:
            "Thứ Sáu tuần trước, lớp tớ có một chuyến đi bảo tàng. Trên xe buýt có bốn mươi bạn, ồn ơi là ồn! Bên trong bảo tàng có một con khủng long thật to. Đầu nó gần chạm trần nhà luôn! Hôm đó chỉ có vài người khách nên các phòng rất yên tĩnh. Cô hướng dẫn phát cho chúng tớ một tấm bản đồ và kể một câu chuyện rất vui. Sau đó chúng tớ ăn dã ngoại ngoài vườn, còn cô Hoa thì chụp cho lớp tớ một tấm ảnh. Bảo tàng ấy mới toanh, cái gì cũng thú vị.",
          questions: [
            mcq(
              "Where did the class go last Friday?",
              "Thứ Sáu tuần trước lớp đi đâu?",
              ["To the museum", "To the zoo", "To the beach", "To the library"],
              0,
              "Câu đầu bài: 'there was a school trip to the museum' — cả lớp đi bảo tàng.",
              "there was a school trip to the museum",
            ),
            mcq(
              "How many children were on the bus?",
              "Trên xe buýt có bao nhiêu bạn nhỏ?",
              ["Forty", "Fourteen", "Four", "Fifty"],
              0,
              "Bài viết 'There were forty children on the bus' — bốn mươi bạn. Chú ý phân biệt forty (40) và fourteen (14).",
              "There were forty children on the bus",
            ),
            mcq(
              "Why were the rooms quiet?",
              "Vì sao các phòng lại yên tĩnh?",
              [
                "Because there were only a few people",
                "Because the children were sleeping",
                "Because the museum was closed",
                "Because there was no dinosaur",
              ],
              0,
              "Bài viết: 'There were only a few people, so the rooms were quiet.' — chữ 'so' cho biết ít khách là LÍ DO phòng yên tĩnh.",
              "There were only a few people, so the rooms were quiet.",
            ),
            tf(
              "The class had a picnic in the garden.",
              "Cả lớp ăn dã ngoại ngoài vườn.",
              true,
              "Đúng rồi! Bài viết: 'we had a picnic in the garden' — sau khi tham quan, cả lớp ăn ngoài vườn.",
              "we had a picnic in the garden",
            ),
          ],
        },
        listening: {
          title: "Telling Mum about the trip",
          transcript:
            "Boy: Mum, there was a big dinosaur at the museum today!\nMum: Really? Was it very big?\nBoy: Yes! Its head was near the ceiling. There were three baby dinosaurs next to it.\nMum: Did you take a photo?\nBoy: Yes, Miss Hoa took a photo of all my class.\nMum: Lovely. Was there a shop?\nBoy: Yes, but there weren't any maps left, so I bought a pencil.\nMum: Good idea. Now please wash your hands before dinner.",
          questions: [
            mcq(
              "What did the boy see at the museum?",
              "Bạn trai đã nhìn thấy gì ở bảo tàng?",
              ["A big dinosaur", "A big fish", "An old bus", "A new map"],
              0,
              "Bạn ấy khoe ngay: 'there was a big dinosaur at the museum today' — có một con khủng long rất to.",
              "there was a big dinosaur at the museum today",
            ),
            mcq(
              "How many baby dinosaurs were there?",
              "Có mấy con khủng long con?",
              ["Three", "Two", "Four", "Ten"],
              0,
              "Bạn ấy kể 'There were three baby dinosaurs next to it.' — ba con khủng long con đứng bên cạnh.",
              "There were three baby dinosaurs next to it.",
            ),
            tf(
              "The boy bought a map at the shop.",
              "Bạn trai đã mua một tấm bản đồ ở cửa hàng.",
              false,
              "Chưa đúng rồi! Bạn ấy nói 'there weren't any maps left, so I bought a pencil' — bản đồ hết sạch nên bạn ấy mua một cái bút chì.",
              "there weren't any maps left, so I bought a pencil",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh kể về một chuyến đi của lớp bé (bảo tàng, công viên, trang trại…). Ở đó có những gì? Có bao nhiêu bạn? Bé đã làm gì? Dùng 'There was…' và 'There were…' để tả những thứ đã có ở đó.",
        writingOutline:
          "1. Mở đầu: Last Friday there was a school trip to …\n2. Số bạn đi: There were … children on the bus.\n3. Thứ bé thấy: There was a big … / There were three …\n4. Việc cả lớp làm: We had a picnic. / Our guide gave us a map.\n5. Cảm nghĩ: It was an exciting day.",
        speaking: {
          sentences: [
            "Last Friday there was a school trip to the museum.",
            "There were forty children on the bus.",
            "There was a big dinosaur inside.",
            "Our guide gave us a map.",
            "We had a picnic in the garden.",
          ],
          questions: [
            {
              question: "Where did you go on your last school trip?",
              sampleAnswer: "I went to a farm with my class, and we saw a lot of animals.",
            },
            {
              question: "What was there in your classroom yesterday?",
              sampleAnswer: "There was a big map on the wall and there were thirty chairs.",
            },
            {
              question: "Do you like museums? Why?",
              sampleAnswer: "Yes, I do. Museums are quiet and I can learn new things there.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 6 · Ở nhà và người thân",
    subtitle: "Vào bếp cùng mẹ, chăm thú cưng và những ngày ở nhà ông bà",
    lessons: [
      // ─────────────────────────── Bài 16 ───────────────────────────
      {
        topic: "Cooking with Mum",
        topicVi: "Vào bếp cùng mẹ",
        icon: "👩‍🍳",
        words: [
          word("kitchen", "/ˈkɪtʃɪn/", "nhà bếp", "🍳"),
          word("rice", "/raɪs/", "cơm, gạo", "🍚"),
          word("egg", "/eɡ/", "quả trứng", "🥚"),
          word("pot", "/pɒt/", "cái nồi", "🍲"),
          word("stir", "/stɜː/", "khuấy, đảo đều", "🥄"),
          word("boil", "/bɔɪl/", "đun sôi", "♨️"),
          word("taste", "/teɪst/", "nếm thử", "👅"),
          word("delicious", "/dɪˈlɪʃəs/", "ngon tuyệt", "😍"),
          word("careful", "/ˈkeəfl/", "cẩn thận", "⚠️"),
          word("enjoy", "/ɪnˈdʒɔɪ/", "thích, tận hưởng", "😋"),
        ],
        sound: {
          letters: "oy",
          sound: "/ɔɪ/",
          hint: "'oy' đọc là âm ĐÔI /ɔɪ/, giống hệt 'oi' bé đã học (coin, boil) — chỉ khác chỗ đứng: 'oy' thường ở CUỐI từ (boy, toy, enjoy), còn 'oi' ở giữa từ. Bắt đầu ở 'o' môi tròn rồi trượt sang 'i', môi dẹt dần, trong MỘT hơi. Trẻ Việt hay đọc cụt thành 'boi' ngắn — phải trượt hẳn sang /ɪ/. Với enjoy, trọng âm rơi vào âm tiết SAU: en-JOY; đọc đều hai âm tiết là sai.",
          words: [
            { word: "boy", meaning: "bạn trai", emoji: "👦" },
            { word: "toy", meaning: "đồ chơi", emoji: "🧸" },
            { word: "enjoy", meaning: "thích thú", emoji: "😄" },
            { word: "joy", meaning: "niềm vui", emoji: "🎉" },
          ],
        },
        reading: {
          title: "Fried rice on Sunday",
          passage:
            "On Sunday I cook with my mum in the kitchen. Today we are making fried rice. First, Mum says, 'Wash your hands, please.' Then I break two eggs into a bowl. The water in the pot is boiling, so I am very careful. 'Now stir the rice slowly,' says Mum. 'Don't touch the hot pan!' Next, we put the eggs in. Finally, we taste our fried rice. 'It's delicious!' says Dad. I always enjoy cooking with my mum.",
          translation:
            "Chủ nhật nào tớ cũng nấu ăn với mẹ trong bếp. Hôm nay hai mẹ con làm món cơm rang. Đầu tiên, mẹ bảo: 'Con rửa tay đi nhé.' Rồi tớ đập hai quả trứng vào bát. Nước trong nồi đang sôi nên tớ rất cẩn thận. 'Giờ con đảo cơm từ từ thôi,' mẹ nói. 'Đừng chạm vào cái chảo nóng!' Tiếp theo, hai mẹ con cho trứng vào. Cuối cùng, cả nhà nếm thử món cơm rang. 'Ngon tuyệt!' bố khen. Tớ lúc nào cũng thích nấu ăn cùng mẹ.",
          questions: [
            mcq(
              "What are they making today?",
              "Hôm nay hai mẹ con làm món gì?",
              ["Fried rice", "Noodle soup", "A birthday cake", "Spring rolls"],
              0,
              "Bài viết: 'Today we are making fried rice.' — hai mẹ con đang làm món cơm rang.",
              "Today we are making fried rice.",
            ),
            mcq(
              "What does Mum ask the writer to do first?",
              "Việc đầu tiên mẹ bảo bạn nhỏ làm là gì?",
              ["Wash your hands", "Break two eggs", "Stir the rice", "Taste the rice"],
              0,
              "Chữ 'First' cho biết việc đầu tiên: 'Wash your hands, please.' — rửa tay trước đã. Đập trứng là việc tiếp theo.",
              "Wash your hands, please.",
            ),
            mcq(
              "Why is the writer very careful?",
              "Vì sao bạn nhỏ rất cẩn thận?",
              [
                "Because the water is boiling",
                "Because the eggs are cold",
                "Because Dad is hungry",
                "Because the rice is old",
              ],
              0,
              "Bài viết: 'The water in the pot is boiling, so I am very careful.' — chữ 'so' cho biết nước sôi là LÍ DO bạn ấy phải cẩn thận.",
              "The water in the pot is boiling, so I am very careful.",
            ),
            tf(
              "Dad says the fried rice is delicious.",
              "Bố khen món cơm rang rất ngon.",
              true,
              "Đúng rồi! Cuối bài bố nói: 'It's delicious!' — nghĩa là ngon tuyệt.",
              "It's delicious!",
            ),
          ],
        },
        listening: {
          title: "Can you help me?",
          transcript:
            "Mum: Nam, can you help me in the kitchen?\nBoy: Yes, Mum. What can I do?\nMum: First, wash these tomatoes, please. Then put them on this plate.\nBoy: OK. Can I break the eggs?\nMum: Yes, but be careful. The pan is hot.\nBoy: The rice smells nice!\nMum: Thank you. Now stir it slowly with this big spoon.\nBoy: I love cooking with you, Mum!",
          questions: [
            mcq(
              "What does Mum ask Nam to do first?",
              "Việc đầu tiên mẹ nhờ Nam làm là gì?",
              ["Wash the tomatoes", "Break the eggs", "Stir the rice", "Find a plate"],
              0,
              "Mẹ nói 'First, wash these tomatoes, please.' — chữ 'First' cho biết đây là việc đầu tiên.",
              "First, wash these tomatoes, please.",
            ),
            mcq(
              "Why must Nam be careful?",
              "Vì sao Nam phải cẩn thận?",
              ["Because the pan is hot", "Because the plate is small", "Because the eggs are old", "Because the spoon is heavy"],
              0,
              "Mẹ dặn 'be careful. The pan is hot.' — cái chảo đang nóng nên phải cẩn thận.",
              "The pan is hot.",
            ),
            tf(
              "Nam stirs the rice with a big spoon.",
              "Nam đảo cơm bằng một cái thìa to.",
              true,
              "Đúng rồi! Mẹ bảo 'Now stir it slowly with this big spoon.' — đảo từ từ bằng cái thìa to này.",
              "Now stir it slowly with this big spoon.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh hướng dẫn cách làm một món bé thích nấu cùng mẹ. Cần những gì? Làm bước nào trước, bước nào sau? Dùng câu sai bảo (Wash…, Stir…, Don't touch…) và các từ nối First, Then, Next, Finally.",
        writingOutline:
          "1. Món bé làm: Today I am making fried rice with my mum.\n2. Bước 1: First, wash your hands.\n3. Bước 2: Then break two eggs into a bowl.\n4. Lời dặn an toàn: Be careful. Don't touch the hot pan.\n5. Bước cuối: Finally, taste it. It is delicious!",
        speaking: {
          sentences: [
            "On Sunday I cook with my mum.",
            "First, wash your hands, please.",
            "Then break two eggs into a bowl.",
            "Don't touch the hot pan!",
            "Finally, we taste our fried rice.",
          ],
          questions: [
            {
              question: "Do you help your mum in the kitchen?",
              sampleAnswer: "Yes, I do. I wash the vegetables and I put them on a plate.",
            },
            {
              question: "What is your favourite food?",
              sampleAnswer: "My favourite food is fried rice, because it is delicious.",
            },
            {
              question: "How do you make a sandwich?",
              sampleAnswer: "First, take two pieces of bread. Then put some cheese in. Finally, eat it!",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 17 ───────────────────────────
      {
        topic: "Looking After Pets",
        topicVi: "Chăm sóc thú cưng",
        icon: "🐹",
        words: [
          word("pet", "/pet/", "thú cưng", "🐾"),
          word("rabbit", "/ˈræbɪt/", "con thỏ", "🐰"),
          word("hamster", "/ˈhæmstə/", "chuột hamster", "🐹"),
          word("carrot", "/ˈkærət/", "củ cà rốt", "🥕"),
          word("water", "/ˈwɔːtə/", "nước uống", "💧"),
          word("brush", "/brʌʃ/", "chải lông", "🪥"),
          word("gentle", "/ˈdʒentl/", "nhẹ nhàng, dịu dàng", "🤗"),
          word("soft", "/sɒft/", "mềm mại", "☁️"),
          word("chair", "/tʃeə/", "cái ghế", "🪑"),
          word("wheel", "/wiːl/", "bánh xe (đồ chơi chạy vòng)", "⚙️"),
        ],
        sound: {
          letters: "air",
          sound: "/eə/",
          hint: "'air' KHÔNG đọc là 'a-i-rờ'. Đây là MỘT âm đôi /eə/: bắt đầu ở 'e' rồi trượt nhẹ về 'ơ', miệng mở vừa phải; chữ r cuối KHÔNG bật thành tiếng (giọng Anh–Anh). Trẻ Việt hay đọc chair thành 'che' cụt hoặc cong lưỡi thêm /r/ ở cuối. Cũng đừng lẫn với /ɪə/: hair (tóc) khác here (ở đây) — hair bắt đầu ở 'e', here bắt đầu ở 'i'.",
          words: [
            { word: "hair", meaning: "tóc, lông", emoji: "💇" },
            { word: "chair", meaning: "cái ghế", emoji: "🪑" },
            { word: "pair", meaning: "một đôi", emoji: "👟" },
            { word: "fair", meaning: "hội chợ", emoji: "🎡" },
          ],
        },
        reading: {
          title: "My two pets",
          passage:
            "I have got two pets: a rabbit and a hamster. My rabbit is white and she has got very soft fur. Her name is Snow. Every evening I brush her fur, and I am always gentle with her. Then she sleeps on my old chair. My hamster has got a little wheel, and he runs on it at night. Every morning I give my pets fresh water and a carrot. Nam has got a big dog, but he hasn't got a rabbit. He often visits Snow after school.",
          translation:
            "Tớ có hai bạn thú cưng: một chú thỏ và một chú hamster. Bạn thỏ của tớ màu trắng, bộ lông mềm ơi là mềm. Bạn ấy tên là Snow. Chiều nào tớ cũng chải lông cho bạn ấy, và tớ luôn nhẹ tay lắm. Xong rồi bạn ấy nằm ngủ trên cái ghế cũ của tớ. Bạn hamster thì có một cái bánh xe nhỏ, ban đêm bạn ấy chạy trong đó. Sáng nào tớ cũng cho hai bạn ấy nước sạch và một củ cà rốt. Bạn Nam có một chú chó to, nhưng bạn ấy không có thỏ. Bạn ấy hay sang thăm Snow sau giờ học.",
          questions: [
            mcq(
              "How many pets has the writer got?",
              "Bạn nhỏ có mấy con thú cưng?",
              ["Two", "One", "Three", "Four"],
              0,
              "Câu đầu bài: 'I have got two pets' — hai bạn thú cưng, đó là một chú thỏ và một chú hamster.",
              "I have got two pets",
            ),
            mcq(
              "What does the writer do every evening?",
              "Chiều nào bạn nhỏ cũng làm gì?",
              [
                "Brush the rabbit's fur",
                "Give the pets a carrot",
                "Clean the little wheel",
                "Visit Nam's dog",
              ],
              0,
              "Bài viết: 'Every evening I brush her fur' — chiều nào bạn ấy cũng chải lông cho thỏ. Cà rốt là việc của buổi sáng.",
              "Every evening I brush her fur",
            ),
            mcq(
              "What has Nam got?",
              "Bạn Nam có con vật gì?",
              ["A big dog", "A white rabbit", "A small hamster", "A brown cat"],
              0,
              "Bài viết: 'Nam has got a big dog' — Nam có một chú chó to, còn thỏ thì bạn ấy không có.",
              "Nam has got a big dog",
            ),
            tf(
              "The hamster runs on his wheel at night.",
              "Ban đêm chú hamster chạy trong bánh xe.",
              true,
              "Đúng rồi! Bài viết: 'he runs on it at night' — chữ 'it' ở đây là cái bánh xe nhỏ.",
              "he runs on it at night",
            ),
          ],
        },
        listening: {
          title: "Have you got a pet?",
          transcript:
            "Girl: Have you got a pet, Nam?\nBoy: Yes, I have got a dog. His name is Bin. Have you got one?\nGirl: I have got a rabbit and a hamster.\nBoy: Wow! Has your rabbit got long ears?\nGirl: Yes, she has. And she has got very soft white fur.\nBoy: What does she eat?\nGirl: She eats carrots and green leaves. I give her fresh water every day.\nBoy: Can I visit her on Saturday?\nGirl: Yes, of course!",
          questions: [
            mcq(
              "What pet has Nam got?",
              "Nam nuôi con vật gì?",
              ["A dog", "A rabbit", "A hamster", "A bird"],
              0,
              "Nam trả lời 'I have got a dog.' — bạn ấy có một chú chó tên là Bin.",
              "I have got a dog.",
            ),
            mcq(
              "What does the rabbit eat?",
              "Chú thỏ ăn gì?",
              [
                "Carrots and green leaves",
                "Rice and eggs",
                "Bread and milk",
                "Apples and bananas",
              ],
              0,
              "Bạn gái kể 'She eats carrots and green leaves.' — thỏ ăn cà rốt và lá xanh.",
              "She eats carrots and green leaves.",
            ),
            tf(
              "Nam can visit the rabbit on Saturday.",
              "Thứ Bảy Nam được sang thăm chú thỏ.",
              true,
              "Đúng rồi! Nam hỏi 'Can I visit her on Saturday?' và bạn gái trả lời 'Yes, of course!' — được chứ.",
              "Can I visit her on Saturday?",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh về thú cưng của bé (hoặc con vật bé muốn nuôi). Bé có con gì? Nó trông thế nào? Bé chăm nó ra sao? Dùng 'have got' và 'has got'.",
        writingOutline:
          "1. Mở đầu: I have got a rabbit. / I want a hamster.\n2. Tả con vật: She has got soft white fur and long ears.\n3. Việc bé làm mỗi ngày: Every morning I give her fresh water.\n4. Việc bé làm buổi chiều: Every evening I brush her fur.\n5. Kết: I am always gentle with her. I love my pet.",
        speaking: {
          sentences: [
            "I have got two pets.",
            "My rabbit has got very soft fur.",
            "Every evening I brush her fur.",
            "I am always gentle with her.",
            "Nam has got a big dog.",
          ],
          questions: [
            {
              question: "Have you got a pet?",
              sampleAnswer: "Yes, I have got a small dog. His name is Bin.",
            },
            {
              question: "How do you look after a pet?",
              sampleAnswer: "I give my pet fresh water and food, and I brush him every evening.",
            },
            {
              question: "Which pet would you like? Why?",
              sampleAnswer: "I would like a rabbit, because rabbits are soft and very quiet.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 18 ───────────────────────────
      {
        topic: "My Grandparents",
        topicVi: "Ông bà của bé",
        icon: "👵",
        words: [
          word("grandparents", "/ˈɡrænpeərənts/", "ông bà", "👴"),
          word("village", "/ˈvɪlɪdʒ/", "làng quê", "🏡"),
          word("kind", "/kaɪnd/", "tốt bụng, hiền hậu", "💗"),
          word("story", "/ˈstɔːri/", "câu chuyện", "📖"),
          word("teach", "/tiːtʃ/", "dạy, chỉ cho", "👩‍🏫"),
          word("hug", "/hʌɡ/", "cái ôm", "🤗"),
          word("letter", "/ˈletə/", "lá thư", "✉️"),
          word("draw", "/drɔː/", "vẽ (quá khứ: drew)", "✏️"),
          word("garden", "/ˈɡɑːdn/", "khu vườn", "🌻"),
          word("miss", "/mɪs/", "nhớ ai đó", "💭"),
        ],
        sound: {
          letters: "aw",
          sound: "/ɔː/",
          hint: "'aw' đọc là /ɔː/ — âm 'o' DÀI, môi tròn lại và giữ hơi lâu, giống 'or' bé đã học nhưng không có chữ r. Chữ w ở cuối KHÔNG kêu thành tiếng: draw đọc là 'đrooo', không phải 'đờ-rao'. Trẻ Việt hay mắc hai lỗi: cắt âm quá ngắn ('đro'), và chèn thêm nguyên âm vào cụm phụ âm dr-, str- ('đờ-rờ', 'sờ-tờ-ro'). Hãy đọc liền dr- và str- trong một hơi.",
          words: [
            { word: "draw", meaning: "vẽ", emoji: "✏️" },
            { word: "straw", meaning: "ống hút", emoji: "🥤" },
            { word: "yawn", meaning: "ngáp", emoji: "🥱" },
            { word: "paw", meaning: "bàn chân thú", emoji: "🐾" },
          ],
        },
        reading: {
          title: "Summer with my grandparents",
          passage:
            "My grandparents live in a small village. I visit them every summer, and Grandma always gives me a big hug at the gate. My grandma is very kind, and she teaches me how to make rice cakes. Grandpa has got a big garden. He shows me his flowers and I help him with the water. In the evening they tell us funny stories, and then Grandpa yawns and goes to bed. When I go home, I miss them a lot. So I draw pictures and send them a letter every month.",
          translation:
            "Ông bà tớ sống ở một làng quê nhỏ. Hè nào tớ cũng về thăm ông bà, và bà luôn ôm tớ thật chặt ngay ở cổng. Bà tớ hiền lắm, bà dạy tớ cách làm bánh. Ông thì có một khu vườn rộng. Ông chỉ cho tớ xem những bông hoa của ông, còn tớ giúp ông tưới nước. Buổi tối, ông bà kể cho chúng tớ nghe những câu chuyện vui, rồi ông ngáp một cái và đi ngủ. Lúc về nhà, tớ nhớ ông bà lắm. Thế là tháng nào tớ cũng vẽ tranh rồi gửi cho ông bà một lá thư.",
          questions: [
            mcq(
              "Where do the grandparents live?",
              "Ông bà sống ở đâu?",
              ["In a small village", "In a big city", "Near the beach", "In the forest"],
              0,
              "Câu đầu bài: 'My grandparents live in a small village.' — ông bà sống ở một làng quê nhỏ.",
              "My grandparents live in a small village.",
            ),
            mcq(
              "What does Grandma teach the writer?",
              "Bà dạy bạn nhỏ điều gì?",
              [
                "How to make rice cakes",
                "How to draw flowers",
                "How to write letters",
                "How to water the garden",
              ],
              0,
              "Bài viết: 'she teaches me how to make rice cakes' — bà dạy bạn ấy làm bánh. Tưới nước là việc bạn ấy giúp ông.",
              "she teaches me how to make rice cakes",
            ),
            mcq(
              "What does the writer do after going home?",
              "Về nhà rồi thì bạn nhỏ làm gì?",
              [
                "Sends the grandparents a letter",
                "Visits the village again",
                "Plants new flowers",
                "Makes rice cakes",
              ],
              0,
              "Câu cuối bài: 'I draw pictures and send them a letter every month' — chữ 'them' ở đây là ông bà.",
              "I draw pictures and send them a letter every month",
            ),
            tf(
              "Grandpa has got a garden with flowers.",
              "Ông có một khu vườn có hoa.",
              true,
              "Đúng rồi! Bài viết: 'Grandpa has got a big garden.' và ngay sau đó 'He shows me his flowers.' — vườn của ông có hoa.",
              "Grandpa has got a big garden.",
            ),
          ],
        },
        listening: {
          title: "A present for Grandma",
          transcript:
            "Girl: Mum, can we visit Grandma and Grandpa on Saturday?\nMum: Yes, we can. They always miss you.\nGirl: I miss them too! I want to give them my new picture.\nMum: That is lovely. Did you draw it at school?\nGirl: Yes, I drew Grandpa's garden. Grandma can put it on the wall.\nMum: She will love it. Can you help me make some rice cakes for them?\nGirl: Yes! Grandma teaches me every summer.\nMum: Good. Let's go to the market and buy the rice.",
          questions: [
            mcq(
              "When are they going to visit the grandparents?",
              "Khi nào hai mẹ con đi thăm ông bà?",
              ["On Saturday", "On Sunday", "On Monday", "On Friday"],
              0,
              "Bạn gái hỏi 'can we visit Grandma and Grandpa on Saturday?' và mẹ trả lời 'Yes, we can.' — thứ Bảy.",
              "can we visit Grandma and Grandpa on Saturday?",
            ),
            mcq(
              "What did the girl draw?",
              "Bạn gái đã vẽ gì?",
              ["Grandpa's garden", "Grandma's kitchen", "A big rice cake", "Her school"],
              0,
              "Bạn ấy nói 'I drew Grandpa's garden.' — 'drew' là dạng quá khứ của 'draw'.",
              "I drew Grandpa's garden.",
            ),
            tf(
              "The girl and her mum will make rice cakes.",
              "Hai mẹ con sẽ làm bánh.",
              true,
              "Đúng rồi! Mẹ hỏi 'Can you help me make some rice cakes for them?' và bạn gái đáp 'Yes!' — hai mẹ con sẽ làm bánh mang biếu ông bà.",
              "Can you help me make some rice cakes for them?",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh về ông bà của bé. Ông bà sống ở đâu? Bé thăm ông bà khi nào? Ông bà làm gì cùng bé? Bé làm gì cho ông bà? Nhớ dùng tân ngữ me, him, her, us, them.",
        writingOutline:
          "1. Mở đầu: My grandparents live in a small village.\n2. Bé thăm khi nào: I visit them every summer.\n3. Bà làm gì với bé: Grandma teaches me how to make rice cakes.\n4. Ông làm gì với bé: Grandpa shows me his garden and I help him.\n5. Cảm nghĩ: I miss them a lot, so I send them a letter.",
        speaking: {
          sentences: [
            "My grandparents live in a small village.",
            "I visit them every summer.",
            "Grandma teaches me how to make rice cakes.",
            "Grandpa shows me his garden.",
            "I miss them a lot.",
          ],
          questions: [
            {
              question: "Where do your grandparents live?",
              sampleAnswer: "My grandparents live in a small village near a river.",
            },
            {
              question: "What do you do with your grandparents?",
              sampleAnswer: "I help them in the garden, and Grandma tells us funny stories.",
            },
            {
              question: "What can you make for your family?",
              sampleAnswer: "I can draw a picture for them and write a letter.",
            },
          ],
        },
      },
    ],
  },
];
