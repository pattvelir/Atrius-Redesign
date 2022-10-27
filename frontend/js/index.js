// import RenderWorker from "web-worker:./RenderWorker.js";

import "./polyfill";
import "picturefill";
import "../scss/index.scss";

// needed to set the path for Images used in JS files.
// import was required to set the value before the other imports.
import "./assetsDirectory.js";

import { ViewAllExpand } from "./ViewAllExpand";
import { SecondaryNav } from "./navigation/SecondaryNav";
import { DynamicBanner } from "./DynamicBanner";
import { DynamicPassword } from "./forms/DynamicPassword";
import { ProfileControl } from "./ProfileControl";
import { InterestsGroups } from "./forms/InterestsGroups";
import { PrivacyModal } from "./PrivacyModal";
import renderer from "./renderer.js";

import Forms from "./forms/forms.js";
import renderRichText from "./richText.render.js";
import makeClickable from "./makeClickable.js";
import initSlideShow from "./components/SlideShow/initSlideShow.js";
import languageSelector from "./components/LanguageSelector/initLanguageSelector.js";
import initBackgroundVideo from "./components/BackgroundVideo/initBackgroundVideo";
import initContentList from "./components/ContentList/initContentList.js";

import initPrimaryNav from "./components/PrimaryNav/initPrimaryNav.js";
import initMobileMenu from "./components/MobileMenu/initMobileMenu.js";
import initSearchMenu from "./components/SearchMenu/initSearchMenu.js";
import initSkipNavigation from "./components/SkipNavigation/initSkipNavigation.js";
import initBackToTop from "./components/BackToTop/initBackToTop.js";

import renderYouTubeVideo from "./components/YouTubeVideo/renderYouTubeVideo.jsx";

// React Apps
import renderDynamicContentListing from "./components/SearchModules/DynamicContentListing/renderDynamicContentListing.jsx";
import renderSearch from "./components/SearchModules/Search/renderSearch.jsx";
// This is required to make Storybook run JS when patterns are choosen

const threadComponents = [
  { selector: ".js-rich-text", callback: renderRichText },
  { selector: ".js-make-clickable", callback: makeClickable },
  { selector: ".js-primary-nav", callback: initPrimaryNav },
  { selector: ".js-mobile-menu", callback: initMobileMenu },
  { selector: ".js-search-menu", callback: initSearchMenu },
  { selector: ".js-skip-navigation", callback: initSkipNavigation },
  { selector: ".js-back-to-top", callback: initBackToTop },
  { selector: ".js-list-item-overflow", callback: initContentList },
  { selector: ".js-list-item-clickable", callback: makeClickable },
  { selector: ".js-youtube-video-mount", callback: renderYouTubeVideo },
  { selector: ".js-lang-select-nav", callback: languageSelector },
  { selector: ".js-slideshow-slider", callback: initSlideShow },
  { selector: ".js-background-video", callback: initBackgroundVideo },
  { selector: ".js-show-password", callback: DynamicPassword },
  { selector: ".js-form", callback: () => Forms(document, window) },
  {
    selector: ".js-dynamic-content-listing-mount",
    callback: renderDynamicContentListing,
  },
  { selector: ".js-search-mount", callback: renderSearch },

  {
    selector: ".js-view-all-expand",
    callback: (el) => new ViewAllExpand(el),
  },
  {
    selector: ".js-secondary-nav",
    callback: (el) => new SecondaryNav(el),
  },
  {
    selector: ".js-account-nav",
    callback: (el) => new SecondaryNav(el),
  },
  {
    selector: ".js-dynamic-banner",
    callback: (el) => new DynamicBanner(el),
  },
  {
    selector: ".js-profile",
    callback: (el) => new ProfileControl(".js-profile"),
  },
  {
    selector: ".js-interests-form",
    callback: (el) => new InterestsGroups(el),
  },
  {
    selector: ".js-privacy-banner",
    callback: (el) => new PrivacyModal(el),
  },
];

document.addEventListener("DOMContentLoaded", () => {
  threadComponents.map(renderer);
});
