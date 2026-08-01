// PRE-STARTERS (4–5 tuổi) — ngữ pháp làm quen.
// Câu 3–5 từ, chỉ hiện tại đơn, chỉ danh từ nhìn thấy được. Mỗi bài chỉ dạy
// MỘT việc: nói "là gì", chỉ "cái này/cái kia", nói "thích/không thích".
import { fb, so, viEn, enVi, ex, mis, part, quiz, rhyme, type GrammarUnitSeed } from "./types";

export const UNITS: GrammarUnitSeed[] = [
  {
    slug: "to-be",
    title: "Verb to be",
    theme: "Động từ to be",
    level: "PRE_STARTERS",
    lessons: [
      {
        slug: "to-be",
        title: "am · is · are",
        sections: [
          {
            id: "tobe-1",
            title: "Câu với động từ to be",
            titleEn: "Verb to be (am / is / are)",
            structure: "I + am · He/She/It + is · We/You/They + are",
            breakdown: [
              part("I", "Chủ ngữ", "Người hoặc vật được nói đến."),
              part("am", "Động từ to be", "Nghĩa là “thì, là, ở”. “I” luôn đi với “am”."),
              part("happy", "Tính từ", "Điều mình muốn nói về chủ ngữ."),
            ],
            explanation:
              "Tiếng Việt nói “Tớ vui” là đủ. Tiếng Anh thì BẮT BUỘC phải có am/is/are ở giữa.\n- I → am\n- he, she, it → is\n- we, you, they → are",
            usage: "Dùng khi giới thiệu bản thân, nói cảm xúc, nói tuổi, hoặc tả người và vật.",
            mistakes: [
              mis("She happy.", "She is happy.", "Thiếu “is” — tiếng Việt không có từ này nên bé hay quên."),
              mis("I is six.", "I am six.", "“I” luôn đi với “am”."),
              mis("They is my friends.", "They are my friends.", "“They” số nhiều nên dùng “are”."),
            ],
            examples: [
              ex("Khi giới thiệu bản thân", "I am Mai.", "Tớ là Mai."),
              ex("Khi nói về bạn", "He is my friend.", "Bạn ấy là bạn của tớ."),
              ex("Khi tả đồ vật", "The cats are small.", "Những con mèo thì nhỏ."),
            ],
            exercises: [
              fb("I ___ seven years old.", "am", ["am", "is", "are", "be"], "Chủ ngữ “I” luôn đi với “am”.", "Đi với “I”"),
              fb("She ___ my sister.", "is", ["is", "am", "are", "be"], "“She” là ngôi thứ ba số ít nên dùng “is”."),
              so(["is", "She", "happy"], "She is happy", "Bạn ấy vui."),
              so(["am", "I", "a", "student"], "I am a student", "Tớ là học sinh."),
              viEn("Tớ là học sinh.", "I am a student.", ["I am a student.", "I is a student.", "I are student.", "I a student."], "“I” + “am”, và “student” đếm được nên cần “a”."),
              viEn("Chúng tớ là bạn.", "We are friends.", ["We are friends.", "We is friends.", "We are friend.", "We friends."], "“We” đi với “are”, và có nhiều người nên “friends” thêm -s."),
              enVi("He is my friend.", "Bạn ấy là bạn của tớ.", ["Bạn ấy là bạn của tớ.", "Bạn ấy là anh của tớ.", "Bạn ấy vui.", "Tớ có một người bạn."]),
              enVi("The cat is small.", "Con mèo thì nhỏ.", ["Con mèo thì nhỏ.", "Con mèo thì to.", "Con chó thì nhỏ.", "Con mèo màu đen."]),
            ],
          },
        ],
        test: quiz([
          fb("He ___ a teacher.", "is", ["is", "am", "are", "be"]),
          so(["are", "We", "friends"], "We are friends"),
          viEn("Tớ sáu tuổi.", "I am six.", ["I am six.", "I is six.", "I are six.", "I six."]),
          enVi("I am happy.", "Tớ vui.", ["Tớ vui.", "Tớ buồn.", "Tớ mệt.", "Tớ đói."]),
        ]),
      },
      {
        slug: "to-be-questions",
        title: "Is it…? · Are you…?",
        sections: [
          {
            id: "tobe-2",
            title: "Hỏi và trả lời với to be",
            titleEn: "Questions with to be",
            structure: "Is / Are + chủ ngữ + …?",
            breakdown: [
              part("Is", "Động từ to be đảo lên đầu", "Đảo lên trước là thành câu hỏi."),
              part("it", "Chủ ngữ", "Thứ mình đang hỏi về."),
              part("a cat?", "Phần muốn hỏi", "Điều mình muốn biết đúng hay không."),
            ],
            explanation:
              "Muốn hỏi, bé chỉ cần ĐẢO am/is/are lên TRƯỚC chủ ngữ.\n- It is a cat. → Is it a cat?\n- You are happy. → Are you happy?\nTrả lời ngắn: Yes, it is. / No, it isn’t.",
            usage: "Dùng khi bé muốn hỏi xem điều gì đó có đúng không, hoặc hỏi thăm bạn.",
            mistakes: [
              mis("It is a dog?", "Is it a dog?", "Câu hỏi phải đảo “is” lên đầu câu."),
              mis("Yes, it’s.", "Yes, it is.", "Câu trả lời ngắn KHÔNG được viết tắt."),
              mis("Are you a boy? — Yes, I are.", "Yes, I am.", "Trả lời về mình thì dùng “I am”."),
            ],
            examples: [
              ex("Khi chỉ vào một con vật", "Is it a cat?", "Nó là con mèo phải không?"),
              ex("Khi hỏi thăm bạn", "Are you OK?", "Bạn ổn chứ?"),
              ex("Khi trả lời “không”", "No, it isn’t.", "Không, không phải."),
            ],
            exercises: [
              fb("___ it a dog?", "Is", ["Is", "Are", "Am", "Be"], "“It” số ít nên câu hỏi bắt đầu bằng “Is”."),
              fb("___ you happy?", "Are", ["Are", "Is", "Am", "Be"], "“You” luôn đi với “are”."),
              so(["Is", "a", "cat", "it"], "Is it a cat", "Nó là con mèo phải không?"),
              so(["you", "Are", "my", "friend"], "Are you my friend", "Bạn là bạn của tớ phải không?"),
              viEn("Bạn có vui không?", "Are you happy?", ["Are you happy?", "You happy?", "Is you happy?", "You are happy."], "Hỏi thì đảo “are” lên trước “you”."),
              viEn("Đó là con chó phải không?", "Is it a dog?", ["Is it a dog?", "It is a dog?", "Is it dog?", "Are it a dog?"], "Đảo “is” lên đầu, và “dog” cần “a”."),
              enVi("Are you six?", "Bạn sáu tuổi phải không?", ["Bạn sáu tuổi phải không?", "Bạn bảy tuổi phải không?", "Tớ sáu tuổi.", "Bạn có sáu quả bóng."]),
              enVi("No, it isn’t.", "Không, không phải.", ["Không, không phải.", "Vâng, đúng rồi.", "Nó không ở đây.", "Tớ không biết."]),
            ],
          },
        ],
        test: quiz([
          fb("___ she your sister?", "Is", ["Is", "Are", "Am", "Be"]),
          so(["Are", "you", "a", "student"], "Are you a student"),
          viEn("Bạn có ổn không?", "Are you OK?", ["Are you OK?", "You are OK?", "Is you OK?", "Are you OK."]),
          enVi("Yes, I am.", "Vâng, đúng vậy.", ["Vâng, đúng vậy.", "Không, không phải.", "Tớ không biết.", "Tớ tên là Nam."]),
        ]),
      },
    ],
  },

  {
    slug: "this-that",
    title: "This & That",
    theme: "Cái này – cái kia",
    level: "PRE_STARTERS",
    lessons: [
      {
        slug: "this-that",
        title: "this · that",
        sections: [
          {
            id: "this-1",
            title: "Chỉ vào một đồ vật",
            titleEn: "This is / That is",
            structure: "This is + a/an + … (ở gần) · That is + a/an + … (ở xa)",
            breakdown: [
              part("This", "Từ chỉ định", "Cái Ở GẦN — bé chạm tay tới được."),
              part("is", "Động từ to be", "Nối “cái này” với tên đồ vật."),
              part("a ball", "Danh từ", "Tên của đồ vật bé đang chỉ."),
            ],
            explanation:
              "Bé chỉ tay vào một đồ vật rồi gọi tên nó.\n- Ở GẦN → This is my book.\n- Ở XA → That is your bag.\nĐồ vật đếm được và chỉ có một thì cần “a”, nếu bắt đầu bằng nguyên âm (a, e, i, o, u) thì dùng “an”: an apple.",
            usage: "Dùng khi bé khoe đồ, giới thiệu đồ vật, hoặc chỉ vào tranh gọi tên.",
            mistakes: [
              mis("This my book.", "This is my book.", "Thiếu “is” — câu tiếng Anh nào cũng cần động từ."),
              mis("This is book.", "This is a book.", "Danh từ đếm được, chỉ một cái thì cần “a”."),
              mis("That is a apple.", "That is an apple.", "Trước nguyên âm dùng “an”, không dùng “a”."),
            ],
            examples: [
              ex("Khi khoe đồ đang cầm", "This is my teddy.", "Đây là gấu bông của tớ."),
              ex("Khi chỉ đồ ở xa", "That is a big tree.", "Kia là một cái cây to."),
              ex("Khi giới thiệu bạn", "This is my friend Nam.", "Đây là bạn Nam của tớ."),
            ],
            exercises: [
              fb("___ is my ball. (bé đang cầm quả bóng)", "This", ["This", "That", "These", "Those"], "Bóng đang ở trong tay nên dùng “This”."),
              fb("That is ___ apple.", "an", ["an", "a", "the", "one"], "“apple” bắt đầu bằng nguyên âm nên dùng “an”."),
              so(["is", "This", "my", "book"], "This is my book", "Đây là quyển sách của tớ."),
              so(["That", "a", "is", "cat"], "That is a cat", "Kia là một con mèo."),
              viEn("Đây là mẹ của tớ.", "This is my mum.", ["This is my mum.", "This my mum.", "That is my mum.", "This is mum."], "Người ở ngay bên cạnh thì dùng “This is”."),
              viEn("Kia là một cái xe ô tô.", "That is a car.", ["That is a car.", "That is car.", "This is a car.", "That a car."], "Ở xa dùng “That”, và “car” cần “a”."),
              enVi("This is my school.", "Đây là trường của tớ.", ["Đây là trường của tớ.", "Kia là trường của tớ.", "Đây là lớp của tớ.", "Trường tớ rất to."]),
              enVi("That is a big dog.", "Kia là một con chó to.", ["Kia là một con chó to.", "Đây là một con chó to.", "Kia là một con mèo to.", "Con chó kia rất nhỏ."]),
            ],
          },
        ],
        test: quiz([
          fb("___ is my bag. (bé đang đeo trên vai)", "This", ["This", "That", "These", "Those"]),
          so(["is", "That", "a", "bird"], "That is a bird"),
          viEn("Đây là quả táo.", "This is an apple.", ["This is an apple.", "This is a apple.", "That is an apple.", "This an apple."]),
          enVi("This is my teddy.", "Đây là gấu bông của tớ.", ["Đây là gấu bông của tớ.", "Kia là gấu bông của tớ.", "Đây là búp bê của tớ.", "Tớ thích gấu bông."]),
        ]),
      },
      {
        slug: "these-those",
        title: "these · those",
        sections: [
          {
            id: "this-2",
            title: "Chỉ vào nhiều đồ vật",
            titleEn: "These are / Those are",
            structure: "These are + …s (gần, nhiều) · Those are + …s (xa, nhiều)",
            breakdown: [
              part("These", "Từ chỉ định số nhiều", "NHIỀU cái ở gần — “những cái này”."),
              part("are", "Động từ to be số nhiều", "Nhiều thứ thì dùng “are”, không dùng “is”."),
              part("my toys", "Danh từ số nhiều", "Tên các đồ vật, nhớ thêm -s."),
            ],
            explanation:
              "Một cái → this / that. Nhiều cái → these / those.\n- this book → these books\n- that car → those cars\nCó nhiều thì cả ba thứ đều đổi: từ chỉ định, “are”, và danh từ thêm -s.",
            usage: "Dùng khi bé chỉ vào một nhóm đồ vật hoặc nhiều con vật.",
            mistakes: [
              mis("These is my toys.", "These are my toys.", "Nhiều đồ thì dùng “are”."),
              mis("Those are car.", "Those are cars.", "Nhiều xe thì “car” phải thêm -s."),
              mis("This are books.", "These are books.", "Số nhiều thì “this” đổi thành “these”."),
            ],
            examples: [
              ex("Khi khoe hộp đồ chơi", "These are my toys.", "Đây là những món đồ chơi của tớ."),
              ex("Khi chỉ ra vườn", "Those are big trees.", "Kia là những cái cây to."),
              ex("Khi chỉ vào tranh", "These are cats.", "Đây là những con mèo."),
            ],
            exercises: [
              fb("___ are my books. (sách trên bàn bé)", "These", ["These", "Those", "This", "That"], "Nhiều quyển và ở gần → “These”."),
              fb("Those ___ my friends.", "are", ["are", "is", "am", "be"], "“Those” số nhiều nên đi với “are”."),
              so(["are", "These", "my", "toys"], "These are my toys", "Đây là những món đồ chơi của tớ."),
              so(["Those", "birds", "are"], "Those are birds", "Kia là những con chim."),
              viEn("Đây là những quyển sách của tớ.", "These are my books.", ["These are my books.", "This are my books.", "These is my books.", "These are my book."], "Nhiều quyển → these + are + books."),
              viEn("Kia là những con chó.", "Those are dogs.", ["Those are dogs.", "Those are dog.", "That are dogs.", "Those is dogs."], "Ở xa và nhiều con → those + are + dogs."),
              enVi("These are my pens.", "Đây là những cái bút của tớ.", ["Đây là những cái bút của tớ.", "Đây là cái bút của tớ.", "Kia là những cái bút của tớ.", "Tớ có một cái bút."]),
              enVi("Those are big trees.", "Kia là những cái cây to.", ["Kia là những cái cây to.", "Đây là những cái cây to.", "Kia là một cái cây to.", "Cây kia không to."]),
            ],
          },
        ],
        test: quiz([
          fb("___ are my cats. (mèo đang nằm cạnh bé)", "These", ["These", "Those", "This", "That"]),
          so(["are", "Those", "my", "friends"], "Those are my friends"),
          viEn("Đây là những quả táo.", "These are apples.", ["These are apples.", "These is apples.", "This are apples.", "These are apple."]),
          enVi("Those are my toys.", "Kia là những món đồ chơi của tớ.", ["Kia là những món đồ chơi của tớ.", "Đây là những món đồ chơi của tớ.", "Kia là món đồ chơi của tớ.", "Tớ thích đồ chơi."]),
        ]),
      },
    ],
  },

  {
    slug: "i-like",
    title: "I like it!",
    theme: "Sở thích của bé",
    level: "PRE_STARTERS",
    lessons: [
      {
        slug: "i-like",
        title: "I like · I don’t like",
        sections: [
          {
            id: "like-1",
            title: "Nói mình thích gì",
            titleEn: "I like / I don’t like",
            structure: "I like + … · I don’t like + …",
            breakdown: [
              part("I", "Chủ ngữ", "Chính là bé."),
              part("like", "Động từ", "Nghĩa là “thích”."),
              part("cats", "Danh từ số nhiều", "Nói thích LOÀI nào thì để số nhiều."),
            ],
            explanation:
              "Thích → I like… Không thích → thêm “don’t” TRƯỚC “like”.\n- I like milk.\n- I don’t like fish.\nNói thích một loài vật hay một món ăn nói chung thì dùng số nhiều: I like cats (không phải I like cat).",
            usage: "Dùng khi bé nói về món ăn, con vật, màu sắc hay trò chơi mình thích.",
            mistakes: [
              mis("I no like fish.", "I don’t like fish.", "Phủ định của “like” là “don’t like”."),
              mis("I like cat.", "I like cats.", "Nói về cả loài mèo thì dùng số nhiều “cats”."),
              mis("I am like milk.", "I like milk.", "Đã có động từ “like” rồi thì KHÔNG thêm “am”."),
            ],
            examples: [
              ex("Khi được hỏi món ăn", "I like ice cream.", "Tớ thích kem."),
              ex("Khi nói về con vật", "I like dogs.", "Tớ thích chó."),
              ex("Khi từ chối lịch sự", "I don’t like fish.", "Tớ không thích cá."),
            ],
            exercises: [
              fb("I ___ cats.", "like", ["like", "likes", "am like", "liking"], "Chủ ngữ “I” thì động từ giữ nguyên: like."),
              fb("I ___ like fish.", "don’t", ["don’t", "not", "no", "isn’t"], "Phủ định với “I” là “don’t”."),
              so(["like", "I", "ice", "cream"], "I like ice cream", "Tớ thích kem."),
              so(["don’t", "I", "like", "fish"], "I don’t like fish", "Tớ không thích cá."),
              viEn("Tớ thích chó.", "I like dogs.", ["I like dogs.", "I like dog.", "I am like dogs.", "I likes dogs."], "Nói về cả loài thì để số nhiều “dogs”."),
              viEn("Tớ không thích sữa.", "I don’t like milk.", ["I don’t like milk.", "I no like milk.", "I not like milk.", "I don’t like milks."], "Phủ định dùng “don’t”; “milk” không đếm được nên không thêm -s."),
              enVi("I like apples.", "Tớ thích táo.", ["Tớ thích táo.", "Tớ không thích táo.", "Tớ có một quả táo.", "Táo rất ngon."]),
              enVi("I don’t like cakes.", "Tớ không thích bánh ngọt.", ["Tớ không thích bánh ngọt.", "Tớ thích bánh ngọt.", "Tớ muốn ăn bánh.", "Bánh này ngon."]),
              // Thưởng thêm một trò nối vần — bé cấp này đang học phonics song song.
              rhyme([["cat", "hat"], ["dog", "frog"], ["cake", "snake"]]),
            ],
          },
        ],
        test: quiz([
          fb("I ___ like eggs.", "don’t", ["don’t", "no", "not", "isn’t"]),
          so(["like", "I", "milk"], "I like milk"),
          viEn("Tớ thích mèo.", "I like cats.", ["I like cats.", "I likes cats.", "I like cat.", "I am like cats."]),
          enVi("I don’t like fish.", "Tớ không thích cá.", ["Tớ không thích cá.", "Tớ thích cá.", "Tớ không có cá.", "Cá bơi rất nhanh."]),
        ]),
      },
      {
        slug: "do-you-like",
        title: "Do you like…?",
        sections: [
          {
            id: "like-2",
            title: "Hỏi bạn thích gì",
            titleEn: "Do you like…?",
            structure: "Do you like + …? → Yes, I do. / No, I don’t.",
            breakdown: [
              part("Do", "Từ để hỏi", "Đứng đầu câu để biến câu kể thành câu hỏi."),
              part("you", "Chủ ngữ", "Người bé đang hỏi."),
              part("like cats?", "Động từ + danh từ", "Điều bé muốn biết."),
            ],
            explanation:
              "Câu hỏi với “like” cần thêm “Do” ở đầu.\n- You like cats. → Do you like cats?\nTrả lời ngắn:\n- Yes, I do.\n- No, I don’t.",
            usage: "Dùng khi bé làm quen bạn mới, hỏi bạn thích món gì, con gì.",
            mistakes: [
              mis("You like cake?", "Do you like cake?", "Câu hỏi phải có “Do” ở đầu."),
              mis("Yes, I like.", "Yes, I do.", "Trả lời ngắn dùng “do”, không lặp lại “like”."),
              mis("Do you likes dogs?", "Do you like dogs?", "Đã có “Do” thì “like” giữ nguyên, không thêm -s."),
            ],
            examples: [
              ex("Khi làm quen bạn mới", "Do you like football?", "Bạn có thích bóng đá không?"),
              ex("Khi mời đồ ăn", "Do you like cakes?", "Bạn có thích bánh ngọt không?"),
              ex("Khi trả lời", "Yes, I do.", "Có, tớ thích."),
            ],
            exercises: [
              fb("___ you like dogs?", "Do", ["Do", "Are", "Is", "Does"], "Câu hỏi với “you” + động từ thường thì dùng “Do”."),
              fb("Do you like milk? — Yes, I ___.", "do", ["do", "am", "like", "does"], "Trả lời ngắn cho câu hỏi “Do…?” là “I do”."),
              so(["you", "Do", "like", "cats"], "Do you like cats", "Bạn có thích mèo không?"),
              so(["I", "No", "don’t"], "No I don’t", "Không, tớ không thích."),
              viEn("Bạn có thích kem không?", "Do you like ice cream?", ["Do you like ice cream?", "You like ice cream?", "Are you like ice cream?", "Do you likes ice cream?"], "Câu hỏi cần “Do” ở đầu và “like” giữ nguyên."),
              viEn("Có, tớ thích.", "Yes, I do.", ["Yes, I do.", "Yes, I like.", "Yes, I am.", "Yes, I does."], "Câu hỏi bắt đầu bằng “Do” thì trả lời bằng “do”."),
              enVi("Do you like cakes?", "Bạn có thích bánh ngọt không?", ["Bạn có thích bánh ngọt không?", "Bạn có muốn ăn bánh không?", "Tớ thích bánh ngọt.", "Bánh ngọt này ngon."]),
              enVi("No, I don’t.", "Không, tớ không thích.", ["Không, tớ không thích.", "Có, tớ thích.", "Tớ không biết.", "Tớ không có."]),
            ],
          },
        ],
        test: quiz([
          fb("___ you like apples?", "Do", ["Do", "Are", "Is", "Does"]),
          so(["Do", "like", "you", "milk"], "Do you like milk"),
          viEn("Bạn có thích chó không?", "Do you like dogs?", ["Do you like dogs?", "You like dogs?", "Do you likes dogs?", "Are you like dogs?"]),
          enVi("Yes, I do.", "Có, tớ thích.", ["Có, tớ thích.", "Không, tớ không thích.", "Tớ có một con chó.", "Tớ không biết."]),
        ]),
      },
    ],
  },
];
