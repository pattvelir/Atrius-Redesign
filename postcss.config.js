const postcssEncodeBackgroundSVGs = require("postcss-encode-background-svgs");
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const combineSelectors = require("postcss-combine-duplicated-selectors");
const postcssSimpleVars = require("postcss-simple-vars");
const importExtGlob = require("postcss-import-ext-glob");
const buildDir = "./build";
const frontendDir = "./frontend";

module.exports = {
  minimize: true,
  sourceMap: "inline",
  loaders: ["sass-loader", "style-loader"],
  insertBefore: {
    "all-property": postcssSimpleVars,
  },
  // syntax: "postcss-scss",
  plugins: [
    postcssSimpleVars({ silent: true }),
    postcssPresetEnv({
      features: {
        "custom-properties": {
          warnings: false,
        },
        "custom-media-queries": {
          preserve: true,
        },
      },
    }),
    importExtGlob({ sort: "desc" }),
    postcssImport(),
    postcssJitProps({
      ...OpenProps,
      files: [`${frontendDir}/scss/variables/_props-generated.scss`],
    }),
    postcssEncodeBackgroundSVGs,
    // combineSelectors(),
    // cssnano({
    //   preset: "default",
    // }),
  ],
};
