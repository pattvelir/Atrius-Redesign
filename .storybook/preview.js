import React from "react";
import { addDecorator } from "@storybook/react";
import { themes } from '@storybook/theming';

/* include assets here (instead of preview-head.html) so saving them triggers a reload */
// include _generated_ css so gulp does the compiling
// import "../build/css/index-generated.css";
// include the _entry_ javascript file, so webpack can take care of importing npm modules

// import "../frontend/js/index.js";
import "../frontend/js/index.js";
// import "../frontend/scss/postcss/custom-media.scss";
import "../frontend/scss/variables/_props-generated.scss";
// import "../frontend/scss/index.scss";

//load built css because src file custom media queries dont work 
import "../build/index-generated.css";

export const parameters = {
  layout: "fullscreen", // Remove padding from body
  options: {
    storySort: {
      method: "alphabetical",
      order: [ "Base", "Objects", "Components", "Containers", "Pages"],
    },
  },
  html: {
    prettier: {
      tabWidth: 4,
      useTabs: false,
     },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.normal}
  }
};

 