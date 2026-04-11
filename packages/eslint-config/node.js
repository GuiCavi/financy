import { defineConfig } from "eslint/config";
import globals from "globals";

import { config as BaseConfig } from "./base.js";
import { config as stylisticConfig } from "./configs/stylistic-common.js";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: "node:globals",
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...BaseConfig,
  ...stylisticConfig,
];

export default defineConfig(config);