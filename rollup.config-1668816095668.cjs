'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dotenv = require('dotenv');
require('rollup-plugin-styles');
var R = require('ramda');
var path = require('path');
var yargs = require('yargs');
var pluginNodeResolve = require('@rollup/plugin-node-resolve');
var rollupPluginTerser = require('rollup-plugin-terser');
var svgstore = require('svgstore');
var fs = require('fs');
var fg = require('fast-glob');
var postcss = require('rollup-plugin-postcss');
require('postcss-preset-env');
var dynamicImportVar = require('@rollup/plugin-dynamic-import-vars');
var serve = require('rollup-plugin-serve');
var livereload = require('rollup-plugin-livereload');
var babel = require('@rollup/plugin-babel');
var copy = require('rollup-plugin-copy');
var filesize = require('rollup-plugin-filesize');
var commonjs = require('@rollup/plugin-commonjs');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var dotenv__namespace = /*#__PURE__*/_interopNamespaceDefault(dotenv);
var R__namespace = /*#__PURE__*/_interopNamespaceDefault(R);

/**
 * Usage: put svg's in svg.src directory.  eg. /img/svg-sprite/my-icon.svg
 *        They will be compiled into svg.filename. eg. /img/svg-sprite.svg
 *
 * In html: <svg><use xlink:href="/img/svg-sprite.svg#my-icon"></use></svg>
 *
 * In css: svg { fill: BlanchedAlmond; }
 */

function svgSprite(userConfig) {
  const defaultConfig = {
    /**
     * src   : glob of files to copy
     * dest  : destination folder
     * base  : *optional https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbase
     * watch : *optional, files to watch that will trigger a rerun when changed
     *          defaults to src
     */
    filename: "svg-sprite.svg",
  };

  const config = R__namespace.mergeDeepRight(defaultConfig, userConfig);

  if (!config.src || !config.dest) {
    throw new Error(
      `svgSprite requires src and dest. Was given \n${JSON.stringify(
        config,
        null,
        2,
      )}`,
    );
  }

  var sprites = svgstore({ inlineSvg: false });

  fs.readdir(config.src, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach((filename) => {
      const name = filename.split(".")[0];
      sprites.add(name, fs.readFileSync(`${config.src}/${filename}`, "utf8"));
    });

    fs.writeFileSync(`${config.dest}/${config.filename}`, sprites);
  });

  return {};
}

dotenv__namespace.config();
const { NODE_ENV = "production" } = process.env;

//if .env is not defined set NODE_ENV to "production"
const env = yargs?.argv?.env || NODE_ENV;
const isWatching = yargs?.argv?.w || false;
const isLocal = env === "development" || env === "local";
const isCi = env === "ci";
const isProduction = env === "production";
const buildDir = "./build";
const frontendDir = "./frontend";

// const scss = require("rollup-plugin-scss");
// const extensions = [".js", ".jsx"];
// console.log(isLocal && isWatching);
const rollupPlugins = R__namespace.reject(
  //reject false
  (i) => !i,
  R__namespace.flatten([
    postcss({ extract: path.resolve("build/css/index-generated.css") }),
    pluginNodeResolve.nodeResolve({
      browser: true,
      extensions: [".js", ".jsx", ".scss", ".css"],
    }),
    svgSprite({
      src: `${frontendDir}/img/svg`,
      dest: `${frontendDir}/img`,
    }),
    // scss({ verbose: true, output: false }),
    // styles({
    //   // mode: "emit",

    //   verbose: true,
    //   sourceMap: true,
    //   include: [`${frontendDir}/scss/index.scss`],
    //   mode: [
    //     "extract",
    //     // "inject",
    //     // {
    //     //   container: "head",
    //     //   singleTag: false,
    //     //   prepend: false,
    //     //   attributes: { id: "global" },
    //     // },
    //   ],
    //   // output: `${buildDir}/assets/index-generated.css`,
    //   // processor: () => postcss({ config: { path: "./postcss.config.js" } }),
    // }),
    // postcss(),

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
      copyOnce: false,
    }),
    //TODO GET BABELRC AND MERGE
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            corejs: 3,
          },
        ],
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
      ],
    }),
    commonjs(),
    dynamicImportVar(),
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
        isWatching && [
          {
            name: "watch-external",
            async buildStart() {
              const files = await fg(`${frontendDir}/**/*.*`);
              for (let file of files) {
                this.addWatchFile(file);
              }
            },
          },
          livereload({ watch: path.resolve(buildDir), verbose: true }),
        ],
    ],

    ...[(isProduction || isCi) && rollupPluginTerser.terser()],
    ...[(isProduction || isCi) && filesize()],
  ]),
);

var rollup_config = {
  input: [`${frontendDir}/js/index`],
  output: {
    dir: `${buildDir}`,
    entryFileNames: "js/[name]-generated.js",
    chunkFileNames: "js/chunks/[name]-[hash].js",
    assetFileNames: "assets/[name]-generated[extname]",
    sourcemap: isLocal ? "inline" : false,
  },
  watch:
    isLocal && isWatching
      ? {
          skipWrite: false,
          clearScreen: false,
          include: `${frontendDir}/**/*`,
        }
      : false,
  plugins: rollupPlugins,
};

exports.default = rollup_config;
