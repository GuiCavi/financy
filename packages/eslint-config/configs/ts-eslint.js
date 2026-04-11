import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: "tseslint:recommended",
    plugins: { tseslint },
    extends: ["tseslint/recommended"],
  },
  {
    name: "custom:tseslint:rules",
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
    },
  },
];

export { config };