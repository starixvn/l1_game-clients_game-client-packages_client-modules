const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { babel } = require("@rollup/plugin-babel");
const { terser } = require("rollup-plugin-terser");

const version = require("./package.json").version;
const banner = `/*!
 * Nex3 Client Modules v${version}
 */`;

module.exports = {
  input: "./build/umd/modules.js",
  output: [
    {
      file: "./build/modules.js",
      format: "umd",
      name: "modules",
      sourcemap: true,
      banner,
    },
    {
      file: "./build/modules.min.js",
      format: "umd",
      name: "modules",
      sourcemap: true,
      plugins: [terser()],
      banner,
    },
  ],
  plugins: [
    nodeResolve({
      browser: true,
    }),
    babel({
      babelHelpers: "bundled",
      presets: [["@babel/env"]],
      plugins: ["@babel/plugin-transform-object-assign"],
    }),
  ],
};
