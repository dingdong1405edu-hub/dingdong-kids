// Bài học BỔ SUNG cho cấp này — nối SAU danh sách gốc trong ../pet.ts.
//
// Tách file riêng để soạn thêm bài mà không phải mở file gốc (đã rất dài).
// ⚠️ Mỗi bài thêm ở đây PHẢI có một mục ngữ pháp tương ứng, ĐÚNG THỨ TỰ, trong
//    ../grammar/extra-pet.ts — nếu không `npm run content:check` sẽ báo lệch hàng.
//
// Giống file gốc, phần "Phonics" ở cấp này KHÔNG dạy chữ cái nữa mà dạy những
// chỗ người Việt nói tiếng Anh hay hỏng nhất: đuôi -s / -ed, cụm phụ âm cuối,
// âm /θ/ /ð/, /ʃ/ /tʃ/ và ngữ điệu câu hỏi đuôi.
import { type ChapterSeed, mcq, tf, word } from "../types";

export const CHAPTERS: ChapterSeed[] = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 4 · Thế giới đang đổi thay",
    subtitle: "Máy móc, quần áo và bữa cơm — những lựa chọn nhỏ làm nên thế giới lớn",
    lessons: [
      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Artificial Intelligence",
        topicVi: "Trí tuệ nhân tạo",
        icon: "🤖",
        words: [
          word("artificial intelligence", "/ˌɑːtɪfɪʃl ɪnˈtelɪdʒəns/", "trí tuệ nhân tạo (AI)", "🤖"),
          word("robot", "/ˈrəʊbɒt/", "người máy", "🦾"),
          word("machine", "/məˈʃiːn/", "cỗ máy", "⚙️"),
          word("data", "/ˈdeɪtə/", "dữ liệu", "📊"),
          word("translate", "/trænzˈleɪt/", "dịch (từ tiếng này sang tiếng khác)", "🔤"),
          word("predict", "/prɪˈdɪkt/", "đoán trước, dự đoán", "🔮"),
          word("replace", "/rɪˈpleɪs/", "thay thế", "🔁"),
          word("accurate", "/ˈækjərət/", "chính xác", "🎯"),
          word("creative", "/kriˈeɪtɪv/", "sáng tạo", "🎨"),
          word("imagination", "/ɪˌmædʒɪˈneɪʃn/", "trí tưởng tượng", "💭"),
          word("rely on", "/rɪˈlaɪ ɒn/", "trông cậy vào, dựa dẫm vào", "🧷"),
          word("check", "/tʃek/", "kiểm tra lại", "✔️"),
          word("tool", "/tuːl/", "công cụ", "🛠️"),
          word("worry about", "/ˈwʌri əbaʊt/", "lo lắng về điều gì", "😟"),
          word("in the future", "/ɪn ðə ˈfjuːtʃə(r)/", "trong tương lai", "⏭️"),
        ],
        sound: {
          letters: "Đuôi -s: /s/ · /z/ · /ɪz/",
          sound: "/s · z · ɪz/",
          hint: "Một chữ -s nhưng ba cách đọc: sau âm CÂM (p, t, k, f) đọc /s/ — robots /rɒbəts/; sau âm KÊU (b, d, g, m, n, l, nguyên âm) đọc /z/ — tools /tuːlz/, machines /məˈʃiːnz/; sau âm rít (s, z, ʃ, tʃ, dʒ) thêm hẳn một âm tiết /ɪz/ — watches /ˈwɒtʃɪz/. Tiếng Việt không có phụ âm bật ra cuối từ nên người Việt hay NUỐT LUÔN chữ -s: \"two robot\", \"he check\". Người nghe mất tín hiệu số nhiều và ngôi thứ ba, câu thành sai ngữ pháp dù bạn viết đúng. Cách sửa: đọc chậm, cố tình đẩy hơi ra sau từ, và nối luôn -s sang từ sau (robots are → \"robot-sar\").",
          words: [
            { word: "robots /ˈrəʊbɒts/", meaning: "-s đọc /s/ vì đứng sau âm câm /t/", emoji: "🦾" },
            { word: "machines /məˈʃiːnz/", meaning: "-s đọc /z/ vì đứng sau âm kêu /n/", emoji: "⚙️" },
            { word: "watches /ˈwɒtʃɪz/", meaning: "-es đọc /ɪz/ thành một âm tiết riêng", emoji: "⌚" },
            { word: "he checks /hiː tʃeks/", meaning: "Ngôi thứ ba số ít cũng phải nghe rõ -s", emoji: "✔️" },
          ],
        },
        reading: {
          title: "Can a Machine Do My Homework?",
          passage: `Last month our English teacher gave us a strange task. We had to write a short story about a robot, and we were allowed to use an artificial intelligence app for one part of the work.

I asked the app for ideas, and in three seconds it produced a whole story. It was correct, polite and completely boring. Every sentence was accurate, yet nothing in it sounded like me. My friend Trang laughed and said that the robot had written a story about a robot who had no imagination.

That lesson changed the way I think about AI. These tools are trained on enormous amounts of data, so they can translate a page, predict the next word in a sentence and check my spelling faster than any human. If I had to look up every new word in a paper dictionary, my homework would take twice as long.

However, a machine cannot feel anything. It has never been nervous before an exam or proud after a difficult test, so it cannot describe those feelings honestly. Facts can be found online in a second; a real voice cannot.

Some students worry about the future and ask whether we will all be replaced. I do not think so. AI will change many jobs, but the creative decisions must still be made by people. My advice is simple: use the tool, then read what it gives you and ask one question: is this true, and is this mine?`,
          translation: `Tháng trước cô giáo tiếng Anh giao cho tụi tớ một nhiệm vụ lạ. Tụi tớ phải viết một truyện ngắn về một con robot, và được phép dùng một ứng dụng trí tuệ nhân tạo cho một phần công việc.

Tớ hỏi ứng dụng xin ý tưởng, và trong ba giây nó cho ra hẳn một câu chuyện hoàn chỉnh. Truyện ấy đúng, lịch sự và chán ngắt. Câu nào cũng chính xác, vậy mà chẳng có chỗ nào nghe ra giọng của tớ cả. Trang, bạn tớ, cười bảo rằng con robot đã viết một câu chuyện về một con robot chẳng có chút tưởng tượng nào.

Bài học ấy làm tớ nghĩ khác về AI. Những công cụ này được huấn luyện trên khối lượng dữ liệu khổng lồ, nên chúng dịch được cả trang, đoán được từ tiếp theo trong câu và kiểm tra chính tả cho tớ nhanh hơn bất kỳ con người nào. Nếu tớ phải tra từng từ mới trong cuốn từ điển giấy thì bài tập của tớ sẽ mất gấp đôi thời gian.

Tuy nhiên, máy móc thì không cảm thấy gì cả. Nó chưa từng hồi hộp trước giờ thi hay tự hào sau một bài kiểm tra khó, nên nó không thể tả những cảm giác đó một cách thật lòng. Thông tin thì tìm trên mạng một giây là ra; còn một giọng nói thật thì không.

Có bạn lo cho tương lai và hỏi liệu rồi tất cả chúng ta có bị thay thế không. Tớ nghĩ là không. AI sẽ làm nhiều nghề thay đổi, nhưng những quyết định sáng tạo thì vẫn phải do con người đưa ra. Lời khuyên của tớ đơn giản thôi: cứ dùng công cụ, rồi đọc lại thứ nó đưa cho mình và tự hỏi một câu: cái này có đúng không, và cái này có phải của mình không?`,
          questions: [
            mcq(
              "What is the writer's main point about artificial intelligence?",
              "Ý chính của người viết về trí tuệ nhân tạo là gì?",
              [
                "Students should never use an AI app for schoolwork.",
                "AI is a fast tool, but people must add feeling and make the creative decisions.",
                "AI writes better stories than teenagers do.",
                "Paper dictionaries are more useful than any app.",
              ],
              1,
              "Bài viết công nhận AI rất nhanh và hữu ích (dịch, đoán từ, soát chính tả), NHƯNG nhấn mạnh máy không có cảm xúc và quyết định sáng tạo vẫn phải do con người. Đó là ý chính — không phải cấm dùng, cũng không phải khen AI viết hay hơn.",
            ),
            mcq(
              "What did the app give the writer?",
              "Ứng dụng đã đưa cho người viết thứ gì?",
              [
                "A list of new words to learn.",
                "A short poem about a teacher.",
                "A complete story that was correct but boring.",
                "A photograph of a robot.",
              ],
              2,
              "Bài viết kể rằng chỉ trong ba giây ứng dụng cho ra hẳn một câu chuyện hoàn chỉnh, và câu ngay sau đó nhận xét truyện ấy đúng, lịch sự nhưng chán ngắt.",
              "in three seconds it produced a whole story. It was correct, polite and completely boring",
            ),
            mcq(
              "What does the writer say about using a paper dictionary?",
              "Người viết nói gì về việc dùng từ điển giấy?",
              [
                "It would make homework take twice as long.",
                "It gives more accurate meanings than an app.",
                "The teacher does not allow it in class.",
                "It is the only way to learn new words.",
              ],
              0,
              "Người viết dùng câu điều kiện loại 2: NẾU phải tra từng từ mới trong từ điển giấy thì bài tập sẽ mất GẤP ĐÔI thời gian. Đây là lý do bạn ấy thấy công cụ AI hữu ích.",
              "If I had to look up every new word in a paper dictionary, my homework would take twice as long.",
            ),
            mcq(
              "What does Trang's joke suggest about the story the app wrote?",
              "Câu đùa của Trang ngầm nói lên điều gì về câu chuyện mà ứng dụng viết ra?",
              [
                "It was too long for the task.",
                "It had no personality of its own, just like a machine.",
                "It contained many spelling errors.",
                "It was copied from another student.",
              ],
              1,
              "Trang không chê thẳng câu chuyện. Nhưng câu đùa \"robot viết truyện về một robot không có trí tưởng tượng\" cho thấy bài viết ấy trống rỗng, không có cá tính riêng — đúng như một cỗ máy. Đó là hàm ý.",
            ),
            mcq(
              "Why can a machine not describe feelings honestly, according to the writer?",
              "Theo người viết, vì sao máy móc không thể tả cảm xúc một cách thật lòng?",
              [
                "Because it is not connected to the internet.",
                "Because it does not know enough words.",
                "Because it has never experienced those feelings.",
                "Because nobody has asked it to try.",
              ],
              2,
              "Bài viết nói máy chưa bao giờ hồi hộp trước kỳ thi hay tự hào sau một bài kiểm tra khó, NÊN nó không tả nổi những cảm giác ấy. Lý do là chưa từng trải qua, chứ không phải thiếu từ.",
              "It has never been nervous before an exam or proud after a difficult test, so it cannot describe those feelings honestly.",
            ),
            tf(
              "The writer believes that students will soon be replaced by AI.",
              "Người viết tin rằng học sinh sẽ sớm bị AI thay thế.",
              false,
              "SAI. Người viết nêu nỗi lo đó của các bạn khác rồi trả lời thẳng: tớ nghĩ là không. Bạn ấy cho rằng AI làm nhiều nghề đổi khác, nhưng quyết định sáng tạo vẫn thuộc về con người.",
              "I do not think so.",
            ),
          ],
        },
        listening: {
          title: "A father and daughter talk about a homework helper",
          transcript: `Dad: Is that homework or a game? You have been staring at that screen for an hour.

Girl: It is homework, Dad. I am using an AI app to check my English essay.

Dad: And does it tell you the right answer?

Girl: Usually. It found six mistakes, and it explained two of them quite well. But it also changed a sentence I liked, so I put my sentence back.

Dad: That is the part I like. When I was your age, my teacher told me that a calculator would make us all lazy, and I still learned maths.

Girl: Exactly. The app is a tool, not a brain. If I copied everything, I would learn nothing.

Dad: So what is your rule?

Girl: I write first, then I ask the app, then I decide. My teacher says the same thing: the machine can suggest, but the student has to choose.`,
          questions: [
            mcq(
              "What is the girl doing on her screen?",
              "Bạn nữ đang làm gì trên màn hình?",
              [
                "Playing a game with her friends.",
                "Checking her English essay with an AI app.",
                "Watching a video about robots.",
                "Writing a message to her teacher.",
              ],
              1,
              "Bạn nữ nói ngay với bố rằng đây là bài tập và bạn ấy đang dùng một ứng dụng AI để soát bài luận tiếng Anh.",
              "I am using an AI app to check my English essay.",
            ),
            mcq(
              "What did the girl do when the app changed a sentence she liked?",
              "Bạn nữ đã làm gì khi ứng dụng sửa mất một câu mà bạn ấy thích?",
              [
                "She deleted the whole paragraph.",
                "She asked her father to decide.",
                "She kept the app's sentence.",
                "She put her own sentence back.",
              ],
              3,
              "Bạn nữ kể ứng dụng tìm ra sáu lỗi, nhưng nó cũng đổi mất một câu bạn ấy thích, nên bạn ấy đã đưa câu của mình trở lại.",
              "it also changed a sentence I liked, so I put my sentence back",
            ),
            mcq(
              "What had Dad's teacher said about calculators?",
              "Thầy cô của bố đã từng nói gì về máy tính bỏ túi?",
              [
                "That they would make students lazy.",
                "That they were too expensive for school.",
                "That they should be used in every lesson.",
                "That they were more accurate than people.",
              ],
              0,
              "Bố kể lại bằng câu tường thuật: hồi bố bằng tuổi con, thầy cô bảo máy tính bỏ túi sẽ làm cả lớp lười đi — vậy mà bố vẫn học được toán.",
              "my teacher told me that a calculator would make us all lazy",
            ),
            tf(
              "The girl thinks she should copy everything the app writes.",
              "Bạn nữ cho rằng mình nên chép lại y hệt mọi thứ ứng dụng viết ra.",
              false,
              "SAI. Bạn ấy nói ứng dụng là công cụ chứ không phải bộ não, và dùng câu điều kiện loại 2 để khẳng định: nếu chép hết thì bạn ấy chẳng học được gì.",
              "If I copied everything, I would learn nothing.",
            ),
          ],
        },
        writingPrompt:
          "Trường em đang bàn xem có nên cho học sinh dùng ứng dụng AI khi làm bài tập ở nhà hay không. Hãy viết một đoạn 90–120 từ nêu Ý KIẾN của em. Bắt buộc dùng ít nhất một câu BỊ ĐỘNG có động từ khuyết thiếu (can be / should be / must be + V3) và một câu bắt đầu bằng 'However,' hoặc 'Although'.",
        writingOutline:
          "1. Câu mở: nêu thẳng quan điểm của em (In my opinion, AI apps should…).\n2. Một lợi ích có ví dụ thật của em (tra từ, soát chính tả, dịch một đoạn khó).\n3. Một rủi ro, mở đầu bằng 'However,' hoặc 'Although' — cho thấy em nghĩ cả hai chiều.\n4. Một câu bị động có modal: 'Homework should not be written by a machine.' / 'The answer must be checked by the student.'\n5. Câu kết: một quy tắc cụ thể em đề xuất cho lớp mình, không nói chung chung.",
        speaking: {
          sentences: [
            "Artificial intelligence can translate a page in a few seconds.",
            "These tools are trained on enormous amounts of data.",
            "A machine has never been nervous before an exam.",
            "Creative decisions must still be made by people.",
            "Do you rely on an app when you do your homework?",
            "I use the tool first, and then I check every sentence myself.",
          ],
          questions: [
            {
              question: "Do you use any AI tools for schoolwork? How?",
              sampleAnswer:
                "I use one to check my spelling and to explain difficult grammar. I never ask it to write the whole answer, because my teacher can hear immediately that the voice is not mine.",
            },
            {
              question: "What is one thing a machine can do better than a person?",
              sampleAnswer:
                "A machine can search enormous amounts of data in a second. If I had to find the same information in books, it would take me a whole afternoon.",
            },
            {
              question: "What is one thing a person can do better than a machine?",
              sampleAnswer:
                "A person can describe real feelings. A machine has never been proud or nervous, so its stories sound accurate but empty.",
            },
            {
              question: "Do you worry about robots taking jobs in the future? Why?",
              sampleAnswer:
                "I worry a little, because some simple jobs will certainly be replaced. However, new jobs are created too, so I would rather learn how to use these tools than be afraid of them.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Fast Fashion",
        topicVi: "Thời trang mì ăn liền",
        icon: "👕",
        words: [
          word("fashion", "/ˈfæʃn/", "thời trang", "👗"),
          word("clothes", "/kləʊðz/", "quần áo", "👕"),
          word("cheap", "/tʃiːp/", "rẻ", "🏷️"),
          word("brand", "/brænd/", "nhãn hiệu, thương hiệu", "🔖"),
          word("factory", "/ˈfæktri/", "nhà máy", "🏭"),
          word("cotton", "/ˈkɒtn/", "vải bông, sợi bông", "🧵"),
          word("waste", "/weɪst/", "sự lãng phí; rác thải", "🗑️"),
          word("second-hand", "/ˌsekəndˈhænd/", "đồ cũ, đồ đã qua tay người khác", "♻️"),
          word("repair", "/rɪˈpeə(r)/", "sửa, vá lại", "🧰"),
          word("quality", "/ˈkwɒləti/", "chất lượng", "🌟"),
          word("trend", "/trend/", "trào lưu, xu hướng", "📈"),
          word("throw away", "/θrəʊ əˈweɪ/", "vứt đi", "🚮"),
          word("enough", "/ɪˈnʌf/", "đủ", "👌"),
          word("last", "/lɑːst/", "bền, dùng được lâu", "⏳"),
          word("swap", "/swɒp/", "đổi cho nhau", "🔄"),
        ],
        sound: {
          letters: "Đuôi -ed: /t/ · /d/ · /ɪd/",
          sound: "/t · d · ɪd/",
          hint: "Đuôi -ed cũng có ba cách đọc: sau âm CÂM (p, k, f, s, ʃ, tʃ) đọc /t/ — washed /wɒʃt/; sau âm KÊU và nguyên âm đọc /d/ — repaired /rɪˈpeəd/; chỉ khi từ đã kết thúc bằng /t/ hoặc /d/ mới thêm hẳn âm tiết /ɪd/ — wanted /ˈwɒntɪd/, lasted /ˈlɑːstɪd/. Người Việt hay mắc hai lỗi ngược nhau: NUỐT hẳn đuôi -ed (\"I wash it yesterday\") nên người nghe tưởng đang nói hiện tại; hoặc đọc thừa /ɪd/ cho MỌI từ (\"washed\" thành \"wash-ịt\"). Mẹo: chỉ thêm âm tiết khi lưỡi đã ở sẵn vị trí /t/ hay /d/.",
          words: [
            { word: "washed /wɒʃt/", meaning: "-ed đọc /t/ vì đứng sau âm câm /ʃ/", emoji: "🧼" },
            { word: "repaired /rɪˈpeəd/", meaning: "-ed đọc /d/ vì đứng sau nguyên âm", emoji: "🧰" },
            { word: "wanted /ˈwɒntɪd/", meaning: "-ed thành âm tiết /ɪd/ vì từ kết thúc bằng /t/", emoji: "🙋" },
            { word: "lasted /ˈlɑːstɪd/", meaning: "-ed thành âm tiết /ɪd/ vì từ kết thúc bằng /t/", emoji: "⏳" },
          ],
        },
        reading: {
          title: "The T-shirt That Cost Almost Nothing",
          passage: `Last winter I bought a T-shirt for the price of two bowls of noodles. I wore it four times. Then the shoulder tore, the colour faded, and it went into the bin.

That shirt is a small example of a huge trend. Clothes are now made so quickly and so cheaply that many of us buy far more than we need. A jacket that once had to last for years is now expected to last for a season. Some big brands put new designs in their shops every single week.

Cheap clothes are not free, though; somebody else pays. Around two thousand litres of water are used to grow the cotton for one T-shirt, and factory workers in several countries are paid very little for long days. Mountains of waste appear outside cities where old clothes are dumped and burned.

I am not saying that we should never buy anything new. I love a bright new shirt as much as anyone. However, if every teenager in my school bought five fewer items a year, the difference would be enormous.

There are easy first steps. Repair a small hole instead of throwing the whole shirt away. Swap clothes with a cousin. Look in second-hand shops, where the quality is often better than in fast-fashion stores. Ask one simple question before you pay: will I still wear this in a year?`,
          translation: `Mùa đông năm ngoái tớ mua một chiếc áo phông với giá bằng hai bát phở. Tớ mặc nó bốn lần. Rồi phần vai bị rách, màu áo bạc đi, và nó đi thẳng vào thùng rác.

Chiếc áo ấy là một ví dụ nhỏ của một trào lưu rất lớn. Quần áo bây giờ được sản xuất nhanh đến thế, rẻ đến thế, khiến nhiều người trong chúng ta mua nhiều hơn hẳn mức mình cần. Một chiếc áo khoác ngày trước phải bền hàng năm trời, giờ chỉ được kỳ vọng bền qua một mùa. Có những thương hiệu lớn tung mẫu mới ra cửa hàng mỗi tuần.

Nhưng quần áo rẻ không hề miễn phí; có người khác đang trả tiền thay ta. Khoảng hai nghìn lít nước được dùng để trồng bông cho một chiếc áo phông, và công nhân nhà máy ở nhiều nước được trả rất ít cho những ngày làm việc dài. Những núi rác mọc lên ở ngoại ô các thành phố, nơi quần áo cũ bị đổ đống và đốt đi.

Tớ không nói rằng chúng ta đừng bao giờ mua đồ mới. Tớ cũng mê một chiếc áo mới sáng màu chẳng kém ai. Tuy nhiên, nếu mỗi bạn học sinh ở trường tớ mua ít đi năm món một năm thì khác biệt sẽ khổng lồ.

Có những bước đầu tiên rất dễ. Vá một lỗ thủng nhỏ thay vì vứt cả chiếc áo đi. Đổi quần áo với anh chị em họ. Ghé các cửa hàng đồ cũ, nơi chất lượng thường còn tốt hơn ở các cửa hàng thời trang nhanh. Trước khi trả tiền, hãy tự hỏi một câu đơn giản: một năm nữa mình còn mặc cái này không?`,
          questions: [
            mcq(
              "What is the writer's main argument?",
              "Lập luận chính của người viết là gì?",
              [
                "Nobody should ever buy new clothes again.",
                "Expensive clothes always have better quality than cheap ones.",
                "We buy far too many cheap clothes, and other people and the planet pay for them.",
                "Second-hand shops are the only place teenagers should shop.",
              ],
              2,
              "Bài viết đi từ một chiếc áo hỏng sau bốn lần mặc, sang chuyện mua quá nhiều, rồi tới cái giá thật: nước, công nhân, núi rác. Đó là ý chính. Bạn ấy không hề cấm mua đồ mới, cũng không nói đắt là tốt.",
            ),
            mcq(
              "How many times did the writer wear the T-shirt?",
              "Người viết đã mặc chiếc áo phông bao nhiêu lần?",
              ["Four times.", "Twice.", "Every day for a season.", "Only once."],
              0,
              "Ngay đầu bài, người viết kể mua áo rồi mặc bốn lần, sau đó áo rách vai và bạc màu.",
              "I wore it four times.",
            ),
            mcq(
              "How much water is needed for the cotton in one T-shirt?",
              "Cần bao nhiêu nước cho phần bông làm ra một chiếc áo phông?",
              [
                "Around two hundred litres.",
                "Around two thousand litres.",
                "Around twenty litres.",
                "The passage does not say.",
              ],
              1,
              "Bài viết nêu con số rất rõ: khoảng hai nghìn lít nước được dùng để trồng bông cho một chiếc áo phông.",
              "Around two thousand litres of water are used to grow the cotton for one T-shirt",
            ),
            mcq(
              "Why does the writer mention second-hand shops?",
              "Vì sao người viết nhắc tới các cửa hàng đồ cũ?",
              [
                "Because the clothes there are always free.",
                "Because they are the closest shops to the school.",
                "Because the quality there is often better than in fast-fashion stores.",
                "Because they only sell clothes for teenagers.",
              ],
              2,
              "Trong phần các bước dễ làm, người viết khuyên ghé cửa hàng đồ cũ và nêu lý do luôn: chất lượng ở đó thường còn tốt hơn cửa hàng thời trang nhanh.",
              "Look in second-hand shops, where the quality is often better than in fast-fashion stores.",
            ),
            mcq(
              "What does the writer suggest by asking, 'will I still wear this in a year?'",
              "Khi hỏi 'một năm nữa mình còn mặc cái này không?', người viết ngầm khuyên điều gì?",
              [
                "That we should think about how long we will really use something before we buy it.",
                "That clothes should be thrown away after one year.",
                "That we should only buy clothes in winter.",
                "That teenagers change size too quickly to buy anything.",
              ],
              0,
              "Câu hỏi này không cần trả lời ngay tại quầy. Nó là cách người viết nhắc ta cân nhắc mình sẽ dùng món đồ được BAO LÂU trước khi trả tiền — đó là hàm ý của cả đoạn kết.",
            ),
            tf(
              "The writer thinks nobody should ever buy new clothes.",
              "Người viết cho rằng đừng ai nên mua quần áo mới nữa.",
              false,
              "SAI. Người viết nói thẳng rằng mình KHÔNG hề bảo đừng bao giờ mua đồ mới, và còn thừa nhận bản thân cũng thích một chiếc áo mới sáng màu. Ý bạn ấy là mua ít đi và dùng lâu hơn.",
              "I am not saying that we should never buy anything new.",
            ),
          ],
        },
        listening: {
          title: "Two friends outside a clothes shop",
          transcript: `Girl: Look, this jacket is only ninety thousand. I have wanted one like this for months.

Boy: It is cheap, but feel it. The cotton is very thin, and the buttons are already loose.

Girl: True. My last cheap jacket lasted about six weeks.

Boy: My sister has been buying second-hand for a year now. She says she spends less money and gets better quality.

Girl: Does she not mind wearing old clothes?

Boy: She repairs them. She taught me how to sew a button on, and it took five minutes.

Girl: All right. If I waited until Saturday, we could go to that second-hand market together.

Boy: Good plan. And bring the two shirts you never wear, because you can swap them there.`,
          questions: [
            mcq(
              "What is wrong with the jacket, according to the boy?",
              "Theo bạn nam, chiếc áo khoác có vấn đề gì?",
              [
                "It is the wrong size.",
                "The cotton is thin and the buttons are loose.",
                "The colour has already faded.",
                "It is far too expensive.",
              ],
              1,
              "Bạn nam công nhận áo rẻ nhưng bảo bạn nữ sờ thử: vải bông rất mỏng và cúc áo thì đã lỏng sẵn rồi.",
              "The cotton is very thin, and the buttons are already loose.",
            ),
            mcq(
              "How long has the boy's sister been buying second-hand clothes?",
              "Chị của bạn nam đã mua đồ cũ được bao lâu rồi?",
              ["For six weeks.", "For a month.", "For a year.", "Since Saturday."],
              2,
              "Bạn nam dùng thì hiện tại hoàn thành tiếp diễn để nói việc đó bắt đầu trong quá khứ và vẫn đang tiếp tục: chị ấy đã mua đồ cũ được một năm nay.",
              "My sister has been buying second-hand for a year now.",
            ),
            mcq(
              "What does the boy suggest the girl brings to the market?",
              "Bạn nam gợi ý bạn nữ mang gì tới khu chợ đồ cũ?",
              [
                "Two shirts she never wears, to swap.",
                "The jacket she wants to return.",
                "Some needles and buttons.",
                "Her sister's old clothes.",
              ],
              0,
              "Cuối đoạn hội thoại, bạn nam dặn mang hai chiếc áo mà bạn nữ chẳng bao giờ mặc, vì ở chợ đó có thể đem đổi lấy đồ khác.",
              "bring the two shirts you never wear, because you can swap them there",
            ),
            tf(
              "The girl's last cheap jacket lasted for several years.",
              "Chiếc áo khoác rẻ tiền lần trước của bạn nữ đã bền được vài năm.",
              false,
              "SAI. Bạn nữ tự thừa nhận chiếc áo khoác rẻ tiền lần trước chỉ bền được khoảng sáu tuần.",
              "My last cheap jacket lasted about six weeks.",
            ),
          ],
        },
        writingPrompt:
          "Câu lạc bộ môi trường của trường em đang làm một tờ rơi với chủ đề 'Mua ít đi, mặc lâu hơn'. Hãy viết một đoạn 90–120 từ thuyết phục các bạn cùng lớp. Bắt buộc dùng ít nhất một câu với 'too many' hoặc 'too much', và một câu với 'enough'.",
        writingOutline:
          "1. Mở bài bằng một con số hoặc một chuyện thật (chiếc áo hỏng sau vài lần mặc).\n2. Vấn đề: 'We buy too many cheap clothes.' — nêu vì sao đó là vấn đề.\n3. Cái giá thật: nước, nhà máy, núi rác — chọn MỘT ý và nói cho kỹ.\n4. Một câu với 'enough': 'Most of us already have enough T-shirts.'\n5. Ba việc làm được ngay: repair · swap · buy second-hand. Kết bằng một lời mời tham gia.",
        speaking: {
          sentences: [
            "Clothes are now made very quickly and very cheaply.",
            "I have too many T-shirts and not enough space.",
            "This jacket is not strong enough for winter.",
            "My sister has been buying second-hand for a year.",
            "Could you repair this small hole instead of throwing it away?",
            "If we bought fewer clothes, factories would use less water.",
          ],
          questions: [
            {
              question: "How often do you buy new clothes?",
              sampleAnswer:
                "Only a few times a year, usually before Tet. My mother says that one good jacket lasts longer than three cheap ones, and she is right.",
            },
            {
              question: "Have you ever repaired a piece of clothing? Tell me about it.",
              sampleAnswer:
                "Yes. My grandmother taught me to sew a button on, and last month I repaired my school shirt in five minutes. I felt quite proud of it.",
            },
            {
              question: "What do you think about second-hand shops?",
              sampleAnswer:
                "I like them. The quality is often better than in fast-fashion stores, and you find things that nobody else at school is wearing.",
            },
            {
              question: "If your school organised a clothes swap, would you join? Why?",
              sampleAnswer:
                "I would definitely join. I have three shirts I never wear, and swapping them costs nothing. It would also be a good way to reduce waste.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Food Waste",
        topicVi: "Đừng bỏ phí thức ăn",
        icon: "🍚",
        words: [
          word("leftovers", "/ˈleftəʊvəz/", "đồ ăn thừa còn lại", "🍱"),
          word("fridge", "/frɪdʒ/", "tủ lạnh", "🧊"),
          word("fresh", "/freʃ/", "tươi, còn mới", "🥬"),
          word("rotten", "/ˈrɒtn/", "hỏng, ung, thối", "🍌"),
          word("bin", "/bɪn/", "thùng rác", "🗑️"),
          word("portion", "/ˈpɔːʃn/", "phần ăn", "🍽️"),
          word("shopping list", "/ˈʃɒpɪŋ lɪst/", "danh sách đi chợ", "📝"),
          word("donate", "/dəʊˈneɪt/", "quyên góp, đem cho", "🎁"),
          word("hungry", "/ˈhʌŋɡri/", "đói", "🥣"),
          word("reduce", "/rɪˈdjuːs/", "giảm bớt", "📉"),
          word("container", "/kənˈteɪnə(r)/", "hộp đựng thức ăn", "🥡"),
          word("use-by date", "/ˈjuːz baɪ deɪt/", "hạn sử dụng", "📆"),
          word("smell", "/smel/", "ngửi; có mùi", "👃"),
          word("habit", "/ˈhæbɪt/", "thói quen", "🔁"),
          word("guilty", "/ˈɡɪlti/", "áy náy, thấy có lỗi", "😔"),
        ],
        sound: {
          letters: "Cụm phụ âm cuối từ",
          sound: "/-sts · -nds · -kt/",
          hint: "Tiếng Anh cho phép hai, ba phụ âm dính nhau ở cuối từ: lists /lɪsts/, friends /frendz/, asked /ɑːskt/, months /mʌnθs/. Tiếng Việt thì mỗi tiếng chỉ kết bằng MỘT phụ âm, nên người Việt hay xử lý theo hai kiểu sai: bỏ bớt phụ âm (\"lis\" thay cho lists, \"as\" thay cho asked) hoặc chèn thêm nguyên âm cho dễ đọc (\"list-sờ\"). Cách sửa: đọc chậm, giữ nguyên hình miệng và chỉ nhả hơi RẤT NHẸ cho phụ âm cuối cùng; đừng thêm nguyên âm nào. Mẹo nối: nếu từ sau bắt đầu bằng nguyên âm thì kéo phụ âm cuối sang (asked a friend → \"as-kta friend\").",
          words: [
            { word: "lists /lɪsts/", meaning: "Ba phụ âm dính nhau: s + t + s", emoji: "📝" },
            { word: "friends /frendz/", meaning: "n + d + z, không được rơi mất chữ nào", emoji: "🧑‍🤝‍🧑" },
            { word: "asked /ɑːskt/", meaning: "s + k + t — không đọc thành \"át-kịt\"", emoji: "🙋" },
            { word: "months /mʌnθs/", meaning: "n + θ + s, giữ đầu lưỡi ở răng cho /θ/", emoji: "📆" },
          ],
        },
        reading: {
          title: "The Bin That Told the Truth",
          passage: `For one week our class did an unusual experiment. Every family had to weigh the food that went into the bin at home and write the number on a chart. My family threw away two and a half kilograms in seven days. The class total was over sixty kilograms.

Nobody in my family is careless. My mother cooks well and my grandmother remembers hungry years, so food waste is not a joke in our house. Still, the numbers were there: half a pot of rice, a bag of green vegetables that had turned yellow at the back of the fridge, and three bananas that nobody wanted once they had brown spots.

Then we looked for reasons. Most of our waste came from shopping without a list and from cooking a bigger portion than we could eat. The vegetables were fresh when we bought them; they simply disappeared behind a container of leftovers and were forgotten.

The good news is that a small habit fixes a large problem. Now we plan meals on Sunday, we keep older food at the front of the fridge, and we check the use-by date before we cook. If food is still fine but we cannot eat it, my mother sends it to our neighbour.

I used to feel a little guilty when I threw a plate of rice away. Now I do not have to, because the plate is usually empty.`,
          translation: `Suốt một tuần, lớp tớ làm một thí nghiệm khác thường. Mỗi gia đình phải cân số thức ăn bị bỏ vào thùng rác ở nhà rồi ghi con số ấy lên một tờ biểu. Nhà tớ vứt đi hai cân rưỡi trong bảy ngày. Cả lớp cộng lại là hơn sáu mươi cân.

Nhà tớ chẳng ai cẩu thả cả. Mẹ tớ nấu ăn khéo, bà tớ thì còn nhớ những năm đói kém, nên chuyện phí đồ ăn không phải chuyện đùa trong nhà tớ. Vậy mà con số vẫn nằm đó: nửa nồi cơm, một túi rau xanh đã ngả vàng ở góc trong tủ lạnh, và ba quả chuối chẳng ai muốn ăn khi chúng đã lấm tấm đốm nâu.

Rồi tụi tớ đi tìm nguyên nhân. Phần lớn chỗ lãng phí ấy đến từ việc đi chợ không có danh sách và từ việc nấu phần ăn nhiều hơn sức ăn của cả nhà. Rau lúc mua về vẫn còn tươi; chúng chỉ đơn giản là biến mất sau một hộp đồ ăn thừa rồi bị quên lãng.

Tin vui là một thói quen nhỏ chữa được một vấn đề lớn. Bây giờ nhà tớ lên thực đơn vào Chủ nhật, để đồ cũ ra phía trước tủ lạnh, và xem hạn sử dụng trước khi nấu. Nếu đồ ăn vẫn còn tốt mà nhà tớ không ăn hết, mẹ tớ sẽ đem sang cho nhà hàng xóm.

Trước đây tớ hay thấy hơi áy náy mỗi lần đổ đi một đĩa cơm. Giờ thì tớ không phải áy náy nữa, vì cái đĩa thường đã sạch bong.`,
          questions: [
            mcq(
              "What is the main message of the passage?",
              "Thông điệp chính của bài đọc là gì?",
              [
                "Families should stop buying vegetables.",
                "Most food waste comes from small everyday habits, and small changes can fix it.",
                "Only careless families waste food.",
                "Weighing food is the best way to save money.",
              ],
              1,
              "Bài viết cho thấy một gia đình cẩn thận vẫn bỏ phí hai cân rưỡi mỗi tuần, rồi chỉ ra nguyên nhân là thói quen hằng ngày (không có danh sách, nấu quá nhiều) và kết bằng những thay đổi nhỏ đã có hiệu quả.",
            ),
            mcq(
              "How much food did the writer's family throw away in one week?",
              "Gia đình người viết đã bỏ đi bao nhiêu thức ăn trong một tuần?",
              [
                "Two and a half kilograms.",
                "Over sixty kilograms.",
                "Half a kilogram.",
                "Seven kilograms.",
              ],
              0,
              "Nhà người viết bỏ hai cân rưỡi trong bảy ngày; con số hơn sáu mươi cân là tổng của CẢ LỚP, không phải của riêng một nhà.",
              "My family threw away two and a half kilograms in seven days.",
            ),
            mcq(
              "What were the two main reasons for the waste?",
              "Hai nguyên nhân chính gây lãng phí là gì?",
              [
                "A broken fridge and a small kitchen.",
                "Cooking too fast and eating too late.",
                "Shopping without a list and cooking too much.",
                "Buying vegetables that were not fresh.",
              ],
              2,
              "Bài viết nói rõ phần lớn chỗ lãng phí đến từ việc đi chợ mà không có danh sách và từ việc nấu phần ăn lớn hơn mức cả nhà ăn nổi.",
              "Most of our waste came from shopping without a list and from cooking a bigger portion than we could eat.",
            ),
            mcq(
              "Why does the writer mention the grandmother?",
              "Vì sao người viết nhắc tới người bà?",
              [
                "To show that the family already cares about food, so the result was a surprise.",
                "To explain who does the shopping in the family.",
                "To show that older people waste more food.",
                "To describe how the family cooks rice.",
              ],
              0,
              "Chi tiết bà còn nhớ những năm đói kém được đưa ra để nói: nhà này vốn đã coi trọng thức ăn. Chính vì thế con số trên tờ biểu mới gây bất ngờ — đó là hàm ý của đoạn hai.",
            ),
            mcq(
              "What happens now to food the family cannot eat?",
              "Bây giờ thức ăn mà cả nhà không ăn hết sẽ được xử lý thế nào?",
              [
                "It is frozen for the following month.",
                "It goes into the bin immediately.",
                "It is sent to a neighbour.",
                "It is fed to the family's dog.",
              ],
              2,
              "Đoạn bốn cho biết nếu đồ ăn vẫn còn tốt mà nhà không ăn hết thì mẹ đem sang cho nhà hàng xóm.",
              "If food is still fine but we cannot eat it, my mother sends it to our neighbour.",
            ),
            tf(
              "The vegetables were already old when the family bought them.",
              "Số rau ấy đã cũ sẵn từ lúc gia đình mua về.",
              false,
              "SAI. Bài viết nói rau vẫn còn TƯƠI khi mua; chúng chỉ bị lấp sau một hộp đồ ăn thừa rồi bị quên đi cho tới lúc ngả vàng.",
              "The vegetables were fresh when we bought them",
            ),
          ],
        },
        listening: {
          title: "In the kitchen on Sunday morning",
          transcript: `Mum: Can you open the fridge and smell this soup for me?

Boy: It smells fine, Mum. When did you make it?

Mum: On Thursday. If it smells fine and it looks fine, we will eat it tonight.

Boy: What about these tomatoes? Two of them are rotten.

Mum: Put those two in the garden bin, because they can go on the compost heap. The others are still good.

Boy: Grandma says her school is collecting food for hungry families this month.

Mum: Then we can donate the big bag of rice we will never finish. Write it on the shopping list so I do not buy more.

Boy: Done. And can we cook a smaller portion tonight? We always keep leftovers that we forget.`,
          questions: [
            mcq(
              "When did Mum make the soup?",
              "Mẹ nấu nồi canh đó khi nào?",
              ["On Sunday.", "On Thursday.", "This morning.", "Last month."],
              1,
              "Khi cậu bé hỏi mẹ nấu canh lúc nào, mẹ trả lời là hôm thứ Năm, và nói thêm nếu canh còn thơm và nhìn vẫn ổn thì tối nay cả nhà sẽ ăn.",
              "On Thursday. If it smells fine and it looks fine, we will eat it tonight.",
            ),
            mcq(
              "What will happen to the two rotten tomatoes?",
              "Hai quả cà chua bị hỏng sẽ được xử lý thế nào?",
              [
                "They will be cooked tonight.",
                "They will be given to a neighbour.",
                "They will go in the garden bin for compost.",
                "They will be put back in the fridge.",
              ],
              2,
              "Mẹ bảo cho hai quả hỏng vào thùng rác ngoài vườn vì chúng có thể đem ủ làm phân; những quả còn lại vẫn dùng được.",
              "Put those two in the garden bin, because they can go on the compost heap.",
            ),
            mcq(
              "What does the boy suggest for dinner?",
              "Cậu bé đề nghị gì cho bữa tối?",
              [
                "Cooking a smaller portion.",
                "Ordering food from a shop.",
                "Cooking rice instead of soup.",
                "Eating at his grandmother's house.",
              ],
              0,
              "Câu cuối của cậu bé là một đề nghị: tối nay nhà mình nấu phần nhỏ hơn được không, vì nhà mình lúc nào cũng để lại đồ thừa rồi quên mất.",
              "can we cook a smaller portion tonight?",
            ),
            tf(
              "Mum plans to buy more rice this week.",
              "Tuần này mẹ định mua thêm gạo.",
              false,
              "SAI. Ngược lại: mẹ định đem tặng bao gạo lớn mà nhà không ăn hết, và còn dặn ghi vào danh sách đi chợ để mẹ KHÔNG mua thêm nữa.",
              "Write it on the shopping list so I do not buy more.",
            ),
          ],
        },
        writingPrompt:
          "Lớp em vừa làm khảo sát về lượng thức ăn bị bỏ phí ở nhà. Hãy viết một đoạn 90–120 từ kể lại kết quả và đề xuất cách giảm lãng phí. Bắt buộc dùng ít nhất một câu điều kiện loại 1 (If + hiện tại đơn, … will …) và một câu với 'unless'.",
        writingOutline:
          "1. Mở bài: kể ngắn gọn khảo sát và MỘT con số gây ấn tượng.\n2. Nguyên nhân thứ nhất (đi chợ không có danh sách) kèm ví dụ thật.\n3. Nguyên nhân thứ hai (nấu quá nhiều, quên đồ trong tủ lạnh).\n4. Một câu điều kiện loại 1: 'If we plan our meals, we will waste less food.'\n5. Một câu với 'unless' và lời kêu gọi: 'Unless we change these habits, the bin will stay full.'",
        speaking: {
          sentences: [
            "My family threw away two and a half kilograms of food in one week.",
            "We keep older food at the front of the fridge.",
            "If we plan our meals, we will waste less food.",
            "Unless you check the use-by date, you will eat something rotten.",
            "We can donate the rice that we will never finish.",
            "Could we cook a smaller portion tonight?",
          ],
          questions: [
            {
              question: "Does your family throw away much food? Why?",
              sampleAnswer:
                "We used to throw away quite a lot, mostly vegetables that were forgotten at the back of the fridge. Since we started making a shopping list, the bin has been much emptier.",
            },
            {
              question: "What do you usually do with leftovers?",
              sampleAnswer:
                "I put them in a container and take them to school the next day. Cold rice with an egg is still delicious, and it costs my family nothing.",
            },
            {
              question: "What could your school do to reduce food waste?",
              sampleAnswer:
                "The canteen could offer two portion sizes. If students chose the smaller plate, a lot less food would go into the bin every lunchtime.",
            },
            {
              question: "Is it ever right to throw food away?",
              sampleAnswer:
                "Yes, when it is truly rotten and could make somebody ill. The important thing is to notice it early, so that most of it can still be eaten or donated.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    title: "Chương 5 · Sống cân bằng",
    subtitle: "Giữ đầu óc nhẹ nhàng, đứng dậy sau thất bại và tử tế trên mạng",
    lessons: [
      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Mental Health",
        topicVi: "Chăm sóc tinh thần",
        icon: "💚",
        words: [
          word("mind", "/maɪnd/", "tâm trí, đầu óc", "🧠"),
          word("stress", "/stres/", "sự căng thẳng", "😣"),
          word("worried", "/ˈwʌrid/", "lo lắng", "😟"),
          word("relax", "/rɪˈlæks/", "thư giãn", "🛋️"),
          word("sleep", "/sliːp/", "giấc ngủ; ngủ", "😴"),
          word("breathe", "/briːð/", "hít thở", "🌬️"),
          word("share", "/ʃeə(r)/", "chia sẻ (chuyện của mình)", "🤲"),
          word("support", "/səˈpɔːt/", "sự giúp đỡ, chỗ dựa", "🫶"),
          word("pressure", "/ˈpreʃə(r)/", "áp lực", "🎈"),
          word("mood", "/muːd/", "tâm trạng", "🎭"),
          word("calm", "/kɑːm/", "bình tĩnh", "🕊️"),
          word("exercise", "/ˈeksəsaɪz/", "vận động, tập thể dục", "🏃"),
          word("counsellor", "/ˈkaʊnsələ(r)/", "chuyên viên tư vấn tâm lý học đường", "🧑‍⚕️"),
          word("confident", "/ˈkɒnfɪdənt/", "tự tin", "💪"),
          word("cheer up", "/tʃɪər ʌp/", "làm ai đó vui lên", "🌈"),
        ],
        sound: {
          letters: "th: /θ/ và /ð/",
          sound: "/θ · ð/",
          hint: "Hai chữ th nhưng hai âm khác nhau, và cả hai đều KHÔNG có trong tiếng Việt. /θ/ là âm câm — think, healthy, month; /ð/ là âm kêu (dây thanh rung) — this, they, breathe. Người Việt hay thay /θ/ bằng /t/ (think thành \"tink\") và thay /ð/ bằng /d/ hoặc /z/ (this thành \"dis\"). Cách sửa: đặt ĐẦU LƯỠI chạm nhẹ mép dưới của răng cửa trên rồi thổi hơi ra qua khe — nếu lưỡi còn nằm trong miệng thì chắc chắn bạn đang đọc thành /t/ hay /d/. Nhớ luyện cả th ở CUỐI từ (month, health) vì đây là chỗ người Việt hay nuốt mất.",
          words: [
            { word: "think /θɪŋk/", meaning: "/θ/ câm — không đọc thành \"tink\"", emoji: "🤔" },
            { word: "healthy /ˈhelθi/", meaning: "/θ/ nằm giữa từ, lưỡi vẫn phải ra răng", emoji: "🥗" },
            { word: "this /ðɪs/", meaning: "/ð/ kêu — không đọc thành \"dis\"", emoji: "👉" },
            { word: "breathe /briːð/", meaning: "/ð/ ở cuối từ, đừng nuốt mất", emoji: "🌬️" },
          ],
        },
        reading: {
          title: "The Week Before the Exams",
          passage: `Two weeks before our end-of-term exams, my best friend Khoa stopped talking in class. He is usually the loudest person in our group, so everybody noticed. He said that he was fine, but he had not slept properly for days and he had stopped playing football at the weekend.

Adults often tell teenagers that we have no reason to feel stress. I disagree. We may not pay bills, but the pressure is real: exams, marks, comparisons with cousins, and a phone that shows us a hundred perfect lives before breakfast.

The good news is that a worried mind is not a broken mind. Our school counsellor gave our class three simple rules, and they helped Khoa more than any advice from me. First, sleep is not laziness; it is repair. Second, move your body, because twenty minutes of exercise changes your mood faster than an hour of scrolling. Third, tell one person. If a problem stays inside your head, it grows; if it is shared, it usually shrinks.

Khoa now goes running with me on Tuesdays, and he has been sleeping much better since he left his phone in the kitchen at night. He still gets nervous before a test. That is normal, and being calm all the time is not the goal.

If a friend of yours goes quiet for a week, do not wait. Ask twice, listen properly, and stay.`,
          translation: `Hai tuần trước kỳ thi cuối kỳ, Khoa — cậu bạn thân nhất của tớ — bỗng im lặng trong lớp. Bình thường cậu ấy là đứa ồn ào nhất nhóm, nên ai cũng để ý. Khoa bảo cậu ấy không sao, nhưng đã mấy ngày liền cậu ấy ngủ không ra ngủ và cũng thôi không đá bóng cuối tuần nữa.

Người lớn hay bảo tụi thiếu niên chúng tớ chẳng có lý do gì mà căng thẳng. Tớ không đồng ý. Tụi tớ chưa phải trả hoá đơn thật, nhưng áp lực là có thật: bài thi, điểm số, những lời so sánh với anh chị em họ, và một chiếc điện thoại cho tụi tớ xem cả trăm cuộc đời hoàn hảo trước cả bữa sáng.

Tin tốt là một cái đầu đang lo lắng không có nghĩa là một cái đầu hỏng. Cô tư vấn tâm lý của trường cho lớp tớ ba quy tắc đơn giản, và chúng giúp Khoa nhiều hơn mọi lời khuyên của tớ. Thứ nhất, ngủ không phải là lười; ngủ là để hồi phục. Thứ hai, hãy vận động, vì hai mươi phút tập thể dục làm tâm trạng đổi khác nhanh hơn cả tiếng đồng hồ lướt điện thoại. Thứ ba, hãy kể cho một người. Một nỗi lo nằm mãi trong đầu thì nó lớn dần; còn khi được chia sẻ, nó thường bé lại.

Giờ thì thứ Ba nào Khoa cũng đi chạy với tớ, và cậu ấy ngủ ngon hơn hẳn từ khi để điện thoại ngoài bếp vào ban đêm. Cậu ấy vẫn hồi hộp trước mỗi bài kiểm tra. Chuyện đó là bình thường, và lúc nào cũng bình tĩnh không phải là đích đến.

Nếu một người bạn của bé bỗng im lặng suốt một tuần, đừng chờ đợi. Hãy hỏi tới hai lần, lắng nghe cho tử tế, và ở lại bên cạnh bạn.`,
          questions: [
            mcq(
              "What is the main idea of the passage?",
              "Ý chính của bài đọc là gì?",
              [
                "Teenagers should never talk about their problems.",
                "Exams are the only cause of stress at school.",
                "Stress is real for teenagers, and sleep, exercise and talking to someone help.",
                "Football is the best cure for a worried mind.",
              ],
              2,
              "Bài viết phản bác ý kiến \"trẻ con thì căng thẳng gì\", khẳng định áp lực là có thật, rồi đưa ra ba việc cụ thể đã giúp được Khoa: ngủ, vận động, và kể cho một người nghe.",
            ),
            mcq(
              "What had Khoa stopped doing?",
              "Khoa đã thôi không làm việc gì nữa?",
              [
                "Playing football at the weekend.",
                "Going to school in the morning.",
                "Running with the writer on Tuesdays.",
                "Using his phone completely.",
              ],
              0,
              "Đoạn đầu kể Khoa nói mình không sao, nhưng đã mấy ngày liền ngủ không ra ngủ và đã thôi đá bóng vào cuối tuần. Việc chạy bộ thứ Ba là chuyện SAU này, khi cậu ấy đã khá hơn.",
              "he had not slept properly for days and he had stopped playing football at the weekend",
            ),
            mcq(
              "What is the counsellor's second rule?",
              "Quy tắc thứ hai của cô tư vấn tâm lý là gì?",
              [
                "Sleep more at the weekend.",
                "Move your body.",
                "Tell one person.",
                "Turn off your phone at school.",
              ],
              1,
              "Ba quy tắc được đánh số rõ trong bài: thứ nhất là ngủ, thứ hai là vận động, thứ ba là kể cho một người nghe.",
              "Second, move your body",
            ),
            mcq(
              "What does the writer suggest about adults who say teenagers have no reason to feel stress?",
              "Người viết ngầm nói gì về những người lớn cho rằng thiếu niên chẳng có lý do gì để căng thẳng?",
              [
                "They are joking with their children.",
                "They have forgotten how to sleep well.",
                "They do not understand the pressure that teenagers live with today.",
                "They want teenagers to study harder.",
              ],
              2,
              "Người viết không gọi người lớn là sai một cách thô lỗ, chỉ nói \"tớ không đồng ý\" rồi liệt kê những áp lực rất cụ thể của tuổi mình. Cách đặt hai câu cạnh nhau như vậy ngầm cho thấy người lớn chưa hình dung hết áp lực ấy.",
            ),
            mcq(
              "Why has Khoa been sleeping better?",
              "Vì sao dạo này Khoa ngủ ngon hơn?",
              [
                "Because he stopped going to school.",
                "Because he leaves his phone in the kitchen at night.",
                "Because the exams have finished.",
                "Because he takes medicine before bed.",
              ],
              1,
              "Bài viết dùng thì hiện tại hoàn thành tiếp diễn: cậu ấy ngủ ngon hơn hẳn KỂ TỪ KHI để điện thoại ngoài bếp vào ban đêm.",
              "he has been sleeping much better since he left his phone in the kitchen at night",
            ),
            tf(
              "The writer thinks a person should feel calm all the time.",
              "Người viết cho rằng con người nên lúc nào cũng bình tĩnh.",
              false,
              "SAI. Người viết nói Khoa VẪN hồi hộp trước bài kiểm tra, rằng điều đó là bình thường, và lúc nào cũng bình tĩnh không phải là đích đến.",
              "being calm all the time is not the goal",
            ),
          ],
        },
        listening: {
          title: "Talking to the school counsellor",
          transcript: `Girl: Miss, can I ask you something? I keep waking up at four in the morning before a test.

Counsellor: Thank you for telling me, Mai. How long has this been happening?

Girl: For about three weeks. I have been revising until midnight every night.

Counsellor: That is probably part of it. Your brain needs time to slow down. Do you use your phone in bed?

Girl: Always. I read messages until I fall asleep.

Counsellor: Try leaving it in another room for one week. And when you feel worried, breathe out slowly for six seconds, because that really does calm the body.

Girl: Six seconds. All right. Should I tell my parents?

Counsellor: I think you should. Sharing this with someone at home is not a weakness; it is how you get support.`,
          questions: [
            mcq(
              "What is Mai's problem?",
              "Mai đang gặp chuyện gì?",
              [
                "She cannot understand her maths lessons.",
                "She wakes up at four in the morning before a test.",
                "She has lost her phone.",
                "She is late for school every day.",
              ],
              1,
              "Ngay câu đầu Mai kể: cứ trước hôm có bài kiểm tra là bạn ấy tỉnh giấc lúc bốn giờ sáng.",
              "I keep waking up at four in the morning before a test.",
            ),
            mcq(
              "How long has this been happening?",
              "Chuyện này đã diễn ra bao lâu rồi?",
              ["For about three weeks.", "For six days.", "Since last year.", "For two months."],
              0,
              "Khi cô hỏi chuyện này diễn ra bao lâu rồi, Mai trả lời là khoảng ba tuần, và bạn ấy đã ôn bài tới nửa đêm mỗi tối.",
              "For about three weeks.",
            ),
            mcq(
              "What does the counsellor suggest doing with the phone?",
              "Cô tư vấn khuyên làm gì với chiếc điện thoại?",
              [
                "Deleting all the messages on it.",
                "Giving it to her parents forever.",
                "Leaving it in another room for one week.",
                "Using it only after midnight.",
              ],
              2,
              "Cô đề nghị thử để điện thoại ở phòng khác trong một tuần, chứ không bắt bỏ hẳn điện thoại.",
              "Try leaving it in another room for one week.",
            ),
            tf(
              "The counsellor thinks telling her parents would be a weakness.",
              "Cô tư vấn cho rằng kể với bố mẹ là dấu hiệu của sự yếu đuối.",
              false,
              "SAI. Cô nói ngược lại: chia sẻ chuyện này với người ở nhà KHÔNG phải là yếu đuối, mà là cách để mình có được chỗ dựa.",
              "Sharing this with someone at home is not a weakness",
            ),
          ],
        },
        writingPrompt:
          "Báo tường của trường em đang làm số đặc biệt về sức khoẻ tinh thần mùa thi. Hãy viết một đoạn 90–120 từ khuyên các bạn cách giữ tinh thần khoẻ mạnh. Bắt buộc dùng ít nhất một động từ theo sau là V-ing (enjoy / stop / keep / avoid + V-ing) và một động từ theo sau là to + V (decide / want / need / try + to V).",
        writingOutline:
          "1. Mở bài: một tình huống quen thuộc trước kỳ thi (mất ngủ, hồi hộp, so sánh điểm).\n2. Lời khuyên 1 về giấc ngủ, dùng V-ing: 'Stop revising after eleven o'clock.'\n3. Lời khuyên 2 về vận động: 'Twenty minutes of exercise changes your mood.'\n4. Lời khuyên 3 về việc kể cho một người, dùng to + V: 'Decide to tell one person you trust.'\n5. Câu kết ấm áp: hồi hộp là chuyện bình thường, xin giúp đỡ không phải là yếu đuối.",
        speaking: {
          sentences: [
            "A worried mind is not a broken mind.",
            "I enjoy running because it changes my mood.",
            "He has been sleeping better since he left his phone in the kitchen.",
            "When you feel worried, breathe out slowly for six seconds.",
            "Sharing a problem with someone is not a weakness.",
            "I decided to tell my parents how I felt.",
          ],
          questions: [
            {
              question: "What do you do when you feel stressed before an exam?",
              sampleAnswer:
                "I stop revising, go outside and walk around the block twice. Ten minutes of fresh air makes my mind much calmer than reading the same page again.",
            },
            {
              question: "Who do you talk to when something is worrying you?",
              sampleAnswer:
                "Usually my older sister, because she went through the same exams three years ago. If it is something bigger, I would tell my mother too.",
            },
            {
              question: "How much sleep do you get on a school night?",
              sampleAnswer:
                "About seven hours, which is not enough. I have been trying to go to bed before eleven, and on those days I concentrate much better in class.",
            },
            {
              question: "How could a school help students who feel a lot of pressure?",
              sampleAnswer:
                "Every school should have a counsellor that students can visit without asking permission in front of the class. A quiet room at lunchtime would help as well.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Learning from Failure",
        topicVi: "Học từ thất bại",
        icon: "🧩",
        words: [
          word("fail", "/feɪl/", "trượt, làm hỏng việc", "❌"),
          word("failure", "/ˈfeɪljə(r)/", "sự thất bại", "📉"),
          word("succeed", "/səkˈsiːd/", "thành công", "🏆"),
          word("attempt", "/əˈtempt/", "lần thử, nỗ lực", "🔁"),
          word("give up", "/ɡɪv ʌp/", "bỏ cuộc", "🏳️"),
          word("practise", "/ˈpræktɪs/", "luyện tập", "🎯"),
          word("improve", "/ɪmˈpruːv/", "tiến bộ hơn", "📈"),
          word("disappointed", "/ˌdɪsəˈpɔɪntɪd/", "thất vọng", "😞"),
          word("lesson", "/ˈlesn/", "bài học rút ra", "📖"),
          word("progress", "/ˈprəʊɡres/", "sự tiến bộ", "🪜"),
          word("patient", "/ˈpeɪʃnt/", "kiên nhẫn", "⏳"),
          word("blame", "/bleɪm/", "trách, đổ lỗi cho ai", "👉"),
          word("brave", "/breɪv/", "dũng cảm", "🦁"),
          word("encourage", "/ɪnˈkʌrɪdʒ/", "động viên, cổ vũ", "📣"),
          word("try again", "/traɪ əˈɡen/", "thử lại lần nữa", "🔂"),
        ],
        sound: {
          letters: "/ʃ/ · /tʃ/ · /s/",
          sound: "/ʃ · tʃ · s/",
          hint: "Ba âm rất dễ lẫn với nhau. /s/ là hơi rít mảnh — sing, second; /ʃ/ là hơi rít dày, môi chúm tròn — shout, machine; /tʃ/ là /t/ nổ ra rồi mới rít — chance, watch. Người Việt thường đổi /ʃ/ thành /s/ (\"sout\" thay cho shout) vì âm \"s\" tiếng Việt gần với /s/ hơn, và đọc /tʃ/ thành \"ch\" tiếng Việt — vốn là âm không có tiếng nổ, nên nghe mất hẳn phần /t/ đầu. Cách sửa: với /ʃ/ hãy chúm môi như đang thổi nến; với /tʃ/ hãy chặn hơi lại bằng lưỡi rồi bung ra. Nhớ giữ /tʃ/ ở cuối từ: watch, teach, much.",
          words: [
            { word: "shout /ʃaʊt/", meaning: "/ʃ/ — chúm môi, hơi rít dày", emoji: "📢" },
            { word: "chance /tʃɑːns/", meaning: "/tʃ/ — có tiếng nổ /t/ trước khi rít", emoji: "🍀" },
            { word: "sing /sɪŋ/", meaning: "/s/ — hơi rít mảnh, môi không chúm", emoji: "🎵" },
            { word: "watch /wɒtʃ/", meaning: "/tʃ/ ở cuối từ, đừng nuốt mất", emoji: "⌚" },
          ],
        },
        reading: {
          title: "Second Time Lucky",
          passage: `Last year my team entered the city science fair with a small solar car. We had built it in three weeks, we had tested it twice in the playground, and we were sure that we would win something. On the day, the sun was hidden behind thick clouds. Our car moved four centimetres and stopped. Some people laughed.

I went home and did not want to speak to anybody. I was disappointed with the judges, with the weather and, honestly, with my friend Nam, who had chosen the smaller battery. It is very easy to blame somebody else when a project fails.

My father listened for a long time. Then he asked one question: "What did the car teach you?" At first I thought this was a silly question. A week later, I understood it.

We should have tested the car on a cloudy day. We should have asked a teacher to check the battery. We had practised only for the perfect day, and the perfect day did not arrive.

This year our new car has a bigger battery and a switch for weak light. We have been testing it every Saturday, in sun and in rain. We may not win, but we are far better engineers than we were in June.

Nobody enjoys failing. Still, a failure that you study is not a loss; it is the cheapest lesson you will ever get.`,
          translation: `Năm ngoái đội tớ mang một chiếc xe chạy bằng năng lượng mặt trời đi dự hội thi khoa học của thành phố. Tụi tớ đã lắp nó trong ba tuần, đã chạy thử hai lần ngoài sân trường, và chắc mẩm thế nào cũng đoạt một giải. Đúng hôm thi, mặt trời nấp sau lớp mây dày. Chiếc xe của tụi tớ nhích được bốn xăng-ti-mét rồi đứng im. Có mấy người bật cười.

Tớ về nhà và chẳng muốn nói chuyện với ai. Tớ thất vọng với ban giám khảo, với thời tiết, và thành thật mà nói, cả với Nam — cậu bạn đã chọn cục pin nhỏ hơn. Đổ lỗi cho người khác khi một dự án thất bại là chuyện quá dễ.

Bố tớ ngồi nghe rất lâu. Rồi bố hỏi đúng một câu: chiếc xe ấy đã dạy con điều gì? Lúc đầu tớ thấy đây là một câu hỏi vớ vẩn. Một tuần sau thì tớ hiểu.

Lẽ ra tụi tớ nên chạy thử xe vào một ngày nhiều mây. Lẽ ra tụi tớ nên nhờ thầy cô kiểm tra cục pin. Tụi tớ chỉ luyện cho một ngày hoàn hảo, mà ngày hoàn hảo ấy thì không tới.

Năm nay chiếc xe mới của tụi tớ có cục pin lớn hơn và một công tắc dành cho lúc ánh sáng yếu. Tụi tớ đang chạy thử nó mỗi thứ Bảy, cả trời nắng lẫn trời mưa. Có thể tụi tớ vẫn không thắng, nhưng tụi tớ đã là những kỹ sư giỏi hơn hồi tháng Sáu rất nhiều.

Chẳng ai thích thất bại cả. Nhưng một thất bại mà mình chịu khó ngồi phân tích thì không phải là mất mát; đó là bài học rẻ nhất mà mình từng được học.`,
          questions: [
            mcq(
              "What is the main message of the passage?",
              "Thông điệp chính của bài đọc là gì?",
              [
                "Science fairs are unfair to small teams.",
                "A failure that you study carefully becomes a valuable lesson.",
                "Solar cars never work in cloudy weather.",
                "You should always choose the biggest battery.",
              ],
              1,
              "Cả bài đi từ một thất bại, qua giai đoạn đổ lỗi, tới câu hỏi của bố, rồi tới những thay đổi cụ thể cho năm nay. Câu cuối chốt lại: một thất bại được phân tích là bài học rẻ nhất mà ta có.",
            ),
            mcq(
              "Why did the car stop at the science fair?",
              "Vì sao chiếc xe dừng lại tại hội thi khoa học?",
              [
                "A wheel came off during the test.",
                "The judges stopped the team too early.",
                "There was too little light because of the clouds.",
                "Nam forgot to bring the battery.",
              ],
              2,
              "Bài viết kể đúng hôm thi mặt trời nấp sau lớp mây dày, nên chiếc xe chạy bằng năng lượng mặt trời chỉ nhích được bốn xăng-ti-mét rồi đứng im.",
              "the sun was hidden behind thick clouds",
            ),
            mcq(
              "What does the writer admit about his first reaction?",
              "Người viết thừa nhận điều gì về phản ứng đầu tiên của mình?",
              [
                "He blamed other people and the weather.",
                "He immediately started building a new car.",
                "He laughed with the crowd.",
                "He asked his teacher for a second chance.",
              ],
              0,
              "Người viết kể mình thất vọng với ban giám khảo, với thời tiết và với cả người bạn đã chọn cục pin nhỏ, rồi tự nhận xét rằng đổ lỗi cho người khác là chuyện quá dễ.",
              "It is very easy to blame somebody else when a project fails.",
            ),
            mcq(
              "What does the father's question suggest?",
              "Câu hỏi của người bố ngầm gợi ý điều gì?",
              [
                "That the writer should choose an easier project next time.",
                "That the writer should look for the lesson instead of looking for somebody to blame.",
                "That the car was built too quickly to work.",
                "That science fairs are not worth entering.",
              ],
              1,
              "Bố không an ủi, cũng không mắng. Bố chỉ hỏi chiếc xe đã dạy con điều gì — cách hỏi đó ngầm kéo người viết ra khỏi việc đi tìm người có lỗi và hướng sang việc đi tìm bài học.",
            ),
            mcq(
              "What is different about this year's car?",
              "Chiếc xe năm nay khác gì so với năm ngoái?",
              [
                "It is much lighter and smaller.",
                "It was built by a teacher.",
                "It has a bigger battery and a switch for weak light.",
                "It only runs on cloudy days.",
              ],
              2,
              "Đoạn năm nói rõ chiếc xe mới có cục pin lớn hơn và một công tắc dành cho lúc ánh sáng yếu — đúng hai điểm mà thất bại năm ngoái đã chỉ ra.",
              "This year our new car has a bigger battery and a switch for weak light.",
            ),
            tf(
              "The writer is certain that his team will win this year.",
              "Người viết chắc chắn rằng năm nay đội mình sẽ thắng.",
              false,
              "SAI. Người viết nói có thể đội mình vẫn không thắng, nhưng cả đội đã giỏi hơn hồi tháng Sáu rất nhiều. Điều bạn ấy chắc chắn là sự tiến bộ, không phải giải thưởng.",
              "We may not win, but we are far better engineers than we were in June.",
            ),
          ],
        },
        listening: {
          title: "After the school music exam",
          transcript: `Boy: How did it go?

Girl: Badly. I forgot the second part completely and I had to start again.

Boy: That happened to me last year. I felt terrible for a week.

Girl: I should have practised with the metronome. I only played the easy parts because they sounded nice.

Boy: That is the trap. Our teacher says we should practise the parts we hate first.

Girl: She told me the same thing in September, and I did not listen.

Boy: Well, you have three months before the next exam. Are you going to give up?

Girl: No. I am going to book a room every Friday and start with the hard part. Will you come and listen sometimes?

Boy: Of course. And I will clap even when it sounds terrible.`,
          questions: [
            mcq(
              "What went wrong in the girl's exam?",
              "Bài thi của bạn nữ đã hỏng ở chỗ nào?",
              [
                "She arrived too late to play.",
                "She forgot the second part and had to start again.",
                "Her instrument was broken.",
                "She played the wrong piece of music.",
              ],
              1,
              "Bạn nữ kể mình quên sạch phần hai và phải chơi lại từ đầu.",
              "I forgot the second part completely and I had to start again.",
            ),
            mcq(
              "What does the girl say she should have done?",
              "Bạn nữ nói lẽ ra mình nên làm gì?",
              [
                "Practised with the metronome.",
                "Chosen an easier piece.",
                "Asked her friend to play with her.",
                "Slept more the night before.",
              ],
              0,
              "Bạn nữ dùng cấu trúc tiếc nuối \"should have + V3\": lẽ ra mình nên luyện với máy đếm nhịp, thay vì chỉ chơi những đoạn dễ vì nghe hay.",
              "I should have practised with the metronome.",
            ),
            mcq(
              "What is the girl's new plan?",
              "Kế hoạch mới của bạn nữ là gì?",
              [
                "To stop learning music for a year.",
                "To change to an easier teacher.",
                "To book a room every Friday and start with the hard part.",
                "To take the exam again next week.",
              ],
              2,
              "Khi được hỏi có định bỏ cuộc không, bạn nữ trả lời không, và nói sẽ đặt phòng tập mỗi thứ Sáu, bắt đầu luôn từ đoạn khó.",
              "I am going to book a room every Friday and start with the hard part.",
            ),
            tf(
              "The boy has never had a bad exam like this.",
              "Bạn nam chưa từng thi hỏng như vậy bao giờ.",
              false,
              "SAI. Bạn nam kể chính chuyện đó đã xảy ra với cậu ấy năm ngoái, và cậu ấy thấy tồi tệ suốt cả tuần.",
              "That happened to me last year.",
            ),
          ],
        },
        writingPrompt:
          "Hãy viết một đoạn 90–120 từ kể về một lần em thất bại (một bài kiểm tra, một trận đấu, một dự án) và điều em học được từ đó. Bắt buộc dùng ít nhất hai câu với 'should have' hoặc 'should not have' + V3.",
        writingOutline:
          "1. Chuyện gì đã xảy ra: kể ngắn, có thời gian và nơi chốn cụ thể.\n2. Lúc đó em cảm thấy thế nào (disappointed · I wanted to give up).\n3. Hai câu tiếc nuối: 'I should have practised the hard part first.' / 'I should not have blamed my friend.'\n4. Điều em đã thay đổi sau đó — việc làm cụ thể, không nói chung chung.\n5. Câu kết: bài học em rút ra, viết bằng lời của chính em.",
        speaking: {
          sentences: [
            "We should have tested the car on a cloudy day.",
            "I should not have blamed my friend for the result.",
            "It is very easy to blame somebody else when a project fails.",
            "We have been testing the new car every Saturday.",
            "Nobody enjoys failing, but a failure you study is a lesson.",
            "Are you going to give up, or are you going to try again?",
          ],
          questions: [
            {
              question: "Tell me about a time when something did not go well for you.",
              sampleAnswer:
                "Last term I failed a maths test because I had only revised the easy chapters. I was disappointed for a few days, and then I made a new revision plan with my friend.",
            },
            {
              question: "What did you learn from that experience?",
              sampleAnswer:
                "I learned that I should have started with the hardest topic, not the one I enjoyed most. Now I always do the difficult exercises first, while I am still fresh.",
            },
            {
              question: "How do you encourage a friend who has failed at something?",
              sampleAnswer:
                "I listen first and I do not say that it does not matter, because it clearly does. Then I ask what one thing we could practise together next week.",
            },
            {
              question: "Do you think failing can be useful? Why?",
              sampleAnswer:
                "Yes, if you study it. A failure shows you exactly which part is weak, and that information is far more useful than a lucky success.",
            },
          ],
        },
      },

      // ───────────────────────────────────────────────────────────────────
      {
        topic: "Life Online",
        topicVi: "Cuộc sống trên mạng",
        icon: "💻",
        words: [
          word("account", "/əˈkaʊnt/", "tài khoản", "🔐"),
          word("password", "/ˈpɑːswɜːd/", "mật khẩu", "🔑"),
          word("private", "/ˈpraɪvət/", "riêng tư", "🚪"),
          word("profile", "/ˈprəʊfaɪl/", "trang cá nhân", "🪪"),
          word("post", "/pəʊst/", "đăng bài; bài đăng", "📮"),
          word("comment", "/ˈkɒment/", "bình luận", "💬"),
          word("upload", "/ˌʌpˈləʊd/", "tải lên", "⬆️"),
          word("follower", "/ˈfɒləʊə(r)/", "người theo dõi", "👥"),
          word("kind", "/kaɪnd/", "tử tế", "😊"),
          word("rude", "/ruːd/", "thô lỗ", "😠"),
          word("block", "/blɒk/", "chặn (một tài khoản)", "🚫"),
          word("report", "/rɪˈpɔːt/", "báo cáo nội dung xấu", "🚩"),
          word("stranger", "/ˈstreɪndʒə(r)/", "người lạ", "❓"),
          word("safe", "/seɪf/", "an toàn", "🛡️"),
          word("delete", "/dɪˈliːt/", "xoá đi", "🗑️"),
        ],
        sound: {
          letters: "Câu hỏi đuôi: ↘ hay ↗",
          sound: "/xuống giọng · lên giọng/",
          hint: "Câu hỏi đuôi (tag question) đổi nghĩa theo NGỮ ĐIỆU chứ không đổi theo chữ. Xuống giọng ↘ nghĩa là \"tôi biết rồi, chỉ hỏi cho chắc\": Your account is private, isn't it? ↘ Lên giọng ↗ nghĩa là hỏi thật, tôi chưa biết: You blocked him, didn't you? ↗ Người Việt hay đọc đuôi câu ĐỀU ĐỀU vì tiếng Việt phân biệt nghĩa bằng thanh điệu của từng từ chứ không bằng đường giọng của cả câu — kết quả là người nghe không biết mình đang xác nhận hay đang hỏi. Cách sửa: đọc phần đuôi hơi tách ra, rồi thả giọng rơi xuống hoặc đẩy vọt lên ở từ cuối cùng. Nhớ giữ đủ cụm phụ âm: didn't /dɪdnt/, isn't /ɪznt/.",
          words: [
            { word: "Your account is private, isn't it? ↘", meaning: "Xuống giọng: tớ chắc rồi, chỉ hỏi cho chắc", emoji: "🔐" },
            { word: "You blocked him, didn't you? ↗", meaning: "Lên giọng: tớ chưa biết, đang hỏi thật", emoji: "🚫" },
            { word: "He can see your school, can't he? ↗", meaning: "Lên giọng: một câu hỏi thật sự", emoji: "🏫" },
            { word: "That comment was rude, wasn't it? ↘", meaning: "Xuống giọng: cả hai đều thấy rõ rồi", emoji: "😠" },
          ],
        },
        reading: {
          title: "The Rule My Family Made About the Internet",
          passage: `Our family has one rule about the internet, and my father wrote it on the fridge: never post anything you would not say to somebody's face.

I used to think that rule was old-fashioned. Then, last term, a boy in my year made a joke account and posted a photograph of a classmate with a rude comment under it. The photograph was deleted after two days, but the girl in it did not come to school for a week. Words on a screen do not disappear when you close the app.

The internet itself is not the problem here. My cousin in Hue teaches me guitar through a video call every Sunday. I have been following an art teacher from Ireland for a year, and my drawing has improved enormously. If our school had no internet, half of my projects would be impossible.

The difference is between using the internet and living inside it. Three habits keep me safe. I keep my account private, so strangers cannot see my address or my school. I never give my password to anybody, not even to a good friend. And if a comment feels wrong, I do not answer it; I block the person and report the post.

Online we are all a little invisible, and that is exactly why kindness has to be a decision. Be the person who writes the first friendly comment, not the twentieth unkind one.`,
          translation: `Nhà tớ có đúng một quy tắc về internet, và bố tớ dán nó lên cửa tủ lạnh: đừng bao giờ đăng thứ gì mà con không dám nói thẳng vào mặt người ta.

Trước đây tớ tưởng quy tắc ấy cổ lỗ sĩ. Rồi học kỳ trước, một bạn nam cùng khối lập một tài khoản giả để trêu, đăng ảnh một bạn cùng lớp kèm một bình luận thô lỗ ở dưới. Tấm ảnh bị xoá sau hai ngày, nhưng bạn nữ trong ảnh đã nghỉ học suốt một tuần. Chữ nghĩa trên màn hình không biến mất theo lúc ta tắt ứng dụng.

Bản thân internet không phải là thủ phạm ở đây. Anh họ tớ ở Huế dạy tớ đàn ghi-ta qua cuộc gọi video mỗi Chủ nhật. Tớ đã theo dõi một thầy dạy vẽ người Ireland được một năm, và nét vẽ của tớ tiến bộ hẳn lên. Nếu trường tớ không có internet thì một nửa số bài dự án của tớ sẽ là bất khả thi.

Khác biệt nằm ở chỗ ta DÙNG internet hay ta SỐNG hẳn bên trong nó. Có ba thói quen giữ cho tớ an toàn. Tớ để tài khoản ở chế độ riêng tư, nên người lạ không xem được địa chỉ nhà hay tên trường của tớ. Tớ không bao giờ đưa mật khẩu cho ai, kể cả bạn thân. Và nếu một bình luận khiến tớ thấy gờn gợn, tớ không trả lời; tớ chặn người đó và báo cáo bài đăng.

Trên mạng ai cũng hơi vô hình một chút, và chính vì thế mà sự tử tế phải là một lựa chọn có ý thức. Hãy là người viết bình luận thân thiện đầu tiên, chứ đừng là lời khó nghe thứ hai mươi.`,
          questions: [
            mcq(
              "What is the main idea of the passage?",
              "Ý chính của bài đọc là gì?",
              [
                "Teenagers should not use the internet at all.",
                "Joke accounts are the biggest danger online.",
                "The internet is useful, but we have to choose to be kind and careful on it.",
                "Video calls are the best way to learn a musical instrument.",
              ],
              2,
              "Bài viết vừa kể một chuyện đau lòng trên mạng, vừa nêu những lợi ích thật (học đàn, học vẽ, làm dự án), rồi kết bằng ba thói quen an toàn và lời nhắc rằng tử tế phải là một lựa chọn. Đó mới là ý chính.",
            ),
            mcq(
              "What is the family's rule?",
              "Quy tắc của gia đình người viết là gì?",
              [
                "Never post anything you would not say to somebody's face.",
                "Never use the internet after nine o'clock.",
                "Never make friends online.",
                "Never upload a photograph of yourself.",
              ],
              0,
              "Ngay câu đầu bài, người viết cho biết bố đã dán quy tắc ấy lên tủ lạnh: đừng đăng thứ gì mà mình không dám nói thẳng vào mặt người khác.",
              "never post anything you would not say to somebody's face",
            ),
            mcq(
              "What happened after the photograph was deleted?",
              "Chuyện gì xảy ra sau khi tấm ảnh bị xoá?",
              [
                "The boy apologised in front of the class.",
                "The girl in the photograph stayed away from school for a week.",
                "The joke account got more followers.",
                "The teacher deleted the whole app.",
              ],
              1,
              "Bài viết đặt hai vế cạnh nhau: ảnh bị xoá sau hai ngày, NHƯNG bạn nữ trong ảnh đã nghỉ học suốt một tuần.",
              "The photograph was deleted after two days, but the girl in it did not come to school for a week.",
            ),
            mcq(
              "What does the sentence 'Words on a screen do not disappear when you close the app' suggest?",
              "Câu 'Chữ nghĩa trên màn hình không biến mất khi ta tắt ứng dụng' ngầm nói điều gì?",
              [
                "That every app saves your messages forever.",
                "That the hurt caused by online words lasts much longer than the post itself.",
                "That students should write on paper instead.",
                "That deleting a photograph is impossible.",
              ],
              1,
              "Câu này đứng ngay sau chi tiết bạn nữ nghỉ học một tuần. Ý ngầm là: bài đăng biến mất rất nhanh, nhưng tổn thương nó gây ra thì kéo dài hơn nhiều.",
            ),
            mcq(
              "What does the writer do when a comment feels wrong?",
              "Người viết làm gì khi thấy một bình luận có gì đó không ổn?",
              [
                "Answers it politely and moves on.",
                "Sends it to all of his friends.",
                "Blocks the person and reports the post.",
                "Deletes his own account for a week.",
              ],
              2,
              "Thói quen thứ ba của người viết rất rõ: không trả lời bình luận đó, mà chặn người viết nó và báo cáo bài đăng.",
              "I block the person and report the post",
            ),
            tf(
              "The writer thinks the internet has made his schoolwork harder.",
              "Người viết cho rằng internet khiến việc học của mình khó khăn hơn.",
              false,
              "SAI. Người viết dùng câu điều kiện loại 2 để nói ngược lại: nếu trường không có internet thì một nửa số bài dự án của bạn ấy sẽ là bất khả thi.",
              "If our school had no internet, half of my projects would be impossible.",
            ),
          ],
        },
        listening: {
          title: "A phone call about a strange message",
          transcript: `Girl: Mum, somebody I do not know has sent me a message. He says he is a photographer and he wants to see more of my drawings.

Mum: Has he asked you for anything?

Girl: He asked which school I go to.

Mum: Then you must not answer that question. A real photographer does not need your school.

Girl: Should I block him?

Mum: Block him and report the message. You do not have to be polite to a stranger online.

Girl: All right. My account is private, so he cannot see my address, can he?

Mum: No, he cannot, and let us keep it that way. You have to check those settings every few months, because apps change them.

Girl: Thanks, Mum. I will show you the message tonight.`,
          questions: [
            mcq(
              "What did the stranger ask the girl?",
              "Người lạ đã hỏi bạn nữ điều gì?",
              [
                "Which school she goes to.",
                "How old she is.",
                "What her password is.",
                "Where her mother works.",
              ],
              0,
              "Bạn nữ kể lại rằng người đó hỏi bạn ấy học trường nào — đúng loại thông tin mà mẹ bảo tuyệt đối không trả lời.",
              "He asked which school I go to.",
            ),
            mcq(
              "What does Mum tell her daughter to do?",
              "Mẹ bảo con gái làm gì?",
              [
                "Answer politely and then stop replying.",
                "Block him and report the message.",
                "Delete her account immediately.",
                "Send the drawings but not her name.",
              ],
              1,
              "Mẹ trả lời rất dứt khoát cho câu hỏi \"con chặn anh ta nhé?\": chặn và báo cáo tin nhắn luôn.",
              "Block him and report the message.",
            ),
            mcq(
              "Why does Mum say the settings must be checked every few months?",
              "Vì sao mẹ nói vài tháng lại phải kiểm tra phần cài đặt một lần?",
              [
                "Because the phone is old.",
                "Because the school asks for it.",
                "Because apps change them.",
                "Because the password expires.",
              ],
              2,
              "Mẹ giải thích lý do ngay trong câu: các ứng dụng tự thay đổi những cài đặt đó, nên phải xem lại định kỳ.",
              "because apps change them",
            ),
            tf(
              "Mum thinks her daughter has to be polite to the stranger.",
              "Mẹ cho rằng con gái phải lịch sự với người lạ đó.",
              false,
              "SAI. Mẹ nói thẳng: con KHÔNG nhất thiết phải lịch sự với một người lạ trên mạng.",
              "You do not have to be polite to a stranger online.",
            ),
          ],
        },
        writingPrompt:
          "Trường em đang làm một tấm áp phích 'Năm quy tắc an toàn trên mạng' cho các em lớp dưới. Hãy viết một đoạn 90–120 từ giải thích các quy tắc đó. Bắt buộc dùng ít nhất một câu với 'must not' và một câu với 'do not have to'.",
        writingOutline:
          "1. Câu mở: vì sao các em lớp dưới cần biết những quy tắc này.\n2. Quy tắc về mật khẩu, dùng 'must not': 'You must not give your password to anybody.'\n3. Quy tắc về tài khoản riêng tư và người lạ.\n4. Một câu với 'do not have to': 'You do not have to answer every message.'\n5. Kết bằng quy tắc về sự tử tế: đừng đăng thứ mình không dám nói trực tiếp.",
        speaking: {
          sentences: [
            "Never post anything you would not say to somebody's face.",
            "I keep my account private, so strangers cannot see my school.",
            "You must not give your password to anybody.",
            "You do not have to be polite to a stranger online.",
            "If a comment feels wrong, block the person and report the post.",
            "Your account is private, isn't it?",
          ],
          questions: [
            {
              question: "What do you use the internet for most?",
              sampleAnswer:
                "Mostly for school projects and for art. I have been following a drawing teacher from Ireland for a year, and my work has improved enormously.",
            },
            {
              question: "What would you do if a stranger sent you a message?",
              sampleAnswer:
                "I would not answer any question about my school or my address. I would show the message to my mother, then block the account and report it.",
            },
            {
              question: "Do you think people are ruder online than in real life? Why?",
              sampleAnswer:
                "Yes, because online we are all a little invisible. It is much easier to type an unkind comment than to say the same words to somebody's face.",
            },
            {
              question: "What rule about the internet would you give a younger student?",
              sampleAnswer:
                "Keep your account private and never share your password, not even with a good friend. And if something feels wrong, tell an adult the same day.",
            },
          ],
        },
      },
    ],
  },
];
