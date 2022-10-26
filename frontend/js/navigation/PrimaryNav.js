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

export class PrimaryNav {
  constructor($el) {
    this.$el = $el;
    this.$navMenu = $el.find(".js-menu");
    this.$navItems = $el.find(".js-nav-item");
    this.$navToggle = $el.find(".js-nav-toggle");
    this.openClass = "is-open";

    this.bindEvents();

    this.$navItems.each(this.adjustFlyoutMenuAlignment);

    // run any breakpoint changes immediately
    this.onBreakpointChange(breakpoint());
  }

  bindEvents() {
    // Show sub menus on click
    this.$navItems
      .filter(".has-submenu")
      .on("click", (event) => this.onItemClick(event));

    // Toggle entire navigation when hidden
    // in some viewports
    this.$navToggle.on("click", (event) => this.onNavToggleClick(event));

    // bind keypress events for keyboard navigation
    this.$navMenu.on("keydown", (event) => this.onKeyPress(event));

    // Add a document click handler to detect clicks
    // with the intent to dismiss navigation
    $(document).on("click", (event) => this.onOtherClick(event));

    // tie in certain responsive behaviors to a throttled
    // resize event
    $(window).on("resize", (event) => {
      if (throttler) {
        window.clearTimeout(throttler);
      }
      throttler = setTimeout(() => {
        this.$navItems.each(this.adjustFlyoutMenuAlignment);
        this.onBreakpointChange(breakpoint());
      }, 400);
    });
  }

  onNavToggleClick(event) {
    // Prevent this click from being counted
    // as a document click
    event.stopPropagation();
    this.toggleNavMenu();
  }

  onItemClick(event) {
    // Prevent this click from being counted
    // as a document click
    event.stopPropagation();
    let $clickedItem = $(event.target).closest(".js-nav-item");
    this.operateSubMenu($clickedItem);
  }

  onOtherClick(event) {
    if (breakpoint() === "large") {
      this.toggleFlyoutMenus([this.$openItem()]);
    }
  }

  onBreakpointChange(bp) {
    switch (bp) {
      case "large":
        this.$navMenu.show();
        this.ariaExpand(this.$el);
        break;
      case "medium":
        this.ariaCollapse(this.$el);
        break;
      case "small":
      default:
        return;
    }
  }

  onKeyPress(event) {
    switch (event.which) {
      case KEY_CODES.enter:
      case KEY_CODES.space:
        this.toggleInContext(this.focusContext());
        break;
      case KEY_CODES.rightArrow:
        this.rightInContext(this.focusContext());
        break;
      case KEY_CODES.leftArrow:
        this.leftInContext(this.focusContext());
        break;
      case KEY_CODES.upArrow:
        this.upInContext(this.focusContext());
        break;
      case KEY_CODES.downArrow:
        this.downInContext(this.focusContext());
        break;
      case KEY_CODES.esc:
        this.collapseInContext(this.focusContext());
        break;
      default:
        return;
    }
  }

  operateSubMenu($el) {
    // the behavior of the menus changes depending
    // on the active breakpoint
    switch (breakpoint()) {
      case "large":
        this.toggleFlyoutMenus([$el, this.$openItem()]);
        break;
      case "medium":
      case "small":
        this.toggleCollapsingMenu($el);
        break;
      default:
        return;
    }
  }

  // explicity close a submenu
  closeSubMenu($el) {
    switch (breakpoint()) {
      case "large":
        this.closeFlyoutMenu($el);
        break;
      case "medium":
      case "small":
        this.closeCollapsingMenu($el);
        break;
      default:
        return;
    }
  }

  toggleNavMenu() {
    if (this.$el.hasClass(this.openClass)) {
      this.$navMenu.slideUp(300);
      this.ariaCollapse(this.$el);
    } else {
      this.$navMenu.slideDown(300);
      this.ariaExpand(this.$el);
    }

    this.$el.toggleClass(this.openClass);
  }

  ariaExpand($el) {
    $el.attr("aria-expanded", true);
  }

  ariaCollapse($el) {
    $el.attr("aria-expanded", false);
  }

  toggleFlyoutMenus(items) {
    // In case the same item is added twice (by clicking on the currently open item, for example)
    // only apply behavior to each element once
    items.reduce(($toggled, $item) => {
      if ($toggled.index($item) === -1) {
        if ($item.hasClass(this.openClass)) {
          this.closeFlyoutMenu($item);
          this.closeMenuAttributes($item);
          this.ariaCollapse($item.find(".js-submenu"));
        } else {
          this.openFlyoutMenu($item);
          this.openMenuAttributes($item);
          this.ariaExpand($item.find(".js-submenu"));
        }

        return $toggled.add($item);
      }
    }, $());
  }

  openFlyoutMenu($item) {
    this.openMenuAttributes($item);
  }

  closeFlyoutMenu($item) {
    this.closeMenuAttributes($item);
  }

  toggleCollapsingMenu($item) {
    if ($item.hasClass(this.openClass)) {
      this.closeCollapsingMenu($item);
      this.closeMenuAttributes($item);
    } else {
      this.openCollapsingMenu($item);
      this.openMenuAttributes($item);
    }
  }

  openCollapsingMenu($item) {
    const $submenu = $item.find(".js-submenu");
    $submenu.slideDown(300);
  }

  closeCollapsingMenu($item) {
    const $submenu = $item.find(".js-submenu");
    $submenu.slideUp(300);
  }

  openMenuAttributes($item) {
    $item.addClass(this.openClass);
    $item.find("a").attr("tabindex", 0);
  }

  closeMenuAttributes($item) {
    $item.removeClass(this.openClass);
    $item.find("a").attr("tabindex", -1);
  }

  adjustFlyoutMenuAlignment(idx, item) {
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

  $openItem() {
    return this.$el.find(`.${this.openClass}`);
  }

  downInContext(context) {
    if (!context) {
      return;
    }

    if (!context.$parent && context.$el.hasClass("js-has-submenu")) {
      this.operateSubMenu(context.$el);
      context.$el.find("a:first").trigger("focus");
    } else if (context.$parent && context.$next) {
      context.$next.trigger("focus");
    }
  }

  upInContext(context) {
    if (!context) {
      return;
    }

    if (context.$parent && !context.$prev) {
      this.operateSubMenu(context.$el);
      context.$parent.trigger("focus");
    } else if (context.$parent && context.$prev) {
      context.$prev.trigger("focus");
    }
  }

  collapseInContext(context) {
    this.closeSubMenu(context.$el);
  }

  toggleInContext(context) {
    this.operateSubMenu(context.$el);
  }

  rightInContext(context) {
    if (!context) {
      return;
    }

    if (context.$parent) {
      const $nextMenu = context.$parent.nextAll(".js-has-submenu").first();
      this.operateSubMenu($nextMenu);
      $nextMenu.find("li a").first().trigger("focus");
    } else if (context.$next) {
      context.$next.trigger("focus");
    }
  }

  leftInContext(context) {
    if (!context) {
      return;
    }

    if (context.$parent) {
      const $prevMenu = context.$parent.prevAll(".js-has-submenu").first();
      this.operateSubMenu($prevMenu);
      $prevMenu.find("li a").first().trigger("focus");
    } else if (context.$prev) {
      context.$prev.trigger("focus");
    }
  }

  // Provides an object with the currently focused element,
  // prev and next focusable elements, and the menu parent
  // if applicable
  focusContext() {
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
}
