// Nội dung mẫu cho diễn đàn Cộng đồng (56 chủ đề + hơn 200 phản hồi).
//
// Đây là diễn đàn của BA MẸ bàn chuyện đồng hành cùng con học tiếng Anh — không
// phải diễn đàn của người học. Vì vậy giọng văn là giọng phụ huynh nói với nhau:
// thân tình, kể chuyện nhà mình, khen con người khác trước khi góp ý.
//
// Dữ liệu tĩnh (chưa nối DB) nên chỉ cần đúng shape RawForumCategory. Khi có
// diễn đàn thật, chỉ cần đổi nguồn dữ liệu ở community-forum.ts là xong.
import type { RawForumCategory } from "./community-forum";

export const RAW_FORUM_CATEGORIES: RawForumCategory[] = [
  // ───────────────────────────── Ngữ pháp ─────────────────────────────
  {
    key: "grammar",
    label: "Ngữ pháp",
    threads: [
      {
        author: "Mẹ Bắp 7 tuổi",
        title: "Bé cứ nói \"He go to school\" — sửa kiểu gì cho con không nản ạ?",
        body:
          "Bé nhà mình 7 tuổi, nói được kha khá rồi nhưng cứ quên chia động từ: \"He go to school\", \"She like cats\". Mình sửa thì con cụt hứng, im luôn không nói nữa. Ba mẹ nào có cách sửa nhẹ nhàng chỉ mình với ạ.",
        level: "STARTERS",
        tag: "Chia động từ",
        likes: 74,
        views: 1230,
        time: "3 giờ trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Mẹ đừng sửa giữa câu nhé, con đang nói là con đang tự tin. Cách hiệu quả nhất là \"nhắc lại đúng\": con nói \"He go to school\", mẹ gật đầu rồi nói lại \"Yes! He goes to school every day.\" Con nghe đúng vài chục lần sẽ tự chỉnh, không cần giảng ngữ pháp.",
            time: "2 giờ trước",
            likes: 58,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình gọi chữ s đó là \"chữ s bí mật của he/she/it\". Mỗi lần con nhớ thêm được s là hai bố con đập tay. Biến thành trò chơi thì con không thấy bị bắt lỗi.",
            time: "2 giờ trước",
            likes: 41,
          },
          {
            author: "Thu Hà (mẹ Kem)",
            text:
              "Bé 7 tuổi nói được cả câu là giỏi lắm rồi mẹ ạ, chỗ này con chưa quen thôi. Mình hay hát: \"I play, you play, he playS, she playS, it playS\" — hát ba hôm là con thuộc.",
            time: "1 giờ trước",
            likes: 33,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Cảm ơn cả nhà! Tối qua mình thử cách nhắc lại đúng, con không hề khó chịu mà còn lặp theo. Hoá ra vấn đề nằm ở cách mẹ sửa chứ không phải ở con 😅",
            time: "45 phút trước",
            likes: 27,
          },
        ],
      },
      {
        author: "Hương Giang mom",
        title: "a / an / the — dạy con phân biệt sao cho dễ nhớ?",
        body:
          "Con mình học tới đâu quên tới đó vụ mạo từ. \"a apple\" hay \"an apple\", rồi khi nào dùng \"the\" nữa. Con mới 6 tuổi nên mình không muốn giảng lý thuyết dài. Ba mẹ có mẹo gì trực quan không ạ?",
        level: "STARTERS",
        tag: "Mạo từ",
        likes: 52,
        views: 890,
        time: "5 giờ trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Hạnh (giáo viên tiểu học)",
            text:
              "Với bé 6 tuổi chỉ cần một quy tắc thôi: nghe thấy âm đầu \"há miệng\" (a, e, i, o, u) thì dùng \"an\". an apple, an egg, an ice cream, an orange, an umbrella. Còn lại dùng \"a\". Chưa cần đụng tới \"the\" vội ạ.",
            time: "4 giờ trước",
            likes: 45,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Mình dạy \"the\" theo kiểu: \"a\" là một cái nào đó bất kỳ, \"the\" là ĐÚNG cái mình vừa nhắc. Ví dụ \"I see a dog. The dog is big.\" Con hiểu ngay vì giống kể chuyện.",
            time: "4 giờ trước",
            likes: 38,
          },
          {
            author: "Bố Tít",
            text:
              "Nhà mình chơi trò \"an-an\": mẹ đọc một loạt từ, con nghe thấy từ bắt đầu bằng nguyên âm thì vỗ tay. Chơi 5 phút mỗi tối, tuần sau con tự sửa được.",
            time: "3 giờ trước",
            likes: 24,
          },
        ],
      },
      {
        author: "Mẹ Su Movers",
        title: "Con nhầm \"there is\" với \"there are\" suốt, có mẹo nào không ạ?",
        body:
          "Bé nhà mình đang học Movers. Tả tranh thì cứ \"There is three cats\", \"There are a bird\". Mình nhắc thì con nhớ được lúc đó, hôm sau lại quên.",
        level: "MOVERS",
        tag: "There is/are",
        likes: 47,
        views: 760,
        time: "hôm qua",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Ba của Sóc",
            text:
              "Mình dạy con nhìn vào chữ ngay SAU nó: có một thì \"is\", có nhiều thì \"are\". Mẹo nhỏ: \"are\" có chữ a như trong \"a lot\" — nhiều. Con mình nhớ mãi cái này.",
            time: "23 giờ trước",
            likes: 36,
          },
          {
            author: "Mẹ Xu 8 tuổi",
            text:
              "Con tả tranh được câu ba từ trở lên là đã tốt lắm rồi mẹ ơi. Mình cho con đếm trước rồi mới nói: đếm \"one, two, three cats\" xong mới bảo \"so… there ARE three cats\". Đếm trước thì con tự chọn đúng.",
            time: "20 giờ trước",
            likes: 31,
          },
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Bổ sung tí: trong phần tả tranh của Movers, câu \"There is/are…\" gần như chắc chắn xuất hiện, nên luyện hẳn 10 tấm tranh liên tiếp sẽ vào rất nhanh. Mỗi tranh chỉ cần 2 câu là đủ.",
            time: "18 giờ trước",
            likes: 28,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Mẹo đếm trước hay quá ạ! Hôm nay con làm 8/10 tranh đúng luôn. Cảm ơn cả nhà nhiều 💛",
            time: "12 giờ trước",
            likes: 19,
          },
        ],
      },
      {
        author: "Trần Thu Hằng",
        title: "Số nhiều bất quy tắc: feet, teeth, children — bé học kiểu gì cho vào đầu?",
        body:
          "Bé nhà mình thêm \"s\" vào tất cả: foots, tooths, childrens, mouses. Mình biết là con đang áp dụng đúng quy tắc đã học nên không nỡ nói con sai. Nhưng sắp thi Movers rồi, ba mẹ có cách nào cho con nhớ nhóm này không ạ?",
        level: "MOVERS",
        tag: "Số nhiều",
        likes: 61,
        views: 1040,
        time: "2 ngày trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Mẹ Nhím",
            text:
              "Mẹ nói đúng lắm — con thêm \"s\" là vì con ĐÃ hiểu quy tắc, đó là dấu hiệu tốt. Mình gom nhóm bất quy tắc thành bài vè ngắn: one foot – two feet, one tooth – two teeth, one child – two children, one mouse – two mice. Đọc như đồng dao, con thuộc trong ba ngày.",
            time: "2 ngày trước",
            likes: 54,
          },
          {
            author: "Bố Tít",
            text:
              "Nhà mình vẽ hẳn tờ giấy A4 dán tủ lạnh: bên trái vẽ 1 cái, bên phải vẽ 2 cái, viết chữ to. Mỗi lần đi qua con đọc một lượt. Không học bài mà thuộc.",
            time: "hôm qua",
            likes: 37,
          },
          {
            author: "an_nguyen",
            text:
              "Mình để ý nhóm này chỉ có khoảng 8-10 từ hay gặp trong đề Movers thôi: feet, teeth, children, men, women, mice, fish, sheep, people. Học đúng chừng đó là đủ, không cần ôm hết.",
            time: "hôm qua",
            likes: 45,
          },
          {
            author: "Thầy Nam Phonics",
            text:
              "Đúng ạ, và lưu ý fish với sheep giữ nguyên khi số nhiều — chỗ này bé hay lúng túng nhất. Cho con nhìn tranh ba con cá rồi hỏi \"How many fish?\" vài lần là ổn.",
            time: "22 giờ trước",
            likes: 33,
          },
        ],
      },
      {
        author: "Mẹ Kem 8 tuổi",
        title: "Quá khứ đơn: con toàn nói \"goed\", \"eated\", \"runned\"",
        body:
          "Con mình đang kể chuyện cuối tuần bằng tiếng Anh, rất chịu nói nhưng động từ quá khứ thì tự chế hết: I goed to the zoo, I eated ice cream. Nghe vừa buồn cười vừa thương. Nên sửa luôn hay để con tự quen ạ?",
        level: "MOVERS",
        tag: "Quá khứ đơn",
        likes: 58,
        views: 970,
        time: "4 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Con chịu KỂ CHUYỆN bằng tiếng Anh là điều quý nhất, mẹ giữ lấy nhé. Sửa nhưng đừng chặn dòng kể: nghe hết câu chuyện, khen thật lòng, rồi mẹ kể lại chính chuyện đó bằng lời của mẹ với động từ đúng — \"Wow, so you WENT to the zoo and you ATE ice cream!\"",
            time: "4 ngày trước",
            likes: 66,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình có bộ thẻ \"cặp đôi\": go–went, eat–ate, run–ran, see–saw, take–took. Chơi trò lật thẻ tìm cặp, mỗi tối 10 phút. Sau hai tuần con nhớ được 20 cặp.",
            time: "3 ngày trước",
            likes: 42,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Mình thấy vui là con biết \"ed\" rồi mới chế ra goed đó chứ ạ. Bạn cứ để con nói thoải mái, chỉ nhấn mạnh 5-6 động từ hay dùng nhất thôi: went, ate, saw, had, was/were.",
            time: "3 ngày trước",
            likes: 30,
          },
        ],
      },
      {
        author: "Nguyễn Minh Anh",
        title: "Present continuous và present simple — đề Flyers hỏi nhiều không ạ?",
        body:
          "Con mình chuẩn bị thi Flyers. Phần tả tranh con dùng \"He plays football\" trong khi tranh vẽ bạn ĐANG đá bóng. Mình muốn hỏi hai điều: (1) đề Flyers có phân biệt hai thì này nhiều không, (2) cách nào giúp con chọn đúng nhanh ạ?",
        level: "FLYERS",
        tag: "Thì hiện tại",
        likes: 44,
        views: 820,
        time: "5 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Trang trợ giảng",
            text:
              "Có ạ, đặc biệt ở phần tả tranh và phần nghe. Mẹo cho con: nhìn TRANH thì hầu như luôn dùng \"is/are + V-ing\" vì tranh là khoảnh khắc đang diễn ra. Còn khi kể thói quen (every day, always, usually) thì dùng thì đơn.",
            time: "5 ngày trước",
            likes: 51,
          },
          {
            author: "Mẹ Xu 8 tuổi",
            text:
              "Mình dạy con hai câu hỏi thần chú: \"Bây giờ đang xảy ra?\" → -ing. \"Ngày nào cũng vậy?\" → thì đơn. Con tự hỏi trước khi trả lời, đúng gần hết.",
            time: "4 ngày trước",
            likes: 39,
          },
          {
            author: "Bố Tít",
            text:
              "Nhà mình chơi trò \"phóng viên\": bố làm gì đó (rửa bát, quét nhà) rồi con tường thuật \"Daddy is washing the dishes\". Con cười suốt mà lại nhớ cấu trúc.",
            time: "4 ngày trước",
            likes: 34,
          },
          {
            author: "Nguyễn Minh Anh",
            text:
              "Trò phóng viên hay quá! Tối qua con tường thuật cả bữa cơm nhà mình luôn 😄 Cảm ơn ba mẹ.",
            time: "3 ngày trước",
            likes: 21,
          },
        ],
      },
      {
        author: "Mẹ Bo lớp 4",
        title: "Giới từ chỉ thời gian in / on / at — có mẹo nào cho bé lớp 4 không?",
        body:
          "Con mình học đến đâu rối đến đó: in Monday, on July, at 2015… Mình tra thì thấy nhiều quy tắc quá, không biết rút gọn thế nào cho con dễ nhớ.",
        level: "FLYERS",
        tag: "Giới từ",
        likes: 39,
        views: 700,
        time: "6 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Có một hình rất dễ nhớ: cái phễu từ TO xuống NHỎ. IN = to nhất (năm, tháng, mùa): in 2015, in July, in summer. ON = vừa (ngày): on Monday, on my birthday. AT = nhỏ nhất (giờ): at 7 o'clock, at night. Vẽ cái phễu ra giấy cho con nhìn là xong.",
            time: "6 ngày trước",
            likes: 62,
          },
          {
            author: "Trần Thu Hằng",
            text:
              "Mình cũng dùng cách phễu này. Bổ sung mấy trường hợp lẻ hay ra đề: at night, in the morning/afternoon/evening. Con học thuộc riêng bốn cụm đó là gần như không sai nữa.",
            time: "5 ngày trước",
            likes: 41,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Nhà mình dán tờ phễu cạnh bàn học, khi làm bài con liếc lên là nhớ. Sau khoảng ba tuần thì gỡ xuống, con vẫn làm đúng.",
            time: "5 ngày trước",
            likes: 26,
          },
        ],
      },
    ],
  },

  // ─────────────────────── Phát âm & Ghép vần ───────────────────────
  {
    key: "pronunciation",
    label: "Phát âm & Ghép vần",
    threads: [
      {
        author: "Mẹ Xu 8 tuổi",
        title: "Bé phát âm \"th\" thành \"d\" — sửa được không hay chờ con lớn ạ?",
        body:
          "Con mình nói \"dis\" thay cho \"this\", \"tank you\" thay cho \"thank you\". Mình nghe nói âm này trẻ Việt khó lắm. Có ba mẹ nào sửa thành công chưa ạ, chia sẻ giúp mình với.",
        level: "STARTERS",
        tag: "Âm /th/",
        likes: 83,
        views: 1470,
        time: "4 giờ trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Mẹ Mít song ngữ",
            text:
              "Sửa được ạ, và 8 tuổi là độ tuổi rất dễ chỉnh. Mẹo trực quan: cho con soi gương, thè nhẹ đầu lưỡi ra chạm răng trên rồi thổi hơi ra — \"th\" là âm THỔI chứ không phải âm gõ lưỡi. Con thấy lưỡi mình trong gương là hiểu ngay.",
            time: "3 giờ trước",
            likes: 71,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình gọi là \"âm con rắn thè lưỡi\". Luyện bằng câu vui: \"Three thin things\". Con đọc chưa đúng thì cười xoà rồi đọc lại, không khí nhẹ nhàng nên con không sợ.",
            time: "3 giờ trước",
            likes: 49,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Mình đặt tờ giấy mỏng trước miệng con. Phát âm đúng \"th\" thì giấy rung, phát âm thành \"d\" thì giấy đứng yên. Con thích trò này lắm, tự luyện luôn.",
            time: "2 giờ trước",
            likes: 57,
          },
          {
            author: "Mẹ Xu 8 tuổi",
            text:
              "Trò tờ giấy tuyệt vời quá! Con mình luyện 10 phút mà nói được \"thank you\" chuẩn rồi. Cảm ơn cả nhà nhiều ạ 🌟",
            time: "1 giờ trước",
            likes: 34,
          },
        ],
      },
      {
        author: "Bố Tít",
        title: "Bé nuốt hết âm cuối /s/, /z/, /t/ — nhà ai bị vậy không?",
        body:
          "Con mình nói \"cat\" thành \"ca\", \"books\" thành \"boo\". Mình đọc thấy đây là lỗi rất phổ biến với trẻ Việt vì tiếng Việt không có âm cuối bật hơi. Ba mẹ có bài luyện nào ngắn ngắn cho con không ạ?",
        level: "MOVERS",
        tag: "Âm cuối",
        likes: 66,
        views: 1090,
        time: "hôm qua",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Rất phổ biến ạ, ba mẹ không phải lo. Cách luyện hiệu quả nhất là cho con đọc CẶP TỪ chỉ khác nhau ở âm cuối: cat/cap, bus/but, hat/had. Khi con nghe ra sự khác nhau thì con sẽ tự phát ra được.",
            time: "23 giờ trước",
            likes: 58,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Nhà mình dùng trò \"vỗ tay ở cuối\": mỗi khi đọc xong từ có âm cuối, con vỗ một cái. Nghe hơi buồn cười nhưng con nhớ là phải \"đóng\" từ lại.",
            time: "20 giờ trước",
            likes: 44,
          },
          {
            author: "an_nguyen",
            text:
              "Mình bổ sung: khi thêm \"s\" số nhiều, cho con để tay lên cổ. \"books\" thì cổ không rung ở cuối, \"dogs\" thì cổ rung. Con lớp 3 nhà mình thích trò này lắm.",
            time: "19 giờ trước",
            likes: 37,
          },
        ],
      },
      {
        author: "Mẹ Bún 5 tuổi",
        title: "Phonics nên bắt đầu từ đâu cho bé 5 tuổi chưa biết mặt chữ?",
        body:
          "Bé nhà mình 5 tuổi, mới biết vài chữ cái tiếng Việt. Mình muốn cho con làm quen ghép vần tiếng Anh nhưng không biết bắt đầu từ đâu, có nên học hết bảng chữ cái trước không ạ?",
        level: "PRE_STARTERS",
        tag: "Phonics",
        likes: 91,
        views: 1680,
        time: "2 ngày trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Quỳnh Cambridge",
            text:
              "Không cần học hết 26 chữ trước ạ. Nhóm đầu tiên nên là s, a, t, p, i, n — chỉ với sáu âm này con đã ghép được cả chục từ thật: sat, pat, tap, pin, nip, tin, sit. Con đọc được TỪ ngay từ tuần đầu nên rất hào hứng.",
            time: "2 ngày trước",
            likes: 88,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Đúng ạ. Và lưu ý dạy ÂM chứ không dạy TÊN chữ. Chữ \"s\" đọc là /s/ (tiếng rắn kêu) chứ không phải \"ét-xì\". Nhà mình lúc đầu dạy tên chữ nên con ghép mãi không ra từ.",
            time: "2 ngày trước",
            likes: 72,
          },
          {
            author: "Ba của Sóc",
            text:
              "Mỗi âm nhà mình gắn một hành động: /s/ uốn tay như con rắn, /a/ gãi tay như bị kiến cắn, /t/ gõ ngón tay. Bé 5 tuổi nhớ bằng cơ thể nhanh hơn nhớ bằng mắt nhiều.",
            time: "hôm qua",
            likes: 63,
          },
          {
            author: "Mẹ Bún 5 tuổi",
            text:
              "Cảm ơn cả nhà! Tuần này nhà mình học đúng sáu âm đó thôi, con đọc được chữ \"sat\" là reo lên sung sướng 🥰",
            time: "hôm qua",
            likes: 45,
          },
        ],
      },
      {
        author: "Hương Giang mom",
        title: "Con đọc được từng chữ cái nhưng không ghép được thành từ",
        body:
          "Bé nhà mình đọc rời được /c/ /a/ /t/ nhưng bảo đọc cả từ thì con chịu, không ra \"cat\". Mình lặp lại nhiều lần con vẫn vậy. Có phải con chưa sẵn sàng không ạ?",
        level: "PRE_STARTERS",
        tag: "Ghép vần",
        likes: 57,
        views: 940,
        time: "3 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Con đọc rời được là đã qua bước khó nhất rồi ạ. Bước ghép chỉ cần một mẹo: đọc CHẬM rồi NHANH DẦN. \"c…a…t\", rồi \"c-a-t\", rồi \"cat\". Mẹ kéo tay con trượt theo chữ từ trái sang phải khi đọc, tay chạm tới đâu miệng đọc tới đó.",
            time: "3 ngày trước",
            likes: 64,
          },
          {
            author: "Mẹ Bún 5 tuổi",
            text:
              "Nhà mình ghép hai âm trước rồi mới thêm âm cuối: \"ca\" → \"cat\". Tự nhiên con ra được ngay, chứ ghép cả ba cùng lúc con bị quá tải.",
            time: "3 ngày trước",
            likes: 51,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Mình dùng khối gỗ, mỗi khối một chữ. Đọc xong thì đẩy ba khối sát vào nhau thành một cụm. Con nhìn thấy \"ba cái thành một cái\" là hiểu ý nghĩa của việc ghép.",
            time: "2 ngày trước",
            likes: 40,
          },
        ],
      },
      {
        author: "Nguyễn Minh Anh",
        title: "Trọng âm từ dài: PHOtograph / phoTOgrapher — con toàn nhấn sai",
        body:
          "Bé nhà mình đang ôn Flyers, từ dài là nhấn sai hết. Mình cũng không chắc mình nhấn đúng nên ngại dạy. Ba mẹ có quy tắc nào đơn giản không ạ?",
        level: "FLYERS",
        tag: "Trọng âm",
        likes: 48,
        views: 810,
        time: "4 ngày trước",
        solved: false,
        hot: false,
        replies: [
          {
            author: "Cô Hạnh (giáo viên tiểu học)",
            text:
              "Ở mức Flyers thì đừng dạy quy tắc, dạy bằng TAI thôi ạ. Cho con nghe từ rồi vỗ tay theo nhịp: âm nào mạnh thì vỗ to. PHO-to-graph (mạnh ở đầu), pho-TO-gra-pher (mạnh ở giữa). Con cảm nhận bằng nhịp rất nhanh.",
            time: "4 ngày trước",
            likes: 55,
          },
          {
            author: "Ba của Sóc",
            text:
              "Mẹ đừng ngại chuyện mình phát âm chưa chuẩn nhé. Cứ bật audio chuẩn cho con nghe rồi hai mẹ con cùng bắt chước, con còn thích vì thấy mẹ cũng đang học.",
            time: "4 ngày trước",
            likes: 47,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Nhà mình gõ bút chì xuống bàn theo nhịp từ. Nhịp mạnh là trọng âm. Con gõ đúng nhịp thì đọc cũng đúng luôn, khá là kỳ diệu.",
            time: "3 ngày trước",
            likes: 32,
          },
        ],
      },
      {
        author: "Mẹ Su Movers",
        title: "Con nói tiếng Anh đều đều như đọc bài — làm sao có ngữ điệu?",
        body:
          "Bé nhà mình phát âm từng từ khá chuẩn nhưng ghép thành câu thì nghe như đọc chính tả, không lên xuống gì cả. Cô giáo cũng nhắc chỗ này. Ba mẹ có cách luyện nào vui vui không ạ?",
        level: "MOVERS",
        tag: "Ngữ điệu",
        likes: 53,
        views: 880,
        time: "5 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Cách nhanh nhất là ĐÓNG KỊCH. Cho con đọc một câu bằng bốn giọng: vui, buồn, ngạc nhiên, bí mật. Ví dụ câu \"I found a big box!\" — đọc kiểu ngạc nhiên là ngữ điệu tự lên xuống ngay, con không cần hiểu lý thuyết.",
            time: "5 ngày trước",
            likes: 60,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Nhà mình hay tắt tiếng phim hoạt hình rồi lồng tiếng. Con phải diễn theo mặt nhân vật nên tự khắc có cảm xúc trong giọng. Vui cực kỳ.",
            time: "5 ngày trước",
            likes: 52,
          },
          {
            author: "Bố Tít",
            text:
              "Mình dạy con hai đường: câu hỏi yes/no thì cuối câu ĐI LÊN, câu kể thì cuối câu ĐI XUỐNG. Vẽ mũi tên lên/xuống ở cuối câu trong sách cho con nhìn.",
            time: "4 ngày trước",
            likes: 38,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Trò lồng tiếng đỉnh quá ạ. Con mình lồng tiếng nhân vật hoạt hình cả tối, giọng có cảm xúc hẳn 😄",
            time: "4 ngày trước",
            likes: 25,
          },
        ],
      },
      {
        author: "Trần Thu Hằng",
        title: "Ship hay sheep, bit hay beat — con nghe không phân biệt được",
        body:
          "Trong bài nghe con toàn chọn nhầm. Mình thử đọc chậm cho con thì con phân biệt được, nhưng vào bài nghe tốc độ thật là lại sai. Ba mẹ nào có cách luyện tai cho con không ạ?",
        level: "MOVERS",
        tag: "Nguyên âm dài - ngắn",
        likes: 45,
        views: 770,
        time: "6 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Thầy Nam Phonics",
            text:
              "Mẹo: âm dài trong sheep, beat là âm CƯỜI — miệng kéo ngang như đang cười và giữ lâu. Âm ngắn trong ship, bit thì miệng thả lỏng, bật nhanh. Cho con soi gương xem miệng mình khi đọc, phân biệt bằng MẮT trước rồi mới bằng tai.",
            time: "6 ngày trước",
            likes: 57,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Nhà mình chơi \"đúng hay sai\": mẹ giơ tranh con cừu rồi đọc \"ship\", con phải hô \"sai rồi mẹ ơi!\". Con thích được bắt lỗi mẹ nên chú ý lắm.",
            time: "6 ngày trước",
            likes: 46,
          },
          {
            author: "an_nguyen",
            text:
              "Mình luyện mỗi ngày ba phút với năm cặp từ thôi, không tham. Sau hai tuần con nghe ra rõ ràng. Ít mà đều ăn đứt nhiều mà thưa.",
            time: "5 ngày trước",
            likes: 39,
          },
        ],
      },
    ],
  },

  // ─────────────────────── Luyện thi Cambridge ───────────────────────
  {
    key: "exam",
    label: "Luyện thi Cambridge",
    threads: [
      {
        author: "Mẹ Bắp 7 tuổi",
        title: "Bé 6 tuổi thi Starters có sớm quá không ạ?",
        body:
          "Trung tâm khuyên cho con thi Starters cuối năm nay, lúc đó con vừa 6 tuổi rưỡi. Mình phân vân vì con mới học được 8 tháng. Ba mẹ nào cho con thi sớm rồi chia sẻ giúp mình với ạ.",
        level: "STARTERS",
        tag: "Chọn kỳ thi",
        likes: 78,
        views: 1520,
        time: "2 giờ trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Nhà mình cho con thi lúc 6 tuổi 8 tháng. Điều quan trọng không phải tuổi mà là con có SỢ không. Kỳ thi Starters được thiết kế rất nhẹ nhàng, không có ai trượt cả — con chỉ nhận số khiên thôi. Nếu con vui thì cứ cho thi ạ.",
            time: "2 giờ trước",
            likes: 69,
          },
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Bổ sung góc chuyên môn: mốc để thi Starters thoải mái là con nghe hiểu được câu lệnh đơn giản, đọc được khoảng 200-300 từ quen thuộc và nói được câu 3-5 từ. Nếu con đạt vậy thì 6 tuổi hoàn toàn ổn.",
            time: "1 giờ trước",
            likes: 62,
          },
          {
            author: "Bố Tít",
            text:
              "Mình khuyên cho con làm thử một đề ở nhà trong không khí vui vẻ. Nếu con làm xong mà vẫn cười thì đi thi được. Nhà mình đã làm vậy và con thi rất thoải mái.",
            time: "55 phút trước",
            likes: 48,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Cảm ơn cả nhà ạ. Mình sẽ cho con làm thử một đề cuối tuần này rồi quyết định 💛",
            time: "35 phút trước",
            likes: 22,
          },
        ],
      },
      {
        author: "Nguyễn Minh Anh",
        title: "Starters chấm khiên (shields) thế nào? 5 khiên có phải là tuyệt đối?",
        body:
          "Mình mới tìm hiểu nên chưa rõ. Nghe nói mỗi kỹ năng được tối đa 5 khiên. Vậy 5 khiên nghĩa là làm đúng hết à ạ? Và 3 khiên thì có gọi là kém không?",
        level: "STARTERS",
        tag: "Cách chấm",
        likes: 64,
        views: 1230,
        time: "hôm qua",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Trang trợ giảng",
            text:
              "Mỗi kỹ năng (Listening, Reading & Writing, Speaking) được tối đa 5 khiên, tổng tối đa 15. 5 khiên là mức cao nhất, thường ứng với làm đúng gần hết. Nhưng xin nhấn mạnh: KHÔNG có đỗ hay trượt, và 3 khiên nghĩa là con đã làm được phần lớn — hoàn toàn không phải \"kém\" ạ.",
            time: "hôm qua",
            likes: 81,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Mình thích nhất chỗ này của Cambridge. Con nhà mình được 4-4-5, cầm chứng chỉ về khoe cả xóm. Không có cảm giác thi trượt nên con giữ được hứng thú học tiếp.",
            time: "23 giờ trước",
            likes: 57,
          },
          {
            author: "an_nguyen",
            text:
              "Ba mẹ lưu ý đừng khoe hay so số khiên trên nhóm lớp nhé. Con mình từng buồn vì bạn được 15 còn con 12, trong khi 12 đã rất tốt rồi.",
            time: "20 giờ trước",
            likes: 66,
          },
        ],
      },
      {
        author: "Mẹ Xu 8 tuổi",
        title: "Movers phần nghe điền số — con hay viết thiếu chữ số",
        body:
          "Bài nghe đọc số điện thoại hoặc số nhà, con nghe được nhưng viết ra hay rơi mất một số. Ba mẹ có mẹo nào luyện phần này không ạ?",
        level: "MOVERS",
        tag: "Listening",
        likes: 41,
        views: 690,
        time: "2 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Mẹo quan trọng nhất: dạy con viết NGAY khi nghe, đừng chờ nghe hết rồi mới nhớ lại. Và luyện riêng các số dễ nhầm: 13/30, 14/40, 15/50 — chỗ khác nhau nằm ở trọng âm (thirTEEN với THIRty).",
            time: "2 ngày trước",
            likes: 53,
          },
          {
            author: "Bố Tít",
            text:
              "Nhà mình đọc số điện thoại người thân bằng tiếng Anh cho con chép, mỗi tối hai số. Vừa vui vừa đúng dạng đề luôn.",
            time: "2 ngày trước",
            likes: 38,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Mình dạy con vẽ sẵn số ô trống bằng số chữ số cần điền. Nhìn thấy còn ô trống là con biết mình đang thiếu, tự căng tai nghe tiếp.",
            time: "hôm qua",
            likes: 44,
          },
        ],
      },
      {
        author: "Mẹ Bo lớp 4",
        title: "Flyers phần điền từ vào đoạn văn khó quá, luyện sao ạ?",
        body:
          "Con mình làm mấy phần đầu khá tốt nhưng tới phần đoạn văn có chỗ trống kèm bảng từ cho sẵn thì rối. Con chọn từ đúng nghĩa nhưng sai dạng. Ba mẹ luyện phần này thế nào ạ?",
        level: "FLYERS",
        tag: "Reading & Writing",
        likes: 55,
        views: 950,
        time: "3 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Mẹ Mít song ngữ",
            text:
              "Con chọn đúng NGHĨA đã là 80% rồi ạ. Phần còn lại dạy con nhìn chữ ngay trước chỗ trống: sau \"a/an\" thì phải là danh từ số ít; sau \"is/are\" thường là V-ing hoặc tính từ; sau \"to\" là động từ nguyên thể. Ba dấu hiệu đó gỡ được đa số câu.",
            time: "3 ngày trước",
            likes: 67,
          },
          {
            author: "Trần Thu Hằng",
            text:
              "Nhà mình luyện bằng cách ngược lại: mẹ lấy một đoạn con đã đọc quen, xoá đi năm từ rồi bảo con điền lại. Vì con đã biết nội dung nên con tập trung hẳn vào dạng từ.",
            time: "3 ngày trước",
            likes: 43,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Mình cho con gạch chân từ đã dùng trong bảng từ. Đơn giản mà giảm hẳn lỗi dùng lặp.",
            time: "2 ngày trước",
            likes: 35,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Ba dấu hiệu của cô Ngọc quá hữu ích. Hôm nay con làm được 8/10 câu, con vui lắm ạ 🎉",
            time: "hôm qua",
            likes: 28,
          },
        ],
      },
      {
        author: "Hương Giang mom",
        title: "Lịch ôn ba tháng trước ngày thi Movers — ba mẹ chia thế nào ạ?",
        body:
          "Con mình thi Movers vào tháng 10. Mình muốn xây lịch ôn hợp lý, không nhồi. Ba mẹ đã trải qua chia sẻ giúp mình khung thời gian với ạ.",
        level: "MOVERS",
        tag: "Kế hoạch ôn",
        likes: 72,
        views: 1310,
        time: "4 ngày trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Gợi ý khung ba tháng: tháng 1 củng cố từ vựng và ghép vần (mỗi ngày 15 phút); tháng 2 làm quen từng dạng bài, mỗi tuần một dạng; tháng 3 làm đề trọn vẹn một tuần một lần và chữa kỹ. Hai tuần cuối GIẢM tải, chỉ ôn nhẹ và ngủ đủ.",
            time: "4 ngày trước",
            likes: 84,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình thêm một việc: mỗi Chủ nhật hai bố con ngồi 10 phút nhìn lại tuần qua, con tự chọn \"việc con làm tốt nhất\". Con thấy mình tiến bộ nên không sợ thi.",
            time: "4 ngày trước",
            likes: 56,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Kinh nghiệm xương máu: đừng để con làm đề mỗi ngày trong tháng cuối. Nhà mình từng làm vậy, con chán và kết quả còn tụt. Tuần một đề là vừa đủ.",
            time: "3 ngày trước",
            likes: 61,
          },
          {
            author: "Hương Giang mom",
            text:
              "Ghi lại hết rồi ạ. Mình sẽ để hai tuần cuối thật nhẹ nhàng, cảm ơn cả nhà 🙏",
            time: "3 ngày trước",
            likes: 24,
          },
        ],
      },
      {
        author: "Mẹ Nhím",
        title: "Con run khi vào phòng thi Speaking, ba mẹ có mẹo trấn an không ạ?",
        body:
          "Con mình ở nhà nói rất tốt nhưng thi thử ở trung tâm thì đứng im không nói được câu nào. Mình lo ngày thi thật con lại vậy. Ai có kinh nghiệm giúp mình với.",
        level: "STARTERS",
        tag: "Tâm lý phòng thi",
        likes: 69,
        views: 1180,
        time: "5 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Quỳnh Cambridge",
            text:
              "Phần Speaking của Starters và Movers rất nhẹ nhàng: giám khảo tươi cười, hỏi những câu quen thuộc như tên, tuổi, màu yêu thích. Mẹ nên cho con TẬP DƯỢT với người lạ — nhờ cô hàng xóm hoặc bác họ hỏi con vài câu tiếng Anh. Quen mặt lạ là hết run.",
            time: "5 ngày trước",
            likes: 74,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Nhà mình dựng \"phòng thi\" ở phòng khách: bố làm giám khảo, có cả bàn ghế và thẻ tên. Con diễn ba lần là hết lạ. Ngày thi thật con còn hỏi \"bố có làm giám khảo không\" 😄",
            time: "5 ngày trước",
            likes: 66,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Mình dặn con một câu cứu cánh: nếu không nghe rõ thì nói \"Sorry, can you say it again?\". Con biết mình có đường lui nên tự tin hẳn.",
            time: "4 ngày trước",
            likes: 58,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Câu cứu cánh hay quá ạ. Mình dạy con luôn, con tập nói câu đó với vẻ mặt rất người lớn 😂 Cảm ơn cả nhà.",
            time: "4 ngày trước",
            likes: 31,
          },
        ],
      },
      {
        author: "Trần Thu Hằng",
        title: "Sau Flyers thì học lên A2 Key for Schools luôn hay nghỉ một năm?",
        body:
          "Con mình vừa xong Flyers, được 14/15 khiên. Trung tâm khuyên học lên A2 Key luôn nhưng mình thấy khoảng cách khá xa. Ba mẹ nào đã đi qua chặng này cho mình xin lời khuyên ạ.",
        level: "KET",
        tag: "Lộ trình sau Flyers",
        likes: 60,
        views: 1050,
        time: "6 ngày trước",
        solved: false,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Chúc mừng bé nhé, 14 khiên là rất tốt. Khoảng cách Flyers lên A2 Key đúng là xa hơn các bậc trước, chủ yếu vì bắt đầu đọc đoạn dài và viết nhiều hơn. Gợi ý: đừng nghỉ hẳn, nhưng dành 6 tháng \"chuyển tiếp\" — đọc truyện chương ngắn và viết nhật ký ba câu mỗi ngày, sau đó vào A2 Key sẽ rất nhẹ.",
            time: "6 ngày trước",
            likes: 71,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Nhà mình cho con nghỉ thi một năm nhưng vẫn đọc sách đều. Khi quay lại học A2 Key con vào rất nhanh vì vốn từ đã dày lên tự nhiên.",
            time: "5 ngày trước",
            likes: 49,
          },
          {
            author: "an_nguyen",
            text:
              "Mình nghĩ tuỳ con thôi ạ. Con thích thi thì học tiếp, con đang mệt thì cho nghỉ. Chứng chỉ chỉ là cột mốc, cái giữ được là thói quen đọc mỗi ngày.",
            time: "5 ngày trước",
            likes: 55,
          },
        ],
      },
    ],
  },

  // ─────────────────────── Luyện nói ở nhà ───────────────────────
  {
    key: "speaking",
    label: "Luyện nói ở nhà",
    threads: [
      {
        author: "Mẹ Kem 8 tuổi",
        title: "Con hiểu hết nhưng không chịu mở miệng nói — phải làm sao ạ?",
        body:
          "Bé nhà mình nghe hiểu rất tốt, xem hoạt hình tiếng Anh không cần phụ đề. Nhưng bảo con nói thì con lắc đầu, trả lời bằng tiếng Việt. Mình có nên ép con nói không ạ?",
        level: "STARTERS",
        tag: "Bé ngại nói",
        likes: 95,
        views: 1840,
        time: "3 giờ trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Hạnh (giáo viên tiểu học)",
            text:
              "Không nên ép ạ. Giai đoạn con chỉ nghe mà chưa nói được gọi là \"giai đoạn im lặng\" — rất bình thường và là dấu hiệu con đang tích luỹ. Mẹ hạ chuẩn xuống: chỉ cần con nói MỘT TỪ cũng khen. Hỏi câu chọn lựa thay vì câu mở: \"Do you want milk or juice?\" — con chỉ cần đáp \"juice\".",
            time: "2 giờ trước",
            likes: 92,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình dùng con rối tay. Con không nói với bố nhưng nói với con rối rất nhiều. Trẻ ngại người thật chứ không ngại đồ chơi 😄",
            time: "2 giờ trước",
            likes: 78,
          },
          {
            author: "Mẹ Xu 8 tuổi",
            text:
              "Con nghe hiểu không cần phụ đề là giỏi lắm rồi ạ. Nhà mình từng y hệt, khoảng bốn tháng sau con bật nói và nói rất chuẩn vì đã nghe nhiều. Mẹ kiên nhẫn nhé.",
            time: "1 giờ trước",
            likes: 69,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Đọc xong nhẹ cả người ạ. Mình sẽ đổi sang hỏi câu chọn lựa và kiếm con rối tay cho con 🥰",
            time: "40 phút trước",
            likes: 36,
          },
        ],
      },
      {
        author: "Bố Tít",
        title: "Ba mẹ phát âm không chuẩn, nói tiếng Anh với con có hại không?",
        body:
          "Mình học tiếng Anh từ hồi phổ thông, phát âm chắc chắn không chuẩn. Mình muốn nói chuyện tiếng Anh với con nhưng sợ con bắt chước sai. Ba mẹ nghĩ sao ạ?",
        level: "",
        tag: "Ba mẹ đồng hành",
        likes: 88,
        views: 1620,
        time: "hôm qua",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Ba cứ nói ạ. Điều quan trọng nhất là con được DÙNG tiếng Anh trong tình huống thật với người con yêu quý. Phát âm chuẩn thì để audio và video lo. Ba mẹ lo phần động lực — phần đó không ai thay được.",
            time: "hôm qua",
            likes: 96,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Nhà mình chia rõ: giờ \"nghe chuẩn\" thì mở audio, giờ \"nói chơi\" thì mẹ nói thoải mái. Con biết mẫu chuẩn nằm ở đâu nên không bắt chước sai của mẹ.",
            time: "23 giờ trước",
            likes: 71,
          },
          {
            author: "an_nguyen",
            text:
              "Mình còn nói thẳng với con: \"Mẹ cũng đang học, con nghe thấy mẹ chưa đúng thì sửa mẹ nhé\". Con thích được làm cô giáo lắm, mà lại chú ý phát âm hơn hẳn.",
            time: "22 giờ trước",
            likes: 83,
          },
          {
            author: "Bố Tít",
            text:
              "Cảm ơn cả nhà, mình yên tâm rồi. Tối nay bắt đầu \"English dinner\" 10 phút 😁",
            time: "18 giờ trước",
            likes: 41,
          },
        ],
      },
      {
        author: "Mẹ Su Movers",
        title: "15 phút nói tiếng Anh mỗi tối — nhà mình duy trì được hai tháng rồi",
        body:
          "Chia sẻ với cả nhà cách nhà mình làm: sau bữa tối, cả nhà tắt điện thoại, dành đúng 15 phút nói tiếng Anh. Không sửa lỗi, không chấm điểm, chỉ nói. Chủ đề đơn giản: hôm nay con ăn gì, con chơi với ai. Hai tháng rồi và con nói trôi hơn hẳn.",
        level: "MOVERS",
        tag: "Thói quen",
        likes: 112,
        views: 2050,
        time: "2 ngày trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Chỗ \"không sửa lỗi\" là mấu chốt ạ. Nhà mình trước đây sửa liên tục nên con càng ngày càng nói ít. Từ hôm bỏ sửa, con nói nhiều gấp đôi.",
            time: "2 ngày trước",
            likes: 87,
          },
          {
            author: "Thầy Nam Phonics",
            text:
              "Cách của mẹ rất chuẩn về phương pháp: tách riêng \"giờ trôi chảy\" và \"giờ chính xác\". Nếu muốn sửa, mẹ ghi lại 1-2 lỗi ra giấy rồi hôm sau dạy lại nhẹ nhàng chứ không cắt ngang lúc con đang nói.",
            time: "2 ngày trước",
            likes: 79,
          },
          {
            author: "Hương Giang mom",
            text:
              "Nhà mình bắt chước nhưng đổi thành 15 phút lúc đi bộ buổi tối. Đi bộ nên không ai nhìn mặt ai, con nói thoải mái hơn nhiều.",
            time: "hôm qua",
            likes: 64,
          },
          {
            author: "Bố Tít",
            text:
              "Mình thêm cái chuông hẹn giờ. Chuông reo là hết giờ tiếng Anh, con biết trước điểm dừng nên không thấy nặng nề.",
            time: "hôm qua",
            likes: 52,
          },
        ],
      },
      {
        author: "Trần Thu Hằng",
        title: "Bé tả tranh chỉ nói được một câu rồi im — làm sao cho con nói dài hơn?",
        body:
          "Đưa tranh cho con, con nói \"A boy\" rồi hết. Mình gợi ý thì con nói thêm được nhưng tự con thì không. Ba mẹ có khung nào cho con bám vào không ạ?",
        level: "MOVERS",
        tag: "Tả tranh",
        likes: 58,
        views: 980,
        time: "3 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Dạy con công thức bốn ngón tay: (1) AI — a boy, (2) ĐANG LÀM GÌ — he is running, (3) Ở ĐÂU — in the park, (4) MÀU hoặc SỐ — he has a red ball. Con gập từng ngón khi nói xong một ý, tự khắc ra bốn câu.",
            time: "3 ngày trước",
            likes: 76,
          },
          {
            author: "Mẹ Xu 8 tuổi",
            text:
              "Nhà mình dùng đúng cách bốn ngón này. Ban đầu con nhìn tay để nhớ, giờ con nói tự nhiên luôn không cần gập tay nữa.",
            time: "3 ngày trước",
            likes: 54,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Mình thêm ngón thứ năm: \"con thích gì trong tranh\" — I like the dog. Giám khảo rất thích khi bé thêm ý kiến riêng.",
            time: "2 ngày trước",
            likes: 47,
          },
        ],
      },
      {
        author: "Hương Giang mom",
        title: "Nên cho con học 1 kèm 1 với giáo viên nước ngoài từ mấy tuổi?",
        body:
          "Nhà mình đang cân nhắc lớp 1 kèm 1 online. Con 6 tuổi, mới học ghép vần được bốn tháng. Có sớm quá không, và một tuần mấy buổi là hợp lý ạ?",
        level: "",
        tag: "Học 1 kèm 1",
        likes: 51,
        views: 900,
        time: "4 ngày trước",
        solved: false,
        hot: false,
        replies: [
          {
            author: "Cô Trang trợ giảng",
            text:
              "Bé 6 tuổi học 1 kèm 1 được, nhưng buổi học nên ngắn (20-25 phút) và nhiều trò chơi. Quan trọng hơn tuổi là con đã có vốn nghe: nếu con hiểu được câu lệnh đơn giản thì buổi học sẽ vui; nếu chưa thì con dễ bị ngợp.",
            time: "4 ngày trước",
            likes: 63,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Nhà mình bắt đầu lúc con 7 tuổi, hai buổi mỗi tuần. Thấy vừa sức. Ba buổi trở lên con bắt đầu kêu mệt.",
            time: "4 ngày trước",
            likes: 45,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Mẹ nhớ ngồi cạnh 2-3 buổi đầu nhé. Con thấy mẹ ở đó thì yên tâm, sau quen rồi mẹ rút ra dần.",
            time: "3 ngày trước",
            likes: 38,
          },
          {
            author: "an_nguyen",
            text:
              "Mình xin góp ý ngược lại chút: nếu ngân sách có hạn thì bốn tháng đầu vẫn nên đầu tư vào nghe và đọc trước. Lớp 1 kèm 1 phát huy tốt nhất khi con đã có gì đó để NÓI.",
            time: "3 ngày trước",
            likes: 57,
          },
        ],
      },
      {
        author: "Mẹ Bo lớp 4",
        title: "Con trả lời cụt lủn \"yes/no\" — làm sao để con nói dài hơn?",
        body:
          "Hỏi con \"Do you like pizza?\" thì con đáp \"Yes\" rồi thôi. Cô giáo nói phần thi Flyers cần con nói được câu đầy đủ. Ba mẹ có mẹo gì không ạ?",
        level: "FLYERS",
        tag: "Câu trả lời dài",
        likes: 49,
        views: 830,
        time: "5 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Dạy con quy tắc \"cộng thêm một\": trả lời xong thì thêm MỘT ý nữa. \"Yes, I do. I like cheese pizza best.\" Chỉ cần thêm một câu là đủ ghi điểm, không cần nói dài.",
            time: "5 ngày trước",
            likes: 68,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình đổi cách HỎI thay vì bắt con đổi cách trả lời. Thay \"Do you like pizza?\" thành \"Why do you like pizza?\" — con buộc phải nói dài.",
            time: "5 ngày trước",
            likes: 59,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Mình dùng \"because\" làm chìa khoá. Bất cứ câu trả lời nào cũng phải có \"because\". Con quen rồi thì tự thêm lý do.",
            time: "4 ngày trước",
            likes: 44,
          },
        ],
      },
      {
        author: "Mẹ Nhím",
        title: "Ghi âm giọng con rồi cho nghe lại — mẹo nhỏ mà hiệu quả bất ngờ",
        body:
          "Mình chia sẻ mẹo này vì nhà mình vừa thử tuần rồi. Cho con đọc một đoạn ngắn, ghi âm, rồi hai mẹ con cùng nghe lại. Con tự phát hiện chỗ mình đọc nhanh quá, chỗ quên âm cuối — mẹ không cần nói gì cả.",
        level: "STARTERS",
        tag: "Mẹo luyện nói",
        likes: 84,
        views: 1420,
        time: "6 ngày trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Đúng là con tự nghe thì tiếp thu tốt hơn mẹ nhắc thật ạ. Nhà mình còn ghi âm rồi một tháng sau nghe lại bản cũ, con thấy mình tiến bộ và tự hào lắm.",
            time: "6 ngày trước",
            likes: 72,
          },
          {
            author: "Mẹ Mít song ngữ",
            text:
              "Đây là kỹ thuật giáo viên hay dùng đấy ạ. Một lưu ý nhỏ: lần đầu nghe lại, mẹ nên khen trước hai điểm tốt rồi mới hỏi \"con thấy chỗ nào muốn đọc lại không?\". Nếu vào thẳng phần lỗi, con dễ ngại nghe giọng mình.",
            time: "6 ngày trước",
            likes: 66,
          },
          {
            author: "Bố Tít",
            text:
              "Nhà mình làm thành \"album giọng nói\", mỗi tháng một bản. Sinh nhật mở lại nghe, cả nhà cười vui mà con thấy rõ mình lớn lên.",
            time: "5 ngày trước",
            likes: 58,
          },
        ],
      },
    ],
  },

  // ─────────────────────── Từ vựng & Chính tả ───────────────────────
  {
    key: "vocab",
    label: "Từ vựng & Chính tả",
    threads: [
      {
        author: "Mẹ Bắp 7 tuổi",
        title: "Bé nhớ từ hôm nay, mai quên sạch — có bình thường không ạ?",
        body:
          "Tối nào hai mẹ con cũng học 10 từ mới, con thuộc rất nhanh. Nhưng hôm sau hỏi lại thì con chỉ nhớ được 2-3 từ. Mình hơi nản, không biết mình dạy sai chỗ nào.",
        level: "STARTERS",
        tag: "Ghi nhớ",
        likes: 97,
        views: 1750,
        time: "2 giờ trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Rất bình thường ạ, và mẹ không dạy sai đâu. Não trẻ quên là chuyện tự nhiên — cách chống quên là GẶP LẠI đúng lúc: ôn sau 1 ngày, 3 ngày, 1 tuần, 2 tuần. Thà học 4 từ mà gặp lại 4 lần còn hơn 10 từ chỉ gặp một lần.",
            time: "2 giờ trước",
            likes: 89,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Nhà mình giảm từ 10 xuống 5 từ mỗi tối và thêm ôn lại từ hôm trước. Kết quả tốt hơn hẳn dù học ít hơn.",
            time: "1 giờ trước",
            likes: 66,
          },
          {
            author: "Ba của Sóc",
            text:
              "Mình thấy từ nào con DÙNG được thì con nhớ mãi. Học từ \"spoon\" thì lấy cái thìa ra, học \"jump\" thì hai bố con nhảy. Từ nào chỉ đọc trên giấy là quên nhanh nhất.",
            time: "1 giờ trước",
            likes: 74,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Cảm ơn cả nhà! Hoá ra mình tham quá. Tuần này giảm còn 5 từ, con nhớ được 4-5 luôn 😄",
            time: "30 phút trước",
            likes: 29,
          },
        ],
      },
      {
        author: "Mẹ Su Movers",
        title: "Flashcard giấy hay app? Nhà mình thử cả hai và đây là kết quả",
        body:
          "Mình thử ba tháng flashcard giấy tự cắt, rồi ba tháng dùng app. Kết luận của nhà mình: bé dưới 6 tuổi hợp thẻ giấy hơn (được cầm, được lật, được xếp), bé lớn hơn thì app tiện vì tự nhắc ôn. Ba mẹ thấy sao ạ?",
        level: "",
        tag: "Flashcard",
        likes: 73,
        views: 1290,
        time: "hôm qua",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Mẹ Bún 5 tuổi",
            text:
              "Đồng ý với mẹ ạ. Bé nhà mình 5 tuổi, cầm thẻ giấy chơi trò \"đi chợ\" mua đồ bằng thẻ, vui hơn nhìn màn hình nhiều.",
            time: "23 giờ trước",
            likes: 55,
          },
          {
            author: "Cô Quỳnh Cambridge",
            text:
              "Bổ sung một điểm: dù dùng thẻ hay app, thẻ nên có ẢNH chứ đừng chỉ có nghĩa tiếng Việt. Khi con nhìn ảnh con chó và nghĩ ra \"dog\", con đang dùng tiếng Anh trực tiếp; còn dịch qua tiếng Việt thì chậm hơn một nhịp.",
            time: "22 giờ trước",
            likes: 81,
          },
          {
            author: "Bố Tít",
            text:
              "Nhà mình kết hợp: app để ôn hằng ngày, thẻ giấy để chơi cuối tuần. Hai loại không đá nhau mà bổ trợ nhau.",
            time: "20 giờ trước",
            likes: 48,
          },
        ],
      },
      {
        author: "Trần Thu Hằng",
        title: "Con đọc được \"because\" nhưng viết thành \"becuase\"",
        body:
          "Bé nhà mình đọc rất tốt nhưng viết chính tả thì hay đảo chữ. Mấy từ dài như because, beautiful, favourite là sai suốt. Có cách nào cho con nhớ mặt chữ không ạ?",
        level: "MOVERS",
        tag: "Chính tả",
        likes: 62,
        views: 1030,
        time: "2 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Với từ dài, mẹo tốt nhất là chia khúc và đọc theo cách viết: be-cause đọc là \"bi-CO-dơ\" nhưng khi học viết thì đọc to \"bi-cau-sờ\" theo đúng mặt chữ. Con nhớ nhịp là nhớ thứ tự chữ.",
            time: "2 ngày trước",
            likes: 70,
          },
          {
            author: "Mẹ Xu 8 tuổi",
            text:
              "Nhà mình dùng câu vè cho because: \"Big Elephants Can Always Understand Small Elephants\" — lấy chữ cái đầu ghép lại. Con thuộc một lần là nhớ mãi.",
            time: "2 ngày trước",
            likes: 84,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Mình cho con viết bằng bút màu, mỗi khúc một màu: be (xanh) cause (đỏ). Mắt con nhớ khối màu nên ít đảo chữ hẳn.",
            time: "hôm qua",
            likes: 51,
          },
          {
            author: "Trần Thu Hằng",
            text:
              "Câu vè con voi vui quá ạ 😂 Con mình đọc đi đọc lại cả tối, giờ viết đúng rồi.",
            time: "hôm qua",
            likes: 33,
          },
        ],
      },
      {
        author: "Nguyễn Minh Anh",
        title: "Từ vựng Movers có khoảng bao nhiêu từ ạ? Học hết mất bao lâu?",
        body:
          "Mình muốn ước lượng thời gian để lên kế hoạch cho con. Ba mẹ nào đã học qua cho mình xin con số thực tế với ạ, học mỗi ngày bao nhiêu từ là vừa.",
        level: "MOVERS",
        tag: "Danh sách từ",
        likes: 54,
        views: 970,
        time: "3 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Hạnh (giáo viên tiểu học)",
            text:
              "Danh sách từ Movers khoảng 800-900 từ, nhưng đã bao gồm cả phần Starters. Nếu con đã xong Starters thì phần MỚI chỉ khoảng 450-500 từ. Học 5 từ mỗi ngày, 5 ngày mỗi tuần thì khoảng 5 tháng là đủ, chưa kể từ con nhặt được khi đọc truyện.",
            time: "3 ngày trước",
            likes: 76,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Nhà mình mất 6 tháng nhưng học rất nhàn, xen kẽ đọc truyện. Mẹ đừng đặt mục tiêu \"học hết danh sách\" nhé, đặt mục tiêu \"mỗi ngày có 15 phút vui\" thì tự nhiên hết lúc nào không hay.",
            time: "3 ngày trước",
            likes: 62,
          },
          {
            author: "an_nguyen",
            text:
              "Mình chia danh sách theo chủ đề chứ không theo bảng chữ cái: animals, food, clothes, school, weather… Học theo chùm thì con nhớ tốt hơn nhiều so với học lẻ.",
            time: "2 ngày trước",
            likes: 58,
          },
        ],
      },
      {
        author: "Mẹ Bún 5 tuổi",
        title: "Dán nhãn tiếng Anh khắp nhà — có ba mẹ nào làm chưa ạ?",
        body:
          "Cuối tuần rồi mình dán giấy nhớ lên đồ vật trong nhà: door, window, fridge, mirror, chair. Con 5 tuổi đi qua đọc suốt ngày. Sau một tuần con thuộc gần hết mà chẳng ngồi học phút nào.",
        level: "PRE_STARTERS",
        tag: "Học qua đồ vật",
        likes: 105,
        views: 1930,
        time: "4 ngày trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Mẹ Nhím",
            text:
              "Nhà mình làm hai năm nay rồi, hiệu quả thật ạ. Mẹo nhỏ: viết chữ THƯỜNG (door) chứ đừng viết hoa hết (DOOR), vì trong sách con đọc chữ thường.",
            time: "4 ngày trước",
            likes: 78,
          },
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Cách này rất tốt ạ. Nâng cấp thêm: sau 2 tuần thì đổi nhãn từ danh từ sang CÂU — dán \"Open the door\" ở cửa, \"Wash your hands\" ở bồn rửa. Con học được cả cụm dùng thật.",
            time: "4 ngày trước",
            likes: 86,
          },
          {
            author: "Bố Tít",
            text:
              "Nhà mình cho con tự viết nhãn luôn. Chữ hơi xấu nhưng con nhớ gấp đôi vì chính tay con viết ra 😄",
            time: "3 ngày trước",
            likes: 64,
          },
          {
            author: "Hương Giang mom",
            text:
              "Mình vừa dán tối qua, sáng nay con dắt bà nội đi một vòng đọc cho bà nghe. Bà cười tít mắt 🥰",
            time: "3 ngày trước",
            likes: 57,
          },
        ],
      },
      {
        author: "Ba của Sóc",
        title: "Bé thích khủng long, mình lấy luôn chủ đề đó để dạy từ mới",
        body:
          "Con mình 6 tuổi, mê khủng long. Thay vì bắt con học danh sách từ theo sách, mình cho con học từ về khủng long trước: big, small, teeth, tail, eat, run, scary. Con học say sưa luôn, giờ nói được cả câu \"The T-rex has big teeth\".",
        level: "STARTERS",
        tag: "Học theo sở thích",
        likes: 91,
        views: 1610,
        time: "5 ngày trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Thầy Nam Phonics",
            text:
              "Cách của ba rất đúng ạ. Từ vựng gắn với thứ con YÊU thì đi vào trí nhớ dài hạn nhanh gấp nhiều lần. Và để ý là các từ ba liệt kê (big, small, eat, run) đều nằm trong danh sách Starters — nghĩa là con vẫn đang đi đúng chương trình, chỉ khác cửa vào thôi.",
            time: "5 ngày trước",
            likes: 88,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Nhà mình cũng vậy nhưng chủ đề là bóng đá. Con thuộc hết tên vị trí, màu áo, động từ kick/pass/score. Cô giáo còn ngạc nhiên hỏi con học ở đâu 😁",
            time: "5 ngày trước",
            likes: 67,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Con gái mình mê nấu ăn nên nhà mình học qua công thức: mix, pour, cut, hot, sweet. Vừa học vừa làm bánh, chiều nào cũng chờ tới giờ tiếng Anh.",
            time: "4 ngày trước",
            likes: 59,
          },
        ],
      },
      {
        author: "Mẹ Bún 5 tuổi",
        title: "Sight words là gì và có cần cho con học thuộc không ạ?",
        body:
          "Mình thấy nhiều nơi nhắc tới sight words nhưng chưa hiểu rõ. Con mình đang học ghép vần, có nên học song song sight words không hay để sau ạ?",
        level: "PRE_STARTERS",
        tag: "Sight words",
        likes: 66,
        views: 1120,
        time: "6 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Sight words là những từ xuất hiện dày đặc nhưng KHÔNG đọc theo quy tắc ghép vần: the, was, said, are, you, they. Con không ghép ra được nên phải nhận mặt luôn. Nên học song song ạ — mỗi tuần 3-5 từ là đủ, vì chỉ khoảng 50 từ này đã chiếm phần lớn chữ trong sách thiếu nhi.",
            time: "6 ngày trước",
            likes: 79,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Nhà mình học sight words bằng trò \"đi săn\": mở một trang truyện, con tìm và khoanh tất cả chữ \"the\". Con thấy nó xuất hiện nhiều thì tự nhớ.",
            time: "6 ngày trước",
            likes: 61,
          },
          {
            author: "Hương Giang mom",
            text:
              "Mình viết mỗi từ lên một viên gạch giấy rồi xếp thành \"con đường\". Con nhảy lên viên nào thì đọc từ đó. Vừa vận động vừa học.",
            time: "5 ngày trước",
            likes: 53,
          },
          {
            author: "Mẹ Bún 5 tuổi",
            text:
              "Cảm ơn cả nhà ạ! Nhà mình bắt đầu với 5 từ: the, and, is, you, are. Con đọc được câu đầu tiên trong truyện rồi 🎉",
            time: "5 ngày trước",
            likes: 42,
          },
        ],
      },
    ],
  },

  // ─────────────────────── Chia sẻ tài liệu ───────────────────────
  {
    key: "resources",
    label: "Chia sẻ tài liệu",
    threads: [
      {
        author: "Mẹ Kem 8 tuổi",
        title: "Tổng hợp truyện tranh tiếng Anh cho bé mới bắt đầu đọc",
        body:
          "Mình gom lại mấy bộ nhà mình đọc thấy hợp bé mới đọc: truyện chỉ 1-2 câu mỗi trang, tranh to, từ lặp lại nhiều. Tiêu chí chọn của mình là con đọc được ÍT NHẤT 90% chữ trên trang — nếu phải dừng quá nhiều để tra thì con nản ngay.",
        level: "STARTERS",
        tag: "Truyện đọc",
        likes: 118,
        views: 2140,
        time: "3 giờ trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Cô Trang trợ giảng",
            text:
              "Tiêu chí 90% của mẹ chuẩn lắm ạ. Có một cách kiểm tra nhanh gọi là \"quy tắc 5 ngón\": con đọc một trang, cứ gặp từ không biết thì gập một ngón. Gập đủ 5 ngón trong một trang thì sách đó hơi khó, để dành sau.",
            time: "2 giờ trước",
            likes: 94,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Mình bổ sung: chọn truyện có CÂU LẶP (kiểu \"Brown bear, brown bear, what do you see?\"). Con đoán được câu tiếp theo nên thấy mình đọc giỏi, tự tin hẳn.",
            time: "2 giờ trước",
            likes: 76,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình mượn thư viện thành phố, mỗi lần 5 quyển. Con tự chọn nên đọc hào hứng hơn hẳn sách bố mẹ mua về.",
            time: "1 giờ trước",
            likes: 62,
          },
        ],
      },
      {
        author: "Mẹ Bún 5 tuổi",
        title: "Playlist bài hát tiếng Anh cho bé 4-5 tuổi — nhà mình nghe mỗi sáng",
        body:
          "Mình bật nhạc lúc con ăn sáng và lúc đi học về. Chọn bài có động tác để con vừa hát vừa làm theo: Head Shoulders Knees and Toes, If You're Happy, The Wheels on the Bus, Five Little Monkeys. Con thuộc lời lúc nào không hay.",
        level: "PRE_STARTERS",
        tag: "Bài hát",
        likes: 96,
        views: 1720,
        time: "hôm qua",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Hương Giang mom",
            text:
              "Nhà mình cũng vậy ạ. Mẹo nhỏ: đừng đổi bài liên tục. Một tuần chỉ 2-3 bài thôi, nghe đi nghe lại thì con mới thuộc và hiểu nghĩa.",
            time: "23 giờ trước",
            likes: 71,
          },
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Đúng ạ. Và bài hát có ĐỘNG TÁC hiệu quả hơn hẳn bài chỉ nghe, vì con gắn từ với cử động cơ thể. Head Shoulders là bài dạy từ vựng bộ phận cơ thể tốt nhất mà con không hề biết mình đang học.",
            time: "20 giờ trước",
            likes: 79,
          },
          {
            author: "Bố Tít",
            text:
              "Nhà mình bật lúc đi ô tô. 20 phút đường tới trường là 20 phút tiếng Anh miễn phí mỗi ngày 😄",
            time: "19 giờ trước",
            likes: 58,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Bổ sung bài Old MacDonald cho chủ đề animals nữa ạ, con mình mê con bò trong bài lắm.",
            time: "16 giờ trước",
            likes: 44,
          },
        ],
      },
      {
        author: "Mẹ Su Movers",
        title: "Phim hoạt hình nào nói chậm, dễ nghe cho bé Movers ạ?",
        body:
          "Con mình xem mấy phim nói nhanh quá nên chỉ nhìn hình chứ không nghe được gì. Ba mẹ gợi ý giúp mình phim nào lời thoại chậm, câu ngắn với ạ.",
        level: "MOVERS",
        tag: "Phim hoạt hình",
        likes: 82,
        views: 1480,
        time: "2 ngày trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Mẹ Mít song ngữ",
            text:
              "Tiêu chí chọn quan trọng hơn tên phim ạ: (1) mỗi tập dưới 12 phút, (2) nhân vật nói câu ngắn và lặp lại, (3) có tình huống đời thường (đi chợ, đi học, sinh nhật). Phim đời thường dạy được từ con dùng ngay, phim viễn tưởng thì từ hay nhưng ít dùng.",
            time: "2 ngày trước",
            likes: 77,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Nhà mình có luật: tập nào con thích thì xem lại 3 lần trong tuần. Lần 1 xem cho vui, lần 2 nghe kỹ, lần 3 con nhại theo nhân vật. Xem ít phim mà thấm hơn nhiều.",
            time: "2 ngày trước",
            likes: 85,
          },
          {
            author: "an_nguyen",
            text:
              "Mình tắt phụ đề tiếng Việt luôn. Ban đầu con kêu nhưng hai tuần sau con quen và bắt đầu nghe thật sự.",
            time: "hôm qua",
            likes: 63,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Luật xem lại 3 lần hay quá ạ. Mình áp dụng luôn tuần này 🙌",
            time: "hôm qua",
            likes: 38,
          },
        ],
      },
      {
        author: "Mẹ Nhím",
        title: "Bảng ghép vần in dán tường — nhà mình tự làm, chia sẻ cách làm",
        body:
          "Mình làm một tờ A3 chia 6 hàng, mỗi hàng một nhóm âm (s a t p i n / c k e h r m / d g o u l f…), mỗi âm kèm một hình. Dán ngang tầm mắt con. Con đi qua đọc vài lần mỗi ngày, ba tuần là nhớ hết nhóm đầu.",
        level: "PRE_STARTERS",
        tag: "Tài liệu in",
        likes: 89,
        views: 1560,
        time: "3 ngày trước",
        solved: false,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Thứ tự nhóm âm mẹ chọn đúng chuẩn ạ. Một lưu ý: hình minh hoạ nên chọn từ có âm đó ở ĐẦU và ngắn (s – sun, a – ant, t – tap). Nếu chọn từ dài thì con dễ nhớ nhầm sang âm khác.",
            time: "3 ngày trước",
            likes: 72,
          },
          {
            author: "Mẹ Bún 5 tuổi",
            text:
              "Mình dán trong nhà tắm luôn, lúc đánh răng con đọc. Hoá ra chỗ dán quan trọng ngang nội dung 😄",
            time: "3 ngày trước",
            likes: 64,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình ép plastic để con sờ được mà không rách. Con hay lấy ngón tay chỉ từng âm rồi đọc, giống như đọc bản đồ.",
            time: "2 ngày trước",
            likes: 47,
          },
        ],
      },
      {
        author: "Nguyễn Minh Anh",
        title: "Đề Movers luyện thử — nguồn nào đáng tin ạ?",
        body:
          "Mình tìm trên mạng thì thấy nhiều đề nhưng chất lượng chênh nhau. Có đề câu hỏi lạ hẳn so với đề thật. Ba mẹ chỉ mình cách nhận biết đề chuẩn với ạ.",
        level: "MOVERS",
        tag: "Đề luyện",
        likes: 58,
        views: 1010,
        time: "4 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Quỳnh Cambridge",
            text:
              "Cách nhận biết nhanh: đề chuẩn Movers có đúng cấu trúc 5 phần Listening, 6 phần Reading & Writing, và từ vựng nằm trong danh sách chính thức. Nếu thấy từ lạ ngoài danh sách hoặc câu hỏi kiểu ngữ pháp hàn lâm thì gần như chắc chắn không phải đề chuẩn.",
            time: "4 ngày trước",
            likes: 74,
          },
          {
            author: "Trần Thu Hằng",
            text:
              "Mình ưu tiên đề mẫu do chính hội đồng khảo thí phát hành, dù ít nhưng chuẩn. Đề chép lại trên mạng nhiều khi sai cả đáp án, con làm xong lại hoang mang.",
            time: "4 ngày trước",
            likes: 68,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Kinh nghiệm nhà mình: 2-3 đề chuẩn làm thật kỹ và chữa từng câu còn hơn 10 đề làm qua loa.",
            time: "3 ngày trước",
            likes: 55,
          },
        ],
      },
      {
        author: "Hương Giang mom",
        title: "Sách nào cho bé tập viết chữ tiếng Anh (loại có 4 dòng kẻ)?",
        body:
          "Con mình viết chữ tiếng Anh cao thấp lộn xộn, chữ g chữ y không thò xuống dưới. Mình muốn tìm vở có 4 dòng kẻ chuẩn. Ba mẹ dùng loại nào ạ?",
        level: "PRE_STARTERS",
        tag: "Tập viết",
        likes: 61,
        views: 1060,
        time: "5 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Vở 4 dòng kẻ nào cũng được ạ, quan trọng là dạy con khái niệm ba tầng: chữ \"nhỏ\" nằm giữa (a, c, e, o), chữ \"cao\" chạm trần (b, d, h, k, l, t), chữ \"thò chân\" xuống dưới (g, j, p, q, y). Con hiểu ba tầng thì viết đều ngay.",
            time: "5 ngày trước",
            likes: 80,
          },
          {
            author: "Mẹ Bún 5 tuổi",
            text:
              "Nhà mình gọi vui là \"chữ mèo con\" (nằm giữa), \"chữ hươu cao cổ\" (chạm trần) và \"chữ khỉ đu\" (thò chân). Con 5 tuổi nhớ ngay.",
            time: "5 ngày trước",
            likes: 73,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Mình in giấy 4 dòng rồi bọc túi nilon, con viết bút lông xoá được, viết lại thoải mái không tốn vở.",
            time: "4 ngày trước",
            likes: 52,
          },
          {
            author: "Hương Giang mom",
            text:
              "Tên gọi hươu cao cổ với khỉ đu dễ thương quá ạ, con mình cười suốt mà viết đúng luôn 😍",
            time: "4 ngày trước",
            likes: 36,
          },
        ],
      },
      {
        author: "an_nguyen",
        title: "App và trang web nào miễn phí mà chất lượng ạ?",
        body:
          "Nhà mình ngân sách hạn chế nên muốn tận dụng nguồn miễn phí. Ba mẹ chia sẻ giúp mình tiêu chí chọn app cho con với, chứ app thì nhiều mà không biết cái nào hợp.",
        level: "",
        tag: "App học",
        likes: 70,
        views: 1240,
        time: "6 ngày trước",
        solved: false,
        hot: false,
        replies: [
          {
            author: "Cô Hạnh (giáo viên tiểu học)",
            text:
              "Tiêu chí chọn app cho trẻ, theo thứ tự quan trọng: (1) có ÂM THANH chuẩn cho mọi từ, (2) nhiều hình ít chữ, (3) mỗi lượt học ngắn dưới 10 phút, (4) không có quảng cáo cắt ngang. Ba tiêu chí đầu quyết định con học được gì, tiêu chí cuối quyết định con có bị phân tâm không.",
            time: "6 ngày trước",
            likes: 83,
          },
          {
            author: "Bố Tít",
            text:
              "Mình thêm một tiêu chí: app phải cho BA MẸ xem con học gì. Không thì mình mù tịt, không biết hỗ trợ con chỗ nào.",
            time: "6 ngày trước",
            likes: 66,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Nhà mình dùng miễn phí là chính, chỉ trả tiền cho phần con thật sự cần. Không cần mua hết mọi thứ đâu ạ, cái quyết định vẫn là đều đặn mỗi ngày.",
            time: "5 ngày trước",
            likes: 59,
          },
        ],
      },
    ],
  },

  // ─────────────────────── Động lực & Nhật ký ───────────────────────
  {
    key: "motivation",
    label: "Động lực & Nhật ký",
    threads: [
      {
        author: "Mẹ Xu 8 tuổi",
        title: "Nhật ký 100 ngày học cùng con — hôm nay là ngày 100 🎉",
        body:
          "Hôm nay tròn 100 ngày mẹ con mình học đều mỗi tối 20 phút. Ngày 1 con đọc chưa xong một câu, hôm nay con đọc hết một quyển truyện 12 trang cho bà nghe. Mình viết ra đây để cảm ơn cộng đồng đã cho mình rất nhiều gợi ý.",
        level: "MOVERS",
        tag: "Nhật ký",
        likes: 176,
        views: 2980,
        time: "vài phút trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Chúc mừng hai mẹ con! 100 ngày liên tục là điều rất khó, người lớn còn khó chứ nói gì trẻ con. Mẹ giỏi lắm ạ 👏",
            time: "vài phút trước",
            likes: 68,
          },
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Điều đáng quý nhất trong câu chuyện của mẹ không phải là quyển truyện 12 trang, mà là con đã ĐỌC CHO BÀ NGHE. Nghĩa là con thấy tiếng Anh là thứ để chia sẻ chứ không phải để kiểm tra. Chúc mừng cả nhà ạ 🌟",
            time: "vài phút trước",
            likes: 92,
          },
          {
            author: "Bố Tít",
            text:
              "Mẹ chia sẻ cách giữ đều được không ạ? Nhà mình được 3 tuần là đứt.",
            time: "vài phút trước",
            likes: 41,
          },
          {
            author: "Mẹ Xu 8 tuổi",
            text:
              "Bí quyết duy nhất của mình: KHÔNG bỏ hai ngày liên tiếp. Có hôm mệt thì học 5 phút cũng được, miễn là hôm sau quay lại. Và luôn dừng khi con vẫn còn muốn học thêm 💛",
            time: "vài phút trước",
            likes: 87,
          },
        ],
      },
      {
        author: "Mẹ Kem 8 tuổi",
        title: "Bé lười học, khóc mỗi lần mở sách — nhà mình đã vượt qua thế nào",
        body:
          "Ba tháng trước cứ tới giờ học là con khóc, mình cũng cáu. Sau mình dừng hẳn hai tuần, không nhắc gì tới tiếng Anh. Rồi bắt đầu lại bằng trò chơi, không sách vở. Giờ con tự nhắc mẹ tới giờ học. Mình muốn kể lại cho ba mẹ nào đang bế tắc như mình hồi đó.",
        level: "STARTERS",
        tag: "Bé lười học",
        likes: 154,
        views: 2640,
        time: "hôm qua",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Thầy Nam Phonics",
            text:
              "Quyết định dừng hai tuần của mẹ rất dũng cảm và rất đúng ạ. Khi con đã gắn tiếng Anh với cảm giác khó chịu thì học thêm chỉ làm dày thêm cảm giác đó. Phải cắt liên kết cũ rồi mới xây liên kết mới được.",
            time: "hôm qua",
            likes: 118,
          },
          {
            author: "Hương Giang mom",
            text:
              "Mình đang ở đúng giai đoạn mẹ kể. Đọc xong mình khóc luôn 🥲 Cảm ơn mẹ đã chia sẻ, mình sẽ dừng lại một chút thay vì ép con.",
            time: "hôm qua",
            likes: 76,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình cũng từng vậy. Điều làm mình thay đổi là nhận ra: con không lười, con chỉ đang tránh một việc làm con thấy mình kém. Đổi việc đó thành việc con làm được là xong.",
            time: "23 giờ trước",
            likes: 94,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Xin hỏi mẹ bắt đầu lại bằng trò chơi gì ạ? Nhà mình cũng muốn thử.",
            time: "20 giờ trước",
            likes: 38,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Mình bắt đầu bằng trò trốn tìm đồ vật: mẹ giấu con thú bông rồi nói \"It's under the table\", con đi tìm. Không có sách, không có bút, chỉ chạy và cười thôi ạ.",
            time: "18 giờ trước",
            likes: 71,
          },
        ],
      },
      {
        author: "Bố Tít",
        title: "Có nên thưởng tiền hoặc đồ chơi khi con học không ạ?",
        body:
          "Mình từng hứa thưởng đồ chơi nếu con học đủ tuần. Con học rất chăm nhưng hết thưởng là dừng luôn. Ba mẹ nghĩ sao về chuyện thưởng ạ?",
        level: "",
        tag: "Khen thưởng",
        likes: 87,
        views: 1590,
        time: "2 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Trải nghiệm của ba mô tả đúng vấn đề của phần thưởng vật chất: nó thay thế động lực bên trong chứ không nuôi động lực đó. Gợi ý đổi hướng: thưởng bằng TRẢI NGHIỆM gắn với việc học — học đủ tuần thì cuối tuần con được chọn phim để cả nhà xem cùng, hoặc được đọc truyện cho cả nhà nghe.",
            time: "2 ngày trước",
            likes: 103,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Nhà mình dùng bảng dán sao. Nhưng phần thưởng cuối tháng không phải đồ chơi mà là \"một buổi đi công viên với mẹ\". Con quý thời gian với mẹ hơn cả đồ chơi.",
            time: "2 ngày trước",
            likes: 81,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Mình để ý con thích nhất là được KHOE. Con học xong gọi video cho ông bà đọc một câu, ông bà vỗ tay — thế là con học tiếp cả tuần, chẳng cần thưởng gì.",
            time: "hôm qua",
            likes: 88,
          },
          {
            author: "Bố Tít",
            text:
              "Cảm ơn cả nhà. Tuần này mình đổi sang \"phần thưởng thời gian\" xem sao 😊",
            time: "hôm qua",
            likes: 34,
          },
        ],
      },
      {
        author: "Mẹ Nhím",
        title: "Con được 5 khiên Starters, mẹ khóc luôn 🥹",
        body:
          "Con mình vốn nhút nhát, hồi đầu không dám mở miệng nói tiếng Anh. Hôm nay có kết quả, phần Speaking được 5 khiên. Mình xúc động vì con đã vượt qua nỗi sợ chứ không phải vì con số. Cảm ơn ba mẹ trong nhóm đã cho mình nhiều lời khuyên hồi con còn ngại nói.",
        level: "STARTERS",
        tag: "Khoe thành tích",
        likes: 143,
        views: 2380,
        time: "3 ngày trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Chúc mừng con! Từ chỗ không dám nói tới 5 khiên Speaking là một chặng đường dài, con giỏi lắm 🎉",
            time: "3 ngày trước",
            likes: 72,
          },
          {
            author: "Cô Trang trợ giảng",
            text:
              "Mẹ nói đúng điều quan trọng nhất: con vượt qua nỗi sợ. Cái đó theo con suốt đời, còn số khiên thì chỉ là kỷ niệm đẹp. Chúc mừng gia đình mình ạ 🌟",
            time: "3 ngày trước",
            likes: 89,
          },
          {
            author: "Trần Thu Hằng",
            text:
              "Con mình cũng nhút nhát y hệt. Mẹ chia sẻ giúp mình mẹo nào giúp con dám nói được không ạ?",
            time: "2 ngày trước",
            likes: 45,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Mình cho con nói với con rối tay trước, rồi nói với ông bà qua video, cuối cùng mới nói với người lạ. Đi từng bậc nhỏ, mỗi bậc khoảng ba tuần ạ 💛",
            time: "2 ngày trước",
            likes: 67,
          },
        ],
      },
      {
        author: "Nguyễn Minh Anh",
        title: "Học 15 phút mỗi ngày hay dồn một tiếng cuối tuần?",
        body:
          "Nhà mình bận, ngày thường khó sắp xếp. Mình nghĩ hay là dồn vào cuối tuần học một lần cho tập trung. Ba mẹ thấy cách nào hiệu quả hơn ạ?",
        level: "",
        tag: "Tần suất học",
        likes: 76,
        views: 1380,
        time: "4 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "15 phút mỗi ngày hơn hẳn ạ, không phải vì tổng thời gian mà vì trí nhớ cần được nhắc lại thường xuyên. Học một tiếng rồi nghỉ sáu ngày thì tới cuối tuần sau con đã quên gần hết. Nếu ngày thường quá bận thì 5 phút cũng được, miễn là có.",
            time: "4 ngày trước",
            likes: 95,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Nhà mình gắn 15 phút đó vào một việc cố định hằng ngày — sau khi đánh răng buổi tối. Gắn vào thói quen cũ thì không phải nhớ nữa.",
            time: "4 ngày trước",
            likes: 72,
          },
          {
            author: "an_nguyen",
            text:
              "Mình tận dụng thời gian chết: nghe bài hát lúc đi xe, ôn từ lúc xếp hàng. Cộng lại cũng được 15-20 phút mà không tốn thêm giờ nào.",
            time: "3 ngày trước",
            likes: 64,
          },
          {
            author: "Nguyễn Minh Anh",
            text:
              "Ý gắn vào thói quen cũ hay quá ạ. Nhà mình gắn vào lúc chờ cơm chín 😄 Cảm ơn cả nhà.",
            time: "3 ngày trước",
            likes: 31,
          },
        ],
      },
      {
        author: "Trần Thu Hằng",
        title: "Mình đã bỏ so sánh con với \"con nhà người ta\" và mọi thứ khác hẳn",
        body:
          "Trước đây mình hay nói \"bạn A học ít hơn con mà nói giỏi hơn\". Mình tưởng nói vậy con sẽ cố. Thực tế con càng ngày càng chán và có lần con hỏi \"Sao mẹ không thích con?\". Mình dừng hẳn ba tháng nay, chỉ so con với chính con của tháng trước. Con vui hơn và học tốt lên thật.",
        level: "",
        tag: "Tâm lý",
        likes: 168,
        views: 2810,
        time: "5 ngày trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Mẹ Mít song ngữ",
            text:
              "Cảm ơn mẹ đã kể lại thật lòng, bài này giúp được rất nhiều ba mẹ ạ. \"So con với chính con của tháng trước\" là câu nên ghim lên tường. Trẻ chỉ cố gắng khi thấy mình đang tiến bộ, chứ không phải khi thấy mình đang thua.",
            time: "5 ngày trước",
            likes: 124,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Câu hỏi của bé làm mình lặng người. Mình cũng hay lỡ miệng như vậy. Từ hôm nay mình sẽ để ý hơn 🥺",
            time: "5 ngày trước",
            likes: 87,
          },
          {
            author: "Ba của Sóc",
            text:
              "Nhà mình ghi lại giọng con mỗi tháng, đúng như mẹ nói — cho con nghe lại bản cũ là con tự thấy mình tiến bộ, không cần so với ai.",
            time: "4 ngày trước",
            likes: 79,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Mình còn bỏ luôn thói quen hỏi \"hôm nay bạn được mấy điểm\". Chỉ hỏi \"hôm nay con thích nhất phần nào\". Không khí nhà nhẹ hẳn.",
            time: "4 ngày trước",
            likes: 92,
          },
        ],
      },
      {
        author: "Ba của Sóc",
        title: "Giữ chuỗi 60 ngày liên tiếp — bí quyết là… đừng ép",
        body:
          "Nhà mình vừa qua mốc 60 ngày học liên tục. Nghe thì oách nhưng bí quyết đơn giản lắm: mỗi ngày chỉ cần làm MỘT việc nhỏ nhất là tính, ví dụ nghe một bài hát hoặc đọc một trang. Không đặt mức tối thiểu cao nên không bao giờ đứt chuỗi.",
        level: "MOVERS",
        tag: "Streak",
        likes: 121,
        views: 2090,
        time: "6 ngày trước",
        solved: false,
        hot: true,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Cách này rất khoa học ạ. Đặt \"mức sàn siêu thấp\" giữ được thói quen qua những ngày mệt, mà đa số hôm con bắt đầu rồi lại học nhiều hơn mức sàn. Cái chết của mọi chuỗi là đặt mục tiêu ngày nào cũng phải học 30 phút.",
            time: "6 ngày trước",
            likes: 98,
          },
          {
            author: "Mẹ Xu 8 tuổi",
            text:
              "Đúng thật ạ. Nhà mình từng đặt 30 phút mỗi ngày, đứt chuỗi ở ngày 9 rồi bỏ luôn. Giờ đặt 5 phút, chạy được hơn hai tháng rồi.",
            time: "6 ngày trước",
            likes: 74,
          },
          {
            author: "Hương Giang mom",
            text:
              "Mình treo tờ lịch để con tự tô màu ô mỗi ngày. Con tiếc chuỗi màu nên không chịu bỏ ngày nào 😄",
            time: "5 ngày trước",
            likes: 66,
          },
        ],
      },
    ],
  },

  // ─────────────────────── Hỏi đáp chung ───────────────────────
  {
    key: "general",
    label: "Hỏi đáp chung",
    threads: [
      {
        author: "Mẹ Bún 5 tuổi",
        title: "Bé 4 tuổi bắt đầu học tiếng Anh có sớm quá không ạ?",
        body:
          "Bé nhà mình 4 tuổi, tiếng Việt còn chưa sõi hẳn. Bà nội lo con học hai thứ tiếng cùng lúc sẽ chậm nói. Ba mẹ cho mình xin ý kiến với ạ.",
        level: "PRE_STARTERS",
        tag: "Độ tuổi bắt đầu",
        likes: 108,
        views: 1970,
        time: "3 giờ trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Quỳnh Cambridge",
            text:
              "4 tuổi hoàn toàn ổn ạ, miễn là học qua CHƠI chứ không ngồi bàn. Ở tuổi này mục tiêu chỉ là làm quen âm thanh: nghe bài hát, xem tranh gọi tên đồ vật, chơi trò chỉ và nói. Chưa cần học chữ, chưa cần viết.",
            time: "2 giờ trước",
            likes: 96,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Nhà mình bắt đầu lúc con 4 tuổi rưỡi, tiếng Việt của con giờ vẫn tốt bình thường. Bà nội mình cũng lo y hệt, sau thấy con nói cả hai thứ tiếng thì bà lại đi khoe 😄",
            time: "2 giờ trước",
            likes: 78,
          },
          {
            author: "Bố Tít",
            text:
              "Mình nghĩ điều cần tránh không phải là học sớm, mà là học sớm theo kiểu ngồi học nghiêm túc như học sinh lớp 1. Cứ chơi thôi ạ.",
            time: "1 giờ trước",
            likes: 69,
          },
          {
            author: "Mẹ Bún 5 tuổi",
            text:
              "Cảm ơn cả nhà, mình yên tâm rồi. Nhà mình sẽ chỉ hát và chơi thôi, không ép chữ nghĩa gì cả 🌟",
            time: "42 phút trước",
            likes: 33,
          },
        ],
      },
      {
        author: "Hương Giang mom",
        title: "Chọn cấp độ nào cho bé 7 tuổi mới học được ba tháng?",
        body:
          "Mình đang không biết cho con bắt đầu từ Pre-Starters hay Starters. Con biết bảng chữ cái, đếm được tới 20, nói được vài câu chào hỏi. Ba mẹ tư vấn giúp mình với ạ.",
        level: "STARTERS",
        tag: "Chọn cấp độ",
        likes: 84,
        views: 1520,
        time: "hôm qua",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Với mô tả của mẹ thì nên bắt đầu từ Pre-Starters rồi lên Starters nhanh. Lý do: con đã biết chữ cái nhưng chưa chắc ghép vần được — Pre-Starters lấp đúng khoảng trống đó. Nếu con học thấy quá dễ thì chỉ 4-6 tuần là chuyển lên, không mất thời gian đâu ạ.",
            time: "hôm qua",
            likes: 92,
          },
          {
            author: "Mẹ Kem 8 tuổi",
            text:
              "Kinh nghiệm nhà mình: thà chọn thấp hơn một bậc. Con học thấy dễ thì tự tin và ham học. Chọn cao quá là con đuối rồi sợ luôn.",
            time: "23 giờ trước",
            likes: 81,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Đồng ý ạ. Nhà mình từng chọn cao cho \"tiết kiệm thời gian\", cuối cùng phải quay lại học lại từ đầu, mất thời gian gấp đôi.",
            time: "20 giờ trước",
            likes: 67,
          },
        ],
      },
      {
        author: "Mẹ Bắp 7 tuổi",
        title: "Con học song song tiếng Anh và chương trình lớp 1 có bị loạn không?",
        body:
          "Con mình vào lớp 1 năm nay, đang tập viết tiếng Việt. Mình sợ học chữ tiếng Anh cùng lúc con sẽ lẫn, ví dụ đọc chữ \"a\" theo kiểu nào. Ba mẹ có kinh nghiệm chia sẻ giúp ạ.",
        level: "PRE_STARTERS",
        tag: "Song ngữ",
        likes: 79,
        views: 1410,
        time: "2 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Hạnh (giáo viên tiểu học)",
            text:
              "Con có lẫn một thời gian ngắn ạ, đó là chuyện bình thường và sẽ hết. Mẹo giúp con tách bạch: nói rõ \"bây giờ mình đọc kiểu tiếng Anh nhé\" trước mỗi buổi, và dùng hai màu bút/hai quyển vở khác nhau. Trẻ tách ngôn ngữ theo BỐI CẢNH rất giỏi.",
            time: "2 ngày trước",
            likes: 88,
          },
          {
            author: "Mẹ Su Movers",
            text:
              "Nhà mình học tiếng Anh buổi tối, tiếng Việt buổi chiều. Khác giờ khác chỗ ngồi nên con không lẫn. Lớp 1 con vẫn viết tiếng Việt đẹp bình thường.",
            time: "2 ngày trước",
            likes: 71,
          },
          {
            author: "Ba của Sóc",
            text:
              "Con mình lẫn khoảng một tháng đầu rồi hết hẳn. Ba mẹ đừng lo, chỉ cần đừng sửa gắt lúc con lẫn là được.",
            time: "hôm qua",
            likes: 58,
          },
          {
            author: "Mẹ Bắp 7 tuổi",
            text:
              "Ý dùng hai quyển vở khác màu hay quá ạ. Mình làm luôn hôm nay 💛",
            time: "hôm qua",
            likes: 30,
          },
        ],
      },
      {
        author: "Mẹ Kem 8 tuổi",
        title: "Mỗi ngày nên học bao lâu là đủ với bé 6 tuổi?",
        body:
          "Mình thấy có nhà học 1 tiếng, có nhà 15 phút. Bé 6 tuổi tập trung được bao lâu là hợp lý ạ? Mình không muốn con quá tải nhưng cũng sợ học ít quá không đủ.",
        level: "STARTERS",
        tag: "Thời lượng",
        likes: 72,
        views: 1330,
        time: "3 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Quy tắc dễ nhớ: khả năng tập trung của trẻ khoảng bằng số tuổi cộng thêm vài phút. Bé 6 tuổi thì 10-15 phút là một \"khối\" hợp lý. Muốn học nhiều hơn thì chia 2 khối trong ngày chứ đừng kéo dài một khối.",
            time: "3 ngày trước",
            likes: 87,
          },
          {
            author: "Mẹ Nhím",
            text:
              "Nhà mình chia hai lần: 10 phút sáng trước khi đi học, 10 phút tối. Con không thấy mệt mà tổng thời gian vẫn đủ.",
            time: "3 ngày trước",
            likes: 64,
          },
          {
            author: "Bố Tít",
            text:
              "Mình để ý dấu hiệu con hết tập trung: bắt đầu ngọ nguậy, hỏi \"còn bao lâu nữa\". Thấy vậy là dừng ngay, dừng đúng lúc thì hôm sau con vẫn muốn học.",
            time: "2 ngày trước",
            likes: 76,
          },
        ],
      },
      {
        author: "an_nguyen",
        title: "Cho con dùng máy tính bảng để học — kiểm soát thời gian sao ạ?",
        body:
          "Con mình học trên máy tính bảng khá hiệu quả nhưng hay xin thêm giờ rồi chuyển sang xem video khác. Ba mẹ có cách nào đặt giới hạn mà con không cãi không ạ?",
        level: "",
        tag: "Thiết bị",
        likes: 68,
        views: 1250,
        time: "4 ngày trước",
        solved: true,
        hot: false,
        replies: [
          {
            author: "Mẹ Su Movers",
            text:
              "Nhà mình dùng đồng hồ cát để bàn thay vì đồng hồ điện tử. Con NHÌN THẤY thời gian đang trôi nên tới lúc hết cát con tự dừng, không phải mẹ nhắc.",
            time: "4 ngày trước",
            likes: 82,
          },
          {
            author: "Thầy Nam Phonics",
            text:
              "Bổ sung: nên quy ước trước khi bật máy chứ đừng thương lượng lúc đang dùng. Câu \"con học xong hai bài rồi mình tắt nhé\" nói TRƯỚC thì con đồng ý dễ, nói giữa chừng thì con sẽ mặc cả.",
            time: "4 ngày trước",
            likes: 79,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Nhà mình để máy ở phòng khách, không mang vào phòng riêng. Ngồi chỗ chung thì con tự giác hơn hẳn.",
            time: "3 ngày trước",
            likes: 61,
          },
          {
            author: "an_nguyen",
            text:
              "Đồng hồ cát đúng là mẹo hay ạ, mình mua ngay. Cảm ơn cả nhà 🙏",
            time: "3 ngày trước",
            likes: 29,
          },
        ],
      },
      {
        author: "Trần Thu Hằng",
        title: "Ba mẹ không biết tiếng Anh thì đồng hành với con kiểu gì ạ?",
        body:
          "Vợ chồng mình đều không biết tiếng Anh. Mình rất muốn học cùng con nhưng không biết bắt đầu từ đâu, sợ dạy sai lại hại con. Ba mẹ nào cùng hoàn cảnh chia sẻ giúp mình với.",
        level: "",
        tag: "Ba mẹ đồng hành",
        likes: 132,
        views: 2360,
        time: "5 ngày trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Ngọc dạy kèm",
            text:
              "Ba mẹ không cần biết tiếng Anh để đồng hành ạ. Ba việc quan trọng nhất mà ai cũng làm được: (1) giữ giờ học đều đặn, (2) ngồi cạnh và tỏ ra hào hứng, (3) hỏi con \"hôm nay con học được từ gì, dạy mẹ với\". Việc thứ ba là mạnh nhất — con dạy lại là con nhớ gấp đôi.",
            time: "5 ngày trước",
            likes: 128,
          },
          {
            author: "Mẹ Bún 5 tuổi",
            text:
              "Mình cũng không biết tiếng Anh. Mình chỉ bật audio rồi hai mẹ con cùng nghe, cùng bắt chước. Con thấy mẹ cũng vụng về nên con không sợ sai nữa.",
            time: "5 ngày trước",
            likes: 94,
          },
          {
            author: "Ba của Sóc",
            text:
              "Mình học lại từ đầu cùng con luôn. Giờ hai bố con cùng cấp độ, thi đua với nhau. Con thích lắm vì thỉnh thoảng con thắng bố 😄",
            time: "4 ngày trước",
            likes: 87,
          },
          {
            author: "Trần Thu Hằng",
            text:
              "Ý \"con dạy lại mẹ\" hay quá ạ. Tối nay mình thử ngay, cảm ơn cả nhà rất nhiều 💛",
            time: "4 ngày trước",
            likes: 46,
          },
        ],
      },
      {
        author: "Mẹ Bo lớp 4",
        title: "Bé trai 9 tuổi không thích học tiếng Anh, chỉ mê game — ai gỡ giúp mình với",
        body:
          "Con mình 9 tuổi, học tiếng Anh thì uể oải nhưng chơi game thì cả buổi không chán. Mình cấm game thì con giận, không cấm thì con không học. Ba mẹ có cách nào dung hoà không ạ?",
        level: "MOVERS",
        tag: "Bé không thích học",
        likes: 116,
        views: 2080,
        time: "6 ngày trước",
        solved: true,
        hot: true,
        replies: [
          {
            author: "Cô Trang trợ giảng",
            text:
              "Thay vì tách game khỏi tiếng Anh, mình gợi ý ghép chúng lại: cho con chơi game bằng giao diện tiếng Anh, và đọc hướng dẫn/nhiệm vụ bằng tiếng Anh. Rất nhiều bạn 9 tuổi học từ vựng nhanh nhất qua đúng con đường này vì con CẦN hiểu để chơi giỏi hơn.",
            time: "6 ngày trước",
            likes: 121,
          },
          {
            author: "Bố Tít",
            text:
              "Nhà mình làm y vậy. Con còn tự tra từ để hiểu nhiệm vụ, chẳng cần ai nhắc. Từ vựng game hơi lệch chuẩn học đường một chút nhưng con có động lực là quý rồi.",
            time: "6 ngày trước",
            likes: 89,
          },
          {
            author: "Mẹ Xu 8 tuổi",
            text:
              "Mình cho con xem video hướng dẫn chơi game bằng tiếng Anh. Con nghe say sưa 30 phút không chớp mắt, trong khi bài nghe ở lớp thì 5 phút đã chán 😅",
            time: "5 ngày trước",
            likes: 76,
          },
          {
            author: "Mẹ Bo lớp 4",
            text:
              "Mình vừa đổi giao diện game sang tiếng Anh, con không phản đối gì mà còn thấy oai. Cảm ơn cô Ngọc và cả nhà ạ 🎉",
            time: "5 ngày trước",
            likes: 58,
          },
        ],
      },
    ],
  },
];
