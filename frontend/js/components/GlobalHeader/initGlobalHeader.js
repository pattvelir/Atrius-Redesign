import initPrimaryNav from "../PrimaryNav/initPrimaryNav.js";
import initMobileMenu from "../MobileMenu/initMobileMenu.js";
import initSearchMenu from "../SearchMenu/initSearchMenu.js";
import renderer from "../../renderer.js";
export default () => {
  renderer(".js-primary-nav", initPrimaryNav);
  renderer(".js-mobile-menu", initMobileMenu);
  renderer(".js-search-menu", initSearchMenu);
};
