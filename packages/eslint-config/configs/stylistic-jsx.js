import stylistic from "@stylistic/eslint-plugin";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: "stylistic:jsx",
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/jsx-self-closing-comp": "error",
      "@stylistic/jsx-one-expression-per-line": ["error", { "allow": "single-child" }],
      "@stylistic/jsx-max-props-per-line": ["error", { "maximum": 2, "when": "multiline" }],
      "@stylistic/jsx-curly-newline": ["error", {
        multiline: "consistent",
        singleline: "forbid",
      }],
      "@stylistic/jsx-curly-spacing": ["error", { "when": "never" }],
      "@stylistic/jsx-equals-spacing": ["error", "never"],
      "@stylistic/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
      "@stylistic/jsx-indent-props": ["error", 2],
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "@stylistic/jsx-closing-tag-location": "error",
      "@stylistic/jsx-closing-bracket-location": "error",
      "@stylistic/jsx-wrap-multilines": ["error", {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "ignore",
        logical: "ignore",
        prop: "ignore",
        propertyValue: "ignore",
      }],
    },
  },
];

export { config };