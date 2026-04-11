import turbo from "eslint-plugin-turbo";

/** @type {import("eslint").Linter.Config[]} */
const config = [{
  name: "turbo:rules",
  plugins: { turbo },
}, {
  name: "custom:turbo:rules",
  rules: {
    "turbo/no-undeclared-env-vars": "warn",
  },
}];

export { config };