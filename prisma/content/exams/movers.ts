// Đề thi thử cấp này. Xem hợp đồng + hướng dẫn soạn theo cấp ở ./types.ts.
//
// CHỈ soạn 3 phần: LISTENING · READING · WRITING (phần Nói chưa có trình ghi âm
// trong đề thi thử — xem cảnh báo đầu types.ts).
//
// Hai đề Movers (7–9 tuổi · A1), mỗi đề: Nghe 6 câu · Đọc 6 câu · Viết 1 đề 35 từ.
// Ngữ pháp trọng tâm: quá khứ đơn + hiện tại tiếp diễn, "can/can't".
// Chính tả Anh–Anh (Mum / favourite / practise) cho khớp bài lộ trình cùng cấp.
//   • Đề 1 — chủ đề SỞ THÚ & CON VẬT.
//   • Đề 2 — chủ đề NGÀY HỘI THỂ THAO & KÌ NGHỈ Ở NHÀ BÀ.
import { mcq, tf } from "../types";
import type { ExamSeed } from "./types";

export const EXAMS: ExamSeed[] = [
  // ═════════════════════════════════════════════════════════════════════════
  //  ĐỀ 1 · A day at the zoo
  // ═════════════════════════════════════════════════════════════════════════
  {
    slug: "movers-1",
    title: "Đề thi thử Movers — Đề 1",
    level: "MOVERS",
    description:
      "Đề thi thử Movers số 1, chủ đề sở thú và các con vật. Nghe 6 câu · Đọc 6 câu · Viết 1 đoạn ngắn về một ngày đi chơi cùng gia đình. Bé làm trong 35 phút.",
    totalTime: 2100,
    sections: [
      // ───────────────────────────── NGHE ─────────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Bé nghe hai đoạn hội thoại rồi chọn câu trả lời đúng. Mỗi đoạn bé được nghe lại vài lần, cứ bình tĩnh nhé 🎧",
        parts: [
          {
            title: "Part 1 · Nam và mẹ chuẩn bị đi chơi",
            instructions:
              "Nam đang nói chuyện với mẹ trước khi cả nhà đi chơi. Nghe kĩ xem cả nhà đi đâu và mang theo gì.",
            transcript:
              "Mum: Nam, are you ready? We are going to the zoo today.\nBoy: Yes, Mum! I want to see the elephants.\nMum: The elephants are near the big lake. We can see them first.\nBoy: Can we take some sandwiches, please?\nMum: Of course. I made cheese sandwiches this morning.\nBoy: Thank you! Is Grandpa coming with us?\nMum: No, he is painting the kitchen. Your sister Lan is coming.\nBoy: Great! Lan loves the monkeys.",
            questions: [
              mcq(
                "Where are Nam and his mum going today?",
                "Hôm nay Nam và mẹ đi đâu?",
                ["To the beach", "To the zoo", "To the park", "To the museum"],
                1,
                "Ngay câu đầu mẹ nói 'We are going to the zoo today.' — hôm nay cả nhà đi sở thú.",
                "We are going to the zoo today.",
              ),
              mcq(
                "What did Mum make this morning?",
                "Sáng nay mẹ đã làm món gì?",
                ["Fruit juice", "A chocolate cake", "Cheese sandwiches", "Rice and fish"],
                2,
                "Mẹ nói 'I made cheese sandwiches this morning.' — chữ 'made' là quá khứ của 'make', nghĩa là mẹ ĐÃ làm bánh mì kẹp phô mai.",
                "I made cheese sandwiches this morning.",
              ),
              tf(
                "Grandpa is going to the zoo with Nam.",
                "Ông đi sở thú cùng Nam.",
                false,
                "Sai rồi nhé! Mẹ trả lời 'No, he is painting the kitchen.' — ông đang sơn bếp nên ông ở nhà. Người đi cùng Nam là chị Lan.",
                "No, he is painting the kitchen.",
              ),
            ],
          },
          {
            title: "Part 2 · Cô giáo dặn cả lớp",
            instructions:
              "Cô Hoa đang dặn cả lớp về buổi đi sở thú. Nghe kĩ giờ giấc và chỗ ăn trưa.",
            transcript:
              "Teacher: Good morning, children. Today we are visiting the zoo.\nGirl: Miss Hoa, what time does the zoo open?\nTeacher: It opens at nine o'clock, so we must leave school at eight.\nGirl: Where do we eat our lunch?\nTeacher: We eat near the bird house at twelve o'clock.\nBoy: Miss Hoa, can I bring my camera?\nTeacher: Yes, Minh, but please put it in your bag on the bus.\nBoy: I will. Last year I took a photo of a baby tiger!",
            questions: [
              mcq(
                "What time does the zoo open?",
                "Sở thú mở cửa lúc mấy giờ?",
                ["At eight o'clock", "At nine o'clock", "At ten o'clock", "At twelve o'clock"],
                1,
                "Cô nói 'It opens at nine o'clock' — sở thú mở cửa lúc 9 giờ. Còn 8 giờ là giờ cả lớp rời trường.",
                "It opens at nine o'clock",
              ),
              mcq(
                "Where do the children eat their lunch?",
                "Các bạn nhỏ ăn trưa ở đâu?",
                ["On the bus", "At school", "Near the big lake", "Near the bird house"],
                3,
                "Cô dặn 'We eat near the bird house at twelve o'clock.' — cả lớp ăn trưa cạnh nhà chim lúc 12 giờ.",
                "We eat near the bird house at twelve o'clock.",
              ),
              mcq(
                "What did Minh take a photo of last year?",
                "Năm ngoái Minh đã chụp ảnh con gì?",
                ["A baby tiger", "A big elephant", "A funny monkey", "A blue bird"],
                0,
                "Minh khoe 'Last year I took a photo of a baby tiger!' — 'took' là quá khứ của 'take', nghĩa là năm ngoái bạn ấy đã chụp một chú hổ con.",
                "Last year I took a photo of a baby tiger!",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── ĐỌC ─────────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc",
        instructions:
          "Bé đọc hai bài rồi chọn câu trả lời đúng. Bấm vào từ lạ để xem nghĩa nhé 📖",
        parts: [
          {
            title: "Part 3 · Nam's day at the zoo",
            instructions: "Đọc chuyện của Nam về ngày Chủ nhật vừa rồi, rồi trả lời 3 câu hỏi.",
            passage:
              "Last Sunday Nam went to the zoo with his mum and his sister Lan. First they saw the elephants near the big lake. One elephant was washing its baby with water, and Nam laughed. Then Lan ran to the monkey house. The monkeys were eating bananas and jumping on an old rope. At twelve o'clock the family sat under a tall tree and ate their sandwiches. Nam was very happy, but his shoes were dirty!",
            questions: [
              mcq(
                "Who went to the zoo with Nam?",
                "Ai đã đi sở thú cùng Nam?",
                [
                  "His dad and his brother",
                  "His mum and his sister",
                  "His friends from school",
                  "His grandma",
                ],
                1,
                "Câu đầu bài kể 'Nam went to the zoo with his mum and his sister Lan' — Nam đi cùng mẹ và chị Lan.",
                "Last Sunday Nam went to the zoo with his mum and his sister Lan.",
              ),
              mcq(
                "What was the elephant doing?",
                "Con voi đang làm gì?",
                [
                  "Sleeping under a tree",
                  "Eating bananas",
                  "Washing its baby",
                  "Running to the lake",
                ],
                2,
                "Bài dùng thì hiện tại tiếp diễn trong quá khứ: 'One elephant was washing its baby with water' — voi mẹ đang tắm cho voi con.",
                "One elephant was washing its baby with water",
              ),
              mcq(
                "What were the monkeys eating?",
                "Mấy chú khỉ đang ăn gì?",
                ["Apples", "Sandwiches", "Leaves", "Bananas"],
                3,
                "Bài viết 'The monkeys were eating bananas' — các chú khỉ đang ăn chuối. Bánh mì kẹp là bữa trưa của cả nhà Nam.",
                "The monkeys were eating bananas",
              ),
            ],
          },
          {
            title: "Part 4 · Lan's favourite animal",
            instructions: "Đây là bài viết của chị Lan về con vật bạn ấy thích nhất.",
            passage:
              "Hi! My name is Lan. I am eight years old and I love animals. My favourite animal at the zoo is the giraffe, because it has a very long neck and it can eat leaves from tall trees. Last Sunday a young giraffe was standing next to its mother. It was drinking milk. My brother Nam likes the tigers, but I think they are too noisy. Next month our school is going to the zoo again.",
            questions: [
              mcq(
                "Why does Lan like the giraffe best?",
                "Vì sao Lan thích hươu cao cổ nhất?",
                [
                  "Because it has a very long neck",
                  "Because it is very noisy",
                  "Because it can swim fast",
                  "Because it is small and soft",
                ],
                0,
                "Chữ 'because' chỉ ra lí do: 'because it has a very long neck and it can eat leaves from tall trees' — hươu có cổ rất dài nên với được lá trên cây cao.",
                "because it has a very long neck",
              ),
              mcq(
                "What was the young giraffe doing last Sunday?",
                "Chủ nhật tuần trước chú hươu con đang làm gì?",
                [
                  "It was eating a banana",
                  "It was drinking milk",
                  "It was sleeping",
                  "It was running fast",
                ],
                1,
                "Bài viết 'It was drinking milk.' — chú hươu con đang bú sữa mẹ.",
                "It was drinking milk.",
              ),
              tf(
                "Lan and her brother Nam like the same animal at the zoo.",
                "Lan và anh Nam thích cùng một con vật ở sở thú.",
                false,
                "Sai rồi nhé! Lan thích hươu cao cổ nhất, còn Nam thì thích hổ. Hai anh em thích hai con vật khác nhau.",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── VIẾT ─────────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions: "Bé viết một đoạn ngắn bằng tiếng Anh. Cô giáo AI sẽ đọc và khen bé nhé ✍️",
        parts: [
          {
            title: "Part 5 · A day out with my family",
            writingPrompt:
              "Viết 5–6 câu tiếng Anh (ít nhất 35 từ) kể về MỘT NGÀY bé đi chơi cùng gia đình.\n\nGợi ý bé trả lời lần lượt:\n1. Bé đi đâu và đi khi nào? (Last Sunday I went to …)\n2. Bé đi với ai? (I went with my mum and my …)\n3. Bé đã nhìn thấy gì thú vị? (I saw … / A monkey was eating …)\n4. Bé đã ăn gì? (We ate …)\n5. Bé cảm thấy thế nào? (I was very happy, because …)\n\nNhớ dùng thì QUÁ KHỨ ĐƠN (went, saw, ate, was) và nối câu bằng and, but, because.",
            writingMinWords: 35,
          },
        ],
      },
    ],
  },

  // ═════════════════════════════════════════════════════════════════════════
  //  ĐỀ 2 · Sports Day and a week at Grandma's house
  // ═════════════════════════════════════════════════════════════════════════
  {
    slug: "movers-2",
    title: "Đề thi thử Movers — Đề 2",
    level: "MOVERS",
    description:
      "Đề thi thử Movers số 2, chủ đề ngày hội thể thao ở trường và một tuần nghỉ ở nhà bà. Nghe 6 câu · Đọc 6 câu · Viết 1 đoạn ngắn về môn thể thao bé thích. Bé làm trong 35 phút.",
    totalTime: 2100,
    sections: [
      // ───────────────────────────── NGHE ─────────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Bé nghe hai đoạn hội thoại về Ngày hội thể thao rồi chọn câu trả lời đúng 🎧",
        parts: [
          {
            title: "Part 1 · Trước Ngày hội thể thao",
            instructions:
              "Hai bạn nhỏ đang nói về Ngày hội thể thao của trường. Nghe kĩ xem mỗi bạn chơi môn gì.",
            transcript:
              "Girl: Hi Minh! Are you running in the race on Sports Day?\nBoy: No, I am not. I am playing badminton with Duy.\nGirl: That sounds fun. I am running in the long race.\nBoy: Wow! How long do you practise every day?\nGirl: I practise for one hour after school.\nBoy: Where is Sports Day this year?\nGirl: It is at the big park behind our school.\nBoy: Good. My dad is bringing his camera.",
            questions: [
              mcq(
                "What is Minh doing on Sports Day?",
                "Ngày hội thể thao Minh chơi môn gì?",
                [
                  "He is running in the long race",
                  "He is playing badminton",
                  "He is swimming",
                  "He is riding his bike",
                ],
                1,
                "Minh nói 'I am playing badminton with Duy.' — bạn ấy chơi cầu lông với Duy. Chạy đường dài là môn của bạn gái.",
                "I am playing badminton with Duy.",
              ),
              mcq(
                "How long does the girl practise every day?",
                "Mỗi ngày bạn gái luyện tập bao lâu?",
                ["For ten minutes", "For half an hour", "For one hour", "For two hours"],
                2,
                "Bạn gái trả lời 'I practise for one hour after school.' — bạn ấy tập một tiếng sau giờ học.",
                "I practise for one hour after school.",
              ),
              tf(
                "Sports Day is at the big park behind the school.",
                "Ngày hội thể thao tổ chức ở công viên lớn sau trường.",
                true,
                "Đúng rồi! Bạn gái nói 'It is at the big park behind our school.' — hội thao ở công viên lớn phía sau trường.",
                "It is at the big park behind our school.",
              ),
            ],
          },
          {
            title: "Part 2 · Sau Ngày hội thể thao",
            instructions: "Long vừa đi hội thao về. Nghe kĩ bạn ấy kể lại với mẹ.",
            transcript:
              "Mum: How was Sports Day, Long?\nBoy: It was great, Mum! Our class won the football game.\nMum: Well done! Did you eat your lunch?\nBoy: Yes, I ate my rice and a green apple.\nMum: You look very hot. Where is your cap?\nBoy: Oh no! I left it under the tree at the park.\nMum: Don't worry. We can look for it tomorrow morning.\nBoy: Thank you, Mum. Now I am very thirsty.",
            questions: [
              mcq(
                "Which game did Long's class win?",
                "Lớp của Long thắng môn nào?",
                ["Basketball", "Table tennis", "Badminton", "Football"],
                3,
                "Long khoe 'Our class won the football game.' — 'won' là quá khứ của 'win', lớp bạn ấy đã thắng trận bóng đá.",
                "Our class won the football game.",
              ),
              mcq(
                "What did Long eat for lunch?",
                "Trưa nay Long đã ăn gì?",
                [
                  "Rice and a green apple",
                  "Bread and cheese",
                  "Noodles and fish",
                  "A chocolate cake",
                ],
                0,
                "Long nói 'I ate my rice and a green apple.' — bạn ấy ăn cơm và một quả táo xanh.",
                "I ate my rice and a green apple.",
              ),
              mcq(
                "Where did Long leave his cap?",
                "Long để quên chiếc mũ ở đâu?",
                [
                  "In his classroom",
                  "On the school bus",
                  "Under the tree at the park",
                  "At home",
                ],
                2,
                "Long kêu lên 'I left it under the tree at the park.' — bạn ấy để quên mũ dưới gốc cây ở công viên.",
                "I left it under the tree at the park.",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── ĐỌC ─────────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc",
        instructions: "Bé đọc hai bài rồi chọn câu trả lời đúng. Bấm vào từ lạ để xem nghĩa nhé 📖",
        parts: [
          {
            title: "Part 3 · Our Sports Day",
            instructions: "Một bạn nhỏ kể về Ngày hội thể thao của trường mình.",
            passage:
              "Last Friday our school had a Sports Day at the park. The sun was hot and the sky was blue. My friend Mai ran in the long race and she came first. I played badminton with Duy, but we lost. After the games, our teacher gave us cold water and small cakes. My little brother was sitting under a tree with my mum. He was clapping and shouting my name. It was a very noisy and very happy day.",
            questions: [
              mcq(
                "When did the school have Sports Day?",
                "Trường tổ chức Ngày hội thể thao khi nào?",
                ["Last Monday", "Last Friday", "Last Sunday", "This morning"],
                1,
                "Câu đầu bài viết 'Last Friday our school had a Sports Day at the park.' — hội thao diễn ra thứ Sáu tuần trước.",
                "Last Friday our school had a Sports Day at the park.",
              ),
              mcq(
                "What was the writer's little brother doing?",
                "Em trai của bạn nhỏ đang làm gì?",
                [
                  "He was running in the race",
                  "He was playing badminton",
                  "He was clapping and shouting",
                  "He was eating a cake",
                ],
                2,
                "Bài viết 'He was clapping and shouting my name.' — em trai ngồi dưới gốc cây, vỗ tay và gọi tên anh để cổ vũ.",
                "He was clapping and shouting my name.",
              ),
              mcq(
                "What did the teacher give the children after the games?",
                "Sau các trận đấu, cô giáo cho các bạn thứ gì?",
                [
                  "Ice cream and orange juice",
                  "Cold water and small cakes",
                  "Sandwiches and milk",
                  "Fruit and biscuits",
                ],
                1,
                "Bài viết 'our teacher gave us cold water and small cakes' — cô cho nước mát và bánh nhỏ.",
                "our teacher gave us cold water and small cakes",
              ),
            ],
          },
          {
            title: "Part 4 · A letter from Long",
            instructions: "Long viết thư cho bạn Mai. Đọc thư rồi trả lời 3 câu hỏi.",
            passage:
              "Dear Mai, thank you for your letter. I am staying at my grandma's house this week. Her house is next to a small river, so I swim every afternoon. Yesterday I helped Grandma in the garden and we planted six young trees. It was hard work, but it was fun. Today it is raining, so I am reading my new book about dinosaurs. On Saturday I am coming home. Can we play badminton on Sunday? Love, Long",
            questions: [
              mcq(
                "Where is Long staying this week?",
                "Tuần này Long đang ở đâu?",
                [
                  "At his school",
                  "At his grandma's house",
                  "At a hotel near the sea",
                  "At Mai's house",
                ],
                1,
                "Long viết 'I am staying at my grandma's house this week.' — tuần này bạn ấy ở nhà bà.",
                "I am staying at my grandma's house this week.",
              ),
              mcq(
                "What is Long doing today?",
                "Hôm nay Long đang làm gì?",
                [
                  "He is swimming in the river",
                  "He is planting trees",
                  "He is reading a book about dinosaurs",
                  "He is playing badminton",
                ],
                2,
                "Hôm nay trời mưa nên Long viết 'I am reading my new book about dinosaurs.' — bạn ấy đang đọc sách về khủng long.",
                "I am reading my new book about dinosaurs",
              ),
              tf(
                "Long and his grandma planted six young trees yesterday.",
                "Hôm qua Long và bà đã trồng sáu cây con.",
                true,
                "Đúng rồi! Thư viết 'we planted six young trees' — 'planted' là quá khứ, hai bà cháu đã trồng sáu cây con hôm qua.",
                "we planted six young trees",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── VIẾT ─────────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions: "Bé viết một đoạn ngắn bằng tiếng Anh. Cô giáo AI sẽ đọc và khen bé nhé ✍️",
        parts: [
          {
            title: "Part 5 · My favourite sport",
            writingPrompt:
              "Viết 5–6 câu tiếng Anh (ít nhất 35 từ) kể về MÔN THỂ THAO hoặc TRÒ CHƠI bé thích nhất.\n\nGợi ý bé trả lời lần lượt:\n1. Bé thích môn gì? (My favourite sport is …)\n2. Bé chơi ở đâu và với ai? (I play it at the park with …)\n3. Bé tập bao lâu? (I practise for one hour …)\n4. Lần gần đây nhất bé chơi thế nào? (Last Sunday I played … We won / We lost, but …)\n5. Vì sao bé thích môn đó? (I like it, because …)\n\nNhớ dùng thì QUÁ KHỨ ĐƠN (played, ran, won) và nối câu bằng and, but, because.",
            writingMinWords: 35,
          },
        ],
      },
    ],
  },
];
