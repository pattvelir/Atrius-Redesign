const path = require("path");


module.exports = {
  stories: ["../frontend/**/*.stories.jsx"],
  addons: [
    "@whitespace/storybook-addon-html",
    "storybook-dark-mode",
    "@storybook/preset-scss",
    "@storybook/addon-a11y",
    "@storybook/addon-links", 
    "@storybook/addon-essentials",
    // {
    //   name: "@storybook/addon-essentials",
    //   options: {
    //     backgrounds: false,
    //   },
    // },
  ],
  core:{
    disableTelemetry: true,
  },
  webpackFinal: async (config, { configType }) => {
    // get index of css rule
    const ruleCssIndex = config.module.rules.findIndex(
      (rule) => rule.test.toString() === "/\\.css$/"
    );

    // map over the 'use' array of the css rule and set the 'module' option to true
    config.module.rules[ruleCssIndex].use.map((item) => {
      if (item.loader && item.loader.includes("/css-loader/")) {
        item.options.modules = {
          mode: "local",
          localIdentName:
            configType === "PRODUCTION"
              ? "[local]__[hash:base64:5]"
              : "[name]__[local]__[hash:base64:5]",
        };
      }

      return item;
    });

    return config;
  },

};
