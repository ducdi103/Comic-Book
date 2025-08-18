// ================= PHẦN DỮ LIỆU TRUYỆN MỚI =================
const allStoriesData = {
  "co-tich": {},
  "kinh-di": {},
  "kiem-hiep": {},
  "anime": {}
};

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


var currentGenre = ""; 
var currentStory = [];
var currentStoryId = "";
var currentPage = 0;
// Biến mới để kiểm tra xem người dùng có đang trong giao diện đọc truyện không
var isReading = false; 

// DARK MODE
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

window.addEventListener("load", function () {
  var theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.id = "dark-mode";
  }

  var last = JSON.parse(localStorage.getItem("lastStory"));
  // Chỉ mở lại truyện nếu có dữ liệu hợp lệ
  if (last && last.genre && last.id && allStoriesData[last.genre] && allStoriesData[last.genre][last.id]) {
    currentGenre = last.genre;
    populateStoryList(currentGenre);
    showStory(last.id, last.page); // Truyền cả số trang vào
  } else {
    // Mặc định hiển thị danh sách thể loại
    localStorage.removeItem("lastStory"); // Xóa dữ liệu cũ nếu không hợp lệ
    showGenreList();
  }
});

function showGenreList() {
    document.getElementById("genre-list").style.display = "block";
    document.getElementById("story-list").style.display = "none";
    document.getElementById("story-reader").style.display = "none";
}

function populateStoryList(genre) {
  var container = document.getElementById("story-list-container");
  container.innerHTML = ""; 
  var stories = allStoriesData[genre];

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

function showStory(id, page = 0) {
  if (currentGenre && allStoriesData[currentGenre] && allStoriesData[currentGenre][id]) {
    isReading = true; // Bắt đầu đọc
    var storyData = allStoriesData[currentGenre][id];
    currentStory = storyData.content;
    currentStoryId = id;
    currentPage = page;

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

// ========== CÁC HÀM ĐIỀU HƯỚNG ĐÃ SỬA ==========
function goHome() {
  isReading = false; // Dừng đọc
  window.location.href = 'index.html';
}

function goBackToList() {
  isReading = false; // Dừng đọc
  document.getElementById("story-reader").style.display = "none";
  document.getElementById("story-list").style.display = "block";
}

document.querySelectorAll(".genre").forEach(function (el) {
  el.onclick = function () {
    currentGenre = el.getAttribute("data-genre");
    populateStoryList(currentGenre);
    document.getElementById("story-list-title").innerText = "📖 " + el.innerText;
    document.getElementById("genre-list").style.display = "none";
    document.getElementById("story-list").style.display = "block";
  };
});

document.getElementById("font-select").onchange = function () {
  document.getElementById("story-content").style.fontFamily = this.value;
};

document.getElementById("font-size").onchange = function () {
  document.getElementById("story-content").style.fontSize = this.value;
};

// ========== SỬA LOGIC LƯU TRẠNG THÁI ==========
window.addEventListener("load", function () {
  var theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.id = "dark-mode";
  }

  // KHÔNG tự động mở truyện nữa
  localStorage.removeItem("lastStory");
  showGenreList();
});


document.querySelectorAll(".genre").forEach(function (el) {
  el.onclick = function () {
    currentGenre = el.getAttribute("data-genre");
    populateStoryList(currentGenre);
    document.getElementById("story-list-title").innerText = "📖 " + el.innerText;
    document.getElementById("genre-list").style.display = "none";
    document.getElementById("story-list").style.display = "block";
  };
});
