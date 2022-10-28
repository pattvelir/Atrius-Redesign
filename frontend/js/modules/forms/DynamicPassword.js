import $ from "jquery";

const DynamicPassword = (el) => {
  const $el = $(el);
  const $input = $("#" + $el.data("input-id"));

  function bindEvents() {
    $el.on("click", (e) => {
      e.preventDefault();
      toggle();
    });
  }

  function toggle() {
    if ($el.hasClass("js-is-hidden")) {
      $input.attr("type", "text");
      $el.text("Hide password");
    } else {
      $input.attr("type", "password");
      $el.text("Show password");
    }

    $el.toggleClass("js-is-hidden");
  }
  bindEvents();
};
export default DynamicPassword;
