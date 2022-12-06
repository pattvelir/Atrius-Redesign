const Cookie = {
  set: function (name, value, days) {
    var domain, domainParts, date, expires, host;

    if (days) {
      date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }

    host = location.host;
    if (host.split(".").length === 1) {
      document.cookie = name + "=" + value + expires + "; path=/";
    } else {
      domainParts = host.split(".");
      domainParts.shift();
      domain = "." + domainParts.join(".");

      document.cookie =
        name + "=" + value + expires + "; path=/; domain=" + domain;

      // check if cookie was successfuly set to the given domain
      // (otherwise it was a Top-Level Domain)
      if (Cookie.get(name) == null || Cookie.get(name) != value) {
        // append "." to current domain
        domain = "." + host;
        document.cookie =
          name + "=" + value + expires + "; path=/; domain=" + domain;
      }
    }
  },

  get: function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  erase: function (name) {
    Cookie.set(name, "", -1);
  },
};

export function googleTranslateElementInit() {
  let url = new URL(window.location);
  let lang = url.searchParams.get("lang");
  if (lang) {
    console.log(lang);
    Cookies.set("googleTranslate", `/en/${lang}`, { path: "" });
    Cookie.set("googleTranslate", `/en/${lang}`);
    Cookies.set("googleTranslate", `/en/${lang}`, {
      path: "",
      domain: location.host,
    });
  } else {
    Cookie.erase("googleTranslate");
    Cookies.remove("googleTranslate", { path: "" });
  }
  new google.translate.TranslateElement({ pageLanguage: "en" }, "translate");
  // add event listener to change url param on language selection change
  let langSelector = document.querySelector(".goog-te-combo");
  langSelector.addEventListener("change", function () {
    let lang = langSelector.value;
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?lang=" +
      lang;
    window.history.pushState({ path: newurl }, "", newurl);
  });
}
export default (function () {
  Cookie.erase("googleTranslate");
  var googleTranslateScript = document.createElement("script");
  googleTranslateScript.type = "text/javascript";
  googleTranslateScript.async = true;
  googleTranslateScript.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  (
    document.getElementsByTagName("head")[0] ||
    document.getElementsByTagName("body")[0]
  ).appendChild(googleTranslateScript);
})();
