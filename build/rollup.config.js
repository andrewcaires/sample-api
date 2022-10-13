import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

import pkg from "../package.json";

const name = "sample";

const external = [

  ...Object.keys(pkg.dependencies),

];

const output = (formats) => {

  return Object.keys(formats).map((format) => {

    return { name, exports: "named", file: formats[format], format };
  });
};

export default [
  {
    external,
    input: "src/index.ts",
    output: output({ cjs: pkg.main }),
    plugins: [
      typescript({ module: "esnext", tsconfig: "./tsconfig.json" }),
      commonjs({ extensions: [".js", ".ts"] }),
    ],
  },
];
