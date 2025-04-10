import js from "@eslint/js";
import ts from "typescript-eslint";

export default [

  js.configs.recommended,
  ...ts.configs.recommended,

  {
    "files": ["src/**/*"],
    "rules": {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "no-multi-spaces": ["error"],
      "no-unused-vars": ["warn"],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    "ignores": [
      "dist/**/*",
      "node_modules/**/*",
    ],
  },

];
