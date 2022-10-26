import makeClickable from "../../makeClickable.js";

export default () => {
  document.querySelectorAll(".js-list-item-clickable").forEach(makeClickable);
};
