import $ from "jquery";
const ViewAllExpand = (el) => {
  const $el = $(el);
  const $button = $el.find(".js-more");
  const $expandTarget = $el.find(".js-expand-target");

  function expand(event) {
    event.preventDefault();
    $expandTarget.slideDown(200).attr("aria-expanded", true);
    $button.hide();
  }

  $el.on("click", ".js-more", (event) => expand(event));
};
export default ViewAllExpand;
