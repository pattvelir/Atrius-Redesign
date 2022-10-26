import initPrimaryNav from "../PrimaryNav/initPrimaryNav.js";
import initMobileMenu from "../MobileMenu/initMobileMenu.js";
import initSearchMenu from "../SearchMenu/initSearchMenu.js";

export default () => {
  document.querySelectorAll(".js-primary-nav").forEach(initPrimaryNav);
  document.querySelectorAll(".js-mobile-menu").forEach(initMobileMenu);
  document.querySelectorAll(".js-search-menu").forEach(initSearchMenu);
};
