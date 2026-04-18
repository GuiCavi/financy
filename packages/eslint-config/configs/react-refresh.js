import pluginReactRefresh from "eslint-plugin-react-refresh";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: "react-refresh:recommended",
    extends: [pluginReactRefresh.configs.vite],
  },
  {
    name: "custom:react-refresh:rules",
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
];

export { config };