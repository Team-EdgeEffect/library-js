import thePirates from "@locked-dobby/eslint-config";

const eslintConfig = [
  ...thePirates.configs.typescript,
  {
    ignores: [
      "*.cjs",
      "node_modules",
      "**/dist/**",
      ".vite",
      ".github",
      "packages/eslint-config/**/*.js",
      "packages/prettier-config/**/*.js",
    ],
  },
];

export default eslintConfig;
