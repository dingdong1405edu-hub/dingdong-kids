// FLYERS (9–11 tuổi · Cambridge YLE Flyers, A2)
// Bé kể được quá khứ và hiện tại → giờ học nói về TƯƠNG LAI, so sánh NHẤT,
// đưa lời khuyên, và kể chuyện có hai lớp thời gian (past continuous).
import { fb, so, viEn, enVi, ex, mis, part, quiz, type GrammarUnitSeed } from "./types";

export const UNITS: GrammarUnitSeed[] = [
  {
    slug: "superlatives",
    title: "Superlatives",
    theme: "So sánh nhất",
    level: "FLYERS",
    lessons: [
      {
        slug: "superlative-est",
        title: "the …-est · the most …",
        sections: [
          {
            id: "sup-1",
            title: "Nhất trong cả nhóm",
            titleEn: "Superlatives",
            structure: "the + tính từ-est · the most + tính từ dài",
            breakdown: [
              part("the", "Mạo từ bắt buộc", "So sánh nhất LUÔN có “the”."),
              part("tallest", "Tính từ + -est", "Tính từ ngắn thì thêm -est."),
              part("in my class", "Phạm vi so sánh", "Nhất trong nhóm nào — in / of."),
            ],
            explanation:
              "So sánh HƠN là giữa hai thứ; so sánh NHẤT là trong cả nhóm.\n- Tính từ ngắn: tall → the tallest · big → the biggest · happy → the happiest\n- Tính từ dài: the most beautiful · the most interesting\n- Bất quy tắc: good → the best · bad → the worst · far → the furthest\nPhạm vi: dùng “in” với nơi chốn/nhóm (in my class), “of” với danh sách (of the three).",
            usage: "Dùng khi bé nói về bạn cao nhất lớp, con sông dài nhất, món ăn ngon nhất.",
            mistakes: [
              mis("He is tallest in my class.", "He is the tallest in my class.", "So sánh nhất luôn cần “the”."),
              mis("She is the most tall.", "She is the tallest.", "Tính từ ngắn thì thêm -est, không dùng “most”."),
              mis("It is the goodest film.", "It is the best film.", "“good” có dạng riêng là “the best”."),
            ],
            examples: [
              ex("Khi nói về lớp mình", "Nam is the tallest boy in my class.", "Nam là bạn nam cao nhất lớp tớ."),
              ex("Khi nói về địa lý", "The Nile is the longest river in the world.", "Sông Nin là con sông dài nhất thế giới."),
              ex("Khi khen món ăn", "This is the best cake I know.", "Đây là chiếc bánh ngon nhất mà tớ biết."),
            ],
            exercises: [
              fb("Nam is the ___ boy in my class.", "tallest", ["tallest", "taller", "most tall", "tall"], "So sánh nhất với tính từ ngắn: the + tallest."),
              fb("This is the ___ interesting book here.", "most", ["most", "more", "much", "many"], "Tính từ dài thì dùng “the most”."),
              so(["is", "She", "the", "best", "singer"], "She is the best singer", "Bạn ấy là ca sĩ hát hay nhất."),
              so(["is", "It", "the", "biggest", "city"], "It is the biggest city", "Đó là thành phố lớn nhất."),
              viEn("Đây là quyển sách hay nhất của tớ.", "This is my best book.", ["This is my best book.", "This is my goodest book.", "This is my most good book.", "This is my better book."], "“good” → “best”."),
              viEn("Sông Nin là con sông dài nhất thế giới.", "The Nile is the longest river in the world.", ["The Nile is the longest river in the world.", "The Nile is longest river in the world.", "The Nile is the most long river in the world.", "The Nile is longer river in the world."], "Cần “the” và tính từ ngắn thêm -est."),
              enVi("She is the youngest in her family.", "Bạn ấy là người nhỏ tuổi nhất nhà.", ["Bạn ấy là người nhỏ tuổi nhất nhà.", "Bạn ấy là người lớn tuổi nhất nhà.", "Bạn ấy nhỏ tuổi hơn anh mình.", "Gia đình bạn ấy rất trẻ."]),
              enVi("That was the worst day of the week.", "Đó là ngày tệ nhất trong tuần.", ["Đó là ngày tệ nhất trong tuần.", "Đó là ngày vui nhất trong tuần.", "Đó là một ngày tệ.", "Tuần này rất tệ."]),
            ],
          },
        ],
        test: quiz([
          fb("Mount Everest is the ___ mountain in the world.", "highest", ["highest", "higher", "most high", "high"]),
          so(["is", "This", "the", "most", "beautiful", "park"], "This is the most beautiful park"),
          viEn("Bạn ấy là học sinh giỏi nhất lớp.", "She is the best student in the class.", ["She is the best student in the class.", "She is the goodest student in the class.", "She is best student in the class.", "She is the better student in the class."]),
          enVi("It is the smallest cat here.", "Đó là con mèo nhỏ nhất ở đây.", ["Đó là con mèo nhỏ nhất ở đây.", "Đó là con mèo to nhất ở đây.", "Con mèo đó nhỏ hơn con kia.", "Ở đây có nhiều mèo nhỏ."]),
        ]),
      },
    ],
  },

  {
    slug: "future",
    title: "Talking about the future",
    theme: "Chuyện sắp tới",
    level: "FLYERS",
    lessons: [
      {
        slug: "future-going-to",
        title: "be going to — kế hoạch đã định",
        sections: [
          {
            id: "fut-1",
            title: "Việc mình đã định làm",
            titleEn: "be going to",
            structure: "Chủ ngữ + am/is/are + going to + động từ nguyên thể",
            breakdown: [
              part("I", "Chủ ngữ", "Người có kế hoạch."),
              part("am going to", "Cấu trúc tương lai", "Chia to be theo chủ ngữ, phần “going to” giữ nguyên."),
              part("visit my grandma", "Động từ nguyên thể", "Việc đã định làm — KHÔNG thêm -ing, không -s."),
            ],
            explanation:
              "“be going to” dùng cho việc ĐÃ ĐỊNH TRƯỚC hoặc điều sắp xảy ra mà mình nhìn thấy dấu hiệu.\n- I am going to visit my grandma tomorrow. (đã lên kế hoạch)\n- Look at those clouds! It is going to rain. (nhìn thấy dấu hiệu)\nDấu hiệu thời gian: tomorrow, next week, this weekend, tonight.",
            usage: "Dùng khi bé kể kế hoạch cuối tuần, kỳ nghỉ, sinh nhật sắp tới.",
            mistakes: [
              mis("I going to visit my grandma.", "I am going to visit my grandma.", "Thiếu to be — cấu trúc luôn cần am/is/are."),
              mis("She is going to visits the zoo.", "She is going to visit the zoo.", "Sau “going to” là động từ nguyên thể."),
              mis("They is going to play.", "They are going to play.", "“They” đi với “are”."),
            ],
            examples: [
              ex("Khi kể kế hoạch cuối tuần", "I am going to visit my grandma.", "Tớ sẽ về thăm bà."),
              ex("Khi thấy trời sắp mưa", "Look! It is going to rain.", "Nhìn kìa! Trời sắp mưa."),
              ex("Khi rủ bạn", "We are going to watch a film tonight.", "Tối nay chúng tớ sẽ xem phim."),
            ],
            exercises: [
              fb("I ___ going to visit my grandma.", "am", ["am", "is", "are", "be"], "Chủ ngữ “I” đi với “am”."),
              fb("She is going to ___ the zoo tomorrow.", "visit", ["visit", "visits", "visiting", "visited"], "Sau “going to” là động từ nguyên thể."),
              so(["are", "We", "going", "to", "play", "football"], "We are going to play football", "Chúng tớ sẽ chơi bóng đá."),
              so(["is", "It", "going", "to", "rain"], "It is going to rain", "Trời sắp mưa."),
              viEn("Tối nay tớ sẽ xem phim.", "I am going to watch a film tonight.", ["I am going to watch a film tonight.", "I going to watch a film tonight.", "I am going to watching a film tonight.", "I am go to watch a film tonight."], "am + going to + động từ nguyên thể."),
              viEn("Các bạn ấy sẽ đi biển vào tuần sau.", "They are going to go to the beach next week.", ["They are going to go to the beach next week.", "They is going to go to the beach next week.", "They are going to going to the beach next week.", "They going to the beach next week."], "“They” + are going to + động từ nguyên thể."),
              enVi("We are going to have a party.", "Chúng tớ sắp tổ chức một bữa tiệc.", ["Chúng tớ sắp tổ chức một bữa tiệc.", "Chúng tớ vừa tổ chức một bữa tiệc.", "Chúng tớ đang ở một bữa tiệc.", "Chúng tớ thích tiệc tùng."]),
              enVi("He is going to buy a new bike.", "Bạn ấy sắp mua một chiếc xe đạp mới.", ["Bạn ấy sắp mua một chiếc xe đạp mới.", "Bạn ấy vừa mua một chiếc xe đạp mới.", "Bạn ấy muốn một chiếc xe đạp mới.", "Bạn ấy đang đi xe đạp mới."]),
            ],
          },
        ],
        test: quiz([
          fb("They ___ going to visit Hue.", "are", ["are", "is", "am", "be"]),
          so(["am", "I", "going", "to", "study", "tonight"], "I am going to study tonight"),
          viEn("Trời sắp mưa.", "It is going to rain.", ["It is going to rain.", "It going to rain.", "It is going to raining.", "It is go to rain."]),
          enVi("She is going to help her mum.", "Bạn ấy sẽ giúp mẹ.", ["Bạn ấy sẽ giúp mẹ.", "Bạn ấy đã giúp mẹ.", "Bạn ấy đang giúp mẹ.", "Mẹ sẽ giúp bạn ấy."]),
        ]),
      },
      {
        slug: "future-will",
        title: "will — quyết định ngay lúc nói",
        sections: [
          {
            id: "fut-2",
            title: "Hứa, dự đoán, quyết định ngay",
            titleEn: "will / won’t",
            structure: "Chủ ngữ + will + động từ nguyên thể",
            breakdown: [
              part("I", "Chủ ngữ", "“will” dùng chung cho MỌI chủ ngữ."),
              part("will help", "will + động từ", "Không chia, không thêm -s, không có “to”."),
              part("you", "Tân ngữ", "Người được giúp."),
            ],
            explanation:
              "“will” dùng khi:\n- quyết định NGAY lúc nói: The bag is heavy. — I will help you!\n- hứa hẹn: I will call you tonight.\n- dự đoán: I think it will be sunny tomorrow.\nPhủ định: won’t (= will not) — I won’t forget.\nKhác với “be going to”: going to là kế hoạch ĐÃ định từ trước, will là quyết định ngay lúc này.",
            usage: "Dùng khi bé hứa với bố mẹ, đề nghị giúp bạn, hoặc đoán chuyện ngày mai.",
            mistakes: [
              mis("I will to help you.", "I will help you.", "Sau “will” không có “to”."),
              mis("She wills come.", "She will come.", "“will” không bao giờ thêm -s."),
              mis("I will not to go.", "I won’t go.", "Phủ định là “won’t” + động từ nguyên thể."),
            ],
            examples: [
              ex("Khi thấy bạn xách nặng", "I will help you.", "Để tớ giúp bạn."),
              ex("Khi hứa với mẹ", "I will do my homework after dinner.", "Ăn tối xong con sẽ làm bài tập."),
              ex("Khi đoán thời tiết", "I think it will be sunny tomorrow.", "Tớ nghĩ mai trời sẽ nắng."),
            ],
            exercises: [
              fb("Don’t worry. I ___ help you.", "will", ["will", "am", "going", "would"], "Quyết định ngay lúc nói thì dùng “will”."),
              fb("She will ___ to the party.", "come", ["come", "comes", "coming", "to come"], "Sau “will” là động từ nguyên thể."),
              so(["will", "I", "call", "you", "tonight"], "I will call you tonight", "Tối nay tớ sẽ gọi cho bạn."),
              so(["won’t", "He", "forget", "your", "name"], "He won’t forget your name", "Bạn ấy sẽ không quên tên bạn."),
              viEn("Tớ nghĩ ngày mai trời sẽ nắng.", "I think it will be sunny tomorrow.", ["I think it will be sunny tomorrow.", "I think it will sunny tomorrow.", "I think it wills be sunny tomorrow.", "I think it will to be sunny tomorrow."], "will + be + tính từ; không thêm -s, không “to”."),
              viEn("Tớ sẽ không quên đâu.", "I won’t forget.", ["I won’t forget.", "I will not to forget.", "I don’t will forget.", "I won’t to forget."], "Phủ định của “will” là “won’t” + động từ nguyên thể."),
              enVi("I will call you later.", "Lát nữa tớ sẽ gọi cho bạn.", ["Lát nữa tớ sẽ gọi cho bạn.", "Tớ vừa gọi cho bạn.", "Tớ đang gọi cho bạn.", "Bạn hãy gọi cho tớ."]),
              enVi("It won’t be easy.", "Chuyện đó sẽ không dễ đâu.", ["Chuyện đó sẽ không dễ đâu.", "Chuyện đó rất dễ.", "Chuyện đó đã dễ hơn.", "Chuyện đó sẽ rất dễ."]),
            ],
          },
        ],
        test: quiz([
          fb("I ___ tell you a secret.", "will", ["will", "am", "wills", "will to"]),
          so(["will", "We", "see", "you", "tomorrow"], "We will see you tomorrow"),
          viEn("Tớ sẽ giúp bạn.", "I will help you.", ["I will help you.", "I will to help you.", "I wills help you.", "I am will help you."]),
          enVi("She won’t come to school today.", "Hôm nay bạn ấy sẽ không tới trường.", ["Hôm nay bạn ấy sẽ không tới trường.", "Hôm nay bạn ấy sẽ tới trường.", "Hôm qua bạn ấy không tới trường.", "Bạn ấy không thích tới trường."]),
        ]),
      },
    ],
  },

  {
    slug: "present-perfect",
    title: "Present perfect",
    theme: "Đã từng làm chưa?",
    level: "FLYERS",
    lessons: [
      {
        slug: "present-perfect-ever",
        title: "have / has + V3 · ever · never",
        sections: [
          {
            id: "perf-1",
            title: "Kinh nghiệm từ trước tới giờ",
            titleEn: "Present perfect (experience)",
            structure: "Chủ ngữ + have/has + quá khứ phân từ (V3)",
            breakdown: [
              part("I", "Chủ ngữ", "I/you/we/they → have · he/she/it → has."),
              part("have seen", "have + V3", "V3 là cột thứ ba: see – saw – seen."),
              part("a panda", "Tân ngữ", "Điều mình đã từng trải qua."),
            ],
            explanation:
              "Thì này nói về việc ĐÃ TỪNG xảy ra, KHÔNG nói rõ lúc nào.\n- I have seen a panda. (đã từng thấy — không nói khi nào)\n- She has been to Da Nang.\nBa từ hay đi kèm:\n- ever trong câu hỏi: Have you ever eaten sushi?\n- never nghĩa là chưa bao giờ: I have never eaten sushi.\n- just / already / yet: I have just finished. · I haven’t finished yet.\nQuan trọng: nếu đã nói RÕ thời điểm (yesterday, last week) thì phải dùng quá khứ đơn, không dùng thì này.",
            usage: "Dùng khi bé kể mình đã từng làm gì, đã đi đâu, đã ăn món gì.",
            mistakes: [
              mis("I have saw a panda.", "I have seen a panda.", "Sau have/has là V3 (seen), không phải V2 (saw)."),
              mis("She have been to Hue.", "She has been to Hue.", "“She” đi với “has”."),
              mis("I have seen him yesterday.", "I saw him yesterday.", "Có “yesterday” thì dùng quá khứ đơn."),
            ],
            examples: [
              ex("Khi kể trải nghiệm", "I have seen a panda at the zoo.", "Tớ đã từng thấy gấu trúc ở sở thú."),
              ex("Khi hỏi bạn", "Have you ever eaten sushi?", "Bạn đã bao giờ ăn sushi chưa?"),
              ex("Khi nói chưa từng", "I have never been to Japan.", "Tớ chưa bao giờ tới Nhật Bản."),
            ],
            exercises: [
              fb("I have ___ a panda.", "seen", ["seen", "saw", "see", "seeing"], "Sau “have” là V3: seen."),
              fb("She ___ been to Hue twice.", "has", ["has", "have", "is", "had"], "“She” đi với “has”."),
              so(["have", "I", "never", "eaten", "sushi"], "I have never eaten sushi", "Tớ chưa bao giờ ăn sushi."),
              so(["Have", "you", "ever", "seen", "a", "whale"], "Have you ever seen a whale", "Bạn đã bao giờ thấy cá voi chưa?"),
              viEn("Tớ đã từng tới Đà Nẵng.", "I have been to Da Nang.", ["I have been to Da Nang.", "I have went to Da Nang.", "I has been to Da Nang.", "I have be to Da Nang."], "have + been (V3 của “be”)."),
              viEn("Bạn ấy chưa bao giờ ăn xoài.", "She has never eaten a mango.", ["She has never eaten a mango.", "She have never eaten a mango.", "She has never ate a mango.", "She has never eat a mango."], "“She” + has, và V3 của “eat” là “eaten”."),
              enVi("Have you ever ridden a horse?", "Bạn đã bao giờ cưỡi ngựa chưa?", ["Bạn đã bao giờ cưỡi ngựa chưa?", "Bạn có thích cưỡi ngựa không?", "Bạn đang cưỡi ngựa à?", "Bạn sẽ cưỡi ngựa chứ?"]),
              enVi("I have just finished my homework.", "Tớ vừa làm xong bài tập.", ["Tớ vừa làm xong bài tập.", "Tớ sắp làm bài tập.", "Tớ đang làm bài tập.", "Tớ chưa làm bài tập."]),
            ],
          },
        ],
        test: quiz([
          fb("They have ___ to the museum.", "been", ["been", "be", "was", "being"]),
          so(["has", "He", "just", "arrived"], "He has just arrived"),
          viEn("Tớ chưa bao giờ thấy tuyết.", "I have never seen snow.", ["I have never seen snow.", "I have never saw snow.", "I has never seen snow.", "I never have see snow."]),
          enVi("She has already eaten lunch.", "Bạn ấy đã ăn trưa rồi.", ["Bạn ấy đã ăn trưa rồi.", "Bạn ấy chưa ăn trưa.", "Bạn ấy đang ăn trưa.", "Bạn ấy sẽ ăn trưa."]),
        ]),
      },
    ],
  },

  {
    slug: "modals-advice",
    title: "Should & must",
    theme: "Lời khuyên và quy định",
    level: "FLYERS",
    lessons: [
      {
        slug: "should",
        title: "should · shouldn’t",
        sections: [
          {
            id: "mod-1",
            title: "Khuyên bạn nên làm gì",
            titleEn: "should / shouldn’t",
            structure: "Chủ ngữ + should (+ n’t) + động từ nguyên thể",
            breakdown: [
              part("You", "Chủ ngữ", "Người được khuyên."),
              part("should", "Động từ khuyết thiếu", "Nghĩa là “nên”. Dùng chung cho mọi chủ ngữ."),
              part("drink water", "Động từ nguyên thể", "Việc nên làm — không “to”, không -s."),
            ],
            explanation:
              "“should” đưa ra lời khuyên nhẹ nhàng.\n- You should drink more water.\n- You shouldn’t eat too much candy.\nHỏi xin lời khuyên: What should I do?\n“should” giống “can”: không thêm -s, không có “to” theo sau.",
            usage: "Dùng khi bé khuyên bạn, hoặc hỏi người lớn nên làm gì.",
            mistakes: [
              mis("You should to drink water.", "You should drink water.", "Sau “should” không có “to”."),
              mis("He shoulds study more.", "He should study more.", "“should” không thêm -s."),
              mis("You should not to eat that.", "You shouldn’t eat that.", "Phủ định là shouldn’t + động từ nguyên thể."),
            ],
            examples: [
              ex("Khi bạn bị ốm", "You should see a doctor.", "Bạn nên đi khám bác sĩ."),
              ex("Khi bạn mệt", "You should go to bed early.", "Bạn nên đi ngủ sớm."),
              ex("Khi khuyên đừng làm", "You shouldn’t eat too much candy.", "Bạn không nên ăn quá nhiều kẹo."),
            ],
            exercises: [
              fb("You ___ drink more water.", "should", ["should", "shoulds", "should to", "are should"], "“should” dùng nguyên dạng cho mọi chủ ngữ."),
              fb("You shouldn’t ___ so late.", "sleep", ["sleep", "sleeps", "sleeping", "to sleep"], "Sau “shouldn’t” là động từ nguyên thể."),
              so(["should", "You", "see", "a", "doctor"], "You should see a doctor", "Bạn nên đi khám bác sĩ."),
              so(["shouldn’t", "We", "be", "late"], "We shouldn’t be late", "Chúng ta không nên tới muộn."),
              viEn("Bạn nên đi ngủ sớm.", "You should go to bed early.", ["You should go to bed early.", "You should to go to bed early.", "You shoulds go to bed early.", "You are should go to bed early."], "should + động từ nguyên thể."),
              viEn("Bé không nên ăn quá nhiều kẹo.", "You shouldn’t eat too much candy.", ["You shouldn’t eat too much candy.", "You shouldn’t to eat too much candy.", "You don’t should eat too much candy.", "You shouldn’t eating too much candy."], "shouldn’t + động từ nguyên thể."),
              enVi("You should ask your teacher.", "Bạn nên hỏi cô giáo.", ["Bạn nên hỏi cô giáo.", "Bạn phải hỏi cô giáo.", "Bạn đã hỏi cô giáo.", "Cô giáo nên hỏi bạn."]),
              enVi("We shouldn’t run in the classroom.", "Chúng ta không nên chạy trong lớp.", ["Chúng ta không nên chạy trong lớp.", "Chúng ta nên chạy trong lớp.", "Chúng ta không được phép vào lớp.", "Chúng ta đã chạy trong lớp."]),
            ],
          },
        ],
        test: quiz([
          fb("She ___ study for the test.", "should", ["should", "shoulds", "should to", "is should"]),
          so(["should", "You", "wear", "a", "coat"], "You should wear a coat"),
          viEn("Bạn không nên xem TV quá nhiều.", "You shouldn’t watch too much TV.", ["You shouldn’t watch too much TV.", "You shouldn’t to watch too much TV.", "You don’t should watch too much TV.", "You shouldn’t watching too much TV."]),
          enVi("You should eat more vegetables.", "Bạn nên ăn nhiều rau hơn.", ["Bạn nên ăn nhiều rau hơn.", "Bạn không nên ăn rau.", "Bạn phải ăn rau.", "Bạn đã ăn nhiều rau."]),
        ]),
      },
      {
        slug: "must-mustnt",
        title: "must · mustn’t",
        sections: [
          {
            id: "mod-2",
            title: "Bắt buộc và cấm",
            titleEn: "must / mustn’t",
            structure: "Chủ ngữ + must (+ n’t) + động từ nguyên thể",
            breakdown: [
              part("You", "Chủ ngữ", "Người phải làm theo."),
              part("must", "Động từ khuyết thiếu", "Nghĩa là “phải” — mạnh hơn “should” rất nhiều."),
              part("wear a helmet", "Động từ nguyên thể", "Việc bắt buộc."),
            ],
            explanation:
              "- must = phải (quy định, bắt buộc): You must wear a helmet.\n- mustn’t = CẤM, không được phép: You mustn’t touch that.\nChú ý: “mustn’t” KHÔNG phải là “không cần”. “Không cần” là “don’t have to”.\n- You mustn’t go there. (cấm)\n- You don’t have to go there. (không bắt buộc, tuỳ bạn)\n“should” là lời khuyên, “must” là quy định — đọc kỹ đề để chọn đúng.",
            usage: "Dùng cho nội quy lớp học, luật giao thông, biển báo.",
            mistakes: [
              mis("You must to wear a helmet.", "You must wear a helmet.", "Sau “must” không có “to”."),
              mis("You mustn’t come if you are busy.", "You don’t have to come if you are busy.", "“mustn’t” là CẤM; “không bắt buộc” phải dùng “don’t have to”."),
              mis("He musts stop here.", "He must stop here.", "“must” không thêm -s."),
            ],
            examples: [
              ex("Luật giao thông", "You must stop at a red light.", "Gặp đèn đỏ thì phải dừng lại."),
              ex("Nội quy lớp", "We must be quiet in the library.", "Trong thư viện chúng ta phải giữ yên lặng."),
              ex("Biển cấm", "You mustn’t swim here.", "Không được bơi ở đây."),
            ],
            exercises: [
              fb("You ___ wear a helmet when you ride a bike.", "must", ["must", "musts", "must to", "are must"], "Quy định bắt buộc thì dùng “must”."),
              fb("You mustn’t ___ in the museum.", "run", ["run", "runs", "running", "to run"], "Sau “mustn’t” là động từ nguyên thể."),
              so(["must", "We", "be", "quiet", "here"], "We must be quiet here", "Ở đây chúng ta phải giữ yên lặng."),
              so(["mustn’t", "You", "swim", "here"], "You mustn’t swim here", "Bạn không được bơi ở đây."),
              viEn("Gặp đèn đỏ bạn phải dừng lại.", "You must stop at a red light.", ["You must stop at a red light.", "You must to stop at a red light.", "You musts stop at a red light.", "You must stopping at a red light."], "must + động từ nguyên thể."),
              viEn("Bạn không được chạm vào cái đó.", "You mustn’t touch that.", ["You mustn’t touch that.", "You mustn’t to touch that.", "You don’t must touch that.", "You mustn’t touching that."], "mustn’t + động từ nguyên thể."),
              enVi("We must finish our homework first.", "Chúng ta phải làm xong bài tập trước đã.", ["Chúng ta phải làm xong bài tập trước đã.", "Chúng ta nên làm bài tập trước.", "Chúng ta không cần làm bài tập.", "Chúng ta đã làm xong bài tập."]),
              enVi("You mustn’t use your phone in class.", "Bạn không được dùng điện thoại trong lớp.", ["Bạn không được dùng điện thoại trong lớp.", "Bạn không cần dùng điện thoại trong lớp.", "Bạn nên dùng điện thoại trong lớp.", "Bạn được dùng điện thoại trong lớp."]),
            ],
          },
        ],
        test: quiz([
          fb("Students ___ be quiet in the library.", "must", ["must", "musts", "must to", "are must"]),
          so(["mustn’t", "You", "touch", "the", "animals"], "You mustn’t touch the animals"),
          viEn("Chúng ta phải giữ gìn lớp học sạch sẽ.", "We must keep the classroom clean.", ["We must keep the classroom clean.", "We must to keep the classroom clean.", "We musts keep the classroom clean.", "We must keeping the classroom clean."]),
          enVi("You mustn’t feed the birds.", "Bạn không được cho chim ăn.", ["Bạn không được cho chim ăn.", "Bạn không cần cho chim ăn.", "Bạn nên cho chim ăn.", "Bạn đã cho chim ăn."]),
        ]),
      },
    ],
  },

  {
    slug: "past-continuous",
    title: "Past continuous",
    theme: "Lúc đó đang làm gì",
    level: "FLYERS",
    lessons: [
      {
        slug: "past-continuous",
        title: "was / were + V-ing",
        sections: [
          {
            id: "pastc-1",
            title: "Việc đang diễn ra trong quá khứ",
            titleEn: "Past continuous",
            structure: "Chủ ngữ + was/were + động từ-ing",
            breakdown: [
              part("I", "Chủ ngữ", "I/he/she/it → was · you/we/they → were."),
              part("was watching", "was/were + V-ing", "Việc đang diễn ra tại một thời điểm trong quá khứ."),
              part("when he called", "Mệnh đề “when” + quá khứ đơn", "Việc ngắn xen vào việc đang diễn ra."),
            ],
            explanation:
              "Thì này tả việc ĐANG diễn ra tại một lúc nào đó trong quá khứ.\n- At 8 o’clock last night, I was watching TV.\nRất hay đi cùng quá khứ đơn để kể chuyện:\n- I was watching TV when the phone rang. (việc dài + việc ngắn xen vào)\n- While I was reading, my sister was singing. (hai việc dài song song)\nMẹo: việc DÀI dùng was/were + V-ing, việc NGẮN xen vào dùng quá khứ đơn.",
            usage: "Dùng khi bé kể chuyện: lúc đó mình đang làm gì thì có chuyện xảy ra.",
            mistakes: [
              mis("I watching TV when he called.", "I was watching TV when he called.", "Thiếu was/were."),
              mis("They was playing outside.", "They were playing outside.", "“They” đi với “were”."),
              mis("While I was reading, the phone was ringing suddenly.", "While I was reading, the phone rang.", "Việc ngắn xen vào thì dùng quá khứ đơn."),
            ],
            examples: [
              ex("Khi kể chuyện tối qua", "I was watching TV when the phone rang.", "Tớ đang xem TV thì điện thoại reo."),
              ex("Khi tả cảnh cũ", "The birds were singing in the garden.", "Mấy chú chim đang hót trong vườn."),
              ex("Hai việc song song", "While I was cooking, my brother was studying.", "Trong lúc tớ nấu ăn thì em tớ học bài."),
            ],
            exercises: [
              fb("I ___ watching TV when the phone rang.", "was", ["was", "were", "am", "is"], "“I” đi với “was”."),
              fb("They were ___ football at five o’clock.", "playing", ["playing", "play", "played", "plays"], "Sau was/were thì động từ thêm -ing."),
              so(["was", "She", "reading", "a", "book"], "She was reading a book", "Bạn ấy đang đọc sách."),
              so(["were", "We", "waiting", "for", "the", "bus"], "We were waiting for the bus", "Chúng tớ đang đợi xe buýt."),
              viEn("Lúc đó tớ đang làm bài tập.", "I was doing my homework.", ["I was doing my homework.", "I were doing my homework.", "I was do my homework.", "I doing my homework."], "“I” + was + V-ing."),
              viEn("Trời đang mưa lúc chúng tớ tới nơi.", "It was raining when we arrived.", ["It was raining when we arrived.", "It was rain when we arrived.", "It were raining when we arrived.", "It was raining when we were arriving."], "Việc dài dùng was + V-ing, việc ngắn dùng quá khứ đơn."),
              enVi("The children were sleeping.", "Bọn trẻ lúc đó đang ngủ.", ["Bọn trẻ lúc đó đang ngủ.", "Bọn trẻ đang ngủ.", "Bọn trẻ đã ngủ rồi.", "Bọn trẻ sẽ đi ngủ."]),
              enVi("She was cooking when I came home.", "Lúc tớ về nhà thì bạn ấy đang nấu ăn.", ["Lúc tớ về nhà thì bạn ấy đang nấu ăn.", "Bạn ấy nấu ăn sau khi tớ về nhà.", "Tớ nấu ăn khi bạn ấy về nhà.", "Bạn ấy đang nấu ăn bây giờ."]),
            ],
          },
        ],
        test: quiz([
          fb("We ___ playing in the garden at four.", "were", ["were", "was", "are", "is"]),
          so(["was", "He", "sleeping", "when", "I", "called"], "He was sleeping when I called"),
          viEn("Lúc đó mấy chú chim đang hót.", "The birds were singing.", ["The birds were singing.", "The birds was singing.", "The birds were sing.", "The birds singing."]),
          enVi("I was reading when she arrived.", "Tớ đang đọc sách thì bạn ấy tới.", ["Tớ đang đọc sách thì bạn ấy tới.", "Tớ đọc sách sau khi bạn ấy tới.", "Bạn ấy đang đọc sách khi tớ tới.", "Tớ sẽ đọc sách khi bạn ấy tới."]),
        ]),
      },
    ],
  },
];
