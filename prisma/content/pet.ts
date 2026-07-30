// Nội dung bài học cấp `pet` — B1 Preliminary for Schools (13–15 tuổi).
// Xem hợp đồng + hướng dẫn soạn theo cấp ở prisma/content/types.ts.
//
// Ở cấp này phần "Phonics" KHÔNG còn dạy chữ cái nữa mà dạy NGỮ ĐIỆU:
// lên/xuống giọng cuối câu, nhấn từ để đổi nghĩa, nhịp câu, nối âm, ngắt ý.
// Đây đúng là chỗ người Việt nói tiếng Anh hay bị "đều đều" nhất.
import { type ChapterSeed, mcq, tf, word } from "./types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 1 · Quan điểm của em",
    subtitle: "Nêu ý kiến, đưa lý lẽ và bảo vệ quan điểm bằng tiếng Anh",
    lessons: [
      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Technology in Our Lives",
        topicVi: "Công nghệ trong cuộc sống",
        icon: "📱",
        words: [
          word("technology", "/tekˈnɒlədʒi/", "công nghệ", "💻"),
          word("device", "/dɪˈvaɪs/", "thiết bị (điện thoại, máy tính bảng…)", "📱"),
          word("screen", "/skriːn/", "màn hình", "🖥️"),
          word("connect", "/kəˈnekt/", "kết nối, gắn kết", "🔗"),
          word("useful", "/ˈjuːsfl/", "hữu ích", "👍"),
          word("harmful", "/ˈhɑːmfl/", "có hại", "⚠️"),
          word("balance", "/ˈbæləns/", "sự cân bằng", "⚖️"),
          word("distraction", "/dɪˈstrækʃn/", "thứ làm ta xao nhãng", "🌀"),
          word("research", "/rɪˈsɜːtʃ/", "tra cứu, tìm hiểu", "🔍"),
          word("depend on", "/dɪˈpend ɒn/", "phụ thuộc vào", "🧲"),
          word("take part in", "/teɪk pɑːt ɪn/", "tham gia vào", "🙋"),
          word("make a decision", "/meɪk ə dɪˈsɪʒn/", "đưa ra quyết định", "🤔"),
          word("however", "/haʊˈevə(r)/", "tuy nhiên", "↔️"),
          word("although", "/ɔːlˈðəʊ/", "mặc dù", "🔀"),
          word("limit", "/ˈlɪmɪt/", "giới hạn, mức tối đa", "⏱️"),
        ],
        sound: {
          letters: "↗ ↘ cuối câu hỏi",
          sound: "/lên giọng · xuống giọng/",
          hint: "Câu hỏi Yes/No (Do you…? Is it…?) LÊN giọng ở cuối ↗. Câu hỏi Wh- (What…? Why…?) XUỐNG giọng ở cuối ↘. Tiếng Việt đã có 6 thanh điệu trong TỪNG TỪ nên người Việt thường đọc đúng thanh của từ rồi kết câu bằng giọng đều đều — nghe như đang đọc bảng chữ, không giống đang hỏi. Cách sửa: giữ hơi lại ở từ cuối rồi đẩy giọng vọt lên (Yes/No) hoặc thả rơi xuống (Wh-). Nhớ giữ đủ phụ âm cuối khi lên giọng: không phải \"li-mi\" mà là limi-T, không phải \"scree\" mà là scree-N.",
          words: [
            { word: "Do you use it every day? ↗", meaning: "Bạn dùng nó hằng ngày à? (lên giọng)", emoji: "❓" },
            { word: "Why do you use it? ↘", meaning: "Vì sao bạn dùng nó? (xuống giọng)", emoji: "🔽" },
            { word: "Is technology harmful? ↗", meaning: "Công nghệ có hại không? (lên giọng)", emoji: "⚠️" },
            { word: "What is the limit? ↘", meaning: "Giới hạn là bao nhiêu? (xuống giọng)", emoji: "⏱️" },
          ],
        },
        reading: {
          title: "Should Phones Be Allowed at School?",
          passage: `Every morning at my school in Da Nang, phones are collected in a box before the first lesson. Many students think that this rule is unfair, but I am not so sure.

Technology is clearly useful. If I need to research a topic for a project, a good device gives me an answer in seconds. Our science club uses a free app to record the weather, and last year we took part in an online competition with a school in Singapore. Without the internet, that would have been impossible.

However, I have also seen the other side. A phone on the desk is a powerful distraction. My friend Minh once told me that he had checked his messages forty times in a single afternoon. Although he is a clever student, his marks fell, and in the end he asked his parents to set a daily limit on his screen time.

The real problem is not technology; the real problem is balance. If phones were banned completely, we would lose a brilliant learning tool. If they were allowed all day, very few of us would concentrate. My suggestion is simple: phones should be used in class only when a teacher asks for them, and they should stay in bags the rest of the time.

Every student has to make a decision about how much to depend on a screen, and nobody can make that decision for us. Technology is neither good nor harmful by itself. It becomes what we choose to do with it, so learning to connect with the people around us matters more than any app.`,
          translation: `Sáng nào ở trường tớ tại Đà Nẵng, điện thoại cũng bị thu vào một chiếc hộp trước tiết đầu tiên. Nhiều bạn cho rằng quy định này thật bất công, nhưng tớ thì chưa chắc.

Công nghệ rõ ràng rất hữu ích. Nếu tớ cần tra cứu một chủ đề cho bài dự án, một thiết bị tốt sẽ cho tớ câu trả lời chỉ trong vài giây. Câu lạc bộ khoa học của tụi tớ dùng một ứng dụng miễn phí để ghi lại thời tiết, và năm ngoái tụi tớ đã tham gia một cuộc thi trực tuyến với một trường ở Singapore. Không có internet thì chuyện đó là bất khả thi.

Tuy nhiên, tớ cũng đã thấy mặt còn lại. Một chiếc điện thoại nằm trên bàn là thứ gây xao nhãng cực mạnh. Minh, bạn tớ, có lần kể rằng cậu ấy đã xem tin nhắn tới bốn mươi lần chỉ trong một buổi chiều. Mặc dù Minh học thông minh, điểm của cậu ấy vẫn tụt, và cuối cùng cậu ấy đã nhờ bố mẹ đặt giới hạn thời gian dùng màn hình mỗi ngày.

Vấn đề thật sự không nằm ở công nghệ; vấn đề thật sự là sự cân bằng. Nếu điện thoại bị cấm hoàn toàn, chúng ta sẽ mất một công cụ học tuyệt vời. Nếu được dùng cả ngày, rất ít bạn tập trung nổi. Đề xuất của tớ đơn giản thôi: chỉ dùng điện thoại trong lớp khi thầy cô yêu cầu, còn lại thì để yên trong cặp.

Mỗi học sinh đều phải tự đưa ra quyết định xem mình sẽ phụ thuộc vào màn hình đến mức nào, và không ai quyết định thay được. Bản thân công nghệ không tốt cũng không có hại. Nó trở thành thứ mà ta chọn làm với nó, nên học cách kết nối với những người quanh mình còn quan trọng hơn bất kỳ ứng dụng nào.`,
          questions: [
            mcq(
              "What is the writer's main message?",
              "Thông điệp chính của người viết là gì?",
              [
                "Schools should never collect students' phones.",
                "Technology is not good or bad in itself; how we use it decides.",
                "Students learn better from books than from the internet.",
                "Online competitions are the best way to study science.",
              ],
              1,
              "Cả bài đưa ra HAI mặt: công nghệ giúp tra cứu và thi trực tuyến, nhưng cũng gây xao nhãng. Đoạn cuối chốt lại rằng công nghệ tự nó không tốt cũng không xấu, quan trọng là ta chọn dùng thế nào. Đó chính là ý chính, không phải chuyện cấm hay không cấm.",
            ),
            mcq(
              "What did the writer's science club do last year?",
              "Câu lạc bộ khoa học của người viết đã làm gì vào năm ngoái?",
              [
                "They visited a school in Singapore.",
                "They built a weather station in the playground.",
                "They joined an online competition with a school in Singapore.",
                "They wrote an app to record the weather.",
              ],
              2,
              "Bài viết nói rõ tụi tớ đã THAM GIA một cuộc thi TRỰC TUYẾN với một trường ở Singapore — không phải sang tận nơi, và ứng dụng thời tiết là ứng dụng miễn phí có sẵn, không phải do các bạn tự viết.",
              "we took part in an online competition with a school in Singapore",
            ),
            mcq(
              "Why did Minh ask his parents to set a daily limit?",
              "Vì sao Minh nhờ bố mẹ đặt giới hạn mỗi ngày?",
              [
                "Because his parents took his phone away.",
                "Because his school marks got worse.",
                "Because his phone was broken.",
                "Because he wanted to join the science club.",
              ],
              1,
              "Bài viết kể Minh xem tin nhắn bốn mươi lần một buổi chiều, rồi câu tiếp theo cho biết điểm của cậu ấy tụt xuống, và CUỐI CÙNG cậu ấy mới nhờ bố mẹ đặt giới hạn. Vậy lý do là điểm số đi xuống.",
              "his marks fell, and in the end he asked his parents to set a daily limit on his screen time",
            ),
            mcq(
              "What does the writer suggest about Minh without saying it directly?",
              "Người viết ngầm ám chỉ điều gì về Minh mà không nói thẳng ra?",
              [
                "Minh could not control his own screen time, so he needed help from someone else.",
                "Minh was not clever enough to pass his exams.",
                "Minh did not like his friends at school.",
                "Minh had already stopped using his phone before the marks fell.",
              ],
              0,
              "Bài không nói thẳng Minh yếu ý chí. Nhưng chi tiết Minh vẫn thông minh mà điểm vẫn tụt, rồi phải NHỜ BỐ MẸ đặt giới hạn thay vì tự đặt, cho thấy cậu ấy không tự kiểm soát được và cần người khác giúp. Đó là hàm ý.",
            ),
            mcq(
              "When does the writer think phones should be used in class?",
              "Theo người viết, khi nào thì được dùng điện thoại trong lớp?",
              [
                "At any time during the school day.",
                "Only during break time.",
                "Only when a teacher asks students to use them.",
                "Never, because they must stay at home.",
              ],
              2,
              "Đề xuất của người viết ghi rất rõ: chỉ dùng điện thoại trong lớp KHI THẦY CÔ YÊU CẦU, thời gian còn lại thì để trong cặp. Vậy không phải cấm hẳn, cũng không phải tự do dùng.",
              "phones should be used in class only when a teacher asks for them",
            ),
            tf(
              "The writer believes phones should be banned from school completely.",
              "Người viết cho rằng nên cấm hẳn điện thoại ở trường.",
              false,
              "SAI. Người viết dùng câu điều kiện loại 2 để bác bỏ chính ý đó: nếu điện thoại bị cấm hoàn toàn thì chúng ta sẽ MẤT một công cụ học tuyệt vời. Bạn ấy chọn cách cân bằng chứ không chọn cấm.",
              "If phones were banned completely, we would lose a brilliant learning tool.",
            ),
          ],
        },
        listening: {
          title: "A class debate about screens",
          transcript: `Teacher: Good morning, everyone. Today we are discussing one question: does technology make studying easier or harder?

Boy: I think it makes it easier, Miss. Last night I watched a short video about volcanoes, and I finally understood the lesson.

Girl: That is true, but a video cannot ask you a question. Although the internet is full of information, it never tells you which part is important.

Teacher: That is a fair point, Lan. So what would you change?

Girl: If I were the head teacher, I would give every class one quiet hour a day with no devices at all. We would read, talk and make a decision together.

Boy: One hour sounds fine to me. I just do not want to lose the tools that help me research.

Teacher: So you both agree that the answer is balance, not banning.

Girl: Exactly. My mother told me that she had learned everything from books, but even she says the same thing: the tool is not the problem, the habit is.`,
          questions: [
            mcq(
              "What helped the boy understand the lesson?",
              "Điều gì đã giúp bạn nam hiểu bài?",
              [
                "A short video about volcanoes.",
                "A book his mother gave him.",
                "A quiet hour with no devices.",
                "A question from his teacher.",
              ],
              0,
              "Bạn nam nói tối qua cậu ấy xem một video ngắn về núi lửa và cuối cùng đã hiểu bài. Cuốn sách là chuyện của mẹ bạn nữ, còn giờ yên lặng là đề xuất của bạn nữ.",
              "Last night I watched a short video about volcanoes, and I finally understood the lesson.",
            ),
            mcq(
              "What would Lan do if she were the head teacher?",
              "Nếu là hiệu trưởng thì Lan sẽ làm gì?",
              [
                "She would take every phone away from students.",
                "She would give each class one quiet hour a day without devices.",
                "She would ask students to watch more videos.",
                "She would let students use devices in every lesson.",
              ],
              1,
              "Lan dùng câu điều kiện loại 2 (If I were the head teacher, I would…) để nói bạn ấy sẽ cho mỗi lớp MỘT GIỜ yên lặng mỗi ngày, không dùng thiết bị — chứ không phải tịch thu hết điện thoại.",
              "I would give every class one quiet hour a day with no devices at all",
            ),
            mcq(
              "What do the boy and the girl finally agree about?",
              "Cuối cùng bạn nam và bạn nữ đồng ý với nhau điều gì?",
              [
                "That devices should be banned from school.",
                "That videos are better than books.",
                "That the right answer is balance, not banning.",
                "That homework should be done on paper only.",
              ],
              2,
              "Cô giáo tóm lại rằng cả hai bạn đều đồng ý câu trả lời là sự cân bằng chứ không phải cấm đoán, và Lan đáp lại ngay bằng từ Exactly (chính xác).",
              "So you both agree that the answer is balance, not banning.",
            ),
            tf(
              "Lan's mother thinks that books are the only good way to learn.",
              "Mẹ của Lan cho rằng sách là cách học tốt duy nhất.",
              false,
              "SAI. Đúng là mẹ Lan kể rằng ngày xưa bà học mọi thứ từ sách, NHƯNG chính bà cũng nói công cụ không phải vấn đề, thói quen mới là vấn đề. Vậy bà không hề chê các cách học khác.",
              "the tool is not the problem, the habit is",
            ),
          ],
        },
        writingPrompt:
          "Trường em đang bàn xem có nên cho học sinh mang điện thoại vào lớp hay không. Hãy viết một đoạn 90–120 từ nêu Ý KIẾN của em: em đồng ý, phản đối, hay chọn cách ở giữa? Bắt buộc dùng ít nhất một câu với 'although' hoặc 'however', và một câu điều kiện loại 2 (If … were …, I would …).",
        writingOutline:
          "1. Câu mở: nêu thẳng quan điểm của em (I believe that… / In my opinion…).\n2. Lý do 1 kèm ví dụ thật từ lớp em (dùng 'because' hoặc 'for example').\n3. Nêu mặt trái bằng 'However,…' hoặc 'Although…' — cho thấy em đã nghĩ cả hai chiều.\n4. Một câu điều kiện loại 2: 'If phones were …, we would …'.\n5. Câu kết: đề xuất cụ thể của em (a clear suggestion), không nói chung chung.",
        speaking: {
          sentences: [
            "Technology is useful, but it can also be a distraction.",
            "Although I love my phone, I try to set a daily limit.",
            "If I had no internet, I would read far more books.",
            "Do you think students depend on their devices too much?",
            "We took part in an online competition last year.",
            "In my opinion, the answer is balance, not banning.",
          ],
          questions: [
            {
              question: "How much time do you spend in front of a screen every day?",
              sampleAnswer:
                "I spend about two hours a day, mostly in the evening. I use my phone to research homework and to chat with my classmates. However, I try to stop half an hour before I go to bed.",
            },
            {
              question: "Do you think phones should be allowed in the classroom? Why?",
              sampleAnswer:
                "I think they should be allowed only when the teacher asks for them. Although a phone is a great tool for research, it becomes a distraction the moment the lesson gets difficult.",
            },
            {
              question: "If you had to live without the internet for a week, what would you do?",
              sampleAnswer:
                "If I had no internet for a week, I would probably be bored at first. Then I would read, cycle with my cousin and finally finish the guitar songs I keep saying I will learn.",
            },
            {
              question: "What is one useful thing and one harmful thing about technology?",
              sampleAnswer:
                "The useful thing is that it helps me connect with people far away, like my aunt in Japan. The harmful thing is that it makes it very easy to waste an hour without noticing.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Growing Up",
        topicVi: "Lớn lên từng ngày",
        icon: "🌱",
        words: [
          word("grow up", "/ɡrəʊ ʌp/", "lớn lên, trưởng thành", "🌱"),
          word("teenager", "/ˈtiːneɪdʒə(r)/", "thiếu niên (13–19 tuổi)", "🧒"),
          word("responsibility", "/rɪˌspɒnsəˈbɪləti/", "trách nhiệm", "🎒"),
          word("independent", "/ˌɪndɪˈpendənt/", "tự lập", "🚶"),
          word("permission", "/pəˈmɪʃn/", "sự cho phép", "🔑"),
          word("allow", "/əˈlaʊ/", "cho phép", "✅"),
          word("argue", "/ˈɑːɡjuː/", "tranh luận, cãi nhau", "💬"),
          word("trust", "/trʌst/", "tin tưởng; sự tin tưởng", "🤝"),
          word("chore", "/tʃɔː(r)/", "việc nhà", "🧹"),
          word("look after", "/lʊk ˈɑːftə(r)/", "chăm sóc, trông nom", "👶"),
          word("admit", "/ədˈmɪt/", "thừa nhận", "🙊"),
          word("proud", "/praʊd/", "tự hào", "🏅"),
          word("mistake", "/mɪˈsteɪk/", "lỗi sai, sai lầm", "❌"),
          word("advice", "/ədˈvaɪs/", "lời khuyên", "💡"),
          word("on my own", "/ɒn maɪ ˈəʊn/", "một mình, tự mình", "🧍"),
        ],
        sound: {
          letters: "NHẤN từ khoá",
          sound: "/nhấn tương phản/",
          hint: "Trong tiếng Anh, nhấn mạnh MỘT từ khác nhau là đổi hẳn nghĩa của câu: I never said she took my bike (tớ không hề NÓI) khác I never said SHE took my bike (không phải chị ấy lấy). Người Việt hay đọc mọi từ to bằng nhau vì tiếng Việt phân biệt nghĩa bằng thanh điệu chứ không bằng trọng âm câu, nên câu nghe phẳng và người nghe không biết đâu là ý chính. Cách sửa: chọn ĐÚNG MỘT từ mang thông tin mới, đọc nó DÀI HƠN, TO HƠN và CAO HƠN; các từ còn lại đọc nhẹ và nhanh.",
          words: [
            { word: "I did my chores. (không phải người khác)", meaning: "Nhấn I: chính tớ làm việc nhà", emoji: "🙋" },
            { word: "I DID my chores. (thật sự đã làm)", meaning: "Nhấn DID: khẳng định là đã làm rồi", emoji: "✅" },
            { word: "I did MY chores. (việc của tớ, không phải việc của em)", meaning: "Nhấn MY: việc của tớ chứ không phải việc ai khác", emoji: "🎯" },
            { word: "I cycled there on my OWN.", meaning: "Nhấn OWN: tớ đi MỘT MÌNH, không ai đưa", emoji: "🚲" },
          ],
        },
        reading: {
          title: "The Summer I Cycled to School Alone",
          passage: `Last summer my parents finally allowed me to cycle to school on my own. It is only two kilometres, but for me it felt like the first real step into being a teenager.

Getting that permission was not easy. For weeks my mother and I argued about it. She was worried about the traffic; I said that I was almost fourteen and that I could look after myself. In the end my father suggested a test: for one month I had to do my chores without being reminded, and I had to be home before six every evening.

I will admit that the first week was hard. I forgot to wash the dishes twice, and one evening I came home late because I had stopped to help a classmate repair her bike. When I explained, my mother listened carefully and told me that she was proud of me, although she still asked me to phone her next time.

That month taught me something I had not expected. Growing up is not really about being allowed to do more; it is about being trusted. Trust is built slowly, and a single mistake can destroy a lot of it.

If I could give one piece of advice to younger students, it would be this: do not wait for your parents to decide that you are independent. Show them. Do the small, boring jobs well, and the bigger freedoms will follow. However, remember that your parents worry because they love you, not because they think you are still a child.`,
          translation: `Hè năm ngoái bố mẹ cuối cùng cũng cho phép tớ tự đạp xe đến trường. Quãng đường chỉ hai cây số thôi, nhưng với tớ đó là bước đầu tiên thật sự để bước vào tuổi thiếu niên.

Xin được sự cho phép ấy chẳng dễ chút nào. Suốt mấy tuần liền mẹ và tớ tranh luận về chuyện đó. Mẹ lo đường đông; tớ thì nói rằng tớ gần mười bốn tuổi rồi và tớ tự lo cho mình được. Cuối cùng bố đề nghị một bài kiểm tra: trong một tháng, tớ phải làm việc nhà mà không cần ai nhắc, và phải về nhà trước sáu giờ mỗi tối.

Tớ thừa nhận tuần đầu tiên rất khó. Tớ quên rửa bát hai lần, và có một tối tớ về muộn vì đã dừng lại giúp một bạn cùng lớp sửa xe đạp. Khi tớ giải thích, mẹ lắng nghe rất kỹ rồi bảo rằng mẹ tự hào về tớ, mặc dù mẹ vẫn dặn lần sau nhớ gọi điện cho mẹ.

Tháng đó dạy tớ một điều tớ không ngờ tới. Lớn lên thật ra không phải là được phép làm nhiều thứ hơn; lớn lên là được tin tưởng. Sự tin tưởng được xây dần dần, còn một sai lầm thôi cũng có thể phá đi rất nhiều.

Nếu được khuyên các em nhỏ hơn một câu, tớ sẽ nói thế này: đừng ngồi chờ bố mẹ tuyên bố rằng con đã tự lập. Hãy chứng minh cho bố mẹ thấy. Làm thật tốt những việc nhỏ nhặt, buồn tẻ, rồi những quyền tự do lớn hơn sẽ đến. Tuy nhiên, hãy nhớ bố mẹ lo là vì bố mẹ thương mình, chứ không phải vì bố mẹ coi mình vẫn là trẻ con.`,
          questions: [
            mcq(
              "What is the main idea of the passage?",
              "Ý chính của bài đọc là gì?",
              [
                "Cycling to school is safer than going by motorbike.",
                "Parents in Vietnam worry too much about traffic.",
                "Growing up means earning trust, not simply getting more freedom.",
                "Doing chores is the hardest part of being a teenager.",
              ],
              2,
              "Cả bài kể một hành trình: xin phép → làm bài kiểm tra một tháng → rút ra bài học. Điểm chốt nằm ở đoạn 4 và đoạn 5: lớn lên là được TIN TƯỞNG, và muốn vậy thì phải tự chứng minh. Các phương án còn lại chỉ là chi tiết nhỏ trong bài.",
            ),
            mcq(
              "What test did the writer's father suggest?",
              "Bố của người viết đã đề nghị bài kiểm tra nào?",
              [
                "Cycling with his father for one month.",
                "Doing the chores for a month without being reminded.",
                "Getting better marks at school for a month.",
                "Looking after a younger cousin every evening.",
              ],
              1,
              "Bố đề nghị hai điều kiện trong một tháng: làm việc nhà mà không cần ai nhắc, và về nhà trước sáu giờ tối. Đó chính là phương án B. Bài không hề nhắc đến điểm số hay việc trông em.",
              "for one month I had to do my chores without being reminded",
            ),
            mcq(
              "Why did the writer come home late one evening?",
              "Vì sao có một tối người viết về nhà muộn?",
              [
                "Because the traffic was very bad.",
                "Because she forgot the time while talking to friends.",
                "Because she stopped to help a classmate repair her bike.",
                "Because her bike was broken.",
              ],
              2,
              "Bài viết nêu rõ lý do: bạn ấy dừng lại để giúp một bạn cùng lớp SỬA XE ĐẠP. Xe hỏng là xe của bạn cùng lớp, không phải xe của người viết.",
              "I came home late because I had stopped to help a classmate repair her bike",
            ),
            mcq(
              "What does the writer suggest about her mother, without saying it directly?",
              "Người viết ngầm cho thấy điều gì về mẹ mình mà không nói thẳng?",
              [
                "Her mother had never wanted her to cycle at all.",
                "Her mother could see the good reason behind the mistake, but still expected to be told.",
                "Her mother punished her for coming home late.",
                "Her mother was too busy to notice that she was late.",
              ],
              1,
              "Mẹ nghe giải thích rồi NÓI TỰ HÀO (vì con giúp bạn) nhưng vẫn dặn lần sau phải gọi điện. Hai chi tiết ghép lại cho thấy mẹ hiểu lý do chính đáng nhưng vẫn giữ nguyên yêu cầu báo tin. Bài không nói thẳng điều này ra.",
            ),
            mcq(
              "What advice does the writer give to younger students?",
              "Người viết khuyên các em nhỏ hơn điều gì?",
              [
                "Ask your parents for permission every day.",
                "Wait patiently until your parents say you are independent.",
                "Do the small jobs well and the bigger freedoms will follow.",
                "Argue with your parents until they change their minds.",
              ],
              2,
              "Lời khuyên nằm ở đoạn cuối: đừng chờ bố mẹ tuyên bố, hãy làm tốt những việc nhỏ và buồn tẻ, rồi tự do lớn hơn sẽ tới. Phương án B là điều người viết bảo ĐỪNG làm.",
              "Do the small, boring jobs well, and the bigger freedoms will follow.",
            ),
            tf(
              "According to the writer, parents worry because they think their children are still small.",
              "Theo người viết, bố mẹ lo lắng vì nghĩ con mình vẫn còn bé.",
              false,
              "SAI. Câu cuối bài nói ngược lại: bố mẹ lo vì THƯƠNG con, chứ không phải vì coi con vẫn là trẻ con.",
              "your parents worry because they love you, not because they think you are still a child",
            ),
          ],
        },
        listening: {
          title: "Asking to stay out later",
          transcript: `Girl: Mum, can we talk about Saturday?

Mum: I think I know what you are going to say. You want to go to the cinema with your friends.

Girl: Yes. And before you answer, I have already finished my chores for the whole week.

Mum: I noticed. You can go, but I would like you to be home by nine.

Girl: Nine? The film ends at half past eight, and nobody else has to leave straight away.

Mum: Then tell me exactly how you will get home, and I will listen.

Girl: Hoa's father is driving us. He offered last week, and he told me that he would stop at our gate.

Mum: That changes things. If I knew you were with an adult, I would worry much less. Half past nine, then.

Girl: Thank you. And I promise I will phone you when the film ends.

Mum: Now that is what growing up sounds like.`,
          questions: [
            mcq(
              "What does the girl want to do on Saturday?",
              "Bạn nữ muốn làm gì vào thứ Bảy?",
              [
                "Go to the cinema with her friends.",
                "Stay at home and watch a film.",
                "Visit Hoa's family for dinner.",
                "Finish her chores for the week.",
              ],
              0,
              "Ngay câu thứ hai, mẹ đã đoán trúng: con muốn đi xem phim với các bạn, và bạn nữ trả lời Yes. Việc nhà thì bạn ấy đã làm xong TRƯỚC rồi, không phải kế hoạch thứ Bảy.",
              "You want to go to the cinema with your friends.",
            ),
            mcq(
              "Why does the mother change the time to half past nine?",
              "Vì sao người mẹ đổi giờ về nhà thành chín rưỡi?",
              [
                "Because the film ends later than she thought.",
                "Because the girl has finished all her chores.",
                "Because an adult will drive the girl home.",
                "Because the girl promised to phone her.",
              ],
              2,
              "Mẹ đổi ý ngay sau khi nghe bố của Hoa sẽ lái xe đưa về tận cổng: mẹ dùng câu điều kiện loại 2 để nói nếu biết con đi cùng người lớn thì mẹ đỡ lo hơn nhiều. Đó là lý do trực tiếp.",
              "If I knew you were with an adult, I would worry much less.",
            ),
            mcq(
              "What does the mother's last sentence tell us about her feelings?",
              "Câu cuối của người mẹ cho thấy điều gì về cảm xúc của bà?",
              [
                "She is still angry about the time.",
                "She is pleased because her daughter is acting responsibly.",
                "She does not believe her daughter.",
                "She wants her daughter to stay at home.",
              ],
              1,
              "Sau khi con hứa sẽ gọi điện, mẹ nói đó mới là cách nói chuyện của một người đang lớn. Đây là lời KHEN, cho thấy mẹ hài lòng vì con cư xử có trách nhiệm.",
              "Now that is what growing up sounds like.",
            ),
            tf(
              "The girl finished her chores after her mother said yes.",
              "Bạn nữ làm xong việc nhà sau khi mẹ đồng ý.",
              false,
              "SAI. Bạn ấy nói rõ là đã làm xong việc nhà cả tuần TRƯỚC khi mẹ trả lời — chính chi tiết đó giúp bạn ấy thuyết phục mẹ.",
              "before you answer, I have already finished my chores for the whole week",
            ),
          ],
        },
        writingPrompt:
          "Viết một đoạn 90–120 từ kể về MỘT lần em được bố mẹ cho phép làm điều gì đó lần đầu tiên (tự đi xe, tự nấu ăn, ngủ lại nhà bạn…). Em đã phải chứng minh điều gì? Em học được gì? Bắt buộc có ít nhất một câu tường thuật (My mother told me that…) và một câu với 'although'.",
        writingOutline:
          "1. Mở bài: đó là việc gì và khi nào (Last summer, my parents finally allowed me to…).\n2. Trước đó bố mẹ lo điều gì? Em và bố mẹ đã bàn thế nào?\n3. Em đã làm gì để chứng minh mình đáng tin (chores, being home on time…).\n4. Một khó khăn hoặc một lỗi nhỏ đã xảy ra — dùng 'Although…' để nối.\n5. Kết bài: em rút ra bài học gì về trust và responsibility.",
        speaking: {
          sentences: [
            "My parents finally allowed me to cycle to school on my own.",
            "Trust is built slowly, but one mistake can destroy it.",
            "Although I forgot my chores twice, my mother was still proud of me.",
            "She told me that she would worry less if I phoned her.",
            "If I were a parent, I would give my child small responsibilities first.",
            "Growing up is about being trusted, not about being older.",
          ],
          questions: [
            {
              question: "What is one thing you are allowed to do now that you could not do two years ago?",
              sampleAnswer:
                "Two years ago I was never allowed to travel by bus alone. Now I go to my English class on my own every Tuesday, and my parents only ask me to send a short message when I arrive.",
            },
            {
              question: "Do you ever argue with your parents? What about?",
              sampleAnswer:
                "Sometimes we argue about bedtime. I want to finish one more chapter, and my mother wants the lights off. Although we disagree, we usually find a compromise, like fifteen extra minutes.",
            },
            {
              question: "What responsibility do you have at home?",
              sampleAnswer:
                "I look after my younger sister after school and I wash the dishes every evening. It is not exciting, but my parents trust me more because of it.",
            },
            {
              question: "What advice would you give to a ten-year-old about growing up?",
              sampleAnswer:
                "I would tell them not to be in a hurry. If you do the small jobs well, adults notice, and they start giving you real choices without you having to ask.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Money and Saving",
        topicVi: "Tiền bạc và tiết kiệm",
        icon: "💰",
        words: [
          word("save", "/seɪv/", "tiết kiệm, để dành", "🏦"),
          word("spend", "/spend/", "tiêu, chi", "💸"),
          word("pocket money", "/ˈpɒkɪt ˌmʌni/", "tiền tiêu vặt", "💰"),
          word("budget", "/ˈbʌdʒɪt/", "kế hoạch chi tiêu", "📊"),
          word("afford", "/əˈfɔːd/", "đủ tiền để mua", "🧾"),
          word("cost", "/kɒst/", "có giá là; chi phí", "🏷️"),
          word("waste", "/weɪst/", "lãng phí", "🗑️"),
          word("expensive", "/ɪkˈspensɪv/", "đắt", "💎"),
          word("worth", "/wɜːθ/", "đáng giá, xứng đáng", "⚖️"),
          word("borrow", "/ˈbɒrəʊ/", "mượn (của người khác)", "🤲"),
          word("lend", "/lend/", "cho mượn", "🫱"),
          word("earn", "/ɜːn/", "kiếm được (tiền)", "🧑‍🌾"),
          word("second-hand", "/ˌsekəndˈhænd/", "đã qua sử dụng", "♻️"),
          word("discount", "/ˈdɪskaʊnt/", "giảm giá", "🔖"),
          word("keep track of", "/kiːp træk əv/", "theo dõi, ghi lại", "📒"),
        ],
        sound: {
          letters: "Nhịp câu da-DUM",
          sound: "/nhịp mạnh – nhẹ/",
          hint: "Tiếng Anh có nhịp: từ mang NGHĨA (danh từ, động từ, tính từ, trạng từ, số) đọc MẠNH và DÀI; từ chức năng (a, the, of, to, was, for, and) đọc nhẹ, nhanh, nuốt gọn thành /ə/. Ví dụ: I SAVED a LOT of MOney for a GUItar — chỉ 5 nhịp mạnh. Người Việt thường đọc từng tiếng đều nhau và rõ nhau vì tiếng Việt là ngôn ngữ đơn âm, mỗi tiếng một thanh; kết quả là câu nghe như đếm số. Cách sửa: gõ tay theo các từ mạnh, cố ý đọc lướt các từ nhỏ ở giữa. Nhưng lướt KHÔNG có nghĩa là nuốt phụ âm cuối: saveD, cosT, spenT vẫn phải nghe thấy.",
          words: [
            { word: "I SAVED for a GUItar.", meaning: "Nhấn SAVED và GUI-, lướt for a", emoji: "🎸" },
            { word: "It COST too MUCH.", meaning: "Nhấn COST và MUCH, lướt it too", emoji: "🏷️" },
            { word: "I WROTE it DOWN every EVEning.", meaning: "Ba nhịp mạnh: WROTE – DOWN – EVE", emoji: "📒" },
            { word: "It was WORTH the WAIT.", meaning: "Nhấn WORTH và WAIT, lướt it was the", emoji: "⚖️" },
          ],
        },
        reading: {
          title: "Nine Months for a Guitar",
          passage: `Three years ago I wanted a guitar that cost two million dong. My parents said it was too expensive, and they were right: we could not afford it that month. So I decided to save for it myself.

The first thing I did was keep track of my pocket money. Every evening I wrote down what I had spent, and after two weeks the truth was uncomfortable. Almost half of my money had gone on milk tea and snacks. I never felt rich, and yet I was wasting more than I had imagined.

Then I made a simple budget. Half of my money was put away each week, a quarter was kept for small treats, and the rest was saved for birthday presents. I also began to earn a little by helping my aunt in her shop on Sundays. My brother offered to lend me the rest, but I said no, because a borrowed guitar would never have felt like mine.

Nine months later I bought a second-hand guitar with a discount from a small shop near my house. It was not new, and one corner was scratched, but it sounded warm and it was completely my own.

Some of my friends say that saving is boring. I disagree. Although waiting is hard, the thing you waited for is usually worth much more to you. My advice is not to spend less on everything. It is to know exactly where your money goes, because once you can see it, you can control it.`,
          translation: `Ba năm trước tớ thèm một cây đàn ghi ta giá hai triệu đồng. Bố mẹ bảo đắt quá, mà bố mẹ nói đúng: tháng đó nhà tớ không đủ tiền mua. Thế là tớ quyết định tự tiết kiệm để mua.

Việc đầu tiên tớ làm là ghi lại tiền tiêu vặt của mình. Tối nào tớ cũng viết ra mình đã tiêu gì, và sau hai tuần thì sự thật khá là khó chịu. Gần một nửa số tiền của tớ đã bay vào trà sữa và đồ ăn vặt. Tớ chưa bao giờ thấy mình dư dả, vậy mà lại đang lãng phí nhiều hơn tớ tưởng.

Sau đó tớ lập một kế hoạch chi tiêu đơn giản. Mỗi tuần một nửa số tiền được cất đi, một phần tư để dành cho những thứ nho nhỏ, phần còn lại để mua quà sinh nhật. Tớ cũng bắt đầu kiếm thêm chút tiền bằng cách phụ dì ở cửa hàng vào Chủ nhật. Anh tớ ngỏ ý cho tớ mượn phần còn thiếu, nhưng tớ từ chối, vì một cây đàn đi mượn sẽ chẳng bao giờ giống đàn của mình.

Chín tháng sau, tớ mua được một cây ghi ta cũ, lại còn được giảm giá, ở một cửa hàng nhỏ gần nhà. Đàn không mới, một góc bị xước, nhưng tiếng đàn ấm và nó hoàn toàn là của tớ.

Vài đứa bạn tớ bảo tiết kiệm chán lắm. Tớ không đồng ý. Mặc dù chờ đợi rất khó, thứ mà mình đã chờ thường trở nên đáng giá hơn nhiều. Lời khuyên của tớ không phải là tiêu ít lại ở mọi thứ. Mà là biết chính xác tiền của mình đi đâu, vì khi nhìn thấy được thì mình mới kiểm soát được.`,
          questions: [
            mcq(
              "What is the writer mainly trying to say?",
              "Người viết chủ yếu muốn nói điều gì?",
              [
                "Second-hand things are always better than new ones.",
                "Understanding where your money goes is the key to controlling it.",
                "Teenagers should not ask their parents for pocket money.",
                "Learning the guitar takes about nine months.",
              ],
              1,
              "Bài kể một câu chuyện tiết kiệm, nhưng câu chốt ở cuối mới là ý chính: lời khuyên không phải tiêu ít lại, mà là biết CHÍNH XÁC tiền đi đâu, vì thấy được thì mới kiểm soát được. Cây đàn chỉ là ví dụ minh hoạ.",
            ),
            mcq(
              "What did the writer discover after keeping track for two weeks?",
              "Sau hai tuần ghi chép, người viết phát hiện ra điều gì?",
              [
                "That her pocket money was too small.",
                "That her parents gave her less than her friends got.",
                "That almost half her money went on milk tea and snacks.",
                "That the guitar was cheaper than she thought.",
              ],
              2,
              "Sau hai tuần ghi chép, bạn ấy thấy gần MỘT NỬA số tiền đã tiêu vào trà sữa và đồ ăn vặt. Đó là sự thật khó chịu mà bài nhắc tới.",
              "Almost half of my money had gone on milk tea and snacks.",
            ),
            mcq(
              "Why did the writer refuse her brother's offer?",
              "Vì sao người viết từ chối lời đề nghị của anh trai?",
              [
                "Because her brother did not have enough money.",
                "Because a borrowed guitar would not have felt like her own.",
                "Because her parents did not allow her to borrow money.",
                "Because she had already bought the guitar.",
              ],
              1,
              "Bài giải thích ngay trong cùng một câu: bạn ấy nói không vì một cây đàn đi mượn sẽ chẳng bao giờ có cảm giác là của mình.",
              "My brother offered to lend me the rest, but I said no, because a borrowed guitar would never have felt like mine.",
            ),
            mcq(
              "What does the passage suggest about how the writer feels about her guitar?",
              "Bài đọc ngầm cho thấy người viết cảm thấy thế nào về cây đàn của mình?",
              [
                "She is disappointed because it is old and scratched.",
                "She values it more because she paid for it herself.",
                "She wants to sell it and buy a new one.",
                "She thinks she paid too much for it.",
              ],
              1,
              "Bài không nói thẳng câu nào kiểu tôi rất quý cây đàn. Nhưng chi tiết đàn cũ, bị xước mà vẫn được tả là tiếng ấm và HOÀN TOÀN LÀ CỦA TỚ, cộng với việc từ chối tiền mượn, cho thấy bạn ấy quý nó chính vì tự mình mua được. Đó là hàm ý.",
            ),
            mcq(
              "How did the writer earn extra money?",
              "Người viết kiếm thêm tiền bằng cách nào?",
              [
                "By selling snacks at school.",
                "By helping her aunt in her shop on Sundays.",
                "By teaching the guitar to younger children.",
                "By working in a shop after school every day.",
              ],
              1,
              "Bài nêu rõ bạn ấy bắt đầu kiếm thêm một ít bằng cách phụ dì ở cửa hàng vào CHỦ NHẬT, chứ không phải làm mỗi ngày sau giờ học.",
              "I also began to earn a little by helping my aunt in her shop on Sundays.",
            ),
            tf(
              "The writer thinks the best advice is to spend less on everything.",
              "Người viết cho rằng lời khuyên tốt nhất là tiêu ít đi ở mọi thứ.",
              false,
              "SAI. Câu áp chót nói ngược lại: lời khuyên của bạn ấy KHÔNG phải tiêu ít lại ở mọi thứ, mà là biết rõ tiền của mình đi đâu.",
              "My advice is not to spend less on everything.",
            ),
          ],
        },
        listening: {
          title: "Two friends and a school trip",
          transcript: `Boy: The school trip costs six hundred thousand dong. That is a lot.

Girl: It is, but there is a discount if we pay before Friday. It drops to five hundred.

Boy: I still cannot afford it this month. I spent most of my pocket money on a new game.

Girl: I know. You told me last week that you would keep track of what you spent.

Boy: I started, then I stopped after three days.

Girl: Well, my sister taught me a trick. On the first day of the month, I put half of my money in a jar and I pretend it does not exist.

Boy: And it works?

Girl: Most of the time. Although it feels strange at first, you soon forget the money is there. If I saved nothing, I would miss every trip.

Boy: All right. I will ask my uncle if I can help at his shop on Sunday. I would rather earn the money than borrow it.

Girl: Now that is a good decision.`,
          questions: [
            mcq(
              "How much does the trip cost if they pay before Friday?",
              "Nếu trả tiền trước thứ Sáu thì chuyến đi có giá bao nhiêu?",
              [
                "Six hundred thousand dong.",
                "Five hundred thousand dong.",
                "Three hundred thousand dong.",
                "One hundred thousand dong.",
              ],
              1,
              "Bạn nữ nói có giảm giá nếu trả trước thứ Sáu và giá xuống còn năm trăm nghìn. Sáu trăm nghìn là giá gốc chưa giảm.",
              "there is a discount if we pay before Friday. It drops to five hundred",
            ),
            mcq(
              "What trick did the girl learn from her sister?",
              "Bạn nữ học được mẹo gì từ chị gái?",
              [
                "Asking her parents for more pocket money.",
                "Buying everything second-hand.",
                "Putting half her money in a jar and pretending it is not there.",
                "Writing down every single thing she buys.",
              ],
              2,
              "Bạn nữ kể mẹo của chị: ngày đầu tháng cất một nửa số tiền vào lọ rồi coi như số tiền đó không tồn tại. Việc ghi chép chi tiêu là điều bạn NAM từng định làm.",
              "I put half of my money in a jar and I pretend it does not exist",
            ),
            mcq(
              "What does the boy decide to do at the end?",
              "Cuối cùng bạn nam quyết định làm gì?",
              [
                "Borrow money from the girl.",
                "Sell his new game.",
                "Earn money by helping at his uncle's shop.",
                "Stay at home instead of going on the trip.",
              ],
              2,
              "Bạn nam nói sẽ hỏi chú xem có thể phụ việc ở cửa hàng vào Chủ nhật không, và nói thêm rằng thà tự kiếm tiền còn hơn đi mượn.",
              "I would rather earn the money than borrow it",
            ),
            tf(
              "The boy kept a record of his spending for a whole month.",
              "Bạn nam đã ghi chép chi tiêu suốt cả một tháng.",
              false,
              "SAI. Bạn ấy thừa nhận mới bắt đầu rồi bỏ sau BA NGÀY, chứ không làm được cả tháng.",
              "I started, then I stopped after three days.",
            ),
          ],
        },
        writingPrompt:
          "Một người bạn nhắn cho em: 'Tớ chẳng bao giờ để dành được đồng nào cả!'. Hãy viết một đoạn 90–120 từ trả lời bạn: em quản lý tiền tiêu vặt thế nào, và em khuyên bạn làm gì. Bắt buộc dùng ít nhất một câu bị động (Half of my money is put away…) và một câu điều kiện loại 2 (If I saved…, I would…).",
        writingOutline:
          "1. Trả lời thân mật + nói ngay rằng em cũng từng như vậy.\n2. Em làm gì để keep track of tiền của mình (viết ra, dùng lọ, dùng app…).\n3. Một câu bị động mô tả cách chia tiền: 'Half of my pocket money is put away every week.'\n4. Một ví dụ thật: em đã tiết kiệm mua được thứ gì? Nó cost bao nhiêu?\n5. Kết: một lời khuyên cụ thể + một câu điều kiện loại 2.",
        speaking: {
          sentences: [
            "I keep track of my pocket money in a small notebook.",
            "The guitar was too expensive, so I could not afford it.",
            "Half of my money is put away at the start of every month.",
            "I bought a second-hand bike with a discount.",
            "If I saved nothing, I would miss every school trip.",
            "Although waiting is hard, it is usually worth it.",
          ],
          questions: [
            {
              question: "Do you get pocket money? What do you usually spend it on?",
              sampleAnswer:
                "I get fifty thousand dong a week. Most of it goes on lunch and bubble tea, although I try to put ten thousand into a jar every Monday before I spend anything.",
            },
            {
              question: "What is something you saved up for? How long did it take?",
              sampleAnswer:
                "I saved for a pair of running shoes for about four months. They cost seven hundred thousand dong, and I bought them with a discount during a sale, so the waiting was worth it.",
            },
            {
              question: "Is it a good idea to borrow money from friends? Why or why not?",
              sampleAnswer:
                "I do not think it is a good idea. If I borrowed money from a friend and could not pay it back, our friendship would become uncomfortable. I would rather wait or earn it.",
            },
            {
              question: "What advice would you give someone who wastes money easily?",
              sampleAnswer:
                "I would tell them to write down everything they buy for two weeks. When you can see where your money goes, it is much easier to stop wasting it.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 2 · Chúng ta và xã hội",
    subtitle: "Môi trường, thể thao và thông tin — nhìn vấn đề từ nhiều phía",
    lessons: [
      // ───────────────────────────────────────────────────────────────────
      {
        topic: "The Environment",
        topicVi: "Môi trường quanh ta",
        icon: "🌍",
        words: [
          word("environment", "/ɪnˈvaɪrənmənt/", "môi trường", "🌍"),
          word("pollution", "/pəˈluːʃn/", "sự ô nhiễm", "🏭"),
          word("plastic", "/ˈplæstɪk/", "nhựa", "🧴"),
          word("rubbish", "/ˈrʌbɪʃ/", "rác", "🗑️"),
          word("litter", "/ˈlɪtə(r)/", "rác vứt bừa ngoài đường", "🥤"),
          word("recycle", "/ˌriːˈsaɪkl/", "tái chế", "♻️"),
          word("reduce", "/rɪˈdjuːs/", "giảm bớt", "📉"),
          word("protect", "/prəˈtekt/", "bảo vệ", "🛡️"),
          word("climate", "/ˈklaɪmət/", "khí hậu", "🌡️"),
          word("damage", "/ˈdæmɪdʒ/", "thiệt hại; làm hư hại", "💥"),
          word("habit", "/ˈhæbɪt/", "thói quen", "🔁"),
          word("campaign", "/kæmˈpeɪn/", "chiến dịch", "📣"),
          word("volunteer", "/ˌvɒlənˈtɪə(r)/", "tình nguyện; tình nguyện viên", "🙋"),
          word("take action", "/teɪk ˈækʃn/", "bắt tay hành động", "🚀"),
          word("make a difference", "/meɪk ə ˈdɪfrəns/", "tạo ra sự khác biệt", "✨"),
        ],
        sound: {
          letters: "↗ ↗ ↘ khi liệt kê",
          sound: "/A, B and C/",
          hint: "Khi liệt kê, mỗi mục LÊN giọng nhẹ ↗ và mục CUỐI CÙNG mới hạ xuống ↘: bottles↗, straws↗ and BAGS↘. Đường giọng đó chính là dấu hiệu báo cho người nghe biết \"danh sách sắp hết rồi\". Người Việt hay đọc cả dãy bằng một giọng phẳng như đọc điểm danh, khiến người nghe không đoán được khi nào bạn nói xong và hay chen ngang. Cách sửa: nhấc cằm lên một chút ở mỗi mục, đến mục cuối thì thả rơi giọng và dừng hẳn. Nhớ giữ đủ phụ âm cuối số nhiều: bottleS, bagS, habitS — nuốt mất -s là mất luôn nghĩa \"nhiều\".",
          words: [
            { word: "bottles↗, straws↗ and bags↘", meaning: "chai, ống hút và túi (mục cuối hạ giọng)", emoji: "🧴" },
            { word: "reduce↗, reuse↗ and recycle↘", meaning: "giảm, dùng lại và tái chế", emoji: "♻️" },
            { word: "We read↗, we talked↗ and we cleaned↘.", meaning: "Ba việc, việc cuối hạ giọng", emoji: "🧹" },
            { word: "paper↗, glass↗ and plastic↘", meaning: "giấy, thuỷ tinh và nhựa", emoji: "🗑️" },
          ],
        },
        reading: {
          title: "One Morning on the Beach",
          passage: `Last April our class spent a Saturday morning cleaning a beach near Vung Tau. We were given gloves and large bags, and in three hours the two hundred of us collected more than four hundred kilograms of rubbish. Most of it was plastic: bottles, straws and thousands of small bags.

At first I felt proud. Then our teacher asked a difficult question. What will this beach look like next month? Nobody answered, because we all knew. Within a few weeks the litter would come back.

Some people say that a school clean-up does nothing real for the environment, and I understand why. If the rubbish is removed but nothing else changes, the pollution simply returns and the damage continues. Real progress happens when habits change and when factories are forced to use less packaging.

However, I do not agree that we should stop. That morning changed the way I think. I now carry a cloth bag, I refuse plastic straws, and I have stopped buying drinks I do not need. Small choices are copied. My mother copied mine, and last month my aunt started too.

Our school has since begun a campaign called Green Friday. Every Friday, classes compete to reduce the rubbish they throw away, and the results are shown on a board near the gate. More than sixty students have volunteered to sort the bins so that paper and plastic can be recycled.

If everyone waited for governments to protect the climate, nothing would ever move. Governments matter far more than we do, but they usually change after ordinary people take action first. That is how one Saturday morning can make a difference.`,
          translation: `Tháng Tư năm ngoái, lớp tớ dành trọn một sáng thứ Bảy đi dọn một bãi biển gần Vũng Tàu. Tụi tớ được phát găng tay và túi to, và trong ba tiếng, hai trăm đứa tụi tớ nhặt được hơn bốn trăm ki-lô-gam rác. Phần lớn là nhựa: chai, ống hút và hàng nghìn chiếc túi nhỏ.

Lúc đầu tớ thấy rất tự hào. Rồi cô giáo đặt một câu hỏi khó. Bãi biển này tháng sau sẽ trông thế nào? Không ai trả lời, vì đứa nào cũng biết. Chỉ vài tuần nữa thôi, rác sẽ lại tràn về.

Có người bảo rằng một buổi dọn rác của học sinh chẳng giúp gì thật sự cho môi trường, và tớ hiểu vì sao họ nói vậy. Nếu chỉ nhặt rác đi mà không có gì khác thay đổi thì ô nhiễm sẽ quay lại và thiệt hại vẫn tiếp diễn. Tiến bộ thật sự chỉ đến khi thói quen thay đổi và khi các nhà máy buộc phải dùng ít bao bì hơn.

Tuy nhiên, tớ không đồng ý rằng vì thế mà nên dừng lại. Buổi sáng hôm đó đã đổi cách tớ nghĩ. Bây giờ tớ luôn mang theo túi vải, tớ từ chối ống hút nhựa, và tớ bỏ hẳn thói mua đồ uống mà mình không thật sự cần. Những lựa chọn nhỏ sẽ được người khác bắt chước. Mẹ tớ bắt chước tớ, và tháng trước dì tớ cũng bắt đầu làm theo.

Từ đó trường tớ mở một chiến dịch tên là Green Friday. Mỗi thứ Sáu, các lớp thi xem lớp nào giảm được nhiều rác nhất, và kết quả được dán trên bảng gần cổng trường. Hơn sáu mươi bạn đã tình nguyện phân loại thùng rác để giấy và nhựa có thể được tái chế.

Nếu ai cũng ngồi chờ chính phủ bảo vệ khí hậu thì sẽ chẳng có gì nhúc nhích. Chính phủ quan trọng hơn tụi tớ rất nhiều, nhưng họ thường chỉ thay đổi sau khi những người bình thường bắt tay hành động trước. Đó là cách một buổi sáng thứ Bảy có thể tạo ra khác biệt.`,
          questions: [
            mcq(
              "What is the writer's main point in this passage?",
              "Ý chính của người viết trong bài này là gì?",
              [
                "Beach clean-ups solve the problem of plastic pollution.",
                "Only governments and factories can protect the environment.",
                "Small personal actions are not enough on their own, but they still matter.",
                "Students should spend every Saturday cleaning beaches.",
              ],
              2,
              "Người viết thừa nhận việc dọn rác một buổi KHÔNG giải quyết được gốc rễ (đoạn 3), nhưng vẫn khẳng định không nên dừng lại vì hành động nhỏ được lan truyền và chính phủ thường thay đổi sau khi dân thường hành động trước (đoạn 4 và 6). Ý chính là sự kết hợp của hai điều đó.",
            ),
            mcq(
              "How much rubbish did the students collect?",
              "Các bạn học sinh đã nhặt được bao nhiêu rác?",
              [
                "More than four hundred kilograms.",
                "About two hundred kilograms.",
                "Sixty kilograms.",
                "Thirty kilograms a week.",
              ],
              0,
              "Bài ghi rõ: trong ba tiếng, hai trăm bạn nhặt được HƠN BỐN TRĂM ki-lô-gam rác. Con số hai trăm là số người, không phải số ki-lô-gam.",
              "in three hours the two hundred of us collected more than four hundred kilograms of rubbish",
            ),
            mcq(
              "Why does the writer mention her mother and her aunt?",
              "Vì sao người viết nhắc đến mẹ và dì của mình?",
              [
                "To show that adults waste more than teenagers.",
                "To show that one person's habits are copied by others.",
                "To explain why she joined the beach clean-up.",
                "To prove that her family never buys plastic.",
              ],
              1,
              "Ngay trước đó bài viết nói Những lựa chọn nhỏ sẽ được bắt chước, rồi lấy mẹ và dì làm ví dụ chứng minh. Vậy mục đích là cho thấy thói quen của một người lan sang người khác.",
              "Small choices are copied. My mother copied mine, and last month my aunt started too.",
            ),
            mcq(
              "How does Green Friday work?",
              "Chiến dịch Green Friday hoạt động thế nào?",
              [
                "Students clean the beach every Friday afternoon.",
                "Classes compete to throw away less rubbish, and results are shown on a board.",
                "Every class must bring recycled paper to school.",
                "Sixty students clean the whole school each week.",
              ],
              1,
              "Bài mô tả rõ: mỗi thứ Sáu các lớp THI XEM lớp nào giảm được nhiều rác nhất, và kết quả được dán lên bảng gần cổng. Sáu mươi bạn tình nguyện là để phân loại thùng rác, không phải dọn cả trường.",
              "classes compete to reduce the rubbish they throw away, and the results are shown on a board near the gate",
            ),
            mcq(
              "What does the writer imply about her feelings right after the clean-up?",
              "Người viết ngầm cho thấy cảm xúc của mình ngay sau buổi dọn rác là gì?",
              [
                "Her pride did not last long once she thought about the future.",
                "She was angry with the people who had left the rubbish.",
                "She was tired and decided never to volunteer again.",
                "She was certain that the beach would stay clean.",
              ],
              0,
              "Bài viết đặt hai câu cạnh nhau: lúc đầu thấy TỰ HÀO, rồi cô giáo hỏi tháng sau bãi biển sẽ ra sao và cả lớp im lặng vì ai cũng biết rác sẽ quay lại. Cách sắp xếp đó ngầm cho thấy niềm tự hào tắt rất nhanh. Bài không nói thẳng ra.",
            ),
            tf(
              "The writer believes that individual people matter more than governments.",
              "Người viết cho rằng từng cá nhân quan trọng hơn chính phủ.",
              false,
              "SAI. Bài nói ngược lại: chính phủ quan trọng HƠN NHIỀU so với cá nhân, chỉ có điều chính phủ thường thay đổi sau khi người dân hành động trước.",
              "Governments matter far more than we do",
            ),
          ],
        },
        listening: {
          title: "School Radio: Green Friday",
          transcript: `Presenter: Welcome back to School Radio. Today I am talking to Mai from class 9A about Green Friday. Mai, whose idea was it?

Girl: It was not mine, actually. Our science teacher suggested it after the beach clean-up, but the students wrote the rules.

Presenter: And how does it work?

Girl: Every Friday each class weighs its rubbish at the end of the day. The class that throws away the least gets a green flag on the board near the gate.

Presenter: Has it made a difference?

Girl: A big one. In September we threw away almost thirty kilograms a week. Last Friday it was eleven.

Presenter: That is impressive. What surprised you most?

Girl: How simple the changes were. Most people just brought a water bottle from home instead of buying plastic ones.

Presenter: Is there anything that has not worked?

Girl: Yes. We tried to recycle paper in every classroom, but the bins were mixed up too often. If we had more volunteers, it would work much better.`,
          questions: [
            mcq(
              "Who first suggested Green Friday?",
              "Ai là người đầu tiên đề xuất Green Friday?",
              [
                "Mai herself.",
                "The science teacher.",
                "The radio presenter.",
                "The students of class 9A.",
              ],
              1,
              "Mai nói thẳng đó không phải ý của bạn ấy: cô giáo môn khoa học đề xuất sau buổi dọn bãi biển, còn học sinh chỉ viết ra luật chơi.",
              "Our science teacher suggested it after the beach clean-up, but the students wrote the rules.",
            ),
            mcq(
              "How much rubbish did the school throw away last Friday?",
              "Thứ Sáu vừa rồi trường thải ra bao nhiêu rác?",
              [
                "Thirty kilograms.",
                "Twenty kilograms.",
                "Eleven kilograms.",
                "Nine kilograms.",
              ],
              2,
              "Mai so sánh hai con số: tháng Chín gần ba mươi ki-lô-gam mỗi tuần, còn thứ Sáu vừa rồi chỉ còn MƯỜI MỘT.",
              "In September we threw away almost thirty kilograms a week. Last Friday it was eleven.",
            ),
            mcq(
              "What change surprised Mai the most?",
              "Thay đổi nào khiến Mai bất ngờ nhất?",
              [
                "How expensive plastic bottles are.",
                "How simple the changes were, such as bringing a bottle from home.",
                "How many students joined the beach clean-up.",
                "How quickly the bins were filled.",
              ],
              1,
              "Khi được hỏi điều gì bất ngờ nhất, Mai trả lời là các thay đổi ĐƠN GIẢN đến mức nào, và ví dụ là mọi người chỉ cần mang bình nước từ nhà đi.",
              "How simple the changes were. Most people just brought a water bottle from home instead of buying plastic ones.",
            ),
            tf(
              "The plan to recycle paper in every classroom worked perfectly.",
              "Kế hoạch tái chế giấy ở mọi lớp học đã thành công hoàn hảo.",
              false,
              "SAI. Mai kể đây chính là phần CHƯA hiệu quả: các thùng rác bị lẫn lộn quá thường xuyên, và bạn ấy nói nếu có thêm tình nguyện viên thì mọi thứ sẽ tốt hơn nhiều.",
              "We tried to recycle paper in every classroom, but the bins were mixed up too often.",
            ),
          ],
        },
        writingPrompt:
          "Trường em muốn mở một chiến dịch bảo vệ môi trường. Hãy viết một đoạn 90–120 từ đề xuất MỘT ý tưởng cụ thể: làm gì, ai tham gia, đo kết quả thế nào, và vì sao nó đáng làm. Bắt buộc có một câu bị động (The results are shown…) và một câu với 'although' hoặc 'however'.",
        writingOutline:
          "1. Nêu vấn đề em thấy ở trường mình (rác nhựa, chai nước, giấy…).\n2. Ý tưởng của em: tên chiến dịch + làm gì vào thứ mấy.\n3. Ai tham gia? Ai làm volunteer? Kết quả được đo và công bố ra sao (dùng câu bị động).\n4. Một khó khăn có thể gặp — dùng 'However,…' hoặc 'Although…'.\n5. Câu kết: vì sao việc nhỏ này vẫn make a difference.",
        speaking: {
          sentences: [
            "Most of the rubbish on the beach was plastic.",
            "Bottles, straws and bags were collected in three hours.",
            "Although one clean-up is not enough, habits can change.",
            "The results are shown on a board near the gate.",
            "If everyone waited for governments, nothing would move.",
            "Sixty students have volunteered to sort the bins.",
          ],
          questions: [
            {
              question: "What does your family do to reduce rubbish at home?",
              sampleAnswer:
                "We keep three boxes in the kitchen for paper, plastic and glass, and my grandmother has used the same cloth bag at the market for years. It is a small habit, but nothing is wasted.",
            },
            {
              question: "Have you ever taken part in a clean-up or an environmental campaign?",
              sampleAnswer:
                "Last year my class cleaned the canal behind our school. We filled eleven bags in one morning. Although the litter came back, several of my classmates stopped buying plastic bottles after that day.",
            },
            {
              question: "Do you think one person can really make a difference? Why?",
              sampleAnswer:
                "I do, because habits are copied. When I started bringing my own bottle, two friends did the same within a month. One person is small, but one person is never alone for long.",
            },
            {
              question: "What would you change about your city if you could?",
              sampleAnswer:
                "If I could change one thing, I would put more bins along the river and I would ask shops to stop giving free plastic bags. Pollution is easier to prevent than to clean up.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Sports and Competition",
        topicVi: "Thể thao và thi đấu",
        icon: "⚽",
        words: [
          word("competition", "/ˌkɒmpəˈtɪʃn/", "cuộc thi, sự cạnh tranh", "🏆"),
          word("compete", "/kəmˈpiːt/", "thi đấu, cạnh tranh", "🏃"),
          word("tournament", "/ˈtʊənəmənt/", "giải đấu", "🏅"),
          word("coach", "/kəʊtʃ/", "huấn luyện viên", "🧑‍🏫"),
          word("teammate", "/ˈtiːmmeɪt/", "đồng đội", "🤝"),
          word("practise", "/ˈpræktɪs/", "luyện tập", "🔁"),
          word("improve", "/ɪmˈpruːv/", "tiến bộ, cải thiện", "📈"),
          word("pressure", "/ˈpreʃə(r)/", "áp lực", "😰"),
          word("injury", "/ˈɪndʒəri/", "chấn thương", "🩹"),
          word("fair", "/feə(r)/", "công bằng", "⚖️"),
          word("encourage", "/ɪnˈkʌrɪdʒ/", "động viên, khích lệ", "📣"),
          word("confidence", "/ˈkɒnfɪdəns/", "sự tự tin", "😌"),
          word("defeat", "/dɪˈfiːt/", "đánh bại", "🥊"),
          word("give up", "/ɡɪv ʌp/", "bỏ cuộc", "🛑"),
          word("do your best", "/duː jɔː best/", "cố gắng hết sức", "💪"),
        ],
        sound: {
          letters: "Trọng âm trong từ dài",
          sound: "/ˌcompeˈtition · ˈtournament/",
          hint: "Từ dài trong tiếng Anh luôn có MỘT âm tiết mạnh nhất, các âm tiết còn lại bị đọc nhẹ thành /ə/: comPEtition (nhấn PE), TOURnament (nhấn TOUR), inJURy? Không — INjury (nhấn IN), CONfidence (nhấn CON), imPROVE (nhấn PROVE). Vì mỗi tiếng Việt là một âm tiết có thanh điệu riêng, người Việt hay đọc đều tay từng âm tiết: com-pe-ti-tion bốn tiếng bằng nhau. Người bản ngữ nghe vậy sẽ khó nhận ra từ. Cách sửa: đọc âm tiết mạnh to gấp đôi và dài hơn, các âm tiết còn lại thu nhỏ lại gần như /ə/.",
          words: [
            { word: "comPEtition", meaning: "cuộc thi — nhấn âm tiết thứ ba", emoji: "🏆" },
            { word: "TOURnament", meaning: "giải đấu — nhấn âm tiết đầu", emoji: "🏅" },
            { word: "CONfidence", meaning: "sự tự tin — nhấn âm tiết đầu", emoji: "😌" },
            { word: "imPROVE", meaning: "tiến bộ — nhấn âm tiết sau", emoji: "📈" },
            { word: "enCOURage", meaning: "động viên — nhấn âm tiết giữa", emoji: "📣" },
          ],
        },
        reading: {
          title: "The Final We Lost",
          passage: `Last November our school football team reached the final of the district tournament. We had practised four times a week since September, and our coach kept telling us that we were ready. We lost four goals to one.

For a week I did not want to talk about it. I had missed an easy chance in the first half, and I was sure that my teammates blamed me. Then our coach asked us one question. What do you do better now than you did last year? The list was surprisingly long. We were faster, we passed the ball more often, and nobody had stopped running when the score was three to one.

Some parents believe that competition puts too much pressure on teenagers, and they have a point. I have seen a good player leave our team because he could not sleep before matches. An injury is easy to see; the worry inside a player is not.

However, I do not think the answer is to remove competition completely. If nobody kept the score, we would practise less, compete less and improve far more slowly. A fair competition teaches you to prepare carefully, to lose politely and to try again on Monday. Those lessons are useful a long way from a football pitch.

What really matters is how the adults behave. When a coach shouts only about winning, players learn to fear mistakes. When a coach encourages them and asks them to do their best, they slowly gain confidence, and confidence is what makes a team difficult to defeat.

We lost the final, but I would not give up that season for anything.`,
          translation: `Tháng Mười Một năm ngoái, đội bóng đá trường tớ vào tới trận chung kết giải quận. Tụi tớ đã tập bốn buổi một tuần từ tháng Chín, và thầy huấn luyện cứ nói mãi rằng tụi tớ đã sẵn sàng. Rồi tụi tớ thua bốn - một.

Suốt một tuần tớ chẳng muốn nhắc gì đến trận đó. Tớ đã bỏ lỡ một cơ hội quá dễ trong hiệp một, và tớ chắc chắn là các đồng đội đang trách tớ. Rồi thầy hỏi cả đội một câu. Bây giờ các em làm tốt hơn năm ngoái ở những điểm nào? Danh sách dài đến bất ngờ. Tụi tớ chạy nhanh hơn, chuyền nhiều hơn, và không ai ngừng chạy khi tỉ số đang là ba - một.

Có phụ huynh cho rằng thi đấu tạo quá nhiều áp lực lên tuổi teen, và họ có lý. Tớ từng thấy một cầu thủ giỏi rời đội vì bạn ấy không ngủ nổi trước mỗi trận. Chấn thương thì nhìn thấy được; còn nỗi lo bên trong một cầu thủ thì không.

Tuy nhiên, tớ không nghĩ giải pháp là bỏ hẳn thi đấu. Nếu không ai tính điểm thì tụi tớ sẽ tập ít hơn, thi đấu ít hơn và tiến bộ chậm hơn nhiều. Một cuộc thi công bằng dạy ta cách chuẩn bị kỹ, cách thua một cách đàng hoàng và cách thứ Hai lại thử lại. Những bài học đó có ích ở rất xa ngoài sân bóng.

Điều thật sự quan trọng là người lớn cư xử thế nào. Khi huấn luyện viên chỉ quát về chuyện thắng thua, cầu thủ học được cách sợ mắc lỗi. Khi huấn luyện viên động viên và bảo các em cứ cố gắng hết sức, các em dần dần có được sự tự tin, và chính sự tự tin làm cho một đội bóng khó bị đánh bại.

Tụi tớ thua trận chung kết, nhưng đổi gì tớ cũng không từ bỏ mùa giải đó.`,
          questions: [
            mcq(
              "What is the writer's main argument?",
              "Lập luận chính của người viết là gì?",
              [
                "School football teams should train more than four times a week.",
                "Competition is harmful and should be removed from school sport.",
                "Competition is valuable if the adults around young players behave well.",
                "Losing a final is the best way to learn about football.",
              ],
              2,
              "Người viết thừa nhận áp lực là có thật (đoạn 3) nhưng không đồng ý bỏ thi đấu (đoạn 4), rồi chốt ở đoạn 5 rằng điều THẬT SỰ quan trọng là cách người lớn cư xử. Đó là lập luận xuyên suốt bài.",
            ),
            mcq(
              "How often had the team practised before the final?",
              "Trước trận chung kết, đội đã tập bao nhiêu buổi một tuần?",
              [
                "Four times a week since September.",
                "Every day since November.",
                "Twice a week since September.",
                "Only at weekends.",
              ],
              0,
              "Câu thứ hai của bài nói rõ: tụi tớ đã tập BỐN buổi một tuần TỪ THÁNG CHÍN.",
              "We had practised four times a week since September",
            ),
            mcq(
              "Why did a good player leave the team?",
              "Vì sao một cầu thủ giỏi rời đội?",
              [
                "Because he had a serious injury.",
                "Because the coach shouted at him.",
                "Because he could not sleep before matches.",
                "Because his parents moved to another city.",
              ],
              2,
              "Bài kể bạn ấy rời đội vì KHÔNG NGỦ ĐƯỢC trước các trận đấu. Ngay câu sau, tác giả còn so sánh: chấn thương thì nhìn thấy được, còn nỗi lo bên trong thì không.",
              "I have seen a good player leave our team because he could not sleep before matches.",
            ),
            mcq(
              "What does the writer suggest about his teammates, without saying it directly?",
              "Người viết ngầm cho thấy điều gì về các đồng đội mà không nói thẳng?",
              [
                "They probably did not blame him as much as he feared.",
                "They stopped speaking to him after the final.",
                "They wanted a new coach after the match.",
                "They agreed that he was the worst player in the team.",
              ],
              0,
              "Tác giả nói mình CHẮC CHẮN các bạn đang trách mình, nhưng ngay sau đó cả đội cùng liệt kê một danh sách tiến bộ dài và không ai nhắc lại pha bỏ lỡ. Cách kể đó ngầm cho thấy nỗi sợ bị trách phần lớn là do tự bạn ấy nghĩ ra.",
            ),
            mcq(
              "According to the writer, what does a fair competition teach you?",
              "Theo người viết, một cuộc thi công bằng dạy ta điều gì?",
              [
                "How to win against stronger teams.",
                "How to prepare, how to lose politely and how to try again.",
                "How to choose the right coach.",
                "How to avoid injuries during a match.",
              ],
              1,
              "Bài liệt kê đúng ba điều: chuẩn bị kỹ, thua một cách đàng hoàng, và thứ Hai lại thử lại. Đây là câu liệt kê ba mục — đúng ngữ điệu ↗ ↗ ↘ mà bài phát âm hôm nay dạy.",
              "A fair competition teaches you to prepare carefully, to lose politely and to try again on Monday.",
            ),
            tf(
              "The writer regrets playing in that season.",
              "Người viết hối tiếc vì đã chơi mùa giải đó.",
              false,
              "SAI. Câu cuối bài nói rõ: dù thua chung kết, đổi gì bạn ấy cũng không từ bỏ mùa giải ấy — tức là hoàn toàn không hối tiếc.",
              "We lost the final, but I would not give up that season for anything.",
            ),
          ],
        },
        listening: {
          title: "After the match",
          transcript: `Coach: Sit down for a minute, Nam. How are you feeling?

Boy: Honestly? Terrible. I missed the easiest chance of the match.

Coach: You did. You also made two of our three best passes.

Boy: Nobody remembers passes when we lose four to one.

Coach: I remember them. Listen, I have been coaching for eleven years, and I have never seen a player improve without missing something first.

Boy: My father says I should train on Sundays as well.

Coach: Your father wants the best for you. But you already train five days a week. If you trained on Sundays too, you would get an injury, not a place in the team.

Boy: So what should I do?

Coach: Rest on Sunday. On Monday we will practise finishing for twenty minutes, just you and me. And do not give up on yourself after one afternoon.`,
          questions: [
            mcq(
              "What good thing does the coach remind Nam about?",
              "Thầy nhắc Nam nhớ điều tốt nào?",
              [
                "He scored the only goal of the match.",
                "He made two of the team's three best passes.",
                "He trained more than anyone else.",
                "He never made a mistake all season.",
              ],
              1,
              "Ngay sau khi đồng ý rằng Nam đã bỏ lỡ cơ hội, thầy bổ sung rằng Nam cũng thực hiện HAI trong BA đường chuyền hay nhất của đội.",
              "You also made two of our three best passes.",
            ),
            mcq(
              "Why does the coach not want Nam to train on Sundays?",
              "Vì sao thầy không muốn Nam tập thêm vào Chủ nhật?",
              [
                "Because the pitch is closed on Sundays.",
                "Because Nam would get an injury instead of a place in the team.",
                "Because Nam has too much homework.",
                "Because his father would be angry.",
              ],
              1,
              "Thầy dùng câu điều kiện loại 2 để cảnh báo: nếu tập cả Chủ nhật nữa thì Nam sẽ nhận được một chấn thương chứ không phải một suất trong đội.",
              "If you trained on Sundays too, you would get an injury, not a place in the team.",
            ),
            mcq(
              "What is the coach's attitude towards Nam?",
              "Thái độ của thầy đối với Nam là thế nào?",
              [
                "Disappointed and unwilling to help.",
                "Honest but encouraging.",
                "Angry about the result of the match.",
                "Uninterested in Nam's future.",
              ],
              1,
              "Thầy không nói dối (thầy công nhận Nam bỏ lỡ cơ hội) nhưng lập tức chỉ ra điểm tốt, hẹn tập riêng hai mươi phút và dặn đừng từ bỏ chính mình. Đó là thái độ thẳng thắn nhưng đầy động viên.",
              "And do not give up on yourself after one afternoon.",
            ),
            tf(
              "The coach has been working as a coach for eleven years.",
              "Thầy đã làm huấn luyện viên được mười một năm.",
              true,
              "ĐÚNG. Thầy tự nói rằng thầy đã huấn luyện mười một năm và chưa từng thấy cầu thủ nào tiến bộ mà không bỏ lỡ điều gì đó trước.",
              "I have been coaching for eleven years",
            ),
          ],
        },
        writingPrompt:
          "Có ý kiến cho rằng: 'Thi đấu thể thao gây quá nhiều áp lực cho học sinh, nên bỏ chấm điểm và bỏ giải thưởng.' Em đồng ý hay không? Viết một đoạn 90–120 từ nêu quan điểm, có ít nhất một lý lẽ CHO và một lý lẽ CHỐNG. Bắt buộc dùng 'although' hoặc 'however' và một câu điều kiện loại 2.",
        writingOutline:
          "1. Nêu quan điểm của em ngay câu đầu (I do not believe that… / I agree that…).\n2. Lý lẽ ủng hộ ý kiến trên: áp lực có thật, cho một ví dụ.\n3. Chuyển hướng bằng 'However,…': vì sao thi đấu vẫn có ích (practise, improve, confidence).\n4. Một câu điều kiện loại 2: 'If nobody kept the score, we would…'.\n5. Kết: điều kiện để thi đấu trở nên lành mạnh (vai trò của coach và bố mẹ).",
        speaking: {
          sentences: [
            "We had practised four times a week before the final.",
            "Competition puts a lot of pressure on young players.",
            "Although we lost, we improved a great deal this season.",
            "A good coach encourages you instead of shouting at you.",
            "If nobody kept the score, we would practise much less.",
            "Do your best and do not give up after one mistake.",
          ],
          questions: [
            {
              question: "Do you play any sport? How often do you practise?",
              sampleAnswer:
                "I play badminton twice a week with my cousin. We are not in a team, but we keep the score, and that makes both of us try harder than we would in a friendly game.",
            },
            {
              question: "How do you feel when your team loses an important match?",
              sampleAnswer:
                "I feel terrible for a day or two, especially if I made a mistake. Then I usually notice that I have improved in other ways, and I start looking forward to the next match.",
            },
            {
              question: "Is competition good or bad for teenagers? What do you think?",
              sampleAnswer:
                "I think it is good if it is fair. Competition teaches you to prepare and to lose politely. However, if adults only talk about winning, young players become afraid of making mistakes.",
            },
            {
              question: "What makes a good coach or a good teacher?",
              sampleAnswer:
                "A good coach is honest about your mistakes but still encourages you. My coach always tells me one thing to fix and one thing I did well, so I leave training with confidence.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "News and Media",
        topicVi: "Tin tức và truyền thông",
        icon: "📰",
        words: [
          word("news", "/njuːz/", "tin tức", "📰"),
          word("media", "/ˈmiːdiə/", "truyền thông", "📺"),
          word("headline", "/ˈhedlaɪn/", "tiêu đề tin", "🗞️"),
          word("journalist", "/ˈdʒɜːnəlɪst/", "nhà báo", "🎤"),
          word("article", "/ˈɑːtɪkl/", "bài báo", "📄"),
          word("report", "/rɪˈpɔːt/", "bản tin; đưa tin", "📝"),
          word("source", "/sɔːs/", "nguồn tin", "🔎"),
          word("evidence", "/ˈevɪdəns/", "bằng chứng", "🔬"),
          word("fake", "/feɪk/", "giả, không có thật", "🚫"),
          word("spread", "/spred/", "lan truyền", "🌐"),
          word("share", "/ʃeə(r)/", "chia sẻ (bài đăng)", "↗️"),
          word("reliable", "/rɪˈlaɪəbl/", "đáng tin cậy", "🏛️"),
          word("influence", "/ˈɪnfluəns/", "ảnh hưởng", "🧲"),
          word("opinion", "/əˈpɪnjən/", "ý kiến", "💭"),
          word("check the facts", "/tʃek ðə fækts/", "kiểm chứng thông tin", "✅"),
        ],
        sound: {
          letters: "Nối âm & dạng yếu",
          sound: "/an‿article · check‿the‿facts/",
          hint: "Người bản ngữ NỐI phụ âm cuối của từ trước sang nguyên âm đầu của từ sau: an article nghe thành /əˈnɑːtɪkl/, check it out thành /tʃeˈkɪˈtaʊt/. Đồng thời các từ nhỏ bị đọc dạng yếu: of → /əv/, the → /ðə/, was → /wəz/, to → /tə/. Người Việt thường tách rời từng từ và chèn một khoảng nghỉ nhỏ giữa chúng, vì tiếng Việt viết rời từng tiếng — kết quả là nghe rất giật cục và cũng khiến chính mình nghe không ra tiếng Anh tự nhiên. Cách sửa: đọc cả cụm như MỘT từ dài. Nhưng đừng nối bằng cách bỏ phụ âm: checkED, facTS, sourCE vẫn phải phát ra.",
          words: [
            { word: "an‿article", meaning: "một bài báo — nối n sang a", emoji: "📄" },
            { word: "check‿the‿facts", meaning: "kiểm chứng thông tin — đọc liền một hơi", emoji: "✅" },
            { word: "a lot‿of‿evidence", meaning: "rất nhiều bằng chứng — of đọc yếu /əv/", emoji: "🔬" },
            { word: "share‿it‿online", meaning: "chia sẻ nó lên mạng — nối r sang it", emoji: "🌐" },
          ],
        },
        reading: {
          title: "The Photograph That Was Not Ours",
          passage: `Two months ago a photograph of our school appeared online. In the picture, brown water covered the playground, and the headline said that lessons had been cancelled for a week. Within one evening the post had been shared more than eight thousand times.

The problem was simple. The photograph was not ours. A journalist from a local newspaper checked the facts and reported that the image had been taken in another province three years earlier. By then, however, hundreds of parents had already telephoned the school.

I used to think that fake news was something that happened to adults, far away from me. Now I know that it spreads fastest among people who care. Nobody shared that photograph to be unkind. They shared it because they were worried about their children.

Since then our class has learned a simple habit. Before we share anything, we ask three questions. Who wrote this? What evidence is given? Is the source a real news organisation, or an account that nobody has ever heard of?

Some of my friends say that this is far too much work for one click. In my opinion, they are wrong. A false report can damage a person in a few hours, and an apology never travels as far as the story did.

Although social media gives young people a real voice, that influence works in both directions. If we shared only what we had checked, most false stories would stop moving. A reliable article is not always the most exciting one, and the most exciting headline is very often the one we should read most carefully.`,
          translation: `Hai tháng trước, một tấm ảnh chụp trường tớ xuất hiện trên mạng. Trong ảnh, nước nâu ngập kín sân trường, còn tiêu đề thì viết rằng nhà trường đã cho nghỉ học cả tuần. Chỉ trong một buổi tối, bài đăng đó đã được chia sẻ hơn tám nghìn lần.

Vấn đề rất đơn giản. Tấm ảnh đó không phải của trường tớ. Một nhà báo ở tờ báo địa phương đã kiểm chứng và đưa tin rằng bức ảnh được chụp ở một tỉnh khác từ ba năm trước. Nhưng đến lúc đó thì hàng trăm phụ huynh đã gọi điện tới trường rồi.

Trước đây tớ cứ nghĩ tin giả là chuyện của người lớn, ở đâu đó xa lắc. Giờ thì tớ biết nó lan nhanh nhất trong số những người quan tâm. Chẳng ai chia sẻ tấm ảnh ấy vì ác ý cả. Họ chia sẻ vì họ lo cho con mình.

Từ đó lớp tớ tập được một thói quen đơn giản. Trước khi chia sẻ bất cứ thứ gì, tụi tớ đặt ba câu hỏi. Ai viết cái này? Có bằng chứng gì? Nguồn tin là một cơ quan báo chí thật hay chỉ là một tài khoản chưa ai từng nghe tên?

Vài đứa bạn tớ bảo làm thế thì mệt quá cho một cú bấm chia sẻ. Theo ý tớ, các bạn ấy sai. Một bản tin sai có thể làm tổn hại một con người chỉ trong vài giờ, còn lời xin lỗi thì chẳng bao giờ đi xa được bằng câu chuyện ban đầu.

Mặc dù mạng xã hội cho người trẻ một tiếng nói thật sự, ảnh hưởng đó có hai chiều. Nếu tụi mình chỉ chia sẻ những gì đã kiểm chứng, phần lớn tin sai sẽ đứng lại. Một bài báo đáng tin không phải lúc nào cũng là bài hấp dẫn nhất, và cái tiêu đề hấp dẫn nhất rất thường là cái ta nên đọc kỹ nhất.`,
          questions: [
            mcq(
              "What is the main message of the passage?",
              "Thông điệp chính của bài đọc là gì?",
              [
                "Social media should not be used by teenagers.",
                "We should check information carefully before we share it.",
                "Local newspapers are always more accurate than websites.",
                "Photographs on the internet are usually old.",
              ],
              1,
              "Bài dùng câu chuyện tấm ảnh giả để dẫn tới thói quen ba câu hỏi trước khi chia sẻ, rồi chốt lại rằng nếu chỉ chia sẻ những gì đã kiểm chứng thì tin sai sẽ dừng lại. Ý chính là kiểm chứng trước khi chia sẻ, chứ không phải cấm mạng xã hội.",
            ),
            mcq(
              "What did the journalist discover about the photograph?",
              "Nhà báo phát hiện ra điều gì về tấm ảnh?",
              [
                "It had been taken in another province three years earlier.",
                "It had been drawn by a computer.",
                "It showed the school after a real flood.",
                "It had been taken by a parent that morning.",
              ],
              0,
              "Nhà báo kiểm chứng và đưa tin rằng bức ảnh được chụp ở MỘT TỈNH KHÁC, từ BA NĂM TRƯỚC — nghĩa là ảnh có thật nhưng không phải của trường này và không phải mới đây.",
              "reported that the image had been taken in another province three years earlier",
            ),
            mcq(
              "According to the writer, why did people share the photograph?",
              "Theo người viết, vì sao mọi người chia sẻ tấm ảnh đó?",
              [
                "Because they wanted to harm the school.",
                "Because they thought it was funny.",
                "Because they were worried about their children.",
                "Because a journalist asked them to.",
              ],
              2,
              "Bài nói rõ chẳng ai chia sẻ vì ác ý; họ chia sẻ VÌ LO cho con mình. Đây cũng là điều làm tin giả lan nhanh nhất trong nhóm người quan tâm.",
              "They shared it because they were worried about their children.",
            ),
            mcq(
              "What three questions does the writer's class ask before sharing?",
              "Lớp của người viết đặt ba câu hỏi nào trước khi chia sẻ?",
              [
                "How old is the post, how many likes has it got, and who shared it first?",
                "Who wrote it, what evidence is given, and is the source real?",
                "Is it interesting, is it short, and is it about our school?",
                "Who took the photograph, when, and with which camera?",
              ],
              1,
              "Bài liệt kê đúng ba câu hỏi: Ai viết cái này? Có bằng chứng gì? Nguồn có phải một cơ quan báo chí thật hay chỉ là tài khoản lạ?",
              "Who wrote this? What evidence is given? Is the source a real news organisation",
            ),
            mcq(
              "What does the writer imply by saying that an apology never travels as far as the story did?",
              "Khi nói lời xin lỗi không bao giờ đi xa bằng câu chuyện ban đầu, người viết ngầm ý gì?",
              [
                "That newspapers should apologise more often.",
                "That the harm done by a false story cannot be fully repaired later.",
                "That people enjoy reading apologies.",
                "That stories should be shorter so that they are easier to correct.",
              ],
              1,
              "Ý ngầm là: bài đính chính chỉ đến được với ít người hơn nhiều so với tin sai ban đầu, nên thiệt hại không thể sửa hết được. Người viết không nói thẳng câu đó ra mà để hình ảnh đi xa nói thay.",
            ),
            tf(
              "The writer thinks the most exciting headline is usually the most reliable one.",
              "Người viết cho rằng tiêu đề hấp dẫn nhất thường là tiêu đề đáng tin nhất.",
              false,
              "SAI. Câu cuối bài nói ngược lại: bài đáng tin không phải lúc nào cũng hấp dẫn nhất, và tiêu đề hấp dẫn nhất lại thường là thứ ta nên đọc KỸ nhất, tức là nên nghi ngờ nhất.",
              "A reliable article is not always the most exciting one",
            ),
          ],
        },
        listening: {
          title: "Is this post true?",
          transcript: `Girl: Have you seen the post about our school closing next week?

Boy: My cousin sent it to me this morning. Three people in our class have already shared it.

Girl: Look at the account, though. It was created in May, and it has no other articles at all.

Boy: That is a good point. And the photograph looks strange. The trees are wrong, and our gate is blue, not white.

Girl: Exactly. My mother telephoned the office, and the secretary told her that nothing had been cancelled.

Boy: So what do we do? People are still sharing it.

Girl: We could write a short message with the school phone number and ask people to check the facts before they pass it on.

Boy: Good idea. Although we cannot stop the story completely, we can slow it down.

Girl: And next time, we check first and share second.`,
          questions: [
            mcq(
              "What makes the girl suspicious about the account?",
              "Điều gì khiến bạn nữ nghi ngờ tài khoản đăng bài?",
              [
                "It has thousands of followers.",
                "It was created in May and has no other articles.",
                "It belongs to a journalist she does not like.",
                "It always writes about schools.",
              ],
              1,
              "Bạn nữ chỉ ra hai dấu hiệu của một nguồn không đáng tin: tài khoản mới được lập hồi tháng Năm và không hề có bài viết nào khác.",
              "It was created in May, and it has no other articles at all.",
            ),
            mcq(
              "What proves that the photograph is not of their school?",
              "Chi tiết nào chứng minh tấm ảnh không phải chụp trường của họ?",
              [
                "The playground is too small.",
                "There are no students in the picture.",
                "The trees are wrong and the gate is the wrong colour.",
                "The photograph is in black and white.",
              ],
              2,
              "Bạn nam đưa bằng chứng hình ảnh: cây trong ảnh không giống, và cổng trường mình màu XANH chứ không phải màu trắng như trong ảnh.",
              "The trees are wrong, and our gate is blue, not white.",
            ),
            mcq(
              "What do the two students decide to do?",
              "Hai bạn quyết định làm gì?",
              [
                "Report the account to the police.",
                "Ask the secretary to write an article.",
                "Post a message with the school phone number so people can check.",
                "Share the post themselves with a warning.",
              ],
              2,
              "Bạn nữ đề xuất viết một tin nhắn ngắn kèm SỐ ĐIỆN THOẠI của trường và mời mọi người kiểm chứng trước khi chuyển tiếp. Bạn nam đồng ý ngay.",
              "We could write a short message with the school phone number and ask people to check the facts before they pass it on.",
            ),
            tf(
              "The students believe they can stop the false story completely.",
              "Hai bạn tin rằng mình có thể chặn đứng hoàn toàn tin sai đó.",
              false,
              "SAI. Bạn nam nói rõ bằng mệnh đề nhượng bộ: MẶC DÙ không thể chặn hẳn câu chuyện, tụi mình vẫn có thể làm nó chậm lại.",
              "Although we cannot stop the story completely, we can slow it down.",
            ),
          ],
        },
        writingPrompt:
          "Một bài đăng nói rằng trường em sắp nghỉ học một tuần đang được chia sẻ rầm rộ, nhưng nó không có thật. Hãy viết một đoạn 90–120 từ giải thích cho các bạn: làm sao em biết tin đó sai, và mọi người nên làm gì trước khi bấm chia sẻ. Bắt buộc có một câu bị động (The post had been shared…) và một câu tường thuật (The secretary told my mother that…).",
        writingOutline:
          "1. Mô tả tin đồn: nó nói gì và lan nhanh thế nào (dùng câu bị động).\n2. Bằng chứng 1: về tài khoản đăng bài (nguồn có reliable không?).\n3. Bằng chứng 2: chi tiết trong ảnh hoặc lời xác nhận từ nhà trường (dùng câu tường thuật).\n4. Ba câu hỏi nên tự hỏi trước khi share (who / what evidence / which source).\n5. Kết: một lời kêu gọi ngắn — check first, share second.",
        speaking: {
          sentences: [
            "The post had been shared more than eight thousand times.",
            "A journalist checked the facts and reported the truth.",
            "Fake news spreads fastest among people who care.",
            "Who wrote this article, and what evidence is given?",
            "Although social media gives us a voice, that influence works both ways.",
            "If we shared only what we had checked, false stories would stop.",
          ],
          questions: [
            {
              question: "Where do you usually get your news?",
              sampleAnswer:
                "Mostly from my phone in the evening, and from my parents at dinner. I try to read the same story on two different websites, because one headline never gives you the whole picture.",
            },
            {
              question: "Have you ever seen a story online that turned out to be false?",
              sampleAnswer:
                "Yes. Last year a post said that our exams had been moved, and half my class believed it. Our form teacher told us the next morning that nothing had changed.",
            },
            {
              question: "How can we tell whether a source is reliable?",
              sampleAnswer:
                "I look at who wrote it, whether there is real evidence, and whether other news organisations report the same thing. If the account is new and has no other articles, I do not trust it.",
            },
            {
              question: "Do you think social media has more good or bad influence on teenagers?",
              sampleAnswer:
                "In my opinion it has both. It gives us a voice and lets us learn from people all over the world. However, it also spreads false stories very quickly, so we have to read carefully.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 3 · Con đường phía trước",
    subtitle: "Nghề nghiệp, du học và ước mơ — nói về tương lai bằng tiếng Anh",
    lessons: [
      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Choosing a Career",
        topicVi: "Chọn nghề cho tương lai",
        icon: "💼",
        words: [
          word("career", "/kəˈrɪə(r)/", "sự nghiệp, con đường nghề nghiệp", "💼"),
          word("job", "/dʒɒb/", "công việc, việc làm", "🧑‍🔧"),
          word("salary", "/ˈsæləri/", "lương", "💵"),
          word("skill", "/skɪl/", "kỹ năng", "🛠️"),
          word("experience", "/ɪkˈspɪəriəns/", "kinh nghiệm; trải nghiệm", "📚"),
          word("qualification", "/ˌkwɒlɪfɪˈkeɪʃn/", "bằng cấp", "🎓"),
          word("training", "/ˈtreɪnɪŋ/", "sự đào tạo", "🏫"),
          word("apply for", "/əˈplaɪ fɔː(r)/", "nộp đơn xin (việc, học bổng)", "✉️"),
          word("interview", "/ˈɪntəvjuː/", "buổi phỏng vấn", "🗣️"),
          word("part-time", "/ˌpɑːt ˈtaɪm/", "bán thời gian", "⏳"),
          word("earn a living", "/ɜːn ə ˈlɪvɪŋ/", "kiếm sống", "🍚"),
          word("passion", "/ˈpæʃn/", "đam mê", "❤️"),
          word("opportunity", "/ˌɒpəˈtjuːnəti/", "cơ hội", "🚪"),
          word("engineer", "/ˌendʒɪˈnɪə(r)/", "kỹ sư", "👷"),
          word("nurse", "/nɜːs/", "y tá, điều dưỡng", "🩺"),
        ],
        sound: {
          letters: "↘↗ khi còn phân vân",
          sound: "/Well… ↘↗/",
          hint: "Ngữ điệu XUỐNG rồi LÊN lại (fall-rise) ở cuối câu nghĩa là \"tôi đồng ý một phần thôi\" hoặc \"còn điều gì đó chưa nói hết\": Well, the salary is fine↘↗ (…nhưng công việc thì chán). Người Việt hay kết thúc bằng một giọng phẳng nên câu nghe như một khẳng định dứt khoát, dễ làm người nghe tưởng bạn đồng ý hoàn toàn hoặc đang cộc lốc. Cách sửa: hạ giọng ở âm tiết nhấn rồi nhấc nhẹ lên ở âm tiết cuối, kèm kéo dài một chút. Đừng quên phụ âm cuối khi kéo dài: fine chứ không phải \"fai\", job chứ không phải \"jo\".",
          words: [
            { word: "Well, the salary is fine… ↘↗", meaning: "Lương thì ổn… (nhưng còn điều khác)", emoji: "💵" },
            { word: "I quite like the job… ↘↗", meaning: "Tớ cũng thích công việc đó… (chưa chắc chắn)", emoji: "💼" },
            { word: "It could be an opportunity… ↘↗", meaning: "Cũng có thể là một cơ hội… (còn dè dặt)", emoji: "🚪" },
            { word: "Maybe. ↘↗", meaning: "Có lẽ vậy. (chưa đồng ý hẳn)", emoji: "🤔" },
          ],
        },
        reading: {
          title: "Should You Just Follow Your Passion?",
          passage: `Every year thousands of Vietnamese students choose a university course at seventeen. Adults love to give the same advice: follow your passion. I am not sure it is complete.

My cousin Trang wanted to be a nurse from the age of eight. She now works in a hospital in Hue. The hours are long and the salary is not high, but she says she would not change her job for anything. Passion, in her case, was clearly the right guide.

My uncle is different. He became an engineer because his family needed the money, and he admits that he chose the qualification, not the work. Twenty years later he loves it. Interest often grows after you become good at something.

So which is right? I think the honest answer is that a career is built from three things: what you enjoy, what you are good at, and what other people will pay for. Passion alone will not earn a living, and a high salary alone will not get you out of bed on a wet Monday.

Last summer I had a part-time job in my aunt's bakery. When I applied for it, she still gave me a real interview. The work itself was boring, but I learned more about talking to customers than any book had taught me. Experience is a kind of information, and you cannot get it by thinking.

If I were asked for advice, I would not simply say follow your passion. I would say try things early, collect skills, and stay curious. Some careers need years of training, so start looking early. The right opportunity is easier to see when you have trained yourself to look.`,
          translation: `Mỗi năm có hàng nghìn học sinh Việt Nam chọn ngành đại học khi mới mười bảy tuổi. Người lớn rất thích cho một lời khuyên giống nhau: hãy theo đuổi đam mê. Tớ thì không chắc lời khuyên ấy đã đủ.

Chị họ tớ tên Trang, từ năm tám tuổi đã muốn làm y tá. Giờ chị làm ở một bệnh viện tại Huế. Giờ giấc thì dài, lương thì không cao, nhưng chị bảo đổi gì chị cũng không đổi nghề. Trong trường hợp của chị, đam mê rõ ràng là kim chỉ nam đúng.

Chú tớ thì khác. Chú làm kỹ sư vì hồi đó nhà cần tiền, và chú thừa nhận là chú chọn cái bằng chứ không phải chọn công việc. Hai mươi năm sau, chú lại yêu nghề. Hứng thú thường nảy sinh SAU khi ta giỏi một việc gì đó.

Vậy ai đúng? Tớ nghĩ câu trả lời thành thật là: một sự nghiệp được dựng lên từ ba thứ — điều mình thích, điều mình giỏi, và điều người khác chịu trả tiền. Chỉ có đam mê thôi thì không kiếm sống được, mà chỉ có lương cao thôi thì cũng chẳng kéo nổi mình ra khỏi giường vào một sáng thứ Hai mưa gió.

Hè năm ngoái tớ làm bán thời gian ở tiệm bánh của dì. Khi tớ nộp đơn, dì vẫn phỏng vấn tớ đàng hoàng. Bản thân công việc thì chán, nhưng tớ học được về cách nói chuyện với khách nhiều hơn bất kỳ cuốn sách nào từng dạy tớ. Trải nghiệm cũng là một dạng thông tin, mà thứ đó thì ngồi nghĩ không ra được.

Nếu được hỏi xin lời khuyên, tớ sẽ không chỉ nói hãy theo đuổi đam mê. Tớ sẽ nói: thử sớm, gom kỹ năng, và giữ sự tò mò. Có những nghề cần nhiều năm đào tạo, nên hãy bắt đầu tìm hiểu sớm. Cơ hội đúng sẽ dễ nhận ra hơn khi mình đã tự luyện cho mắt biết nhìn.`,
          questions: [
            mcq(
              "What is the writer's main opinion about choosing a career?",
              "Ý kiến chính của người viết về việc chọn nghề là gì?",
              [
                "Students should always choose the job with the highest salary.",
                "Passion alone is not enough; skills, experience and money all matter.",
                "Nobody should decide on a career before they are twenty-five.",
                "Engineering is a safer choice than nursing.",
              ],
              1,
              "Người viết kể hai ví dụ trái ngược (chị Trang theo đam mê, chú theo bằng cấp) rồi chốt ở đoạn 4 rằng sự nghiệp cần ĐỦ BA thứ: thích, giỏi, và có người trả tiền. Vậy ý chính là đam mê thôi thì chưa đủ.",
            ),
            mcq(
              "Why did the writer's uncle become an engineer?",
              "Vì sao chú của người viết trở thành kỹ sư?",
              [
                "Because he had always loved machines.",
                "Because his family needed the money.",
                "Because his teacher advised him to.",
                "Because the training was short.",
              ],
              1,
              "Bài nói rõ chú chọn nghề vì GIA ĐÌNH CẦN TIỀN, và chú thừa nhận là chọn cái bằng chứ không phải chọn công việc. Tình yêu nghề chỉ đến sau đó hai mươi năm.",
              "He became an engineer because his family needed the money",
            ),
            mcq(
              "What did the writer learn from the part-time job at the bakery?",
              "Người viết học được gì từ công việc bán thời gian ở tiệm bánh?",
              [
                "How to bake bread properly.",
                "How to run a small business.",
                "How to talk to customers.",
                "How to apply for a scholarship.",
              ],
              2,
              "Bài viết nói bản thân công việc thì chán, nhưng bạn ấy học được về CÁCH NÓI CHUYỆN VỚI KHÁCH nhiều hơn bất kỳ cuốn sách nào — chứ không phải học làm bánh.",
              "I learned more about talking to customers than any book had taught me",
            ),
            mcq(
              "What does the writer imply about the advice adults usually give?",
              "Người viết ngầm nói gì về lời khuyên mà người lớn thường đưa ra?",
              [
                "It is completely wrong and should be ignored.",
                "It is well meant but too simple to be useful on its own.",
                "It is only suitable for students who want to be nurses.",
                "It has changed a lot in the last twenty years.",
              ],
              1,
              "Người viết không hề nói lời khuyên đó sai — chị Trang là ví dụ cho thấy nó đúng. Bạn ấy chỉ nói KHÔNG CHẮC lời khuyên ấy đã đủ, rồi bổ sung thêm hai yếu tố nữa. Hàm ý là: có thiện chí nhưng quá đơn giản.",
            ),
            mcq(
              "What advice would the writer give to other students?",
              "Người viết sẽ khuyên các bạn học sinh khác điều gì?",
              [
                "Choose the course your parents prefer.",
                "Wait until you are certain before you try anything.",
                "Try things early, collect skills and stay curious.",
                "Only apply for jobs with a high salary.",
              ],
              2,
              "Đoạn cuối ghi rõ ba lời khuyên: thử sớm, gom kỹ năng, và giữ sự tò mò. Bạn ấy còn nói thêm rằng nhiều nghề cần nhiều năm đào tạo nên tìm hiểu sớm là hơn.",
              "I would say try things early, collect skills, and stay curious.",
            ),
            tf(
              "According to the passage, people can only enjoy a job if they loved it before they started.",
              "Theo bài đọc, người ta chỉ có thể yêu một công việc nếu đã yêu nó từ trước khi bắt đầu.",
              false,
              "SAI. Câu chuyện của người chú chứng minh điều ngược lại, và bài viết nói thẳng rằng hứng thú thường nảy sinh SAU khi ta trở nên giỏi một việc gì đó.",
              "Interest often grows after you become good at something.",
            ),
          ],
        },
        listening: {
          title: "Talking to the careers adviser",
          transcript: `Adviser: Come in, Khanh. You wanted to talk about next year.

Boy: Yes. Everybody tells me to follow my passion, but I have three passions and no idea.

Adviser: That is far more common than you think. What did you enjoy most this year?

Boy: The part-time job at my aunt's bakery, strangely. Not the baking, the talking.

Adviser: That is useful information. It suggests that you like working with people.

Boy: My father wants me to be an engineer. He says the salary is safer.

Adviser: He is not wrong about the salary. However, a job you cannot bear is expensive in a different way.

Boy: So what should I do?

Adviser: Apply for two weeks of work experience this summer, one in an office and one in a hospital. You will learn more in ten days than in ten conversations.

Boy: And if I still cannot decide?

Adviser: Then choose the course that keeps the most doors open, and keep collecting skills.`,
          questions: [
            mcq(
              "What part of the bakery job did Khanh enjoy?",
              "Khanh thích phần nào của công việc ở tiệm bánh?",
              [
                "Baking the bread.",
                "Talking to people.",
                "Counting the money.",
                "Cleaning the shop.",
              ],
              1,
              "Khanh nói rõ và hơi bất ngờ với chính mình: không phải việc làm bánh, mà là việc NÓI CHUYỆN. Cô tư vấn liền chỉ ra rằng điều đó cho thấy bạn ấy thích làm việc với con người.",
              "Not the baking, the talking.",
            ),
            mcq(
              "What does the adviser mean when she says a job you cannot bear is expensive in a different way?",
              "Cô tư vấn muốn nói gì khi bảo một công việc mình không chịu nổi lại đắt theo một kiểu khác?",
              [
                "That such a job costs a lot of money to train for.",
                "That you pay for it with your happiness and health, not with money.",
                "That the salary is always lower than people expect.",
                "That you will have to change jobs and lose your salary.",
              ],
              1,
              "Cô đang so sánh: bố Khanh nói đúng về lương, NHƯNG cái giá của một công việc mình chán không tính bằng tiền mà tính bằng những thứ khác trong đời sống. Đó là cách nói ẩn dụ.",
              "a job you cannot bear is expensive in a different way",
            ),
            mcq(
              "What does the adviser suggest Khanh does this summer?",
              "Cô tư vấn gợi ý Khanh làm gì trong mùa hè này?",
              [
                "Apply for two weeks of work experience in two different places.",
                "Take an engineering course at university.",
                "Work full-time in his aunt's bakery.",
                "Talk to ten people about their jobs.",
              ],
              0,
              "Cô đề nghị nộp đơn xin HAI TUẦN trải nghiệm nghề, một ở văn phòng và một ở bệnh viện, vì mười ngày làm thật dạy nhiều hơn mười cuộc trò chuyện.",
              "Apply for two weeks of work experience this summer, one in an office and one in a hospital.",
            ),
            tf(
              "The adviser tells Khanh that his father is wrong about everything.",
              "Cô tư vấn nói với Khanh rằng bố bạn ấy sai hoàn toàn.",
              false,
              "SAI. Cô công nhận bố Khanh nói ĐÚNG về chuyện lương, chỉ bổ sung thêm một góc nhìn khác bằng từ However.",
              "He is not wrong about the salary.",
            ),
          ],
        },
        writingPrompt:
          "Một bạn cùng lớp hỏi em: 'Có nên chọn nghề theo đam mê không?'. Viết một đoạn 90–120 từ trả lời: em nghĩ nên dựa vào những yếu tố nào để chọn nghề, và vì sao. Bắt buộc dùng ít nhất một câu điều kiện loại 2 (If I were…, I would…) và một câu với 'however' hoặc 'although'.",
        writingOutline:
          "1. Nêu quan điểm của em về câu 'follow your passion' (đồng ý một phần? hoàn toàn?).\n2. Một ví dụ thật: người em biết đã chọn nghề thế nào và kết quả ra sao.\n3. Nêu mặt còn lại bằng 'However,…' — salary, qualification, cơ hội việc làm.\n4. Ba yếu tố em cho là quan trọng khi chọn nghề (dùng ngữ điệu liệt kê ↗ ↗ ↘ khi nói).\n5. Kết bằng một câu điều kiện loại 2: 'If I were you, I would…'.",
        speaking: {
          sentences: [
            "A career is built from what you enjoy and what you are good at.",
            "Passion alone will not earn a living.",
            "I applied for a part-time job and had a real interview.",
            "Although the salary was low, she would not change her job.",
            "If I were asked for advice, I would say try things early.",
            "Some careers need years of training before you can start.",
          ],
          questions: [
            {
              question: "What job would you like to do in the future? Why?",
              sampleAnswer:
                "I would like to be a doctor, mainly because my aunt is a nurse and I have seen how much her work matters. However, I know it needs many years of training, so I am also looking at other options.",
            },
            {
              question: "Do you agree with the advice to follow your passion?",
              sampleAnswer:
                "Partly. Passion keeps you going when the work is hard, although it does not pay the rent by itself. I think you also need a skill that other people actually need.",
            },
            {
              question: "Have you ever had a part-time job or done work experience?",
              sampleAnswer:
                "I helped in my aunt's shop last summer for three weeks. The work was repetitive, but I became much more confident about speaking to strangers, and that is a skill I use every day.",
            },
            {
              question: "What skills do you think are most useful for any job?",
              sampleAnswer:
                "Listening carefully, explaining your ideas clearly and finishing what you start. Those three skills are useful whether you become an engineer, a nurse or a teacher.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Studying Abroad",
        topicVi: "Đi du học",
        icon: "✈️",
        words: [
          word("abroad", "/əˈbrɔːd/", "ở nước ngoài", "✈️"),
          word("exchange", "/ɪksˈtʃeɪndʒ/", "chương trình trao đổi", "🔄"),
          word("scholarship", "/ˈskɒləʃɪp/", "học bổng", "🎓"),
          word("term", "/tɜːm/", "học kỳ", "📅"),
          word("host family", "/ˈhəʊst ˌfæməli/", "gia đình bản xứ nhận nuôi", "👨‍👩‍👧"),
          word("culture", "/ˈkʌltʃə(r)/", "văn hoá", "🌏"),
          word("homesick", "/ˈhəʊmsɪk/", "nhớ nhà", "🏠"),
          word("miss", "/mɪs/", "nhớ (ai/cái gì)", "💌"),
          word("adapt", "/əˈdæpt/", "thích nghi", "🔧"),
          word("get used to", "/ɡet ˈjuːst tə/", "dần quen với", "🔁"),
          word("fluent", "/ˈfluːənt/", "trôi chảy, lưu loát", "🗣️"),
          word("make friends", "/meɪk frendz/", "kết bạn", "🤗"),
          word("cost of living", "/kɒst əv ˈlɪvɪŋ/", "chi phí sinh hoạt", "💴"),
          word("challenge", "/ˈtʃælɪndʒ/", "thử thách", "🧗"),
          word("benefit", "/ˈbenɪfɪt/", "lợi ích", "➕"),
        ],
        sound: {
          letters: "Ngắt ý (thought groups)",
          sound: "/When she arrived | she was homesick./",
          hint: "Người bản ngữ không nghỉ tuỳ tiện giữa câu: họ chia câu thành từng CỤM Ý rồi nghỉ rất ngắn ở ranh giới cụm — When she arrived in New Zealand | she was homesick | for three weeks. Người Việt hay hít thở theo số chữ (đọc vài từ lại nghỉ) hoặc đọc một hơi không nghỉ, khiến câu dài trở nên khó hiểu với người nghe. Cách sửa: trước khi nói, gạch chéo trong đầu sau mỗi mệnh đề, sau cụm trạng ngữ đầu câu, và trước although / however. Trong mỗi cụm thì NỐI liền các từ, còn giữa hai cụm mới được nghỉ.",
          words: [
            { word: "When she arrived | she was homesick.", meaning: "Nghỉ sau mệnh đề thời gian", emoji: "🏠" },
            { word: "Although the scholarship helped | it did not pay for everything.", meaning: "Nghỉ trước mệnh đề chính", emoji: "🎓" },
            { word: "In the first month | she made two friends.", meaning: "Nghỉ sau trạng ngữ đầu câu", emoji: "🤗" },
            { word: "She got used to the cold | the food | and the classes.", meaning: "Nghỉ giữa các mục liệt kê", emoji: "❄️" },
          ],
        },
        reading: {
          title: "Four Months on the Other Side of the World",
          passage: `When my sister won a scholarship to join an exchange programme in New Zealand for one term, everybody in our street said the same thing: how lucky she is. She agrees, but she also says that the first month was the hardest of her life.

She left in July. For three weeks she was badly homesick. She missed our grandmother's soup, the noise of our alley and the feeling of being understood without any effort. Her English was good, and yet she was not fluent, so in a fast conversation she caught only half of what was said.

Her host family helped more than any teacher. They asked her to cook a Vietnamese meal on her second Sunday, and after that evening people began asking her real questions instead of simply being polite. Slowly she got used to the cold, the food and the habit of speaking in class before you are asked, and she adapted faster than she had expected.

Studying abroad is not a holiday, and it is not cheap. Although her scholarship covered the school fees, our parents still paid for the flights, and the cost of living there surprised them. Many families cannot consider it at all, and it would be unfair to pretend otherwise.

However, the benefit was real. My sister came home able to explain an opinion in English without preparing it first. She also came home understanding her own culture better, because for four months she had to describe it to other people almost every day.

If I were offered the same challenge, I would say yes immediately. I would simply pack more warm clothes and fewer expectations.`,
          translation: `Khi chị tớ giành được học bổng tham gia chương trình trao đổi ở New Zealand một học kỳ, cả xóm tớ đều nói cùng một câu: con bé may quá. Chị đồng ý là mình may, nhưng chị cũng bảo tháng đầu tiên là quãng thời gian khó khăn nhất đời chị.

Chị đi hồi tháng Bảy. Suốt ba tuần chị nhớ nhà kinh khủng. Chị nhớ nồi canh của bà, nhớ tiếng ồn trong con hẻm nhà mình, và nhớ cái cảm giác được hiểu mà chẳng cần gắng sức. Tiếng Anh của chị vốn khá, vậy mà chưa trôi chảy, nên trong một cuộc nói chuyện nhanh chị chỉ nghe được một nửa.

Gia đình bản xứ nhận chị còn giúp chị nhiều hơn bất kỳ thầy cô nào. Họ nhờ chị nấu một bữa cơm Việt vào Chủ nhật thứ hai, và sau buổi tối đó mọi người bắt đầu hỏi chị những câu hỏi thật lòng thay vì chỉ lịch sự cho có. Dần dần chị quen với cái lạnh, quen món ăn, quen cả thói quen phát biểu trong lớp khi chưa ai gọi tên, và chị thích nghi nhanh hơn chị tưởng.

Du học không phải một kỳ nghỉ, và cũng không hề rẻ. Mặc dù học bổng lo phần học phí, bố mẹ tớ vẫn phải trả tiền vé máy bay, còn chi phí sinh hoạt bên đó thì làm bố mẹ bất ngờ. Nhiều gia đình thậm chí không thể nghĩ tới chuyện này, và sẽ là không công bằng nếu giả vờ như điều đó không tồn tại.

Tuy nhiên, lợi ích thì có thật. Chị tớ về nhà với khả năng trình bày một ý kiến bằng tiếng Anh mà không cần chuẩn bị trước. Chị cũng về nhà với sự hiểu biết sâu hơn về chính văn hoá của mình, vì suốt bốn tháng gần như ngày nào chị cũng phải kể về nó cho người khác nghe.

Nếu tớ được trao cùng một thử thách như vậy, tớ sẽ đồng ý ngay. Chỉ có điều tớ sẽ mang theo nhiều áo ấm hơn và ít kỳ vọng hơn.`,
          questions: [
            mcq(
              "What is the writer's overall view of studying abroad?",
              "Nhìn chung người viết nghĩ gì về việc đi du học?",
              [
                "It is a wonderful holiday that every student should take.",
                "It is difficult and expensive, but the benefits are genuine.",
                "It is only worth doing if you already speak English fluently.",
                "It is not worth the money that families have to spend.",
              ],
              1,
              "Bài trình bày cả hai mặt: tháng đầu rất khó, chi phí cao và nhiều gia đình không kham nổi; nhưng đoạn 5 khẳng định lợi ích là có thật, và đoạn cuối nói nếu được mời thì bạn ấy đồng ý ngay. Vậy quan điểm là: khó và tốn, nhưng xứng đáng.",
            ),
            mcq(
              "How did the sister feel during her first three weeks?",
              "Trong ba tuần đầu, người chị cảm thấy thế nào?",
              [
                "Excited about everything around her.",
                "Badly homesick.",
                "Angry with her host family.",
                "Bored because she had nothing to do.",
              ],
              1,
              "Bài nói rõ: suốt ba tuần chị NHỚ NHÀ kinh khủng, nhớ canh của bà, nhớ tiếng ồn trong hẻm và cảm giác được hiểu mà không phải cố gắng.",
              "For three weeks she was badly homesick.",
            ),
            mcq(
              "What changed after the Vietnamese meal she cooked?",
              "Sau bữa cơm Việt chị nấu, điều gì đã thay đổi?",
              [
                "Her host family started teaching her to cook.",
                "She stopped feeling cold at night.",
                "People began asking her real questions instead of just being polite.",
                "Her teachers gave her extra English lessons.",
              ],
              2,
              "Bài kể rằng sau buổi tối đó, mọi người bắt đầu hỏi chị những câu hỏi THẬT LÒNG thay vì chỉ lịch sự xã giao — nghĩa là chị được đón nhận như một người bạn thật sự.",
              "after that evening people began asking her real questions instead of simply being polite",
            ),
            mcq(
              "What did the scholarship NOT pay for?",
              "Học bổng KHÔNG chi trả cho khoản nào?",
              [
                "The school fees.",
                "The flights and the daily cost of living.",
                "The English lessons.",
                "The host family's meals.",
              ],
              1,
              "Bài dùng mệnh đề nhượng bộ: MẶC DÙ học bổng lo học phí, bố mẹ vẫn phải trả tiền vé máy bay, và chi phí sinh hoạt bên đó còn làm họ bất ngờ.",
              "Although her scholarship covered the school fees, our parents still paid for the flights",
            ),
            mcq(
              "What does the writer suggest by saying he would pack fewer expectations?",
              "Khi nói sẽ mang theo ít kỳ vọng hơn, người viết ngầm ý gì?",
              [
                "That he does not really want to study abroad.",
                "That going with a fixed picture in your head makes the first weeks harder.",
                "That students should not take much luggage with them.",
                "That his sister was disappointed by New Zealand.",
              ],
              1,
              "Cả bài cho thấy phần khó nhất là khoảng cách giữa hình dung ban đầu (ai cũng bảo may quá) và thực tế (nhớ nhà, nghe không kịp). Câu cuối vì thế ngầm khuyên: bớt kỳ vọng cố định thì đỡ sốc. Bài không nói thẳng điều đó.",
            ),
            tf(
              "The sister could follow every conversation easily because her English was good.",
              "Người chị nghe hiểu mọi cuộc trò chuyện dễ dàng vì tiếng Anh của chị tốt.",
              false,
              "SAI. Bài viết nói tiếng Anh của chị khá NHƯNG chưa trôi chảy, nên trong hội thoại nhanh chị chỉ nghe được một nửa.",
              "she was not fluent, so in a fast conversation she caught only half of what was said",
            ),
          ],
        },
        listening: {
          title: "Should I apply for the exchange?",
          transcript: `Girl: Have you sent your application for the exchange programme yet?

Boy: Not yet. My mother thinks I am too young to live abroad for a whole term.

Girl: My sister went last year. She told me that the first three weeks were awful and the rest were the best months of her life.

Boy: What was awful about them?

Girl: She was homesick, and she could not follow fast conversations. Then her host family asked her to cook a Vietnamese dinner, and everything changed after that evening.

Boy: What about the money? A scholarship does not pay for everything.

Girl: No, it does not. My parents still paid for the flights, and the cost of living there was higher than they had expected.

Boy: That is exactly what worries my mother.

Girl: Then apply anyway and decide later. If I were you, I would not close a door before it is even open.`,
          questions: [
            mcq(
              "Why has the boy not sent his application?",
              "Vì sao bạn nam vẫn chưa nộp đơn?",
              [
                "Because he does not want to leave his friends.",
                "Because his mother thinks he is too young.",
                "Because he has not won a scholarship.",
                "Because the programme is already full.",
              ],
              1,
              "Bạn nam trả lời ngay ở lượt đầu tiên: mẹ bạn ấy cho rằng bạn còn quá nhỏ để sống ở nước ngoài suốt một học kỳ.",
              "My mother thinks I am too young to live abroad for a whole term.",
            ),
            mcq(
              "What does the girl say about her sister's experience?",
              "Bạn nữ nói gì về trải nghiệm của chị mình?",
              [
                "The whole term was difficult.",
                "The first three weeks were awful, but the rest were wonderful.",
                "Her sister came home after one month.",
                "Her sister never felt homesick at all.",
              ],
              1,
              "Bạn nữ thuật lại lời chị bằng câu tường thuật: ba tuần đầu thì tệ, còn quãng còn lại là những tháng đẹp nhất đời chị.",
              "She told me that the first three weeks were awful and the rest were the best months of her life.",
            ),
            mcq(
              "What does the girl advise the boy to do?",
              "Bạn nữ khuyên bạn nam làm gì?",
              [
                "Wait one more year before applying.",
                "Ask his mother to phone the school.",
                "Apply now and make the final decision later.",
                "Save money for the flights first.",
              ],
              2,
              "Bạn nữ khuyên cứ nộp đơn đi rồi quyết sau, và dùng câu điều kiện loại 2 để nhấn mạnh: nếu là tớ thì tớ sẽ không đóng một cánh cửa khi nó còn chưa mở.",
              "Then apply anyway and decide later.",
            ),
            tf(
              "The girl says that a scholarship covers all the costs of studying abroad.",
              "Bạn nữ nói rằng học bổng bao trọn mọi chi phí du học.",
              false,
              "SAI. Bạn nữ khẳng định ngược lại: bố mẹ vẫn phải trả tiền vé máy bay và chi phí sinh hoạt bên đó còn cao hơn họ tưởng.",
              "My parents still paid for the flights, and the cost of living there was higher than they had expected.",
            ),
          ],
        },
        writingPrompt:
          "Trường em có một suất trao đổi một học kỳ ở nước ngoài. Hãy viết một đoạn 90–120 từ: em có muốn ứng tuyển không, vì sao, và em nghĩ thử thách lớn nhất sẽ là gì? Bắt buộc dùng ít nhất một mệnh đề nhượng bộ ('Although…' hoặc '…; however, …') và một câu tường thuật (My sister told me that…).",
        writingOutline:
          "1. Câu mở: em có ứng tuyển hay không, nói thẳng.\n2. Lợi ích em mong đợi (fluent English, culture, make friends, independence).\n3. Thử thách em lo nhất — dùng 'Although…' (homesick, cost of living, adapting).\n4. Một điều em nghe được từ người từng đi — viết ở dạng câu tường thuật.\n5. Kết: em sẽ chuẩn bị thế nào để adapt nhanh hơn.",
        speaking: {
          sentences: [
            "My sister won a scholarship to study abroad for one term.",
            "For three weeks she was badly homesick.",
            "She got used to the cold, the food and the early classes.",
            "Although the scholarship covered the fees, we paid for the flights.",
            "She told me that the first month had been the hardest.",
            "If I were offered the same challenge, I would say yes.",
          ],
          questions: [
            {
              question: "Would you like to study in another country? Why or why not?",
              sampleAnswer:
                "I would love to, mainly because I want to become fluent and see how students learn somewhere else. Although I would miss my family, four months is not very long.",
            },
            {
              question: "What do you think would be the hardest part of living abroad?",
              sampleAnswer:
                "Probably the first few weeks, when you cannot follow fast conversations and everything is unfamiliar. I would also miss my grandmother's cooking more than I would like to admit.",
            },
            {
              question: "What could a student do to feel less homesick?",
              sampleAnswer:
                "I would cook something from home for my host family and call my parents at a fixed time each week. Having a small routine makes a strange place feel more normal.",
            },
            {
              question: "What can you learn abroad that you cannot learn at home?",
              sampleAnswer:
                "You learn how your own culture looks from outside. My sister said that she understood Tet much better after she had to explain it to people who had never heard of it.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Dreams and Goals",
        topicVi: "Ước mơ và mục tiêu",
        icon: "🌟",
        words: [
          word("dream", "/driːm/", "ước mơ", "🌟"),
          word("goal", "/ɡəʊl/", "mục tiêu", "🎯"),
          word("plan", "/plæn/", "kế hoạch", "🗒️"),
          word("achieve", "/əˈtʃiːv/", "đạt được", "🏆"),
          word("effort", "/ˈefət/", "sự nỗ lực", "💪"),
          word("patience", "/ˈpeɪʃns/", "sự kiên nhẫn", "⏳"),
          word("progress", "/ˈprəʊɡres/", "tiến bộ", "📈"),
          word("motivation", "/ˌməʊtɪˈveɪʃn/", "động lực", "🔥"),
          word("realistic", "/ˌrɪəˈlɪstɪk/", "thực tế, khả thi", "🧭"),
          word("fail", "/feɪl/", "thất bại", "📉"),
          word("succeed", "/səkˈsiːd/", "thành công", "🌈"),
          word("determined", "/dɪˈtɜːmɪnd/", "quyết tâm", "🦁"),
          word("keep going", "/kiːp ˈɡəʊɪŋ/", "tiếp tục, không dừng lại", "🚶"),
          word("step by step", "/step baɪ step/", "từng bước một", "🪜"),
          word("come true", "/kʌm truː/", "trở thành sự thật", "✨"),
        ],
        sound: {
          letters: "Trọng tâm thông tin",
          sound: "/nhấn vào từ MỚI/",
          hint: "Trong mỗi cụm ý, người bản ngữ nhấn mạnh nhất vào từ mang THÔNG TIN MỚI, còn thông tin đã nhắc rồi thì đọc lướt: – How long did it take? – Ten seconds took me nineteen DAYS. (nhấn DAYS vì đó là điều mới). Người Việt hay đọc đều hoặc nhấn vào từ cuối cùng theo thói quen, khiến người nghe không bắt được đâu là trọng tâm. Cách sửa: trước khi nói, tự hỏi \"điều gì ở đây người kia CHƯA biết?\" rồi dồn sức vào đúng từ đó. Đây là bài tổng ôn: kết hợp trọng âm từ, nhịp câu, nối âm và ngắt ý đã học.",
          words: [
            { word: "It took nineteen DAYS.", meaning: "Nhấn DAYS — đơn vị thời gian là thông tin mới", emoji: "📅" },
            { word: "My goal is a TWENTY-second film.", meaning: "Nhấn TWENTY — con số mới so với lần trước", emoji: "🎬" },
            { word: "I did not stop. I kept GOING.", meaning: "Nhấn GOING — ý đối lập với stop", emoji: "🚶" },
            { word: "Step by STEP.", meaning: "Nhấn STEP thứ hai — nhịp mạnh cuối cụm", emoji: "🪜" },
          ],
        },
        reading: {
          title: "A Dream Without a Timetable",
          passage: `When people ask what my dream is, I used to feel embarrassed. I want to design video games. For a long time I said nothing, because a dream sounds childish until it comes true.

Then my art teacher gave me a piece of advice that changed my whole year. She said that a dream without a timetable is only a wish. She asked me to write one realistic goal for each month, and to make each goal small enough that I could not fail by accident. A dream, she said, becomes a plan the moment you give it a date.

So I tried. In September I learned to draw hands. In October I finished a short animation of ten seconds. Ten seconds took me nineteen days, and in the middle of it I nearly stopped. However, when I watched my little brother laugh at the ending, my motivation came straight back.

Some people believe that talent decides everything. I disagree. Talent decides how fast you start; effort and patience decide how much you finally achieve. My drawings in September were poor, but I can see clear progress now, and I can only see it because I kept every old sketch.

If I had waited for the perfect idea before I began, I would still be waiting today. Nothing teaches you as much as a finished piece of work, even a bad one.

I still do not know whether I will succeed. Games are a hard industry, and plenty of determined people never get in. But I know how to keep going now, step by step, and that habit will help me whatever I choose to do.`,
          translation: `Mỗi lần có người hỏi ước mơ của tớ là gì, trước đây tớ hay thấy ngượng. Tớ muốn thiết kế trò chơi điện tử. Suốt một thời gian dài tớ chẳng nói với ai, vì một ước mơ nghe cứ trẻ con cho tới khi nó thành sự thật.

Rồi cô giáo dạy Mỹ thuật cho tớ một lời khuyên làm thay đổi cả năm học. Cô bảo một ước mơ không có thời gian biểu thì chỉ là một điều ao ước. Cô yêu cầu tớ viết ra mỗi tháng một mục tiêu khả thi, và mỗi mục tiêu phải nhỏ đến mức không thể vô tình thất bại được. Cô nói: ước mơ trở thành kế hoạch ngay khi mình gắn cho nó một cái hạn.

Thế là tớ thử. Tháng Chín tớ học vẽ bàn tay. Tháng Mười tớ hoàn thành một đoạn hoạt hình dài mười giây. Mười giây ấy ngốn của tớ mười chín ngày, và giữa chừng tớ suýt bỏ. Tuy nhiên, khi nhìn thằng em nhỏ cười phá lên ở đoạn kết, động lực trong tớ lập tức quay lại.

Có người tin rằng tài năng quyết định tất cả. Tớ không đồng ý. Tài năng quyết định mình khởi đầu nhanh đến đâu; còn nỗ lực và sự kiên nhẫn mới quyết định cuối cùng mình đạt được bao nhiêu. Mấy bức vẽ hồi tháng Chín của tớ xấu lắm, nhưng giờ tớ thấy rõ mình đã tiến bộ, và tớ thấy được là vì tớ giữ lại tất cả bản nháp cũ.

Nếu ngày đó tớ cứ chờ có ý tưởng hoàn hảo rồi mới bắt đầu, thì đến hôm nay tớ vẫn đang ngồi chờ. Chẳng có gì dạy mình nhiều bằng một tác phẩm đã hoàn thành, kể cả khi nó dở.

Tớ vẫn chưa biết mình có thành công hay không. Ngành game rất khó, và bao nhiêu người quyết tâm cũng đâu vào được. Nhưng giờ tớ biết cách đi tiếp, từng bước một, và thói quen ấy sẽ giúp tớ dù sau này tớ chọn làm gì.`,
          questions: [
            mcq(
              "What is the main idea of the passage?",
              "Ý chính của bài đọc là gì?",
              [
                "Only talented people should try to work in the games industry.",
                "A dream becomes real when it is turned into small, dated goals.",
                "Art teachers give better advice than parents.",
                "Making animation is harder than most people imagine.",
              ],
              1,
              "Toàn bài xoay quanh lời khuyên của cô giáo: ước mơ không có thời gian biểu chỉ là ao ước, và ước mơ thành kế hoạch khi có hạn cụ thể. Phần còn lại là bằng chứng cho ý đó (mỗi tháng một mục tiêu nhỏ, tiến bộ nhìn thấy được).",
            ),
            mcq(
              "What exactly did the art teacher ask the writer to do?",
              "Cô giáo Mỹ thuật yêu cầu người viết làm gì?",
              [
                "To draw one picture every single day.",
                "To write one realistic goal for each month.",
                "To finish a game before the end of the year.",
                "To show her work to the whole class.",
              ],
              1,
              "Cô yêu cầu viết MỖI THÁNG MỘT mục tiêu khả thi, và mỗi mục tiêu phải nhỏ tới mức không thể vô tình thất bại.",
              "She asked me to write one realistic goal for each month",
            ),
            mcq(
              "How long did the ten-second animation take?",
              "Đoạn hoạt hình mười giây mất bao lâu để hoàn thành?",
              [
                "Ten days.",
                "Nineteen days.",
                "One month.",
                "Three weeks exactly.",
              ],
              1,
              "Bài ghi rõ: mười giây phim ngốn mất MƯỜI CHÍN ngày, và giữa chừng tác giả suýt bỏ cuộc.",
              "Ten seconds took me nineteen days",
            ),
            mcq(
              "What does the writer believe about talent?",
              "Người viết nghĩ gì về tài năng?",
              [
                "Talent is the only thing that matters.",
                "Talent decides how fast you start, but effort and patience decide how much you achieve.",
                "Talent cannot be improved by practice.",
                "Talent is less common than people say.",
              ],
              1,
              "Người viết phản đối ý kiến tài năng quyết định tất cả, rồi nêu quan điểm riêng: tài năng quyết định TỐC ĐỘ KHỞI ĐẦU, còn nỗ lực và kiên nhẫn mới quyết định kết quả cuối cùng.",
              "Talent decides how fast you start; effort and patience decide how much you finally achieve.",
            ),
            mcq(
              "Why does the writer mention that he kept every old sketch?",
              "Vì sao người viết nhắc chuyện mình giữ lại mọi bản nháp cũ?",
              [
                "Because he wants to sell them one day.",
                "Because his teacher asked him to collect them.",
                "Because comparing old work with new work is how he can see his progress.",
                "Because he does not like throwing things away.",
              ],
              2,
              "Câu đó nối liền với vế trước: tranh hồi tháng Chín rất xấu, NHƯNG giờ nhìn thấy rõ tiến bộ — và thấy được CHÍNH LÀ NHỜ còn giữ bản cũ để so sánh.",
              "I can see clear progress now, and I can only see it because I kept every old sketch",
            ),
            mcq(
              "What does the writer suggest about his future, without saying it directly?",
              "Người viết ngầm cho thấy điều gì về tương lai của mình mà không nói thẳng?",
              [
                "He is sure he will work in the games industry one day.",
                "He has decided to give up his dream and study something else.",
                "Even if this particular dream does not come true, the habit he has built will still be worth it.",
                "He thinks his little brother will become an artist too.",
              ],
              2,
              "Đoạn cuối thừa nhận có thể không thành công, nhưng nói rằng giờ mình biết cách đi tiếp từng bước và thói quen đó sẽ giúp mình DÙ SAU NÀY CHỌN LÀM GÌ. Ghép hai ý đó lại là hàm ý: cái được lớn nhất không phụ thuộc vào việc giấc mơ có thành hay không.",
            ),
          ],
        },
        listening: {
          title: "One goal a month",
          transcript: `Teacher: How is the animation going, Vy?

Girl: Slowly. Ten seconds took me nineteen days.

Teacher: And how many of those days did the first five seconds take?

Girl: Fifteen.

Teacher: So the second half took four. That is progress, and you did not even notice it.

Girl: I suppose it is. I nearly stopped last week.

Teacher: What made you keep going?

Girl: My little brother laughed at the ending. It sounds silly, but my motivation came straight back.

Teacher: It is not silly at all. Every artist needs one honest audience. What is your goal for next month?

Girl: A thirty-second film, with sound.

Teacher: Make it twenty. A goal you can achieve teaches you far more than a goal that defeats you.

Girl: Twenty, then. Step by step.`,
          questions: [
            mcq(
              "How long did the first five seconds of the animation take?",
              "Năm giây đầu tiên của đoạn phim mất bao lâu?",
              [
                "Four days.",
                "Nineteen days.",
                "Fifteen days.",
                "Twenty days.",
              ],
              2,
              "Khi cô hỏi năm giây đầu mất mấy ngày, Vy trả lời gọn: MƯỜI LĂM. Cô liền tính ra nửa sau chỉ mất bốn ngày, tức là bạn ấy đã nhanh hơn hẳn.",
              "And how many of those days did the first five seconds take?",
            ),
            mcq(
              "Why does the teacher say that Vy has made progress?",
              "Vì sao cô giáo nói Vy đã tiến bộ?",
              [
                "Because the film is longer than last time.",
                "Because the second half of the film took much less time than the first.",
                "Because her brother liked the ending.",
                "Because she worked every day for nineteen days.",
              ],
              1,
              "Cô làm phép trừ ngay trong lời thoại: nửa sau chỉ mất bốn ngày so với mười lăm ngày của nửa đầu, và cô nhấn mạnh rằng chính Vy còn không nhận ra điều đó.",
              "So the second half took four. That is progress, and you did not even notice it.",
            ),
            mcq(
              "Why does the teacher tell Vy to make a twenty-second film instead of thirty?",
              "Vì sao cô bảo Vy làm phim hai mươi giây thay vì ba mươi giây?",
              [
                "Because thirty seconds would be too expensive.",
                "Because a goal you can achieve teaches you more than one that defeats you.",
                "Because the school competition only allows twenty seconds.",
                "Because Vy does not have any sound equipment.",
              ],
              1,
              "Cô giải thích ngay lý do: một mục tiêu mình làm được sẽ dạy được nhiều hơn một mục tiêu đánh gục mình. Đó chính là nguyên tắc đặt mục tiêu khả thi.",
              "A goal you can achieve teaches you far more than a goal that defeats you.",
            ),
            tf(
              "The teacher thinks it is silly that Vy's brother gave her motivation.",
              "Cô giáo cho rằng việc em trai Vy tiếp thêm động lực cho bạn ấy là chuyện ngớ ngẩn.",
              false,
              "SAI. Vy tự nhận là nghe hơi ngớ ngẩn, nhưng cô phản đối ngay và nói mỗi người làm nghệ thuật đều cần một khán giả thành thật.",
              "It is not silly at all. Every artist needs one honest audience.",
            ),
          ],
        },
        writingPrompt:
          "Hãy viết một đoạn 100–130 từ về MỘT ước mơ của em và kế hoạch để tiến tới nó. Nêu rõ: ước mơ là gì, một mục tiêu khả thi cho tháng tới, một khó khăn em dự đoán, và điều gì giúp em keep going. Bắt buộc có một câu điều kiện loại 2 và một câu với 'although' hoặc 'however'.",
        writingOutline:
          "1. Ước mơ của em là gì và vì sao em muốn điều đó (My dream is to…).\n2. Một goal CỤ THỂ và KHẢ THI cho tháng tới — có con số, có hạn.\n3. Em sẽ chia nhỏ nó ra sao (step by step: tuần 1…, tuần 2…).\n4. Khó khăn em dự đoán — dùng 'However,…' hoặc 'Although…'.\n5. Điều giữ động lực cho em + một câu điều kiện loại 2 ('If I gave up now, I would…').",
        speaking: {
          sentences: [
            "A dream without a timetable is only a wish.",
            "I write one realistic goal at the start of every month.",
            "Ten seconds of animation took me nineteen days.",
            "Although I nearly stopped, my motivation came back.",
            "Effort and patience decide how much you finally achieve.",
            "If I had waited for the perfect idea, I would still be waiting.",
          ],
          questions: [
            {
              question: "What is one dream you have for the future?",
              sampleAnswer:
                "I would like to design video games one day. It sounds ambitious, although I know the industry is hard, so my plan is to finish one small project every month and keep learning.",
            },
            {
              question: "What is a realistic goal you could achieve this month?",
              sampleAnswer:
                "This month I want to learn fifty new English words and use each of them in a sentence. It is small enough that I cannot fail by accident, which is exactly why it works.",
            },
            {
              question: "What do you do when you feel like giving up?",
              sampleAnswer:
                "I look at my old work. When I compare my drawings from September with the ones I make now, the progress is obvious, and that usually gives me enough motivation to keep going.",
            },
            {
              question: "Do you think talent or hard work is more important?",
              sampleAnswer:
                "Both matter, but I think hard work matters more in the end. Talent decides how quickly you begin; effort and patience decide how far you actually get.",
            },
          ],
        },
      },
    ],
  },
];
