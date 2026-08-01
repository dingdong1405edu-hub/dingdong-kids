// Ngữ pháp cho 12 bài LỘ TRÌNH cấp PRE-STARTERS (4–5 tuổi).
//
// Thứ tự PHẢI khớp `prisma/content/pre-starters.ts` — xem `LessonGrammarSeed`
// ở ./types. Mỗi bài chỉ dạy MỘT mẫu câu, và chỉ dùng lại đúng những từ bài đó
// vừa dạy (My Family → mum/dad/sister…, Fruits → apple/banana…) để bé không
// phải học từ mới và mẫu câu mới cùng lúc.
//
// Mỗi phần đủ 8 minigame theo luật chung: 2× fill_blank, 2× sentence_order,
// 2× dịch Việt→Anh, 2× dịch Anh→Việt.
import { fb, so, viEn, enVi, ex, mis, part, type LessonGrammarSeed } from "./types";

export const LESSON_GRAMMAR: LessonGrammarSeed[] = [
  // ─────────────────────────── Bài 1 ───────────────────────────
  {
    topic: "My Family",
    sections: [
      {
        id: "rm-ps-01",
        title: "Giới thiệu người thân",
        titleEn: "This is my …",
        structure: "This is + my + người",
        breakdown: [
          part("This is", "Mẫu giới thiệu", "“Đây là…” — dùng khi chỉ vào người đang ở gần bé."),
          part("my", "Từ sở hữu", "“của tớ”. Trong tiếng Anh, “my” đứng TRƯỚC người."),
          part("mum", "Người", "Người mà bé đang giới thiệu."),
        ],
        explanation:
          "Khi chỉ vào một người ở gần và giới thiệu, bé nói “This is…”.\n- Tiếng Việt: “Đây là mẹ TỚ” — chữ “tớ” đứng SAU.\n- Tiếng Anh: “This is MY mum” — chữ “my” đứng TRƯỚC.\nVà câu tiếng Anh luôn phải có “is” ở giữa.",
        usage: "Dùng khi bé khoe ảnh gia đình, hoặc giới thiệu người thân với bạn.",
        mistakes: [
          mis("This is mum my.", "This is my mum.", "“my” phải đứng TRƯỚC người, không đứng sau như tiếng Việt."),
          mis("This my dad.", "This is my dad.", "Thiếu “is” — tiếng Việt không có từ này nên bé hay quên."),
          mis("This is my a sister.", "This is my sister.", "Đã có “my” thì không cần “a” nữa."),
        ],
        examples: [
          ex("Khi bé chỉ vào ảnh mẹ", "This is my mum.", "Đây là mẹ tớ."),
          ex("Khi bé giới thiệu em bé", "This is my baby brother.", "Đây là em trai nhỏ của tớ."),
          ex("Khi bé khoe ảnh cả nhà", "This is my family.", "Đây là gia đình tớ."),
        ],
        exercises: [
          fb("This ___ my dad.", "is", ["is", "am", "are", "be"], "Câu tiếng Anh phải có “is” ở giữa, dù tiếng Việt không cần."),
          fb("This is ___ sister.", "my", ["my", "I", "me", "mine"], "“my” nghĩa là “của tớ” và đứng ngay trước người."),
          so(["This", "is", "my", "mum"], "This is my mum", "Đây là mẹ tớ.", "Thứ tự đúng: This is → my → người."),
          so(["is", "This", "my", "brother"], "This is my brother", "Đây là anh trai tớ.", "“my” luôn đứng trước “brother”."),
          viEn(
            "Đây là bố tớ.",
            "This is my dad.",
            ["This is my dad.", "This is dad my.", "This my dad.", "This is a my dad."],
            "“my” đứng trước “dad”, và câu cần “is”.",
          ),
          viEn(
            "Đây là gia đình tớ.",
            "This is my family.",
            ["This is my family.", "This family my.", "This is family my.", "This is my familys."],
            "“family” là một nhà nên không thêm -s.",
          ),
          enVi("This is my sister.", "Đây là chị gái tớ.", ["Đây là chị gái tớ.", "Đây là mẹ tớ.", "Kia là chị gái tớ.", "Tớ có một chị gái."]),
          enVi("This is my baby brother.", "Đây là em trai nhỏ của tớ.", ["Đây là em trai nhỏ của tớ.", "Đây là anh trai lớn của tớ.", "Đây là em bé của mẹ.", "Tớ yêu em trai tớ."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 2 ───────────────────────────
  {
    topic: "My Body",
    sections: [
      {
        id: "rm-ps-02",
        title: "Đếm bộ phận cơ thể",
        titleEn: "I have two …",
        structure: "I have + số + danh từ (thêm -s)",
        breakdown: [
          part("I have", "Chủ ngữ + động từ", "“Tớ có…”."),
          part("two", "Số đếm", "Số lượng bé muốn nói."),
          part("hands", "Danh từ số nhiều", "Nhiều hơn một thì PHẢI thêm -s vào cuối."),
        ],
        explanation:
          "Tiếng Việt nói “hai bàn tay” — chữ “tay” giữ nguyên.\nTiếng Anh thì khác: nhiều hơn một là phải thêm -s.\n- one hand → two handS\n- one leg → two legS\nRiêng “foot” đặc biệt: two FEET (không phải “two foots”).",
        usage: "Dùng khi bé đếm và nói về cơ thể mình.",
        mistakes: [
          mis("I have two hand.", "I have two hands.", "Nhiều hơn một phải thêm -s. Trẻ Việt rất hay quên vì tiếng Việt không đổi từ."),
          mis("I have two foots.", "I have two feet.", "“foot” đổi hẳn thành “feet”, không thêm -s."),
          mis("I has two arms.", "I have two arms.", "“I” luôn đi với “have”."),
        ],
        examples: [
          ex("Khi bé giơ hai tay lên", "I have two hands.", "Tớ có hai bàn tay."),
          ex("Khi bé chỉ vào chân", "I have two legs.", "Tớ có hai cái chân."),
          ex("Khi bé đếm bàn chân", "I have two feet.", "Tớ có hai bàn chân.", "Nhớ “feet” chứ không phải “foots” nhé!"),
        ],
        exercises: [
          fb("I ___ two legs.", "have", ["have", "has", "am", "is"], "“I” luôn đi với “have”."),
          fb("I have two ___.", "feet", ["feet", "foots", "foot", "feets"], "“foot” đổi thành “feet” khi có hai cái.", "Hai bàn chân"),
          so(["I", "have", "two", "hands"], "I have two hands", "Tớ có hai bàn tay.", "Có hai cái nên “hand” phải thành “hands”."),
          so(["have", "I", "two", "arms"], "I have two arms", "Tớ có hai cánh tay.", "Thứ tự: I → have → số → danh từ."),
          viEn(
            "Tớ có hai cái chân.",
            "I have two legs.",
            ["I have two legs.", "I have two leg.", "I has two legs.", "I have leg two."],
            "Hai cái chân nên “leg” thêm -s thành “legs”.",
          ),
          viEn(
            "Tớ có hai bàn chân.",
            "I have two feet.",
            ["I have two feet.", "I have two foots.", "I have two foot.", "I has two feet."],
            "“foot” là từ đặc biệt: hai cái là “feet”.",
          ),
          enVi("I have two hands.", "Tớ có hai bàn tay.", ["Tớ có hai bàn tay.", "Tớ có một bàn tay.", "Tớ có hai cánh tay.", "Tay tớ to."]),
          enVi("I have two arms.", "Tớ có hai cánh tay.", ["Tớ có hai cánh tay.", "Tớ có hai cái chân.", "Tớ có một cánh tay.", "Cánh tay tớ dài."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 3 ───────────────────────────
  {
    topic: "My Face",
    sections: [
      {
        id: "rm-ps-03",
        title: "Tả khuôn mặt của bé",
        titleEn: "My … is / are …",
        structure: "My + bộ phận + is/are + tính từ",
        breakdown: [
          part("My", "Từ sở hữu", "“của tớ” — đứng TRƯỚC bộ phận."),
          part("eyes", "Bộ phận", "Một cái → dùng “is”. Nhiều cái → dùng “are”."),
          part("are", "Động từ to be", "Nối bộ phận với từ tả nó."),
          part("big", "Tính từ", "Điều bé muốn nói về bộ phận đó."),
        ],
        explanation:
          "Bé có MỘT cái mũi nhưng HAI con mắt, nên động từ cũng khác nhau:\n- My nose IS small. (một cái → is)\n- My eyes ARE big. (hai cái → are)\nVà nhớ: “my” luôn đứng trước, không đứng sau như tiếng Việt “mũi TỚ”.",
        usage: "Dùng khi bé soi gương và tả khuôn mặt mình, hoặc tả bạn.",
        mistakes: [
          mis("Nose my is small.", "My nose is small.", "“my” phải đứng TRƯỚC “nose”."),
          mis("My eyes is big.", "My eyes are big.", "Hai con mắt là số nhiều nên dùng “are”."),
          mis("My mouth small.", "My mouth is small.", "Thiếu “is” — câu tiếng Anh bắt buộc phải có."),
        ],
        examples: [
          ex("Khi bé chỉ vào mũi", "My nose is small.", "Mũi tớ nhỏ."),
          ex("Khi bé soi gương", "My eyes are big.", "Mắt tớ to.", "Hai con mắt nên dùng “are”."),
          ex("Khi bé giới thiệu khuôn mặt", "This is my face.", "Đây là khuôn mặt tớ."),
        ],
        exercises: [
          fb("My nose ___ small.", "is", ["is", "are", "am", "be"], "Bé chỉ có MỘT cái mũi nên dùng “is”."),
          fb("My eyes ___ big.", "are", ["are", "is", "am", "be"], "Bé có HAI con mắt nên dùng “are”."),
          so(["My", "nose", "is", "small"], "My nose is small", "Mũi tớ nhỏ.", "Thứ tự: My → bộ phận → is → tính từ."),
          so(["are", "My", "ears", "small"], "My ears are small", "Tai tớ nhỏ.", "Hai cái tai nên dùng “are”."),
          viEn(
            "Mắt tớ to.",
            "My eyes are big.",
            ["My eyes are big.", "My eyes is big.", "My eye are big.", "Eyes my are big."],
            "Hai con mắt → “eyes” + “are”.",
          ),
          viEn(
            "Miệng tớ nhỏ.",
            "My mouth is small.",
            ["My mouth is small.", "My mouth small.", "Mouth my is small.", "My mouth are small."],
            "Một cái miệng → “is”, và “my” đứng trước.",
          ),
          enVi("This is my face.", "Đây là khuôn mặt tớ.", ["Đây là khuôn mặt tớ.", "Đây là cái mũi tớ.", "Kia là khuôn mặt tớ.", "Khuôn mặt tớ vui."]),
          enVi("My ears are small.", "Tai tớ nhỏ.", ["Tai tớ nhỏ.", "Tai tớ to.", "Mắt tớ nhỏ.", "Tớ có hai cái tai."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 4 ───────────────────────────
  {
    topic: "Pets",
    sections: [
      {
        id: "rm-ps-04",
        title: "Nói về con vật nuôi",
        titleEn: "I have a … · It is a …",
        structure: "I have + a + con vật · It is + a + con vật",
        breakdown: [
          part("I have", "Chủ ngữ + động từ", "“Tớ có…”."),
          part("a", "Mạo từ", "Đứng trước MỘT con vật. Tiếng Việt không có từ này."),
          part("dog", "Con vật", "Con vật bé đang nói tới."),
        ],
        explanation:
          "Tiếng Việt nói “Tớ có chó” là xong.\nTiếng Anh thì BẮT BUỘC có chữ “a” trước con vật:\n- I have A dog.\n- It is A cat.\n“a” có nghĩa là “một”.",
        usage: "Dùng khi bé khoe con vật nuôi của mình, hoặc gọi tên một con vật.",
        mistakes: [
          mis("I have dog.", "I have a dog.", "Thiếu “a” — tiếng Việt không có từ này nên bé hay bỏ quên."),
          mis("It a cat.", "It is a cat.", "Thiếu “is”."),
          mis("I have a fishs.", "I have a fish.", "Đã có “a” (một con) thì không thêm -s."),
        ],
        examples: [
          ex("Khi bé khoe con chó nhà mình", "I have a dog.", "Tớ có một con chó."),
          ex("Khi bé chỉ vào con mèo", "It is a cat.", "Nó là một con mèo."),
          ex("Khi bé nói về bể cá", "I have a fish.", "Tớ có một con cá."),
        ],
        exercises: [
          fb("I have ___ dog.", "a", ["a", "an", "the", "is"], "“dog” bắt đầu bằng phụ âm nên dùng “a”."),
          fb("It ___ a cat.", "is", ["is", "am", "are", "be"], "“It” đi với “is”."),
          so(["I", "have", "a", "dog"], "I have a dog", "Tớ có một con chó.", "Nhớ chữ “a” ở giữa “have” và “dog”."),
          so(["is", "It", "a", "cat"], "It is a cat", "Nó là một con mèo.", "Thứ tự: It → is → a → con vật."),
          viEn(
            "Tớ có một con mèo.",
            "I have a cat.",
            ["I have a cat.", "I have cat.", "I has a cat.", "I have a cats."],
            "Một con mèo → “a cat”, không thêm -s.",
          ),
          viEn(
            "Nó là một con cá.",
            "It is a fish.",
            ["It is a fish.", "It is fish.", "It are a fish.", "It a fish."],
            "Cần đủ cả “is” và “a”.",
          ),
          enVi("I have a pet.", "Tớ có một con vật nuôi.", ["Tớ có một con vật nuôi.", "Tớ thích con vật nuôi.", "Đây là con vật nuôi của tớ.", "Tớ có hai con vật nuôi."]),
          enVi("It is a dog.", "Nó là một con chó.", ["Nó là một con chó.", "Nó là một con mèo.", "Tớ có một con chó.", "Con chó thì to."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 5 ───────────────────────────
  {
    topic: "Farm Animals",
    sections: [
      {
        id: "rm-ps-05",
        title: "Đếm con vật ở nông trại",
        titleEn: "Plural -s",
        structure: "số + danh từ + s",
        breakdown: [
          part("three", "Số đếm", "Nhiều hơn một."),
          part("ducks", "Danh từ số nhiều", "Thêm -s vào cuối vì có nhiều con."),
        ],
        explanation:
          "Ở nông trại có rất nhiều con vật. Nhiều hơn MỘT là phải thêm -s:\n- one duck → three duckS\n- one pig → two pigS\n- one hen → four henS\nTiếng Việt nói “ba con vịt” — chữ “vịt” không đổi, nên bé rất hay quên chữ -s này.",
        usage: "Dùng khi bé đếm con vật, đồ vật, hoặc bất cứ thứ gì nhiều hơn một.",
        mistakes: [
          mis("I see three duck.", "I see three ducks.", "Ba con thì “duck” phải thành “ducks”."),
          mis("There are two pig.", "There are two pigs.", "Số nhiều luôn thêm -s."),
          mis("I see a cows.", "I see a cow.", "“a” là một con, nên KHÔNG thêm -s."),
        ],
        examples: [
          ex("Khi bé đếm vịt ở ao", "I see three ducks.", "Tớ thấy ba con vịt."),
          ex("Khi bé nhìn thấy bò", "I see two cows.", "Tớ thấy hai con bò."),
          ex("Khi bé đếm gà", "There are four hens.", "Có bốn con gà mái."),
        ],
        exercises: [
          fb("I see three ___.", "ducks", ["ducks", "duck", "duckes", "a duck"], "Ba con nên thêm -s: “ducks”."),
          fb("There are two ___.", "pigs", ["pigs", "pig", "piges", "a pig"], "Hai con nên thêm -s: “pigs”."),
          so(["I", "see", "two", "cows"], "I see two cows", "Tớ thấy hai con bò.", "Hai con bò → “cows” có -s."),
          so(["are", "There", "four", "hens"], "There are four hens", "Có bốn con gà mái.", "Nhiều con thì dùng “are” và thêm -s."),
          viEn(
            "Tớ thấy ba con lợn.",
            "I see three pigs.",
            ["I see three pigs.", "I see three pig.", "I sees three pigs.", "I see three piges."],
            "Ba con lợn → “pigs”.",
          ),
          viEn(
            "Có hai con bò.",
            "There are two cows.",
            ["There are two cows.", "There is two cows.", "There are two cow.", "There two cows."],
            "Nhiều con → “There are” và “cows” có -s.",
          ),
          enVi("I see five hens.", "Tớ thấy năm con gà mái.", ["Tớ thấy năm con gà mái.", "Tớ thấy năm con vịt.", "Tớ thấy một con gà mái.", "Có năm con gà mái."]),
          enVi("Two cows are big.", "Hai con bò thì to.", ["Hai con bò thì to.", "Hai con bò thì nhỏ.", "Con bò thì to.", "Tớ thấy hai con bò."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 6 ───────────────────────────
  {
    topic: "Zoo Animals",
    sections: [
      {
        id: "rm-ps-06",
        title: "Hỏi xem đó là con gì",
        titleEn: "Is it a …?",
        structure: "Is + it + a + con vật?",
        breakdown: [
          part("Is", "To be đảo lên đầu", "Đưa “is” ra TRƯỚC là thành câu hỏi."),
          part("it", "Chủ ngữ", "Con vật bé đang hỏi về."),
          part("a lion?", "Phần muốn hỏi", "Điều bé muốn biết đúng hay không."),
        ],
        explanation:
          "Muốn hỏi, bé chỉ cần ĐẢO chữ “is” lên trước:\n- It is a lion. → IS IT a lion?\nTrả lời ngắn gọn:\n- Yes, it is. (Vâng, đúng rồi.)\n- No, it isn’t. (Không, không phải.)",
        usage: "Dùng khi bé đi sở thú và muốn hỏi xem con vật kia là con gì.",
        mistakes: [
          mis("It is a lion?", "Is it a lion?", "Câu hỏi phải đảo “is” lên ĐẦU câu."),
          mis("Yes, it’s.", "Yes, it is.", "Câu trả lời ngắn KHÔNG được viết tắt."),
          mis("No, it not.", "No, it isn’t.", "Phủ định là “isn’t” (= is not)."),
        ],
        examples: [
          ex("Khi bé chỉ vào chuồng thú", "Is it a lion?", "Nó là con sư tử phải không?"),
          ex("Khi câu trả lời là đúng", "Yes, it is.", "Vâng, đúng rồi."),
          ex("Khi câu trả lời là sai", "No, it isn’t.", "Không, không phải."),
        ],
        exercises: [
          fb("___ it a lion?", "Is", ["Is", "Are", "Am", "Be"], "“it” số ít nên câu hỏi bắt đầu bằng “Is”."),
          fb("Is it a tiger? — No, it ___.", "isn’t", ["isn’t", "is", "aren’t", "not"], "Trả lời “không” thì dùng “isn’t”."),
          so(["Is", "it", "a", "monkey"], "Is it a monkey", "Nó là con khỉ phải không?", "Câu hỏi bắt đầu bằng “Is”."),
          so(["it", "Is", "an", "elephant"], "Is it an elephant", "Nó là con voi phải không?", "“elephant” bắt đầu bằng nguyên âm nên dùng “an”."),
          viEn(
            "Nó là con hổ phải không?",
            "Is it a tiger?",
            ["Is it a tiger?", "It is a tiger?", "Is it tiger?", "Are it a tiger?"],
            "Đảo “Is” lên đầu, và “tiger” cần “a”.",
          ),
          viEn(
            "Vâng, đúng rồi.",
            "Yes, it is.",
            ["Yes, it is.", "Yes, it’s.", "Yes, it are.", "Yes, is it."],
            "Trả lời ngắn không viết tắt thành “it’s”.",
          ),
          enVi("Is it a monkey?", "Nó là con khỉ phải không?", ["Nó là con khỉ phải không?", "Nó là con khỉ.", "Nó là con voi phải không?", "Con khỉ ở đâu?"]),
          enVi("No, it isn’t.", "Không, không phải.", ["Không, không phải.", "Vâng, đúng rồi.", "Tớ không biết.", "Nó không ở đây."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 7 ───────────────────────────
  {
    topic: "Colours",
    sections: [
      {
        id: "rm-ps-07",
        title: "Màu đứng ở đâu trong câu?",
        titleEn: "a + colour + noun",
        structure: "a + màu + đồ vật",
        breakdown: [
          part("a", "Mạo từ", "Một cái."),
          part("red", "Màu sắc", "Trong tiếng Anh, màu đứng TRƯỚC đồ vật."),
          part("balloon", "Đồ vật", "Thứ mang màu đó."),
        ],
        explanation:
          "Đây là chỗ tiếng Anh khác tiếng Việt nhất:\n- Tiếng Việt: “quả bóng bay ĐỎ” — màu đứng SAU.\n- Tiếng Anh: “a RED balloon” — màu đứng TRƯỚC.\nBé nhớ đọc màu trước, đồ vật sau nhé!\nCòn khi tả thì dùng: The balloon IS red.",
        usage: "Dùng khi bé gọi tên đồ vật kèm màu, hoặc nói đồ vật đó màu gì.",
        mistakes: [
          mis("I have a balloon red.", "I have a red balloon.", "Màu phải đứng TRƯỚC đồ vật. Đây là lỗi trẻ Việt hay mắc nhất."),
          mis("The balloon red.", "The balloon is red.", "Thiếu “is”."),
          mis("I have a red balloons.", "I have a red balloon.", "Có “a” (một quả) thì không thêm -s."),
        ],
        examples: [
          ex("Khi bé khoe quả bóng bay", "I have a red balloon.", "Tớ có một quả bóng bay màu đỏ.", "“red” đứng TRƯỚC “balloon”."),
          ex("Khi bé tả màu quả bóng", "My balloon is blue.", "Quả bóng bay của tớ màu xanh dương."),
          ex("Khi bé nhìn thấy cầu vồng", "The rainbow is beautiful.", "Cầu vồng đẹp quá."),
        ],
        exercises: [
          fb("I have a red ___.", "balloon", ["balloon", "balloons", "red", "a balloon"], "Sau màu là đồ vật: “a red balloon”."),
          fb("My balloon ___ blue.", "is", ["is", "are", "am", "be"], "Một quả bóng bay nên dùng “is”."),
          so(["a", "I", "have", "red", "balloon"], "I have a red balloon", "Tớ có một quả bóng bay màu đỏ.", "Thứ tự: a → màu → đồ vật."),
          so(["is", "My", "balloon", "blue"], "My balloon is blue", "Quả bóng bay của tớ màu xanh dương.", "Khi tả thì dùng “is” rồi mới tới màu."),
          viEn(
            "Tớ có một quả bóng bay màu xanh dương.",
            "I have a blue balloon.",
            ["I have a blue balloon.", "I have a balloon blue.", "I have blue balloon.", "I have a blue balloons."],
            "Màu “blue” đứng TRƯỚC “balloon”.",
          ),
          viEn(
            "Quả bóng bay màu vàng.",
            "The balloon is yellow.",
            ["The balloon is yellow.", "The balloon yellow.", "The yellow is balloon.", "Balloon is yellow."],
            "Khi tả màu thì cần “is”.",
          ),
          enVi("I have a green balloon.", "Tớ có một quả bóng bay màu xanh lá.", ["Tớ có một quả bóng bay màu xanh lá.", "Tớ có một quả bóng bay màu đỏ.", "Quả bóng bay màu xanh lá.", "Tớ thích màu xanh lá."]),
          enVi("The balloon is red.", "Quả bóng bay màu đỏ.", ["Quả bóng bay màu đỏ.", "Quả bóng bay màu vàng.", "Tớ có quả bóng bay màu đỏ.", "Đây là quả bóng bay."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 8 ───────────────────────────
  {
    topic: "Numbers 1-5",
    sections: [
      {
        id: "rm-ps-08",
        title: "Nói có bao nhiêu cái",
        titleEn: "There is / There are",
        structure: "There is + một cái · There are + nhiều cái",
        breakdown: [
          part("There is", "Mẫu câu số ít", "Dùng khi chỉ có MỘT cái."),
          part("There are", "Mẫu câu số nhiều", "Dùng khi có TỪ HAI cái trở lên."),
          part("three balls", "Số + danh từ", "Nhiều cái thì danh từ thêm -s."),
        ],
        explanation:
          "Khi nói “có…”, bé chọn theo số lượng:\n- MỘT cái → There IS one cat.\n- NHIỀU cái → There ARE two cats.\nNhớ là nhiều cái thì danh từ cũng phải thêm -s nữa nhé.",
        usage: "Dùng khi bé đếm đồ vật trong tranh và nói ra có bao nhiêu.",
        mistakes: [
          mis("There is two cats.", "There are two cats.", "Hai con là số nhiều nên dùng “are”."),
          mis("There are one dog.", "There is one dog.", "Một con thì dùng “is”."),
          mis("There are three cat.", "There are three cats.", "Nhiều con thì danh từ phải thêm -s."),
        ],
        examples: [
          ex("Khi bé đếm được ba quả bóng", "There are three balls.", "Có ba quả bóng."),
          ex("Khi chỉ có một con mèo", "There is one cat.", "Có một con mèo."),
          ex("Khi bé đếm sao trên trời", "There are five stars.", "Có năm ngôi sao."),
        ],
        exercises: [
          fb("There ___ three balls.", "are", ["are", "is", "am", "be"], "Ba quả là nhiều nên dùng “are”."),
          fb("There ___ one cat.", "is", ["is", "are", "am", "be"], "Chỉ một con nên dùng “is”."),
          so(["are", "There", "two", "dogs"], "There are two dogs", "Có hai con chó.", "Hai con → “are” và “dogs” có -s."),
          so(["There", "is", "one", "cat"], "There is one cat", "Có một con mèo.", "Một con → “is” và “cat” không có -s."),
          viEn(
            "Có bốn quả bóng.",
            "There are four balls.",
            ["There are four balls.", "There is four balls.", "There are four ball.", "There four balls."],
            "Bốn quả → “are” và “balls” có -s.",
          ),
          viEn(
            "Có một con chó.",
            "There is one dog.",
            ["There is one dog.", "There are one dog.", "There is one dogs.", "There one dog."],
            "Một con → “is” và “dog” không -s.",
          ),
          enVi("There are five stars.", "Có năm ngôi sao.", ["Có năm ngôi sao.", "Có bốn ngôi sao.", "Có một ngôi sao.", "Ngôi sao thì sáng."]),
          enVi("There is one cat.", "Có một con mèo.", ["Có một con mèo.", "Có hai con mèo.", "Có một con chó.", "Con mèo ở đây."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 9 ───────────────────────────
  {
    topic: "Shapes",
    sections: [
      {
        id: "rm-ps-09",
        title: "Khi nào dùng “a”, khi nào dùng “an”?",
        titleEn: "a / an",
        structure: "a + phụ âm · an + nguyên âm (a, e, i, o, u)",
        breakdown: [
          part("a", "Mạo từ thường", "Dùng trước từ bắt đầu bằng PHỤ ÂM: a circle, a star."),
          part("an", "Mạo từ đặc biệt", "Dùng trước từ bắt đầu bằng NGUYÊN ÂM a/e/i/o/u: an apple."),
        ],
        explanation:
          "Cả hai đều nghĩa là “một”, nhưng chọn theo chữ cái đầu của từ đứng sau:\n- Bắt đầu bằng a, e, i, o, u → dùng AN: an apple, an elephant, an orange.\n- Còn lại → dùng A: a circle, a square, a star.\nLý do rất đơn giản: đọc “a apple” bị vấp, còn “an apple” thì trôi chảy.",
        usage: "Dùng mỗi khi bé gọi tên MỘT đồ vật, một hình, một con vật.",
        mistakes: [
          mis("It is a apple.", "It is an apple.", "“apple” bắt đầu bằng “a” (nguyên âm) nên phải dùng “an”."),
          mis("It is an star.", "It is a star.", "“star” bắt đầu bằng phụ âm nên dùng “a”."),
          mis("It is an circle.", "It is a circle.", "“circle” bắt đầu bằng “c” là phụ âm."),
        ],
        examples: [
          ex("Khi bé chỉ vào hình tròn", "It is a circle.", "Đó là một hình tròn."),
          ex("Khi bé chỉ vào quả táo", "It is an apple.", "Đó là một quả táo.", "“apple” bắt đầu bằng nguyên âm nên dùng “an”."),
          ex("Khi bé thấy con voi", "I see an elephant.", "Tớ thấy một con voi."),
        ],
        exercises: [
          fb("It is ___ circle.", "a", ["a", "an", "the", "one"], "“circle” bắt đầu bằng phụ âm “c” nên dùng “a”."),
          fb("It is ___ apple.", "an", ["an", "a", "the", "one"], "“apple” bắt đầu bằng nguyên âm “a” nên dùng “an”."),
          so(["is", "It", "a", "star"], "It is a star", "Đó là một ngôi sao.", "“star” bắt đầu bằng phụ âm → “a”."),
          so(["an", "It", "is", "elephant"], "It is an elephant", "Đó là một con voi.", "“elephant” bắt đầu bằng nguyên âm → “an”."),
          viEn(
            "Đó là một hình vuông.",
            "It is a square.",
            ["It is a square.", "It is an square.", "It is square.", "It a square."],
            "“square” bắt đầu bằng phụ âm nên dùng “a”.",
          ),
          viEn(
            "Đó là một quả cam.",
            "It is an orange.",
            ["It is an orange.", "It is a orange.", "It is orange.", "It an orange."],
            "“orange” bắt đầu bằng nguyên âm “o” nên dùng “an”.",
          ),
          enVi("It is a triangle.", "Đó là một hình tam giác.", ["Đó là một hình tam giác.", "Đó là một hình vuông.", "Đó là một hình tròn.", "Tớ thích hình tam giác."]),
          enVi("It is a heart.", "Đó là một hình trái tim.", ["Đó là một hình trái tim.", "Đó là một ngôi sao.", "Đó là trái tim của tớ.", "Tớ vẽ một trái tim."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 10 ───────────────────────────
  {
    topic: "Fruits",
    sections: [
      {
        id: "rm-ps-10",
        title: "Nói thích và không thích",
        titleEn: "I like · I don’t like",
        structure: "I like + danh từ số nhiều · I don’t like + danh từ số nhiều",
        breakdown: [
          part("I", "Chủ ngữ", "Người nói — chính là bé."),
          part("don’t", "Từ phủ định", "“không” — viết đầy đủ là “do not”."),
          part("like", "Động từ", "“thích”. Sau “don’t” thì giữ nguyên, không thêm -s."),
          part("apples", "Danh từ số nhiều", "Nói thích loại quả nói chung thì dùng số nhiều."),
        ],
        explanation:
          "Khi nói thích một loại quả nói chung, tiếng Anh dùng số NHIỀU:\n- I like appleS. (Tớ thích táo.)\nMuốn nói KHÔNG thích, bé thêm “don’t” vào trước “like”:\n- I DON’T like grapes. (Tớ không thích nho.)",
        usage: "Dùng khi bé nói về món mình thích hoặc không thích ăn.",
        mistakes: [
          mis("I no like bananas.", "I don’t like bananas.", "Phủ định là “don’t”, không phải “no”."),
          mis("I like apple.", "I like apples.", "Thích táo nói chung thì dùng số nhiều “apples”."),
          mis("I don’t likes grapes.", "I don’t like grapes.", "Sau “don’t” thì “like” giữ nguyên."),
        ],
        examples: [
          ex("Khi bé được mời ăn táo", "I like apples.", "Tớ thích táo."),
          ex("Khi bé không muốn ăn nho", "I don’t like grapes.", "Tớ không thích nho."),
          ex("Khi bé chọn món ưa thích", "I like bananas.", "Tớ thích chuối."),
        ],
        exercises: [
          fb("I ___ apples.", "like", ["like", "likes", "liking", "am like"], "Chủ ngữ “I” thì “like” giữ nguyên."),
          fb("I ___ like bananas.", "don’t", ["don’t", "not", "no", "doesn’t"], "Phủ định với “I” là “don’t”."),
          so(["I", "like", "apples"], "I like apples", "Tớ thích táo.", "Thích nói chung → “apples” số nhiều."),
          so(["don’t", "I", "like", "grapes"], "I don’t like grapes", "Tớ không thích nho.", "“don’t” đứng giữa “I” và “like”."),
          viEn(
            "Tớ thích chuối.",
            "I like bananas.",
            ["I like bananas.", "I like banana.", "I likes bananas.", "I am like bananas."],
            "Thích chuối nói chung → “bananas”.",
          ),
          viEn(
            "Tớ không thích xoài.",
            "I don’t like mangoes.",
            ["I don’t like mangoes.", "I no like mangoes.", "I don’t likes mangoes.", "I not like mangoes."],
            "Phủ định dùng “don’t” và giữ nguyên “like”.",
          ),
          enVi("I like oranges.", "Tớ thích cam.", ["Tớ thích cam.", "Tớ thích táo.", "Tớ không thích cam.", "Tớ có một quả cam."]),
          enVi("I don’t like grapes.", "Tớ không thích nho.", ["Tớ không thích nho.", "Tớ thích nho.", "Tớ không thích chuối.", "Tớ không có nho."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 11 ───────────────────────────
  {
    topic: "My Toys",
    sections: [
      {
        id: "rm-ps-11",
        title: "Cái này và cái kia",
        titleEn: "This · That",
        structure: "This is + … (ở GẦN) · That is + … (ở XA)",
        breakdown: [
          part("This is", "Chỉ đồ ở gần", "Đồ vật bé đang cầm hoặc ngay cạnh bé."),
          part("That is", "Chỉ đồ ở xa", "Đồ vật ở đằng kia, bé phải chỉ tay tới."),
          part("my teddy", "Đồ vật", "Món đồ chơi bé đang nói tới."),
        ],
        explanation:
          "Chọn “this” hay “that” là tuỳ đồ vật ở ĐÂU:\n- Đang cầm trên tay → THIS is my teddy. (Đây là…)\n- Ở đằng xa kia → THAT is my kite. (Kia là…)\nCả hai đều cần “is” ở sau.",
        usage: "Dùng khi bé khoe đồ chơi: món đang cầm và món để đằng xa.",
        mistakes: [
          mis("This my ball.", "This is my ball.", "Thiếu “is”."),
          mis("That is a ball red.", "That is a red ball.", "Màu phải đứng TRƯỚC đồ vật."),
          mis("This is my toys.", "This is my toy.", "“This is” chỉ MỘT món nên không thêm -s."),
        ],
        examples: [
          ex("Khi bé đang ôm gấu bông", "This is my teddy.", "Đây là con gấu bông của tớ."),
          ex("Khi bé chỉ con diều trên trời", "That is my kite.", "Kia là con diều của tớ."),
          ex("Khi bé khoe ô tô đồ chơi", "This is my toy car.", "Đây là ô tô đồ chơi của tớ."),
        ],
        exercises: [
          fb("___ is my teddy.", "This", ["This", "That", "These", "It"], "Gấu bông đang ở trong tay bé nên dùng “This”.", "Món đồ bé đang CẦM trên tay"),
          fb("___ is my kite.", "That", ["That", "This", "These", "Those"], "Con diều đang bay xa nên dùng “That”.", "Con diều đang bay XA trên trời"),
          so(["This", "is", "my", "doll"], "This is my doll", "Đây là con búp bê của tớ.", "Đồ ở gần → “This is”."),
          so(["is", "That", "my", "car"], "That is my car", "Kia là ô tô của tớ.", "Đồ ở xa → “That is”."),
          viEn(
            "Đây là con gấu bông của tớ.",
            "This is my teddy.",
            ["This is my teddy.", "That is my teddy.", "This my teddy.", "This is teddy my."],
            "“Đây là” = “This is”, và “my” đứng trước đồ vật.",
          ),
          viEn(
            "Kia là quả bóng của tớ.",
            "That is my ball.",
            ["That is my ball.", "This is my ball.", "That my ball.", "That is ball my."],
            "“Kia là” (ở xa) = “That is”.",
          ),
          enVi("This is my toy car.", "Đây là ô tô đồ chơi của tớ.", ["Đây là ô tô đồ chơi của tớ.", "Kia là ô tô đồ chơi của tớ.", "Đây là ô tô của bố tớ.", "Tớ thích ô tô đồ chơi."]),
          enVi("That is my kite.", "Kia là con diều của tớ.", ["Kia là con diều của tớ.", "Đây là con diều của tớ.", "Kia là quả bóng của tớ.", "Con diều của tớ bay cao."]),
        ],
      },
    ],
  },

  // ─────────────────────────── Bài 12 ───────────────────────────
  {
    topic: "Drinks",
    sections: [
      {
        id: "rm-ps-12",
        title: "Xin đồ uống thật lịch sự",
        titleEn: "I want … · Can I have …?",
        structure: "I want + some + đồ uống · Can I have + some + đồ uống?",
        breakdown: [
          part("Can I have", "Mẫu xin lịch sự", "“Cho tớ xin…” — lịch sự hơn “I want”."),
          part("some", "Từ chỉ lượng", "“một ít”. Đồ uống không đếm được nên dùng “some”, không dùng “a”."),
          part("milk", "Đồ uống", "Thứ bé muốn xin."),
        ],
        explanation:
          "Sữa, nước, nước ép… là những thứ KHÔNG đếm được (không nói “một sữa”), nên tiếng Anh dùng “some”:\n- I want SOME water. (Tớ muốn một ít nước.)\nMuốn xin thật lịch sự, bé dùng câu hỏi:\n- CAN I HAVE some milk, please? (Cho tớ xin một ít sữa nhé?)\nCó chữ “please” là bé ngoan lắm đấy!",
        usage: "Dùng khi bé khát và muốn xin bố mẹ hoặc cô giáo đồ uống.",
        mistakes: [
          mis("I want a milk.", "I want some milk.", "Sữa không đếm được nên dùng “some”, không dùng “a”."),
          mis("I wants some juice.", "I want some juice.", "Chủ ngữ “I” thì “want” giữ nguyên."),
          mis("Can I has some water?", "Can I have some water?", "Sau “Can” thì động từ luôn giữ nguyên là “have”."),
        ],
        examples: [
          ex("Khi bé khát nước", "I want some water.", "Tớ muốn một ít nước."),
          ex("Khi bé xin mẹ sữa", "Can I have some milk, please?", "Cho con xin một ít sữa nhé ạ?", "Có “please” nghe lịch sự hơn nhiều."),
          ex("Khi bé chọn đồ uống", "I want some juice.", "Tớ muốn một ít nước ép."),
        ],
        exercises: [
          fb("I ___ some water.", "want", ["want", "wants", "wanting", "am want"], "Chủ ngữ “I” thì “want” giữ nguyên."),
          fb("Can I ___ some milk, please?", "have", ["have", "has", "having", "to have"], "Sau “Can” động từ luôn ở dạng gốc “have”."),
          so(["I", "want", "some", "juice"], "I want some juice", "Tớ muốn một ít nước ép.", "Đồ uống không đếm được nên dùng “some”."),
          so(["Can", "I", "have", "some", "milk"], "Can I have some milk", "Cho tớ xin một ít sữa nhé?", "Câu xin lịch sự bắt đầu bằng “Can I have”."),
          viEn(
            "Tớ muốn một ít nước.",
            "I want some water.",
            ["I want some water.", "I want a water.", "I wants some water.", "I want some waters."],
            "“water” không đếm được → dùng “some”, không thêm -s.",
          ),
          viEn(
            "Cho tớ xin một ít sữa nhé?",
            "Can I have some milk?",
            ["Can I have some milk?", "Can I has some milk?", "I can have some milk?", "Can I have a milk?"],
            "Câu hỏi xin lịch sự: “Can I have some…?”.",
          ),
          enVi("I want some juice.", "Tớ muốn một ít nước ép.", ["Tớ muốn một ít nước ép.", "Tớ muốn một ít sữa.", "Tớ thích nước ép.", "Cho tớ xin nước ép."]),
          enVi("Can I have some tea?", "Cho tớ xin một ít trà nhé?", ["Cho tớ xin một ít trà nhé?", "Tớ muốn một ít trà.", "Cho tớ xin một ít nước nhé?", "Bé có thích trà không?"]),
        ],
      },
    ],
  },
];
