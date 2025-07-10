import { CreatePackageType } from "../../type/create-package";
import { Dependency } from "../../type/dependency";

const sharedDependencies: Array<Dependency> = [
  { name: "@swc/cli", version: "~0.7.7", targets: ["--save-dev"] },
  { name: "@swc/core", version: "~1.11.29", targets: ["--save-dev"] },
  { name: "chokidar", version: "~4.0.3", targets: ["--save-dev"] },
  { name: "concurrently", version: "~9.1.2", targets: ["--save-dev"] },
  { name: "typescript", version: "~5.8.3", targets: ["--save-dev"] },
  { name: "onchange", version: "~7.1.0", targets: ["--save-dev"] },
];

// TODO bulk install
export const dependencyConfigs: Record<CreatePackageType, Dependency[]> = {
  lib: [...sharedDependencies],
  "react-swc": [
    ...sharedDependencies,
    {
      name: "react",
      version: "~19.1.0",
      targets: ["--save-peer", "--save-dev"],
    },
    {
      name: "react-dom",
      version: "~19.1.0",
      targets: ["--save-peer", "--save-dev"],
    },
    {
      name: "@types/react",
      version: "~19.1.0",
      targets: ["--save-dev"],
    },
    {
      name: "@types/react-dom",
      version: "~19.1.0",
      targets: ["--save-dev"],
    },
  ],
  "react-vite": [
    {
      name: "react",
      version: "~19.1.0",
      targets: ["--save-prod"],
    },
    {
      name: "react-dom",
      version: "~19.1.0",
      targets: ["--save-prod"],
    },
    {
      name: "@eslint/js",
      version: "~9.29.0",
      targets: ["--save-dev"],
    },
    {
      name: "@types/react",
      version: "~19.1.0",
      targets: ["--save-dev"],
    },
    {
      name: "@types/react-dom",
      version: "~19.1.0",
      targets: ["--save-dev"],
    },
    {
      name: "@vitejs/plugin-react-swc",
      version: "~3.10.2",
      targets: ["--save-dev"],
    },
    {
      name: "eslint",
      version: "~9.29.0",
      targets: ["--save-dev"],
    },
    {
      name: "eslint-plugin-react-hooks",
      version: "~5.2.0",
      targets: ["--save-dev"],
    },
    {
      name: "eslint-plugin-react-refresh",
      version: "~0.4.20",
      targets: ["--save-dev"],
    },
    {
      name: "globals",
      version: "~16.2.0",
      targets: ["--save-dev"],
    },
    {
      name: "typescript",
      version: "~5.8.3",
      targets: ["--save-dev"],
    },
    {
      name: "typescript-eslint",
      version: "~8.34.1",
      targets: ["--save-dev"],
    },
    {
      name: "vite",
      version: "~7.0.0",
      targets: ["--save-dev"],
    },
    {
      name: "vite-plugin-dts",
      version: "~4.5.4",
      targets: ["--save-dev"],
    },
  ],
};
