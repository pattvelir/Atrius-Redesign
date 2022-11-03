// import RenderWorker from "web-worker:./RenderWorker.js";
import "../scss/index.scss";
// needed to set the path for Images used in JS files.
// import was required to set the value before the other imports.
import "./modules/assetsDirectory.js";
import renderer from "./renderer.js";
const threadComponents = [
  {
    selector: ".js-rich-text",
    dir: "modules",
    src: "richText.render",
  },
  {
    selector: [".js-make-clickable", ".js-list-item-clickable"],
    dir: "modules",
    src: "makeClickable",
  },
  {
    selector: ".js-primary-nav",
    dir: "modules",
    src: "initPrimaryNav",
  },
  {
    selector: ".js-mobile-menu",
    dir: "modules",
    src: "initMobileMenu",
  },
  {
    selector: ".js-search-menu",
    dir: "modules",
    src: "initSearchMenu",
  },
  {
    selector: ".js-skip-navigation",
    dir: "modules",
    src: "initSkipNavigation",
  },
  {
    selector: ".js-back-to-top",
    dir: "modules",
    src: "initBackToTop",
  },
  {
    selector: ".js-list-item-overflow",
    dir: "modules",
    src: "initContentList",
  },
  {
    selector: ".js-lang-select-nav",
    dir: "modules",
    src: "initLanguageSelector",
  },
  {
    selector: ".js-slideshow-slider",
    dir: "modules",
    src: "initSlideShow",
  },
  {
    selector: ".js-background-video",
    dir: "modules",
    src: "initBackgroundVideo",
  },
  {
    selector: ".js-show-password",
    dir: "modules",
    src: "initDynamicPassword",
  },
  {
    selector: ".js-form",
    dir: "modules",
    src: "initForms",
  },
  {
    selector: ".js-youtube-video-mount",
    dir: "modules",
    src: "renderYouTubeVideo",
  },
  {
    selector: ".js-dynamic-content-listing-mount",
    dir: "modules",
    src: "renderDynamicContentListing",
  },
  {
    selector: ".js-search-mount",
    dir: "modules",
    src: "renderSearch",
  },
  {
    selector: ".js-view-all-expand",
    dir: "modules",
    src: "ViewAllExpand",
  },
  {
    selector: [".js-secondary-nav", ".js-account-nav"],
    dir: "modules",
    src: "initSecondaryNav",
  },
  {
    selector: ".js-dynamic-banner",
    dir: "modules",
    src: "initDynamicBanner",
  },
  {
    selector: ".js-profile",
    dir: "modules",
    src: "ProfileControl",
  },
  {
    selector: ".js-interests-form",
    dir: "modules",
    src: "initInterestsGroups",
  },
  {
    selector: ".js-privacy-banner",
    dir: "modules",
    src: "PrivacyModal",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  threadComponents.forEach(renderer);
});
