/* ES5 compatible, cho IE Mobile (Windows Phone 8) */

/* ====== Theme ====== */
(function () {
  var THEME_KEY = "theme";

  function applyThemeFromStorage() {
    try {
      var t = window.localStorage.getItem(THEME_KEY);
      if (t === "dark") {
        document.body.id = "dark-mode";
      } else {
        document.body.id = "";
      }
    } catch (e) { /* bỏ qua */ }
    syncDarkButtonLabel();
  }

  function syncDarkButtonLabel() {
    var btn = document.getElementById("toggle-dark");
    if (!btn) return;
    var isDark = document.body.id === "dark-mode";
    btn.innerHTML = isDark ? "☀️ Light" : "🌙 Dark";
  }

  function toggleDarkMode() {
    if (document.body.id === "dark-mode") {
      document.body.id = "";
      try { window.localStorage.setItem(THEME_KEY, "light"); } catch (e) {}
    } else {
      document.body.id = "dark-mode";
      try { window.localStorage.setItem(THEME_KEY, "dark"); } catch (e) {}
    }
    syncDarkButtonLabel();
  }

  // Expose
  window.__initTheme = function () {
    applyThemeFromStorage();
    var btn = document.getElementById("toggle-dark");
    if (btn) {
      if (btn.addEventListener) {
        btn.addEventListener("click", toggleDarkMode, false);
      } else {
        btn.onclick = toggleDarkMode;
      }
    }
  };
})();

/* ====== Helpers dùng chung ====== */
function $(id) { return document.getElementById(id); }

function goHome() {
  window.location.href = "index.html";
}

/* ====== Lưu/đọc JSON localStorage an toàn (ES5) ====== */
function readJSON(key, fallback) {
  try {
    var raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) { return fallback; }
}
function writeJSON(key, obj) {
  try {
    window.localStorage.setItem(key, JSON.stringify(obj));
  } catch (e) {}
}
