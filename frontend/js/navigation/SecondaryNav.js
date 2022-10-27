import $ from "jquery";

export class SecondaryNav {
  constructor(el) {
    this.$el = $(el);
    this.$menu = this.$el.find(".js-menu");
    this.$toggle = this.$el.find(".js-nav-toggle");

    this.bindEvents();
  }

  bindEvents() {
    // the menu should expand/collapse on click
    // use mousedown as it will be handled before focus
    this.$toggle.on("mousedown", (event) => {
      this.toggleNav(event);
    });

    // Still need to handle click to
    // prevent default
    this.$toggle.on("click", (event) => {
      event.preventDefault();
    });

    // howver, for focus we should only expand
    // if we collapse on blur, then just about
    // any other page interaction will collapse
    // the menu unexpectedly
    this.$toggle.on("focus", (event) => {
      if (!this.isOpen()) {
        this.openNav(event);
      }
    });
  }

  toggleNav(event) {
    if (this.isOpen()) {
      this.closeNav(event);
    } else {
      this.openNav(event);
    }
  }

  openNav(event) {
    this.$menu.slideDown(250);
    this.$el.addClass("is-open");
  }

  closeNav(event) {
    this.$menu.slideUp(250);
    this.$el.removeClass("is-open");
  }

  isOpen() {
    return this.$el.hasClass("is-open");
  }
}
