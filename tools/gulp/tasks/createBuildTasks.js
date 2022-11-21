const gulp = require("gulp");
const dynamicImportVars = require("@rollup/plugin-dynamic-import-vars");
const R = require("ramda");
// const runBrowserSyncTask = require("../quench/runBrowserSyncTask.js");
const rollup = require("rollup");
const resolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const replace = require("@rollup/plugin-replace");
const reactLib = require("react");
const reactDomLib = require("react-dom");
const propTypesLib = require("prop-types");
const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");
const autoprefixer = require("autoprefixer");
const scss = require("rollup-plugin-scss");
const copy = require("rollup-plugin-copy");
const { svgSprite } = require("../quench/runRollupSvgSprite.js");
const terserLib = require("rollup-plugin-terser");
const filesize = require("rollup-plugin-filesize");

const yargs = require("yargs");
// const styles = require("rollup-plugin-styles");
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcss = require("rollup-plugin-postcss");
const postcssEncodeBackgroundSVGs = require("postcss-encode-background-svgs");
const postcssPresetEnv = require("postcss-preset-env");
const path = require("path");

//if .env is not defined set NODE_ENV to "production"
const { NODE_ENV = "production" } = process.env;
const env = yargs.argv.env || NODE_ENV;
const isWatching = yargs.argv.watch;
const isLocal = env === "development" || env === "local";
const isCi = env === "ci";
const isProduction = env === "production";

module.exports = function createBuildTasks(projectRoot) {
  const buildDir = `${projectRoot}/build`;
  const frontendDir = `${projectRoot}/frontend`;
  const React = Object.keys(reactLib);
  const ReactDOM = Object.keys(reactDomLib);
  const PropTypes = Object.keys(propTypesLib);
  const terser = terserLib.terser;
  const extensions = [".js", ".jsx", ".scss", ".css", ".html"];
  console.log(isLocal && isWatching);

  const rollupPlugins = R.reject(
    //reject false
    (i) => !i,
    R.flatten([
      // webWorkerLoader(),
      svgSprite({
        src: `${frontendDir}/img/svg`,
        dest: `${frontendDir}/img`,
      }),
      postcss({
        minimize: true,
        sourceMap: "inline",
        loaders: ["sass-loader"],
        extract: path.resolve(`${buildDir}/assets/index-generated.css`),
        plugins: [
          postcssJitProps({
            ...OpenProps,
            files: [`${frontendDir}/scss/variables/_props-generated.scss`],
          }),
          postcssEncodeBackgroundSVGs,
          postcssPresetEnv({
            stage: 3,
            features: {
              "nesting-rules": true,
            },
          }),
          autoprefixer({
            // browsers:  browser list is defined in .browserlistrc
            grid: "autoplace",
          }),
        ],
      }),
      // dynamicImportVars(),
      copy({
        targets: [
          {
            src: `${frontendDir}/img/*`,
            dest: `${buildDir}/img`,
          },
          {
            src: [`${frontendDir}/index.html`],
            dest: buildDir,
          },
        ],
        copyOnce: true,
      }),
      resolve({
        extensions: extensions,
      }),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
      commonjs({
        include: "node_modules/**",
        namedExports: {
          react: React,
          "react-dom": ReactDOM,
          "prop-types": PropTypes,
          "node_modules/react-is/index.js": ["isValidElementType"],
          "react/jsx-runtime": ["Fragment", "jsx", "jsxs"],
        },
      }),
      dynamicImportVars(),
      ...[
        isLocal &&
          isWatching &&
          serve({
            open: true,
            verbose: true,
            contentBase: [buildDir],
            host: "localhost",
            port: 3000,
          }),
      ],
      ...[
        isLocal &&
          isWatching &&
          livereload({ watch: path.resolve(buildDir), verbose: true }),
      ],
      ...[(isProduction || isCi) && terser()],
      ...[(isProduction || isCi) && filesize()],
    ]),
  );

  console.log(rollupPlugins);

  const rollupTask = () =>
    rollup
      .rollup({
        input: [`${frontendDir}/js/index`],
        watch:
          isLocal && isWatching
            ? {
                chokidar: false,
                include: [path.resolve(`${frontendDir}`)],
              }
            : false,
        plugins: rollupPlugins,
      })
      .then((bundle) => {
        return bundle.write({
          dir: `${buildDir}`,
          entryFileNames: "js/[name]-generated.js",
          chunkFileNames: "js/chunks/[name]-[hash].js",
          assetFileNames: "assets/[name]-generated[extname]",
          compact: true,
          format: "es",
          sourcemap: isLocal ? "inline" : false,
        });
      });

  return gulp.series(rollupTask);
};
