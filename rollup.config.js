import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const { NODE_ENV = "production" } = process.env;
import * as R from "ramda";
import path from "path";
import yargs from "yargs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import svgSprite from "./tools/gulp/quench/runRollupSvgSprite.js";
import gzipPlugin from "rollup-plugin-gzip";
import postcss from "rollup-plugin-postcss";
import dynamicImportVar from "@rollup/plugin-dynamic-import-vars";
import babel from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";
import commonjs from "@rollup/plugin-commonjs";
import eslint from "@rollup/plugin-eslint";
import globals from "rollup-plugin-node-globals";
import builtins from "rollup-plugin-node-builtins";
import stylelint from "rollup-plugin-stylelint";
import { brotliCompress } from "zlib";
import { promisify } from "util";
import compression from "compression";
import browsersync from "rollup-plugin-browsersync";

const brotliPromise = promisify(brotliCompress);
const env = yargs?.argv?.environment || NODE_ENV;
const isWatching = yargs?.argv?.w || false;
const isLocal = env === "development" || env === "local";
const isCi = env === "ci";
const isProduction = env === "production";
const buildDir = "./build";
const frontendDir = "./frontend";
const rollupPlugins = R.reject(
  (i) => !i,
  R.flatten([
    postcss({
      extract: "css/index-generated.css",
      // inject: true,
      extensions: [".scss", ".css"],
      loaders: ["sass-loader"],
      config: {
        path: path.resolve("./postcss.config.js"),
        ctx: { env: yargs?.argv?.environment },
      },
    }),
    nodeResolve({
      // extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"],
      dedupe: ["react", "react-dom", "ramda", "lodash", "jquery"], // Default: []
      jsnext: true,
    }),
    svgSprite({
      src: `${frontendDir}/img/svg`,
      dest: `${frontendDir}/img`,
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
    dynamicImportVar({ warnOnError: true }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: "node_modules/**", // Default: undefined
      browser: true,
      preferBuiltins: false,
      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false
      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false, // Default: true
      // explicitly specify unresolvable named exports
      // (see below for more details)
      // namedExports: { './module.js': ['foo', 'bar' ] }  // Default: undefined
    }),
    eslint({
      exclude: ["frontend/**/*.scss", "node_modules/**"],
    }),
    stylelint.default(),
    ...[
      isLocal &&
        isWatching &&
        browsersync({
          server: "build",
          watch: true,
          middleware: [compression()],
        }),
    ],
    ...[
      (isProduction || isCi) &&
        terser({
          ecma: "2019",
        }),
    ],
    ...[
      (isProduction || isCi) &&
        gzipPlugin.default({
          additionalFiles: ["./build/index.html"],
          customCompression: (content) => brotliPromise(Buffer.from(content)),
          fileName: ".br",
        }),
    ],
    ...[(isProduction || isCi) && filesize()],
    globals(),
    builtins(),
  ]),
);

export default {
  input: [`${frontendDir}/js/index.js`],
  output: {
    format: "esm",
    dir: `${buildDir}`,
    entryFileNames: "js/index-generated.js",
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
