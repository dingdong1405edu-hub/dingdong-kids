// Đề thi thử cấp này. Xem hợp đồng + hướng dẫn soạn theo cấp ở ./types.ts.
//
// CHỈ soạn 3 phần: LISTENING · READING · WRITING (phần Nói chưa có trình ghi âm
// trong đề thi thử — xem cảnh báo đầu types.ts).
import type { ExamSeed } from "./types";
import { mcq, tf } from "../types";

export const EXAMS: ExamSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  ĐỀ 1 — Ở nhà: phòng của bé, con mèo, chú chó Milo.
  //  Trọng tâm: giới từ nơi chốn (in / on / under / next to) + tính từ màu sắc.
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "starters-1",
    title: "Đề thi thử Starters — Đề 1",
    level: "STARTERS",
    description:
      "Đề luyện theo format Cambridge YLE Starters: nghe 5 câu, đọc 5 câu và viết một đoạn ngắn. Chủ đề quanh ngôi nhà của bé — đồ vật ở đâu, màu gì, và bạn thú cưng thân thiết. Khoảng 25 phút.",
    totalTime: 1500,
    sections: [
      // ───────────────────────── NGHE ─────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Bé bấm nút loa để nghe. Mỗi bài được nghe tối đa 3 lần. Nghe hết một lượt rồi hãy chọn đáp án nhé!",
        parts: [
          {
            title: "Part 1 · Con mèo ở đâu?",
            instructions:
              "Mẹ và bạn Ben đang đi tìm con mèo. Bé nghe xem cuối cùng mèo nằm ở chỗ nào.",
            transcript:
              "Mum: Ben, where is our cat?\nBoy: Is she under the bed?\nMum: No, she is not there.\nBoy: Look! She is on the big blue chair.\nMum: Yes! She is sleeping.\nBoy: She is very happy.",
            questions: [
              mcq(
                "Where is the cat?",
                "Con mèo đang ở đâu?",
                ["Under the bed", "On the chair", "In the box"],
                1,
                "Ben nói 'Look! She is on the big blue chair.' — 'on' nghĩa là ở TRÊN, nên mèo đang nằm trên ghế. Lúc đầu Ben đoán mèo ở dưới gầm giường nhưng mẹ bảo không có.",
                "She is on the big blue chair",
              ),
              mcq(
                "What colour is the chair?",
                "Cái ghế màu gì?",
                ["Red", "Green", "Blue"],
                2,
                "Ben tả cái ghế là 'the big blue chair' — vừa to vừa màu xanh dương. 'Blue' là màu xanh dương.",
                "on the big blue chair",
              ),
              tf(
                "The cat is sleeping.",
                "Con mèo đang ngủ.",
                true,
                "Mẹ nói 'Yes! She is sleeping.' — mèo đang ngủ trên ghế, đúng rồi đó bé!",
                "She is sleeping",
              ),
            ],
          },
          {
            title: "Part 2 · Quả bóng mới",
            instructions: "Hai bạn nói chuyện về một quả bóng mới. Bé nghe kỹ màu bóng và chỗ để bóng.",
            transcript:
              "Girl: Nam, I have got a new ball.\nBoy: Wow! Is it big?\nGirl: Yes, it is big and yellow.\nBoy: Where is your ball now?\nGirl: It is in my school bag.",
            questions: [
              mcq(
                "What colour is the new ball?",
                "Quả bóng mới màu gì?",
                ["Yellow", "Green", "Red"],
                0,
                "Bạn gái trả lời 'Yes, it is big and yellow.' — quả bóng vừa to vừa màu vàng. 'Yellow' là màu vàng.",
                "it is big and yellow",
              ),
              mcq(
                "Where is the ball now?",
                "Bây giờ quả bóng ở đâu?",
                ["Under the desk", "In the school bag", "On the chair"],
                1,
                "Bạn gái nói 'It is in my school bag.' — 'in' nghĩa là ở TRONG, nên bóng đang nằm trong cặp sách.",
                "It is in my school bag",
              ),
            ],
          },
        ],
      },

      // ───────────────────────── ĐỌC ─────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc",
        instructions:
          "Bé đọc kỹ từng bài rồi chọn đáp án đúng. Từ nào chưa hiểu thì bấm vào chữ đó để xem nghĩa nhé!",
        parts: [
          {
            title: "Part 1 · My bedroom",
            instructions: "Đọc bài rồi trả lời 3 câu hỏi. Chú ý các từ chỉ chỗ: on, under, next to.",
            passage:
              "This is my bedroom. It is small but very tidy. My bed is next to the window. A big brown teddy bear sits on my bed. My red car is under the bed. My books are on the shelf. I love my bedroom.",
            questions: [
              mcq(
                "Where is the teddy bear?",
                "Chú gấu bông ở đâu?",
                ["Under the bed", "On the bed", "On the shelf"],
                1,
                "Bài viết 'A big brown teddy bear sits on my bed.' — 'on the bed' là ở TRÊN giường. Dưới gầm giường là chiếc ô tô, còn trên giá là sách.",
                "teddy bear sits on my bed",
              ),
              mcq(
                "What colour is the car?",
                "Chiếc ô tô màu gì?",
                ["Brown", "Red", "Blue"],
                1,
                "Bài viết 'My red car is under the bed.' — 'red' là màu đỏ. Màu nâu ('brown') là của chú gấu bông cơ.",
                "My red car is under the bed",
              ),
              tf(
                "The bedroom is big.",
                "Phòng ngủ rất rộng.",
                false,
                "Sai rồi nhé! Bài viết 'It is small but very tidy.' — phòng NHỎ nhưng rất gọn gàng, chứ không rộng.",
                "It is small but very tidy",
              ),
            ],
          },
          {
            title: "Part 2 · My dog Milo",
            instructions: "Đọc bài về chú chó Milo rồi trả lời 2 câu hỏi.",
            passage:
              "I have got a dog. His name is Milo. He is small and white. Milo likes his ball. He sleeps in a green box next to the door. Every day I give him water and food. Milo is my best friend.",
            questions: [
              mcq(
                "Where does Milo sleep?",
                "Chú chó Milo ngủ ở đâu?",
                ["In a green box", "On the bed", "Under the chair"],
                0,
                "Bài viết 'He sleeps in a green box next to the door.' — Milo ngủ TRONG một cái hộp màu xanh lá đặt cạnh cửa.",
                "He sleeps in a green box next to the door",
              ),
              mcq(
                "What colour is Milo?",
                "Chú chó Milo màu gì?",
                ["Brown", "Black", "White"],
                2,
                "Bài viết 'He is small and white.' — Milo nhỏ và có bộ lông màu trắng. 'White' là màu trắng.",
                "He is small and white",
              ),
            ],
          },
        ],
      },

      // ───────────────────────── VIẾT ─────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions:
          "Bé viết bằng tiếng Anh nhé. Câu ngắn cũng được, quan trọng là viết đủ ý. Viết xong bé bấm nộp, cô giáo AI sẽ khen bé trước rồi mới chỉ chỗ cần sửa.",
        parts: [
          {
            title: "Part 1 · My room",
            writingPrompt:
              "Viết 4–5 câu tiếng Anh về căn phòng của bé (ít nhất 20 từ).\n\nBé nhớ nói đủ 3 điều:\n1. Phòng của bé to hay nhỏ, màu gì? (My room is ...)\n2. Trong phòng có những gì? (I have got a ... / There is a ...)\n3. Một món đồ bé thích nằm ở đâu? (My ... is on / in / under the ...)\n\nGợi ý từ: bed · desk · window · book · ball · teddy bear · big · small · red · blue · yellow",
            writingMinWords: 20,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  ĐỀ 2 — Ra ngoài chơi: công viên, thả diều, bữa picnic, hộp cơm trưa.
  //  Trọng tâm: giới từ nơi chốn, số đếm, đồ ăn.
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "starters-2",
    title: "Đề thi thử Starters — Đề 2",
    level: "STARTERS",
    description:
      "Đề luyện theo format Cambridge YLE Starters: nghe 5 câu, đọc 5 câu và viết một đoạn ngắn. Chủ đề là một ngày đi chơi công viên — con vật, đồ chơi và bữa ăn ngoài trời. Khoảng 25 phút.",
    totalTime: 1500,
    sections: [
      // ───────────────────────── NGHE ─────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Bé bấm nút loa để nghe. Mỗi bài được nghe tối đa 3 lần. Nghe hết một lượt rồi hãy chọn đáp án nhé!",
        parts: [
          {
            title: "Part 1 · Ở công viên",
            instructions: "Bạn nhỏ đi công viên cùng bố. Bé nghe xem có con gì và bố tặng bạn ấy món gì.",
            transcript:
              "Girl: Look, Dad! The park is very big.\nDad: Yes, it is. Can you see the ducks?\nGirl: Yes! They are in the water.\nDad: Here is your kite. It is orange.\nGirl: Thank you, Dad! I can run with my kite.",
            questions: [
              mcq(
                "Where are the ducks?",
                "Mấy chú vịt đang ở đâu?",
                ["In the water", "Under the tree", "On the grass"],
                0,
                "Bạn gái reo lên 'Yes! They are in the water.' — 'in the water' nghĩa là đang bơi dưới nước.",
                "They are in the water",
              ),
              mcq(
                "What colour is the kite?",
                "Con diều màu gì?",
                ["Purple", "Orange", "Pink"],
                1,
                "Bố nói 'Here is your kite. It is orange.' — con diều màu cam. 'Orange' vừa là quả cam vừa là màu cam đó bé!",
                "It is orange",
              ),
              tf(
                "The park is small.",
                "Công viên nhỏ xíu.",
                false,
                "Chưa đúng rồi! Bạn gái nói 'The park is very big.' — công viên RẤT TO chứ không nhỏ.",
                "The park is very big",
              ),
            ],
          },
          {
            title: "Part 2 · Bữa picnic",
            instructions: "Mẹ và bạn Tom ăn picnic trong công viên. Bé nghe xem có món gì và để ở đâu.",
            transcript:
              "Mum: Are you hungry, Tom?\nBoy: Yes, Mum. I am very hungry.\nMum: There are apples in the basket.\nBoy: Can I have some bread, too?\nMum: Yes. The bread is on the blue mat.",
            questions: [
              mcq(
                "What is in the basket?",
                "Trong giỏ có gì?",
                ["Apples", "Cakes", "Eggs"],
                0,
                "Mẹ nói 'There are apples in the basket.' — trong giỏ có mấy quả táo. 'Apples' là những quả táo.",
                "There are apples in the basket",
              ),
              mcq(
                "Where is the bread?",
                "Bánh mì để ở đâu?",
                ["In the basket", "On the blue mat", "Under the tree"],
                1,
                "Mẹ nói 'The bread is on the blue mat.' — bánh mì để TRÊN tấm thảm màu xanh dương, còn trong giỏ là táo.",
                "The bread is on the blue mat",
              ),
            ],
          },
        ],
      },

      // ───────────────────────── ĐỌC ─────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc",
        instructions:
          "Bé đọc kỹ từng bài rồi chọn đáp án đúng. Từ nào chưa hiểu thì bấm vào chữ đó để xem nghĩa nhé!",
        parts: [
          {
            title: "Part 1 · A sunny day",
            instructions: "Đọc bài rồi trả lời 3 câu hỏi. Chú ý các con vật và chỗ của chúng.",
            passage:
              "It is a sunny day. Ling and her brother are at the park. They have got a big red ball. Two brown birds are in the tall tree. A small cat is under the tree. Ling and her brother are very happy today.",
            questions: [
              mcq(
                "Where is the cat?",
                "Con mèo ở đâu?",
                ["In the tree", "Under the tree", "On the ball"],
                1,
                "Bài viết 'A small cat is under the tree.' — 'under' là ở DƯỚI, nên mèo nằm dưới gốc cây. Ở trên cây là hai chú chim cơ.",
                "A small cat is under the tree",
              ),
              mcq(
                "What colour is the ball?",
                "Quả bóng màu gì?",
                ["Red", "Blue", "Green"],
                0,
                "Bài viết 'They have got a big red ball.' — quả bóng to và màu đỏ. 'Red' là màu đỏ.",
                "They have got a big red ball",
              ),
              mcq(
                "How many birds are there?",
                "Có mấy chú chim?",
                ["One", "Two", "Three"],
                1,
                "Bài viết 'Two brown birds are in the tall tree.' — có HAI chú chim màu nâu đậu trên cây cao.",
                "Two brown birds are in the tall tree",
              ),
            ],
          },
          {
            title: "Part 2 · My lunch box",
            instructions: "Đọc bài về hộp cơm trưa rồi trả lời 2 câu hỏi.",
            passage:
              "This is my lunch box. It is green and yellow. Today I have got two eggs and one banana in my box. My water bottle is next to my lunch box. My favourite food is rice. Lunch time is my happy time!",
            questions: [
              mcq(
                "What is in the lunch box today?",
                "Hôm nay trong hộp cơm có gì?",
                ["Two eggs and one banana", "Two apples and one cake", "One egg and two bananas"],
                0,
                "Bài viết 'Today I have got two eggs and one banana in my box.' — HAI quả trứng và MỘT quả chuối. Bé nhớ đọc kỹ số nhé!",
                "I have got two eggs and one banana in my box",
              ),
              tf(
                "Rice is my favourite food.",
                "Cơm là món ăn tớ thích nhất.",
                true,
                "Đúng rồi! Bài viết 'My favourite food is rice.' — 'favourite' nghĩa là thích nhất, và món đó là cơm.",
                "My favourite food is rice",
              ),
            ],
          },
        ],
      },

      // ───────────────────────── VIẾT ─────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions:
          "Bé viết bằng tiếng Anh nhé. Câu ngắn cũng được, quan trọng là viết đủ ý. Viết xong bé bấm nộp, cô giáo AI sẽ khen bé trước rồi mới chỉ chỗ cần sửa.",
        parts: [
          {
            title: "Part 1 · A day at the park",
            writingPrompt:
              "Viết 4–5 câu tiếng Anh về một buổi bé đi chơi công viên (ít nhất 20 từ).\n\nBé nhớ nói đủ 3 điều:\n1. Bé đi với ai? (I go to the park with ...)\n2. Bé nhìn thấy con gì hoặc cái gì? (I can see a ... / There are two ...)\n3. Bé ăn gì hoặc chơi gì ở đó? (I eat ... / I play with my ...)\n\nGợi ý từ: mum · dad · friend · tree · bird · duck · ball · kite · apple · bread · big · small · happy",
            writingMinWords: 20,
          },
        ],
      },
    ],
  },
];
