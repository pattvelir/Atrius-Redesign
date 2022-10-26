import $ from "jquery";

export class DynamicPassword {
  constructor($el) {
    this.$el = $el;
    this.$input = $("#" + $el.data("input-id"));

    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", (e) => {
      e.preventDefault();
      this.toggle();
    });
  }

  toggle() {
    if (this.$el.hasClass("js-is-hidden")) {
      this.$input.attr("type", "text");
      this.$el.text("Hide password");
    } else {
      this.$input.attr("type", "password");
      this.$el.text("Show password");
    }

    this.$el.toggleClass("js-is-hidden");
  }
}
