// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import typescriptEngine from "typescript";
import { defineConfig } from "rollup";
import { readFileSync } from "fs";
import { dts } from "rollup-plugin-dts";

const packageJson = JSON.parse(readFileSync("package.json"));

export default defineConfig(
  {
    input: "src/index.ts",
    output: [
      {
        format: "cjs",
        file: packageJson.main,
        sourceMap: false,
        exports: "named",
        name: packageJson.name,
      },
      {
        format: "es",
        file: packageJson.modules,
        exports: "named",
        sourceMap: false,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        typescript: typescriptEngine,
        sourceMap: false,
        exclude: ["**/*.test.ts", "**/*.d.ts", "**/*.js", "dist"],
      }),
    ],
  },
  {
    input: "./dist/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
);
