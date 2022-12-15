/*
 ** import RenderWorker from "web-worker:./RenderWorker.js";
 ** needed to set the path for Images used in JS files.
 ** import was required to set the value before the other imports.
 */
import "./modules/assetsDirectory.js";
import dynamicRenderer from "./dynamicRenderer.js";
import "../scss/index.scss";
import googleTranslate from "./common/translate";
// import * as Thread from "./modules";
/**
 * ThreadComponents is an array of every component in thread
 * this will be used to dynamically import js for each component
 * using the renderer function
 */
const threadComponents = [
  {
    selector: ".js-rich-text",
    src: "initRichText",
  },
  {
    selector: [".js-make-clickable", ".js-list-item-clickable"],
    src: "initMakeClickable",
  },
  {
    selector: ".js-primary-nav",
    src: "initPrimaryNav",
  },
  {
    selector: ".js-mobile-menu",
    src: "initMobileMenu",
  },
  {
    selector: ".js-search-menu",
    src: "initSearchMenu",
  },
  {
    selector: ".js-skip-navigation",
    src: "initSkipNavigation",
  },
  {
    selector: ".js-back-to-top",
    src: "initBackToTop",
  },
  {
    selector: ".js-list-item-overflow",
    src: "initContentList",
  },
  {
    selector: ".js-lang-select-nav",
    src: "initLanguageSelector",
  },
  {
    selector: ".js-slideshow-slider",
    src: "initSlideShow",
  },
  {
    selector: ".js-background-video",
    src: "initBackgroundVideo",
  },
  {
    selector: ".js-show-password",
    src: "initDynamicPassword",
  },
  {
    selector: ".js-form",
    src: "initForms",
  },
  {
    selector: ".js-youtube-video-mount",
    src: "renderYouTubeVideo",
  },
  {
    selector: ".js-dynamic-content-listing-mount",
    src: "renderDynamicContentListing",
  },
  {
    selector: ".js-search-mount",
    src: "renderSearch",
  },
  {
    selector: ".js-view-all-expand",
    src: "initViewAllExpand",
  },
  {
    selector: [".js-secondary-nav", ".js-account-nav"],
    src: "initSecondaryNav",
  },
  {
    selector: ".js-dynamic-banner",
    src: "initDynamicBanner",
  },
  {
    selector: ".js-profile",
    src: "initProfileControl",
  },
  {
    selector: ".js-interests-form",
    src: "initInterestsGroups",
  },
  {
    selector: ".js-privacy-banner",
    src: "initPrivacyModal",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  threadComponents.forEach(dynamicRenderer);
  // googleTranslate();
});
