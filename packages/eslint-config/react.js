import { defineConfig } from "eslint/config";
import globals from "globals";

import { config as BaseConfig } from "./base.js";
import { config as stylisticConfig } from "./configs/stylistic-common.js";
import { config as stylisticJsxConfig } from "./configs/stylistic-jsx.js";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: "react:globals",
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  ...BaseConfig,
  ...stylisticConfig,
  ...stylisticJsxConfig,
];

export default defineConfig(config);