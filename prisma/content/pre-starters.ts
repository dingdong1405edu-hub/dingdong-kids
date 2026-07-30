// Nội dung bài học cấp `pre-starters` (4–5 tuổi · bé chưa biết đọc).
// Xem hợp đồng + hướng dẫn soạn theo cấp ở prisma/content/types.ts.
//
// Ràng buộc riêng của cấp này (đã bám sát khi soạn):
//   • Đoạn đọc 12–35 từ, mỗi câu 3–5 từ, CHỈ thì hiện tại đơn.
//   • 4–6 từ vựng/bài, toàn danh từ cụ thể nhìn thấy được; từ nào cũng phải
//     xuất hiện lại trong đoạn đọc của chính bài đó.
//   • 1–2 câu hỏi/bài, 3 lựa chọn, mỗi lựa chọn CHỈ 1 TỪ.
//   • Lời thoại nghe 2–3 lượt, mỗi lượt ≤ 8 từ.
//   • Phonics đi theo nhóm satpin (s a t p i n) rồi m d g o c k — mỗi bài MỘT âm.
import { type ChapterSeed, mcq, tf, word } from "./types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 1 · Bé và gia đình",
    subtitle: "Bé kể về người thân, về cơ thể và khuôn mặt của mình",
    lessons: [
      // ─────────────────────────── Bài 1 ───────────────────────────
      {
        topic: "My Family",
        topicVi: "Gia đình của bé",
        icon: "👨‍👩‍👧",
        words: [
          word("family", "/ˈfæməli/", "gia đình", "👨‍👩‍👧"),
          word("mum", "/mʌm/", "mẹ", "👩"),
          word("dad", "/dæd/", "bố", "👨"),
          word("sister", "/ˈsɪstər/", "chị gái, em gái", "👧"),
          word("brother", "/ˈbrʌðər/", "anh trai, em trai", "👦"),
          word("baby", "/ˈbeɪbi/", "em bé", "👶"),
        ],
        sound: {
          letters: "s",
          sound: "/s/",
          hint: "Bé hé răng, đẩy hơi ra như tiếng rắn kêu 'sss…'. Trẻ Việt rất hay nuốt mất âm /s/ ở CUỐI từ — 'cats' đọc thành 'cat', 'books' thành 'book'. Bé nhớ giữ tiếng 'sss' nhỏ ở cuối nhé.",
          words: [
            { word: "sun", meaning: "mặt trời", emoji: "☀️" },
            { word: "sock", meaning: "chiếc tất", emoji: "🧦" },
            { word: "snake", meaning: "con rắn", emoji: "🐍" },
          ],
        },
        reading: {
          title: "This is my family",
          passage:
            "This is my family. This is my mum. This is my dad. I have a sister. I have a baby brother. I love my family.",
          translation:
            "Đây là gia đình tớ. Đây là mẹ tớ. Đây là bố tớ. Tớ có một chị gái. Tớ có một em trai nhỏ. Tớ yêu gia đình tớ lắm.",
          questions: [
            mcq(
              "What does the child love?",
              "Bạn nhỏ yêu điều gì?",
              ["school", "family", "car"],
              1,
              "Câu cuối bài viết 'I love my family.' — 'family' nghĩa là gia đình, nên đáp án đúng là 'family'.",
              "I love my family.",
            ),
            tf(
              "The child has a baby brother.",
              "Bạn nhỏ có một em trai nhỏ.",
              true,
              "Trong bài có câu 'I have a baby brother.' — bạn nhỏ đúng là có một em trai nhỏ, nên câu này ĐÚNG.",
              "I have a baby brother.",
            ),
          ],
        },
        listening: {
          title: "Meet my family",
          transcript:
            "Girl: This is my mum.\nBoy: Is this your dad?\nGirl: Yes! And this is my baby brother.",
          questions: [
            mcq(
              "Who does the girl show first?",
              "Bạn gái giới thiệu ai đầu tiên?",
              ["dad", "brother", "mum"],
              2,
              "Câu đầu tiên bạn gái nói là 'This is my mum.' — bạn ấy giới thiệu mẹ trước.",
              "This is my mum.",
            ),
            mcq(
              "Who does the girl show last?",
              "Bạn gái giới thiệu ai cuối cùng?",
              ["brother", "sister", "dad"],
              0,
              "Câu cuối bạn gái nói 'And this is my baby brother.' — người cuối cùng được giới thiệu là em trai.",
              "this is my baby brother",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ gia đình mình vào giấy, rồi chép lại 3 câu giới thiệu. Dùng mẫu: This is my mum.",
        writingOutline:
          "1. Câu mở: This is my family.\n2. Chỉ vào từng người: This is my mum. This is my dad.\n3. Câu cuối: I love my family.",
        speaking: {
          sentences: ["This is my mum.", "I have a sister.", "I love my family."],
          questions: [
            {
              question: "Who is in your family?",
              sampleAnswer: "My mum, my dad and me.",
            },
            {
              question: "Do you have a sister?",
              sampleAnswer: "Yes, I have one sister.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 2 ───────────────────────────
      {
        topic: "My Body",
        topicVi: "Cơ thể của bé",
        icon: "🧍",
        words: [
          word("body", "/ˈbɑːdi/", "cơ thể", "🧍"),
          word("hand", "/hænd/", "bàn tay", "✋"),
          word("arm", "/ɑːrm/", "cánh tay", "💪"),
          word("leg", "/leɡ/", "chân", "🦵"),
          word("foot", "/fʊt/", "bàn chân", "🦶"),
        ],
        sound: {
          letters: "a",
          sound: "/æ/",
          hint: "Bé há miệng rộng, kéo hai bên miệng sang ngang: /æ/. Đây KHÔNG phải chữ 'a' tiếng Việt — 'cat' không đọc là 'cát'. Và nhớ bật /t/ ở cuối, trẻ Việt hay nuốt thành 'ca'.",
          words: [
            { word: "apple", meaning: "quả táo", emoji: "🍎" },
            { word: "ant", meaning: "con kiến", emoji: "🐜" },
            { word: "cat", meaning: "con mèo", emoji: "🐱" },
          ],
        },
        reading: {
          title: "My body",
          passage:
            "This is my body. I have two hands. I have two arms. I have two legs. This is my foot. I clap my hands. My body is strong.",
          translation:
            "Đây là cơ thể tớ. Tớ có hai bàn tay. Tớ có hai cánh tay. Tớ có hai chân. Đây là bàn chân tớ. Tớ vỗ hai bàn tay. Cơ thể tớ khoẻ lắm.",
          questions: [
            mcq(
              "How many hands does the child have?",
              "Bạn nhỏ có mấy bàn tay?",
              ["one", "two", "three"],
              1,
              "Bài viết 'I have two hands.' — 'two' nghĩa là hai, nên bạn nhỏ có hai bàn tay.",
              "I have two hands.",
            ),
            mcq(
              "What does the child clap?",
              "Bạn nhỏ vỗ cái gì?",
              ["legs", "arms", "hands"],
              2,
              "Câu 'I clap my hands.' cho biết bạn nhỏ vỗ hai bàn tay, không phải chân hay cánh tay.",
              "I clap my hands.",
            ),
          ],
        },
        listening: {
          title: "Clap your hands",
          transcript:
            "Boy: Look at my hands.\nGirl: I have two hands too.\nBoy: Now we clap our hands!",
          questions: [
            mcq(
              "How many hands does the girl have?",
              "Bạn gái có mấy bàn tay?",
              ["one", "two", "four"],
              1,
              "Bạn gái nói 'I have two hands too.' — bạn ấy cũng có hai bàn tay.",
              "I have two hands too.",
            ),
            mcq(
              "What do the children do at the end?",
              "Cuối cùng hai bạn làm gì?",
              ["clap", "jump", "run"],
              0,
              "Bạn trai nói 'Now we clap our hands!' — hai bạn cùng vỗ tay.",
              "Now we clap our hands!",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ hình người rồi chép 3 câu nói về cơ thể mình. Dùng mẫu: I have two hands.",
        writingOutline:
          "1. Câu mở: This is my body.\n2. Đếm bộ phận: I have two hands. I have two legs.\n3. Câu cuối: My body is strong.",
        speaking: {
          sentences: ["This is my body.", "I have two hands.", "I clap my hands."],
          questions: [
            {
              question: "How many hands do you have?",
              sampleAnswer: "I have two hands.",
            },
            {
              question: "Can you clap your hands?",
              sampleAnswer: "Yes, I can clap my hands.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 3 ───────────────────────────
      {
        topic: "My Face",
        topicVi: "Khuôn mặt của bé",
        icon: "😊",
        words: [
          word("face", "/feɪs/", "khuôn mặt", "😊"),
          word("eye", "/aɪ/", "mắt", "👁️"),
          word("nose", "/noʊz/", "mũi", "👃"),
          word("ear", "/ɪr/", "tai", "👂"),
          word("mouth", "/maʊθ/", "miệng", "👄"),
        ],
        sound: {
          letters: "t",
          sound: "/t/",
          hint: "Đầu lưỡi chạm lợi trên rồi bật hơi ra thật gọn: /t/. Trẻ Việt hay nuốt /t/ ở cuối từ — 'cat' thành 'ca', 'hat' thành 'ha'. Bé để tay trước miệng, thấy hơi phả nhẹ là đúng.",
          words: [
            { word: "ten", meaning: "số mười", emoji: "🔟" },
            { word: "tap", meaning: "vòi nước", emoji: "🚰" },
            { word: "tiger", meaning: "con hổ", emoji: "🐯" },
          ],
        },
        reading: {
          title: "My happy face",
          passage:
            "This is my face. I have two eyes. I have one nose. I have two ears. My mouth is small. I smile every day.",
          translation:
            "Đây là khuôn mặt tớ. Tớ có hai mắt. Tớ có một cái mũi. Tớ có hai tai. Miệng tớ nhỏ xíu. Ngày nào tớ cũng cười.",
          questions: [
            mcq(
              "How many eyes does the child have?",
              "Bạn nhỏ có mấy con mắt?",
              ["one", "two", "four"],
              1,
              "Bài viết 'I have two eyes.' — 'two' là hai, nên bạn nhỏ có hai con mắt.",
              "I have two eyes.",
            ),
            tf(
              "The child has one ear.",
              "Bạn nhỏ có một cái tai.",
              false,
              "Bài viết 'I have two ears.' — 'two' là HAI, nên bạn nhỏ có hai tai chứ không phải một. Câu này SAI.",
              "I have two ears.",
            ),
          ],
        },
        listening: {
          title: "Where is your nose?",
          transcript:
            "Mum: Where is your nose?\nBoy: Here is my nose!\nMum: Good! Now touch your ears.",
          questions: [
            mcq(
              "What does Mum ask about first?",
              "Đầu tiên mẹ hỏi về bộ phận nào?",
              ["ears", "eyes", "nose"],
              2,
              "Mẹ hỏi 'Where is your nose?' ngay câu đầu — mẹ hỏi về cái mũi trước.",
              "Where is your nose?",
            ),
            mcq(
              "What must the boy touch next?",
              "Tiếp theo bạn trai phải chạm vào đâu?",
              ["ears", "mouth", "hands"],
              0,
              "Mẹ nói 'Now touch your ears.' — bạn trai phải chạm vào hai tai.",
              "Now touch your ears.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ khuôn mặt cười của mình, rồi chép 3 câu nói về khuôn mặt đó. Dùng mẫu: I have two eyes.",
        writingOutline:
          "1. Câu mở: This is my face.\n2. Đếm bộ phận: I have two eyes. I have one nose.\n3. Câu cuối: I smile every day.",
        speaking: {
          sentences: ["This is my face.", "I have two ears.", "I smile every day."],
          questions: [
            {
              question: "How many eyes do you have?",
              sampleAnswer: "I have two eyes.",
            },
            {
              question: "Where is your nose?",
              sampleAnswer: "Here is my nose!",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 2 · Con vật đáng yêu",
    subtitle: "Thú cưng ở nhà, con vật ở nông trại và ở sở thú",
    lessons: [
      // ─────────────────────────── Bài 4 ───────────────────────────
      {
        topic: "Pets",
        topicVi: "Thú cưng của bé",
        icon: "🐶",
        words: [
          word("pet", "/pet/", "thú cưng", "🐾"),
          word("dog", "/dɔːɡ/", "con chó", "🐶"),
          word("cat", "/kæt/", "con mèo", "🐱"),
          word("fish", "/fɪʃ/", "con cá", "🐟"),
        ],
        sound: {
          letters: "p",
          sound: "/p/",
          hint: "Bé khép chặt hai môi rồi bật hơi ra: /p/. Để bàn tay trước miệng sẽ thấy hơi phả. Trẻ Việt hay nuốt /p/ ở cuối từ — 'map' thành 'ma'. Nhớ khép môi rồi bật nhẹ ở cuối nhé.",
          words: [
            { word: "pen", meaning: "cây bút", emoji: "🖊️" },
            { word: "pot", meaning: "cái nồi", emoji: "🍲" },
            { word: "panda", meaning: "gấu trúc", emoji: "🐼" },
          ],
        },
        reading: {
          title: "My pets",
          passage:
            "I have a pet dog. His name is Milo. I have a cat too. My cat is white. I have one fish. I love my pets.",
          translation:
            "Tớ có một chú chó cưng. Tên nó là Milo. Tớ cũng có một con mèo. Mèo của tớ màu trắng. Tớ có một con cá. Tớ yêu mấy bạn thú cưng của tớ lắm.",
          questions: [
            mcq(
              "What is the dog's name?",
              "Chú chó tên là gì?",
              ["Bibi", "Coco", "Milo"],
              2,
              "Bài viết 'His name is Milo.' — 'his' là của chú chó, nên chú chó tên Milo.",
              "His name is Milo.",
            ),
            mcq(
              "What colour is the cat?",
              "Con mèo màu gì?",
              ["black", "white", "brown"],
              1,
              "Câu 'My cat is white.' cho biết con mèo màu trắng — 'white' nghĩa là trắng.",
              "My cat is white.",
            ),
          ],
        },
        listening: {
          title: "Do you have a pet?",
          transcript:
            "Girl: Do you have a pet?\nBoy: Yes, I have a dog.\nGirl: I have a small fish.",
          questions: [
            mcq(
              "What pet does the boy have?",
              "Bạn trai nuôi con gì?",
              ["dog", "cat", "fish"],
              0,
              "Bạn trai trả lời 'Yes, I have a dog.' — bạn ấy nuôi một chú chó.",
              "Yes, I have a dog.",
            ),
            mcq(
              "What pet does the girl have?",
              "Bạn gái nuôi con gì?",
              ["dog", "cat", "fish"],
              2,
              "Bạn gái nói 'I have a small fish.' — bạn ấy nuôi một con cá nhỏ.",
              "I have a small fish.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ con thú cưng bé thích rồi chép 3 câu về nó. Dùng mẫu: I have a pet dog.",
        writingOutline:
          "1. Câu mở: I have a pet dog.\n2. Nói thêm: My cat is white.\n3. Câu cuối: I love my pets.",
        speaking: {
          sentences: ["I have a pet dog.", "My cat is white.", "I love my pets."],
          questions: [
            {
              question: "Do you have a pet?",
              sampleAnswer: "Yes, I have a cat.",
            },
            {
              question: "What pet do you like?",
              sampleAnswer: "I like dogs very much.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 5 ───────────────────────────
      {
        topic: "Farm Animals",
        topicVi: "Con vật ở nông trại",
        icon: "🐮",
        words: [
          word("farm", "/fɑːrm/", "nông trại", "🚜"),
          word("cow", "/kaʊ/", "con bò", "🐮"),
          word("duck", "/dʌk/", "con vịt", "🦆"),
          word("hen", "/hen/", "con gà mái", "🐔"),
          word("pig", "/pɪɡ/", "con lợn", "🐷"),
        ],
        sound: {
          letters: "i",
          sound: "/ɪ/",
          hint: "Âm /ɪ/ ngắn và thả lỏng, KHÔNG kéo dài như chữ 'i' tiếng Việt: 'ship' khác hẳn 'sheep'. Bé đọc nhanh, gọn. Và nhớ bật rõ phụ âm cuối — 'six' phải nghe được 'ks', đừng thành 'si'.",
          words: [
            { word: "pig", meaning: "con lợn", emoji: "🐷" },
            { word: "fish", meaning: "con cá", emoji: "🐟" },
            { word: "six", meaning: "số sáu", emoji: "6️⃣" },
          ],
        },
        reading: {
          title: "At the farm",
          passage:
            "I go to the farm. I see a big cow. I see six ducks. The hen is small. The pig is pink. The farm is fun.",
          translation:
            "Tớ đi thăm nông trại. Tớ thấy một con bò to. Tớ thấy sáu con vịt. Con gà mái nhỏ xíu. Con lợn màu hồng. Nông trại vui thật!",
          questions: [
            mcq(
              "How many ducks are there?",
              "Có mấy con vịt?",
              ["two", "six", "ten"],
              1,
              "Bài viết 'I see six ducks.' — 'six' nghĩa là sáu, nên có sáu con vịt.",
              "I see six ducks.",
            ),
            mcq(
              "What colour is the pig?",
              "Con lợn màu gì?",
              ["pink", "blue", "green"],
              0,
              "Câu 'The pig is pink.' cho biết con lợn màu hồng — 'pink' là màu hồng.",
              "The pig is pink.",
            ),
          ],
        },
        listening: {
          title: "Look at the farm",
          transcript:
            "Boy: Look! A big cow.\nGirl: I can see six ducks.\nBoy: The little pig is pink.",
          questions: [
            mcq(
              "What does the girl see?",
              "Bạn gái nhìn thấy con gì?",
              ["hens", "ducks", "cows"],
              1,
              "Bạn gái nói 'I can see six ducks.' — bạn ấy nhìn thấy sáu con vịt.",
              "I can see six ducks.",
            ),
            tf(
              "The pig is pink.",
              "Con lợn màu hồng.",
              true,
              "Bạn trai nói 'The little pig is pink.' — con lợn đúng là màu hồng, nên câu này ĐÚNG.",
              "The little pig is pink.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ một con vật ở nông trại rồi chép 3 câu về nông trại. Dùng mẫu: I see a big cow.",
        writingOutline:
          "1. Câu mở: I go to the farm.\n2. Kể con vật: I see a big cow. I see six ducks.\n3. Câu cuối: The farm is fun.",
        speaking: {
          sentences: ["I see a big cow.", "The pig is pink.", "The farm is fun."],
          questions: [
            {
              question: "What animals are on a farm?",
              sampleAnswer: "Cows, ducks and pigs.",
            },
            {
              question: "Do you like the farm?",
              sampleAnswer: "Yes, the farm is fun.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 6 ───────────────────────────
      {
        topic: "Zoo Animals",
        topicVi: "Con vật ở sở thú",
        icon: "🦁",
        words: [
          word("zoo", "/zuː/", "sở thú", "🏞️"),
          word("lion", "/ˈlaɪən/", "con sư tử", "🦁"),
          word("monkey", "/ˈmʌŋki/", "con khỉ", "🐵"),
          word("elephant", "/ˈelɪfənt/", "con voi", "🐘"),
          word("tiger", "/ˈtaɪɡər/", "con hổ", "🐯"),
        ],
        sound: {
          letters: "n",
          sound: "/n/",
          hint: "Đầu lưỡi chạm lợi trên, hơi đi ra qua MŨI — bé bịt mũi lại là không kêu được /n/. Trẻ Việt hay nuốt /n/ ở cuối từ: 'ten' thành 'te'. Bé giữ lưỡi chạm lợi cho tới hết tiếng nhé.",
          words: [
            { word: "nose", meaning: "cái mũi", emoji: "👃" },
            { word: "net", meaning: "cái vợt", emoji: "🥅" },
            { word: "nine", meaning: "số chín", emoji: "9️⃣" },
          ],
        },
        reading: {
          title: "A day at the zoo",
          passage:
            "I am at the zoo. The lion is big. The monkey eats a banana. The elephant is grey. The tiger runs fast. I like the zoo.",
          translation:
            "Tớ đang ở sở thú. Con sư tử to ơi là to. Con khỉ đang ăn quả chuối. Con voi màu xám. Con hổ chạy nhanh lắm. Tớ thích sở thú.",
          questions: [
            mcq(
              "What does the monkey eat?",
              "Con khỉ ăn quả gì?",
              ["apple", "fish", "banana"],
              2,
              "Bài viết 'The monkey eats a banana.' — 'banana' là quả chuối, nên con khỉ ăn chuối.",
              "The monkey eats a banana.",
            ),
            mcq(
              "What colour is the elephant?",
              "Con voi màu gì?",
              ["grey", "pink", "red"],
              0,
              "Câu 'The elephant is grey.' cho biết con voi màu xám — 'grey' là màu xám.",
              "The elephant is grey.",
            ),
          ],
        },
        listening: {
          title: "At the zoo",
          transcript:
            "Girl: Look at the big lion!\nBoy: The monkey has a banana.\nGirl: I like the grey elephant.",
          questions: [
            mcq(
              "Which animal has a banana?",
              "Con vật nào có quả chuối?",
              ["lion", "monkey", "elephant"],
              1,
              "Bạn trai nói 'The monkey has a banana.' — con khỉ đang cầm quả chuối.",
              "The monkey has a banana.",
            ),
            mcq(
              "Which animal does the girl like?",
              "Bạn gái thích con vật nào?",
              ["tiger", "monkey", "elephant"],
              2,
              "Bạn gái nói 'I like the grey elephant.' — bạn ấy thích con voi màu xám.",
              "I like the grey elephant.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ con vật bé thích nhất ở sở thú rồi chép 3 câu về nó. Dùng mẫu: The lion is big.",
        writingOutline:
          "1. Câu mở: I am at the zoo.\n2. Kể con vật: The lion is big. The elephant is grey.\n3. Câu cuối: I like the zoo.",
        speaking: {
          sentences: ["The lion is big.", "The tiger runs fast.", "I like the zoo."],
          questions: [
            {
              question: "What animal do you like at the zoo?",
              sampleAnswer: "I like the big elephant.",
            },
            {
              question: "Is the lion big or small?",
              sampleAnswer: "The lion is very big.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 3 · Màu sắc và số đếm",
    subtitle: "Bé gọi tên màu, đếm từ 1 đến 5 và nhận biết hình khối",
    lessons: [
      // ─────────────────────────── Bài 7 ───────────────────────────
      {
        topic: "Colours",
        topicVi: "Màu sắc quanh bé",
        icon: "🌈",
        words: [
          word("balloon", "/bəˈluːn/", "quả bóng bay", "🎈"),
          word("red", "/red/", "màu đỏ", "🔴"),
          word("blue", "/bluː/", "màu xanh dương", "🔵"),
          word("yellow", "/ˈjeloʊ/", "màu vàng", "🟡"),
          word("green", "/ɡriːn/", "màu xanh lá", "🟢"),
          word("rainbow", "/ˈreɪnboʊ/", "cầu vồng", "🌈"),
        ],
        sound: {
          letters: "m",
          sound: "/m/",
          hint: "Bé ngậm chặt hai môi rồi kêu 'mmm…' như lúc ăn món ngon — hơi đi ra qua mũi. Trẻ Việt hay nuốt /m/ ở cuối từ: 'time' thành 'tai'. Bé ngậm môi cho tới hết tiếng nhé.",
          words: [
            { word: "mum", meaning: "mẹ", emoji: "👩" },
            { word: "moon", meaning: "mặt trăng", emoji: "🌙" },
            { word: "map", meaning: "tấm bản đồ", emoji: "🗺️" },
          ],
        },
        reading: {
          title: "My balloons",
          passage:
            "Look at my balloons! This one is red. This one is blue. This one is yellow. This one is green. I see a rainbow!",
          translation:
            "Nhìn chùm bóng bay của tớ này! Quả này màu đỏ. Quả này màu xanh dương. Quả này màu vàng. Quả này màu xanh lá. Tớ thấy cả cầu vồng nữa!",
          questions: [
            mcq(
              "What does the child see at the end?",
              "Cuối bài bạn nhỏ nhìn thấy gì?",
              ["rainbow", "sun", "moon"],
              0,
              "Câu cuối bài là 'I see a rainbow!' — 'rainbow' nghĩa là cầu vồng.",
              "I see a rainbow!",
            ),
            tf(
              "One balloon is green.",
              "Có một quả bóng màu xanh lá.",
              true,
              "Bài có câu 'This one is green.' — đúng là có một quả bóng màu xanh lá, nên câu này ĐÚNG.",
              "This one is green.",
            ),
          ],
        },
        listening: {
          title: "Two balloons",
          transcript:
            "Girl: My balloon is red.\nBoy: My balloon is blue.\nGirl: Look, a big rainbow!",
          questions: [
            mcq(
              "What colour is the boy's balloon?",
              "Bóng bay của bạn trai màu gì?",
              ["red", "blue", "green"],
              1,
              "Bạn trai nói 'My balloon is blue.' — bóng của bạn ấy màu xanh dương.",
              "My balloon is blue.",
            ),
            mcq(
              "What does the girl see in the sky?",
              "Bạn gái nhìn thấy gì trên trời?",
              ["star", "cloud", "rainbow"],
              2,
              "Bạn gái reo lên 'Look, a big rainbow!' — bạn ấy thấy một chiếc cầu vồng to.",
              "Look, a big rainbow!",
            ),
          ],
        },
        writingPrompt:
          "Bé tô 3 quả bóng bay bằng 3 màu khác nhau, rồi chép 3 câu gọi tên màu. Dùng mẫu: This one is red.",
        writingOutline:
          "1. Câu mở: Look at my balloons!\n2. Gọi tên màu: This one is red. This one is blue.\n3. Câu cuối: I see a rainbow!",
        speaking: {
          sentences: ["This one is red.", "My balloon is blue.", "I see a rainbow!"],
          questions: [
            {
              question: "What colour do you like?",
              sampleAnswer: "I like blue and green.",
            },
            {
              question: "What colour is your bag?",
              sampleAnswer: "My bag is yellow.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 8 ───────────────────────────
      {
        topic: "Numbers 1-5",
        topicVi: "Đếm từ 1 đến 5",
        icon: "🔢",
        words: [
          word("one", "/wʌn/", "số một", "1️⃣"),
          word("two", "/tuː/", "số hai", "2️⃣"),
          word("three", "/θriː/", "số ba", "3️⃣"),
          word("four", "/fɔːr/", "số bốn", "4️⃣"),
          word("five", "/faɪv/", "số năm", "5️⃣"),
        ],
        sound: {
          letters: "d",
          sound: "/d/",
          hint: "Đầu lưỡi chạm lợi trên rồi bật ra, cổ họng RUNG — bé đặt tay lên cổ, thấy rung là đúng (khác /t/ không rung). Trẻ Việt hay nuốt /d/ cuối từ và quên đuôi '-ed': 'played' phải nghe rõ 'd' ở cuối.",
          words: [
            { word: "dog", meaning: "con chó", emoji: "🐶" },
            { word: "duck", meaning: "con vịt", emoji: "🦆" },
            { word: "doll", meaning: "búp bê", emoji: "🪆" },
          ],
        },
        reading: {
          title: "I count my toys",
          passage:
            "I count my toys. I have one teddy. I have two cars. I have three balls. I have four blocks. I have five stars!",
          translation:
            "Tớ đếm đồ chơi của tớ. Tớ có một chú gấu bông. Tớ có hai chiếc ô tô. Tớ có ba quả bóng. Tớ có bốn khối gỗ. Tớ có năm ngôi sao!",
          questions: [
            mcq(
              "How many cars does the child have?",
              "Bạn nhỏ có mấy chiếc ô tô?",
              ["two", "three", "five"],
              0,
              "Bài viết 'I have two cars.' — 'two' nghĩa là hai, nên bạn nhỏ có hai chiếc ô tô.",
              "I have two cars.",
            ),
            mcq(
              "How many stars does the child have?",
              "Bạn nhỏ có mấy ngôi sao?",
              ["one", "four", "five"],
              2,
              "Câu cuối bài là 'I have five stars!' — 'five' nghĩa là năm.",
              "I have five stars!",
            ),
          ],
        },
        listening: {
          title: "Count with me",
          transcript:
            "Teacher: How many balls do you see?\nGirl: I see three balls.\nTeacher: Yes! Now count the five stars.",
          questions: [
            mcq(
              "How many balls does the girl see?",
              "Bạn gái nhìn thấy mấy quả bóng?",
              ["two", "three", "four"],
              1,
              "Bạn gái trả lời 'I see three balls.' — 'three' nghĩa là ba quả bóng.",
              "I see three balls.",
            ),
            mcq(
              "How many stars must the girl count?",
              "Bạn gái phải đếm mấy ngôi sao?",
              ["two", "three", "five"],
              2,
              "Cô giáo nói 'Now count the five stars.' — bạn gái phải đếm năm ngôi sao.",
              "Now count the five stars.",
            ),
          ],
        },
        writingPrompt:
          "Bé xếp đồ chơi của mình ra rồi đếm, sau đó chép 3 câu. Dùng mẫu: I have two cars.",
        writingOutline:
          "1. Câu mở: I count my toys.\n2. Đếm đồ chơi: I have one teddy. I have three balls.\n3. Câu cuối: I have five stars!",
        speaking: {
          sentences: ["I have two cars.", "I see three balls.", "I have five stars!"],
          questions: [
            {
              question: "How many toys do you have?",
              sampleAnswer: "I have four toys.",
            },
            {
              question: "Can you count to five?",
              sampleAnswer: "One, two, three, four, five!",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 9 ───────────────────────────
      {
        topic: "Shapes",
        topicVi: "Hình tròn, hình vuông",
        icon: "🔺",
        words: [
          word("circle", "/ˈsɜːrkl/", "hình tròn", "⭕"),
          word("square", "/skwer/", "hình vuông", "🟦"),
          word("triangle", "/ˈtraɪæŋɡl/", "hình tam giác", "🔺"),
          word("star", "/stɑːr/", "ngôi sao", "⭐"),
          word("heart", "/hɑːrt/", "trái tim", "❤️"),
        ],
        sound: {
          letters: "g",
          sound: "/ɡ/",
          hint: "Cuống lưỡi nâng lên chạm vòm mềm phía sau rồi bật ra, cổ họng RUNG: /ɡ/ (khác /k/ không rung). Trẻ Việt hay nuốt /ɡ/ ở cuối từ — 'big' thành 'bi'. Bé bật nhẹ một tiếng nhỏ ở cuối nhé.",
          words: [
            { word: "goat", meaning: "con dê", emoji: "🐐" },
            { word: "girl", meaning: "bạn gái", emoji: "👧" },
            { word: "gift", meaning: "món quà", emoji: "🎁" },
          ],
        },
        reading: {
          title: "I draw shapes",
          passage:
            "I draw many shapes today. This is a big circle. This is a red square. This is a green triangle. This is a gold star. I draw a small heart.",
          translation:
            "Hôm nay tớ vẽ thật nhiều hình. Đây là hình tròn to. Đây là hình vuông màu đỏ. Đây là hình tam giác màu xanh lá. Đây là ngôi sao vàng óng. Tớ vẽ một trái tim nhỏ.",
          questions: [
            mcq(
              "What colour is the square?",
              "Hình vuông màu gì?",
              ["red", "blue", "green"],
              0,
              "Bài viết 'This is a red square.' — 'red' nghĩa là màu đỏ.",
              "This is a red square.",
            ),
            mcq(
              "Which shape is small?",
              "Hình nào nhỏ?",
              ["star", "circle", "heart"],
              2,
              "Câu cuối bài là 'I draw a small heart.' — 'small' nghĩa là nhỏ, nên trái tim là hình nhỏ.",
              "I draw a small heart.",
            ),
          ],
        },
        listening: {
          title: "Draw with me",
          transcript:
            "Teacher: Draw a big circle, please.\nBoy: Look! My circle is blue.\nTeacher: Now draw a red square.",
          questions: [
            mcq(
              "What colour is the boy's circle?",
              "Hình tròn của bạn trai màu gì?",
              ["red", "blue", "green"],
              1,
              "Bạn trai nói 'My circle is blue.' — hình tròn của bạn ấy màu xanh dương.",
              "My circle is blue.",
            ),
            mcq(
              "What shape must the boy draw next?",
              "Tiếp theo bạn trai phải vẽ hình gì?",
              ["square", "circle", "star"],
              0,
              "Cô giáo nói 'Now draw a red square.' — bạn trai phải vẽ hình vuông màu đỏ.",
              "Now draw a red square.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ 3 hình khác nhau rồi chép 3 câu gọi tên hình. Dùng mẫu: This is a big circle.",
        writingOutline:
          "1. Câu mở: I draw many shapes today.\n2. Gọi tên hình: This is a big circle. This is a red square.\n3. Câu cuối: I draw a small heart.",
        speaking: {
          sentences: ["This is a big circle.", "This is a red square.", "I draw a small heart."],
          questions: [
            {
              question: "What shape do you like?",
              sampleAnswer: "I like the gold star.",
            },
            {
              question: "Can you draw a circle?",
              sampleAnswer: "Yes, I draw a big circle.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 4 · Đồ ăn và đồ chơi",
    subtitle: "Hoa quả bé thích, đồ chơi thân quen và đồ uống mỗi ngày",
    lessons: [
      // ─────────────────────────── Bài 10 ───────────────────────────
      {
        topic: "Fruits",
        topicVi: "Hoa quả bé thích",
        icon: "🍎",
        words: [
          word("apple", "/ˈæpl/", "quả táo", "🍎"),
          word("banana", "/bəˈnænə/", "quả chuối", "🍌"),
          word("orange", "/ˈɔːrɪndʒ/", "quả cam", "🍊"),
          word("mango", "/ˈmæŋɡoʊ/", "quả xoài", "🥭"),
          word("grape", "/ɡreɪp/", "quả nho", "🍇"),
        ],
        sound: {
          letters: "o",
          sound: "/ɒ/",
          hint: "Bé há miệng, tròn môi và đọc THẬT NGẮN: /ɒ/. 'box' không kéo dài thành 'bóoc'. Trẻ Việt hay nuốt phụ âm cuối — 'box' thành 'bo'; nhớ bật rõ tiếng 'ks' ở cuối nhé.",
          words: [
            { word: "octopus", meaning: "con bạch tuộc", emoji: "🐙" },
            { word: "pot", meaning: "cái nồi", emoji: "🍲" },
            { word: "box", meaning: "cái hộp", emoji: "📦" },
          ],
        },
        reading: {
          title: "I like fruit",
          passage:
            "I like fruit very much. This apple is red. This banana is yellow. I eat one orange. I eat one mango. I love grapes too!",
          translation:
            "Tớ thích hoa quả lắm. Quả táo này màu đỏ. Quả chuối này màu vàng. Tớ ăn một quả cam. Tớ ăn một quả xoài. Tớ cũng thích nho nữa!",
          questions: [
            mcq(
              "What colour is the banana?",
              "Quả chuối màu gì?",
              ["red", "green", "yellow"],
              2,
              "Bài viết 'This banana is yellow.' — 'yellow' nghĩa là màu vàng.",
              "This banana is yellow.",
            ),
            tf(
              "The child eats two mangoes.",
              "Bạn nhỏ ăn hai quả xoài.",
              false,
              "Bài viết 'I eat one mango.' — 'one' là MỘT, nên bạn nhỏ chỉ ăn một quả xoài thôi. Câu này SAI.",
              "I eat one mango.",
            ),
          ],
        },
        listening: {
          title: "An apple, please",
          transcript:
            "Mum: Do you want an apple?\nGirl: Yes, please. I like red apples.\nMum: Here is a banana too.",
          questions: [
            mcq(
              "What fruit does the girl like?",
              "Bạn gái thích quả gì?",
              ["apples", "mangoes", "grapes"],
              0,
              "Bạn gái nói 'I like red apples.' — bạn ấy thích táo đỏ.",
              "I like red apples.",
            ),
            mcq(
              "What does Mum give her too?",
              "Mẹ đưa thêm cho bạn ấy quả gì?",
              ["orange", "banana", "mango"],
              1,
              "Mẹ nói 'Here is a banana too.' — mẹ đưa thêm một quả chuối.",
              "Here is a banana too.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ 2 loại quả bé thích rồi chép 3 câu về chúng. Dùng mẫu: This apple is red.",
        writingOutline:
          "1. Câu mở: I like fruit very much.\n2. Gọi tên quả và màu: This apple is red. This banana is yellow.\n3. Câu cuối: I love grapes too!",
        speaking: {
          sentences: ["This apple is red.", "I eat one mango.", "I love grapes too!"],
          questions: [
            {
              question: "What fruit do you like?",
              sampleAnswer: "I like mangoes and apples.",
            },
            {
              question: "What colour is a banana?",
              sampleAnswer: "A banana is yellow.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 11 ───────────────────────────
      {
        topic: "My Toys",
        topicVi: "Đồ chơi của bé",
        icon: "🧸",
        words: [
          word("toy", "/tɔɪ/", "đồ chơi", "🪀"),
          word("teddy", "/ˈtedi/", "gấu bông", "🧸"),
          word("car", "/kɑːr/", "ô tô đồ chơi", "🚗"),
          word("ball", "/bɔːl/", "quả bóng", "⚽"),
          word("doll", "/dɑːl/", "búp bê", "🪆"),
          word("kite", "/kaɪt/", "con diều", "🪁"),
        ],
        sound: {
          letters: "c",
          sound: "/k/",
          hint: "Chữ 'c' đứng trước a, o, u đọc là /k/: cat, cup, car. Cuống lưỡi chạm vòm mềm rồi bật hơi, cổ họng KHÔNG rung. Trẻ Việt hay nuốt /k/ ở cuối từ — 'book' thành 'bu'. Nhớ bật nhẹ hơi ở cuối.",
          words: [
            { word: "cat", meaning: "con mèo", emoji: "🐱" },
            { word: "cup", meaning: "cái cốc", emoji: "🥤" },
            { word: "car", meaning: "ô tô", emoji: "🚗" },
          ],
        },
        reading: {
          title: "These are my toys",
          passage:
            "These are my toys. My teddy is soft. My car is fast. My ball is round. I play with my doll. My kite flies high.",
          translation:
            "Đây là đồ chơi của tớ. Gấu bông của tớ mềm ơi là mềm. Ô tô của tớ chạy nhanh lắm. Quả bóng của tớ tròn xoe. Tớ chơi với búp bê. Con diều của tớ bay cao tít.",
          questions: [
            mcq(
              "Which toy is soft?",
              "Món đồ chơi nào mềm?",
              ["car", "ball", "teddy"],
              2,
              "Bài viết 'My teddy is soft.' — 'soft' nghĩa là mềm, nên gấu bông là món đồ chơi mềm.",
              "My teddy is soft.",
            ),
            mcq(
              "Which toy flies high?",
              "Món đồ chơi nào bay cao?",
              ["kite", "doll", "ball"],
              0,
              "Câu cuối bài là 'My kite flies high.' — 'kite' là con diều, nó bay cao.",
              "My kite flies high.",
            ),
          ],
        },
        listening: {
          title: "Let's play",
          transcript:
            "Boy: This is my new car.\nGirl: My teddy is very soft.\nBoy: Let's play with the ball!",
          questions: [
            mcq(
              "What is the boy's new toy?",
              "Đồ chơi mới của bạn trai là gì?",
              ["kite", "car", "doll"],
              1,
              "Bạn trai nói 'This is my new car.' — đồ chơi mới của bạn ấy là chiếc ô tô.",
              "This is my new car.",
            ),
            mcq(
              "What do the children play with?",
              "Hai bạn chơi với món đồ chơi nào?",
              ["kite", "doll", "ball"],
              2,
              "Bạn trai rủ 'Let's play with the ball!' — hai bạn chơi với quả bóng.",
              "Let's play with the ball!",
            ),
          ],
        },
        writingPrompt:
          "Bé chọn 2 món đồ chơi bé yêu nhất, vẽ ra rồi chép 3 câu về chúng. Dùng mẫu: My teddy is soft.",
        writingOutline:
          "1. Câu mở: These are my toys.\n2. Tả đồ chơi: My teddy is soft. My car is fast.\n3. Câu cuối: My kite flies high.",
        speaking: {
          sentences: ["These are my toys.", "My teddy is soft.", "My car is fast."],
          questions: [
            {
              question: "What toy do you like best?",
              sampleAnswer: "I like my teddy best.",
            },
            {
              question: "Do you play with a ball?",
              sampleAnswer: "Yes, I play with my ball.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 12 ───────────────────────────
      {
        topic: "Drinks",
        topicVi: "Đồ uống mỗi ngày",
        icon: "🥛",
        words: [
          word("milk", "/mɪlk/", "sữa", "🥛"),
          word("water", "/ˈwɔːtər/", "nước lọc", "💧"),
          word("juice", "/dʒuːs/", "nước ép", "🧃"),
          word("tea", "/tiː/", "trà", "🍵"),
          word("cup", "/kʌp/", "cái cốc", "🥤"),
        ],
        sound: {
          letters: "k",
          sound: "/k/",
          hint: "Chữ 'k' cũng đọc là /k/ giống chữ 'c': kite, key, king. Trẻ Việt rất hay quên bật /k/ ở cuối từ — 'milk' thành 'miu', 'book' thành 'bu'. Bé bật một tiếng hơi nhỏ ở cuối, đừng nuốt mất nhé.",
          words: [
            { word: "kite", meaning: "con diều", emoji: "🪁" },
            { word: "key", meaning: "chìa khoá", emoji: "🔑" },
            { word: "king", meaning: "nhà vua", emoji: "🤴" },
          ],
        },
        reading: {
          title: "I drink milk",
          passage:
            "I drink milk every morning. Milk is white and cold. I drink water at school. I like orange juice too. Mum drinks hot tea. My cup is blue.",
          translation:
            "Sáng nào tớ cũng uống sữa. Sữa màu trắng và mát lạnh. Ở trường tớ uống nước lọc. Tớ cũng thích nước cam nữa. Mẹ tớ uống trà nóng. Cốc của tớ màu xanh dương.",
          questions: [
            mcq(
              "What does the child drink at school?",
              "Ở trường bạn nhỏ uống gì?",
              ["milk", "water", "tea"],
              1,
              "Bài viết 'I drink water at school.' — ở trường bạn nhỏ uống nước lọc.",
              "I drink water at school.",
            ),
            mcq(
              "What colour is the cup?",
              "Cái cốc màu gì?",
              ["blue", "red", "white"],
              0,
              "Câu cuối bài là 'My cup is blue.' — 'blue' nghĩa là màu xanh dương.",
              "My cup is blue.",
            ),
          ],
        },
        listening: {
          title: "Milk or juice?",
          transcript:
            "Mum: Do you want milk or juice?\nBoy: Milk, please. I like cold milk.\nMum: Here is your blue cup.",
          questions: [
            mcq(
              "What does the boy choose?",
              "Bạn trai chọn đồ uống nào?",
              ["juice", "tea", "milk"],
              2,
              "Bạn trai trả lời 'Milk, please.' — bạn ấy chọn sữa.",
              "Milk, please.",
            ),
            mcq(
              "What colour is his cup?",
              "Cốc của bạn ấy màu gì?",
              ["blue", "green", "yellow"],
              0,
              "Mẹ nói 'Here is your blue cup.' — cốc của bạn ấy màu xanh dương.",
              "Here is your blue cup.",
            ),
          ],
        },
        writingPrompt:
          "Bé vẽ cái cốc của mình và đồ uống bé thích, rồi chép 3 câu. Dùng mẫu: I drink milk every morning.",
        writingOutline:
          "1. Câu mở: I drink milk every morning.\n2. Kể thêm: I drink water at school. I like orange juice too.\n3. Câu cuối: My cup is blue.",
        speaking: {
          sentences: ["I drink milk every morning.", "I like orange juice.", "My cup is blue."],
          questions: [
            {
              question: "What do you drink in the morning?",
              sampleAnswer: "I drink warm milk.",
            },
            {
              question: "Do you like juice?",
              sampleAnswer: "Yes, I like orange juice.",
            },
          ],
        },
      },
    ],
  },
];
