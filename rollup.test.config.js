// rollup.config.js

import autoprefixer from "autoprefixer";
import babel from "rollup-plugin-babel";
import browsersync from "rollup-plugin-browsersync";
import commonjs from "rollup-plugin-commonjs";
import css from "rollup-plugin-css-only";
import cssnano from "cssnano";
import { eslint } from "rollup-plugin-eslint";
import fs from "fs";
import license from "rollup-plugin-license";
import postcss from "postcss";
import filesize from "rollup-plugin-filesize";
import resolve from "rollup-plugin-node-resolve";
import sass from "rollup-plugin-sass";
import stylelint from "rollup-plugin-stylelint";
import { uglify } from "rollup-plugin-uglify";

const pkg = require("./package.json");
const banner = ["/*!", pkg.name, pkg.version, "*/\n"].join(" ");

const sassOptions = {
  output(styles, styleNodes) {
    fs.mkdirSync("build/css", { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });

    styleNodes.forEach(({ id, content }) => {
      const scssName = id.substring(id.lastIndexOf("/") + 1, id.length);
      const name = scssName.split(".")[0];
      fs.writeFileSync(`build/css/${name}.css`, content);
    });
  },
  processor: (css) =>
    postcss([
      autoprefixer({
        grid: false,
      }),
      cssnano(),
    ])
      .process(css)
      .then((result) => result.css),
};

const plugins = [
  resolve(),
  commonjs(),

  babel({
    exclude: "node_modules/**",
  }),
  css({ output: false }),
];

if (!process.env.DEVELOPMENT) {
  plugins.push(
    sass({
      output: false,
    }),
  );
}

// If we are running with --environment DEVELOPMENT, serve via browsersync for local development
if (process.env.DEVELOPMENT) {
  plugins.push(sass(sassOptions));

  plugins.push(
    browsersync({
      host: "localhost",
      watch: true,
      port: 3000,
      notify: false,
      open: true,
      server: {
        baseDir: "./build",
      },
    }),
  );
}

plugins.push(license({ banner }));
plugins.push(filesize());

const rollupBuilds = [
  // Generate unminifed bundle
  {
    input: "./frontend/js/index.js",
    output: {
      dir: "./build",
      entryFileNames: "js/[name]-generated.js",
      chunkFileNames: "js/chunks/[name]-[hash].js",
      assetFileNames: "assets/[name]-generated[extname]",
      compact: true,
      format: "es",
      sourcemap: process.env.DEVELOPMENT ? "inline" : false,
    },
    plugins,
  },
];

if (!process.env.DEVELOPMENT) {
  rollupBuilds.push(
    // Generate minifed bundle
    {
      input: "./src/js/shepherd.js",
      output: {
        file: "dist/js/shepherd.min.js",
        format: "umd",
        name: "Shepherd",
        sourcemap: true,
      },
      plugins: [
        resolve(),
        commonjs(),
        babel({
          exclude: "node_modules/**",
        }),
        license({
          banner,
        }),
        sass(sassOptions),
        css({ output: false }),
        uglify(),
        filesize(),
      ],
    },
  );
}

export default rollupBuilds;
