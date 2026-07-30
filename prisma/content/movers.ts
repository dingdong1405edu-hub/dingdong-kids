// Nội dung bài học cấp `movers` (7–9 tuổi · Cambridge YLE Movers · A1).
// Xem hợp đồng + hướng dẫn soạn theo cấp ở prisma/content/types.ts.
//
// Chính tả: Anh–Anh (Mum / favourite / colour / practise) cho khớp sách giáo
// khoa tiếng Anh phổ thông Việt Nam và chuẩn Cambridge YLE.
//
// Âm phonics dạy trong 12 bài (nguyên âm ghép, tiến dần theo cặp cùng âm):
//   ai → ay → ee → ea → igh → oa → oo → ar → or → ur → ow → oi
import { type ChapterSeed, mcq, tf, word } from "./types";

export const CHAPTERS: ChapterSeed[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: "Chương 1 · Tuần của bé",
    subtitle: "Kể lại một tuần đi học, giờ tan trường và sở thích của cả nhà",
    lessons: [
      {
        topic: "My Week",
        topicVi: "Một tuần của tớ",
        icon: "📅",
        words: [
          word("Monday", "/ˈmʌndeɪ/", "thứ Hai", "2️⃣"),
          word("Wednesday", "/ˈwenzdeɪ/", "thứ Tư", "4️⃣"),
          word("Saturday", "/ˈsætədeɪ/", "thứ Bảy", "7️⃣"),
          word("week", "/wiːk/", "tuần lễ", "🗓️"),
          word("busy", "/ˈbɪzi/", "bận rộn", "🐝"),
          word("favourite", "/ˈfeɪvərɪt/", "thích nhất", "⭐"),
          word("visit", "/ˈvɪzɪt/", "đi thăm ai đó", "🚗"),
          word("practise", "/ˈpræktɪs/", "luyện tập", "🎹"),
          word("tired", "/ˈtaɪəd/", "mệt, buồn ngủ", "😴"),
          word("rain", "/reɪn/", "mưa (quá khứ: rained)", "🌧️"),
        ],
        sound: {
          letters: "ai",
          sound: "/eɪ/",
          hint: "Hai chữ 'ai' đứng CẠNH nhau không đọc là 'ai' như tiếng Việt, mà đọc là /eɪ/ (ây) — miệng trượt từ 'e' sang 'i'. Trẻ Việt hay quên bật phụ âm cuối: rain phải nghe rõ /n/ (đừng thành 'ray'), paint phải bật /t/ (đừng thành 'pain').",
          words: [
            { word: "rain", meaning: "mưa", emoji: "🌧️" },
            { word: "train", meaning: "tàu hoả", emoji: "🚂" },
            { word: "paint", meaning: "vẽ, sơn", emoji: "🎨" },
            { word: "wait", meaning: "chờ đợi", emoji: "⏳" },
          ],
        },
        reading: {
          title: "Mai's busy week",
          passage:
            "My name is Mai and I have a busy week. On Monday I have a maths test, so I study hard. On Wednesday I practise the piano, and on Friday I play football with my friends. Saturday is my favourite day because I visit my grandma. Last Saturday it rained, but we were happy. We made spring rolls together, and then we sang songs. On Sunday I am tired, so I sleep late.",
          translation:
            "Tớ tên là Mai và tuần của tớ rất bận. Thứ Hai tớ có bài kiểm tra Toán nên tớ học rất chăm. Thứ Tư tớ tập đàn piano, còn thứ Sáu tớ đá bóng với các bạn. Thứ Bảy là ngày tớ thích nhất vì tớ được đi thăm bà. Thứ Bảy tuần trước trời mưa, nhưng hai bà cháu vẫn vui. Hai bà cháu cùng cuốn nem, rồi cùng hát. Chủ nhật tớ mệt nên tớ ngủ dậy muộn.",
          questions: [
            mcq(
              "Which day is Mai's favourite day?",
              "Ngày nào là ngày Mai thích nhất?",
              ["Monday", "Wednesday", "Saturday", "Sunday"],
              2,
              "Bài viết rõ: 'Saturday is my favourite day' — thứ Bảy là ngày Mai thích nhất, vì hôm đó Mai được đi thăm bà.",
              "Saturday is my favourite day because I visit my grandma.",
            ),
            mcq(
              "What does Mai do on Wednesday?",
              "Thứ Tư Mai làm gì?",
              [
                "She plays football",
                "She practises the piano",
                "She visits her grandma",
                "She has a maths test",
              ],
              1,
              "Câu 'On Wednesday I practise the piano' cho biết thứ Tư Mai tập đàn piano. Đá bóng là thứ Sáu, còn kiểm tra Toán là thứ Hai.",
              "On Wednesday I practise the piano",
            ),
            mcq(
              "What did Mai and her grandma make last Saturday?",
              "Thứ Bảy tuần trước Mai và bà đã làm món gì?",
              ["Spring rolls", "A birthday cake", "Noodles", "A paper kite"],
              0,
              "Bài dùng thì quá khứ: 'We made spring rolls together' — hai bà cháu đã cuốn nem cùng nhau.",
              "We made spring rolls together",
            ),
            tf(
              "Mai sleeps late on Sunday because she is tired.",
              "Chủ nhật Mai ngủ dậy muộn vì bạn ấy mệt.",
              true,
              "Đúng rồi! Câu cuối bài nói 'On Sunday I am tired, so I sleep late.' — chữ 'so' cho biết mệt là lí do Mai ngủ muộn.",
              "On Sunday I am tired, so I sleep late.",
            ),
          ],
        },
        listening: {
          title: "Are you free on Saturday?",
          transcript:
            "Boy: Hi Mai! Are you free on Saturday?\nGirl: No, I'm sorry. I visit my grandma every Saturday.\nBoy: Oh, I see. What about Sunday?\nGirl: Yes! I can play on Sunday afternoon.\nBoy: Great. Let's go to the park and fly my new kite.\nGirl: I love kites! But I can't come in the morning, because I help my mum.\nBoy: That's fine. See you at two o'clock.\nGirl: See you, Nam!",
          questions: [
            mcq(
              "When can Mai play with Nam?",
              "Khi nào Mai có thể đi chơi với Nam?",
              ["Saturday morning", "Saturday afternoon", "Sunday morning", "Sunday afternoon"],
              3,
              "Mai nói 'I can play on Sunday afternoon.' — chiều Chủ nhật. Thứ Bảy bạn ấy đi thăm bà, còn sáng Chủ nhật bạn ấy giúp mẹ.",
              "I can play on Sunday afternoon.",
            ),
            mcq(
              "What will they do in the park?",
              "Hai bạn sẽ làm gì ở công viên?",
              ["Fly a kite", "Play football", "Ride bikes", "Feed the ducks"],
              0,
              "Nam rủ: 'Let's go to the park and fly my new kite.' — hai bạn sẽ thả diều.",
              "Let's go to the park and fly my new kite.",
            ),
            tf(
              "Mai helps her mum on Sunday morning.",
              "Sáng Chủ nhật Mai giúp mẹ.",
              true,
              "Đúng rồi! Mai nói 'I can't come in the morning, because I help my mum.' — chữ 'because' chỉ ra lí do bạn ấy bận buổi sáng.",
              "I can't come in the morning, because I help my mum.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh kể về một tuần của bé. Bé làm gì vào các ngày trong tuần? Ngày nào bé thích nhất, vì sao? Kể thêm một việc bé ĐÃ làm tuần trước (dùng quá khứ đơn).",
        writingOutline:
          "1. Mở đầu: My name is … and I have a busy week.\n2. Kể 2–3 ngày: On Monday I … On Wednesday I …\n3. Ngày thích nhất: My favourite day is … because …\n4. Việc đã làm tuần trước: Last Saturday I visited / played / made …\n5. Nhớ dùng and, but, because, then để nối câu.",
        speaking: {
          sentences: [
            "I have a busy week.",
            "On Monday I have a maths test.",
            "Saturday is my favourite day.",
            "Last Saturday it rained, but we were happy.",
            "On Sunday I am tired, so I sleep late.",
          ],
          questions: [
            {
              question: "What do you do on Monday?",
              sampleAnswer: "On Monday I go to school and then I do my homework.",
            },
            {
              question: "Which day is your favourite day? Why?",
              sampleAnswer: "Saturday is my favourite day, because I visit my grandma.",
            },
            {
              question: "What did you do last week?",
              sampleAnswer: "Last week I played football with my friends and I sang a new song.",
            },
          ],
        },
      },

      {
        topic: "After School",
        topicVi: "Sau giờ tan học",
        icon: "🎒",
        words: [
          word("homework", "/ˈhəʊmwɜːk/", "bài tập về nhà", "📝"),
          word("snack", "/snæk/", "bữa ăn nhẹ", "🍪"),
          word("finish", "/ˈfɪnɪʃ/", "làm xong", "✅"),
          word("hungry", "/ˈhʌŋɡri/", "đói bụng", "😋"),
          word("quickly", "/ˈkwɪkli/", "một cách nhanh chóng", "💨"),
          word("playground", "/ˈpleɪɡraʊnd/", "sân chơi", "🛝"),
          word("bicycle", "/ˈbaɪsɪkl/", "xe đạp", "🚲"),
          word("clean", "/kliːn/", "lau dọn", "🧹"),
          word("always", "/ˈɔːlweɪz/", "luôn luôn", "🔁"),
          word("cartoon", "/kɑːˈtuːn/", "phim hoạt hình", "📺"),
        ],
        sound: {
          letters: "ay",
          sound: "/eɪ/",
          hint: "'ay' đọc y hệt 'ai' (đều là /eɪ/), nhưng 'ay' thường đứng CUỐI từ. Đây là âm ĐÔI: bắt đầu ở 'e' rồi trượt sang 'i'. Trẻ Việt hay đọc day thành 'đây' cụt ngủn — phải kéo dài và trượt hẳn sang /ɪ/ thì mới đúng.",
          words: [
            { word: "play", meaning: "chơi", emoji: "🤸" },
            { word: "day", meaning: "ngày", emoji: "☀️" },
            { word: "say", meaning: "nói", emoji: "🗣️" },
            { word: "way", meaning: "lối đi, đường", emoji: "🛣️" },
          ],
        },
        reading: {
          title: "My afternoon",
          passage:
            "My name is Huy. School finishes at four o'clock. I put my books in my bag quickly, because my mum is waiting at the gate. At home I am always hungry, so I eat a snack. Yesterday I ate a banana and drank some milk. Then I did my homework. After that I cleaned my desk and watched a cartoon. On sunny days I ride my bicycle in the playground with Nam, but today it is raining.",
          translation:
            "Tớ tên là Huy. Trường tớ tan lúc bốn giờ. Tớ nhanh tay cất sách vào cặp, vì mẹ đang đợi ở cổng. Về đến nhà tớ lúc nào cũng đói, nên tớ ăn một bữa xế. Hôm qua tớ ăn một quả chuối và uống chút sữa. Sau đó tớ làm bài tập về nhà. Làm xong tớ lau bàn học rồi xem phim hoạt hình. Những hôm trời nắng, tớ đạp xe ở sân chơi với Nam, nhưng hôm nay trời đang mưa.",
          questions: [
            mcq(
              "What time does school finish?",
              "Trường tan học lúc mấy giờ?",
              ["Three o'clock", "Four o'clock", "Five o'clock", "Six o'clock"],
              1,
              "Ngay đầu bài Huy kể 'School finishes at four o'clock.' — trường tan lúc bốn giờ.",
              "School finishes at four o'clock.",
            ),
            mcq(
              "What did Huy eat yesterday?",
              "Hôm qua Huy đã ăn gì?",
              ["A banana", "An apple", "A bowl of rice", "A piece of cake"],
              0,
              "Bài dùng quá khứ: 'Yesterday I ate a banana and drank some milk.' — hôm qua Huy ăn một quả chuối.",
              "Yesterday I ate a banana and drank some milk.",
            ),
            mcq(
              "Why can't Huy ride his bicycle today?",
              "Vì sao hôm nay Huy không đạp xe được?",
              [
                "Because it is raining",
                "Because he is tired",
                "Because his bicycle is broken",
                "Because he has a test",
              ],
              0,
              "Câu cuối bài có chữ 'but': 'but today it is raining' — hôm nay trời mưa nên Huy không đạp xe được.",
              "but today it is raining",
            ),
            tf(
              "Huy did his homework first, and then he watched a cartoon.",
              "Huy làm bài tập xong rồi mới xem hoạt hình.",
              true,
              "Đúng rồi! Bài kể theo thứ tự: 'Then I did my homework. After that I cleaned my desk and watched a cartoon.' — 'Then' rồi 'After that' cho biết bài tập làm trước, hoạt hình xem sau.",
              "Then I did my homework. After that I cleaned my desk and watched a cartoon.",
            ),
          ],
        },
        listening: {
          title: "Snack time",
          transcript:
            "Mum: How was school today, Linh?\nGirl: It was good! We painted pictures in art class.\nMum: Lovely. Are you hungry?\nGirl: Yes, I'm very hungry. Can I have a snack?\nMum: Of course. There is some bread and milk on the table.\nGirl: Thank you, Mum. Can I watch a cartoon after my snack?\nMum: You must finish your homework first, then you can watch one.\nGirl: OK, Mum. I'll do it now.",
          questions: [
            mcq(
              "What did Linh do in art class?",
              "Trong giờ Mĩ thuật, Linh đã làm gì?",
              ["She sang songs", "She painted pictures", "She read a story", "She played football"],
              1,
              "Linh nói 'We painted pictures in art class.' — cả lớp vẽ tranh trong giờ Mĩ thuật.",
              "We painted pictures in art class.",
            ),
            mcq(
              "What must Linh do before she watches a cartoon?",
              "Linh phải làm gì trước khi được xem hoạt hình?",
              ["Eat her dinner", "Tidy her room", "Finish her homework", "Go to bed"],
              2,
              "Mẹ dùng 'must': 'You must finish your homework first' — phải làm xong bài tập đã, rồi mới được xem.",
              "You must finish your homework first, then you can watch one.",
            ),
            tf(
              "There is bread and milk on the table.",
              "Trên bàn có bánh mì và sữa.",
              true,
              "Đúng rồi! Mẹ nói 'There is some bread and milk on the table.' — đúng là có bánh mì và sữa trên bàn.",
              "There is some bread and milk on the table.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh kể buổi chiều sau khi tan học của bé. Bé về nhà lúc mấy giờ? Bé ăn gì? Bé làm bài tập khi nào? Bé chơi gì nếu trời nắng?",
        writingOutline:
          "1. Giờ tan học: School finishes at … o'clock.\n2. Về nhà bé làm gì trước: At home I am hungry, so I eat …\n3. Bài tập: Then I do my homework.\n4. Sau đó: After that I watch / clean / play …\n5. Hôm qua bé đã làm gì: Yesterday I ate / played …",
        speaking: {
          sentences: [
            "School finishes at four o'clock.",
            "At home I am always hungry.",
            "Then I did my homework.",
            "I ride my bicycle in the playground.",
            "I must finish my homework first.",
          ],
          questions: [
            {
              question: "What do you do after school?",
              sampleAnswer: "After school I eat a snack, and then I do my homework.",
            },
            {
              question: "What is your favourite snack?",
              sampleAnswer: "My favourite snack is a banana with a glass of milk.",
            },
            {
              question: "Can you ride a bicycle?",
              sampleAnswer: "Yes, I can. I ride my bicycle in the playground with my friends.",
            },
          ],
        },
      },

      {
        topic: "Hobbies",
        topicVi: "Sở thích của cả nhà",
        icon: "🎨",
        words: [
          word("hobby", "/ˈhɒbi/", "sở thích", "🎠"),
          word("collect", "/kəˈlekt/", "sưu tầm", "🗃️"),
          word("stamp", "/stæmp/", "con tem", "📮"),
          word("draw", "/drɔː/", "vẽ (quá khứ: drew)", "✏️"),
          word("dance", "/dɑːns/", "nhảy múa", "💃"),
          word("guitar", "/ɡɪˈtɑː/", "đàn ghi-ta", "🎸"),
          word("interesting", "/ˈɪntrəstɪŋ/", "thú vị", "🤩"),
          word("every", "/ˈevri/", "mỗi", "🔄"),
          word("learn", "/lɜːn/", "học", "📚"),
          word("together", "/təˈɡeðə/", "cùng nhau", "🤝"),
        ],
        sound: {
          letters: "ee",
          sound: "/iː/",
          hint: "'ee' là âm /iː/ KÉO DÀI, môi cười rộng sang hai bên. Trẻ Việt hay đọc ngắn cụt thành 'i' (sheep nghe ra ship). Đếm thầm 'i-i' trong đầu cho đủ dài, và nhớ bật phụ âm cuối: green có /n/, feet có /t/.",
          words: [
            { word: "see", meaning: "nhìn thấy", emoji: "👀" },
            { word: "tree", meaning: "cái cây", emoji: "🌳" },
            { word: "green", meaning: "màu xanh lá", emoji: "💚" },
            { word: "feet", meaning: "bàn chân (số nhiều)", emoji: "🦶" },
          ],
        },
        reading: {
          title: "Everyone has a hobby",
          passage:
            "Everyone in my family has a hobby. My dad collects old stamps, and he keeps them in a big blue book. My mum loves to dance, so she goes to a dance class every Thursday. My little sister can draw very well. She drew a green dragon last week, and it was beautiful. I am learning the guitar. I can play three songs now, but I can't play fast yet. On Sunday we sit together and share our hobbies.",
          translation:
            "Nhà tớ ai cũng có một sở thích. Bố tớ sưu tầm tem cũ, bố cất tem trong một cuốn sổ to màu xanh. Mẹ tớ mê nhảy, nên thứ Năm nào mẹ cũng đi lớp nhảy. Em gái tớ vẽ rất giỏi. Tuần trước em vẽ một con rồng xanh lá, đẹp lắm. Còn tớ đang học đàn ghi-ta. Giờ tớ chơi được ba bài rồi, nhưng tớ chưa chơi nhanh được. Chủ nhật cả nhà ngồi cùng nhau và khoe sở thích của mình.",
          questions: [
            mcq(
              "What does the writer's dad collect?",
              "Bố của bạn nhỏ sưu tầm gì?",
              ["Old stamps", "Old coins", "Toy cars", "Story books"],
              0,
              "Bài nói 'My dad collects old stamps' — bố sưu tầm tem cũ, và cất chúng trong cuốn sổ xanh.",
              "My dad collects old stamps",
            ),
            mcq(
              "When does the mum go to her dance class?",
              "Mẹ đi lớp nhảy vào ngày nào?",
              ["Every Monday", "Every Thursday", "Every Saturday", "Every Sunday"],
              1,
              "Bài viết 'she goes to a dance class every Thursday' — mẹ đi lớp nhảy vào thứ Năm hằng tuần.",
              "she goes to a dance class every Thursday",
            ),
            mcq(
              "What did the little sister draw last week?",
              "Tuần trước em gái đã vẽ con gì?",
              ["A green dragon", "A blue fish", "A red car", "A yellow bird"],
              0,
              "Câu 'She drew a green dragon last week' dùng quá khứ 'drew' — tuần trước em vẽ một con rồng màu xanh lá.",
              "She drew a green dragon last week",
            ),
            tf(
              "The writer can play the guitar very fast.",
              "Bạn nhỏ chơi đàn ghi-ta rất nhanh.",
              false,
              "Chưa đúng nhé! Bài viết 'but I can't play fast yet' — 'can't' nghĩa là chưa làm được, bạn ấy mới chơi được ba bài thôi.",
              "but I can't play fast yet",
            ),
          ],
        },
        listening: {
          title: "What is your hobby?",
          transcript:
            "Teacher: Good morning, class. What is your hobby, Minh?\nBoy: My hobby is football. I play every Tuesday and Friday.\nTeacher: Wonderful. And you, Hoa?\nGirl: I like reading. I read a new book every week.\nTeacher: That's an interesting hobby. Do you have a favourite book?\nGirl: Yes, it's a story about a little green frog.\nBoy: I want to read it too. Can I borrow it?\nGirl: Of course! I'll bring it tomorrow.",
          questions: [
            mcq(
              "When does Minh play football?",
              "Minh đá bóng vào những ngày nào?",
              [
                "Monday and Wednesday",
                "Tuesday and Friday",
                "Saturday and Sunday",
                "Every day",
              ],
              1,
              "Minh nói 'I play every Tuesday and Friday.' — bạn ấy đá bóng thứ Ba và thứ Sáu.",
              "I play every Tuesday and Friday.",
            ),
            mcq(
              "What is Hoa's favourite book about?",
              "Cuốn sách Hoa thích nhất kể về con gì?",
              ["A little green frog", "A big brown bear", "A yellow bird", "A blue fish"],
              0,
              "Hoa trả lời 'it's a story about a little green frog' — đó là câu chuyện về một chú ếch xanh nhỏ.",
              "it's a story about a little green frog",
            ),
            tf(
              "Hoa will bring the book to school tomorrow.",
              "Ngày mai Hoa sẽ mang cuốn sách đến lớp.",
              true,
              "Đúng rồi! Hoa nói 'I'll bring it tomorrow.' — 'I'll' là 'I will', nghĩa là ngày mai bạn ấy sẽ mang sách đến.",
              "I'll bring it tomorrow.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh về sở thích của bé và của người trong nhà. Bé thích làm gì? Bé làm việc đó khi nào? Bé làm được gì rồi và chưa làm được gì (dùng can / can't)?",
        writingOutline:
          "1. Sở thích của bé: My hobby is …\n2. Khi nào: I … every Sunday / every week.\n3. Sở thích của người nhà: My dad collects … My mum loves to …\n4. Bé làm được gì: I can play three songs, but I can't … yet.\n5. Câu kết: It is an interesting hobby.",
        speaking: {
          sentences: [
            "Everyone in my family has a hobby.",
            "My dad collects old stamps.",
            "I am learning the guitar.",
            "I can play three songs, but I can't play fast yet.",
            "On Sunday we sit together.",
          ],
          questions: [
            {
              question: "What is your hobby?",
              sampleAnswer: "My hobby is drawing. I draw animals every evening.",
            },
            {
              question: "What can you do very well?",
              sampleAnswer: "I can swim very well, but I can't ride a horse.",
            },
            {
              question: "Do you have a hobby with your family?",
              sampleAnswer: "Yes. On Sunday we cook together, and that is our family hobby.",
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    title: "Chương 2 · Thành phố của bé",
    subtitle: "Đường phố, khu chợ và những nghề nghiệp quanh bé",
    lessons: [
      {
        topic: "In the City",
        topicVi: "Trong thành phố",
        icon: "🏙️",
        words: [
          word("city", "/ˈsɪti/", "thành phố", "🏙️"),
          word("street", "/striːt/", "đường phố", "🛣️"),
          word("traffic", "/ˈtræfɪk/", "xe cộ đi lại", "🚦"),
          word("building", "/ˈbɪldɪŋ/", "toà nhà", "🏢"),
          word("noisy", "/ˈnɔɪzi/", "ồn ào", "🔊"),
          word("cross", "/krɒs/", "băng qua đường", "🚸"),
          word("bridge", "/brɪdʒ/", "cây cầu", "🌉"),
          word("bus stop", "/ˈbʌs stɒp/", "trạm xe buýt", "🚏"),
          word("careful", "/ˈkeəfl/", "cẩn thận", "⚠️"),
          word("traffic lights", "/ˈtræfɪk laɪts/", "đèn giao thông", "🚥"),
        ],
        sound: {
          letters: "ea",
          sound: "/iː/",
          hint: "'ea' thường đọc /iː/ dài y hệt 'ee' — hai cách viết, một âm. Trẻ Việt hay đọc ngắn nên eat nghe thành 'it'. Kéo dài, môi cười rộng. Và nhớ bật /t/ cuối trong eat, đừng nuốt mất.",
          words: [
            { word: "eat", meaning: "ăn", emoji: "🍚" },
            { word: "read", meaning: "đọc", emoji: "📖" },
            { word: "sea", meaning: "biển", emoji: "🌊" },
            { word: "tea", meaning: "trà", emoji: "🍵" },
          ],
        },
        reading: {
          title: "My noisy street",
          passage:
            "My name is Kien. I live in a big city with my family. Our street is very noisy, because there are lots of cars and motorbikes. Every morning my dad takes me to school on his motorbike. We go over a long bridge, and then we pass a tall building with a red roof. I must be careful when I cross the road. I always stop at the traffic lights and wait for the green light. Yesterday the traffic was slow, but we were not late for school.",
          translation:
            "Tớ tên là Kiên. Tớ sống ở một thành phố lớn cùng gia đình. Con phố nhà tớ rất ồn, vì có rất nhiều ô tô và xe máy. Sáng nào bố cũng chở tớ đến trường bằng xe máy. Hai bố con đi qua một cây cầu dài, rồi đi ngang một toà nhà cao có mái đỏ. Tớ phải cẩn thận khi băng qua đường. Bao giờ tớ cũng dừng ở đèn giao thông và đợi đèn xanh. Hôm qua đường đông nên đi chậm, nhưng hai bố con vẫn không đến lớp muộn.",
          questions: [
            mcq(
              "Why is Kien's street very noisy?",
              "Vì sao con phố nhà Kiên rất ồn?",
              [
                "Because there are lots of cars and motorbikes",
                "Because there is a school next door",
                "Because there is a market",
                "Because the neighbours sing",
              ],
              0,
              "Chữ 'because' trong bài chỉ thẳng lí do: có rất nhiều ô tô và xe máy chạy qua.",
              "Our street is very noisy, because there are lots of cars and motorbikes.",
            ),
            mcq(
              "What colour is the roof of the tall building?",
              "Mái của toà nhà cao có màu gì?",
              ["Blue", "Red", "Green", "Yellow"],
              1,
              "Bài tả 'a tall building with a red roof' — toà nhà cao có mái màu đỏ.",
              "we pass a tall building with a red roof",
            ),
            mcq(
              "What does Kien always do before crossing the road?",
              "Trước khi băng qua đường, Kiên luôn làm gì?",
              [
                "Runs across quickly",
                "Waits for the green light",
                "Closes his eyes",
                "Calls his mum",
              ],
              1,
              "Bài viết 'I always stop at the traffic lights and wait for the green light.' — Kiên luôn dừng ở đèn giao thông và đợi đèn xanh rồi mới qua đường.",
              "I always stop at the traffic lights and wait for the green light.",
            ),
            tf(
              "They were late for school yesterday.",
              "Hôm qua hai bố con Kiên đến trường muộn.",
              false,
              "Chưa đúng nhé! Câu cuối có chữ 'but': 'the traffic was slow, but we were not late for school' — đường đông nhưng vẫn không muộn.",
              "Yesterday the traffic was slow, but we were not late for school.",
            ),
          ],
        },
        listening: {
          title: "Where is the bus stop?",
          transcript:
            "Girl: Excuse me, where is the bus stop, please?\nMan: It's near the big bookshop, next to the bridge.\nGirl: Is it far from here?\nMan: No, it's only five minutes. Walk down this street, then turn left.\nGirl: Thank you! Which bus goes to the zoo?\nMan: Bus number twelve. It comes every ten minutes.\nGirl: That's great. Thank you very much!\nMan: You're welcome. Be careful when you cross the road.",
          questions: [
            mcq(
              "Where is the bus stop?",
              "Trạm xe buýt ở đâu?",
              [
                "Next to the bridge",
                "Inside the zoo",
                "Behind the school",
                "In front of the market",
              ],
              0,
              "Bác ấy chỉ đường: 'It's near the big bookshop, next to the bridge.' — trạm xe buýt ở cạnh cây cầu.",
              "It's near the big bookshop, next to the bridge.",
            ),
            mcq(
              "Which bus goes to the zoo?",
              "Xe buýt số mấy đi đến sở thú?",
              ["Bus number two", "Bus number ten", "Bus number twelve", "Bus number twenty"],
              2,
              "Bác ấy trả lời 'Bus number twelve.' — xe buýt số 12. Con số 'ten' trong bài là mười phút một chuyến, không phải số xe.",
              "Bus number twelve.",
            ),
            tf(
              "The girl must walk for thirty minutes to the bus stop.",
              "Bạn gái phải đi bộ ba mươi phút mới tới trạm xe buýt.",
              false,
              "Chưa đúng nhé! Bác ấy nói 'No, it's only five minutes.' — chỉ mất năm phút đi bộ thôi.",
              "No, it's only five minutes.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh về nơi bé sống. Phố nhà bé ồn hay yên tĩnh? Bé đi học bằng gì? Bé đi qua những gì trên đường? Bé làm gì để qua đường an toàn (dùng must)?",
        writingOutline:
          "1. Nơi ở: I live in a big city / a small town.\n2. Con phố: Our street is noisy / quiet, because …\n3. Đường đi học: My dad takes me to school on his motorbike.\n4. Trên đường: We go over a bridge, and then we pass …\n5. An toàn: I must be careful when I cross the road.",
        speaking: {
          sentences: [
            "I live in a big city.",
            "Our street is very noisy.",
            "We go over a long bridge.",
            "I must be careful when I cross the road.",
            "I always wait for the green light.",
          ],
          questions: [
            {
              question: "Do you live in a city or in the country?",
              sampleAnswer: "I live in a city. It is busy and noisy, but I like it.",
            },
            {
              question: "How do you go to school?",
              sampleAnswer: "My mum takes me to school on her motorbike, and it takes ten minutes.",
            },
            {
              question: "What must you do when you cross the road?",
              sampleAnswer: "I must look left and right, and I must wait for the green light.",
            },
          ],
        },
      },

      {
        topic: "At the Market",
        topicVi: "Đi chợ cùng mẹ",
        icon: "🧺",
        words: [
          word("market", "/ˈmɑːkɪt/", "chợ", "🏪"),
          word("vegetable", "/ˈvedʒtəbl/", "rau củ", "🥕"),
          word("fruit", "/fruːt/", "trái cây", "🍎"),
          word("buy", "/baɪ/", "mua", "💰"),
          word("cheap", "/tʃiːp/", "rẻ", "🏷️"),
          word("heavy", "/ˈhevi/", "nặng", "🏋️"),
          word("basket", "/ˈbɑːskɪt/", "cái giỏ", "🧺"),
          word("seller", "/ˈselə/", "người bán hàng", "🧑‍🌾"),
          word("fresh", "/freʃ/", "tươi", "🌿"),
          word("choose", "/tʃuːz/", "chọn (quá khứ: chose)", "👉"),
        ],
        sound: {
          letters: "igh",
          sound: "/aɪ/",
          hint: "Ba chữ 'igh' chỉ đọc thành MỘT âm /aɪ/ (ai) — chữ g và h hoàn toàn CÂM. Trẻ Việt hay cố đọc chữ 'g' thành 'lai-gh'. Ngoài ra phải bật /t/ ở cuối: light, night, bright — đừng nuốt thành 'lai', 'nai'.",
          words: [
            { word: "light", meaning: "ánh sáng", emoji: "💡" },
            { word: "night", meaning: "ban đêm", emoji: "🌙" },
            { word: "high", meaning: "cao", emoji: "🔝" },
            { word: "bright", meaning: "sáng rực", emoji: "✨" },
          ],
        },
        reading: {
          title: "Sunday at the market",
          passage:
            "On Sunday morning my mum and I went to the market near our house. It was very busy. We saw fresh vegetables, sweet fruit and big fish. Mum let me choose the fruit, so I chose ten red apples and a green papaya. The seller was kind and she gave me a small banana. The apples were cheap, but our basket was very heavy! We carried it home together, and then we made a big fruit salad.",
          translation:
            "Sáng Chủ nhật, tớ và mẹ đi chợ gần nhà. Chợ đông lắm. Hai mẹ con thấy rau củ tươi, trái cây ngọt và cá to. Mẹ cho tớ chọn trái cây, thế là tớ chọn mười quả táo đỏ và một quả đu đủ xanh. Cô bán hàng tốt bụng lắm, cô còn cho tớ một quả chuối nhỏ. Táo rẻ, nhưng cái giỏ của hai mẹ con thì nặng ơi là nặng! Hai mẹ con khiêng giỏ về nhà, rồi cùng làm một đĩa salad hoa quả to.",
          questions: [
            mcq(
              "What did the child choose at the market?",
              "Ở chợ, bạn nhỏ đã chọn gì?",
              [
                "Ten red apples and a green papaya",
                "Some fish and rice",
                "Vegetables and bread",
                "Milk and eggs",
              ],
              0,
              "Bài kể 'I chose ten red apples and a green papaya' — bạn ấy chọn mười quả táo đỏ và một quả đu đủ xanh.",
              "I chose ten red apples and a green papaya",
            ),
            mcq(
              "What did the seller give the child?",
              "Cô bán hàng đã cho bạn nhỏ cái gì?",
              ["A small banana", "A red apple", "A bag of rice", "A cold drink"],
              0,
              "Bài viết 'she gave me a small banana' — cô bán hàng tặng bạn ấy một quả chuối nhỏ.",
              "she gave me a small banana",
            ),
            mcq(
              "What did they make at home?",
              "Về nhà hai mẹ con đã làm món gì?",
              ["A big fruit salad", "A cake", "Vegetable soup", "Spring rolls"],
              0,
              "Câu cuối bài: 'then we made a big fruit salad' — hai mẹ con làm một đĩa salad hoa quả to.",
              "we made a big fruit salad",
            ),
            tf(
              "The basket was light and easy to carry.",
              "Cái giỏ nhẹ và dễ xách.",
              false,
              "Chưa đúng nhé! Bài viết 'but our basket was very heavy!' — cái giỏ rất nặng, hai mẹ con phải khiêng cùng nhau.",
              "but our basket was very heavy!",
            ),
          ],
        },
        listening: {
          title: "Two carrots, please",
          transcript:
            "Mum: We need some vegetables for dinner. Can you help me?\nBoy: Yes, Mum! What must we buy?\nMum: Two carrots, some green beans and one big tomato.\nBoy: How much are the carrots?\nSeller: They are ten thousand dong, and they are very fresh.\nBoy: That's cheap! Here you are.\nSeller: Thank you. Here is your change.\nMum: Well done, Nam. Now let's go home and cook.",
          questions: [
            mcq(
              "What do they need for dinner?",
              "Hai mẹ con cần mua gì cho bữa tối?",
              ["Vegetables", "Fruit", "Fish", "Bread"],
              0,
              "Mẹ nói ngay câu đầu: 'We need some vegetables for dinner.' — cần mua rau củ.",
              "We need some vegetables for dinner.",
            ),
            mcq(
              "How many carrots do they buy?",
              "Hai mẹ con mua mấy củ cà rốt?",
              ["One", "Two", "Three", "Ten"],
              1,
              "Mẹ liệt kê 'Two carrots, some green beans and one big tomato.' — hai củ cà rốt. Số 'ten' trong bài là giá tiền, không phải số cà rốt.",
              "Two carrots, some green beans and one big tomato.",
            ),
            tf(
              "Nam thinks the carrots are expensive.",
              "Nam thấy cà rốt đắt.",
              false,
              "Chưa đúng nhé! Nam reo lên 'That's cheap!' — bạn ấy thấy cà rốt rẻ.",
              "That's cheap!",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh kể một lần bé đi chợ hoặc đi siêu thị. Bé đi với ai? Bé thấy gì? Bé mua gì? Chuyện gì vui đã xảy ra? Nhớ dùng quá khứ đơn (went, saw, bought, made).",
        writingOutline:
          "1. Khi nào và với ai: On Sunday morning my mum and I went to the market.\n2. Ở đó có gì: We saw fresh vegetables and sweet fruit.\n3. Bé chọn gì: I chose … apples and …\n4. Điều thú vị: The seller gave me … / The basket was very heavy!\n5. Về nhà làm gì: Then we made …",
        speaking: {
          sentences: [
            "On Sunday we went to the market.",
            "We saw fresh vegetables and sweet fruit.",
            "I chose ten red apples.",
            "The apples were cheap, but the basket was heavy.",
            "Then we made a big fruit salad.",
          ],
          questions: [
            {
              question: "Do you go to the market with your family?",
              sampleAnswer: "Yes, I go to the market with my mum on Sunday morning.",
            },
            {
              question: "What fruit do you like best?",
              sampleAnswer: "I like mangoes best, because they are sweet and fresh.",
            },
            {
              question: "What did you buy last week?",
              sampleAnswer: "Last week I bought a new pen and some green apples.",
            },
          ],
        },
      },

      {
        topic: "Jobs People Do",
        topicVi: "Nghề nghiệp quanh bé",
        icon: "💼",
        words: [
          word("job", "/dʒɒb/", "công việc, nghề", "💼"),
          word("doctor", "/ˈdɒktə/", "bác sĩ", "🩺"),
          word("farmer", "/ˈfɑːmə/", "nông dân", "🧑‍🌾"),
          word("driver", "/ˈdraɪvə/", "tài xế", "🚌"),
          word("postman", "/ˈpəʊstmən/", "người đưa thư", "📬"),
          word("help", "/help/", "giúp đỡ", "🤲"),
          word("brave", "/breɪv/", "dũng cảm", "🦸"),
          word("work", "/wɜːk/", "làm việc", "🛠️"),
          word("letter", "/ˈletə/", "lá thư", "✉️"),
          word("uniform", "/ˈjuːnɪfɔːm/", "đồng phục", "👕"),
        ],
        sound: {
          letters: "oa",
          sound: "/əʊ/",
          hint: "'oa' là âm ĐÔI /əʊ/: bắt đầu ở 'ơ' rồi trượt sang 'u', môi tròn dần. Trẻ Việt hay đọc thành 'ô' đứng yên (coat ra 'cốt'). Phải nghe rõ hai chặng. Và nhớ bật phụ âm cuối: coat có /t/, soap có /p/.",
          words: [
            { word: "coat", meaning: "áo khoác", emoji: "🧥" },
            { word: "boat", meaning: "chiếc thuyền", emoji: "⛵" },
            { word: "road", meaning: "con đường", emoji: "🛣️" },
            { word: "soap", meaning: "xà phòng", emoji: "🧼" },
          ],
        },
        reading: {
          title: "People in my town",
          passage:
            "My name is Thu. People in my town do many different jobs. My aunt is a doctor. She wears a white uniform and she helps sick people every day. Our neighbour is a farmer. He grows rice, and he works very hard in the sun. The bus driver takes children to school in the morning. The postman brings us letters on his old motorbike. Firefighters are very brave, because they help people when there is a fire. When I grow up, I want to be a teacher.",
          translation:
            "Tớ tên là Thu. Người ở thị trấn của tớ làm rất nhiều nghề khác nhau. Cô tớ là bác sĩ. Cô mặc bộ đồng phục trắng và ngày nào cũng chữa bệnh cho mọi người. Bác hàng xóm nhà tớ là nông dân. Bác trồng lúa và làm việc rất vất vả dưới trời nắng. Bác tài xế xe buýt buổi sáng chở các bạn nhỏ đến trường. Chú đưa thư mang thư đến cho nhà tớ bằng chiếc xe máy cũ. Các cô chú lính cứu hoả thì rất dũng cảm, vì họ cứu giúp mọi người khi có hoả hoạn. Lớn lên, tớ muốn làm cô giáo.",
          questions: [
            mcq(
              "What does Thu's aunt do?",
              "Cô của Thu làm nghề gì?",
              ["She is a doctor", "She is a farmer", "She is a teacher", "She is a bus driver"],
              0,
              "Bài viết rõ 'My aunt is a doctor.' — cô ấy là bác sĩ, mặc áo trắng và chữa bệnh cho mọi người.",
              "My aunt is a doctor.",
            ),
            mcq(
              "What does the farmer grow?",
              "Bác nông dân trồng cây gì?",
              ["Rice", "Corn", "Apples", "Tea"],
              0,
              "Bài viết 'He grows rice' — bác nông dân trồng lúa.",
              "He grows rice",
            ),
            mcq(
              "How does the postman bring the letters?",
              "Chú đưa thư mang thư đến bằng gì?",
              ["By bus", "On his old motorbike", "By bicycle", "On foot"],
              1,
              "Bài viết 'The postman brings us letters on his old motorbike.' — chú ấy đi bằng xe máy cũ.",
              "The postman brings us letters on his old motorbike.",
            ),
            tf(
              "Thu wants to be a doctor when she grows up.",
              "Lớn lên Thu muốn làm bác sĩ.",
              false,
              "Chưa đúng nhé! Câu cuối bài nói 'I want to be a teacher.' — Thu muốn làm cô giáo. Bác sĩ là nghề của cô bạn ấy.",
              "When I grow up, I want to be a teacher.",
            ),
          ],
        },
        listening: {
          title: "What does your father do?",
          transcript:
            "Teacher: Today we are talking about jobs. Lan, what does your father do?\nGirl: My father is a bus driver. He starts work at five o'clock.\nTeacher: That's very early! And your mother?\nGirl: She is a nurse. She works at the hospital near the market.\nTeacher: Thank you, Lan. Duc, what job do you want?\nBoy: I want to be a farmer, because I love animals.\nTeacher: What a lovely idea. Farmers work hard, don't they?\nBoy: Yes, but my grandpa says it is a happy job.",
          questions: [
            mcq(
              "What time does Lan's father start work?",
              "Bố của Lan bắt đầu làm việc lúc mấy giờ?",
              ["Four o'clock", "Five o'clock", "Six o'clock", "Seven o'clock"],
              1,
              "Lan nói 'He starts work at five o'clock.' — bố bạn ấy đi làm từ năm giờ sáng.",
              "He starts work at five o'clock.",
            ),
            mcq(
              "Where does Lan's mother work?",
              "Mẹ của Lan làm việc ở đâu?",
              ["At a school", "At the hospital", "At the market", "On a farm"],
              1,
              "Lan nói 'She works at the hospital near the market.' — mẹ bạn ấy làm ở bệnh viện gần chợ, chứ không phải làm ở chợ.",
              "She works at the hospital near the market.",
            ),
            mcq(
              "Why does Duc want to be a farmer?",
              "Vì sao Đức muốn làm nông dân?",
              [
                "Because he loves animals",
                "Because he likes rice",
                "Because the job is easy",
                "Because his father is a farmer",
              ],
              0,
              "Đức nói 'I want to be a farmer, because I love animals.' — chữ 'because' cho biết lí do là bạn ấy yêu động vật.",
              "I want to be a farmer, because I love animals.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh về nghề nghiệp. Bố mẹ hoặc người thân của bé làm nghề gì? Họ làm việc ở đâu? Lớn lên bé muốn làm nghề gì, vì sao?",
        writingOutline:
          "1. Người thân: My father is a … / My mother is a …\n2. Nơi làm việc: He works at … / She works in …\n3. Việc họ làm: He helps … / She takes …\n4. Ước mơ của bé: When I grow up, I want to be a …\n5. Lí do: … because I love / I like …",
        speaking: {
          sentences: [
            "My aunt is a doctor.",
            "She wears a white uniform.",
            "The farmer works very hard.",
            "Firefighters are very brave.",
            "When I grow up, I want to be a teacher.",
          ],
          questions: [
            {
              question: "What job does your mother or father do?",
              sampleAnswer: "My mother is a nurse. She works at the hospital near my school.",
            },
            {
              question: "What job do you want when you grow up?",
              sampleAnswer: "I want to be a teacher, because I like helping small children.",
            },
            {
              question: "Which job do you think is very brave?",
              sampleAnswer: "I think firefighters are very brave, because they help people in a fire.",
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    title: "Chương 3 · Thiên nhiên quanh bé",
    subtitle: "Bốn mùa, bãi biển và một chuyến đi rừng",
    lessons: [
      {
        topic: "The Seasons",
        topicVi: "Bốn mùa trong năm",
        icon: "🍂",
        words: [
          word("season", "/ˈsiːzn/", "mùa", "🍂"),
          word("spring", "/sprɪŋ/", "mùa xuân", "🌸"),
          word("summer", "/ˈsʌmə/", "mùa hè", "☀️"),
          word("autumn", "/ˈɔːtəm/", "mùa thu", "🍁"),
          word("winter", "/ˈwɪntə/", "mùa đông", "❄️"),
          word("cool", "/kuːl/", "mát mẻ", "🌬️"),
          word("warm", "/wɔːm/", "ấm áp", "🔥"),
          word("wet", "/wet/", "ướt", "💧"),
          word("wind", "/wɪnd/", "gió", "🍃"),
          word("change", "/tʃeɪndʒ/", "thay đổi", "🔄"),
        ],
        sound: {
          letters: "oo",
          sound: "/uː/",
          hint: "'oo' đọc /uː/ dài, môi chúm tròn nhỏ như đang huýt sáo. Trẻ Việt hay đọc ngắn cụt nên food nghe thành 'phút'. Kéo dài hơi ra, rồi bật rõ phụ âm cuối: /d/ trong food, /n/ trong moon, /l/ trong pool.",
          words: [
            { word: "moon", meaning: "mặt trăng", emoji: "🌙" },
            { word: "food", meaning: "thức ăn", emoji: "🍜" },
            { word: "pool", meaning: "hồ bơi", emoji: "🏊" },
            { word: "zoo", meaning: "sở thú", emoji: "🦁" },
          ],
        },
        reading: {
          title: "Four seasons",
          passage:
            "There are four seasons in the north of Vietnam. In spring the weather is warm and the flowers open. Summer is very hot, and it rains a lot, so my clothes are often wet. I like autumn best, because the air is cool and the wind is soft. In winter we wear thick coats and drink hot soup. Last winter it was very cold, but we were happy. The seasons change, and every season brings something new.",
          translation:
            "Miền Bắc Việt Nam có bốn mùa. Mùa xuân trời ấm áp và hoa nở. Mùa hè rất nóng, lại hay mưa, nên quần áo tớ thường bị ướt. Tớ thích mùa thu nhất, vì không khí mát mẻ và gió dịu nhẹ. Mùa đông cả nhà mặc áo khoác dày và ăn canh nóng. Mùa đông năm ngoái rét lắm, nhưng nhà tớ vẫn vui. Các mùa cứ thay nhau, và mùa nào cũng mang đến điều mới mẻ.",
          questions: [
            mcq(
              "Which season does the writer like best?",
              "Bạn nhỏ thích mùa nào nhất?",
              ["Spring", "Summer", "Autumn", "Winter"],
              2,
              "Bài viết 'I like autumn best' — bạn ấy thích mùa thu nhất vì không khí mát và gió nhẹ.",
              "I like autumn best, because the air is cool and the wind is soft.",
            ),
            mcq(
              "What is the weather like in summer?",
              "Thời tiết mùa hè thế nào?",
              [
                "Cold and dry",
                "Very hot and rainy",
                "Cool and windy",
                "Warm with lots of flowers",
              ],
              1,
              "Bài viết 'Summer is very hot, and it rains a lot' — mùa hè rất nóng và mưa nhiều.",
              "Summer is very hot, and it rains a lot",
            ),
            mcq(
              "What does the family do in winter?",
              "Mùa đông cả nhà làm gì?",
              [
                "They wear thick coats and drink hot soup",
                "They swim in the sea",
                "They fly kites",
                "They pick flowers",
              ],
              0,
              "Bài viết 'In winter we wear thick coats and drink hot soup.' — mặc áo dày và ăn canh nóng.",
              "In winter we wear thick coats and drink hot soup.",
            ),
            tf(
              "The flowers open in spring.",
              "Hoa nở vào mùa xuân.",
              true,
              "Đúng rồi! Bài viết 'In spring the weather is warm and the flowers open.' — mùa xuân trời ấm và hoa nở.",
              "In spring the weather is warm and the flowers open.",
            ),
          ],
        },
        listening: {
          title: "Which season do you like?",
          transcript:
            "Boy: Which season do you like, Mai?\nGirl: I love summer, because I can swim every day.\nBoy: Really? Summer is too hot for me!\nGirl: What about you? Which season do you like?\nBoy: I like winter. I can wear my new blue coat.\nGirl: But winter is very cold in Hanoi.\nBoy: Yes, but my mum makes hot soup, and we sit together.\nGirl: That sounds nice. Now I like winter too!",
          questions: [
            mcq(
              "Why does Mai love summer?",
              "Vì sao Mai thích mùa hè?",
              [
                "Because she can swim every day",
                "Because the air is cool",
                "Because she has a new coat",
                "Because she eats hot soup",
              ],
              0,
              "Mai nói 'I love summer, because I can swim every day.' — vì mùa hè ngày nào bạn ấy cũng được đi bơi.",
              "I love summer, because I can swim every day.",
            ),
            mcq(
              "What colour is the boy's new coat?",
              "Áo khoác mới của bạn trai màu gì?",
              ["Red", "Green", "Blue", "Yellow"],
              2,
              "Bạn trai nói 'I can wear my new blue coat.' — áo khoác mới màu xanh dương.",
              "I can wear my new blue coat.",
            ),
            tf(
              "The boy thinks summer is too hot.",
              "Bạn trai thấy mùa hè nóng quá.",
              true,
              "Đúng rồi! Bạn ấy kêu 'Summer is too hot for me!' — với bạn ấy mùa hè nóng quá.",
              "Summer is too hot for me!",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh về các mùa ở nơi bé sống. Có mấy mùa? Thời tiết từng mùa thế nào? Bé thích mùa nào nhất, vì sao? Mùa đó bé làm gì?",
        writingOutline:
          "1. Mở đầu: There are … seasons where I live.\n2. Tả 2 mùa: In summer it is hot. In winter it is cold.\n3. Mùa thích nhất: I like … best, because …\n4. Hoạt động: In that season I can …\n5. Kỉ niệm: Last winter / Last summer I …",
        speaking: {
          sentences: [
            "There are four seasons in Vietnam.",
            "In spring the flowers open.",
            "Summer is very hot, and it rains a lot.",
            "I like autumn best, because the air is cool.",
            "In winter we wear thick coats.",
          ],
          questions: [
            {
              question: "Which season do you like best? Why?",
              sampleAnswer: "I like summer best, because I can swim and eat ice cream.",
            },
            {
              question: "What is the weather like today?",
              sampleAnswer: "Today it is warm and sunny, so I can play outside.",
            },
            {
              question: "What do you wear in winter?",
              sampleAnswer: "In winter I wear a thick coat, a hat and warm socks.",
            },
          ],
        },
      },

      {
        topic: "At the Beach",
        topicVi: "Một ngày ở biển",
        icon: "🏖️",
        words: [
          word("beach", "/biːtʃ/", "bãi biển", "🏖️"),
          word("sand", "/sænd/", "cát", "🏝️"),
          word("wave", "/weɪv/", "con sóng", "🌊"),
          word("shell", "/ʃel/", "vỏ sò", "🐚"),
          word("swim", "/swɪm/", "bơi", "🏊"),
          word("build", "/bɪld/", "xây, đắp (quá khứ: built)", "🏰"),
          word("sunny", "/ˈsʌni/", "nắng đẹp", "😎"),
          word("shout", "/ʃaʊt/", "reo lên, hò lên", "📣"),
          word("salty", "/ˈsɔːlti/", "mặn", "🧂"),
          word("umbrella", "/ʌmˈbrelə/", "cái ô, cái dù", "⛱️"),
        ],
        sound: {
          letters: "ar",
          sound: "/ɑːr/",
          hint: "'ar' đọc /ɑː/ — mở miệng to, kéo dài như 'a' trong 'ba' nhưng dài hơn hẳn; giọng Mỹ còn cong lưỡi nhẹ thêm /r/ ở cuối. Trẻ Việt hay bỏ hẳn /r/ (car thành 'ca') và đọc park thành 'pác'. Giữ âm /k/ gọn ở cuối, đừng thêm nguyên âm sau nó.",
          words: [
            { word: "car", meaning: "ô tô", emoji: "🚗" },
            { word: "star", meaning: "ngôi sao", emoji: "⭐" },
            { word: "park", meaning: "công viên", emoji: "🏞️" },
            { word: "farm", meaning: "nông trại", emoji: "🚜" },
          ],
        },
        reading: {
          title: "A day at the beach",
          passage:
            "My name is Ngoc. Last summer we went to the beach in Da Nang. It was a sunny day. My brother and I built a big sandcastle, and we put pretty shells on the top. The sand was hot, so we ran quickly to the water. The waves were small, and I can swim now, so I was not afraid. The water tasted salty! My mum sat under a blue umbrella and read her book. When a big wave came, we shouted and laughed.",
          translation:
            "Tớ tên là Ngọc. Mùa hè năm ngoái nhà tớ đi biển Đà Nẵng. Hôm đó trời nắng đẹp. Tớ và anh trai đắp một toà lâu đài cát to, rồi xếp mấy vỏ sò xinh xinh lên trên đỉnh. Cát nóng nên hai anh em chạy thật nhanh xuống nước. Sóng nhỏ thôi, mà giờ tớ biết bơi rồi, nên tớ chẳng sợ. Nước biển mặn ơi là mặn! Mẹ tớ ngồi dưới cái ô màu xanh và đọc sách. Khi một con sóng to ập tới, hai anh em vừa reo vừa cười.",
          questions: [
            mcq(
              "What did the children build?",
              "Hai anh em đã đắp gì?",
              ["A big sandcastle", "A small boat", "A wooden house", "A bridge"],
              0,
              "Bài kể 'My brother and I built a big sandcastle' — hai anh em đắp một lâu đài cát to.",
              "My brother and I built a big sandcastle",
            ),
            mcq(
              "What did they put on top of the sandcastle?",
              "Hai anh em đặt gì lên đỉnh lâu đài cát?",
              ["Pretty shells", "Small stones", "Green leaves", "A paper flag"],
              0,
              "Bài viết 'we put pretty shells on the top' — họ xếp những vỏ sò xinh lên trên đỉnh.",
              "we put pretty shells on the top",
            ),
            mcq(
              "Why was Ngoc not afraid of the water?",
              "Vì sao Ngọc không sợ nước?",
              [
                "Because the water was warm",
                "Because she can swim now",
                "Because her brother held her hand",
                "Because the beach was empty",
              ],
              1,
              "Bài viết 'I can swim now, so I was not afraid' — chữ 'so' nối lí do: vì Ngọc đã biết bơi.",
              "I can swim now, so I was not afraid",
            ),
            tf(
              "Ngoc's mum sat under a red umbrella.",
              "Mẹ Ngọc ngồi dưới cái ô màu đỏ.",
              false,
              "Chưa đúng nhé! Bài viết 'My mum sat under a blue umbrella' — cái ô màu xanh dương, không phải màu đỏ.",
              "My mum sat under a blue umbrella and read her book.",
            ),
          ],
        },
        listening: {
          title: "Hats on first!",
          transcript:
            "Dad: Look at the sea, children! Are you ready?\nGirl: Yes! Can we swim now, Dad?\nDad: Wait a minute. You must put on your hats first.\nBoy: I don't want to swim. I want to build a sandcastle.\nDad: Good idea. Here is your bucket.\nGirl: Dad, look! I found a beautiful shell.\nDad: It's lovely. Put it in the bag, and we can take it home.\nBoy: Come and help me, Dad! My castle is falling down.",
          questions: [
            mcq(
              "What must the children do before they swim?",
              "Trước khi xuống bơi, các bạn nhỏ phải làm gì?",
              ["Put on their hats", "Eat their lunch", "Find a shell", "Open the umbrella"],
              0,
              "Bố dùng 'must': 'You must put on your hats first.' — phải đội mũ trước đã.",
              "You must put on your hats first.",
            ),
            mcq(
              "What does the boy want to do?",
              "Bạn trai muốn làm gì?",
              ["Swim in the sea", "Build a sandcastle", "Read a book", "Play football"],
              1,
              "Bạn trai nói 'I don't want to swim. I want to build a sandcastle.' — bạn ấy muốn đắp lâu đài cát.",
              "I want to build a sandcastle.",
            ),
            tf(
              "The girl found a beautiful shell.",
              "Bạn gái nhặt được một vỏ sò rất đẹp.",
              true,
              "Đúng rồi! Bạn gái reo lên 'I found a beautiful shell.' — bạn ấy tìm thấy một vỏ sò đẹp.",
              "I found a beautiful shell.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh kể một ngày ở biển (hoặc ở hồ, ở sông). Bé đi với ai? Thời tiết thế nào? Bé đã làm gì ở đó? Bé thấy gì thú vị? Dùng quá khứ đơn (went, built, saw, was).",
        writingOutline:
          "1. Khi nào và ở đâu: Last summer we went to the beach in …\n2. Thời tiết: It was a sunny / windy day.\n3. Bé đã làm gì: We built a sandcastle and we swam in the sea.\n4. Điều thú vị: I found a beautiful shell. / The water tasted salty!\n5. Cảm nghĩ: It was a wonderful day.",
        speaking: {
          sentences: [
            "Last summer we went to the beach.",
            "We built a big sandcastle.",
            "The sand was hot, so we ran to the water.",
            "I can swim now, so I was not afraid.",
            "I found a beautiful shell.",
          ],
          questions: [
            {
              question: "Do you like the beach? Why?",
              sampleAnswer: "Yes, I love the beach, because I can swim and build sandcastles.",
            },
            {
              question: "Can you swim?",
              sampleAnswer: "Yes, I can swim, but I can't swim very far yet.",
            },
            {
              question: "What did you do on your last holiday?",
              sampleAnswer: "Last summer I went to Da Nang with my family, and we swam every day.",
            },
          ],
        },
      },

      {
        topic: "In the Forest",
        topicVi: "Chuyến đi rừng",
        icon: "🌲",
        words: [
          word("forest", "/ˈfɒrɪst/", "khu rừng", "🌲"),
          word("tree", "/triː/", "cái cây", "🌳"),
          word("leaf", "/liːf/", "chiếc lá (nhiều lá: leaves)", "🍃"),
          word("bird", "/bɜːd/", "con chim", "🐦"),
          word("monkey", "/ˈmʌŋki/", "con khỉ", "🐒"),
          word("quiet", "/ˈkwaɪət/", "yên tĩnh", "🤫"),
          word("climb", "/klaɪm/", "trèo, leo", "🧗"),
          word("path", "/pɑːθ/", "lối mòn", "🥾"),
          word("hide", "/haɪd/", "trốn, nấp (quá khứ: hid)", "🙈"),
          word("beautiful", "/ˈbjuːtɪfl/", "đẹp", "🌈"),
        ],
        sound: {
          letters: "or",
          sound: "/ɔːr/",
          hint: "'or' đọc /ɔː/ — môi tròn, kéo dài; giọng Mỹ cong lưỡi nhẹ thêm /r/. Chú ý short bắt đầu bằng /ʃ/ (sh) chứ không phải /s/ — trẻ Việt hay đọc thành 'sót'. Chu môi ra khi phát âm 'sh', và nhớ bật /t/ cuối.",
          words: [
            { word: "corn", meaning: "ngô, bắp", emoji: "🌽" },
            { word: "fork", meaning: "cái nĩa", emoji: "🍴" },
            { word: "horse", meaning: "con ngựa", emoji: "🐴" },
            { word: "short", meaning: "ngắn, thấp", emoji: "📏" },
          ],
        },
        reading: {
          title: "Our class trip",
          passage:
            "Last month our class went to a forest near the mountains. It was quiet and beautiful. We walked on a small path between the tall trees. Green leaves fell on our hats, and we laughed. Our teacher showed us a blue bird in a nest. Then we saw two monkeys. One monkey climbed a tree very fast, and the other one hid behind a big rock. We must not drop rubbish in the forest, because it is the home of the animals.",
          translation:
            "Tháng trước lớp tớ đi tham quan một khu rừng gần dãy núi. Rừng yên tĩnh và đẹp lắm. Cả lớp đi trên một lối mòn nhỏ giữa những hàng cây cao. Lá xanh rơi lên mũ chúng tớ, đứa nào cũng cười. Cô giáo chỉ cho chúng tớ một chú chim xanh trong tổ. Rồi chúng tớ thấy hai con khỉ. Một con trèo tót lên cây rất nhanh, con kia thì nấp sau một tảng đá to. Chúng ta không được vứt rác trong rừng, vì đó là nhà của các loài vật.",
          questions: [
            mcq(
              "Where did the class go last month?",
              "Tháng trước lớp đã đi đâu?",
              [
                "To a forest near the mountains",
                "To the beach",
                "To a city park",
                "To a farm",
              ],
              0,
              "Câu đầu bài: 'Last month our class went to a forest near the mountains.' — lớp đi một khu rừng gần núi.",
              "Last month our class went to a forest near the mountains.",
            ),
            mcq(
              "What did the teacher show the children?",
              "Cô giáo đã chỉ cho các bạn nhỏ xem gì?",
              ["A blue bird in a nest", "A big fish", "A red flower", "A brown monkey"],
              0,
              "Bài viết 'Our teacher showed us a blue bird in a nest.' — cô chỉ một chú chim xanh trong tổ.",
              "Our teacher showed us a blue bird in a nest.",
            ),
            mcq(
              "What did the second monkey do?",
              "Con khỉ thứ hai đã làm gì?",
              [
                "It climbed a tree",
                "It hid behind a big rock",
                "It ate a banana",
                "It ran to the path",
              ],
              1,
              "Bài viết 'the other one hid behind a big rock' — con khỉ còn lại nấp sau một tảng đá. Con trèo cây là con thứ nhất.",
              "the other one hid behind a big rock",
            ),
            tf(
              "We can drop rubbish in the forest.",
              "Chúng ta có thể vứt rác trong rừng.",
              false,
              "Chưa đúng nhé! Bài viết 'We must not drop rubbish in the forest' — 'must not' nghĩa là không được phép, vì rừng là nhà của muông thú.",
              "We must not drop rubbish in the forest",
            ),
          ],
        },
        listening: {
          title: "Behind the tree",
          transcript:
            "Teacher: Please stay together, children. The forest is very big.\nBoy: Look, Miss! There is something behind that tree.\nTeacher: Be quiet, and look carefully. What can you see?\nGirl: It's a little bird. It's brown and white.\nBoy: Can we take it home?\nTeacher: No, we can't. The forest is its home, and its family lives here.\nGirl: I understand. Can I draw it in my notebook?\nTeacher: What a good idea! Draw it, and we can show the class.",
          questions: [
            mcq(
              "What can the children see behind the tree?",
              "Các bạn nhỏ nhìn thấy con gì sau gốc cây?",
              ["A little bird", "A monkey", "A big rock", "A cat"],
              0,
              "Bạn gái nói 'It's a little bird.' — đó là một chú chim nhỏ.",
              "It's a little bird.",
            ),
            mcq(
              "What colour is the little bird?",
              "Chú chim nhỏ màu gì?",
              ["Blue and green", "Brown and white", "Black and yellow", "Red and grey"],
              1,
              "Bạn gái tả tiếp 'It's brown and white.' — chú chim màu nâu và trắng.",
              "It's brown and white.",
            ),
            mcq(
              "Why can't they take the bird home?",
              "Vì sao các bạn không mang chú chim về nhà được?",
              [
                "Because it is too big",
                "Because the forest is its home",
                "Because it is sleeping",
                "Because it can fly away",
              ],
              1,
              "Cô giáo giải thích 'The forest is its home, and its family lives here.' — rừng là nhà của chú chim và gia đình chú ở đây.",
              "The forest is its home, and its family lives here.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh kể một chuyến đi chơi ngoài thiên nhiên (rừng, núi, công viên hoặc vườn bách thảo). Bé đi với ai? Bé thấy con vật hay cái cây gì? Bé phải nhớ điều gì để bảo vệ thiên nhiên (dùng must / must not)?",
        writingOutline:
          "1. Khi nào, đi đâu: Last month our class went to …\n2. Nơi đó thế nào: It was quiet and beautiful.\n3. Bé thấy gì: We saw two monkeys and a blue bird.\n4. Việc bé đã làm: We walked on a small path, and we laughed.\n5. Bài học: We must not drop rubbish, because …",
        speaking: {
          sentences: [
            "Our class went to a forest.",
            "It was quiet and beautiful.",
            "We walked on a small path between the tall trees.",
            "One monkey climbed a tree very fast.",
            "We must not drop rubbish in the forest.",
          ],
          questions: [
            {
              question: "Do you like walking in a forest or a park?",
              sampleAnswer: "Yes, I like it. The park near my house is quiet, and I can see birds.",
            },
            {
              question: "What animals can you see in a forest?",
              sampleAnswer: "I can see monkeys, birds and butterflies in a forest.",
            },
            {
              question: "How can children help nature?",
              sampleAnswer: "We must not drop rubbish, and we can plant a small tree at school.",
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    title: "Chương 4 · Bạn bè và cảm xúc",
    subtitle: "Bạn thân, những cảm xúc mỗi ngày và niềm vui giúp đỡ người khác",
    lessons: [
      {
        topic: "My Best Friend",
        topicVi: "Người bạn thân nhất",
        icon: "👫",
        words: [
          word("friend", "/frend/", "bạn", "👫"),
          word("kind", "/kaɪnd/", "tốt bụng", "💗"),
          word("funny", "/ˈfʌni/", "hài hước", "😄"),
          word("share", "/ʃeə/", "chia sẻ", "🤝"),
          word("laugh", "/lɑːf/", "cười", "😂"),
          word("secret", "/ˈsiːkrət/", "bí mật", "🔒"),
          word("same", "/seɪm/", "giống nhau, cùng một", "👯"),
          word("turn", "/tɜːn/", "lượt của ai đó", "🔁"),
          word("clever", "/ˈklevə/", "thông minh", "🧠"),
          word("never", "/ˈnevə/", "không bao giờ", "🚫"),
        ],
        sound: {
          letters: "ur",
          sound: "/ɜːr/",
          hint: "'ur' đọc /ɜː/ — âm 'ơ' DÀI, môi KHÔNG tròn, lưỡi nằm giữa miệng; giọng Mỹ cong lưỡi thêm /r/. Trẻ Việt hay đọc turn thành 'tơn' cụt rồi nuốt mất /n/. Kéo dài âm 'ơ' rồi mới bật phụ âm cuối cho rõ.",
          words: [
            { word: "nurse", meaning: "y tá", emoji: "👩‍⚕️" },
            { word: "turn", meaning: "lượt, rẽ", emoji: "🔁" },
            { word: "purple", meaning: "màu tím", emoji: "💜" },
            { word: "burger", meaning: "bánh mì kẹp", emoji: "🍔" },
          ],
        },
        reading: {
          title: "My friend Hoa",
          passage:
            "My name is Trang, and my best friend is Hoa. We sit at the same desk at school. Hoa is very kind, and she is funny too. She always makes me laugh. She is clever and very good at maths, so she helps me with my homework. I am good at drawing, and I help her draw animals. We share our snacks every break time. Last week I was sad, because I lost my pencil case. Hoa gave me her old one. A good friend never leaves you alone.",
          translation:
            "Tớ tên là Trang, và bạn thân nhất của tớ là Hoa. Hai đứa ngồi cùng một bàn ở lớp. Hoa rất tốt bụng, lại còn hài hước nữa. Bạn ấy lúc nào cũng chọc tớ cười. Hoa thông minh lắm, bạn ấy rất giỏi Toán nên hay giúp tớ làm bài tập. Còn tớ vẽ đẹp, tớ giúp bạn ấy vẽ con vật. Giờ ra chơi nào hai đứa cũng chia nhau đồ ăn vặt. Tuần trước tớ buồn lắm vì làm mất hộp bút. Hoa cho tớ cái hộp bút cũ của bạn ấy. Bạn tốt thì không bao giờ để mình cô đơn.",
          questions: [
            mcq(
              "What is Hoa good at?",
              "Hoa giỏi môn gì?",
              ["Maths", "Drawing", "Singing", "Football"],
              0,
              "Bài viết 'She is clever and very good at maths' — Hoa giỏi Toán. Còn người vẽ đẹp là Trang, bạn kể chuyện, chứ không phải Hoa.",
              "She is clever and very good at maths, so she helps me with my homework.",
            ),
            mcq(
              "Why was Trang sad last week?",
              "Vì sao tuần trước Trang buồn?",
              [
                "Because she lost her pencil case",
                "Because she was ill",
                "Because Hoa moved away",
                "Because she had too much homework",
              ],
              0,
              "Chữ 'because' chỉ rõ lí do: 'I was sad, because I lost my pencil case' — Trang làm mất hộp bút.",
              "I was sad, because I lost my pencil case",
            ),
            mcq(
              "What did Hoa give Trang?",
              "Hoa đã cho Trang cái gì?",
              ["Her old pencil case", "A new pen", "A snack", "A story book"],
              0,
              "Bài viết 'Hoa gave me her old one.' — 'one' ở đây thay cho 'pencil case', tức là cái hộp bút cũ của Hoa.",
              "Hoa gave me her old one.",
            ),
            tf(
              "The two friends sit at different desks.",
              "Hai bạn ngồi hai bàn khác nhau.",
              false,
              "Chưa đúng nhé! Bài viết 'We sit at the same desk at school.' — 'the same desk' nghĩa là cùng một bàn.",
              "We sit at the same desk at school.",
            ),
          ],
        },
        listening: {
          title: "Can you keep a secret?",
          transcript:
            "Girl: Nam, can you keep a secret?\nBoy: Yes, of course. What is it?\nGirl: Tomorrow is Lan's birthday. I am making her a card.\nBoy: That's a great idea! Can I help you?\nGirl: Yes, please. It's your turn to draw the flowers.\nBoy: OK. And we must not tell her, because it is a surprise.\nGirl: Exactly. Let's give her the card before the first lesson.\nBoy: Perfect. She will be so happy!",
          questions: [
            mcq(
              "Whose birthday is tomorrow?",
              "Ngày mai là sinh nhật của ai?",
              ["Lan's", "Nam's", "The teacher's", "The girl's"],
              0,
              "Bạn gái nói 'Tomorrow is Lan's birthday.' — ngày mai là sinh nhật Lan.",
              "Tomorrow is Lan's birthday.",
            ),
            mcq(
              "What does Nam draw on the card?",
              "Nam vẽ gì lên tấm thiệp?",
              ["The flowers", "A cake", "A big star", "A cat"],
              0,
              "Bạn gái nói 'It's your turn to draw the flowers.' — đến lượt Nam vẽ hoa.",
              "It's your turn to draw the flowers.",
            ),
            tf(
              "They will give Lan the card after school.",
              "Hai bạn sẽ tặng thiệp cho Lan sau giờ học.",
              false,
              "Chưa đúng nhé! Bạn gái nói 'Let's give her the card before the first lesson.' — tặng TRƯỚC tiết học đầu tiên, không phải sau giờ học.",
              "Let's give her the card before the first lesson.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh về người bạn thân của bé. Bạn ấy tên gì? Bạn ấy như thế nào? Hai bạn thường làm gì cùng nhau? Kể một lần bạn ấy giúp bé (dùng quá khứ đơn).",
        writingOutline:
          "1. Giới thiệu: My best friend is …\n2. Tính cách: He / She is kind and funny.\n3. Việc cùng làm: We sit at the same desk and we share our snacks.\n4. Bạn ấy giỏi gì: He / She is clever at …, so …\n5. Kỉ niệm: Last week I was sad, but my friend …",
        speaking: {
          sentences: [
            "My best friend is Hoa.",
            "We sit at the same desk.",
            "She always makes me laugh.",
            "We share our snacks every break time.",
            "A good friend never leaves you alone.",
          ],
          questions: [
            {
              question: "Who is your best friend?",
              sampleAnswer: "My best friend is Linh. We sit at the same desk at school.",
            },
            {
              question: "What do you do together?",
              sampleAnswer: "We play football at break time, and we share our snacks.",
            },
            {
              question: "How can you be a good friend?",
              sampleAnswer: "I can share my things, help with homework and never say unkind words.",
            },
          ],
        },
      },

      {
        topic: "Feelings",
        topicVi: "Cảm xúc mỗi ngày",
        icon: "😊",
        words: [
          word("happy", "/ˈhæpi/", "vui vẻ", "😊"),
          word("sad", "/sæd/", "buồn", "😢"),
          word("angry", "/ˈæŋɡri/", "tức giận", "😠"),
          word("excited", "/ɪkˈsaɪtɪd/", "háo hức", "🤩"),
          word("worried", "/ˈwʌrid/", "lo lắng", "😟"),
          word("proud", "/praʊd/", "tự hào", "🏅"),
          word("cry", "/kraɪ/", "khóc (quá khứ: cried)", "😭"),
          word("smile", "/smaɪl/", "mỉm cười", "🙂"),
          word("feel", "/fiːl/", "cảm thấy", "💭"),
          word("calm", "/kɑːm/", "bình tĩnh", "🧘"),
        ],
        sound: {
          letters: "ow",
          sound: "/aʊ/",
          hint: "'ow' trong cow, down đọc là âm ĐÔI /aʊ/: bắt đầu ở 'a' rồi trượt sang 'u', môi tròn dần — gần giống 'ao' tiếng Việt nhưng phải trượt liền một hơi. Trẻ Việt hay dừng ở 'ao' rồi quên phụ âm cuối: down phải bật /n/, đừng thành 'đao'.",
          words: [
            { word: "cow", meaning: "con bò", emoji: "🐄" },
            { word: "how", meaning: "như thế nào", emoji: "❓" },
            { word: "down", meaning: "xuống dưới", emoji: "⬇️" },
            { word: "brown", meaning: "màu nâu", emoji: "🟤" },
          ],
        },
        reading: {
          title: "How I feel",
          passage:
            "My name is Yen. Everybody feels different things every day, and that is fine. This morning I was excited, because we had a music lesson. Then I was worried, because I forgot my recorder. My teacher smiled and gave me one, so I felt calm again. At break time my little brother fell down and cried. I helped him, and Mum was proud of me. When I am angry, I count to ten slowly. When I am sad, I talk to my mum, and then I feel better.",
          translation:
            "Tớ tên là Yến. Ai cũng có nhiều cảm xúc khác nhau mỗi ngày, và điều đó hoàn toàn bình thường. Sáng nay tớ háo hức lắm, vì lớp có tiết Âm nhạc. Rồi tớ lo lắng, vì tớ quên mang sáo. Cô giáo mỉm cười và cho tớ mượn một cái, thế là tớ bình tĩnh lại. Giờ ra chơi, em trai tớ ngã và khóc. Tớ đỡ em dậy, và mẹ đã rất tự hào về tớ. Khi tức giận, tớ đếm chậm tới mười. Khi buồn, tớ tâm sự với mẹ, rồi tớ thấy dễ chịu hơn.",
          questions: [
            mcq(
              "Why was Yen excited this morning?",
              "Vì sao sáng nay Yến háo hức?",
              [
                "Because her class had a music lesson",
                "Because it was her birthday",
                "Because she got a present",
                "Because the weather was sunny",
              ],
              0,
              "Chữ 'because' chỉ rõ: 'I was excited, because we had a music lesson' — vì lớp có tiết Âm nhạc.",
              "This morning I was excited, because we had a music lesson.",
            ),
            mcq(
              "What did the teacher do when Yen forgot her recorder?",
              "Cô giáo đã làm gì khi Yến quên mang sáo?",
              [
                "She smiled and gave Yen one",
                "She was angry",
                "She sent Yen home",
                "She played the piano instead",
              ],
              0,
              "Bài viết 'My teacher smiled and gave me one' — cô cười và cho Yến mượn một cái sáo.",
              "My teacher smiled and gave me one",
            ),
            mcq(
              "What does Yen do when she is angry?",
              "Khi tức giận, Yến làm gì?",
              [
                "She counts to ten slowly",
                "She shouts loudly",
                "She cries",
                "She runs out of the room",
              ],
              0,
              "Bài viết 'When I am angry, I count to ten slowly.' — Yến đếm chậm tới mười cho bình tĩnh.",
              "When I am angry, I count to ten slowly.",
            ),
            tf(
              "Mum was proud because Yen helped her little brother.",
              "Mẹ tự hào vì Yến đã giúp em trai.",
              true,
              "Đúng rồi! Bài viết 'I helped him, and Mum was proud of me.' — Yến đỡ em dậy nên mẹ tự hào.",
              "I helped him, and Mum was proud of me.",
            ),
          ],
        },
        listening: {
          title: "What's the matter?",
          transcript:
            "Mum: You look sad today, Bao. What's the matter?\nBoy: My friend Long did not play with me at break time.\nMum: Oh dear. How do you feel now?\nBoy: I feel a bit angry, but I don't want to shout at him.\nMum: That's very good. Maybe he was busy or worried.\nBoy: Do you think so?\nMum: Yes. Talk to him tomorrow, and ask him kindly.\nBoy: OK, Mum. I feel happy again now. Thank you!",
          questions: [
            mcq(
              "Why is Bao sad?",
              "Vì sao Bảo buồn?",
              [
                "His friend did not play with him",
                "He lost his school bag",
                "He had a difficult test",
                "He is ill today",
              ],
              0,
              "Bảo kể 'My friend Long did not play with me at break time.' — giờ ra chơi bạn Long không chơi với bạn ấy.",
              "My friend Long did not play with me at break time.",
            ),
            mcq(
              "What does Mum tell Bao to do?",
              "Mẹ khuyên Bảo làm gì?",
              [
                "Talk to Long tomorrow",
                "Shout at Long",
                "Find a new friend",
                "Stay at home tomorrow",
              ],
              0,
              "Mẹ nói 'Talk to him tomorrow, and ask him kindly.' — hãy nói chuyện với bạn vào ngày mai và hỏi nhẹ nhàng.",
              "Talk to him tomorrow, and ask him kindly.",
            ),
            tf(
              "Bao wants to shout at his friend.",
              "Bảo muốn quát bạn của mình.",
              false,
              "Chưa đúng nhé! Bảo nói 'I feel a bit angry, but I don't want to shout at him.' — chữ 'but' cho biết bạn ấy KHÔNG muốn quát bạn.",
              "I feel a bit angry, but I don't want to shout at him.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh về cảm xúc của bé. Hôm nay bé cảm thấy thế nào? Điều gì làm bé vui? Điều gì làm bé lo? Khi buồn hoặc giận, bé làm gì để thấy dễ chịu hơn?",
        writingOutline:
          "1. Hôm nay: Today I feel happy / excited, because …\n2. Điều làm bé vui: I am happy when …\n3. Điều làm bé lo: I am worried when …\n4. Cách bé bình tĩnh lại: When I am angry, I count to ten.\n5. Kết: Then I feel better.",
        speaking: {
          sentences: [
            "Everybody feels different things every day.",
            "This morning I was excited.",
            "My teacher smiled, so I felt calm again.",
            "When I am angry, I count to ten slowly.",
            "I talk to my mum, and then I feel better.",
          ],
          questions: [
            {
              question: "How do you feel today?",
              sampleAnswer: "Today I feel happy, because my friend gave me a nice drawing.",
            },
            {
              question: "What makes you excited?",
              sampleAnswer: "A school trip makes me excited. I can't sleep the night before!",
            },
            {
              question: "What do you do when you are sad?",
              sampleAnswer: "When I am sad, I talk to my mum, and then I feel better.",
            },
          ],
        },
      },

      {
        topic: "Helping Others",
        topicVi: "Giúp đỡ mọi người",
        icon: "🤝",
        words: [
          word("neighbour", "/ˈneɪbə/", "hàng xóm", "🏘️"),
          word("carry", "/ˈkæri/", "xách, mang", "🎒"),
          word("tidy", "/ˈtaɪdi/", "dọn gọn gàng", "🧹"),
          word("water", "/ˈwɔːtə/", "tưới nước", "💦"),
          word("join", "/dʒɔɪn/", "tham gia", "🙋"),
          word("rubbish", "/ˈrʌbɪʃ/", "rác", "🗑️"),
          word("old", "/əʊld/", "già, cũ", "👵"),
          word("polite", "/pəˈlaɪt/", "lễ phép", "🙇"),
          word("everyone", "/ˈevriwʌn/", "mọi người", "👨‍👩‍👧‍👦"),
          word("thank", "/θæŋk/", "cảm ơn", "🙏"),
        ],
        sound: {
          letters: "oi",
          sound: "/ɔɪ/",
          hint: "'oi' là âm ĐÔI /ɔɪ/: bắt đầu ở 'o' môi tròn rồi trượt sang 'i' môi cười — giống 'oi' tiếng Việt nhưng dài hơn và phải trượt liền. Trẻ Việt hay nuốt phụ âm cuối: coin thành 'coi', point thành 'poi'. Nhớ bật rõ /n/ và /nt/.",
          words: [
            { word: "coin", meaning: "đồng xu", emoji: "🪙" },
            { word: "oil", meaning: "dầu ăn", emoji: "🫒" },
            { word: "join", meaning: "tham gia", emoji: "🙋" },
            { word: "point", meaning: "chỉ tay", emoji: "👉" },
          ],
        },
        reading: {
          title: "Clean-up day",
          passage:
            "On Saturday our class joined a clean-up day in the park. We picked up rubbish and put it in big bags. Then we watered the young trees near the gate. My friend Tuan carried the heavy bucket, because I am not very strong. An old woman said thank you to us, and she gave us cold water. We were hot and tired, but we were happy too. Our teacher told us that a small job becomes easy when everyone helps.",
          translation:
            "Thứ Bảy, lớp tớ tham gia ngày dọn vệ sinh ở công viên. Chúng tớ nhặt rác và bỏ vào những cái túi to. Sau đó cả lớp tưới nước cho mấy cây non gần cổng. Bạn Tuấn xách cái xô nặng, vì tớ không khoẻ lắm. Một bà cụ đã cảm ơn chúng tớ, bà còn cho cả lớp nước mát. Đứa nào cũng nóng và mệt, nhưng vui lắm. Cô giáo bảo rằng một việc nhỏ sẽ trở nên nhẹ nhàng khi mọi người cùng chung tay.",
          questions: [
            mcq(
              "What did the class do on Saturday?",
              "Thứ Bảy lớp đã làm gì?",
              [
                "They joined a clean-up day in the park",
                "They went to the beach",
                "They had a music lesson",
                "They visited a farm",
              ],
              0,
              "Câu đầu bài: 'On Saturday our class joined a clean-up day in the park.' — cả lớp tham gia ngày dọn vệ sinh ở công viên.",
              "On Saturday our class joined a clean-up day in the park.",
            ),
            mcq(
              "Why did Tuan carry the heavy bucket?",
              "Vì sao Tuấn xách cái xô nặng?",
              [
                "Because his friend is not very strong",
                "Because he likes water",
                "Because the teacher asked him",
                "Because he was thirsty",
              ],
              0,
              "Chữ 'because' chỉ rõ lí do: bạn kể chuyện nói 'I am not very strong' nên Tuấn xách hộ.",
              "My friend Tuan carried the heavy bucket, because I am not very strong.",
            ),
            mcq(
              "What did the old woman give the children?",
              "Bà cụ đã cho các bạn nhỏ cái gì?",
              ["Cold water", "Some sweets", "Yellow flowers", "A story book"],
              0,
              "Bài viết 'she gave us cold water' — bà cho cả lớp nước mát.",
              "she gave us cold water",
            ),
            tf(
              "The children were tired but happy.",
              "Các bạn nhỏ mệt nhưng vui.",
              true,
              "Đúng rồi! Bài viết 'We were hot and tired, but we were happy too.' — chữ 'but' nối hai cảm giác: mệt mà vẫn vui.",
              "We were hot and tired, but we were happy too.",
            ),
          ],
        },
        listening: {
          title: "Can I help you?",
          transcript:
            "Girl: Excuse me, can I help you? Those bags look heavy.\nWoman: Thank you, dear. Can you carry the small one?\nGirl: Yes, I can. Where do you live?\nWoman: I live in the blue house next to the shop. I'm your new neighbour.\nGirl: Nice to meet you! My name is Ha.\nWoman: What a polite girl! Would you like a mango?\nGirl: No, thank you. I must go home and tidy my room.\nWoman: Well done, Ha. See you tomorrow!",
          questions: [
            mcq(
              "What does Ha carry for the old woman?",
              "Hà xách giúp bà cụ cái gì?",
              ["The small bag", "The big bag", "Both bags", "A box of fruit"],
              0,
              "Bà cụ nhờ 'Can you carry the small one?' — 'the small one' là cái túi nhỏ, và Hà đồng ý.",
              "Can you carry the small one?",
            ),
            mcq(
              "Where does the old woman live?",
              "Bà cụ sống ở đâu?",
              [
                "In the blue house next to the shop",
                "In the yellow house near the park",
                "Above the shop",
                "In the same house as Ha",
              ],
              0,
              "Bà nói 'I live in the blue house next to the shop.' — bà ở ngôi nhà màu xanh cạnh cửa hàng.",
              "I live in the blue house next to the shop.",
            ),
            mcq(
              "Why must Ha go home?",
              "Vì sao Hà phải về nhà?",
              [
                "To tidy her room",
                "To do her homework",
                "To eat her dinner",
                "To watch a cartoon",
              ],
              0,
              "Hà nói 'I must go home and tidy my room.' — bạn ấy phải về dọn phòng.",
              "I must go home and tidy my room.",
            ),
          ],
        },
        writingPrompt:
          "Viết 4–5 câu tiếng Anh kể một lần bé giúp đỡ người khác. Bé giúp ai? Bé đã làm gì? Người đó nói gì? Bé cảm thấy thế nào sau đó?",
        writingOutline:
          "1. Khi nào: On Saturday / Last week I helped …\n2. Bé đã làm gì: I picked up rubbish. / I carried the bag.\n3. Ai đó nói gì: My neighbour said thank you.\n4. Cảm xúc: I was tired, but I was happy too.\n5. Bài học: A small job becomes easy when everyone helps.",
        speaking: {
          sentences: [
            "Our class joined a clean-up day in the park.",
            "We picked up rubbish and put it in big bags.",
            "My friend carried the heavy bucket.",
            "An old woman said thank you to us.",
            "We were tired, but we were happy too.",
          ],
          questions: [
            {
              question: "How do you help at home?",
              sampleAnswer: "I tidy my room and I help my mum wash the vegetables.",
            },
            {
              question: "Did you help someone last week?",
              sampleAnswer: "Yes. Last week I carried my grandma's bag, and she said thank you.",
            },
            {
              question: "How can your class help the park?",
              sampleAnswer: "We can pick up rubbish and water the young trees near the gate.",
            },
          ],
        },
      },
    ],
  },
];
