import lint from "@locked-dobby/eslint-config";

import workspaceParent from "../../../eslint.config.mjs";

const eslintConfig = [...workspaceParent, lint.configs.react];

export default eslintConfig;
