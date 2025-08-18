var currentStory = [];
var currentStoryId = "";
var currentPage = 0;

// 📚 Dữ liệu nhiều truyện
var truyenData = {
  tamcam: [ /* 11 đoạn truyện Tấm Cám */ ],
  caytre: [ /* 8 đoạn truyện Cây Tre Trăm Đốt */ ]
};

function showStory(id) {
  if (truyenData[id]) {
    currentStory = truyenData[id];
    currentStoryId = id;
    currentPage = 0;

    var titleMap = {
      tamcam: "👑 Tấm Cám",
      caytre: "🎋 Cây Tre Trăm Đốt"
    };

    document.getElementById("story-title").textContent = titleMap[id] || "📖 Truyện";
    document.getElementById("story-list").style.display = "none";
    document.getElementById("genre-list").style.display = "none";
    document.getElementById("story-reader").style.display = "block";
    updateStoryPage();
  }
}

function updateStoryPage() {
  document.getElementById("story-content").innerText = currentStory[currentPage];
}

function nextPage() {
  if (currentPage < currentStory.length - 1) {
    currentPage++;
    updateStoryPage();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updateStoryPage();
  }
}

function goHome() {
  document.getElementById("genre-list").style.display = "block";
  document.getElementById("story-list").style.display = "none";
  document.getElementById("story-reader").style.display = "none";
}

function goBackToList() {
  document.getElementById("story-reader").style.display = "none";
  document.getElementById("story-list").style.display = "block";
}

document.querySelector(".genre[data-genre='co-tich']").onclick = function () {
  document.getElementById("genre-list").style.display = "none";
  document.getElementById("story-list").style.display = "block";
};

document.querySelectorAll(".story").forEach(function (el) {
  el.onclick = function () {
    showStory(el.getAttribute("data-id"));
  };
});

document.getElementById("font-select").onchange = function () {
  document.getElementById("story-content").style.fontFamily = this.value;
};

document.getElementById("font-size").onchange = function () {
  document.getElementById("story-content").style.fontSize = this.value;
};

window.addEventListener("beforeunload", function () {
  localStorage.setItem("lastStory", JSON.stringify({ id: currentStoryId, page: currentPage }));
});

window.addEventListener("load", function () {
  var last = JSON.parse(localStorage.getItem("lastStory"));
  if (last) {
    showStory(last.id);
    currentPage = last.page;
    updateStoryPage();
  } else {
    goHome();
  }
});

document.getElementById("search-box").addEventListener("input", function () {
  var query = this.value.toLowerCase();
  var stories = document.querySelectorAll(".story");
  stories.forEach(function (s) {
    s.style.display = s.textContent.toLowerCase().includes(query) ? "block" : "none";
  });
});

