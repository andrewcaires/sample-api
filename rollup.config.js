import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json";

const header = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description} 
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license: ${pkg.license}
 */`;

const input = "src/index.ts";

const external = [...Object.keys(pkg.dependencies)];

const banner = () => ({ renderChunk: (code) => header + "\n" + code });

export default [
  {
    input,
    external,
    output: [
      { file: pkg.main, format: "cjs", exports: "named" },
    ],
    plugins: [
      typescript({ module: "esnext", tsconfig: "./tsconfig.json" }),
      commonjs({ extensions: [".js", ".ts"] }),
      banner(),
    ],
  },
];
