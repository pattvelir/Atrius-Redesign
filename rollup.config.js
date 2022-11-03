import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
const { NODE_ENV = "production" } = process.env;

import * as R from "ramda";
 
import path from "path";
import yargs from "yargs";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import svgSprite from "./tools/gulp/quench/runRollupSvgSprite.js";
import fg from 'fast-glob';
import postcssJitProps from "postcss-jit-props";
import postcss from "rollup-plugin-postcss";
import postcssEncodeBackgroundSVGs from "postcss-encode-background-svgs";
import postcssPresetEnv from "postcss-preset-env";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
// import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import autoprefixer from "autoprefixer";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";
import OpenProps from "open-props";
import commonjs from "@rollup/plugin-commonjs";
//if .env is not defined set NODE_ENV to "production"
const env = yargs.argv.env || NODE_ENV;
const isWatching = yargs.argv.w;
const isLocal = env === "development" || env === "local";
const isCi = env === "ci";
const isProduction = env === "production";
const buildDir = "./build";
const frontendDir = "./frontend";
const extensions = [".js", ".jsx"];
console.log( isLocal &&
  isWatching);
const rollupPlugins = R.reject(
  //reject false
  (i) => !i,
  R.flatten([
     nodeResolve([".js"]),
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
   
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    
    }),
    commonjs(),
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
        isWatching && [
        livereload({ watch: path.resolve(buildDir), verbose: true }),
        {
          name: 'watch-external',
          async buildStart(){
              const files = await fg(`${frontendDir}/**/*.*`);
              for(let file of files){
                  this.addWatchFile(file);
              }
          }
      }] 
        
    ],
    ...[(isProduction || isCi) && terser()],
    ...[(isProduction || isCi) && filesize()],
  ]),
);

export default {
  input: [`${frontendDir}/js/index`],
  format: "es",
  output: {
    dir: `${buildDir}`,
    entryFileNames: "js/[name]-generated.js",
    chunkFileNames: "js/chunks/[name]-[hash].js",
    assetFileNames: "assets/[name]-generated[extname]",
    compact: true,
    format: "es",
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
