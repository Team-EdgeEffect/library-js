import lint from "@locked-dobby/eslint-config";

const eslintConfig = [
  ...lint.configs.base,
  ...lint.configs.typescript,
  {
    ignores: [
      "*.cjs",
      "node_modules",
      "project-attachment/**/*",
      "**/dist/**",
      ".vite",
      ".github",
      "packages/eslint-config/**/*.js",
      "packages/prettier-config/**/*.js",
    ],
  },
];

export default eslintConfig;
