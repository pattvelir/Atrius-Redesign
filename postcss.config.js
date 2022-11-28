const postcssEncodeBackgroundSVGs = require("postcss-encode-background-svgs");
const postcss = require("postcss");

const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
// const combineSelectors = require("postcss-combine-duplicated-selectors");
// const postcssSimpleVars = require("postcss-simple-vars");
const importExtGlob = require("postcss-import-ext-glob");
// const buildDir = "./build";
const frontendDir = "./frontend";
const R = require("ramda");

module.exports = (context) => {
  return postcss({
    minimize: context.options.env === "production" ? true : false,
    sourceMap: context.options.env === "production" ? false : "inline",
    loaders: ["sass-loader", "style-loader", "css-loader"],
    // insertBefore: {
    //   "all-property": postcssSimpleVars,
    // },

    // syntax: "postcss-scss",
    plugins: R.unnest([
      require("postcss-nested"),
      autoprefixer(),
      // postcssSimpleVars({ silent: true }),
      postcssPresetEnv({
        features: {
          "custom-properties": {
            warnings: true,
          },
          "custom-media-queries": {
            preserve: false,
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
      ...(context.options.env === "production"
        ? [
            cssnano({
              preset: "default",
            }),
          ]
        : []),
    ]),
  });
};
