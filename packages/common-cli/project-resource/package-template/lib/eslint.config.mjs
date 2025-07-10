import lint from "@locked-dobby/eslint-config";

const eslintConfig = [
  ...lint.configs.base,
  ...lint.configs.typescript,
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
