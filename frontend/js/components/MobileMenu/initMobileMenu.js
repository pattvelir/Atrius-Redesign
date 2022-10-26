import NavMenu from "../../navigation/NavMenu.js";

export default (el, i) => {
  const onClose = () => {};
  const onOpen = () => {};

  NavMenu({
    animationDelay: 800,
    closed: true,
    direction: "vertical",
    menuButton: ".js-nav-toggle",
    menuContainer: ".js-mobile-menu-content",
    navigationLink:
      ".js-primary-nav-top-link, .js-primary-nav-menu-button, .js-utility-nav-link, .js-lang-select-toggle",
    openClass: "is-open",
    onClose: onClose,
    onOpen: onOpen,
    parent: el,
  });
};
