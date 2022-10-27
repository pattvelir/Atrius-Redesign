import _ from "lodash";
import $ from "jquery";

export class PrivacyModal {
  constructor(el) {
    this.$el = $(el);
    this.$acceptBtn = this.$el.find(".js-accept-cookies");
    this.$closeBtn = this.$el.find(".js-close-banner");
    this.handleResize = throttle(() => {
      $("body").css({ paddingBottom: this.$el.outerHeight() });
    }, 150);
    this.init();
  }

  init() {
    if (!this.getCookie("acceptPrivacy")) {
      this.$el.removeClass("is-hidden");
      //focus first link or button - accessibility concern, why is this necessary?
      // [...this.$el.find("a"), ...this.$el.find("button")][0].focus();
      this.bindEvents();
    } else {
      return false;
    }
  }

  bindEvents() {
    $(window).on("resize", this.handleResize).resize();

    this.$acceptBtn.on("click", (event) => this.handlePrivacy(true));
    this.$closeBtn.on("click", (event) => this.handlePrivacy(false));
  }

  handlePrivacy(accept) {
    if (accept) {
      //closed ithout accepting
      this.setCookie("acceptPrivacy", true, 90);
    } else {
      //closed without accepting
      this.setCookie("acceptPrivacy", true, 1);
    }

    $("body").css({ paddingBottom: 0 });

    $(window).off("resize", this.handleResize);
  }

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    //exdays from now
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";";
    this.$el.addClass("is-hidden");
  }

  getCookie(cname) {
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
}
