// Ngữ pháp cho các bài BỔ SUNG của cấp này (../extra/movers.ts).
//
// Phần tử thứ i ↔ bài bổ sung thứ i (tính dồn qua các chương của file đó).
// `topic` PHẢI khớp từng chữ với `topic` của bài tương ứng.
//
// Thứ tự: A Day at the Zoo · Sports Day · A School Trip ·
//         Cooking with Mum · Looking After Pets · My Grandparents.
// Mỗi phần đủ 8 minigame: 2× fill_blank, 2× sentence_order, 2× dịch Việt→Anh,
// 2× dịch Anh→Việt — và dùng lại đúng từ vựng bài đó vừa dạy.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 13 ───────────────────────────
  {
    topic: "A Day at the Zoo",
    sections: [
      {
        id: "rm-mox-13",
        title: "Did you…? · didn't — hỏi chuyện đã qua",
        titleEn: "Past simple: questions & negatives with did",
        structure: "Did + chủ ngữ + động từ nguyên thể? · Chủ ngữ + didn't + động từ nguyên thể",
        breakdown: [
          part("Did", "Trợ động từ quá khứ", "Đứng ĐẦU câu hỏi, dùng chung cho mọi chủ ngữ."),
          part("you", "Chủ ngữ", "I, you, he, she, we, they — did không đổi theo chủ ngữ."),
          part("see the parrot", "Động từ NGUYÊN THỂ", "Đã có “did” rồi thì động từ trở về dạng trần: see, không phải saw."),
        ],
        explanation:
          "Kể chuyện đã qua thì dùng động từ quá khứ (saw, went, ate), nhưng HỎI và PHỦ ĐỊNH thì mượn “did”:\n- Hỏi: Did you see the penguins? → Yes, I did. / No, I didn’t.\n- Phủ định: I didn’t want to go home.\nQuy tắc vàng: đã có “did / didn’t” thì động từ chính QUAY VỀ nguyên thể — “did” đã mang nghĩa quá khứ hộ rồi.\nCâu hỏi có từ để hỏi thì từ đó đứng trước: What did the parrot say?",
        usage: "Dùng khi bé hỏi bạn về chuyến đi vườn thú, hoặc kể việc mình KHÔNG làm.",
        mistakes: [
          mis("Did you saw the parrot?", "Did you see the parrot?", "Đã có “did” thì động từ về nguyên thể."),
          mis("I didn’t clapped.", "I didn’t clap.", "Sau “didn’t” là động từ trần, không thêm -ed."),
          mis("You did go to the zoo?", "Did you go to the zoo?", "Câu hỏi thì “Did” phải đứng ĐẦU câu."),
        ],
        examples: [
          ex("Khi hỏi bạn về vườn thú", "Did you see the penguins?", "Cậu có nhìn thấy chim cánh cụt không?"),
          ex("Khi kể việc mình không làm", "We didn’t feed the parrots.", "Chúng tớ không cho vẹt ăn."),
          ex("Khi hỏi bằng từ để hỏi", "What did the zookeeper do?", "Cô chăm sóc thú đã làm gì?"),
        ],
        exercises: [
          fb("___ you see the penguins at the zoo?", "Did", ["Did", "Do", "Was", "Were"], "Hỏi chuyện đã qua thì mở đầu bằng “Did”."),
          fb("We ___ feed the parrots.", "didn’t", ["didn’t", "don’t", "wasn’t", "not"], "Phủ định ở quá khứ dùng “didn’t” + động từ trần."),
          so(["Did", "you", "the", "see", "zookeeper"], "Did you see the zookeeper", "Cậu có nhìn thấy cô chăm sóc thú không?"),
          so(["didn’t", "I", "want", "home", "to", "go"], "I didn’t want to go home", "Tớ đã không muốn về nhà."),
          viEn("Cậu có cho lũ vẹt ăn không?", "Did you feed the parrots?", ["Did you feed the parrots?", "Did you fed the parrots?", "Do you feed the parrots yesterday?", "You did feed the parrots?"], "“Did” đứng đầu, động từ giữ nguyên thể “feed”."),
          viEn("Chúng tớ không nhìn thấy con voi nào.", "We didn’t see any elephants.", ["We didn’t see any elephants.", "We didn’t saw any elephants.", "We not see any elephants.", "We don’t see any elephants yesterday."], "Sau “didn’t” là “see”, không phải “saw”."),
          enVi("Did you clap at the zoo?", "Cậu có vỗ tay ở vườn thú không?", ["Cậu có vỗ tay ở vườn thú không?", "Cậu có hay vỗ tay không?", "Cậu vỗ tay ở vườn thú.", "Ai vỗ tay ở vườn thú?"]),
          enVi("I didn’t want to go home.", "Tớ đã không muốn về nhà.", ["Tớ đã không muốn về nhà.", "Tớ muốn về nhà.", "Tớ không về nhà được.", "Tớ đã về nhà rồi."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 14 ───────────────────────────
  {
    topic: "Sports Day",
    sections: [
      {
        id: "rm-mox-14",
        title: "Việc đang xảy ra lúc này",
        titleEn: "Present continuous",
        structure: "Chủ ngữ + am / is / are + động từ-ing",
        breakdown: [
          part("Nam", "Chủ ngữ", "Người đang làm việc đó."),
          part("is", "to be hợp chủ ngữ", "I → am · he, she, it → is · you, we, they → are."),
          part("running", "Động từ + -ing", "run gấp đôi chữ n → running."),
        ],
        explanation:
          "Việc ĐANG diễn ra ngay lúc nói thì dùng am / is / are + động từ-ing:\n- Nam is running in the last race.\n- We are cheering for him.\nChính tả -ing: jump → jumping · cheer → cheering · smile → smiling (bỏ e) · run → running (gấp đôi phụ âm).\nDấu hiệu: now, right now, at the moment, Look!\nPhủ định: I am not running today.",
        usage: "Dùng khi bé tường thuật những gì đang diễn ra trước mắt trong ngày hội thể thao.",
        mistakes: [
          mis("Nam running now.", "Nam is running now.", "Thiếu am / is / are thì câu chưa hoàn chỉnh."),
          mis("We are cheer for him.", "We are cheering for him.", "Sau are thì động từ phải có -ing."),
          mis("I am wear a blue shirt.", "I am wearing a blue shirt.", "wear → wearing."),
        ],
        examples: [
          ex("Khi tường thuật cuộc đua", "Nam is running in the last race.", "Nam đang chạy ở cuộc đua cuối cùng."),
          ex("Khi cổ vũ cùng cả lớp", "We are cheering for our team.", "Chúng tớ đang cổ vũ cho đội mình."),
          ex("Khi kể việc mình đang làm", "I am catching the ball.", "Tớ đang bắt bóng."),
        ],
        exercises: [
          fb("Nam ___ running in the last race.", "is", ["is", "are", "am", "be"], "“Nam” là một bạn → dùng “is”."),
          fb("We are ___ for our team.", "cheering", ["cheering", "cheer", "cheers", "to cheer"], "Sau “are” thì động từ thêm -ing."),
          so(["is", "Nam", "in", "running", "the", "race"], "Nam is running in the race", "Nam đang chạy trong cuộc đua."),
          so(["am", "I", "a", "wearing", "blue", "shirt"], "I am wearing a blue shirt", "Tớ đang mặc áo xanh."),
          viEn("Các bạn ấy đang reo hò cổ vũ.", "They are cheering.", ["They are cheering.", "They is cheering.", "They are cheer.", "They cheering."], "“They” đi với “are”, động từ thêm -ing."),
          viEn("Cô Lan đang trao thưởng cho Nam.", "Miss Lan is giving Nam a prize.", ["Miss Lan is giving Nam a prize.", "Miss Lan are giving Nam a prize.", "Miss Lan is give Nam a prize.", "Miss Lan giving Nam a prize."], "Một người → is, và động từ có -ing."),
          enVi("He is jumping and smiling.", "Bạn ấy đang nhảy cẫng lên và cười tươi.", ["Bạn ấy đang nhảy cẫng lên và cười tươi.", "Bạn ấy nhảy rất cao.", "Bạn ấy đang chạy và cười.", "Bạn ấy thích nhảy và cười."]),
          enVi("I am not running today.", "Hôm nay tớ không chạy đua.", ["Hôm nay tớ không chạy đua.", "Hôm nay tớ có chạy đua.", "Hôm qua tớ không chạy đua.", "Tớ không thích chạy đua."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 15 ───────────────────────────
  {
    topic: "A School Trip",
    sections: [
      {
        id: "rm-mox-15",
        title: "There was · There were — hôm ấy có gì",
        titleEn: "There was / There were",
        structure: "There was + danh từ số ít · There were + danh từ số nhiều",
        breakdown: [
          part("There", "Từ mở đầu", "Không dịch là “ở đó” — đây chỉ là cách mở câu “có…”."),
          part("was / were", "to be ở quá khứ", "Số ít → was · số nhiều → were."),
          part("forty children", "Thứ đã có ở đó", "Nhìn vào từ này để chọn was hay were."),
        ],
        explanation:
          "Muốn kể “hôm ấy có…” thì dùng:\n- There was + MỘT thứ: There was a big dinosaur.\n- There were + NHIỀU thứ: There were forty children on the bus.\nPhủ định: There wasn’t a shop. / There weren’t any maps.\nCâu hỏi: Was there a guide? — Were there many people?\nMẹo: nhìn danh từ ĐỨNG SAU, không nhìn chữ “There”.",
        usage: "Dùng khi bé kể lại chuyến đi và tả những thứ đã có ở đó.",
        mistakes: [
          mis("There was forty children.", "There were forty children.", "“forty children” là số nhiều → were."),
          mis("There were a big dinosaur.", "There was a big dinosaur.", "“a big dinosaur” là một con → was."),
          mis("There wasn’t any maps.", "There weren’t any maps.", "“maps” số nhiều → weren’t."),
        ],
        examples: [
          ex("Khi tả cái nhìn thấy đầu tiên", "There was a big dinosaur in the museum.", "Trong bảo tàng có một con khủng long to."),
          ex("Khi đếm số bạn trên xe", "There were forty children on the bus.", "Trên xe buýt có bốn mươi bạn."),
          ex("Khi kể thứ không có", "There weren’t any maps left.", "Chẳng còn tấm bản đồ nào cả."),
        ],
        exercises: [
          fb("There ___ forty children on the bus.", "were", ["were", "was", "is", "are"], "“forty children” số nhiều → were."),
          fb("There ___ a big dinosaur in the museum.", "was", ["was", "were", "are", "have"], "“a big dinosaur” là MỘT con → was."),
          so(["was", "There", "a", "picnic", "in", "the", "garden"], "There was a picnic in the garden", "Ngoài vườn có một buổi ăn dã ngoại."),
          so(["were", "There", "three", "dinosaurs", "baby"], "There were three baby dinosaurs", "Có ba con khủng long con."),
          viEn("Có bốn mươi bạn nhỏ trên xe buýt.", "There were forty children on the bus.", ["There were forty children on the bus.", "There was forty children on the bus.", "There are forty children on the bus.", "There were forty child on the bus."], "Số nhiều → There were."),
          viEn("Chẳng còn tấm bản đồ nào cả.", "There weren’t any maps left.", ["There weren’t any maps left.", "There wasn’t any maps left.", "There weren’t some maps left.", "There aren’t any maps left."], "“maps” số nhiều và chuyện đã qua → weren’t + any."),
          enVi("There was a school trip on Friday.", "Thứ Sáu có một chuyến đi của lớp.", ["Thứ Sáu có một chuyến đi của lớp.", "Thứ Sáu lớp tớ đi học.", "Thứ Bảy có một chuyến đi của lớp.", "Chuyến đi của lớp rất vui."]),
          enVi("There were only a few people.", "Chỉ có vài người thôi.", ["Chỉ có vài người thôi.", "Có rất nhiều người.", "Chẳng có ai cả.", "Vài người đã về rồi."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 16 ───────────────────────────
  {
    topic: "Cooking with Mum",
    sections: [
      {
        id: "rm-mox-16",
        title: "Câu sai bảo · First — Then — Next — Finally",
        titleEn: "Imperatives + sequence words",
        structure: "Động từ nguyên thể + … (+ please) · Don’t + động từ nguyên thể",
        breakdown: [
          part("Wash", "Động từ đứng ĐẦU câu", "Câu sai bảo KHÔNG có chủ ngữ “you”."),
          part("your hands", "Tân ngữ", "Thứ được làm gì đó."),
          part("Don’t touch", "Dạng cấm", "Don’t + động từ trần = “đừng…”."),
        ],
        explanation:
          "Trong bếp, mẹ hay dặn bằng câu sai bảo — động từ đứng NGAY ĐẦU câu, không có chủ ngữ:\n- Wash your hands. · Stir the rice slowly.\n- Cấm: Don’t touch the hot pan.\nThêm “please” cho lịch sự: Wash your hands, please.\nKể các bước theo thứ tự bằng: First, … → Then … → Next, … → Finally, … (đứng đầu câu, thường có dấu phẩy).",
        usage: "Dùng khi bé hướng dẫn các bước nấu một món ăn, hoặc nhắc nhau giữ an toàn trong bếp.",
        mistakes: [
          mis("You stir the rice slowly.", "Stir the rice slowly.", "Câu sai bảo thì bỏ chủ ngữ “you”."),
          mis("Don’t touching the hot pan.", "Don’t touch the hot pan.", "Sau “Don’t” là động từ trần."),
          mis("Finally taste it first.", "First, taste it. / Finally, taste it.", "“First” và “Finally” là hai bước khác nhau, đừng dùng lẫn trong một câu."),
        ],
        examples: [
          ex("Khi mẹ dặn bước đầu tiên", "First, wash your hands, please.", "Đầu tiên, con rửa tay đi nhé."),
          ex("Khi mẹ hướng dẫn đảo cơm", "Then stir the rice slowly.", "Rồi con đảo cơm từ từ thôi."),
          ex("Khi nhắc giữ an toàn", "Don’t touch the hot pot!", "Đừng chạm vào cái nồi nóng!"),
        ],
        exercises: [
          fb("___ your hands, please.", "Wash", ["Wash", "Washing", "You wash", "To wash"], "Câu sai bảo mở đầu bằng động từ trần."),
          fb("___ touch the hot pan!", "Don’t", ["Don’t", "Not", "No", "Doesn’t"], "Cấm làm gì thì dùng “Don’t” + động từ trần."),
          so(["the", "Stir", "slowly", "rice"], "Stir the rice slowly", "Con đảo cơm từ từ thôi."),
          so(["two", "Break", "eggs", "a", "into", "bowl"], "Break two eggs into a bowl", "Đập hai quả trứng vào bát."),
          viEn("Con rửa tay đi nhé.", "Wash your hands, please.", ["Wash your hands, please.", "You wash your hands, please.", "Washing your hands, please.", "To wash your hands, please."], "Câu sai bảo bắt đầu bằng động từ, không có “you”."),
          viEn("Đừng chạm vào cái nồi nóng nhé.", "Don’t touch the hot pot.", ["Don’t touch the hot pot.", "Don’t touching the hot pot.", "No touch the hot pot.", "Don’t to touch the hot pot."], "Don’t + động từ nguyên thể."),
          enVi("Finally, we taste our fried rice.", "Cuối cùng, cả nhà nếm thử món cơm rang.", ["Cuối cùng, cả nhà nếm thử món cơm rang.", "Đầu tiên, cả nhà nếm thử món cơm rang.", "Cuối cùng, cả nhà ăn hết món cơm rang.", "Món cơm rang ngon tuyệt."]),
          enVi("First, wash these tomatoes.", "Đầu tiên, rửa mấy quả cà chua này.", ["Đầu tiên, rửa mấy quả cà chua này.", "Cuối cùng, rửa mấy quả cà chua này.", "Đầu tiên, thái mấy quả cà chua này.", "Mấy quả cà chua này sạch rồi."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 17 ───────────────────────────
  {
    topic: "Looking After Pets",
    sections: [
      {
        id: "rm-mox-17",
        title: "have got · has got — bé có gì",
        titleEn: "have got / has got",
        structure: "I / you / we / they + have got · he / she / it + has got",
        breakdown: [
          part("My rabbit", "Chủ ngữ", "Người hoặc con vật sở hữu."),
          part("has got", "Dạng đúng của chủ ngữ", "he, she, it → has got · I, you, we, they → have got."),
          part("soft fur", "Thứ sở hữu", "Cái mà chủ ngữ có."),
        ],
        explanation:
          "“have got / has got” nghĩa là CÓ (sở hữu) — người Anh dùng rất nhiều khi nói:\n- I have got two pets. · My rabbit has got soft fur.\nPhủ định: I haven’t got a cat. · He hasn’t got a rabbit.\nCâu hỏi: Have you got a pet? → Yes, I have. / No, I haven’t.\n           Has your rabbit got long ears? → Yes, she has.\nNhớ: một mình “got” không đủ, luôn phải có have hoặc has đi trước.",
        usage: "Dùng khi bé kể mình nuôi con gì và con vật đó có đặc điểm gì.",
        mistakes: [
          mis("My rabbit have got soft fur.", "My rabbit has got soft fur.", "“My rabbit” là một con → has got."),
          mis("I has got two pets.", "I have got two pets.", "“I” luôn đi với have got."),
          mis("Have you got a pet? – Yes, I got.", "Have you got a pet? – Yes, I have.", "Trả lời ngắn nhắc lại “have”, không nhắc “got”."),
        ],
        examples: [
          ex("Khi kể về thú cưng của mình", "I have got two pets.", "Tớ có hai bạn thú cưng."),
          ex("Khi tả bộ lông chú thỏ", "My rabbit has got very soft fur.", "Bạn thỏ của tớ có bộ lông rất mềm."),
          ex("Khi hỏi bạn", "Have you got a hamster?", "Cậu có nuôi hamster không?"),
        ],
        exercises: [
          fb("My rabbit ___ got very soft fur.", "has", ["has", "have", "is", "are"], "“My rabbit” là một con → has got."),
          fb("___ you got a pet?", "Have", ["Have", "Has", "Do", "Are"], "Hỏi “cậu có… không?” thì mở đầu bằng “Have”."),
          so(["got", "I", "have", "two", "pets"], "I have got two pets", "Tớ có hai bạn thú cưng."),
          so(["hasn’t", "He", "got", "rabbit", "a"], "He hasn’t got a rabbit", "Bạn ấy không có thỏ."),
          viEn("Bạn Nam có một chú chó to.", "Nam has got a big dog.", ["Nam has got a big dog.", "Nam have got a big dog.", "Nam has get a big dog.", "Nam is got a big dog."], "“Nam” là một bạn → has got."),
          viEn("Tớ không có bạn hamster nào.", "I haven’t got a hamster.", ["I haven’t got a hamster.", "I hasn’t got a hamster.", "I don’t have got a hamster.", "I haven’t a hamster got."], "“I” → haven’t got."),
          enVi("She has got long ears.", "Bạn thỏ có đôi tai dài.", ["Bạn thỏ có đôi tai dài.", "Bạn thỏ có bộ lông dài.", "Bạn thỏ không có tai dài.", "Đôi tai của bạn thỏ rất nhỏ."]),
          enVi("Have you got a pet?", "Cậu có nuôi thú cưng không?", ["Cậu có nuôi thú cưng không?", "Cậu thích thú cưng không?", "Thú cưng của cậu đâu rồi?", "Tớ có nuôi một bạn thú cưng."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 18 ───────────────────────────
  {
    topic: "My Grandparents",
    sections: [
      {
        id: "rm-mox-18",
        title: "me · him · her · us · them — tân ngữ",
        titleEn: "Object pronouns",
        structure: "Chủ ngữ + động từ + tân ngữ (me / him / her / us / them)",
        breakdown: [
          part("Grandma", "Chủ ngữ", "Người làm việc đó — đứng TRƯỚC động từ."),
          part("teaches", "Động từ", "Việc đang xảy ra."),
          part("me", "Tân ngữ", "Người nhận việc đó — đứng SAU động từ."),
        ],
        explanation:
          "Đứng trước động từ và đứng sau động từ là HAI dạng khác nhau:\n- I → me · he → him · she → her · we → us · they → them (you, it giữ nguyên)\nVí dụ: I visit them. · Grandma teaches me. · I help him.\nSau giới từ cũng dùng dạng tân ngữ: with them, for us, to her.\nTiếng Việt chỉ có một chữ (“tớ”, “ông”), nên bé phải nhớ đổi dạng khi từ đó chuyển ra sau động từ.",
        usage: "Dùng khi bé kể ông bà làm gì cho bé và bé làm gì cho ông bà.",
        mistakes: [
          mis("Grandma teaches I every summer.", "Grandma teaches me every summer.", "Sau động từ thì “I” đổi thành “me”."),
          mis("I visit they every summer.", "I visit them every summer.", "Sau động từ thì “they” đổi thành “them”."),
          mis("Grandpa shows we his garden.", "Grandpa shows us his garden.", "Sau động từ thì “we” đổi thành “us”."),
        ],
        examples: [
          ex("Khi kể chuyện về hè", "I visit them every summer.", "Hè nào tớ cũng về thăm ông bà."),
          ex("Khi kể bà dạy gì", "Grandma teaches me how to make rice cakes.", "Bà dạy tớ cách làm bánh."),
          ex("Khi kể việc giúp ông", "I help him in the garden.", "Tớ giúp ông ngoài vườn."),
        ],
        exercises: [
          fb("I visit ___ every summer.", "them", ["them", "they", "their", "theirs"], "Sau động từ “visit” thì dùng “them”."),
          fb("Grandma teaches ___ how to make rice cakes.", "me", ["me", "I", "my", "mine"], "Sau động từ “teaches” thì “I” đổi thành “me”."),
          so(["him", "I", "help", "the", "with", "garden"], "I help him with the garden", "Tớ giúp ông chăm khu vườn."),
          so(["us", "They", "stories", "tell", "funny"], "They tell us funny stories", "Ông bà kể cho chúng tớ những chuyện vui."),
          viEn("Tớ nhớ ông bà lắm.", "I miss them a lot.", ["I miss them a lot.", "I miss they a lot.", "I miss their a lot.", "Them miss me a lot."], "“ông bà” đứng sau động từ → them."),
          viEn("Ông cho tớ xem những bông hoa của ông.", "Grandpa shows me his flowers.", ["Grandpa shows me his flowers.", "Grandpa shows I his flowers.", "Grandpa shows my his flowers.", "Grandpa show me his flowers."], "Sau “shows” thì dùng “me”."),
          enVi("She teaches me how to make rice cakes.", "Bà dạy tớ cách làm bánh.", ["Bà dạy tớ cách làm bánh.", "Tớ dạy bà cách làm bánh.", "Bà làm bánh cho tớ.", "Bà thích làm bánh lắm."]),
          enVi("They tell us funny stories.", "Ông bà kể cho chúng tớ những câu chuyện vui.", ["Ông bà kể cho chúng tớ những câu chuyện vui.", "Chúng tớ kể cho ông bà những câu chuyện vui.", "Ông bà đọc cho chúng tớ một cuốn sách vui.", "Câu chuyện của ông bà rất vui."]),
        ],
      },
    ],
  },
];
