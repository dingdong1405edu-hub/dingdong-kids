// Nội dung bài học cấp `ket` (A2 Key for Schools · 11–13 tuổi).
// Xem hợp đồng + hướng dẫn soạn theo cấp ở prisma/content/types.ts.
//
// Trọng tâm ngữ pháp của cấp này: câu điều kiện loại 1, hiện tại hoàn thành,
// đại từ quan hệ (who / which / that).
// "Phonics" ở cấp này là PHÁT ÂM NÂNG CAO: trọng âm từ, trọng âm câu, nối âm,
// âm /ə/ (schwa) — đúng những điểm yếu lớn nhất của người học Việt Nam.
import { type ChapterSeed, mcq, tf, word } from "./types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 1 · Cuộc sống học đường",
    subtitle: "Thời khoá biểu, học trực tuyến và những kỳ thi đầu tiên.",
    lessons: [
      // ─────────────────────────── Bài 1 ───────────────────────────
      {
        topic: "School Life",
        topicVi: "Một ngày ở trường cấp hai",
        icon: "🎒",
        words: [
          word("timetable", "/ˈtaɪmˌteɪbl/", "thời khoá biểu", "📅"),
          word("subject", "/ˈsʌbdʒɪkt/", "môn học", "📚"),
          word("break", "/breɪk/", "giờ ra chơi", "⏰"),
          word("classmate", "/ˈklɑːsmeɪt/", "bạn cùng lớp", "🧑‍🤝‍🧑"),
          word("uniform", "/ˈjuːnɪfɔːm/", "đồng phục", "👔"),
          word("homework", "/ˈhəʊmwɜːk/", "bài tập về nhà", "📝"),
          word("canteen", "/kænˈtiːn/", "căng tin", "🍜"),
          word("library", "/ˈlaɪbrəri/", "thư viện", "📖"),
          word("monitor", "/ˈmɒnɪtə/", "lớp trưởng", "🎖️"),
          word("crowded", "/ˈkraʊdɪd/", "đông đúc, chật kín", "👥"),
          word("tiring", "/ˈtaɪərɪŋ/", "mệt, làm mình đuối sức", "😴"),
          word("hand in", "/ˌhænd ˈɪn/", "nộp bài cho thầy cô", "📄"),
          word("look after", "/ˌlʊk ˈɑːftə/", "trông nom, chăm sóc ai đó", "🤗"),
          word("take part in", "/ˌteɪk ˈpɑːt ɪn/", "tham gia vào hoạt động gì", "🙋"),
          word("get on with", "/ˌɡet ˈɒn wɪð/", "hoà đồng, chơi hợp với ai", "😊"),
        ],
        sound: {
          letters: "word stress",
          sound: "/ˈ/",
          hint:
            "Tiếng Việt mỗi tiếng đều đọc rõ và mạnh như nhau, nên trẻ Việt hay đọc đều tăm tắp " +
            "'ti-mơ-ta-bồ'. Tiếng Anh KHÔNG như vậy: mỗi từ dài chỉ có MỘT âm tiết được nhấn — " +
            "đọc to hơn, cao hơn, dài hơn; các âm tiết còn lại đọc nhẹ và nhanh. Đặt tay lên bụng, " +
            "âm nhấn là chỗ mình đẩy hơi mạnh nhất. Nhấn sai chỗ (can-TEEN thành CAN-teen) là " +
            "người bản xứ nghe không ra, dù phát âm từng chữ vẫn đúng.",
          words: [
            { word: "timetable", meaning: "thời khoá biểu — nhấn âm ĐẦU: TIME-ta-ble", emoji: "📅" },
            { word: "canteen", meaning: "căng tin — nhấn âm CUỐI: can-TEEN", emoji: "🍜" },
            { word: "homework", meaning: "bài tập về nhà — nhấn âm ĐẦU: HOME-work", emoji: "📝" },
            { word: "uniform", meaning: "đồng phục — nhấn âm ĐẦU: U-ni-form", emoji: "👔" },
            { word: "September", meaning: "tháng Chín — nhấn âm GIỮA: Sep-TEM-ber", emoji: "🍂" },
          ],
        },
        reading: {
          title: "My First Year at Secondary School",
          passage:
            "My name is Linh and I am twelve years old. This year I started secondary school in Da Nang, and everything felt new at first.\n\n" +
            "My timetable has eight subjects, and my favourite one is science, which we study in a special room with real equipment. On Monday morning I always check my bag twice, because the teacher who teaches maths never accepts homework a day late. We have to hand in every exercise before the bell rings.\n\n" +
            "At half past nine we have a short break. The canteen is always crowded, so my classmates and I usually eat our banh mi under the big tree behind the library. My best friend Minh is the class monitor, and he looks after the younger students who get lost in the corridors. I get on with almost everyone in my class, which makes school feel like a second home.\n\n" +
            "I have also taken part in the school music club since September. If I finish my homework early, I will go to practice on Friday afternoon.\n\n" +
            "Some days are long and tiring, but I have never wanted to go back to primary school. I am proud of the person I am becoming here.",
          translation:
            "Tớ tên là Linh, năm nay tớ mười hai tuổi. Năm nay tớ vào cấp hai ở Đà Nẵng, và lúc đầu mọi thứ đều lạ lẫm.\n\n" +
            "Thời khoá biểu của tớ có tám môn, và môn tớ thích nhất là khoa học — môn này bọn tớ học ở một phòng riêng có dụng cụ thí nghiệm thật. Sáng thứ Hai nào tớ cũng kiểm tra cặp hai lần, vì thầy dạy Toán không bao giờ nhận bài nộp muộn dù chỉ một ngày. Bọn tớ phải nộp mọi bài tập trước khi chuông reo.\n\n" +
            "Chín rưỡi là giờ ra chơi ngắn. Căng tin lúc nào cũng đông nghịt, nên tớ và các bạn cùng lớp thường ăn bánh mì dưới gốc cây to phía sau thư viện. Bạn thân của tớ là Minh, lớp trưởng, bạn ấy hay để mắt trông chừng mấy em nhỏ bị lạc ngoài hành lang. Tớ chơi hợp với gần như cả lớp, thế nên trường giống như ngôi nhà thứ hai vậy.\n\n" +
            "Từ tháng Chín tớ còn tham gia câu lạc bộ âm nhạc của trường nữa. Nếu làm xong bài tập sớm, chiều thứ Sáu tớ sẽ đi tập.\n\n" +
            "Có những ngày dài và mệt, nhưng chưa bao giờ tớ muốn quay lại trường tiểu học. Tớ tự hào về con người mà tớ đang trở thành ở đây.",
          questions: [
            mcq(
              "Why does Linh check her bag twice on Monday morning?",
              "Vì sao sáng thứ Hai Linh kiểm tra cặp tới hai lần?",
              [
                "Because the maths teacher never accepts late homework.",
                "Because she often forgets her uniform.",
                "Because the canteen is crowded at nine.",
                "Because she is the class monitor this year.",
              ],
              0,
              "Bài viết nói rõ lý do: thầy dạy Toán không bao giờ nhận bài muộn, nên Linh phải kiểm tra cặp cho chắc.",
              "because the teacher who teaches maths never accepts homework a day late",
            ),
            mcq(
              "Where do Linh and her classmates usually eat at break time?",
              "Giờ ra chơi, Linh và các bạn thường ăn ở đâu?",
              [
                "In the canteen",
                "Under a tree behind the library",
                "In the science room",
                "At the music club",
              ],
              1,
              "Vì căng tin quá đông nên cả nhóm ra ăn dưới gốc cây to sau thư viện.",
              "my classmates and I usually eat our banh mi under the big tree behind the library",
            ),
            mcq(
              "What does Minh do as the class monitor?",
              "Minh làm gì với vai trò lớp trưởng?",
              [
                "He teaches the maths lesson.",
                "He looks after younger students who get lost.",
                "He works in the canteen at break.",
                "He collects money for the music club.",
              ],
              1,
              "Câu về Minh nói bạn ấy trông chừng những em nhỏ bị lạc trong hành lang.",
              "he looks after the younger students who get lost in the corridors",
            ),
            mcq(
              "When will Linh go to music practice?",
              "Khi nào Linh sẽ đi tập nhạc?",
              [
                "If she finishes her homework early",
                "Every Monday morning before class",
                "Only when the canteen is closed",
                "After she becomes the class monitor",
              ],
              0,
              "Đây là câu điều kiện loại 1: 'If I finish my homework early, I will go to practice' — điều kiện là làm xong bài tập sớm.",
              "If I finish my homework early, I will go to practice on Friday afternoon",
            ),
            mcq(
              "How does Linh feel about her new school?",
              "Linh cảm thấy thế nào về ngôi trường mới?",
              [
                "She is proud and happy, even when the days are tiring.",
                "She wishes she could go back to primary school.",
                "She thinks all the subjects are too easy.",
                "She is afraid of her classmates.",
              ],
              0,
              "Câu cuối bài cho thấy thái độ của Linh: bạn ấy TỰ HÀO về bản thân ở đây, dù có ngày rất mệt.",
              "I am proud of the person I am becoming here.",
            ),
          ],
        },
        listening: {
          title: "Before the First Lesson",
          transcript:
            "Boy: Hi Linh! You look tired today. Is everything all right?\n" +
            "Girl: I'm fine, Nam. I just stayed up late because I had to finish my history homework.\n" +
            "Boy: Have you handed it in yet?\n" +
            "Girl: Yes, I gave it to the teacher before the first lesson. What about you?\n" +
            "Boy: I finished mine on the bus this morning! By the way, do we need our sports uniform tomorrow?\n" +
            "Girl: Yes, we do. If you forget it, the PE teacher will not let you join the game.\n" +
            "Boy: Thanks for reminding me. Are you going to the library at break?\n" +
            "Girl: I can't. I promised to look after my little brother in the canteen. He has just started here and he doesn't know anyone yet.\n" +
            "Boy: That's kind of you. I'll come with you, and we can help him get on with the other new students.\n" +
            "Girl: That would be lovely. See you at half past nine!",
          questions: [
            mcq(
              "Why is Linh tired today?",
              "Vì sao hôm nay Linh mệt?",
              [
                "She stayed up late doing her history homework.",
                "She got up early to play sport.",
                "She walked a long way to school.",
                "She looked after her brother all night.",
              ],
              0,
              "Linh tự nói: bạn ấy thức khuya để làm xong bài tập môn Lịch sử.",
              "I just stayed up late because I had to finish my history homework",
            ),
            mcq(
              "What will happen if Nam forgets his sports uniform?",
              "Chuyện gì sẽ xảy ra nếu Nam quên đồng phục thể thao?",
              [
                "The PE teacher will not let him join the game.",
                "He will have to stay in the library.",
                "He will get extra homework.",
                "He will eat alone in the canteen.",
              ],
              0,
              "Câu điều kiện loại 1 của Linh: quên đồng phục thì thầy thể dục sẽ không cho vào chơi.",
              "If you forget it, the PE teacher will not let you join the game",
            ),
            tf(
              "Linh is going to the library at break time.",
              "Giờ ra chơi Linh sẽ đi thư viện.",
              false,
              "SAI. Linh nói bạn ấy không đi được vì đã hứa trông em trai ở căng tin.",
              "I can't. I promised to look after my little brother in the canteen.",
            ),
            mcq(
              "How does Nam react to Linh's plan?",
              "Nam phản ứng thế nào với kế hoạch của Linh?",
              [
                "He thinks it is kind and offers to come too.",
                "He is annoyed because he wanted to study.",
                "He thinks she should go to the library instead.",
                "He says her brother is too noisy.",
              ],
              0,
              "Nam khen 'That's kind of you' rồi xin đi cùng — thái độ ủng hộ và ấm áp.",
              "That's kind of you. I'll come with you",
            ),
          ],
        },
        writingPrompt:
          "Viết một đoạn 60–80 từ bằng tiếng Anh kể về một ngày học bình thường của em. Bắt buộc dùng ít nhất MỘT mệnh đề quan hệ (who / which / that) và MỘT câu điều kiện loại 1 (If I ..., I will ...).",
        writingOutline:
          "1. Mở bài: em học lớp mấy, trường ở đâu, em đến trường lúc mấy giờ.\n" +
          "2. Môn học em thích nhất và vì sao — dùng mệnh đề quan hệ: 'science, which we study in a special room'.\n" +
          "3. Giờ ra chơi em làm gì, đi với ai (hand in homework, canteen, library, get on with).\n" +
          "4. Kết bài: kế hoạch cho hôm nay bằng câu điều kiện loại 1 — 'If I finish my homework early, I will ...'.",
        speaking: {
          sentences: [
            "My timetable has eight subjects this year.",
            "I always hand in my homework before the bell rings.",
            "The canteen is very crowded at break time.",
            "I get on with almost everyone in my class.",
            "If I finish my homework early, I will go to the music club.",
          ],
          questions: [
            {
              question: "What is your favourite subject, and why do you like it?",
              sampleAnswer:
                "My favourite subject is science, which we study in a special room. I like it because we do experiments instead of only reading the book.",
            },
            {
              question: "What do you usually do during the break at school?",
              sampleAnswer:
                "I usually eat with my classmates under a big tree behind the library. We talk about football and share our snacks.",
            },
            {
              question: "What will you do this evening if you finish your homework early?",
              sampleAnswer:
                "If I finish my homework early, I will practise the guitar and then watch a short film with my sister.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 2 ───────────────────────────
      {
        topic: "Studying Online",
        topicVi: "Học trực tuyến",
        icon: "💻",
        words: [
          word("screen", "/skriːn/", "màn hình", "🖥️"),
          word("keyboard", "/ˈkiːbɔːd/", "bàn phím", "⌨️"),
          word("headphones", "/ˈhedfəʊnz/", "tai nghe", "🎧"),
          word("connection", "/kəˈnekʃn/", "kết nối mạng", "📶"),
          word("microphone", "/ˈmaɪkrəfəʊn/", "micro", "🎙️"),
          word("mute", "/mjuːt/", "tắt tiếng micro", "🔇"),
          word("slide", "/slaɪd/", "trang trình chiếu", "📊"),
          word("quiz", "/kwɪz/", "bài kiểm tra nhanh", "❓"),
          word("notes", "/nəʊts/", "ghi chú, vở nháp", "🗒️"),
          word("concentrate", "/ˈkɒnsntreɪt/", "tập trung", "🧠"),
          word("silent", "/ˈsaɪlənt/", "im lặng", "🤫"),
          word("useful", "/ˈjuːsfl/", "hữu ích", "👍"),
          word("log in", "/ˌlɒɡ ˈɪn/", "đăng nhập", "🔑"),
          word("turn on", "/ˌtɜːn ˈɒn/", "bật lên", "🔛"),
          word("find out", "/ˌfaɪnd ˈaʊt/", "tìm ra, nhận ra điều gì", "🔍"),
        ],
        sound: {
          letters: "ə",
          sound: "/ə/",
          hint:
            "Âm /ə/ (schwa) là âm PHỔ BIẾN NHẤT tiếng Anh, nhưng tiếng Việt không có nó. " +
            "Trẻ Việt hay đọc mọi nguyên âm thật rõ và thật to — 'com-pu-ter' thành 'com-pu-tơ' " +
            "ba tiếng đều nhau. Thực tế, âm tiết KHÔNG được nhấn sẽ bị nuốt gọn thành /ə/: " +
            "mờ, ngắn, lười. Mẹo: đọc âm nhấn thật rõ, rồi thả lỏng miệng cho các âm còn lại " +
            "trôi đi. Nói nhẹ đúng chỗ nghe 'Tây' hơn nhiều so với nói to mọi chỗ.",
          words: [
            { word: "computer", meaning: "máy tính — com-PU-ter, cả 'com' lẫn 'ter' đều đọc nhẹ thành /ə/", emoji: "💻" },
            { word: "connection", meaning: "kết nối — con-NEC-tion, 'con' đọc lướt /kə/", emoji: "📶" },
            { word: "about", meaning: "về, khoảng — a-BOUT, chữ 'a' chỉ là /ə/ rất nhẹ", emoji: "💬" },
            { word: "teacher", meaning: "giáo viên — TEA-cher, đuôi đọc /tʃə/ chứ không phải 'chơ' rõ tiếng", emoji: "👩‍🏫" },
            { word: "problem", meaning: "vấn đề — PRO-blem, âm cuối lướt thành /bləm/", emoji: "🤔" },
          ],
        },
        reading: {
          title: "My Online Classroom",
          passage:
            "Last year, when a big storm closed our school for a week, my class had all our lessons online. I still remember the first morning very clearly.\n\n" +
            "At seven o'clock I turned on my laptop, logged in with the password which my teacher had sent us, and put on my headphones. Half of my classmates forgot to mute their microphones, so we could hear dogs, motorbikes and one boy's little sister singing. Our teacher, who is very patient, only laughed and asked us to be silent for a moment.\n\n" +
            "Studying online is not always easy. My internet connection stopped twice, and I had to read the slides again later. It is also hard to concentrate when your phone is on the same desk as your keyboard. I found out that I remember much more if I write notes by hand instead of typing them.\n\n" +
            "There were good things too. We could see the screen clearly, our teacher recorded every lesson, and the short quiz at the end told us straight away what we still had to study.\n\n" +
            "If schools ever close again, I will not be worried. Online lessons are useful, but I would still rather sit next to my friends.",
          translation:
            "Năm ngoái, khi một cơn bão lớn khiến trường tớ đóng cửa cả tuần, lớp tớ học trực tuyến toàn bộ. Đến giờ tớ vẫn nhớ như in buổi sáng đầu tiên.\n\n" +
            "Bảy giờ, tớ bật máy tính, đăng nhập bằng mật khẩu cô gửi, rồi đeo tai nghe vào. Một nửa lớp quên tắt micro, thế là cả lớp nghe thấy tiếng chó sủa, tiếng xe máy và tiếng em gái của một bạn đang hát. Cô giáo tớ rất kiên nhẫn, cô chỉ cười rồi bảo cả lớp im lặng một chút.\n\n" +
            "Học trực tuyến không phải lúc nào cũng dễ. Mạng nhà tớ rớt hai lần, tớ phải đọc lại slide sau đó. Tập trung cũng khó khi cái điện thoại nằm ngay cạnh bàn phím. Tớ nhận ra rằng mình nhớ bài nhiều hơn hẳn nếu chép tay thay vì gõ máy.\n\n" +
            "Cũng có những điều hay. Bọn tớ nhìn màn hình rõ, cô ghi hình lại từng buổi, và bài kiểm tra nhanh cuối giờ cho biết ngay mình còn hổng chỗ nào.\n\n" +
            "Nếu trường lại phải đóng cửa, tớ sẽ không lo nữa. Học trực tuyến rất hữu ích, nhưng tớ vẫn thích được ngồi cạnh bạn bè hơn.",
          questions: [
            mcq(
              "Why did the writer's class study online last year?",
              "Vì sao năm ngoái lớp của bạn ấy phải học trực tuyến?",
              [
                "A storm closed the school for a week.",
                "The classroom was being painted.",
                "The teacher was living in another city.",
                "The students asked for online lessons.",
              ],
              0,
              "Câu đầu bài nêu nguyên nhân: một cơn bão lớn làm trường đóng cửa một tuần.",
              "when a big storm closed our school for a week",
            ),
            mcq(
              "What could everyone hear in the first online lesson?",
              "Trong buổi học trực tuyến đầu tiên, cả lớp nghe thấy gì?",
              [
                "The teacher shouting at the class",
                "Dogs, motorbikes and a little sister singing",
                "Music from the school band",
                "Nothing at all, because everyone was muted",
              ],
              1,
              "Vì một nửa lớp quên tắt micro nên tiếng chó, tiếng xe máy và tiếng em gái hát lọt vào hết.",
              "we could hear dogs, motorbikes and one boy's little sister singing",
            ),
            mcq(
              "What did the writer discover about taking notes?",
              "Bạn ấy phát hiện ra điều gì về việc ghi chép?",
              [
                "Typing notes is faster and better.",
                "Notes are not necessary in online lessons.",
                "She remembers more when she writes by hand.",
                "The teacher's slides are enough on their own.",
              ],
              2,
              "Bạn ấy nói rõ mình nhớ nhiều hơn khi chép tay thay vì gõ máy.",
              "I remember much more if I write notes by hand instead of typing them",
            ),
            mcq(
              "Why was the quiz at the end of the lesson helpful?",
              "Vì sao bài kiểm tra nhanh cuối giờ lại có ích?",
              [
                "It gave the class extra marks.",
                "It showed them immediately what they still had to study.",
                "It replaced all their homework.",
                "It was easier than the lesson.",
              ],
              1,
              "Bài viết nói bài quiz cho biết NGAY LẬP TỨC phần nào các bạn còn phải học thêm.",
              "the short quiz at the end told us straight away what we still had to study",
            ),
            mcq(
              "How does the writer feel about online lessons now?",
              "Bây giờ bạn ấy cảm thấy thế nào về việc học trực tuyến?",
              [
                "She hates them and never wants to try again.",
                "She thinks they are useless without a teacher.",
                "She finds them useful but still prefers being with friends.",
                "She thinks they are better than normal lessons.",
              ],
              2,
              "Câu cuối thể hiện thái độ cân bằng: học online HỮU ÍCH, nhưng bạn ấy VẪN THÍCH ngồi cạnh bạn bè hơn.",
              "Online lessons are useful, but I would still rather sit next to my friends",
            ),
          ],
        },
        listening: {
          title: "The Science Club Meeting",
          transcript:
            "Girl: Hello? Can you hear me, Duc? Your microphone is still muted.\n" +
            "Boy: Sorry! I've just turned it on. Is that better?\n" +
            "Girl: Much better. Have you logged in to the science club page yet?\n" +
            "Boy: Not yet. I've forgotten the password again.\n" +
            "Girl: It's the same as last week. Miss Ha put it on the last slide.\n" +
            "Boy: Found it, thanks. Why is my screen frozen?\n" +
            "Girl: Your connection is probably slow. Try switching your camera off.\n" +
            "Boy: That worked. So, what do we have to do before Friday?\n" +
            "Girl: We have to find out three facts about the moon and write them in our notes.\n" +
            "Boy: That sounds fun. If we finish early, shall we make a quiz for the others?\n" +
            "Girl: Great idea! I'll share my slides with you tonight.",
          questions: [
            mcq(
              "What is the problem at the beginning of the conversation?",
              "Vấn đề ở đầu cuộc trò chuyện là gì?",
              [
                "Duc's microphone is muted.",
                "The girl cannot find the website.",
                "The lesson has already finished.",
                "Duc has lost his headphones.",
              ],
              0,
              "Câu đầu tiên bạn nữ nói: micro của Đức vẫn đang bị tắt tiếng.",
              "Your microphone is still muted",
            ),
            mcq(
              "Where can Duc find the password?",
              "Đức có thể tìm mật khẩu ở đâu?",
              [
                "In an email from the school",
                "On the last slide from Miss Ha",
                "On the back of his notebook",
                "He has to ask the teacher again.",
              ],
              1,
              "Bạn nữ nhắc: cô Hà đã để mật khẩu ở slide cuối cùng.",
              "Miss Ha put it on the last slide",
            ),
            tf(
              "Duc solved his frozen screen by switching his camera off.",
              "Đức xử lý được màn hình đơ bằng cách tắt camera.",
              true,
              "ĐÚNG. Bạn nữ khuyên tắt camera, và ngay sau đó Đức nói 'That worked' (cách đó hiệu quả).",
              "Try switching your camera off.",
            ),
            mcq(
              "How does Duc feel about the homework?",
              "Đức thấy bài tập lần này thế nào?",
              [
                "He thinks it sounds fun.",
                "He thinks it is far too difficult.",
                "He is bored by it.",
                "He does not want to do it at all.",
              ],
              0,
              "Đức nói 'That sounds fun' và còn đề nghị làm thêm một bài quiz cho các bạn khác — rõ ràng là hào hứng.",
              "That sounds fun.",
            ),
          ],
        },
        writingPrompt:
          "Viết 60–80 từ bằng tiếng Anh so sánh học ở lớp và học trực tuyến. Bắt buộc dùng ít nhất MỘT câu hiện tại hoàn thành (I have learnt / I have never ...) và MỘT câu điều kiện loại 1.",
        writingOutline:
          "1. Mở bài: em đã từng học trực tuyến chưa, vào lúc nào (dùng 'I have studied online ...').\n" +
          "2. Điều KHÓ khi học online: connection, concentrate, phone bên cạnh keyboard.\n" +
          "3. Điều TỐT khi học online: slides, quiz, xem lại bài ghi hình.\n" +
          "4. Kết bài: em thích kiểu học nào hơn, dùng câu điều kiện loại 1 — 'If my school closes again, I will ...'.",
        speaking: {
          sentences: [
            "I turned on my laptop and logged in at seven o'clock.",
            "Please remember to mute your microphone.",
            "My internet connection stopped twice yesterday.",
            "I write my notes by hand because I remember more.",
            "If the school closes again, I will study online.",
          ],
          questions: [
            {
              question: "Do you prefer studying online or in a classroom? Why?",
              sampleAnswer:
                "I prefer the classroom, because I can ask my teacher immediately and I sit next to my friends. Online lessons are useful, but I lose concentration quickly.",
            },
            {
              question: "What do you do when your internet connection is slow?",
              sampleAnswer:
                "I switch my camera off and read the slides again later. If the connection stops completely, I send a message to my classmate.",
            },
            {
              question: "What is the most useful thing you have learnt from an online lesson?",
              sampleAnswer:
                "I have learnt to make my own notes with small pictures, which helps me remember new words much better.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 3 ───────────────────────────
      {
        topic: "Exams and Stress",
        topicVi: "Kỳ thi và áp lực",
        icon: "📝",
        words: [
          word("exam", "/ɪɡˈzæm/", "kỳ thi", "📝"),
          word("revise", "/rɪˈvaɪz/", "ôn tập lại bài", "📖"),
          word("result", "/rɪˈzʌlt/", "kết quả", "📊"),
          word("mark", "/mɑːk/", "điểm số", "💯"),
          word("mistake", "/mɪˈsteɪk/", "lỗi sai", "❌"),
          word("improve", "/ɪmˈpruːv/", "tiến bộ hơn", "📈"),
          word("nervous", "/ˈnɜːvəs/", "hồi hộp, lo lắng", "😰"),
          word("calm", "/kɑːm/", "bình tĩnh", "😌"),
          word("worry", "/ˈwʌri/", "lo lắng", "😟"),
          word("advice", "/ədˈvaɪs/", "lời khuyên", "💡"),
          word("rest", "/rest/", "nghỉ ngơi", "😴"),
          word("proud", "/praʊd/", "tự hào", "🥰"),
          word("deep breath", "/ˌdiːp ˈbreθ/", "hơi thở sâu", "🫁"),
          word("give up", "/ˌɡɪv ˈʌp/", "bỏ cuộc", "🙅"),
          word("cheer up", "/ˌtʃɪər ˈʌp/", "làm ai đó vui lên", "😄"),
        ],
        sound: {
          letters: "sentence stress",
          sound: "/ˈ/",
          hint:
            "Không chỉ TỪ mới có trọng âm — cả CÂU cũng vậy. Tiếng Anh nhấn mạnh các từ mang " +
            "NỘI DUNG (danh từ, động từ chính, tính từ, trạng từ) và đọc lướt các từ chức năng " +
            "(a, the, of, to, is, are). Trẻ Việt thường đọc mọi từ to như nhau nên câu nghe " +
            "giật cục như đọc danh sách. Thử vỗ tay ở đúng các từ in hoa: " +
            "'I TOOK a deep BREATH at the DOOR.' Khi nhịp đúng, người nghe hiểu ngay ý chính.",
          words: [
            { word: "I am NERVOUS about the EXAM.", meaning: "Tớ hồi hộp về kỳ thi — nhấn NERVOUS và EXAM, các từ còn lại đọc lướt", emoji: "😰" },
            { word: "Take a DEEP BREATH and stay CALM.", meaning: "Hít sâu và bình tĩnh — nhấn DEEP, BREATH, CALM", emoji: "🫁" },
            { word: "My MARKS have imPROVED a lot.", meaning: "Điểm của tớ tiến bộ nhiều — nhấn MARKS và PROVED", emoji: "📈" },
            { word: "Don't GIVE UP!", meaning: "Đừng bỏ cuộc! — cụm động từ được nhấn cả hai tiếng", emoji: "🙅" },
            { word: "I'm PROUD of YOU.", meaning: "Bố mẹ tự hào về con — nhấn PROUD và YOU", emoji: "🥰" },
          ],
        },
        reading: {
          title: "The Week Before the Exam",
          passage:
            "Last June I had my first big English exam, and I was more nervous than I had ever been. Now I want to share three things which really helped me.\n\n" +
            "First, do not leave everything until the last night. I made a simple revision timetable and revised one subject each evening. Ten quiet minutes every day are better than five hours on Sunday night.\n\n" +
            "Second, look at your mistakes instead of hiding them. My teacher told me to keep a small notebook for every mistake I made in practice tests. Before the exam I read that notebook twice, and I did not repeat the same errors. My marks improved by more than one point.\n\n" +
            "Third, look after your body. If you sleep badly, you will forget even the words which you know well. On the morning of the exam I ate a proper breakfast, walked slowly to school and took a deep breath at the door.\n\n" +
            "My results were not perfect, but I have never worked so hard in my life. Some of my friends gave up in the first week. Whatever happens, do not panic and do not give up. Your parents will be proud of you if you try your best.",
          translation:
            "Tháng Sáu năm ngoái tớ có kỳ thi tiếng Anh lớn đầu tiên, và tớ hồi hộp hơn bao giờ hết. Giờ tớ muốn chia sẻ ba điều đã thực sự giúp tớ.\n\n" +
            "Thứ nhất, đừng để dồn hết đến tối cuối cùng. Tớ lập một thời khoá biểu ôn tập đơn giản và mỗi tối ôn một môn. Mười phút yên tĩnh mỗi ngày còn hơn năm tiếng cày cuốc tối Chủ nhật.\n\n" +
            "Thứ hai, hãy nhìn thẳng vào lỗi sai thay vì giấu đi. Cô giáo bảo tớ giữ một cuốn sổ nhỏ ghi lại mọi lỗi tớ mắc trong các bài luyện. Trước hôm thi tớ đọc cuốn sổ đó hai lượt, và tớ không lặp lại những lỗi cũ nữa. Điểm của tớ tăng hơn một điểm.\n\n" +
            "Thứ ba, hãy chăm sóc cơ thể mình. Nếu ngủ không ngon, bé sẽ quên cả những từ mình vốn thuộc làu. Sáng hôm thi tớ ăn sáng tử tế, đi bộ thong thả đến trường và hít một hơi thật sâu trước cửa phòng thi.\n\n" +
            "Kết quả của tớ không hoàn hảo, nhưng chưa bao giờ tớ chăm chỉ đến thế. Vài người bạn của tớ đã bỏ cuộc ngay tuần đầu. Dù thế nào đi nữa, đừng hoảng và đừng bỏ cuộc. Bố mẹ sẽ tự hào về bé nếu bé đã cố hết sức.",
          questions: [
            mcq(
              "What does the writer say about revision?",
              "Bạn ấy nói gì về việc ôn tập?",
              [
                "It is better to revise a little every day.",
                "Sunday night is the best time to revise.",
                "Revision is only useful for maths.",
                "You should revise all subjects at the same time.",
              ],
              0,
              "Bài viết so sánh trực tiếp: mười phút yên tĩnh mỗi ngày tốt hơn năm tiếng dồn vào tối Chủ nhật.",
              "Ten quiet minutes every day are better than five hours on Sunday night.",
            ),
            mcq(
              "Why did the writer keep a small notebook?",
              "Vì sao bạn ấy giữ một cuốn sổ nhỏ?",
              [
                "To write down new songs",
                "To record every mistake from practice tests",
                "To draw pictures during the lesson",
                "To copy the teacher's answers",
              ],
              1,
              "Cô giáo bảo bạn ấy ghi lại MỌI LỖI SAI trong các bài luyện tập vào cuốn sổ đó.",
              "keep a small notebook for every mistake I made in practice tests",
            ),
            mcq(
              "What happened to the writer's marks?",
              "Điểm của bạn ấy thay đổi thế nào?",
              [
                "They stayed exactly the same.",
                "They went down a little.",
                "They went up by more than one point.",
                "The teacher did not give any marks.",
              ],
              2,
              "Bài viết nói rõ điểm đã tăng hơn một điểm sau khi bạn ấy đọc lại sổ lỗi sai.",
              "My marks improved by more than one point.",
            ),
            mcq(
              "According to the writer, what will happen if you sleep badly?",
              "Theo bạn ấy, chuyện gì xảy ra nếu ngủ không ngon?",
              [
                "You will feel calm in the exam.",
                "You will forget words that you already know.",
                "You will arrive late at school.",
                "You will make fewer mistakes.",
              ],
              1,
              "Đây là câu điều kiện loại 1: ngủ không ngon thì sẽ quên cả những từ vốn đã thuộc.",
              "If you sleep badly, you will forget even the words which you know well",
            ),
            mcq(
              "How does the writer feel about the way she prepared?",
              "Bạn ấy cảm thấy thế nào về cách mình đã chuẩn bị?",
              [
                "She is satisfied, although her results were not perfect.",
                "She thinks she wasted a lot of time.",
                "She is angry with her English teacher.",
                "She wishes she had revised much less.",
              ],
              0,
              "Thái độ nằm ở câu 'kết quả không hoàn hảo NHƯNG chưa bao giờ tớ chăm chỉ đến thế' — bạn ấy hài lòng với nỗ lực của mình.",
              "My results were not perfect, but I have never worked so hard in my life.",
            ),
          ],
        },
        listening: {
          title: "Mum's Advice",
          transcript:
            "Mum: You've been in your room all evening, Trang. Are you all right?\n" +
            "Girl: I'm a bit nervous, Mum. My English exam is on Thursday and I still can't remember the past tenses.\n" +
            "Mum: Can I give you some advice?\n" +
            "Girl: Yes, please.\n" +
            "Mum: Close the book for twenty minutes and come and help me cook. Your brain needs a rest.\n" +
            "Girl: But if I stop now, I will forget everything.\n" +
            "Mum: No, you won't. A tired brain learns nothing. After dinner you can revise one more page, and then you should sleep.\n" +
            "Girl: All right. Thanks, Mum.\n" +
            "Mum: And don't worry about the marks. Dad and I will be proud of you whatever happens.\n" +
            "Girl: That really cheers me up. I feel calmer already.",
          questions: [
            mcq(
              "Why is Trang nervous?",
              "Vì sao Trang lo lắng?",
              [
                "She has an English exam on Thursday.",
                "She has lost her English book.",
                "She has to cook dinner alone.",
                "She got a bad mark in maths.",
              ],
              0,
              "Trang tự nói: thứ Năm bạn ấy thi tiếng Anh mà vẫn chưa nhớ được các thì quá khứ.",
              "My English exam is on Thursday",
            ),
            mcq(
              "What does Mum suggest?",
              "Mẹ gợi ý điều gì?",
              [
                "Studying for two more hours",
                "Taking a short break and helping in the kitchen",
                "Asking the teacher for extra homework",
                "Going to bed immediately",
              ],
              1,
              "Mẹ bảo gấp sách lại hai mươi phút và xuống phụ nấu ăn, vì đầu óc cần nghỉ.",
              "Close the book for twenty minutes and come and help me cook.",
            ),
            tf(
              "Mum says Trang should sleep after revising one more page.",
              "Mẹ nói Trang nên đi ngủ sau khi ôn thêm một trang.",
              true,
              "ĐÚNG. Mẹ nói sau bữa tối Trang có thể ôn thêm một trang, rồi nên đi ngủ.",
              "After dinner you can revise one more page, and then you should sleep.",
            ),
            mcq(
              "How does Trang feel at the end of the conversation?",
              "Cuối cuộc trò chuyện, Trang cảm thấy thế nào?",
              [
                "Angry with her mother",
                "More worried than before",
                "Happier and calmer",
                "Too tired to speak",
              ],
              2,
              "Trang nói lời mẹ làm bạn ấy vui hơn và bạn ấy đã thấy bình tĩnh hơn.",
              "That really cheers me up. I feel calmer already.",
            ),
          ],
        },
        writingPrompt:
          "Một bạn lớp dưới sắp thi và đang rất lo. Viết 60–80 từ bằng tiếng Anh khuyên bạn ấy. Bắt buộc dùng ít nhất MỘT câu điều kiện loại 1 và MỘT mệnh đề quan hệ (who / which / that).",
        writingOutline:
          "1. Mở đầu ấm áp: 'Don't worry. Everybody feels nervous before an exam.'\n" +
          "2. Lời khuyên 1 về ôn tập: revise a little every day, make a timetable.\n" +
          "3. Lời khuyên 2 về lỗi sai: keep a notebook which shows your mistakes.\n" +
          "4. Lời khuyên 3 về sức khoẻ + câu điều kiện loại 1: 'If you sleep well, you will remember more.'\n" +
          "5. Kết: 'Don't give up. Your parents will be proud of you.'",
        speaking: {
          sentences: [
            "I was very nervous before my first English exam.",
            "I revise one subject every evening.",
            "I keep a small notebook for my mistakes.",
            "Take a deep breath and stay calm.",
            "If you sleep badly, you will forget everything.",
          ],
          questions: [
            {
              question: "How do you prepare for an important exam?",
              sampleAnswer:
                "I make a simple revision timetable and study one subject each evening. I also read my notebook of mistakes twice before the exam.",
            },
            {
              question: "What do you do when you feel nervous?",
              sampleAnswer:
                "I take a deep breath, drink some water and talk to my mother. She always cheers me up in a few minutes.",
            },
            {
              question: "What advice would you give a younger student before an exam?",
              sampleAnswer:
                "I would tell them not to give up and to sleep well. Marks are important, but your health is more important.",
            },
          ],
        },
      },
    ],
  },
];
