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

const node = [];
const external = [...node, ...Object.keys(pkg.dependencies)];

const banner = () => ({ renderChunk: (code) => header + "\n" + code });

const tsc = () => typescript({ module: "esnext", tsconfig: "./tsconfig.json" });

const onwarn = (warning, rollupWarn) => {

  if (warning.code == "CIRCULAR_DEPENDENCY") {

    return;
  }

  rollupWarn(warning);
};

export default [
  {
    input,
    external,
    output: [
      { file: pkg.main, format: "es" },
    ],
    plugins: [
      tsc(),
      commonjs({ extensions: [".js", ".ts"] }),
      banner(),
    ],
    onwarn,
  },
];
