import $ from "jquery";
import { breakpoint } from "../breakpoint";

let throttler;
const KEY_CODES = {
  tab: 9,
  enter: 13,
  leftArrow: 37,
  rightArrow: 39,
  upArrow: 38,
  downArrow: 40,
  esc: 27,
  space: 32,
};

const PrimaryNav = (el) => {
  const $el = $(el);
  const $navMenu = $el.find(".js-menu");
  const $navItems = $el.find(".js-nav-item");
  const $navToggle = $el.find(".js-nav-toggle");
  const openClass = "is-open";

  console.log($el);

  bindEvents();

  $navItems.each(adjustFlyoutMenuAlignment);

  // run any breakpoint changes immediately
  onBreakpointChange(breakpoint());

  function bindEvents() {
    // Show sub menus on click
    $navItems.filter(".has-submenu").on("click", (event) => onItemClick(event));

    // Toggle entire navigation when hidden
    // in some viewports
    $navToggle.on("click", (event) => onNavToggleClick(event));

    // bind keypress events for keyboard navigation
    $navMenu.on("keydown", (event) => onKeyPress(event));

    // Add a document click handler to detect clicks
    // with the intent to dismiss navigation
    $(document).on("click", (event) => onOtherClick(event));

    // tie in certain responsive behaviors to a throttled
    // resize event
    $(window).on("resize", (event) => {
      if (throttler) {
        window.clearTimeout(throttler);
      }
      throttler = setTimeout(() => {
        $navItems.each(adjustFlyoutMenuAlignment);
        onBreakpointChange(breakpoint());
      }, 400);
    });
  }

  function onNavToggleClick(event) {
    // Prevent this click from being counted
    // as a document click
    event.stopPropagation();
    toggleNavMenu();
  }

  function onItemClick(event) {
    // Prevent this click from being counted
    // as a document click
    event.stopPropagation();
    let $clickedItem = $(event.target).closest(".js-nav-item");
    operateSubMenu($clickedItem);
  }

  function onOtherClick(event) {
    if (breakpoint() === "large") {
      toggleFlyoutMenus([$openItem()]);
    }
  }

  function onBreakpointChange(bp) {
    switch (bp) {
      case "large":
        $navMenu.show();
        ariaExpand($el);
        break;
      case "medium":
        ariaCollapse($el);
        break;
      case "small":
      default:
        return;
    }
  }

  function onKeyPress(event) {
    switch (event.which) {
      case KEY_CODES.enter:
      case KEY_CODES.space:
        toggleInContext(focusContext());
        break;
      case KEY_CODES.rightArrow:
        rightInContext(focusContext());
        break;
      case KEY_CODES.leftArrow:
        leftInContext(focusContext());
        break;
      case KEY_CODES.upArrow:
        upInContext(focusContext());
        break;
      case KEY_CODES.downArrow:
        downInContext(focusContext());
        break;
      case KEY_CODES.esc:
        collapseInContext(focusContext());
        break;
      default:
        return;
    }
  }

  function operateSubMenu($el) {
    // the behavior of the menus changes depending
    // on the active breakpoint
    switch (breakpoint()) {
      case "large":
        toggleFlyoutMenus([$el, $openItem()]);
        break;
      case "medium":
      case "small":
        toggleCollapsingMenu($el);
        break;
      default:
        return;
    }
  }

  // explicity close a submenu
  function closeSubMenu($el) {
    switch (breakpoint()) {
      case "large":
        closeFlyoutMenu($el);
        break;
      case "medium":
      case "small":
        closeCollapsingMenu($el);
        break;
      default:
        return;
    }
  }

  function toggleNavMenu() {
    if ($el.hasClass(openClass)) {
      $navMenu.slideUp(300);
      ariaCollapse($el);
    } else {
      $navMenu.slideDown(300);
      ariaExpand($el);
    }

    $el.toggleClass(openClass);
  }

  function ariaExpand($el) {
    $el.attr("aria-expanded", true);
  }

  function ariaCollapse($el) {
    $el.attr("aria-expanded", false);
  }

  function toggleFlyoutMenus(items) {
    // In case the same item is added twice (by clicking on the currently open item, for example)
    // only apply behavior to each element once
    items.reduce(($toggled, $item) => {
      if ($toggled.index($item) === -1) {
        if ($item.hasClass(openClass)) {
          closeFlyoutMenu($item);
          closeMenuAttributes($item);
          ariaCollapse($item.find(".js-submenu"));
        } else {
          openFlyoutMenu($item);
          openMenuAttributes($item);
          ariaExpand($item.find(".js-submenu"));
        }

        return $toggled.add($item);
      }
    }, $());
  }

  function openFlyoutMenu($item) {
    openMenuAttributes($item);
  }

  function closeFlyoutMenu($item) {
    closeMenuAttributes($item);
  }

  function toggleCollapsingMenu($item) {
    if ($item.hasClass(openClass)) {
      closeCollapsingMenu($item);
      closeMenuAttributes($item);
    } else {
      openCollapsingMenu($item);
      openMenuAttributes($item);
    }
  }

  function openCollapsingMenu($item) {
    const $submenu = $item.find(".js-submenu");
    $submenu.slideDown(300);
  }

  function closeCollapsingMenu($item) {
    const $submenu = $item.find(".js-submenu");
    $submenu.slideUp(300);
  }

  function openMenuAttributes($item) {
    $item.addClass(openClass);
    $item.find("a").attr("tabindex", 0);
  }

  function closeMenuAttributes($item) {
    $item.removeClass(openClass);
    $item.find("a").attr("tabindex", -1);
  }

  function adjustFlyoutMenuAlignment(idx, item) {
    // if the menu is going to be rendered offscreen,
    // we need to push it back.
    let $item = $(item);
    let $menu = $item.find(".js-submenu");
    const left = $item.offset().left;
    const menuWidth = $menu.outerWidth();
    const windowWidth = $(window).width();
    const diff = windowWidth - (left + menuWidth);

    const newLeft = diff < 0 ? diff : 0;
    $menu.css({ left: `${newLeft}px` });
  }

  function $openItem() {
    return $el.find(`.${openClass}`);
  }

  function downInContext(context) {
    if (!context) {
      return;
    }

    if (!context.$parent && context.$el.hasClass("js-has-submenu")) {
      operateSubMenu(context.$el);
      context.$el.find("a:first").trigger("focus");
    } else if (context.$parent && context.$next) {
      context.$next.trigger("focus");
    }
  }

  function upInContext(context) {
    if (!context) {
      return;
    }

    if (context.$parent && !context.$prev) {
      operateSubMenu(context.$el);
      context.$parent.trigger("focus");
    } else if (context.$parent && context.$prev) {
      context.$prev.trigger("focus");
    }
  }

  function collapseInContext(context) {
    closeSubMenu(context.$el);
  }

  function toggleInContext(context) {
    operateSubMenu(context.$el);
  }

  function rightInContext(context) {
    if (!context) {
      return;
    }

    if (context.$parent) {
      const $nextMenu = context.$parent.nextAll(".js-has-submenu").first();
      operateSubMenu($nextMenu);
      $nextMenu.find("li a").first().trigger("focus");
    } else if (context.$next) {
      context.$next.trigger("focus");
    }
  }

  function leftInContext(context) {
    if (!context) {
      return;
    }

    if (context.$parent) {
      const $prevMenu = context.$parent.prevAll(".js-has-submenu").first();
      operateSubMenu($prevMenu);
      $prevMenu.find("li a").first().trigger("focus");
    } else if (context.$prev) {
      context.$prev.trigger("focus");
    }
  }

  // Provides an object with the currently focused element,
  // prev and next focusable elements, and the menu parent
  // if applicable
  function focusContext() {
    const $focusEl = $(document.activeElement);

    // return nothing if focus doesn't exist, or is not in our menu
    if (!$focusEl.length || $focusEl.closest(".js-menu").length === 0) {
      return;
    }

    // get the next focusable item
    const $next = ($el) => {
      // If we're focused on an <a>, move up to parent <li>
      if ($el[0].nodeName === "A") {
        $el = $el.parent();
      }

      // get immediate sibling
      let $nextEl = $el.next();

      // if no tabindex defined, select the inner <a> instead
      if ($nextEl.attr("tabindex") === undefined) {
        $nextEl = $nextEl.children("a:first");
      }

      return $nextEl.length === 0 ? null : $nextEl;
    };

    // get the prev focusable item
    const $prev = ($el) => {
      // If we're focused on an <a>, move up to parent <li>
      if ($el[0].nodeName === "A") {
        $el = $el.parent();
      }

      // Get the immediate sibling
      let $prevEl = $el.prev();

      // if no tabindex defined, select the inner <a> instead
      if ($prevEl.attr("tabindex") === undefined) {
        $prevEl = $prevEl.children("a:first");
      }

      return $prevEl.length === 0 ? null : $prevEl;
    };

    // get a parent
    const $parent = ($el) => {
      const $parentEl = $el.parents("ul").parents(".js-nav-item");
      return $parentEl.length === 0 ? null : $parentEl;
    };

    return {
      $el: $focusEl,
      $next: $next($focusEl),
      $prev: $prev($focusEl),
      $parent: $parent($focusEl),
    };
  }
};
