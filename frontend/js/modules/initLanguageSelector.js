import NavMenu from "./navigation/NavMenu.js";

// props: {
//   animationDelay: number
//   closed: boolean
//   direction: string (horizontal or vertical)
//   menuButton: string.isRequired (class or id selector)
//   menuContainer: string.isRequired (class or id selector)
//   menuLink: string.isRequired (class selector)
//   openClass: string (class name)
//   onClose: function (callback when the menu opens)
//   onOpen: function (callback when the menu opens)
//   parent: node_element.isRequired
// }

const initLanguageSelector = (el) => {
  const langSelect = new NavMenu({
    animationDelay: 600,
    closed: true,
    direction: "vertical",
    menuButton: ".js-lang-select-toggle",
    menuContainer: ".js-lang-select-menu",
    navigationLink: ".js-lang-select-menu-link",
    openClass: "is-open",
    parent: el,
  });
};
export default initLanguageSelector;
