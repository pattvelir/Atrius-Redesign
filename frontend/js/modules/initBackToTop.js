import { scrollToId } from "../common/scrollHelpers.js";
import { getScrollTop } from "../common/scrollHelpers.js";

export default (el) => {
  const main = document.querySelector("#main-content");

  if (!main) {
    return;
  }

  el.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToId("#main-content");
  });

  window.addEventListener(
    "scroll",
    (e) => {
      const scrollPosition = getScrollTop();

      // if user scrolls is able to scroll on viewport, show button
      if (scrollPosition !== 0) {
        el.classList.add("is-active");
      } else {
        el.classList.remove("is-active");
      }
    },
    { passive: true },
  );
};
