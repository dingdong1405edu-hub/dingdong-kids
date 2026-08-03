// Ngữ pháp cho 9 bài LỘ TRÌNH cấp FLYERS (9–11 tuổi · A2).
//
// Thứ tự PHẢI khớp `prisma/content/flyers.ts`. Mỗi bài một mẫu câu, dựng bằng
// đúng từ vựng bài đó vừa dạy (Inventions → invent/wheel/electricity…,
// Saving the Planet → recycle/plastic/rubbish…).
//
// Mỗi phần đủ 8 minigame: 2× fill_blank, 2× sentence_order, 2× dịch Việt→Anh,
// 2× dịch Anh→Việt.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 1 ───────────────────────────
  {
    topic: "Holidays",
    sections: [
      {
        id: "rm-fl-01",
        title: "Kể lại kỳ nghỉ đã qua",
        titleEn: "Past simple: irregular verbs",
        structure: "Chủ ngữ + động từ dạng quá khứ + …",
        breakdown: [
          part("We", "Chủ ngữ", "Quá khứ đơn không đổi theo chủ ngữ."),
          part("went", "Động từ bất quy tắc", "go → went. Không có -ed, phải học thuộc."),
          part("to the seaside last summer", "Nơi chốn + thời gian", "Mốc thời gian rõ ràng → bắt buộc dùng quá khứ."),
        ],
        explanation:
          "Kể kỳ nghỉ đã qua thì mọi động từ phải ở quá khứ.\nNhóm bất quy tắc hay dùng nhất khi kể chuyến đi:\n- go → went · see → saw · eat → ate · buy → bought · take → took\n- swim → swam · write → wrote · have → had · come → came\nPhủ định và câu hỏi dùng “did”, và động từ TRỞ VỀ nguyên thể:\n- We didn’t go to the beach. / Did you see the sunrise?",
        usage: "Dùng khi bé kể lại chuyến đi nghỉ hè, viết bưu thiếp cho bạn.",
        mistakes: [
          mis("Last summer we go to the beach.", "Last summer we went to the beach.", "Có “last summer” thì động từ phải ở quá khứ."),
          mis("I buyed a souvenir.", "I bought a souvenir.", "“buy” bất quy tắc, quá khứ là “bought”."),
          mis("We didn’t went home.", "We didn’t go home.", "Đã có “did” thì động từ trở về nguyên thể."),
        ],
        examples: [
          ex("Khi kể chuyến đi", "We went to the seaside last summer.", "Hè năm ngoái chúng tớ đi biển."),
          ex("Khi kể món quà mang về", "I bought a small souvenir for my mum.", "Tớ mua một món quà lưu niệm nhỏ cho mẹ."),
          ex("Khi kể điều đáng nhớ", "I saw a beautiful sunrise.", "Tớ đã thấy một cảnh bình minh rất đẹp."),
        ],
        exercises: [
          fb("Last summer we ___ to the seaside.", "went", ["went", "goed", "go", "gone"], "“go” bất quy tắc, quá khứ là “went”."),
          fb("I ___ a postcard to my friend.", "wrote", ["wrote", "writed", "write", "written"], "“write” bất quy tắc, quá khứ là “wrote”."),
          so(["bought", "I", "a", "souvenir", "for", "my", "mum"], "I bought a souvenir for my mum", "Tớ mua một món quà lưu niệm cho mẹ."),
          so(["didn’t", "We", "take", "many", "photos"], "We didn’t take many photos", "Chúng tớ không chụp nhiều ảnh."),
          viEn("Chúng tớ đã tìm được nhiều vỏ sò đẹp.", "We found many beautiful shells.", ["We found many beautiful shells.", "We finded many beautiful shells.", "We find many beautiful shells.", "We did found many beautiful shells."], "“find” bất quy tắc, quá khứ là “found”."),
          viEn("Kỳ nghỉ rất thú vị.", "The holiday was very exciting.", ["The holiday was very exciting.", "The holiday were very exciting.", "The holiday is very exciting.", "The holiday was very excited."], "“holiday” số ít → was; sự vật thì dùng “exciting”."),
          enVi("I packed my suitcase last night.", "Tối qua tớ đã sắp va li.", ["Tối qua tớ đã sắp va li.", "Tối nay tớ sẽ sắp va li.", "Tớ đang sắp va li.", "Va li của tớ rất nặng."]),
          enVi("We swam in the sea every day.", "Ngày nào chúng tớ cũng bơi ở biển.", ["Ngày nào chúng tớ cũng bơi ở biển.", "Chúng tớ sẽ bơi ở biển mỗi ngày.", "Chúng tớ đang bơi ở biển.", "Chúng tớ chưa bao giờ bơi ở biển."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 2 ───────────────────────────
  {
    topic: "Different Countries",
    sections: [
      {
        id: "rm-fl-02",
        title: "Nhất thế giới",
        titleEn: "Superlatives",
        structure: "the + tính từ-est · the most + tính từ dài",
        breakdown: [
          part("the", "Mạo từ bắt buộc", "So sánh nhất LUÔN có “the”."),
          part("largest", "Tính từ + -est", "Tính từ ngắn thì thêm -est."),
          part("in the world", "Phạm vi", "Nhất trong nhóm nào — in the world, in Asia."),
        ],
        explanation:
          "So sánh hơn là giữa HAI thứ; so sánh nhất là trong CẢ NHÓM.\n- Tính từ ngắn: large → the largest · high → the highest · big → the biggest\n- Tính từ dài: the most beautiful · the most traditional\n- Bất quy tắc: good → the best · bad → the worst\nPhạm vi dùng “in” với nơi chốn (in the world) và “of” với danh sách (of the three).",
        usage: "Dùng khi bé so sánh các quốc gia: dân số, diện tích, núi cao nhất.",
        mistakes: [
          mis("Russia is largest country.", "Russia is the largest country.", "So sánh nhất luôn cần “the”."),
          mis("It is the most large country.", "It is the largest country.", "Tính từ ngắn thì thêm -est, không dùng “most”."),
          mis("China has the most big population.", "China has the biggest population.", "“big” là tính từ ngắn → the biggest."),
        ],
        examples: [
          ex("Khi so sánh diện tích", "Russia is the largest country in the world.", "Nga là quốc gia rộng nhất thế giới."),
          ex("Khi nói về núi", "Everest is the highest mountain.", "Everest là ngọn núi cao nhất."),
          ex("Khi nói về lễ hội", "It is the most traditional festival here.", "Đó là lễ hội truyền thống nhất ở đây."),
        ],
        exercises: [
          fb("Russia is the ___ country in the world.", "largest", ["largest", "larger", "most large", "large"], "Tính từ ngắn → the + largest."),
          fb("It is the ___ traditional festival in my country.", "most", ["most", "more", "much", "many"], "Tính từ dài → the most."),
          so(["is", "Everest", "the", "highest", "mountain"], "Everest is the highest mountain", "Everest là ngọn núi cao nhất."),
          so(["has", "China", "the", "biggest", "population"], "China has the biggest population", "Trung Quốc có dân số đông nhất."),
          viEn("Đây là hòn đảo đẹp nhất.", "This is the most beautiful island.", ["This is the most beautiful island.", "This is the beautifulest island.", "This is most beautiful island.", "This is the more beautiful island."], "Tính từ dài → the most beautiful."),
          viEn("Đó là sa mạc lớn nhất châu Phi.", "It is the biggest desert in Africa.", ["It is the biggest desert in Africa.", "It is the bigest desert in Africa.", "It is biggest desert in Africa.", "It is the most big desert in Africa."], "“big” gấp đôi g rồi thêm -est, và cần “the”."),
          enVi("Vietnamese is the official language here.", "Tiếng Việt là ngôn ngữ chính thức ở đây.", ["Tiếng Việt là ngôn ngữ chính thức ở đây.", "Tiếng Anh là ngôn ngữ chính thức ở đây.", "Ở đây có nhiều ngôn ngữ.", "Người ở đây nói tiếng Việt."]),
          enVi("Hanoi is the capital of Vietnam.", "Hà Nội là thủ đô của Việt Nam.", ["Hà Nội là thủ đô của Việt Nam.", "Hà Nội là thành phố lớn nhất Việt Nam.", "Việt Nam có nhiều thành phố.", "Thủ đô Việt Nam rất đẹp."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 3 ───────────────────────────
  {
    topic: "Festivals",
    sections: [
      {
        id: "rm-fl-03",
        title: "Phong tục lặp lại hằng năm",
        titleEn: "Present simple for customs",
        structure: "People + động từ + … + every year / on this day",
        breakdown: [
          part("People", "Chủ ngữ số nhiều", "Nói về phong tục chung → động từ giữ nguyên."),
          part("celebrate", "Động từ hiện tại đơn", "Việc lặp lại năm nào cũng thế."),
          part("every year", "Trạng ngữ tần suất", "every year, on this day, in spring."),
        ],
        explanation:
          "Phong tục là việc LẶP LẠI nên dùng hiện tại đơn, không dùng thì tiếp diễn.\n- People celebrate Tet in spring.\n- Children get lucky money.\nChú ý chủ ngữ:\n- People / children / families → động từ giữ nguyên\n- My family / everyone → thêm -s (My family decorates the house.)\nTrạng ngữ hay đi kèm: every year, every spring, on this day.",
        usage: "Dùng khi bé giới thiệu một lễ hội của Việt Nam cho bạn nước ngoài.",
        mistakes: [
          mis("People is celebrating Tet every year.", "People celebrate Tet every year.", "Việc lặp hằng năm → hiện tại đơn, không dùng tiếp diễn."),
          mis("My family decorate the house.", "My family decorates the house.", "“My family” là một khối số ít → thêm -s."),
          mis("Children gets lucky money.", "Children get lucky money.", "“Children” là số nhiều → động từ giữ nguyên."),
        ],
        examples: [
          ex("Khi giới thiệu lễ hội", "People celebrate Tet every spring.", "Mỗi mùa xuân người ta đón Tết."),
          ex("Khi kể phong tục", "Children get lucky money from relatives.", "Trẻ em được người thân mừng tuổi."),
          ex("Khi tả cảnh lễ hội", "My family decorates the house with lanterns.", "Nhà tớ trang trí nhà bằng đèn lồng."),
        ],
        exercises: [
          fb("People ___ Tet every year.", "celebrate", ["celebrate", "celebrates", "are celebrating", "celebrated"], "“People” số nhiều → động từ giữ nguyên."),
          fb("My family ___ the house with flowers.", "decorates", ["decorates", "decorate", "is decorate", "decorating"], "“My family” là một khối số ít → thêm -s."),
          so(["watch", "We", "the", "parade", "every", "year"], "We watch the parade every year", "Năm nào chúng tớ cũng xem diễu hành."),
          so(["wear", "Children", "colourful", "costumes"], "Children wear colourful costumes", "Trẻ em mặc trang phục nhiều màu."),
          viEn("Mọi người xem pháo hoa vào đêm giao thừa.", "People watch fireworks on New Year’s Eve.", ["People watch fireworks on New Year’s Eve.", "People watches fireworks on New Year’s Eve.", "People are watch fireworks on New Year’s Eve.", "People watching fireworks on New Year’s Eve."], "“People” số nhiều → động từ giữ nguyên."),
          viEn("Bà tớ nấu những món ăn ngon.", "My grandma cooks delicious food.", ["My grandma cooks delicious food.", "My grandma cook delicious food.", "My grandma is cook delicious food.", "My grandma cooking delicious food."], "“My grandma” = she → cooks."),
          enVi("Families meet their relatives at Tet.", "Dịp Tết các gia đình gặp gỡ họ hàng.", ["Dịp Tết các gia đình gặp gỡ họ hàng.", "Dịp Tết các gia đình đi du lịch.", "Họ hàng tớ tới thăm nhà tớ.", "Tết là dịp lễ lớn nhất."]),
          enVi("The lanterns look wonderful at night.", "Buổi tối những chiếc đèn lồng trông thật tuyệt.", ["Buổi tối những chiếc đèn lồng trông thật tuyệt.", "Buổi sáng những chiếc đèn lồng rất đẹp.", "Chúng tớ làm đèn lồng vào buổi tối.", "Đèn lồng có nhiều màu."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 4 ───────────────────────────
  {
    topic: "Space",
    sections: [
      {
        id: "rm-fl-04",
        title: "Dự đoán tương lai với will",
        titleEn: "will for predictions",
        structure: "Chủ ngữ + will + động từ nguyên thể",
        breakdown: [
          part("People", "Chủ ngữ", "“will” dùng chung cho MỌI chủ ngữ."),
          part("will live", "will + động từ", "Không chia, không -s, không “to”."),
          part("on Mars one day", "Phần bổ sung", "Mốc thời gian tương lai: one day, in 2050."),
        ],
        explanation:
          "“will” dùng để dự đoán điều mình NGHĨ sẽ xảy ra:\n- I think people will live on Mars one day.\n- Rockets will be faster in the future.\nPhủ định: won’t (= will not).\nHay đi cùng: I think…, maybe, probably, one day, in the future.\nSau “will” luôn là động từ trần — không thêm -s, không có “to”.",
        usage: "Dùng khi bé viết hoặc nói về tương lai của khoa học và vũ trụ.",
        mistakes: [
          mis("People will to live on Mars.", "People will live on Mars.", "Sau “will” không có “to”."),
          mis("She wills be an astronaut.", "She will be an astronaut.", "“will” không bao giờ thêm -s."),
          mis("I think it will is dangerous.", "I think it will be dangerous.", "Sau “will” là “be”, không phải “is”."),
        ],
        examples: [
          ex("Khi dự đoán", "I think people will live on other planets.", "Tớ nghĩ con người sẽ sống ở các hành tinh khác."),
          ex("Khi nói về ước mơ", "She will be an astronaut one day.", "Một ngày nào đó bạn ấy sẽ là phi hành gia."),
          ex("Khi nói điều không xảy ra", "It won’t be easy to live in space.", "Sống trong vũ trụ sẽ không dễ đâu."),
        ],
        exercises: [
          fb("I think people ___ live on Mars one day.", "will", ["will", "wills", "will to", "are will"], "Dự đoán tương lai thì dùng “will” + động từ trần."),
          fb("It ___ be dangerous in space.", "will", ["will", "wills", "will is", "will to"], "Sau “will” là “be”."),
          so(["will", "Rockets", "be", "faster", "in", "the", "future"], "Rockets will be faster in the future", "Trong tương lai tên lửa sẽ nhanh hơn."),
          so(["won’t", "We", "float", "on", "Earth"], "We won’t float on Earth", "Ở Trái Đất chúng ta sẽ không lơ lửng được."),
          viEn("Tớ nghĩ chúng ta sẽ khám phá thêm nhiều hành tinh.", "I think we will discover more planets.", ["I think we will discover more planets.", "I think we will to discover more planets.", "I think we wills discover more planets.", "I think we will discovering more planets."], "will + động từ nguyên thể."),
          viEn("Bạn ấy sẽ trở thành phi hành gia.", "She will be an astronaut.", ["She will be an astronaut.", "She will is an astronaut.", "She wills be an astronaut.", "She will be a astronaut."], "will + be, và “astronaut” bắt đầu bằng nguyên âm → “an”."),
          enVi("A telescope will help us see far stars.", "Kính thiên văn sẽ giúp chúng ta nhìn được những ngôi sao xa.", ["Kính thiên văn sẽ giúp chúng ta nhìn được những ngôi sao xa.", "Kính thiên văn đã giúp chúng ta nhìn thấy sao.", "Chúng ta cần một kính thiên văn.", "Những ngôi sao ở rất xa."]),
          enVi("Astronauts won’t stay there long.", "Các phi hành gia sẽ không ở đó lâu.", ["Các phi hành gia sẽ không ở đó lâu.", "Các phi hành gia sẽ ở đó rất lâu.", "Các phi hành gia đã ở đó lâu rồi.", "Các phi hành gia rất dũng cảm."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 5 ───────────────────────────
  {
    topic: "Inventions",
    sections: [
      {
        id: "rm-fl-05",
        title: "Được phát minh khi nào?",
        titleEn: "Past simple passive",
        structure: "Chủ ngữ + was/were + quá khứ phân từ (+ by …)",
        breakdown: [
          part("The telephone", "Chủ ngữ mới", "Vốn là TÂN NGỮ của câu chủ động."),
          part("was invented", "was/were + V3", "Một cái → was · nhiều cái → were."),
          part("in 1876", "Thời gian / by + người", "Thêm “by …” nếu cần nói ai làm."),
        ],
        explanation:
          "Khi việc QUAN TRỌNG hơn người làm thì dùng bị động.\n- Chủ động: Bell invented the telephone in 1876.\n- Bị động: The telephone was invented in 1876.\nCách đổi: tân ngữ lên làm chủ ngữ · động từ → was/were + V3 · người làm cho vào “by …” (bỏ được nếu không quan trọng).\nLỗi hay gặp: quên “was/were”, hoặc dùng V2 thay vì V3 (invent – invented – invented, make – made – made, build – built – built).",
        usage: "Dùng khi bé viết về lịch sử một phát minh.",
        mistakes: [
          mis("The telephone invented in 1876.", "The telephone was invented in 1876.", "Bị động luôn cần “was/were”."),
          mis("Paper was invent in China.", "Paper was invented in China.", "Sau “was” phải là V3."),
          mis("The wheels was made of wood.", "The wheels were made of wood.", "Chủ ngữ số nhiều → “were”."),
        ],
        examples: [
          ex("Khi nói về phát minh", "The telephone was invented in 1876.", "Điện thoại được phát minh năm 1876."),
          ex("Khi nói về nguồn gốc", "Paper was invented in China.", "Giấy được phát minh ở Trung Quốc."),
          ex("Khi nêu người phát minh", "The light bulb was invented by Edison.", "Bóng đèn được phát minh bởi Edison."),
        ],
        exercises: [
          fb("The telephone ___ invented in 1876.", "was", ["was", "were", "is", "has"], "Một vật, chuyện đã qua → “was”."),
          fb("Paper was ___ in China.", "invented", ["invented", "invent", "inventing", "invents"], "Sau “was” phải là quá khứ phân từ."),
          so(["was", "The", "wheel", "invented", "long", "ago"], "The wheel was invented long ago", "Bánh xe được phát minh từ rất lâu."),
          so(["were", "These", "machines", "made", "in", "Japan"], "These machines were made in Japan", "Những cỗ máy này được sản xuất ở Nhật."),
          viEn("Máy in được phát minh ở châu Âu.", "Printing was invented in Europe.", ["Printing was invented in Europe.", "Printing was invent in Europe.", "Printing invented in Europe.", "Printing were invented in Europe."], "was + V3, chủ ngữ số ít."),
          viEn("Điện được phát hiện cách đây nhiều thế kỷ.", "Electricity was discovered centuries ago.", ["Electricity was discovered centuries ago.", "Electricity were discovered centuries ago.", "Electricity was discover centuries ago.", "Electricity discovered centuries ago."], "“Electricity” không đếm được, số ít → was + V3."),
          enVi("This machine was made in 1920.", "Cỗ máy này được chế tạo năm 1920.", ["Cỗ máy này được chế tạo năm 1920.", "Cỗ máy này đã chế tạo ra nhiều thứ.", "Người ta sẽ chế tạo cỗ máy này.", "Cỗ máy này rất hiện đại."]),
          enVi("Modern phones are used everywhere.", "Điện thoại hiện đại được dùng ở khắp nơi.", ["Điện thoại hiện đại được dùng ở khắp nơi.", "Điện thoại hiện đại đã được phát minh.", "Mọi người thích điện thoại hiện đại.", "Điện thoại hiện đại rất hữu ích."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 6 ───────────────────────────
  {
    topic: "Animals in Danger",
    sections: [
      {
        id: "rm-fl-06",
        title: "must · mustn’t · should",
        titleEn: "Modals for rules and advice",
        structure: "Chủ ngữ + must / mustn’t / should (+ n’t) + động từ nguyên thể",
        breakdown: [
          part("We", "Chủ ngữ", "Ba modal này dùng chung cho mọi chủ ngữ."),
          part("must protect", "must = bắt buộc", "Mạnh nhất — quy định, điều nhất định phải làm."),
          part("shouldn’t drop", "should = lời khuyên", "Nhẹ hơn — nên / không nên."),
        ],
        explanation:
          "Ba mức độ:\n- must = phải (bắt buộc): We must protect wild animals.\n- mustn’t = CẤM: You mustn’t feed the animals.\n- should / shouldn’t = nên / không nên (lời khuyên): We shouldn’t drop rubbish in the forest.\nCả ba đều đi với động từ TRẦN: không “to”, không -s, không -ing.\nNhớ: “mustn’t” là cấm, khác hẳn “don’t have to” (không bắt buộc).",
        usage: "Dùng khi bé viết khẩu hiệu hoặc bài nói về bảo vệ động vật hoang dã.",
        mistakes: [
          mis("We must to protect them.", "We must protect them.", "Sau modal không có “to”."),
          mis("He musts be careful.", "He must be careful.", "Modal không thêm -s."),
          mis("We shouldn’t to drop rubbish.", "We shouldn’t drop rubbish.", "Sau “shouldn’t” là động từ trần."),
        ],
        examples: [
          ex("Khi kêu gọi bảo vệ", "We must protect wild animals.", "Chúng ta phải bảo vệ động vật hoang dã."),
          ex("Khi nói điều cấm", "You mustn’t buy things made from turtles.", "Không được mua đồ làm từ rùa biển."),
          ex("Khi khuyên nhẹ nhàng", "We should keep the forest clean.", "Chúng ta nên giữ rừng sạch sẽ."),
        ],
        exercises: [
          fb("We ___ protect animals in danger.", "must", ["must", "musts", "must to", "are must"], "Điều nhất định phải làm → “must”."),
          fb("We ___ drop rubbish in the forest.", "shouldn’t", ["shouldn’t", "should", "don’t should", "shouldn’t to"], "Lời khuyên phủ định → “shouldn’t” + động từ trần."),
          so(["must", "We", "save", "the", "forest"], "We must save the forest", "Chúng ta phải cứu lấy khu rừng."),
          so(["mustn’t", "You", "touch", "wild", "animals"], "You mustn’t touch wild animals", "Không được chạm vào động vật hoang dã."),
          viEn("Chúng ta phải cẩn thận với động vật hoang dã.", "We must be careful with wild animals.", ["We must be careful with wild animals.", "We must to be careful with wild animals.", "We musts be careful with wild animals.", "We must are careful with wild animals."], "must + be (động từ trần)."),
          viEn("Chúng ta không nên vứt rác nhựa ra biển.", "We shouldn’t throw plastic into the sea.", ["We shouldn’t throw plastic into the sea.", "We shouldn’t to throw plastic into the sea.", "We don’t should throw plastic into the sea.", "We shouldn’t throwing plastic into the sea."], "shouldn’t + động từ trần."),
          enVi("Many animals are disappearing.", "Nhiều loài vật đang dần biến mất.", ["Nhiều loài vật đang dần biến mất.", "Nhiều loài vật đã biến mất hết.", "Nhiều loài vật đang quay trở lại.", "Chúng ta phải cứu các loài vật."]),
          enVi("We must think about the future.", "Chúng ta phải nghĩ tới tương lai.", ["Chúng ta phải nghĩ tới tương lai.", "Chúng ta nên nghĩ tới quá khứ.", "Chúng ta đã nghĩ tới tương lai.", "Tương lai sẽ rất tốt đẹp."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 7 ───────────────────────────
  {
    topic: "Jobs I Want",
    sections: [
      {
        id: "rm-fl-07",
        title: "Ước mơ nghề nghiệp",
        titleEn: "want to be / be going to be",
        structure: "I want to be + a/an + nghề · I am going to be + a/an + nghề",
        breakdown: [
          part("I want to be", "want + to + động từ", "Sau “want” LUÔN có “to”."),
          part("a vet", "a / an + nghề", "Nghề nghiệp đếm được nên cần a/an."),
          part("because I love animals", "Lý do", "Thêm “because” để giải thích."),
        ],
        explanation:
          "Hai cách nói ước mơ nghề nghiệp:\n- I want to be a vet. (mong muốn)\n- I am going to be a doctor. (đã định hướng, chắc chắn hơn)\nHai điều phải nhớ:\n- Sau “want” luôn có “to”: want to be, want to learn.\n- Trước tên nghề luôn có a/an: a pilot, an engineer (nguyên âm → an).",
        usage: "Dùng khi bé viết đoạn văn về nghề mình muốn làm sau này.",
        mistakes: [
          mis("I want be a doctor.", "I want to be a doctor.", "Sau “want” luôn có “to”."),
          mis("I want to be doctor.", "I want to be a doctor.", "Tên nghề cần “a/an”."),
          mis("I want to be a engineer.", "I want to be an engineer.", "“engineer” bắt đầu bằng nguyên âm → “an”."),
        ],
        examples: [
          ex("Khi kể ước mơ", "I want to be a vet because I love animals.", "Tớ muốn làm bác sĩ thú y vì tớ yêu động vật."),
          ex("Khi nói kế hoạch", "I am going to be a pilot.", "Tớ sẽ trở thành phi công."),
          ex("Khi nói việc cần làm", "I need to practise English every day.", "Tớ cần luyện tiếng Anh mỗi ngày."),
        ],
        exercises: [
          fb("I want ___ be a doctor.", "to", ["to", "for", "be", "of"], "Sau “want” luôn có “to”."),
          fb("She wants to be ___ engineer.", "an", ["an", "a", "the", "one"], "“engineer” bắt đầu bằng nguyên âm → “an”."),
          so(["want", "I", "to", "be", "a", "vet"], "I want to be a vet", "Tớ muốn làm bác sĩ thú y."),
          so(["going", "I", "am", "to", "be", "a", "pilot"], "I am going to be a pilot", "Tớ sẽ trở thành phi công."),
          viEn("Tớ muốn trở thành bác sĩ.", "I want to be a doctor.", ["I want to be a doctor.", "I want be a doctor.", "I want to be doctor.", "I want to a doctor."], "want + to + be + a + nghề."),
          viEn("Bạn ấy muốn làm kỹ sư.", "She wants to be an engineer.", ["She wants to be an engineer.", "She want to be an engineer.", "She wants to be a engineer.", "She wants be an engineer."], "“She” + wants, và “engineer” cần “an”."),
          enVi("This job is difficult but helpful.", "Công việc này khó nhưng có ích.", ["Công việc này khó nhưng có ích.", "Công việc này dễ và có ích.", "Công việc này khó và vô ích.", "Tớ thích công việc này."]),
          enVi("A vet takes care of animals.", "Bác sĩ thú y chăm sóc động vật.", ["Bác sĩ thú y chăm sóc động vật.", "Bác sĩ thú y nuôi động vật.", "Bác sĩ chăm sóc người bệnh.", "Tớ muốn làm bác sĩ thú y."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 8 ───────────────────────────
  {
    topic: "Healthy Living",
    sections: [
      {
        id: "rm-fl-08",
        title: "too much · too many · enough",
        titleEn: "too much / too many / enough",
        structure: "too much + không đếm được · too many + đếm được-s · enough + danh từ",
        breakdown: [
          part("too much sugar", "too much + không đếm được", "Quá nhiều — mang nghĩa XẤU."),
          part("too many sweets", "too many + đếm được số nhiều", "Quá nhiều thứ đếm được."),
          part("enough sleep", "enough + danh từ", "Đủ. “enough” đứng TRƯỚC danh từ, nhưng SAU tính từ."),
        ],
        explanation:
          "- too much + danh từ KHÔNG đếm được: too much sugar, too much screen time\n- too many + danh từ ĐẾM ĐƯỢC số nhiều: too many sweets, too many hours\n- enough + danh từ: enough sleep, enough energy\n- Nhưng khi đi với TÍNH TỪ thì “enough” đứng SAU: strong enough, old enough.\n“too” luôn mang nghĩa tiêu cực (nhiều quá mức), khác với “very” (rất).",
        usage: "Dùng khi bé viết về thói quen ăn uống và sinh hoạt lành mạnh.",
        mistakes: [
          mis("I eat too many sugar.", "I eat too much sugar.", "“sugar” không đếm được → “too much”."),
          mis("He watches too much screens.", "He watches too many screens.", "“screens” đếm được số nhiều → “too many”."),
          mis("I don’t sleep enough hours. — I am not enough strong.", "I am not strong enough.", "Đi với tính từ thì “enough” đứng SAU."),
        ],
        examples: [
          ex("Khi nói về đường", "I eat too much sugar.", "Tớ ăn quá nhiều đường."),
          ex("Khi nói về giấc ngủ", "I don’t get enough sleep.", "Tớ ngủ không đủ giấc."),
          ex("Khi nói về vận động", "Exercise gives you enough energy.", "Vận động cho bạn đủ năng lượng."),
        ],
        exercises: [
          fb("I eat too ___ sugar.", "much", ["much", "many", "lot", "more"], "“sugar” không đếm được → “too much”."),
          fb("You spend too ___ hours on the screen.", "many", ["many", "much", "lot of", "more"], "“hours” đếm được số nhiều → “too many”."),
          so(["don’t", "I", "get", "enough", "sleep"], "I don’t get enough sleep", "Tớ ngủ không đủ giấc."),
          so(["eat", "We", "enough", "vegetables", "every", "day"], "We eat enough vegetables every day", "Ngày nào chúng tớ cũng ăn đủ rau."),
          viEn("Bạn ấy ăn quá nhiều kẹo.", "She eats too many sweets.", ["She eats too many sweets.", "She eats too much sweets.", "She eat too many sweets.", "She eats too many sweet."], "“sweets” đếm được số nhiều → too many."),
          viEn("Tớ chưa đủ khoẻ.", "I am not strong enough.", ["I am not strong enough.", "I am not enough strong.", "I am not enough strength.", "I don’t strong enough."], "Đi với tính từ thì “enough” đứng SAU."),
          enVi("Breakfast gives me energy.", "Bữa sáng cho tớ năng lượng.", ["Bữa sáng cho tớ năng lượng.", "Bữa tối cho tớ năng lượng.", "Tớ không ăn sáng.", "Tớ cần nhiều năng lượng."]),
          enVi("Too much screen time is a bad habit.", "Dùng màn hình quá nhiều là một thói quen xấu.", ["Dùng màn hình quá nhiều là một thói quen xấu.", "Dùng màn hình là một thói quen tốt.", "Tớ dùng màn hình rất ít.", "Thói quen này rất khó bỏ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 9 ───────────────────────────
  {
    topic: "Saving the Planet",
    sections: [
      {
        id: "rm-fl-09",
        title: "Nếu chúng ta … thì sẽ …",
        titleEn: "First conditional",
        structure: "If + hiện tại đơn, chủ ngữ + will + động từ",
        breakdown: [
          part("If we recycle", "Mệnh đề if", "Điều kiện — dùng HIỆN TẠI ĐƠN dù nói tương lai."),
          part(",", "Dấu phẩy", "Cần khi mệnh đề “if” đứng trước."),
          part("we will save the planet", "Mệnh đề chính", "Kết quả — dùng “will”."),
        ],
        explanation:
          "Nói về điều CÓ THỂ xảy ra và kết quả của nó:\n- If we recycle bottles, we will reduce waste.\n- We will have a clean world if everyone helps.\nLuật quan trọng nhất: SAU “if” KHÔNG dùng “will”.\nĐảo vế thì bỏ dấu phẩy: We will save water if we turn off the tap.",
        usage: "Dùng khi bé viết bài kêu gọi bảo vệ môi trường.",
        mistakes: [
          mis("If we will recycle, we will save the planet.", "If we recycle, we will save the planet.", "Sau “if” không dùng “will”."),
          mis("If everyone help, the world will be clean.", "If everyone helps, the world will be clean.", "“everyone” là số ít → thêm -s."),
          mis("If we plant trees the air will be clean", "If we plant trees, the air will be clean.", "Vế “if” đứng trước thì cần dấu phẩy."),
        ],
        examples: [
          ex("Khi kêu gọi tái chế", "If we recycle plastic, we will reduce rubbish.", "Nếu tái chế nhựa, chúng ta sẽ giảm được rác."),
          ex("Khi nói về cây xanh", "If we plant more trees, the air will be cleaner.", "Nếu trồng thêm cây, không khí sẽ sạch hơn."),
          ex("Khi nói về nước", "We will save water if we turn off the tap.", "Chúng ta sẽ tiết kiệm nước nếu khoá vòi."),
        ],
        exercises: [
          fb("If we ___ plastic, we will help the Earth.", "reuse", ["reuse", "will reuse", "reused", "are reusing"], "Sau “if” dùng hiện tại đơn."),
          fb("If everyone helps, the world ___ be cleaner.", "will", ["will", "would", "is", "does"], "Vế kết quả dùng “will”."),
          so(["If", "we", "recycle", "we", "will", "save", "trees"], "If we recycle we will save trees", "Nếu tái chế, chúng ta sẽ cứu được nhiều cây."),
          so(["will", "The", "beach", "be", "clean", "if", "we", "pick", "up", "rubbish"], "The beach will be clean if we pick up rubbish", "Bãi biển sẽ sạch nếu chúng ta nhặt rác."),
          viEn("Nếu chúng ta trồng cây, không khí sẽ sạch hơn.", "If we plant trees, the air will be cleaner.", ["If we plant trees, the air will be cleaner.", "If we will plant trees, the air will be cleaner.", "If we plant trees, the air is cleaner.", "If we planted trees, the air will be cleaner."], "Vế if dùng hiện tại đơn, vế chính dùng will."),
          viEn("Nếu bạn dùng bình nước riêng, bạn sẽ giảm rác nhựa.", "If you use your own bottle, you will reduce plastic waste.", ["If you use your own bottle, you will reduce plastic waste.", "If you will use your own bottle, you will reduce plastic waste.", "If you used your own bottle, you will reduce plastic waste.", "If you use your own bottle, you reduce will plastic waste."], "Sau “if” không dùng “will”."),
          enVi("If we waste water, we will have problems.", "Nếu lãng phí nước, chúng ta sẽ gặp rắc rối.", ["Nếu lãng phí nước, chúng ta sẽ gặp rắc rối.", "Chúng ta đã lãng phí rất nhiều nước.", "Nếu gặp rắc rối, chúng ta sẽ lãng phí nước.", "Chúng ta không nên lãng phí nước."]),
          enVi("I will be proud of our clean street.", "Tớ sẽ tự hào về con phố sạch của chúng ta.", ["Tớ sẽ tự hào về con phố sạch của chúng ta.", "Tớ đã tự hào về con phố của chúng ta.", "Con phố của chúng ta rất bẩn.", "Tớ muốn dọn sạch con phố."]),
        ],
      },
    ],
  },
];
