import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const { NODE_ENV = "production" } = process.env;
import styles from "rollup-plugin-styles";
// import path from 'path'

import * as R from "ramda";
// import { writeFileSync } from "fs";
import path from "path";
import yargs from "yargs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import svgSprite from "./tools/gulp/quench/runRollupSvgSprite.js";
import fg from "fast-glob";
// import postcssJitProps from "postcss-jit-props";
import postcss from "rollup-plugin-postcss";
// import postcssEncodeBackgroundSVGs from "postcss-encode-background-svgs";
import postcssPresetEnv from "postcss-preset-env";
import dynamicImportVar from "@rollup/plugin-dynamic-import-vars";
// import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
// import autoprefixer from "autoprefixer";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";
// import OpenProps from "open-props";
import commonjs from "@rollup/plugin-commonjs";

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
const rollupPlugins = R.reject(
  //reject false
  (i) => !i,
  R.flatten([
    postcss({ extract: path.resolve("build/css/index-generated.css") }),
    nodeResolve({
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

    ...[(isProduction || isCi) && terser()],
    ...[(isProduction || isCi) && filesize()],
  ]),
);

export default {
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
