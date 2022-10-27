import $ from "jquery";

export class ViewAllExpand {
  constructor(el) {
    this.$el = $(el);
    this.$button = $el.find(".js-more");
    this.$expandTarget = $el.find(".js-expand-target");

    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", ".js-more", (event) => this.expand(event));
  }

  expand(event) {
    event.preventDefault();
    this.$expandTarget.slideDown(200).attr("aria-expanded", true);
    this.$button.hide();
  }
}
