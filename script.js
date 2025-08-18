// ====== PHẦN SỬA LỖI ======
// Bổ sung dữ liệu truyện bị thiếu. Đây là nguyên nhân chính gây ra lỗi.
const truyenData = {
  "tamcam": [
    "Trang 1: Ngày xửa ngày xưa, ở một ngôi làng nọ, có hai chị em cùng cha khác mẹ tên là Tấm và Cám. Tấm là con vợ cả, Cám là con vợ lẽ. Mẹ Tấm mất sớm, sau đó không lâu cha Tấm cũng qua đời, Tấm phải ở với dì ghẻ là mẹ của Cám.",
    "Trang 2: Dì ghẻ là một người rất cay nghiệt. Hàng ngày, bà ta bắt Tấm phải làm lụng vất vả đủ mọi việc, từ chăn trâu, gánh nước đến xay lúa, giã gạo, trong khi Cám thì được mẹ nuông chiều, không phải động tay vào bất cứ việc gì.",
    "Trang 3: Một hôm, bà dì ghẻ đưa cho hai chị em mỗi người một cái giỏ và bảo: 'Hai con ra đồng bắt tôm, bắt tép, đứa nào bắt được đầy giỏ thì về ta thưởng cho một cái yếm đỏ'.",
    "Trang 4: Tấm vốn chăm chỉ, siêng năng nên chẳng mấy chốc đã bắt được đầy giỏ cả tôm lẫn tép. Còn Cám mải chơi nên đến chiều giỏ vẫn trống không. Thấy vậy, Cám lừa Tấm đi gội đầu ở xa để trút hết tôm tép của Tấm vào giỏ của mình rồi chạy về nhà trước.",
    "Trang 5: Khi Tấm nhận ra mình bị lừa, trong giỏ chỉ còn lại một con cá bống. Tấm ôm mặt khóc nức nở. Bỗng nhiên, Bụt hiện lên hỏi Tấm vì sao lại khóc. Sau khi nghe Tấm kể lại mọi chuyện, Bụt bảo Tấm hãy mang con cá bống về nuôi trong giếng."
  ],
  "caytre": [
    "Trang 1: Ngày xưa, có một anh nông dân tên là Khoai, anh rất hiền lành và chăm chỉ. Anh phải đi ở cho một lão phú hộ giàu có nhưng keo kiệt.",
    "Trang 2: Lão phú hộ có một cô con gái xinh đẹp. Lão hứa với anh Khoai: 'Con cứ chịu khó làm lụng cho ta ba năm, ta sẽ gả con gái cho'. Anh Khoai tin lời, ra sức làm việc không quản ngày đêm.",
    "Trang 3: Khi đã đủ ba năm, anh Khoai đến gặp phú hộ để nhắc lại lời hứa. Lão phú hộ không muốn gả con gái cho một người nghèo như anh nên đã tìm cách đánh lừa. Lão bảo: 'Con hãy vào rừng tìm cho ta một cây tre có đủ một trăm đốt, ta sẽ giữ lời hứa'.",
    "Trang 4: Anh Khoai lại tin lời, vác dao vào rừng sâu. Anh đi mãi, tìm mãi nhưng cũng chỉ thấy những cây tre cao nhất, dài nhất cũng chỉ có vài chục đốt. Buồn bã và tuyệt vọng, anh ngồi xuống gốc cây và khóc.",
    "Trang 5: Bụt lại hiện lên và hỏi vì sao anh khóc. Sau khi nghe anh kể, Bụt bảo: 'Con hãy đi chặt đủ một trăm đốt tre rồi mang lại đây'. Anh làm theo lời Bụt. Khi đã có đủ một trăm đốt tre, Bụt dạy anh câu thần chú: 'Khắc nhập, khắc nhập'.",
    "Trang 6: Anh Khoai đọc câu thần chú, lạ thay, các đốt tre tự nhiên dính vào nhau thành một cây tre dài một trăm đốt. Nhưng cây tre quá dài, làm sao mang về được. Bụt lại dạy anh câu thần chú thứ hai: 'Khắc xuất, khắc xuất'. Anh đọc xong, các đốt tre lại rời ra như cũ. Anh vui mừng bó tre lại và gánh về."
  ]
};
// ====== KẾT THÚC PHẦN SỬA LỖI ======


var currentStory = [];
var currentStoryId = "";
var currentPage = 0;

// DARK MODE tương thích Lumia
document.getElementById("toggle-dark").onclick = function () {
  var body = document.body;
  if (body.id === "dark-mode") {
    body.id = "";
    localStorage.setItem("theme", "light");
  } else {
    body.id = "dark-mode";
    localStorage.setItem("theme", "dark");
  }
};

// Truyện đã lưu + Theme khi load
window.addEventListener("load", function () {
  var theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.id = "dark-mode";
  }

  var last = JSON.parse(localStorage.getItem("lastStory"));
  if (last && truyenData[last.id]) { // Thêm kiểm tra để tránh lỗi nếu truyện không tồn tại
    showStory(last.id);
    currentPage = last.page;
    updateStoryPage();
  } else {
    goHome();
  }
});

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
  if (currentStoryId) { // Chỉ lưu nếu đang trong một truyện
      localStorage.setItem("lastStory", JSON.stringify({ id: currentStoryId, page: currentPage }));
  }
});

document.getElementById("search-box").addEventListener("input", function () {
  var query = this.value.toLowerCase();
  var stories = document.querySelectorAll(".story");
  stories.forEach(function (s) {
    s.style.display = s.textContent.toLowerCase().includes(query) ? "block" : "none";
  });
});