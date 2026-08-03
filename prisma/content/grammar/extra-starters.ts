// Ngữ pháp cho các bài BỔ SUNG của cấp này (../extra/starters.ts).
//
// Phần tử thứ i ↔ bài bổ sung thứ i (tính dồn qua các chương của file đó).
// `topic` PHẢI khớp từng chữ với `topic` của bài tương ứng.
//
// Thứ tự: At the Zoo · My Pet · My Garden · Food I Like · Helping at Home · Shopping.
// Mỗi phần đủ 8 minigame: 2× fill_blank, 2× sentence_order, 2× dịch Việt→Anh,
// 2× dịch Anh→Việt — và dùng lại đúng từ vựng bài đó vừa dạy.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 13 ───────────────────────────
  {
    topic: "At the Zoo",
    sections: [
      {
        id: "rm-stx-13",
        title: "Một con và nhiều con",
        titleEn: "Plural nouns -s / -es",
        structure: "one + danh từ · two / three + danh từ + -s (hoặc -es)",
        breakdown: [
          part("one lion", "Số ít", "Chỉ MỘT con thì để nguyên từ, phía trước thường có “a” hoặc “one”."),
          part("two lions", "Số nhiều + -s", "Từ hai con trở lên thì thêm -s vào cuối danh từ."),
          part("two foxes", "Số nhiều + -es", "Từ tận cùng bằng s, x, sh, ch thì thêm -es cho dễ đọc."),
        ],
        explanation:
          "Tiếng Việt nói “hai con khỉ” — chữ “khỉ” không đổi. Tiếng Anh thì danh từ PHẢI đổi:\n- one monkey → two monkeys\n- one bird → three birds\n- Từ tận cùng bằng s, x, sh, ch thì thêm -es: one fox → two foxes.\nĐã có số đếm ở trước rồi thì vẫn phải thêm -s ở sau, không được bỏ.",
        usage: "Dùng khi bé đếm con vật ở vườn thú hoặc đếm đồ vật quanh mình.",
        mistakes: [
          mis("I see three monkey.", "I see three monkeys.", "Ba con thì danh từ phải có -s."),
          mis("two foxs", "two foxes", "Từ tận cùng bằng x thì thêm -es, không phải -s."),
          mis("There are five bird.", "There are five birds.", "Nhiều con chim → birds."),
        ],
        examples: [
          ex("Khi đếm voi ở vườn thú", "I can see three elephants.", "Tớ nhìn thấy ba con voi."),
          ex("Khi kể về mấy chú khỉ", "Two monkeys eat bananas.", "Hai chú khỉ đang ăn chuối."),
          ex("Khi từ tận cùng bằng x", "There are two foxes.", "Có hai con cáo."),
        ],
        exercises: [
          fb("I can see two ___ at the zoo.", "lions", ["lions", "lion", "a lion", "liones"], "Hai con thì thêm -s: lions."),
          fb("There are three ___ in the tree.", "birds", ["birds", "bird", "birdes", "a bird"], "Ba con chim → birds."),
          so(["two", "I", "see", "monkeys"], "I see two monkeys", "Tớ nhìn thấy hai chú khỉ."),
          so(["are", "There", "four", "elephants"], "There are four elephants", "Có bốn con voi."),
          viEn("Tớ nhìn thấy ba con hổ.", "I see three tigers.", ["I see three tigers.", "I see three tiger.", "I sees three tigers.", "I see three tigeres."], "Ba con → tigers có -s, còn “I” thì động từ giữ nguyên."),
          viEn("Có hai con sư tử.", "There are two lions.", ["There are two lions.", "There is two lions.", "There are two lion.", "There are two liones."], "Nhiều con → There are + danh từ có -s."),
          enVi("I can see five monkeys.", "Tớ nhìn thấy năm chú khỉ.", ["Tớ nhìn thấy năm chú khỉ.", "Tớ nhìn thấy một chú khỉ.", "Tớ nhìn thấy năm con chim.", "Năm chú khỉ đang ăn chuối."]),
          enVi("The zoo has two zebras.", "Vườn thú có hai con ngựa vằn.", ["Vườn thú có hai con ngựa vằn.", "Vườn thú có hai con hổ.", "Vườn thú có một con ngựa vằn.", "Con ngựa vằn ở trong vườn thú."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 14 ───────────────────────────
  {
    topic: "My Pet",
    sections: [
      {
        id: "rm-stx-14",
        title: "Bé có con vật gì?",
        titleEn: "have got / has got",
        structure: "I / You / We + have got + … · He / She / It + has got + …",
        breakdown: [
          part("I", "Chủ ngữ", "Người đang nói."),
          part("have got", "Động từ “có”", "Đi với I, you, we, they."),
          part("a dog", "Thứ mình có", "Con vật hoặc đồ vật thuộc về mình."),
        ],
        explanation:
          "Muốn khoe “tớ có…” thì dùng have got:\n- I have got a dog.\n- We have got two fish.\nNhưng với he / she / it hoặc một tên riêng thì đổi thành has got:\n- She has got a cat.\n- My dog has got a long tail.\nHỏi bạn: Have you got a pet? → Yes, I have. / No, I have not.\nMẹo nhỏ: “fish” số nhiều vẫn là “fish”, không thêm -s.",
        usage: "Dùng khi bé khoe thú cưng hoặc kể mình có đồ gì.",
        mistakes: [
          mis("She have got a cat.", "She has got a cat.", "Với “she” thì dùng has got."),
          mis("I has got a rabbit.", "I have got a rabbit.", "Với “I” thì luôn là have got."),
          mis("I have a got dog.", "I have got a dog.", "“have got” đi liền nhau, “a” đứng trước con vật."),
        ],
        examples: [
          ex("Khi khoe thú cưng", "I have got a small dog.", "Tớ có một chú chó nhỏ."),
          ex("Khi nói về bạn mình", "Nam has got a cat.", "Bạn Nam có một chú mèo."),
          ex("Khi tả con vật", "My rabbit has got long ears.", "Chú thỏ của tớ có đôi tai dài."),
        ],
        exercises: [
          fb("I ___ got a big dog.", "have", ["have", "has", "am", "is"], "Với “I” thì dùng have got."),
          fb("She ___ got two fish.", "has", ["has", "have", "is", "are"], "Với “she” thì dùng has got."),
          so(["got", "I", "have", "a", "cat"], "I have got a cat", "Tớ có một chú mèo."),
          so(["has", "My", "dog", "got", "a", "long", "tail"], "My dog has got a long tail", "Chú chó của tớ có cái đuôi dài."),
          viEn("Tớ có một chú thỏ.", "I have got a rabbit.", ["I have got a rabbit.", "I has got a rabbit.", "I have a got rabbit.", "I am got a rabbit."], "Với “I” → have got."),
          viEn("Bạn ấy có hai chú cá.", "He has got two fish.", ["He has got two fish.", "He have got two fish.", "He has got two fishs.", "He is got two fish."], "Với “he” → has got; “fish” số nhiều vẫn là fish."),
          enVi("I have got a funny cat.", "Tớ có một chú mèo rất vui nhộn.", ["Tớ có một chú mèo rất vui nhộn.", "Tớ có một chú chó rất vui nhộn.", "Chú mèo của tớ rất to.", "Tớ thích mèo lắm."]),
          enVi("My rabbit has got long ears.", "Chú thỏ của tớ có đôi tai dài.", ["Chú thỏ của tớ có đôi tai dài.", "Chú thỏ của tớ có cái đuôi dài.", "Chú mèo của tớ có đôi tai dài.", "Tớ có hai chú thỏ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 15 ───────────────────────────
  {
    topic: "My Garden",
    sections: [
      {
        id: "rm-stx-15",
        title: "Cái này · Những cái này",
        titleEn: "This is / These are",
        structure: "This is + a + một cái · These are + nhiều cái có -s",
        breakdown: [
          part("This is", "Chỉ MỘT vật ở gần", "Đi với danh từ số ít, thường có “a”."),
          part("These are", "Chỉ NHIỀU vật ở gần", "Đi với danh từ số nhiều có -s."),
          part("a bee / bees", "Vật được chỉ", "Số ít thì có “a”, số nhiều thì thêm -s."),
        ],
        explanation:
          "Khi bé chỉ tay vào thứ ở ngay gần mình:\n- Một cái: This is a tree.\n- Nhiều cái: These are yellow flowers.\nBa chỗ phải khớp nhau: this ↔ is ↔ danh từ số ít; these ↔ are ↔ danh từ có -s.\nMột vài từ đổi đặc biệt: one leaf → two leaves.",
        usage: "Dùng khi bé dẫn mọi người đi thăm vườn và chỉ từng thứ trong vườn.",
        mistakes: [
          mis("This are a tree.", "This is a tree.", "“This” luôn đi với “is”."),
          mis("These is bees.", "These are bees.", "“These” luôn đi với “are”."),
          mis("These are flower.", "These are flowers.", "Sau “these” thì danh từ phải có -s."),
        ],
        examples: [
          ex("Khi chỉ một cái cây", "This is a green tree.", "Đây là một cái cây xanh."),
          ex("Khi chỉ nhiều bông hoa", "These are yellow flowers.", "Đây là những bông hoa vàng."),
          ex("Khi chỉ chú ong", "This is a little bee.", "Đây là một chú ong nhỏ."),
        ],
        exercises: [
          fb("___ is a big tree.", "This", ["This", "These", "They", "Those"], "Một cái cây → This is."),
          fb("These ___ my yellow flowers.", "are", ["are", "is", "am", "be"], "“These” luôn đi với “are”."),
          so(["is", "This", "a", "bee"], "This is a bee", "Đây là một chú ong."),
          so(["are", "These", "green", "leaves"], "These are green leaves", "Đây là những chiếc lá xanh."),
          viEn("Đây là một chú bướm.", "This is a butterfly.", ["This is a butterfly.", "These is a butterfly.", "This are a butterfly.", "This is butterfly."], "Một con → This is a + danh từ số ít."),
          viEn("Đây là những cái cây của tớ.", "These are my trees.", ["These are my trees.", "These is my trees.", "This are my trees.", "These are my tree."], "Nhiều cây → These are + danh từ có -s."),
          enVi("This is a yellow flower.", "Đây là một bông hoa vàng.", ["Đây là một bông hoa vàng.", "Đây là những bông hoa vàng.", "Đây là một bông hoa đỏ.", "Bông hoa vàng ở trong vườn."]),
          enVi("These are my bees.", "Đây là những chú ong của tớ.", ["Đây là những chú ong của tớ.", "Đây là chú ong của tớ.", "Đây là những chú bướm của tớ.", "Ong của tớ ở trong vườn."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 16 ───────────────────────────
  {
    topic: "Food I Like",
    sections: [
      {
        id: "rm-stx-16",
        title: "Bé thích và không thích món gì",
        titleEn: "I like / I don't like",
        structure: "I like + món · I don't like + món · Do you like + món?",
        breakdown: [
          part("I like", "Thích", "Nói món mình thích."),
          part("I don't like", "Không thích", "don't = do not, đứng TRƯỚC “like”."),
          part("chicken", "Món ăn", "Món ăn nói chung thì KHÔNG cần “a”."),
        ],
        explanation:
          "- Thích: I like rice.\n- Không thích: I don't like fish. (don't = do not)\n- Hỏi bạn: Do you like cake? → Yes, I do. / No, I don't.\nMón ăn nói chung thì để trần, không có “a”: I like milk, chứ không nói “I like a milk”.\nSau “don't” thì động từ giữ nguyên, không thêm gì cả.",
        usage: "Dùng khi bé kể món khoái khẩu trong bữa cơm hoặc trả lời câu hỏi của bạn.",
        mistakes: [
          mis("I no like fish.", "I don't like fish.", "Phủ định phải dùng “don't”, không dùng “no”."),
          mis("I don't likes cake.", "I don't like cake.", "Sau “don't” thì động từ giữ nguyên."),
          mis("I like a milk.", "I like milk.", "Món ăn nói chung không cần “a”."),
        ],
        examples: [
          ex("Khi khoe món khoái khẩu", "I like chicken very much.", "Tớ rất thích thịt gà."),
          ex("Khi từ chối lịch sự", "I don't like fish.", "Tớ không thích cá."),
          ex("Khi hỏi bạn", "Do you like cake?", "Bạn có thích bánh ngọt không?"),
        ],
        exercises: [
          fb("I ___ like fish.", "don't", ["don't", "am not", "not", "no"], "Với “I” thì phủ định dùng don't."),
          fb("___ you like milk?", "Do", ["Do", "Are", "Is", "Does"], "Hỏi “bạn có thích… không?” thì mở đầu bằng Do."),
          so(["like", "I", "rice", "and", "chicken"], "I like rice and chicken", "Tớ thích cơm và thịt gà."),
          so(["don't", "I", "like", "soup"], "I don't like soup", "Tớ không thích món súp."),
          viEn("Tớ thích táo.", "I like apples.", ["I like apples.", "I likes apples.", "I like a apples.", "I am like apples."], "Với “I” thì động từ giữ nguyên: I like."),
          viEn("Tớ không thích bánh ngọt.", "I don't like cake.", ["I don't like cake.", "I no like cake.", "I don't likes cake.", "I am not like cake."], "Phủ định: don't + like."),
          enVi("I like milk and bread.", "Tớ thích sữa và bánh mì.", ["Tớ thích sữa và bánh mì.", "Tớ không thích sữa và bánh mì.", "Tớ thích sữa và bánh ngọt.", "Sáng nào tớ cũng uống sữa."]),
          enVi("I don't like soup.", "Tớ không thích món súp.", ["Tớ không thích món súp.", "Tớ thích món súp.", "Tớ không thích cơm.", "Món súp nóng quá."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 17 ───────────────────────────
  {
    topic: "Helping at Home",
    sections: [
      {
        id: "rm-stx-17",
        title: "Bạn ấy làm gì mỗi ngày",
        titleEn: "Present simple: he / she + verb-s",
        structure: "He / She + động từ + -s (hoặc -es) + …",
        breakdown: [
          part("She", "Chủ ngữ số ít", "he, she, it, hoặc tên một người."),
          part("washes", "Động từ + -es", "Động từ tận cùng bằng sh, ch, s, x thì thêm -es."),
          part("the dishes", "Phần còn lại", "Việc mà bạn ấy làm."),
        ],
        explanation:
          "Với I / you / we / they thì động từ giữ nguyên: I help my mum.\nNhưng với he / she / it thì động từ PHẢI thêm -s:\n- She helps my mum.\n- He makes his bed.\nĐộng từ tận cùng bằng sh, ch, s, x thì thêm -es: wash → washes, mix → mixes.\nĐây là chỗ trẻ Việt hay quên nhất, vì tiếng Việt không đổi động từ theo người.",
        usage: "Dùng khi bé kể ai trong nhà làm việc gì để giúp bố mẹ.",
        mistakes: [
          mis("My sister help my mum.", "My sister helps my mum.", "“My sister” = she nên động từ thêm -s."),
          mis("She wash the dishes.", "She washes the dishes.", "“wash” tận cùng bằng sh nên thêm -es."),
          mis("He mix the cake.", "He mixes the cake.", "“mix” tận cùng bằng x nên thêm -es."),
        ],
        examples: [
          ex("Khi kể về em gái", "My sister helps my mum every day.", "Em gái tớ giúp mẹ mỗi ngày."),
          ex("Khi kể việc rửa bát", "She washes the dishes after dinner.", "Ăn tối xong bạn ấy rửa bát."),
          ex("Khi kể về bố", "My dad mixes the cake with a spoon.", "Bố tớ lấy thìa khuấy bột bánh."),
        ],
        exercises: [
          fb("My sister ___ my mum every day.", "helps", ["helps", "help", "helping", "helpes"], "“My sister” = she → động từ thêm -s."),
          fb("He ___ the dishes after dinner.", "washes", ["washes", "wash", "washs", "washing"], "“wash” tận cùng bằng sh → thêm -es."),
          so(["helps", "She", "her", "mum"], "She helps her mum", "Bạn ấy giúp mẹ."),
          so(["the", "He", "washes", "dishes"], "He washes the dishes", "Bạn ấy rửa bát."),
          viEn("Em gái tớ dọn phòng của em ấy.", "My sister cleans her room.", ["My sister cleans her room.", "My sister clean her room.", "My sister cleanes her room.", "My sister is clean her room."], "“My sister” = she → cleans có -s."),
          viEn("Bạn ấy rửa bát mỗi tối.", "He washes the dishes every evening.", ["He washes the dishes every evening.", "He wash the dishes every evening.", "He washs the dishes every evening.", "He is wash the dishes every evening."], "“wash” + -es = washes."),
          enVi("She helps her mum every day.", "Bạn ấy giúp mẹ mỗi ngày.", ["Bạn ấy giúp mẹ mỗi ngày.", "Tớ giúp mẹ mỗi ngày.", "Bạn ấy giúp mẹ vào buổi tối.", "Mẹ giúp bạn ấy mỗi ngày."]),
          enVi("My dad mixes the cake.", "Bố tớ khuấy bột bánh.", ["Bố tớ khuấy bột bánh.", "Bố tớ ăn bánh ngọt.", "Mẹ tớ khuấy bột bánh.", "Bố tớ làm bánh mì."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 18 ───────────────────────────
  {
    topic: "Shopping",
    sections: [
      {
        id: "rm-stx-18",
        title: "Xin lịch sự khi đi mua đồ",
        titleEn: "Can I have …, please?",
        structure: "Can I have + a / some + đồ + , please?",
        breakdown: [
          part("Can I have", "Câu xin lịch sự", "Dùng khi bé muốn xin hoặc mua một thứ gì đó."),
          part("some bananas", "Thứ bé muốn", "Nhiều thứ đếm được → some + danh từ có -s; một cái → a."),
          part("please", "Từ lịch sự", "Luôn thêm “please” ở cuối câu cho lịch sự."),
        ],
        explanation:
          "Ở chợ hay trong cửa hàng, bé xin bằng mẫu câu này:\n- Can I have some bread, please?\n- Can I have a banana, please?\nNgười bán đưa đồ và nói: Here you are. → Bé đáp: Thank you.\n“Can” ở đây là XIN phép, khác với “can” khoe mình làm được (I can swim).\nTrước từ bắt đầu bằng nguyên âm thì dùng “an”: an apple.",
        usage: "Dùng khi bé đi chợ, đi siêu thị cùng mẹ hoặc gọi món.",
        mistakes: [
          mis("I want bread.", "Can I have some bread, please?", "Nói “I want” nghe hơi cộc; xin lịch sự thì dùng Can I have… please."),
          mis("Can I have a bread, please?", "Can I have some bread, please?", "“bread” không đếm được nên dùng “some”."),
          mis("Can I have five banana, please?", "Can I have five bananas, please?", "Năm quả thì danh từ phải có -s."),
        ],
        examples: [
          ex("Khi mua chuối ở chợ", "Can I have five bananas, please?", "Cho cháu xin năm quả chuối ạ."),
          ex("Khi mua bánh mì", "Can I have some bread, please?", "Cho cháu xin một ít bánh mì ạ."),
          ex("Khi người bán đưa đồ", "Here you are. Thank you!", "Của cháu đây. — Cháu cảm ơn ạ!"),
        ],
        exercises: [
          fb("___ I have some bread, please?", "Can", ["Can", "Am", "Do", "Is"], "Xin lịch sự thì mở đầu bằng “Can I have…”."),
          fb("Can I have five ___, please?", "bananas", ["bananas", "banana", "bananaes", "a banana"], "Năm quả → danh từ thêm -s."),
          so(["have", "Can", "I", "some", "bread", "please"], "Can I have some bread, please", "Cho cháu xin một ít bánh mì ạ."),
          so(["buy", "I", "bananas", "at", "the", "market"], "I buy bananas at the market", "Tớ mua chuối ở chợ."),
          viEn("Cho cháu xin một quả táo ạ.", "Can I have an apple, please?", ["Can I have an apple, please?", "Can I have a apple, please?", "Can I have apple, please?", "I want an apple."], "“apple” bắt đầu bằng nguyên âm → dùng “an”, và nhớ thêm “please”."),
          viEn("Cho cháu xin một ít bánh mì ạ.", "Can I have some bread, please?", ["Can I have some bread, please?", "Can I have a bread, please?", "Can I have some breads, please?", "I want bread now."], "“bread” không đếm được → some bread."),
          enVi("Can I have some milk, please?", "Cho cháu xin một ít sữa ạ.", ["Cho cháu xin một ít sữa ạ.", "Cho cháu xin một ít bánh mì ạ.", "Cháu không thích sữa ạ.", "Sữa ở trong giỏ ạ."]),
          enVi("Here you are. Thank you!", "Của cháu đây. Cháu cảm ơn ạ!", ["Của cháu đây. Cháu cảm ơn ạ!", "Cháu ở đây ạ. Cảm ơn cô!", "Cho cháu xin cái này ạ.", "Cảm ơn cô, cháu về đây ạ!"]),
        ],
      },
    ],
  },
];
