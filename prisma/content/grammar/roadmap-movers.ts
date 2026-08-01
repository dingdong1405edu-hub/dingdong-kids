// Ngữ pháp cho 12 bài LỘ TRÌNH cấp MOVERS (7–9 tuổi · A1).
//
// Thứ tự PHẢI khớp `prisma/content/movers.ts`. Mỗi bài một mẫu câu, dựng bằng
// đúng từ vựng bài đó vừa dạy (My Week → Monday/busy/practise…, At the Beach →
// sand/wave/shell…).
//
// Mỗi phần đủ 8 minigame: 2× fill_blank, 2× sentence_order, 2× dịch Việt→Anh,
// 2× dịch Anh→Việt.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 1 ───────────────────────────
  {
    topic: "My Week",
    sections: [
      {
        id: "rm-mo-01",
        title: "on · in · at — giới từ thời gian",
        titleEn: "Prepositions of time",
        structure: "on + thứ/ngày · in + buổi/tháng · at + giờ",
        breakdown: [
          part("on Monday", "on + thứ, ngày", "Thứ trong tuần và ngày cụ thể."),
          part("in the morning", "in + buổi, tháng, mùa", "Khoảng thời gian dài hơn."),
          part("at six", "at + giờ", "Giờ chính xác, và “at the weekend”."),
        ],
        explanation:
          "Ba giới từ thời gian hay nhầm nhất:\n- on + thứ / ngày: on Monday, on Saturday morning\n- in + buổi / tháng / mùa: in the morning, in May, in summer\n- at + giờ / cuối tuần / đêm: at seven, at the weekend, at night\nTiếng Việt chỉ có một chữ “vào”, nên bé phải nhớ theo nhóm chứ không dịch thẳng được.",
        usage: "Dùng khi bé kể thời khoá biểu trong tuần.",
        mistakes: [
          mis("I practise in Monday.", "I practise on Monday.", "Thứ trong tuần thì dùng “on”."),
          mis("I am busy at the morning.", "I am busy in the morning.", "Buổi trong ngày thì dùng “in the”."),
          mis("We visit grandma in the weekend.", "We visit grandma at the weekend.", "“the weekend” đi với “at”."),
        ],
        examples: [
          ex("Khi kể lịch học", "I practise the piano on Wednesday.", "Thứ Tư tớ tập đàn piano."),
          ex("Khi kể buổi sáng", "I am very busy in the morning.", "Buổi sáng tớ rất bận."),
          ex("Khi kể cuối tuần", "We visit our grandma at the weekend.", "Cuối tuần chúng tớ tới thăm bà."),
        ],
        exercises: [
          fb("I have football ___ Saturday.", "on", ["on", "in", "at", "of"], "Thứ trong tuần thì dùng “on”."),
          fb("She is busy ___ the morning.", "in", ["in", "on", "at", "to"], "Buổi trong ngày thì dùng “in the”."),
          so(["practise", "I", "on", "Monday"], "I practise on Monday", "Thứ Hai tớ luyện tập."),
          so(["visit", "We", "grandma", "at", "the", "weekend"], "We visit grandma at the weekend", "Cuối tuần chúng tớ thăm bà."),
          viEn("Thứ Tư tớ rất bận.", "I am very busy on Wednesday.", ["I am very busy on Wednesday.", "I am very busy in Wednesday.", "I am very busy at Wednesday.", "I very busy on Wednesday."], "Thứ trong tuần → on."),
          viEn("Cuối tuần tớ đi thăm bà.", "I visit my grandma at the weekend.", ["I visit my grandma at the weekend.", "I visit my grandma in the weekend.", "I visit my grandma on weekend.", "I am visit my grandma at the weekend."], "“the weekend” đi với “at”."),
          enVi("It rains a lot in summer.", "Mùa hè trời mưa nhiều.", ["Mùa hè trời mưa nhiều.", "Mùa đông trời mưa nhiều.", "Hôm nay trời mưa nhiều.", "Tớ thích trời mưa."]),
          enVi("My favourite day is Saturday.", "Ngày tớ thích nhất là thứ Bảy.", ["Ngày tớ thích nhất là thứ Bảy.", "Ngày tớ thích nhất là Chủ nhật.", "Thứ Bảy tớ rất bận.", "Tớ thích cuối tuần."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 2 ───────────────────────────
  {
    topic: "After School",
    sections: [
      {
        id: "rm-mo-02",
        title: "always · usually · sometimes · never",
        titleEn: "Adverbs of frequency",
        structure: "Chủ ngữ + trạng từ + động từ thường · to be + trạng từ",
        breakdown: [
          part("I", "Chủ ngữ", "Người làm việc đó."),
          part("always", "Trạng từ tần suất", "always 100% · usually 80% · sometimes 40% · never 0%."),
          part("finish my homework", "Động từ thường", "Trạng từ đứng NGAY TRƯỚC động từ thường."),
        ],
        explanation:
          "Vị trí là chỗ dễ sai nhất:\n- TRƯỚC động từ thường: I always finish my homework.\n- SAU động từ to be: I am always hungry.\n“never” đã mang nghĩa phủ định nên không dùng thêm “don’t”.",
        usage: "Dùng khi bé kể việc mình hay làm sau giờ học.",
        mistakes: [
          mis("I finish always my homework.", "I always finish my homework.", "Trạng từ đứng trước động từ thường."),
          mis("I always am hungry.", "I am always hungry.", "Với to be thì trạng từ đứng SAU."),
          mis("I don’t never eat snacks.", "I never eat snacks.", "“never” đã là phủ định rồi."),
        ],
        examples: [
          ex("Khi kể thói quen", "I always have a snack after school.", "Tan học tớ luôn ăn nhẹ."),
          ex("Khi kể việc hay làm", "I usually play in the playground.", "Tớ thường chơi ở sân trường."),
          ex("Khi nói về cảm giác", "I am always hungry at four o’clock.", "Cứ bốn giờ là tớ đói."),
        ],
        exercises: [
          fb("I ___ finish my homework quickly.", "always", ["always", "am always", "always am", "be always"], "Trước động từ thường thì không cần to be."),
          fb("She is ___ tired after school.", "sometimes", ["sometimes", "sometime is", "is sometimes", "does sometimes"], "Với to be thì trạng từ đứng sau."),
          so(["always", "I", "have", "a", "snack"], "I always have a snack", "Tớ luôn ăn nhẹ."),
          so(["never", "He", "watches", "cartoons"], "He never watches cartoons", "Bạn ấy không bao giờ xem hoạt hình."),
          viEn("Tớ thường chơi ở sân trường.", "I usually play in the playground.", ["I usually play in the playground.", "I play usually in the playground.", "I am usually play in the playground.", "Usually I am play in the playground."], "Trạng từ đứng trước động từ thường."),
          viEn("Tớ không bao giờ đi ngủ muộn.", "I never go to bed late.", ["I never go to bed late.", "I don’t never go to bed late.", "I never don’t go to bed late.", "I am never go to bed late."], "“never” đã mang nghĩa phủ định."),
          enVi("He always cleans his bicycle.", "Bạn ấy luôn lau chiếc xe đạp của mình.", ["Bạn ấy luôn lau chiếc xe đạp của mình.", "Bạn ấy không bao giờ lau xe đạp.", "Bạn ấy đang lau xe đạp.", "Chiếc xe đạp rất sạch."]),
          enVi("I am always hungry after school.", "Tan học là tớ đói.", ["Tan học là tớ đói.", "Tan học tớ không đói.", "Trước giờ học tớ đói.", "Tớ luôn mệt sau giờ học."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 3 ───────────────────────────
  {
    topic: "Hobbies",
    sections: [
      {
        id: "rm-mo-03",
        title: "like · love · enjoy + V-ing",
        titleEn: "Verbs of liking + -ing",
        structure: "like / love / enjoy + động từ-ing",
        breakdown: [
          part("I enjoy", "Động từ chỉ sở thích", "like, love, enjoy, hate."),
          part("collecting", "Động từ + -ing", "Động từ thứ hai luôn thêm -ing."),
          part("stamps", "Tân ngữ", "Thứ mình sưu tầm."),
        ],
        explanation:
          "Sau like / love / enjoy thì động từ thứ hai thêm -ing:\n- I enjoy collecting stamps.\n- She loves drawing.\nMột số động từ đổi chính tả: dance → dancing, draw → drawing, swim → swimming.\nCâu hỏi: What do you like doing? → I like dancing.",
        usage: "Dùng khi bé kể sở thích và hoạt động rảnh rỗi.",
        mistakes: [
          mis("I enjoy collect stamps.", "I enjoy collecting stamps.", "Sau “enjoy” thì động từ thêm -ing."),
          mis("She loves to dancing.", "She loves dancing.", "Không dùng cả “to” lẫn “-ing”."),
          mis("I am like drawing.", "I like drawing.", "Đã có “like” thì không thêm “am”."),
        ],
        examples: [
          ex("Khi kể sở thích", "I enjoy collecting stamps.", "Tớ thích sưu tầm tem."),
          ex("Khi nói về bạn", "She loves drawing animals.", "Bạn ấy rất thích vẽ con vật."),
          ex("Khi rủ bạn", "We like learning together.", "Chúng tớ thích học cùng nhau."),
        ],
        exercises: [
          fb("I enjoy ___ stamps.", "collecting", ["collecting", "collect", "collects", "to collecting"], "Sau “enjoy” thì thêm -ing."),
          fb("She loves ___ .", "dancing", ["dancing", "dance", "dances", "to dancing"], "Sau “love” thì thêm -ing."),
          so(["like", "I", "drawing", "animals"], "I like drawing animals", "Tớ thích vẽ con vật."),
          so(["enjoys", "He", "playing", "the", "guitar"], "He enjoys playing the guitar", "Bạn ấy thích chơi ghi ta."),
          viEn("Tớ thích học những điều mới.", "I like learning new things.", ["I like learning new things.", "I like learn new things.", "I am like learning new things.", "I like to learning new things."], "Sau “like” thì động từ thêm -ing."),
          viEn("Bạn ấy thích nhảy cùng bạn bè.", "She enjoys dancing with her friends.", ["She enjoys dancing with her friends.", "She enjoy dancing with her friends.", "She enjoys dance with her friends.", "She is enjoy dancing with her friends."], "“She” + enjoys, động từ sau thêm -ing."),
          enVi("My hobby is interesting.", "Sở thích của tớ rất thú vị.", ["Sở thích của tớ rất thú vị.", "Sở thích của tớ rất chán.", "Tớ có nhiều sở thích.", "Đây là sở thích mới của tớ."]),
          enVi("They enjoy learning together.", "Các bạn ấy thích học cùng nhau.", ["Các bạn ấy thích học cùng nhau.", "Các bạn ấy học một mình.", "Các bạn ấy đang học cùng nhau.", "Học cùng nhau rất vui."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 4 ───────────────────────────
  {
    topic: "In the City",
    sections: [
      {
        id: "rm-mo-04",
        title: "must · mustn’t — luật đi đường",
        titleEn: "must / mustn’t",
        structure: "Chủ ngữ + must (+ n’t) + động từ nguyên thể",
        breakdown: [
          part("You", "Chủ ngữ", "Người phải làm theo."),
          part("must", "Động từ khuyết thiếu", "“phải” — quy định, luật lệ."),
          part("be careful", "Động từ nguyên thể", "Sau must không có “to”, không thêm -s."),
        ],
        explanation:
          "- must = phải: You must stop at the traffic lights.\n- mustn’t = KHÔNG ĐƯỢC: You mustn’t cross here.\n“must” dùng chung cho mọi chủ ngữ và sau nó luôn là động từ trần.\nĐừng nhầm “mustn’t” (cấm) với “don’t have to” (không bắt buộc).",
        usage: "Dùng khi nói về luật giao thông và an toàn khi đi trong thành phố.",
        mistakes: [
          mis("You must to be careful.", "You must be careful.", "Sau “must” không có “to”."),
          mis("He musts stop.", "He must stop.", "“must” không thêm -s."),
          mis("You mustn’t to cross here.", "You mustn’t cross here.", "Sau “mustn’t” là động từ trần."),
        ],
        examples: [
          ex("Ở ngã tư", "You must stop at the traffic lights.", "Tới đèn giao thông thì phải dừng lại."),
          ex("Khi sang đường", "You must be careful.", "Bé phải cẩn thận."),
          ex("Khi thấy biển cấm", "You mustn’t cross the street here.", "Không được sang đường ở đây."),
        ],
        exercises: [
          fb("You ___ stop at the traffic lights.", "must", ["must", "musts", "must to", "are must"], "Luật lệ thì dùng “must”."),
          fb("You mustn’t ___ on the street.", "play", ["play", "plays", "playing", "to play"], "Sau “mustn’t” là động từ nguyên thể."),
          so(["must", "You", "be", "careful"], "You must be careful", "Bé phải cẩn thận."),
          so(["mustn’t", "We", "cross", "here"], "We mustn’t cross here", "Chúng ta không được sang đường ở đây."),
          viEn("Bé phải nhìn hai bên đường.", "You must look both ways.", ["You must look both ways.", "You must to look both ways.", "You musts look both ways.", "You must looking both ways."], "must + động từ nguyên thể."),
          viEn("Chúng ta không được chạy qua đường.", "We mustn’t run across the street.", ["We mustn’t run across the street.", "We mustn’t to run across the street.", "We don’t must run across the street.", "We mustn’t running across the street."], "mustn’t + động từ nguyên thể."),
          enVi("The city is very noisy.", "Thành phố rất ồn ào.", ["Thành phố rất ồn ào.", "Thành phố rất yên tĩnh.", "Thành phố rất to.", "Tớ thích thành phố."]),
          enVi("You mustn’t cross at a red light.", "Không được sang đường khi đèn đỏ.", ["Không được sang đường khi đèn đỏ.", "Không cần sang đường khi đèn đỏ.", "Nên sang đường khi đèn đỏ.", "Đèn đỏ đã bật."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 5 ───────────────────────────
  {
    topic: "At the Market",
    sections: [
      {
        id: "rm-mo-05",
        title: "How much · How many · some · any",
        titleEn: "Quantifiers at the market",
        structure: "How many + đếm được-s · How much + không đếm được",
        breakdown: [
          part("How many", "Hỏi số lượng", "Dùng với thứ ĐẾM ĐƯỢC: How many apples?"),
          part("How much", "Hỏi lượng / hỏi giá", "Dùng với thứ KHÔNG đếm được, và để hỏi giá tiền."),
          part("some / any", "Từ chỉ lượng", "some cho câu khẳng định · any cho phủ định và câu hỏi."),
        ],
        explanation:
          "- Đếm được (apple, basket): How many apples do you want?\n- Không đếm được (rice, water): How much rice do you need?\n- Hỏi giá luôn dùng “How much”: How much is it?\n- some trong câu khẳng định: I want some vegetables.\n- any trong câu phủ định và câu hỏi: I don’t want any fish. / Have you got any fruit?",
        usage: "Dùng khi bé đi chợ cùng mẹ, hỏi giá và chọn đồ.",
        mistakes: [
          mis("How much apples do you want?", "How many apples do you want?", "“apples” đếm được nên dùng “How many”."),
          mis("How many is it?", "How much is it?", "Hỏi giá luôn dùng “How much”."),
          mis("I don’t want some fish.", "I don’t want any fish.", "Câu phủ định dùng “any”."),
        ],
        examples: [
          ex("Khi hỏi giá", "How much is this basket?", "Cái giỏ này bao nhiêu tiền?"),
          ex("Khi chọn rau", "I want some fresh vegetables.", "Tớ muốn mua ít rau tươi."),
          ex("Khi đếm hoa quả", "How many mangoes do you want?", "Bạn muốn mấy quả xoài?"),
        ],
        exercises: [
          fb("How ___ apples do you want?", "many", ["many", "much", "a lot", "some"], "“apples” đếm được nên dùng “many”."),
          fb("I don’t want ___ fish today.", "any", ["any", "some", "many", "much"], "Câu phủ định dùng “any”."),
          so(["much", "How", "is", "it"], "How much is it", "Cái này bao nhiêu tiền?"),
          so(["want", "I", "some", "vegetables"], "I want some vegetables", "Tớ muốn mua ít rau."),
          viEn("Cái giỏ này bao nhiêu tiền?", "How much is this basket?", ["How much is this basket?", "How many is this basket?", "How much this basket is?", "How much are this basket?"], "Hỏi giá luôn dùng “How much”."),
          viEn("Bạn muốn mấy quả xoài?", "How many mangoes do you want?", ["How many mangoes do you want?", "How much mangoes do you want?", "How many mango do you want?", "How many mangoes you want?"], "Đếm được → How many + danh từ số nhiều."),
          enVi("These vegetables are very fresh.", "Rau này rất tươi.", ["Rau này rất tươi.", "Rau này không tươi.", "Hoa quả này rất tươi.", "Tớ thích ăn rau."]),
          enVi("The basket is too heavy.", "Cái giỏ nặng quá.", ["Cái giỏ nặng quá.", "Cái giỏ nhẹ quá.", "Cái giỏ rẻ quá.", "Cái giỏ rất to."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 6 ───────────────────────────
  {
    topic: "Jobs People Do",
    sections: [
      {
        id: "rm-mo-06",
        title: "He works · She helps — thêm -s",
        titleEn: "Present simple: third person -s",
        structure: "He / She / It + động từ + -s",
        breakdown: [
          part("A doctor", "Chủ ngữ ngôi thứ ba SỐ ÍT", "Một người → giống “he/she”."),
          part("helps", "Động từ + -s", "Chỉ ngôi thứ ba số ít mới thêm -s."),
          part("people", "Tân ngữ", "Đối tượng của công việc."),
        ],
        explanation:
          "Nói nghề nghiệp làm gì thì dùng hiện tại đơn:\n- A doctor helps people.\n- A farmer works on a farm.\n- A postman brings letters.\nQuy tắc thêm -s:\n- bình thường: + s (help → helps)\n- kết thúc bằng o, s, x, ch, sh: + es (go → goes, teach → teaches)\n- phụ âm + y: bỏ y, + ies (carry → carries)",
        usage: "Dùng khi bé kể về nghề nghiệp của bố mẹ hoặc mô tả một nghề.",
        mistakes: [
          mis("A doctor help people.", "A doctor helps people.", "Một người → ngôi thứ ba số ít → thêm -s."),
          mis("A farmer gos to the field.", "A farmer goes to the field.", "Kết thúc bằng -o thì thêm -es."),
          mis("My dad is work in a shop.", "My dad works in a shop.", "Đã có động từ “works” thì không thêm “is”."),
        ],
        examples: [
          ex("Khi kể nghề bác sĩ", "A doctor helps sick people.", "Bác sĩ giúp người bệnh."),
          ex("Khi kể nghề nông", "A farmer works very hard.", "Bác nông dân làm việc rất vất vả."),
          ex("Khi kể nghề đưa thư", "A postman brings letters to our house.", "Bác đưa thư mang thư tới nhà."),
        ],
        exercises: [
          fb("A doctor ___ people.", "helps", ["helps", "help", "is help", "helping"], "Một người → ngôi thứ ba số ít → thêm -s."),
          fb("A driver ___ a bus every day.", "drives", ["drives", "drive", "driveing", "is drive"], "Ngôi thứ ba số ít thêm -s."),
          so(["works", "A", "farmer", "on", "a", "farm"], "A farmer works on a farm", "Bác nông dân làm việc ở nông trại."),
          so(["brings", "A", "postman", "letters"], "A postman brings letters", "Bác đưa thư mang thư tới."),
          viEn("Bác sĩ giúp mọi người.", "A doctor helps people.", ["A doctor helps people.", "A doctor help people.", "A doctor is help people.", "A doctor helping people."], "Ngôi thứ ba số ít thêm -s."),
          viEn("Bố tớ làm việc ở một cửa hàng.", "My dad works in a shop.", ["My dad works in a shop.", "My dad work in a shop.", "My dad is work in a shop.", "My dad working in a shop."], "“My dad” = he → works."),
          enVi("A firefighter is very brave.", "Chú lính cứu hoả rất dũng cảm.", ["Chú lính cứu hoả rất dũng cảm.", "Chú lính cứu hoả rất mệt.", "Bác sĩ rất dũng cảm.", "Tớ muốn làm lính cứu hoả."]),
          enVi("She wears a uniform at work.", "Cô ấy mặc đồng phục khi làm việc.", ["Cô ấy mặc đồng phục khi làm việc.", "Cô ấy mặc đồng phục khi đi học.", "Cô ấy không mặc đồng phục.", "Đồng phục của cô ấy màu xanh."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 7 ───────────────────────────
  {
    topic: "The Seasons",
    sections: [
      {
        id: "rm-mo-07",
        title: "So sánh hai mùa",
        titleEn: "Comparatives with -er than",
        structure: "A + is + tính từ-er + than + B",
        breakdown: [
          part("Summer", "Vế A", "Mùa được cho là “hơn”."),
          part("is hotter", "Tính từ + -er", "Tính từ ngắn thì thêm -er."),
          part("than spring", "than + vế B", "Mùa đem ra so sánh."),
        ],
        explanation:
          "Tính từ NGẮN thì thêm -er và luôn có “than”:\n- cool → cooler · warm → warmer · wet → wetter · cold → colder\nMột nguyên âm + một phụ âm thì gấp đôi phụ âm: hot → hotter, wet → wetter.\nTính từ DÀI thì dùng “more”: more beautiful.",
        usage: "Dùng khi bé so sánh thời tiết các mùa trong năm.",
        mistakes: [
          mis("Summer is more hot than spring.", "Summer is hotter than spring.", "Tính từ ngắn thì thêm -er, không dùng “more”."),
          mis("Autumn is cooler then summer.", "Autumn is cooler than summer.", "So sánh dùng “than”, không phải “then”."),
          mis("Winter is coldest than autumn.", "Winter is colder than autumn.", "So sánh hai thứ thì dùng -er, không dùng -est."),
        ],
        examples: [
          ex("Khi so sánh nhiệt độ", "Summer is hotter than spring.", "Mùa hè nóng hơn mùa xuân."),
          ex("Khi nói về mùa thu", "Autumn is cooler than summer.", "Mùa thu mát hơn mùa hè."),
          ex("Khi nói về mưa", "Summer is wetter than winter.", "Mùa hè mưa nhiều hơn mùa đông."),
        ],
        exercises: [
          fb("Summer is ___ than spring.", "hotter", ["hotter", "hoter", "more hot", "hottest"], "“hot” gấp đôi chữ t rồi thêm -er."),
          fb("Autumn is cooler ___ summer.", "than", ["than", "then", "that", "as"], "So sánh hơn luôn dùng “than”."),
          so(["is", "Winter", "colder", "than", "autumn"], "Winter is colder than autumn", "Mùa đông lạnh hơn mùa thu."),
          so(["is", "Spring", "warmer", "than", "winter"], "Spring is warmer than winter", "Mùa xuân ấm hơn mùa đông."),
          viEn("Mùa hè nóng hơn mùa xuân.", "Summer is hotter than spring.", ["Summer is hotter than spring.", "Summer is more hot than spring.", "Summer is hotter then spring.", "Summer hotter than spring."], "Tính từ ngắn + -er, và cần “than”."),
          viEn("Mùa đông lạnh hơn mùa thu.", "Winter is colder than autumn.", ["Winter is colder than autumn.", "Winter is more cold than autumn.", "Winter is coldest than autumn.", "Winter colder than autumn."], "So sánh hai mùa → colder than."),
          enVi("The weather changes in autumn.", "Mùa thu thời tiết thay đổi.", ["Mùa thu thời tiết thay đổi.", "Mùa thu thời tiết không đổi.", "Mùa xuân thời tiết thay đổi.", "Thời tiết hôm nay rất đẹp."]),
          enVi("Spring is warmer than winter.", "Mùa xuân ấm hơn mùa đông.", ["Mùa xuân ấm hơn mùa đông.", "Mùa đông ấm hơn mùa xuân.", "Mùa xuân lạnh hơn mùa đông.", "Mùa xuân và mùa đông giống nhau."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 8 ───────────────────────────
  {
    topic: "At the Beach",
    sections: [
      {
        id: "rm-mo-08",
        title: "was · were — kể chuyện hôm qua",
        titleEn: "Past simple: was / were",
        structure: "I/He/She/It + was · You/We/They + were",
        breakdown: [
          part("We", "Chủ ngữ", "you, we, they → were · I, he, she, it → was."),
          part("were", "Dạng quá khứ của are", "am/is → was, are → were."),
          part("at the beach", "Nơi chốn", "Chuyện xảy ra ở đâu."),
        ],
        explanation:
          "Kể chuyện đã qua với to be:\n- I was at the beach yesterday.\n- We were very happy.\nPhủ định: wasn’t / weren’t.\nCâu hỏi: Was it sunny? → Yes, it was. / No, it wasn’t.\nDấu hiệu: yesterday, last week, last summer.",
        usage: "Dùng khi bé kể lại chuyến đi biển đã qua.",
        mistakes: [
          mis("I were at the beach.", "I was at the beach.", "“I” đi với “was”."),
          mis("We was very happy.", "We were very happy.", "“We” số nhiều nên dùng “were”."),
          mis("Yesterday it is sunny.", "Yesterday it was sunny.", "Có “yesterday” thì phải dùng quá khứ."),
        ],
        examples: [
          ex("Khi kể chuyến đi", "We were at the beach last Sunday.", "Chủ nhật trước chúng tớ ở biển."),
          ex("Khi tả thời tiết hôm đó", "It was very sunny.", "Hôm đó trời rất nắng."),
          ex("Khi kể cảm giác", "The water was salty.", "Nước biển mặn."),
        ],
        exercises: [
          fb("I ___ at the beach yesterday.", "was", ["was", "were", "am", "is"], "“I” đi với “was”."),
          fb("We ___ very happy.", "were", ["were", "was", "are", "is"], "“We” số nhiều nên dùng “were”."),
          so(["was", "It", "very", "sunny"], "It was very sunny", "Trời hôm đó rất nắng."),
          so(["were", "The", "waves", "big"], "The waves were big", "Sóng rất to."),
          viEn("Hôm qua chúng tớ ở biển.", "We were at the beach yesterday.", ["We were at the beach yesterday.", "We was at the beach yesterday.", "We are at the beach yesterday.", "We were at beach yesterday."], "“We” + were, và “yesterday” là quá khứ."),
          viEn("Cát rất nóng.", "The sand was very hot.", ["The sand was very hot.", "The sand were very hot.", "The sand is very hot.", "The sand very hot."], "“sand” số ít → was."),
          enVi("The shells were beautiful.", "Những chiếc vỏ sò rất đẹp.", ["Những chiếc vỏ sò rất đẹp.", "Chiếc vỏ sò rất đẹp.", "Những chiếc vỏ sò rất nhỏ.", "Tớ nhặt được vỏ sò."]),
          enVi("It wasn’t windy that day.", "Hôm đó trời không có gió.", ["Hôm đó trời không có gió.", "Hôm đó trời có gió.", "Hôm nay trời không có gió.", "Gió hôm đó rất mạnh."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 9 ───────────────────────────
  {
    topic: "In the Forest",
    sections: [
      {
        id: "rm-mo-09",
        title: "Động từ ở quá khứ",
        titleEn: "Past simple: -ed & irregular verbs",
        structure: "Chủ ngữ + động từ-ed (hoặc dạng bất quy tắc)",
        breakdown: [
          part("We", "Chủ ngữ", "Quá khứ đơn KHÔNG đổi theo chủ ngữ."),
          part("climbed", "Động từ + -ed", "Động từ có quy tắc."),
          part("saw", "Dạng bất quy tắc", "see → saw, go → went, hide → hid — phải học thuộc."),
        ],
        explanation:
          "Kể việc đã làm:\n- Có quy tắc: thêm -ed — climb → climbed, walk → walked\n  · kết thúc bằng e: chỉ thêm -d (like → liked)\n  · một nguyên âm + một phụ âm: gấp đôi (stop → stopped)\n- Bất quy tắc: see → saw · go → went · hide → hid · find → found\nPhủ định và câu hỏi dùng “did”, và động từ trở về nguyên thể: We didn’t see a bird.",
        usage: "Dùng khi bé kể lại một chuyến đi rừng hoặc một câu chuyện.",
        mistakes: [
          mis("Yesterday we see a monkey.", "Yesterday we saw a monkey.", "Có “yesterday” thì động từ phải ở quá khứ."),
          mis("We didn’t saw a bird.", "We didn’t see a bird.", "Đã có “did” thì động từ trở về nguyên thể."),
          mis("He climbd the tree.", "He climbed the tree.", "Động từ có quy tắc thì thêm đủ -ed."),
        ],
        examples: [
          ex("Khi kể chuyến đi rừng", "We walked on a quiet path.", "Chúng tớ đi trên một lối mòn yên tĩnh."),
          ex("Khi kể chuyện gặp con vật", "I saw a monkey in a tree.", "Tớ thấy một con khỉ trên cây."),
          ex("Khi kể trò trốn tìm", "The bird hid behind the leaves.", "Chú chim trốn sau tán lá."),
        ],
        exercises: [
          fb("We ___ on a quiet path.", "walked", ["walked", "walk", "walkd", "walking"], "Động từ có quy tắc thì thêm -ed."),
          fb("I ___ a monkey in the forest.", "saw", ["saw", "seed", "see", "seen"], "“see” bất quy tắc, quá khứ là “saw”."),
          so(["climbed", "He", "a", "tall", "tree"], "He climbed a tall tree", "Bạn ấy trèo lên một cái cây cao."),
          so(["didn’t", "We", "see", "any", "birds"], "We didn’t see any birds", "Chúng tớ không thấy con chim nào."),
          viEn("Chúng tớ đã trèo lên một cái cây.", "We climbed a tree.", ["We climbed a tree.", "We climb a tree.", "We climbd a tree.", "We did climbed a tree."], "Động từ có quy tắc → climbed."),
          viEn("Tớ đã nhìn thấy một chú chim đẹp.", "I saw a beautiful bird.", ["I saw a beautiful bird.", "I seed a beautiful bird.", "I see a beautiful bird.", "I did saw a beautiful bird."], "“see” → “saw”."),
          enVi("The forest was very quiet.", "Khu rừng rất yên tĩnh.", ["Khu rừng rất yên tĩnh.", "Khu rừng rất ồn ào.", "Khu rừng rất to.", "Tớ thích khu rừng."]),
          enVi("We found a small path.", "Chúng tớ tìm thấy một lối mòn nhỏ.", ["Chúng tớ tìm thấy một lối mòn nhỏ.", "Chúng tớ đi trên một lối mòn nhỏ.", "Chúng tớ tìm thấy một cái cây nhỏ.", "Lối mòn này rất nhỏ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 10 ───────────────────────────
  {
    topic: "My Best Friend",
    sections: [
      {
        id: "rm-mo-10",
        title: "Sở hữu bằng ’s",
        titleEn: "Possessive ’s",
        structure: "tên người + ’s + đồ vật",
        breakdown: [
          part("Mai", "Người sở hữu", "Tên người đứng trước."),
          part("’s", "Dấu sở hữu", "Thêm ’s vào SAU tên người."),
          part("secret", "Thứ được sở hữu", "Đồ vật hoặc thứ thuộc về người đó."),
        ],
        explanation:
          "Tiếng Việt nói “bí mật CỦA Mai” — chữ “của” đứng giữa. Tiếng Anh gắn ’s vào sau tên:\n- Mai’s secret (bí mật của Mai)\n- my friend’s name (tên của bạn tớ)\nNếu là số nhiều đã có -s rồi thì chỉ thêm dấu ’: my friends’ names.\nĐừng nhầm ’s sở hữu với “is”: “Mai’s kind” = Mai is kind.",
        usage: "Dùng khi bé kể về đồ của bạn, tên của bạn, gia đình của bạn.",
        mistakes: [
          mis("the name of my friend is Mai", "my friend’s name is Mai", "Với người thì dùng ’s, không dùng “of”."),
          mis("Mais book", "Mai’s book", "Thiếu dấu ’ trước s."),
          mis("This is the book of Nam.", "This is Nam’s book.", "Tên người thì gắn ’s."),
        ],
        examples: [
          ex("Khi nói tên bạn", "My best friend’s name is Mai.", "Tên bạn thân của tớ là Mai."),
          ex("Khi nói về đồ của bạn", "This is Nam’s bike.", "Đây là xe đạp của Nam."),
          ex("Khi kể chuyện bí mật", "I keep my friend’s secret.", "Tớ giữ bí mật cho bạn."),
        ],
        exercises: [
          fb("My best ___ name is Mai.", "friend’s", ["friend’s", "friends", "friend", "friends’s"], "Một người bạn → friend’s."),
          fb("This is ___ bike.", "Nam’s", ["Nam’s", "Nams", "Nam", "Nam is"], "Tên người thì gắn ’s."),
          so(["is", "This", "Mai’s", "book"], "This is Mai’s book", "Đây là quyển sách của Mai."),
          so(["My", "friend’s", "sister", "is", "funny"], "My friend’s sister is funny", "Em gái bạn tớ rất hài hước."),
          viEn("Đây là bút của Nam.", "This is Nam’s pen.", ["This is Nam’s pen.", "This is Nam pen.", "This is the pen of Nam.", "This is Nams pen."], "Tên người + ’s + đồ vật."),
          viEn("Tên bạn thân của tớ là Mai.", "My best friend’s name is Mai.", ["My best friend’s name is Mai.", "My best friend name is Mai.", "The name of my best friend is Mai.", "My best friends name is Mai."], "Người sở hữu thì dùng ’s."),
          enVi("Mai’s brother is very kind.", "Anh trai của Mai rất tốt bụng.", ["Anh trai của Mai rất tốt bụng.", "Mai rất tốt bụng.", "Chị gái của Mai rất tốt bụng.", "Anh trai của Mai rất vui tính."]),
          enVi("We share my friend’s toys.", "Chúng tớ chơi chung đồ chơi của bạn tớ.", ["Chúng tớ chơi chung đồ chơi của bạn tớ.", "Bạn tớ chơi chung đồ chơi của tớ.", "Chúng tớ mua đồ chơi cho bạn tớ.", "Bạn tớ có nhiều đồ chơi."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 11 ───────────────────────────
  {
    topic: "Feelings",
    sections: [
      {
        id: "rm-mo-11",
        title: "Why…? — Because…",
        titleEn: "Why / because",
        structure: "Why + are/is + chủ ngữ + tính từ? → Because + mệnh đề",
        breakdown: [
          part("Why", "Từ để hỏi lý do", "Hỏi “vì sao”."),
          part("are you sad?", "Câu hỏi với to be", "Đảo are/is lên trước chủ ngữ."),
          part("Because I lost my ball.", "Câu trả lời", "“Because” + một mệnh đề đủ chủ ngữ và động từ."),
        ],
        explanation:
          "Hỏi lý do: Why are you sad?\nTrả lời: Because I lost my ball.\nSau “because” phải là MỘT MỆNH ĐỀ đủ chủ ngữ + động từ, không phải chỉ một từ.\n- ✔ Because I am tired.\n- ✘ Because tired.",
        usage: "Dùng khi bé nói về cảm xúc và giải thích vì sao mình thấy như vậy.",
        mistakes: [
          mis("Why you are sad?", "Why are you sad?", "Câu hỏi phải đảo “are” lên trước chủ ngữ."),
          mis("Because tired.", "Because I am tired.", "Sau “because” cần đủ chủ ngữ và động từ."),
          mis("Why are you angry? — Because of I lost my toy.", "Because I lost my toy.", "“because” đi với mệnh đề; “because of” mới đi với danh từ."),
        ],
        examples: [
          ex("Khi bạn buồn", "Why are you sad? — Because I miss my mum.", "Sao bạn buồn thế? — Vì tớ nhớ mẹ."),
          ex("Khi bạn vui", "I am happy because we won.", "Tớ vui vì chúng tớ đã thắng."),
          ex("Khi bạn lo", "She is worried because she has a test.", "Bạn ấy lo vì sắp có bài kiểm tra."),
        ],
        exercises: [
          fb("___ are you sad?", "Why", ["Why", "What", "Who", "Where"], "Hỏi lý do thì dùng “Why”."),
          fb("I am happy ___ we won the game.", "because", ["because", "because of", "why", "so that"], "Sau đó là một mệnh đề nên dùng “because”."),
          so(["are", "Why", "you", "angry"], "Why are you angry", "Sao bạn giận thế?"),
          so(["am", "I", "excited", "because", "it", "is", "my", "birthday"], "I am excited because it is my birthday", "Tớ háo hức vì hôm nay sinh nhật tớ."),
          viEn("Sao bạn khóc thế?", "Why are you crying?", ["Why are you crying?", "Why you are crying?", "Why do you crying?", "Why are you cry?"], "Đảo “are” lên trước “you”, động từ thêm -ing."),
          viEn("Tớ buồn vì tớ làm mất quả bóng.", "I am sad because I lost my ball.", ["I am sad because I lost my ball.", "I am sad because of I lost my ball.", "I sad because I lost my ball.", "I am sad because lost my ball."], "Sau “because” là một mệnh đề đủ chủ ngữ + động từ."),
          enVi("She is proud of her drawing.", "Bạn ấy tự hào về bức tranh của mình.", ["Bạn ấy tự hào về bức tranh của mình.", "Bạn ấy buồn vì bức tranh của mình.", "Bạn ấy thích vẽ tranh.", "Bức tranh của bạn ấy rất đẹp."]),
          enVi("He smiles because he is happy.", "Bạn ấy cười vì bạn ấy vui.", ["Bạn ấy cười vì bạn ấy vui.", "Bạn ấy vui vì bạn ấy cười.", "Bạn ấy cười rất tươi.", "Bạn ấy không vui."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 12 ───────────────────────────
  {
    topic: "Helping Others",
    sections: [
      {
        id: "rm-mo-12",
        title: "should · shouldn’t — nên và không nên",
        titleEn: "should / shouldn’t",
        structure: "Chủ ngữ + should (+ n’t) + động từ nguyên thể",
        breakdown: [
          part("We", "Chủ ngữ", "“should” dùng chung cho mọi chủ ngữ."),
          part("should", "Động từ khuyết thiếu", "Nghĩa là “nên” — lời khuyên, nhẹ hơn “must”."),
          part("help our neighbours", "Động từ nguyên thể", "Sau should không có “to”, không thêm -s."),
        ],
        explanation:
          "- should = nên: We should help our neighbours.\n- shouldn’t = không nên: We shouldn’t drop rubbish.\nKhác với “must” (bắt buộc, quy định), “should” chỉ là lời khuyên.\nSau “should” luôn là động từ trần.",
        usage: "Dùng khi bé bàn về việc tốt nên làm ở nhà, ở lớp, ở khu phố.",
        mistakes: [
          mis("We should to help.", "We should help.", "Sau “should” không có “to”."),
          mis("He shoulds be polite.", "He should be polite.", "“should” không thêm -s."),
          mis("We should not to drop rubbish.", "We shouldn’t drop rubbish.", "Phủ định là shouldn’t + động từ trần."),
        ],
        examples: [
          ex("Khi bàn việc tốt", "We should help our neighbours.", "Chúng ta nên giúp hàng xóm."),
          ex("Khi nhắc bạn", "You should be polite to everyone.", "Bạn nên lễ phép với mọi người."),
          ex("Khi nói việc không nên", "We shouldn’t drop rubbish in the street.", "Chúng ta không nên vứt rác ra đường."),
        ],
        exercises: [
          fb("We ___ help our neighbours.", "should", ["should", "shoulds", "should to", "are should"], "“should” dùng nguyên dạng cho mọi chủ ngữ."),
          fb("You shouldn’t ___ rubbish here.", "drop", ["drop", "drops", "dropping", "to drop"], "Sau “shouldn’t” là động từ nguyên thể."),
          so(["should", "We", "tidy", "the", "room"], "We should tidy the room", "Chúng ta nên dọn phòng."),
          so(["shouldn’t", "You", "be", "rude"], "You shouldn’t be rude", "Bạn không nên thô lỗ."),
          viEn("Chúng ta nên giúp người già.", "We should help old people.", ["We should help old people.", "We should to help old people.", "We shoulds help old people.", "We should helping old people."], "should + động từ nguyên thể."),
          viEn("Bạn nên lễ phép với mọi người.", "You should be polite to everyone.", ["You should be polite to everyone.", "You should are polite to everyone.", "You should to be polite to everyone.", "You shoulds be polite to everyone."], "Sau “should” là “be”, không phải “are”."),
          enVi("We should water the plants.", "Chúng ta nên tưới cây.", ["Chúng ta nên tưới cây.", "Chúng ta phải tưới cây.", "Chúng ta đã tưới cây.", "Cây cần nước."]),
          enVi("You shouldn’t forget to say thank you.", "Bạn không nên quên nói lời cảm ơn.", ["Bạn không nên quên nói lời cảm ơn.", "Bạn nên quên lời cảm ơn.", "Bạn đã quên nói cảm ơn.", "Bạn phải nói cảm ơn."]),
        ],
      },
    ],
  },
];
