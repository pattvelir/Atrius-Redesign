import { scrollToId } from "../common/scrollHelpers.js";

export default () => {
  document.querySelectorAll(".js-skip-navigation").forEach((el) => {
    const id = el.getAttribute("href"); //`.href` returned a full url

    if (!id || id === "#") {
      return;
    }

    const target = document.querySelector(id);

    if (!target) {
      return;
    }

    el.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToId(id);
    });
  });
};
