import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

import { config as BaseConfig } from "./base.js";
import { config as reactHooksConfig } from "./configs/react-hooks.js";
import { config as reactRefreshConfig } from "./configs/react-refresh.js";
import { config as stylisticConfig } from "./configs/stylistic-common.js";
import { config as stylisticJsxConfig } from "./configs/stylistic-jsx.js";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: "react:globals",
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      ecmaVersion: 2020,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  ...BaseConfig,
  ...reactHooksConfig,
  ...reactRefreshConfig,
  ...stylisticConfig,
  ...stylisticJsxConfig,
];

export default defineConfig(config);