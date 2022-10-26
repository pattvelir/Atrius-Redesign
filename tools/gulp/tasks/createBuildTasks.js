const gulp = require("gulp");
const quench = require("../quench/quench.js");
const runCopyTask = require("../quench/runCopyTask.js");
const runSassTask = require("../quench/runSassTask.js");
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
const svgLib = require("rollup-plugin-svgsprite-generator");

module.exports = function createBuildTasks(projectRoot) {
  const buildDir = `${projectRoot}/build`;
  const frontendDir = `${projectRoot}/frontend`;
  const React = Object.keys(reactLib);
  const ReactDOM = Object.keys(reactDomLib);
  const PropTypes = Object.keys(propTypesLib);
  const svgsprite = svgLib.svgSprite;
  const extensions = [".js", ".jsx"];
  const js = () =>
    rollup
      .rollup({
        input: `${frontendDir}/js/index.js`,
        plugins: [
          scss({
            output: true,
            sourceMap: true,
            failOnError: true,
            prefix: '@import "./imports.scss";',
            processor: () => postcss([autoprefixer()]),
            verbose: true,
            watch: `${frontendDir}/**`,
            outputStyle: "compressed",
          }),
          copy({
            targets: [
              {
                src: [`${frontendDir}/img/**/*.{jpg,png,gif}`],
                dest: `${buildDir}/img/**`,
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
      })
      .then((bundle) => {
        return bundle.write({
          dir: `${buildDir}/js`,
          entryFileNames: "[name]-generated.js",
          chunkFileNames: "assets/[name]-[hash].[extName]",
          format: "es",
          sourcemap: "inline",
        });
      });

  const storybook = () => runCommand("npm run storybook");

  return gulp.series(js, storybook);
};
