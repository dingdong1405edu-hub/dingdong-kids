// STARTERS (6–7 tuổi · Cambridge YLE Starters, Pre-A1)
// Bé bắt đầu tự đọc được câu ngắn. Ngữ pháp trọng tâm: số nhiều, have got, can,
// giới từ chỉ nơi chốn, hiện tại đơn — đúng phạm vi đề Starters.
import { fb, so, viEn, enVi, ex, mis, part, quiz, rhyme, type GrammarUnitSeed } from "./types";

export const UNITS: GrammarUnitSeed[] = [
  {
    slug: "plural-s",
    title: "Plural nouns",
    theme: "Danh từ số nhiều",
    level: "STARTERS",
    lessons: [
      {
        slug: "plural-s",
        title: "Thêm -s khi có nhiều",
        sections: [
          {
            id: "plural-1",
            title: "Danh từ số nhiều thêm -s",
            titleEn: "Plural nouns with -s",
            structure: "one cat → two cats",
            breakdown: [
              part("two", "Số đếm", "Cho biết có nhiều hơn một."),
              part("cat", "Danh từ", "Tên của con vật / đồ vật."),
              part("-s", "Đuôi số nhiều", "Thêm vào cuối danh từ khi có từ 2 trở lên."),
            ],
            explanation:
              "Tiếng Việt nói “hai con mèo” — chữ “mèo” không đổi. Tiếng Anh thì phải thêm -s vào cuối: two cats.\n- Hầu hết danh từ: thêm -s (dog → dogs)\n- Kết thúc bằng s, x, ch, sh: thêm -es (box → boxes)\n- Một số từ đặc biệt: man → men, child → children",
            usage: "Dùng khi nói về từ hai đồ vật / con vật / người trở lên.",
            mistakes: [
              mis("I have three cat.", "I have three cats.", "Thiếu -s. Đây là lỗi phổ biến NHẤT của trẻ Việt."),
              mis("two boxs", "two boxes", "Từ kết thúc bằng -x thì thêm -es."),
              mis("many childs", "many children", "“child” là từ đặc biệt, số nhiều là “children”."),
            ],
            examples: [
              ex("Đếm đồ chơi", "I have five balls.", "Tớ có năm quả bóng."),
              ex("Nói về bạn bè", "My friends are here.", "Các bạn của tớ ở đây."),
              ex("Từ thêm -es", "There are two buses.", "Có hai chiếc xe buýt."),
            ],
            exercises: [
              fb("I have two ___.", "cats", ["cats", "cat", "cates", "catz"], "Có hai con nên phải thêm -s: cats."),
              fb("There are three ___.", "boxes", ["boxes", "boxs", "box", "boxies"], "Từ kết thúc bằng -x thì thêm -es."),
              so(["have", "I", "four", "books"], "I have four books", "Tớ có bốn quyển sách."),
              so(["are", "There", "two", "dogs"], "There are two dogs", "Có hai con chó."),
              viEn("Tớ có hai con chó.", "I have two dogs.", ["I have two dogs.", "I have two dog.", "I has two dogs.", "I have two doges."], "Hai con thì “dog” phải thêm -s."),
              viEn("Có năm quả bóng.", "There are five balls.", ["There are five balls.", "There is five balls.", "There are five ball.", "There are five balles."], "Nhiều quả thì dùng “are” và “balls”."),
              enVi("My friends are here.", "Các bạn của tớ ở đây.", ["Các bạn của tớ ở đây.", "Bạn của tớ ở đây.", "Các bạn tớ ở nhà.", "Tớ có nhiều bạn."]),
              enVi("There are two buses.", "Có hai chiếc xe buýt.", ["Có hai chiếc xe buýt.", "Có một chiếc xe buýt.", "Có hai chiếc ô tô.", "Xe buýt đang tới."]),
              rhyme([["cat", "hat"], ["dog", "frog"]]),
            ],
          },
        ],
        test: quiz([
          fb("She has six ___.", "pens", ["pens", "pen", "penes", "penz"]),
          so(["are", "There", "two", "buses"], "There are two buses"),
          viEn("Tớ có ba quyển sách.", "I have three books.", ["I have three books.", "I have three book.", "I has three books.", "I have three bookes."]),
          enVi("I have five balls.", "Tớ có năm quả bóng.", ["Tớ có năm quả bóng.", "Tớ có một quả bóng.", "Tớ thích chơi bóng.", "Có năm quả táo."]),
        ]),
      },
      {
        slug: "plural-es",
        title: "-es, -ies và số nhiều đặc biệt",
        sections: [
          {
            id: "plural-2",
            title: "Khi -s là chưa đủ",
            titleEn: "Plural: -es, -ies and irregular nouns",
            structure: "box → boxes · baby → babies · child → children",
            breakdown: [
              part("box", "Danh từ kết thúc bằng s/x/ch/sh", "Đọc thêm -es cho dễ nghe."),
              part("baby", "Danh từ kết thúc bằng phụ âm + y", "Bỏ y, thêm -ies."),
              part("child", "Danh từ đặc biệt", "Đổi hẳn từ, phải học thuộc."),
            ],
            explanation:
              "Ba nhóm cần nhớ:\n- Kết thúc bằng s, x, ch, sh → thêm -es: bus → buses, watch → watches, dish → dishes\n- Phụ âm + y → bỏ y, thêm -ies: baby → babies, city → cities (nhưng boy → boys vì trước y là nguyên âm)\n- Đặc biệt: man → men, woman → women, child → children, foot → feet, tooth → teeth, mouse → mice\n- Có từ không đổi gì cả: fish → fish, sheep → sheep",
            usage: "Dùng khi đếm đồ vật, con vật hoặc người mà từ không chịu thêm -s bình thường.",
            mistakes: [
              mis("three watchs", "three watches", "Kết thúc bằng -ch thì thêm -es."),
              mis("two babys", "two babies", "Phụ âm + y thì bỏ y, thêm -ies."),
              mis("my foots", "my feet", "“foot” là từ đặc biệt, số nhiều là “feet”."),
            ],
            examples: [
              ex("Trong lớp học", "There are two watches on the desk.", "Có hai chiếc đồng hồ trên bàn."),
              ex("Ở nhà", "My baby sisters are sleeping.", "Các em bé của tớ đang ngủ."),
              ex("Khi nói về người", "Ten children are in the park.", "Có mười bạn nhỏ ở công viên."),
            ],
            exercises: [
              fb("I can see three ___.", "watches", ["watches", "watchs", "watch", "watchies"], "Từ kết thúc bằng -ch thì thêm -es."),
              fb("There are two ___ in the room.", "babies", ["babies", "babys", "baby", "babyes"], "“baby” có phụ âm + y nên bỏ y, thêm -ies."),
              so(["have", "I", "two", "feet"], "I have two feet", "Tớ có hai bàn chân."),
              so(["are", "There", "many", "children"], "There are many children", "Có nhiều bạn nhỏ."),
              viEn("Tớ có hai chiếc hộp.", "I have two boxes.", ["I have two boxes.", "I have two boxs.", "I have two box.", "I have two boxies."], "Kết thúc bằng -x thì thêm -es."),
              viEn("Có ba con cá trong bể.", "There are three fish in the tank.", ["There are three fish in the tank.", "There are three fishs in the tank.", "There is three fish in the tank.", "There are three fishes in the tanks."], "“fish” số nhiều vẫn là “fish”."),
              enVi("My teeth are white.", "Răng của tớ trắng.", ["Răng của tớ trắng.", "Chân của tớ trắng.", "Răng của tớ đau.", "Tớ có một cái răng."]),
              enVi("Two women are singing.", "Hai cô đang hát.", ["Hai cô đang hát.", "Một cô đang hát.", "Hai bạn nam đang hát.", "Hai cô đang nhảy."]),
            ],
          },
        ],
        test: quiz([
          fb("There are four ___ in the box.", "dishes", ["dishes", "dishs", "dish", "dishies"]),
          so(["are", "There", "two", "mice"], "There are two mice"),
          viEn("Tớ nhìn thấy ba thành phố.", "I can see three cities.", ["I can see three cities.", "I can see three citys.", "I can see three city.", "I can see three cityes."]),
          enVi("Five children are here.", "Có năm bạn nhỏ ở đây.", ["Có năm bạn nhỏ ở đây.", "Có một bạn nhỏ ở đây.", "Năm bạn nhỏ ở nhà.", "Có năm người lớn ở đây."]),
        ]),
      },
    ],
  },

  {
    slug: "have-got",
    title: "Have got",
    theme: "Bé có gì?",
    level: "STARTERS",
    lessons: [
      {
        slug: "have-got",
        title: "I have got · She has got",
        sections: [
          {
            id: "havegot-1",
            title: "Nói mình có gì",
            titleEn: "have got / has got",
            structure: "I/You/We/They + have got + … · He/She/It + has got + …",
            breakdown: [
              part("She", "Chủ ngữ", "Người hoặc vật đang sở hữu."),
              part("has got", "Động từ sở hữu", "Nghĩa là “có”. He/She/It thì dùng “has got”."),
              part("a new bag", "Danh từ", "Thứ mà người đó có."),
            ],
            explanation:
              "“Có” trong tiếng Anh là have got / has got.\n- I, you, we, they → have got\n- he, she, it → has got\nViết tắt cho nhanh: I’ve got · She’s got · They’ve got.",
            usage: "Dùng khi bé khoe đồ, tả gia đình, tả con vật (It has got four legs).",
            mistakes: [
              mis("She have got a cat.", "She has got a cat.", "“She” là ngôi thứ ba số ít nên dùng “has”."),
              mis("I have got a new bags.", "I have got a new bag.", "Chỉ có một cái thì KHÔNG thêm -s."),
              mis("He is got a dog.", "He has got a dog.", "“got” đi với have/has, không đi với “is”."),
            ],
            examples: [
              ex("Khi khoe đồ mới", "I have got a new bike.", "Tớ có một chiếc xe đạp mới."),
              ex("Khi tả em bé", "She has got big eyes.", "Em ấy có đôi mắt to."),
              ex("Khi tả con vật", "It has got four legs.", "Nó có bốn cái chân."),
            ],
            exercises: [
              fb("I ___ got a new ball.", "have", ["have", "has", "am", "is"], "Chủ ngữ “I” đi với “have got”."),
              fb("My sister ___ got long hair.", "has", ["has", "have", "is", "are"], "“My sister” = she, nên dùng “has got”."),
              so(["have", "I", "got", "a", "dog"], "I have got a dog", "Tớ có một con chó."),
              so(["has", "He", "got", "a", "bike"], "He has got a bike", "Bạn ấy có một chiếc xe đạp."),
              viEn("Tớ có một con mèo.", "I have got a cat.", ["I have got a cat.", "I has got a cat.", "I have got cat.", "I am got a cat."], "“I” + have got, và “cat” cần “a”."),
              viEn("Bạn ấy có đôi mắt to.", "She has got big eyes.", ["She has got big eyes.", "She have got big eyes.", "She has got big eye.", "She is got big eyes."], "“She” dùng “has got”; hai mắt nên “eyes”."),
              enVi("He has got a red car.", "Bạn ấy có một chiếc ô tô màu đỏ.", ["Bạn ấy có một chiếc ô tô màu đỏ.", "Bạn ấy muốn một chiếc ô tô màu đỏ.", "Bạn ấy có một chiếc xe đạp màu đỏ.", "Chiếc ô tô màu đỏ rất nhanh."]),
              enVi("It has got four legs.", "Nó có bốn cái chân.", ["Nó có bốn cái chân.", "Nó có hai cái chân.", "Nó có bốn cái tai.", "Chân nó rất dài."]),
            ],
          },
        ],
        test: quiz([
          fb("My brother ___ got a kite.", "has", ["has", "have", "is", "are"]),
          so(["got", "They", "have", "two", "cats"], "They have got two cats"),
          viEn("Tớ có một quyển sách mới.", "I have got a new book.", ["I have got a new book.", "I has got a new book.", "I have got new book.", "I have got a new books."]),
          enVi("She has got a doll.", "Bạn ấy có một con búp bê.", ["Bạn ấy có một con búp bê.", "Bạn ấy thích búp bê.", "Bạn ấy có hai con búp bê.", "Con búp bê rất đẹp."]),
        ]),
      },
      {
        slug: "have-got-questions",
        title: "Have you got…? · haven’t got",
        sections: [
          {
            id: "havegot-2",
            title: "Hỏi và nói “không có”",
            titleEn: "Have you got…? / haven’t got",
            structure: "Have/Has + chủ ngữ + got + …? · … haven’t/hasn’t got + …",
            breakdown: [
              part("Have", "Trợ động từ đảo lên đầu", "Đưa lên trước chủ ngữ là thành câu hỏi."),
              part("you", "Chủ ngữ", "Người bé đang hỏi."),
              part("got a pen?", "Phần còn lại", "Thứ bé muốn biết người đó có hay không."),
            ],
            explanation:
              "Hỏi: đảo have/has lên đầu.\n- You have got a pen. → Have you got a pen?\nTrả lời ngắn: Yes, I have. / No, I haven’t.\nNói KHÔNG có: thêm n’t.\n- I haven’t got a pen.\n- He hasn’t got a bike.",
            usage: "Dùng khi bé mượn đồ, hỏi bạn có gì, hoặc nói mình không có thứ gì đó.",
            mistakes: [
              mis("You have got a pen?", "Have you got a pen?", "Câu hỏi phải đảo “have” lên đầu."),
              mis("I don’t have got a pen.", "I haven’t got a pen.", "Với “have got” thì phủ định là haven’t/hasn’t, không dùng “don’t”."),
              mis("Has you got a dog?", "Have you got a dog?", "“You” luôn đi với “have”."),
            ],
            examples: [
              ex("Khi mượn đồ ở lớp", "Have you got a pencil?", "Bạn có bút chì không?"),
              ex("Khi trả lời “không”", "No, I haven’t.", "Không, tớ không có."),
              ex("Khi nói thiếu đồ", "He hasn’t got a ruler.", "Bạn ấy không có thước kẻ."),
            ],
            exercises: [
              fb("___ you got a pencil?", "Have", ["Have", "Has", "Are", "Do"], "“You” đi với “have”, và câu hỏi thì đảo lên đầu."),
              fb("She ___ got a bike.", "hasn’t", ["hasn’t", "haven’t", "isn’t", "doesn’t"], "“She” dùng “has”, phủ định là “hasn’t got”."),
              so(["you", "Have", "got", "a", "pen"], "Have you got a pen", "Bạn có bút không?"),
              so(["haven’t", "I", "got", "a", "ruler"], "I haven’t got a ruler", "Tớ không có thước kẻ."),
              viEn("Bạn có con chó nào không?", "Have you got a dog?", ["Have you got a dog?", "Has you got a dog?", "You have got a dog?", "Do you have got a dog?"], "Đảo “have” lên trước “you”."),
              viEn("Bạn ấy không có anh trai.", "He hasn’t got a brother.", ["He hasn’t got a brother.", "He haven’t got a brother.", "He doesn’t got a brother.", "He hasn’t got brother."], "“He” dùng “hasn’t got”, và “brother” cần “a”."),
              enVi("Have you got a sister?", "Bạn có chị em gái không?", ["Bạn có chị em gái không?", "Bạn có anh em trai không?", "Chị gái bạn đâu?", "Tớ có một chị gái."]),
              enVi("No, I haven’t.", "Không, tớ không có.", ["Không, tớ không có.", "Có, tớ có.", "Tớ không biết.", "Tớ không thích."]),
            ],
          },
        ],
        test: quiz([
          fb("___ he got a new bag?", "Has", ["Has", "Have", "Is", "Do"]),
          so(["got", "I", "haven’t", "a", "cat"], "I haven’t got a cat"),
          viEn("Bạn có bút chì không?", "Have you got a pencil?", ["Have you got a pencil?", "Has you got a pencil?", "You got a pencil?", "Have you got pencil?"]),
          enVi("She hasn’t got a bike.", "Bạn ấy không có xe đạp.", ["Bạn ấy không có xe đạp.", "Bạn ấy có một chiếc xe đạp.", "Bạn ấy không thích xe đạp.", "Xe đạp của bạn ấy hỏng rồi."]),
        ]),
      },
    ],
  },

  {
    slug: "can-ability",
    title: "Can",
    theme: "Bé làm được gì",
    level: "STARTERS",
    lessons: [
      {
        slug: "can-ability",
        title: "can · can’t",
        sections: [
          {
            id: "can-1",
            title: "Nói mình làm được việc gì",
            titleEn: "can / can’t (ability)",
            structure: "Chủ ngữ + can + động từ nguyên thể",
            breakdown: [
              part("I", "Chủ ngữ", "Ai làm được việc đó."),
              part("can", "Động từ khuyết thiếu", "Nghĩa là “có thể, biết”. Không bao giờ đổi hình."),
              part("swim", "Động từ nguyên thể", "Sau “can” thì động từ để TRẦN: không -s, không to, không -ing."),
            ],
            explanation:
              "“can” dùng chung cho mọi chủ ngữ — I can, she can, they can. KHÔNG có “cans”.\n- I can swim.\n- She can sing.\nKhông làm được thì dùng can’t (= cannot): I can’t swim.",
            usage: "Dùng khi bé kể mình biết làm gì, hoặc nói con vật làm được gì.",
            mistakes: [
              mis("She cans swim.", "She can swim.", "“can” không bao giờ thêm -s."),
              mis("I can to sing.", "I can sing.", "Sau “can” không có “to”."),
              mis("He can swimming.", "He can swim.", "Sau “can” là động từ nguyên thể, không phải -ing."),
            ],
            examples: [
              ex("Khi kể tài lẻ", "I can sing a song.", "Tớ biết hát một bài."),
              ex("Khi nói về con vật", "Birds can fly.", "Chim biết bay."),
              ex("Khi nói chưa làm được", "I can’t ride a bike.", "Tớ chưa biết đi xe đạp."),
            ],
            exercises: [
              fb("She ___ sing very well.", "can", ["can", "cans", "is can", "can to"], "“can” dùng như nhau cho mọi chủ ngữ, không thêm -s."),
              fb("Fish can ___ .", "swim", ["swim", "swims", "swimming", "to swim"], "Sau “can” là động từ nguyên thể."),
              so(["can", "I", "ride", "a", "bike"], "I can ride a bike", "Tớ biết đi xe đạp."),
              so(["can’t", "He", "swim"], "He can’t swim", "Bạn ấy không biết bơi."),
              viEn("Tớ biết bơi.", "I can swim.", ["I can swim.", "I can swims.", "I can to swim.", "I am can swim."], "Sau “can” là động từ trần: swim."),
              viEn("Chim biết bay.", "Birds can fly.", ["Birds can fly.", "Birds cans fly.", "Birds can flies.", "Birds can flying."], "“can” không đổi, “fly” giữ nguyên."),
              enVi("I can’t ride a bike.", "Tớ chưa biết đi xe đạp.", ["Tớ chưa biết đi xe đạp.", "Tớ biết đi xe đạp.", "Tớ không có xe đạp.", "Tớ thích đi xe đạp."]),
              enVi("My dog can run fast.", "Chó của tớ chạy nhanh được.", ["Chó của tớ chạy nhanh được.", "Chó của tớ không chạy nhanh được.", "Mèo của tớ chạy nhanh được.", "Chó của tớ chạy chậm."]),
            ],
          },
        ],
        test: quiz([
          fb("He ___ play football.", "can", ["can", "cans", "can to", "is can"]),
          so(["can", "Birds", "fly"], "Birds can fly"),
          viEn("Tớ không biết hát.", "I can’t sing.", ["I can’t sing.", "I can’t sings.", "I not can sing.", "I don’t can sing."]),
          enVi("She can dance.", "Bạn ấy biết nhảy.", ["Bạn ấy biết nhảy.", "Bạn ấy không biết nhảy.", "Bạn ấy thích nhảy.", "Bạn ấy đang nhảy."]),
        ]),
      },
      {
        slug: "can-permission",
        title: "Can I…? — xin phép và nhờ giúp",
        sections: [
          {
            id: "can-2",
            title: "Xin phép lịch sự",
            titleEn: "Can I…? / Can you…?",
            structure: "Can + I/you + động từ nguyên thể + …, please?",
            breakdown: [
              part("Can", "Từ để hỏi", "Đảo lên đầu câu để xin phép hoặc nhờ vả."),
              part("I", "Chủ ngữ", "“Can I…?” là XIN PHÉP cho mình."),
              part("go out, please?", "Việc muốn làm", "Thêm “please” cho lịch sự."),
            ],
            explanation:
              "- Can I …? → xin phép làm gì (Tớ … được không ạ?)\n- Can you …? → nhờ người khác làm giúp (Bạn … giúp tớ nhé?)\nTrả lời: Yes, you can. / No, you can’t. Với bạn bè thì hay nói “Sure!” hoặc “Of course.”",
            usage: "Dùng ở lớp khi xin ra ngoài, mượn đồ, hoặc nhờ bạn giúp một việc.",
            mistakes: [
              mis("I can go out?", "Can I go out?", "Xin phép thì “Can” phải đứng đầu câu."),
              mis("Can I to open the door?", "Can I open the door?", "Sau “can” không có “to”."),
              mis("Can you helping me?", "Can you help me?", "Sau “can” là động từ nguyên thể."),
            ],
            examples: [
              ex("Khi muốn ra ngoài", "Can I go out, please?", "Cho em ra ngoài được không ạ?"),
              ex("Khi mượn đồ của bạn", "Can I use your pen?", "Tớ mượn bút của bạn nhé?"),
              ex("Khi nhờ giúp", "Can you help me, please?", "Bạn giúp tớ được không?"),
            ],
            exercises: [
              fb("___ I open the window, please?", "Can", ["Can", "Do", "Am", "Is"], "Xin phép thì bắt đầu bằng “Can”."),
              fb("Can you ___ me, please?", "help", ["help", "helps", "helping", "to help"], "Sau “can” là động từ nguyên thể."),
              so(["Can", "I", "go", "out"], "Can I go out", "Tớ ra ngoài được không?"),
              so(["you", "Can", "help", "me"], "Can you help me", "Bạn giúp tớ được không?"),
              viEn("Tớ mượn bút của bạn được không?", "Can I use your pen?", ["Can I use your pen?", "I can use your pen?", "Can I to use your pen?", "Can I using your pen?"], "Xin phép: Can + I + động từ trần."),
              viEn("Bạn mở cửa giúp tớ nhé?", "Can you open the door?", ["Can you open the door?", "Can you opens the door?", "You can open the door?", "Can you opening the door?"], "Nhờ vả dùng “Can you…?” + động từ trần."),
              enVi("Can I have some water, please?", "Cho tớ xin chút nước được không ạ?", ["Cho tớ xin chút nước được không ạ?", "Tớ có một chút nước.", "Bạn có nước không?", "Tớ không thích nước."]),
              enVi("Yes, of course.", "Được chứ.", ["Được chứ.", "Không được đâu.", "Tớ không biết.", "Cảm ơn bạn."]),
            ],
          },
        ],
        test: quiz([
          fb("___ I use your book, please?", "Can", ["Can", "Do", "Am", "Have"]),
          so(["Can", "you", "help", "me"], "Can you help me"),
          viEn("Em vào lớp được không ạ?", "Can I come in?", ["Can I come in?", "I can come in?", "Can I to come in?", "Can I coming in?"]),
          enVi("No, you can’t.", "Không, không được.", ["Không, không được.", "Có, được chứ.", "Tớ không biết.", "Bạn thử lại nhé."]),
        ]),
      },
    ],
  },

  {
    slug: "prepositions-place",
    title: "Prepositions of place",
    theme: "Đồ vật ở đâu?",
    level: "STARTERS",
    lessons: [
      {
        slug: "prep-in-on-under",
        title: "in · on · under",
        sections: [
          {
            id: "prep-1",
            title: "Ba giới từ đầu tiên",
            titleEn: "in / on / under",
            structure: "Chủ ngữ + is/are + in / on / under + the + …",
            breakdown: [
              part("The cat", "Chủ ngữ", "Thứ mình muốn nói đang ở đâu."),
              part("is", "Động từ to be", "Một con mèo thì dùng “is”."),
              part("under the table", "Giới từ + nơi chốn", "in = trong · on = trên (chạm vào) · under = dưới."),
            ],
            explanation:
              "- in = Ở TRONG (The pen is in the bag.)\n- on = Ở TRÊN và chạm vào mặt phẳng (The book is on the table.)\n- under = Ở DƯỚI (The ball is under the chair.)\nSau giới từ thường có “the”: in the box, on the desk.",
            usage: "Dùng khi bé tả bức tranh, tìm đồ bị lạc, hoặc nói chỗ để đồ.",
            mistakes: [
              mis("The book is in the table.", "The book is on the table.", "Nằm trên mặt bàn thì dùng “on”, không dùng “in”."),
              mis("The cat is under table.", "The cat is under the table.", "Sau giới từ cần “the”."),
              mis("The pens is in the box.", "The pens are in the box.", "Nhiều bút thì dùng “are”."),
            ],
            examples: [
              ex("Khi tìm đồ", "My pen is in my bag.", "Bút của tớ ở trong cặp."),
              ex("Khi tả bàn học", "The book is on the desk.", "Quyển sách ở trên bàn."),
              ex("Khi chơi trốn tìm", "The cat is under the bed.", "Con mèo ở dưới gầm giường."),
            ],
            exercises: [
              fb("The book is ___ the table.", "on", ["on", "in", "under", "at"], "Sách nằm trên mặt bàn nên dùng “on”."),
              fb("My pen is ___ my bag.", "in", ["in", "on", "under", "to"], "Ở bên trong cặp nên dùng “in”."),
              so(["is", "The", "ball", "under", "the", "chair"], "The ball is under the chair", "Quả bóng ở dưới ghế."),
              so(["are", "The", "books", "on", "the", "desk"], "The books are on the desk", "Những quyển sách ở trên bàn."),
              viEn("Con mèo ở dưới gầm bàn.", "The cat is under the table.", ["The cat is under the table.", "The cat is under table.", "The cat is on the table.", "The cat under the table."], "under + the + table; câu cần “is”."),
              viEn("Những quả táo ở trong hộp.", "The apples are in the box.", ["The apples are in the box.", "The apples is in the box.", "The apples are on the box.", "The apple are in the box."], "Nhiều quả táo nên dùng “are”; ở bên trong nên dùng “in”."),
              enVi("The dog is under the bed.", "Con chó ở dưới gầm giường.", ["Con chó ở dưới gầm giường.", "Con chó ở trên giường.", "Con mèo ở dưới gầm giường.", "Con chó đang ngủ."]),
              enVi("The bag is on the chair.", "Cái cặp ở trên ghế.", ["Cái cặp ở trên ghế.", "Cái cặp ở dưới ghế.", "Cái cặp ở trong ghế.", "Cái ghế ở trên cặp."]),
            ],
          },
        ],
        test: quiz([
          fb("The ball is ___ the box.", "in", ["in", "on", "under", "of"]),
          so(["is", "The", "cat", "on", "the", "bed"], "The cat is on the bed"),
          viEn("Cái bút ở dưới quyển sách.", "The pen is under the book.", ["The pen is under the book.", "The pen is on the book.", "The pen is under book.", "The pen under the book."]),
          enVi("My shoes are under the chair.", "Giày của tớ ở dưới ghế.", ["Giày của tớ ở dưới ghế.", "Giày của tớ ở trên ghế.", "Giày của tớ ở trong cặp.", "Tớ có một đôi giày."]),
        ]),
      },
      {
        slug: "prep-next-behind",
        title: "next to · behind · in front of",
        sections: [
          {
            id: "prep-2",
            title: "Bên cạnh, đằng sau, phía trước",
            titleEn: "next to / behind / in front of",
            structure: "Chủ ngữ + is/are + next to / behind / in front of + the + …",
            breakdown: [
              part("Nam", "Chủ ngữ", "Người hoặc vật mình đang tả."),
              part("is", "Động từ to be", "Một người thì dùng “is”."),
              part("next to the door", "Giới từ + nơi chốn", "next to = bên cạnh · behind = đằng sau · in front of = phía trước."),
            ],
            explanation:
              "- next to = ngay bên cạnh (Nam is next to Mai.)\n- behind = đằng sau (The ball is behind the door.)\n- in front of = ở phía trước (The car is in front of the house.)\nNhớ: “in front of” có ba chữ, thiếu “of” là sai.",
            usage: "Dùng khi bé tả chỗ ngồi trong lớp, tả tranh, hoặc chỉ đường cho bạn.",
            mistakes: [
              mis("She is next me.", "She is next to me.", "“next” phải đi kèm “to”."),
              mis("The car is in front the house.", "The car is in front of the house.", "Thiếu “of”."),
              mis("The ball is behind of the door.", "The ball is behind the door.", "“behind” KHÔNG có “of”."),
            ],
            examples: [
              ex("Khi tả chỗ ngồi", "Mai is next to me.", "Bạn Mai ngồi cạnh tớ."),
              ex("Khi chơi trốn tìm", "The cat is behind the door.", "Con mèo ở đằng sau cánh cửa."),
              ex("Khi tả bức tranh", "A tree is in front of the house.", "Có một cái cây ở phía trước ngôi nhà."),
            ],
            exercises: [
              fb("Mai is next ___ me.", "to", ["to", "of", "at", "in"], "“next” luôn đi với “to”."),
              fb("The cat is ___ the door.", "behind", ["behind", "next", "front", "of"], "Con mèo ở đằng sau cánh cửa → behind."),
              so(["is", "Nam", "next", "to", "Mai"], "Nam is next to Mai", "Bạn Nam ngồi cạnh bạn Mai."),
              so(["is", "The", "car", "behind", "the", "bus"], "The car is behind the bus", "Chiếc ô tô ở sau xe buýt."),
              viEn("Cái cây ở phía trước ngôi nhà.", "The tree is in front of the house.", ["The tree is in front of the house.", "The tree is in front the house.", "The tree is front of the house.", "The tree in front of the house."], "“in front of” đủ ba chữ, và câu cần “is”."),
              viEn("Quả bóng ở đằng sau cái ghế.", "The ball is behind the chair.", ["The ball is behind the chair.", "The ball is behind of the chair.", "The ball behind the chair.", "The ball is behind chair."], "“behind” không có “of”, và sau đó cần “the”."),
              enVi("The shop is next to my school.", "Cửa hàng ở ngay cạnh trường tớ.", ["Cửa hàng ở ngay cạnh trường tớ.", "Cửa hàng ở đằng sau trường tớ.", "Trường tớ ở cạnh cửa hàng đó.", "Tớ hay đi tới cửa hàng."]),
              enVi("A boy is in front of me.", "Có một bạn nam đứng phía trước tớ.", ["Có một bạn nam đứng phía trước tớ.", "Có một bạn nam đứng phía sau tớ.", "Có một bạn nữ đứng phía trước tớ.", "Tớ đứng phía trước bạn ấy."]),
            ],
          },
        ],
        test: quiz([
          fb("The bus is ___ front of the school.", "in", ["in", "on", "at", "next"]),
          so(["is", "The", "dog", "behind", "the", "tree"], "The dog is behind the tree"),
          viEn("Tớ ngồi cạnh bạn Nam.", "I am next to Nam.", ["I am next to Nam.", "I am next Nam.", "I next to Nam.", "I am in front Nam."]),
          enVi("The cat is behind the box.", "Con mèo ở đằng sau cái hộp.", ["Con mèo ở đằng sau cái hộp.", "Con mèo ở trong cái hộp.", "Con mèo ở trước cái hộp.", "Cái hộp ở sau con mèo."]),
        ]),
      },
    ],
  },

  {
    slug: "present-simple",
    title: "Present simple",
    theme: "Việc bé làm hằng ngày",
    level: "STARTERS",
    lessons: [
      {
        slug: "present-simple",
        title: "I / You / We / They + động từ",
        sections: [
          {
            id: "pres-1",
            title: "Kể việc mình làm hằng ngày",
            titleEn: "Present simple (I / you / we / they)",
            structure: "I / You / We / They + động từ nguyên thể + …",
            breakdown: [
              part("I", "Chủ ngữ", "Người làm việc đó."),
              part("go", "Động từ", "Việc làm — với I/you/we/they thì giữ nguyên."),
              part("to school every day", "Phần bổ sung", "Nói rõ đi đâu, khi nào."),
            ],
            explanation:
              "Thì hiện tại đơn dùng để kể việc LÀM THƯỜNG XUYÊN, ngày nào cũng vậy.\n- I go to school every day.\n- We play football on Sunday.\nTiếng Việt không chia động từ, nên bé chỉ cần nhớ: với I, you, we, they thì để động từ nguyên như trong từ điển.",
            usage: "Dùng khi kể thời gian biểu, thói quen, sở thích — những việc lặp đi lặp lại.",
            mistakes: [
              mis("I am go to school.", "I go to school.", "Đã có động từ “go” thì KHÔNG thêm “am”."),
              mis("We plays football.", "We play football.", "“We” không thêm -s vào động từ."),
              mis("They goes home.", "They go home.", "“They” số nhiều nên động từ giữ nguyên."),
            ],
            examples: [
              ex("Khi kể thời gian biểu", "I get up at six.", "Tớ dậy lúc sáu giờ."),
              ex("Khi kể việc cuối tuần", "We play football on Sunday.", "Chủ nhật chúng tớ chơi bóng đá."),
              ex("Khi nói về gia đình", "My parents work in a shop.", "Bố mẹ tớ làm ở một cửa hàng."),
            ],
            exercises: [
              fb("I ___ to school every day.", "go", ["go", "goes", "am go", "going"], "Chủ ngữ “I” thì động từ giữ nguyên: go."),
              fb("They ___ football on Sunday.", "play", ["play", "plays", "are play", "playing"], "“They” số nhiều nên không thêm -s."),
              so(["get", "I", "up", "at", "six"], "I get up at six", "Tớ dậy lúc sáu giờ."),
              so(["live", "We", "in", "Hanoi"], "We live in Hanoi", "Chúng tớ sống ở Hà Nội."),
              viEn("Chúng tớ đi học vào thứ Hai.", "We go to school on Monday.", ["We go to school on Monday.", "We goes to school on Monday.", "We are go to school on Monday.", "We going to school on Monday."], "“We” thì động từ giữ nguyên: go."),
              viEn("Tớ ăn tối lúc sáu giờ.", "I have dinner at six.", ["I have dinner at six.", "I has dinner at six.", "I am have dinner at six.", "I having dinner at six."], "“I” thì động từ giữ nguyên: have."),
              enVi("I get up at six.", "Tớ dậy lúc sáu giờ.", ["Tớ dậy lúc sáu giờ.", "Tớ đi ngủ lúc sáu giờ.", "Tớ dậy lúc bảy giờ.", "Tớ dậy rất muộn."]),
              enVi("They live in Hue.", "Các bạn ấy sống ở Huế.", ["Các bạn ấy sống ở Huế.", "Bạn ấy sống ở Huế.", "Các bạn ấy đi Huế.", "Các bạn ấy thích Huế."]),
            ],
          },
        ],
        test: quiz([
          fb("We ___ in Hanoi.", "live", ["live", "lives", "are live", "living"]),
          so(["go", "I", "to", "bed", "at", "nine"], "I go to bed at nine"),
          viEn("Các bạn ấy chơi bóng mỗi ngày.", "They play football every day.", ["They play football every day.", "They plays football every day.", "They are play football every day.", "They playing football every day."]),
          enVi("I read books every night.", "Tối nào tớ cũng đọc sách.", ["Tối nào tớ cũng đọc sách.", "Tớ đọc sách vào buổi sáng.", "Tớ thích đọc sách.", "Tớ đang đọc một quyển sách."]),
        ]),
      },
      {
        slug: "present-simple-s",
        title: "He / She / It + động từ thêm -s",
        sections: [
          {
            id: "pres-2",
            title: "Ngôi thứ ba số ít thêm -s",
            titleEn: "Present simple: he / she / it + -s",
            structure: "He / She / It + động từ + -s",
            breakdown: [
              part("She", "Chủ ngữ ngôi thứ ba số ít", "Một người khác (không phải tớ, không phải bạn)."),
              part("likes", "Động từ + -s", "Chỉ ngôi thứ ba SỐ ÍT mới thêm -s."),
              part("cats", "Tân ngữ", "Thứ mà bạn ấy thích."),
            ],
            explanation:
              "Với he, she, it thì động từ phải thêm -s.\n- I play → She plays\n- They go → He goes\nQuy tắc thêm:\n- Bình thường: + s (read → reads)\n- Kết thúc bằng o, s, x, ch, sh: + es (go → goes, watch → watches)\n- Phụ âm + y: bỏ y, + ies (study → studies)\n- Đặc biệt: have → has",
            usage: "Dùng khi bé kể về bạn mình, về bố mẹ, hoặc về con vật nuôi.",
            mistakes: [
              mis("She like cats.", "She likes cats.", "Ngôi thứ ba số ít phải thêm -s. Lỗi này trẻ Việt mắc rất nhiều."),
              mis("He gos to school.", "He goes to school.", "Kết thúc bằng -o thì thêm -es."),
              mis("My mum have a car.", "My mum has a car.", "“have” đổi thành “has” với he/she/it."),
            ],
            examples: [
              ex("Khi kể về bạn", "She likes ice cream.", "Bạn ấy thích kem."),
              ex("Khi kể về bố", "My dad goes to work at seven.", "Bố tớ đi làm lúc bảy giờ."),
              ex("Khi kể về mèo nhà mình", "My cat sleeps all day.", "Con mèo nhà tớ ngủ cả ngày."),
            ],
            exercises: [
              fb("She ___ cats.", "likes", ["likes", "like", "is like", "liking"], "“She” là ngôi thứ ba số ít nên động từ thêm -s."),
              fb("He ___ to school by bus.", "goes", ["goes", "gos", "go", "going"], "“go” kết thúc bằng -o nên thêm -es."),
              so(["plays", "My", "brother", "football"], "My brother plays football", "Anh trai tớ chơi bóng đá."),
              so(["watches", "She", "TV", "every", "evening"], "She watches TV every evening", "Tối nào bạn ấy cũng xem TV."),
              viEn("Mẹ tớ có một chiếc ô tô.", "My mum has a car.", ["My mum has a car.", "My mum have a car.", "My mum has car.", "My mum is has a car."], "Với “my mum” (= she) thì “have” đổi thành “has”."),
              viEn("Bạn ấy học tiếng Anh mỗi ngày.", "She studies English every day.", ["She studies English every day.", "She study English every day.", "She studys English every day.", "She is study English every day."], "“study” có phụ âm + y nên bỏ y, thêm -ies."),
              enVi("My cat sleeps all day.", "Con mèo nhà tớ ngủ cả ngày.", ["Con mèo nhà tớ ngủ cả ngày.", "Con mèo nhà tớ chơi cả ngày.", "Con chó nhà tớ ngủ cả ngày.", "Con mèo nhà tớ đang ngủ."]),
              enVi("He watches TV after school.", "Bạn ấy xem TV sau giờ học.", ["Bạn ấy xem TV sau giờ học.", "Bạn ấy xem TV trước giờ học.", "Bạn ấy học bài sau giờ học.", "Bạn ấy đang xem TV."]),
            ],
          },
        ],
        test: quiz([
          fb("My sister ___ English every day.", "studies", ["studies", "study", "studys", "studing"]),
          so(["likes", "He", "ice", "cream"], "He likes ice cream"),
          viEn("Bố tớ đi làm lúc bảy giờ.", "My dad goes to work at seven.", ["My dad goes to work at seven.", "My dad go to work at seven.", "My dad gos to work at seven.", "My dad is go to work at seven."]),
          enVi("She has a big dog.", "Bạn ấy có một con chó to.", ["Bạn ấy có một con chó to.", "Bạn ấy muốn một con chó to.", "Bạn ấy có hai con chó.", "Con chó của bạn ấy rất nhỏ."]),
        ]),
      },
      {
        slug: "present-simple-negative",
        title: "don’t · doesn’t",
        sections: [
          {
            id: "pres-3",
            title: "Nói mình KHÔNG làm việc gì",
            titleEn: "Present simple negative (don’t / doesn’t)",
            structure: "I/You/We/They + don’t + V · He/She/It + doesn’t + V",
            breakdown: [
              part("She", "Chủ ngữ", "Người không làm việc đó."),
              part("doesn’t", "Trợ động từ phủ định", "He/She/It thì dùng “doesn’t”."),
              part("like fish", "Động từ TRẦN", "Sau doesn’t thì động từ BỎ -s."),
            ],
            explanation:
              "Muốn nói “không” thì thêm don’t / doesn’t trước động từ.\n- I don’t like fish.\n- She doesn’t like fish.\nĐiều quan trọng nhất: khi đã có “doesn’t” thì động từ BỎ -s.\n- She likes → She doesn’t like (KHÔNG phải doesn’t likes)",
            usage: "Dùng khi bé nói mình không làm gì, không thích gì, hoặc bạn mình không có thói quen nào đó.",
            mistakes: [
              mis("She doesn’t likes fish.", "She doesn’t like fish.", "Có “doesn’t” rồi thì động từ bỏ -s."),
              mis("He don’t play football.", "He doesn’t play football.", "“He” phải dùng “doesn’t”."),
              mis("I not like milk.", "I don’t like milk.", "Phủ định động từ thường cần “don’t”, không phải “not” đứng một mình."),
            ],
            examples: [
              ex("Khi từ chối món ăn", "I don’t like fish.", "Tớ không thích cá."),
              ex("Khi kể về bạn", "She doesn’t watch TV.", "Bạn ấy không xem TV."),
              ex("Khi nói về cuối tuần", "We don’t go to school on Sunday.", "Chủ nhật chúng tớ không đi học."),
            ],
            exercises: [
              fb("I ___ like fish.", "don’t", ["don’t", "doesn’t", "not", "am not"], "Chủ ngữ “I” dùng “don’t”."),
              fb("He ___ play football.", "doesn’t", ["doesn’t", "don’t", "isn’t", "not"], "“He” là ngôi thứ ba số ít nên dùng “doesn’t”."),
              so(["don’t", "We", "go", "to", "school", "on", "Sunday"], "We don’t go to school on Sunday", "Chủ nhật chúng tớ không đi học."),
              so(["doesn’t", "She", "like", "milk"], "She doesn’t like milk", "Bạn ấy không thích sữa."),
              viEn("Bạn ấy không xem TV.", "She doesn’t watch TV.", ["She doesn’t watch TV.", "She doesn’t watches TV.", "She don’t watch TV.", "She not watch TV."], "“She” dùng doesn’t, và động từ bỏ -s."),
              viEn("Tớ không ăn cá.", "I don’t eat fish.", ["I don’t eat fish.", "I doesn’t eat fish.", "I not eat fish.", "I don’t eats fish."], "“I” dùng “don’t” và động từ giữ nguyên."),
              enVi("They don’t live here.", "Các bạn ấy không sống ở đây.", ["Các bạn ấy không sống ở đây.", "Các bạn ấy sống ở đây.", "Bạn ấy không sống ở đây.", "Các bạn ấy không thích ở đây."]),
              enVi("My dad doesn’t drink coffee.", "Bố tớ không uống cà phê.", ["Bố tớ không uống cà phê.", "Bố tớ uống cà phê.", "Mẹ tớ không uống cà phê.", "Bố tớ không thích cà phê."]),
            ],
          },
        ],
        test: quiz([
          fb("She ___ like cats.", "doesn’t", ["doesn’t", "don’t", "isn’t", "not"]),
          so(["don’t", "I", "like", "fish"], "I don’t like fish"),
          viEn("Anh trai tớ không chơi bóng rổ.", "My brother doesn’t play basketball.", ["My brother doesn’t play basketball.", "My brother doesn’t plays basketball.", "My brother don’t play basketball.", "My brother not play basketball."]),
          enVi("We don’t watch TV at night.", "Buổi tối chúng tớ không xem TV.", ["Buổi tối chúng tớ không xem TV.", "Buổi tối chúng tớ xem TV.", "Buổi sáng chúng tớ không xem TV.", "Chúng tớ không thích TV."]),
        ]),
      },
    ],
  },
];
