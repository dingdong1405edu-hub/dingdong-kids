// Đề thi thử cấp này. Xem hợp đồng + hướng dẫn soạn theo cấp ở ./types.ts.
//
// CHỈ soạn 3 phần: LISTENING · READING · WRITING (phần Nói chưa có trình ghi âm
// trong đề thi thử — xem cảnh báo đầu types.ts).
import type { ExamSeed } from "./types";
import { mcq, tf } from "../types";

export const EXAMS: ExamSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  ĐỀ 1 · Ngày hội khoa học · đài phát thanh của trường · chú mèo Mochi
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "ket-1",
    title: "Đề thi thử Key (A2) — Đề 1",
    level: "KET",
    description:
      "Đề thi thử theo format A2 Key for Schools: 7 câu Nghe · 8 câu Đọc · 1 bài Viết 70 từ. " +
      "Chủ đề xoay quanh ngày hội khoa học, chuyến đi bảo tàng, đài phát thanh học sinh và " +
      "chú mèo được cả trường nhận nuôi. Có câu hỏi về THÁI ĐỘ của người nói.",
    totalTime: 3000,
    sections: [
      // ───────────────────────────── NGHE (7 câu) ─────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe hiểu",
        instructions:
          "Có 2 bài nghe, tổng 7 câu hỏi. Em được nghe mỗi bài 2 lần, giống kỳ thi thật. " +
          "Nghe hết một lượt rồi hãy chọn đáp án — đừng vội chọn ngay từ câu đầu tiên.",
        parts: [
          {
            title: "Part 1 · Trước ngày hội khoa học",
            instructions: "Mai và Khoa nói chuyện về bài dự thi ngày hội khoa học của trường.",
            transcript:
              "Girl: Khoa, have you finished your project for the science fair yet?\n" +
              "Boy: Almost, Mai. I built a small robot which can pick up plastic bottles, but the battery keeps dying after ten minutes.\n" +
              "Girl: Ten minutes is quite short. Did you ask Mr Tuan for help?\n" +
              "Boy: I did, and he told me to use two smaller batteries instead of one big one. I'll try that tonight.\n" +
              "Girl: That sounds sensible. My project is about growing beans in different kinds of soil, so I only need water and patience.\n" +
              "Boy: Patience is the part I'm not good at! To be honest, I nearly gave up on Saturday when the wheels fell off.\n" +
              "Girl: I'm glad you didn't. Your robot is the most interesting idea in our class.\n" +
              "Boy: Thanks. The fair starts at half past eight on Friday, doesn't it?\n" +
              "Girl: No, it was moved. It begins at nine o'clock now, but we have to bring our projects to the hall before eight.\n" +
              "Boy: Then I'd better set two alarms tonight.",
            questions: [
              mcq(
                "What is the problem with Khoa's robot?",
                "Con robot của Khoa đang gặp vấn đề gì?",
                [
                  "The battery only lasts about ten minutes.",
                  "It cannot pick up plastic bottles.",
                  "It is too big to carry to school.",
                  "He does not know how to switch it on.",
                ],
                0,
                "Khoa nói robot nhặt được vỏ chai, nhưng pin cứ hết sau mười phút. Vấn đề nằm ở PIN, không phải ở tay nhặt.",
                "the battery keeps dying after ten minutes",
              ),
              mcq(
                "What does Mr Tuan tell Khoa to do?",
                "Thầy Tuấn bảo Khoa làm gì?",
                [
                  "Buy a completely new robot",
                  "Use two smaller batteries instead of one big one",
                  "Ask Mai to build the robot for him",
                  "Change the wheels before Friday",
                ],
                1,
                "Khoa kể lại lời thầy: dùng hai cục pin nhỏ thay cho một cục pin to. Bánh xe có được nhắc tới, nhưng đó là chuyện hôm thứ Bảy, không phải lời khuyên của thầy.",
                "he told me to use two smaller batteries instead of one big one",
              ),
              mcq(
                "How did Khoa feel about his project on Saturday?",
                "Hôm thứ Bảy, Khoa cảm thấy thế nào về bài dự thi của mình?",
                [
                  "He almost decided to stop working on it.",
                  "He was proud because everything worked perfectly.",
                  "He was angry with his teacher.",
                  "He thought the project was too easy.",
                ],
                0,
                "Câu hỏi về THÁI ĐỘ. Khoa nói thật lòng: 'I nearly gave up' — bạn ấy suýt bỏ cuộc khi bánh xe rơi ra. 'Nearly' nghĩa là suýt nữa, tức là cuối cùng vẫn không bỏ.",
                "I nearly gave up on Saturday when the wheels fell off",
              ),
              mcq(
                "What time must the students bring their projects to the hall?",
                "Học sinh phải mang bài dự thi tới hội trường lúc mấy giờ?",
                [
                  "Before eight o'clock",
                  "At half past eight",
                  "At nine o'clock",
                  "After the fair has started",
                ],
                0,
                "Đây là câu bẫy về giờ. Ngày hội bắt đầu lúc chín giờ, nhưng bài dự thi phải mang tới hội trường TRƯỚC tám giờ. Còn 'half past eight' là giờ cũ đã bị đổi.",
                "we have to bring our projects to the hall before eight",
              ),
            ],
          },
          {
            title: "Part 2 · Thông báo về chuyến đi bảo tàng",
            instructions: "Cô giáo thông báo với cả lớp về chuyến tham quan Bảo tàng Khoa học.",
            transcript:
              "Teacher: Good morning, everyone. Please listen carefully, because I have some news about our trip to the Science Museum.\n" +
              "Teacher: We are leaving on Thursday, not on Wednesday, because the museum is closed for cleaning in the middle of the week.\n" +
              "Teacher: The bus will wait outside the school gate, and it leaves at seven fifteen. If you arrive late, the bus will go without you.\n" +
              "Teacher: Bring a packed lunch and a bottle of water. You do not need any money, because the school has already paid for the tickets.\n" +
              "Teacher: Please wear your sports shoes rather than your school shoes, since we will walk around the museum for almost three hours.\n" +
              "Teacher: I know some of you think museums are boring, but I promise this one is different. There is a room where you can build your own bridge and then test how much weight it holds.\n" +
              "Teacher: Finally, give the signed form to me before Tuesday. Without it, I am afraid you cannot come with us.",
            questions: [
              mcq(
                "Why is the trip on Thursday and not on Wednesday?",
                "Vì sao chuyến đi chuyển sang thứ Năm chứ không phải thứ Tư?",
                [
                  "Because the bus is not free on Wednesday",
                  "Because the museum is closed for cleaning in the middle of the week",
                  "Because the students have an exam on Wednesday",
                  "Because the teacher is busy on Wednesday",
                ],
                1,
                "Cô nói rõ lý do: giữa tuần bảo tàng đóng cửa để dọn dẹp, nên phải dời sang thứ Năm.",
                "because the museum is closed for cleaning in the middle of the week",
              ),
              mcq(
                "What must the students bring with them?",
                "Học sinh phải mang theo những gì?",
                [
                  "Money for the museum tickets",
                  "A packed lunch and a bottle of water",
                  "Their school shoes",
                  "A bridge made at home",
                ],
                1,
                "Cô dặn mang cơm hộp và một chai nước. Tiền vé thì trường đã trả rồi, và cô còn dặn đi giày THỂ THAO chứ không phải giày đồng phục.",
                "Bring a packed lunch and a bottle of water",
              ),
              mcq(
                "What does the teacher think about the museum?",
                "Cô giáo nghĩ gì về bảo tàng này?",
                [
                  "She is sure the students will not find it boring.",
                  "She agrees that all museums are boring places.",
                  "She has never been there herself.",
                  "She thinks three hours is far too long.",
                ],
                0,
                "Câu hỏi về THÁI ĐỘ. Cô biết có bạn nghĩ bảo tàng chán, nhưng cô 'promise' — cam đoan nơi này khác, rồi kể luôn phòng tự dựng cầu. Vậy cô tin học sinh sẽ thấy thú vị.",
                "I promise this one is different",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── ĐỌC (8 câu) ──────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc hiểu",
        instructions:
          "Có 2 bài đọc, tổng 8 câu hỏi. Đọc lướt cả bài một lượt trước, rồi mới đọc câu hỏi " +
          "và quay lại tìm chỗ chứa câu trả lời. Có từ nào lạ thì bấm vào từ đó để tra nghĩa.",
        parts: [
          {
            title: "Part 3 · Radio Bamboo",
            passage:
              "Two years ago, our school had an empty store room which nobody used. Today it is the studio of Radio Bamboo, the first student radio station in our town.\n\n" +
              "The idea came from Trang, a girl in Year 8 who loves music but hates speaking in front of large groups. She noticed that break time was noisy and boring, so she asked the head teacher whether students could play songs through the speakers. The head teacher agreed, but she made one condition: the students had to run everything themselves.\n\n" +
              "At first only four people joined the club. They borrowed an old microphone which crackled, and their very first show lasted six minutes. Now twenty students take turns to present programmes about sport, science and books, and even the teachers send in messages asking for their favourite songs.\n\n" +
              "Trang says the best part is not the music. \"I used to go red whenever a teacher asked me a question,\" she explains. \"Now I talk to six hundred people every Friday and my hands do not shake at all.\"",
            questions: [
              mcq(
                "Where is the studio of Radio Bamboo?",
                "Phòng thu của Radio Bamboo nằm ở đâu?",
                [
                  "In a store room that nobody was using",
                  "In the school library",
                  "In a room next to the playground",
                  "In a building outside the school",
                ],
                0,
                "Câu đầu tiên cho biết trường có một cái kho trống chẳng ai dùng, và hôm nay chính chỗ đó là phòng thu.",
                "our school had an empty store room which nobody used",
              ),
              mcq(
                "What condition did the head teacher make?",
                "Cô hiệu trưởng đặt ra điều kiện gì?",
                [
                  "The students had to organise everything by themselves.",
                  "Only students in Year 8 could join the club.",
                  "The club could only play music in the library.",
                  "A teacher had to choose all the songs.",
                ],
                0,
                "Cô hiệu trưởng đồng ý nhưng ra một điều kiện: học sinh phải TỰ LO hết mọi thứ. 'Run everything themselves' nghĩa là tự vận hành.",
                "the students had to run everything themselves",
              ),
              mcq(
                "How has the club changed since it started?",
                "Câu lạc bộ đã thay đổi thế nào từ ngày mới lập?",
                [
                  "It has moved to a bigger town.",
                  "It has grown from four members to twenty presenters.",
                  "It now plays music only for the teachers.",
                  "It has stopped talking about sport.",
                ],
                1,
                "Lúc đầu chỉ có bốn bạn tham gia; bây giờ hai mươi bạn thay phiên nhau dẫn các chương trình về thể thao, khoa học và sách.",
                "Now twenty students take turns to present programmes about sport, science and books",
              ),
              mcq(
                "What does Trang think is the best thing about Radio Bamboo?",
                "Trang cho rằng điều tuyệt nhất mà Radio Bamboo mang lại là gì?",
                [
                  "She can listen to new songs every week.",
                  "She has become much more confident.",
                  "She does not have to study at break time.",
                  "She has become famous in her town.",
                ],
                1,
                "Câu hỏi về THÁI ĐỘ. Trang nói thẳng điều hay nhất KHÔNG phải âm nhạc: ngày trước hỏi bài là đỏ mặt, giờ nói trước sáu trăm người mà tay không run — tức là bạn ấy đã tự tin hơn rất nhiều.",
                "Now I talk to six hundred people every Friday and my hands do not shake at all.",
              ),
            ],
          },
          {
            title: "Part 4 · The cat who came to school",
            passage:
              "Nobody knows exactly where Mochi came from. One rainy Tuesday in October, a small grey cat walked into the school office and sat down on the photocopier, which was the warmest place in the building.\n\n" +
              "The secretary, Ms Hoa, gave him a bowl of rice and fish and expected him to leave. Instead, Mochi stayed. He learnt the timetable faster than the new pupils: at eight o'clock he sleeps in the library, at ten he waits outside the canteen, and at two he sits on the wall which separates the playground from the car park.\n\n" +
              "Not everyone was pleased at first. Some parents worried that a cat might make the classrooms dirty, so Class 8B wrote a letter explaining that they would brush him and clean his bowl every day. They have kept that promise for eleven months.\n\n" +
              "Mochi cannot read a single word, but he has his own page in the school magazine, and last term the pupils voted him the best listener in the school.",
            questions: [
              mcq(
                "Why did Mochi sit on the photocopier?",
                "Vì sao Mochi lại ngồi lên cái máy photocopy?",
                [
                  "Because it was the warmest place there",
                  "Because Ms Hoa put his food on it",
                  "Because he wanted to sleep in the library",
                  "Because the office door was closed",
                ],
                0,
                "Hôm đó trời mưa, và bài đọc nói máy photocopy là chỗ ẤM NHẤT trong toà nhà — mèo thì rất thích chỗ ấm.",
                "which was the warmest place in the building",
              ),
              tf(
                "Ms Hoa thought the cat would go away after eating.",
                "Cô Hoa nghĩ chú mèo sẽ bỏ đi sau khi ăn xong.",
                true,
                "Đúng. Cô Hoa cho mèo một bát cơm cá và 'expected him to leave' — cô tưởng ăn xong nó sẽ đi. Nhưng Mochi lại ở lại luôn.",
                "gave him a bowl of rice and fish and expected him to leave",
              ),
              mcq(
                "Why did Class 8B write a letter?",
                "Vì sao lớp 8B lại viết một lá thư?",
                [
                  "To ask the school to buy a bigger bowl",
                  "To promise that they would look after the cat",
                  "To invite parents to visit the school",
                  "To complain about the noise in the playground",
                ],
                1,
                "Một số phụ huynh lo mèo làm bẩn lớp học, nên lớp 8B viết thư hứa sẽ chải lông và rửa bát cho Mochi mỗi ngày.",
                "so Class 8B wrote a letter explaining that they would brush him and clean his bowl every day",
              ),
              mcq(
                "What does the writer want to show about Mochi?",
                "Người viết muốn cho ta thấy điều gì về Mochi?",
                [
                  "That cats are difficult animals to keep",
                  "That he has become a real member of the school",
                  "That the school should find him a new home",
                  "That he is happier in the car park than inside",
                ],
                1,
                "Câu suy luận — không có câu nào nói thẳng. Nhưng Mochi thuộc thời khoá biểu, có trang riêng trên báo trường, lại được bình chọn là người biết lắng nghe nhất: cả bài cho thấy nó đã thành một thành viên thật sự của trường.",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── VIẾT (1 đề) ──────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions:
          "Chỉ có MỘT đề viết. Viết bằng tiếng Anh, tối thiểu 70 từ. Viết xong hãy đọc lại một " +
          "lượt để kiểm tra: danh từ số nhiều đã có -s chưa, câu nào cũng có động từ chưa, " +
          "đầu câu và tên riêng đã viết hoa chưa.",
        parts: [
          {
            title: "Part 5 · An email to your friend",
            writingPrompt:
              "Bạn người Anh tên Alex vừa nhắn hỏi em: \"What clubs do you have at your school?\" " +
              "Hãy viết một email khoảng 70–90 từ trả lời Alex.\n\n" +
              "Trong email cần có đủ 3 ý:\n" +
              "1. Em tham gia câu lạc bộ nào, câu lạc bộ đó sinh hoạt vào thứ mấy.\n" +
              "2. Em làm gì ở đó và vì sao em thích — hãy dùng MỘT mệnh đề quan hệ " +
              "(who / which / that), ví dụ: \"a robot which can pick up bottles\".\n" +
              "3. Rủ Alex làm một việc gì đó bằng MỘT câu điều kiện loại 1, ví dụ: " +
              "\"If you come to Vietnam, I will show you our science fair.\"\n\n" +
              "Nhớ mở đầu bằng \"Hi Alex,\" và kết thúc bằng tên em.",
            writingMinWords: 70,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  ĐỀ 2 · Câu lạc bộ thể thao · hội sách từ thiện · vườn sân thượng · bưu thiếp
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "ket-2",
    title: "Đề thi thử Key (A2) — Đề 2",
    level: "KET",
    description:
      "Đề thi thử thứ hai theo format A2 Key for Schools: 7 câu Nghe · 8 câu Đọc · 1 bài Viết 70 từ. " +
      "Chủ đề xoay quanh việc chọn câu lạc bộ thể thao, hội sách gây quỹ, vườn rau trên sân thượng " +
      "và bộ sưu tập bưu thiếp gửi từ khắp thế giới.",
    totalTime: 3000,
    sections: [
      // ───────────────────────────── NGHE (7 câu) ─────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe hiểu",
        instructions:
          "Có 2 bài nghe, tổng 7 câu hỏi. Em được nghe mỗi bài 2 lần. Chú ý những chỗ người nói " +
          "ĐỔI Ý hoặc SỬA LẠI thông tin — đề thi rất hay hỏi đúng vào chỗ đó.",
        parts: [
          {
            title: "Part 1 · Chọn câu lạc bộ thể thao",
            instructions: "Đức nói chuyện với mẹ về việc chọn câu lạc bộ thể thao ở trường.",
            transcript:
              "Boy: Mum, the sports clubs at school open on Monday, and I can't decide which one to join.\n" +
              "Mum: What are the choices, Duc?\n" +
              "Boy: Football, swimming or badminton. My friends are all choosing football, which starts at four o'clock every Tuesday.\n" +
              "Mum: And what would you choose if your friends were not there?\n" +
              "Boy: Swimming, definitely. But the pool is quite far away, and the lesson finishes at seven in the evening.\n" +
              "Mum: Seven is rather late. Your father drives past that pool on his way home, though, so he could bring you back.\n" +
              "Boy: Really? Then swimming is possible after all. The only problem is the cost, because we have to pay for the pool ticket ourselves.\n" +
              "Mum: How much is it?\n" +
              "Boy: Forty thousand dong for each lesson, so I would need to save some of my pocket money.\n" +
              "Mum: That seems fair to me. If you are willing to save, I will pay half.\n" +
              "Boy: Thanks, Mum! I'll tell the teacher tomorrow morning.",
            questions: [
              mcq(
                "Which club does Duc really want to join?",
                "Đức thật sự muốn tham gia câu lạc bộ nào?",
                ["Football", "Swimming", "Badminton", "The music club"],
                1,
                "Mẹ hỏi nếu không có bạn bè thì con chọn gì, Đức trả lời ngay 'Swimming, definitely'. Bóng đá chỉ là chỗ các bạn của Đức chọn.",
                "Swimming, definitely.",
              ),
              mcq(
                "How does Mum solve the problem of the late finishing time?",
                "Mẹ giải quyết chuyện tan lớp muộn bằng cách nào?",
                [
                  "She will move Duc to the badminton club.",
                  "Duc's father can pick him up on his way home.",
                  "Duc will take a taxi home every evening.",
                  "The lesson will finish an hour earlier.",
                ],
                1,
                "Mẹ nói bố đi làm về ngang qua bể bơi, nên bố có thể đón Đức. Không ai đổi giờ học cả.",
                "so he could bring you back",
              ),
              mcq(
                "What does Duc have to do to pay for the lessons?",
                "Đức phải làm gì để có tiền đóng học phí?",
                [
                  "Save part of his pocket money",
                  "Sell his old badminton racket",
                  "Work at the swimming pool on Sundays",
                  "Borrow money from his friends",
                ],
                0,
                "Vé bể bơi bốn mươi nghìn một buổi, nên Đức nói bạn ấy sẽ phải để dành một phần tiền tiêu vặt. Mẹ hứa trả giúp một nửa.",
                "I would need to save some of my pocket money",
              ),
              mcq(
                "What does Mum think about the price of the lessons?",
                "Mẹ nghĩ gì về giá của mỗi buổi học bơi?",
                [
                  "She thinks it is a reasonable price.",
                  "She thinks it is far too expensive.",
                  "She thinks football would cost less.",
                  "She refuses to help Duc pay for it.",
                ],
                0,
                "Câu hỏi về THÁI ĐỘ. Mẹ nói 'That seems fair to me' — mẹ thấy giá đó hợp lý, và mẹ còn đồng ý trả giúp một nửa.",
                "That seems fair to me.",
              ),
            ],
          },
          {
            title: "Part 2 · Thông báo về hội sách gây quỹ",
            instructions: "Bạn Ngọc lớp 9A đọc thông báo của thư viện trên loa phát thanh trường.",
            transcript:
              "Girl: Hello, everyone. This is Ngoc from Class 9A with the news from our library.\n" +
              "Girl: On Saturday we are holding a book sale in the playground, and all the money will go to the children's hospital in our city.\n" +
              "Girl: We are not selling new books. Every book comes from a student's own shelf, so please bring the ones you have already read. Please do not bring books which are torn or missing pages.\n" +
              "Girl: The sale opens at eight in the morning and closes at eleven, but you can leave your books in the library at any time this week.\n" +
              "Girl: Most books will cost ten thousand dong, and nothing will cost more than thirty thousand.\n" +
              "Girl: Last year we were disappointed, because it rained all morning and only a few people came. This year we have a big tent, so the weather will not stop us.\n" +
              "Girl: Come early, buy a book, and help a child in hospital. Thank you for listening.",
            questions: [
              mcq(
                "Who will receive the money from the book sale?",
                "Số tiền thu được từ hội sách sẽ dành cho ai?",
                [
                  "The school library",
                  "The children's hospital in the city",
                  "The students who bring the most books",
                  "Class 9A",
                ],
                1,
                "Ngọc nói toàn bộ số tiền sẽ dành cho bệnh viện nhi trong thành phố. Thư viện chỉ là nơi nhận sách gửi trước.",
                "all the money will go to the children's hospital in our city",
              ),
              mcq(
                "Which books should students NOT bring?",
                "Học sinh KHÔNG nên mang loại sách nào tới?",
                [
                  "Books which are torn or have pages missing",
                  "Books they have already read",
                  "Books that cost ten thousand dong",
                  "Books about hospitals",
                ],
                0,
                "Sách phải là sách cũ mình đã đọc rồi, nhưng KHÔNG được rách hay thiếu trang. Chú ý chữ 'do not bring'.",
                "Please do not bring books which are torn or missing pages.",
              ),
              mcq(
                "How did Ngoc feel about the book sale last year?",
                "Ngọc cảm thấy thế nào về hội sách năm ngoái?",
                [
                  "She was disappointed because very few people came.",
                  "She was surprised that so many books were sold.",
                  "She was pleased with the sunny weather.",
                  "She was proud that the sale lasted all day.",
                ],
                0,
                "Câu hỏi về THÁI ĐỘ. Ngọc dùng đúng từ 'disappointed' — thất vọng, vì trời mưa cả buổi sáng và rất ít người tới. Năm nay có lều to nên sẽ khác.",
                "Last year we were disappointed, because it rained all morning and only a few people came.",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── ĐỌC (8 câu) ──────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc hiểu",
        instructions:
          "Có 2 bài đọc, tổng 8 câu hỏi. Câu cuối của mỗi bài thường hỏi về Ý CHÍNH hoặc cảm nghĩ " +
          "của người viết — loại câu này phải hiểu cả bài mới trả lời được, không tìm thấy ở một dòng nào.",
        parts: [
          {
            title: "Part 3 · The garden on the roof",
            passage:
              "When my grandmother moved into our flat in Ho Chi Minh City, she missed the garden which she had looked after for thirty years in the countryside. Our flat is on the ninth floor and has no soil at all, so at first she simply sat by the window and looked sad.\n\n" +
              "Then my brother found an old ladder up to the roof. The roof was flat, empty and extremely hot, but my grandmother smiled for the first time in weeks. We carried up twenty plastic boxes, filled them with soil, and planted spring onions, mint, tomatoes and chillies.\n\n" +
              "The first month was hard, because the sun burned the young leaves. My grandmother taught us to water the boxes early in the morning rather than at midday, and to build a simple roof of old cloth above the smallest plants.\n\n" +
              "Now six families in our building grow vegetables up there. Nobody sells anything; we swap instead. My grandmother gives away mint and receives eggs, and she says the roof is noisier and happier than her old garden ever was.",
            questions: [
              mcq(
                "Why was the writer's grandmother sad when she arrived?",
                "Vì sao bà của bạn nhỏ lại buồn khi mới chuyển đến?",
                [
                  "Because she missed the garden she had looked after for thirty years",
                  "Because the flat was too small for her family",
                  "Because she did not like the ninth floor",
                  "Because her neighbours were unfriendly",
                ],
                0,
                "Bà nhớ khu vườn mà bà đã chăm suốt ba mươi năm ở quê. Căn hộ thì không có một tí đất nào.",
                "she missed the garden which she had looked after for thirty years in the countryside",
              ),
              mcq(
                "What was the main problem in the first month?",
                "Khó khăn lớn nhất trong tháng đầu tiên là gì?",
                [
                  "The plastic boxes were too heavy to carry.",
                  "The sun burned the young leaves.",
                  "The neighbours took the vegetables.",
                  "There was not enough rain in the city.",
                ],
                1,
                "Bài đọc nói tháng đầu rất vất vả VÌ nắng làm cháy những chiếc lá non. Các hộp nhựa thì cả nhà đã khiêng lên xong từ trước rồi.",
                "because the sun burned the young leaves",
              ),
              mcq(
                "What did the grandmother teach the children to do?",
                "Bà đã dạy các cháu làm gì?",
                [
                  "To water the plants early in the morning instead of at midday",
                  "To plant only tomatoes and chillies",
                  "To sell the vegetables to the neighbours",
                  "To move the boxes down to the flat at night",
                ],
                0,
                "Bà dạy tưới cây sớm vào buổi sáng thay vì giữa trưa, và làm một mái che bằng vải cũ cho những cây nhỏ nhất.",
                "to water the boxes early in the morning rather than at midday",
              ),
              mcq(
                "How does the grandmother feel about the rooftop garden now?",
                "Bây giờ bà cảm thấy thế nào về khu vườn trên sân thượng?",
                [
                  "She likes it even more than her old garden.",
                  "She still wishes she could go back to the countryside.",
                  "She finds it too noisy to enjoy.",
                  "She thinks it is too much work for her.",
                ],
                0,
                "Câu hỏi về THÁI ĐỘ. Bà bảo sân thượng ồn ào hơn VÀ vui hơn khu vườn cũ — 'happier than her old garden ever was'. Ồn ở đây là ồn vui, vì có sáu gia đình cùng trồng rau.",
                "she says the roof is noisier and happier than her old garden ever was",
              ),
            ],
          },
          {
            title: "Part 4 · Forty-one postcards",
            passage:
              "My uncle works on a container ship, and every time he arrives in a new country he sends me a postcard. The first one came from Singapore when I was seven. I could not read the English on the back, so my mother translated it for me while I looked at the picture of the harbour at night.\n\n" +
              "Since then I have received forty-one postcards, and they cover the whole wall above my desk. My favourite is not the most beautiful one. It is a plain card from Rotterdam which shows nothing except grey rain, because on the back my uncle wrote that he had been thinking about my mother's soup for eleven days.\n\n" +
              "People often ask why I do not simply chat with him online. We do that too, of course, but a message disappears when I close the phone. A postcard has travelled thousands of kilometres inside a bag, and it is still there in the morning.\n\n" +
              "I am saving money for a trip to meet his ship at a port one day.",
            questions: [
              mcq(
                "Why could the writer not read the first postcard?",
                "Vì sao bạn nhỏ không đọc được tấm bưu thiếp đầu tiên?",
                [
                  "It was written in English and the writer was only seven.",
                  "The rain had damaged the words.",
                  "His uncle had forgotten to write anything.",
                  "The picture covered the whole card.",
                ],
                0,
                "Tấm đầu tiên tới từ Singapore khi bạn ấy mới bảy tuổi, và bạn ấy chưa đọc được tiếng Anh nên mẹ phải dịch hộ.",
                "I could not read the English on the back",
              ),
              mcq(
                "Why is the card from Rotterdam the writer's favourite?",
                "Vì sao tấm bưu thiếp từ Rotterdam lại là tấm bạn nhỏ thích nhất?",
                [
                  "Because it has the most beautiful picture",
                  "Because of the message his uncle wrote on the back",
                  "Because it was the very first card he received",
                  "Because it arrived faster than the others",
                ],
                1,
                "Tấm đó chỉ vẽ mỗi màn mưa xám xịt, chẳng đẹp gì. Điều làm nó đặc biệt là dòng chữ phía sau: chú kể suốt mười một ngày chú nhớ món canh của mẹ bạn ấy.",
                "my uncle wrote that he had been thinking about my mother's soup for eleven days",
              ),
              tf(
                "The writer never talks to his uncle on the internet.",
                "Bạn nhỏ chưa bao giờ trò chuyện với chú qua mạng.",
                false,
                "Sai. Bài đọc viết 'We do that too, of course' — hai chú cháu vẫn nhắn tin online. Chỉ là tin nhắn biến mất khi tắt điện thoại, còn bưu thiếp thì vẫn nằm đó.",
                "We do that too, of course",
              ),
              mcq(
                "Which is the best title for this text?",
                "Tiêu đề nào hợp nhất với bài đọc này?",
                [
                  "A Wall That Keeps My Uncle Close",
                  "How To Work On A Container Ship",
                  "The Best Places To Visit In Europe",
                  "Why My Mother Cooks The Best Soup",
                ],
                0,
                "Câu suy luận — phải hiểu cả bài. Bài không dạy đi tàu, không giới thiệu du lịch, cũng không nói về nấu ăn: nó kể về bức tường bưu thiếp giúp bạn nhỏ thấy chú luôn ở gần.",
              ),
            ],
          },
        ],
      },
      // ───────────────────────────── VIẾT (1 đề) ──────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions:
          "Chỉ có MỘT đề viết. Viết bằng tiếng Anh, tối thiểu 70 từ. Dùng thì QUÁ KHỨ ĐƠN để kể " +
          "chuyện đã xảy ra (went, made, was), và nhớ kiểm tra lại mạo từ a / an / the trước danh từ.",
        parts: [
          {
            title: "Part 5 · A story about a weekend",
            writingPrompt:
              "Tạp chí của trường đang tìm bài cho mục \"My Best Weekend\". Hãy viết một câu chuyện " +
              "khoảng 70–90 từ bằng tiếng Anh kể về một ngày cuối tuần đáng nhớ của em.\n\n" +
              "Bắt đầu bằng đúng câu này: \"Last Saturday morning, my family had a surprise for me.\"\n\n" +
              "Trong bài cần có đủ 3 ý:\n" +
              "1. Em đã đi đâu, đi với ai (dùng thì quá khứ đơn: we went, we saw, it was).\n" +
              "2. Em đã làm gì ở đó và có chuyện gì bất ngờ xảy ra.\n" +
              "3. Em cảm thấy thế nào lúc cuối ngày, và vì sao em nhớ ngày hôm đó — hãy dùng " +
              "MỘT mệnh đề quan hệ (who / which / that), ví dụ: \"a day which I will never forget\".",
            writingMinWords: 70,
          },
        ],
      },
    ],
  },
];
