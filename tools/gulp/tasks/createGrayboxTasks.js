const gulp = require("gulp");
const quench = require("../quench/quench.js");
const runCopyTask = require("../quench/runCopyTask.js");
const runJsTask = require("../quench/runJsTask.js");
const runSassTask = require("../quench/runSassTask.js");
const runCommand = require("../quench/runCommand.js");
const runBrowserSyncTask = require("../quench/runBrowserSyncTask.js");
const runSvgSpriteTask = require("../quench/runSvgSpriteTask.js");

module.exports = function createGrayboxTasks(props) {
  const { projectRoot } = props;

  const buildDir = `${projectRoot}/src/Project/Graybox/code/assets/Graybox-build`;
  const frontendDir = `${projectRoot}/frontend/graybox`;
  const commonDir = `${projectRoot}/frontend/Common`;

  const copy = () =>
    runCopyTask({
      src: [
        `${frontendDir}/fonts/**/*`,
        `${frontendDir}/img/**/*`,
        `${frontendDir}/js/vendor/**/*`,
      ],
      dest: `${buildDir}`,
      base: `${frontendDir}`,
    });

  // const copyCommon = () =>
  //   runCopyTask({
  //     src: [
  //       `${commonDir}/fonts/**/*`,
  //       `${commonDir}/img/**/*`,
  //       `${commonDir}/js/vendor/**/*`,
  //     ],
  //     dest: `${buildDir}`,
  //     base: `${commonDir}`,
  //   });

  const sprite = () =>
    runSvgSpriteTask({
      src: `${frontendDir}/img/svg-sprite/**/*`,
      dest: `${buildDir}/img`,
      watch: `${frontendDir}/img/svg-sprite/**/*`,
    });

  const js = () =>
    runJsTask({
      dest: `${buildDir}/js/`,
      files: [
        {
          entry: `${frontendDir}/js/index.js`,
          filename: "index.js",
          watch: [`${frontendDir}/**/*.js`, `${frontendDir}/**/*.jsx`],
        },
      ],
    });

  const sass = () =>
    runSassTask({
      // scss should be before patterns to prevent unwanted overrides
      src: [
        `${frontendDir}/scss/**/*.scss`,
        `${frontendDir}/js/components/**/*.scss`,
        `${frontendDir}/prototypes/**/*.scss`,
      ],
      dest: `${buildDir}/css/`,
      filename: "index.css",
      sass: {
        includePaths: [`${frontendDir}/js/custom-vendor/slick-carousel/slick`],
      },
      watch: [`${frontendDir}/**/*.scss`],
    });

  const browserSync = () =>
    runBrowserSyncTask({
      // proxy: defined in local.js
      // server: {
      //   baseDir: `${projectRoot}/storybook-static-graybox`,
      // },
      serveStatic: [
        {
          route: "/assets/Graybox-build",
          dir: `${buildDir}/`,
        },
      ],
      files: [`${buildDir}/**`, "!**/*.map"],
    });

  const storybook = () =>
    runCommand(
      `${projectRoot}/node_modules/.bin/start-storybook --port 3030 --config-dir .storybook-graybox --static-dir ./src/Project/Graybox/code`,
    );

  const buildTasks = gulp.parallel(copy, sprite, js, sass);

  if (quench.isWatching()) {
    return gulp.series(buildTasks, gulp.parallel(storybook, browserSync));
  }
  else {
    return buildTasks;
  }
};
