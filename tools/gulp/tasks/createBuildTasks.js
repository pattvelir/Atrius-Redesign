const gulp = require("gulp");

const runCommand = require("../quench/runCommand.js");
const runBrowserSyncTask = require("../quench/runBrowserSyncTask.js");
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
const postcss = require("postcss");
const scss = require("rollup-plugin-scss");
const copy = require("rollup-plugin-copy");
const svgSprite = require("../quench/runRollupSvgSprite.js");
const terserLib = require("rollup-plugin-terser");
const filesize = require("rollup-plugin-filesize");
const webWorkerLoader = require("rollup-plugin-web-worker-loader");
const { NODE_ENV = "development" } = process.env;
const isProduction = NODE_ENV === "production";
const styles = require("rollup-plugin-styles");

module.exports = function createBuildTasks(projectRoot) {
  const buildDir = `${projectRoot}/build`;
  const frontendDir = `${projectRoot}/frontend`;
  const React = Object.keys(reactLib);
  const ReactDOM = Object.keys(reactDomLib);
  const PropTypes = Object.keys(propTypesLib);
  const terser = terserLib.terser;
  const extensions = [".js", ".jsx"];
  console.log(isProduction);
  const rollupTask = () =>
    rollup
      .rollup({
        input: [`${frontendDir}/js/index`],
     
        plugins: [
          webWorkerLoader(),
          svgSprite({
            src: `${frontendDir}/img/svg`,
            dest: `${frontendDir}/img`,
          }),
          styles({
            mode: [
              "extract",
              // {
              //   container: "body",
              //   singleTag: true,
              //   prepend: true,
              //   attributes: { id: "global" },
              // },
            ],
          }),
          // scss({
          //   output: true,
          //   include: [
          //     `${frontendDir}/scss/index.scss`,
          //     `${frontendDir}/js/components/**/*.scss`,
          //   ],
          //   sourceMap: true,
          //   failOnError: true,
          //   // prefix: '@import "./imports.scss";',
          //   processor: () => postcss([autoprefixer()]),
          //   verbose: true,
          //   watch: `${frontendDir}/**`,
          // }),
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
          serve({
            open: true,
            verbose: true,
            contentBase: [buildDir],
            host: "localhost",
            port: 3000,
          }),
          livereload({ watch: buildDir }),
        ],
        ...(isProduction && terser()),
        ...(isProduction && filesize()),
      })
      .then((bundle) => {
        return bundle.write({
          dir: `${buildDir}`,
          entryFileNames: "js/[name]-generated.js",
          chunkFileNames: "js/chunks/[name]-[hash].js",
          assetFileNames: "assets/[name]-generated[extname]",
          compact: true,
          format: "es",
          sourcemap: isProduction ? false : "inline",
        });
      });

  const storybook = () => runCommand("npm run storybook");

  return gulp.series(rollupTask, storybook);
};
