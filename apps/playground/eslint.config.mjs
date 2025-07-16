import lint from "@locked-dobby/eslint-config";

const eslintConfig = [
  ...lint.configs.base,
  ...lint.configs.typescript,
  ...lint.configs.react,
  ...lint.configs.vite,
  {
    ignores: [
      "*.cjs",
      "node_modules",
      "project-attachment/**/*",
      "dist",
      ".vite",
      ".github",
    ],
  },
];

export default eslintConfig;
