import _ from "lodash";
import $ from "jquery";

const PrivacyModal = (el) => {
  const $el = $(el);
  const $acceptBtn = $el.find(".js-accept-cookies");
  const $closeBtn = $el.find(".js-close-banner");
  const handleResize = _.throttle(() => {
    $("body").css({ paddingBottom: $el.outerHeight() });
  }, 150);

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    //exdays from now
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";";
    $el.addClass("is-hidden");
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
  }
  function handlePrivacy(accept) {
    if (accept) {
      //closed ithout accepting
      setCookie("acceptPrivacy", true, 90);
    } else {
      //closed without accepting
      setCookie("acceptPrivacy", true, 1);
    }

    $("body").css({ paddingBottom: 0 });

    $(window).off("resize", handleResize);
  }

  if (!getCookie("acceptPrivacy")) {
    $el.removeClass("is-hidden");
    //focus first link or button - accessibility concern, why is this necessary?
    // [...this.$el.find("a"), ...this.$el.find("button")][0].focus();
    $(window).on("resize", handleResize).resize();
    $acceptBtn.on("click", (event) => handlePrivacy(true));
    $closeBtn.on("click", (event) => handlePrivacy(false));
  } else {
    return false;
  }
};

export default PrivacyModal;
