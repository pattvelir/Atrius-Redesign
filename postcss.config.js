const postcssEncodeBackgroundSVGs = require("postcss-encode-background-svgs");
const postcss = require("postcss");
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const combineSelectors = require("postcss-combine-duplicated-selectors");
const postcssSimpleVars = require("postcss-simple-vars");
const frontendDir = "./frontend";
const R = require("ramda");
const postcssCustomMedia = require("postcss-custom-media");
const animation = require("./frontend/scss/jit/animation.js");
module.exports = (context) => {
  return postcss({
    minimize: context.options.env === "production" ? true : false,
    sourceMap: context.options.env === "production" ? false : "inline",
    loaders: ["sass-loader", "style-loader", "css-loader", "postcss-loader"],
    syntax: "postcss-scss",
    parser: "postcss-scss",
    plugins: R.unnest([
      postcssJitProps({
        ...OpenProps,
        ...animation,
        files: [
          `${frontendDir}/scss/jit/_props-generated.scss`,
          `${frontendDir}/scss/jit/_props.scss`,
        ],
      }),
      require("postcss-atroot"),
      require("postcss-nested"),
      postcssSimpleVars({ silent: true }),
      postcssPresetEnv({
        stage: 2,
        features: {
          "custom-properties": {
            warnings: true,
            preserve: false,
          },
          "custom-media-queries": {
            preserve: false,
            importFrom: `${frontendDir}/scss/jit/_custom-media.pcss`,
          },
        },
      }),
      combineSelectors(),
      postcssImport(),

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
