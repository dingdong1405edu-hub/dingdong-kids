// Nội dung bài học cấp `starters` (6–7 tuổi · Cambridge YLE Starters · Pre-A1).
// Xem hợp đồng + hướng dẫn soạn theo cấp ở prisma/content/types.ts.
//
// 4 chương × 3 bài = 12 bài. Âm phonics đi theo thứ tự:
//   e · b · u · h · r · sh · w · l · j · th · ch · ng
// Ngữ pháp xuất hiện tự nhiên: to be, this/that, số nhiều -s, have got, can/can't,
// giới từ chỉ nơi chốn in / on / under / next to / behind.
import { type ChapterSeed, mcq, tf, word } from "./types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 1 · Ngày của bé",
    subtitle: "Trường lớp, bạn bè và một ngày bận rộn của bé",
    lessons: [
      // ─────────────────────────── Bài 1 ───────────────────────────
      {
        topic: "At School",
        topicVi: "Bé đến trường",
        icon: "🏫",
        words: [
          word("school", "/skuːl/", "trường học", "🏫"),
          word("teacher", "/ˈtiːtʃər/", "cô giáo, thầy giáo", "👩‍🏫"),
          word("friend", "/frend/", "bạn, người bạn", "🧒"),
          word("pen", "/pen/", "cái bút mực", "🖊️"),
          word("desk", "/desk/", "cái bàn học", "🪑"),
          word("book", "/bʊk/", "quyển sách", "📖"),
          word("bag", "/bæɡ/", "cái cặp sách", "🎒"),
        ],
        sound: {
          letters: "e",
          sound: "/e/",
          hint: "Âm /e/ ngắn và gọn, miệng mở vừa phải — gần giống 'e' của tiếng Việt nhưng ngắn hơn, đừng kéo dài. Quan trọng nhất: đọc RÕ phụ âm cuối. 'pen' phải nghe thấy /n/, 'desk' phải nghe thấy /sk/, đừng nuốt mất thành 'pe' hay 'đét'.",
          words: [
            // Từ ĐẦU TIÊN là từ mẫu hiện trên thẻ dạy âm → chọn từ BẮT ĐẦU bằng âm này.
            { word: "egg", meaning: "quả trứng", emoji: "🥚" },
            { word: "pen", meaning: "cái bút mực", emoji: "🖊️" },
            { word: "desk", meaning: "cái bàn học", emoji: "🪑" },
            { word: "ten", meaning: "số mười", emoji: "🔟" },
            { word: "red", meaning: "màu đỏ", emoji: "🟥" },
          ],
        },
        reading: {
          title: "My school",
          passage:
            "This is my school. It is big and yellow. My teacher is Miss Lan. She is kind. My friend Nam sits next to me. My book and my pen are on the desk. My bag is under the desk. I like school!",
          translation:
            "Đây là trường của tớ. Trường to và sơn màu vàng. Cô giáo của tớ là cô Lan. Cô rất hiền. Bạn Nam ngồi cạnh tớ. Sách và bút của tớ ở trên bàn. Cặp của tớ ở dưới gầm bàn. Tớ thích đi học lắm!",
          questions: [
            mcq(
              "Where is the bag?",
              "Cái cặp ở đâu?",
              ["On the desk", "Under the desk", "Next to Nam"],
              1,
              "Bài đọc viết 'My bag is under the desk.' — 'under' nghĩa là ở dưới, nên cặp nằm dưới gầm bàn. Trên bàn là sách và bút.",
              "My bag is under the desk",
            ),
            mcq(
              "What colour is the school?",
              "Trường học màu gì?",
              ["Red", "Yellow", "Blue"],
              1,
              "Câu 'It is big and yellow.' cho biết trường vừa to vừa màu vàng ('yellow').",
              "It is big and yellow",
            ),
            tf(
              "Nam is my friend.",
              "Nam là bạn của tớ.",
              true,
              "Bài đọc viết 'My friend Nam sits next to me.' — Nam đúng là bạn và ngồi ngay cạnh tớ.",
              "My friend Nam sits next to me",
            ),
          ],
        },
        listening: {
          title: "Good morning, Miss Lan!",
          transcript:
            "Teacher: Good morning, children!\nGirl: Good morning, Miss Lan!\nTeacher: Nam, where is your book?\nBoy: It is in my bag.\nTeacher: Please put it on your desk.\nBoy: Yes, Miss Lan.",
          questions: [
            mcq(
              "Where is Nam's book now?",
              "Sách của Nam đang ở đâu?",
              ["In his bag", "On the desk", "Under the chair"],
              0,
              "Nam trả lời cô: 'It is in my bag.' — sách vẫn đang ở trong cặp.",
              "It is in my bag",
            ),
            mcq(
              "Where does the teacher want the book?",
              "Cô giáo muốn để sách ở đâu?",
              ["On the desk", "In the bag", "Under the desk"],
              0,
              "Cô nói 'Please put it on your desk.' — cô muốn Nam đặt sách lên bàn.",
              "Please put it on your desk",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về trường của bé: trường trông thế nào, cô giáo là ai, bạn thân của bé tên gì.",
        writingOutline:
          "1. Giới thiệu: This is my school.\n2. Tả trường: It is big. / It is yellow.\n3. Cô giáo: My teacher is ...\n4. Bạn: My friend is ...",
        speaking: {
          sentences: [
            "This is my school.",
            "My teacher is kind.",
            "My book is on the desk.",
            "I like school.",
          ],
          questions: [
            { question: "What is your teacher's name?", sampleAnswer: "My teacher is Miss Lan." },
            { question: "Who is your friend at school?", sampleAnswer: "My friend is Nam. He sits next to me." },
            { question: "Do you like school?", sampleAnswer: "Yes, I like school. It is fun." },
          ],
        },
      },

      // ─────────────────────────── Bài 2 ───────────────────────────
      {
        topic: "My Classroom",
        topicVi: "Lớp học của bé",
        icon: "🖍️",
        words: [
          word("classroom", "/ˈklæsruːm/", "lớp học", "🧑‍🏫"),
          word("board", "/bɔːrd/", "cái bảng", "📋"),
          word("chair", "/tʃer/", "cái ghế", "🪑"),
          word("door", "/dɔːr/", "cửa ra vào", "🚪"),
          word("window", "/ˈwɪndoʊ/", "cửa sổ", "🪟"),
          word("clock", "/klɑːk/", "đồng hồ treo tường", "🕐"),
          word("pencil", "/ˈpensl/", "bút chì", "✏️"),
          word("ruler", "/ˈruːlər/", "thước kẻ", "📏"),
        ],
        sound: {
          letters: "b",
          sound: "/b/",
          hint: "Mím chặt hai môi rồi bật ra, cổ họng có rung. Âm /b/ đầu từ giống 'b' tiếng Việt nên bé đọc dễ. Điều phải nhớ là đọc hết cả từ: 'bag' nghe rõ /ɡ/, 'book' nghe rõ /k/ — đừng nuốt phụ âm cuối thành 'ba', 'bu'.",
          words: [
            { word: "book", meaning: "quyển sách", emoji: "📖" },
            { word: "bag", meaning: "cái cặp sách", emoji: "🎒" },
            { word: "bin", meaning: "thùng rác", emoji: "🗑️" },
            { word: "ball", meaning: "quả bóng", emoji: "⚽" },
          ],
        },
        reading: {
          title: "In my classroom",
          passage:
            "This is my classroom. The board is big and green. The clock is on the wall, next to the window. My chair is next to the door. My pencil and my ruler are in my bag. Our classroom is clean and bright.",
          translation:
            "Đây là lớp học của tớ. Cái bảng to và màu xanh lá. Đồng hồ treo trên tường, ngay cạnh cửa sổ. Ghế của tớ ở cạnh cửa ra vào. Bút chì và thước kẻ của tớ ở trong cặp. Lớp tớ sạch sẽ và sáng sủa.",
          questions: [
            mcq(
              "What colour is the board?",
              "Cái bảng màu gì?",
              ["Green", "Blue", "Brown"],
              0,
              "Câu 'The board is big and green.' nói bảng vừa to vừa màu xanh lá ('green').",
              "The board is big and green",
            ),
            mcq(
              "Where is the clock?",
              "Đồng hồ ở đâu?",
              ["On the wall", "On the desk", "Under the chair"],
              0,
              "Bài đọc viết 'The clock is on the wall, next to the window.' — 'on the wall' là treo trên tường.",
              "The clock is on the wall",
            ),
            tf(
              "The ruler is in the bag.",
              "Thước kẻ ở trong cặp.",
              true,
              "Câu 'My pencil and my ruler are in my bag.' cho biết cả bút chì lẫn thước đều nằm trong cặp.",
              "My pencil and my ruler are in my bag",
            ),
          ],
        },
        listening: {
          title: "Where is my pencil?",
          transcript:
            "Teacher: Good morning! Please sit on your chairs.\nGirl: Miss Lan, where is my pencil?\nTeacher: Look under your desk, Mai.\nGirl: Oh, it is under my chair! Thank you.\nTeacher: Now open your books, please.\nBoy: Yes, Miss Lan.",
          questions: [
            mcq(
              "Where is Mai's pencil?",
              "Bút chì của Mai ở đâu?",
              ["Under the chair", "On the desk", "In the bag"],
              0,
              "Mai reo lên 'Oh, it is under my chair!' — bút chì rơi xuống dưới ghế chứ không phải dưới bàn.",
              "it is under my chair",
            ),
            tf(
              "The children open their books.",
              "Các bạn mở sách ra.",
              true,
              "Cô giáo bảo 'Now open your books, please.' nên các bạn mở sách ra.",
              "Now open your books, please",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về lớp học của bé: trong lớp có gì, đồ vật đó ở đâu, bé ngồi chỗ nào.",
        writingOutline:
          "1. Giới thiệu: This is my classroom.\n2. Đồ vật: The board is ... / The clock is ...\n3. Vị trí: My chair is next to ...\n4. Cảm nghĩ: I like my classroom.",
        speaking: {
          sentences: [
            "This is my classroom.",
            "The board is green.",
            "The clock is on the wall.",
            "I sit next to the window.",
          ],
          questions: [
            { question: "What is in your classroom?", sampleAnswer: "My classroom has a big board, a clock and ten desks." },
            { question: "Where do you sit in your classroom?", sampleAnswer: "I sit next to the window." },
            { question: "What colour is your classroom door?", sampleAnswer: "My classroom door is brown." },
          ],
        },
      },

      // ─────────────────────────── Bài 3 ───────────────────────────
      {
        topic: "My Day",
        topicVi: "Một ngày của bé",
        icon: "🌞",
        words: [
          word("morning", "/ˈmɔːrnɪŋ/", "buổi sáng", "🌅"),
          word("get up", "/ɡet ʌp/", "thức dậy", "🛌"),
          word("breakfast", "/ˈbrekfəst/", "bữa sáng", "🥣"),
          word("lunch", "/lʌntʃ/", "bữa trưa", "🍱"),
          word("dinner", "/ˈdɪnər/", "bữa tối", "🍛"),
          word("homework", "/ˈhoʊmwɜːrk/", "bài tập về nhà", "📝"),
          word("night", "/naɪt/", "buổi tối, ban đêm", "🌙"),
        ],
        sound: {
          letters: "u",
          sound: "/ʌ/",
          hint: "Âm /ʌ/ rất NGẮN, miệng mở nhỏ, bật ra một cái rồi dừng — gần giống 'ă' tiếng Việt, không phải 'u'. Bé đừng kéo dài thành 'uu'. Và nhớ phụ âm cuối: 'lunch' phải nghe rõ /tʃ/, 'sun' phải nghe rõ /n/.",
          words: [
            { word: "up", meaning: "lên trên", emoji: "⬆️" },
            { word: "sun", meaning: "mặt trời", emoji: "☀️" },
            { word: "lunch", meaning: "bữa trưa", emoji: "🍱" },
            { word: "run", meaning: "chạy", emoji: "🏃" },
          ],
        },
        reading: {
          title: "My busy day",
          passage:
            "I get up at six in the morning. I have breakfast with my mum. At seven I go to school. I have lunch at school with my friends. In the afternoon I do my homework. My family has dinner at six. At night I say good night to my mum and dad.",
          translation:
            "Tớ thức dậy lúc sáu giờ sáng. Tớ ăn sáng cùng mẹ. Bảy giờ tớ đi học. Tớ ăn trưa ở trường với các bạn. Buổi chiều tớ làm bài tập về nhà. Cả nhà tớ ăn tối lúc sáu giờ. Buổi tối tớ chúc bố mẹ ngủ ngon.",
          questions: [
            mcq(
              "When does the child get up?",
              "Bạn nhỏ thức dậy lúc mấy giờ?",
              ["At six", "At seven", "At eight"],
              0,
              "Câu đầu bài viết 'I get up at six in the morning.' — sáu giờ sáng là lúc bạn ấy dậy. Bảy giờ mới là lúc đi học.",
              "I get up at six in the morning",
            ),
            mcq(
              "Where does the child have lunch?",
              "Bạn nhỏ ăn trưa ở đâu?",
              ["At home", "At school", "In the park"],
              1,
              "Bài đọc viết 'I have lunch at school with my friends.' — bạn ấy ăn trưa ở trường cùng các bạn.",
              "I have lunch at school with my friends",
            ),
            tf(
              "The child does homework in the morning.",
              "Bạn nhỏ làm bài tập vào buổi sáng.",
              false,
              "Câu này SAI. Bài đọc viết 'In the afternoon I do my homework.' — bạn ấy làm bài tập vào buổi CHIỀU, không phải buổi sáng.",
              "In the afternoon I do my homework",
            ),
          ],
        },
        listening: {
          title: "Wake up, Mai!",
          transcript:
            "Mum: Wake up, Mai! It is seven o'clock.\nGirl: Good morning, Mum. I am tired.\nMum: Come and have breakfast. We have eggs and milk.\nGirl: Yummy! Can I have some bread too?\nMum: Yes. Then put your books in your bag.\nGirl: OK, Mum. I love school!",
          questions: [
            mcq(
              "What time is it?",
              "Bây giờ là mấy giờ?",
              ["Six o'clock", "Seven o'clock", "Eight o'clock"],
              1,
              "Mẹ gọi Mai dậy và nói 'It is seven o'clock.' — bảy giờ rồi.",
              "It is seven o'clock",
            ),
            mcq(
              "What is for breakfast?",
              "Bữa sáng có món gì?",
              ["Eggs and milk", "Rice and fish", "Cake and juice"],
              0,
              "Mẹ nói 'We have eggs and milk.' — bữa sáng có trứng và sữa (Mai xin thêm bánh mì).",
              "We have eggs and milk",
            ),
          ],
        },
        writingPrompt:
          "Viết 3–4 câu tiếng Anh kể một ngày của bé: buổi sáng bé làm gì, buổi trưa ăn ở đâu, buổi tối bé làm gì.",
        writingOutline:
          "1. Sáng: I get up at ...\n2. Ăn sáng: I have breakfast with ...\n3. Trưa: I have lunch at school.\n4. Tối: I do my homework. I go to bed at ...",
        speaking: {
          sentences: [
            "I get up at six.",
            "I have breakfast with my mum.",
            "I go to school at seven.",
            "I do my homework in the afternoon.",
          ],
          questions: [
            { question: "What time do you get up?", sampleAnswer: "I get up at six o'clock." },
            { question: "What do you have for breakfast?", sampleAnswer: "I have bread and milk for breakfast." },
            { question: "What do you do after school?", sampleAnswer: "I do my homework and I play with my sister." },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 2 · Nhà và đồ vật",
    subtitle: "Ngôi nhà, căn phòng và quần áo của bé",
    lessons: [
      // ─────────────────────────── Bài 4 ───────────────────────────
      {
        topic: "My House",
        topicVi: "Ngôi nhà của bé",
        icon: "🏠",
        words: [
          word("house", "/haʊs/", "ngôi nhà", "🏠"),
          word("kitchen", "/ˈkɪtʃɪn/", "nhà bếp", "🍳"),
          word("bathroom", "/ˈbæθruːm/", "phòng tắm", "🛁"),
          word("garden", "/ˈɡɑːrdn/", "khu vườn", "🌳"),
          word("sofa", "/ˈsoʊfə/", "ghế sofa", "🛋️"),
          word("table", "/ˈteɪbl/", "cái bàn ăn", "🍽️"),
          word("TV", "/ˌtiː ˈviː/", "ti vi", "📺"),
          word("flower", "/ˈflaʊər/", "bông hoa", "🌸"),
        ],
        sound: {
          letters: "h",
          sound: "/h/",
          hint: "Âm /h/ chỉ là hơi thở nhẹ bật ra, KHÔNG có tiếng rung ở cổ — nhẹ hơn 'h' tiếng Việt nhiều. Bé đặt bàn tay trước miệng, đọc 'hat' mà thấy hơi ấm là đúng. Và nhớ đọc rõ đuôi: 'hand' phải nghe thấy /d/.",
          words: [
            { word: "house", meaning: "ngôi nhà", emoji: "🏠" },
            { word: "hat", meaning: "cái mũ", emoji: "🎩" },
            { word: "hand", meaning: "bàn tay", emoji: "✋" },
            { word: "hot", meaning: "nóng", emoji: "🔥" },
          ],
        },
        reading: {
          title: "Welcome to my house",
          passage:
            "My house is small and white. In the kitchen my mum makes hot soup. The sofa and the TV are in the living room. My dad reads on the sofa. We eat at a big table. Behind the house we have a garden with red flowers. I love my house.",
          translation:
            "Nhà tớ nhỏ và màu trắng. Trong bếp, mẹ tớ nấu món súp nóng hổi. Ghế sofa và ti vi ở phòng khách. Bố tớ ngồi đọc sách trên sofa. Cả nhà ăn cơm ở cái bàn to. Phía sau nhà có một khu vườn với những bông hoa đỏ. Tớ yêu ngôi nhà của mình.",
          questions: [
            mcq(
              "Where is the TV?",
              "Cái ti vi ở đâu?",
              ["Kitchen", "Living room", "Garden"],
              1,
              "Bài đọc viết 'The sofa and the TV are in the living room.' — ti vi ở phòng khách, còn trong bếp thì mẹ đang nấu súp.",
              "The sofa and the TV are in the living room",
            ),
            mcq(
              "What colour are the flowers?",
              "Những bông hoa màu gì?",
              ["Red", "White", "Yellow"],
              0,
              "Câu 'a garden with red flowers' cho biết vườn có hoa màu đỏ. Màu trắng là màu của ngôi nhà.",
              "a garden with red flowers",
            ),
            tf(
              "The house is big.",
              "Ngôi nhà rất to.",
              false,
              "Câu này SAI. Câu đầu bài viết 'My house is small and white.' — nhà nhỏ chứ không to.",
              "My house is small and white",
            ),
          ],
        },
        listening: {
          title: "Where is my ball?",
          transcript:
            "Boy: Mum, where is my ball?\nMum: Is it in the kitchen?\nBoy: No, it is not. I can see the cat there.\nMum: Look in the bathroom, next to the door.\nBoy: Yes! It is here. Thank you, Mum!\nMum: Now please put your shoes in the box.",
          questions: [
            mcq(
              "Where is the ball?",
              "Quả bóng ở đâu?",
              ["In the kitchen", "In the bathroom", "In the garden"],
              1,
              "Mẹ bảo tìm trong phòng tắm và bạn nhỏ reo lên 'Yes! It is here.' — quả bóng ở trong phòng tắm.",
              "Look in the bathroom, next to the door",
            ),
            mcq(
              "What is in the kitchen?",
              "Trong bếp có gì?",
              ["The cat", "The ball", "The sofa"],
              0,
              "Bạn nhỏ nói 'I can see the cat there.' khi nhìn vào bếp — trong bếp có con mèo, không có quả bóng.",
              "I can see the cat there",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về ngôi nhà của bé: nhà to hay nhỏ, trong nhà có phòng gì, bé thích phòng nào nhất.",
        writingOutline:
          "1. Giới thiệu: This is my house.\n2. Tả nhà: It is small. / It is big.\n3. Các phòng: We have a kitchen and a ...\n4. Yêu thích: I like my ... best.",
        speaking: {
          sentences: [
            "My house is small.",
            "The sofa is in the living room.",
            "My mum cooks in the kitchen.",
            "We have a garden with flowers.",
          ],
          questions: [
            { question: "Is your house big or small?", sampleAnswer: "My house is small, but it is very nice." },
            { question: "What is in your kitchen?", sampleAnswer: "My kitchen has a table and four chairs." },
            { question: "Do you have a garden?", sampleAnswer: "Yes, I have a small garden with green trees." },
          ],
        },
      },

      // ─────────────────────────── Bài 5 ───────────────────────────
      {
        topic: "My Room",
        topicVi: "Căn phòng của bé",
        icon: "🛏️",
        words: [
          word("bed", "/bed/", "cái giường", "🛏️"),
          word("pillow", "/ˈpɪloʊ/", "cái gối", "🛌"),
          word("lamp", "/læmp/", "đèn bàn", "💡"),
          word("teddy bear", "/ˈtedi ber/", "gấu bông", "🧸"),
          word("toy box", "/ˈtɔɪ bɑːks/", "hộp đồ chơi", "📦"),
          word("shelf", "/ʃelf/", "cái kệ", "🗄️"),
          word("robot", "/ˈroʊbɑːt/", "rô bốt", "🤖"),
        ],
        sound: {
          letters: "r",
          sound: "/r/",
          hint: "Môi tròn lại, lưỡi cong lên nhưng KHÔNG chạm vòm miệng và KHÔNG rung như 'r' tiếng Việt. Khó nhất là /r/ ở CUỐI từ: 'car', 'teacher', 'four' — trẻ Việt hay bỏ mất. Nhớ cong lưỡi thêm một chút ở cuối từ.",
          words: [
            { word: "rug", meaning: "tấm thảm", emoji: "🟫" },
            { word: "red", meaning: "màu đỏ", emoji: "🟥" },
            { word: "robot", meaning: "rô bốt", emoji: "🤖" },
            { word: "rain", meaning: "mưa", emoji: "🌧️" },
            // Từ mẫu cho /r/ CUỐI từ — đúng lỗi nêu trong `hint`.
            { word: "car", meaning: "xe ô tô", emoji: "🚗" },
          ],
        },
        reading: {
          title: "This is my room",
          passage:
            "This is my room. My bed is next to the window. A soft pillow is on my bed. My teddy bear sleeps on the pillow. My red lamp is on a small shelf. All my toys are in the toy box under the shelf. My robot is my best toy.",
          translation:
            "Đây là phòng của tớ. Giường của tớ kê cạnh cửa sổ. Trên giường có một chiếc gối êm. Bạn gấu bông ngủ trên gối. Chiếc đèn đỏ của tớ đặt trên cái kệ nhỏ. Tất cả đồ chơi nằm trong hộp đồ chơi ở dưới kệ. Rô bốt là món đồ chơi tớ thích nhất.",
          questions: [
            mcq(
              "Where is the teddy bear?",
              "Bạn gấu bông ở đâu?",
              ["On the pillow", "Under the bed", "In the box"],
              0,
              "Bài đọc viết 'My teddy bear sleeps on the pillow.' — gấu bông nằm ngủ trên chiếc gối.",
              "My teddy bear sleeps on the pillow",
            ),
            mcq(
              "What colour is the lamp?",
              "Chiếc đèn màu gì?",
              ["Red", "Blue", "Green"],
              0,
              "Câu 'My red lamp is on a small shelf.' cho biết đèn màu đỏ ('red').",
              "My red lamp is on a small shelf",
            ),
            tf(
              "The toy box is under the shelf.",
              "Hộp đồ chơi ở dưới cái kệ.",
              true,
              "Câu này ĐÚNG. Bài đọc viết 'All my toys are in the toy box under the shelf.' — hộp đồ chơi nằm dưới kệ.",
              "in the toy box under the shelf",
            ),
          ],
        },
        listening: {
          title: "Let's tidy the room",
          transcript:
            "Mum: Mai, your room is a mess!\nGirl: Sorry, Mum. I can clean it now.\nMum: Good girl. Put your toys in the box.\nGirl: OK. Where can I put my books?\nMum: Put them on the shelf, next to the lamp.\nGirl: Look, Mum! My room is clean now.",
          questions: [
            mcq(
              "Where do the toys go?",
              "Đồ chơi được cất vào đâu?",
              ["In the box", "On the bed", "Under the rug"],
              0,
              "Mẹ dặn 'Put your toys in the box.' — đồ chơi phải cất vào hộp.",
              "Put your toys in the box",
            ),
            mcq(
              "Where do the books go?",
              "Sách được để ở đâu?",
              ["On the shelf", "In the bag", "On the bed"],
              0,
              "Mẹ trả lời 'Put them on the shelf, next to the lamp.' — sách để trên kệ, cạnh cái đèn.",
              "Put them on the shelf, next to the lamp",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về phòng của bé: trong phòng có gì, đồ vật ở đâu, bé thích món đồ nào nhất.",
        writingOutline:
          "1. Giới thiệu: This is my room.\n2. Đồ vật: My bed is ... / My lamp is ...\n3. Vị trí: My toys are in ...\n4. Yêu thích: My favourite toy is ...",
        speaking: {
          sentences: [
            "This is my room.",
            "My bed is next to the window.",
            "My teddy bear is on my bed.",
            "My toys are in the box.",
          ],
          questions: [
            { question: "What is in your room?", sampleAnswer: "My room has a bed, a lamp and a big toy box." },
            { question: "Where is your bed?", sampleAnswer: "My bed is next to the window." },
            { question: "What is your favourite toy?", sampleAnswer: "My favourite toy is my robot. It is blue." },
          ],
        },
      },

      // ─────────────────────────── Bài 6 ───────────────────────────
      {
        topic: "Clothes",
        topicVi: "Quần áo của bé",
        icon: "👕",
        words: [
          word("shirt", "/ʃɜːrt/", "áo sơ mi", "👕"),
          word("shoes", "/ʃuːz/", "đôi giày", "👟"),
          word("socks", "/sɑːks/", "đôi tất", "🧦"),
          word("hat", "/hæt/", "cái mũ", "🧢"),
          word("dress", "/dres/", "cái váy liền", "👗"),
          word("coat", "/koʊt/", "áo khoác", "🧥"),
          word("shorts", "/ʃɔːrts/", "quần đùi", "🩳"),
          word("trousers", "/ˈtraʊzərz/", "quần dài", "👖"),
        ],
        sound: {
          letters: "sh",
          sound: "/ʃ/",
          hint: "Chu môi tròn và thổi hơi dài 'shhh...' như khi ra hiệu cho em bé im lặng. Trẻ Việt hay đổi /ʃ/ thành /s/ ('she' đọc thành 'xi') — phải chu môi mới đúng. Cuối từ cũng vậy: 'fish' phải chu môi ở cuối, đừng đọc thành 'phít'.",
          words: [
            { word: "shoe", meaning: "chiếc giày", emoji: "👟" },
            { word: "shirt", meaning: "áo sơ mi", emoji: "👕" },
            { word: "shop", meaning: "cửa hàng", emoji: "🏪" },
            { word: "fish", meaning: "con cá", emoji: "🐟" },
          ],
        },
        reading: {
          title: "Ready for school",
          passage:
            "Today is cold. I put on my warm coat. My shirt is blue and my trousers are black. My socks are in the drawer, next to my shorts. My new shoes are under the bed. My sister wears a pink dress and a red hat. We are ready for school.",
          translation:
            "Hôm nay trời lạnh. Tớ mặc chiếc áo khoác ấm. Áo sơ mi của tớ màu xanh dương, quần dài màu đen. Tất của tớ ở trong ngăn kéo, ngay cạnh quần đùi. Đôi giày mới của tớ ở dưới gầm giường. Em gái tớ mặc váy hồng và đội mũ đỏ. Hai chị em đã sẵn sàng đi học.",
          questions: [
            mcq(
              "What colour is the shirt?",
              "Áo sơ mi màu gì?",
              ["Blue", "Black", "Pink"],
              0,
              "Bài đọc viết 'My shirt is blue and my trousers are black.' — áo màu xanh dương, còn quần dài mới màu đen.",
              "My shirt is blue",
            ),
            mcq(
              "Where are the shoes?",
              "Đôi giày ở đâu?",
              ["Under the bed", "In the drawer", "On the chair"],
              0,
              "Câu 'My new shoes are under the bed.' cho biết giày ở dưới gầm giường. Trong ngăn kéo là tất và quần đùi.",
              "My new shoes are under the bed",
            ),
            tf(
              "The sister wears a dress.",
              "Em gái mặc váy.",
              true,
              "Câu này ĐÚNG. Bài đọc viết 'My sister wears a pink dress and a red hat.' — em gái mặc váy hồng.",
              "My sister wears a pink dress",
            ),
          ],
        },
        listening: {
          title: "It is cold today",
          transcript:
            "Mum: It is cold today. Where is your coat, Nam?\nBoy: It is on my chair, Mum.\nMum: Put it on, please. And your hat too.\nBoy: Can I wear my new shoes?\nMum: Yes, but wear warm socks with them.\nBoy: OK, Mum. I am ready!",
          questions: [
            mcq(
              "Where is the coat?",
              "Áo khoác ở đâu?",
              ["On the chair", "In the bag", "Under the bed"],
              0,
              "Nam trả lời mẹ 'It is on my chair, Mum.' — áo khoác đang ở trên ghế.",
              "It is on my chair",
            ),
            tf(
              "Nam can wear his new shoes.",
              "Nam được đi đôi giày mới.",
              true,
              "Nam xin đi giày mới và mẹ đáp 'Yes, but wear warm socks with them.' — mẹ đồng ý, chỉ dặn đi thêm tất ấm.",
              "Yes, but wear warm socks with them",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về quần áo bé mặc hôm nay: màu gì, trời nóng hay lạnh, bé thích bộ nào nhất.",
        writingOutline:
          "1. Thời tiết: Today is hot. / Today is cold.\n2. Bé mặc gì: I wear a ... and ...\n3. Màu sắc: My shirt is ...\n4. Yêu thích: My favourite clothes are ...",
        speaking: {
          sentences: [
            "My shirt is blue.",
            "I put on my warm coat.",
            "My shoes are under the bed.",
            "My sister wears a pink dress.",
          ],
          questions: [
            { question: "What are you wearing today?", sampleAnswer: "I am wearing a white shirt and blue shorts." },
            { question: "What do you wear when it is cold?", sampleAnswer: "I wear a warm coat, a hat and thick socks." },
            { question: "What is your favourite colour for clothes?", sampleAnswer: "My favourite colour is red. I have a red hat." },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 3 · Ngoài trời",
    subtitle: "Thời tiết, công viên và những chuyến đi",
    lessons: [
      // ─────────────────────────── Bài 7 ───────────────────────────
      {
        topic: "Weather",
        topicVi: "Thời tiết hôm nay",
        icon: "🌤️",
        words: [
          word("sunny", "/ˈsʌni/", "trời nắng", "☀️"),
          word("rainy", "/ˈreɪni/", "trời mưa", "🌧️"),
          word("windy", "/ˈwɪndi/", "trời nhiều gió", "🌬️"),
          word("cloudy", "/ˈklaʊdi/", "trời nhiều mây", "☁️"),
          word("hot", "/hɑːt/", "nóng", "🔥"),
          word("cold", "/koʊld/", "lạnh", "🥶"),
          word("umbrella", "/ʌmˈbrelə/", "cái ô, cây dù", "☂️"),
          word("rainbow", "/ˈreɪnboʊ/", "cầu vồng", "🌈"),
        ],
        sound: {
          letters: "w",
          sound: "/w/",
          hint: "Chu môi tròn thật nhỏ rồi mở bung ra nhanh. Trẻ Việt hay đọc /w/ thành /v/ ('we' thành 'vi') vì tiếng Việt không có chữ 'w' — nhớ KHÔNG để răng chạm vào môi dưới, chỉ dùng môi thôi.",
          words: [
            { word: "wind", meaning: "cơn gió", emoji: "🌬️" },
            { word: "wet", meaning: "ướt", emoji: "💧" },
            { word: "window", meaning: "cửa sổ", emoji: "🪟" },
            { word: "warm", meaning: "ấm áp", emoji: "🌤️" },
          ],
        },
        reading: {
          title: "The weather today",
          passage:
            "Today it is sunny and hot. The sky is blue and I can play in the park. On rainy days I take my umbrella to school. When it is windy, my kite flies high. I like cloudy days too, because they are not hot. After the rain, I can see a big rainbow!",
          translation:
            "Hôm nay trời nắng và nóng. Bầu trời xanh ngắt, tớ được ra công viên chơi. Những hôm trời mưa, tớ mang ô đi học. Khi trời nhiều gió, con diều của tớ bay thật cao. Tớ cũng thích những ngày nhiều mây vì không bị nóng. Sau cơn mưa, tớ nhìn thấy một chiếc cầu vồng thật to!",
          questions: [
            mcq(
              "How is the weather today?",
              "Hôm nay thời tiết thế nào?",
              ["Sunny and hot", "Rainy and cold", "Windy and cool"],
              0,
              "Câu đầu bài viết 'Today it is sunny and hot.' — hôm nay trời nắng và nóng.",
              "Today it is sunny and hot",
            ),
            mcq(
              "What flies high on windy days?",
              "Hôm nhiều gió, thứ gì bay cao?",
              ["A kite", "A bird", "A plane"],
              0,
              "Bài đọc viết 'When it is windy, my kite flies high.' — con diều bay cao khi có gió.",
              "my kite flies high",
            ),
            tf(
              "The child takes an umbrella on rainy days.",
              "Ngày mưa bạn nhỏ mang theo ô.",
              true,
              "Câu này ĐÚNG. Bài đọc viết 'On rainy days I take my umbrella to school.' — hôm mưa thì mang ô đi học.",
              "On rainy days I take my umbrella to school",
            ),
          ],
        },
        listening: {
          title: "Can I go to the park?",
          transcript:
            "Girl: Mum, can I go to the park?\nMum: Look out of the window. It is very windy.\nGirl: But it is not cold. Can I fly my kite?\nMum: Yes, you can. Put on your coat.\nGirl: Thank you, Mum!\nMum: And come home before the rain.",
          questions: [
            mcq(
              "How is the weather?",
              "Thời tiết thế nào?",
              ["Windy", "Sunny", "Cold"],
              0,
              "Mẹ nhìn ra cửa sổ và nói 'It is very windy.' — trời đang nhiều gió. Bạn gái còn nói thêm 'it is not cold' nên trời không lạnh.",
              "It is very windy",
            ),
            mcq(
              "What does the girl want to do?",
              "Bạn gái muốn làm gì?",
              ["Fly her kite", "Ride a bike", "Read a book"],
              0,
              "Bạn gái hỏi 'Can I fly my kite?' — bạn ấy muốn ra thả diều.",
              "Can I fly my kite?",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về thời tiết nơi bé ở: hôm nay thế nào, bé thích kiểu thời tiết nào, hôm đó bé làm gì.",
        writingOutline:
          "1. Hôm nay: Today it is ...\n2. Nóng hay lạnh: It is hot. / It is cold.\n3. Bé thích: I like sunny days.\n4. Hoạt động: I can play in the park.",
        speaking: {
          sentences: [
            "Today it is sunny.",
            "I take my umbrella on rainy days.",
            "My kite flies high.",
            "I can see a big rainbow.",
          ],
          questions: [
            { question: "How is the weather today?", sampleAnswer: "Today it is sunny and hot." },
            { question: "What do you do on rainy days?", sampleAnswer: "On rainy days I stay at home and read a book." },
            { question: "Do you like hot days or cold days?", sampleAnswer: "I like cold days. I can wear my new coat." },
          ],
        },
      },

      // ─────────────────────────── Bài 8 ───────────────────────────
      {
        topic: "The Park",
        topicVi: "Ở công viên",
        icon: "🌳",
        words: [
          word("park", "/pɑːrk/", "công viên", "🏞️"),
          word("tree", "/triː/", "cái cây", "🌳"),
          // Bài đọc dùng dạng số nhiều bất quy tắc "leaves" → nói rõ ngay trên thẻ từ.
          word("leaf", "/liːf/", "chiếc lá (nhiều lá: leaves)", "🍃"),
          word("slide", "/slaɪd/", "cầu trượt", "🛝"),
          word("swing", "/swɪŋ/", "cái xích đu", "🎠"),
          word("duck", "/dʌk/", "con vịt", "🦆"),
          word("bike", "/baɪk/", "xe đạp", "🚲"),
          word("ball", "/bɔːl/", "quả bóng", "⚽"),
        ],
        sound: {
          letters: "l",
          sound: "/l/",
          hint: "Đầu lưỡi chạm vào lợi trên (ngay sau răng cửa) rồi thả xuống. Khó nhất là /l/ ở CUỐI từ: 'ball', 'girl', 'school' — trẻ Việt hay nuốt mất, đọc 'ball' thành 'bo'. Nhớ đưa lưỡi lên chạm lợi ở cuối từ.",
          words: [
            { word: "leaf", meaning: "chiếc lá", emoji: "🍃" },
            { word: "leg", meaning: "cái chân", emoji: "🦵" },
            { word: "log", meaning: "khúc gỗ", emoji: "🪵" },
            { word: "lake", meaning: "cái hồ", emoji: "🏞️" },
            // Từ mẫu cho /l/ CUỐI từ — đúng lỗi nêu trong `hint`.
            { word: "ball", meaning: "quả bóng", emoji: "⚽" },
          ],
        },
        reading: {
          title: "A day in the park",
          passage:
            "The park is near my house. It has many green trees. Yellow leaves are on the ground. I can go down the slide and I can play on the swing. My brother rides his new bike. Six ducks swim in the lake. My dad and I play with a ball under a big tree.",
          translation:
            "Công viên ở gần nhà tớ. Trong công viên có rất nhiều cây xanh. Những chiếc lá vàng rụng trên mặt đất. Tớ được trượt cầu trượt và chơi xích đu. Anh tớ đạp chiếc xe đạp mới. Sáu chú vịt bơi dưới hồ. Bố và tớ chơi bóng dưới gốc cây to.",
          questions: [
            mcq(
              "Where do the ducks swim?",
              "Mấy chú vịt bơi ở đâu?",
              ["In the lake", "In the pool", "In the river"],
              0,
              "Bài đọc viết 'Six ducks swim in the lake.' — các chú vịt bơi trong hồ.",
              "Six ducks swim in the lake",
            ),
            mcq(
              "Who rides a bike?",
              "Ai đạp xe đạp?",
              ["My brother", "My dad", "My sister"],
              0,
              "Câu 'My brother rides his new bike.' cho biết anh trai là người đạp xe. Bố thì chơi bóng.",
              "My brother rides his new bike",
            ),
            tf(
              "The leaves on the ground are green.",
              "Những chiếc lá trên mặt đất màu xanh.",
              false,
              "Câu này SAI. Bài đọc viết 'Yellow leaves are on the ground.' — lá trên mặt đất màu VÀNG, còn cây thì màu xanh.",
              "Yellow leaves are on the ground",
            ),
          ],
        },
        listening: {
          title: "Look at the ducks!",
          transcript:
            "Boy: Look, Mai! There are two ducks in the lake.\nGirl: They are so cute! Can we play on the swing?\nBoy: Yes! And after that, I want the slide.\nGirl: My mum has a ball in her bag.\nBoy: Great! Let's play football under the tree.\nGirl: Come on, let's run!",
          questions: [
            mcq(
              "How many ducks are in the lake?",
              "Có mấy chú vịt dưới hồ?",
              ["One", "Two", "Three"],
              1,
              "Bạn trai nói 'There are two ducks in the lake.' — có hai chú vịt.",
              "There are two ducks in the lake",
            ),
            mcq(
              "Who has a ball?",
              "Ai có quả bóng?",
              ["Her mum", "Her dad", "Her brother"],
              0,
              "Bạn gái nói 'My mum has a ball in her bag.' — mẹ bạn ấy có quả bóng trong túi.",
              "My mum has a ball in her bag",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về công viên gần nhà bé: trong công viên có gì, bé chơi trò gì, bé đi cùng ai.",
        writingOutline:
          "1. Giới thiệu: The park is near my house.\n2. Có gì: It has trees and a lake.\n3. Bé chơi gì: I can play on the swing.\n4. Đi với ai: I go to the park with my ...",
        speaking: {
          sentences: [
            "The park is near my house.",
            "I can play on the swing.",
            "Six ducks swim in the lake.",
            "We play with a ball under the tree.",
          ],
          questions: [
            { question: "What can you see in the park?", sampleAnswer: "I can see green trees, a big slide and many birds." },
            { question: "What do you like doing in the park?", sampleAnswer: "I like playing on the swing with my friends." },
            { question: "Who do you go to the park with?", sampleAnswer: "I go to the park with my mum and my brother." },
          ],
        },
      },

      // ─────────────────────────── Bài 9 ───────────────────────────
      {
        topic: "Transport",
        topicVi: "Xe cộ và những chuyến đi",
        icon: "🚌",
        words: [
          word("bus", "/bʌs/", "xe buýt", "🚌"),
          word("car", "/kɑːr/", "xe ô tô", "🚗"),
          word("motorbike", "/ˈmoʊtərbaɪk/", "xe máy", "🛵"),
          word("train", "/treɪn/", "tàu hoả", "🚆"),
          word("plane", "/pleɪn/", "máy bay", "✈️"),
          word("boat", "/boʊt/", "chiếc thuyền", "⛵"),
          word("jeep", "/dʒiːp/", "xe jeep", "🚙"),
          word("taxi", "/ˈtæksi/", "xe taxi", "🚕"),
        ],
        sound: {
          letters: "j",
          sound: "/dʒ/",
          hint: "Đầu lưỡi chạm lợi trên rồi bật ra kèm tiếng RUNG ở cổ — nghe gần giống 'ch' nhưng có rung. Trẻ Việt hay đọc thành 'gi' (âm /z/): 'jump' thành 'zăm'. Đặt tay lên cổ, thấy rung là đúng.",
          words: [
            { word: "jeep", meaning: "xe jeep", emoji: "🚙" },
            { word: "jet", meaning: "máy bay phản lực", emoji: "✈️" },
            { word: "jam", meaning: "mứt hoa quả", emoji: "🍓" },
            { word: "jump", meaning: "nhảy lên", emoji: "🤸" },
          ],
        },
        reading: {
          title: "How I go to school",
          passage:
            "My city has many cars and motorbikes. I go to school by bus. The bus is big and yellow. My dad goes to work by car. On Sunday we take a train to my grandma's house. My cousin has a small boat on the river. One day I want to fly in a plane!",
          translation:
            "Thành phố của tớ có rất nhiều ô tô và xe máy. Tớ đi học bằng xe buýt. Xe buýt to và màu vàng. Bố tớ đi làm bằng ô tô. Chủ nhật, cả nhà đi tàu hoả về nhà bà. Anh họ tớ có một chiếc thuyền nhỏ trên sông. Một ngày nào đó tớ muốn được bay bằng máy bay!",
          questions: [
            mcq(
              "How does the child go to school?",
              "Bạn nhỏ đi học bằng gì?",
              ["By bus", "By car", "By train"],
              0,
              "Bài đọc viết 'I go to school by bus.' — bạn ấy đi học bằng xe buýt. Bố mới đi ô tô.",
              "I go to school by bus",
            ),
            mcq(
              "What colour is the bus?",
              "Xe buýt màu gì?",
              ["Yellow", "Red", "Blue"],
              0,
              "Câu 'The bus is big and yellow.' cho biết xe buýt to và màu vàng.",
              "The bus is big and yellow",
            ),
            tf(
              "The cousin has a boat.",
              "Anh họ có một chiếc thuyền.",
              true,
              "Câu này ĐÚNG. Bài đọc viết 'My cousin has a small boat on the river.' — anh họ có thuyền nhỏ trên sông.",
              "My cousin has a small boat on the river",
            ),
          ],
        },
        listening: {
          title: "Going to the airport",
          transcript:
            "Boy: Dad, how do we go to the airport?\nDad: We can take a taxi. It is fast.\nBoy: Can we go in Uncle Ba's jeep?\nDad: No, his jeep is at the garage today.\nBoy: OK. Look, a big plane!\nDad: Yes! Our plane leaves at ten o'clock.",
          questions: [
            mcq(
              "How do they go to the airport?",
              "Hai bố con ra sân bay bằng gì?",
              ["By taxi", "By jeep", "By bus"],
              0,
              "Bố nói 'We can take a taxi. It is fast.' — hai bố con đi taxi cho nhanh.",
              "We can take a taxi",
            ),
            mcq(
              "Where is the jeep today?",
              "Hôm nay chiếc xe jeep ở đâu?",
              ["At the garage", "At home", "At school"],
              0,
              "Bố trả lời 'his jeep is at the garage today.' — xe jeep đang ở xưởng sửa xe nên không đi được.",
              "his jeep is at the garage today",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về cách bé đi lại: bé đi học bằng gì, bố mẹ đi làm bằng gì, bé thích phương tiện nào nhất.",
        writingOutline:
          "1. Bé: I go to school by ...\n2. Bố mẹ: My dad goes to work by ...\n3. Yêu thích: I like the train. It is fast.\n4. Ước mơ: One day I want to fly in a plane.",
        speaking: {
          sentences: [
            "I go to school by bus.",
            "The bus is big and yellow.",
            "My dad goes to work by car.",
            "I want to fly in a plane.",
          ],
          questions: [
            { question: "How do you go to school?", sampleAnswer: "I go to school by motorbike with my mum." },
            { question: "What is your favourite transport?", sampleAnswer: "My favourite transport is the train. It is very long." },
            { question: "Can you ride a bike?", sampleAnswer: "Yes, I can ride a bike. My bike is red." },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 4 · Vui chơi",
    subtitle: "Thể thao, sinh nhật và âm nhạc",
    lessons: [
      // ─────────────────────────── Bài 10 ───────────────────────────
      {
        topic: "Sports",
        topicVi: "Bé chơi thể thao",
        icon: "⚽",
        words: [
          word("football", "/ˈfʊtbɔːl/", "bóng đá", "⚽"),
          word("badminton", "/ˈbædmɪntən/", "cầu lông", "🏸"),
          word("swim", "/swɪm/", "bơi", "🏊"),
          word("run", "/rʌn/", "chạy", "🏃"),
          word("jump", "/dʒʌmp/", "nhảy lên", "🤸"),
          word("throw", "/θroʊ/", "ném", "🤾"),
          word("catch", "/kætʃ/", "bắt lấy", "🧤"),
          word("team", "/tiːm/", "đội (nhóm cùng chơi)", "👫"),
        ],
        sound: {
          letters: "th",
          sound: "/θ/",
          hint: "Đặt đầu lưỡi giữa hai hàm răng rồi thổi hơi ra, không rung cổ. Trẻ Việt hay đọc /θ/ thành /t/: 'three' thành 'tri', 'think' thành 'tin'. Soi gương, phải thấy đầu lưỡi thò ra một chút mới đúng.",
          words: [
            { word: "three", meaning: "số ba", emoji: "3️⃣" },
            { word: "thumb", meaning: "ngón tay cái", emoji: "👍" },
            { word: "think", meaning: "suy nghĩ", emoji: "🤔" },
            { word: "throw", meaning: "ném", emoji: "🤾" },
          ],
        },
        reading: {
          title: "I love sports",
          passage:
            "I like sports very much. On Monday I play football with my team. We run and we kick the ball. On Wednesday I swim in the big pool. My sister plays badminton. She can jump high and she can throw a ball far. I can catch the ball with two hands. Sport is fun!",
          translation:
            "Tớ rất thích thể thao. Thứ Hai tớ chơi bóng đá cùng đội của mình. Cả đội chạy và sút bóng. Thứ Tư tớ đi bơi ở bể bơi to. Chị tớ chơi cầu lông. Chị nhảy rất cao và ném bóng rất xa. Tớ thì bắt bóng bằng hai tay. Chơi thể thao vui lắm!",
          questions: [
            mcq(
              "What does the child play on Monday?",
              "Thứ Hai bạn nhỏ chơi môn gì?",
              ["Football", "Badminton", "Tennis"],
              0,
              "Bài đọc viết 'On Monday I play football with my team.' — thứ Hai là ngày chơi bóng đá. Cầu lông là môn của chị.",
              "On Monday I play football with my team",
            ),
            mcq(
              "What sport does the sister play?",
              "Chị gái chơi môn thể thao nào?",
              ["Badminton", "Football", "Swimming"],
              0,
              "Câu 'My sister plays badminton.' cho biết chị chơi cầu lông.",
              "My sister plays badminton",
            ),
            tf(
              "The child swims on Wednesday.",
              "Thứ Tư bạn nhỏ đi bơi.",
              true,
              "Câu này ĐÚNG. Bài đọc viết 'On Wednesday I swim in the big pool.' — thứ Tư bạn ấy bơi ở bể bơi to.",
              "On Wednesday I swim in the big pool",
            ),
          ],
        },
        listening: {
          title: "Two teams",
          transcript:
            "Teacher: Today we play football. Are you ready?\nBoy: Yes! Can I be in the red team?\nTeacher: Yes, Nam. Mai, you are in the blue team.\nGirl: Miss, I can run fast but I can't catch the ball.\nTeacher: That is OK. You can learn today.\nGirl: Thank you, Miss. Let's play!",
          questions: [
            mcq(
              "Which team is Nam in?",
              "Nam ở đội nào?",
              ["The red team", "The blue team", "The green team"],
              0,
              "Nam xin 'Can I be in the red team?' và cô trả lời 'Yes, Nam.' — Nam ở đội đỏ, còn Mai ở đội xanh.",
              "Can I be in the red team?",
            ),
            mcq(
              "What can Mai do well?",
              "Mai làm giỏi việc gì?",
              ["Run fast", "Catch the ball", "Swim fast"],
              0,
              "Mai nói 'I can run fast but I can't catch the ball.' — bạn ấy chạy nhanh nhưng chưa bắt bóng giỏi.",
              "I can run fast but I can't catch the ball",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về thể thao: bé chơi môn gì, chơi với ai, bé làm được điều gì (can).",
        writingOutline:
          "1. Môn yêu thích: I like football.\n2. Chơi với ai: I play with my friends.\n3. Bé làm được gì: I can run fast. / I can swim.\n4. Cảm nghĩ: Sport is fun.",
        speaking: {
          sentences: [
            "I play football with my team.",
            "I can run fast.",
            "My sister plays badminton.",
            "I can catch the ball.",
          ],
          questions: [
            { question: "What sport do you like?", sampleAnswer: "I like football. I play it every Monday." },
            { question: "Can you swim?", sampleAnswer: "Yes, I can swim. I swim with my dad." },
            { question: "Who do you play sports with?", sampleAnswer: "I play sports with my friends at school." },
          ],
        },
      },

      // ─────────────────────────── Bài 11 ───────────────────────────
      {
        topic: "Birthday Party",
        topicVi: "Tiệc sinh nhật",
        icon: "🎂",
        words: [
          word("birthday", "/ˈbɜːrθdeɪ/", "sinh nhật", "🎂"),
          word("party", "/ˈpɑːrti/", "bữa tiệc", "🎉"),
          word("cake", "/keɪk/", "bánh kem", "🍰"),
          word("candle", "/ˈkændl/", "cây nến", "🕯️"),
          word("present", "/ˈpreznt/", "món quà", "🎁"),
          word("balloon", "/bəˈluːn/", "quả bóng bay", "🎈"),
          word("juice", "/dʒuːs/", "nước ép", "🧃"),
          word("chocolate", "/ˈtʃɑːklət/", "sô cô la", "🍫"),
        ],
        sound: {
          letters: "ch",
          sound: "/tʃ/",
          hint: "Âm /tʃ/ giống 'ch' tiếng Việt nhưng bật mạnh hơn và phải chu môi. Khó nhất là /tʃ/ ở CUỐI từ: 'watch', 'lunch', 'catch' — trẻ Việt hay nuốt mất. Đọc xong từ vẫn phải nghe thấy tiếng 'ch' bật ra.",
          words: [
            { word: "chips", meaning: "khoai tây chiên", emoji: "🍟" },
            { word: "cheese", meaning: "phô mai", emoji: "🧀" },
            { word: "chocolate", meaning: "sô cô la", emoji: "🍫" },
            { word: "chair", meaning: "cái ghế", emoji: "🪑" },
          ],
        },
        reading: {
          title: "My birthday party",
          passage:
            "Today is my birthday. I am seven. My mum makes a big chocolate cake. There are seven candles on the cake. Red and yellow balloons are on the door. My friends come to my party. They give me nice presents. We drink orange juice and we sing a happy song.",
          translation:
            "Hôm nay là sinh nhật tớ. Tớ bảy tuổi rồi. Mẹ làm cho tớ một chiếc bánh sô cô la thật to. Trên bánh có bảy cây nến. Bóng bay đỏ và vàng được treo ở cửa. Các bạn đến dự tiệc của tớ. Các bạn tặng tớ nhiều món quà xinh. Cả nhóm uống nước cam và hát một bài thật vui.",
          questions: [
            mcq(
              "How old is the child?",
              "Bạn nhỏ bao nhiêu tuổi?",
              ["Six", "Seven", "Eight"],
              1,
              "Bài đọc viết 'I am seven.' — bạn ấy bảy tuổi, đúng bằng số nến trên bánh.",
              "I am seven",
            ),
            mcq(
              "What kind of cake is it?",
              "Đó là bánh gì?",
              ["A chocolate cake", "A fruit cake", "A rice cake"],
              0,
              "Câu 'My mum makes a big chocolate cake.' cho biết đó là bánh sô cô la.",
              "My mum makes a big chocolate cake",
            ),
            tf(
              "The children drink milk at the party.",
              "Các bạn uống sữa trong bữa tiệc.",
              false,
              "Câu này SAI. Bài đọc viết 'We drink orange juice' — cả nhóm uống nước cam chứ không phải sữa.",
              "We drink orange juice",
            ),
          ],
        },
        listening: {
          title: "Happy birthday, Nam!",
          transcript:
            "Girl: Happy birthday, Nam! This is for you.\nBoy: Thank you, Mai! Oh, it is a red car!\nGirl: Can I have some cake, please?\nMum: Of course. Here you are. Do you want juice?\nGirl: Yes, please. Orange juice!\nBoy: Come on, everybody. Let's sing!",
          questions: [
            mcq(
              "What does Mai give to Nam?",
              "Mai tặng Nam món quà gì?",
              ["A red car", "A blue ball", "A teddy bear"],
              0,
              "Nam mở quà và reo lên 'Oh, it is a red car!' — món quà là chiếc ô tô đỏ.",
              "it is a red car",
            ),
            mcq(
              "What does Mai want to drink?",
              "Mai muốn uống gì?",
              ["Orange juice", "Milk", "Water"],
              0,
              "Mẹ hỏi có muốn nước ép không, Mai đáp 'Yes, please. Orange juice!' — bạn ấy chọn nước cam.",
              "Yes, please. Orange juice!",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về sinh nhật của bé: bé bao nhiêu tuổi, có bánh gì, ai đến chơi.",
        writingOutline:
          "1. Ngày sinh nhật: Today is my birthday.\n2. Tuổi: I am seven.\n3. Bánh và quà: I have a big cake. My friends give me presents.\n4. Cảm nghĩ: My party is fun.",
        speaking: {
          sentences: [
            "Today is my birthday.",
            "I am seven.",
            "My mum makes a big cake.",
            "My friends come to my party.",
          ],
          questions: [
            { question: "When is your birthday?", sampleAnswer: "My birthday is in May." },
            { question: "What do you eat at a party?", sampleAnswer: "I eat cake and chips at a party." },
            { question: "What present do you want?", sampleAnswer: "I want a new bike. It is my favourite present." },
          ],
        },
      },

      // ─────────────────────────── Bài 12 ───────────────────────────
      {
        topic: "Music",
        topicVi: "Bé và âm nhạc",
        icon: "🎵",
        words: [
          word("music", "/ˈmjuːzɪk/", "âm nhạc", "🎵"),
          word("song", "/sɔːŋ/", "bài hát", "🎶"),
          word("sing", "/sɪŋ/", "hát", "🎤"),
          word("drum", "/drʌm/", "cái trống", "🥁"),
          word("guitar", "/ɡɪˈtɑːr/", "đàn ghi ta", "🎸"),
          word("piano", "/piˈænoʊ/", "đàn piano", "🎹"),
          word("dance", "/dæns/", "nhảy múa", "💃"),
          word("loud", "/laʊd/", "to, ồn ào", "📢"),
        ],
        sound: {
          letters: "ng",
          sound: "/ŋ/",
          hint: "Âm /ŋ/ nằm ở CUỐI từ: chặn lưỡi ở phía sau, hơi thoát ra bằng mũi — giống 'ng' trong 'ông' của tiếng Việt. Đừng thêm một tiếng /ɡ/ rời phía sau: 'sing' đọc là /sɪŋ/, không phải 'sing-gờ'.",
          words: [
            { word: "sing", meaning: "hát", emoji: "🎤" },
            { word: "song", meaning: "bài hát", emoji: "🎶" },
            { word: "ring", meaning: "chiếc nhẫn", emoji: "💍" },
            { word: "king", meaning: "nhà vua", emoji: "👑" },
          ],
        },
        reading: {
          title: "My music class",
          passage:
            "I love music. In my music class we sing a new song every week. My friend Nam plays the drum. It is very loud! Linh plays the guitar and my teacher plays the piano. I can dance to fast music. My favourite song is about a happy little bird.",
          translation:
            "Tớ rất yêu âm nhạc. Ở lớp nhạc, mỗi tuần cả lớp học một bài hát mới. Bạn Nam chơi trống. Tiếng trống to lắm! Bạn Linh chơi ghi ta, còn cô giáo chơi piano. Tớ thì nhảy theo những bản nhạc nhanh. Bài hát tớ thích nhất kể về một chú chim nhỏ vui vẻ.",
          questions: [
            mcq(
              "What does Nam play?",
              "Nam chơi nhạc cụ gì?",
              ["The drum", "The guitar", "The piano"],
              0,
              "Bài đọc viết 'My friend Nam plays the drum.' — Nam chơi trống. Ghi ta là của Linh.",
              "My friend Nam plays the drum",
            ),
            mcq(
              "Who plays the piano?",
              "Ai chơi đàn piano?",
              ["My teacher", "Linh", "Nam"],
              0,
              "Câu 'my teacher plays the piano' cho biết cô giáo là người chơi piano.",
              "my teacher plays the piano",
            ),
            tf(
              "The drum is quiet.",
              "Tiếng trống rất nhỏ.",
              false,
              "Câu này SAI. Ngay sau khi nói về cái trống, bài đọc viết 'It is very loud!' — tiếng trống rất TO.",
              "It is very loud!",
            ),
          ],
        },
        listening: {
          title: "A song about the sun",
          transcript:
            "Teacher: Today we sing a song about the sun.\nGirl: Miss, can I play the drum?\nTeacher: Yes, Mai. Nam, you can play the guitar.\nBoy: I can't play the guitar, Miss.\nTeacher: That is OK. You can sing with me.\nBoy: Great! I love this song.",
          questions: [
            mcq(
              "What is the song about?",
              "Bài hát nói về điều gì?",
              ["The sun", "The rain", "A bird"],
              0,
              "Cô giáo nói 'Today we sing a song about the sun.' — bài hát nói về mặt trời.",
              "we sing a song about the sun",
            ),
            mcq(
              "What does Mai play?",
              "Mai chơi nhạc cụ gì?",
              ["The drum", "The guitar", "The piano"],
              0,
              "Mai xin 'can I play the drum?' và cô đáp 'Yes, Mai.' — Mai được chơi trống.",
              "can I play the drum?",
            ),
          ],
        },
        writingPrompt:
          "Viết 3 câu tiếng Anh về âm nhạc: bé thích bài hát nào, bé chơi được nhạc cụ gì, bé hát cùng ai.",
        writingOutline:
          "1. Sở thích: I love music.\n2. Bài hát: My favourite song is ...\n3. Nhạc cụ: I can play the drum. / I can't play the piano.\n4. Cùng ai: I sing with my friends.",
        speaking: {
          sentences: [
            "I love music.",
            "We sing a new song every week.",
            "Nam plays the drum.",
            "I can dance to fast music.",
          ],
          questions: [
            { question: "Do you like singing?", sampleAnswer: "Yes, I like singing. I sing with my mum." },
            { question: "Can you play a musical instrument?", sampleAnswer: "I can play the drum, but I can't play the guitar." },
            { question: "What is your favourite song?", sampleAnswer: "My favourite song is about a happy little bird." },
          ],
        },
      },
    ],
  },
];
