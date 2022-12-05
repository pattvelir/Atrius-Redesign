import React from "react";
import { addDecorator } from "@storybook/react";
import { themes } from '@storybook/theming';
import "../frontend/js/index.js";
import "../build/css/index-generated.css";

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

 