var truyenData = {
  tamcam: [
    "Ngày xửa ngày xưa, có một người tên là Tấm, mồ côi mẹ từ nhỏ, sống với cha. Về sau cha cô lấy vợ kế, người này cũng có một con gái riêng tên là Cám. Khi cha mất, Tấm phải sống với mẹ kế và Cám. Họ bắt Tấm làm việc nặng nhọc từ sáng tới tối, không khác gì người hầu. Dù vậy, Tấm vẫn hiền lành, chịu khó và không oán than.",
    "Một hôm mẹ kế đưa cho hai chị em mỗi người một cái giỏ, bảo ra đồng bắt tép, ai bắt được nhiều hơn sẽ được thưởng. Tấm chăm chỉ bắt suốt từ sáng đến chiều, giỏ đã đầy ắp tép. Còn Cám thì rong chơi, chẳng bắt được bao nhiêu. Khi trời sắp tối, Cám lừa Tấm xuống ao tắm, nhân lúc đó đổ hết tép trong giỏ Tấm sang giỏ mình rồi về nhà nhận thưởng.",
    "Tấm lên bờ thì giỏ rỗng không, chỉ còn sót lại một con cá bống. Tấm mang bống về nuôi trong chum nước, mỗi ngày đều gọi: 'Bống ơi bống à, lên ăn cơm vàng cơm bạc nhà ta, chớ ăn cơm hẩm cháo hoa nhà người'. Con bống ngày càng lớn, trở thành người bạn duy nhất của Tấm giữa cuộc sống cô đơn và vất vả.",
    "Nhưng mẹ kế và Cám theo dõi được, liền bắt cá bống làm thịt. Khi Tấm đi gọi bống không thấy lên, cô buồn khóc nức nở. Ông Bụt hiện ra, bảo Tấm nhặt xương bống bỏ vào lọ rồi chôn dưới gốc cau. Tấm nghe lời, làm đúng như ông Bụt dặn. Từ đó, mỗi khi gặp khó khăn, ông Bụt lại hiện ra giúp cô vượt qua.",
    "Gần ngày hội lớn trong làng, ai cũng được đi trảy hội. Mẹ kế bày cho Tấm một đống thóc lẫn gạo, bắt nhặt xong mới được đi. Tấm khóc, ông Bụt lại hiện lên gọi chim sẻ xuống nhặt giúp cô. Rồi từ chỗ chôn xương bống, Tấm đào lên thì thấy quần áo đẹp, hài thêu óng ánh. Tấm thay đồ đẹp, lên đường đi hội.",
    "Trên đường đi, Tấm đánh rơi một chiếc hài xuống suối. Nhà vua mở hội kén vợ, tình cờ nhìn thấy chiếc hài, sai người truyền rao khắp nơi để tìm người vừa chân. Ai thử cũng không vừa. Khi Tấm đi đến, chiếc hài vừa như in. Nhà vua đem lòng yêu mến vẻ đẹp và đức hạnh của nàng, lập Tấm làm hoàng hậu.",
    "Từ ngày Tấm làm hoàng hậu, mẹ con Cám ngày đêm ghen tức. Một hôm, nhà vua đi vắng, mẹ kế gọi Tấm về giỗ cha, lừa nàng trèo cau, rồi đốn gốc làm Tấm rơi xuống ao chết. Sau đó, Cám được đưa vào cung thay thế. Nhưng linh hồn của Tấm không tan biến mà hóa thân liên tục để trở lại tìm lại công bằng.",
    "Tấm hóa thân thành chim vàng anh, bay quanh cung vua, luôn ở bên vua. Nhưng mẹ con Cám bắt giết chim làm thịt. Từ đống lông chim, mọc lên cây xoan đào. Cám sai người chặt cây làm khung cửi thì khung cửi lại cất tiếng mắng. Họ đem đốt, lấy tro rải ra đường. Từ đống tro, mọc lên một cây thị lớn.",
    "Một bà lão hái được quả thị thơm, đem về nâng niu. Quả thị nứt ra, Tấm bước ra, trở lại hình hài người. Bà lão thương yêu và chăm sóc Tấm như con gái. Một lần vua đi ngang qua, thấy mùi thị quen thuộc, ghé vào, gặp lại Tấm. Hai người đoàn tụ trong nước mắt. Tấm trở lại cung làm hoàng hậu.",
    "Tấm nay đã khôn ngoan, hiểu rõ mưu mô độc ác của mẹ con Cám. Một hôm Tấm dặn Cám tắm nước sôi để trắng đẹp như mình. Cám nghe theo và chết trong nồi nước. Mẹ kế biết chuyện, đau đớn mà chết theo. Từ đó, Tấm sống hạnh phúc bên vua và trị vì đất nước một cách hiền đức và nhân từ.",
    "Câu chuyện Tấm Cám không chỉ là cổ tích, mà còn là bài học về sự thiện lương, kiên trì và công bằng. Tấm dù chịu nhiều oan ức nhưng vẫn được đền đáp. Kẻ ác cuối cùng bị trừng trị thích đáng. Người đọc rút ra bài học rằng ở hiền thì gặp lành, ác giả thì ác báo, lưới trời lồng lộng, tuy thưa mà khó lọt."
  ],
  caytre: [
    "Ngày xưa, có một người nông dân hiền lành, chăm chỉ làm thuê cho một phú ông giàu có. Anh làm việc quần quật từ sáng đến tối, không nề hà bất cứ công việc nào, từ cuốc đất, cày ruộng đến chăn trâu, hái củi. Phú ông thấy anh khỏe mạnh, thật thà, nên tìm cách lợi dụng, không trả công xứng đáng mà cứ hứa hẹn bằng lời nói suông.",
    "Một ngày nọ, phú ông thấy anh đã làm cho mình ba năm trời không ngơi nghỉ thì nói: “Nếu anh làm hết năm nay, ta sẽ gả con gái cho và cho ruộng đất nữa”. Người nông dân nghe vậy rất vui mừng, càng làm siêng năng hơn, mong đến ngày được cưới vợ và có cuộc sống sung túc hơn. Nhưng phú ông lại có âm mưu khác.",
    "Phú ông không muốn gả con cho anh nông dân nghèo khổ. Khi đến cuối năm, thấy anh sắp xếp đồ đạc chờ cưới, phú ông giả vờ sai anh vào rừng tìm cho được cây tre trăm đốt làm sính lễ. Phú ông nghĩ anh sẽ không tìm ra được cây tre như thế và sẽ có cớ để gạt lời hứa mà không bị mang tiếng.",
    "Người nông dân không nghi ngờ, mang rìu và giỏ lên rừng. Anh đi sâu vào rừng rậm, tìm mãi không thấy cây tre nào có trăm đốt. Có cây dài thì không nhiều đốt, có cây nhiều đốt thì không thẳng. Anh mệt lả, nằm vật ra đất, nước mắt trào ra vì tuyệt vọng. Bỗng nhiên, một ông Bụt hiện ra trước mặt anh.",
    "Ông Bụt hỏi: “Con làm sao mà khóc?”, anh kể lại mọi chuyện. Ông Bụt cười hiền từ: “Phú ông định gạt con, nhưng ta sẽ giúp con. Hãy chặt đủ 100 đốt tre rải rác trong rừng, xếp lại, rồi đọc câu thần chú: ‘Khắc nhập! Khắc nhập!’”. Anh làm theo lời dặn, các đốt tre tự động liền lại thành một cây tre dài.",
    "Ông Bụt lại dặn: “Khi muốn tách các đốt ra, con đọc ‘Khắc xuất! Khắc xuất!’. Cây tre sẽ rời từng khúc như cũ.” Nói rồi, ông Bụt biến mất. Anh nông dân mừng rỡ vác cây tre trăm đốt về nhà phú ông. Đến nơi, anh thấy phú ông đang làm lễ cưới gả con gái cho một tên nhà giàu khác.",
    "Anh nông dân bước vào giữa đám cưới, giận dữ nói: “Phú ông đã hứa gả con gái cho tôi nếu tôi tìm được cây tre trăm đốt. Đây, tôi đã mang về rồi!”. Phú ông cười khẩy: “Làm gì có tre trăm đốt, đừng ngông cuồng!”. Anh lập tức đọc: “Khắc nhập! Khắc nhập!”. Cây tre bay đến và nhập lại thật dài.",
    "Cây tre dài vút, bay tới dính vào người phú ông, nhà giàu và những người lừa gạt. Ai dính vào là dính luôn, không thoát được. Cả đám hoảng loạn, la hét, không ai gỡ ra được. Phú ông hốt hoảng van xin: “Làm ơn, làm ơn tách nó ra, ta xin cưới con gái cho anh!”. Anh đọc: “Khắc xuất! Khắc xuất!”."
  ]
};
