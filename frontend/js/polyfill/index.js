// Note: object-fit has been refactored to be applied on-demand instead of automatically
// You may invoke it directly in your scripts

import "./es6-polyfill";
import "./closest";
import "./popstate-event";

//NodeList forEach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// Jonathan 10-2019 - this was missing for some reason.  I'm adding it, but leaving it commented out.
// import { objectFitPolyfill } from "./object-fit.js";
// if ("objectFit" in document.documentElement.style === false) {
//   objectFitPolyfill();
// }

import svg4everybody from "svg4everybody";
svg4everybody();
