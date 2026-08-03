// Ngữ pháp gắn vào BÀI LỘ TRÌNH của cấp ket — đi song song với danh sách bài
// trong ../ket.ts (phần tử thứ i ↔ bài thứ i, tính dồn qua các chương).
//
// Mỗi bài một điểm ngữ pháp A2 Key for Schools, KHÔNG lặp lại giữa các bài:
//   1 School Life          — mệnh đề quan hệ who / which / that
//   2 Studying Online      — câu điều kiện loại 1
//   3 Exams and Stress     — should / must / have to
//   4 Free Time            — giới từ thời gian at / on / in
//   5 Social Media         — hiện tại hoàn thành
//   6 Music and Films      — danh động từ sau động từ (enjoy + V-ing)
//   7 Travel               — quá khứ tiếp diễn
//   8 Food Around the World— so sánh hơn / so sánh nhất
//   9 Volunteering         — động từ + to V (want / decide / promise)
//
// Ví dụ và bài tập dựng bằng ĐÚNG từ vựng bài đó vừa dạy (School Life →
// timetable/canteen/monitor…, Travel → platform/luggage/souvenir…).
//
// Mỗi phần đủ 8 minigame: 2× fill_blank, 2× sentence_order, 2× dịch Việt→Anh,
// 2× dịch Anh→Việt.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 1 ───────────────────────────
  {
    topic: "School Life",
    sections: [
      {
        id: "rm-ke-01",
        title: "who · which · that — nói rõ thêm về người và vật",
        titleEn: "Relative clauses",
        structure: "Danh từ + who / which / that + động từ + …",
        breakdown: [
          part("the classmate", "Danh từ đứng trước", "Người hoặc vật mà mình muốn nói rõ thêm."),
          part("who", "Đại từ quan hệ", "who → người · which → vật · that → dùng được cho cả hai."),
          part("looks after the younger students", "Mệnh đề bổ nghĩa", "Thông tin thêm, đi ngay sau đại từ quan hệ."),
        ],
        explanation:
          "Mệnh đề quan hệ giúp gộp hai câu ngắn thành một câu tự nhiên hơn:\n- This is the teacher. He teaches maths. → This is the teacher who teaches maths.\n- I love science. We study it in a special room. → I love science, which we study in a special room.\nChọn từ nối:\n- who → người: the classmate who sits next to me\n- which → vật, sự việc: the subject which I like best\n- that → thay được cho cả who lẫn which trong câu thường ngày\nĐại từ quan hệ ĐÃ làm chủ ngữ rồi nên không thêm chủ ngữ nữa: ✘ the boy who he helps me.",
        usage: "Dùng khi em giới thiệu thầy cô, bạn bè, môn học ở trường mà không phải tách thành hai câu rời.",
        mistakes: [
          mis("I have a classmate who he helps me.", "I have a classmate who helps me.", "“who” đã là chủ ngữ rồi, đừng thêm “he”."),
          mis("The subject who I like best is science.", "The subject which I like best is science.", "“subject” là vật nên phải dùng “which” hoặc “that”."),
          mis("Minh is the monitor which looks after us.", "Minh is the monitor who looks after us.", "“monitor” là người nên phải dùng “who”."),
        ],
        examples: [
          ex("Khi giới thiệu thầy cô", "The teacher who teaches maths never accepts late homework.", "Thầy dạy Toán không bao giờ nhận bài nộp muộn."),
          ex("Khi nói về môn học", "Science is the subject which I like best.", "Khoa học là môn tớ thích nhất."),
          ex("Khi kể về lớp trưởng", "Minh is the classmate who looks after the younger students.", "Minh là bạn cùng lớp hay trông nom mấy em nhỏ."),
        ],
        exercises: [
          fb("Minh is the classmate ___ looks after the younger students.", "who", ["who", "which", "what", "where"], "“classmate” là người → dùng “who”."),
          fb("Science is the subject ___ I like best.", "which", ["which", "who", "whose", "when"], "“subject” là vật → dùng “which”."),
          so(["is", "This", "the", "which", "canteen", "always", "is", "crowded"], "This is the canteen which is always crowded", "Đây là căng tin lúc nào cũng đông."),
          so(["who", "Nam", "is", "the", "classmate", "helps", "me"], "Nam is the classmate who helps me", "Nam là bạn cùng lớp hay giúp tớ."),
          viEn("Đây là bạn cùng lớp giúp tớ làm bài tập.", "This is the classmate who helps me with my homework.", ["This is the classmate who helps me with my homework.", "This is the classmate which helps me with my homework.", "This is the classmate who he helps me with my homework.", "This is the classmate helps me with my homework."], "Người → “who”, và “who” đã là chủ ngữ nên không thêm “he”."),
          viEn("Khoa học là môn học mà tớ thích nhất.", "Science is the subject which I like best.", ["Science is the subject which I like best.", "Science is the subject who I like best.", "Science is the subject which I like it best.", "Science is subject which I like best."], "Vật → “which”; và không lặp lại tân ngữ “it”."),
          enVi("The canteen which is next to the library is always crowded.", "Căng tin nằm cạnh thư viện lúc nào cũng đông.", ["Căng tin nằm cạnh thư viện lúc nào cũng đông.", "Thư viện nằm cạnh căng tin lúc nào cũng đông.", "Căng tin cạnh thư viện hôm nay rất vắng.", "Căng tin và thư viện đều rất đông."]),
          enVi("I get on with the students who take part in the music club.", "Tớ chơi hợp với các bạn tham gia câu lạc bộ âm nhạc.", ["Tớ chơi hợp với các bạn tham gia câu lạc bộ âm nhạc.", "Tớ không hợp với các bạn ở câu lạc bộ âm nhạc.", "Tớ muốn tham gia câu lạc bộ âm nhạc.", "Các bạn câu lạc bộ âm nhạc rất vui tính."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 2 ───────────────────────────
  {
    topic: "Studying Online",
    sections: [
      {
        id: "rm-ke-02",
        title: "If … , … will … — câu điều kiện loại 1",
        titleEn: "First conditional",
        structure: "If + hiện tại đơn, chủ ngữ + will + động từ nguyên thể",
        breakdown: [
          part("If the connection stops", "Vế điều kiện", "Sau “if” dùng HIỆN TẠI ĐƠN, dù đang nói chuyện tương lai."),
          part("I will read", "will + động từ nguyên thể", "Vế kết quả mới được dùng “will”."),
          part("the slides later", "Phần còn lại", "Chuyện sẽ xảy ra nếu điều kiện thành sự thật."),
        ],
        explanation:
          "Câu điều kiện loại 1 nói về việc CÓ THỂ xảy ra thật trong tương lai:\n- If the connection stops, I will read the slides later.\n- I will turn on my microphone if the teacher asks me.\nHai điều phải nhớ:\n- Sau “if” KHÔNG dùng “will”: ✘ If the connection will stop…\n- Vế kết quả dùng “will + động từ trần” (phủ định: won’t).\nHai vế đổi chỗ được: vế “if” đứng trước thì có dấu phẩy, đứng sau thì không.",
        usage: "Dùng khi em nói về kế hoạch học trực tuyến: mạng rớt thì làm gì, xong bài sớm thì làm gì.",
        mistakes: [
          mis("If the connection will stop, I will call you.", "If the connection stops, I will call you.", "Sau “if” dùng hiện tại đơn, không dùng “will”."),
          mis("If I log in late, I miss the quiz.", "If I log in late, I will miss the quiz.", "Vế kết quả nói chuyện sắp tới nên cần “will”."),
          mis("If you turn on your microphone, everybody will hears you.", "If you turn on your microphone, everybody will hear you.", "Sau “will” là động từ trần, không thêm -s."),
        ],
        examples: [
          ex("Khi mạng yếu", "If my connection stops, I will read the slides later.", "Nếu mạng nhà tớ rớt, lát nữa tớ sẽ đọc lại slide."),
          ex("Khi lớp ồn", "If you turn on your microphone, everybody will hear your dog.", "Nếu bạn bật micro lên, cả lớp sẽ nghe thấy tiếng chó nhà bạn."),
          ex("Khi xong bài sớm", "If we finish early, we will make a quiz for the others.", "Nếu xong sớm, bọn tớ sẽ làm một bài quiz cho các bạn khác."),
        ],
        exercises: [
          fb("If the connection ___, I will read the slides later.", "stops", ["stops", "will stop", "stopped", "is stop"], "Sau “if” dùng hiện tại đơn."),
          fb("If you log in late, you ___ the first quiz.", "will miss", ["will miss", "will misses", "are missing", "missed"], "Vế kết quả dùng “will + động từ nguyên thể”."),
          so(["will", "We", "use", "headphones", "if", "the", "room", "is", "noisy"], "We will use headphones if the room is noisy", "Nếu phòng ồn, bọn tớ sẽ dùng tai nghe."),
          so(["you", "If", "don’t", "concentrate", "you", "will", "forget", "everything"], "If you don’t concentrate you will forget everything", "Nếu không tập trung, bạn sẽ quên hết."),
          viEn("Nếu mạng rớt, tớ sẽ đọc lại slide.", "If the connection stops, I will read the slides again.", ["If the connection stops, I will read the slides again.", "If the connection will stop, I will read the slides again.", "If the connection stops, I read the slides again.", "If the connection stop, I will read the slides again."], "Sau “if” dùng hiện tại đơn, vế sau mới dùng “will”."),
          viEn("Nếu bạn quên tắt micro, cả lớp sẽ nghe thấy.", "If you forget to mute your microphone, everybody will hear you.", ["If you forget to mute your microphone, everybody will hear you.", "If you will forget to mute your microphone, everybody will hear you.", "If you forget to mute your microphone, everybody hears you.", "If you forget to mute your microphone, everybody will hears you."], "Sau “if” là hiện tại đơn; sau “will” là động từ trần."),
          enVi("If I find out the password, I will send it to you.", "Nếu tớ tìm ra mật khẩu, tớ sẽ gửi cho cậu.", ["Nếu tớ tìm ra mật khẩu, tớ sẽ gửi cho cậu.", "Tớ đã tìm ra mật khẩu và gửi cho cậu rồi.", "Nếu cậu tìm ra mật khẩu, hãy gửi cho tớ.", "Tớ không biết mật khẩu là gì."]),
          enVi("If we finish early, we will make a quiz for the class.", "Nếu xong sớm, bọn tớ sẽ làm một bài quiz cho cả lớp.", ["Nếu xong sớm, bọn tớ sẽ làm một bài quiz cho cả lớp.", "Bọn tớ đã làm một bài quiz cho cả lớp.", "Nếu bọn tớ làm quiz, cả lớp sẽ xong sớm.", "Cả lớp sẽ làm một bài quiz rất khó."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 3 ───────────────────────────
  {
    topic: "Exams and Stress",
    sections: [
      {
        id: "rm-ke-03",
        title: "should · must · have to — khuyên và bắt buộc",
        titleEn: "Modals: should / must / have to",
        structure: "Chủ ngữ + should / must / have to + động từ nguyên thể",
        breakdown: [
          part("You", "Chủ ngữ", "Người nhận lời khuyên hoặc phải làm theo quy định."),
          part("should", "Động từ khuyết thiếu", "should = nên · must = phải (tự mình thấy cần) · have to = phải (quy định bên ngoài)."),
          part("take a deep breath", "Động từ nguyên thể", "Sau should và must là động từ trần: không “to”, không -s."),
        ],
        explanation:
          "Ba cách nói “nên / phải”, khác nhau ở mức độ:\n- should — lời khuyên nhẹ nhàng: You should revise a little every day.\n- must — chính người nói thấy rất cần: I must revise tonight.\n- have to — quy định từ bên ngoài (nhà trường, thầy cô): We have to hand in our answers before the bell.\nSau should và must luôn là động từ trần. Riêng “have to” đổi theo chủ ngữ: he / she / it → has to.\nPhủ định: shouldn’t (không nên) · mustn’t (cấm) · don’t have to (không bắt buộc).",
        usage: "Dùng khi em khuyên bạn cách ôn thi, hoặc nói về quy định của kỳ thi.",
        mistakes: [
          mis("You should to rest before the exam.", "You should rest before the exam.", "Sau “should” không có “to”."),
          mis("He should takes a deep breath.", "He should take a deep breath.", "Sau “should” là động từ trần, không thêm -s."),
          mis("She have to revise two subjects tonight.", "She has to revise two subjects tonight.", "“have to” đổi theo chủ ngữ: he / she / it → has to."),
        ],
        examples: [
          ex("Khi khuyên bạn ôn tập", "You should revise a little every day.", "Bạn nên ôn một chút mỗi ngày."),
          ex("Khi bạn quá lo", "You should take a deep breath and stay calm.", "Bạn nên hít một hơi thật sâu và bình tĩnh lại."),
          ex("Khi nói về quy định", "We have to hand in our answers before the bell.", "Bọn tớ phải nộp bài trước khi chuông reo."),
        ],
        exercises: [
          fb("You ___ take a deep breath and stay calm.", "should", ["should", "shoulds", "should to", "are should"], "“should” dùng nguyên dạng cho mọi chủ ngữ."),
          fb("She ___ revise two subjects tonight.", "has to", ["has to", "have to", "has", "must to"], "“She” là ngôi thứ ba số ít → has to."),
          so(["should", "You", "never", "give", "up"], "You should never give up", "Bạn đừng bao giờ bỏ cuộc."),
          so(["have", "We", "to", "hand", "in", "our", "answers"], "We have to hand in our answers", "Bọn tớ phải nộp bài."),
          viEn("Bạn nên ôn một chút mỗi ngày.", "You should revise a little every day.", ["You should revise a little every day.", "You should to revise a little every day.", "You should revising a little every day.", "You shoulds revise a little every day."], "should + động từ nguyên thể."),
          viEn("Cậu ấy phải nộp bài trước bốn giờ.", "He has to hand in his paper before four o’clock.", ["He has to hand in his paper before four o’clock.", "He have to hand in his paper before four o’clock.", "He has hand in his paper before four o’clock.", "He must to hand in his paper before four o’clock."], "“He” → has to, và sau đó là động từ nguyên thể."),
          enVi("You shouldn’t worry about one bad mark.", "Bạn không nên lo lắng vì một điểm kém.", ["Bạn không nên lo lắng vì một điểm kém.", "Bạn phải lo lắng vì một điểm kém.", "Bạn không được để bị điểm kém.", "Một điểm kém không phải lỗi của bạn."]),
          enVi("We don’t have to stay after the exam.", "Bọn tớ không bắt buộc phải ở lại sau khi thi.", ["Bọn tớ không bắt buộc phải ở lại sau khi thi.", "Bọn tớ không được ở lại sau khi thi.", "Bọn tớ phải ở lại sau khi thi.", "Bọn tớ sẽ ở lại sau khi thi."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 4 ───────────────────────────
  {
    topic: "Free Time",
    sections: [
      {
        id: "rm-ke-04",
        title: "at · on · in — giới từ thời gian",
        titleEn: "Prepositions of time",
        structure: "at + giờ · on + thứ, ngày · in + buổi, tháng, mùa",
        breakdown: [
          part("at half past four", "at + giờ", "Giờ chính xác, và các cụm at night, at the weekend."),
          part("on Saturday morning", "on + thứ, ngày", "Thứ trong tuần, ngày tháng, buổi của một ngày CỤ THỂ."),
          part("in the afternoon", "in + buổi, tháng, mùa, năm", "Khoảng thời gian chung, dài hơn một buổi cụ thể."),
        ],
        explanation:
          "Tiếng Việt chỉ có một chữ “vào”, nên phải nhớ theo nhóm:\n- at + giờ: at four o’clock · at the weekend · at night\n- on + thứ / ngày: on Friday · on Saturday morning · on 2 September\n- in + buổi / tháng / mùa / năm: in the afternoon · in July · in summer\nMẹo: buổi nói chung thì “in the morning”, nhưng gắn với một thứ cụ thể thì đổi sang “on”: on Saturday morning.\nSố lần thì dùng once / twice / three times + a week: I play badminton twice a week.",
        usage: "Dùng khi em kể lịch sinh hoạt lúc rảnh: chơi thể thao khi nào, đi chơi với bạn khi nào.",
        mistakes: [
          mis("I play chess in Saturday.", "I play chess on Saturday.", "Thứ trong tuần đi với “on”."),
          mis("We hang out in the weekend.", "We hang out at the weekend.", "“the weekend” luôn đi với “at”."),
          mis("I go to the park two times in a week.", "I go to the park twice a week.", "Số lần nói là “twice a week”, không dùng “in”."),
        ],
        examples: [
          ex("Khi kể lịch tập", "I play badminton with my father twice a week.", "Tớ chơi cầu lông với bố tuần hai lần."),
          ex("Khi kể cuối tuần", "We hang out in the park at the weekend.", "Cuối tuần bọn tớ đi chơi ở công viên."),
          ex("Khi kể sáng thứ Bảy", "On Saturday morning I read comics in bed.", "Sáng thứ Bảy tớ nằm trên giường đọc truyện tranh."),
        ],
        exercises: [
          fb("I read my comics ___ Saturday morning.", "on", ["on", "in", "at", "for"], "Buổi gắn với một thứ cụ thể → dùng “on”."),
          fb("Many students take up a new hobby ___ the summer.", "in", ["in", "on", "at", "to"], "Mùa trong năm → dùng “in”."),
          so(["badminton", "I", "play", "twice", "a", "week"], "I play badminton twice a week", "Tớ chơi cầu lông tuần hai lần."),
          so(["hang", "We", "out", "at", "the", "weekend"], "We hang out at the weekend", "Cuối tuần bọn tớ đi chơi với nhau."),
          viEn("Cuối tuần tớ chơi cờ vua với anh trai.", "I play chess with my brother at the weekend.", ["I play chess with my brother at the weekend.", "I play chess with my brother in the weekend.", "I play chess with my brother on weekend.", "I play chess with my brother at weekend."], "“the weekend” luôn đi với “at”."),
          viEn("Thứ Sáu bọn tớ tham gia câu lạc bộ trượt ván.", "We join in the skateboard club on Friday.", ["We join in the skateboard club on Friday.", "We join in the skateboard club in Friday.", "We join in the skateboard club at Friday.", "We join in the skateboard club on the Friday."], "Thứ trong tuần → “on”."),
          enVi("I am never bored in the afternoon.", "Buổi chiều tớ chẳng bao giờ thấy chán.", ["Buổi chiều tớ chẳng bao giờ thấy chán.", "Buổi sáng tớ chẳng bao giờ thấy chán.", "Buổi chiều tớ hay thấy chán.", "Tớ thấy chán cả ngày."]),
          enVi("The park is quiet at seven in the morning.", "Bảy giờ sáng công viên rất yên tĩnh.", ["Bảy giờ sáng công viên rất yên tĩnh.", "Bảy giờ tối công viên rất yên tĩnh.", "Công viên lúc nào cũng yên tĩnh.", "Bảy giờ sáng công viên rất đông."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 5 ───────────────────────────
  {
    topic: "Social Media",
    sections: [
      {
        id: "rm-ke-05",
        title: "have · has + V3 — hiện tại hoàn thành",
        titleEn: "Present perfect",
        structure: "Chủ ngữ + have / has + động từ dạng V3",
        breakdown: [
          part("Bao", "Chủ ngữ", "he / she / it → has · I / you / we / they → have."),
          part("has changed", "have hoặc has + V3", "V3 là dạng thứ ba: changed, posted, sent, written, seen…"),
          part("all his settings", "Phần còn lại", "Việc đã xảy ra nhưng KHÔNG nói rõ lúc nào."),
        ],
        explanation:
          "Hiện tại hoàn thành kể việc đã xảy ra mà vẫn còn liên quan tới bây giờ, và KHÔNG kèm mốc thời gian quá khứ:\n- Bao has already changed all his settings. (nên giờ tài khoản của Bảo an toàn)\n- I have never shared my password.\nCác từ hay đi kèm:\n- already (rồi) và just (vừa mới) đứng GIỮA have/has và V3\n- yet (chưa) đứng cuối câu hỏi và câu phủ định\n- ever / never — đã từng / chưa bao giờ\nCó mốc quá khứ rõ (yesterday, last night) thì phải dùng quá khứ đơn.",
        usage: "Dùng khi em kể những việc mình đã làm để giữ an toàn trên mạng.",
        mistakes: [
          mis("She have posted a new photo.", "She has posted a new photo.", "“She” đi với “has”."),
          mis("I have log out already.", "I have already logged out.", "Sau have/has phải là dạng V3, và “already” đứng ở giữa."),
          mis("I have seen a rude comment last night.", "I saw a rude comment last night.", "Có mốc quá khứ “last night” thì dùng quá khứ đơn."),
        ],
        examples: [
          ex("Khi kể việc đã làm xong", "Bao has already changed all his settings.", "Bảo đã đổi hết cài đặt rồi."),
          ex("Khi nói chưa bao giờ", "I have never shared my password with anybody.", "Tớ chưa bao giờ cho ai mật khẩu."),
          ex("Khi hỏi bạn", "Have you logged out yet?", "Cậu đăng xuất chưa?"),
        ],
        exercises: [
          fb("Bao ___ already changed all his settings.", "has", ["has", "have", "is", "was"], "“Bao” là ngôi thứ ba số ít → has."),
          fb("I have never ___ my password with anybody.", "shared", ["shared", "share", "shares", "sharing"], "Sau have / has là dạng V3."),
          so(["have", "I", "never", "posted", "a", "rude", "comment"], "I have never posted a rude comment", "Tớ chưa bao giờ đăng một bình luận khiếm nhã."),
          so(["you", "Have", "logged", "out", "yet"], "Have you logged out yet", "Cậu đăng xuất chưa?"),
          viEn("Bạn ấy đã đổi mật khẩu rồi.", "She has already changed her password.", ["She has already changed her password.", "She have already changed her password.", "She has already change her password.", "She is already changed her password."], "“She” + has + V3."),
          viEn("Tớ chưa bao giờ nhắn tin cho người lạ.", "I have never sent a message to a stranger.", ["I have never sent a message to a stranger.", "I have never send a message to a stranger.", "I has never sent a message to a stranger.", "I am never sent a message to a stranger."], "have + never + V3."),
          enVi("My teacher has warned us about strangers online.", "Cô giáo đã dặn bọn tớ về người lạ trên mạng.", ["Cô giáo đã dặn bọn tớ về người lạ trên mạng.", "Cô giáo sẽ dặn bọn tớ về người lạ trên mạng.", "Bọn tớ đã kể với cô giáo về một người lạ trên mạng.", "Cô giáo chưa dặn gì về người lạ trên mạng."]),
          enVi("I have just switched off my phone.", "Tớ vừa tắt điện thoại xong.", ["Tớ vừa tắt điện thoại xong.", "Tớ sắp tắt điện thoại.", "Tớ quên tắt điện thoại.", "Điện thoại của tớ vừa hết pin."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 6 ───────────────────────────
  {
    topic: "Music and Films",
    sections: [
      {
        id: "rm-ke-06",
        title: "enjoy · mind · practise + V-ing",
        titleEn: "Verb + -ing",
        structure: "enjoy / mind / practise / finish + động từ-ing",
        breakdown: [
          part("I enjoy", "Động từ chính", "enjoy, mind, practise, finish, keep, hate — nhóm luôn kéo theo -ing."),
          part("listening", "Động từ + -ing", "Động từ thứ hai thêm -ing và không chia thì."),
          part("to old songs", "Phần còn lại", "Tân ngữ của động từ -ing."),
        ],
        explanation:
          "Một số động từ luôn đi với động từ -ing, KHÔNG đi với “to”:\nenjoy · mind · practise · finish · keep · hate\n- I enjoy listening to old songs.\n- Do you mind turning the music down?\n- She practises playing the guitar every evening.\nV-ing cũng dùng được ở ĐẦU CÂU như một danh từ:\n- Watching cartoons with subtitles helps me learn new words.\nChính tả: dance → dancing (bỏ e) · sit → sitting (gấp đôi phụ âm).",
        usage: "Dùng khi em nói về chuyện nghe nhạc, xem phim mình thích hoặc không thích.",
        mistakes: [
          mis("I enjoy to listen to music.", "I enjoy listening to music.", "Sau “enjoy” là động từ -ing, không phải “to”."),
          mis("Do you mind turn the music down?", "Do you mind turning the music down?", "Sau “mind” phải thêm -ing."),
          mis("She practises to play the guitar.", "She practises playing the guitar.", "Sau “practise” là động từ -ing."),
        ],
        examples: [
          ex("Khi nói về nhạc", "I enjoy listening to the lyrics of old songs.", "Tớ thích nghe lời của những bài hát xưa."),
          ex("Khi nhờ vặn nhỏ nhạc", "Do you mind turning the music down?", "Cậu vặn nhỏ nhạc lại được không?"),
          ex("Khi nói về việc học", "Watching cartoons with subtitles helps me learn new words.", "Xem hoạt hình có phụ đề giúp tớ học từ mới."),
        ],
        exercises: [
          fb("I enjoy ___ to old Vietnamese songs.", "listening", ["listening", "listen", "to listen", "listens"], "Sau “enjoy” là động từ -ing."),
          fb("Do you mind ___ the music down?", "turning", ["turning", "turn", "to turn", "turns"], "Sau “mind” là động từ -ing."),
          so(["practises", "She", "playing", "the", "guitar", "every", "evening"], "She practises playing the guitar every evening", "Tối nào bạn ấy cũng tập đàn ghi-ta."),
          so(["enjoy", "We", "watching", "exciting", "films"], "We enjoy watching exciting films", "Bọn tớ thích xem phim gay cấn."),
          viEn("Tớ thích đọc lời bài hát.", "I enjoy reading the lyrics.", ["I enjoy reading the lyrics.", "I enjoy to read the lyrics.", "I enjoy read the lyrics.", "I am enjoy reading the lyrics."], "enjoy + động từ -ing."),
          viEn("Em trai tớ không ngại xem phim có phụ đề.", "My brother doesn’t mind watching films with subtitles.", ["My brother doesn’t mind watching films with subtitles.", "My brother doesn’t mind to watch films with subtitles.", "My brother doesn’t minds watching films with subtitles.", "My brother doesn’t mind watch films with subtitles."], "Sau “mind” là -ing; đã có “doesn’t” thì “mind” giữ nguyên dạng."),
          enVi("My father keeps turning the music up.", "Bố tớ cứ vặn nhạc to lên.", ["Bố tớ cứ vặn nhạc to lên.", "Bố tớ vặn nhạc nhỏ lại.", "Bố tớ thích nghe nhạc to.", "Bố tớ đã tắt nhạc đi rồi."]),
          enVi("Singing in the school band is my favourite hobby.", "Hát trong ban nhạc của trường là sở thích tớ mê nhất.", ["Hát trong ban nhạc của trường là sở thích tớ mê nhất.", "Tớ muốn vào ban nhạc của trường.", "Ban nhạc của trường hát rất hay.", "Sở thích của tớ là nghe ban nhạc trường hát."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 7 ───────────────────────────
  {
    topic: "Travel",
    sections: [
      {
        id: "rm-ke-07",
        title: "was · were + V-ing — quá khứ tiếp diễn",
        titleEn: "Past continuous",
        structure: "Chủ ngữ + was / were + động từ-ing",
        breakdown: [
          part("We", "Chủ ngữ", "I, he, she, it → was · you, we, they → were."),
          part("were waiting", "was / were + V-ing", "Việc ĐANG diễn ra tại một lúc nào đó trong quá khứ."),
          part("on platform two", "Phần còn lại", "Nơi chốn hoặc thời điểm của việc đang diễn ra."),
        ],
        explanation:
          "Quá khứ tiếp diễn tả việc đang diễn ra tại một thời điểm trong quá khứ:\n- At nine o’clock we were waiting on platform two.\nHay đi cùng quá khứ đơn để kể chuyện:\n- While we were looking at the map, the guide called our names.\n  (việc DÀI dùng tiếp diễn · việc NGẮN xen vào dùng quá khứ đơn)\n- while + quá khứ tiếp diễn · when + quá khứ đơn\nPhủ định: wasn’t / weren’t + V-ing.",
        usage: "Dùng khi em kể chuyện trên đường đi: lúc đó cả nhà đang làm gì.",
        mistakes: [
          mis("At nine o’clock we waiting on the platform.", "At nine o’clock we were waiting on the platform.", "Quá khứ tiếp diễn phải có was hoặc were."),
          mis("We was checking in at the airport.", "We were checking in at the airport.", "“We” đi với “were”."),
          mis("While we were wait for the train, it started to rain.", "While we were waiting for the train, it started to rain.", "Sau was / were thì động từ phải thêm -ing."),
        ],
        examples: [
          ex("Khi kể lúc chờ tàu", "At nine o’clock we were waiting on platform two.", "Chín giờ tối cả nhà đang đứng chờ ở sân ga số hai."),
          ex("Khi kể việc xen vào", "While we were looking at the map, the guide called our names.", "Trong lúc bọn tớ đang xem bản đồ thì cô hướng dẫn gọi tên."),
          ex("Khi tả buổi sáng trên tàu", "The sun was rising when I opened the curtain.", "Mặt trời đang lên khi tớ kéo rèm ra."),
        ],
        exercises: [
          fb("At nine o’clock we ___ waiting on platform two.", "were", ["were", "was", "are", "did"], "“we” đi với “were”."),
          fb("While I ___ the map, my sister fell asleep.", "was reading", ["was reading", "were reading", "am reading", "was read"], "“I” đi với “was”, và động từ thêm -ing."),
          so(["were", "We", "checking", "in", "at", "the", "airport"], "We were checking in at the airport", "Cả nhà đang làm thủ tục ở sân bay."),
          so(["was", "The", "train", "leaving", "the", "station"], "The train was leaving the station", "Con tàu đang rời ga."),
          viEn("Lúc đó cả nhà đang chờ ở sân ga.", "We were waiting on the platform.", ["We were waiting on the platform.", "We was waiting on the platform.", "We were wait on the platform.", "We are waiting on the platform."], "“We” + were + động từ -ing."),
          viEn("Trong lúc tớ đang ngủ, tàu đã tới Huế.", "While I was sleeping, the train arrived in Hue.", ["While I was sleeping, the train arrived in Hue.", "While I was sleep, the train arrived in Hue.", "While I were sleeping, the train arrived in Hue.", "While I am sleeping, the train arrived in Hue."], "Việc dài dùng tiếp diễn, việc ngắn xen vào dùng quá khứ đơn."),
          enVi("A man was carrying a guitar and a lot of luggage.", "Một chú đang ôm cây đàn ghi-ta và cả đống hành lý.", ["Một chú đang ôm cây đàn ghi-ta và cả đống hành lý.", "Một chú vừa mua một cây đàn ghi-ta mới.", "Một chú giúp bọn tớ xách hành lý.", "Cây đàn ghi-ta nằm cạnh đống hành lý."]),
          enVi("We were buying souvenirs when the guide arrived.", "Bọn tớ đang mua quà lưu niệm thì cô hướng dẫn tới.", ["Bọn tớ đang mua quà lưu niệm thì cô hướng dẫn tới.", "Bọn tớ mua quà lưu niệm sau khi cô hướng dẫn tới.", "Cô hướng dẫn đang mua quà lưu niệm.", "Bọn tớ định mua quà lưu niệm tặng cô hướng dẫn."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 8 ───────────────────────────
  {
    topic: "Food Around the World",
    sections: [
      {
        id: "rm-ke-08",
        title: "spicier than · the most delicious",
        titleEn: "Comparatives and superlatives",
        structure: "tính từ ngắn + -er / the … -est · more / the most + tính từ dài",
        breakdown: [
          part("This dish is spicier", "Tính từ ngắn + -er", "Một hoặc hai âm tiết: sweet → sweeter, spicy → spicier."),
          part("than that one", "than + vế so sánh", "So sánh hơn luôn cần “than”."),
          part("the most delicious meal", "the most + tính từ dài", "Từ ba âm tiết trở lên: delicious → the most delicious."),
        ],
        explanation:
          "So sánh hơn (hai thứ) và so sánh nhất (cả nhóm):\n- Tính từ NGẮN: sweet → sweeter than → the sweetest\n  · tận cùng -y: spicy → spicier → the spiciest\n  · một nguyên âm + một phụ âm: hot → hotter → the hottest\n- Tính từ DÀI (ba âm tiết trở lên): delicious → more delicious than → the most delicious\n- Bất quy tắc: good → better → the best · bad → worse → the worst\nSo sánh nhất luôn có “the” đứng trước.",
        usage: "Dùng khi em so sánh các món ăn của những nước khác nhau.",
        mistakes: [
          mis("This dish is more spicy than pho.", "This dish is spicier than pho.", "“spicy” là tính từ ngắn → bỏ y thêm -ier, không dùng “more”."),
          mis("The dessert is sweeter then the cake.", "The dessert is sweeter than the cake.", "So sánh dùng “than”, không phải “then”."),
          mis("It was the most good meal of the day.", "It was the best meal of the day.", "“good” bất quy tắc → better / the best."),
        ],
        examples: [
          ex("Khi so hai món", "The Korean dish is spicier than the Japanese one.", "Món Hàn Quốc cay hơn món Nhật."),
          ex("Khi chọn món ngon nhất", "Bun cha with fresh herbs is the most delicious dish on the table.", "Bún chả với rau thơm tươi là món ngon nhất trên bàn."),
          ex("Khi nói về món tráng miệng", "The mango dessert is sweeter than the cake.", "Món tráng miệng xoài ngọt hơn bánh."),
        ],
        exercises: [
          fb("The Korean dish is ___ than the Japanese one.", "spicier", ["spicier", "more spicy", "spiciest", "spicy"], "“spicy” tận cùng -y → bỏ y, thêm -ier."),
          fb("Bun cha is ___ delicious dish on the table.", "the most", ["the most", "the more", "most", "the delicious"], "Tính từ dài, so sánh nhất → “the most”."),
          so(["is", "This", "sauce", "sweeter", "than", "that", "one"], "This sauce is sweeter than that one", "Nước chấm này ngọt hơn cái kia."),
          so(["was", "It", "the", "best", "meal", "of", "the", "day"], "It was the best meal of the day", "Đó là bữa ngon nhất trong ngày."),
          viEn("Món này cay hơn phở.", "This dish is spicier than pho.", ["This dish is spicier than pho.", "This dish is more spicy than pho.", "This dish is spicier then pho.", "This dish is the spiciest than pho."], "Tính từ ngắn tận cùng -y → spicier, và cần “than”."),
          viEn("Đây là công thức dễ nhất trong sách.", "This is the easiest recipe in the book.", ["This is the easiest recipe in the book.", "This is the most easy recipe in the book.", "This is easiest recipe in the book.", "This is the easier recipe in the book."], "“easy” là tính từ ngắn → the easiest, và luôn có “the”."),
          enVi("Fresh herbs make the meal much tastier.", "Rau thơm tươi làm bữa ăn ngon hơn nhiều.", ["Rau thơm tươi làm bữa ăn ngon hơn nhiều.", "Rau thơm tươi làm bữa ăn cay hơn nhiều.", "Bữa ngon nhất là bữa có rau thơm tươi.", "Bữa ăn này cần thêm rau thơm tươi."]),
          enVi("This is the most popular dessert in my country.", "Đây là món tráng miệng được ưa chuộng nhất ở nước tớ.", ["Đây là món tráng miệng được ưa chuộng nhất ở nước tớ.", "Đây là món tráng miệng ngon nhất tớ từng ăn.", "Món tráng miệng này phổ biến hơn món kia.", "Nước tớ có rất nhiều món tráng miệng."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 9 ───────────────────────────
  {
    topic: "Volunteering",
    sections: [
      {
        id: "rm-ke-09",
        title: "want · decide · promise + to V",
        titleEn: "Verb + to-infinitive",
        structure: "Chủ ngữ + want / decide / promise / hope + to + động từ nguyên thể",
        breakdown: [
          part("Our class", "Chủ ngữ", "Người quyết định làm việc đó."),
          part("has decided", "Động từ chính", "want, decide, promise, hope, need, agree, offer — nhóm đi với “to”."),
          part("to raise money", "to + động từ nguyên thể", "Sau “to” là động từ trần: không -s, không -ed, không -ing."),
        ],
        explanation:
          "Một số động từ kéo theo “to + động từ nguyên thể”:\nwant · decide · promise · hope · need · agree · offer · learn\n- Our class has decided to raise money for the hospital.\n- I promised to go to the beach clean-up again in July.\nNhớ phân biệt với nhóm ở bài “Music and Films” (enjoy, mind, practise) — nhóm đó đi với -ing.\nCòn “ask / tell / want + AI ĐÓ + to V”: My sister asked me to help out.",
        usage: "Dùng khi em nói về dự định và lời hứa trong các hoạt động tình nguyện.",
        mistakes: [
          mis("We decided raise money for the hospital.", "We decided to raise money for the hospital.", "Sau “decide” phải có “to”."),
          mis("I promised to helped out on Sunday.", "I promised to help out on Sunday.", "Sau “to” là động từ trần, không chia."),
          mis("My sister asked me help out.", "My sister asked me to help out.", "“ask ai đó TO làm gì” — không được bỏ “to”."),
        ],
        examples: [
          ex("Khi nói kế hoạch của lớp", "Our class has decided to raise money for the children’s hospital.", "Lớp tớ đã quyết định gây quỹ cho bệnh viện nhi."),
          ex("Khi hứa với ai đó", "I promised to go to the beach clean-up again in July.", "Tớ đã hứa tháng Bảy sẽ lại đi dọn rác bãi biển."),
          ex("Khi rủ bạn cùng làm", "We need to pick up every piece of plastic.", "Bọn mình cần nhặt hết từng mảnh nhựa."),
        ],
        exercises: [
          fb("Our class has decided ___ money for the hospital.", "to raise", ["to raise", "raise", "raising", "to raising"], "Sau “decide” là “to + động từ nguyên thể”."),
          fb("My neighbour promised ___ out on Sunday.", "to help", ["to help", "help", "helping", "to helping"], "Sau “promise” là “to + động từ nguyên thể”."),
          so(["want", "We", "to", "clean", "up", "the", "park"], "We want to clean up the park", "Bọn tớ muốn dọn sạch công viên."),
          so(["asked", "My", "sister", "me", "to", "help", "out"], "My sister asked me to help out", "Chị tớ rủ tớ đi giúp một tay."),
          viEn("Bọn tớ quyết định quyên góp chăn cho viện dưỡng lão.", "We decided to donate blankets to the old people’s home.", ["We decided to donate blankets to the old people’s home.", "We decided donate blankets to the old people’s home.", "We decided to donating blankets to the old people’s home.", "We decided to donated blankets to the old people’s home."], "decide + to + động từ nguyên thể."),
          viEn("Tớ hứa sẽ nhặt hết rác nhựa.", "I promised to pick up all the plastic rubbish.", ["I promised to pick up all the plastic rubbish.", "I promised pick up all the plastic rubbish.", "I promised to picking up all the plastic rubbish.", "I promised to picked up all the plastic rubbish."], "promise + to + động từ nguyên thể."),
          enVi("The old man was grateful for a simple conversation.", "Ông cụ biết ơn chỉ vì một cuộc trò chuyện giản dị.", ["Ông cụ biết ơn chỉ vì một cuộc trò chuyện giản dị.", "Ông cụ muốn nói chuyện thêm một lát nữa.", "Ông cụ kể cho bọn tớ nghe một câu chuyện giản dị.", "Bọn tớ biết ơn ông cụ vì câu chuyện của ông."]),
          enVi("Sixty students agreed to clean up the beach.", "Sáu mươi bạn học sinh đã đồng ý đi dọn sạch bãi biển.", ["Sáu mươi bạn học sinh đã đồng ý đi dọn sạch bãi biển.", "Sáu mươi bạn học sinh đã dọn sạch cả bãi biển.", "Bãi biển sạch được là nhờ sáu mươi bạn học sinh.", "Sáu mươi bạn học sinh muốn ra biển chơi."]),
        ],
      },
    ],
  },
];
