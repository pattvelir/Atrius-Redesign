/**
 *  See ./readme.md for usage
 **/
const quench = require("./quench/quench.js");
const gulp = require("gulp");
const projectRoot = quench.resolvePath(__dirname, "../..");

const createDemoTasks = require("./tasks/createDemoTasks.js");
const createAtriusHealthTasks = require("./tasks/createAtriusHealthTasks.js");

/**
 * gulp AtriusHealth
 * to build for production/jenkins:
 *    node_modules/.bin/gulp AtriusHealth --no-watch --env production
 */
const AtriusHealth = createAtriusHealthTasks({ projectRoot });
AtriusHealth.description =
  "Build frontend assets for AtriusHealth. This will also start storybook when watching";
exports["AtriusHealth"] = AtriusHealth;

/**
 * gulp demo
 */
const demo = createDemoTasks({ projectRoot });
demo.description = "Build frontend assets for the Demo Theme";
exports["demo"] = demo;

/**
 * gulp build-all
 */
const buildAll = gulp.parallel(AtriusHealth, demo);
buildAll.description = "Build frontend for AtriusHealth and Demo projects";
exports["build-all"] = buildAll;

/**
 * gulp
 */
exports.default = quench.logHelp;
