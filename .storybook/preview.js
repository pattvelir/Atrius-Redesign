import React from "react";
import { addDecorator } from "@storybook/react";
import { themes } from '@storybook/theming';

/* include assets here (instead of preview-head.html) so saving them triggers a reload */
// include _generated_ css so gulp does the compiling
// import "../build/css/index-generated.css";
// include the _entry_ javascript file, so webpack can take care of importing npm modules
import "../build/js/index-generated.js";
// import "../frontend/js/index.js";
import "../build/assets/index-generated.css";
// import "../frontend/scss/index.css";
console.log( themes.dark );
export const parameters = {
  layout: "fullscreen", // Remove padding from body
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Pages", "Containers", "Components", "Objects", "Base"],
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.normal}
  }
};

 