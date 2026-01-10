(function () {
  "use strict";

  var STORAGE_KEY = "RasaGrid_theme";

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);

    var label = theme === "dark" ? "Dark" : "Light";
    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) btn.setAttribute("aria-label", "Theme: " + label + ". Toggle theme");
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  function initTheme() {
    var saved = getSavedTheme();
    applyTheme(saved === "dark" ? "dark" : "light");

    document.addEventListener("click", function (e) {
      var target = e.target;
      var btn = target && target.closest ? target.closest("[data-theme-toggle]") : null;
      if (!btn) return;
      toggleTheme();
    });
  }

  window.RasaGridTheme = {
    applyTheme: applyTheme,
    toggleTheme: toggleTheme
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }
})();
