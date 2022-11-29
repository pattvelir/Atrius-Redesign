const postcssEncodeBackgroundSVGs = require("postcss-encode-background-svgs");
const postcss = require("postcss");
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
// const combineSelectors = require("postcss-combine-duplicated-selectors");
const postcssSimpleVars = require("postcss-simple-vars");
const importExtGlob = require("postcss-import-ext-glob");
// const buildDir = "./build";
const frontendDir = "../frontend";
const R = require("ramda");
const postcssCustomMedia = require("postcss-custom-media");

module.exports = (context) => {
  return postcss({
    minimize: context.options.env === "production" ? true : false,
    sourceMap: context.options.env === "production" ? false : "inline",
    loaders: ["sass-loader", "scss-loader", "style-loader", "css-loader"],
    // insertBefore: {
    //   "all-property": postcssSimpleVars,
    // },
    parser: "postcss-scss",

    syntax: "scss",
    plugins: R.unnest([
      require("postcss-nested"),
      autoprefixer(),
      postcssSimpleVars({ silent: true }),
      //todo: debug this
      postcssCustomMedia({
        preserve: false,
        importFrom: `${frontendDir}/scss/postcss/custom-media.scss.scss`, // => @custom-selector --small-viewport (max-width: 30em);
      }),
      postcssPresetEnv({
        stage: 2,
        features: {
          "custom-properties": {
            warnings: true,
          },
          "custom-media-queries": {
            preserve: true,
            //todo: debug this
            importFrom: "./frontend/scss/postcss/custom-media.scss", // => @custom-selector --small-viewport (max-width: 30em);
          },
        },
      }),
      // importExtGlob({ sort: "desc" }),
      postcssImport(),
      postcssJitProps({
        ...OpenProps,
        files: [`${frontendDir}/scss/variables/_props-generated.scss`],
      }),
      postcssEncodeBackgroundSVGs,
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
