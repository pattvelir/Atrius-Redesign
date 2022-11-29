import { Accordion } from "./accordion.js";
// import "../components/ContentList/content-list.scss";

export default (el, i) => {
  Accordion(el, i);

  const firstNewItem = el.querySelectorAll(".content-list__item")[0];
  firstNewItem.setAttribute("tabIndex", "-1");

  el.querySelector(".js-accordion-link").addEventListener("click", (e) => {
    window.setTimeout(() => {
      firstNewItem.focus();
    }, 600);
  });
};
