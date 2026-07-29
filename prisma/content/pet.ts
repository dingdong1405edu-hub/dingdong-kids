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
];
