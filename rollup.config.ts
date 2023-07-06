import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import license from "rollup-plugin-license";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import type { Plugin, RollupOptions } from "rollup";

// @ts-ignore
const dev = process.env["npm_lifecycle_event"] === "dev";

const createBundle = (
  input: string,
  output: RollupOptions["output"],
  ...plugins: Plugin[]
) => ({
  input,
  output,
  plugins: [
    svelte({
      include: "src/**/*.svelte",
      preprocess: sveltePreprocess(),
      emitCss: true,
      compilerOptions: { dev },
    }),
    typescript(),
    resolve({
      browser: true,
      extensions: [".svelte", ".ts", ".js"],
      dedupe: ["svelte"],
    }),
    ...(dev
      ? []
      : [
          terser({
            mangle: { properties: true },
            compress: { passes: 10 },
            output: { comments: false },
          }),
          license({ banner: { content: { file: "./LICENSE.txt" } } }),
        ]),
    ...plugins,
  ],
});

export default [
  createBundle("src/contentscript/index.ts", {
    file: "dist/contentscript.js",
    format: "cjs",
  }),
];
