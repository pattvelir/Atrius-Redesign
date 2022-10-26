/**
 *  See ./readme.md for usage
 **/
const quench = require("./quench/quench.js");

const projectRoot = quench.resolvePath(__dirname, "../../");

const createBuildTasks = require("./tasks/createBuildTasks.js");

/**
 * gulp build
 *
 * to build for production/jenkins:
 *    node_modules/.bin/gulp build --no-watch --env production
 */
const build = createBuildTasks(projectRoot);
build.description = "Build frontend assets";
exports.build = build;
