import eslint from "@eslint/js";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: "eslint:recommended",
    plugins: { eslint },
    extends: ["eslint/recommended"],
  },
  {
    name: "custom:eslint:rules",
    rules: {}
  },
];

export { config };