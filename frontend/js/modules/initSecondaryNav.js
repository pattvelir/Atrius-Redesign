import $ from "jquery";

const SecondaryNav = (el) => {
  const $el = $(el);
  const $menu = $el.find(".js-menu");
  const $toggle = $el.find(".js-nav-toggle");

  function isOpen() {
    return $el.hasClass("is-open");
  }
  function openNav(event) {
    $menu.slideDown(250);
    $el.addClass("is-open");
  }

  function closeNav(event) {
    $menu.slideUp(250);
    $el.removeClass("is-open");
  }

  function toggleNav(event) {
    if (isOpen()) {
      closeNav(event);
    } else {
      openNav(event);
    }
  }

  // the menu should expand/collapse on click
  // use mousedown as it will be handled before focus
  $toggle.on("mousedown", (event) => {
    toggleNav(event);
  });

  // Still need to handle click to
  // prevent default
  $toggle.on("click", (event) => {
    event.preventDefault();
  });

  // howver, for focus we should only expand
  // if we collapse on blur, then just about
  // any other page interaction will collapse
  // the menu unexpectedly
  $toggle.on("focus", (event) => {
    if (!isOpen()) {
      openNav(event);
    }
  });
};
export default SecondaryNav;
