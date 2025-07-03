import base from "@locked-dobby/eslint-config";

const eslintConfig = [
  ...base.configs.react,
  ...base.configs.typescript,
  {
    ignores: ["*.cjs", "node_modules", "dist", ".vite", ".github"],
  },
];

export default eslintConfig;
