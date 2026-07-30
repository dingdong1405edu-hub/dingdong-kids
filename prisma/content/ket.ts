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
          letters: "Trọng âm của TỪ",
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
            "At seven o'clock I turned on my laptop, logged in with the password which my teacher sent us, and put on my headphones. Half of my classmates forgot to mute their microphones, so we could hear dogs, motorbikes and one boy's little sister singing. Our teacher, who is very patient, only laughed and asked us to be silent for a moment.\n\n" +
            "Studying online is not always easy. My internet connection stopped twice, and I had to read the slides again later. It is also hard to concentrate when your phone is on the same desk as your keyboard. I found out that I remember much more if I write notes by hand instead of typing them.\n\n" +
            "There were good things too. We could see the screen clearly, our teacher recorded every lesson, and the short quiz at the end told us straight away what we still had to study.\n\n" +
            "If schools ever close again, I will not worry. Online lessons are useful, but I would still rather sit next to my friends.",
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
          letters: "Trọng âm của CÂU",
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
            "First, do not leave everything until the last night. I made a simple revision timetable and revised one subject each evening. Ten quiet minutes every day is better than five hours on Sunday night.\n\n" +
            "Second, look at your mistakes instead of hiding them. My teacher told me to keep a small notebook for every mistake I made in practice tests. Before the exam I read that notebook twice, and I did not repeat the same errors. My marks improved by more than one point.\n\n" +
            "Third, look after your body. If you sleep badly, you will forget even the words which you know well. On the morning of the exam I ate a proper breakfast, walked slowly to school and took a deep breath at the door.\n\n" +
            "My results were not perfect, but I have never worked so hard in my life. Some of my friends gave up in the first week. Whatever happens, do not panic and do not give up. Your parents will be proud of you if you try your best.",
          translation:
            "Tháng Sáu năm ngoái tớ có kỳ thi tiếng Anh lớn đầu tiên, và tớ hồi hộp hơn bao giờ hết. Giờ tớ muốn chia sẻ ba điều đã thực sự giúp tớ.\n\n" +
            "Thứ nhất, đừng để dồn hết đến tối cuối cùng. Tớ lập một thời khoá biểu ôn tập đơn giản và mỗi tối ôn một môn. Mười phút yên tĩnh mỗi ngày còn hơn năm tiếng cày cuốc tối Chủ nhật.\n\n" +
            "Thứ hai, hãy nhìn thẳng vào lỗi sai thay vì giấu đi. Cô giáo bảo tớ giữ một cuốn sổ nhỏ ghi lại mọi lỗi tớ mắc trong các bài luyện. Trước hôm thi tớ đọc cuốn sổ đó hai lượt, và tớ không lặp lại những lỗi cũ nữa. Điểm của tớ tăng hơn một điểm.\n\n" +
            "Thứ ba, hãy chăm sóc cơ thể mình. Nếu ngủ không ngon, bạn sẽ quên cả những từ mình vốn thuộc làu. Sáng hôm thi tớ ăn sáng tử tế, đi bộ thong thả đến trường và hít một hơi thật sâu trước cửa phòng thi.\n\n" +
            "Kết quả của tớ không hoàn hảo, nhưng chưa bao giờ tớ chăm chỉ đến thế. Vài người bạn của tớ đã bỏ cuộc ngay tuần đầu. Dù thế nào đi nữa, đừng hoảng và đừng bỏ cuộc. Bố mẹ sẽ tự hào về bạn nếu bạn đã cố hết sức.",
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
              "Ten quiet minutes every day is better than five hours on Sunday night.",
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

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 2 · Sở thích và bạn bè",
    subtitle: "Thời gian rảnh, mạng xã hội, âm nhạc và phim ảnh.",
    lessons: [
      // ─────────────────────────── Bài 4 ───────────────────────────
      {
        topic: "Free Time",
        topicVi: "Thời gian rảnh",
        icon: "🛹",
        words: [
          word("hobby", "/ˈhɒbi/", "sở thích", "🎨"),
          word("badminton", "/ˈbædmɪntən/", "cầu lông", "🏸"),
          word("skateboard", "/ˈskeɪtbɔːd/", "ván trượt", "🛹"),
          word("chess", "/tʃes/", "cờ vua", "♟️"),
          word("comic", "/ˈkɒmɪk/", "truyện tranh", "📔"),
          word("collect", "/kəˈlekt/", "sưu tầm", "🗂️"),
          word("weekend", "/ˌwiːkˈend/", "cuối tuần", "📆"),
          word("park", "/pɑːk/", "công viên", "🌳"),
          word("team", "/tiːm/", "đội, nhóm chơi thể thao", "👟"),
          word("bored", "/bɔːd/", "chán", "😑"),
          word("relax", "/rɪˈlæks/", "thư giãn", "🛋️"),
          word("once a week", "/ˌwʌns ə ˈwiːk/", "mỗi tuần một lần", "🗓️"),
          word("join in", "/ˌdʒɔɪn ˈɪn/", "tham gia cùng mọi người", "🤗"),
          word("hang out", "/ˌhæŋ ˈaʊt/", "đi chơi tụ tập với bạn", "🧋"),
          word("take up", "/ˌteɪk ˈʌp/", "bắt đầu chơi một môn, một sở thích", "🎬"),
        ],
        sound: {
          letters: "Nối âm",
          sound: "/‿/",
          hint:
            "Tiếng Việt viết rời từng tiếng và nói cũng tách rời từng tiếng, nên trẻ Việt hay " +
            "đọc tiếng Anh thành 'hang. out.' — nghe rất giật. Người bản xứ NỐI ÂM: phụ âm cuối " +
            "của từ trước chạy sang nguyên âm đầu của từ sau. 'hang out' nghe thành 'ha-NGAOUT', " +
            "'take up' thành 'tay-KUP'. Muốn nói trôi chảy, hãy nghĩ theo CỤM chứ đừng nghĩ theo " +
            "từng từ. Đây cũng là lý do bạn nghe người bản xứ nói thấy 'dính hết vào nhau'.",
          words: [
            { word: "hang out", meaning: "đi chơi với bạn — nối thành 'ha-NGAOUT', đừng ngắt ở giữa", emoji: "🧋" },
            { word: "join in", meaning: "tham gia cùng — nối thành 'joi-NIN'", emoji: "🤗" },
            { word: "take up", meaning: "bắt đầu một sở thích — nối thành 'tay-KUP'", emoji: "🎬" },
            { word: "an apple", meaning: "một quả táo — nối thành 'a-NAP-ple'", emoji: "🍎" },
            { word: "far away", meaning: "ở xa — /r/ chạy sang: 'fa-RA-way'", emoji: "🚗" },
          ],
        },
        reading: {
          title: "What We Do After School",
          passage:
            "In Viet Nam most students finish school at half past four, so we do not have a lot of free time. Still, everyone in my class has a hobby which they love.\n\n" +
            "Trung is the sportiest boy I know. He plays badminton with his father twice a week, and he has just taken up chess as well. He says the two games are similar because both of them need a clear plan.\n\n" +
            "Hoa collects postcards from every city that her family visits. She keeps them in a big blue box, and she has already collected ninety-two.\n\n" +
            "I am the lazy one. On Saturday morning I read comics on my bed, and in the afternoon I hang out with my cousins near the park. We do not spend much money; we just talk, share a bubble tea and laugh.\n\n" +
            "Last month our teacher started an after-school skateboard club. Some of us were shy at first, but she asked us to join in for ten minutes only, and now half the class goes every Friday.\n\n" +
            "I am never bored at the weekend. If you have a hobby which makes you smile, you always have somewhere to go.",
          translation:
            "Ở Việt Nam, phần lớn học sinh tan học lúc bốn rưỡi, nên bọn tớ không có nhiều thời gian rảnh. Dù vậy, ai trong lớp tớ cũng có một sở thích mà mình mê.\n\n" +
            "Trung là cậu bạn mê thể thao nhất mà tớ biết. Bạn ấy chơi cầu lông với bố tuần hai lần, và mới đây còn tập thêm cờ vua. Trung bảo hai môn ấy giống nhau, vì cả hai đều cần một kế hoạch rõ ràng.\n\n" +
            "Hoa sưu tầm bưu thiếp ở mọi thành phố mà gia đình bạn ấy đi qua. Bạn ấy cất trong một chiếc hộp xanh to, và đã sưu tầm được chín mươi hai tấm rồi.\n\n" +
            "Tớ thì lười nhất. Sáng thứ Bảy tớ nằm trên giường đọc truyện tranh, còn buổi chiều tớ đi chơi với mấy anh chị em họ gần công viên. Bọn tớ chẳng tiêu mấy tiền; chỉ ngồi nói chuyện, chia nhau cốc trà sữa và cười.\n\n" +
            "Tháng trước cô giáo mở câu lạc bộ trượt ván sau giờ học. Ban đầu vài đứa bọn tớ ngại, nhưng cô chỉ bảo thử tham gia mười phút thôi, thế mà giờ nửa lớp đi đều mỗi thứ Sáu.\n\n" +
            "Tớ chẳng bao giờ thấy chán vào cuối tuần. Nếu bạn có một sở thích khiến bạn mỉm cười, bạn sẽ luôn có chỗ để đi.",
          questions: [
            mcq(
              "How often does Trung play badminton?",
              "Trung chơi cầu lông bao lâu một lần?",
              [
                "Every day after school",
                "Twice a week with his father",
                "Only at the weekend with his class",
                "Once a month at the park",
              ],
              1,
              "Bài đọc nói Trung chơi cầu lông với bố hai lần một tuần.",
              "He plays badminton with his father twice a week",
            ),
            mcq(
              "What does Hoa collect?",
              "Hoa sưu tầm thứ gì?",
              [
                "Comics from her friends",
                "Blue boxes of every size",
                "Postcards from cities her family visits",
                "Photographs of badminton players",
              ],
              2,
              "Câu về Hoa nói bạn ấy sưu tầm bưu thiếp từ mọi thành phố mà gia đình đi qua.",
              "Hoa collects postcards from every city that her family visits.",
            ),
            mcq(
              "What does the writer do on Saturday afternoons?",
              "Chiều thứ Bảy bạn ấy làm gì?",
              [
                "She meets her cousins near the park.",
                "She plays chess with Trung.",
                "She stays in bed reading comics.",
                "She trains with the skateboard club.",
              ],
              0,
              "Buổi SÁNG bạn ấy đọc truyện tranh, còn buổi CHIỀU thì đi chơi với anh chị em họ gần công viên.",
              "in the afternoon I hang out with my cousins near the park",
            ),
            mcq(
              "How did the teacher persuade the shy students to try skateboarding?",
              "Cô giáo đã thuyết phục những bạn ngại ngùng thử trượt ván bằng cách nào?",
              [
                "She gave them extra marks.",
                "She asked them to join in for only ten minutes.",
                "She told their parents about the club.",
                "She bought a skateboard for everybody.",
              ],
              1,
              "Cô chỉ đề nghị các bạn tham gia mười phút thôi — một bước rất nhỏ, nên ai cũng dám thử.",
              "she asked us to join in for ten minutes only",
            ),
            mcq(
              "What is the writer's main message at the end?",
              "Thông điệp chính của bạn ấy ở cuối bài là gì?",
              [
                "A hobby that you enjoy always gives you something to do.",
                "Students in Viet Nam should study less.",
                "Sport is the only hobby that is really useful.",
                "You need to spend money to have fun.",
              ],
              0,
              "Câu cuối tóm gọn thái độ của bạn ấy: có sở thích khiến mình mỉm cười thì luôn có chỗ để đi, không bao giờ chán.",
              "If you have a hobby which makes you smile, you always have somewhere to go.",
            ),
          ],
        },
        listening: {
          title: "Plans for Sunday",
          transcript:
            "Boy: Are you free on Sunday, Mai?\n" +
            "Girl: I think so. What's the plan?\n" +
            "Boy: My cousin has bought a new skateboard and he's going to teach us in the park.\n" +
            "Girl: I've never tried skateboarding. I'll probably fall over a hundred times.\n" +
            "Boy: Everybody does at first! Just wear your helmet and join in.\n" +
            "Girl: All right. Can Lan come too? She's been quite bored since her badminton team stopped training.\n" +
            "Boy: Of course. The more people, the better.\n" +
            "Girl: Great. Shall we meet at ten? If it rains, we can go to my house and play chess instead.\n" +
            "Boy: Perfect. I need to relax before Monday anyway.\n" +
            "Girl: Same here. We only have one free day once a week!",
          questions: [
            mcq(
              "What are they going to do on Sunday?",
              "Chủ nhật hai bạn định làm gì?",
              [
                "Watch a badminton match",
                "Learn to skateboard in the park",
                "Buy a new skateboard in town",
                "Study together at Mai's house",
              ],
              1,
              "Anh họ của bạn nam mới mua ván trượt và sẽ dạy hai bạn ở công viên.",
              "he's going to teach us in the park",
            ),
            mcq(
              "Why has Lan been bored recently?",
              "Vì sao gần đây Lan thấy chán?",
              [
                "Her badminton team has stopped training.",
                "She has finished all her comics.",
                "Her friends are all busy with exams.",
                "She is not allowed to go to the park.",
              ],
              0,
              "Mai giải thích Lan chán từ khi đội cầu lông của bạn ấy ngừng tập.",
              "She's been quite bored since her badminton team stopped training.",
            ),
            tf(
              "If the weather is bad, they will play chess at Mai's house.",
              "Nếu trời xấu, hai bạn sẽ chơi cờ vua ở nhà Mai.",
              true,
              "ĐÚNG. Mai nói nếu trời mưa thì cả nhóm về nhà bạn ấy chơi cờ vua thay vì ra công viên.",
              "If it rains, we can go to my house and play chess instead.",
            ),
            mcq(
              "How does Mai feel about trying skateboarding?",
              "Mai cảm thấy thế nào về việc thử trượt ván?",
              [
                "She is sure she will be very good at it.",
                "She thinks it is a waste of time.",
                "She is a little worried about falling, but she is willing to try.",
                "She is too frightened to go at all.",
              ],
              2,
              "Mai nói chưa bao giờ thử và chắc sẽ ngã cả trăm lần — hơi lo, nhưng vẫn đồng ý đi và còn rủ thêm bạn.",
              "I've never tried skateboarding. I'll probably fall over a hundred times.",
            ),
          ],
        },
        writingPrompt:
          "Viết 60–80 từ bằng tiếng Anh về sở thích của em và của một người bạn. Bắt buộc dùng ít nhất MỘT câu hiện tại hoàn thành (I have taken up / I have never ...) và MỘT mệnh đề quan hệ (who / which / that).",
        writingOutline:
          "1. Sở thích của em là gì, em bắt đầu từ khi nào — 'I have played ... since ...'.\n" +
          "2. Em chơi ở đâu, mỗi tuần mấy lần (park, once a week, at the weekend).\n" +
          "3. Sở thích của một người bạn — dùng mệnh đề quan hệ: 'My friend Hoa, who collects postcards, ...'.\n" +
          "4. Kết bài: vì sao sở thích quan trọng với em, hoặc kế hoạch cuối tuần này.",
        speaking: {
          sentences: [
            "My hobby is playing badminton with my father.",
            "I have just taken up chess this month.",
            "On Saturday I hang out with my cousins near the park.",
            "We were shy at first, but we joined in after ten minutes.",
            "If it rains on Sunday, we will play chess at home.",
          ],
          questions: [
            {
              question: "What do you usually do in your free time?",
              sampleAnswer:
                "I usually read comics and play badminton with my cousin. At the weekend we hang out in the park near my house.",
            },
            {
              question: "Have you ever taken up a new hobby? Tell me about it.",
              sampleAnswer:
                "Yes, I have taken up chess this year. My friend Trung taught me the rules, and now we play once a week after school.",
            },
            {
              question: "Do you prefer spending your free time alone or with friends? Why?",
              sampleAnswer:
                "I prefer being with friends, because we laugh a lot and I am never bored. But sometimes I read alone to relax.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 5 ───────────────────────────
      {
        topic: "Social Media",
        topicVi: "Mạng xã hội",
        icon: "📱",
        words: [
          word("account", "/əˈkaʊnt/", "tài khoản", "👤"),
          word("password", "/ˈpɑːswɜːd/", "mật khẩu", "🔒"),
          word("message", "/ˈmesɪdʒ/", "tin nhắn", "💬"),
          word("post", "/pəʊst/", "bài đăng; đăng bài", "🖼️"),
          word("comment", "/ˈkɒment/", "bình luận", "💭"),
          word("follow", "/ˈfɒləʊ/", "theo dõi ai đó trên mạng", "➕"),
          word("private", "/ˈpraɪvət/", "riêng tư", "🙈"),
          word("stranger", "/ˈstreɪndʒə/", "người lạ", "❓"),
          word("rude", "/ruːd/", "thô lỗ, khiếm nhã", "😠"),
          word("kind", "/kaɪnd/", "tử tế", "💛"),
          word("safe", "/seɪf/", "an toàn", "🛡️"),
          word("warn", "/wɔːn/", "cảnh báo, nhắc nhở trước", "⚠️"),
          word("switch off", "/ˌswɪtʃ ˈɒf/", "tắt thiết bị đi", "📴"),
          word("log out", "/ˌlɒɡ ˈaʊt/", "đăng xuất", "🚪"),
          word("share", "/ʃeə/", "chia sẻ", "🔁"),
        ],
        sound: {
          letters: "-ed",
          sound: "/t/ /d/ /ɪd/",
          hint:
            "Đuôi -ed là nơi trẻ Việt mất điểm nhiều nhất: hoặc NUỐT hẳn ('I work yesterday'), " +
            "hoặc thêm nguyên một tiếng vào mọi từ ('watch-ét'). Luật chỉ có ba dòng: " +
            "sau âm /t/ hoặc /d/ → đọc /ɪd/ và thành một âm tiết MỚI (wanted, needed); " +
            "sau âm gió không rung (k, p, s, ʃ, tʃ, f) → đọc /t/ (worked, watched); " +
            "còn lại → đọc /d/ (shared, changed). Bật rõ phụ âm cuối, đừng để nó rơi mất.",
          words: [
            { word: "worked", meaning: "đã làm việc — /wɜːkt/, đuôi đọc /t/, KHÔNG thêm tiếng", emoji: "💼" },
            { word: "watched", meaning: "đã xem — /wɒtʃt/, đuôi đọc /t/", emoji: "📺" },
            { word: "shared", meaning: "đã chia sẻ — /ʃeəd/, đuôi đọc /d/", emoji: "🔁" },
            { word: "changed", meaning: "đã thay đổi — /tʃeɪndʒd/, đuôi đọc /d/", emoji: "🔄" },
            { word: "wanted", meaning: "đã muốn — /ˈwɒntɪd/, sau /t/ nên thêm hẳn một âm tiết /ɪd/", emoji: "💭" },
          ],
        },
        reading: {
          title: "Rules That Keep Us Safe Online",
          passage:
            "Almost everyone in my class has a phone, and most of us use social media every day. It is fun, but our form teacher, who worked in a computer company before, gave us four rules last week.\n\n" +
            "Rule one: never share your password, not even with a best friend. If somebody logs in to your account, they can send messages which you have not written.\n\n" +
            "Rule two: keep your profile private. A stranger who sees your school uniform, your street and your timetable knows exactly where to find you. My friend Bao has already changed all his settings.\n\n" +
            "Rule three: think before you post. A photograph which seems funny today may not seem funny in five years. Words are the same. If you would not say it to somebody's face, do not write it in a comment.\n\n" +
            "Rule four: be kind. When a boy in another class wrote something rude about my drawing, twenty people wrote nice comments under it instead. That made me feel much better than the rude message did.\n\n" +
            "I still love sharing my art online. I have simply learnt to switch off my phone at nine o'clock and enjoy my real life too.",
          translation:
            "Gần như cả lớp tớ ai cũng có điện thoại, và phần lớn bọn tớ dùng mạng xã hội hằng ngày. Vui thật, nhưng tuần trước cô chủ nhiệm — cô từng làm ở một công ty máy tính — đã dặn bọn tớ bốn nguyên tắc.\n\n" +
            "Nguyên tắc một: đừng bao giờ cho ai mật khẩu, kể cả bạn thân. Nếu có người đăng nhập vào tài khoản của mình, họ có thể gửi những tin nhắn mà mình chẳng hề viết.\n\n" +
            "Nguyên tắc hai: để trang cá nhân ở chế độ riêng tư. Một người lạ nhìn thấy đồng phục trường, tên phố và thời khoá biểu của mình là biết chính xác tìm mình ở đâu. Bạn Bảo của tớ đã đổi hết cài đặt rồi.\n\n" +
            "Nguyên tắc ba: nghĩ kỹ trước khi đăng. Một tấm ảnh hôm nay thấy buồn cười, năm năm nữa có thể chẳng buồn cười chút nào. Lời nói cũng vậy. Điều gì mình không dám nói thẳng vào mặt người ta thì đừng viết trong bình luận.\n\n" +
            "Nguyên tắc bốn: hãy tử tế. Khi một bạn lớp khác viết lời khiếm nhã về bức vẽ của tớ, hai mươi người đã vào viết những bình luận dễ thương bên dưới. Điều đó khiến tớ thấy dễ chịu hơn nhiều so với cảm giác khó chịu vì câu nói kia.\n\n" +
            "Tớ vẫn thích chia sẻ tranh của mình lên mạng. Chỉ là giờ tớ đã học được cách tắt điện thoại lúc chín giờ và tận hưởng cuộc sống thật nữa.",
          questions: [
            mcq(
              "Why does the form teacher know a lot about the internet?",
              "Vì sao cô chủ nhiệm hiểu rõ về internet?",
              [
                "She reads a computer magazine every week.",
                "She worked in a computer company before.",
                "Her son builds websites.",
                "She teaches computer science at the school.",
              ],
              1,
              "Mệnh đề quan hệ 'who worked in a computer company before' cho biết cô từng làm ở công ty máy tính.",
              "who worked in a computer company before",
            ),
            mcq(
              "What can happen if somebody knows your password?",
              "Chuyện gì có thể xảy ra nếu ai đó biết mật khẩu của mình?",
              [
                "They can send messages that you did not write.",
                "They can delete your school timetable.",
                "They can change your marks at school.",
                "They can see your street on a map.",
              ],
              0,
              "Nguyên tắc một nói rõ: người đăng nhập được vào tài khoản có thể gửi tin nhắn mà mình không hề viết.",
              "If somebody logs in to your account, they can send messages which you have not written.",
            ),
            mcq(
              "What has Bao already done?",
              "Bảo đã làm gì rồi?",
              [
                "He has deleted his account.",
                "He has changed all his privacy settings.",
                "He has stopped using his phone.",
                "He has reported a stranger to the teacher.",
              ],
              1,
              "Câu hiện tại hoàn thành 'has already changed all his settings' cho biết Bảo đã đổi hết cài đặt.",
              "My friend Bao has already changed all his settings.",
            ),
            mcq(
              "What happened after the rude comment about the drawing?",
              "Sau lời bình luận khiếm nhã về bức vẽ, chuyện gì đã xảy ra?",
              [
                "The teacher deleted the picture.",
                "The writer stopped drawing.",
                "Twenty people wrote kind comments under it.",
                "The boy was moved to another class.",
              ],
              2,
              "Bài đọc kể hai mươi người đã viết bình luận dễ thương bên dưới thay vì im lặng.",
              "twenty people wrote nice comments under it instead",
            ),
            mcq(
              "How does the writer feel about social media now?",
              "Bây giờ bạn ấy nghĩ gì về mạng xã hội?",
              [
                "She has decided to stop using it completely.",
                "She thinks it is dangerous for everybody.",
                "She still enjoys it, but she controls when she uses it.",
                "She only uses it to talk to strangers.",
              ],
              2,
              "Câu cuối cho thấy thái độ cân bằng: bạn ấy VẪN THÍCH đăng tranh, chỉ là đã học cách tắt máy lúc chín giờ.",
              "I have simply learnt to switch off my phone at nine o'clock and enjoy my real life too.",
            ),
          ],
        },
        listening: {
          title: "A Message from a Stranger",
          transcript:
            "Girl: Dad, a person I don't know has asked to follow my art page.\n" +
            "Dad: Do any of your friends know him?\n" +
            "Girl: No. His account is new and there are no photos on it.\n" +
            "Dad: Then don't accept it. A real classmate would talk to you at school first.\n" +
            "Girl: All right. Should I make the page private?\n" +
            "Dad: Yes, and log out when you use the computer at your cousin's house.\n" +
            "Girl: I always do. My teacher warned us about that last month.\n" +
            "Dad: Good girl. Nobody is angry with you. We only want you to be safe.\n" +
            "Girl: I know. Actually, I feel better now that I've told you.",
          questions: [
            mcq(
              "Who has asked to follow the girl's page?",
              "Ai đã xin theo dõi trang của bạn nữ?",
              [
                "Her cousin from another city",
                "A person she does not know",
                "Her art teacher",
                "A classmate from her old school",
              ],
              1,
              "Ngay câu đầu bạn ấy nói đó là một người mà bạn ấy không quen biết.",
              "a person I don't know has asked to follow my art page",
            ),
            mcq(
              "What does Dad tell her to do at her cousin's house?",
              "Bố dặn bạn ấy làm gì khi ở nhà anh chị họ?",
              [
                "Log out of the computer",
                "Turn the computer off completely",
                "Only use her own phone",
                "Ask her cousin for the password",
              ],
              0,
              "Bố dặn phải đăng xuất khi dùng máy tính ở nhà anh chị họ.",
              "log out when you use the computer at your cousin's house",
            ),
            tf(
              "Her teacher has already talked to the class about logging out.",
              "Cô giáo đã từng dặn cả lớp về việc đăng xuất.",
              true,
              "ĐÚNG. Bạn ấy nói cô giáo đã cảnh báo cả lớp chuyện đó từ tháng trước.",
              "My teacher warned us about that last month.",
            ),
            mcq(
              "How does the girl feel at the end of the conversation?",
              "Cuối cuộc trò chuyện bạn nữ cảm thấy thế nào?",
              [
                "Frightened of the stranger",
                "Angry with her father",
                "Relieved because she has told her father",
                "Sorry that she made an art page",
              ],
              2,
              "Bạn ấy nói thấy nhẹ nhõm hơn sau khi kể với bố — và bố cũng khẳng định không ai giận bạn ấy cả.",
              "Actually, I feel better now that I've told you.",
            ),
          ],
        },
        writingPrompt:
          "Trường em làm một áp phích 'Stay safe online'. Viết 60–80 từ bằng tiếng Anh nêu ba nguyên tắc dùng mạng xã hội an toàn. Bắt buộc dùng ít nhất MỘT câu điều kiện loại 1 và MỘT mệnh đề quan hệ.",
        writingOutline:
          "1. Câu mở: 'Social media is fun, but we have to be careful.'\n" +
          "2. Nguyên tắc 1 — password: 'Never share your password. If somebody logs in, they will ...'.\n" +
          "3. Nguyên tắc 2 — private: 'Keep your profile private, because a stranger who sees your uniform ...'.\n" +
          "4. Nguyên tắc 3 — be kind: nghĩ trước khi viết comment.\n" +
          "5. Câu kết: 'Switch off your phone and enjoy your real life too.'",
        speaking: {
          sentences: [
            "Never share your password with anybody.",
            "Please keep your profile private.",
            "Think carefully before you post a photograph.",
            "Somebody wrote a rude comment under my drawing.",
            "I switch off my phone at nine o'clock every evening.",
          ],
          questions: [
            {
              question: "What do you use social media for?",
              sampleAnswer:
                "I use it to share my drawings and to send messages to my classmates. I also follow two artists who post very useful videos.",
            },
            {
              question: "What rules do you follow to stay safe online?",
              sampleAnswer:
                "My profile is private and I never share my password. I always log out when I use a computer at school.",
            },
            {
              question: "What would you do if a stranger sent you a message?",
              sampleAnswer:
                "I would not answer it. If the message worried me, I would show it to my parents straight away.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 6 ───────────────────────────
      {
        topic: "Music and Films",
        topicVi: "Âm nhạc và phim ảnh",
        icon: "🎬",
        words: [
          word("band", "/bænd/", "ban nhạc", "🥁"),
          word("guitar", "/ɡɪˈtɑː/", "đàn ghi-ta", "🎸"),
          word("singer", "/ˈsɪŋə/", "ca sĩ", "🎤"),
          word("song", "/sɒŋ/", "bài hát", "🎵"),
          word("lyrics", "/ˈlɪrɪks/", "lời bài hát", "📜"),
          word("record", "/rɪˈkɔːd/", "thu âm", "🎙️"),
          word("cartoon", "/kɑːˈtuːn/", "phim hoạt hình", "🐭"),
          word("cinema", "/ˈsɪnəmə/", "rạp chiếu phim", "🎟️"),
          word("actor", "/ˈæktə/", "diễn viên", "🎭"),
          word("subtitles", "/ˈsʌbtaɪtlz/", "phụ đề", "💬"),
          word("ticket", "/ˈtɪkɪt/", "vé", "🎫"),
          word("exciting", "/ɪkˈsaɪtɪŋ/", "hấp dẫn, gay cấn", "🤩"),
          word("sad", "/sæd/", "buồn", "😢"),
          word("turn up", "/ˌtɜːn ˈʌp/", "vặn to lên", "🔊"),
          word("turn down", "/ˌtɜːn ˈdaʊn/", "vặn nhỏ lại", "🔉"),
        ],
        sound: {
          letters: "-s / -es",
          sound: "/s/ /z/ /ɪz/",
          hint:
            "Quên đuôi -s là lỗi SỐ MỘT của người Việt, vì tiếng Việt không đổi hình thức từ khi " +
            "đổi số ít/số nhiều hay đổi ngôi. 'My friend like film' — người nghe hiểu, nhưng " +
            "trong bài thi là mất điểm. Ba cách đọc: sau âm gió không rung (p, t, k, f) → /s/ " +
            "(tickets, likes); sau âm rung → /z/ (songs, films); sau các âm rít (s, z, ʃ, tʃ, dʒ) " +
            "→ thêm hẳn âm tiết /ɪz/ (watches, dances). Đọc chậm và bật hẳn phụ âm cuối ra.",
          words: [
            { word: "tickets", meaning: "những chiếc vé — /ˈtɪkɪts/, đuôi đọc /s/ sau âm /t/", emoji: "🎫" },
            { word: "likes", meaning: "thích (ngôi thứ ba) — /laɪks/, đuôi đọc /s/", emoji: "👍" },
            { word: "songs", meaning: "những bài hát — /sɒŋz/, đuôi đọc /z/", emoji: "🎵" },
            { word: "films", meaning: "những bộ phim — /fɪlmz/, đuôi đọc /z/", emoji: "🎬" },
            { word: "watches", meaning: "xem (ngôi thứ ba) — /ˈwɒtʃɪz/, thêm hẳn một âm tiết /ɪz/", emoji: "📺" },
          ],
        },
        reading: {
          title: "Songs, Films and My Family",
          passage:
            "Music is the one thing which everybody in my family enjoys, although we never agree about it.\n\n" +
            "My grandmother sings old Vietnamese songs while she cooks. She knows every word, and she says the lyrics are little poems. My father prefers rock, so on Sunday morning he turns the speakers up until my mother asks him to turn them down again.\n\n" +
            "I am learning the guitar. I have been in the school band since last October, and we are recording our first song next month. It is not perfect, but it is ours.\n\n" +
            "Films are different. My little brother only wants cartoons, and he has watched the same one about a lost fish nineteen times. My parents like sad films which make my mother cry, and I like exciting ones with a mystery in them.\n\n" +
            "Last Saturday we finally found a film that all five of us wanted to see. Grandmother did not come, because she cannot read the subtitles quickly enough. The tickets were cheap, the actors were funny, and nobody looked at a phone for two hours.\n\n" +
            "If we can find another film like that, we will go again. Sitting together in the dark is better than watching alone on a small screen.",
          translation:
            "Âm nhạc là thứ duy nhất mà cả nhà tớ ai cũng thích, dù chẳng bao giờ hợp gu nhau.\n\n" +
            "Bà tớ vừa nấu ăn vừa hát những bài Việt Nam ngày xưa. Bà thuộc từng chữ, và bà bảo lời bài hát chính là những bài thơ nhỏ. Bố tớ thì mê nhạc rock, thế nên sáng Chủ nhật bố vặn loa to lên cho tới khi mẹ bảo vặn nhỏ lại.\n\n" +
            "Tớ đang học đàn ghi-ta. Tớ vào ban nhạc của trường từ tháng Mười năm ngoái, và tháng sau bọn tớ sẽ thu bài hát đầu tiên. Chưa hay lắm đâu, nhưng đó là của bọn tớ.\n\n" +
            "Phim thì lại khác. Em trai tớ chỉ đòi xem hoạt hình, riêng bộ về chú cá đi lạc em đã xem tới mười chín lần. Bố mẹ tớ thích phim buồn — loại làm mẹ khóc — còn tớ thích phim gay cấn có yếu tố bí ẩn.\n\n" +
            "Thứ Bảy tuần trước cả nhà cuối cùng cũng tìm được một bộ phim mà cả năm người đều muốn xem. Bà không đi, vì bà đọc phụ đề không kịp. Vé rẻ, diễn viên diễn hài hước, và suốt hai tiếng chẳng ai ngó vào điện thoại.\n\n" +
            "Nếu tìm được một bộ phim nữa như thế, cả nhà tớ sẽ lại đi. Ngồi cùng nhau trong bóng tối vẫn hơn xem một mình trên cái màn hình bé tí.",
          questions: [
            mcq(
              "What does the grandmother say about the lyrics of old songs?",
              "Bà nói gì về lời của những bài hát xưa?",
              [
                "They are too difficult to remember.",
                "They are like little poems.",
                "They are better in English.",
                "They are only for old people.",
              ],
              1,
              "Bài đọc dẫn lời bà: lời bài hát chính là những bài thơ nhỏ.",
              "she says the lyrics are little poems",
            ),
            mcq(
              "How long has the writer been in the school band?",
              "Bạn ấy tham gia ban nhạc của trường được bao lâu rồi?",
              [
                "Since last October",
                "For two weeks",
                "Since he was six years old",
                "Only since last Saturday",
              ],
              0,
              "Câu hiện tại hoàn thành với 'since last October' cho biết mốc bắt đầu là tháng Mười năm ngoái.",
              "I have been in the school band since last October",
            ),
            mcq(
              "Why did Grandmother stay at home?",
              "Vì sao bà ở nhà?",
              [
                "She does not like the cinema.",
                "The tickets were too expensive.",
                "She cannot read the subtitles quickly enough.",
                "She was cooking dinner for the family.",
              ],
              2,
              "Lý do nêu ngay sau chữ 'because': bà đọc phụ đề không kịp.",
              "because she cannot read the subtitles quickly enough",
            ),
            mcq(
              "What kind of films does the writer like?",
              "Bạn ấy thích loại phim nào?",
              [
                "Cartoons about animals",
                "Sad films that make people cry",
                "Exciting films with a mystery",
                "Films with no subtitles",
              ],
              2,
              "Bố mẹ thích phim buồn, còn bạn ấy thích phim gay cấn có yếu tố bí ẩn.",
              "I like exciting ones with a mystery in them",
            ),
            mcq(
              "How did the writer feel about the trip to the cinema?",
              "Bạn ấy cảm thấy thế nào về buổi đi xem phim của cả nhà?",
              [
                "He enjoyed it and hopes the family will go again.",
                "He was bored because the film was too long.",
                "He was sorry that he had spent so much money.",
                "He would rather have stayed at home.",
              ],
              0,
              "Thái độ thể hiện ở câu điều kiện cuối bài: nếu tìm được phim tương tự, cả nhà SẼ LẠI ĐI — tức là buổi đó rất vui.",
              "If we can find another film like that, we will go again.",
            ),
          ],
        },
        listening: {
          title: "At the Cinema on Le Loi Street",
          transcript:
            "Girl: Have you seen the new cartoon at the cinema on Le Loi Street?\n" +
            "Boy: Not yet. Is it good?\n" +
            "Girl: It's very funny. The actors who do the voices are famous singers, and the songs are wonderful.\n" +
            "Boy: How much are the tickets?\n" +
            "Girl: Sixty thousand dong before six o'clock, and there are English subtitles.\n" +
            "Boy: That's cheap. My sister will want to come. She listens to that band every morning and turns the volume up so loud that I can't study.\n" +
            "Girl: Tell her to turn it down and come with us on Saturday!\n" +
            "Boy: I will. If we buy the tickets online, we won't have to queue.\n" +
            "Girl: Good idea. I'll send you the link tonight.",
          questions: [
            mcq(
              "What is special about the actors in the cartoon?",
              "Điều gì đặc biệt ở các diễn viên trong phim hoạt hình này?",
              [
                "They are all children.",
                "They are famous singers.",
                "They come from another country.",
                "They wrote the story themselves.",
              ],
              1,
              "Bạn nữ nói những diễn viên lồng tiếng đều là ca sĩ nổi tiếng.",
              "The actors who do the voices are famous singers",
            ),
            mcq(
              "How much is a ticket before six o'clock?",
              "Vé trước sáu giờ giá bao nhiêu?",
              [
                "Sixteen thousand dong",
                "Sixty thousand dong",
                "Six hundred thousand dong",
                "The tickets are free.",
              ],
              1,
              "Bạn nữ nói giá vé là sáu mươi nghìn đồng nếu xem trước sáu giờ.",
              "Sixty thousand dong before six o'clock",
            ),
            tf(
              "They are going to buy their tickets at the cinema.",
              "Hai bạn sẽ mua vé tại rạp.",
              false,
              "SAI. Bạn nam nói nếu mua vé trực tuyến thì sẽ không phải xếp hàng, và bạn nữ đồng ý.",
              "If we buy the tickets online, we won't have to queue.",
            ),
            mcq(
              "How does the boy feel about his sister's music?",
              "Bạn nam nghĩ gì về nhạc của chị mình?",
              [
                "He thinks it is too loud and it stops him studying.",
                "He loves the band as much as she does.",
                "He thinks the lyrics are too sad.",
                "He never hears it because she uses headphones.",
              ],
              0,
              "Bạn ấy phàn nàn chị vặn nhạc to đến mức mình không học được.",
              "turns the volume up so loud that I can't study",
            ),
          ],
        },
        writingPrompt:
          "Viết 60–80 từ bằng tiếng Anh giới thiệu một bài hát hoặc một bộ phim mà em thích. Bắt buộc dùng ít nhất MỘT câu hiện tại hoàn thành và MỘT mệnh đề quan hệ (who / which / that).",
        writingOutline:
          "1. Tên bài hát / bộ phim và em biết nó từ khi nào — 'I have loved this song since ...'.\n" +
          "2. Nói về người làm ra nó — dùng mệnh đề quan hệ: 'the singer who wrote it', 'a film which won a prize'.\n" +
          "3. Vì sao em thích: lyrics, actors, exciting, sad, funny.\n" +
          "4. Kết bài: em sẽ giới thiệu cho ai, hoặc 'If you like ..., you will love it.'",
        speaking: {
          sentences: [
            "My grandmother knows the lyrics of every old song.",
            "I have been in the school band since last October.",
            "Please turn the music down; I am studying.",
            "We could not read the subtitles quickly enough.",
            "If we buy the tickets online, we will not have to queue.",
          ],
          questions: [
            {
              question: "What kind of music do you like?",
              sampleAnswer:
                "I like pop music with happy lyrics. My favourite band is one which my cousin showed me last year, and I listen to it while I do my homework.",
            },
            {
              question: "Tell me about a film that you have seen recently.",
              sampleAnswer:
                "I have just seen an exciting film about a lost dog. The actors were very funny, and the song at the end made my sister cry.",
            },
            {
              question: "Do you prefer watching films at the cinema or at home? Why?",
              sampleAnswer:
                "I prefer the cinema, because the screen is huge and nobody looks at a phone. At home we always stop the film to eat.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 3 · Thế giới rộng lớn",
    subtitle: "Những chuyến đi, món ngon khắp nơi và những việc tử tế.",
    lessons: [
      // ─────────────────────────── Bài 7 ───────────────────────────
      {
        topic: "Travel",
        topicVi: "Những chuyến đi",
        icon: "🚆",
        words: [
          word("journey", "/ˈdʒɜːni/", "chuyến đi", "🚆"),
          word("station", "/ˈsteɪʃn/", "nhà ga, bến xe", "🚏"),
          word("platform", "/ˈplætfɔːm/", "sân ga, đường tàu số mấy", "🚉"),
          word("luggage", "/ˈlʌɡɪdʒ/", "hành lý", "🧳"),
          word("passport", "/ˈpɑːspɔːt/", "hộ chiếu", "🛂"),
          word("book", "/bʊk/", "đặt trước (vé, phòng)", "📲"),
          word("delay", "/dɪˈleɪ/", "sự chậm trễ; bị hoãn", "⏳"),
          word("map", "/mæp/", "bản đồ", "🗺️"),
          word("guide", "/ɡaɪd/", "hướng dẫn viên", "🧭"),
          word("souvenir", "/ˌsuːvəˈnɪə/", "quà lưu niệm", "🎁"),
          word("sunrise", "/ˈsʌnraɪz/", "bình minh", "🌅"),
          word("abroad", "/əˈbrɔːd/", "ra nước ngoài", "🌏"),
          word("set off", "/ˌset ˈɒf/", "khởi hành, lên đường", "🚗"),
          word("check in", "/ˌtʃek ˈɪn/", "làm thủ tục (sân bay, khách sạn)", "🛎️"),
          word("get on", "/ˌɡet ˈɒn/", "lên (tàu, xe, máy bay)", "🚌"),
        ],
        sound: {
          letters: "-tion",
          sound: "/ʃn/",
          hint:
            "Người Việt hay đọc '-tion' thành 'ti-ơn' vì nhìn mặt chữ mà đọc. Thực ra cả cụm chỉ " +
            "là MỘT âm tiết nhẹ /ʃn/. Quan trọng hơn: trọng âm LUÔN rơi vào âm tiết NGAY TRƯỚC " +
            "'-tion' — STA-tion, in-for-MA-tion, di-REC-tion. Đây là luật hiếm hoi không có ngoại " +
            "lệ, học một lần dùng được cả trăm từ. Nhớ kèm: /ʃ/ là âm gió môi tròn, đừng đổi " +
            "thành /s/ kiểu 'sờ' của tiếng Việt.",
          words: [
            { word: "station", meaning: "nhà ga — STA-tion, nhấn âm đầu, đuôi đọc gọn /ʃn/", emoji: "🚉" },
            { word: "information", meaning: "thông tin — in-for-MA-tion, nhấn âm ngay trước -tion", emoji: "ℹ️" },
            { word: "direction", meaning: "hướng đi — di-REC-tion", emoji: "🧭" },
            { word: "attention", meaning: "sự chú ý — at-TEN-tion", emoji: "👂" },
            { word: "invitation", meaning: "lời mời — in-vi-TA-tion", emoji: "💌" },
          ],
        },
        reading: {
          title: "Our Night Train to Hue",
          passage:
            "My family has travelled to many places, but the journey which I remember best is our night train to Hue.\n\n" +
            "We set off from Da Nang station at nine in the evening. My father booked the tickets online two months earlier, so we did not have to queue. Platform two was full of families, students and one man who was carrying a guitar and a lot of luggage.\n\n" +
            "Our beds were small and the train was noisy, but I did not mind. My sister and I ate sticky rice, looked at the map and tried to guess the name of every station. At midnight my mother told us to sleep, and the sound of the wheels sent me to sleep in five minutes.\n\n" +
            "The best moment came early in the morning. I opened the curtain and saw the sunrise over the sea, with green mountains on the other side. Nobody in the carriage spoke; we all just watched.\n\n" +
            "Later we bought small souvenirs near the Citadel, and a guide told us stories about the kings who lived there long ago.\n\n" +
            "I have never been abroad, and that is fine. If my parents ask me where to go next summer, I will choose the train again.",
          translation:
            "Nhà tớ đã đi nhiều nơi, nhưng chuyến đi tớ nhớ nhất là chuyến tàu đêm ra Huế.\n\n" +
            "Bọn tớ khởi hành từ ga Đà Nẵng lúc chín giờ tối. Bố tớ đã đặt vé trên mạng từ hai tháng trước nên cả nhà không phải xếp hàng. Sân ga số hai đông kín các gia đình, sinh viên và một chú ôm cây đàn ghi-ta cùng cả đống hành lý.\n\n" +
            "Giường nằm thì chật, tàu thì ồn, nhưng tớ chẳng thấy phiền. Tớ với em gái ăn xôi, mở bản đồ ra xem rồi đoán tên từng ga. Nửa đêm mẹ giục hai đứa ngủ, và tiếng bánh tàu ru tớ ngủ chỉ trong năm phút.\n\n" +
            "Khoảnh khắc đẹp nhất đến vào sáng sớm. Tớ kéo rèm ra và nhìn thấy bình minh trên biển, phía bên kia là núi xanh. Cả toa chẳng ai nói gì; tất cả chỉ lặng lẽ ngắm.\n\n" +
            "Sau đó cả nhà mua vài món quà lưu niệm gần Đại Nội, và một cô hướng dẫn viên kể cho bọn tớ nghe chuyện về các vị vua từng sống ở đó.\n\n" +
            "Tớ chưa từng ra nước ngoài, và điều đó cũng chẳng sao cả. Nếu hè sang năm bố mẹ hỏi tớ muốn đi đâu, tớ sẽ lại chọn đi tàu.",
          questions: [
            mcq(
              "Why did the family not have to queue for tickets?",
              "Vì sao cả nhà không phải xếp hàng mua vé?",
              [
                "The station was almost empty that evening.",
                "The father had booked them online in advance.",
                "A guide bought the tickets for them.",
                "They travelled without tickets.",
              ],
              1,
              "Bố đã đặt vé trực tuyến từ hai tháng trước, nên cả nhà khỏi phải xếp hàng.",
              "My father booked the tickets online two months earlier, so we did not have to queue.",
            ),
            mcq(
              "What did the writer and her sister do on the train?",
              "Trên tàu, bạn ấy và em gái đã làm gì?",
              [
                "They slept from nine o'clock until morning.",
                "They played cards with the other passengers.",
                "They ate, looked at the map and guessed the station names.",
                "They listened to the man playing his guitar.",
              ],
              2,
              "Bài đọc kể hai chị em ăn xôi, xem bản đồ và đoán tên từng ga.",
              "My sister and I ate sticky rice, looked at the map and tried to guess the name of every station.",
            ),
            mcq(
              "What did the writer see when she opened the curtain?",
              "Bạn ấy nhìn thấy gì khi kéo rèm ra?",
              [
                "The sunrise over the sea",
                "A busy platform full of people",
                "The Citadel and its gardens",
                "A long queue at the station",
              ],
              0,
              "Khoảnh khắc đẹp nhất là lúc sáng sớm: bạn ấy thấy bình minh trên biển, núi xanh phía bên kia.",
              "I opened the curtain and saw the sunrise over the sea",
            ),
            mcq(
              "Who told the family about the kings?",
              "Ai kể cho cả nhà nghe về các vị vua?",
              [
                "The man with the guitar",
                "A guide near the Citadel",
                "The writer's father",
                "A teacher from their school",
              ],
              1,
              "Sau khi mua quà lưu niệm gần Đại Nội, một hướng dẫn viên đã kể chuyện về các vị vua.",
              "a guide told us stories about the kings who lived there long ago",
            ),
            mcq(
              "How does the writer feel about never having been abroad?",
              "Bạn ấy nghĩ gì về việc chưa từng ra nước ngoài?",
              [
                "She is sad and hopes to leave Viet Nam soon.",
                "She does not mind, because she loves travelling at home.",
                "She thinks travelling is a waste of money.",
                "She is afraid of aeroplanes.",
              ],
              1,
              "Bạn ấy nói thẳng 'that is fine' và còn muốn đi tàu tiếp vào hè sau — hoàn toàn hài lòng với những chuyến đi trong nước.",
              "I have never been abroad, and that is fine.",
            ),
          ],
        },
        listening: {
          title: "At the Airport Desk",
          transcript:
            "Woman: Good morning. Can I see your passport, please?\n" +
            "Boy: Here you are. My family is checking in together. There are four of us.\n" +
            "Woman: Thank you. How many bags are you putting in the hold?\n" +
            "Boy: Two big ones. This small bag is my hand luggage.\n" +
            "Woman: That's fine. I'm afraid the flight is delayed by forty minutes.\n" +
            "Boy: Oh. Do we still get on at gate twelve?\n" +
            "Woman: Yes, gate twelve at twenty past eleven. You can wait in the cafe upstairs.\n" +
            "Boy: Thanks. Is there anywhere to buy a souvenir?\n" +
            "Woman: There's a small shop next to the cafe. Have a good journey!\n" +
            "Boy: Thank you very much.",
          questions: [
            mcq(
              "How many people are checking in together?",
              "Có mấy người cùng làm thủ tục?",
              ["Two", "Three", "Four", "Twelve"],
              2,
              "Bạn nam nói cả nhà làm thủ tục cùng nhau và có bốn người.",
              "There are four of us.",
            ),
            mcq(
              "Why does the family have to wait?",
              "Vì sao cả nhà phải chờ?",
              [
                "The flight is delayed by forty minutes.",
                "Their luggage is too heavy.",
                "The gate has not opened yet.",
                "The boy has lost his passport.",
              ],
              0,
              "Nhân viên báo chuyến bay bị hoãn bốn mươi phút.",
              "the flight is delayed by forty minutes",
            ),
            tf(
              "The family will get on the plane at gate twelve.",
              "Cả nhà sẽ lên máy bay ở cửa số mười hai.",
              true,
              "ĐÚNG. Nhân viên xác nhận cửa số mười hai, lúc mười một giờ hai mươi.",
              "Yes, gate twelve at twenty past eleven.",
            ),
            mcq(
              "Where can the boy buy a souvenir?",
              "Bạn nam có thể mua quà lưu niệm ở đâu?",
              [
                "At the check-in desk",
                "In a small shop next to the cafe",
                "At gate twelve",
                "There is nowhere to buy one.",
              ],
              1,
              "Nhân viên chỉ đường: có một cửa hàng nhỏ ngay cạnh quán cà phê.",
              "There's a small shop next to the cafe.",
            ),
          ],
        },
        writingPrompt:
          "Viết 60–80 từ bằng tiếng Anh kể về một chuyến đi mà em nhớ nhất. Bắt buộc dùng ít nhất MỘT mệnh đề quan hệ (who / which / that) và MỘT câu điều kiện loại 1 ở cuối bài.",
        writingOutline:
          "1. Em đi đâu, đi với ai, đi bằng gì (set off, station, train, plane).\n" +
          "2. Chuyến đi thế nào — dùng mệnh đề quan hệ: 'the journey which I remember best', 'a guide who told us ...'.\n" +
          "3. Khoảnh khắc em thích nhất (sunrise, souvenirs, food).\n" +
          "4. Kết bài bằng câu điều kiện loại 1: 'If my parents ask me next summer, I will ...'.",
        speaking: {
          sentences: [
            "We set off from the station at nine in the evening.",
            "My father booked the tickets two months earlier.",
            "I opened the curtain and saw the sunrise.",
            "We bought small souvenirs near the Citadel.",
            "If my parents ask me, I will choose the train again.",
          ],
          questions: [
            {
              question: "Tell me about a journey that you have enjoyed.",
              sampleAnswer:
                "Last summer I took a night train to Hue with my family. The best moment was the sunrise over the sea, which I will never forget.",
            },
            {
              question: "Do you prefer travelling by train or by plane? Why?",
              sampleAnswer:
                "I prefer the train, because I can see the mountains and the sea from the window. A plane is faster, but you only see clouds.",
            },
            {
              question: "Where will you go if you have a free week next summer?",
              sampleAnswer:
                "If I have a free week, I will visit my grandparents in Hoi An. We will cycle to the beach and eat noodles every morning.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 8 ───────────────────────────
      {
        topic: "Food Around the World",
        topicVi: "Món ngon khắp thế giới",
        icon: "🍜",
        words: [
          word("dish", "/dɪʃ/", "món ăn", "🍲"),
          word("meal", "/miːl/", "bữa ăn", "🍽️"),
          word("recipe", "/ˈresəpi/", "công thức nấu ăn", "📜"),
          word("ingredient", "/ɪnˈɡriːdiənt/", "nguyên liệu", "🥕"),
          word("herbs", "/hɜːbz/", "rau thơm", "🌿"),
          word("noodles", "/ˈnuːdlz/", "mì, bún, phở", "🍜"),
          word("dessert", "/dɪˈzɜːt/", "món tráng miệng", "🍮"),
          word("taste", "/teɪst/", "nếm; có vị", "👅"),
          word("spicy", "/ˈspaɪsi/", "cay", "🌶️"),
          word("sour", "/ˈsaʊə/", "chua", "🍋"),
          word("sweet", "/swiːt/", "ngọt", "🍯"),
          word("fresh", "/freʃ/", "tươi", "🥬"),
          word("delicious", "/dɪˈlɪʃəs/", "ngon tuyệt", "😋"),
          word("try out", "/ˌtraɪ ˈaʊt/", "thử làm, thử nghiệm", "🧑‍🍳"),
          word("cut up", "/ˌkʌt ˈʌp/", "cắt nhỏ ra", "🔪"),
        ],
        sound: {
          letters: "-st / -nd / -sk",
          sound: "/st/ /nd/ /sk/",
          hint:
            "Tiếng Việt không có cụm phụ âm ở cuối tiếng, nên trẻ Việt hay nuốt bớt: 'first' " +
            "thành 'phớt', 'friend' thành 'phen', 'ask' thành 'át'. Người nghe mất luôn thông tin " +
            "về thì và số nhiều. Cách luyện: đọc chậm, tách rời từng phụ âm cuối (fir-s-t), rồi " +
            "ghép lại nhanh dần. Đừng thêm nguyên âm vào giữa ('fir-sờ-tờ') — chỉ cần bật hơi nhẹ, " +
            "không cần to. Nghe được phụ âm cuối là bài thi Nói ăn điểm ngay.",
          words: [
            { word: "first", meaning: "đầu tiên — /fɜːst/, bật rõ cả /s/ lẫn /t/ ở cuối", emoji: "1️⃣" },
            { word: "taste", meaning: "nếm — /teɪst/, kết thúc bằng cụm /st/", emoji: "👅" },
            { word: "friend", meaning: "bạn — /frend/, giữ lại /d/, đừng bỏ rơi", emoji: "🧑‍🤝‍🧑" },
            { word: "ask", meaning: "hỏi — /ɑːsk/, không đọc thành 'át'", emoji: "🙋" },
            { word: "breakfast", meaning: "bữa sáng — /ˈbrekfəst/, kết thúc bằng cụm /st/, đừng bỏ mất /t/", emoji: "🍳" },
          ],
        },
        reading: {
          title: "A World Food Day at School",
          passage:
            "Last Friday our school held a World Food Day, and every class had to bring a dish from a different country.\n\n" +
            "My group chose Japan. We spent Thursday evening watching a video which showed us how to make rice balls. The recipe had only four ingredients, but cutting up the vegetables took much longer than we expected. My mother helped us and laughed at our funny shapes.\n\n" +
            "Class 7B made a sweet dessert from Thailand with fresh mango and sticky rice. Class 7C cooked a spicy dish from Korea that made three teachers drink a lot of water. The most popular table, of course, was the Vietnamese one, which our teachers made: bun cha with fresh herbs, noodles and a sour sauce.\n\n" +
            "Our headmaster tasted everything and said he could not choose a winner.\n\n" +
            "What surprised me most was how similar we all are. Nearly every country has a soup, a bread and something sweet for children. Food which looks strange at first often tastes delicious.\n\n" +
            "I have decided to try out one new recipe every month. If my family enjoys the meal, I will write the recipe in a notebook and keep it for ever.",
          translation:
            "Thứ Sáu tuần trước trường tớ tổ chức Ngày Ẩm thực Thế giới, mỗi lớp phải mang tới một món ăn của một nước khác nhau.\n\n" +
            "Nhóm tớ chọn Nhật Bản. Tối thứ Năm cả nhóm ngồi xem một video hướng dẫn cách nắm cơm. Công thức chỉ có bốn nguyên liệu thôi, nhưng khoản cắt rau củ thì lâu hơn bọn tớ tưởng nhiều. Mẹ tớ ra phụ và cười ngất vì mấy nắm cơm méo mó của bọn tớ.\n\n" +
            "Lớp 7B làm món tráng miệng ngọt của Thái Lan với xoài tươi và xôi. Lớp 7C nấu một món cay của Hàn Quốc khiến ba thầy cô phải uống nước ừng ực. Bàn đông khách nhất, tất nhiên, là bàn Việt Nam do các thầy cô làm: bún chả với rau thơm tươi, bún và nước chấm chua chua.\n\n" +
            "Thầy hiệu trưởng nếm hết mọi món rồi bảo thầy không thể chọn ra ai thắng.\n\n" +
            "Điều khiến tớ ngạc nhiên nhất là hoá ra chúng ta giống nhau đến vậy. Gần như nước nào cũng có một món canh, một loại bánh mì và một món ngọt cho trẻ con. Món ăn thoạt nhìn thấy lạ nhưng ăn vào lại thường rất ngon.\n\n" +
            "Tớ đã quyết định mỗi tháng sẽ thử một công thức mới. Nếu cả nhà thích bữa đó, tớ sẽ chép công thức vào một cuốn sổ và giữ mãi.",
          questions: [
            mcq(
              "What did the writer's group make?",
              "Nhóm của bạn ấy đã làm món gì?",
              [
                "A sweet dessert from Thailand",
                "Japanese rice balls",
                "A spicy dish from Korea",
                "Bun cha with fresh herbs",
              ],
              1,
              "Nhóm bạn ấy chọn Nhật Bản và xem video hướng dẫn cách nắm cơm.",
              "a video which showed us how to make rice balls",
            ),
            mcq(
              "What took much longer than the group expected?",
              "Việc gì mất nhiều thời gian hơn nhóm tưởng?",
              [
                "Watching the video",
                "Cutting up the vegetables",
                "Cooking the sticky rice",
                "Carrying the food to school",
              ],
              1,
              "Công thức chỉ bốn nguyên liệu, nhưng khâu cắt rau củ mới là khâu tốn thời gian.",
              "cutting up the vegetables took much longer than we expected",
            ),
            mcq(
              "Why did three teachers drink a lot of water?",
              "Vì sao ba thầy cô phải uống rất nhiều nước?",
              [
                "The weather was very hot that day.",
                "The Thai dessert was too sweet.",
                "The Korean dish was very spicy.",
                "The sauce at the Vietnamese table was sour.",
              ],
              2,
              "Bài đọc nói món Hàn Quốc của lớp 7C rất cay, khiến ba thầy cô phải uống nhiều nước.",
              "Class 7C cooked a spicy dish from Korea that made three teachers drink a lot of water.",
            ),
            mcq(
              "What did the headmaster decide?",
              "Thầy hiệu trưởng quyết định thế nào?",
              [
                "He could not choose a winner.",
                "The Vietnamese table was the best.",
                "The event was too noisy to continue.",
                "Every class had to cook again next month.",
              ],
              0,
              "Thầy nếm hết các món rồi nói không thể chọn ra người thắng cuộc.",
              "said he could not choose a winner",
            ),
            mcq(
              "What surprised the writer most about the day?",
              "Điều gì khiến bạn ấy ngạc nhiên nhất trong ngày hôm đó?",
              [
                "How expensive the ingredients were",
                "How similar the food of different countries is",
                "How badly her group cooked",
                "How few students joined in",
              ],
              1,
              "Bạn ấy nói thẳng điều làm mình ngạc nhiên nhất: hoá ra các nước giống nhau nhiều hơn mình nghĩ.",
              "What surprised me most was how similar we all are.",
            ),
          ],
        },
        listening: {
          title: "Cooking with Grandma",
          transcript:
            "Girl: Grandma, what are we making for lunch?\n" +
            "Grandma: Pho ga. Can you cut up the spring onions for me?\n" +
            "Girl: Of course. Where are the herbs?\n" +
            "Grandma: In the fridge. Wash them well, because they must be fresh.\n" +
            "Girl: My friend Emily is coming at twelve. She has never tried Vietnamese noodles.\n" +
            "Grandma: Then we will make a small bowl for her without chilli. Not everybody likes spicy food.\n" +
            "Girl: Good idea. Shall I make a dessert too?\n" +
            "Grandma: If you have time, you can cut up some mango.\n" +
            "Girl: Perfect. Emily's mother sent us an English recipe for apple cake last week. Can we try it out on Sunday?\n" +
            "Grandma: Why not? I have never baked a cake, but I am always happy to learn.",
          questions: [
            mcq(
              "What are they cooking for lunch?",
              "Hai bà cháu nấu món gì cho bữa trưa?",
              ["Pho ga", "Apple cake", "Bun cha", "Rice balls"],
              0,
              "Bà trả lời ngay câu hỏi đầu tiên: bữa trưa nay là phở gà.",
              "Pho ga. Can you cut up the spring onions for me?",
            ),
            mcq(
              "Why will they make a bowl without chilli?",
              "Vì sao bà làm riêng một bát không có ớt?",
              [
                "Because there is no chilli in the house",
                "Because Emily may not like spicy food",
                "Because the grandmother cannot eat chilli",
                "Because the girl asked for a sweet dish",
              ],
              1,
              "Emily chưa ăn bún phở Việt Nam bao giờ, và bà nói không phải ai cũng thích đồ cay.",
              "Not everybody likes spicy food.",
            ),
            tf(
              "The grandmother has baked many cakes before.",
              "Bà đã nướng bánh nhiều lần rồi.",
              false,
              "SAI. Bà nói chưa bao giờ nướng bánh, nhưng bà luôn sẵn lòng học cái mới.",
              "I have never baked a cake",
            ),
            mcq(
              "How does the grandmother feel about the English recipe?",
              "Bà nghĩ sao về công thức bánh của người Anh?",
              [
                "She thinks it is too difficult for her.",
                "She would rather cook Vietnamese food only.",
                "She is happy to try something new.",
                "She wants Emily's mother to make it instead.",
              ],
              2,
              "Bà đáp 'Why not?' và nói mình luôn vui khi được học điều mới — thái độ rất cởi mở.",
              "Why not? I have never baked a cake, but I am always happy to learn.",
            ),
          ],
        },
        writingPrompt:
          "Trường em sắp có Ngày Ẩm thực Thế giới. Viết 60–80 từ bằng tiếng Anh giới thiệu một món ăn Việt Nam cho bạn nước ngoài. Bắt buộc dùng ít nhất MỘT mệnh đề quan hệ và MỘT câu điều kiện loại 1.",
        writingOutline:
          "1. Tên món ăn và người ta ăn khi nào (breakfast, Tet, family meal).\n" +
          "2. Nguyên liệu chính — dùng mệnh đề quan hệ: 'fresh herbs which grow in my garden'.\n" +
          "3. Món đó có vị gì: sweet, sour, spicy, fresh, delicious.\n" +
          "4. Kết bài bằng câu điều kiện loại 1: 'If you come to my house, I will cook it for you.'",
        speaking: {
          sentences: [
            "Every class brought a dish from a different country.",
            "The recipe had only four ingredients.",
            "Please cut up the vegetables for me.",
            "The Korean dish was too spicy for my teacher.",
            "If my family enjoys the meal, I will write the recipe down.",
          ],
          questions: [
            {
              question: "What is your favourite dish, and how is it made?",
              sampleAnswer:
                "My favourite dish is bun cha. You need noodles, fresh herbs and a sour sauce which my grandmother makes. It tastes delicious on a hot day.",
            },
            {
              question: "Have you ever tried food from another country?",
              sampleAnswer:
                "Yes, I have tried a Korean dish at our World Food Day. It was very spicy, so I drank three glasses of water.",
            },
            {
              question: "Would you like to learn to cook? Why?",
              sampleAnswer:
                "Yes, I would. If I learn to cook, I will make dinner for my parents when they are tired after work.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 9 ───────────────────────────
      {
        topic: "Volunteering",
        topicVi: "Làm tình nguyện",
        icon: "🤝",
        words: [
          word("volunteer", "/ˌvɒlənˈtɪə/", "tình nguyện viên", "🙋"),
          word("charity", "/ˈtʃærəti/", "tổ chức từ thiện", "💝"),
          word("donate", "/dəʊˈneɪt/", "quyên góp", "🎁"),
          word("raise money", "/ˌreɪz ˈmʌni/", "gây quỹ", "💰"),
          word("rubbish", "/ˈrʌbɪʃ/", "rác", "🗑️"),
          word("plastic", "/ˈplæstɪk/", "nhựa", "🥤"),
          word("beach", "/biːtʃ/", "bãi biển", "🏖️"),
          word("neighbour", "/ˈneɪbə/", "hàng xóm", "🏘️"),
          word("blanket", "/ˈblæŋkɪt/", "cái chăn", "🛏️"),
          word("grateful", "/ˈɡreɪtfl/", "biết ơn", "🙏"),
          word("difference", "/ˈdɪfrəns/", "sự khác biệt, sự thay đổi", "✨"),
          word("clean up", "/ˌkliːn ˈʌp/", "dọn dẹp sạch sẽ", "🧹"),
          word("pick up", "/ˌpɪk ˈʌp/", "nhặt lên", "✋"),
          word("help out", "/ˌhelp ˈaʊt/", "giúp một tay", "🤲"),
          word("take care of", "/ˌteɪk ˈkeər əv/", "chăm sóc, trông nom", "🧸"),
        ],
        sound: {
          letters: "Lên giọng ↗ / xuống giọng ↘",
          sound: "/↗ ↘/",
          hint:
            "Tiếng Việt có sáu thanh điệu gắn vào TỪNG CHỮ, nên trẻ Việt hay giữ giọng phẳng lì " +
            "suốt cả câu tiếng Anh — nghe như đọc bài. Tiếng Anh dùng giai điệu cho CẢ CÂU: " +
            "câu hỏi Yes/No lên giọng ở cuối ↗ ('Are you ready?'), câu hỏi bắt đầu bằng " +
            "Wh- và câu kể xuống giọng ở cuối ↘ ('Where do you live?'). Lên giọng đúng chỗ nghe " +
            "thân thiện và lịch sự; giọng phẳng dễ bị hiểu là lạnh lùng hoặc chán nản.",
          words: [
            { word: "Are you ready?", meaning: "Bạn sẵn sàng chưa? — câu hỏi Yes/No, LÊN giọng ở cuối ↗", emoji: "❓" },
            { word: "Where do you live?", meaning: "Bạn sống ở đâu? — câu hỏi Wh-, XUỐNG giọng ở cuối ↘", emoji: "🏠" },
            { word: "Can you help out?", meaning: "Bạn giúp một tay nhé? — lên giọng ↗ nghe lịch sự hơn hẳn", emoji: "🤲" },
            { word: "Really?", meaning: "Thật á? — lên giọng cao ↗ để tỏ ra ngạc nhiên", emoji: "😮" },
            { word: "That's wonderful.", meaning: "Tuyệt quá. — câu kể, xuống giọng ở cuối ↘", emoji: "🌟" },
          ],
        },
        reading: {
          title: "The Saturday That Changed My Mind",
          passage:
            "I used to think that volunteering was only for adults who had a lot of free time. Then my sister asked me to help out at a beach clean-up in Da Nang, and I changed my mind in one morning.\n\n" +
            "About sixty students met at seven o'clock, when the sand was still cool. The organisers gave us gloves, big bags and a short talk about safety. Then we walked slowly along the water and picked up everything which did not belong there. Most of the rubbish was plastic: bottles, straws and hundreds of small pieces that were difficult to see.\n\n" +
            "By eleven o'clock we had filled ninety bags. A woman who sells drinks near the steps brought us cold water and would not take our money.\n\n" +
            "In the afternoon the same charity visited an old people's home. We donated blankets, and I sat with a grandfather who told me about his fishing boat. He was so grateful for a simple conversation.\n\n" +
            "I am not a hero and one Saturday will not save the world. But if every student in my city gives four hours a month, we can make a real difference. I have already promised to go again in July.",
          translation:
            "Tớ từng nghĩ làm tình nguyện là chuyện của người lớn rảnh rỗi. Rồi chị tớ rủ tớ đi phụ một buổi dọn rác bãi biển ở Đà Nẵng, và tớ đã đổi ý chỉ sau một buổi sáng.\n\n" +
            "Khoảng sáu mươi bạn học sinh tập trung lúc bảy giờ, khi cát còn mát. Ban tổ chức phát cho bọn tớ găng tay, túi to và dặn nhanh về an toàn. Rồi cả nhóm đi chậm dọc mép nước, nhặt hết những thứ không thuộc về nơi đó. Phần lớn rác là nhựa: chai, ống hút và hàng trăm mảnh vụn nhỏ khó nhìn thấy.\n\n" +
            "Đến mười một giờ bọn tớ đã đầy chín mươi túi. Một cô bán nước gần bậc thang mang ra cho cả nhóm nước mát và nhất định không lấy tiền.\n\n" +
            "Buổi chiều, cũng nhóm từ thiện đó ghé thăm một viện dưỡng lão. Bọn tớ tặng chăn, và tớ ngồi nghe một ông kể về chiếc thuyền đánh cá ngày xưa của ông. Ông biết ơn lắm, chỉ vì một cuộc trò chuyện giản dị thôi.\n\n" +
            "Tớ không phải anh hùng, và một ngày thứ Bảy thì chẳng cứu được thế giới. Nhưng nếu mỗi học sinh trong thành phố tớ bỏ ra bốn tiếng mỗi tháng, bọn tớ có thể tạo ra thay đổi thật sự. Tớ đã hứa tháng Bảy này sẽ đi tiếp.",
          questions: [
            mcq(
              "What did the writer think about volunteering before that Saturday?",
              "Trước ngày thứ Bảy đó, bạn ấy nghĩ gì về việc làm tình nguyện?",
              [
                "That it was only for adults with a lot of free time",
                "That it was too expensive for students",
                "That it was the best way to spend a weekend",
                "That only his sister could do it",
              ],
              0,
              "Câu mở đầu nói rõ định kiến cũ của bạn ấy: tình nguyện chỉ dành cho người lớn rảnh rỗi.",
              "I used to think that volunteering was only for adults who had a lot of free time.",
            ),
            mcq(
              "What was most of the rubbish on the beach made of?",
              "Phần lớn rác trên bãi biển là loại gì?",
              ["Paper", "Glass", "Plastic", "Wood"],
              2,
              "Bài đọc liệt kê chai, ống hút và hàng trăm mảnh vụn — tất cả đều là nhựa.",
              "Most of the rubbish was plastic",
            ),
            mcq(
              "What did the woman who sells drinks do?",
              "Cô bán nước đã làm gì?",
              [
                "She joined the students on the beach.",
                "She gave them cold water and refused their money.",
                "She sold them ninety bottles of water.",
                "She complained about the noise.",
              ],
              1,
              "Cô mang nước mát ra cho cả nhóm và nhất định không nhận tiền.",
              "A woman who sells drinks near the steps brought us cold water and would not take our money.",
            ),
            mcq(
              "What did the students do at the old people's home?",
              "Ở viện dưỡng lão các bạn đã làm gì?",
              [
                "They cleaned all the rooms.",
                "They cooked a special meal.",
                "They donated blankets and talked to the residents.",
                "They collected money from the families.",
              ],
              2,
              "Bài đọc kể các bạn tặng chăn, và người viết ngồi trò chuyện với một ông cụ.",
              "We donated blankets, and I sat with a grandfather who told me about his fishing boat.",
            ),
            mcq(
              "What does the writer believe about what one student can do?",
              "Bạn ấy tin điều gì về sức của một học sinh?",
              [
                "One person cannot do everything, but many students together can change a lot.",
                "Volunteering is a waste of a free Saturday.",
                "Only heroes are able to help other people.",
                "Students should give money instead of time.",
              ],
              0,
              "Bạn ấy nói mình không phải anh hùng, NHƯNG nếu mỗi học sinh góp bốn tiếng mỗi tháng thì sẽ tạo ra thay đổi thật sự.",
              "But if every student in my city gives four hours a month, we can make a real difference.",
            ),
          ],
        },
        listening: {
          title: "Our Class Project",
          transcript:
            "Teacher: Good morning, everyone. Our class has decided to raise money for the children's hospital.\n" +
            "Girl: How much do we need, Miss?\n" +
            "Teacher: Five million dong would buy twenty blankets and some books.\n" +
            "Boy: My neighbour has a small shop. I can ask her to help out.\n" +
            "Teacher: That's a great idea, Nam. We are also going to clean up the park on Sunday and sell the old bottles we collect.\n" +
            "Girl: Can my little brother come? He is only eight.\n" +
            "Teacher: Of course, if somebody takes care of him. Bring gloves and a hat.\n" +
            "Boy: What time do we start?\n" +
            "Teacher: Half past six, before it gets hot. If it rains, we will meet next Sunday instead.\n" +
            "Girl: I can't wait. Last year our class only donated old clothes, but this feels bigger.",
          questions: [
            mcq(
              "What is the class raising money for?",
              "Lớp gây quỹ để làm gì?",
              [
                "A new school library",
                "The children's hospital",
                "A trip to the beach",
                "New gloves and hats",
              ],
              1,
              "Cô giáo thông báo ngay từ đầu: lớp quyết định gây quỹ cho bệnh viện nhi.",
              "Our class has decided to raise money for the children's hospital.",
            ),
            mcq(
              "What will the class do with the old bottles?",
              "Lớp sẽ làm gì với những chiếc chai cũ?",
              [
                "Sell them",
                "Give them to the hospital",
                "Use them for a science lesson",
                "Take them home",
              ],
              0,
              "Cô nói cả lớp sẽ dọn công viên và BÁN số chai cũ nhặt được để lấy tiền.",
              "clean up the park on Sunday and sell the old bottles we collect",
            ),
            tf(
              "The students will start work at half past six.",
              "Các bạn sẽ bắt đầu làm lúc sáu rưỡi.",
              true,
              "ĐÚNG. Cô giáo nói bắt đầu lúc sáu giờ rưỡi, trước khi trời nắng nóng.",
              "Half past six, before it gets hot.",
            ),
            mcq(
              "How does the girl feel about this year's project?",
              "Bạn nữ cảm thấy thế nào về dự án năm nay?",
              [
                "She is worried that it is too much work.",
                "She thinks last year's project was better.",
                "She is excited because it feels bigger than last year.",
                "She does not want her brother to come.",
              ],
              2,
              "Bạn ấy nói 'I can't wait' (nóng lòng lắm rồi) và thấy lần này lớn hơn hẳn năm ngoái.",
              "I can't wait. Last year our class only donated old clothes, but this feels bigger.",
            ),
          ],
        },
        writingPrompt:
          "Lớp em sắp tổ chức một hoạt động tình nguyện. Viết 60–80 từ bằng tiếng Anh rủ bạn cùng tham gia. Bắt buộc dùng ít nhất MỘT câu điều kiện loại 1 và MỘT câu hiện tại hoàn thành.",
        writingOutline:
          "1. Chào bạn và nói hoạt động là gì, ở đâu, khi nào (clean up the beach, raise money).\n" +
          "2. Kể em đã từng tham gia chưa — 'I have volunteered twice' / 'I have never done this before'.\n" +
          "3. Bạn cần mang gì (gloves, a hat, water).\n" +
          "4. Kết bài bằng câu điều kiện loại 1: 'If we all help out, we will make a real difference.'",
        speaking: {
          sentences: [
            "Sixty students met at the beach at seven o'clock.",
            "We picked up ninety bags of plastic rubbish.",
            "My neighbour wants to help out with her shop.",
            "We donated blankets to an old people's home.",
            "If every student gives four hours a month, we will make a difference.",
          ],
          questions: [
            {
              question: "Have you ever done any volunteer work?",
              sampleAnswer:
                "Yes, I have. Last summer I helped out at a beach clean-up with my sister. We picked up a lot of plastic bottles.",
            },
            {
              question: "How can students help people in their neighbourhood?",
              sampleAnswer:
                "We can clean up the park, take care of younger children after school, or collect old books for a charity.",
            },
            {
              question: "What would you do if your school raised money for a hospital?",
              sampleAnswer:
                "If my school raised money, I would sell my old comics and donate everything. I would also ask my neighbours to help out.",
            },
          ],
        },
      },
    ],
  },
];
