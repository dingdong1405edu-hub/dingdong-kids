// Đề thi thử cấp này. Xem hợp đồng + hướng dẫn soạn theo cấp ở ./types.ts.
//
// CHỈ soạn 3 phần: LISTENING · READING · WRITING (phần Nói chưa có trình ghi âm
// trong đề thi thử — xem cảnh báo đầu types.ts).
import type { ExamSeed } from "./types";
import { mcq, tf } from "../types";

export const EXAMS: ExamSeed[] = [
  // ═════════════════════════════════════════════════════════════════════════
  //  ĐỀ 1 — Học sinh và cộng đồng (câu lạc bộ vườn trường · tình nguyện ·
  //  đồng phục · thư viện chia sẻ đồ dùng)
  // ═════════════════════════════════════════════════════════════════════════
  {
    slug: "pet-1",
    title: "Đề thi thử Preliminary (B1) — Đề 1",
    level: "PET",
    description:
      "Đề thử B1 Preliminary for Schools theo chủ đề học sinh và cộng đồng: 8 câu Nghe, 8 câu Đọc (hai bài nghị luận có lập luận và hàm ý) và 1 bài Viết nêu ý kiến tối thiểu 100 từ. Làm trong 60 phút.",
    totalTime: 3600,
    sections: [
      // ─────────────────────────── NGHE ───────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Em nghe hai đoạn hội thoại rồi chọn đáp án đúng. Ở cấp B1, đáp án ít khi được nói y nguyên — hãy nghe cả Ý của người nói, đừng chỉ săn từ khoá.",
        parts: [
          {
            title: "Part 1 · Phỏng vấn trên đài phát thanh",
            instructions:
              "Nghe cuộc phỏng vấn giữa người dẫn chương trình và bạn Hương — người lập câu lạc bộ vườn trường — rồi trả lời 4 câu hỏi.",
            transcript: `Presenter: Welcome back to Teen Talk. Today I am speaking to Huong, who started a garden club at her school in Hue. Huong, how did the idea begin?

Huong: It began with a complaint, actually. Our school yard was completely grey, and one afternoon a friend said that nothing green ever grew there. I thought about it all evening, and the next morning I wrote a plan.

Presenter: And was the plan accepted straight away?

Huong: No, it was rejected twice. The head teacher was worried about the cost. In the end we asked local shops for old pots and seeds, so the whole garden was built for almost nothing.

Presenter: How many students take part now?

Huong: Forty-two. We meet every Wednesday after school. If it rains, we move inside and plan the next season instead.

Presenter: What has surprised you most?

Huong: How much I have learnt about other people. I expected to learn about plants, but I have really learnt how to listen to a group and share the work.`,
            questions: [
              mcq(
                "How did Huong get the idea for the garden club?",
                "Hương đã nảy ra ý tưởng lập câu lạc bộ vườn trường như thế nào?",
                [
                  "A teacher asked her to start one.",
                  "A friend said that nothing green grew in the school yard.",
                  "She heard about a garden club on the radio.",
                  "Her parents gave her some seeds.",
                ],
                1,
                "Hương kể ý tưởng bắt đầu từ một lời than phiền: sân trường xám ngắt và một người bạn nói chẳng có gì xanh mọc được ở đó. Cô giáo, đài phát thanh hay bố mẹ đều không phải nguồn gốc của ý tưởng.",
                "one afternoon a friend said that nothing green ever grew there",
              ),
              mcq(
                "What happened the first times Huong gave her plan to the school?",
                "Chuyện gì xảy ra những lần đầu Hương nộp bản kế hoạch cho nhà trường?",
                [
                  "It was accepted immediately.",
                  "It was rejected twice.",
                  "It was lost by the head teacher.",
                  "It was rewritten by the other students.",
                ],
                1,
                "Khi được hỏi kế hoạch có được duyệt ngay không, Hương trả lời bằng câu bị động: nó đã bị từ chối HAI LẦN vì thầy hiệu trưởng lo về chi phí.",
                "it was rejected twice",
              ),
              mcq(
                "What does the club do when it rains?",
                "Câu lạc bộ làm gì khi trời mưa?",
                [
                  "They cancel the meeting.",
                  "They work in the garden anyway.",
                  "They go inside and plan the next season.",
                  "They ask local shops for more pots.",
                ],
                2,
                "Hương dùng câu điều kiện loại 1: nếu trời mưa thì cả nhóm vào trong nhà và lên kế hoạch cho mùa sau — chứ không huỷ buổi sinh hoạt.",
                "If it rains, we move inside and plan the next season instead.",
              ),
              mcq(
                "What does Huong imply about starting a new project at school?",
                "Hương ngầm nói lên điều gì về việc bắt đầu một dự án mới ở trường?",
                [
                  "It is impossible without a lot of money.",
                  "A good idea may need several attempts before it is accepted.",
                  "Teachers always support new clubs at once.",
                  "Students should never complain about their school.",
                ],
                1,
                "Hương không nói thẳng câu này. Nhưng kế hoạch bị từ chối hai lần rồi cuối cùng vẫn thành hiện thực nhờ xin chậu và hạt giống cũ — điều đó ngầm cho thấy một ý tưởng hay có thể phải thử vài lần mới được chấp nhận. Đó là hàm ý.",
              ),
            ],
          },
          {
            title: "Part 2 · Hai người bạn bàn chuyện tình nguyện",
            instructions:
              "Nghe Nam và Mai nói về buổi dọn rác bãi biển vào Chủ nhật, rồi trả lời 4 câu hỏi.",
            transcript: `Boy: Nam here. Guess what? I signed up for the beach clean-up on Sunday.

Girl: Really? I thought you hated getting up early.

Boy: I do, but my sister went last month and she said it was the best morning of her holiday. Apparently more than three hundred bags of rubbish were collected in four hours.

Girl: Three hundred? That is depressing.

Boy: Or encouraging. The rubbish was already there, Mai. At least now it is gone.

Girl: Fair enough. Can anyone join, or do you have to register first?

Boy: You have to register online, but it is free. Gloves and bags are provided by the organisers. You only need a hat and plenty of water.

Girl: Then count me in. If my cousin comes as well, is that a problem?

Boy: Not at all. The more people we have, the sooner we will finish.`,
            questions: [
              mcq(
                "Why did Nam decide to join the beach clean-up?",
                "Vì sao Nam quyết định tham gia buổi dọn rác bãi biển?",
                [
                  "Because his teacher asked him to.",
                  "Because his sister enjoyed it very much.",
                  "Because he loves getting up early.",
                  "Because he wanted to meet Mai's cousin.",
                ],
                1,
                "Nam thừa nhận cậu ấy ghét dậy sớm, NHƯNG chị gái cậu đã đi tháng trước và nói đó là buổi sáng tuyệt nhất kỳ nghỉ. Chính lời kể đó khiến Nam đăng ký.",
                "my sister went last month and she said it was the best morning of her holiday",
              ),
              mcq(
                "What do volunteers have to bring themselves?",
                "Tình nguyện viên phải tự mang theo thứ gì?",
                [
                  "Gloves and rubbish bags.",
                  "A hat and plenty of water.",
                  "Three hundred bags.",
                  "Nothing at all.",
                ],
                1,
                "Câu bị động cho biết găng tay và túi đựng rác do ban tổ chức CUNG CẤP; thứ duy nhất phải tự mang là mũ và thật nhiều nước.",
                "You only need a hat and plenty of water.",
              ),
              mcq(
                "What does Nam mean when he answers \"Or encouraging\"?",
                "Nam muốn nói gì khi đáp lại bằng câu \"Or encouraging\" (Hoặc là đáng mừng chứ)?",
                [
                  "He thinks the big number shows how much good the volunteers did.",
                  "He thinks Mai should not come with him.",
                  "He believes the beach is dirtier now than before.",
                  "He is making fun of his sister.",
                ],
                0,
                "Mai thấy con số ba trăm túi rác thật buồn. Nam đáp lại rằng rác vốn đã nằm đó rồi, ít nhất bây giờ nó đã biến mất — tức là cậu ấy nhìn con số đó như bằng chứng cho việc tốt mà nhóm tình nguyện đã làm. Đây là hàm ý, không nói thẳng.",
              ),
              tf(
                "Volunteers have to pay some money to take part in the clean-up.",
                "Tình nguyện viên phải trả tiền mới được tham gia buổi dọn rác.",
                false,
                "SAI. Nam nói phải đăng ký trước trên mạng, NHƯNG hoạt động này miễn phí. Đăng ký không đồng nghĩa với đóng tiền — đây đúng là cái bẫy quen thuộc của phần nghe B1.",
                "You have to register online, but it is free.",
              ),
            ],
          },
        ],
      },
      // ─────────────────────────── ĐỌC ───────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc hiểu",
        instructions:
          "Em đọc hai bài viết nêu ý kiến rồi chọn đáp án đúng. Có câu hỏi về Ý CHÍNH của cả bài và câu hỏi về điều tác giả chỉ ngầm nói ra.",
        parts: [
          {
            title: "Part 1 · The Uniform Argument",
            instructions: "Đọc bài viết của một bạn học sinh ở Cần Thơ rồi trả lời 4 câu hỏi.",
            passage: `At my school in Can Tho, the same blue shirt has been worn by every student for more than thirty years. Once a term, somebody suggests that the rule should be changed, and once a term the argument starts again.

The students who dislike uniforms have a strong point. Clothes are one of the few ways a teenager can show who they really are, and a uniform removes that choice completely. My classmate Trang designs her own bags because, she says, it is the only part of her school clothes nobody controls. If we were allowed to choose freely, mornings would certainly be more interesting.

Yet I still support the uniform, and not for the usual reason. Adults often say that uniforms look smart, which is not a serious argument. The real value is quieter. When everyone arrives in the same shirt, nobody can tell whose family has money and whose has not. In a class of forty, that silence is worth a great deal.

Of course, a uniform does not make a school fair by itself. If the shirts are expensive, poorer families are simply pushed into a different kind of difficulty, and some schools have solved this by lending shirts to any student who needs one.

So my answer is neither yes nor no. Uniforms should be kept, but they should be cheap, comfortable and the same for everyone. A rule is only useful while it protects the people it was written for.`,
            questions: [
              mcq(
                "What is the writer's main opinion about school uniforms?",
                "Ý kiến chính của người viết về đồng phục học sinh là gì?",
                [
                  "Uniforms should be replaced by a free choice of clothes.",
                  "Uniforms are worth keeping, but only if they are cheap and the same for all.",
                  "Uniforms matter mainly because they look smart.",
                  "Every school should lend clothes to all of its students.",
                ],
                1,
                "Bài viết trình bày cả hai chiều rồi chốt lại ở đoạn cuối: câu trả lời không phải có cũng không phải không — nên GIỮ đồng phục nhưng phải rẻ, thoải mái và giống nhau cho mọi người. Đó là ý chính.",
                "Uniforms should be kept, but they should be cheap, comfortable and the same for everyone.",
              ),
              mcq(
                "Why does Trang design her own bags?",
                "Vì sao bạn Trang tự thiết kế cặp sách của mình?",
                [
                  "Because the school does not give students any bags.",
                  "Because it is the only part of her school clothes that nobody controls.",
                  "Because she wants to sell the bags to her classmates.",
                  "Because her uniform shirt is too old.",
                ],
                1,
                "Bài viết nói rõ lý do theo lời chính Trang: chiếc cặp là phần DUY NHẤT trong bộ đồ đi học mà không ai quản, nên đó là chỗ bạn ấy thể hiện cá tính.",
                "it is the only part of her school clothes nobody controls",
              ),
              mcq(
                "What does the writer think of the idea that uniforms look smart?",
                "Người viết nghĩ gì về lý lẽ cho rằng đồng phục trông gọn gàng, đẹp mắt?",
                [
                  "It is the strongest reason for keeping uniforms.",
                  "It is not a serious argument.",
                  "It explains why his school chose blue.",
                  "It is an argument invented by students.",
                ],
                1,
                "Người viết gọi thẳng lý lẽ quen thuộc của người lớn đó là một lập luận KHÔNG nghiêm túc. Với bạn ấy, giá trị thật của đồng phục nằm ở chỗ khác và lặng lẽ hơn nhiều.",
                "which is not a serious argument",
              ),
              mcq(
                "What does the writer suggest about his classmates without saying it directly?",
                "Người viết ngầm cho ta biết điều gì về các bạn cùng lớp mà không nói thẳng ra?",
                [
                  "They do not all come from families with the same amount of money.",
                  "They all dislike the colour blue.",
                  "They are all good at designing clothes.",
                  "They have never discussed the uniform rule.",
                ],
                0,
                "Bài không hề nói bạn nào giàu, bạn nào nghèo. Nhưng chi tiết mặc chung một chiếc áo thì KHÔNG AI ĐOÁN ĐƯỢC nhà ai có tiền, và sự im lặng ấy đáng giá trong một lớp bốn mươi bạn, cho thấy hoàn cảnh các bạn vốn rất khác nhau. Đó là hàm ý.",
              ),
            ],
          },
          {
            title: "Part 2 · More Than Books",
            instructions: "Đọc bài viết về một thư viện nhỏ trong khu phố rồi trả lời 4 câu hỏi.",
            passage: `The little library in our neighbourhood almost closed two years ago. Not enough people were borrowing books, and the council decided that the money would be better spent elsewhere. Then the librarian, Ms Quyen, made an unusual suggestion: if the building could not survive on books alone, it should lend other things as well.

Today you can still borrow a novel there, but you can also borrow a drill, a sewing machine, a tent or a guitar. Everything has been donated by families in the area. The rules are simple. You may keep an item for two weeks, you must return it clean, and if you break it, you are asked to help repair it rather than to pay.

The results were not the ones anybody predicted. Borrowing rose, of course, but so did conversation. People who had lived on the same street for years met for the first time while they were waiting for the tent to come back. Last winter a retired carpenter began teaching a free repair class on Saturdays, and thirty teenagers signed up.

Ms Quyen says she is often asked whether a library should really be doing this. Her answer never changes. A library, she says, was always meant to be a place where a community shares what it owns. Only the objects have changed.`,
            questions: [
              mcq(
                "Why was the library nearly closed two years ago?",
                "Vì sao thư viện suýt phải đóng cửa hai năm trước?",
                [
                  "Because the building had become dangerous.",
                  "Because too few people were borrowing books.",
                  "Because Ms Quyen was leaving her job.",
                  "Because most of the books had been damaged.",
                ],
                1,
                "Câu thứ hai của bài nêu đúng nguyên nhân: không đủ người mượn sách, nên hội đồng thành phố cho rằng nên dùng khoản tiền đó vào việc khác.",
                "Not enough people were borrowing books",
              ),
              mcq(
                "What happens if a borrower breaks something?",
                "Chuyện gì xảy ra nếu người mượn làm hỏng đồ?",
                [
                  "They have to buy a new one.",
                  "They are asked to help repair it.",
                  "They are never allowed to borrow again.",
                  "They must clean the whole library.",
                ],
                1,
                "Câu điều kiện trong phần nội quy nói rõ: nếu làm hỏng, người mượn được đề nghị cùng SỬA món đồ chứ không phải đền tiền — cũng chính là tinh thần của thư viện này.",
                "if you break it, you are asked to help repair it rather than to pay",
              ),
              tf(
                "All the tools in the library were bought by the council.",
                "Toàn bộ đồ nghề trong thư viện đều do hội đồng thành phố mua.",
                false,
                "SAI. Bài viết dùng câu bị động để cho biết mọi món đồ đều do các gia đình trong khu phố QUYÊN GÓP. Hội đồng thành phố thậm chí còn từng định cắt tiền của thư viện.",
                "Everything has been donated by families in the area.",
              ),
              mcq(
                "What does Ms Quyen mean when she says \"Only the objects have changed\"?",
                "Cô Quyên muốn nói gì qua câu \"Chỉ có các món đồ là thay đổi thôi\"?",
                [
                  "The library is doing something completely new for the first time.",
                  "The purpose of a library has stayed the same; only what it lends is different.",
                  "The library has stopped lending books.",
                  "The building has been rebuilt from the beginning.",
                ],
                1,
                "Ngay trước đó cô Quyên nói thư viện VỐN LUÔN được lập ra để cộng đồng chia sẻ những gì mình có. Vậy mục đích không đổi, chỉ có thứ được cho mượn là khác đi — không phải thư viện đang làm một việc hoàn toàn mới.",
                "A library, she says, was always meant to be a place where a community shares what it owns.",
              ),
            ],
          },
        ],
      },
      // ─────────────────────────── VIẾT ───────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions:
          "Phần này AI chấm theo 4 tiêu chí: Ngữ pháp · Từ vựng · Mạch lạc · Bám đề. Viết xong hãy đọc lại một lượt để soát -s số nhiều, mạo từ và thì.",
        parts: [
          {
            title: "Part 1 · An article for the school magazine",
            instructions:
              "Viết tối thiểu 100 từ. Nên có mở bài nêu quan điểm, hai lý do kèm ví dụ, một đoạn nhìn nhận ý kiến trái chiều và một câu kết đề xuất cụ thể.",
            writingPrompt:
              "Tạp chí tiếng Anh của trường em đang mở chuyên mục \"Teen Voice\". Hãy viết một bài khoảng 100–140 từ trả lời câu hỏi: \"Should every student do some volunteer work for their community?\" Nêu rõ quan điểm của em và bảo vệ nó bằng lý lẽ. BẮT BUỘC dùng: (1) ít nhất một câu bị động (vd \"Rubbish is collected every Sunday.\"), (2) một câu điều kiện loại 2 (\"If every student volunteered, …would…\"), (3) một từ nối tương phản (however / although).",
            writingMinWords: 100,
          },
        ],
      },
    ],
  },

  // ═════════════════════════════════════════════════════════════════════════
  //  ĐỀ 2 — Vận động, môi trường và thói quen sống (chuyến đạp xe · thử thách
  //  chạy bộ · quần áo cũ · xe buýt miễn phí)
  // ═════════════════════════════════════════════════════════════════════════
  {
    slug: "pet-2",
    title: "Đề thi thử Preliminary (B1) — Đề 2",
    level: "PET",
    description:
      "Đề thử B1 Preliminary for Schools theo chủ đề vận động, môi trường và thói quen sống: 8 câu Nghe, 8 câu Đọc (hai bài nghị luận có lập luận và hàm ý) và 1 bài Viết nêu ý kiến tối thiểu 100 từ. Làm trong 60 phút.",
    totalTime: 3600,
    sections: [
      // ─────────────────────────── NGHE ───────────────────────────
      {
        skill: "LISTENING",
        title: "Listening · Nghe",
        instructions:
          "Em nghe hai đoạn hội thoại rồi chọn đáp án đúng. Chú ý cả giọng điệu người nói: có câu là nói đùa, có câu là nói thật.",
        parts: [
          {
            title: "Part 1 · Cuộc gọi về nhà sau chuyến đạp xe",
            instructions: "Nghe Long gọi điện cho mẹ sau chuyến đạp xe ở Sa Pa, rồi trả lời 4 câu hỏi.",
            transcript: `Mum: Hello? Long, where are you calling from?

Boy: From the bus station in Sa Pa, Mum. The cycling trip is finished.

Mum: Already? You said you would be back on Sunday.

Boy: We were going to be, but the last twenty kilometres were cancelled. A storm was forecast, so the guide decided that we should not ride down the mountain in the rain.

Mum: That was sensible. Were you disappointed?

Boy: A little, at first. Then we spent the afternoon in a village school instead, and honestly that was the best part of the week. We taught the children a song in English, and they taught us how to make paper birds.

Mum: How lovely. And how are your legs?

Boy: Terrible. If I ever say the word mountain again, please stop me.

Mum: I will remind you of that next summer.`,
            questions: [
              mcq(
                "Where is Long calling from?",
                "Long đang gọi điện từ đâu?",
                [
                  "From a village school.",
                  "From the bus station in Sa Pa.",
                  "From the top of the mountain.",
                  "From home.",
                ],
                1,
                "Ngay câu trả lời đầu tiên, Long cho mẹ biết cậu đang ở bến xe buýt tại Sa Pa vì chuyến đạp xe đã kết thúc. Ngôi trường trong bản là nơi cả nhóm ghé buổi chiều hôm trước.",
                "From the bus station in Sa Pa, Mum.",
              ),
              mcq(
                "Why was the last part of the trip cancelled?",
                "Vì sao chặng cuối của chuyến đi bị huỷ?",
                [
                  "Because some bicycles were broken.",
                  "Because a storm was forecast.",
                  "Because the students were too tired to continue.",
                  "Because the guide became ill.",
                ],
                1,
                "Câu bị động cho biết người ta DỰ BÁO có bão, nên hướng dẫn viên quyết định cả nhóm không đổ đèo dưới trời mưa. Chân mỏi là chuyện Long than sau đó, không phải lý do huỷ chặng.",
                "A storm was forecast, so the guide decided that we should not ride down the mountain in the rain.",
              ),
              mcq(
                "Which part of the week did Long enjoy most?",
                "Long thích nhất phần nào trong tuần vừa rồi?",
                [
                  "Riding down the mountain.",
                  "The afternoon in the village school.",
                  "The bus journey home.",
                  "Waiting for the storm.",
                ],
                1,
                "Long nói lúc đầu cậu hơi tiếc, nhưng buổi chiều ở ngôi trường trong bản — dạy các em một bài hát tiếng Anh và học gấp chim giấy — lại là phần hay nhất cả tuần.",
                "that was the best part of the week",
              ),
              mcq(
                "What does Long mean when he asks his mother to stop him if he says the word mountain again?",
                "Long muốn nói gì khi bảo mẹ hãy ngăn cậu lại nếu cậu còn nhắc đến từ \"mountain\" (núi)?",
                [
                  "He is joking that the ride was extremely hard.",
                  "He has forgotten the name of the mountain.",
                  "He never wants to speak to his mother again.",
                  "He is planning to climb a mountain next week.",
                ],
                0,
                "Trước đó mẹ hỏi chân con thế nào và Long đáp gọn lỏn là kinh khủng. Câu tiếp theo là cách nói ĐÙA cho thấy chuyến đạp xe quá sức — bằng chứng là mẹ cười và hẹn nhắc lại chuyện này vào hè năm sau.",
              ),
            ],
          },
          {
            title: "Part 2 · Thầy cô giới thiệu thử thách chạy bộ",
            instructions: "Nghe cô giáo giải thích thử thách chạy bộ của trường, rồi trả lời 4 câu hỏi.",
            transcript: `Teacher: Before you go home, listen carefully, because the running challenge starts on Monday.

Girl: Do we have to run every day, Miss?

Teacher: No. The idea is that your class runs one thousand kilometres together before the end of term. Every kilometre counts, whether you run it at school, in a park or with your family.

Boy: How is it recorded?

Teacher: There is a chart outside the sports hall. You write your name, the date and the distance. Please be honest, because the chart is not checked by anyone.

Girl: And what does the winning class get?

Teacher: Nothing expensive. The class with the most kilometres chooses the theme of the end-of-term party.

Boy: Is that all? I expected a trophy.

Teacher: Trophies get dusty. A party that you designed yourselves is remembered much longer.`,
            questions: [
              mcq(
                "What is the aim of the running challenge?",
                "Mục tiêu của thử thách chạy bộ là gì?",
                [
                  "Every student must run a little every single day.",
                  "Each class must run one thousand kilometres together before the end of term.",
                  "Each student must run one thousand kilometres alone.",
                  "The school must build a new sports hall.",
                ],
                1,
                "Cô giáo trả lời KHÔNG phải chạy mỗi ngày: cả LỚP cùng góp cho đủ một nghìn ki-lô-mét trước khi hết học kỳ, và chạy ở đâu cũng được tính.",
                "your class runs one thousand kilometres together before the end of term",
              ),
              mcq(
                "How are the distances recorded?",
                "Quãng đường chạy được ghi lại bằng cách nào?",
                [
                  "On a chart outside the sports hall.",
                  "On the school website.",
                  "By the teacher after every lesson.",
                  "On a phone app.",
                ],
                0,
                "Cô giáo nói có một tấm bảng đặt ngoài nhà thi đấu; học sinh tự ghi tên, ngày và quãng đường. Cô còn dặn phải trung thực vì không ai đi kiểm tra bảng đó cả.",
                "There is a chart outside the sports hall.",
              ),
              mcq(
                "What does the winning class receive?",
                "Lớp thắng cuộc được nhận gì?",
                [
                  "A large trophy.",
                  "Money for a school trip.",
                  "The right to choose the theme of the end-of-term party.",
                  "A free afternoon in the sports hall.",
                ],
                2,
                "Cô giáo nói phần thưởng chẳng tốn kém gì: lớp chạy được nhiều ki-lô-mét nhất sẽ được CHỌN CHỦ ĐỀ cho buổi liên hoan cuối kỳ. Chiếc cúp chỉ là thứ bạn nam mong đợi mà thôi.",
                "The class with the most kilometres chooses the theme of the end-of-term party.",
              ),
              tf(
                "The teacher thinks an experience is a better prize than an object.",
                "Cô giáo cho rằng một trải nghiệm là phần thưởng đáng giá hơn một món đồ.",
                true,
                "ĐÚNG. Khi bạn nam tiếc chiếc cúp, cô đáp rằng cúp rồi cũng bám bụi, còn một buổi liên hoan do chính các em nghĩ ra thì được nhớ lâu hơn nhiều — nghĩa là cô coi trọng trải nghiệm hơn hiện vật.",
                "A party that you designed yourselves is remembered much longer.",
              ),
            ],
          },
        ],
      },
      // ─────────────────────────── ĐỌC ───────────────────────────
      {
        skill: "READING",
        title: "Reading · Đọc hiểu",
        instructions:
          "Em đọc hai bài viết nêu ý kiến rồi chọn đáp án đúng. Có câu hỏi về Ý CHÍNH và câu hỏi về điều tác giả chỉ ngầm nói ra.",
        parts: [
          {
            title: "Part 1 · The Jacket That Would Not Die",
            instructions: "Đọc bài viết về một thí nghiệm nhỏ với quần áo cũ của cả lớp, rồi trả lời 4 câu hỏi.",
            passage: `Last year my class was asked to bring one piece of clothing that we no longer wanted. We collected ninety-four items in two days. Ninety-four, from thirty-one students. Nothing in that pile was worn out; most of it was simply boring.

Our teacher then told us that in her village, a jacket used to be passed from an older cousin to a younger one until it truly fell apart. If a sleeve tore, it was mended. If a button disappeared, another one was sewn on, and nobody minded that it was a different colour.

I know how this sounds. Nobody wants to be told that life was better before they were born, and I am not going to say it. Cheap clothes have given many people choices they never had. But something has clearly gone wrong when a jacket is thrown away because its owner is tired of it, not because it is broken.

Our class decided to try an experiment. Instead of throwing the ninety-four items away, we washed them, repaired what we could and set up a swap shop in the school hall. Every item found a new owner within a week, and forty families took part.

If every school did something similar, the effect would be small but real. More importantly, we learnt something that no lesson could have taught us: an object becomes valuable when somebody takes care of it. The jacket I chose that day is still in my wardrobe, and I have no plans to replace it.`,
            questions: [
              mcq(
                "What is the writer's main point?",
                "Ý chính của người viết là gì?",
                [
                  "Old clothes are always better than new ones.",
                  "An object only becomes valuable when somebody looks after it.",
                  "Schools should stop students from buying new clothes.",
                  "Everybody ought to learn how to sew.",
                ],
                1,
                "Câu quan trọng nhất nằm ở đoạn cuối: món đồ trở nên có giá trị khi có người chăm sóc nó. Bài KHÔNG nói đồ cũ luôn tốt hơn đồ mới — người viết còn thừa nhận quần áo rẻ đã mang lại nhiều lựa chọn cho mọi người.",
                "an object becomes valuable when somebody takes care of it",
              ),
              mcq(
                "What was the condition of most of the clothes the class collected?",
                "Phần lớn số quần áo cả lớp gom được đang ở tình trạng thế nào?",
                [
                  "They were torn and completely worn out.",
                  "They were far too small for the students.",
                  "They were still fine, but their owners found them boring.",
                  "They had all been bought that same week.",
                ],
                2,
                "Bài viết nói thẳng: chẳng món nào trong đống đồ đó bị sờn rách cả, đa số chỉ là… chán. Đây chính là chi tiết mở ra toàn bộ lập luận phía sau.",
                "Nothing in that pile was worn out; most of it was simply boring.",
              ),
              mcq(
                "What did the class do with the ninety-four items?",
                "Cả lớp đã làm gì với chín mươi tư món đồ đó?",
                [
                  "They gave them to a shop in the city centre.",
                  "They washed and repaired them and held a swap shop.",
                  "They threw them away after the lesson.",
                  "They sold them and gave the money to the school.",
                ],
                1,
                "Thay vì vứt đi, cả lớp giặt sạch, sửa những gì sửa được rồi mở một phiên đổi đồ ở hội trường trường. Chỉ trong một tuần món nào cũng có chủ mới.",
                "we washed them, repaired what we could and set up a swap shop in the school hall",
              ),
              mcq(
                "Why does the writer say \"I know how this sounds\"?",
                "Vì sao người viết lại nói \"I know how this sounds\" (Tớ biết nghe câu này thì như thế nào)?",
                [
                  "Because he is aware that praising the past can sound old-fashioned.",
                  "Because he could not hear his teacher clearly.",
                  "Because he disagrees with everything his teacher said.",
                  "Because he thinks cheap clothes should be banned.",
                ],
                0,
                "Ngay sau câu đó, người viết nói không ai thích bị bảo rằng ngày xưa mọi thứ tốt hơn, và bạn ấy sẽ KHÔNG nói vậy. Nghĩa là bạn ấy biết trước lời kể của cô giáo nghe rất dễ bị cho là cổ hủ, nên rào đón. Đó là hàm ý.",
              ),
            ],
          },
          {
            title: "Part 2 · Should Buses Be Free?",
            instructions: "Đọc bài viết về một thị trấn cho đi xe buýt miễn phí, rồi trả lời 4 câu hỏi.",
            passage: `Two years ago the town where my aunt lives did something unusual: it made every local bus free. No tickets, no machines, no arguments with the driver. You simply get on.

The plan was laughed at when it was announced. People said that the buses would be full of passengers going nowhere, and that the town would run out of money by the spring. Neither of those things happened. The number of journeys doubled, and because tickets no longer had to be printed, sold and checked, almost half of the extra cost was paid for by the savings.

There have been problems too, and it would be dishonest to hide them. Buses at eight in the morning are now uncomfortably crowded, and two more vehicles have had to be bought. Some drivers say that passengers treat the service with less respect when nothing is paid for it.

Still, my aunt is convinced. Before the change, she walked forty minutes to the market because a return ticket cost more than her vegetables. Now she goes twice a week and stays for a coffee afterwards.

Perhaps that is the real argument. If a bus is free, it is not only cheaper. It becomes something that belongs to everybody, and people use their own things far more often than they use somebody else's.`,
            questions: [
              mcq(
                "How did people react when the plan was first announced?",
                "Mọi người phản ứng thế nào khi kế hoạch mới được công bố?",
                [
                  "They welcomed it immediately.",
                  "They laughed at it and expected the town to run out of money.",
                  "They asked the town to buy more buses at once.",
                  "They refused to use the buses at all.",
                ],
                1,
                "Câu bị động mở đầu đoạn hai cho biết kế hoạch bị người ta CƯỜI NHẠO khi công bố; họ còn đoán đến mùa xuân thị trấn sẽ hết tiền. Nhưng cả hai điều đó đều không xảy ra.",
                "The plan was laughed at when it was announced.",
              ),
              mcq(
                "How was much of the extra cost covered?",
                "Phần lớn khoản chi phí phát sinh được bù đắp bằng cách nào?",
                [
                  "By the money saved on printing, selling and checking tickets.",
                  "By a new tax on cars.",
                  "By selling two old vehicles.",
                  "By charging passengers more at eight in the morning.",
                ],
                0,
                "Bài viết giải thích: vì không còn phải in vé, bán vé và soát vé nữa nên gần một nửa chi phí tăng thêm đã được bù bằng chính khoản tiết kiệm đó.",
                "because tickets no longer had to be printed, sold and checked, almost half of the extra cost was paid for by the savings",
              ),
              tf(
                "The writer hides the problems that free buses have caused.",
                "Người viết giấu đi những vấn đề mà xe buýt miễn phí gây ra.",
                false,
                "SAI. Người viết dành hẳn một đoạn để kể mặt trái: xe chật cứng lúc tám giờ sáng, phải mua thêm hai xe, tài xế thấy khách ít giữ ý hơn. Bạn ấy còn nói giấu những chuyện đó đi là không trung thực.",
                "There have been problems too, and it would be dishonest to hide them.",
              ),
              mcq(
                "What does the writer suggest in the last paragraph?",
                "Người viết ngầm nói lên điều gì ở đoạn cuối?",
                [
                  "People use and look after a service more when they feel it belongs to them.",
                  "Free buses always cost a town far too much money.",
                  "Walking to the market is healthier than taking a bus.",
                  "Drivers should decide which passengers may travel free.",
                ],
                0,
                "Đoạn cuối dùng câu điều kiện để nói xe buýt miễn phí không chỉ RẺ HƠN mà còn trở thành thứ THUỘC VỀ MỌI NGƯỜI, và ai cũng dùng đồ của mình thường xuyên hơn đồ của người khác. Ý ngầm là cảm giác sở hữu chung mới là điều thay đổi thói quen đi lại.",
              ),
            ],
          },
        ],
      },
      // ─────────────────────────── VIẾT ───────────────────────────
      {
        skill: "WRITING",
        title: "Writing · Viết",
        instructions:
          "Phần này AI chấm theo 4 tiêu chí: Ngữ pháp · Từ vựng · Mạch lạc · Bám đề. Viết xong hãy đọc lại một lượt để soát -s số nhiều, mạo từ và thì.",
        parts: [
          {
            title: "Part 1 · A post for the school website",
            instructions:
              "Viết tối thiểu 100 từ. Nên có câu mở nêu quan điểm, hai lý do kèm ví dụ thật, một đoạn nhìn nhận ý kiến trái chiều và một câu kết đề xuất cụ thể.",
            writingPrompt:
              "Trang web của trường em đang lấy ý kiến học sinh cho câu hỏi: \"Is it better to spend your free time outdoors or online?\" Hãy viết một bài khoảng 100–140 từ nêu quan điểm của em và bảo vệ nó bằng lý lẽ, có ví dụ từ chính cuộc sống của em. BẮT BUỘC dùng: (1) ít nhất một câu bị động (vd \"Our park was cleaned by volunteers.\"), (2) một câu điều kiện loại 2 (\"If I spent less time online, I would…\"), (3) một từ nối tương phản (however / although).",
            writingMinWords: 100,
          },
        ],
      },
    ],
  },
];
