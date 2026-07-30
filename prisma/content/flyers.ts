// Nội dung bài học cấp `flyers` (9–11 tuổi · Cambridge YLE Flyers · A2).
// Xem hợp đồng + hướng dẫn soạn theo cấp ở prisma/content/types.ts.
//
// Phonics ở cấp này KHÔNG còn dạy âm rời mà dạy QUY TẮC CHÍNH TẢ:
//   silent e → -tion → ph → kn- → wr- → g mềm → đuôi -ed đọc 3 kiểu (/t/ /d/ /ɪd/).
import { type ChapterSeed, mcq, tf, word } from "./types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // CHƯƠNG 1 · THẾ GIỚI QUANH EM
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 1 · Thế giới quanh em",
    subtitle: "Kỳ nghỉ, các quốc gia và lễ hội — bé kể về thế giới bằng tiếng Anh.",
    lessons: [
      // ───────────────────────── Bài 1 · Holidays ─────────────────────────
      {
        topic: "Holidays",
        topicVi: "Kỳ nghỉ của bé",
        icon: "🏖️",
        words: [
          word("holiday", "/ˈhɒlədeɪ/", "kỳ nghỉ", "🏖️"),
          word("journey", "/ˈdʒɜːni/", "chuyến đi (đường dài)", "🚆"),
          word("suitcase", "/ˈsuːtkeɪs/", "va li", "🧳"),
          word("beach", "/biːtʃ/", "bãi biển", "🏝️"),
          word("seaside", "/ˈsiːsaɪd/", "vùng ven biển", "🌊"),
          word("sunshine", "/ˈsʌnʃaɪn/", "ánh nắng", "☀️"),
          word("shell", "/ʃel/", "vỏ sò", "🐚"),
          word("souvenir", "/ˌsuːvəˈnɪə/", "quà lưu niệm", "🎁"),
          word("postcard", "/ˈpəʊstkɑːd/", "bưu thiếp", "💌"),
          word("exciting", "/ɪkˈsaɪtɪŋ/", "thú vị, làm mình háo hức", "🤩"),
          word("remember", "/rɪˈmembə/", "nhớ, ghi nhớ", "🧠"),
          word("important", "/ɪmˈpɔːtnt/", "quan trọng", "⭐"),
        ],
        sound: {
          letters: "a_e / i_e (silent e)",
          sound: "/eɪ/, /aɪ/",
          hint:
            "Chữ e ở cuối từ KHÔNG được đọc. Nó chỉ làm nhiệm vụ 'gọi tên' nguyên âm đứng trước: mad /mæd/ → made /meɪd/, kit /kɪt/ → kite /kaɪt/. Bé Việt hay đọc thừa thành 'may-đơ', 'cây-kơ' — tuyệt đối không thêm âm cho chữ e cuối. Đổi lại, phải BẬT RÕ phụ âm cuối /k/, /t/, /p/ (cake, kite, tape); tiếng Việt hay nuốt phụ âm cuối nên cake dễ bị đọc thành 'kêy'.",
          words: [
            { word: "lake", meaning: "hồ nước", emoji: "🏞️" },
            { word: "kite", meaning: "cái diều", emoji: "🪁" },
            { word: "plane", meaning: "máy bay", emoji: "✈️" },
            { word: "make", meaning: "làm, tạo ra", emoji: "🛠️" },
            { word: "like", meaning: "thích", emoji: "❤️" },
          ],
        },
        reading: {
          title: "Our Holiday by the Sea",
          passage:
            "Every summer my family goes on holiday together. This year we are going to Da Nang, and I am already packing my suitcase.\n\n" +
            "The journey will be long. We will travel by train for fifteen hours, so I will bring books and a card game. My little brother thinks the train is more exciting than the plane, because he can watch the rice fields go past the window. At the beach we will swim every morning while the sunshine is still soft. In the afternoon I will look for shells and buy a small souvenir for my grandmother. In the evening we will walk along the quiet seaside road. I have promised to send my grandmother a postcard too.\n\n" +
            "We will come home tired, but that is not important. The best holidays are the ones you remember for years.",
          translation:
            "Hè nào gia đình tớ cũng đi nghỉ cùng nhau. Năm nay cả nhà sẽ đi Đà Nẵng, và tớ đã bắt đầu xếp va li rồi.\n\n" +
            "Chuyến đi sẽ dài lắm. Nhà tớ đi tàu hoả mười lăm tiếng, nên tớ sẽ mang theo mấy quyển sách và một bộ bài. Em trai tớ thấy đi tàu thú vị hơn đi máy bay, vì em được ngắm những cánh đồng lúa lướt qua ô cửa sổ. Ở biển, sáng nào cả nhà cũng sẽ đi bơi lúc nắng còn dịu. Buổi chiều tớ sẽ đi nhặt vỏ sò và mua một món quà lưu niệm nhỏ cho bà. Buổi tối cả nhà sẽ đi dạo trên con đường ven biển vắng vẻ. Tớ còn hứa sẽ gửi cho bà một tấm bưu thiếp nữa.\n\n" +
            "Lúc về nhà chắc chắn ai cũng mệt, nhưng chuyện đó không quan trọng. Kỳ nghỉ hay nhất là kỳ nghỉ mà mình nhớ mãi nhiều năm sau.",
          questions: [
            mcq(
              "How will the family travel to Da Nang?",
              "Gia đình bạn nhỏ sẽ đi Đà Nẵng bằng gì?",
              ["By plane", "By train", "By bus", "By boat"],
              1,
              "Bài viết nói rõ cả nhà đi tàu hoả suốt mười lăm tiếng, nên đáp án là 'By train'.",
              "We will travel by train for fifteen hours",
            ),
            mcq(
              "Why does the little brother like the train?",
              "Vì sao em trai lại thích đi tàu?",
              [
                "Because the train is faster",
                "Because he can look at the rice fields",
                "Because he can sleep on the train",
                "Because the ticket is cheaper",
              ],
              1,
              "Câu 'because he can watch the rice fields go past the window' cho biết em thích ngắm cánh đồng lúa qua cửa sổ.",
              "because he can watch the rice fields go past the window",
            ),
            mcq(
              "What will the writer buy for grandmother?",
              "Bạn nhỏ sẽ mua gì cho bà?",
              ["A hat", "A book", "A small souvenir", "A card game"],
              2,
              "Bài đọc viết 'buy a small souvenir for my grandmother' — một món quà lưu niệm nhỏ.",
              "buy a small souvenir for my grandmother",
            ),
            tf(
              "The writer has promised to send a postcard.",
              "Bạn nhỏ đã hứa sẽ gửi một tấm bưu thiếp.",
              true,
              "Đúng rồi! Câu 'I have promised to send my grandmother a postcard too.' cho thấy bạn nhỏ đã hứa gửi bưu thiếp cho bà.",
              "I have promised to send my grandmother a postcard too.",
            ),
            mcq(
              "How does the writer feel about this holiday?",
              "Bạn nhỏ cảm thấy thế nào về kỳ nghỉ này?",
              ["Bored", "Worried", "Excited", "Angry"],
              2,
              "Bài không nói thẳng từ 'excited', bé phải tự suy ra: bạn nhỏ đã xếp va li từ rất sớm và kể vanh vách sẽ làm gì sáng, chiều, tối — đó là dấu hiệu của sự háo hức.",
            ),
          ],
        },
        listening: {
          title: "Packing for the Beach",
          transcript:
            "Girl: Mum, when will we leave for the beach?\n" +
            "Mum: On Saturday morning, at six o'clock. The journey is long, so we must start early.\n" +
            "Girl: Can I put my new swimming things in the suitcase?\n" +
            "Mum: Of course. Put a hat in too, because the sunshine is very strong at the seaside.\n" +
            "Girl: I will send Grandma a postcard from Da Nang. She will love it.\n" +
            "Mum: That is a lovely idea. She will keep it for years.",
          questions: [
            mcq(
              "When will the family leave?",
              "Khi nào cả nhà sẽ lên đường?",
              ["On Friday evening", "On Saturday morning", "On Sunday morning", "On Monday night"],
              1,
              "Mẹ trả lời 'On Saturday morning, at six o'clock.' — sáng thứ Bảy lúc sáu giờ.",
              "On Saturday morning, at six o'clock.",
            ),
            mcq(
              "Why must the girl pack a hat?",
              "Vì sao bạn nhỏ phải mang theo mũ?",
              [
                "Because the sunshine is very strong",
                "Because it will rain",
                "Because the hat is new",
                "Because Grandma gave it to her",
              ],
              0,
              "Mẹ giải thích lý do: 'because the sunshine is very strong at the seaside' — nắng ở biển rất gắt.",
              "because the sunshine is very strong at the seaside",
            ),
            tf(
              "The girl will send her grandmother a postcard.",
              "Bạn nhỏ sẽ gửi bưu thiếp cho bà.",
              true,
              "Đúng! Bạn nhỏ nói 'I will send Grandma a postcard from Da Nang.'",
              "I will send Grandma a postcard from Da Nang.",
            ),
            mcq(
              "What does Mum think of the postcard idea?",
              "Mẹ nghĩ gì về ý tưởng gửi bưu thiếp?",
              ["She thinks it is silly", "She thinks it is lovely", "She thinks it is too slow", "She thinks it is expensive"],
              1,
              "Mẹ khen ngay: 'That is a lovely idea.' — mẹ thấy đó là một ý hay.",
              "That is a lovely idea.",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về kỳ nghỉ hè sắp tới của bé: bé sẽ đi đâu, đi với ai, đi bằng gì và sẽ làm gì ở đó? Nhớ dùng thì tương lai (will / be going to).",
        writingOutline:
          "1. Mở bài: This summer I am going to … with my …\n" +
          "2. Cách đi: We will travel by … The journey will take …\n" +
          "3. Nơi ở: We will stay in a … near the …\n" +
          "4. Việc sẽ làm buổi sáng: Every morning I will …\n" +
          "5. Việc sẽ làm buổi chiều/tối: In the afternoon we will … In the evening we will …\n" +
          "6. Đồ mang theo: I will put … in my suitcase.\n" +
          "7. Kết bài: I think it will be a wonderful holiday because …",
        speaking: {
          sentences: [
            "We are going to Da Nang for our summer holiday.",
            "The journey will be long, but it will be exciting.",
            "I will swim at the beach every morning.",
            "I have promised to send my grandmother a postcard.",
            "The best holidays are the ones you remember for years.",
          ],
          questions: [
            {
              question: "Where do you usually go on holiday?",
              sampleAnswer:
                "I usually go to my grandmother's village. We swim in the river and eat fresh fruit from her garden.",
            },
            {
              question: "What will you put in your suitcase this summer?",
              sampleAnswer:
                "I will put three T-shirts, my swimming things, a hat and two books in my suitcase.",
            },
            {
              question: "Do you like travelling by train or by plane? Why?",
              sampleAnswer:
                "I like the train better, because I can watch the mountains and the rice fields through the window.",
            },
          ],
        },
      },

      // ───────────────────── Bài 2 · Different Countries ─────────────────────
      {
        topic: "Different Countries",
        topicVi: "Muôn màu các nước",
        icon: "🌍",
        words: [
          word("country", "/ˈkʌntri/", "đất nước", "🌍"),
          word("flag", "/flæɡ/", "lá cờ", "🚩"),
          word("language", "/ˈlæŋɡwɪdʒ/", "ngôn ngữ", "🗣️"),
          word("capital", "/ˈkæpɪtl/", "thủ đô", "🏛️"),
          word("population", "/ˌpɒpjuˈleɪʃn/", "dân số", "👨‍👩‍👧‍👦"),
          word("mountain", "/ˈmaʊntən/", "ngọn núi", "⛰️"),
          word("desert", "/ˈdezət/", "sa mạc", "🏜️"),
          word("island", "/ˈaɪlənd/", "hòn đảo", "🏝️"),
          word("traditional", "/trəˈdɪʃənl/", "truyền thống", "👘"),
          word("different", "/ˈdɪfrənt/", "khác nhau", "🔀"),
          word("largest", "/ˈlɑːdʒɪst/", "lớn nhất", "📏"),
          word("visit", "/ˈvɪzɪt/", "ghé thăm", "✈️"),
        ],
        sound: {
          letters: "-tion",
          sound: "/ʃən/",
          hint:
            "Đuôi -tion luôn đọc là /ʃən/ ('sh-ơn'), KHÔNG bao giờ đọc là 'ti-on' hay 'x-ân'. Trẻ Việt rất hay đổi /ʃ/ thành /s/ vì tiếng Việt không có âm này: station phải là 'x-TÂY-sh(ơ)n' chứ không phải 'x-tây-sân'. Mẹo: chu môi tròn ra trước rồi đẩy hơi dài như khi bảo em bé 'suỵt'. Nhớ trọng âm luôn rơi vào âm ngay TRƯỚC -tion. Một ngoại lệ bé hay gặp: question viết là -stion chứ không phải -tion, nên đọc là /ˈkwestʃən/ ('quét-chân') — có âm 'ch' chứ không phải 'sh'.",
          words: [
            { word: "station", meaning: "nhà ga", emoji: "🚉" },
            { word: "nation", meaning: "quốc gia", emoji: "🏳️" },
            { word: "invention", meaning: "phát minh", emoji: "💡" },
            { word: "direction", meaning: "phương hướng", emoji: "🧭" },
            { word: "population", meaning: "dân số", emoji: "👨‍👩‍👧‍👦" },
          ],
        },
        reading: {
          title: "Countries Are Not the Same",
          passage:
            "There are almost two hundred countries in the world, and no two of them are the same.\n\n" +
            "Every country has its own flag, its own capital city and often its own language. Some countries are enormous. Russia is the largest country on Earth, but China has a much bigger population than Russia. Other countries are tiny: Singapore is a small island, and you can drive across it in one hour. The land is different too. Egypt has a hot desert, Nepal has the highest mountain in the world, and Viet Nam has long beaches and green rice fields. People wear different traditional clothes, eat different food and celebrate different days.\n\n" +
            "I have never been abroad, but one day I will visit three countries: Japan, Australia and Egypt. I am going to learn ten words in each language before I go.",
          translation:
            "Trên thế giới có gần hai trăm quốc gia, và không có hai nước nào giống hệt nhau.\n\n" +
            "Nước nào cũng có lá cờ riêng, thủ đô riêng và thường là ngôn ngữ riêng. Có nước rộng mênh mông. Nga là nước lớn nhất Trái Đất, nhưng Trung Quốc lại đông dân hơn Nga rất nhiều. Có nước lại bé xíu: Singapore là một hòn đảo nhỏ, lái xe một tiếng là hết chiều ngang. Đất đai cũng mỗi nơi một khác. Ai Cập có sa mạc nóng bỏng, Nepal có ngọn núi cao nhất thế giới, còn Việt Nam có bãi biển dài và những cánh đồng lúa xanh. Người ở mỗi nơi mặc trang phục truyền thống khác nhau, ăn món khác nhau và mừng những ngày lễ khác nhau.\n\n" +
            "Tớ chưa từng ra nước ngoài, nhưng một ngày nào đó tớ sẽ đi thăm ba nước: Nhật Bản, Úc và Ai Cập. Trước khi đi, tớ sẽ học mười từ trong mỗi thứ tiếng.",
          questions: [
            mcq(
              "Which country is the largest in the world?",
              "Nước nào lớn nhất thế giới?",
              ["China", "Russia", "Egypt", "Australia"],
              1,
              "Bài viết rõ: 'Russia is the largest country on Earth' — Nga là nước lớn nhất.",
              "Russia is the largest country on Earth",
            ),
            mcq(
              "Where is the highest mountain in the world?",
              "Ngọn núi cao nhất thế giới ở đâu?",
              ["In Egypt", "In Singapore", "In Nepal", "In Viet Nam"],
              2,
              "Bài đọc nói 'Nepal has the highest mountain in the world' — ngọn núi cao nhất nằm ở Nepal.",
              "Nepal has the highest mountain in the world",
            ),
            mcq(
              "How many countries does the writer want to visit one day?",
              "Bạn nhỏ muốn tới thăm mấy nước?",
              ["Two", "Three", "Five", "Ten"],
              1,
              "Câu 'one day I will visit three countries: Japan, Australia and Egypt' cho biết là ba nước.",
              "one day I will visit three countries: Japan, Australia and Egypt",
            ),
            tf(
              "The writer has already travelled to another country.",
              "Bạn nhỏ đã từng đi nước ngoài rồi.",
              false,
              "Sai nhé. Bạn nhỏ viết 'I have never been abroad' — chưa bao giờ ra nước ngoài. 'have never been' là thì hiện tại hoàn thành, nghĩa là tới giờ vẫn chưa đi lần nào.",
              "I have never been abroad",
            ),
            mcq(
              "Why does the writer want to learn ten words in each language?",
              "Vì sao bạn nhỏ muốn học mười từ trong mỗi thứ tiếng?",
              [
                "To pass a test at school",
                "To say a few things to people there",
                "To become a language teacher",
                "To write a long book",
              ],
              1,
              "Bài không nói thẳng lý do — bé phải suy ra. Bạn nhỏ học tiếng ngay TRƯỚC CHUYẾN ĐI ('before I go'), lại chỉ học mười từ thôi, nên rõ ràng là để chào hỏi, nói vài câu với người dân ở đó, chứ không phải để thi hay để dạy học.",
            ),
          ],
        },
        listening: {
          title: "My Cousin's Trip to Japan",
          transcript:
            "Boy: My cousin has just come back from Japan.\n" +
            "Girl: Lucky him! What was the best part?\n" +
            "Boy: The trains. He says they are faster than the trains here, and they are never late.\n" +
            "Girl: Did he learn any Japanese?\n" +
            "Boy: Only two words, hello and thank you. But people were very kind to him.\n" +
            "Girl: I am going to visit Japan when I am older, and I will learn the language first.",
          questions: [
            mcq(
              "Which country did the cousin visit?",
              "Anh họ của bạn nam đã đi nước nào?",
              ["Australia", "Egypt", "Japan", "Singapore"],
              2,
              "Ngay câu đầu bạn nam nói 'My cousin has just come back from Japan.' — anh ấy vừa từ Nhật Bản về.",
              "My cousin has just come back from Japan.",
            ),
            mcq(
              "What did the cousin like best?",
              "Anh họ thích nhất điều gì?",
              ["The food", "The trains", "The mountains", "The shops"],
              1,
              "Bạn nam kể 'He says they are faster than the trains here' khi nói về tàu — tàu là thứ anh ấy thích nhất.",
              "He says they are faster than the trains here",
            ),
            mcq(
              "How many Japanese words did the cousin learn?",
              "Anh họ học được mấy từ tiếng Nhật?",
              ["Two", "Ten", "Twenty", "None"],
              0,
              "Bạn nam nói 'Only two words, hello and thank you.' — chỉ hai từ thôi.",
              "Only two words, hello and thank you.",
            ),
            tf(
              "The girl will learn Japanese before she goes to Japan.",
              "Bạn nữ sẽ học tiếng Nhật trước khi sang Nhật.",
              true,
              "Đúng! Bạn nữ nói 'I will learn the language first.' — sẽ học tiếng trước đã.",
              "I will learn the language first.",
            ),
          ],
        },
        writingPrompt:
          "Chọn MỘT đất nước bé muốn tới thăm và viết 6–8 câu giới thiệu về nước đó. Bé nhớ dùng so sánh hơn/nhất (bigger, the largest) và câu tương lai (I will…).",
        writingOutline:
          "1. Mở bài: The country I want to visit is …\n" +
          "2. Vị trí: It is in … and its capital city is …\n" +
          "3. Ngôn ngữ: People there speak …\n" +
          "4. Một điều đặc biệt: It has the largest / the highest / the most beautiful …\n" +
          "5. So sánh với Việt Nam: It is bigger than Viet Nam. / It is colder than Viet Nam.\n" +
          "6. Việc sẽ làm: When I go there, I will …\n" +
          "7. Kết bài: I want to visit this country because …",
        speaking: {
          sentences: [
            "Every country has its own flag and its own language.",
            "Russia is the largest country in the world.",
            "Singapore is much smaller than Viet Nam.",
            "I have never been abroad, but I will go one day.",
            "I am going to learn ten words in each language.",
          ],
          questions: [
            {
              question: "Which country would you like to visit? Why?",
              sampleAnswer:
                "I would like to visit Japan, because I want to see the cherry blossom and ride a very fast train.",
            },
            {
              question: "Tell me two things about your own country.",
              sampleAnswer:
                "Viet Nam is long and thin. Our capital city is Ha Noi, and we have many beautiful beaches.",
            },
            {
              question: "Is it useful to speak another language? Why?",
              sampleAnswer:
                "Yes, it is very useful. If I speak English, I can make friends with children from many different countries.",
            },
          ],
        },
      },

      // ───────────────────────── Bài 3 · Festivals ─────────────────────────
      {
        topic: "Festivals",
        topicVi: "Lễ hội khắp nơi",
        icon: "🎊",
        words: [
          word("festival", "/ˈfestɪvl/", "lễ hội", "🎊"),
          word("celebrate", "/ˈselɪbreɪt/", "ăn mừng, kỷ niệm", "🎉"),
          word("lantern", "/ˈlæntən/", "đèn lồng", "🏮"),
          word("parade", "/pəˈreɪd/", "cuộc diễu hành", "🥁"),
          word("costume", "/ˈkɒstjuːm/", "bộ đồ hoá trang", "🦸"),
          word("firework", "/ˈfaɪəwɜːk/", "pháo hoa", "🎆"),
          word("lucky money", "/ˌlʌki ˈmʌni/", "tiền lì xì", "🧧"),
          word("relative", "/ˈrelətɪv/", "họ hàng", "👨‍👩‍👧"),
          word("decorate", "/ˈdekəreɪt/", "trang trí", "🎍"),
          word("photo", "/ˈfəʊtəʊ/", "bức ảnh", "📷"),
          word("delicious", "/dɪˈlɪʃəs/", "ngon tuyệt", "😋"),
          word("wonderful", "/ˈwʌndəfl/", "tuyệt vời", "✨"),
        ],
        sound: {
          letters: "ph",
          sound: "/f/",
          hint:
            "Hai chữ p và h đứng cạnh nhau đọc thành MỘT âm /f/ — giống hệt chữ 'ph' trong 'phở'. Đừng tách ra đọc 'pờ-hâu': photo là 'FÂU-tâu'. Khi phát âm /f/, răng cửa trên phải chạm nhẹ môi dưới rồi xì hơi ra, không dùng hai môi như âm /p/. Chú ý dolphin và elephant có 'ph' nằm ở GIỮA từ, vẫn đọc /f/ như thường.",
          words: [
            { word: "photo", meaning: "bức ảnh", emoji: "📷" },
            { word: "phone", meaning: "điện thoại", emoji: "📱" },
            { word: "elephant", meaning: "con voi", emoji: "🐘" },
            { word: "dolphin", meaning: "cá heo", emoji: "🐬" },
            { word: "alphabet", meaning: "bảng chữ cái", emoji: "🔤" },
          ],
        },
        reading: {
          title: "The Best Days of the Year",
          passage:
            "Every country has festivals, and they are the days children wait for all year.\n\n" +
            "In Viet Nam the biggest one is Tet. We celebrate it for three days in spring. Before Tet we clean the house and decorate it with peach flowers. My mother cooks banh chung, and it is the most delicious food of the whole year. Our relatives come from far away, and the children get lucky money in small red envelopes. In the autumn we have another wonderful festival, the Mid-Autumn Festival. We carry a bright lantern through the street, we watch a lion dance parade, and we take a photo of the full moon. In other countries children wear a funny costume in October or watch fireworks in the night sky.\n\n" +
            "Festivals are different everywhere, but they all do the same thing: they bring families together.",
          translation:
            "Nước nào cũng có lễ hội, và đó là những ngày trẻ con mong chờ suốt cả năm.\n\n" +
            "Ở Việt Nam, lễ hội lớn nhất là Tết. Nhà tớ ăn Tết ba ngày vào mùa xuân. Trước Tết cả nhà dọn dẹp và trang trí bằng hoa đào. Mẹ tớ gói bánh chưng, và đó là món ngon nhất trong cả năm. Họ hàng từ xa cũng về, còn bọn trẻ con thì được lì xì trong những phong bao đỏ nho nhỏ. Đến mùa thu, nhà tớ lại có một lễ hội tuyệt vời khác: Tết Trung thu. Tụi tớ rước đèn lồng sáng rực khắp phố, xem múa lân và chụp ảnh trăng tròn. Ở các nước khác, trẻ em mặc đồ hoá trang ngộ nghĩnh vào tháng Mười hoặc ngắm pháo hoa trên bầu trời đêm.\n\n" +
            "Lễ hội mỗi nơi mỗi khác, nhưng tất cả đều làm cùng một việc: kéo cả gia đình lại gần nhau.",
          questions: [
            mcq(
              "What do the children get at Tet?",
              "Trẻ con được nhận gì vào dịp Tết?",
              ["A new lantern", "Lucky money in red envelopes", "A funny costume", "A photo of the moon"],
              1,
              "Bài viết 'the children get lucky money in small red envelopes' — trẻ con được lì xì trong phong bao đỏ.",
              "the children get lucky money in small red envelopes",
            ),
            mcq(
              "What does the writer's mother cook for Tet?",
              "Mẹ bạn nhỏ nấu món gì vào dịp Tết?",
              ["Mooncake", "Banh chung", "Fried rice", "Peach flowers"],
              1,
              "Câu 'My mother cooks banh chung' cho biết mẹ gói bánh chưng, và bạn nhỏ khen đó là món ngon nhất trong năm.",
              "My mother cooks banh chung",
            ),
            mcq(
              "What do the children do at the Mid-Autumn Festival?",
              "Trẻ em làm gì vào Tết Trung thu?",
              [
                "They carry a bright lantern through the street",
                "They clean the house",
                "They wear a funny costume",
                "They watch fireworks in October",
              ],
              0,
              "Bài đọc kể 'We carry a bright lantern through the street' — rước đèn lồng đi khắp phố. Ba đáp án còn lại là việc của Tết Nguyên đán hoặc của lễ hội ở nước khác.",
              "We carry a bright lantern through the street",
            ),
            tf(
              "Children in every country celebrate exactly the same festivals.",
              "Trẻ em ở mọi nước đều mừng những lễ hội giống hệt nhau.",
              false,
              "Sai nhé. Câu cuối bài viết 'Festivals are different everywhere' — lễ hội mỗi nơi mỗi khác, chỉ có điểm chung là gắn kết gia đình.",
              "Festivals are different everywhere",
            ),
            mcq(
              "Why does the family clean the house before Tet?",
              "Vì sao cả nhà lại dọn dẹp nhà cửa trước Tết?",
              [
                "To make the house ready to welcome the new year",
                "Because the house is dirty every single day",
                "Because their teacher asks them to do it",
                "Because they want to sell the house",
              ],
              0,
              "Bài chỉ kể 'Before Tet we clean the house and decorate it with peach flowers' mà không nói lý do — bé phải tự suy ra. Dọn dẹp cùng lúc với trang trí hoa đào, ngay trước ngày lễ, nghĩa là để chuẩn bị đón năm mới.",
            ),
          ],
        },
        listening: {
          title: "Nam Talks About His Favourite Festival",
          transcript:
            "Teacher: Nam, please tell the class about your favourite festival.\n" +
            "Nam: I like the Mid-Autumn Festival best. Last year my sister and I made a star lantern from bamboo and red paper.\n" +
            "Teacher: That sounds wonderful. Did you go to a parade?\n" +
            "Nam: Yes. We watched a lion dance in front of our building, and my dad took photos of everyone.\n" +
            "Teacher: And what did you eat?\n" +
            "Nam: Mooncake, of course. The green tea one was the most delicious.",
          questions: [
            mcq(
              "Which festival does Nam like best?",
              "Nam thích lễ hội nào nhất?",
              ["Tet", "The Mid-Autumn Festival", "A festival in October", "A music festival"],
              1,
              "Nam trả lời ngay 'I like the Mid-Autumn Festival best.' — cậu ấy thích Trung thu nhất.",
              "I like the Mid-Autumn Festival best.",
            ),
            mcq(
              "What did Nam and his sister make?",
              "Nam và chị đã tự làm gì?",
              ["A mooncake", "A star lantern", "A lion mask", "A red envelope"],
              1,
              "Nam kể 'my sister and I made a star lantern from bamboo and red paper' — hai chị em làm đèn ông sao bằng tre và giấy đỏ.",
              "my sister and I made a star lantern from bamboo and red paper",
            ),
            mcq(
              "Who took the photos?",
              "Ai là người chụp ảnh?",
              ["Nam", "His sister", "His dad", "The teacher"],
              2,
              "Nam nói 'my dad took photos of everyone' — bố cậu ấy chụp ảnh cho mọi người.",
              "my dad took photos of everyone",
            ),
            tf(
              "Nam thought the green tea mooncake was the best one.",
              "Nam thấy bánh trung thu trà xanh là ngon nhất.",
              true,
              "Đúng! Nam nói 'The green tea one was the most delicious.' — cái bánh vị trà xanh ngon nhất.",
              "The green tea one was the most delicious.",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về lễ hội mà bé thích nhất: lễ hội đó tên gì, diễn ra khi nào, gia đình bé làm gì và vì sao bé thích nó.",
        writingOutline:
          "1. Mở bài: My favourite festival is …\n" +
          "2. Thời gian: It is in … (spring / autumn / October).\n" +
          "3. Chuẩn bị: Before the festival, we clean / decorate / cook …\n" +
          "4. Hoạt động: On the day, we …\n" +
          "5. Đồ ăn: We eat …, and it is delicious.\n" +
          "6. Người thân: My relatives / grandparents come and …\n" +
          "7. Kết bài: I love this festival because …",
        speaking: {
          sentences: [
            "Tet is the biggest festival in Viet Nam.",
            "Before Tet we decorate our house with peach flowers.",
            "The children get lucky money in small red envelopes.",
            "We carry a bright lantern through the street.",
            "Festivals bring families together.",
          ],
          questions: [
            {
              question: "What is your favourite festival, and why?",
              sampleAnswer:
                "My favourite festival is Tet, because all my relatives come to my house and we eat together for three days.",
            },
            {
              question: "What do you do at the Mid-Autumn Festival?",
              sampleAnswer:
                "I carry a star lantern, I watch the lion dance, and I eat mooncake with my family.",
            },
            {
              question: "Why do people celebrate festivals?",
              sampleAnswer:
                "People celebrate festivals to remember something important and to spend happy time with their families.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CHƯƠNG 2 · KHÁM PHÁ
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 2 · Khám phá",
    subtitle: "Vũ trụ, những phát minh và các loài vật cần được bảo vệ.",
    lessons: [
      // ───────────────────────── Bài 4 · Space ─────────────────────────
      {
        topic: "Space",
        topicVi: "Vũ trụ bao la",
        icon: "🚀",
        words: [
          word("space", "/speɪs/", "vũ trụ, khoảng không", "🌌"),
          word("planet", "/ˈplænɪt/", "hành tinh", "🪐"),
          word("star", "/stɑː/", "ngôi sao", "⭐"),
          word("rocket", "/ˈrɒkɪt/", "tên lửa", "🚀"),
          word("astronaut", "/ˈæstrənɔːt/", "phi hành gia", "👩‍🚀"),
          word("telescope", "/ˈtelɪskəʊp/", "kính thiên văn", "🔭"),
          word("Earth", "/ɜːθ/", "Trái Đất", "🌏"),
          word("space station", "/ˈspeɪs ˌsteɪʃn/", "trạm vũ trụ", "🛰️"),
          word("discover", "/dɪˈskʌvə/", "khám phá ra", "🔍"),
          word("float", "/fləʊt/", "lơ lửng, trôi bồng bềnh", "🎈"),
          word("dangerous", "/ˈdeɪndʒərəs/", "nguy hiểm", "⚠️"),
          word("brave", "/breɪv/", "dũng cảm", "💪"),
        ],
        sound: {
          letters: "kn-",
          sound: "/n/",
          hint:
            "Khi một từ bắt đầu bằng kn-, chữ k HOÀN TOÀN CÂM: know đọc y hệt 'no', knee đọc y hệt 'nee'. Bé Việt hay đọc thành 'k-nâu' vì thấy chữ gì cũng muốn đọc — hãy che chữ k lại rồi đọc phần còn lại. Nhớ luôn: know KHÔNG có âm /k/ và cũng KHÔNG có âm /w/ ở cuối.",
          words: [
            { word: "know", meaning: "biết", emoji: "🧠" },
            { word: "knee", meaning: "đầu gối", emoji: "🦵" },
            { word: "knock", meaning: "gõ cửa", emoji: "🚪" },
            { word: "knot", meaning: "nút thắt dây", emoji: "🪢" },
            { word: "knit", meaning: "đan len", emoji: "🧶" },
          ],
        },
        reading: {
          title: "Looking Up at the Stars",
          passage:
            "Look up on a clear night and you will see hundreds of stars. Each one is a sun, and some of them are far bigger than our own.\n\n" +
            "People have always wanted to know what is up there. More than four hundred years ago, Galileo built a telescope and discovered four moons around the planet Jupiter. In 1969 a huge rocket carried two astronauts to the Moon, and they walked there for the first time. Today astronauts live in a space station high above the Earth. Their work is dangerous, but they are brave. Inside the station nothing is heavy, so the astronauts float from wall to wall, and their food floats too.\n\n" +
            "Scientists say people will land on Mars one day. Perhaps a child who is reading this page will be the first one to walk there.",
          translation:
            "Hãy ngước lên vào một đêm trời quang, bé sẽ thấy hàng trăm ngôi sao. Mỗi ngôi sao là một mặt trời, và có những ngôi to hơn mặt trời của chúng ta rất nhiều.\n\n" +
            "Con người luôn muốn biết trên đó có gì. Hơn bốn trăm năm trước, Galileo tự làm một chiếc kính thiên văn và phát hiện ra bốn mặt trăng quay quanh sao Mộc. Năm 1969, một tên lửa khổng lồ đưa hai phi hành gia lên Mặt Trăng, và họ đã đặt chân lên đó lần đầu tiên. Ngày nay, các phi hành gia sống trong một trạm vũ trụ bay cao trên Trái Đất. Công việc của họ nguy hiểm, nhưng họ rất dũng cảm. Trong trạm, chẳng có gì nặng cả, nên các phi hành gia cứ trôi bồng bềnh từ vách này sang vách kia, và đồ ăn của họ cũng bay lơ lửng.\n\n" +
            "Các nhà khoa học nói rồi sẽ có ngày con người đặt chân lên sao Hoả. Biết đâu chính bạn nhỏ đang đọc trang này lại là người đầu tiên bước đi ở đó.",
          questions: [
            mcq(
              "What did Galileo discover?",
              "Galileo đã phát hiện ra điều gì?",
              [
                "A new star near the Sun",
                "Four moons around Jupiter",
                "A rocket that goes to Mars",
                "Water on the Moon",
              ],
              1,
              "Bài đọc viết 'discovered four moons around the planet Jupiter' — ông tìm ra bốn mặt trăng quay quanh sao Mộc.",
              "discovered four moons around the planet Jupiter",
            ),
            mcq(
              "When did people first walk on the Moon?",
              "Con người lần đầu đi trên Mặt Trăng vào năm nào?",
              ["In 1969", "In 1996", "Four hundred years ago", "This year"],
              0,
              "Câu 'In 1969 a huge rocket carried two astronauts to the Moon' cho biết đó là năm 1969.",
              "In 1969 a huge rocket carried two astronauts to the Moon",
            ),
            mcq(
              "Why do astronauts float inside the space station?",
              "Vì sao các phi hành gia lại trôi lơ lửng trong trạm vũ trụ?",
              [
                "Because the station is full of water",
                "Because nothing is heavy there",
                "Because they wear special shoes",
                "Because the station is very small",
              ],
              1,
              "Bài giải thích: 'Inside the station nothing is heavy, so the astronauts float from wall to wall' — trong trạm không có gì nặng nên mọi thứ đều bay lơ lửng.",
              "Inside the station nothing is heavy, so the astronauts float from wall to wall",
            ),
            tf(
              "Every star we see at night is a sun.",
              "Mỗi ngôi sao ta thấy ban đêm đều là một mặt trời.",
              true,
              "Đúng rồi! Bài viết 'Each one is a sun' — mỗi ngôi sao chính là một mặt trời, có ngôi còn to hơn mặt trời của chúng ta.",
              "Each one is a sun",
            ),
            mcq(
              "How does the writer feel about space?",
              "Tác giả cảm thấy thế nào về vũ trụ?",
              ["Frightened", "Bored", "Excited and hopeful", "Angry"],
              2,
              "Bài không có câu nào nói thẳng cảm xúc của tác giả, bé phải tự suy ra. Tác giả khen phi hành gia 'brave', kể chuyện khám phá đầy hào hứng và kết bằng hy vọng chính người đọc sẽ đặt chân lên sao Hoả — đó là giọng văn háo hức và tràn hy vọng.",
            ),
          ],
        },
        listening: {
          title: "Ha Wants to Be an Astronaut",
          transcript:
            "Boy: Ha, why are you carrying that big book?\n" +
            "Ha: It is all about space. I have read it three times already.\n" +
            "Boy: Three times! Do you want to be an astronaut?\n" +
            "Ha: Yes, I do. My uncle bought me a telescope last month, and now I look at the Moon every clear night.\n" +
            "Boy: Is it hard to become an astronaut?\n" +
            "Ha: Very hard. You must be healthy, brave and good at science. But I will try.",
          questions: [
            mcq(
              "How many times has Ha read the book?",
              "Hà đã đọc quyển sách đó mấy lần rồi?",
              ["Once", "Twice", "Three times", "Ten times"],
              2,
              "Hà nói 'I have read it three times already.' — đã đọc ba lần rồi.",
              "I have read it three times already.",
            ),
            mcq(
              "Who gave Ha the telescope?",
              "Ai đã tặng Hà chiếc kính thiên văn?",
              ["Her teacher", "Her uncle", "Her brother", "Her friend"],
              1,
              "Hà kể 'My uncle bought me a telescope last month' — chú của Hà mua tặng tháng trước.",
              "My uncle bought me a telescope last month",
            ),
            tf(
              "Ha thinks it is easy to become an astronaut.",
              "Hà nghĩ trở thành phi hành gia là chuyện dễ.",
              false,
              "Sai nhé. Hà trả lời 'Very hard. You must be healthy, brave and good at science.' — rất khó, phải khoẻ, dũng cảm và giỏi khoa học.",
              "Very hard. You must be healthy, brave and good at science.",
            ),
            mcq(
              "What will Ha do?",
              "Hà sẽ làm gì?",
              [
                "She will choose another job",
                "She will stop reading the book",
                "She will still try to become an astronaut",
                "She will sell her telescope",
              ],
              2,
              "Dù biết là rất khó, Hà vẫn nói 'But I will try.' — cô bé vẫn sẽ cố gắng theo đuổi ước mơ.",
              "But I will try.",
            ),
          ],
        },
        writingPrompt:
          "Tưởng tượng bé được bay vào vũ trụ một ngày. Viết 6–8 câu kể bé sẽ đi bằng gì, sẽ thấy gì, sẽ làm gì và cảm thấy ra sao. Dùng 'will' cho các việc sắp xảy ra.",
        writingOutline:
          "1. Mở bài: One day I will travel into space.\n" +
          "2. Phương tiện: I will go in a … with …\n" +
          "3. Nhìn thấy: From the window I will see …\n" +
          "4. Trong trạm: Nothing is heavy, so I will float …\n" +
          "5. Việc sẽ làm: I will take a photo of … / I will look at … through a telescope.\n" +
          "6. Cảm xúc: I will feel … because …\n" +
          "7. Kết bài: When I come back to Earth, I will tell …",
        speaking: {
          sentences: [
            "Look up on a clear night and you will see hundreds of stars.",
            "Galileo discovered four moons around the planet Jupiter.",
            "Astronauts live in a space station high above the Earth.",
            "Inside the station nothing is heavy, so everything floats.",
            "One day people will land on Mars.",
          ],
          questions: [
            {
              question: "Would you like to travel into space? Why?",
              sampleAnswer:
                "Yes, I would. I want to float inside a space station and see the Earth from the window.",
            },
            {
              question: "What can you see in the sky at night?",
              sampleAnswer:
                "I can see the Moon and hundreds of small stars. Sometimes I can see a plane with red lights too.",
            },
            {
              question: "Why do you think astronauts must be brave?",
              sampleAnswer:
                "I think they must be brave because their work is dangerous and they are very far from their families.",
            },
          ],
        },
      },

      // ───────────────────────── Bài 5 · Inventions ─────────────────────────
      {
        topic: "Inventions",
        topicVi: "Những phát minh kỳ diệu",
        icon: "💡",
        words: [
          word("invention", "/ɪnˈvenʃn/", "phát minh", "💡"),
          word("invent", "/ɪnˈvent/", "phát minh ra", "🔧"),
          word("inventor", "/ɪnˈventə/", "nhà phát minh", "👩‍🔬"),
          word("wheel", "/wiːl/", "bánh xe", "🛞"),
          word("paper", "/ˈpeɪpə/", "giấy", "📄"),
          word("printing", "/ˈprɪntɪŋ/", "việc in ấn", "🖨️"),
          word("electricity", "/ɪˌlekˈtrɪsəti/", "điện", "⚡"),
          word("machine", "/məˈʃiːn/", "cỗ máy", "⚙️"),
          word("century", "/ˈsentʃəri/", "thế kỷ", "📅"),
          word("useful", "/ˈjuːsfl/", "hữu ích", "👍"),
          word("modern", "/ˈmɒdn/", "hiện đại", "🏙️"),
          word("change", "/tʃeɪndʒ/", "thay đổi", "🔄"),
        ],
        sound: {
          letters: "wr-",
          sound: "/r/",
          hint:
            "Từ bắt đầu bằng wr- thì chữ w CÂM hoàn toàn: write đọc y hệt 'right', wrong bắt đầu bằng /r/. Bé Việt hay thêm âm 'qu-' hoặc 'u-' vào ('u-rai') — đừng tròn môi kiểu /w/, hãy cong lưỡi lên đọc /r/ ngay từ đầu. Và nhớ /r/ tiếng Anh KHÔNG rung lưỡi như chữ 'r' tiếng Việt miền Trung.",
          words: [
            { word: "write", meaning: "viết", emoji: "✍️" },
            { word: "wrong", meaning: "sai", emoji: "❌" },
            { word: "wrist", meaning: "cổ tay", emoji: "⌚" },
            { word: "wrap", meaning: "gói lại", emoji: "🎁" },
            { word: "wrote", meaning: "đã viết", emoji: "📝" },
          ],
        },
        reading: {
          title: "Ideas That Changed the World",
          passage:
            "Everything around you was once somebody's idea.\n\n" +
            "The wheel is more than five thousand years old, and it is still the most useful invention of all. Later, people learned to make paper, so ideas could travel from one country to another. Printing made books cheap, and suddenly ordinary children could learn to read. In the nineteenth century, electricity arrived and turned night into day. Then came the machine that most modern families cannot live without: the washing machine. It does not look exciting, but it saves hours of hard work every week.\n\n" +
            "Inventors do not always get rich, and their first try often goes wrong. They keep working because they want to change the world a little. What will you invent?",
          translation:
            "Mọi thứ quanh bé đều từng là ý tưởng của một ai đó.\n\n" +
            "Bánh xe ra đời hơn năm nghìn năm trước, và tới giờ nó vẫn là phát minh hữu ích nhất. Sau đó, con người biết làm ra giấy, nhờ vậy ý tưởng có thể đi từ nước này sang nước khác. Nghề in làm cho sách rẻ đi, và bỗng nhiên trẻ em bình thường cũng học đọc được. Đến thế kỷ mười chín, điện xuất hiện và biến đêm thành ngày. Rồi tới cỗ máy mà hầu hết gia đình hiện đại không thể thiếu: máy giặt. Nó trông chẳng có gì hấp dẫn, nhưng mỗi tuần nó tiết kiệm cho ta bao nhiêu giờ làm việc vất vả.\n\n" +
            "Các nhà phát minh không phải ai cũng giàu, và lần thử đầu tiên thường hỏng bét. Họ vẫn miệt mài vì muốn thay đổi thế giới một chút. Còn bé, bé sẽ phát minh ra thứ gì?",
          questions: [
            mcq(
              "Which invention does the writer call the most useful of all?",
              "Tác giả gọi phát minh nào là hữu ích nhất?",
              ["The wheel", "The telephone", "The washing machine", "The book"],
              0,
              "Bài viết về bánh xe: 'it is still the most useful invention of all' — đến giờ nó vẫn là phát minh hữu ích nhất.",
              "it is still the most useful invention of all",
            ),
            mcq(
              "What did printing change?",
              "Nghề in đã thay đổi điều gì?",
              [
                "It made paper stronger",
                "It made books cheap, so ordinary children could read",
                "It made night into day",
                "It made washing easier",
              ],
              1,
              "Câu 'Printing made books cheap, and suddenly ordinary children could learn to read.' cho biết sách rẻ đi nên trẻ em bình thường cũng học đọc được.",
              "Printing made books cheap, and suddenly ordinary children could learn to read.",
            ),
            mcq(
              "What arrived in the nineteenth century?",
              "Thứ gì xuất hiện vào thế kỷ mười chín?",
              ["Paper", "The wheel", "Electricity", "The rocket"],
              2,
              "Bài đọc viết 'In the nineteenth century, electricity arrived and turned night into day.' — điện xuất hiện ở thế kỷ mười chín.",
              "In the nineteenth century, electricity arrived and turned night into day.",
            ),
            tf(
              "The writer thinks the washing machine looks exciting.",
              "Tác giả cho rằng máy giặt trông rất hấp dẫn.",
              false,
              "Sai nhé. Tác giả viết 'It does not look exciting, but it saves hours of hard work every week.' — máy giặt trông chán nhưng lại rất có ích.",
              "It does not look exciting, but it saves hours of hard work every week.",
            ),
            mcq(
              "Why does the writer end with the question 'What will you invent?'",
              "Vì sao tác giả kết bài bằng câu hỏi 'What will you invent?'",
              [
                "Because the writer wants to sell a machine",
                "Because the writer wants the reader to think of a new idea too",
                "Because the writer has forgotten the answer",
                "Because the reader must do homework tonight",
              ],
              1,
              "Bài không nói thẳng lý do — bé phải suy ra. Cả bài kể rằng nhà phát minh cũng thất bại rồi làm lại, chỉ mong 'change the world a little'. Kết bằng câu hỏi trực tiếp với người đọc là cách mời chính bé nghĩ ra ý tưởng của mình.",
            ),
          ],
        },
        listening: {
          title: "The School Invention Club",
          transcript:
            "Teacher: Welcome to the invention club. What are you two going to make?\n" +
            "Linh: We are going to make a school bag that opens by itself.\n" +
            "Teacher: That is a clever idea. Have you drawn a plan?\n" +
            "Duy: Yes, but our first plan went wrong. The bag was too heavy.\n" +
            "Teacher: Good inventors always try again. What will you change?\n" +
            "Linh: We will use plastic instead of wood, and then it will be much lighter.",
          questions: [
            mcq(
              "What are Linh and Duy going to make?",
              "Linh và Duy sẽ chế tạo cái gì?",
              [
                "A school bag that opens by itself",
                "A washing machine",
                "A paper telescope",
                "A wooden wheel",
              ],
              0,
              "Linh nói 'We are going to make a school bag that opens by itself.' — một chiếc cặp tự mở ra.",
              "We are going to make a school bag that opens by itself.",
            ),
            mcq(
              "What was wrong with their first plan?",
              "Bản thiết kế đầu tiên có gì chưa ổn?",
              ["It was too small", "It was too heavy", "It was too expensive", "It was too noisy"],
              1,
              "Duy kể 'The bag was too heavy.' — chiếc cặp nặng quá.",
              "The bag was too heavy.",
            ),
            mcq(
              "What will they use instead of wood?",
              "Các bạn sẽ dùng vật liệu gì thay cho gỗ?",
              ["Paper", "Metal", "Plastic", "Cloth"],
              2,
              "Linh nói 'We will use plastic instead of wood' — dùng nhựa thay gỗ cho nhẹ hơn.",
              "We will use plastic instead of wood",
            ),
            tf(
              "The teacher tells the children to give up.",
              "Cô giáo bảo các bạn hãy bỏ cuộc.",
              false,
              "Sai nhé. Cô giáo động viên: 'Good inventors always try again.' — nhà phát minh giỏi luôn thử lại.",
              "Good inventors always try again.",
            ),
          ],
        },
        writingPrompt:
          "Nghĩ ra MỘT phát minh của riêng bé và viết 6–8 câu giới thiệu: nó tên gì, trông thế nào, nó giúp được gì và ai sẽ dùng nó.",
        writingOutline:
          "1. Mở bài: I want to invent a …\n" +
          "2. Hình dáng: It is small / big, and it looks like …\n" +
          "3. Vật liệu: I will make it from …\n" +
          "4. Công dụng: It will help people to …\n" +
          "5. Người dùng: Children / farmers / doctors will use it when …\n" +
          "6. So sánh: It is more useful than … because …\n" +
          "7. Kết bài: I hope my invention will change …",
        speaking: {
          sentences: [
            "Everything around you was once somebody's idea.",
            "The wheel is the most useful invention of all.",
            "Printing made books cheap for everybody.",
            "Electricity turned night into day.",
            "Good inventors always try again.",
          ],
          questions: [
            {
              question: "Which invention do you use every day?",
              sampleAnswer:
                "I use a bicycle every day. It has two wheels and it takes me to school in ten minutes.",
            },
            {
              question: "What would you like to invent?",
              sampleAnswer:
                "I would like to invent a machine that tidies my bedroom, because I always forget to do it.",
            },
            {
              question: "What should you do when your first idea goes wrong?",
              sampleAnswer:
                "I should not be sad. I should look for the mistake, change one thing and try again.",
            },
          ],
        },
      },

      // ─────────────────────── Bài 6 · Animals in Danger ───────────────────────
      {
        topic: "Animals in Danger",
        topicVi: "Loài vật cần được bảo vệ",
        icon: "🐢",
        words: [
          word("danger", "/ˈdeɪndʒə/", "mối nguy hiểm", "⚠️"),
          word("protect", "/prəˈtekt/", "bảo vệ", "🛡️"),
          word("save", "/seɪv/", "cứu, giữ lại", "💚"),
          word("forest", "/ˈfɒrɪst/", "rừng", "🌳"),
          word("disappear", "/ˌdɪsəˈpɪə/", "biến mất", "🫥"),
          word("rubbish", "/ˈrʌbɪʃ/", "rác", "🗑️"),
          word("turtle", "/ˈtɜːtl/", "rùa biển", "🐢"),
          word("rhino", "/ˈraɪnəʊ/", "tê giác", "🦏"),
          word("monkey", "/ˈmʌŋki/", "con khỉ", "🐒"),
          word("wild", "/waɪld/", "hoang dã", "🌿"),
          word("careful", "/ˈkeəfl/", "cẩn thận", "🤲"),
          word("future", "/ˈfjuːtʃə/", "tương lai", "⏭️"),
        ],
        sound: {
          letters: "g mềm (ge / gi / dge)",
          sound: "/dʒ/",
          hint:
            "Khi sau chữ g là e, i hoặc y, g thường đọc mềm thành /dʒ/ — giống âm 'ch' hơi nặng, có rung cổ họng: danger, giraffe, giant, orange, bridge. Bé Việt hay đọc thành 'g' cứng ('đây-ngơ') hoặc thành /z/ ('đây-dơ'). Mẹo: đặt đầu lưỡi chạm lợi trên rồi bật ra như nói 'giơ' trong tiếng Việt. Nhớ so sánh: go /ɡəʊ/ là g cứng, còn gentle /ˈdʒentl/ là g mềm.",
          words: [
            { word: "danger", meaning: "nguy hiểm", emoji: "⚠️" },
            { word: "giraffe", meaning: "hươu cao cổ", emoji: "🦒" },
            { word: "giant", meaning: "khổng lồ", emoji: "🦕" },
            { word: "orange", meaning: "quả cam", emoji: "🍊" },
            { word: "bridge", meaning: "cây cầu", emoji: "🌉" },
          ],
        },
        reading: {
          title: "Animals That Need Our Help",
          passage:
            "Some of the animals in your picture books are in danger, and that is a sad thing to hear.\n\n" +
            "Viet Nam has lost most of its wild rhinos, and sea turtles are now hard to find near our beaches. Why? Forests are cut down, so animals lose their homes and slowly disappear. Rubbish falls into the sea, and a turtle may think a plastic bag is a jellyfish. But the news is not all bad. In a national park near Ha Noi, scientists protect langur monkeys, and there are more of them today than ten years ago.\n\n" +
            "Children can help too. Be careful with your rubbish, use a cloth bag, and tell your friends what you have learned. If we all help a little, we will save these animals for the future.",
          translation:
            "Một số con vật trong sách tranh của bé đang gặp nguy hiểm, và đó là điều nghe thật buồn.\n\n" +
            "Việt Nam đã mất gần hết tê giác hoang dã, còn rùa biển thì giờ rất khó gặp ở gần bờ biển nước mình. Vì sao vậy? Rừng bị chặt đi, thế là các con vật mất nhà và dần dần biến mất. Rác trôi xuống biển, và một chú rùa có thể tưởng túi ni lông là con sứa. Nhưng không phải tin nào cũng buồn đâu. Ở một vườn quốc gia gần Hà Nội, các nhà khoa học đang bảo vệ đàn voọc, và hôm nay số voọc đã nhiều hơn mười năm trước.\n\n" +
            "Trẻ con cũng giúp được chứ. Bé hãy cẩn thận với rác của mình, dùng túi vải, và kể cho bạn bè nghe những điều bé vừa học. Nếu ai cũng giúp một chút, chúng ta sẽ giữ được những con vật này cho tương lai.",
          questions: [
            mcq(
              "Why do animals lose their homes?",
              "Vì sao các con vật lại mất nhà?",
              [
                "Because forests are cut down",
                "Because the sea is too cold",
                "Because they move to the city",
                "Because scientists take them away",
              ],
              0,
              "Bài viết 'Forests are cut down, so animals lose their homes and slowly disappear.' — rừng bị chặt nên các con vật mất nơi ở.",
              "Forests are cut down, so animals lose their homes and slowly disappear.",
            ),
            mcq(
              "Why is rubbish in the sea dangerous for turtles?",
              "Vì sao rác dưới biển lại nguy hiểm với rùa?",
              [
                "Because rubbish makes the water cold",
                "Because a turtle may think a plastic bag is food",
                "Because rubbish is too heavy to swim past",
                "Because turtles like to sleep on rubbish",
              ],
              1,
              "Bài đọc viết 'a turtle may think a plastic bag is a jellyfish' — con sứa là món rùa hay ăn, nên rùa dễ nhầm túi ni lông là thức ăn.",
              "a turtle may think a plastic bag is a jellyfish",
            ),
            mcq(
              "What is the good news in the text?",
              "Tin vui trong bài là gì?",
              [
                "There are more langur monkeys now than ten years ago",
                "The rhinos have all come back",
                "Nobody uses plastic bags now",
                "The sea is completely clean",
              ],
              0,
              "Bài viết 'there are more of them today than ten years ago' khi nói về đàn voọc trong vườn quốc gia — số lượng đã tăng lên.",
              "there are more of them today than ten years ago",
            ),
            tf(
              "The writer thinks children can do nothing to help.",
              "Tác giả cho rằng trẻ con chẳng làm được gì để giúp.",
              false,
              "Sai nhé. Tác giả viết hẳn 'Children can help too.' rồi kể ba việc bé làm được ngay.",
              "Children can help too.",
            ),
            mcq(
              "Why does the writer tell children to use a cloth bag?",
              "Vì sao tác giả khuyên bé dùng túi vải?",
              [
                "Because cloth bags are prettier than plastic bags",
                "Because a cloth bag can be used many times, so less plastic goes into the sea",
                "Because cloth bags are lighter than paper bags",
                "Because teachers always carry cloth bags",
              ],
              1,
              "Bài không giải thích thẳng — bé phải nối hai ý lại. Trước đó bài kể túi ni lông trôi ra biển và rùa nuốt nhầm; túi vải dùng đi dùng lại được nên ta thải ra ít nhựa hơn.",
            ),
          ],
        },
        listening: {
          title: "A Visit to the National Park",
          transcript:
            "Guide: Good morning, everyone. Today we will walk quietly, because the monkeys are shy.\n" +
            "Boy: How many langur monkeys live here now?\n" +
            "Guide: About two hundred. Twenty years ago there were only forty.\n" +
            "Girl: That is wonderful news. Why did the number grow?\n" +
            "Guide: Because rangers protect the forest, and nobody is allowed to cut the trees.\n" +
            "Boy: Can we help?\n" +
            "Guide: Yes. Take your rubbish home with you, and tell other people what you have seen today.",
          questions: [
            mcq(
              "How many langur monkeys live in the park now?",
              "Bây giờ vườn quốc gia có bao nhiêu con voọc?",
              ["About forty", "About two hundred", "About twenty", "About two thousand"],
              1,
              "Anh hướng dẫn trả lời 'About two hundred.' — khoảng hai trăm con.",
              "About two hundred.",
            ),
            mcq(
              "How many were there twenty years ago?",
              "Hai mươi năm trước có bao nhiêu con?",
              ["Forty", "Two hundred", "Four hundred", "None"],
              0,
              "Câu 'Twenty years ago there were only forty.' cho biết hồi đó chỉ còn bốn mươi con.",
              "Twenty years ago there were only forty.",
            ),
            mcq(
              "Why did the number of monkeys grow?",
              "Vì sao số voọc lại tăng lên?",
              [
                "Because rangers protect the forest",
                "Because visitors give them food",
                "Because the monkeys moved to the city",
                "Because the park is very small",
              ],
              0,
              "Anh hướng dẫn giải thích 'Because rangers protect the forest, and nobody is allowed to cut the trees.' — kiểm lâm giữ rừng và không ai được chặt cây.",
              "Because rangers protect the forest, and nobody is allowed to cut the trees.",
            ),
            tf(
              "The guide says the children can do nothing to help.",
              "Anh hướng dẫn nói các bạn nhỏ chẳng giúp được gì.",
              false,
              "Sai nhé. Anh ấy chỉ ra hai việc bé làm được: 'Take your rubbish home with you, and tell other people what you have seen today.'",
              "Take your rubbish home with you, and tell other people what you have seen today.",
            ),
          ],
        },
        writingPrompt:
          "Chọn MỘT con vật đang gặp nguy hiểm và viết 6–8 câu: nó sống ở đâu, vì sao nó gặp nguy hiểm, và chúng ta có thể làm gì để bảo vệ nó.",
        writingOutline:
          "1. Mở bài: The animal I want to write about is the …\n" +
          "2. Nơi sống: It lives in … (a forest / the sea / the mountains).\n" +
          "3. Vẻ ngoài: It is … and it eats …\n" +
          "4. Vấn đề: It is in danger because …\n" +
          "5. Việc người lớn làm: Scientists and rangers protect it by …\n" +
          "6. Việc bé làm: I will … and I will not …\n" +
          "7. Kết bài: If we all help, we will save this animal for the future.",
        speaking: {
          sentences: [
            "Some animals in your picture books are in danger.",
            "Forests are cut down, so animals lose their homes.",
            "A turtle may think a plastic bag is a jellyfish.",
            "Scientists protect langur monkeys in the national park.",
            "If we all help a little, we will save these animals.",
          ],
          questions: [
            {
              question: "Which wild animal do you like best? Why?",
              sampleAnswer:
                "I like sea turtles best, because they are gentle and they can swim across the whole ocean.",
            },
            {
              question: "What can children do to protect animals?",
              sampleAnswer:
                "We can put our rubbish in the bin, use a cloth bag instead of a plastic one, and never buy a wild animal.",
            },
            {
              question: "Have you ever visited a zoo or a national park?",
              sampleAnswer:
                "Yes, I have. Last year I went to a national park with my class and I saw many birds and monkeys.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CHƯƠNG 3 · EM VÀ TƯƠNG LAI
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 3 · Em và tương lai",
    subtitle: "Nghề mơ ước, thói quen sống khoẻ và lời hứa với Trái Đất.",
    lessons: [
      // ───────────────────────── Bài 7 · Jobs I Want ─────────────────────────
      {
        topic: "Jobs I Want",
        topicVi: "Nghề tớ mơ ước",
        icon: "👩‍⚕️",
        words: [
          word("job", "/dʒɒb/", "nghề nghiệp, công việc", "💼"),
          word("doctor", "/ˈdɒktə/", "bác sĩ", "👩‍⚕️"),
          word("engineer", "/ˌendʒɪˈnɪə/", "kỹ sư", "👷"),
          word("vet", "/vet/", "bác sĩ thú y", "🐕"),
          word("pilot", "/ˈpaɪlət/", "phi công", "✈️"),
          word("farmer", "/ˈfɑːmə/", "nông dân", "🧑‍🌾"),
          word("uniform", "/ˈjuːnɪfɔːm/", "đồng phục", "🥼"),
          word("patient", "/ˈpeɪʃnt/", "bệnh nhân", "🤒"),
          word("practise", "/ˈpræktɪs/", "luyện tập", "📚"),
          word("helpful", "/ˈhelpfl/", "hay giúp đỡ người khác", "🤝"),
          word("difficult", "/ˈdɪfɪkəlt/", "khó", "😅"),
          word("dream", "/driːm/", "ước mơ", "🌈"),
        ],
        sound: {
          letters: "-ed đọc /t/",
          sound: "/t/",
          hint:
            "Đuôi -ed đọc là /t/ khi âm ngay trước nó là âm CÂM (không rung cổ họng): /k/, /p/, /s/, /f/, /ʃ/, /tʃ/. walked = 'wóo-kt', helped = 'help-t' — vẫn chỉ MỘT âm tiết, tuyệt đối không thêm 'ơ' thành 'wóc-kịt'. Lỗi lớn nhất của trẻ Việt là NUỐT LUÔN đuôi -ed (walked → 'wóoc'), làm người nghe tưởng là hiện tại. Hãy bật lưỡi chạm lợi trên rồi nhả hơi thật gọn ở cuối từ.",
          words: [
            { word: "walked", meaning: "đã đi bộ", emoji: "🚶" },
            { word: "helped", meaning: "đã giúp", emoji: "🤝" },
            { word: "watched", meaning: "đã xem", emoji: "📺" },
            { word: "jumped", meaning: "đã nhảy", emoji: "🤸" },
            { word: "worked", meaning: "đã làm việc", emoji: "🛠️" },
          ],
        },
        reading: {
          title: "When I Grow Up",
          passage:
            "Grown-ups always ask children the same question: what are you going to be?\n\n" +
            "In my class everybody has a different dream. Minh wants to be a pilot, because he loves the idea of flying above the clouds. Lan is going to be a vet. She has three cats at home and she is the most helpful person I know. Duc wants to be a farmer like his grandfather, because good food is more important than money. Hoa wants to be an engineer and build bridges. And me? I want to be a doctor. My aunt is a doctor in a small hospital, and last week she showed me her white uniform. She talks kindly to every patient, even when she is tired.\n\n" +
            "The road is long and quite difficult. I will study hard and practise English, because doctors read books from many countries.",
          translation:
            "Người lớn lúc nào cũng hỏi bọn trẻ đúng một câu: lớn lên con làm nghề gì?\n\n" +
            "Lớp tớ mỗi bạn một ước mơ. Minh muốn làm phi công, vì cậu ấy mê cảm giác bay trên những đám mây. Lan thì sẽ làm bác sĩ thú y. Nhà bạn ấy nuôi ba con mèo, và bạn ấy là người hay giúp đỡ nhất mà tớ biết. Đức thì muốn làm nông dân giống ông nội, vì với cậu ấy, thức ăn sạch còn quan trọng hơn tiền. Hoa muốn làm kỹ sư và xây những cây cầu. Còn tớ thì sao? Tớ muốn làm bác sĩ. Cô tớ là bác sĩ ở một bệnh viện nhỏ, tuần trước cô còn cho tớ xem chiếc áo blouse trắng của cô. Cô nói chuyện dịu dàng với từng bệnh nhân, kể cả lúc cô đã rất mệt.\n\n" +
            "Con đường phía trước dài và khá khó. Tớ sẽ học chăm và luyện tiếng Anh, vì bác sĩ phải đọc sách từ nhiều nước lắm.",
          questions: [
            mcq(
              "What does Minh want to be?",
              "Minh muốn làm nghề gì?",
              ["A vet", "A pilot", "A farmer", "A doctor"],
              1,
              "Bài viết 'Minh wants to be a pilot' — Minh muốn làm phi công vì thích bay trên mây.",
              "Minh wants to be a pilot",
            ),
            mcq(
              "Why does Duc want to be a farmer?",
              "Vì sao Đức muốn làm nông dân?",
              [
                "Because farmers earn a lot of money",
                "Because he thinks good food matters more than money",
                "Because he does not like school",
                "Because he wants to live in the city",
              ],
              1,
              "Đức giải thích trong bài: 'because good food is more important than money' — với cậu ấy, thức ăn tốt quan trọng hơn tiền.",
              "because good food is more important than money",
            ),
            mcq(
              "Who works in a hospital?",
              "Ai là người làm việc trong bệnh viện?",
              ["The writer's aunt", "The writer's grandfather", "Lan", "Hoa"],
              0,
              "Bài đọc viết 'My aunt is a doctor in a small hospital' — cô của bạn nhỏ là bác sĩ ở một bệnh viện nhỏ.",
              "My aunt is a doctor in a small hospital",
            ),
            tf(
              "The writer thinks becoming a doctor will be easy.",
              "Bạn nhỏ nghĩ làm bác sĩ là chuyện dễ.",
              false,
              "Sai nhé. Bạn nhỏ viết 'The road is long and quite difficult.' — con đường trở thành bác sĩ dài và khá khó.",
              "The road is long and quite difficult.",
            ),
            mcq(
              "Why does the writer tell us about the aunt's white uniform and kind words?",
              "Vì sao bạn nhỏ lại kể về chiếc áo blouse trắng và lời nói dịu dàng của cô mình?",
              [
                "To show that hospitals are cold places",
                "To show why the writer wants that job too",
                "To show that the aunt has a lot of money",
                "To show that the aunt should rest more",
              ],
              1,
              "Bài không nói thẳng — bé phải đoán ý tác giả. Ngay sau câu 'I want to be a doctor', bạn nhỏ mới kể về cô: chiếc áo trắng và cách cô đối xử với bệnh nhân chính là hình mẫu khiến bạn ấy chọn nghề này.",
            ),
          ],
        },
        listening: {
          title: "Talking About Jobs",
          transcript:
            "Dad: You look busy, Mai. What are you writing?\n" +
            "Mai: A list of jobs, Dad. I cannot choose between doctor and engineer.\n" +
            "Dad: Both are good jobs. Which one do you dream about at night?\n" +
            "Mai: The hospital, I think. I helped Grandma with her medicine last month, and I liked it.\n" +
            "Dad: Then study science and work hard. It takes many years.\n" +
            "Mai: I know. I have already started reading a book about the human body.",
          questions: [
            mcq(
              "What is Mai writing?",
              "Mai đang viết gì?",
              ["A letter to Grandma", "A list of jobs", "A science test", "A story about a hospital"],
              1,
              "Mai trả lời bố: 'A list of jobs, Dad.' — một danh sách các nghề.",
              "A list of jobs, Dad.",
            ),
            mcq(
              "Which two jobs is Mai choosing between?",
              "Mai đang phân vân giữa hai nghề nào?",
              ["Doctor and vet", "Pilot and engineer", "Doctor and engineer", "Farmer and doctor"],
              2,
              "Mai nói 'I cannot choose between doctor and engineer.' — bạn ấy chưa chọn được giữa bác sĩ và kỹ sư.",
              "I cannot choose between doctor and engineer.",
            ),
            mcq(
              "What did Mai do last month?",
              "Tháng trước Mai đã làm gì?",
              [
                "She visited a hospital",
                "She helped her grandmother with her medicine",
                "She built a small bridge",
                "She read a book about planes",
              ],
              1,
              "Mai kể 'I helped Grandma with her medicine last month' — bạn ấy giúp bà uống thuốc và thấy thích công việc đó.",
              "I helped Grandma with her medicine last month",
            ),
            tf(
              "Mai has already started reading a book about the human body.",
              "Mai đã bắt đầu đọc một quyển sách về cơ thể người.",
              true,
              "Đúng! Mai nói 'I have already started reading a book about the human body.' — 'have already started' nghĩa là bạn ấy đã bắt đầu rồi.",
              "I have already started reading a book about the human body.",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về nghề bé mơ ước: đó là nghề gì, vì sao bé thích, ai đã truyền cảm hứng cho bé, và bé sẽ chuẩn bị thế nào từ bây giờ.",
        writingOutline:
          "1. Mở bài: When I grow up, I want to be a …\n" +
          "2. Công việc: A … helps people by …\n" +
          "3. Lý do: I want this job because …\n" +
          "4. Người truyền cảm hứng: My … is a … and he/she …\n" +
          "5. Điểm mạnh của bé: I am good at … and I am very …\n" +
          "6. Chuẩn bị: I will study … and I will practise …\n" +
          "7. Kết bài: It will be difficult, but I will try my best.",
        speaking: {
          sentences: [
            "In my class everybody has a different dream.",
            "Minh wants to be a pilot because he loves flying.",
            "My aunt is a doctor in a small hospital.",
            "She talks kindly to every patient.",
            "I will study hard and practise English.",
          ],
          questions: [
            {
              question: "What job would you like to do when you grow up?",
              sampleAnswer:
                "I would like to be a vet, because I love animals and I want to make sick pets better.",
            },
            {
              question: "Which job in your family do you find interesting?",
              sampleAnswer:
                "My mother is a teacher. I think her job is interesting because she meets many children every day.",
            },
            {
              question: "What do you need to do now to get your dream job?",
              sampleAnswer:
                "I need to study hard at school, read a lot of books and practise English every day.",
            },
          ],
        },
      },

      // ───────────────────────── Bài 8 · Healthy Living ─────────────────────────
      {
        topic: "Healthy Living",
        topicVi: "Sống khoẻ mỗi ngày",
        icon: "🥗",
        words: [
          word("healthy", "/ˈhelθi/", "khoẻ mạnh", "💪"),
          word("habit", "/ˈhæbɪt/", "thói quen", "🔁"),
          word("exercise", "/ˈeksəsaɪz/", "tập thể dục", "🏃"),
          word("vegetable", "/ˈvedʒtəbl/", "rau củ", "🥦"),
          word("fruit", "/fruːt/", "trái cây", "🍎"),
          word("sugar", "/ˈʃʊɡə/", "đường", "🍬"),
          word("energy", "/ˈenədʒi/", "năng lượng, sức lực", "⚡"),
          word("breakfast", "/ˈbrekfəst/", "bữa sáng", "🍳"),
          word("sleep", "/sliːp/", "giấc ngủ, ngủ", "😴"),
          word("screen", "/skriːn/", "màn hình", "📱"),
          word("teeth", "/tiːθ/", "răng (số nhiều)", "🦷"),
          word("strong", "/strɒŋ/", "khoẻ, chắc khoẻ", "🦾"),
        ],
        sound: {
          letters: "-ed đọc /d/",
          sound: "/d/",
          hint:
            "Đuôi -ed đọc là /d/ khi âm trước nó CÓ RUNG cổ họng — nguyên âm hoặc /l/, /n/, /m/, /r/, /v/, /z/, /ɡ/: played = 'pleɪd', cleaned = 'kliːnd'. Vẫn chỉ MỘT âm tiết, đừng thành 'pờ-lây-đờ'. Trẻ Việt hay bỏ hẳn đuôi này vì tiếng Việt không có phụ âm /d/ cuối từ — hãy đặt lưỡi lên lợi trên và rung nhẹ cổ họng ở cuối. So sánh với bài trước: /t/ không rung, /d/ có rung.",
          words: [
            { word: "played", meaning: "đã chơi", emoji: "⚽" },
            { word: "cleaned", meaning: "đã lau dọn", emoji: "🧹" },
            { word: "listened", meaning: "đã lắng nghe", emoji: "👂" },
            { word: "called", meaning: "đã gọi", emoji: "📞" },
            { word: "opened", meaning: "đã mở", emoji: "🚪" },
          ],
        },
        reading: {
          title: "Small Habits, Strong Body",
          passage:
            "You do not need a gym to be healthy. You only need a few good habits.\n\n" +
            "Start with breakfast. Children who eat breakfast have more energy at school, and they listen better in class. Next, put something green on your plate: vegetables and fruit give your body the vitamins it needs. Sugar is not a monster, but too much of it is bad for your teeth, so keep sweet drinks for special days. Exercise matters as well. Football, swimming or a bicycle ride will make your heart strong, and thirty minutes a day is enough. Finally, do not forget sleep. A screen at midnight steals the sleep your brain needs to grow.\n\n" +
            "None of these things is difficult. Choose one today, and in a month it will be a habit.",
          translation:
            "Bé không cần phòng tập gym mới khoẻ được đâu. Bé chỉ cần vài thói quen tốt thôi.\n\n" +
            "Hãy bắt đầu từ bữa sáng. Bạn nào ăn sáng thì có nhiều sức hơn ở trường và nghe giảng tốt hơn trong lớp. Tiếp theo, hãy để chút gì đó màu xanh lên đĩa: rau và trái cây cho cơ thể bé những vitamin cần thiết. Đường không phải là con quái vật, nhưng ăn nhiều quá thì hại răng, nên hãy để dành nước ngọt cho những dịp đặc biệt. Tập thể dục cũng quan trọng. Đá bóng, bơi lội hay đạp xe sẽ làm trái tim bé khoẻ lên, và mỗi ngày ba mươi phút là đủ. Cuối cùng, đừng quên giấc ngủ. Chiếc màn hình lúc nửa đêm sẽ lấy mất giấc ngủ mà bộ não bé cần để lớn.\n\n" +
            "Chẳng việc nào trong số này khó cả. Hôm nay bé chọn lấy một việc thôi, một tháng sau nó sẽ thành thói quen.",
          questions: [
            mcq(
              "What happens to children who eat breakfast?",
              "Điều gì xảy ra với những bạn ăn sáng đầy đủ?",
              [
                "They have more energy and listen better in class",
                "They feel sleepy all morning",
                "They grow taller than everybody",
                "They do not need to exercise",
              ],
              0,
              "Bài viết 'Children who eat breakfast have more energy at school, and they listen better in class.' — có nhiều sức hơn và nghe giảng tốt hơn.",
              "Children who eat breakfast have more energy at school, and they listen better in class.",
            ),
            mcq(
              "How much exercise a day does the writer say is enough?",
              "Theo bài, mỗi ngày tập thể dục bao lâu là đủ?",
              ["Ten minutes", "Thirty minutes", "One hour", "Two hours"],
              1,
              "Bài đọc viết 'thirty minutes a day is enough' — ba mươi phút mỗi ngày là đủ rồi.",
              "thirty minutes a day is enough",
            ),
            mcq(
              "Why should you keep sweet drinks for special days?",
              "Vì sao chỉ nên uống nước ngọt vào dịp đặc biệt?",
              [
                "Because sweet drinks are very expensive",
                "Because too much sugar is bad for your teeth",
                "Because sugar makes you sleepy",
                "Because sweet drinks taste bad in the morning",
              ],
              1,
              "Bài giải thích 'too much of it is bad for your teeth' — quá nhiều đường sẽ hại răng.",
              "too much of it is bad for your teeth",
            ),
            tf(
              "The writer says you must go to a gym to be healthy.",
              "Tác giả nói phải tới phòng tập gym mới khoẻ được.",
              false,
              "Sai nhé. Ngay câu đầu bài đã viết 'You do not need a gym to be healthy.' — không cần phòng gym, chỉ cần vài thói quen tốt.",
              "You do not need a gym to be healthy.",
            ),
            mcq(
              "Why does the writer say 'Choose one today'?",
              "Vì sao tác giả khuyên 'Choose one today' (hôm nay chọn lấy một việc)?",
              [
                "Because all the other habits are impossible",
                "Because starting with one small habit is easier than changing everything at once",
                "Because the writer only knows one habit",
                "Because tomorrow is a holiday",
              ],
              1,
              "Bài không nói thẳng lý do — bé phải suy ra. Tác giả vừa kể bốn thói quen rồi khẳng định 'None of these things is difficult', sau đó chỉ xin bé chọn MỘT việc: đổi từng chút một thì dễ giữ hơn là đổi hết cùng lúc.",
            ),
          ],
        },
        listening: {
          title: "At the Doctor's",
          transcript:
            "Doctor: Well, Bao, you are growing fast. How do you feel in the morning?\n" +
            "Bao: Tired, Doctor. I often fall asleep in the first lesson.\n" +
            "Doctor: What time do you go to bed?\n" +
            "Bao: About eleven. I watch videos on my phone in bed.\n" +
            "Doctor: There is your answer. Put the phone in another room and go to sleep at nine thirty.\n" +
            "Bao: Only nine thirty? That is early!\n" +
            "Doctor: Try it for two weeks. I promise you will feel much stronger.",
          questions: [
            mcq(
              "How does Bao feel in the morning?",
              "Buổi sáng Bảo cảm thấy thế nào?",
              ["Hungry", "Tired", "Happy", "Cold"],
              1,
              "Bảo trả lời 'Tired, Doctor.' — bạn ấy mệt, còn hay ngủ gật trong tiết đầu.",
              "Tired, Doctor.",
            ),
            mcq(
              "What does Bao do in bed?",
              "Bảo làm gì khi đã lên giường?",
              [
                "He reads a book",
                "He watches videos on his phone",
                "He listens to music",
                "He does his homework",
              ],
              1,
              "Bảo kể 'I watch videos on my phone in bed.' — nằm trên giường xem video bằng điện thoại.",
              "I watch videos on my phone in bed.",
            ),
            mcq(
              "What time does the doctor want Bao to go to sleep?",
              "Bác sĩ muốn Bảo đi ngủ lúc mấy giờ?",
              ["At eight o'clock", "At nine thirty", "At eleven", "At midnight"],
              1,
              "Bác sĩ dặn 'Put the phone in another room and go to sleep at nine thirty.' — chín giờ rưỡi. Mốc 'About eleven' là giờ Bảo đang đi ngủ, không phải giờ bác sĩ khuyên.",
              "go to sleep at nine thirty",
            ),
            tf(
              "The doctor thinks the phone is the reason why Bao is tired.",
              "Bác sĩ cho rằng chiếc điện thoại là lý do khiến Bảo mệt.",
              true,
              "Đúng! Ngay khi nghe Bảo kể xem video trên giường, bác sĩ nói 'There is your answer.' rồi bảo để điện thoại sang phòng khác.",
              "There is your answer.",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về một ngày sống khoẻ của bé: bé ăn gì, vận động thế nào, ngủ mấy giờ, và bé muốn thay đổi thói quen nào từ tuần này.",
        writingOutline:
          "1. Mở bài: I want to be healthy and strong, so I have a plan.\n" +
          "2. Bữa sáng: For breakfast I eat … It gives me energy for …\n" +
          "3. Rau và trái cây: I eat … vegetables and … fruit every day.\n" +
          "4. Đồ ngọt: I only drink sweet drinks when …\n" +
          "5. Vận động: I play … for thirty minutes …\n" +
          "6. Giấc ngủ: I go to bed at … and I leave my phone …\n" +
          "7. Kết bài: From this week I will change one habit: I will …",
        speaking: {
          sentences: [
            "You do not need a gym to be healthy.",
            "Children who eat breakfast have more energy at school.",
            "Vegetables and fruit give your body the vitamins it needs.",
            "Thirty minutes of exercise a day is enough.",
            "A screen at midnight steals the sleep your brain needs.",
          ],
          questions: [
            {
              question: "What do you usually eat for breakfast?",
              sampleAnswer:
                "I usually eat a bowl of pho or a boiled egg with bread, and I drink a glass of milk.",
            },
            {
              question: "What exercise do you like doing?",
              sampleAnswer:
                "I like riding my bicycle in the park with my brother. We ride for about half an hour after school.",
            },
            {
              question: "What time do you go to bed, and is that healthy?",
              sampleAnswer:
                "I go to bed at ten, but that is a bit late. I will try to sleep at nine thirty from now on.",
            },
          ],
        },
      },

      // ───────────────────────── Bài 9 · Saving the Planet ─────────────────────────
      {
        topic: "Saving the Planet",
        topicVi: "Giữ gìn Trái Đất",
        icon: "🌱",
        words: [
          word("environment", "/ɪnˈvaɪrənmənt/", "môi trường", "🌏"),
          word("pollution", "/pəˈluːʃn/", "sự ô nhiễm", "🏭"),
          word("plastic", "/ˈplæstɪk/", "nhựa", "🧴"),
          word("bottle", "/ˈbɒtl/", "cái chai", "🍶"),
          word("recycle", "/ˌriːˈsaɪkl/", "tái chế", "♻️"),
          word("reuse", "/ˌriːˈjuːz/", "dùng lại nhiều lần", "🔁"),
          word("bin", "/bɪn/", "thùng rác", "🗑️"),
          word("waste", "/weɪst/", "lãng phí", "🚱"),
          word("plant", "/plɑːnt/", "trồng cây", "🌱"),
          word("tree", "/triː/", "cái cây", "🌳"),
          word("clean", "/kliːn/", "sạch sẽ", "🧼"),
          word("proud", "/praʊd/", "tự hào", "😊"),
        ],
        sound: {
          letters: "-ed đọc /ɪd/",
          sound: "/ɪd/",
          hint:
            "Chỉ khi từ gốc đã kết thúc bằng /t/ hoặc /d/ thì đuôi -ed mới đọc thành MỘT ÂM TIẾT RIÊNG /ɪd/: want → wanted ('won-tịd'), need → needed ('nii-địd'). Đây là trường hợp DUY NHẤT được thêm âm; ba trường hợp còn lại (/t/ và /d/) tuyệt đối không thêm. Trẻ Việt hay làm ngược: thêm 'ịd' vào mọi từ (walked → 'wóc-kịd') rồi lại nuốt mất ở chính chỗ cần đọc. Mẹo kiểm tra: đặt tay lên cổ, đọc âm cuối của từ gốc — nếu nghe thấy /t/ hoặc /d/ thì mới thêm /ɪd/.",
          words: [
            { word: "wanted", meaning: "đã muốn", emoji: "🙋" },
            { word: "needed", meaning: "đã cần", emoji: "🙏" },
            { word: "painted", meaning: "đã sơn, đã vẽ", emoji: "🎨" },
            { word: "visited", meaning: "đã tới thăm", emoji: "🚶" },
            { word: "planted", meaning: "đã trồng", emoji: "🌱" },
          ],
        },
        reading: {
          title: "Our Green Promise",
          passage:
            "Our planet gives us everything, so this year our class decided to do something for the environment.\n\n" +
            "First we looked at our own rubbish. Every day we threw away forty plastic bottles, and that shocked us. Now each of us brings a metal bottle from home and we reuse it. We painted three bins for our classroom: green for paper, yellow for plastic and blue for food, so it is easy to recycle. In March we planted twelve small trees behind the school, and last week we visited them again. They have all grown.\n\n" +
            "We cannot stop pollution alone, and we do not waste time being sad about it. But a clean corner of the world is a good start, and our teacher says she has never been so proud of us.",
          translation:
            "Trái Đất cho chúng ta mọi thứ, nên năm nay lớp tớ quyết định làm một việc gì đó cho môi trường.\n\n" +
            "Đầu tiên, cả lớp nhìn lại chỗ rác của chính mình. Mỗi ngày lớp tớ vứt đi bốn mươi cái chai nhựa, con số ấy làm ai cũng giật mình. Bây giờ mỗi đứa mang một bình kim loại từ nhà đi và dùng đi dùng lại. Cả lớp sơn ba cái thùng rác cho phòng học: xanh lá cho giấy, vàng cho nhựa và xanh dương cho thức ăn thừa, thế là phân loại tái chế dễ hẳn. Tháng Ba, tụi tớ trồng mười hai cây con phía sau trường, và tuần trước cả lớp ra thăm lại. Cây nào cũng lớn lên rồi.\n\n" +
            "Một mình lớp tớ thì không chặn được ô nhiễm, và tụi tớ cũng không phí thời gian ngồi buồn vì chuyện đó. Nhưng giữ sạch được một góc nhỏ của thế giới đã là khởi đầu tốt, và cô giáo bảo chưa bao giờ cô tự hào về tụi tớ đến thế.",
          questions: [
            mcq(
              "How many plastic bottles did the class throw away every day?",
              "Mỗi ngày cả lớp vứt đi bao nhiêu chai nhựa?",
              ["Twelve", "Twenty", "Forty", "One hundred"],
              2,
              "Bài viết 'Every day we threw away forty plastic bottles' — bốn mươi cái chai mỗi ngày, con số làm cả lớp giật mình.",
              "Every day we threw away forty plastic bottles",
            ),
            mcq(
              "Which bin is for paper?",
              "Thùng rác nào dùng cho giấy?",
              ["The green one", "The yellow one", "The blue one", "The red one"],
              0,
              "Bài đọc ghi rõ 'green for paper, yellow for plastic and blue for food' — thùng xanh lá là để bỏ giấy.",
              "green for paper, yellow for plastic and blue for food",
            ),
            mcq(
              "What did the class do in March?",
              "Tháng Ba cả lớp đã làm gì?",
              [
                "They painted the classroom",
                "They planted twelve small trees",
                "They visited a factory",
                "They bought forty bottles",
              ],
              1,
              "Bài viết 'In March we planted twelve small trees behind the school' — trồng mười hai cây con sau trường.",
              "In March we planted twelve small trees behind the school",
            ),
            tf(
              "The teacher is very proud of the class.",
              "Cô giáo rất tự hào về cả lớp.",
              true,
              "Đúng! Câu cuối bài viết 'our teacher says she has never been so proud of us' — cô chưa bao giờ tự hào đến thế.",
              "our teacher says she has never been so proud of us",
            ),
            mcq(
              "Why did the children start bringing metal bottles from home?",
              "Vì sao các bạn nhỏ bắt đầu mang bình kim loại từ nhà đi?",
              [
                "Because metal bottles are cheaper than water",
                "Because a metal bottle can be used again and again, so they throw away less plastic",
                "Because their teacher gave everybody a free bottle",
                "Because metal bottles keep water warm",
              ],
              1,
              "Bài không giải thích thẳng — bé phải nối hai ý. Ngay trước đó lớp phát hiện mỗi ngày vứt bốn mươi chai nhựa; bình kim loại thì 'reuse' được nên lượng nhựa thải ra giảm hẳn.",
            ),
          ],
        },
        listening: {
          title: "The Green Club Meeting",
          transcript:
            "Teacher: Before we finish, who has an idea for next month?\n" +
            "Mai: I want to make posters about plastic and put them in the market.\n" +
            "Teacher: Lovely. Who will help Mai?\n" +
            "Nam: I will. My father has a printer, so we can print them at home.\n" +
            "Teacher: Wonderful. And Linh, you visited the recycling centre last week. What did you learn?\n" +
            "Linh: They showed us how old bottles become new chairs. I was really surprised.",
          questions: [
            mcq(
              "What does Mai want to make?",
              "Mai muốn làm gì?",
              [
                "Posters about plastic",
                "New chairs from bottles",
                "A rubbish bin for the market",
                "A book about trees",
              ],
              0,
              "Mai nói 'I want to make posters about plastic and put them in the market.' — làm áp phích về rác nhựa rồi dán ở chợ.",
              "I want to make posters about plastic and put them in the market.",
            ),
            mcq(
              "Why can Nam help with the posters?",
              "Vì sao Nam giúp làm áp phích được?",
              [
                "Because he draws very well",
                "Because his father has a printer",
                "Because he lives near the market",
                "Because he works at the recycling centre",
              ],
              1,
              "Nam giải thích 'My father has a printer, so we can print them at home.' — nhà bạn ấy có máy in.",
              "My father has a printer, so we can print them at home.",
            ),
            mcq(
              "Where did Linh go last week?",
              "Tuần trước Linh đã đi đâu?",
              ["To the market", "To a tree farm", "To the recycling centre", "To a printing shop"],
              2,
              "Cô giáo nhắc 'you visited the recycling centre last week' — Linh đã tới thăm nhà máy tái chế.",
              "you visited the recycling centre last week",
            ),
            tf(
              "Linh learned that old bottles can become new chairs.",
              "Linh học được rằng chai cũ có thể thành ghế mới.",
              true,
              "Đúng! Linh kể 'They showed us how old bottles become new chairs.' — và bạn ấy còn rất ngạc nhiên nữa.",
              "They showed us how old bottles become new chairs.",
            ),
          ],
        },
        writingPrompt:
          "Viết 6–8 câu về một việc bé và lớp bé có thể làm để bảo vệ môi trường: vấn đề là gì, kế hoạch ra sao, ai tham gia và bé mong điều gì sẽ thay đổi.",
        writingOutline:
          "1. Mở bài: I want to help the environment, so I have a plan.\n" +
          "2. Vấn đề: In my school we throw away a lot of …\n" +
          "3. Việc thứ nhất: First, I will bring a … from home and reuse it.\n" +
          "4. Việc thứ hai: Next, my class will put … bins in the classroom, so it is easy to recycle.\n" +
          "5. Việc thứ ba: We will also plant … trees behind …\n" +
          "6. Người cùng làm: My friends and my teacher will help because …\n" +
          "7. Kết bài: We cannot stop pollution alone, but I think we will …",
        speaking: {
          sentences: [
            "Our planet gives us everything.",
            "Every day our class threw away forty plastic bottles.",
            "Now we bring a metal bottle from home and we reuse it.",
            "In March we planted twelve small trees behind the school.",
            "A clean corner of the world is a good start.",
          ],
          questions: [
            {
              question: "What do you do with your rubbish at school?",
              sampleAnswer:
                "I put paper in the green bin and plastic in the yellow bin. I never leave rubbish on the playground.",
            },
            {
              question: "How can your family use less plastic?",
              sampleAnswer:
                "We can take a cloth bag to the market and use metal bottles instead of buying water in plastic ones.",
            },
            {
              question: "Have you ever planted a tree? Tell me about it.",
              sampleAnswer:
                "Yes, I have. Last spring I planted a small mango tree in my grandmother's garden, and now it has ten leaves.",
            },
          ],
        },
      },
    ],
  },
];
