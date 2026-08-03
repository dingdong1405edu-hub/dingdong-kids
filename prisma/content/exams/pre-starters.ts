// Đề thi thử cấp này. Xem hợp đồng + hướng dẫn soạn theo cấp ở ./types.ts.
//
// CHỈ soạn 3 phần: LISTENING · READING · WRITING (phần Nói chưa có trình ghi âm
// trong đề thi thử — xem cảnh báo đầu types.ts).
//
// Cấp PRE_STARTERS (4–5 tuổi) chưa có kỳ thi Cambridge thật → đây là đề "làm
// quen": Nghe 4 câu · Đọc 4 câu · KHÔNG có phần Viết (bé chưa viết được chữ).
// Câu đơn 3–5 từ, chỉ thì hiện tại đơn, mỗi lựa chọn CHỈ 1 TỪ, 3 lựa chọn.
import type { ExamSeed } from "./types";
import { mcq, tf } from "../types";

export const EXAMS: ExamSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  ĐỀ 1 — Đồ chơi và con vật
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "pre-starters-1",
    title: "Đề thi thử Pre-Starters — Đề 1",
    level: "PRE_STARTERS",
    description:
      "Đề làm quen cho bé 4–5 tuổi: 4 câu Nghe về đồ chơi và thú cưng, 4 câu Đọc về chú chó và hộp đồ chơi. Chưa có phần Viết — bố mẹ ngồi cạnh đọc chữ giúp bé nhé.",
    totalTime: 900,
    sections: [
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Bé bấm nút loa để nghe hai bạn nhỏ nói chuyện, rồi chọn tranh (chọn từ) đúng. Bé được nghe lại nhiều lần nhé.",
        parts: [
          {
            title: "Part 1 · Đồ chơi mới",
            instructions: "Bạn gái khoe đồ chơi mới. Bé nghe xem đó là đồ chơi gì nào.",
            transcript: "Girl: I have a new toy.\nBoy: Is it a doll?\nGirl: No, it is a red ball.",
            questions: [
              mcq(
                "What is the girl's toy?",
                "Đồ chơi của bạn gái là gì?",
                ["doll", "ball", "car"],
                1,
                "Bạn gái nói “No, it is a red ball.” — “ball” là quả bóng. Bạn ấy trả lời “No” nên đó KHÔNG phải búp bê.",
                "it is a red ball",
              ),
              mcq(
                "What colour is the ball?",
                "Quả bóng có màu gì?",
                ["blue", "green", "red"],
                2,
                "Bạn gái nói “a red ball” — “red” nghĩa là màu đỏ.",
                "a red ball",
              ),
            ],
          },
          {
            title: "Part 2 · Bạn ấy nuôi con gì?",
            instructions: "Bạn trai kể về con vật ở nhà mình. Bé nghe kỹ nhé.",
            transcript: "Boy: Look! I have a cat.\nGirl: Is your cat big?\nBoy: No, my cat is small.",
            questions: [
              mcq(
                "What animal does the boy have?",
                "Bạn trai nuôi con vật gì?",
                ["dog", "cat", "bird"],
                1,
                "Bạn trai nói “I have a cat.” — “cat” là con mèo.",
                "I have a cat.",
              ),
              tf(
                "The cat is big.",
                "Con mèo rất to.",
                false,
                "Bạn trai nói “No, my cat is small.” — “small” là nhỏ, không phải to. Vậy câu này SAI.",
                "my cat is small",
              ),
            ],
          },
        ],
      },
      {
        skill: "READING",
        title: "Reading · Đọc",
        instructions:
          "Bé nhìn tranh và nghe bố mẹ đọc đoạn văn, rồi chọn từ đúng. Bấm vào một từ để xem nghĩa nhé.",
        parts: [
          {
            title: "Part 1 · My dog",
            instructions: "Đọc đoạn văn về chú chó rồi trả lời 2 câu hỏi.",
            passage:
              "This is my dog. My dog is brown. He is very big. He likes my ball. He runs in the park. I love my dog.",
            questions: [
              mcq(
                "What colour is the dog?",
                "Chú chó có màu gì?",
                ["black", "brown", "white"],
                1,
                "Trong bài có câu “My dog is brown.” — “brown” nghĩa là màu nâu.",
                "My dog is brown.",
              ),
              mcq(
                "Where does the dog run?",
                "Chú chó chạy ở đâu?",
                ["park", "shop", "school"],
                0,
                "Trong bài có câu “He runs in the park.” — “park” là công viên.",
                "He runs in the park.",
              ),
            ],
          },
          {
            title: "Part 2 · My toy box",
            instructions: "Đọc đoạn văn về hộp đồ chơi rồi trả lời 2 câu hỏi.",
            passage:
              "I have a toy box. I have two cars. I have one teddy bear. My teddy bear is yellow. I play every day.",
            questions: [
              mcq(
                "How many cars does the child have?",
                "Bạn nhỏ có mấy chiếc ô tô?",
                ["one", "two", "three"],
                1,
                "Trong bài có câu “I have two cars.” — “two” là hai, nên bạn nhỏ có hai chiếc ô tô.",
                "I have two cars.",
              ),
              tf(
                "The teddy bear is yellow.",
                "Chú gấu bông màu vàng.",
                true,
                "Trong bài có câu “My teddy bear is yellow.” — “yellow” là màu vàng, nên câu này ĐÚNG.",
                "My teddy bear is yellow.",
              ),
            ],
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  ĐỀ 2 — Đồ ăn và lớp học
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "pre-starters-2",
    title: "Đề thi thử Pre-Starters — Đề 2",
    level: "PRE_STARTERS",
    description:
      "Đề làm quen cho bé 4–5 tuổi: 4 câu Nghe về bữa sáng và giờ học, 4 câu Đọc về hộp cơm và cặp sách. Chưa có phần Viết — bố mẹ ngồi cạnh đọc chữ giúp bé nhé.",
    totalTime: 900,
    sections: [
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Bé bấm nút loa để nghe, rồi chọn từ đúng. Nghe chưa rõ thì bé bấm nghe lại nhé.",
        parts: [
          {
            title: "Part 1 · Bữa sáng của bé",
            instructions: "Mẹ hỏi bạn trai muốn ăn gì. Bé nghe xem bạn ấy chọn món nào.",
            transcript: "Mum: Do you want an apple?\nBoy: No, thank you. I want milk.\nMum: Here is your milk.",
            questions: [
              mcq(
                "What does the boy want?",
                "Bạn trai muốn dùng gì?",
                ["milk", "apple", "water"],
                0,
                "Bạn trai nói “I want milk.” — “milk” là sữa.",
                "I want milk.",
              ),
              tf(
                "The boy wants an apple.",
                "Bạn trai muốn ăn quả táo.",
                false,
                "Mẹ hỏi về quả táo nhưng bạn trai đáp “No, thank you.” rồi xin sữa. Vậy câu này SAI.",
                "No, thank you.",
              ),
            ],
          },
          {
            title: "Part 2 · Trong lớp học",
            instructions: "Cô giáo nói chuyện với bạn gái trong lớp. Bé nghe kỹ nhé.",
            transcript: "Teacher: Open your book, please.\nGirl: I have a new book.\nTeacher: Good! Now take your pencil.",
            questions: [
              mcq(
                "What is new?",
                "Đồ vật nào là đồ mới?",
                ["bag", "book", "chair"],
                1,
                "Bạn gái nói “I have a new book.” — “book” là quyển sách, và nó là đồ mới.",
                "I have a new book.",
              ),
              mcq(
                "What does the teacher ask for last?",
                "Cuối cùng cô giáo bảo bé lấy gì?",
                ["pencil", "ruler", "book"],
                0,
                "Câu cuối cô giáo nói “Now take your pencil.” — “pencil” là bút chì.",
                "Now take your pencil.",
              ),
            ],
          },
        ],
      },
      {
        skill: "READING",
        title: "Reading · Đọc",
        instructions:
          "Bé nhìn tranh và nghe bố mẹ đọc đoạn văn, rồi chọn từ đúng. Bấm vào một từ để xem nghĩa nhé.",
        parts: [
          {
            title: "Part 1 · My lunch box",
            instructions: "Đọc đoạn văn về hộp cơm rồi trả lời 2 câu hỏi.",
            passage:
              "This is my lunch box. I have one banana. I have two eggs. I like my banana. My lunch box is green.",
            questions: [
              mcq(
                "What colour is the lunch box?",
                "Hộp cơm có màu gì?",
                ["red", "green", "blue"],
                1,
                "Trong bài có câu “My lunch box is green.” — “green” nghĩa là màu xanh lá.",
                "My lunch box is green.",
              ),
              mcq(
                "How many eggs are in the box?",
                "Trong hộp có mấy quả trứng?",
                ["one", "two", "four"],
                1,
                "Trong bài có câu “I have two eggs.” — “two” là hai quả trứng.",
                "I have two eggs.",
              ),
            ],
          },
          {
            title: "Part 2 · My school bag",
            instructions: "Đọc đoạn văn về chiếc cặp đi học rồi trả lời 2 câu hỏi.",
            passage:
              "I go to school. My bag is red. I have a pen. I have a ruler. I like my school.",
            questions: [
              mcq(
                "What colour is the bag?",
                "Chiếc cặp có màu gì?",
                ["red", "yellow", "black"],
                0,
                "Trong bài có câu “My bag is red.” — “red” nghĩa là màu đỏ.",
                "My bag is red.",
              ),
              tf(
                "The child likes school.",
                "Bạn nhỏ thích đi học.",
                true,
                "Câu cuối bài viết “I like my school.” — bạn nhỏ thích trường của mình, nên câu này ĐÚNG.",
                "I like my school.",
              ),
            ],
          },
        ],
      },
    ],
  },
];
