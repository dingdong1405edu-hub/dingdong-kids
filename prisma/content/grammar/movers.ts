// MOVERS (7–9 tuổi · Cambridge YLE Movers, A1)
// Bé đã kể được việc hằng ngày → giờ học kể việc ĐANG xảy ra, việc ĐÃ xảy ra,
// và biết so sánh. Đây là ba điểm ngữ pháp chiếm phần lớn đề Movers.
import { fb, so, viEn, enVi, ex, mis, part, quiz, type GrammarUnitSeed } from "./types";

export const UNITS: GrammarUnitSeed[] = [
  {
    slug: "present-continuous",
    title: "Present continuous",
    theme: "Đang xảy ra ngay lúc này",
    level: "MOVERS",
    lessons: [
      {
        slug: "present-continuous",
        title: "am / is / are + V-ing",
        sections: [
          {
            id: "presc-1",
            title: "Kể việc đang xảy ra",
            titleEn: "Present continuous",
            structure: "Chủ ngữ + am/is/are + động từ-ing",
            breakdown: [
              part("She", "Chủ ngữ", "Người đang làm việc đó."),
              part("is", "Động từ to be", "Chia theo chủ ngữ: I am · he/she/it is · we/you/they are."),
              part("reading", "Động từ + -ing", "Việc đang diễn ra NGAY BÂY GIỜ."),
            ],
            explanation:
              "Việc đang xảy ra lúc nói thì dùng am/is/are + V-ing.\n- I am eating lunch.\n- She is reading a book.\n- They are playing outside.\nCách thêm -ing:\n- Bình thường: play → playing\n- Kết thúc bằng e câm: make → making, write → writing\n- Một nguyên âm + một phụ âm cuối: run → running, swim → swimming, sit → sitting",
            usage: "Dùng khi tả một bức tranh, kể qua điện thoại việc mình đang làm, hoặc nói “Nhìn kìa!”.",
            mistakes: [
              mis("She reading a book.", "She is reading a book.", "Thiếu “is” — thì tiếp diễn LUÔN cần to be."),
              mis("I am play football.", "I am playing football.", "Có “am” rồi thì động từ phải thêm -ing."),
              mis("He is runing.", "He is running.", "“run” gấp đôi chữ n trước khi thêm -ing."),
            ],
            examples: [
              ex("Khi tả bức tranh", "The boy is riding a bike.", "Bạn nam đang đạp xe."),
              ex("Khi nói chuyện điện thoại", "I am doing my homework.", "Tớ đang làm bài tập."),
              ex("Khi chỉ ra ngoài sân", "Look! The birds are singing.", "Nhìn kìa! Mấy chú chim đang hót."),
            ],
            exercises: [
              fb("She ___ reading a book now.", "is", ["is", "are", "am", "be"], "“She” đi với “is”, và thì tiếp diễn luôn cần to be."),
              fb("They are ___ football in the park.", "playing", ["playing", "play", "plays", "played"], "Sau am/is/are thì động từ thêm -ing."),
              so(["is", "He", "swimming", "now"], "He is swimming now", "Bạn ấy đang bơi."),
              so(["am", "I", "doing", "my", "homework"], "I am doing my homework", "Tớ đang làm bài tập."),
              viEn("Mẹ tớ đang nấu ăn.", "My mum is cooking.", ["My mum is cooking.", "My mum cooking.", "My mum is cook.", "My mum are cooking."], "“My mum” = she → is + cooking."),
              viEn("Các bạn ấy đang chạy ngoài sân.", "They are running outside.", ["They are running outside.", "They are runing outside.", "They is running outside.", "They running outside."], "“run” gấp đôi n trước -ing, và “they” đi với “are”."),
              enVi("The baby is sleeping.", "Em bé đang ngủ.", ["Em bé đang ngủ.", "Em bé ngủ mỗi ngày.", "Em bé đang khóc.", "Em bé đã ngủ rồi."]),
              enVi("We are watching TV.", "Chúng tớ đang xem TV.", ["Chúng tớ đang xem TV.", "Chúng tớ hay xem TV.", "Chúng tớ đang nghe nhạc.", "Chúng tớ đã xem TV."]),
            ],
          },
        ],
        test: quiz([
          fb("Look! The cat ___ climbing the tree.", "is", ["is", "are", "am", "be"]),
          so(["are", "The", "children", "playing"], "The children are playing"),
          viEn("Tớ đang ăn sáng.", "I am having breakfast.", ["I am having breakfast.", "I have breakfast now.", "I am have breakfast.", "I having breakfast."]),
          enVi("She is writing a letter.", "Bạn ấy đang viết một lá thư.", ["Bạn ấy đang viết một lá thư.", "Bạn ấy hay viết thư.", "Bạn ấy đang đọc một lá thư.", "Bạn ấy đã viết thư rồi."]),
        ]),
      },
      {
        slug: "present-continuous-vs-simple",
        title: "Đang làm vs. thường làm",
        sections: [
          {
            id: "presc-2",
            title: "Chọn đúng thì: now hay every day?",
            titleEn: "Present continuous vs present simple",
            structure: "now / at the moment → am/is/are + V-ing · every day / always → V (+s)",
            breakdown: [
              part("every day", "Dấu hiệu hiện tại đơn", "Việc lặp lại → dùng V hoặc V-s."),
              part("now", "Dấu hiệu hiện tại tiếp diễn", "Việc đang xảy ra → dùng am/is/are + V-ing."),
              part("I play / I am playing", "Hai dạng", "Cùng một động từ, khác thì, khác nghĩa."),
            ],
            explanation:
              "Nhìn DẤU HIỆU trong câu để chọn thì:\n- now, at the moment, Look!, Listen! → hiện tại tiếp diễn\n- every day, always, usually, on Sunday, never → hiện tại đơn\nVí dụ so sánh:\n- I play football every day. (thói quen)\n- I am playing football now. (đang chơi)\nMột số động từ chỉ cảm giác/suy nghĩ hầu như không dùng -ing: like, love, want, know, have (sở hữu).",
            usage: "Dùng khi bé phải chọn giữa hai thì trong bài tập hoặc khi kể chuyện.",
            mistakes: [
              mis("I am playing football every day.", "I play football every day.", "“every day” là thói quen nên dùng hiện tại đơn."),
              mis("Look! She reads a book.", "Look! She is reading a book.", "“Look!” báo hiệu việc đang xảy ra."),
              mis("I am wanting a new bike.", "I want a new bike.", "“want” không dùng ở dạng -ing."),
            ],
            examples: [
              ex("Thói quen mỗi ngày", "I go to school every day.", "Ngày nào tớ cũng đi học."),
              ex("Việc đang xảy ra", "I am going to school now.", "Tớ đang trên đường tới trường."),
              ex("Khi nhắc bạn nhìn", "Listen! The birds are singing.", "Nghe kìa! Mấy chú chim đang hót."),
            ],
            exercises: [
              fb("I ___ football every Sunday.", "play", ["play", "am playing", "playing", "plays"], "“every Sunday” là thói quen → hiện tại đơn."),
              fb("Look! She ___ a cake.", "is making", ["is making", "makes", "make", "is make"], "“Look!” báo việc đang xảy ra → tiếp diễn."),
              so(["is", "She", "sleeping", "now"], "She is sleeping now", "Bạn ấy đang ngủ."),
              so(["gets", "He", "up", "at", "six", "every", "day"], "He gets up at six every day", "Ngày nào bạn ấy cũng dậy lúc sáu giờ."),
              viEn("Ngày nào tớ cũng đi bộ tới trường.", "I walk to school every day.", ["I walk to school every day.", "I am walking to school every day.", "I walking to school every day.", "I walks to school every day."], "Thói quen → hiện tại đơn, chủ ngữ “I” nên giữ nguyên động từ."),
              viEn("Bây giờ bạn ấy đang xem TV.", "She is watching TV now.", ["She is watching TV now.", "She watches TV now.", "She watch TV now.", "She is watch TV now."], "“now” → tiếp diễn: is + watching."),
              enVi("They are having lunch at the moment.", "Lúc này các bạn ấy đang ăn trưa.", ["Lúc này các bạn ấy đang ăn trưa.", "Các bạn ấy ăn trưa mỗi ngày.", "Lúc này các bạn ấy đang ăn tối.", "Các bạn ấy đã ăn trưa rồi."]),
              enVi("My dad works in a hospital.", "Bố tớ làm việc ở bệnh viện.", ["Bố tớ làm việc ở bệnh viện.", "Bố tớ đang làm ở bệnh viện lúc này.", "Bố tớ đang ở bệnh viện.", "Bố tớ đã làm ở bệnh viện."]),
            ],
          },
        ],
        test: quiz([
          fb("We ___ TV at the moment.", "are watching", ["are watching", "watch", "watches", "are watch"]),
          so(["always", "She", "gets", "up", "early"], "She always gets up early"),
          viEn("Tớ đang làm bài tập.", "I am doing my homework.", ["I am doing my homework.", "I do my homework.", "I am do my homework.", "I doing my homework."]),
          enVi("He plays tennis on Saturday.", "Thứ Bảy bạn ấy chơi quần vợt.", ["Thứ Bảy bạn ấy chơi quần vợt.", "Bạn ấy đang chơi quần vợt.", "Thứ Bảy bạn ấy xem quần vợt.", "Bạn ấy đã chơi quần vợt."]),
        ]),
      },
    ],
  },

  {
    slug: "past-simple",
    title: "Past simple",
    theme: "Chuyện đã xảy ra rồi",
    level: "MOVERS",
    lessons: [
      {
        slug: "past-was-were",
        title: "was · were",
        sections: [
          {
            id: "past-1",
            title: "Kể chuyện hôm qua với to be",
            titleEn: "Past simple: was / were",
            structure: "I/He/She/It + was · You/We/They + were",
            breakdown: [
              part("I", "Chủ ngữ", "Người hoặc vật được nói đến."),
              part("was", "Dạng quá khứ của am/is", "Dùng với I, he, she, it."),
              part("at home yesterday", "Phần bổ sung", "Cho biết ở đâu, lúc nào."),
            ],
            explanation:
              "am / is → was · are → were\n- I was at home yesterday.\n- They were happy.\nPhủ định: wasn’t / weren’t.\nCâu hỏi: đảo lên đầu — Was he at school? Were you tired?\nDấu hiệu thường gặp: yesterday, last night, last week, two days ago.",
            usage: "Dùng khi bé kể hôm qua mình ở đâu, cảm thấy thế nào, thời tiết ra sao.",
            mistakes: [
              mis("I were at home.", "I was at home.", "“I” đi với “was”."),
              mis("They was happy.", "They were happy.", "“They” số nhiều nên dùng “were”."),
              mis("Yesterday I am tired.", "Yesterday I was tired.", "Có “yesterday” thì phải dùng thì quá khứ."),
            ],
            examples: [
              ex("Khi kể về hôm qua", "I was at home yesterday.", "Hôm qua tớ ở nhà."),
              ex("Khi kể chuyến đi", "We were at the zoo last Sunday.", "Chủ nhật trước chúng tớ ở sở thú."),
              ex("Khi nói về thời tiết", "It wasn’t sunny.", "Trời đã không nắng."),
            ],
            exercises: [
              fb("I ___ at school yesterday.", "was", ["was", "were", "am", "is"], "“I” đi với “was”."),
              fb("They ___ very happy.", "were", ["were", "was", "are", "is"], "“They” số nhiều nên dùng “were”."),
              so(["was", "It", "cold", "yesterday"], "It was cold yesterday", "Hôm qua trời lạnh."),
              so(["were", "We", "at", "the", "zoo"], "We were at the zoo", "Chúng tớ đã ở sở thú."),
              viEn("Hôm qua tớ ở nhà.", "I was at home yesterday.", ["I was at home yesterday.", "I were at home yesterday.", "I am at home yesterday.", "I was at home tomorrow."], "“I” + was, và “yesterday” là quá khứ."),
              viEn("Các bạn ấy đã không mệt.", "They weren’t tired.", ["They weren’t tired.", "They wasn’t tired.", "They aren’t tired.", "They weren’t tire."], "“They” dùng “weren’t”."),
              enVi("She was at the park.", "Bạn ấy đã ở công viên.", ["Bạn ấy đã ở công viên.", "Bạn ấy đang ở công viên.", "Bạn ấy sẽ tới công viên.", "Bạn ấy thích công viên."]),
              enVi("We were very tired last night.", "Tối qua chúng tớ rất mệt.", ["Tối qua chúng tớ rất mệt.", "Tối nay chúng tớ rất mệt.", "Tối qua chúng tớ rất vui.", "Chúng tớ hay mệt vào buổi tối."]),
            ],
          },
        ],
        test: quiz([
          fb("He ___ at the beach last week.", "was", ["was", "were", "is", "are"]),
          so(["were", "You", "late", "yesterday"], "You were late yesterday"),
          viEn("Trời hôm qua rất nóng.", "It was very hot yesterday.", ["It was very hot yesterday.", "It were very hot yesterday.", "It is very hot yesterday.", "It was very hot tomorrow."]),
          enVi("They weren’t at home.", "Các bạn ấy đã không ở nhà.", ["Các bạn ấy đã không ở nhà.", "Các bạn ấy đang ở nhà.", "Bạn ấy đã không ở nhà.", "Các bạn ấy đã ở nhà."]),
        ]),
      },
      {
        slug: "past-ed",
        title: "Động từ thêm -ed và động từ bất quy tắc",
        sections: [
          {
            id: "past-2",
            title: "Kể việc đã làm",
            titleEn: "Past simple: regular & irregular verbs",
            structure: "Chủ ngữ + động từ-ed (hoặc dạng quá khứ đặc biệt)",
            breakdown: [
              part("We", "Chủ ngữ", "Ai đã làm việc đó — thì quá khứ KHÔNG đổi theo chủ ngữ."),
              part("played", "Động từ + -ed", "Việc đã xong trong quá khứ."),
              part("yesterday", "Trạng từ thời gian", "Cho biết chuyện xảy ra khi nào."),
            ],
            explanation:
              "Việc đã xong thì động từ chuyển sang dạng quá khứ.\n- Có quy tắc: thêm -ed (play → played, watch → watched)\n  · kết thúc bằng e: chỉ thêm -d (like → liked)\n  · phụ âm + y: bỏ y, thêm -ied (study → studied)\n  · một nguyên âm + một phụ âm: gấp đôi phụ âm (stop → stopped)\n- Bất quy tắc, phải học thuộc: go → went · see → saw · eat → ate · have → had · do → did · come → came · get → got\nPhủ định và câu hỏi dùng “did”: I didn’t go. / Did you go?  → sau “did” động từ TRỞ VỀ nguyên thể.",
            usage: "Dùng khi bé kể lại một ngày đã qua, một chuyến đi, một câu chuyện.",
            mistakes: [
              mis("Yesterday I go to the zoo.", "Yesterday I went to the zoo.", "“yesterday” thì động từ phải ở quá khứ."),
              mis("I didn’t went home.", "I didn’t go home.", "Đã có “did” thì động từ trở về nguyên thể."),
              mis("She studyed English.", "She studied English.", "Phụ âm + y thì bỏ y, thêm -ied."),
            ],
            examples: [
              ex("Khi kể cuối tuần", "We played football on Saturday.", "Thứ Bảy chúng tớ đã chơi bóng đá."),
              ex("Khi kể chuyến đi", "I went to the zoo last week.", "Tuần trước tớ đã đi sở thú."),
              ex("Khi kể việc chưa làm", "I didn’t do my homework.", "Tớ đã không làm bài tập."),
            ],
            exercises: [
              fb("We ___ football yesterday.", "played", ["played", "play", "plaied", "playd"], "Động từ có quy tắc thì thêm -ed: played."),
              fb("I ___ to the zoo last week.", "went", ["went", "goed", "go", "gone"], "“go” là động từ bất quy tắc, quá khứ là “went”."),
              so(["watched", "She", "a", "film", "last", "night"], "She watched a film last night", "Tối qua bạn ấy đã xem một bộ phim."),
              so(["didn’t", "I", "do", "my", "homework"], "I didn’t do my homework", "Tớ đã không làm bài tập."),
              viEn("Hôm qua tớ đã ăn phở.", "I ate pho yesterday.", ["I ate pho yesterday.", "I eated pho yesterday.", "I eat pho yesterday.", "I did ate pho yesterday."], "“eat” bất quy tắc, quá khứ là “ate”."),
              viEn("Bạn ấy đã học tiếng Anh tối qua.", "She studied English last night.", ["She studied English last night.", "She studyed English last night.", "She study English last night.", "She did studied English last night."], "“study” → bỏ y, thêm -ied."),
              enVi("They visited their grandma.", "Các bạn ấy đã tới thăm bà.", ["Các bạn ấy đã tới thăm bà.", "Các bạn ấy hay tới thăm bà.", "Các bạn ấy sẽ tới thăm bà.", "Bà tới thăm các bạn ấy."]),
              enVi("I saw a big elephant.", "Tớ đã nhìn thấy một con voi to.", ["Tớ đã nhìn thấy một con voi to.", "Tớ nhìn thấy một con voi nhỏ.", "Tớ muốn xem voi.", "Tớ đang nhìn một con voi to."]),
            ],
          },
        ],
        test: quiz([
          fb("She ___ her homework last night.", "did", ["did", "do", "does", "doed"]),
          so(["went", "We", "to", "the", "beach"], "We went to the beach"),
          viEn("Tớ đã không xem TV tối qua.", "I didn’t watch TV last night.", ["I didn’t watch TV last night.", "I didn’t watched TV last night.", "I don’t watch TV last night.", "I not watched TV last night."]),
          enVi("He stopped and looked at me.", "Bạn ấy dừng lại và nhìn tớ.", ["Bạn ấy dừng lại và nhìn tớ.", "Bạn ấy đang dừng lại nhìn tớ.", "Bạn ấy sẽ dừng lại nhìn tớ.", "Tớ dừng lại nhìn bạn ấy."]),
        ]),
      },
    ],
  },

  {
    slug: "comparatives",
    title: "Comparatives",
    theme: "So sánh hơn",
    level: "MOVERS",
    lessons: [
      {
        slug: "comparative-er",
        title: "Tính từ ngắn + -er than",
        sections: [
          {
            id: "comp-1",
            title: "So sánh hai thứ",
            titleEn: "Comparatives with -er than",
            structure: "A + is + tính từ-er + than + B",
            breakdown: [
              part("An elephant", "Vế A", "Thứ nhất — thứ “hơn”."),
              part("is bigger", "Tính từ + -er", "Tính từ ngắn thì thêm -er."),
              part("than a cat", "than + vế B", "Thứ đem ra so sánh."),
            ],
            explanation:
              "Tính từ NGẮN (1 âm tiết) thì thêm -er và luôn có “than”.\n- big → bigger (gấp đôi phụ âm)\n- tall → taller\n- nice → nicer (chỉ thêm -r vì đã có e)\n- happy → happier (phụ âm + y → bỏ y, thêm -ier)\nCâu luôn cần to be: An elephant IS bigger than a cat.",
            usage: "Dùng khi bé so sánh hai con vật, hai đồ vật, hai người bạn.",
            mistakes: [
              mis("An elephant is more big than a cat.", "An elephant is bigger than a cat.", "Tính từ ngắn thì thêm -er, không dùng “more”."),
              mis("She is taller then me.", "She is taller than me.", "So sánh dùng “than”, không phải “then”."),
              mis("My bag is biger than yours.", "My bag is bigger than yours.", "“big” phải gấp đôi chữ g."),
            ],
            examples: [
              ex("Khi so sánh con vật", "An elephant is bigger than a cat.", "Con voi to hơn con mèo."),
              ex("Khi so sánh chiều cao", "My brother is taller than me.", "Anh tớ cao hơn tớ."),
              ex("Khi so sánh thời tiết", "Today is hotter than yesterday.", "Hôm nay nóng hơn hôm qua."),
            ],
            exercises: [
              fb("An elephant is ___ than a cat.", "bigger", ["bigger", "biger", "more big", "big"], "“big” gấp đôi g rồi thêm -er."),
              fb("My brother is taller ___ me.", "than", ["than", "then", "that", "as"], "So sánh hơn luôn dùng “than”."),
              so(["is", "A", "car", "faster", "than", "a", "bike"], "A car is faster than a bike", "Ô tô nhanh hơn xe đạp."),
              so(["is", "Today", "hotter", "than", "yesterday"], "Today is hotter than yesterday", "Hôm nay nóng hơn hôm qua."),
              viEn("Con chó nhà tớ nhỏ hơn con chó nhà bạn.", "My dog is smaller than your dog.", ["My dog is smaller than your dog.", "My dog is more small than your dog.", "My dog is smaller then your dog.", "My dog smaller than your dog."], "Tính từ ngắn + -er và dùng “than”."),
              viEn("Bạn ấy vui hơn hôm qua.", "She is happier than yesterday.", ["She is happier than yesterday.", "She is happyer than yesterday.", "She is more happy than yesterday.", "She happier than yesterday."], "“happy” bỏ y, thêm -ier."),
              enVi("This book is longer than that one.", "Quyển sách này dài hơn quyển kia.", ["Quyển sách này dài hơn quyển kia.", "Quyển sách kia dài hơn quyển này.", "Hai quyển sách dài bằng nhau.", "Quyển sách này ngắn hơn."]),
              enVi("A plane is faster than a train.", "Máy bay nhanh hơn tàu hoả.", ["Máy bay nhanh hơn tàu hoả.", "Tàu hoả nhanh hơn máy bay.", "Máy bay chậm hơn tàu hoả.", "Máy bay to hơn tàu hoả."]),
            ],
          },
        ],
        test: quiz([
          fb("A mouse is ___ than a cat.", "smaller", ["smaller", "more small", "smallest", "small"]),
          so(["is", "My", "bag", "heavier", "than", "yours"], "My bag is heavier than yours"),
          viEn("Hôm nay lạnh hơn hôm qua.", "Today is colder than yesterday.", ["Today is colder than yesterday.", "Today is more cold than yesterday.", "Today is colder then yesterday.", "Today colder than yesterday."]),
          enVi("My sister is younger than me.", "Em gái tớ nhỏ tuổi hơn tớ.", ["Em gái tớ nhỏ tuổi hơn tớ.", "Chị gái tớ lớn tuổi hơn tớ.", "Tớ nhỏ tuổi hơn em gái.", "Em gái tớ cao hơn tớ."]),
        ]),
      },
      {
        slug: "comparative-more",
        title: "more … than và các từ đặc biệt",
        sections: [
          {
            id: "comp-2",
            title: "Tính từ dài và tính từ bất quy tắc",
            titleEn: "more … than / better / worse",
            structure: "A + is + more + tính từ dài + than + B",
            breakdown: [
              part("This film", "Vế A", "Thứ được cho là “hơn”."),
              part("is more interesting", "more + tính từ dài", "Tính từ từ 2–3 âm tiết trở lên thì dùng “more”."),
              part("than that one", "than + vế B", "Thứ đem ra so sánh."),
            ],
            explanation:
              "- Tính từ DÀI (2 âm tiết trở lên): dùng more … than\n  · beautiful → more beautiful · interesting → more interesting · difficult → more difficult\n- Ba từ đặc biệt phải học thuộc:\n  · good → better · bad → worse · far → further\nKHÔNG bao giờ dùng cả hai: “more bigger” là sai.",
            usage: "Dùng khi bé so sánh phim, bài hát, môn học — những thứ tả bằng tính từ dài.",
            mistakes: [
              mis("This film is more good than that one.", "This film is better than that one.", "“good” có dạng riêng là “better”."),
              mis("She is more taller than me.", "She is taller than me.", "Không dùng “more” cùng với -er."),
              mis("Maths is difficulter than art.", "Maths is more difficult than art.", "Tính từ dài thì dùng “more”."),
            ],
            examples: [
              ex("Khi so sánh hai bộ phim", "This film is more interesting than that one.", "Bộ phim này hay hơn bộ kia."),
              ex("Khi khen bạn", "Your picture is better than mine.", "Bức tranh của bạn đẹp hơn của tớ."),
              ex("Khi nói về thời tiết xấu", "The weather today is worse than yesterday.", "Thời tiết hôm nay tệ hơn hôm qua."),
            ],
            exercises: [
              fb("This book is ___ interesting than that one.", "more", ["more", "much", "many", "most"], "“interesting” là tính từ dài nên dùng “more”."),
              fb("Your drawing is ___ than mine.", "better", ["better", "gooder", "more good", "best"], "“good” có dạng so sánh riêng là “better”."),
              so(["is", "Maths", "more", "difficult", "than", "art"], "Maths is more difficult than art", "Môn Toán khó hơn môn Mĩ thuật."),
              so(["is", "The", "weather", "worse", "than", "yesterday"], "The weather is worse than yesterday", "Thời tiết tệ hơn hôm qua."),
              viEn("Bài hát này hay hơn bài kia.", "This song is better than that one.", ["This song is better than that one.", "This song is more good than that one.", "This song is gooder than that one.", "This song is best than that one."], "“good” → “better”."),
              viEn("Con mèo này dễ thương hơn con kia.", "This cat is more beautiful than that one.", ["This cat is more beautiful than that one.", "This cat is beautifuler than that one.", "This cat is more beautifuler than that one.", "This cat beautiful than that one."], "Tính từ dài dùng “more … than”."),
              enVi("Your bike is better than mine.", "Xe đạp của bạn tốt hơn của tớ.", ["Xe đạp của bạn tốt hơn của tớ.", "Xe đạp của tớ tốt hơn của bạn.", "Hai xe đạp giống nhau.", "Xe đạp của bạn mới hơn."]),
              enVi("This game is more exciting than that one.", "Trò chơi này hấp dẫn hơn trò kia.", ["Trò chơi này hấp dẫn hơn trò kia.", "Trò chơi kia hấp dẫn hơn trò này.", "Trò chơi này khó hơn trò kia.", "Hai trò chơi hấp dẫn như nhau."]),
            ],
          },
        ],
        test: quiz([
          fb("English is ___ useful than Latin.", "more", ["more", "much", "most", "many"]),
          so(["is", "This", "film", "better", "than", "that", "one"], "This film is better than that one"),
          viEn("Hôm nay thời tiết tệ hơn.", "The weather is worse today.", ["The weather is worse today.", "The weather is more bad today.", "The weather is badder today.", "The weather is worst today."]),
          enVi("Her house is more beautiful than mine.", "Nhà bạn ấy đẹp hơn nhà tớ.", ["Nhà bạn ấy đẹp hơn nhà tớ.", "Nhà tớ đẹp hơn nhà bạn ấy.", "Nhà bạn ấy to hơn nhà tớ.", "Hai ngôi nhà đẹp như nhau."]),
        ]),
      },
    ],
  },

  {
    slug: "frequency-adverbs",
    title: "Adverbs of frequency",
    theme: "Bao lâu một lần?",
    level: "MOVERS",
    lessons: [
      {
        slug: "frequency-adverbs",
        title: "always · usually · sometimes · never",
        sections: [
          {
            id: "freq-1",
            title: "Nói mình làm việc đó thường xuyên thế nào",
            titleEn: "Adverbs of frequency",
            structure: "Chủ ngữ + trạng từ + động từ thường · Chủ ngữ + to be + trạng từ",
            breakdown: [
              part("I", "Chủ ngữ", "Người làm việc đó."),
              part("always", "Trạng từ tần suất", "always 100% · usually 80% · often 60% · sometimes 40% · never 0%."),
              part("get up early", "Động từ", "Trạng từ đứng NGAY TRƯỚC động từ thường."),
            ],
            explanation:
              "Vị trí là thứ dễ sai nhất:\n- TRƯỚC động từ thường: I always get up early.\n- SAU động từ to be: She is always happy.\nMức độ: always > usually > often > sometimes > never.\n“never” đã mang nghĩa phủ định rồi nên KHÔNG dùng thêm “don’t”.",
            usage: "Dùng khi bé kể thói quen: mấy giờ dậy, có hay ăn sáng không, có hay đi muộn không.",
            mistakes: [
              mis("I get always up early.", "I always get up early.", "Trạng từ đứng trước động từ thường."),
              mis("She always is happy.", "She is always happy.", "Với to be thì trạng từ đứng SAU."),
              mis("I don’t never eat fish.", "I never eat fish.", "“never” đã là phủ định rồi."),
            ],
            examples: [
              ex("Khi kể buổi sáng", "I always brush my teeth.", "Tớ luôn đánh răng."),
              ex("Khi kể về bạn", "She is never late.", "Bạn ấy không bao giờ đi muộn."),
              ex("Khi kể sở thích", "We sometimes play chess.", "Thỉnh thoảng chúng tớ chơi cờ."),
            ],
            exercises: [
              fb("I ___ get up at six.", "always", ["always", "am always", "always am", "be always"], "Trước động từ thường thì chỉ cần trạng từ, không thêm to be."),
              fb("She is ___ late for school.", "never", ["never", "not never", "don’t", "no"], "Với to be thì trạng từ đứng sau; “never” đã là phủ định."),
              so(["always", "I", "brush", "my", "teeth"], "I always brush my teeth", "Tớ luôn đánh răng."),
              so(["is", "He", "usually", "happy"], "He is usually happy", "Bạn ấy thường vui vẻ."),
              viEn("Thỉnh thoảng chúng tớ chơi cờ.", "We sometimes play chess.", ["We sometimes play chess.", "We play sometimes chess.", "We are sometimes play chess.", "Sometimes we are play chess."], "Trạng từ đứng trước động từ thường."),
              viEn("Tớ không bao giờ ăn cá.", "I never eat fish.", ["I never eat fish.", "I don’t never eat fish.", "I never don’t eat fish.", "I am never eat fish."], "“never” đã mang nghĩa phủ định."),
              enVi("She usually walks to school.", "Bạn ấy thường đi bộ tới trường.", ["Bạn ấy thường đi bộ tới trường.", "Bạn ấy luôn đi bộ tới trường.", "Bạn ấy không bao giờ đi bộ tới trường.", "Bạn ấy đang đi bộ tới trường."]),
              enVi("They are often busy at night.", "Buổi tối các bạn ấy thường bận.", ["Buổi tối các bạn ấy thường bận.", "Buổi tối các bạn ấy không bao giờ bận.", "Buổi sáng các bạn ấy thường bận.", "Các bạn ấy luôn bận."]),
            ],
          },
        ],
        test: quiz([
          fb("He ___ eats breakfast at seven.", "usually", ["usually", "is usually", "usually is", "be usually"]),
          so(["never", "She", "eats", "fish"], "She never eats fish"),
          viEn("Tớ luôn làm bài tập.", "I always do my homework.", ["I always do my homework.", "I do always my homework.", "I am always do my homework.", "Always I am do my homework."]),
          enVi("We are sometimes late.", "Thỉnh thoảng chúng tớ đi muộn.", ["Thỉnh thoảng chúng tớ đi muộn.", "Chúng tớ luôn đi muộn.", "Chúng tớ không bao giờ đi muộn.", "Thỉnh thoảng chúng tớ đi sớm."]),
        ]),
      },
    ],
  },
];
