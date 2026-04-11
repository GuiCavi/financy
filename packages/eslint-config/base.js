import { globalIgnores } from "eslint/config";
import onlyWarn from "eslint-plugin-only-warn";

import { config as eslintConfig } from "./configs/eslint.js";
import { config as importConfig } from "./configs/import.js";
import { config as tsConfig } from "./configs/ts-eslint.js";
import { config as turboConfig } from "./configs/turbo.js";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  globalIgnores(["dist/**"]),
  // {
  //   name: "matching files definition",
  //   files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  // },
  ...eslintConfig,
  ...tsConfig,
  ...turboConfig,
  ...importConfig,
  {
    name: "onlyWarn",
    plugins: { onlyWarn },
  },
];
