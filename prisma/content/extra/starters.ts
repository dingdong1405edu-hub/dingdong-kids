// Bài học BỔ SUNG cho cấp này — nối SAU danh sách gốc trong ../starters.ts.
//
// Tách file riêng để soạn thêm bài mà không phải mở file gốc (đã rất dài).
// ⚠️ Mỗi bài thêm ở đây PHẢI có một mục ngữ pháp tương ứng, ĐÚNG THỨ TỰ, trong
//    ../grammar/extra-starters.ts — nếu không `npm run content:check` sẽ báo lệch hàng.
//
// 2 chương × 3 bài = 6 bài (Chương 5 và Chương 6 của cấp STARTERS).
// Âm phonics tiếp nối 12 âm đã dạy ở file gốc (e·b·u·h·r·sh·w·l·j·th·ch·ng):
//   z · f · y · ck · x · v
// Ngữ pháp đi kèm: số nhiều -s/-es · have got/has got · this is/these are ·
//   I like / I don't like · he-she + động từ -s/-es · Can I have …, please?
import { type ChapterSeed, mcq, tf, word } from "../types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 5 · Con vật và khu vườn",
    subtitle: "Vườn thú, thú cưng và khu vườn nhỏ sau nhà bé",
    lessons: [
      // ─────────────────────────── Bài 13 ───────────────────────────
      {
        topic: "At the Zoo",
        topicVi: "Bé đi vườn thú",
        icon: "🦁",
        words: [
          word("zoo", "/zuː/", "vườn thú", "🏞️"),
          word("lion", "/ˈlaɪən/", "con sư tử", "🦁"),
          word("monkey", "/ˈmʌŋki/", "con khỉ", "🐒"),
          word("elephant", "/ˈelɪfənt/", "con voi", "🐘"),
          word("giraffe", "/dʒəˈræf/", "con hươu cao cổ", "🦒"),
          word("tiger", "/ˈtaɪɡər/", "con hổ", "🐯"),
          word("bird", "/bɜːrd/", "con chim", "🐦"),
        ],
        sound: {
          letters: "z",
          sound: "/z/",
          hint: "Âm /z/ có tiếng RUNG ở cổ: bé đặt tay lên cổ, đọc 'zoo' mà thấy rung là đúng. Trẻ Việt hay đọc thành /s/ (không rung) nên 'zoo' hoá ra 'su'. Nhớ thêm: đuôi -s số nhiều thường đọc là /z/ — 'lions' là /ˈlaɪənz/, 'birds' là /bɜːrdz/, phải nghe rõ tiếng rung ở cuối.",
          words: [
            // Từ ĐẦU TIÊN là từ mẫu hiện trên thẻ dạy âm → chọn từ BẮT ĐẦU bằng âm này.
            { word: "zoo", meaning: "vườn thú", emoji: "🏞️" },
            { word: "zebra", meaning: "con ngựa vằn", emoji: "🦓" },
            { word: "zero", meaning: "số không", emoji: "0️⃣" },
            // Từ mẫu cho /z/ giữa từ, viết bằng chữ 's' — đúng lỗi nêu trong `hint`.
            { word: "nose", meaning: "cái mũi", emoji: "👃" },
          ],
        },
        reading: {
          title: "My zoo day",
          passage:
            "On Sunday I go to the zoo with my dad. I see three big elephants and two funny monkeys. The monkeys eat bananas. A tall giraffe stands under a tree. Two lions sleep in the sun. I like the zebras best. They are black and white.",
          translation:
            "Chủ nhật tớ đi vườn thú với bố. Tớ nhìn thấy ba con voi to đùng và hai chú khỉ nghịch ngợm. Mấy chú khỉ đang ăn chuối. Một bạn hươu cao cổ đứng dưới gốc cây. Hai bạn sư tử nằm ngủ dưới nắng. Tớ thích mấy chú ngựa vằn nhất. Các bạn ấy có sọc đen và trắng.",
          questions: [
            mcq(
              "How many monkeys are there?",
              "Có mấy con khỉ?",
              ["One", "Two", "Three"],
              1,
              "Bài đọc viết 'two funny monkeys' — có hai chú khỉ. Ba là số con voi ('three big elephants').",
              "two funny monkeys",
            ),
            mcq(
              "What do the monkeys eat?",
              "Mấy chú khỉ ăn gì?",
              ["Bananas", "Leaves", "Fish"],
              0,
              "Câu 'The monkeys eat bananas.' cho biết khỉ đang ăn chuối.",
              "The monkeys eat bananas",
            ),
            tf(
              "The child likes the zebras best.",
              "Bạn nhỏ thích ngựa vằn nhất.",
              true,
              "Bài đọc viết 'I like the zebras best.' — trong cả vườn thú, bạn ấy thích ngựa vằn nhất.",
              "I like the zebras best",
            ),
          ],
        },
        listening: {
          title: "Look at the elephants!",
          transcript:
            "Dad: Look, Mai! The elephants are over there.\nGirl: Wow! They are very big.\nDad: Can you see the monkeys?\nGirl: Yes! One monkey is on the tree.\nDad: Now let's go and see the lions.\nGirl: Yes, please! I love lions.",
          questions: [
            mcq(
              "Where is the monkey?",
              "Chú khỉ đang ở đâu?",
              ["On the tree", "Under the tree", "In the water"],
              0,
              "Mai reo lên 'One monkey is on the tree.' — chú khỉ đang ở trên cây.",
              "One monkey is on the tree",
            ),
            mcq(
              "Which animal do they see next?",
              "Hai bố con đi xem con vật nào tiếp theo?",
              ["The lions", "The birds", "The zebras"],
              0,
              "Bố rủ 'Now let's go and see the lions.' — hai bố con đi xem sư tử.",
              "let's go and see the lions",
            ),
          ],
        },
        writingPrompt:
          "Viết 3–4 câu tiếng Anh về một chuyến đi vườn thú: bé đi với ai, bé nhìn thấy con gì, bé thích con nào nhất.",
        writingOutline:
          "1. Đi với ai: I go to the zoo with ...\n2. Nhìn thấy: I see two ... and three ...\n3. Tả con vật: The elephant is big.\n4. Thích nhất: I like the ... best.",
        speaking: {
          sentences: [
            "I go to the zoo with my dad.",
            "I can see three elephants.",
            "The monkeys eat bananas.",
            "I like the lions best.",
          ],
          questions: [
            { question: "Do you like the zoo?", sampleAnswer: "Yes, I like the zoo. It is very fun." },
            { question: "What animals can you see at the zoo?", sampleAnswer: "I can see lions, monkeys and two big elephants." },
            { question: "Which animal do you like best?", sampleAnswer: "I like the giraffe best. It is very tall." },
          ],
        },
      },

      // ─────────────────────────── Bài 14 ───────────────────────────
      {
        topic: "My Pet",
        topicVi: "Thú cưng của bé",
        icon: "🐶",
        words: [
          word("pet", "/pet/", "thú cưng", "🐾"),
          word("dog", "/dɔːɡ/", "con chó", "🐶"),
          word("cat", "/kæt/", "con mèo", "🐱"),
          word("fish", "/fɪʃ/", "con cá", "🐟"),
          word("rabbit", "/ˈræbɪt/", "con thỏ", "🐰"),
          word("feed", "/fiːd/", "cho ăn", "🍚"),
          word("funny", "/ˈfʌni/", "vui nhộn, buồn cười", "😄"),
        ],
        sound: {
          letters: "f",
          sound: "/f/",
          hint: "Răng trên chạm nhẹ môi dưới rồi THỔI hơi ra, cổ không rung — gần giống 'ph' trong 'phở' nhưng nhẹ hơn. Đừng đổi thành /p/: 'fish' không phải 'pít'. Khó nhất là /f/ ở CUỐI từ — 'leaf' phải nghe rõ hơi gió cuối, trẻ Việt hay nuốt mất thành 'li'.",
          words: [
            { word: "fish", meaning: "con cá", emoji: "🐟" },
            { word: "five", meaning: "số năm", emoji: "5️⃣" },
            { word: "frog", meaning: "con ếch", emoji: "🐸" },
            // Từ mẫu cho /f/ CUỐI từ — đúng lỗi nêu trong `hint`.
            { word: "leaf", meaning: "chiếc lá", emoji: "🍃" },
          ],
        },
        reading: {
          title: "My dog Bo",
          passage:
            "I have got a dog. His name is Bo. He is small and brown. Bo has got a long tail and four little feet. Every day I feed him at six. He runs after my ball in the garden. Bo is my funny best friend.",
          translation:
            "Tớ có một chú chó. Tên bạn ấy là Bo. Bo nhỏ xíu và có bộ lông màu nâu. Bo có cái đuôi dài và bốn bàn chân bé xíu. Ngày nào tớ cũng cho Bo ăn lúc sáu giờ. Bạn ấy chạy theo quả bóng của tớ ngoài vườn. Bo là người bạn thân vui nhộn của tớ.",
          questions: [
            mcq(
              "What colour is Bo?",
              "Bạn Bo màu gì?",
              ["Brown", "Black", "White"],
              0,
              "Bài đọc viết 'He is small and brown.' — Bo nhỏ và có màu nâu.",
              "He is small and brown",
            ),
            mcq(
              "When does the child feed Bo?",
              "Bạn nhỏ cho Bo ăn lúc mấy giờ?",
              ["At five", "At six", "At seven"],
              1,
              "Câu 'Every day I feed him at six.' cho biết ngày nào Bo cũng được ăn lúc sáu giờ.",
              "Every day I feed him at six",
            ),
            tf(
              "Bo has got a short tail.",
              "Bo có cái đuôi ngắn.",
              false,
              "Câu này SAI. Bài đọc viết 'Bo has got a long tail and four little feet.' — đuôi của Bo dài chứ không ngắn.",
              "Bo has got a long tail",
            ),
          ],
        },
        listening: {
          title: "Have you got a pet?",
          transcript:
            "Girl: Have you got a pet, Nam?\nBoy: Yes, I have got a cat. Her name is Mimi.\nGirl: Is she big?\nBoy: No, she is small and white. Have you got a pet?\nGirl: Yes, I have got two fish.\nBoy: Wow! I like fish.",
          questions: [
            mcq(
              "What pet has Nam got?",
              "Nam nuôi con vật gì?",
              ["A cat", "A dog", "A rabbit"],
              0,
              "Nam trả lời 'Yes, I have got a cat.' — bạn ấy nuôi một chú mèo tên Mimi.",
              "I have got a cat",
            ),
            mcq(
              "How many fish has the girl got?",
              "Bạn gái nuôi mấy con cá?",
              ["One", "Two", "Three"],
              1,
              "Bạn gái nói 'Yes, I have got two fish.' — bạn ấy nuôi hai chú cá.",
              "I have got two fish",
            ),
          ],
        },
        writingPrompt:
          "Viết 3–4 câu tiếng Anh về con vật bé nuôi (hoặc bé mơ ước nuôi): đó là con gì, tên gì, trông thế nào, bé chăm sóc ra sao.",
        writingOutline:
          "1. Bé có gì: I have got a ...\n2. Tên: Its name is ...\n3. Tả: It is small and brown.\n4. Chăm sóc: I feed it every day.",
        speaking: {
          sentences: [
            "I have got a small dog.",
            "His name is Bo.",
            "He has got a long tail.",
            "I feed my dog every day.",
          ],
          questions: [
            { question: "Have you got a pet?", sampleAnswer: "Yes, I have got a dog. His name is Bo." },
            { question: "What does your pet look like?", sampleAnswer: "My dog is small and brown. He has got a long tail." },
            { question: "What do you do for your pet?", sampleAnswer: "I feed him at six and I play with him in the garden." },
          ],
        },
      },

      // ─────────────────────────── Bài 15 ───────────────────────────
      {
        topic: "My Garden",
        topicVi: "Khu vườn của bé",
        icon: "🌻",
        words: [
          word("tree", "/triː/", "cái cây", "🌳"),
          word("grass", "/ɡræs/", "bãi cỏ", "🌱"),
          word("leaf", "/liːf/", "chiếc lá", "🍃"),
          word("bee", "/biː/", "con ong", "🐝"),
          word("butterfly", "/ˈbʌtərflaɪ/", "con bướm", "🦋"),
          word("yellow", "/ˈjeloʊ/", "màu vàng", "🟡"),
          word("water", "/ˈwɔːtər/", "tưới nước", "💧"),
        ],
        sound: {
          letters: "y",
          sound: "/j/",
          hint: "Chữ y ở ĐẦU từ đọc là /j/: lưỡi nâng gần vòm miệng rồi trượt nhanh sang nguyên âm — nghe như 'i-a' đọc thật nhanh. 'yellow' là /ˈjeloʊ/, KHÔNG phải 'de-lâu' hay 'gie-lâu'. Và nhớ đọc hết từ: 'yes' phải nghe rõ /s/ ở cuối.",
          words: [
            { word: "yellow", meaning: "màu vàng", emoji: "🟡" },
            { word: "yes", meaning: "vâng, đúng rồi", emoji: "✅" },
            { word: "you", meaning: "bạn", emoji: "🧒" },
            { word: "yo-yo", meaning: "con quay yo-yo", emoji: "🪀" },
          ],
        },
        reading: {
          title: "In my garden",
          passage:
            "My garden is behind my house. There are two green trees and a lot of yellow flowers. A little bee sits on a flower. A butterfly flies over the grass. Every morning I water the plants with my mum. Our garden is quiet and pretty.",
          translation:
            "Khu vườn của tớ ở phía sau nhà. Vườn có hai cây xanh và rất nhiều bông hoa vàng. Một chú ong nhỏ đậu trên bông hoa. Một chú bướm bay là là trên bãi cỏ. Sáng nào tớ cũng tưới cây cùng mẹ. Vườn nhà tớ yên tĩnh và xinh xắn.",
          questions: [
            mcq(
              "Where is the garden?",
              "Khu vườn ở đâu?",
              ["Behind the house", "In front of the house", "Next to the school"],
              0,
              "Câu đầu bài viết 'My garden is behind my house.' — 'behind' nghĩa là ở phía sau.",
              "My garden is behind my house",
            ),
            mcq(
              "What colour are the flowers?",
              "Những bông hoa màu gì?",
              ["Yellow", "Red", "White"],
              0,
              "Bài đọc viết 'a lot of yellow flowers' — vườn có rất nhiều hoa vàng. Màu xanh là màu của hai cái cây.",
              "a lot of yellow flowers",
            ),
            tf(
              "The bee is on a flower.",
              "Chú ong đậu trên một bông hoa.",
              true,
              "Bài đọc viết 'A little bee sits on a flower.' — 'sits on' là đậu ở trên, nên chú ong đang đậu trên bông hoa.",
              "A little bee sits on a flower",
            ),
          ],
        },
        listening: {
          title: "Can you help me in the garden?",
          transcript:
            "Mum: Linh, can you help me in the garden?\nGirl: Yes, Mum. What can I do?\nMum: Please water these yellow flowers.\nGirl: OK. Look, Mum! A butterfly!\nMum: It is beautiful. Now let's pick some leaves for the rabbit.\nGirl: Yes! I like our garden.",
          questions: [
            mcq(
              "What does Linh water?",
              "Linh tưới nước cho cái gì?",
              ["The yellow flowers", "The green trees", "The grass"],
              0,
              "Mẹ nhờ 'Please water these yellow flowers.' — Linh tưới cho những bông hoa vàng.",
              "Please water these yellow flowers",
            ),
            tf(
              "Linh sees a butterfly in the garden.",
              "Linh nhìn thấy một chú bướm trong vườn.",
              true,
              "Linh reo lên 'Look, Mum! A butterfly!' — bạn ấy vừa thấy một chú bướm.",
              "Look, Mum! A butterfly!",
            ),
          ],
        },
        writingPrompt:
          "Viết 3–4 câu tiếng Anh về khu vườn (hoặc chậu cây) của bé: vườn ở đâu, trong vườn có gì, bé làm gì ở đó.",
        writingOutline:
          "1. Vị trí: My garden is behind my house.\n2. Cây cối: There are two green trees.\n3. Con vật nhỏ: I can see a bee and a butterfly.\n4. Việc bé làm: I water the flowers every morning.",
        speaking: {
          sentences: [
            "This is my garden.",
            "These are yellow flowers.",
            "A butterfly flies over the grass.",
            "I water the plants with my mum.",
          ],
          questions: [
            { question: "Have you got a garden?", sampleAnswer: "Yes, I have got a small garden behind my house." },
            { question: "What can you see in your garden?", sampleAnswer: "I can see two green trees and a lot of yellow flowers." },
            { question: "What do you do in the garden?", sampleAnswer: "I water the flowers and I play with my cat." },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 6 · Bé giúp mẹ mỗi ngày",
    subtitle: "Món ăn bé thích, việc nhà và buổi đi chợ cùng mẹ",
    lessons: [
      // ─────────────────────────── Bài 16 ───────────────────────────
      {
        topic: "Food I Like",
        topicVi: "Món ăn bé thích",
        icon: "🍚",
        words: [
          word("rice", "/raɪs/", "cơm", "🍚"),
          word("chicken", "/ˈtʃɪkɪn/", "thịt gà", "🍗"),
          word("milk", "/mɪlk/", "sữa", "🥛"),
          word("apple", "/ˈæpl/", "quả táo", "🍎"),
          word("cake", "/keɪk/", "bánh ngọt", "🍰"),
          word("soup", "/suːp/", "món súp", "🍲"),
          word("hungry", "/ˈhʌŋɡri/", "đói bụng", "🤤"),
        ],
        sound: {
          letters: "ck",
          sound: "/k/",
          hint: "Hai chữ c-k đứng cạnh nhau chỉ đọc MỘT âm /k/, và luôn nằm ở giữa hoặc CUỐI từ, không bao giờ ở đầu. Trẻ Việt hay nuốt mất âm cuối: 'duck' thành 'đắc', 'snack' thành 'sờ-nác'. Bé phải bật rõ /k/ ở cuối rồi mới dừng lại.",
          words: [
            { word: "duck", meaning: "con vịt", emoji: "🦆" },
            { word: "chicken", meaning: "thịt gà", emoji: "🍗" },
            { word: "snack", meaning: "món ăn vặt", emoji: "🍪" },
            { word: "sock", meaning: "chiếc tất", emoji: "🧦" },
          ],
        },
        reading: {
          title: "Lunch at home",
          passage:
            "I am hungry! My mum cooks lunch for us. Today we have rice, chicken and hot soup. I like chicken very much, but I don't like fish. My sister likes apples. After lunch we eat a small cake. Yummy!",
          translation:
            "Tớ đói bụng quá! Mẹ tớ đang nấu bữa trưa cho cả nhà. Hôm nay nhà tớ có cơm, thịt gà và súp nóng. Tớ rất thích thịt gà, nhưng tớ không thích cá. Chị tớ thì thích táo. Ăn trưa xong cả nhà ăn một cái bánh ngọt nhỏ. Ngon ơi là ngon!",
          questions: [
            mcq(
              "What does the child like?",
              "Bạn nhỏ thích món gì?",
              ["Chicken", "Fish", "Bread"],
              0,
              "Bài đọc viết 'I like chicken very much' — bạn ấy rất thích thịt gà, còn cá thì không.",
              "I like chicken very much",
            ),
            mcq(
              "What does the sister like?",
              "Chị của bạn nhỏ thích gì?",
              ["Apples", "Cake", "Milk"],
              0,
              "Câu 'My sister likes apples.' cho biết chị ấy thích táo.",
              "My sister likes apples",
            ),
            tf(
              "The child likes fish.",
              "Bạn nhỏ thích ăn cá.",
              false,
              "Câu này SAI. Bài đọc viết 'I don't like fish.' — bạn ấy KHÔNG thích cá ('don't like' là không thích).",
              "I don't like fish",
            ),
          ],
        },
        listening: {
          title: "Are you hungry?",
          transcript:
            "Mum: Are you hungry, Nam?\nBoy: Yes, Mum. I am very hungry.\nMum: We have rice and chicken today.\nBoy: I like chicken! Can I have some milk too?\nMum: Yes, here you are.\nBoy: Thank you, Mum. It is yummy!",
          questions: [
            mcq(
              "What is for lunch today?",
              "Hôm nay bữa trưa có món gì?",
              ["Rice and chicken", "Soup and bread", "Fish and rice"],
              0,
              "Mẹ nói 'We have rice and chicken today.' — hôm nay có cơm và thịt gà.",
              "We have rice and chicken today",
            ),
            mcq(
              "What does Nam ask for?",
              "Nam xin thêm thứ gì?",
              ["Some milk", "Some juice", "Some water"],
              0,
              "Nam hỏi 'Can I have some milk too?' — bạn ấy xin thêm một chút sữa.",
              "Can I have some milk too?",
            ),
          ],
        },
        writingPrompt:
          "Viết 3–4 câu tiếng Anh về món ăn: món bé thích, món bé không thích, và bữa trưa hôm nay nhà bé có gì.",
        writingOutline:
          "1. Món thích: I like ...\n2. Món không thích: I don't like ...\n3. Bữa trưa: Today we have ...\n4. Cảm nghĩ: It is yummy!",
        speaking: {
          sentences: [
            "I am very hungry.",
            "I like chicken and rice.",
            "I don't like fish.",
            "My mum cooks lunch for us.",
          ],
          questions: [
            { question: "What food do you like?", sampleAnswer: "I like rice and chicken very much." },
            { question: "What food do you not like?", sampleAnswer: "I don't like fish, but I like eggs." },
            { question: "What do you have for lunch?", sampleAnswer: "Today I have rice, hot soup and a small cake." },
          ],
        },
      },

      // ─────────────────────────── Bài 17 ───────────────────────────
      {
        topic: "Helping at Home",
        topicVi: "Bé giúp việc nhà",
        icon: "🧹",
        words: [
          word("help", "/help/", "giúp đỡ", "🤝"),
          word("wash", "/wɑːʃ/", "rửa, giặt", "🧼"),
          word("clean", "/kliːn/", "lau dọn, sạch sẽ", "✨"),
          word("box", "/bɑːks/", "cái hộp", "📦"),
          word("dish", "/dɪʃ/", "cái đĩa", "🍽️"),
          word("tidy", "/ˈtaɪdi/", "gọn gàng", "🧹"),
          word("mix", "/mɪks/", "trộn, khuấy", "🥣"),
        ],
        sound: {
          letters: "x",
          sound: "/ks/",
          hint: "Chữ x ở cuối từ đọc thành HAI âm liền nhau /k/ + /s/, không phải 'x' của tiếng Việt. 'box' là /bɑːks/, 'six' là /sɪks/ — bé phải nghe rõ cả /k/ lẫn /s/, đừng nuốt bớt thành 'bốc' hay 'xích'.",
          words: [
            { word: "box", meaning: "cái hộp", emoji: "📦" },
            { word: "six", meaning: "số sáu", emoji: "6️⃣" },
            { word: "fox", meaning: "con cáo", emoji: "🦊" },
            { word: "mix", meaning: "trộn, khuấy", emoji: "🥣" },
          ],
        },
        reading: {
          title: "I help my mum",
          passage:
            "I help my mum every day. In the morning I make my bed. Then I put my toys in the big box. After dinner I wash six dishes with my dad. My little sister helps too. She mixes the cake with a spoon. We are a happy family.",
          translation:
            "Ngày nào tớ cũng giúp mẹ. Buổi sáng tớ tự gấp chăn gối trên giường. Sau đó tớ cất đồ chơi vào cái hộp to. Ăn tối xong tớ rửa sáu cái đĩa cùng bố. Em gái nhỏ của tớ cũng giúp nữa. Em ấy lấy thìa khuấy bột bánh. Nhà tớ vui lắm.",
          questions: [
            mcq(
              "What does the child do in the morning?",
              "Buổi sáng bạn nhỏ làm gì?",
              ["Makes the bed", "Washes the dishes", "Mixes the cake"],
              0,
              "Bài đọc viết 'In the morning I make my bed.' — buổi sáng bạn ấy dọn giường. Rửa bát là việc sau bữa tối.",
              "In the morning I make my bed",
            ),
            mcq(
              "How many dishes does the child wash?",
              "Bạn nhỏ rửa mấy cái đĩa?",
              ["Four", "Six", "Ten"],
              1,
              "Câu 'After dinner I wash six dishes with my dad.' cho biết bạn ấy rửa sáu cái đĩa.",
              "I wash six dishes with my dad",
            ),
            tf(
              "The little sister helps too.",
              "Em gái nhỏ cũng giúp việc nhà.",
              true,
              "Bài đọc viết 'My little sister helps too.' — em gái cũng cùng giúp, em ấy khuấy bột bánh.",
              "My little sister helps too",
            ),
          ],
        },
        listening: {
          title: "Can you help me, please?",
          transcript:
            "Mum: Mai, can you help me, please?\nGirl: Yes, Mum. What can I do?\nMum: Please put these toys in the box.\nGirl: OK. And then?\nMum: Then you can wash the apples.\nGirl: Yes, Mum. I like helping you.",
          questions: [
            mcq(
              "What does Mai put in the box?",
              "Mai cất thứ gì vào hộp?",
              ["The toys", "The books", "The dishes"],
              0,
              "Mẹ nhờ 'Please put these toys in the box.' — Mai cất đồ chơi vào hộp.",
              "Please put these toys in the box",
            ),
            mcq(
              "What does Mai wash?",
              "Mai rửa thứ gì?",
              ["The apples", "The dishes", "The car"],
              0,
              "Mẹ nói 'Then you can wash the apples.' — sau đó Mai rửa mấy quả táo.",
              "Then you can wash the apples",
            ),
          ],
        },
        writingPrompt:
          "Viết 3–4 câu tiếng Anh về việc bé giúp bố mẹ ở nhà: bé làm việc gì, làm lúc nào, ai làm cùng bé.",
        writingOutline:
          "1. Mở đầu: I help my mum every day.\n2. Buổi sáng: In the morning I make my bed.\n3. Việc khác: I put my toys in the box.\n4. Cùng ai: My sister helps too.",
        speaking: {
          sentences: [
            "I help my mum every day.",
            "I make my bed in the morning.",
            "I wash the dishes with my dad.",
            "My sister helps too.",
          ],
          questions: [
            { question: "Do you help your mum at home?", sampleAnswer: "Yes, I help my mum every day." },
            { question: "What jobs do you do at home?", sampleAnswer: "I make my bed and I put my toys in the box." },
            { question: "Who helps you at home?", sampleAnswer: "My little sister helps me. She is six." },
          ],
        },
      },

      // ─────────────────────────── Bài 18 ───────────────────────────
      {
        topic: "Shopping",
        topicVi: "Bé đi chợ cùng mẹ",
        icon: "🛒",
        words: [
          word("shop", "/ʃɑːp/", "cửa hàng", "🏪"),
          word("market", "/ˈmɑːrkɪt/", "chợ", "🛒"),
          word("buy", "/baɪ/", "mua", "🛍️"),
          word("money", "/ˈmʌni/", "tiền", "💵"),
          word("bread", "/bred/", "bánh mì", "🍞"),
          word("banana", "/bəˈnænə/", "quả chuối", "🍌"),
          word("vegetables", "/ˈvedʒtəblz/", "rau củ", "🥦"),
          word("basket", "/ˈbæskɪt/", "cái giỏ", "🧺"),
        ],
        sound: {
          letters: "v",
          sound: "/v/",
          hint: "Răng trên chạm môi dưới giống /f/, nhưng cổ họng PHẢI RUNG — bé đặt tay lên cổ, đọc 'van' thấy rung mới đúng. Đừng đổi /v/ thành /f/. Và /v/ ở CUỐI từ phải nghe rõ: 'five', 'love' — trẻ Việt hay bỏ mất âm cuối này.",
          words: [
            { word: "van", meaning: "xe tải nhỏ", emoji: "🚐" },
            { word: "vase", meaning: "cái lọ hoa", emoji: "🏺" },
            { word: "five", meaning: "số năm", emoji: "5️⃣" },
            { word: "seven", meaning: "số bảy", emoji: "7️⃣" },
          ],
        },
        reading: {
          title: "At the market",
          passage:
            "On Saturday my mum and I go to the market. It is big and busy. Mum buys bread, eggs and green vegetables. I carry the basket. Then I buy five yellow bananas with my money. The shop lady is very kind. She gives me a small apple.",
          translation:
            "Thứ bảy hai mẹ con tớ đi chợ. Chợ rộng và đông vui lắm. Mẹ mua bánh mì, trứng và rau xanh. Tớ xách cái giỏ. Rồi tớ dùng tiền của mình mua năm quả chuối vàng. Cô bán hàng hiền lắm. Cô còn cho tớ một quả táo nhỏ nữa.",
          questions: [
            mcq(
              "What does the child buy?",
              "Bạn nhỏ mua gì?",
              ["Five bananas", "Five apples", "Some bread"],
              0,
              "Bài đọc viết 'Then I buy five yellow bananas with my money.' — bạn ấy mua năm quả chuối. Bánh mì là mẹ mua.",
              "I buy five yellow bananas with my money",
            ),
            mcq(
              "Who carries the basket?",
              "Ai là người xách giỏ?",
              ["The child", "Mum", "The shop lady"],
              0,
              "Câu 'I carry the basket.' cho biết chính bạn nhỏ xách giỏ.",
              "I carry the basket",
            ),
            tf(
              "The shop lady gives the child an apple.",
              "Cô bán hàng cho bạn nhỏ một quả táo.",
              true,
              "Bài đọc viết 'She gives me a small apple.' — cô bán hàng tặng bạn nhỏ một quả táo nhỏ.",
              "She gives me a small apple",
            ),
          ],
        },
        listening: {
          title: "Can I have some bananas?",
          transcript:
            "Mum: What do you want, Linh?\nGirl: Can I have some bananas, please?\nMum: Yes. How many bananas?\nGirl: Five, please. And a big apple.\nMum: Here you are. Now can you carry the basket?\nGirl: Yes, Mum. It is not heavy.",
          questions: [
            mcq(
              "How many bananas does Linh want?",
              "Linh muốn mua mấy quả chuối?",
              ["Three", "Five", "Seven"],
              1,
              "Mẹ hỏi 'How many bananas?' và Linh đáp 'Five, please.' — bạn ấy muốn năm quả.",
              "Five, please",
            ),
            mcq(
              "What else does Linh want?",
              "Linh còn muốn mua gì nữa?",
              ["A big apple", "A small cake", "Some bread"],
              0,
              "Linh nói thêm 'And a big apple.' — bạn ấy muốn thêm một quả táo to.",
              "And a big apple",
            ),
          ],
        },
        writingPrompt:
          "Viết 3–4 câu tiếng Anh về một buổi đi chợ: bé đi với ai, mẹ mua gì, bé mua gì, bé thấy chợ thế nào.",
        writingOutline:
          "1. Đi với ai: I go to the market with my mum.\n2. Mẹ mua: Mum buys bread and eggs.\n3. Bé mua: I buy five bananas.\n4. Cảm nghĩ: I like the market. It is busy.",
        speaking: {
          sentences: [
            "I go to the market with my mum.",
            "Mum buys bread and vegetables.",
            "Can I have five bananas, please?",
            "Thank you very much.",
          ],
          questions: [
            { question: "Where do you buy your food?", sampleAnswer: "My mum and I buy our food at the market near my house." },
            { question: "What do you buy at the market?", sampleAnswer: "I buy bananas, apples and some bread." },
            { question: "How do you ask for something in a shop?", sampleAnswer: "I say: Can I have some bread, please?" },
          ],
        },
      },
    ],
  },
];
