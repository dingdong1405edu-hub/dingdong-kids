// Đề thi thử cấp này. Xem hợp đồng + hướng dẫn soạn theo cấp ở ./types.ts.
//
// CHỈ soạn 3 phần: LISTENING · READING · WRITING (phần Nói chưa có trình ghi âm
// trong đề thi thử — xem cảnh báo đầu types.ts).
import type { ExamSeed } from "./types";
import { mcq, tf } from "../types";

export const EXAMS: ExamSeed[] = [
  // ═════════════════════════════════════════════════════════════════════════
  // ĐỀ 1 · Trường học, vườn cây và ngày hội khoa học
  // ═════════════════════════════════════════════════════════════════════════
  {
    slug: "flyers-1",
    title: "Đề thi thử Flyers — Đề 1",
    level: "FLYERS",
    description:
      "Đề luyện theo format Cambridge YLE Flyers (A2): Nghe 6 câu · Đọc 7 câu · Viết 1 đề. " +
      "Chủ đề ngày hội khoa học, câu lạc bộ làm vườn và chuyến đi chơi cùng anh chị em họ. " +
      "Ôn thì tương lai (will / be going to) và so sánh nhất. Thời gian 40 phút.",
    totalTime: 2400,
    sections: [
      // ───────────────────────────── NGHE ─────────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Bé nghe hai đoạn hội thoại rồi chọn đáp án đúng. Mỗi đoạn được nghe tối đa 2 lần, " +
          "giống như trong kỳ thi thật. Nghe hết một lượt rồi hãy trả lời nhé!",
        parts: [
          {
            title: "Part 1 · At the science fair",
            instructions: "Linh nói chuyện với cô Hoa về ngày hội khoa học của trường.",
            transcript:
              "Teacher: Good morning, Linh. Are you ready for the school science fair on Friday?\n" +
              "Girl: Almost, Miss Hoa. My model volcano is finished, but I still have to paint it.\n" +
              "Teacher: That sounds exciting. How long did it take you to build it?\n" +
              "Girl: Three weekends. My brother helped me with the tallest part.\n" +
              "Teacher: Wonderful. The fair will start at nine o'clock, so please arrive at half past eight.\n" +
              "Girl: I will be there early. I am going to bring my camera, because I want to photograph every project.",
            questions: [
              mcq(
                "What time will the science fair start?",
                "Ngày hội khoa học sẽ bắt đầu lúc mấy giờ?",
                ["At half past eight", "At nine o'clock", "At half past nine", "At ten o'clock"],
                1,
                "Cô giáo nói hội bắt đầu lúc chín giờ, còn tám giờ rưỡi là giờ các bạn phải CÓ MẶT. Hai giờ này khác nhau, bé đọc kỹ nhé!",
                "The fair will start at nine o'clock",
              ),
              mcq(
                "What does Linh still have to do?",
                "Linh vẫn còn phải làm việc gì?",
                [
                  "Paint her model volcano",
                  "Build her model volcano",
                  "Buy a new camera",
                  "Write a long report",
                ],
                0,
                "Linh nói núi lửa mô hình đã làm xong rồi ('is finished'), chỉ còn việc sơn màu thôi.",
                "but I still have to paint it",
              ),
              mcq(
                "Why is Linh going to bring her camera?",
                "Vì sao Linh sẽ mang máy ảnh đi?",
                [
                  "To take a photo of her teacher",
                  "To take photos of all the projects",
                  "To show it to her brother",
                  "To sell it at the fair",
                ],
                1,
                "Linh nói 'I want to photograph every project' — bạn ấy muốn chụp lại TẤT CẢ các dự án ở ngày hội.",
                "because I want to photograph every project",
              ),
            ],
          },
          {
            title: "Part 2 · A trip to the butterfly garden",
            instructions: "Một bạn nam kể với mẹ về chuyến đi thăm vườn bướm của lớp.",
            transcript:
              "Boy: Mum, our class is going to visit the butterfly garden next Tuesday.\n" +
              "Mum: How lovely! Do you need to take a packed lunch?\n" +
              "Boy: Yes, and a bottle of water. The teacher says the garden is the biggest one in our city.\n" +
              "Mum: Will you go by bus?\n" +
              "Boy: No, we are going to walk. It is only fifteen minutes from school.\n" +
              "Mum: Then wear your comfortable shoes, and do not forget your notebook.\n" +
              "Boy: I will not. I want to draw the most beautiful butterfly in the garden.",
            questions: [
              mcq(
                "How will the class travel to the garden?",
                "Cả lớp sẽ đi đến vườn bướm bằng cách nào?",
                ["By bus", "By car", "On foot", "By train"],
                2,
                "Mẹ hỏi có đi xe buýt không, bạn nhỏ trả lời 'No, we are going to walk.' — cả lớp đi bộ, chỉ mất mười lăm phút.",
                "we are going to walk",
              ),
              tf(
                "The butterfly garden is the biggest one in the city.",
                "Vườn bướm này là vườn lớn nhất thành phố.",
                true,
                "Đúng rồi! Bạn nhỏ kể lại lời cô giáo: 'the garden is the biggest one in our city'. 'The biggest' là so sánh nhất — lớn nhất.",
                "the garden is the biggest one in our city",
              ),
              mcq(
                "Why does Mum tell the boy to wear comfortable shoes?",
                "Vì sao mẹ dặn bạn nhỏ đi giày êm chân?",
                [
                  "Because his other shoes are broken",
                  "Because the class will walk there and back",
                  "Because it is going to rain",
                  "Because the garden is very muddy",
                ],
                1,
                "Bài nghe KHÔNG nói thẳng lý do — bé phải tự nối hai ý: cả lớp đi bộ mười lăm phút mỗi chiều, nên chân phải thật thoải mái. Mẹ dặn ngay sau khi nghe con nói sẽ đi bộ đấy!",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── ĐỌC ─────────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc hiểu",
        instructions:
          "Bé đọc hai bài rồi chọn đáp án đúng. Từ nào chưa hiểu, bé bấm vào từ đó để xem nghĩa nhé.",
        parts: [
          {
            title: "Part 1 · The Garden Club",
            passage:
              "Our school has a small garden behind the library, and every Thursday the Garden Club works there together.\n\n" +
              "Last year we only grew flowers, but this year we are growing vegetables as well. The tomato plants are the tallest ones in the garden, and they need water every single day. Nam is the youngest member of the club, so he carries the smallest watering can. My favourite job is looking after the sunflowers, because bees and butterflies love them. Miss Hoa says our garden is the greenest place in the whole school.\n\n" +
              "Next month we are going to sell our vegetables at the school fair. We will use the money to buy new tools, and then we will plant a little fruit tree beside the gate.",
            questions: [
              mcq(
                "How often does the Garden Club work in the garden?",
                "Câu lạc bộ Làm vườn làm việc trong vườn bao lâu một lần?",
                ["Every day", "Every Thursday", "Every weekend", "Once a month"],
                1,
                "Câu đầu bài cho biết cả nhóm cùng làm vườn vào thứ Năm hằng tuần.",
                "every Thursday the Garden Club works there together",
              ),
              mcq(
                "Which plants are the tallest in the garden?",
                "Cây nào cao nhất trong vườn?",
                ["The sunflowers", "The tomato plants", "The fruit tree", "The flowers"],
                1,
                "Bài viết 'The tomato plants are the tallest ones in the garden' — cây cà chua cao nhất. 'The tallest' là dạng so sánh nhất của 'tall'.",
                "The tomato plants are the tallest ones in the garden",
              ),
              mcq(
                "What will the club buy with the money from the fair?",
                "Câu lạc bộ sẽ dùng tiền bán rau ở hội chợ để mua gì?",
                ["New tools", "New books", "A new watering can", "A bag of seeds"],
                0,
                "Đoạn cuối dùng thì tương lai: 'We will use the money to buy new tools' — mua dụng cụ làm vườn mới, rồi sau đó trồng thêm một cây ăn quả.",
                "We will use the money to buy new tools",
              ),
              mcq(
                "How does the writer feel about the Garden Club?",
                "Bạn nhỏ viết bài cảm thấy thế nào về câu lạc bộ Làm vườn?",
                ["Proud of it", "Bored by it", "Afraid of it", "Angry about it"],
                0,
                "Bài KHÔNG có từ nào nói thẳng cảm xúc — bé phải tự suy ra. Bạn ấy khoe vườn xanh nhất trường, kể việc mình thích làm và háo hức với kế hoạch tháng sau. Đó là dấu hiệu của sự TỰ HÀO.",
              ),
            ],
          },
          {
            title: "Part 2 · A letter from Mai",
            passage:
              "Hi Ben,\n\n" +
              "Thank you for your letter. Next week my cousins are coming to stay with us for five days, and I cannot wait.\n\n" +
              "On Monday we are going to visit the new science museum in the city centre. My uncle says it is the most interesting museum in the country, and there is a room where you can touch everything. On Wednesday, if the weather is dry, we will ride our bikes around the lake. My cousin Trang rides faster than me, but I know the shortest way home!\n\n" +
              "Please come and join us on Saturday. We are going to make pizza in my grandmother's kitchen.\n\n" +
              "Love,\nMai",
            questions: [
              mcq(
                "How long will Mai's cousins stay?",
                "Các anh chị em họ của Mai sẽ ở lại bao lâu?",
                ["Three days", "Four days", "Five days", "Seven days"],
                2,
                "Mai viết 'coming to stay with us for five days' — ở lại chơi năm ngày.",
                "coming to stay with us for five days",
              ),
              mcq(
                "What will they do on Wednesday if the weather is dry?",
                "Thứ Tư, nếu trời không mưa thì cả nhóm sẽ làm gì?",
                [
                  "Visit the science museum",
                  "Ride their bikes around the lake",
                  "Make pizza together",
                  "Stay at home and read",
                ],
                1,
                "Câu 'On Wednesday, if the weather is dry, we will ride our bikes around the lake' cho biết thứ Tư cả nhóm sẽ đạp xe quanh hồ. Bảo tàng là thứ Hai, còn làm pizza là thứ Bảy.",
                "we will ride our bikes around the lake",
              ),
              tf(
                "Trang rides a bike more slowly than Mai.",
                "Trang đạp xe chậm hơn Mai.",
                false,
                "Sai rồi nhé! Mai viết 'My cousin Trang rides faster than me' — Trang đạp NHANH HƠN Mai. Mai chỉ hơn ở chỗ biết đường về ngắn nhất thôi.",
                "My cousin Trang rides faster than me",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── VIẾT ─────────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions:
          "Bé viết ít nhất 50 từ. Cô AI sẽ khen trước rồi mới chỉ chỗ cần sửa, nên bé cứ mạnh dạn viết nhé!",
        parts: [
          {
            title: "Part 1 · My club",
            writingPrompt:
              "Trường bé sắp mở một câu lạc bộ mới (làm vườn, khoa học, vẽ, bóng đá… bé tự chọn). " +
              "Viết khoảng 50–70 từ giới thiệu: câu lạc bộ tên gì, gặp nhau vào thứ mấy, các bạn sẽ làm gì ở đó, " +
              "và vì sao đó sẽ là câu lạc bộ thú vị nhất trường. Nhớ dùng thì tương lai (will / be going to) " +
              "và ít nhất một câu so sánh nhất (the best, the most interesting…).",
            writingMinWords: 50,
          },
        ],
      },
    ],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // ĐỀ 2 · Núi non, thể thao và thời tiết
  // ═════════════════════════════════════════════════════════════════════════
  {
    slug: "flyers-2",
    title: "Đề thi thử Flyers — Đề 2",
    level: "FLYERS",
    description:
      "Đề luyện theo format Cambridge YLE Flyers (A2): Nghe 6 câu · Đọc 7 câu · Viết 1 đề. " +
      "Chủ đề cắm trại trên núi, Ngày hội thể thao và câu lạc bộ chạy bộ. " +
      "Ôn thì tương lai, so sánh hơn và so sánh nhất. Thời gian 40 phút.",
    totalTime: 2400,
    sections: [
      // ───────────────────────────── NGHE ─────────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Bé nghe hai đoạn hội thoại rồi chọn đáp án đúng. Mỗi đoạn được nghe tối đa 2 lần. " +
          "Lần đầu bé nghe lấy ý chung, lần sau nghe kỹ các con số và ngày trong tuần nhé.",
        parts: [
          {
            title: "Part 1 · Camping in the mountains",
            instructions: "Một bạn nam hỏi bố về chuyến cắm trại cuối tuần tới.",
            transcript:
              "Boy: Dad, are we still going camping in the mountains next weekend?\n" +
              "Dad: Yes, we are. I have already put the tent in the car.\n" +
              "Boy: Will it be colder than last time?\n" +
              "Dad: A little. That is why you must pack your warmest jacket.\n" +
              "Boy: What about food?\n" +
              "Dad: Grandma is making sandwiches for us, and we will cook soup on the little stove.\n" +
              "Boy: I hope we can climb to the top of the hill and watch the sunrise.\n" +
              "Dad: We can, but then we will have to wake up at five o'clock.",
            questions: [
              mcq(
                "Where is the family going next weekend?",
                "Cuối tuần tới gia đình sẽ đi đâu?",
                ["To the beach", "To the mountains", "To the city", "To a farm"],
                1,
                "Ngay câu đầu bạn nhỏ hỏi về chuyến cắm trại trên núi cuối tuần tới, và bố trả lời 'Yes, we are.'",
                "going camping in the mountains next weekend",
              ),
              mcq(
                "What must the boy pack?",
                "Bạn nhỏ phải mang theo thứ gì?",
                ["His warmest jacket", "His swimming shorts", "A new tent", "A big camera"],
                0,
                "Bố nói trời sẽ lạnh hơn lần trước, 'That is why you must pack your warmest jacket' — mang áo khoác ấm nhất.",
                "you must pack your warmest jacket",
              ),
              mcq(
                "Why will they wake up at five o'clock?",
                "Vì sao hai bố con sẽ phải dậy lúc năm giờ?",
                [
                  "Because breakfast is very early",
                  "Because they want to watch the sunrise from the hill",
                  "Because the bus leaves at six o'clock",
                  "Because they must drive home",
                ],
                1,
                "Bài nghe không nói thẳng câu trả lời — bé phải nối hai lượt thoại cuối: bạn nhỏ muốn leo lên đỉnh đồi ngắm bình minh, bố đồng ý NHƯNG bảo phải dậy lúc năm giờ. Vậy dậy sớm là để kịp ngắm mặt trời mọc.",
              ),
            ],
          },
          {
            title: "Part 2 · Sports Day",
            instructions: "Nga nói chuyện với cô giáo về Ngày hội thể thao của trường.",
            transcript:
              "Teacher: Nga, which race are you going to run on Sports Day?\n" +
              "Girl: The two hundred metres, Miss. I practise every morning before breakfast.\n" +
              "Teacher: Excellent. Your team will need you, because Sports Day is next Wednesday.\n" +
              "Girl: I thought it was on Tuesday!\n" +
              "Teacher: It was, but the weather report says Tuesday will be the wettest day of the week.\n" +
              "Girl: Then Wednesday is much better. Will there be a prize for the winning team?\n" +
              "Teacher: Yes, a big silver cup and a picnic in the park.",
            questions: [
              mcq(
                "When is Sports Day now?",
                "Bây giờ Ngày hội thể thao được tổ chức vào thứ mấy?",
                ["On Monday", "On Tuesday", "On Wednesday", "On Thursday"],
                2,
                "Cô giáo nói 'Sports Day is next Wednesday' — thứ Tư tuần sau. Thứ Ba là ngày CŨ, đã bị đổi rồi.",
                "Sports Day is next Wednesday",
              ),
              mcq(
                "Why did the school change the day?",
                "Vì sao nhà trường đổi ngày?",
                [
                  "Because Tuesday will be the wettest day of the week",
                  "Because the teacher is busy on Tuesday",
                  "Because the silver cup is not ready",
                  "Because the park is closed on Tuesday",
                ],
                0,
                "Cô giáo giải thích: bản tin thời tiết nói thứ Ba sẽ là ngày mưa nhiều nhất tuần ('the wettest day'), nên hội dời sang thứ Tư.",
                "Tuesday will be the wettest day of the week",
              ),
              tf(
                "The winning team will get a silver cup.",
                "Đội thắng cuộc sẽ được nhận một chiếc cúp bạc.",
                true,
                "Đúng rồi! Cô giáo nói phần thưởng là 'a big silver cup and a picnic in the park' — một chiếc cúp bạc to và một buổi picnic ở công viên.",
                "a big silver cup",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── ĐỌC ─────────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc hiểu",
        instructions:
          "Bé đọc hai bài rồi chọn đáp án đúng. Chú ý các từ so sánh (colder, faster, the longest) — " +
          "chúng thường là chìa khoá của câu hỏi đấy!",
        parts: [
          {
            title: "Part 1 · Mountain Weekend",
            passage:
              "Every autumn my family spends a weekend in the mountains near Sa Pa.\n\n" +
              "We always leave on Friday evening, when the roads are quiet. The air up there is much cooler than in our town, so we take thick jumpers and a warm blanket for the tent. On Saturday morning we climb the path to the waterfall. It is the longest walk of the whole year, but the view from the top is the most beautiful thing I have ever seen. My mother takes hundreds of photographs, and my little sister looks for interesting stones.\n\n" +
              "Next year we are going to stay for three nights instead of two. My father says we will need a bigger tent.",
            questions: [
              mcq(
                "When does the family leave for the mountains?",
                "Gia đình bạn nhỏ lên đường đi núi vào lúc nào?",
                ["On Friday evening", "On Saturday morning", "On Sunday morning", "On Thursday night"],
                0,
                "Bài viết 'We always leave on Friday evening' — luôn đi vào tối thứ Sáu, lúc đường vắng. Sáng thứ Bảy mới là lúc leo lên thác nước.",
                "We always leave on Friday evening",
              ),
              mcq(
                "Why does the family take thick jumpers?",
                "Vì sao cả nhà mang theo áo len dày?",
                [
                  "Because the jumpers are new",
                  "Because the air is much cooler than in their town",
                  "Because it rains every autumn",
                  "Because they sleep in a hotel",
                ],
                1,
                "Bài giải thích rõ bằng chữ 'so': trên núi không khí mát hơn ở thị trấn NHIỀU, nên cả nhà mang áo len dày và chăn ấm.",
                "The air up there is much cooler than in our town",
              ),
              tf(
                "Next year the family will stay for three nights.",
                "Sang năm cả nhà sẽ ở lại ba đêm.",
                true,
                "Đúng! Đoạn cuối dùng thì tương lai: 'Next year we are going to stay for three nights instead of two.' — ba đêm thay vì hai đêm như mọi năm.",
                "Next year we are going to stay for three nights instead of two.",
              ),
              mcq(
                "What does the writer think about the walk to the waterfall?",
                "Bạn nhỏ nghĩ gì về đoạn đường đi bộ lên thác nước?",
                [
                  "It is boring and always the same",
                  "It is tiring but well worth it",
                  "It is frightening and dangerous",
                  "It is far too short",
                ],
                1,
                "Bài không nói thẳng — bé phải tự suy ra từ chữ 'but'. Đó là chuyến đi bộ DÀI NHẤT cả năm (mệt), NHƯNG cảnh trên đỉnh lại đẹp nhất bạn ấy từng thấy. Vậy là mệt mà rất đáng công.",
              ),
            ],
          },
          {
            title: "Part 2 · Ben's running diary",
            passage:
              "I joined the school running club in September, and it has changed my Saturdays completely.\n\n" +
              "At first I could only run one kilometre, and I always finished last. My coach told me to run a little further each week and to eat a good breakfast before training. Now I can run five kilometres without stopping. I am still slower than Minh, but I am no longer the slowest runner in the club.\n\n" +
              "In December we are going to run a race around the lake. I am not going to win, but I am going to finish with a smile.",
            questions: [
              mcq(
                "When did Ben join the running club?",
                "Ben tham gia câu lạc bộ chạy bộ vào tháng nào?",
                ["In September", "In December", "In June", "In January"],
                0,
                "Câu đầu tiên cho biết Ben vào câu lạc bộ từ tháng Chín. Tháng Mười Hai là tháng sắp có cuộc đua quanh hồ.",
                "I joined the school running club in September",
              ),
              mcq(
                "How far can Ben run now?",
                "Bây giờ Ben chạy được bao xa?",
                ["One kilometre", "Two kilometres", "Five kilometres", "Ten kilometres"],
                2,
                "Chữ 'Now' báo hiệu chuyện HIỆN TẠI: 'Now I can run five kilometres without stopping'. Một ki-lô-mét là hồi mới bắt đầu.",
                "Now I can run five kilometres without stopping",
              ),
              tf(
                "Ben thinks he will win the race in December.",
                "Ben nghĩ mình sẽ thắng cuộc đua tháng Mười Hai.",
                false,
                "Không đúng nhé! Ben viết 'I am not going to win, but I am going to finish with a smile.' — bạn ấy không mong thắng, chỉ mong về đích với nụ cười.",
                "I am not going to win",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── VIẾT ─────────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions:
          "Bé viết ít nhất 50 từ. Viết xong đọc lại một lượt xem đã có đủ dấu chấm và chữ hoa đầu câu chưa nhé.",
        parts: [
          {
            title: "Part 1 · My weekend plan",
            writingPrompt:
              "Viết khoảng 50–70 từ kể về một chuyến đi chơi cuối tuần mà bé SẼ thực hiện: bé sẽ đi đâu, " +
              "đi với ai, mang theo những gì và sẽ làm gì ở đó. Cuối bài nói xem phần nào sẽ vui nhất và vì sao. " +
              "Nhớ dùng thì tương lai (will / be going to) và ít nhất một câu so sánh (colder, more exciting, the best…).",
            writingMinWords: 50,
          },
        ],
      },
    ],
  },
];
