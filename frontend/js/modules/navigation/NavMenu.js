// Version 1.1
// author: Jonthan Dallas
// date: November 2020
//
// pass these props when intializing this module
//
// props: {
//   animationDelay: number
//   closed: boolean
//   direction: string (horizontal or vertical)
//   menuButton: string.isRequired (class or id selector)
//   menuCloseButton: string.isRequired (class or id selector)
//   menuContainer: string.isRequired (class or id selector)
//   navigationLink: string.isRequired (class selector)
//   openClass: string (class name)
//   onClose: function (callback when the menu opens)
//   onOpen: function (callback when the menu opens)
//   parent: node_element.isRequired
// }

import uniqueid from "lodash.uniqueid";

let timeoutId = window.setTimeout(() => {}, 0);

export default function (initProps) {
  let propsFail = false;

  if (!initProps.menuButton || initProps.menuButton.length === 0) {
    console.error("'menuButton' selector is required");
    propsFail = true;
  }
  if (!initProps.menuCloseButton || initProps.menuCloseButton.length === 0) {
    console.error("'menuCloseButton' selector is required");
    propsFail = true;
  }
  if (!initProps.menuContainer || initProps.menuContainer.length === 0) {
    console.error("'menuContainer' selector is required");
    propsFail = true;
  }
  if (!initProps.navigationLink || initProps.navigationLink.length === 0) {
    console.error("'navigationLink' selector is required");
    propsFail = true;
  }
  if (!initProps.parent) {
    console.error("'parent' node element is required");
    propsFail = true;
  }

  if (propsFail) {
    return;
  }

  const defaultProps = {
    animationDelay: 600,
    closed: true,
    direction: "horizontal",
    openClass: "is-open",
  };

  const props = Object.assign({}, defaultProps, initProps);

  let closedState = props.closed;
  let direction = props.direction;
  let animationDelay = props.animationDelay;

  const elParent = props.parent;

  const elMenuButton = elParent.querySelector(props.menuButton);
  const elMenuContainer = elParent.querySelector(props.menuContainer);
  const elMenuLinks = elMenuContainer.querySelectorAll(props.navigationLink);
  const elCloseMenuButton = elParent.querySelector(props.menuCloseButton);

  bindEvents();
  init();

  function init() {
    const controlId = elMenuContainer.id || uniqueid("menu");
    const buttonId = elMenuButton.id || uniqueid("menu");

    elMenuButton.id = buttonId;
    elMenuButton.setAttribute("aria-haspopup", true);
    elMenuButton.setAttribute("aria-controls", controlId);

    elMenuContainer.id = controlId;
    elMenuContainer.setAttribute("aria-labelledby", buttonId);

    if (closedState) {
      closeMenu(false);
    } else {
      openMenu();
    }
  }

  function bindEvents() {
    // need to run this on mousedown to properly allow the focus state to move.
    elMenuButton.addEventListener("mousedown", (e) => {
      e.preventDefault();
      toggleMenu();
    });

    elCloseMenuButton.addEventListener("mousedown", (e) => {
      e.preventDefault();
      closeMenu();
    });

    elMenuButton.addEventListener("keydown", handleMenuKeyEvent);

    [...elMenuLinks].forEach((link, index) => {
      link.addEventListener("keydown", (e) => {
        handleLinkKeyEvent(e, link, index);
      });
    });
  }

  function setDirection(newDirection) {
    direction = newDirection;
  }

  function clickAway(e) {
    if (!elParent.contains(e.target) && !closedState) {
      closeMenu(false);
    }
  }

  function toggleMenu() {
    if (closedState) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function openMenu() {
    closedState = false;
    elMenuButton.setAttribute("aria-expanded", true);
    elParent.classList.add(props.openClass);
    elMenuContainer.removeAttribute("aria-hidden");

    window.clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      elMenuLinks[0] && elMenuLinks[0].focus();
    }, animationDelay);

    if (props.onOpen) {
      props.onOpen();
    }

    document.querySelector("html").addEventListener("click", clickAway);
  }

  function closeMenu(moveFocus = true) {
    closedState = true;
    if (moveFocus) {
      elMenuButton && elMenuButton.focus();
    }
    elMenuButton.setAttribute("aria-expanded", false);
    elParent.classList.remove(props.openClass);
    elMenuContainer.setAttribute("aria-hidden", true);

    if (props.onClose) {
      props.onClose();
    }

    document.querySelector("html").removeEventListener("click", clickAway);
  }

  function handleMenuKeyEvent(e) {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        toggleMenu();
        break;
      default:
    }
  }

  function handleLinkKeyEvent(e, link, index) {
    let target = index;

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        elMenuButton && elMenuButton.focus();
        closeMenu();
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          if (index === 0) {
            closeMenu();
            elMenuButton && elMenuButton.focus();
          } else {
            elMenuLinks[target - 1].focus();
          }
        } else {
          if (index === elMenuLinks.length - 1) {
            closeMenu();
            elMenuButton && elMenuButton.focus();
          } else {
            elMenuLinks[target + 1].focus();
          }
        }
        break;
      default:
    }

    if (direction === "vertical") {
      switch (e.key) {
        case "Up":
        case "ArrowUp":
          e.preventDefault();
          focusPrevious(elMenuLinks, index, target);
          break;
        case "Down":
        case "ArrowDown":
          e.preventDefault();
          focusNext(elMenuLinks, index, target);
          break;
        default:
      }
    }
    if (direction === "horizontal") {
      switch (e.key) {
        case "Left":
        case "ArrowLeft":
          e.preventDefault();
          focusPrevious(elMenuLinks, index, target);
          break;
        case "Right":
        case "ArrowRight":
          e.preventDefault();
          focusNext(elMenuLinks, index, target);
          break;
        default:
      }
    }

    function focusPrevious(elList, index, target) {
      if (index === 0) {
        target = elMenuLinks.length;
      }
      elMenuLinks[target - 1] && elMenuLinks[target - 1].focus();
    }

    function focusNext(elList, index, target) {
      if (index === elMenuLinks.length - 1) {
        target = -1;
      }
      elMenuLinks[target + 1] && elMenuLinks[target + 1].focus();
    }
  }

  return {
    init,
    toggleMenu,
    openMenu,
    closeMenu,
    setDirection,
  };
}
