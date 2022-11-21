const path = require("path");
module.exports = {
  stories: ["../frontend/**/*.stories.jsx"],
  addons: [
    "@whitespace/storybook-addon-html",
    "storybook-dark-mode",
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    "@storybook/preset-scss",
    "@storybook/addon-a11y",
    "@storybook/addon-links", 
    "@storybook/addon-essentials",
  ],
  core:{
    disableTelemetry: true,
  },
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ["style-loader", "css-loader", "sass-loader"],
  //     include: path.resolve(__dirname, "../"),
  //   });

  //   // Return the altered config
  //   return config;
  // }

};
