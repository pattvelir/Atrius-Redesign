import NavMenu from "../../navigation/NavMenu.js";

export default (el, i) => {
  const onClose = () => {};
  const onOpen = () => {};

  NavMenu({
    animationDelay: 800,
    closed: true,
    direction: "",
    menuButton: ".js-search-menu-button",
    menuContainer: ".js-search-menu-content",
    navigationLink: "input, button",
    openClass: "is-open",
    onClose: onClose,
    onOpen: onOpen,
    parent: el,
  });
};
