import "./polyfill";
import $ from "jquery";
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

import Forms from "./forms/forms.js";
import richText from "./richText.js";
import makeClickable from "./makeClickable.js";
import initSlideShow from "./components/SlideShow/initSlideShow.js";
import languageSelector from "./components/LanguageSelector/initLanguageSelector.js";
import initBackgroundVideo from "./components/BackgroundVideo/initBackgroundVideo";
import initContentList from "./components/ContentList/initContentList.js";

import initGlobalHeader from "./components/GlobalHeader/initGlobalHeader.js";
import initSkipNavigation from "./components/SkipNavigation/initSkipNavigation.js";
import initBackToTop from "./components/BackToTop/initBackToTop.js";
import initListItem from "./components/ListItem/initListItem.js";

import renderYouTubeVideo from "./components/YouTubeVideo/renderYouTubeVideo.jsx";

// React Apps
import { renderDynamicContentListing } from "./components/SearchModules/DynamicContentListing/renderDynamicContentListing.jsx";
import { renderSearch } from "./components/SearchModules/Search/renderSearch.jsx";

// This is required to make Storybook run JS when patterns are choosen
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-rich-text").forEach(richText);

  [...document.querySelectorAll(".js-make-clickable")].forEach(makeClickable);

  // JS apps
  initGlobalHeader();
  initSkipNavigation();
  initBackToTop();
  initContentList();
  initListItem();

  renderYouTubeVideo();

  // LanguageSelector
  document.querySelectorAll(".js-lang-select-nav").forEach(languageSelector);

  // Expandable Listings
  const viewAllables = $.makeArray($(".js-view-all-expand")).map((el) => {
    return new ViewAllExpand($(el));
  });

  // Slideshows
  document.querySelectorAll(".js-slideshow-slider").forEach(initSlideShow);

  // Secondary Nav
  if ($(".js-secondary-nav").length) {
    const secondaryNav = new SecondaryNav($(".js-secondary-nav"));
  }

  if ($(".js-account-nav").length) {
    const accountNav = new SecondaryNav($(".js-account-nav"));
  }

  // Dynamic Banners (Hero and Page Banner)
  const $banners = $(".js-dynamic-banner");
  if ($banners.length) {
    const dynamicBanners = $.makeArray($banners).map((el) => {
      return new DynamicBanner($(el));
    });
  }

  // Pause Video button
  document
    .querySelectorAll(".js-background-video")
    .forEach(initBackgroundVideo);

  // react Apps
  renderDynamicContentListing();
  renderSearch();

  if ($(".js-profile").length) {
    const previewControl = new ProfileControl(
      document.querySelector(".js-profile"),
    );
  }

  //handle interest group select all
  if ($(".js-interests-form").length) {
    const intersetsGroups = new InterestsGroups(
      document.querySelector(".js-interests-form"),
    );
  }

  [...document.querySelectorAll(".js-show-password")].forEach((el) => {
    const dynamicPassword = new DynamicPassword($(el));
  });

  if ($(".js-form").length) {
    Forms(document, window);
  }

  if ($(".js-privacy-banner").length) {
    new PrivacyModal($(".js-privacy-banner"));
  }
});

window.addEventListener("load", () => {});
