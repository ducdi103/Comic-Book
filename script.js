// ================= PHẦN DỮ LIỆU TRUYỆN MỚI =================
// Cấu trúc lại toàn bộ dữ liệu để phân theo từng thể loại
// Mỗi thể loại có 10 truyện với nội dung mẫu
const allStoriesData = {
  "co-tich": {},
  "kinh-di": {},
  "kiem-hiep": {},
  "anime": {}
};

// Tự động tạo 10 truyện cho mỗi thể loại
for (var genre in allStoriesData) {
  var genreName = "";
  if (genre === 'co-tich') genreName = "Cổ Tích";
  if (genre === 'kinh-di') genreName = "Kinh Dị";
  if (genre === 'kiem-hiep') genreName = "Kiếm Hiệp";
  if (genre === 'anime') genreName = "Anime";

  for (var i = 1; i <= 10; i++) {
    var storyId = genre + "-" + i;
    allStoriesData[genre][storyId] = {
      title: "Truyện " + genreName + " " + i,
      content: ["Điền nội dung vào đây"]
    };
  }
}
// ================= KẾT THÚC PHẦN DỮ LIỆU =================


var currentGenre = ""; // MỚI: Biến để lưu thể loại đang chọn
var currentStory = [];
var currentStoryId = "";
var currentPage = 0;

// DARK MODE (Không đổi)
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

// SỬA: Cập nhật logic load truyện để tương thích với cấu trúc mới
window.addEventListener("load", function () {
  var theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.id = "dark-mode";
  }

  var last = JSON.parse(localStorage.getItem("lastStory"));
  // Kiểm tra xem dữ liệu lưu có hợp lệ không
  if (last && last.genre && last.id && allStoriesData[last.genre] && allStoriesData[last.genre][last.id]) {
    currentGenre = last.genre; // Phục hồi thể loại
    showStory(last.id);
    currentPage = last.page;
    updateStoryPage();
  } else {
    goHome();
  }
});

// MỚI: Hàm để tạo danh sách truyện dựa trên thể loại
function populateStoryList(genre) {
  var container = document.getElementById("story-list-container");
  container.innerHTML = ""; // Xóa danh sách truyện cũ
  var stories = allStoriesData[genre];

  // Lặp qua các truyện trong thể loại và tạo element
  for (var storyId in stories) {
    var storyData = stories[storyId];
    var storyDiv = document.createElement("div");
    storyDiv.className = "story";
    storyDiv.setAttribute("data-id", storyId);
    storyDiv.innerText = storyData.title;

    storyDiv.onclick = function() {
      showStory(this.getAttribute("data-id"));
    };
    container.appendChild(storyDiv);
  }
}

// SỬA: Cập nhật hàm showStory để tìm truyện trong thể loại hiện tại
function showStory(id) {
  if (currentGenre && allStoriesData[currentGenre] && allStoriesData[currentGenre][id]) {
    var storyData = allStoriesData[currentGenre][id];
    currentStory = storyData.content;
    currentStoryId = id;
    currentPage = 0;

    document.getElementById("story-title").textContent = storyData.title;
    document.getElementById("genre-list").style.display = "none";
    document.getElementById("story-list").style.display = "none";
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
  currentGenre = ""; // Reset thể loại khi về home
  document.getElementById("genre-list").style.display = "block";
  document.getElementById("story-list").style.display = "none";
  document.getElementById("story-reader").style.display = "none";
}

// SỬA: Quay lại danh sách truyện của thể loại hiện tại
function goBackToList() {
  document.getElementById("story-reader").style.display = "none";
  document.getElementById("story-list").style.display = "block";
}

// SỬA: Gán sự kiện click cho TẤT CẢ các thể loại
document.querySelectorAll(".genre").forEach(function (el) {
  el.onclick = function () {
    currentGenre = el.getAttribute("data-genre"); // Lấy mã thể loại
    populateStoryList(currentGenre); // Tạo danh sách truyện cho thể loại đó
    // Cập nhật tiêu đề
    document.getElementById("story-list-title").innerText = "📖 " + el.innerText;
    // Chuyển màn hình
    document.getElementById("genre-list").style.display = "none";
    document.getElementById("story-list").style.display = "block";
  };
});

// Các hàm còn lại giữ nguyên
document.getElementById("font-select").onchange = function () {
  document.getElementById("story-content").style.fontFamily = this.value;
};

document.getElementById("font-size").onchange = function () {
  document.getElementById("story-content").style.fontSize = this.value;
};

// SỬA: Cập nhật logic lưu để thêm cả thể loại
window.addEventListener("beforeunload", function () {
  if (currentStoryId && currentGenre) {
    localStorage.setItem("lastStory", JSON.stringify({
      genre: currentGenre,
      id: currentStoryId,
      page: currentPage
    }));
  }
});

// Chức năng tìm kiếm vẫn hoạt động
document.getElementById("search-box").addEventListener("input", function () {
  var query = this.value.toLowerCase();
  var stories = document.querySelectorAll("#story-list-container .story");
  stories.forEach(function (s) {
    s.style.display = s.textContent.toLowerCase().includes(query) ? "block" : "none";
  });
});