// PET (13–15 tuổi · B1 Preliminary for Schools)
// Cấp cuối: học viên viết được đoạn có lập luận. Trọng tâm là những cấu trúc
// làm bài viết "lên trình" — điều kiện loại 2, bị động, câu tường thuật, phỏng
// đoán bằng modal, và thói quen trong quá khứ.
import { fb, so, viEn, enVi, ex, mis, part, quiz, type GrammarUnitSeed } from "./types";

export const UNITS: GrammarUnitSeed[] = [
  {
    slug: "second-conditional",
    title: "Second conditional",
    theme: "Giá như … thì …",
    level: "PET",
    lessons: [
      {
        slug: "second-conditional",
        title: "If + quá khứ đơn, would + V",
        sections: [
          {
            id: "cond2-1",
            title: "Tình huống tưởng tượng",
            titleEn: "Second conditional",
            structure: "If + chủ ngữ + quá khứ đơn, chủ ngữ + would + động từ nguyên thể",
            breakdown: [
              part("If I had a lot of money", "Mệnh đề if + quá khứ đơn", "Điều KHÔNG có thật ở hiện tại."),
              part("I would travel", "would + động từ nguyên thể", "Kết quả tưởng tượng."),
              part("around the world", "Phần bổ sung", "Chi tiết cho kết quả."),
            ],
            explanation:
              "Điều kiện loại 2 nói về điều KHÔNG CÓ THẬT hoặc rất khó xảy ra ở hiện tại.\n- If I had a lot of money, I would travel around the world. (thực tế: mình không có nhiều tiền)\nSo với loại 1:\n- Loại 1 — có thể xảy ra: If it rains, I will stay home.\n- Loại 2 — tưởng tượng: If it rained every day, I would move to another city.\nMẹo quan trọng: với động từ “to be”, câu điều kiện loại 2 dùng “were” cho MỌI chủ ngữ — If I were you, I would apologise. Đây là cách nói lời khuyên rất hay gặp trong đề PET.",
            usage: "Dùng khi đưa lời khuyên (If I were you…), khi viết về ước mơ, hoặc khi bàn về giả định.",
            mistakes: [
              mis("If I would have money, I would travel.", "If I had money, I would travel.", "Sau “if” không dùng “would”."),
              mis("If I was you, I would say sorry.", "If I were you, I would say sorry.", "Điều kiện loại 2 dùng “were” cho mọi chủ ngữ."),
              mis("If she studied harder, she will pass.", "If she studied harder, she would pass.", "Vế if ở quá khứ thì vế chính phải dùng “would”."),
            ],
            examples: [
              ex("Khi khuyên bạn", "If I were you, I would talk to the teacher.", "Nếu là bạn, mình sẽ nói chuyện với thầy cô."),
              ex("Khi nói về ước mơ", "If I had a lot of money, I would travel the world.", "Nếu có nhiều tiền, mình sẽ đi vòng quanh thế giới."),
              ex("Khi bàn giả định", "If we lived by the sea, we would swim every day.", "Nếu sống gần biển, ngày nào chúng mình cũng bơi."),
            ],
            exercises: [
              fb("If I ___ you, I would apologise.", "were", ["were", "was", "am", "would be"], "Điều kiện loại 2 dùng “were” cho mọi chủ ngữ."),
              fb("If she had more time, she ___ learn the guitar.", "would", ["would", "will", "did", "does"], "Vế kết quả của điều kiện loại 2 dùng “would”."),
              so(["If", "I", "had", "a", "car", "I", "would", "drive", "to", "work"], "If I had a car I would drive to work", "Nếu có ô tô, mình sẽ lái xe đi làm."),
              so(["would", "We", "travel", "more", "if", "we", "had", "money"], "We would travel more if we had money", "Chúng mình sẽ đi chơi nhiều hơn nếu có tiền."),
              viEn("Nếu mình là bạn, mình sẽ học chăm hơn.", "If I were you, I would study harder.", ["If I were you, I would study harder.", "If I was you, I will study harder.", "If I would be you, I would study harder.", "If I am you, I would study harder."], "“If I were you” là dạng cố định để khuyên."),
              viEn("Nếu sống gần biển, mình sẽ bơi mỗi ngày.", "If I lived near the sea, I would swim every day.", ["If I lived near the sea, I would swim every day.", "If I would live near the sea, I would swim every day.", "If I live near the sea, I would swim every day.", "If I lived near the sea, I will swim every day."], "Vế if dùng quá khứ đơn, vế chính dùng would."),
              enVi("If he studied more, he would get better marks.", "Nếu bạn ấy học nhiều hơn thì đã được điểm cao hơn.", ["Nếu bạn ấy học nhiều hơn thì đã được điểm cao hơn.", "Bạn ấy học nhiều nên được điểm cao.", "Nếu bạn ấy học nhiều hơn, bạn ấy sẽ thi lại.", "Bạn ấy sẽ học nhiều hơn để được điểm cao."]),
              enVi("What would you do if you won a prize?", "Bạn sẽ làm gì nếu trúng giải?", ["Bạn sẽ làm gì nếu trúng giải?", "Bạn đã làm gì khi trúng giải?", "Bạn có muốn trúng giải không?", "Bạn sẽ trúng giải chứ?"]),
            ],
          },
        ],
        test: quiz([
          fb("If they ___ here, they would help us.", "were", ["were", "was", "are", "will be"]),
          so(["If", "I", "knew", "the", "answer", "I", "would", "tell", "you"], "If I knew the answer I would tell you"),
          viEn("Nếu có thời gian, mình sẽ học vẽ.", "If I had time, I would learn to draw.", ["If I had time, I would learn to draw.", "If I have time, I would learn to draw.", "If I would have time, I would learn to draw.", "If I had time, I will learn to draw."]),
          enVi("If I were rich, I would help many people.", "Nếu giàu có, mình sẽ giúp nhiều người.", ["Nếu giàu có, mình sẽ giúp nhiều người.", "Mình giàu nên đã giúp nhiều người.", "Mình sẽ giàu nếu giúp nhiều người.", "Nhiều người sẽ giúp mình."]),
        ]),
      },
    ],
  },

  {
    slug: "passive-voice",
    title: "Passive voice",
    theme: "Câu bị động",
    level: "PET",
    lessons: [
      {
        slug: "passive-voice",
        title: "is made · was built",
        sections: [
          {
            id: "pass-1",
            title: "Khi việc quan trọng hơn người làm",
            titleEn: "Passive voice (present & past simple)",
            structure: "Chủ ngữ + be (is/are/was/were) + quá khứ phân từ (+ by + tác nhân)",
            breakdown: [
              part("This bridge", "Chủ ngữ mới", "Vốn là TÂN NGỮ của câu chủ động, nay được đưa lên đầu."),
              part("was built", "be + V3", "Chia “be” theo thì và theo chủ ngữ; động từ chính chuyển sang V3."),
              part("in 1990", "Phần bổ sung", "Có thể thêm “by + người làm” nếu cần nêu rõ."),
            ],
            explanation:
              "Dùng bị động khi việc được làm quan trọng hơn người làm, hoặc khi không biết ai làm.\n- Chủ động: They built this bridge in 1990.\n- Bị động: This bridge was built in 1990.\nCách đổi: tân ngữ → chủ ngữ · động từ → be + V3 (chia “be” theo đúng thì) · chủ ngữ cũ → “by …” (bỏ đi nếu không quan trọng).\n- Hiện tại: Rice is grown in Vietnam.\n- Quá khứ: The letter was sent yesterday.\nLỗi hay gặp nhất: quên “be”, hoặc dùng V2 thay vì V3.",
            usage: "Dùng nhiều trong bài viết mô tả quy trình, giới thiệu địa danh, và tin tức.",
            mistakes: [
              mis("This bridge built in 1990.", "This bridge was built in 1990.", "Bị động luôn cần “be”."),
              mis("The letter was sent by yesterday.", "The letter was sent yesterday.", "“by” chỉ dùng trước NGƯỜI/TÁC NHÂN, không dùng trước thời gian."),
              mis("Rice is grow in Vietnam.", "Rice is grown in Vietnam.", "Sau “be” phải là V3 (grown), không phải nguyên thể."),
            ],
            examples: [
              ex("Khi giới thiệu địa danh", "This temple was built 300 years ago.", "Ngôi chùa này được xây cách đây 300 năm."),
              ex("Khi nói về sản vật", "Rice is grown in the Mekong Delta.", "Lúa được trồng ở đồng bằng sông Cửu Long."),
              ex("Khi không biết ai làm", "My bike was stolen last week.", "Xe đạp của mình bị lấy mất tuần trước."),
            ],
            exercises: [
              fb("This bridge ___ built in 1990.", "was", ["was", "is", "were", "has"], "Việc xảy ra trong quá khứ, chủ ngữ số ít → “was”."),
              fb("Rice is ___ in Vietnam.", "grown", ["grown", "grow", "grew", "growing"], "Sau “be” là quá khứ phân từ: grown."),
              so(["The", "letter", "was", "sent", "yesterday"], "The letter was sent yesterday", "Lá thư đã được gửi hôm qua."),
              so(["These", "cakes", "are", "made", "by", "my", "mum"], "These cakes are made by my mum", "Những chiếc bánh này do mẹ mình làm."),
              viEn("Ngôi trường này được xây năm 2005.", "This school was built in 2005.", ["This school was built in 2005.", "This school built in 2005.", "This school was build in 2005.", "This school is built in 2005."], "Quá khứ + bị động: was + V3."),
              viEn("Tiếng Anh được dạy ở mọi trường học.", "English is taught in every school.", ["English is taught in every school.", "English is teach in every school.", "English teaches in every school.", "English was taught in every school."], "Hiện tại + bị động: is + taught."),
              enVi("The window was broken by the wind.", "Cửa sổ bị gió làm vỡ.", ["Cửa sổ bị gió làm vỡ.", "Gió thổi qua cửa sổ.", "Cửa sổ đã được sửa.", "Ai đó đã mở cửa sổ."]),
              enVi("These shoes are made in Vietnam.", "Đôi giày này được sản xuất ở Việt Nam.", ["Đôi giày này được sản xuất ở Việt Nam.", "Đôi giày này được bán ở Việt Nam.", "Người Việt Nam thích đôi giày này.", "Đôi giày này đã được làm xong."]),
            ],
          },
        ],
        test: quiz([
          fb("The homework ___ finished last night.", "was", ["was", "is", "were", "has"]),
          so(["The", "song", "was", "written", "in", "2010"], "The song was written in 2010"),
          viEn("Cây cầu này được xây năm ngoái.", "This bridge was built last year.", ["This bridge was built last year.", "This bridge is built last year.", "This bridge was build last year.", "This bridge built last year."]),
          enVi("Coffee is grown in Dak Lak.", "Cà phê được trồng ở Đắk Lắk.", ["Cà phê được trồng ở Đắk Lắk.", "Người Đắk Lắk thích cà phê.", "Cà phê đã được trồng ở Đắk Lắk.", "Cà phê được bán ở Đắk Lắk."]),
        ]),
      },
    ],
  },

  {
    slug: "reported-speech",
    title: "Reported speech",
    theme: "Thuật lại lời người khác",
    level: "PET",
    lessons: [
      {
        slug: "reported-statements",
        title: "He said (that) …",
        sections: [
          {
            id: "rep-1",
            title: "Lùi thì khi thuật lại",
            titleEn: "Reported statements",
            structure: "S + said (that) + mệnh đề đã LÙI MỘT THÌ",
            breakdown: [
              part("He said", "Động từ tường thuật", "said (that) · told me (that) — “tell” cần có người nghe."),
              part("(that)", "Liên từ", "Có thể bỏ, nghĩa không đổi."),
              part("he was tired", "Mệnh đề lùi thì", "“I am tired” → “he was tired”: đổi ngôi VÀ lùi thì."),
            ],
            explanation:
              "Khi thuật lại lời ai đó, động từ lùi MỘT bậc về quá khứ:\n- am/is → was · are → were\n- V(s) → V2 · V2 → had + V3\n- will → would · can → could · must → had to\nCòn phải đổi:\n- ngôi: I → he/she · my → his/her\n- thời gian & nơi chốn: today → that day · tomorrow → the next day · here → there\nVí dụ: “I will call you tomorrow,” she said. → She said she would call me the next day.\nLưu ý “say” và “tell”: say (that)… nhưng tell + người + (that)…",
            usage: "Dùng khi kể lại lời thầy cô, tin nhắn của bạn, hoặc thuật lại một cuộc trò chuyện.",
            mistakes: [
              mis("He said he is tired.", "He said he was tired.", "Sau “said” thì mệnh đề phải lùi thì."),
              mis("She said me that she was busy.", "She told me that she was busy.", "Có người nghe thì dùng “told”, không dùng “said me”."),
              mis("He said he will come.", "He said he would come.", "“will” lùi thành “would”."),
            ],
            examples: [
              ex("Khi kể lại lời bạn", "She said she was tired.", "Bạn ấy bảo là bạn ấy mệt."),
              ex("Khi thuật lại lời hứa", "He said he would call me the next day.", "Bạn ấy nói hôm sau sẽ gọi cho mình."),
              ex("Khi có người nghe cụ thể", "My teacher told me that I had done well.", "Cô giáo bảo mình đã làm tốt."),
            ],
            exercises: [
              fb("He said he ___ tired.", "was", ["was", "is", "will be", "has been"], "Sau “said” thì “is” lùi thành “was”."),
              fb("She ___ me that she was busy.", "told", ["told", "said", "spoke", "talked"], "Có tân ngữ “me” thì dùng “told”."),
              so(["He", "said", "he", "would", "come", "later"], "He said he would come later", "Bạn ấy nói lát nữa sẽ tới."),
              so(["She", "told", "us", "that", "she", "was", "happy"], "She told us that she was happy", "Bạn ấy nói với chúng mình là bạn ấy vui."),
              viEn("Bạn ấy nói là bạn ấy thích môn Toán.", "She said she liked maths.", ["She said she liked maths.", "She said she likes maths.", "She told she liked maths.", "She said me she liked maths."], "Lùi thì: likes → liked; “said” không đi kèm tân ngữ trực tiếp."),
              viEn("Thầy giáo bảo chúng mình phải nộp bài hôm sau.", "The teacher told us we had to hand in the work the next day.", ["The teacher told us we had to hand in the work the next day.", "The teacher said us we have to hand in the work tomorrow.", "The teacher told us we must hand in the work tomorrow.", "The teacher told to us we had to hand in the work the next day."], "“must” lùi thành “had to”, “tomorrow” đổi thành “the next day”, và “tell” cần tân ngữ."),
              enVi("He said he had finished his homework.", "Bạn ấy nói bạn ấy đã làm xong bài tập.", ["Bạn ấy nói bạn ấy đã làm xong bài tập.", "Bạn ấy nói bạn ấy sẽ làm bài tập.", "Bạn ấy đang làm bài tập.", "Bạn ấy hỏi mình đã làm xong chưa."]),
              enVi("She told me she couldn’t come.", "Bạn ấy nói với mình là bạn ấy không tới được.", ["Bạn ấy nói với mình là bạn ấy không tới được.", "Bạn ấy hỏi mình có tới được không.", "Bạn ấy nói bạn ấy sẽ tới.", "Mình nói với bạn ấy là mình không tới được."]),
            ],
          },
        ],
        test: quiz([
          fb("She said she ___ go to the party.", "would", ["would", "will", "is going to", "can"]),
          so(["He", "told", "me", "he", "was", "sorry"], "He told me he was sorry"),
          viEn("Bạn ấy nói là bạn ấy mệt.", "She said she was tired.", ["She said she was tired.", "She said she is tired.", "She told she was tired.", "She said me she was tired."]),
          enVi("They said they had lost the keys.", "Các bạn ấy nói đã làm mất chìa khoá.", ["Các bạn ấy nói đã làm mất chìa khoá.", "Các bạn ấy nói sẽ tìm chìa khoá.", "Các bạn ấy hỏi chìa khoá ở đâu.", "Các bạn ấy đã tìm thấy chìa khoá."]),
        ]),
      },
    ],
  },

  {
    slug: "modals-deduction",
    title: "Modals of deduction",
    theme: "Phỏng đoán chắc chắn tới đâu",
    level: "PET",
    lessons: [
      {
        slug: "modals-deduction",
        title: "must be · might be · can’t be",
        sections: [
          {
            id: "deduc-1",
            title: "Đoán dựa trên bằng chứng",
            titleEn: "must / might / can’t for deduction",
            structure: "Chủ ngữ + must / might / can’t + be (+ V nguyên thể)",
            breakdown: [
              part("She", "Chủ ngữ", "Người hoặc vật mình đang phỏng đoán."),
              part("must be", "Mức độ chắc chắn", "must = gần như chắc chắn ĐÚNG · might = có thể · can’t = gần như chắc chắn SAI."),
              part("at home", "Phần còn lại", "Điều mình phỏng đoán."),
            ],
            explanation:
              "Ba mức độ chắc chắn:\n- must be — mình tin là đúng, có bằng chứng: Her car is here, so she must be at home.\n- might / may / could be — có thể, không chắc: She might be at the library.\n- can’t be — mình tin là KHÔNG thể: She can’t be at school; it’s Sunday.\nChú ý: phủ định của “must be” trong phỏng đoán là “can’t be”, KHÔNG phải “mustn’t be” (mustn’t nghĩa là “bị cấm”).\nSau các modal này luôn là động từ nguyên thể, thường là “be”.",
            usage: "Dùng khi suy luận từ manh mối — trong bài đọc hiểu và trong hội thoại hằng ngày.",
            mistakes: [
              mis("She mustn’t be at home.", "She can’t be at home.", "Phỏng đoán “chắc chắn không” dùng “can’t be”."),
              mis("He must to be tired.", "He must be tired.", "Sau modal không có “to”."),
              mis("She might is at school.", "She might be at school.", "Sau modal là động từ nguyên thể “be”."),
            ],
            examples: [
              ex("Khi thấy bằng chứng rõ", "Her bike is here, so she must be at home.", "Xe đạp của bạn ấy ở đây, chắc chắn bạn ấy ở nhà."),
              ex("Khi chỉ đoán mò", "He might be in the library.", "Có thể bạn ấy đang ở thư viện."),
              ex("Khi thấy vô lý", "That can’t be true.", "Chuyện đó không thể đúng được."),
            ],
            exercises: [
              fb("The lights are on, so someone ___ be at home.", "must", ["must", "can’t", "mustn’t", "should"], "Có bằng chứng rõ nên dùng “must be”."),
              fb("It’s Sunday, so the school ___ be open.", "can’t", ["can’t", "mustn’t", "must", "might not be"], "Gần như chắc chắn KHÔNG → “can’t be”."),
              so(["She", "must", "be", "very", "tired"], "She must be very tired", "Chắc bạn ấy mệt lắm."),
              so(["He", "might", "be", "at", "the", "library"], "He might be at the library", "Có thể bạn ấy đang ở thư viện."),
              viEn("Chắc chắn bạn ấy đang ở nhà.", "She must be at home.", ["She must be at home.", "She must to be at home.", "She must is at home.", "She can’t be at home."], "must + be (nguyên thể), không “to”, không “is”."),
              viEn("Chuyện đó không thể đúng được.", "That can’t be true.", ["That can’t be true.", "That mustn’t be true.", "That can’t to be true.", "That can’t is true."], "Phỏng đoán phủ định mạnh dùng “can’t be”."),
              enVi("He might be sleeping now.", "Có thể bây giờ bạn ấy đang ngủ.", ["Có thể bây giờ bạn ấy đang ngủ.", "Chắc chắn bạn ấy đang ngủ.", "Bạn ấy không thể đang ngủ.", "Bạn ấy vừa mới ngủ dậy."]),
              enVi("You must be joking!", "Chắc bạn đùa thôi!", ["Chắc bạn đùa thôi!", "Bạn không được đùa!", "Bạn nên đùa một chút.", "Bạn đã đùa rồi."]),
            ],
          },
        ],
        test: quiz([
          fb("He hasn’t eaten all day. He ___ be hungry.", "must", ["must", "can’t", "mustn’t", "shouldn’t"]),
          so(["That", "can’t", "be", "her", "brother"], "That can’t be her brother"),
          viEn("Có thể bạn ấy đang bận.", "She might be busy.", ["She might be busy.", "She might is busy.", "She might to be busy.", "She must be busy."]),
          enVi("They can’t be at school today.", "Hôm nay các bạn ấy không thể ở trường được.", ["Hôm nay các bạn ấy không thể ở trường được.", "Hôm nay các bạn ấy chắc chắn ở trường.", "Hôm nay các bạn ấy không được tới trường.", "Hôm nay các bạn ấy có thể tới trường."]),
        ]),
      },
    ],
  },

  {
    slug: "used-to",
    title: "Used to",
    theme: "Ngày xưa mình hay …",
    level: "PET",
    lessons: [
      {
        slug: "used-to",
        title: "used to + V",
        sections: [
          {
            id: "usedto-1",
            title: "Thói quen cũ, giờ không còn",
            titleEn: "used to",
            structure: "Chủ ngữ + used to + động từ nguyên thể",
            breakdown: [
              part("I", "Chủ ngữ", "“used to” dùng chung cho mọi chủ ngữ."),
              part("used to", "Cấu trúc quá khứ", "Thói quen hoặc trạng thái CŨ, nay không còn đúng."),
              part("play football", "Động từ nguyên thể", "Việc từng làm thường xuyên."),
            ],
            explanation:
              "“used to + V” nói về thói quen hoặc trạng thái trong quá khứ mà BÂY GIỜ KHÔNG CÒN.\n- I used to play football every day. (giờ thì không nữa)\n- There used to be a shop here.\nPhủ định và nghi vấn dùng “did” → “use to” (bỏ -d):\n- I didn’t use to like coffee.\n- Did you use to live here?\nĐừng nhầm với “be used to + V-ing” (đã quen với việc gì): I am used to getting up early.",
            usage: "Dùng khi kể về hồi bé, so sánh ngày xưa với bây giờ — chủ đề rất hay ra ở bài viết PET.",
            mistakes: [
              mis("I used to played football.", "I used to play football.", "Sau “used to” là động từ nguyên thể."),
              mis("I didn’t used to like coffee.", "I didn’t use to like coffee.", "Đã có “did” thì bỏ -d: “use to”."),
              mis("I am used to play football when I was young.", "I used to play football when I was young.", "“be used to” nghĩa khác hẳn — đó là “đã quen với”."),
            ],
            examples: [
              ex("Khi kể hồi bé", "I used to play football every afternoon.", "Hồi bé chiều nào mình cũng đá bóng."),
              ex("Khi tả sự đổi thay", "There used to be a small shop here.", "Ngày trước ở đây từng có một cửa hàng nhỏ."),
              ex("Khi nói về thói quen đã bỏ", "I didn’t use to like vegetables.", "Trước đây mình không thích ăn rau."),
            ],
            exercises: [
              fb("I used to ___ football every day.", "play", ["play", "played", "playing", "plays"], "Sau “used to” là động từ nguyên thể."),
              fb("I didn’t ___ to like coffee.", "use", ["use", "used", "using", "uses"], "Đã có “did” thì dùng “use to”, bỏ -d."),
              so(["There", "used", "to", "be", "a", "shop", "here"], "There used to be a shop here", "Ngày trước ở đây từng có một cửa hàng."),
              so(["She", "used", "to", "live", "in", "Hue"], "She used to live in Hue", "Bạn ấy từng sống ở Huế."),
              viEn("Hồi bé mình từng sợ bóng tối.", "I used to be afraid of the dark.", ["I used to be afraid of the dark.", "I used to afraid of the dark.", "I am used to be afraid of the dark.", "I used to was afraid of the dark."], "used to + be (nguyên thể)."),
              viEn("Trước đây bạn có sống ở đây không?", "Did you use to live here?", ["Did you use to live here?", "Did you used to live here?", "Do you use to live here?", "Did you use to lived here?"], "Có “did” thì dùng “use to” và động từ nguyên thể."),
              enVi("My dad used to have long hair.", "Ngày trước bố mình để tóc dài.", ["Ngày trước bố mình để tóc dài.", "Bố mình đang để tóc dài.", "Bố mình muốn để tóc dài.", "Bố mình vừa cắt tóc."]),
              enVi("We used to walk to school together.", "Ngày trước chúng mình hay đi bộ tới trường cùng nhau.", ["Ngày trước chúng mình hay đi bộ tới trường cùng nhau.", "Chúng mình vẫn đi bộ tới trường cùng nhau.", "Chúng mình sẽ đi bộ tới trường cùng nhau.", "Chúng mình chưa bao giờ đi bộ tới trường."]),
            ],
          },
        ],
        test: quiz([
          fb("She used to ___ in Da Nang.", "live", ["live", "lived", "living", "lives"]),
          so(["I", "used", "to", "hate", "vegetables"], "I used to hate vegetables"),
          viEn("Ngày trước mình không thích cà phê.", "I didn’t use to like coffee.", ["I didn’t use to like coffee.", "I didn’t used to like coffee.", "I don’t use to like coffee.", "I didn’t use to liked coffee."]),
          enVi("There used to be a park here.", "Ngày trước ở đây từng có một công viên.", ["Ngày trước ở đây từng có một công viên.", "Ở đây sắp có một công viên.", "Ở đây vẫn có một công viên.", "Công viên này rất cũ."]),
        ]),
      },
    ],
  },
];
