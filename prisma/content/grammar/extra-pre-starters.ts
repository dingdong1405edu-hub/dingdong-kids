// Ngữ pháp cho các bài BỔ SUNG của cấp này (../extra/pre-starters.ts).
//
// Phần tử thứ i ↔ bài bổ sung thứ i (tính dồn qua các chương của file đó).
// `topic` PHẢI khớp từng chữ với `topic` của bài tương ứng.
//
// Thứ tự: My Bedroom · In the Kitchen · My Clothes · The Garden · Sea Animals ·
// The Weather. Mỗi bài chỉ dạy MỘT mẫu câu, và chỉ dùng lại đúng những từ bài đó
// vừa dạy, để bé không phải học từ mới và mẫu câu mới cùng lúc.
//
// Mỗi phần đủ 8 minigame theo luật chung: 2× fill_blank, 2× sentence_order,
// 2× dịch Việt→Anh, 2× dịch Anh→Việt.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 13 ───────────────────────────
  {
    topic: "My Bedroom",
    sections: [
      {
        id: "rm-ps-13",
        title: "Đồ của bé nằm ở đâu?",
        titleEn: "on · in",
        structure: "Đồ vật + is + on/in + the + chỗ",
        breakdown: [
          part("My book", "Đồ vật", "Thứ mà bé đang nói tới."),
          part("is", "Động từ to be", "Một đồ vật thì dùng “is”. Câu tiếng Anh bắt buộc phải có từ này."),
          part("on", "Giới từ", "“ở trên” — nằm trên mặt của cái gì đó. Nằm bên trong thì đổi thành “in”."),
          part("the bed", "Chỗ", "Nơi đồ vật đang nằm."),
        ],
        explanation:
          "Khi bé chỉ cho bố mẹ đồ của mình đang nằm đâu, bé cần MỘT trong hai từ này:\n- on = ở TRÊN mặt → My book is ON the bed.\n- in = ở TRONG → My toy is IN the box.\nTiếng Việt nói “ở trên giường”, tiếng Anh chỉ cần “on the bed” — không thêm từ nào cho chữ “ở”. Và sau “on/in” nhớ có “the”.",
        usage: "Dùng khi bé khoe phòng ngủ, hoặc khi mẹ hỏi “Sách của con đâu?”.",
        mistakes: [
          mis("My book on the bed.", "My book is on the bed.", "Thiếu “is” — tiếng Việt không có từ này nên bé rất hay quên."),
          mis("My toy is on the box.", "My toy is in the box.", "Đồ nằm BÊN TRONG hộp thì dùng “in”; “on” là nằm trên nắp hộp."),
          mis("My lamp is on box.", "My lamp is on the box.", "Sau “on/in” phải có “the” rồi mới tới chỗ."),
        ],
        examples: [
          ex("Khi bé chỉ quyển sách trên giường", "My book is on the bed.", "Quyển sách của tớ ở trên giường."),
          ex("Khi bé cất đồ chơi vào hộp", "My toy is in the box.", "Đồ chơi của tớ ở trong hộp."),
          ex("Khi bé khoe cái đèn mới", "My lamp is on the box.", "Cái đèn của tớ ở trên cái hộp."),
        ],
        exercises: [
          fb("My book ___ on the bed.", "is", ["is", "are", "am", "be"], "Một quyển sách nên dùng “is”."),
          fb("My toy is ___ the box.", "in", ["in", "on", "at", "of"], "Đồ chơi nằm BÊN TRONG hộp nên dùng “in”.", "Ở trong hộp"),
          so(["My", "lamp", "is", "on", "the", "box"], "My lamp is on the box", "Cái đèn của tớ ở trên cái hộp.", "Thứ tự: đồ vật → is → on → the → chỗ."),
          so(["on", "The", "clock", "is", "the", "bed"], "The clock is on the bed", "Cái đồng hồ ở trên giường.", "Nhớ có “is” và “the” thì câu mới đủ."),
          viEn(
            "Quyển sách của tớ ở trên giường.",
            "My book is on the bed.",
            ["My book is on the bed.", "My book on the bed.", "My book is in the bed.", "My book is on bed."],
            "Nằm trên mặt giường nên dùng “on”, và câu cần “is” + “the”.",
          ),
          viEn(
            "Đồ chơi của tớ ở trong hộp.",
            "My toy is in the box.",
            ["My toy is in the box.", "My toy is on the box.", "My toy in the box.", "My toy is in box."],
            "Ở BÊN TRONG hộp thì dùng “in”.",
          ),
          enVi("My lamp is on the box.", "Cái đèn của tớ ở trên cái hộp.", ["Cái đèn của tớ ở trên cái hộp.", "Cái đèn của tớ ở trong cái hộp.", "Cái hộp ở trên cái đèn.", "Cái đèn của tớ màu đỏ."]),
          enVi("The clock is on the bed.", "Cái đồng hồ ở trên giường.", ["Cái đồng hồ ở trên giường.", "Cái đồng hồ ở trong giường.", "Cái giường ở trên đồng hồ.", "Cái đồng hồ màu đỏ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 14 ───────────────────────────
  {
    topic: "In the Kitchen",
    sections: [
      {
        id: "rm-ps-14",
        title: "Bé kể thứ mình nhìn thấy",
        titleEn: "I can see a …",
        structure: "I can see + a + đồ vật",
        breakdown: [
          part("I", "Chủ ngữ", "“Tớ”."),
          part("can see", "Động từ", "“nhìn thấy được”. Sau “can”, động từ giữ NGUYÊN."),
          part("a", "Mạo từ", "“một cái” — đứng trước đồ vật khi chỉ có một."),
          part("cup", "Đồ vật", "Thứ mà bé nhìn thấy."),
        ],
        explanation:
          "Khi bé nhìn quanh và kể ra thứ mình thấy, bé nói “I can see…”.\n- Sau “can”, động từ giữ nguyên: can SEE (không phải “can sees”).\n- Chỉ một cái thì thêm “a” ở trước: a cup, a plate, a pot.\nTiếng Việt nói “Tớ thấy cái cốc” là xong, nhưng tiếng Anh vẫn phải có “a”.",
        usage: "Dùng khi bé đi quanh nhà và kể cho mẹ nghe những thứ bé nhìn thấy.",
        mistakes: [
          mis("I can see cup.", "I can see a cup.", "Chỉ một cái thì phải có “a” ở trước — tiếng Việt không cần nên bé hay quên."),
          mis("I can sees a plate.", "I can see a plate.", "Sau “can”, động từ giữ nguyên, không thêm -s."),
          mis("I see can a spoon.", "I can see a spoon.", "“can” đứng TRƯỚC “see”."),
        ],
        examples: [
          ex("Khi bé nhìn quanh gian bếp", "I can see a cup.", "Tớ nhìn thấy một cái cốc."),
          ex("Khi bé chỉ vào bàn ăn", "I can see a plate.", "Tớ nhìn thấy một cái đĩa."),
          ex("Khi bé thấy cái nồi to trên bếp", "I can see a big pot.", "Tớ nhìn thấy một cái nồi to.", "Từ tả (big) đứng TRƯỚC đồ vật."),
        ],
        exercises: [
          fb("I can ___ a cup.", "see", ["see", "sees", "seeing", "saw"], "Sau “can”, động từ giữ nguyên là “see”."),
          fb("I can see ___ plate.", "a", ["a", "an", "two", "some"], "Chỉ một cái đĩa, và “plate” bắt đầu bằng phụ âm nên dùng “a”."),
          so(["I", "can", "see", "a", "cup"], "I can see a cup", "Tớ nhìn thấy một cái cốc.", "Thứ tự: I → can → see → a → đồ vật."),
          so(["see", "can", "I", "a", "spoon"], "I can see a spoon", "Tớ nhìn thấy một cái thìa.", "“can” luôn đứng trước “see”."),
          viEn(
            "Tớ nhìn thấy một cái đĩa.",
            "I can see a plate.",
            ["I can see a plate.", "I see a plate can.", "I can sees a plate.", "I can see plate."],
            "Sau “can” giữ nguyên “see”, và một cái đĩa cần “a”.",
          ),
          viEn(
            "Tớ nhìn thấy một cái nồi.",
            "I can see a pot.",
            ["I can see a pot.", "I can see pot.", "I can sees a pot.", "I can see a pots."],
            "Một cái nồi nên có “a” và “pot” KHÔNG thêm -s.",
          ),
          enVi("I can see a cup.", "Tớ nhìn thấy một cái cốc.", ["Tớ nhìn thấy một cái cốc.", "Tớ có một cái cốc.", "Tớ nhìn thấy hai cái cốc.", "Cái cốc ở trên bàn."]),
          enVi("I can see a spoon.", "Tớ nhìn thấy một cái thìa.", ["Tớ nhìn thấy một cái thìa.", "Tớ nhìn thấy một cái đĩa.", "Tớ muốn một cái thìa.", "Cái thìa của tớ nhỏ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 15 ───────────────────────────
  {
    topic: "My Clothes",
    sections: [
      {
        id: "rm-ps-15",
        title: "Bé mặc gì hôm nay?",
        titleEn: "I wear a …",
        structure: "I wear + a + màu + đồ mặc",
        breakdown: [
          part("I", "Chủ ngữ", "“Tớ”."),
          part("wear", "Động từ", "“mặc / đội / đi” — tiếng Anh chỉ dùng MỘT từ cho tất cả."),
          part("a red", "Mạo từ + màu", "Màu luôn đứng TRƯỚC đồ mặc."),
          part("hat", "Đồ mặc", "Món đồ bé đang mặc trên người."),
        ],
        explanation:
          "Tiếng Việt có nhiều từ khác nhau: ĐỘI mũ, MẶC áo, ĐI giày. Tiếng Anh chỉ cần MỘT từ “wear” cho tất cả:\n- I wear a hat. (đội mũ)\n- I wear a shirt. (mặc áo)\n- I wear my shoes. (đi giày)\nMàu sắc luôn đứng TRƯỚC đồ vật: a RED hat, chứ không phải “a hat red” như tiếng Việt “mũ đỏ”.\nGiày có hai chiếc nên nói “shoes” và KHÔNG dùng “a”.",
        usage: "Dùng khi bé kể hôm nay mình mặc gì, hoặc chọn đồ trước khi đi học.",
        mistakes: [
          mis("I wear a hat red.", "I wear a red hat.", "Màu đứng TRƯỚC đồ vật, ngược với tiếng Việt “mũ đỏ”."),
          mis("I wear a shoes.", "I wear my shoes.", "Giày có hai chiếc nên bỏ “a”."),
          mis("I wears a coat.", "I wear a coat.", "“I” luôn đi với “wear”, không thêm -s."),
        ],
        examples: [
          ex("Khi bé đội mũ ra ngoài", "I wear a red hat.", "Tớ đội một cái mũ đỏ."),
          ex("Khi bé mặc áo mới", "I wear a blue shirt.", "Tớ mặc một cái áo màu xanh."),
          ex("Khi bé xỏ giày đi học", "I wear my shoes.", "Tớ đi giày của tớ.", "“shoes” có hai chiếc nên không dùng “a”."),
        ],
        exercises: [
          fb("I ___ a red hat.", "wear", ["wear", "wears", "wearing", "wore"], "“I” đi với “wear”, giữ nguyên, không thêm -s."),
          fb("I wear ___ shoes.", "my", ["my", "a", "an", "is"], "Giày có hai chiếc nên không dùng “a”; ở đây dùng “my” là giày của tớ."),
          so(["I", "wear", "a", "red", "hat"], "I wear a red hat", "Tớ đội một cái mũ đỏ.", "Màu “red” đứng ngay trước “hat”."),
          so(["shirt", "I", "a", "wear", "blue"], "I wear a blue shirt", "Tớ mặc một cái áo màu xanh.", "Thứ tự: I → wear → a → màu → đồ mặc."),
          viEn(
            "Tớ đội một cái mũ đỏ.",
            "I wear a red hat.",
            ["I wear a red hat.", "I wear a hat red.", "I wears a red hat.", "I wear red hat."],
            "Màu đứng trước đồ vật, và một cái mũ thì cần “a”.",
          ),
          viEn(
            "Tớ mặc một cái váy hồng.",
            "I wear a pink dress.",
            ["I wear a pink dress.", "I wear a dress pink.", "I wear pink dress.", "I wearing a pink dress."],
            "“pink” đứng trước “dress”, và câu cần “a”.",
          ),
          enVi("I wear a blue shirt.", "Tớ mặc một cái áo màu xanh.", ["Tớ mặc một cái áo màu xanh.", "Tớ mặc một cái áo màu đỏ.", "Tớ đội một cái mũ màu xanh.", "Áo của tớ màu xanh."]),
          enVi("I wear my shoes.", "Tớ đi giày của tớ.", ["Tớ đi giày của tớ.", "Tớ đội mũ của tớ.", "Giày của tớ mới tinh.", "Tớ thích giày của tớ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 16 ───────────────────────────
  {
    topic: "The Garden",
    sections: [
      {
        id: "rm-ps-16",
        title: "Một cái hay nhiều cái?",
        titleEn: "It is a … · They are …",
        structure: "It is + a + một cái · They are + nhiều cái (thêm -s)",
        breakdown: [
          part("It is", "Một cái", "Dùng khi bé chỉ vào MỘT thứ."),
          part("a flower", "Danh từ số ít", "Một bông hoa — nhớ có “a” ở trước."),
          part("They are", "Nhiều cái", "Dùng khi bé chỉ vào TỪ HAI thứ trở lên."),
          part("flowers", "Danh từ số nhiều", "Nhiều hơn một thì thêm -s vào cuối."),
        ],
        explanation:
          "Tiếng Việt nói “Đó là hoa” cho cả một bông lẫn cả luống hoa. Tiếng Anh thì đổi HAI chỗ:\n- Một bông → It is a flower.\n- Nhiều bông → They are flowers.\nĐổi “It is” thành “They are”, và danh từ thêm -s: flower → flowerS. Khi đã có “They are” thì KHÔNG dùng “a” nữa.",
        usage: "Dùng khi bé đi trong vườn và chỉ cho bố mẹ từng thứ mình thấy.",
        mistakes: [
          mis("They is flowers.", "They are flowers.", "“They” luôn đi với “are”, không đi với “is”."),
          mis("They are flower.", "They are flowers.", "Nhiều bông hoa thì phải thêm -s — tiếng Việt không đổi từ nên bé hay quên."),
          mis("It is flower.", "It is a flower.", "Một bông thì cần “a” ở trước."),
        ],
        examples: [
          ex("Khi bé chỉ vào một bông hoa", "It is a flower.", "Đó là một bông hoa."),
          ex("Khi bé chỉ vào cả luống hoa", "They are flowers.", "Đó là những bông hoa.", "Nhiều bông nên “flower” thêm -s."),
          ex("Khi bé thấy mấy con ong bay", "They are bees.", "Đó là những con ong."),
        ],
        exercises: [
          fb("They ___ flowers.", "are", ["are", "is", "am", "be"], "“They” luôn đi với “are”."),
          fb("It is ___ tree.", "a", ["a", "an", "two", "some"], "Một cái cây, và “tree” bắt đầu bằng phụ âm nên dùng “a”."),
          so(["They", "are", "flowers"], "They are flowers", "Đó là những bông hoa.", "Nhiều bông hoa nên dùng “are” và thêm -s."),
          so(["is", "It", "a", "tree"], "It is a tree", "Đó là một cái cây.", "Một cái thì dùng “It is” và có “a”."),
          viEn(
            "Đó là những con ong.",
            "They are bees.",
            ["They are bees.", "They is bees.", "They are bee.", "It is bees."],
            "Nhiều con ong → “They are” và “bee” thêm -s.",
          ),
          viEn(
            "Đó là một cái cây.",
            "It is a tree.",
            ["It is a tree.", "It is tree.", "They are a tree.", "It are a tree."],
            "Một cái cây → “It is” và có “a”.",
          ),
          enVi("They are flowers.", "Đó là những bông hoa.", ["Đó là những bông hoa.", "Đó là một bông hoa.", "Đó là những cái cây.", "Hoa trong vườn rất đẹp."]),
          enVi("It is a bee.", "Đó là một con ong.", ["Đó là một con ong.", "Đó là những con ong.", "Đó là một bông hoa.", "Con ong đậu trên hoa."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 17 ───────────────────────────
  {
    topic: "Sea Animals",
    sections: [
      {
        id: "rm-ps-17",
        title: "Con vật làm được gì?",
        titleEn: "A fish can swim.",
        structure: "Con vật + can + động từ",
        breakdown: [
          part("A fish", "Con vật", "Con vật mà bé đang nói tới."),
          part("can", "Từ chỉ khả năng", "“biết / làm được”."),
          part("swim", "Động từ", "Việc con vật làm được — giữ NGUYÊN, không thêm -s."),
        ],
        explanation:
          "Khi bé kể một con vật LÀM ĐƯỢC việc gì, bé dùng “can”:\n- A fish can swim. (Con cá biết bơi.)\n- A crab can walk. (Con cua biết đi.)\nHai điều cần nhớ:\n- “can” đứng TRƯỚC động từ.\n- Sau “can”, động từ luôn giữ nguyên: can swim, không phải “can swims” hay “can to swim”.",
        usage: "Dùng khi bé xem cá bơi trong bể, hoặc kể con vật mình thích làm được gì.",
        mistakes: [
          mis("A fish can swims.", "A fish can swim.", "Sau “can”, động từ giữ nguyên, không thêm -s."),
          mis("A fish swim can.", "A fish can swim.", "“can” đứng TRƯỚC động từ, không đứng cuối câu."),
          mis("A turtle can to swim.", "A turtle can swim.", "Sau “can” KHÔNG có “to”."),
        ],
        examples: [
          ex("Khi bé xem cá bơi trong bể", "A fish can swim.", "Con cá biết bơi."),
          ex("Khi bé nhìn con rùa dưới nước", "A turtle can swim.", "Con rùa biết bơi."),
          ex("Khi bé thấy con cua bò ngang", "A crab can walk.", "Con cua biết đi."),
        ],
        exercises: [
          fb("A fish ___ swim.", "can", ["can", "is", "are", "do"], "“can” cho biết con cá LÀM ĐƯỢC việc bơi."),
          fb("A turtle can ___.", "swim", ["swim", "swims", "swimming", "to swim"], "Sau “can”, động từ giữ nguyên là “swim”."),
          so(["A", "fish", "can", "swim"], "A fish can swim", "Con cá biết bơi.", "Thứ tự: con vật → can → động từ."),
          so(["can", "A", "crab", "walk"], "A crab can walk", "Con cua biết đi.", "“can” luôn đứng trước động từ."),
          viEn(
            "Con rùa biết bơi.",
            "A turtle can swim.",
            ["A turtle can swim.", "A turtle can swims.", "A turtle swim can.", "A turtle is swim."],
            "Sau “can” giữ nguyên “swim”, không thêm -s.",
          ),
          viEn(
            "Con cua biết đi.",
            "A crab can walk.",
            ["A crab can walk.", "A crab can walks.", "A crab walk can.", "A crab can to walk."],
            "Sau “can” không có “to” và động từ giữ nguyên.",
          ),
          enVi("A fish can swim.", "Con cá biết bơi.", ["Con cá biết bơi.", "Con cá biết đi.", "Con rùa biết bơi.", "Con cá bé xíu."]),
          enVi("A crab can walk.", "Con cua biết đi.", ["Con cua biết đi.", "Con cua biết bơi.", "Con rùa biết đi.", "Con cua màu đỏ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 18 ───────────────────────────
  {
    topic: "The Weather",
    sections: [
      {
        id: "rm-ps-18",
        title: "Hôm nay trời thế nào?",
        titleEn: "It is sunny.",
        structure: "It is + từ tả thời tiết",
        breakdown: [
          part("It", "Chủ ngữ", "Không dịch là “nó” — câu nói về thời tiết luôn mở đầu bằng “It”."),
          part("is", "Động từ to be", "Bắt buộc phải có, dù tiếng Việt không cần."),
          part("sunny", "Từ tả thời tiết", "sun → sunny, rain → rainy, wind → windy, cloud → cloudy."),
        ],
        explanation:
          "Tiếng Việt nói “Hôm nay nắng” là đủ, không cần chủ ngữ. Tiếng Anh thì bắt buộc mở đầu bằng “It is”: It is sunny.\nTừ tả thời tiết được tạo từ danh từ bằng cách thêm -y:\n- sun (mặt trời) → sunny (trời nắng)\n- rain (mưa) → rainy (trời mưa)\n- wind (gió) → windy (trời có gió)\n- cloud (mây) → cloudy (trời nhiều mây)",
        usage: "Dùng khi bé nhìn ra cửa sổ buổi sáng và kể cho cả nhà nghe hôm nay trời thế nào.",
        mistakes: [
          mis("Today sunny.", "It is sunny.", "Câu tiếng Anh phải có “It is” ở đầu — tiếng Việt bỏ được nên bé hay quên."),
          mis("It is sun.", "It is sunny.", "“sun” là mặt trời (danh từ); tả trời nắng phải dùng “sunny”."),
          mis("It are rainy.", "It is rainy.", "“It” luôn đi với “is”."),
        ],
        examples: [
          ex("Khi bé nhìn ra cửa sổ thấy nắng", "It is sunny.", "Trời nắng."),
          ex("Khi trời đổ mưa lúc tan học", "It is rainy.", "Trời mưa."),
          ex("Khi gió thổi bay cái mũ của bé", "It is windy.", "Trời có gió."),
        ],
        exercises: [
          fb("It ___ sunny today.", "is", ["is", "are", "am", "be"], "“It” luôn đi với “is”."),
          fb("It is ___ today.", "rainy", ["rainy", "rain", "rains", "rained"], "Tả trời mưa thì dùng “rainy”, không dùng danh từ “rain”."),
          so(["It", "is", "sunny"], "It is sunny", "Trời nắng.", "Câu về thời tiết luôn bắt đầu bằng “It is”."),
          so(["is", "It", "windy"], "It is windy", "Trời có gió.", "wind → windy khi tả thời tiết."),
          viEn(
            "Trời nắng.",
            "It is sunny.",
            ["It is sunny.", "It is sun.", "Is sunny.", "It are sunny."],
            "Câu cần “It is” ở đầu và dùng “sunny”, không dùng “sun”.",
          ),
          viEn(
            "Trời mưa.",
            "It is rainy.",
            ["It is rainy.", "It is rain.", "It rainy.", "It are rainy."],
            "“It is” + “rainy” mới là câu tả thời tiết.",
          ),
          enVi("It is cloudy.", "Trời nhiều mây.", ["Trời nhiều mây.", "Trời nắng.", "Trời mưa.", "Đám mây màu trắng."]),
          enVi("It is windy.", "Trời có gió.", ["Trời có gió.", "Trời lạnh.", "Trời nắng.", "Gió mát ơi là mát."]),
        ],
      },
    ],
  },
];
