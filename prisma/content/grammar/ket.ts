// KET (11–13 tuổi · A2 Key for Schools)
// Học viên đã lớn hơn: xưng "mình/bạn" thay vì "tớ/bé". Trọng tâm là những chỗ
// đề A2 hay đánh bẫy — chọn giữa hai thì, câu điều kiện, mệnh đề quan hệ,
// đếm được/không đếm được, và V-ing hay to V sau động từ.
import { fb, so, viEn, enVi, ex, mis, part, quiz, type GrammarUnitSeed } from "./types";

export const UNITS: GrammarUnitSeed[] = [
  {
    slug: "perfect-vs-past",
    title: "Present perfect vs past simple",
    theme: "Chọn đúng thì quá khứ",
    level: "KET",
    lessons: [
      {
        slug: "perfect-vs-past",
        title: "have done hay did?",
        sections: [
          {
            id: "pvp-1",
            title: "Có nói rõ thời điểm hay không?",
            titleEn: "Present perfect vs past simple",
            structure: "have/has + V3 (không rõ lúc nào) · V2 (đã rõ lúc nào)",
            breakdown: [
              part("I have lived here", "Present perfect", "Bắt đầu trong quá khứ và VẪN còn đúng tới bây giờ."),
              part("for five years", "for + khoảng thời gian", "for + độ dài (5 years) · since + mốc bắt đầu (2020)."),
              part("I lived there in 2019", "Past simple", "Đã kết thúc, có mốc thời gian rõ ràng."),
            ],
            explanation:
              "Câu hỏi cần trả lời: câu có nói RÕ thời điểm không?\n- Có mốc rõ (yesterday, last year, in 2019, two days ago) → quá khứ đơn: I saw that film last week.\n- Không nói rõ, hoặc còn liên quan tới hiện tại → present perfect: I have seen that film.\nTừ đi kèm present perfect: ever, never, just, already, yet, for, since, recently.\nfor + khoảng thời gian (for two years) · since + mốc bắt đầu (since 2020).",
            usage: "Dùng khi phải chọn thì trong bài tập, khi kể mình đã sống ở đâu bao lâu, hoặc trả lời “Xong chưa?”.",
            mistakes: [
              mis("I have seen him yesterday.", "I saw him yesterday.", "Có “yesterday” là mốc rõ → phải dùng quá khứ đơn."),
              mis("I live here since 2020.", "I have lived here since 2020.", "Việc bắt đầu trong quá khứ và còn tiếp tục → present perfect."),
              mis("I have known him since two years.", "I have known him for two years.", "“two years” là khoảng thời gian nên dùng “for”."),
            ],
            examples: [
              ex("Việc còn liên quan tới hiện tại", "I have lived in Hanoi for five years.", "Mình đã sống ở Hà Nội được năm năm."),
              ex("Việc đã khép lại", "I moved to Hanoi in 2019.", "Mình chuyển tới Hà Nội năm 2019."),
              ex("Khi hỏi đã xong chưa", "Have you finished your project yet?", "Bạn làm xong dự án chưa?"),
            ],
            exercises: [
              fb("I ___ that film last week.", "saw", ["saw", "have seen", "has seen", "see"], "Có “last week” là mốc rõ nên dùng quá khứ đơn."),
              fb("She ___ in this school since 2021.", "has studied", ["has studied", "studied", "studies", "have studied"], "“since 2021” và việc vẫn tiếp diễn → present perfect."),
              so(["have", "I", "known", "him", "for", "two", "years"], "I have known him for two years", "Mình biết bạn ấy được hai năm rồi."),
              so(["went", "We", "to", "Hue", "last", "summer"], "We went to Hue last summer", "Hè năm ngoái chúng mình đi Huế."),
              viEn("Mình chưa làm xong bài tập.", "I haven’t finished my homework yet.", ["I haven’t finished my homework yet.", "I didn’t finish my homework yet.", "I haven’t finish my homework yet.", "I don’t finish my homework yet."], "“yet” đi với present perfect: haven’t + V3."),
              viEn("Bạn ấy đã tới đây hai ngày trước.", "She arrived here two days ago.", ["She arrived here two days ago.", "She has arrived here two days ago.", "She has arrived here for two days.", "She arrive here two days ago."], "“two days ago” là mốc rõ → quá khứ đơn."),
              enVi("I have lived here for ten years.", "Mình đã sống ở đây được mười năm.", ["Mình đã sống ở đây được mười năm.", "Mình đã sống ở đây mười năm trước.", "Mười năm trước mình chuyển đi.", "Mình sẽ sống ở đây mười năm."]),
              enVi("Have you ever been to Singapore?", "Bạn đã bao giờ tới Singapore chưa?", ["Bạn đã bao giờ tới Singapore chưa?", "Bạn tới Singapore khi nào?", "Bạn có muốn tới Singapore không?", "Bạn đang ở Singapore à?"]),
            ],
          },
        ],
        test: quiz([
          fb("They ___ to Da Lat in 2022.", "went", ["went", "have gone", "has gone", "go"]),
          so(["has", "He", "lived", "here", "since", "May"], "He has lived here since May"),
          viEn("Mình chưa bao giờ ăn sầu riêng.", "I have never eaten durian.", ["I have never eaten durian.", "I never ate durian yesterday.", "I have never ate durian.", "I don’t never eat durian."]),
          enVi("She has just left.", "Bạn ấy vừa mới đi.", ["Bạn ấy vừa mới đi.", "Bạn ấy sắp đi.", "Bạn ấy đi từ lâu rồi.", "Bạn ấy chưa đi."]),
        ]),
      },
    ],
  },

  {
    slug: "first-conditional",
    title: "First conditional",
    theme: "Nếu … thì sẽ …",
    level: "KET",
    lessons: [
      {
        slug: "first-conditional",
        title: "If + hiện tại đơn, will + V",
        sections: [
          {
            id: "cond-1",
            title: "Điều kiện có thật ở tương lai",
            titleEn: "First conditional",
            structure: "If + mệnh đề hiện tại đơn, chủ ngữ + will + V",
            breakdown: [
              part("If it rains", "Mệnh đề if", "Điều kiện — dùng HIỆN TẠI ĐƠN dù nói về tương lai."),
              part(",", "Dấu phẩy", "Chỉ cần khi mệnh đề “if” đứng TRƯỚC."),
              part("we will stay at home", "Mệnh đề chính", "Kết quả — dùng “will”."),
            ],
            explanation:
              "Nói về điều CÓ THỂ xảy ra trong tương lai và kết quả của nó.\n- If it rains, we will stay at home.\n- We will stay at home if it rains. (đảo lại thì bỏ dấu phẩy)\nLuật quan trọng nhất: SAU “if” KHÔNG dùng “will”. Vế if dùng hiện tại đơn, vế chính mới dùng will.\nCó thể thay “will” bằng may/might (ít chắc chắn hơn) hoặc dùng câu mệnh lệnh: If you are tired, go to bed.",
            usage: "Dùng khi bàn kế hoạch, cảnh báo hậu quả, hoặc hứa hẹn có điều kiện.",
            mistakes: [
              mis("If it will rain, we will stay at home.", "If it rains, we will stay at home.", "Sau “if” KHÔNG dùng “will”."),
              mis("If he study hard, he will pass.", "If he studies hard, he will pass.", "Vế if dùng hiện tại đơn nên “he” cần -s."),
              mis("If you go out you will get wet", "If you go out, you will get wet.", "Vế “if” đứng trước thì cần dấu phẩy ngăn cách."),
            ],
            examples: [
              ex("Khi bàn kế hoạch cuối tuần", "If it rains, we will stay at home.", "Nếu trời mưa thì chúng mình ở nhà."),
              ex("Khi động viên bạn", "If you study hard, you will pass the exam.", "Nếu bạn học chăm thì bạn sẽ đỗ."),
              ex("Khi nhắc nhở", "You will be late if you don’t hurry.", "Bạn sẽ muộn mất nếu không nhanh lên."),
            ],
            exercises: [
              fb("If it ___ tomorrow, we will stay at home.", "rains", ["rains", "will rain", "rained", "is raining"], "Sau “if” dùng hiện tại đơn, chủ ngữ “it” nên thêm -s."),
              fb("If you study hard, you ___ pass the exam.", "will", ["will", "would", "are", "did"], "Vế kết quả của câu điều kiện loại 1 dùng “will”."),
              so(["If", "you", "hurry", "you", "will", "catch", "the", "bus"], "If you hurry you will catch the bus", "Nếu bạn nhanh lên thì sẽ kịp chuyến xe."),
              so(["will", "We", "go", "out", "if", "it", "is", "sunny"], "We will go out if it is sunny", "Chúng mình sẽ ra ngoài nếu trời nắng."),
              viEn("Nếu bạn không nhanh lên, bạn sẽ bị muộn.", "If you don’t hurry, you will be late.", ["If you don’t hurry, you will be late.", "If you won’t hurry, you will be late.", "If you don’t hurry, you are late.", "If you didn’t hurry, you will be late."], "Vế if dùng hiện tại đơn, vế chính dùng will."),
              viEn("Nếu trời nắng, chúng mình sẽ đi biển.", "If it is sunny, we will go to the beach.", ["If it is sunny, we will go to the beach.", "If it will be sunny, we will go to the beach.", "If it is sunny, we go to the beach will.", "If it was sunny, we will go to the beach."], "Sau “if” không dùng “will”."),
              enVi("If you eat too much, you will feel sick.", "Nếu ăn quá nhiều, bạn sẽ thấy khó chịu.", ["Nếu ăn quá nhiều, bạn sẽ thấy khó chịu.", "Bạn ăn quá nhiều nên đã thấy khó chịu.", "Nếu bạn thấy khó chịu, đừng ăn nhiều.", "Bạn sẽ ăn nhiều nếu thấy khoẻ."]),
              enVi("I will call you if I have time.", "Mình sẽ gọi cho bạn nếu có thời gian.", ["Mình sẽ gọi cho bạn nếu có thời gian.", "Mình đã gọi cho bạn khi có thời gian.", "Nếu bạn gọi, mình sẽ có thời gian.", "Mình không có thời gian gọi cho bạn."]),
            ],
          },
        ],
        test: quiz([
          fb("If she ___ early, she will see the sunrise.", "gets up", ["gets up", "will get up", "got up", "is getting up"]),
          so(["If", "it", "snows", "we", "will", "stay", "inside"], "If it snows we will stay inside"),
          viEn("Nếu bạn giúp mình, mình sẽ làm xong nhanh hơn.", "If you help me, I will finish faster.", ["If you help me, I will finish faster.", "If you will help me, I will finish faster.", "If you helped me, I will finish faster.", "If you help me, I finish faster will."]),
          enVi("If we leave now, we will arrive on time.", "Nếu đi bây giờ, chúng mình sẽ tới đúng giờ.", ["Nếu đi bây giờ, chúng mình sẽ tới đúng giờ.", "Chúng mình đã tới đúng giờ.", "Nếu tới đúng giờ, chúng mình sẽ đi.", "Chúng mình sẽ đi muộn."]),
        ]),
      },
    ],
  },

  {
    slug: "relative-clauses",
    title: "Relative clauses",
    theme: "Mệnh đề quan hệ",
    level: "KET",
    lessons: [
      {
        slug: "relative-who-which",
        title: "who · which · that",
        sections: [
          {
            id: "rel-1",
            title: "Nối hai câu thành một",
            titleEn: "Relative clauses with who / which / that",
            structure: "Danh từ + who/which/that + mệnh đề bổ nghĩa",
            breakdown: [
              part("the girl", "Danh từ đứng trước", "Người hoặc vật được nói rõ thêm."),
              part("who", "Đại từ quan hệ", "who cho NGƯỜI · which cho VẬT · that dùng được cho cả hai."),
              part("lives next door", "Mệnh đề bổ nghĩa", "Thông tin làm rõ danh từ phía trước."),
            ],
            explanation:
              "Mệnh đề quan hệ giúp gộp hai câu thành một câu gọn hơn.\n- She is a girl. She lives next door. → She is the girl who lives next door.\n- This is a book. It helped me a lot. → This is the book which helped me a lot.\nLuật cần nhớ:\n- who → người · which → vật/con vật · that → cả hai (thân mật hơn)\n- Đại từ quan hệ ĐÃ thay cho chủ ngữ rồi, nên KHÔNG viết lại chủ ngữ: “the girl who she lives…” là sai.\n- Cũng dùng where cho nơi chốn: This is the house where I was born.",
            usage: "Dùng khi tả người, tả đồ vật, hoặc khi định nghĩa một thứ gì đó trong bài viết.",
            mistakes: [
              mis("The girl who she lives next door is Mai.", "The girl who lives next door is Mai.", "“who” đã thay cho “she” rồi, không viết lại chủ ngữ."),
              mis("This is the book who helped me.", "This is the book which helped me.", "“book” là vật nên dùng “which” (hoặc “that”)."),
              mis("I know a man which works here.", "I know a man who works here.", "“man” là người nên dùng “who”."),
            ],
            examples: [
              ex("Khi tả bạn cùng lớp", "Mai is the girl who sits next to me.", "Mai là bạn nữ ngồi cạnh mình."),
              ex("Khi tả đồ vật", "This is the phone which my dad gave me.", "Đây là chiếc điện thoại bố tặng mình."),
              ex("Khi tả nơi chốn", "That is the school where I studied.", "Kia là ngôi trường mình từng học."),
            ],
            exercises: [
              fb("The girl ___ sits next to me is Mai.", "who", ["who", "which", "where", "what"], "“girl” là người nên dùng “who”."),
              fb("This is the bike ___ my dad bought.", "which", ["which", "who", "whose", "where"], "“bike” là vật nên dùng “which” hoặc “that”."),
              so(["I", "know", "a", "man", "who", "works", "here"], "I know a man who works here", "Mình biết một người làm việc ở đây."),
              so(["This", "is", "the", "book", "which", "helped", "me"], "This is the book which helped me", "Đây là quyển sách đã giúp mình."),
              viEn("Đó là bạn nam chơi bóng đá rất giỏi.", "He is the boy who plays football very well.", ["He is the boy who plays football very well.", "He is the boy which plays football very well.", "He is the boy who he plays football very well.", "He is the boy where plays football very well."], "“boy” là người → who, và không lặp lại chủ ngữ."),
              viEn("Đây là bộ phim mà mình thích nhất.", "This is the film which I like most.", ["This is the film which I like most.", "This is the film who I like most.", "This is the film which I like it most.", "This is the film where I like most."], "“film” là vật → which; không thêm “it” vì “which” đã thay rồi."),
              enVi("The man who lives here is a teacher.", "Người sống ở đây là một thầy giáo.", ["Người sống ở đây là một thầy giáo.", "Thầy giáo đó sống ở đây với mình.", "Người thầy đó đã chuyển đi.", "Ở đây có một ngôi trường."]),
              enVi("I have a friend who speaks three languages.", "Mình có một người bạn nói được ba thứ tiếng.", ["Mình có một người bạn nói được ba thứ tiếng.", "Mình nói được ba thứ tiếng.", "Bạn mình muốn học ba thứ tiếng.", "Mình có ba người bạn."]),
            ],
          },
        ],
        test: quiz([
          fb("The book ___ is on the table is mine.", "which", ["which", "who", "where", "when"]),
          so(["She", "is", "the", "teacher", "who", "teaches", "English"], "She is the teacher who teaches English"),
          viEn("Mình thích những người hay cười.", "I like people who smile a lot.", ["I like people who smile a lot.", "I like people which smile a lot.", "I like people who they smile a lot.", "I like people where smile a lot."]),
          enVi("That is the house where I grew up.", "Kia là ngôi nhà nơi mình lớn lên.", ["Kia là ngôi nhà nơi mình lớn lên.", "Kia là ngôi nhà mình vừa mua.", "Mình lớn lên ở một ngôi nhà khác.", "Kia là ngôi nhà của bạn mình."]),
        ]),
      },
    ],
  },

  {
    slug: "quantifiers",
    title: "Countable & uncountable",
    theme: "Đếm được hay không đếm được",
    level: "KET",
    lessons: [
      {
        slug: "countable-uncountable",
        title: "some · any · much · many",
        sections: [
          {
            id: "quant-1",
            title: "Chọn từ chỉ lượng cho đúng",
            titleEn: "some / any / much / many / a lot of",
            structure: "some (khẳng định) · any (phủ định & nghi vấn) · many + đếm được · much + không đếm được",
            breakdown: [
              part("some water", "some + danh từ", "Dùng trong câu khẳng định và lời mời."),
              part("any milk", "any + danh từ", "Dùng trong câu phủ định và câu hỏi."),
              part("many books / much water", "many vs much", "many đi với danh từ ĐẾM ĐƯỢC số nhiều, much đi với danh từ KHÔNG đếm được."),
            ],
            explanation:
              "Danh từ không đếm được (water, milk, rice, money, bread, homework, information) KHÔNG thêm -s và không đi với “a”.\n- some: câu khẳng định — I have some money. (và trong lời mời: Would you like some tea?)\n- any: câu phủ định và câu hỏi — I don’t have any money. / Do you have any money?\n- many + đếm được: many books · much + không đếm được: much water\n- a lot of dùng được cho cả hai và hợp văn nói: a lot of books, a lot of water.\nMuốn đếm thứ không đếm được thì mượn đơn vị: a glass of water, two pieces of bread.",
            usage: "Dùng khi nói về đồ ăn, tiền bạc, thời gian — những danh từ dễ nhầm.",
            mistakes: [
              mis("I have many money.", "I have a lot of money.", "“money” không đếm được nên không dùng “many”."),
              mis("I don’t have some milk.", "I don’t have any milk.", "Câu phủ định dùng “any”."),
              mis("She gave me two advices.", "She gave me two pieces of advice.", "“advice” không đếm được nên không thêm -s."),
            ],
            examples: [
              ex("Khi mời khách", "Would you like some tea?", "Bạn dùng chút trà nhé?"),
              ex("Khi nói mình hết đồ", "I don’t have any money.", "Mình không còn đồng nào."),
              ex("Khi hỏi số lượng", "How many books do you have?", "Bạn có bao nhiêu quyển sách?"),
            ],
            exercises: [
              fb("I don’t have ___ money.", "any", ["any", "some", "many", "much of"], "Câu phủ định dùng “any”."),
              fb("How ___ books are there?", "many", ["many", "much", "a lot", "some"], "“books” đếm được số nhiều nên dùng “many”."),
              so(["Would", "you", "like", "some", "tea"], "Would you like some tea", "Bạn dùng chút trà nhé?"),
              so(["There", "isn’t", "much", "water", "left"], "There isn’t much water left", "Không còn nhiều nước nữa."),
              viEn("Mình có nhiều bạn bè.", "I have a lot of friends.", ["I have a lot of friends.", "I have much friends.", "I have a lot of friend.", "I have many friend."], "“friends” đếm được — dùng “a lot of” hoặc “many” + số nhiều."),
              viEn("Trong cốc không còn nước nào.", "There isn’t any water in the glass.", ["There isn’t any water in the glass.", "There isn’t some water in the glass.", "There isn’t many water in the glass.", "There aren’t any waters in the glass."], "Phủ định dùng “any”; “water” không đếm được nên không thêm -s."),
              enVi("How much time do we have?", "Chúng mình còn bao nhiêu thời gian?", ["Chúng mình còn bao nhiêu thời gian?", "Chúng mình có bao nhiêu người?", "Bây giờ là mấy giờ?", "Chúng mình đã đi bao lâu?"]),
              enVi("She has a lot of homework tonight.", "Tối nay bạn ấy có nhiều bài tập.", ["Tối nay bạn ấy có nhiều bài tập.", "Tối nay bạn ấy không có bài tập.", "Tối nay bạn ấy làm xong bài tập.", "Tối qua bạn ấy có nhiều bài tập."]),
            ],
          },
        ],
        test: quiz([
          fb("There isn’t ___ bread in the kitchen.", "any", ["any", "some", "many", "a"]),
          so(["How", "much", "water", "do", "you", "drink"], "How much water do you drink"),
          viEn("Mình có một ít tiền.", "I have some money.", ["I have some money.", "I have any money.", "I have many money.", "I have some moneys."]),
          enVi("There are many students in the hall.", "Có nhiều học sinh trong hội trường.", ["Có nhiều học sinh trong hội trường.", "Có ít học sinh trong hội trường.", "Hội trường rất rộng.", "Học sinh đang rời hội trường."]),
        ]),
      },
    ],
  },

  {
    slug: "gerund-infinitive",
    title: "Gerund & infinitive",
    theme: "V-ing hay to V?",
    level: "KET",
    lessons: [
      {
        slug: "gerund-infinitive",
        title: "like doing · want to do",
        sections: [
          {
            id: "gerinf-1",
            title: "Sau động từ thì dùng dạng nào?",
            titleEn: "Gerund or infinitive",
            structure: "enjoy/like/finish + V-ing · want/need/decide + to + V",
            breakdown: [
              part("I enjoy", "Nhóm động từ đi với V-ing", "enjoy, finish, practise, mind, avoid, keep."),
              part("reading", "V-ing (danh động từ)", "Động từ đóng vai trò như một danh từ."),
              part("I want to read", "Nhóm động từ đi với to + V", "want, need, decide, hope, plan, promise, learn."),
            ],
            explanation:
              "Không có mẹo suy luận — phải nhớ theo nhóm:\n- + V-ing: enjoy, finish, practise, mind, avoid, keep, suggest\n- + to V: want, need, decide, hope, plan, promise, learn, would like\n- Cả hai đều được, nghĩa gần như nhau: like, love, hate, start, begin\n- Sau GIỚI TỪ luôn là V-ing: good at drawing, interested in learning, before going.\n- Sau các động từ khuyết thiếu (can, should, must, will) thì dùng động từ TRẦN, không “to”.",
            usage: "Dùng khi viết về sở thích, kế hoạch, hoặc khi làm bài chọn dạng động từ.",
            mistakes: [
              mis("I enjoy to read books.", "I enjoy reading books.", "“enjoy” luôn đi với V-ing."),
              mis("I want going home.", "I want to go home.", "“want” đi với “to + động từ”."),
              mis("She is good at draw.", "She is good at drawing.", "Sau giới từ “at” phải dùng V-ing."),
            ],
            examples: [
              ex("Khi nói sở thích", "I enjoy reading comic books.", "Mình thích đọc truyện tranh."),
              ex("Khi nói kế hoạch", "We decided to visit our grandparents.", "Chúng mình quyết định về thăm ông bà."),
              ex("Sau giới từ", "She is good at drawing.", "Bạn ấy vẽ giỏi."),
            ],
            exercises: [
              fb("I enjoy ___ books.", "reading", ["reading", "to read", "read", "reads"], "“enjoy” luôn đi với V-ing."),
              fb("We decided ___ to the cinema.", "to go", ["to go", "going", "go", "goes"], "“decide” đi với “to + động từ”."),
              so(["She", "is", "good", "at", "drawing"], "She is good at drawing", "Bạn ấy vẽ giỏi."),
              so(["I", "want", "to", "learn", "Japanese"], "I want to learn Japanese", "Mình muốn học tiếng Nhật."),
              viEn("Mình thích bơi vào mùa hè.", "I like swimming in summer.", ["I like swimming in summer.", "I like to swimming in summer.", "I like swim in summer.", "I am like swimming in summer."], "Sau “like” dùng được V-ing (hoặc to + V), nhưng không dùng cả hai."),
              viEn("Bạn ấy đã làm xong bài tập.", "She finished doing her homework.", ["She finished doing her homework.", "She finished to do her homework.", "She finished do her homework.", "She finish doing her homework."], "“finish” luôn đi với V-ing."),
              enVi("He hopes to become a doctor.", "Bạn ấy hi vọng trở thành bác sĩ.", ["Bạn ấy hi vọng trở thành bác sĩ.", "Bạn ấy đã là bác sĩ.", "Bạn ấy không thích làm bác sĩ.", "Bác sĩ hi vọng gặp bạn ấy."]),
              enVi("They keep talking in class.", "Các bạn ấy cứ nói chuyện trong lớp.", ["Các bạn ấy cứ nói chuyện trong lớp.", "Các bạn ấy im lặng trong lớp.", "Các bạn ấy muốn nói chuyện trong lớp.", "Các bạn ấy đã ngừng nói chuyện."]),
            ],
          },
        ],
        test: quiz([
          fb("She practises ___ the piano every day.", "playing", ["playing", "to play", "play", "plays"]),
          so(["I", "need", "to", "buy", "a", "new", "bag"], "I need to buy a new bag"),
          viEn("Mình thích nấu ăn.", "I like cooking.", ["I like cooking.", "I like to cooking.", "I like cook.", "I am like cooking."]),
          enVi("He is interested in learning Korean.", "Bạn ấy hứng thú với việc học tiếng Hàn.", ["Bạn ấy hứng thú với việc học tiếng Hàn.", "Bạn ấy đang dạy tiếng Hàn.", "Bạn ấy không thích tiếng Hàn.", "Bạn ấy đã học tiếng Hàn xong."]),
        ]),
      },
    ],
  },
];
