import NavMenu from "./navigation/NavMenu.js";
import "../components/PrimaryNav/primary-nav.scss";
const initPrimaryNav = (el, index = 0) => {
  const onClose = () => {};
  const onOpen = () => {};
  const primaryLinks = el.querySelectorAll(
    ".js-primary-nav-top-link, .js-primary-nav-menu-button",
  );
  primaryLinks.forEach((el, i) => {
    el.addEventListener("keydown", (e) => {
      handleKeyDown(e, i);
    });
  });
  el.querySelectorAll(".js-primary-nav-menu").forEach((el, i) => {
    NavMenu({
      animationDelay: 500,
      closed: true,
      direction: "vertical",
      menuButton: ".js-primary-nav-menu-button",
      menuContainer: ".js-primary-nav-menu-content",
      navigationLink: ".js-primary-nav-sub-link",
      openClass: "is-open",
      onClose: onClose,
      onOpen: onOpen,
      parent: el,
    });
  });

  function handleKeyDown(event, index) {
    switch (event.key) {
      case "Left":
      case "ArrowLeft":
        if (index > 0) {
          event.preventDefault();
          primaryLinks[index - 1].focus();
        }
        break;
      case "Right":
      case "ArrowRight":
        if (index < primaryLinks.length - 1) {
          event.preventDefault();
          primaryLinks[index + 1].focus();
        }
        break;
      default:
    }
  }

  // TODO - Determine if the submenu is against the right edge of the viewport.
  // accounting for wrapping links.
  // add `.primary-nav__submenu--right` class.
};
export default initPrimaryNav;
