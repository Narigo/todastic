import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import vue from "rollup-plugin-vue";

const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: "src/client/client.js",
  output: {
    format: "esm",
    file: "src/dist/client.dist.js"
  },
  plugins: [
    resolve(),
    replace({
        "process.env.NODE_ENV": JSON.stringify("production")
    }),
    commonjs({}),
    vue({
      template: {
        isProduction,
        compilerOptions: { preserveWhitespace: false }
      },
      css: true
    })
  ]
};