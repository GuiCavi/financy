import stylistic from "@stylistic/eslint-plugin";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: "stylistic:common",
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/semi": ["error", "always"],
      "@stylistic/member-delimiter-style": "error",
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/keyword-spacing": ["error", { "before": true, "after": true }],
      "@stylistic/lines-between-class-members": ["error", "always"],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/semi-spacing": ["error", { "before": false, "after": true }],
      "@stylistic/space-before-blocks": "error",
      "@stylistic/type-generic-spacing": ["error"],
      "@stylistic/space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always",
      }],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": ["error", { "words": true, "nonwords": false }],
      "@stylistic/spaced-comment": ["error", "always"],
      "@stylistic/semi-style": ["error", "last"],
      "@stylistic/comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "always-multiline",
      }],
    },
  },
];

export { config };