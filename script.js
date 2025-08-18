const darkToggle = document.getElementById('toggle-dark');
darkToggle.onclick = () => {
  document.body.classList.toggle('dark');
};

function goHome() {
  document.getElementById('genre-list').style.display = 'block';
  document.getElementById('story-list').style.display = 'none';
  document.getElementById('story-reader').style.display = 'none';
}

function showStoryList(genre) {
  document.getElementById('genre-list').style.display = 'none';
  document.getElementById('story-list').style.display = 'block';
  document.getElementById('story-reader').style.display = 'none';
}

let currentStory = [];
let currentPage = 0;

function showStory(id) {
  if (id === 'tamcam') {
    currentStory = [
      'Ngày xửa ngày xưa, có hai chị em cùng cha khác mẹ, người chị tên là Tấm, hiền lành chăm chỉ, còn Cám thì lười biếng và hay ganh ghét.',
      'Một hôm mẹ kế sai hai chị em đi bắt tép, ai bắt được nhiều sẽ được thưởng. Tấm chăm chỉ nên bắt được đầy giỏ, còn Cám thì rong chơi khắp nơi.',
      'Khi về, Cám lừa Tấm xuống tắm rồi đổ hết tép vào giỏ của mình mang về. Tấm không còn gì, chỉ giữ lại được một con cá bống nhỏ.',
      'Tấm nuôi cá bống và coi nó như người bạn thân. Hàng ngày Tấm đều mang cơm cho bống ăn với câu: "Bống ơi bống à, lên ăn cơm vàng cơm bạc nhà ta..."',
      'Mẹ kế biết chuyện liền bắt bống làm thịt. Tấm về không thấy bống, buồn bã khóc lóc. Một ông bụt hiện ra bảo Tấm gom xương bống bỏ vào lọ và chôn xuống gốc cây.',
      'Từ đó, mỗi khi gặp khó khăn, ông bụt đều hiện ra giúp Tấm vượt qua, kể cả khi đi trảy hội, Tấm được giúp có quần áo đẹp và giày quý để đến gặp vua...'
    ];
    currentPage = 0;
    document.getElementById('story-title').textContent = '👑 Tấm Cám';
    document.getElementById('story-list').style.display = 'none';
    document.getElementById('genre-list').style.display = 'none';
    document.getElementById('story-reader').style.display = 'block';
    updateStoryPage();
  }
}

function updateStoryPage() {
  document.getElementById('story-content').innerText = currentStory[currentPage];
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

function goBackToList() {
  document.getElementById('story-reader').style.display = 'none';
  document.getElementById('story-list').style.display = 'block';
}

goHome();