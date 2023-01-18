const gulp = require("gulp");
const quench = require("../quench/quench.js");
const runCopyTask = require("../quench/runCopyTask.js");
const runJsTask = require("../quench/runJsTask.js");
const runSassTask = require("../quench/runSassTask.js");
const runCommand = require("../quench/runCommand.js");
const runBrowserSyncTask = require("../quench/runBrowserSyncTask.js");
const runSvgSpriteTask = require("../quench/runSvgSpriteTask.js");

module.exports = function createDemoTasks(props) {
  const { projectRoot } = props;

  const buildDir = `${projectRoot}/src/Project/Demo/code/assets/Demo-build`;
  const frontendDir = `${projectRoot}/frontend/demo`;

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
      src: [
        `${frontendDir}/scss/index.scss`,
        `${frontendDir}/js/components/**/*.scss`,
        `${frontendDir}/prototypes/**/*.scss`,
        `${frontendDir}/scss/sitecore.scss`,
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
      serveStatic: [
        {
          route: "/assets/Demo-build",
          dir: `${buildDir}/`,
        },
      ],
      files: [`${buildDir}/**`, "!**/*.map"],
    });

  const storybook = () =>
    runCommand(
      `${projectRoot}/node_modules/.bin/start-storybook --port 3040 --config-dir .storybook-demo --static-dir ./src/Project/Demo/code`,
    );

  const buildTasks = gulp.parallel(copy, sprite, js, sass);

  if (quench.isWatching()) {
    return gulp.series(buildTasks, gulp.parallel(storybook, browserSync));
  }
  else {
    return buildTasks;
  }
};
