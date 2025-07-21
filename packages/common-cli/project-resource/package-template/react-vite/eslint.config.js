import js from "@eslint/js";
import lint from "@locked-dobby/eslint-config";
import { globalIgnores } from "eslint/config";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
// import tseslint from "typescript-eslint";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      /**
       * - 하단 lint 에서 반영 됩니다.
       */
      // tseslint.configs.recommended,
      // reactHooks.configs["recommended-latest"],
      // reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  ...lint.configs.base,
  ...lint.configs.typescript,
  ...lint.configs.react,
  ...lint.configs.vite,
]);
