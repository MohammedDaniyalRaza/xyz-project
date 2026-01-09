(function () {
  "use strict";

  var CREDS_KEY = "ryana_creds";
  var AUTH_KEY = "ryana_auth";
  var USER_KEY = "ryana_user";

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getCreds() {
    var raw = localStorage.getItem(CREDS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        // ignore
      }
    }

    // Random credentials for demo.
    var code = randomInt(1000, 9999);
    var creds = {
      email: "user" + code + "@ryana.com",
      password: "RC-" + code
    };

    localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
    return creds;
  }

  function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === "true";
  }

  function login(email, password) {
    var e = String(email || "").trim();
    var p = String(password || "").trim();
    var ok = e.length > 0 && p.length > 0;
    if (ok) {
      localStorage.setItem(AUTH_KEY, "true");
      try {
        localStorage.setItem(USER_KEY, JSON.stringify({ email: e }));
      } catch (err) {
        // ignore
      }
    }
    return ok;
  }

  function logout() {
    localStorage.setItem(AUTH_KEY, "false");
    try {
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      // ignore
    }
  }

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function requireAuth(redirectTo) {
    if (isLoggedIn()) return;

    var base = window.RyanaUI && window.RyanaUI.basePath ? window.RyanaUI.basePath() : "";
    var target = redirectTo || (window.location.pathname.split("/").pop() || "account.html");
    window.location.href = base + "pages/login.html?redirect=" + encodeURIComponent(target);
  }

  window.RyanaAuth = {
    getCreds: getCreds,
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    getUser: getUser,
    requireAuth: requireAuth
  };
})();
