// Bài học BỔ SUNG cho cấp này — nối SAU danh sách gốc trong ../ket.ts.
//
// Tách file riêng để soạn thêm bài mà không phải mở file gốc (đã rất dài).
// ⚠️ Mỗi bài thêm ở đây PHẢI có một mục ngữ pháp tương ứng, ĐÚNG THỨ TỰ, trong
//    ../grammar/extra-ket.ts — nếu không `npm run content:check` sẽ báo lệch hàng.
//
// 2 chương × 3 bài = 6 bài (Chương 4 và Chương 5 của cấp KET).
// "Phonics" ở cấp này vẫn là PHÁT ÂM NÂNG CAO, tiếp nối 9 điểm đã dạy ở file gốc
// (trọng âm từ · schwa · trọng âm câu · nối âm · -ed · -s/-es · -tion · cụm phụ âm
// cuối · ngữ điệu lên xuống):
//   /dʒ/ · /θ/ và /ð/ · phụ âm cuối /t/ /d/ /k/ · cụm phụ âm ĐẦU /st/ /sk/ /sp/
//   · /l/ cuối từ · /ʃ/
// Ngữ pháp đi kèm (không lặp lại 9 điểm của file gốc): be going to · much/many/
//   a lot of/a few/a little · too … / … enough · as … as · bị động hiện tại đơn ·
//   used to
import { type ChapterSeed, mcq, tf, word } from "../types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 4 · Lớn lên và tự lo",
    subtitle: "Việc làm thêm đầu đời, đồng tiền tiết kiệm và trách nhiệm với thú cưng.",
    lessons: [
      // ─────────────────────────── Bài 10 ───────────────────────────
      {
        topic: "Part-time Jobs for Teens",
        topicVi: "Việc làm thêm của tuổi teen",
        icon: "💼",
        words: [
          word("job", "/dʒɒb/", "công việc", "💼"),
          word("part-time", "/ˌpɑːt ˈtaɪm/", "bán thời gian, chỉ làm vài giờ mỗi tuần", "🕒"),
          word("manager", "/ˈmænɪdʒə/", "người quản lý cửa hàng", "🧑‍💼"),
          word("customer", "/ˈkʌstəmə/", "khách hàng", "🛍️"),
          word("shift", "/ʃɪft/", "ca làm việc", "⏱️"),
          word("earn", "/ɜːn/", "kiếm được (tiền) bằng sức mình", "💵"),
          word("wage", "/weɪdʒ/", "tiền công trả theo giờ hoặc theo tuần", "💰"),
          word("village", "/ˈvɪlɪdʒ/", "ngôi làng", "🏘️"),
          word("deliver", "/dɪˈlɪvə/", "giao hàng tận nơi", "🛵"),
          word("polite", "/pəˈlaɪt/", "lễ phép, lịch sự", "🙇"),
          word("responsible", "/rɪˈspɒnsəbl/", "có trách nhiệm, đáng tin cậy", "✅"),
          word("experience", "/ɪkˈspɪəriəns/", "kinh nghiệm", "🧰"),
          word("apply for", "/əˈplaɪ fɔː/", "nộp đơn xin (việc)", "📝"),
          word("look for", "/ˌlʊk ˈfɔː/", "tìm kiếm thứ gì đó", "🔎"),
          word("give up", "/ˌɡɪv ˈʌp/", "bỏ cuộc giữa chừng", "🚫"),
        ],
        sound: {
          letters: "j · g · dge",
          sound: "/dʒ/",
          hint:
            "Âm /dʒ/ là một âm BẬT: đầu lưỡi chạm lợi trên rồi bung ra, dây thanh rung — nghe như " +
            "chữ 'j' trong 'Jeep'. Trẻ Việt (nhất là giọng Bắc) hay đổi nó thành /z/ vì 'gi, d, r' " +
            "tiếng Việt đều đọc là /z/: 'job' thành 'zóp', 'manager' thành 'ma-na-zơ'. Mẹo: nói thử " +
            "'đờ' rồi 'giơ' thật nhanh liền nhau — chỗ lưỡi bung ra chính là /dʒ/. Lỗi thứ hai là " +
            "NUỐT âm /dʒ/ ở cuối từ: 'village' thành 'vi-li', 'bridge' thành 'brít'. Cuối từ vẫn " +
            "phải nghe rõ tiếng bung.",
          words: [
            { word: "job", meaning: "công việc — /dʒɒb/, không phải 'zóp'", emoji: "💼" },
            { word: "manager", meaning: "quản lý — /ˈmænɪdʒə/, âm /dʒ/ nằm giữa từ", emoji: "🧑‍💼" },
            { word: "village", meaning: "ngôi làng — /ˈvɪlɪdʒ/, đuôi -age vẫn phải bung ra", emoji: "🏘️" },
            { word: "orange", meaning: "quả cam — /ˈɒrɪndʒ/, đừng dừng ở 'o-rin'", emoji: "🍊" },
            { word: "bridge", meaning: "cây cầu — /brɪdʒ/, cụm -dge chỉ đọc một âm /dʒ/", emoji: "🌉" },
          ],
        },
        reading: {
          title: "My Saturday Job at the Bakery",
          passage:
            "My cousin Trang is fifteen, and last summer she started a part-time job at a small bakery in our village. She saw a notice in the window and applied for it the same afternoon.\n\n" +
            "Trang's shift begins at seven o'clock on Saturday mornings. First she puts the fresh bread on the shelves, and then she serves the customers who come in before work. The manager, a friendly woman called Mrs Hoa, taught her how to use the cash register on her very first day. Trang says the hardest part is not the work; it is remembering to stay polite when the shop is busy.\n\n" +
            "She earns a small wage every week, and she has decided to save most of it. Sometimes the baker asks her to deliver a box of cakes to a house near the market, and she likes that job best of all.\n\n" +
            "Her parents were worried at first, but now they think the job has made her more responsible. Trang agrees. She is going to keep the job until December, and she will never give up, even on cold mornings, because the experience is worth it.",
          translation:
            "Chị họ tớ tên Trang, năm nay mười lăm tuổi. Hè năm ngoái chị bắt đầu làm bán thời gian ở một tiệm bánh nhỏ trong làng. Chị thấy tờ thông báo dán trên cửa kính và ngay chiều hôm đó đã nộp đơn.\n\n" +
            "Ca của chị Trang bắt đầu lúc bảy giờ sáng thứ Bảy. Đầu tiên chị xếp bánh mì mới ra kệ, rồi bán cho những khách ghé mua trước giờ đi làm. Cô quản lý tên là cô Hoa, người rất dễ mến, đã dạy chị dùng máy tính tiền ngay hôm đầu. Chị Trang bảo phần khó nhất không phải là công việc, mà là nhớ giữ thái độ lễ phép lúc cửa hàng đông khách.\n\n" +
            "Mỗi tuần chị kiếm được một khoản tiền công nho nhỏ, và chị quyết định để dành gần hết. Thỉnh thoảng bác thợ bánh nhờ chị mang một hộp bánh tới nhà gần chợ, và chị thích việc đó nhất.\n\n" +
            "Ban đầu bố mẹ chị lo lắm, nhưng giờ bố mẹ thấy công việc làm chị có trách nhiệm hơn hẳn. Chị Trang cũng nghĩ vậy. Chị định làm tới tháng Mười Hai, và sẽ không bỏ cuộc dù sáng có lạnh mấy đi nữa, vì kinh nghiệm ấy rất đáng.",
          questions: [
            mcq(
              "How did Trang get her job at the bakery?",
              "Chị Trang xin được việc ở tiệm bánh bằng cách nào?",
              [
                "She saw a notice in the window and applied for it.",
                "Her parents asked the baker for her.",
                "The manager phoned her at home.",
                "She met Mrs Hoa at the market.",
              ],
              0,
              "Câu thứ hai của bài kể rõ: chị thấy tờ thông báo trên cửa kính rồi nộp đơn ngay chiều hôm đó.",
              "She saw a notice in the window and applied for it the same afternoon",
            ),
            mcq(
              "What does Trang do first during her shift?",
              "Vào ca, việc đầu tiên chị Trang làm là gì?",
              [
                "She counts the money in the cash register.",
                "She puts the fresh bread on the shelves.",
                "She delivers cakes to the market.",
                "She cleans the windows of the shop.",
              ],
              1,
              "Bài viết nói 'First she puts the fresh bread on the shelves' — xếp bánh ra kệ trước, rồi mới bán hàng.",
              "First she puts the fresh bread on the shelves",
            ),
            mcq(
              "According to Trang, what is the hardest part of the job?",
              "Theo chị Trang, phần khó nhất của công việc là gì?",
              [
                "Getting up at seven o'clock",
                "Using the cash register",
                "Staying polite when the shop is busy",
                "Carrying the boxes of cakes",
              ],
              2,
              "Chị nói phần khó nhất không phải là việc chân tay, mà là nhớ giữ thái độ lễ phép khi cửa hàng đông khách.",
              "it is remembering to stay polite when the shop is busy",
            ),
            tf(
              "Trang's parents still think the job is a bad idea.",
              "Bố mẹ chị Trang đến giờ vẫn cho rằng công việc đó là một ý tồi.",
              false,
              "SAI. Bố mẹ chị chỉ lo lúc ĐẦU thôi; bây giờ bố mẹ thấy công việc khiến chị có trách nhiệm hơn.",
              "Her parents were worried at first, but now they think the job has made her more responsible",
            ),
            mcq(
              "How does Trang feel about her job now?",
              "Bây giờ chị Trang cảm thấy thế nào về công việc của mình?",
              [
                "She is determined to continue because it is worth it.",
                "She wants to stop as soon as the weather gets cold.",
                "She thinks the wage is too small to be useful.",
                "She is sorry that she ever applied for it.",
              ],
              0,
              "Câu cuối bài cho thấy thái độ của chị: quyết tâm làm tiếp, không bỏ cuộc dù trời lạnh, vì kinh nghiệm rất đáng.",
              "she will never give up, even on cold mornings, because the experience is worth it",
            ),
          ],
        },
        listening: {
          title: "Looking for a Weekend Job",
          transcript:
            "Boy: Trang, I want to earn some pocket money too. How did you find your job?\n" +
            "Girl: I just looked for a notice in the shop windows near the market. The bakery needed someone on Saturdays.\n" +
            "Boy: Did you have any experience?\n" +
            "Girl: None at all. The manager said she only wanted someone polite and responsible.\n" +
            "Boy: My mum says I am too young to work in a shop.\n" +
            "Girl: You are fourteen, so you can only do a few hours. My neighbour's son delivers newspapers before school. That is a good first job.\n" +
            "Boy: How much does he earn?\n" +
            "Girl: It is a small wage, but he saves all of it. He is going to buy a second-hand bicycle in December.\n" +
            "Boy: That sounds perfect. I am going to ask my parents tonight.\n" +
            "Girl: Good luck! And don't give up if the first shop says no.",
          questions: [
            mcq(
              "How did Trang find her job?",
              "Chị Trang tìm được việc bằng cách nào?",
              [
                "She looked for notices in shop windows.",
                "A teacher told her about it.",
                "She asked her neighbour's son.",
                "She saw an advertisement on the internet.",
              ],
              0,
              "Chị nói mình chỉ đi tìm tờ thông báo dán trên cửa kính các cửa hàng gần chợ.",
              "I just looked for a notice in the shop windows near the market",
            ),
            mcq(
              "What kind of person did the manager want?",
              "Cô quản lý muốn tìm người như thế nào?",
              [
                "Someone with a lot of experience",
                "Someone polite and responsible",
                "Someone who can work every day",
                "Someone older than sixteen",
              ],
              1,
              "Chị Trang kể: cô quản lý chỉ cần một người lễ phép và có trách nhiệm, không cần kinh nghiệm.",
              "she only wanted someone polite and responsible",
            ),
            tf(
              "The neighbour's son delivers newspapers after school.",
              "Con trai nhà hàng xóm giao báo sau giờ học.",
              false,
              "SAI. Bạn ấy giao báo TRƯỚC giờ học ('before school'), chứ không phải sau giờ học.",
              "My neighbour's son delivers newspapers before school",
            ),
            mcq(
              "How does the boy feel at the end of the conversation?",
              "Cuối cuộc trò chuyện, cậu bé cảm thấy thế nào?",
              [
                "Excited, and ready to talk to his parents",
                "Disappointed, because he is too young",
                "Worried about the small wage",
                "Angry with his mother",
              ],
              0,
              "Cậu nói 'That sounds perfect' rồi định tối nay hỏi bố mẹ ngay — rõ ràng là rất hào hứng.",
              "That sounds perfect. I am going to ask my parents tonight.",
            ),
          ],
        },
        writingPrompt:
          "Viết một đoạn 60–80 từ bằng tiếng Anh về một công việc làm thêm em muốn thử khi lớn hơn một chút. Bắt buộc dùng ít nhất HAI câu với 'be going to' (I am going to ...) và nói rõ em sẽ làm gì với số tiền kiếm được.",
        writingOutline:
          "1. Mở bài: em bao nhiêu tuổi và muốn làm công việc gì (a part-time job at ...).\n" +
          "2. Vì sao em chọn việc đó — dùng 'because': em thích gặp khách hàng, hay muốn có kinh nghiệm.\n" +
          "3. Kế hoạch cụ thể bằng 'be going to': 'I am going to apply for ...', 'I am going to work on ...'.\n" +
          "4. Kết bài: em sẽ làm gì với tiền công — 'I am going to save most of my wage for ...'.",
        speaking: {
          sentences: [
            "My cousin has a part-time job at a small bakery.",
            "Her shift begins at seven o'clock on Saturday mornings.",
            "She earns a small wage and saves most of it.",
            "The manager only wanted someone polite and responsible.",
            "I am going to apply for a job next summer.",
          ],
          questions: [
            {
              question: "Would you like to have a part-time job? Why?",
              sampleAnswer:
                "Yes, I would. I am going to look for a Saturday job in a bookshop, because I want to earn my own pocket money and meet new people.",
            },
            {
              question: "What kind of job do you think is good for a student?",
              sampleAnswer:
                "I think delivering newspapers is a good first job. It only takes an hour in the morning, so it does not stop you from doing your homework.",
            },
            {
              question: "What are you going to do with the money you earn?",
              sampleAnswer:
                "I am going to save most of it for a new bicycle. I will spend a little on presents for my family at Tet.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 11 ───────────────────────────
      {
        topic: "Saving Money",
        topicVi: "Tiết kiệm tiền",
        icon: "🐷",
        words: [
          word("save", "/seɪv/", "để dành, tiết kiệm", "🏦"),
          word("spend", "/spend/", "tiêu tiền", "🛒"),
          word("piggy bank", "/ˈpɪɡi bæŋk/", "con heo đất", "🐷"),
          word("price", "/praɪs/", "giá tiền", "🏷️"),
          word("cheap", "/tʃiːp/", "rẻ", "🪙"),
          word("expensive", "/ɪkˈspensɪv/", "đắt", "💎"),
          word("thousand", "/ˈθaʊznd/", "nghìn", "🔢"),
          word("birthday", "/ˈbɜːθdeɪ/", "sinh nhật", "🎂"),
          word("lucky money", "/ˈlʌki ˌmʌni/", "tiền lì xì ngày Tết", "🧧"),
          word("budget", "/ˈbʌdʒɪt/", "khoản tiền dự tính cho từng việc", "📋"),
          word("bargain", "/ˈbɑːɡɪn/", "món hời, mua được giá rẻ bất ngờ", "🎉"),
          word("borrow", "/ˈbɒrəʊ/", "mượn của ai đó", "🤝"),
          word("afford", "/əˈfɔːd/", "có đủ tiền để mua", "💳"),
          word("save up for", "/ˌseɪv ˈʌp fɔː/", "để dành tiền mua thứ gì đó", "🎯"),
          word("run out of", "/ˌrʌn ˈaʊt əv/", "hết sạch (tiền, đồ)", "⛽"),
        ],
        sound: {
          letters: "th",
          sound: "/θ/ · /ð/",
          hint:
            "Tiếng Việt KHÔNG có âm nào giống 'th' tiếng Anh, nên trẻ Việt tự động thay bằng /t/ hoặc " +
            "/s/: 'thousand' thành 'tao-zần', 'three' thành 'sri'. Cả hai âm đều làm y hệt nhau: đặt " +
            "ĐẦU LƯỠI hơi thò ra giữa hai hàm răng rồi thổi hơi qua. Khác nhau ở chỗ rung: /θ/ KHÔNG " +
            "rung (three, thousand, birthday), còn /ð/ CÓ rung (the, this, mother). Đặt tay lên cổ họng " +
            "mà kiểm tra. Nếu lưỡi không thò ra, người nghe sẽ nhầm 'three' với 'tree' và 'thank' với " +
            "'tank'.",
          words: [
            { word: "three", meaning: "số ba — /θriː/, lưỡi thò ra, KHÔNG rung", emoji: "3️⃣" },
            { word: "thousand", meaning: "nghìn — /ˈθaʊznd/, đừng đọc thành 'tao-zần'", emoji: "🔢" },
            { word: "birthday", meaning: "sinh nhật — /ˈbɜːθdeɪ/, âm /θ/ nằm giữa từ", emoji: "🎂" },
            { word: "the", meaning: "từ hạn định — /ðə/, âm /ð/ CÓ rung dây thanh", emoji: "👉" },
            { word: "mother", meaning: "mẹ — /ˈmʌðə/, đừng đọc thành 'mó-đơ'", emoji: "👩" },
          ],
        },
        reading: {
          title: "My Piggy Bank Plan",
          passage:
            "I am Khoa, and I am twelve. Last year I never had any money at the end of the month, although I got some lucky money at Tet and a little pocket money every week.\n\n" +
            "My problem was simple. I spent a lot of money on snacks and stickers, and I did not write anything down. In January my sister gave me a small notebook and a piggy bank, and she showed me how she makes a budget.\n\n" +
            "Now I write down every price. I put half of my pocket money in the piggy bank and I keep a little for the week. I do not buy many snacks any more, because I have found a shop near school where the same drink is much cheaper. That was a real bargain.\n\n" +
            "I am saving up for a bicycle which costs two million dong. I cannot afford it yet. I have already saved four hundred thousand, so I still need a lot more. Some weeks I run out of money on Friday, and I have to wait.\n\n" +
            "It is not easy, but I have never borrowed money from my friends, and I am proud of that.",
          translation:
            "Tớ là Khoa, năm nay mười hai tuổi. Năm ngoái cứ đến cuối tháng là tớ chẳng còn đồng nào, dù Tết tớ được lì xì và tuần nào cũng có một ít tiền tiêu vặt.\n\n" +
            "Vấn đề của tớ đơn giản thôi: tớ tiêu rất nhiều tiền vào đồ ăn vặt với sticker, mà lại chẳng ghi chép gì cả. Tháng Giêng, chị gái cho tớ một cuốn sổ nhỏ và một con heo đất, rồi chỉ cho tớ cách chị lập kế hoạch chi tiêu.\n\n" +
            "Bây giờ tớ ghi lại mọi khoản giá tiền. Tớ bỏ một nửa tiền tiêu vặt vào heo đất, giữ lại một chút để tiêu trong tuần. Tớ không mua nhiều đồ ăn vặt nữa, vì tớ tìm được một quán gần trường bán đúng loại nước đó mà rẻ hơn hẳn. Đúng là một món hời.\n\n" +
            "Tớ đang để dành mua một chiếc xe đạp giá hai triệu đồng. Giờ tớ chưa đủ tiền mua. Tớ đã tiết kiệm được bốn trăm nghìn, nên vẫn còn thiếu nhiều lắm. Có tuần mới thứ Sáu tớ đã hết tiền và phải chờ.\n\n" +
            "Không dễ đâu, nhưng tớ chưa bao giờ phải mượn tiền của bạn bè, và tớ tự hào vì điều đó.",
          questions: [
            mcq(
              "What was Khoa's problem last year?",
              "Vấn đề của Khoa hồi năm ngoái là gì?",
              [
                "He never received any pocket money.",
                "He spent a lot and wrote nothing down.",
                "He lent all his money to his friends.",
                "His piggy bank was broken.",
              ],
              1,
              "Bài viết nói rõ: bạn ấy tiêu rất nhiều vào đồ ăn vặt và sticker, lại chẳng ghi chép khoản nào.",
              "I spent a lot of money on snacks and stickers, and I did not write anything down",
            ),
            mcq(
              "Who helped Khoa start saving?",
              "Ai đã giúp Khoa bắt đầu tiết kiệm?",
              [
                "His sister",
                "His mother",
                "His teacher",
                "His best friend",
              ],
              0,
              "Chính chị gái đã cho bạn ấy cuốn sổ và con heo đất, rồi chỉ cách lập kế hoạch chi tiêu.",
              "my sister gave me a small notebook and a piggy bank",
            ),
            mcq(
              "Why does Khoa buy fewer snacks now?",
              "Vì sao bây giờ Khoa mua ít đồ ăn vặt hơn?",
              [
                "His mother does not allow snacks.",
                "He does not like them any more.",
                "He found a shop where the same drink is much cheaper.",
                "The shop near school has closed.",
              ],
              2,
              "Bạn ấy tìm được quán gần trường bán đúng loại nước đó nhưng rẻ hơn nhiều, nên không tiêu nhiều như trước.",
              "I have found a shop near school where the same drink is much cheaper",
            ),
            mcq(
              "How much has Khoa saved so far?",
              "Đến giờ Khoa đã để dành được bao nhiêu?",
              [
                "Two million dong",
                "Four hundred thousand dong",
                "One million dong",
                "Nothing at all",
              ],
              1,
              "Bạn ấy nói đã tiết kiệm được bốn trăm nghìn, còn chiếc xe đạp thì giá hai triệu.",
              "I have already saved four hundred thousand",
            ),
            mcq(
              "What is Khoa most proud of?",
              "Điều Khoa tự hào nhất là gì?",
              [
                "That he has never borrowed money from his friends",
                "That he has bought the bicycle already",
                "That he spends nothing at all",
                "That he earns his own wage",
              ],
              0,
              "Câu cuối bài thể hiện thái độ của bạn ấy: tiết kiệm không dễ, nhưng chưa từng phải mượn tiền bạn bè — và bạn ấy tự hào vì thế.",
              "I have never borrowed money from my friends, and I am proud of that",
            ),
          ],
        },
        listening: {
          title: "At the School Book Fair",
          transcript:
            "Girl: Look, Khoa. There are a lot of books on this table.\n" +
            "Boy: How much is the dictionary? It looks expensive.\n" +
            "Girl: It is ninety thousand dong. That is quite cheap for a dictionary.\n" +
            "Boy: I only have fifty thousand with me. I have spent too much this week.\n" +
            "Girl: You could buy a few comics instead. They are ten thousand each.\n" +
            "Boy: No, I am saving up for a bicycle, so I must not waste my money.\n" +
            "Girl: That is very sensible. How much have you saved?\n" +
            "Boy: Four hundred thousand. I need a lot more, but I am going to get there.\n" +
            "Girl: My mum says if you save a little every week, you never run out of money at the end of the month.\n" +
            "Boy: Your mum is right. I will buy the dictionary next month.\n" +
            "Girl: And I will lend you my old one until then.",
          questions: [
            mcq(
              "How much does the dictionary cost?",
              "Cuốn từ điển giá bao nhiêu?",
              [
                "Fifty thousand dong",
                "Ninety thousand dong",
                "Ten thousand dong",
                "Four hundred thousand dong",
              ],
              1,
              "Bạn nữ nói giá cuốn từ điển là chín mươi nghìn đồng, và như thế là khá rẻ.",
              "It is ninety thousand dong.",
            ),
            mcq(
              "Why does Khoa not buy the comics?",
              "Vì sao Khoa không mua mấy cuốn truyện tranh?",
              [
                "He is saving up for a bicycle.",
                "He does not like comics.",
                "They are too expensive.",
                "He has already read them.",
              ],
              0,
              "Bạn ấy từ chối vì đang để dành tiền mua xe đạp nên không muốn tiêu phí.",
              "I am saving up for a bicycle, so I must not waste my money",
            ),
            tf(
              "The girl offers to lend Khoa her old dictionary.",
              "Bạn nữ đề nghị cho Khoa mượn cuốn từ điển cũ của mình.",
              true,
              "ĐÚNG. Câu cuối bạn ấy nói sẽ cho Khoa mượn cuốn cũ tới khi Khoa mua được cuốn mới.",
              "And I will lend you my old one until then.",
            ),
            mcq(
              "What does the girl think about Khoa's decision?",
              "Bạn nữ nghĩ gì về quyết định của Khoa?",
              [
                "She thinks it is very sensible.",
                "She thinks he is being mean.",
                "She thinks he should buy the comics.",
                "She thinks he will never save enough.",
              ],
              0,
              "Ngay sau khi Khoa từ chối mua truyện, bạn nữ khen 'That is very sensible' — thái độ tán thành.",
              "That is very sensible.",
            ),
          ],
        },
        writingPrompt:
          "Viết 60–80 từ bằng tiếng Anh kể em tiết kiệm tiền như thế nào. Bắt buộc dùng ít nhất BỐN từ chỉ số lượng khác nhau (a lot of / much / many / a few / a little) và nói rõ em đang để dành mua gì.",
        writingOutline:
          "1. Mở bài: mỗi tuần em có bao nhiêu tiền tiêu vặt, Tết được lì xì thế nào.\n" +
          "2. Ngày trước em tiêu vào những gì — 'I spent a lot of money on ...'.\n" +
          "3. Bây giờ em làm khác ra sao: piggy bank, budget, ghi lại price, 'I keep a little for the week'.\n" +
          "4. Kết bài: em đang save up for cái gì, còn thiếu bao nhiêu — 'I still need a lot more'.",
        speaking: {
          sentences: [
            "I get some lucky money at Tet every year.",
            "I write down every price in a small notebook.",
            "I do not buy many snacks any more.",
            "I am saving up for a bicycle.",
            "I have never borrowed money from my friends.",
          ],
          questions: [
            {
              question: "Do you save your pocket money? How do you do it?",
              sampleAnswer:
                "Yes, I do. I put half of my pocket money in a piggy bank every week and keep a little for snacks. My sister taught me to write down every price.",
            },
            {
              question: "What are you saving up for at the moment?",
              sampleAnswer:
                "I am saving up for a second-hand bicycle. It costs two million dong, so I still need a lot more money, but I am not going to give up.",
            },
            {
              question: "Is it better to save money or to spend it? Why?",
              sampleAnswer:
                "I think it is better to save most of it and spend a little. If you save every week, you can afford something big instead of many small things you forget.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 12 ───────────────────────────
      {
        topic: "Pets and Responsibility",
        topicVi: "Thú cưng và trách nhiệm",
        icon: "🐶",
        words: [
          word("pet", "/pet/", "thú cưng", "🐾"),
          word("puppy", "/ˈpʌpi/", "chó con", "🐶"),
          word("kitten", "/ˈkɪtn/", "mèo con", "🐱"),
          word("rabbit", "/ˈræbɪt/", "con thỏ", "🐰"),
          word("goldfish", "/ˈɡəʊldfɪʃ/", "cá vàng", "🐟"),
          word("feed", "/fiːd/", "cho ăn", "🍽️"),
          word("brush", "/brʌʃ/", "chải lông cho thú cưng", "🪥"),
          word("walk", "/wɔːk/", "dắt đi dạo", "🚶"),
          word("vet", "/vet/", "bác sĩ thú y", "🩺"),
          word("lead", "/liːd/", "dây dắt chó", "🦮"),
          word("bowl", "/bəʊl/", "bát đựng thức ăn", "🥣"),
          word("gentle", "/ˈdʒentl/", "nhẹ nhàng, dịu dàng", "🤲"),
          word("patient", "/ˈpeɪʃnt/", "kiên nhẫn", "😌"),
          word("promise", "/ˈprɒmɪs/", "hứa, lời hứa", "🤞"),
          word("take turns", "/ˌteɪk ˈtɜːnz/", "thay phiên nhau làm", "🔁"),
        ],
        sound: {
          letters: "-t · -d · -k (cuối từ)",
          sound: "/t/ /d/ /k/",
          hint:
            "Tiếng Việt cũng có phụ âm cuối, nhưng ta ĐÓNG CHẶT rồi thôi, không bật hơi ra. Vì thế " +
            "'cat' thành 'két', 'feed' thành 'phít', 'walk' thành 'goóc' — người nghe không biết từ " +
            "kết thúc bằng gì. Tiếng Anh phải BẬT NHẸ hơi ra ở cuối: /t/ và /k/ không rung, /d/ có " +
            "rung. Thử để bàn tay trước miệng: nói 'cat' đúng thì thấy một luồng hơi nhỏ chạm tay. " +
            "Nuốt phụ âm cuối là lỗi đắt giá nhất: 'feed' hoá 'feet', 'bed' hoá 'bet', 'walked' hoá " +
            "'war'.",
          words: [
            { word: "pet", meaning: "thú cưng — bật nhẹ /t/, đừng dừng ở 'pe'", emoji: "🐾" },
            { word: "feed", meaning: "cho ăn — /d/ cuối CÓ rung, khác hẳn 'feet'", emoji: "🍽️" },
            { word: "walk", meaning: "dắt đi dạo — chữ 'l' câm, nhưng /k/ cuối phải nghe rõ", emoji: "🚶" },
            { word: "cat", meaning: "con mèo — /kæt/, nuốt /t/ là thành 'ca'", emoji: "🐱" },
            { word: "duck", meaning: "con vịt — bật /k/ cuối, không dừng ở 'đắ'", emoji: "🦆" },
          ],
        },
        reading: {
          title: "The Puppy We Promised to Look After",
          passage:
            "For two years my brother and I asked our parents for a dog. Every time, my mother said the same thing: you are too young, and our flat is too small.\n\n" +
            "Last April my aunt moved to Ho Chi Minh City and could not take her puppy, so Milo came to live with us. He is our first pet. My mother made us promise three things: we would feed him, walk him, and clean up after him.\n\n" +
            "The first week was fun. The second week was hard. Milo was not old enough to walk far, but he still wanted to play at six o'clock in the morning. My brother and I take turns now: I feed him before school and fill his bowl, and my brother brushes him and walks him in the evening.\n\n" +
            "Milo is gentle with my little cousin, who is only four, and he waits patiently by the door when he sees his lead.\n\n" +
            "Last month he was ill and we took him to the vet, who said we were looking after him well. My mother did not say anything, but she smiled. I think she is happier about Milo than any of us.",
          translation:
            "Suốt hai năm trời, tớ với em trai xin bố mẹ cho nuôi một chú chó. Lần nào mẹ cũng nói đúng một câu: các con còn nhỏ quá, mà nhà mình thì chật quá.\n\n" +
            "Tháng Tư năm ngoái, dì tớ chuyển vào Thành phố Hồ Chí Minh và không mang chú chó con theo được, thế là Milo về ở với nhà tớ. Đó là con vật nuôi đầu tiên của nhà tớ. Mẹ bắt hai anh em hứa ba điều: cho Milo ăn, dắt đi dạo và dọn dẹp sau khi nó bày bừa.\n\n" +
            "Tuần đầu thì vui. Tuần thứ hai mới vất. Milo chưa đủ lớn để đi xa, vậy mà sáu giờ sáng nó đã đòi chơi. Bây giờ hai anh em tớ thay phiên nhau: tớ cho ăn và đổ đầy bát trước giờ đi học, còn em tớ chải lông và dắt đi dạo buổi tối.\n\n" +
            "Milo rất nhẹ nhàng với em họ bốn tuổi của tớ, và cứ thấy sợi dây dắt là nó ngồi chờ ngoan ngoãn bên cửa.\n\n" +
            "Tháng trước Milo ốm, nhà tớ đưa nó đi bác sĩ thú y, bác bảo hai anh em chăm nó rất khéo. Mẹ không nói gì, chỉ mỉm cười. Tớ nghĩ mẹ mới là người vui vì Milo nhất nhà.",
          questions: [
            mcq(
              "Why did the mother say no to a dog for two years?",
              "Vì sao suốt hai năm mẹ không đồng ý cho nuôi chó?",
              [
                "She does not like dogs.",
                "The children were too young and the flat was too small.",
                "Dogs are too expensive to feed.",
                "Their aunt already had a puppy.",
              ],
              1,
              "Lần nào mẹ cũng nói cùng một lý do: các con còn quá nhỏ và căn hộ thì quá chật.",
              "you are too young, and our flat is too small",
            ),
            mcq(
              "How did Milo come to live with the family?",
              "Milo đến ở với gia đình bằng cách nào?",
              [
                "Their aunt moved away and could not take him.",
                "Their mother bought him at a pet shop.",
                "They found him near their flat.",
                "The vet gave him to them.",
              ],
              0,
              "Dì của bạn ấy chuyển vào Thành phố Hồ Chí Minh và không mang chú chó con theo được.",
              "my aunt moved to Ho Chi Minh City and could not take her puppy",
            ),
            mcq(
              "Why could Milo not go for long walks at first?",
              "Vì sao lúc đầu Milo chưa đi dạo xa được?",
              [
                "He was afraid of the street.",
                "He did not have a lead.",
                "He was not old enough.",
                "Nobody had time in the evening.",
              ],
              2,
              "Bài viết nói 'Milo was not old enough to walk far' — nó chưa đủ lớn để đi xa.",
              "Milo was not old enough to walk far",
            ),
            tf(
              "The writer feeds Milo in the morning and the brother walks him in the evening.",
              "Bạn ấy cho Milo ăn buổi sáng, còn em trai dắt Milo đi dạo buổi tối.",
              true,
              "ĐÚNG. Hai anh em chia việc: bạn ấy cho ăn trước giờ học, em trai chải lông và dắt đi dạo buổi tối.",
              "I feed him before school and fill his bowl, and my brother brushes him and walks him in the evening",
            ),
            mcq(
              "What does the writer believe about his mother?",
              "Bạn ấy tin điều gì về mẹ mình?",
              [
                "She is secretly the happiest about Milo.",
                "She still wants to give Milo away.",
                "She is angry about the mess Milo makes.",
                "She never goes near the puppy.",
              ],
              0,
              "Mẹ không nói gì, chỉ mỉm cười — và bạn ấy đoán mẹ mới là người vui vì Milo nhất nhà.",
              "I think she is happier about Milo than any of us",
            ),
          ],
        },
        listening: {
          title: "At the Pet Shop",
          transcript:
            "Girl: Mum, look at the rabbits! They are so soft.\n" +
            "Mum: They are lovely, but a rabbit is not a toy. Somebody has to clean the cage every day.\n" +
            "Girl: I will do it, I promise. And I will take turns with Nam.\n" +
            "Boy: A goldfish is easier. You only feed it and clean the water.\n" +
            "Girl: A goldfish is too quiet. I want a pet that comes when I call it.\n" +
            "Mum: Then a kitten might be better than a rabbit. But are you patient enough? A kitten scratches the furniture for the first few months.\n" +
            "Girl: I am patient. I looked after our neighbour's cat for a week and I was very gentle with her.\n" +
            "Mum: That is true. All right, we will talk to your father tonight.\n" +
            "Girl: Thank you! I am going to buy a bowl with my own money.",
          questions: [
            mcq(
              "What does Mum say about keeping a rabbit?",
              "Mẹ nói gì về việc nuôi thỏ?",
              [
                "Somebody has to clean the cage every day.",
                "Rabbits are too expensive.",
                "Rabbits are not gentle with children.",
                "A rabbit needs a long walk every day.",
              ],
              0,
              "Mẹ nhắc rằng thỏ không phải đồ chơi: ngày nào cũng phải có người dọn chuồng.",
              "Somebody has to clean the cage every day",
            ),
            mcq(
              "Why does the girl not want a goldfish?",
              "Vì sao bạn nữ không muốn nuôi cá vàng?",
              [
                "It is too quiet for her.",
                "It is too difficult to feed.",
                "Her brother is afraid of fish.",
                "The water smells bad.",
              ],
              0,
              "Bạn ấy nói cá vàng 'too quiet' — quá im lặng; bạn muốn một con vật biết chạy tới khi mình gọi.",
              "A goldfish is too quiet.",
            ),
            tf(
              "The girl has looked after somebody else's cat before.",
              "Bạn nữ đã từng trông mèo giúp người khác.",
              true,
              "ĐÚNG. Bạn ấy kể mình từng chăm con mèo của nhà hàng xóm suốt một tuần.",
              "I looked after our neighbour's cat for a week",
            ),
            mcq(
              "How does Mum feel at the end of the conversation?",
              "Cuối cuộc trò chuyện, mẹ cảm thấy thế nào?",
              [
                "She agrees the girl has shown she is responsible.",
                "She refuses to talk about pets again.",
                "She wants to buy the rabbit immediately.",
                "She thinks the girl is too young for any pet.",
              ],
              0,
              "Mẹ công nhận 'That is true' rồi đồng ý tối nay nói chuyện với bố — nghĩa là đã bị thuyết phục.",
              "That is true. All right, we will talk to your father tonight.",
            ),
          ],
        },
        writingPrompt:
          "Viết 60–80 từ bằng tiếng Anh trả lời câu hỏi: em đã đủ lớn để tự chăm một con thú cưng chưa? Bắt buộc dùng ít nhất MỘT câu với 'too + tính từ' và MỘT câu với 'tính từ + enough'.",
        writingOutline:
          "1. Mở bài: em muốn nuôi con gì (a puppy / a kitten / a rabbit) và vì sao.\n" +
          "2. Những việc phải làm mỗi ngày: feed, walk, brush, clean up, fill the bowl.\n" +
          "3. Em đã đủ lớn chưa — dùng 'I am old enough to ...' và 'My flat is too small for ...'.\n" +
          "4. Kết bài: một lời hứa với bố mẹ — 'I promise I will ... every day.'",
        speaking: {
          sentences: [
            "We promised to feed the puppy every morning.",
            "Milo is not old enough to walk far.",
            "My brother and I take turns to clean up.",
            "She is gentle enough to hold the rabbit.",
            "Our flat is too small for a big dog.",
          ],
          questions: [
            {
              question: "Do you have a pet? What do you do for it every day?",
              sampleAnswer:
                "Yes, we have a puppy called Milo. I feed him and fill his bowl before school, and my brother brushes him and walks him in the evening.",
            },
            {
              question: "Why do some children stop looking after their pets?",
              sampleAnswer:
                "I think they are too excited at the beginning and forget that a pet needs food and a walk every single day, even when it is raining.",
            },
            {
              question: "What is the best pet for a busy family? Why?",
              sampleAnswer:
                "A goldfish is probably best, because it is quiet and you only feed it and clean the water. A dog is lovely, but it is not easy enough for a busy family.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 5 · Nơi mình sống",
    subtitle: "Phố thị và làng quê, những chuyến xe buýt và nếp nhà ngày Tết.",
    lessons: [
      // ─────────────────────────── Bài 13 ───────────────────────────
      {
        topic: "City and Countryside",
        topicVi: "Thành phố và vùng quê",
        icon: "🏙️",
        words: [
          word("city", "/ˈsɪti/", "thành phố", "🏙️"),
          word("countryside", "/ˈkʌntrisaɪd/", "vùng quê, nông thôn", "🌄"),
          word("traffic", "/ˈtræfɪk/", "xe cộ đi lại trên đường", "🚗"),
          word("noisy", "/ˈnɔɪzi/", "ồn ào", "🔊"),
          word("peaceful", "/ˈpiːsfl/", "yên bình", "🕊️"),
          word("street", "/striːt/", "đường phố", "🛣️"),
          word("skyscraper", "/ˈskaɪskreɪpə/", "toà nhà chọc trời", "🏢"),
          word("field", "/fiːld/", "cánh đồng", "🌾"),
          word("fresh", "/freʃ/", "trong lành, tươi mới", "🍃"),
          word("pollution", "/pəˈluːʃn/", "ô nhiễm", "🌫️"),
          word("shopping centre", "/ˈʃɒpɪŋ ˌsentə/", "trung tâm mua sắm", "🛍️"),
          word("neighbour", "/ˈneɪbə/", "hàng xóm", "🧑‍🤝‍🧑"),
          word("stream", "/striːm/", "con suối nhỏ", "🏞️"),
          word("space", "/speɪs/", "khoảng rộng để chơi", "🪁"),
          word("get used to", "/ˌɡet ˈjuːst tuː/", "quen dần với điều gì", "🔄"),
        ],
        sound: {
          letters: "st · sk · sp · str (đầu từ)",
          sound: "/st/ /sk/ /sp/",
          hint:
            "Tiếng Việt không bao giờ có HAI phụ âm đứng liền nhau ở đầu tiếng, nên trẻ Việt tự động " +
            "chèn thêm nguyên âm cho dễ đọc: 'street' thành 'sờ-tơ-rít', 'sky' thành 'sờ-cai', " +
            "'space' thành 'sờ-pết'. Cách sửa: kéo dài /s/ như tiếng rắn kêu rồi TRƯỢT NGAY sang phụ " +
            "âm sau, tuyệt đối không nghỉ ở giữa. Lỗi ngược lại cũng hay gặp là bỏ hẳn /s/: 'street' " +
            "thành 'treet', 'school' thành 'cool'. Cả cụm phải nằm gọn trong MỘT âm tiết.",
          words: [
            { word: "street", meaning: "đường phố — /striːt/, ba phụ âm dính liền, một âm tiết", emoji: "🛣️" },
            { word: "stream", meaning: "con suối — /striːm/, đừng thành 'sờ-tơ-rim'", emoji: "🏞️" },
            { word: "sky", meaning: "bầu trời — /skaɪ/, /s/ trượt thẳng sang /k/", emoji: "☁️" },
            { word: "skyscraper", meaning: "toà nhà chọc trời — /ˈskaɪskreɪpə/, hai cụm /sk/ liền nhau", emoji: "🏢" },
            { word: "space", meaning: "khoảng không — /speɪs/, không chèn nguyên âm giữa s và p", emoji: "🪁" },
          ],
        },
        reading: {
          title: "Two Homes, Two Worlds",
          passage:
            "I live in Hanoi, but my grandparents live in a small village in Ninh Binh, so I know both worlds well.\n\n" +
            "The city is exciting. My street is never quiet: there are motorbikes at six in the morning and a shopping centre that stays open until ten at night. My school is only ten minutes away, and from our window I can count four skyscrapers. The problem is the traffic. The air is not as fresh as the air in the countryside, and on some days the pollution is bad enough to give me a headache.\n\n" +
            "In the village, nothing is as noisy as my street in Hanoi. The mornings are peaceful and full of birdsong. My grandmother's house looks over a field, and there is a stream behind it where my cousins and I catch small fish. The neighbours know everybody's name. There is much more space, so we can play football until it gets dark.\n\n" +
            "Of course, the countryside is not perfect. The nearest cinema is thirty kilometres away, and my cousins have to get used to a slow internet connection.\n\n" +
            "I love both places, but if you ask me where I sleep best, the answer is always my grandmother's house.",
          translation:
            "Tớ sống ở Hà Nội, còn ông bà tớ ở một ngôi làng nhỏ tại Ninh Bình, nên tớ biết rõ cả hai thế giới.\n\n" +
            "Thành phố thì náo nhiệt. Con phố nhà tớ chẳng bao giờ yên: sáu giờ sáng đã có tiếng xe máy, còn trung tâm mua sắm thì mở tới mười giờ đêm. Trường tớ chỉ cách nhà mười phút, và từ cửa sổ nhà tớ đếm được bốn toà nhà chọc trời. Vấn đề là xe cộ. Không khí ở đây không trong lành bằng ở quê, có hôm ô nhiễm nặng tới mức tớ bị đau đầu.\n\n" +
            "Ở làng thì chẳng có gì ồn bằng con phố nhà tớ ngoài Hà Nội. Buổi sáng yên bình và rộn tiếng chim. Nhà bà tớ nhìn ra một cánh đồng, phía sau có con suối nhỏ, chỗ mấy anh em họ tớ hay bắt cá con. Hàng xóm ai cũng biết tên nhau. Chỗ chơi thì rộng rãi hơn nhiều, bọn tớ đá bóng tới tận lúc trời tối.\n\n" +
            "Tất nhiên vùng quê cũng không hoàn hảo. Rạp chiếu phim gần nhất cách ba mươi cây số, còn mấy anh em họ tớ thì phải quen với đường mạng chậm rì.\n\n" +
            "Tớ yêu cả hai nơi, nhưng nếu hỏi tớ ngủ ngon nhất ở đâu, câu trả lời luôn là nhà bà.",
          questions: [
            mcq(
              "Why does the writer know both the city and the countryside well?",
              "Vì sao bạn ấy hiểu rõ cả thành phố lẫn vùng quê?",
              [
                "The family moves house every summer.",
                "The grandparents live in a village in Ninh Binh.",
                "The writer went to school in the countryside.",
                "The cousins live in Hanoi.",
              ],
              1,
              "Bạn ấy sống ở Hà Nội nhưng ông bà ở làng quê Ninh Bình, nên biết rõ cả hai nơi.",
              "my grandparents live in a small village in Ninh Binh",
            ),
            mcq(
              "What does the writer complain about in the city?",
              "Bạn ấy phàn nàn điều gì ở thành phố?",
              [
                "The school is too far away.",
                "The shopping centre closes too early.",
                "The air is not as fresh as in the countryside.",
                "There are no places to play football.",
              ],
              2,
              "Bạn ấy nói không khí thành phố không trong lành bằng ở quê, có hôm ô nhiễm còn làm đau đầu.",
              "The air is not as fresh as the air in the countryside",
            ),
            mcq(
              "What do the writer and the cousins do behind the grandmother's house?",
              "Bạn ấy và các anh chị em họ làm gì sau nhà bà?",
              [
                "They catch small fish in a stream.",
                "They watch films in a small cinema.",
                "They look after the neighbours' garden.",
                "They ride motorbikes on the field.",
              ],
              0,
              "Sau nhà bà có một con suối nhỏ, nơi mấy anh em họ hay bắt cá con.",
              "there is a stream behind it where my cousins and I catch small fish",
            ),
            mcq(
              "What is one disadvantage of the countryside?",
              "Một điểm bất tiện của vùng quê là gì?",
              [
                "The neighbours are unfriendly.",
                "There is no space to play.",
                "The nearest cinema is thirty kilometres away.",
                "The mornings are too noisy.",
              ],
              2,
              "Bài viết nêu rõ hai bất tiện: rạp phim gần nhất cách ba mươi cây số và mạng internet chậm.",
              "The nearest cinema is thirty kilometres away",
            ),
            mcq(
              "How does the writer feel about the two places?",
              "Bạn ấy cảm thấy thế nào về hai nơi này?",
              [
                "He loves both, but sleeps best at his grandmother's house.",
                "He wants to leave Hanoi as soon as possible.",
                "He thinks the countryside is boring.",
                "He prefers the city in every way.",
              ],
              0,
              "Câu cuối cho thấy thái độ cân bằng: yêu cả hai nơi, nhưng ngủ ngon nhất vẫn là ở nhà bà.",
              "I love both places, but if you ask me where I sleep best, the answer is always my grandmother's house",
            ),
          ],
        },
        listening: {
          title: "Moving to the Countryside?",
          transcript:
            "Boy: My father has a new job in Ninh Binh, so we might move there next year.\n" +
            "Girl: Really? Will you miss Hanoi?\n" +
            "Boy: A little. My street is noisy, but everything is close.\n" +
            "Girl: My cousins live in the countryside and they say the air is much fresher.\n" +
            "Boy: That is true. My grandmother's village is as quiet as a library at night.\n" +
            "Girl: Are the schools good?\n" +
            "Boy: My father says the new school is as good as mine, and there is more space for sport. They even have two football pitches.\n" +
            "Girl: Then I think you will be happy. How long will it take to get used to it?\n" +
            "Boy: A few months, probably. I am going to miss my friends most of all.\n" +
            "Girl: We can call each other every week. And I will visit you in the summer.\n" +
            "Boy: That would be great. My grandmother makes the best sticky rice in the village.",
          questions: [
            mcq(
              "Why might the boy's family move?",
              "Vì sao gia đình cậu bé có thể chuyển đi?",
              [
                "His father has a new job in Ninh Binh.",
                "Their flat in Hanoi is too small.",
                "His grandmother is ill.",
                "He wants to change schools.",
              ],
              0,
              "Ngay câu đầu cậu ấy nói bố có công việc mới ở Ninh Bình nên năm sau cả nhà có thể chuyển tới đó.",
              "My father has a new job in Ninh Binh",
            ),
            mcq(
              "What does the boy say about the village at night?",
              "Cậu bé nói gì về ngôi làng vào buổi tối?",
              [
                "It is as quiet as a library.",
                "It is noisier than Hanoi.",
                "It is completely dark.",
                "It is full of visitors.",
              ],
              0,
              "Cậu ấy so sánh: làng của bà ban đêm yên tĩnh y như một thư viện.",
              "My grandmother's village is as quiet as a library at night",
            ),
            tf(
              "The new school has more space for sport than the boy's school in Hanoi.",
              "Trường mới có nhiều chỗ chơi thể thao hơn trường của cậu bé ở Hà Nội.",
              true,
              "ĐÚNG. Bố cậu ấy bảo trường mới tốt ngang trường cũ và còn rộng chỗ chơi thể thao hơn, có tận hai sân bóng.",
              "there is more space for sport",
            ),
            mcq(
              "What will the boy miss most?",
              "Điều cậu bé sẽ nhớ nhất là gì?",
              [
                "His friends",
                "The shopping centre",
                "His old school building",
                "The noisy street",
              ],
              0,
              "Cậu ấy nói thẳng: 'I am going to miss my friends most of all' — nhớ bạn bè nhất.",
              "I am going to miss my friends most of all",
            ),
          ],
        },
        writingPrompt:
          "Viết 60–80 từ bằng tiếng Anh so sánh nơi em đang sống với một nơi khác em từng tới (quê của ông bà, một thành phố khác). Bắt buộc dùng ít nhất MỘT câu 'as … as' và MỘT câu 'not as … as'.",
        writingOutline:
          "1. Mở bài: em sống ở đâu và nơi kia là đâu.\n" +
          "2. Điểm giống nhau — dùng 'as … as': 'The people there are as friendly as my neighbours.'\n" +
          "3. Điểm khác nhau — dùng 'not as … as': 'The air here is not as fresh as the air there.'\n" +
          "4. Kết bài: em thích nơi nào hơn và vì sao (space, traffic, pollution, peaceful).",
        speaking: {
          sentences: [
            "My street is never quiet in the morning.",
            "The air here is not as fresh as the air in the countryside.",
            "There is a stream behind my grandmother's house.",
            "Nothing is as noisy as my street in Hanoi.",
            "In the countryside there is much more space to play.",
          ],
          questions: [
            {
              question: "Would you rather live in a city or in the countryside? Why?",
              sampleAnswer:
                "I would rather live in the city, because my school and my friends are close. But the air is not as fresh as in the countryside, so I visit my grandparents every summer.",
            },
            {
              question: "What do you like doing when you visit the countryside?",
              sampleAnswer:
                "I like catching small fish in the stream with my cousins. We also play football in the field until it gets dark, because there is much more space there.",
            },
            {
              question: "What is the biggest problem in a big city?",
              sampleAnswer:
                "I think it is the traffic. There are motorbikes from six in the morning, and on some days the pollution is bad enough to give people a headache.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 14 ───────────────────────────
      {
        topic: "Public Transport",
        topicVi: "Xe buýt và tàu điện",
        icon: "🚌",
        words: [
          word("bus stop", "/ˈbʌs stɒp/", "điểm dừng xe buýt", "🚏"),
          word("ticket", "/ˈtɪkɪt/", "vé", "🎫"),
          word("fare", "/feə/", "giá vé phải trả", "💵"),
          word("driver", "/ˈdraɪvə/", "tài xế", "🧑‍✈️"),
          word("passenger", "/ˈpæsɪndʒə/", "hành khách", "🧍"),
          word("seat", "/siːt/", "chỗ ngồi", "💺"),
          word("route", "/ruːt/", "tuyến đường xe chạy", "🗺️"),
          word("metro", "/ˈmetrəʊ/", "tàu điện ngầm", "🚇"),
          word("queue", "/kjuː/", "hàng người đứng chờ", "🚶‍♂️"),
          word("announce", "/əˈnaʊns/", "thông báo qua loa", "📢"),
          word("delay", "/dɪˈleɪ/", "sự chậm trễ", "⏳"),
          word("safety", "/ˈseɪfti/", "sự an toàn", "🦺"),
          word("helmet", "/ˈhelmɪt/", "mũ bảo hiểm", "⛑️"),
          word("get on", "/ˌɡet ˈɒn/", "lên xe", "🆙"),
          word("get off", "/ˌɡet ˈɒf/", "xuống xe", "🚪"),
        ],
        sound: {
          letters: "-l · -le (cuối từ)",
          sound: "/l/",
          hint:
            "Âm /l/ ở CUỐI từ tiếng Anh nghe nặng và tối. Trẻ Việt hay biến nó thành nguyên âm 'u' " +
            "hoặc 'o': 'school' thành 'xì-cu', 'well' thành 'oeo', 'bicycle' thành 'bai-xi-cồ'. Bí " +
            "quyết chỉ có một: ĐẦU LƯỠI phải chạm lên lợi trên và GIỮ nguyên ở đó tới khi hết tiếng — " +
            "chỉ tròn môi thôi là sai. Lỗi ngược lại là thêm nguyên âm phía sau ('travel' thành " +
            "'tra-vồ-lơ'). Lưỡi chạm, giữ, rồi dừng — không thêm gì cả.",
          words: [
            { word: "school", meaning: "trường học — /skuːl/, lưỡi chạm lợi trên ở cuối", emoji: "🏫" },
            { word: "travel", meaning: "đi lại, du hành — /ˈtrævl/, đừng thành 'tra-vồ'", emoji: "🧳" },
            { word: "people", meaning: "mọi người — /ˈpiːpl/, cụm -ple đọc gọn một âm tiết", emoji: "👨‍👩‍👧" },
            { word: "careful", meaning: "cẩn thận — /ˈkeəfl/, /l/ cuối vẫn phải nghe thấy", emoji: "⚠️" },
            { word: "bicycle", meaning: "xe đạp — /ˈbaɪsɪkl/, kết thúc bằng /l/ chứ không phải 'cồ'", emoji: "🚲" },
          ],
        },
        reading: {
          title: "The Number 14 Bus",
          passage:
            "Every morning I take the number 14 bus to school. It is not the fastest way, but it is cheap and safe, and my mother is happy because I am not on a motorbike in the rain.\n\n" +
            "The fare is only three thousand dong for students. Tickets are sold by the driver, and they are checked again when the bus is full. Each stop is announced through a speaker, so nobody misses the school gate. The route passes the market and the hospital.\n\n" +
            "The bus is cleaned every night at the depot, and the seats near the door are kept for older passengers. Last week a woman with a baby got on, and four students stood up at the same time. She smiled and said we were very polite.\n\n" +
            "I get off at half past six and walk the last two hundred metres. If there is a long queue at the bus stop, I read my book while I wait.\n\n" +
            "Sometimes there is a delay because of a traffic jam, and I arrive late. My teacher understands, but I still hate it. That is why I always leave the house ten minutes earlier than I need to.",
          translation:
            "Sáng nào tớ cũng đi xe buýt số 14 tới trường. Đó không phải cách nhanh nhất, nhưng rẻ và an toàn, mà mẹ tớ cũng vui vì tớ không phải ngồi xe máy dưới trời mưa.\n\n" +
            "Vé học sinh chỉ ba nghìn đồng. Bác tài bán vé ngay trên xe, và vé được kiểm lại một lần nữa khi xe đông. Mỗi điểm dừng đều được loa thông báo, nên chẳng ai lỡ cổng trường cả. Tuyến xe đi qua chợ và bệnh viện.\n\n" +
            "Tối nào xe cũng được dọn sạch ở bến, còn mấy ghế gần cửa thì để dành cho hành khách lớn tuổi. Tuần trước có một cô bế em bé bước lên, thế là bốn bạn học sinh đứng dậy cùng lúc. Cô ấy cười và bảo bọn tớ ngoan lắm.\n\n" +
            "Tớ xuống xe lúc sáu rưỡi rồi đi bộ nốt hai trăm mét cuối. Nếu ở điểm dừng có hàng người xếp dài, tớ lấy sách ra đọc trong lúc chờ.\n\n" +
            "Thỉnh thoảng xe trễ vì tắc đường, thế là tớ tới muộn. Cô giáo tớ thông cảm, nhưng tớ vẫn ghét cảm giác đó. Vì vậy lúc nào tớ cũng ra khỏi nhà sớm hơn mười phút so với mức cần thiết.",
          questions: [
            mcq(
              "Why is the writer's mother happy about the bus?",
              "Vì sao mẹ bạn ấy yên tâm với việc đi xe buýt?",
              [
                "It is the fastest way to school.",
                "He is not on a motorbike in the rain.",
                "The driver is a friend of the family.",
                "The bus stops outside their house.",
              ],
              1,
              "Bài viết nói xe buýt rẻ và an toàn, mẹ vui vì con không phải ngồi xe máy dưới mưa.",
              "my mother is happy because I am not on a motorbike in the rain",
            ),
            mcq(
              "Who sells the tickets on the number 14 bus?",
              "Trên xe buýt số 14, ai là người bán vé?",
              [
                "The driver",
                "A machine at the bus stop",
                "A teacher from the school",
                "The older passengers",
              ],
              0,
              "Câu bị động 'Tickets are sold by the driver' cho biết chính bác tài là người bán vé.",
              "Tickets are sold by the driver",
            ),
            mcq(
              "What happened when a woman with a baby got on the bus?",
              "Chuyện gì xảy ra khi một người phụ nữ bế em bé lên xe?",
              [
                "The driver asked her to wait.",
                "Nobody noticed her.",
                "Four students stood up at the same time.",
                "She sat next to the writer.",
              ],
              2,
              "Bốn bạn học sinh đứng dậy cùng lúc nhường chỗ, và cô ấy khen các bạn rất lễ phép.",
              "four students stood up at the same time",
            ),
            tf(
              "The writer waits at the bus stop without doing anything.",
              "Bạn ấy đứng chờ ở điểm xe buýt mà chẳng làm gì cả.",
              false,
              "SAI. Khi hàng người xếp dài, bạn ấy lấy sách ra đọc trong lúc chờ.",
              "If there is a long queue at the bus stop, I read my book while I wait",
            ),
            mcq(
              "How does the writer feel about arriving late?",
              "Bạn ấy cảm thấy thế nào khi tới lớp muộn?",
              [
                "He hates it, so he leaves home early.",
                "He does not mind, because the teacher understands.",
                "He blames the driver every time.",
                "He thinks it is quite funny.",
              ],
              0,
              "Dù cô giáo thông cảm, bạn ấy vẫn ghét việc đi muộn — nên luôn ra khỏi nhà sớm hơn mười phút.",
              "My teacher understands, but I still hate it.",
            ),
          ],
        },
        listening: {
          title: "Which Bus Goes to the Museum?",
          transcript:
            "Boy: Excuse me, is this the right bus for the museum?\n" +
            "Man: No, this one goes to the station. You need the number 23.\n" +
            "Boy: Where is the bus stop for the 23?\n" +
            "Man: On the other side of the street, in front of the bookshop.\n" +
            "Girl: How much is the fare, please?\n" +
            "Man: Seven thousand dong each. Tickets are bought on the bus, not at the stop.\n" +
            "Girl: Is it faster to take the metro?\n" +
            "Man: A little, but the metro station is twenty minutes away on foot. The bus is easier.\n" +
            "Boy: Thank you. Come on, Mai, there is a queue already.\n" +
            "Girl: Wait, is there a delay today? The board says the next bus is at four twenty.\n" +
            "Man: That is normal on Saturdays. Sit near the door and get off at the third stop.\n" +
            "Girl: Thank you very much. You have been really helpful.",
          questions: [
            mcq(
              "Where does the man's bus go?",
              "Chiếc xe buýt của bác ấy đi đâu?",
              [
                "To the museum",
                "To the station",
                "To the bookshop",
                "To the metro",
              ],
              1,
              "Bác ấy nói ngay: xe này đi ra ga, muốn tới bảo tàng thì phải bắt xe số 23.",
              "this one goes to the station",
            ),
            mcq(
              "Where can the children buy tickets for the number 23?",
              "Hai bạn nhỏ có thể mua vé xe số 23 ở đâu?",
              [
                "At the bus stop",
                "On the bus",
                "At the metro station",
                "In the bookshop",
              ],
              1,
              "Câu bị động của bác ấy nói rõ: vé được mua NGAY TRÊN XE, không mua ở điểm dừng.",
              "Tickets are bought on the bus, not at the stop",
            ),
            tf(
              "The metro station is very close to the bus stop.",
              "Ga tàu điện ngầm ở rất gần điểm dừng xe buýt.",
              false,
              "SAI. Bác ấy nói đi bộ tới ga tàu điện mất hai mươi phút, nên đi xe buýt tiện hơn.",
              "the metro station is twenty minutes away on foot",
            ),
            mcq(
              "How does the girl feel about the man at the end?",
              "Cuối đoạn hội thoại, bạn nữ cảm thấy thế nào về bác ấy?",
              [
                "She is grateful because he was helpful.",
                "She is annoyed because he was rude.",
                "She is confused by his directions.",
                "She thinks he gave the wrong information.",
              ],
              0,
              "Bạn ấy cảm ơn và nói 'You have been really helpful' — thái độ biết ơn rõ ràng.",
              "Thank you very much. You have been really helpful.",
            ),
          ],
        },
        writingPrompt:
          "Viết 60–80 từ bằng tiếng Anh giới thiệu phương tiện em dùng để đi học. Bắt buộc dùng ít nhất HAI câu bị động hiện tại đơn (… is / are + V3, ví dụ 'Tickets are sold on the bus').",
        writingOutline:
          "1. Mở bài: em đi học bằng gì, mất bao lâu.\n" +
          "2. Vé và giá vé — dùng câu bị động: 'Tickets are sold by the driver.'\n" +
          "3. Một chi tiết về chuyến đi: mỗi điểm dừng được thông báo thế nào, ghế nào để dành cho ai.\n" +
          "4. Kết bài: điều em thích và điều em không thích (a delay, a long queue, a crowded bus).",
        speaking: {
          sentences: [
            "Tickets are sold by the driver on this bus.",
            "Each stop is announced through a speaker.",
            "I get off at the third stop and walk to school.",
            "There was a delay because of a traffic jam.",
            "The seats near the door are kept for older passengers.",
          ],
          questions: [
            {
              question: "How do you travel to school every day?",
              sampleAnswer:
                "I take the number 14 bus. The fare is only three thousand dong for students, and tickets are sold by the driver when you get on.",
            },
            {
              question: "What should passengers do to stay safe on a bus?",
              sampleAnswer:
                "They should hold the bar when the bus is moving and wait in the queue instead of pushing. You must never get off before the bus stops.",
            },
            {
              question: "Do you prefer the bus or the metro? Why?",
              sampleAnswer:
                "I prefer the metro because it is never late, but the station is twenty minutes away on foot, so I usually take the bus.",
            },
          ],
        },
      },

      // ─────────────────────────── Bài 15 ───────────────────────────
      {
        topic: "Family Traditions",
        topicVi: "Nếp nhà ngày Tết",
        icon: "🧧",
        words: [
          word("tradition", "/trəˈdɪʃn/", "truyền thống, nếp cũ của gia đình", "🎏"),
          word("ancestor", "/ˈænsestə/", "tổ tiên", "👴"),
          word("altar", "/ˈɔːltə/", "bàn thờ", "🪔"),
          word("incense", "/ˈɪnsens/", "hương, nhang", "🕯️"),
          word("lantern", "/ˈlæntən/", "đèn lồng", "🏮"),
          word("wrap", "/ræp/", "gói lại", "🎁"),
          word("rice cake", "/ˈraɪs keɪk/", "bánh chưng, bánh tét", "🍡"),
          word("celebrate", "/ˈselɪbreɪt/", "ăn mừng, kỷ niệm", "🎉"),
          word("relative", "/ˈrelətɪv/", "họ hàng", "👨‍👩‍👧‍👦"),
          word("gather", "/ˈɡæðə/", "tụ họp lại một chỗ", "🤝"),
          word("recipe", "/ˈresəpi/", "công thức nấu ăn", "📜"),
          word("generation", "/ˌdʒenəˈreɪʃn/", "thế hệ", "👵"),
          word("special", "/ˈspeʃl/", "đặc biệt", "✨"),
          word("wish", "/wɪʃ/", "lời chúc, điều ước", "🌟"),
          word("grow up", "/ˌɡrəʊ ˈʌp/", "lớn lên", "🌱"),
        ],
        sound: {
          letters: "sh · ci · ti",
          sound: "/ʃ/",
          hint:
            "Tiếng Việt không có âm /ʃ/ chuẩn, nên trẻ Việt hay thay bằng /s/: 'wish' thành 'guýt', " +
            "'she' thành 'si', 'special' thành 'spê-sồ'. Cách làm đúng: chu môi ra phía trước như khi " +
            "ra hiệu 'suỵt!', nâng lưỡi lên gần vòm miệng, thổi hơi ra dài và êm — không có tiếng bật. " +
            "Nhớ rằng /ʃ/ không chỉ viết là 'sh': 'special' (ci) và 'tradition' (ti) cũng đọc /ʃ/. Ở " +
            "CUỐI từ vẫn phải nghe rõ, nếu không 'wish' sẽ nghe thành 'wit'.",
          words: [
            { word: "wish", meaning: "lời chúc — /wɪʃ/, chu môi, hơi thoát ra êm", emoji: "🌟" },
            { word: "shop", meaning: "cửa hàng — /ʃɒp/, đừng đọc thành 'sop'", emoji: "🏪" },
            { word: "dish", meaning: "món ăn, cái đĩa — /dɪʃ/, /ʃ/ ở cuối phải nghe rõ", emoji: "🍜" },
            { word: "special", meaning: "đặc biệt — /ˈspeʃl/, chữ 'ci' đọc là /ʃ/", emoji: "✨" },
            { word: "finish", meaning: "hoàn thành — /ˈfɪnɪʃ/, kết thúc bằng /ʃ/", emoji: "🏁" },
          ],
        },
        reading: {
          title: "The Night Before Tet",
          passage:
            "In my family, the two days before Tet are busier than any other days of the year. My mother says that when she was a girl, the whole village used to make rice cakes together in one big yard. We do not do that now, but we still make ours at home.\n\n" +
            "My grandmother is seventy-eight. She used to wrap forty cakes in a single evening; these days she sits on a chair and tells us what we are doing wrong. Her recipe has not changed for three generations, and nobody may change it.\n\n" +
            "While the cakes are boiling, my father cleans the altar and my brother and I polish the old photographs of our ancestors. My aunt arrives with lanterns, and all our relatives gather in the small living room. There is never enough space, and that is part of the fun.\n\n" +
            "At midnight we light incense and make a wish for the new year. My cousins who live abroad call us on video, and my grandmother always cries a little.\n\n" +
            "I used to think Tet was only about food and lucky money. Now that I am growing up, I understand that this special tradition is really about the people in the room.",
          translation:
            "Ở nhà tớ, hai ngày trước Tết là hai ngày bận nhất năm. Mẹ tớ kể hồi mẹ còn bé, cả làng cùng gói bánh chưng chung trong một cái sân rộng. Bây giờ nhà tớ không làm thế nữa, nhưng vẫn tự gói bánh ở nhà.\n\n" +
            "Bà tớ năm nay bảy mươi tám tuổi. Ngày xưa bà gói bốn mươi cái bánh chỉ trong một tối; giờ bà ngồi trên ghế và chỉ ra chỗ bọn tớ làm sai. Công thức của bà đã ba đời không đổi, và không ai được phép sửa.\n\n" +
            "Trong lúc chờ bánh chín, bố tớ lau bàn thờ, còn tớ với em trai thì lau mấy tấm ảnh cũ của tổ tiên. Dì tớ mang đèn lồng tới, rồi họ hàng kéo nhau vào phòng khách nhỏ xíu. Chẳng bao giờ đủ chỗ, mà vui cũng là ở chỗ đó.\n\n" +
            "Đúng nửa đêm, cả nhà thắp hương và cầu một điều ước cho năm mới. Mấy anh chị họ ở nước ngoài gọi video về, và bà tớ lần nào cũng khóc một chút.\n\n" +
            "Ngày bé tớ cứ tưởng Tết chỉ là chuyện ăn uống với tiền lì xì. Bây giờ lớn hơn rồi, tớ hiểu rằng cái nếp đặc biệt ấy thật ra là chuyện của những con người trong căn phòng đó.",
          questions: [
            mcq(
              "What did the whole village use to do before Tet?",
              "Ngày trước, cả làng thường làm gì trước Tết?",
              [
                "They made rice cakes together in one big yard.",
                "They cleaned the village temple.",
                "They travelled to the city together.",
                "They bought their cakes at the market.",
              ],
              0,
              "Mẹ kể hồi bé, cả làng cùng gói bánh chung trong một cái sân rộng — bây giờ thì mỗi nhà tự làm.",
              "the whole village used to make rice cakes together in one big yard",
            ),
            mcq(
              "What does the grandmother do these days?",
              "Bây giờ bà làm gì trong lúc cả nhà gói bánh?",
              [
                "She wraps forty cakes in one evening.",
                "She sits on a chair and tells the family what they are doing wrong.",
                "She stays in her room until midnight.",
                "She writes down a new recipe every year.",
              ],
              1,
              "Ngày xưa bà gói bốn mươi cái một tối; giờ bà ngồi trên ghế và chỉ ra chỗ mọi người làm sai.",
              "these days she sits on a chair and tells us what we are doing wrong",
            ),
            mcq(
              "What do the writer and the brother do while the cakes are boiling?",
              "Trong lúc chờ bánh chín, bạn ấy và em trai làm gì?",
              [
                "They light the incense.",
                "They carry the lanterns to the yard.",
                "They polish the old photographs of the ancestors.",
                "They call their cousins abroad.",
              ],
              2,
              "Bố lau bàn thờ, còn hai anh em thì lau những tấm ảnh cũ của tổ tiên.",
              "my brother and I polish the old photographs of our ancestors",
            ),
            tf(
              "The family lights incense and makes a wish at midnight.",
              "Đúng nửa đêm, cả nhà thắp hương và cầu một điều ước.",
              true,
              "ĐÚNG. Bài viết nói rõ: đúng nửa đêm cả nhà thắp hương và cầu một điều ước cho năm mới.",
              "At midnight we light incense and make a wish for the new year",
            ),
            mcq(
              "How has the writer's opinion of Tet changed?",
              "Suy nghĩ của bạn ấy về Tết đã thay đổi thế nào?",
              [
                "Tet used to be exciting, but now it is boring.",
                "He used to think it was about food and lucky money; now he sees it is about people.",
                "He used to enjoy the cooking, but now he prefers to stay in his room.",
                "He used to celebrate with the village; now he celebrates alone.",
              ],
              1,
              "Câu cuối cho thấy thái độ đã chín chắn hơn: ngày bé tưởng Tết chỉ là ăn uống và lì xì, giờ hiểu Tết là vì con người.",
              "I used to think Tet was only about food and lucky money",
            ),
          ],
        },
        listening: {
          title: "Grandma's Kitchen",
          transcript:
            "Girl: Grandma, did you use to make rice cakes when you were my age?\n" +
            "Grandma: Of course. I was nine when I learnt, and I used to help my mother every year.\n" +
            "Girl: Was it the same recipe?\n" +
            "Grandma: Exactly the same. Nobody in this family has ever changed it.\n" +
            "Boy: Grandma, how many cakes did you use to make?\n" +
            "Grandma: Forty in one evening. We did not have a gas cooker, so we used to sit by the fire all night.\n" +
            "Girl: That sounds tiring.\n" +
            "Grandma: It was, but we sang and told stories. It never felt like work.\n" +
            "Boy: Can I light the incense on the altar this year?\n" +
            "Grandma: Yes, but be careful and ask your father to stand next to you.\n" +
            "Girl: I want to learn the whole recipe, Grandma. I am going to teach my own children one day.\n" +
            "Grandma: Then this tradition will be safe. That is the best wish you could give me.",
          questions: [
            mcq(
              "How old was Grandma when she learnt to make rice cakes?",
              "Bà học gói bánh năm bao nhiêu tuổi?",
              [
                "Nine",
                "Forty",
                "Twelve",
                "Seventy-eight",
              ],
              0,
              "Bà kể: 'I was nine when I learnt' — bà học lúc chín tuổi và năm nào cũng giúp cụ.",
              "I was nine when I learnt",
            ),
            mcq(
              "Why did the family use to sit by the fire all night?",
              "Vì sao ngày xưa cả nhà phải ngồi canh bếp lửa suốt đêm?",
              [
                "They liked singing outside.",
                "They did not have a gas cooker.",
                "The kitchen was too small.",
                "They were waiting for their relatives.",
              ],
              1,
              "Bà giải thích ngày đó nhà không có bếp ga nên phải ngồi canh lửa cả đêm.",
              "We did not have a gas cooker, so we used to sit by the fire all night",
            ),
            tf(
              "Grandma says the long night never felt like work.",
              "Bà nói cái đêm dài ấy chẳng bao giờ giống như phải làm việc.",
              true,
              "ĐÚNG. Bà bảo tuy mệt nhưng cả nhà vừa hát vừa kể chuyện, nên không thấy giống làm việc.",
              "It never felt like work.",
            ),
            mcq(
              "How does Grandma feel about the girl's promise?",
              "Bà cảm thấy thế nào về lời hứa của cô bé?",
              [
                "She thinks it is the best wish she could receive.",
                "She thinks the girl is too young to learn.",
                "She would rather teach the boy instead.",
                "She is worried the recipe will change.",
              ],
              0,
              "Bà nói nếu cháu học được thì nếp nhà sẽ còn mãi, và đó là lời chúc quý nhất bà nhận được.",
              "Then this tradition will be safe. That is the best wish you could give me.",
            ),
          ],
        },
        writingPrompt:
          "Viết 60–80 từ bằng tiếng Anh kể một nếp sinh hoạt truyền thống của gia đình em. Bắt buộc dùng ít nhất HAI câu với 'used to' để so sánh ngày xưa với bây giờ.",
        writingOutline:
          "1. Mở bài: gia đình em có nếp gì (Tết, giỗ, sinh nhật ông bà) và diễn ra khi nào.\n" +
          "2. Ngày xưa ông bà làm thế nào — 'My grandmother used to ...'.\n" +
          "3. Bây giờ nhà em làm khác ra sao — 'We do not do that now, but we still ...'.\n" +
          "4. Kết bài: vì sao nếp ấy đặc biệt với em (relatives, gather, wish, generation).",
        speaking: {
          sentences: [
            "The whole village used to make rice cakes together.",
            "My grandmother used to wrap forty cakes in one evening.",
            "All our relatives gather in the small living room.",
            "At midnight we light incense and make a wish.",
            "I used to think Tet was only about lucky money.",
          ],
          questions: [
            {
              question: "What does your family do to celebrate Tet?",
              sampleAnswer:
                "We make rice cakes at home two days before Tet. My father cleans the altar, and at midnight we light incense and make a wish for the new year.",
            },
            {
              question: "Which family tradition do you like best? Why?",
              sampleAnswer:
                "I like the night when all our relatives gather in our small living room. There is never enough space, but that is exactly why it feels special.",
            },
            {
              question: "Did your grandparents use to celebrate Tet differently?",
              sampleAnswer:
                "Yes, they did. My grandmother used to sit by the fire all night because they did not have a gas cooker, and the whole village used to cook together.",
            },
          ],
        },
      },
    ],
  },
];
