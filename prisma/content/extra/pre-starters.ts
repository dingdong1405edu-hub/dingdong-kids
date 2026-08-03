// Bài học BỔ SUNG cho cấp này — nối SAU danh sách gốc trong ../pre-starters.ts.
//
// Tách file riêng để soạn thêm bài mà không phải mở file gốc (đã rất dài).
// ⚠️ Mỗi bài thêm ở đây PHẢI có một mục ngữ pháp tương ứng, ĐÚNG THỨ TỰ, trong
//    ../grammar/extra-pre-starters.ts — nếu không `npm run content:check` sẽ báo lệch hàng.
//
// Ràng buộc riêng của cấp này (đã bám sát khi soạn):
//   • Đoạn đọc 12–35 từ, mỗi câu 3–6 từ, CHỈ thì hiện tại đơn.
//   • 4–6 từ vựng/bài, toàn danh từ cụ thể nhìn thấy được; từ nào cũng phải
//     xuất hiện lại trong đoạn đọc của chính bài đó.
//   • 1–2 câu hỏi/bài, 3 lựa chọn, mỗi lựa chọn CHỈ 1 TỪ.
//   • Lời thoại nghe 2–3 lượt, mỗi lượt ≤ 8 từ.
//   • Phonics tiếp nối 12 bài gốc (s a t p i n · m d g o c k) → e u r h b f.
import { type ChapterSeed, mcq, tf, word } from "../types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 5 · Ngôi nhà của bé",
    subtitle: "Bé dẫn bạn đi thăm phòng ngủ, gian bếp và tủ quần áo của mình",
    lessons: [
      // ─────────────────────────── Bài 13 ───────────────────────────
      {
        topic: "My Bedroom",
        topicVi: "Phòng ngủ của bé",
        icon: "🛏️",
        words: [
          word("bedroom", "/ˈbedruːm/", "phòng ngủ", "🛏️"),
          word("bed", "/bed/", "cái giường", "🛌"),
          word("lamp", "/læmp/", "cái đèn", "💡"),
          word("book", "/bʊk/", "quyển sách", "📖"),
          word("clock", "/klɑːk/", "cái đồng hồ", "🕐"),
          word("box", "/bɑːks/", "cái hộp", "📦"),
        ],
        sound: {
          letters: "e",
          sound: "/e/",
          hint: "Bé há miệng vừa phải, kéo nhẹ hai bên miệng sang ngang rồi kêu ngắn: /e/. Miệng mở rộng hơn chữ “e” tiếng Việt trong “em” một chút. Và nhớ bật rõ phụ âm cuối — “bed” phải nghe thấy tiếng /d/ nhỏ, trẻ Việt rất hay nuốt thành “be”.",
          words: [
            { word: "egg", meaning: "quả trứng", emoji: "🥚" },
            { word: "bed", meaning: "cái giường", emoji: "🛏️" },
            { word: "hen", meaning: "con gà mái", emoji: "🐔" },
          ],
        },
        reading: {
          title: "This is my bedroom",
          passage:
            "This is my bedroom. I have a big bed. My lamp is on the box. My book is on the bed. My clock is red. I love my bedroom.",
          translation:
            "Đây là phòng ngủ của tớ. Tớ có một cái giường to. Cái đèn của tớ ở trên cái hộp. Quyển sách của tớ ở trên giường. Cái đồng hồ của tớ màu đỏ. Tớ yêu phòng ngủ của tớ lắm.",
          questions: [
            mcq(
              "What colour is the clock?",
              "Cái đồng hồ màu gì?",
              ["red", "blue", "green"],
              0,
              "Bài viết “My clock is red.” — “red” nghĩa là màu đỏ, nên đáp án đúng là “red”.",
              "My clock is red.",
            ),
            mcq(
              "Where is the book?",
              "Quyển sách ở đâu?",
              ["bed", "box", "lamp"],
              0,
              "Câu “My book is on the bed.” cho biết quyển sách nằm TRÊN GIƯỜNG. Cái đèn mới ở trên hộp.",
              "My book is on the bed.",
            ),
          ],
        },
        listening: {
          title: "My new lamp",
          transcript:
            "Girl: Look at my new lamp.\nBoy: Is your bed big?\nGirl: Yes! My bed is very big.",
          questions: [
            mcq(
              "What is new?",
              "Cái gì là đồ mới?",
              ["bed", "lamp", "book"],
              1,
              "Bạn gái nói “Look at my new lamp.” — “new” nghĩa là mới, nên cái đèn là đồ mới.",
              "Look at my new lamp.",
            ),
            tf(
              "The girl has a big bed.",
              "Bạn gái có một cái giường to.",
              true,
              "Bạn gái nói “My bed is very big.” — giường của bạn ấy rất to, nên câu này ĐÚNG.",
              "My bed is very big.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ phòng ngủ của mình, rồi chép lại 3 câu nói đồ của bé nằm ở đâu. Dùng mẫu: My book is on the bed.",
        writingOutline:
          "1. Câu mở: This is my bedroom.\n2. Nói đồ nằm ở đâu: My book is on the bed. My toy is in the box.\n3. Câu cuối: I love my bedroom.",
        speaking: {
          sentences: ["This is my bedroom.", "My book is on the bed.", "My clock is red."],
          questions: [
            {
              question: "What is in your bedroom?",
              sampleAnswer: "I have a bed and a lamp.",
            },
            {
              question: "Is your bed big or small?",
              sampleAnswer: "My bed is big.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 14 ───────────────────────────
      {
        topic: "In the Kitchen",
        topicVi: "Trong gian bếp",
        icon: "🍳",
        words: [
          word("kitchen", "/ˈkɪtʃɪn/", "gian bếp", "🍳"),
          word("cup", "/kʌp/", "cái cốc", "☕"),
          word("plate", "/pleɪt/", "cái đĩa", "🍽️"),
          word("spoon", "/spuːn/", "cái thìa", "🥄"),
          word("pot", "/pɑːt/", "cái nồi", "🍲"),
        ],
        sound: {
          letters: "u",
          sound: "/ʌ/",
          hint: "Bé mở miệng nhỏ, thả lỏng lưỡi rồi kêu thật ngắn: /ʌ/. Âm này gần giống “â” tiếng Việt chứ KHÔNG phải “u” — “cup” không đọc là “cúp”. Nhớ bật /p/ ở cuối, đừng nuốt thành “cu”.",
          words: [
            { word: "up", meaning: "lên trên", emoji: "⬆️" },
            { word: "cup", meaning: "cái cốc", emoji: "☕" },
            { word: "bus", meaning: "xe buýt", emoji: "🚌" },
          ],
        },
        reading: {
          title: "In my kitchen",
          passage:
            "This is my kitchen. I can see a cup. I can see a plate. My spoon is small. The pot is big. I like my kitchen.",
          translation:
            "Đây là gian bếp nhà tớ. Tớ nhìn thấy một cái cốc. Tớ nhìn thấy một cái đĩa. Cái thìa của tớ bé xíu. Cái nồi thì to. Tớ thích gian bếp nhà tớ.",
          questions: [
            mcq(
              "What is big?",
              "Cái gì to?",
              ["spoon", "pot", "cup"],
              1,
              "Bài viết “The pot is big.” — “big” nghĩa là to, nên cái nồi mới là thứ to.",
              "The pot is big.",
            ),
            tf(
              "The spoon is small.",
              "Cái thìa thì nhỏ.",
              true,
              "Trong bài có câu “My spoon is small.” — “small” nghĩa là nhỏ, nên câu này ĐÚNG.",
              "My spoon is small.",
            ),
          ],
        },
        listening: {
          title: "Help Mum in the kitchen",
          transcript:
            "Mum: Can you see the cup?\nBoy: Yes, I can see a cup.\nMum: Now put it on the plate.",
          questions: [
            mcq(
              "What does the boy see?",
              "Bạn trai nhìn thấy cái gì?",
              ["cup", "pot", "spoon"],
              0,
              "Bạn trai trả lời “I can see a cup.” — bạn ấy nhìn thấy một cái cốc.",
              "I can see a cup.",
            ),
            mcq(
              "Where does the cup go?",
              "Cái cốc được đặt lên đâu?",
              ["pot", "plate", "box"],
              1,
              "Mẹ nói “Now put it on the plate.” — cái cốc được đặt lên cái đĩa.",
              "put it on the plate",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ gian bếp nhà mình, rồi chép 3 câu kể những thứ bé nhìn thấy. Dùng mẫu: I can see a cup.",
        writingOutline:
          "1. Câu mở: This is my kitchen.\n2. Kể thứ bé nhìn thấy: I can see a cup. I can see a plate.\n3. Câu cuối: I like my kitchen.",
        speaking: {
          sentences: ["This is my kitchen.", "I can see a cup.", "The pot is big."],
          questions: [
            {
              question: "What can you see in your kitchen?",
              sampleAnswer: "I can see a cup and a plate.",
            },
            {
              question: "Is your spoon big or small?",
              sampleAnswer: "My spoon is small.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 15 ───────────────────────────
      {
        topic: "My Clothes",
        topicVi: "Quần áo của bé",
        icon: "👕",
        words: [
          word("hat", "/hæt/", "cái mũ", "🧢"),
          word("shirt", "/ʃɜːrt/", "cái áo", "👕"),
          word("dress", "/dres/", "cái váy", "👗"),
          word("coat", "/koʊt/", "áo khoác", "🧥"),
          word("shoes", "/ʃuːz/", "đôi giày", "👟"),
        ],
        sound: {
          letters: "r",
          sound: "/r/",
          hint: "Bé cong nhẹ đầu lưỡi lên phía trong miệng, KHÔNG rung lưỡi như chữ “r” tiếng Việt trong “rổ rá”. Và đừng đánh rơi /r/ ở cuối từ: “car” vẫn phải còn tiếng “rrr” nhỏ, trẻ Việt hay đọc thành “ca”.",
          words: [
            { word: "red", meaning: "màu đỏ", emoji: "🔴" },
            { word: "rain", meaning: "mưa", emoji: "🌧️" },
            { word: "rabbit", meaning: "con thỏ", emoji: "🐰" },
          ],
        },
        reading: {
          title: "My clothes",
          passage:
            "Look at my clothes. I wear a red hat. My shirt is blue. My dress is pink. My coat is warm. My shoes are new. I like my clothes.",
          translation:
            "Nhìn quần áo của tớ này. Tớ đội một cái mũ đỏ. Áo của tớ màu xanh. Váy của tớ màu hồng. Áo khoác của tớ ấm lắm. Giày của tớ mới tinh. Tớ thích quần áo của tớ.",
          questions: [
            mcq(
              "What colour is the shirt?",
              "Cái áo màu gì?",
              ["red", "blue", "pink"],
              1,
              "Bài viết “My shirt is blue.” — “blue” nghĩa là màu xanh. Màu đỏ là của cái mũ.",
              "My shirt is blue.",
            ),
            mcq(
              "What is warm?",
              "Cái gì ấm?",
              ["coat", "hat", "shoes"],
              0,
              "Câu “My coat is warm.” cho biết áo khoác là thứ ấm.",
              "My coat is warm.",
            ),
          ],
        },
        listening: {
          title: "Where is my hat?",
          transcript:
            "Mum: Where is your red hat?\nGirl: My hat is on the bed.\nMum: Good. Now wear your shoes.",
          questions: [
            mcq(
              "Where is the hat?",
              "Cái mũ ở đâu?",
              ["box", "bed", "chair"],
              1,
              "Bạn gái nói “My hat is on the bed.” — cái mũ ở trên giường.",
              "My hat is on the bed.",
            ),
            mcq(
              "What must the girl wear now?",
              "Bây giờ bạn gái phải mang cái gì?",
              ["shoes", "coat", "dress"],
              0,
              "Mẹ dặn “Now wear your shoes.” — bạn gái phải đi giày.",
              "Now wear your shoes.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ bộ quần áo bé thích nhất, rồi chép 3 câu nói về nó. Dùng mẫu: I wear a red hat.",
        writingOutline:
          "1. Câu mở: Look at my clothes.\n2. Kể từng món: I wear a red hat. My shirt is blue.\n3. Câu cuối: I like my clothes.",
        speaking: {
          sentences: ["I wear a red hat.", "My shirt is blue.", "My shoes are new."],
          questions: [
            {
              question: "What do you wear today?",
              sampleAnswer: "I wear a blue shirt and a red hat.",
            },
            {
              question: "What colour are your shoes?",
              sampleAnswer: "My shoes are white.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 6 · Bé ra ngoài chơi",
    subtitle: "Bé thăm khu vườn, ngắm biển và nhìn ông trời hôm nay",
    lessons: [
      // ─────────────────────────── Bài 16 ───────────────────────────
      {
        topic: "The Garden",
        topicVi: "Khu vườn của bé",
        icon: "🌻",
        words: [
          word("garden", "/ˈɡɑːrdn/", "khu vườn", "🌻"),
          word("tree", "/triː/", "cái cây", "🌳"),
          word("flower", "/ˈflaʊər/", "bông hoa", "🌸"),
          word("grass", "/ɡræs/", "cỏ", "🌿"),
          word("bee", "/biː/", "con ong", "🐝"),
        ],
        sound: {
          letters: "h",
          sound: "/h/",
          hint: "/h/ chỉ là một hơi thở nhẹ bay ra khỏi miệng — đừng gằn xuống cổ họng thành “kh”. Bé đặt bàn tay trước miệng, nói “hat” mà thấy hơi ấm chạm tay là đúng. Nhớ bật /t/ ở cuối “hat”, đừng nuốt thành “ha”.",
          words: [
            { word: "hat", meaning: "cái mũ", emoji: "🧢" },
            { word: "hen", meaning: "con gà mái", emoji: "🐔" },
            { word: "house", meaning: "ngôi nhà", emoji: "🏠" },
          ],
        },
        reading: {
          title: "My garden",
          passage:
            "This is my garden. I see a big tree. The grass is green. I see two flowers. A bee is on a flower. My garden is pretty.",
          translation:
            "Đây là khu vườn nhà tớ. Tớ thấy một cái cây to. Cỏ màu xanh lá. Tớ thấy hai bông hoa. Một con ong đậu trên bông hoa. Khu vườn nhà tớ đẹp lắm.",
          questions: [
            mcq(
              "What colour is the grass?",
              "Cỏ màu gì?",
              ["green", "red", "blue"],
              0,
              "Bài viết “The grass is green.” — “green” nghĩa là màu xanh lá.",
              "The grass is green.",
            ),
            mcq(
              "How many flowers does the child see?",
              "Bạn nhỏ thấy mấy bông hoa?",
              ["one", "two", "three"],
              1,
              "Câu “I see two flowers.” — “two” nghĩa là hai, nên bạn nhỏ thấy hai bông hoa.",
              "I see two flowers.",
            ),
          ],
        },
        listening: {
          title: "A bee in the garden",
          transcript:
            "Boy: Look! A bee is on the flower.\nGirl: I see it. The tree is very big.\nBoy: Yes, our garden is pretty.",
          questions: [
            mcq(
              "What is on the flower?",
              "Con gì đậu trên bông hoa?",
              ["bee", "bird", "cat"],
              0,
              "Bạn trai nói “A bee is on the flower.” — con ong đậu trên bông hoa.",
              "A bee is on the flower.",
            ),
            tf(
              "The tree is small.",
              "Cái cây thì nhỏ.",
              false,
              "Bạn gái nói “The tree is very big.” — cây rất TO, nên câu này SAI.",
              "The tree is very big.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ một khu vườn, rồi chép 3 câu kể những gì có trong vườn. Dùng mẫu: They are flowers.",
        writingOutline:
          "1. Câu mở: This is my garden.\n2. Kể thứ trong vườn: It is a tree. They are flowers.\n3. Câu cuối: My garden is pretty.",
        speaking: {
          sentences: ["This is my garden.", "They are flowers.", "A bee is on the flower."],
          questions: [
            {
              question: "What is in your garden?",
              sampleAnswer: "I can see a tree and two flowers.",
            },
            {
              question: "Do you like flowers?",
              sampleAnswer: "Yes, I like flowers.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 17 ───────────────────────────
      {
        topic: "Sea Animals",
        topicVi: "Con vật dưới biển",
        icon: "🐠",
        words: [
          word("sea", "/siː/", "biển", "🌊"),
          word("fish", "/fɪʃ/", "con cá", "🐟"),
          word("crab", "/kræb/", "con cua", "🦀"),
          word("turtle", "/ˈtɜːrtl/", "con rùa", "🐢"),
          word("shell", "/ʃel/", "vỏ sò", "🐚"),
        ],
        sound: {
          letters: "b",
          sound: "/b/",
          hint: "Bé mím chặt hai môi rồi bật ra, cổ họng có rung nhẹ: /b/. Trẻ Việt hay đọc /b/ ở CUỐI từ thành /p/ hoặc nuốt luôn — “crab” vẫn phải còn tiếng /b/ nhỏ ở cuối, đừng đọc thành “cra”.",
          words: [
            { word: "ball", meaning: "quả bóng", emoji: "⚽" },
            { word: "bag", meaning: "cái cặp", emoji: "🎒" },
            { word: "bee", meaning: "con ong", emoji: "🐝" },
          ],
        },
        reading: {
          title: "At the sea",
          passage:
            "I like the sea. I can see a fish. A crab is in the sea. A turtle can swim. My shell is small. The sea is fun.",
          translation:
            "Tớ thích biển lắm. Tớ nhìn thấy một con cá. Một con cua ở dưới biển. Con rùa biết bơi. Vỏ sò của tớ bé xíu. Biển vui ơi là vui.",
          questions: [
            mcq(
              "What can swim?",
              "Con gì biết bơi?",
              ["turtle", "crab", "shell"],
              0,
              "Bài viết “A turtle can swim.” — “can swim” nghĩa là biết bơi, nên đáp án là con rùa.",
              "A turtle can swim.",
            ),
            mcq(
              "Where is the crab?",
              "Con cua ở đâu?",
              ["sea", "bed", "box"],
              0,
              "Câu “A crab is in the sea.” cho biết con cua ở dưới biển.",
              "A crab is in the sea.",
            ),
          ],
        },
        listening: {
          title: "Look at the sea",
          transcript:
            "Girl: Look, a turtle can swim!\nBoy: I can see a small fish too.\nGirl: My shell is very pretty.",
          questions: [
            mcq(
              "What does the boy see?",
              "Bạn trai nhìn thấy con gì?",
              ["crab", "fish", "turtle"],
              1,
              "Bạn trai nói “I can see a small fish too.” — bạn ấy thấy một con cá nhỏ.",
              "I can see a small fish too.",
            ),
            mcq(
              "What is pretty?",
              "Cái gì đẹp?",
              ["shell", "fish", "crab"],
              0,
              "Bạn gái nói “My shell is very pretty.” — vỏ sò của bạn ấy rất đẹp.",
              "My shell is very pretty.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ biển và các con vật dưới biển, rồi chép 3 câu kể chúng làm được gì. Dùng mẫu: A fish can swim.",
        writingOutline:
          "1. Câu mở: I like the sea.\n2. Kể con vật: A fish can swim. A crab can walk.\n3. Câu cuối: The sea is fun.",
        speaking: {
          sentences: ["I like the sea.", "A fish can swim.", "My shell is small."],
          questions: [
            {
              question: "What can you see at the sea?",
              sampleAnswer: "I can see a fish and a crab.",
            },
            {
              question: "Can you swim?",
              sampleAnswer: "Yes, I can swim.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 18 ───────────────────────────
      {
        topic: "The Weather",
        topicVi: "Ông trời hôm nay",
        icon: "☀️",
        words: [
          word("sun", "/sʌn/", "mặt trời", "☀️"),
          word("rain", "/reɪn/", "mưa", "🌧️"),
          word("cloud", "/klaʊd/", "đám mây", "☁️"),
          word("wind", "/wɪnd/", "gió", "🌬️"),
          word("snow", "/snoʊ/", "tuyết", "❄️"),
        ],
        sound: {
          letters: "f",
          sound: "/f/",
          hint: "Bé đặt răng trên chạm nhẹ môi dưới rồi thổi hơi ra: /f/. Đây không phải “ph” bật mạnh của tiếng Việt, hơi phải ra đều và dài. Nhớ giữ /f/ ở cuối từ: “leaf” đừng nuốt mất thành “li”.",
          words: [
            { word: "fish", meaning: "con cá", emoji: "🐟" },
            { word: "frog", meaning: "con ếch", emoji: "🐸" },
            { word: "fan", meaning: "cái quạt", emoji: "🪭" },
          ],
        },
        reading: {
          title: "The weather today",
          passage:
            "Look at the sky today. The sun is hot. The cloud is white. The wind is cool. Rain is wet. Snow is very cold. I like the sun.",
          translation:
            "Nhìn bầu trời hôm nay này. Mặt trời nóng lắm. Đám mây màu trắng. Gió thì mát. Mưa thì ướt. Tuyết lạnh ơi là lạnh. Tớ thích mặt trời.",
          questions: [
            mcq(
              "What colour is the cloud?",
              "Đám mây màu gì?",
              ["white", "black", "red"],
              0,
              "Bài viết “The cloud is white.” — “white” nghĩa là màu trắng.",
              "The cloud is white.",
            ),
            mcq(
              "What is very cold?",
              "Cái gì lạnh ơi là lạnh?",
              ["snow", "sun", "wind"],
              0,
              "Câu “Snow is very cold.” cho biết tuyết rất lạnh. Gió chỉ mát thôi.",
              "Snow is very cold.",
            ),
          ],
        },
        listening: {
          title: "Is it sunny today?",
          transcript:
            "Mum: Look outside. It is sunny today.\nBoy: Is it hot?\nMum: Yes. But the wind is cool.",
          questions: [
            mcq(
              "How is the weather today?",
              "Hôm nay thời tiết thế nào?",
              ["rainy", "sunny", "snowy"],
              1,
              "Mẹ nói “It is sunny today.” — “sunny” nghĩa là trời nắng.",
              "It is sunny today.",
            ),
            mcq(
              "What is cool?",
              "Cái gì mát?",
              ["sun", "wind", "rain"],
              1,
              "Mẹ nói “But the wind is cool.” — gió thì mát, còn mặt trời thì nóng.",
              "the wind is cool",
            ),
          ],
        },
        writingPrompt:
          "Bé nhìn ra cửa sổ, vẽ bầu trời hôm nay rồi chép 3 câu tả thời tiết. Dùng mẫu: It is sunny.",
        writingOutline:
          "1. Câu mở: Look at the sky today.\n2. Tả thời tiết: It is sunny. The wind is cool.\n3. Câu cuối: I like the sun.",
        speaking: {
          sentences: ["It is sunny today.", "The cloud is white.", "I like the sun."],
          questions: [
            {
              question: "How is the weather today?",
              sampleAnswer: "It is sunny and hot.",
            },
            {
              question: "Do you like rain?",
              sampleAnswer: "Yes, I like rain.",
            },
          ],
        },
      },
    ],
  },
];
