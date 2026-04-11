import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    name: "import:rules",
    plugins: { import: importPlugin },
    rules: {
      "import/no-anonymous-default-export": "off",
      "import/order": [
        "error",
        {
          named: true,
          "newlines-between": "always",
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "{.,..}/**/*.{css,scss}",
              group: "type",
              position: "after",
            },
          ],
          distinctGroup: true,
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          warnOnUnassignedImports: true,
        },
      ],
      "import/newline-after-import": [
        "error",
        {
          count: 1,
          exactCount: true,
          considerComments: true,
        },
      ],
    },
  },
];

export { config };