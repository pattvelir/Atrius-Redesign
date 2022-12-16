const postcssEncodeBackgroundSVGs = require("postcss-encode-background-svgs");
const postcss = require("postcss");
const extractMediaQuery = require("postcss-extract-media-query");
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const combineSelectors = require("postcss-combine-duplicated-selectors");
const postcssSimpleVars = require("postcss-simple-vars");
const R = require("ramda");
const animation = require("./frontend/scss/jit/animation.js");
const path = require("path");

const {
  NODE_ENV = "production",
  FE_BUILD_DIR = "./build",
  FE_SRC_DIR = "./frontend",
} = process.env;

const plugins = (context) =>
  R.unnest([
    postcssImport(),
    require("postcss-atroot"),
    require("postcss-nested"),
    postcssSimpleVars({ silent: true }),
    combineSelectors(),
    postcssEncodeBackgroundSVGs,
    postcssPresetEnv({
      stage: 2,
      features: {
        "custom-properties": {
          warnings: true,
          preserve: false,
        },
        "custom-media-queries": {
          preserve: false,
          importFrom: `${FE_SRC_DIR}/scss/jit/_custom-media.pcss`,
        },
      },
    }),
    ...(context.options.env === "production"
      ? [
          cssnano({
            preset: "default",
          }),
        ]
      : []),
  ]);

module.exports = (context) => {
  return postcss({
    minimize: context.options.env === "production" ? true : false,
    sourceMap: context.options.env === "production" ? false : "inline",
    loaders: ["sass-loader", "style-loader", "css-loader"],
    syntax: "postcss-scss",
    parser: "postcss-scss",
    plugins: R.unnest([
      postcssJitProps({
        ...OpenProps,
        ...animation,
        files: [
          `${FE_SRC_DIR}/scss/jit/_props-generated.scss`,
          `${FE_SRC_DIR}/scss/jit/_props.scss`,
        ],
      }),
      // if production split up files based on media query
      ...(context.options.env === "production"
        ? [
            //since we are breaking pipe to create new files, we need to add plugins to run on these files.
            extractMediaQuery({
              queries: {
                "(--bp-x-small-min)": "x-small",
                "(--bp-small-min)": "small",
                "(--bp-medium-min)": "medium",
                "(--bp-large-min)": "large",
                "(--bp-x-large-min)": "x-large",
              },
              extractAll: false,
              output: {
                path: path.join(__dirname, `${FE_BUILD_DIR}/css`), // emit to 'dist' folder in root
                name: "[name]-[query]-generated.css", // pattern of emited files
              },
              config: {
                plugins: {
                  "postcss-combine-duplicated-selectors": {},
                  "postcss-encode-background-svgs": {},
                  "postcss-simple-vars": { silent: true },
                  "postcss-preset-env": {},
                  cssnano: {},
                  "postcss-custom-media": {
                    preserve: false,
                    importFrom: `${FE_SRC_DIR}/scss/jit/_custom-media.pcss`,
                  },
                  "postcss-custom-properties": {
                    warnings: true,
                    preserve: false,
                  },
                  "postcss-atroot": {},
                  "postcss-nested": {},
                },
              },
            }),
          ]
        : []),
      plugins(context),
    ]),
  });
};
