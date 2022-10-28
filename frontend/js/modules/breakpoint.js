import $ from "jquery";

// Extract current breakpoint name as string from DOM
// More details: https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript
export const breakpoint = () => {
  return window
    .getComputedStyle(document.querySelector("body"), "::before")
    .getPropertyValue("content")
    .replace(/\"/g, "");
};
