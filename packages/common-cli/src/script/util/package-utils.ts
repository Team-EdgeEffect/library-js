import { spawnSync } from "child_process";
import fs from "fs-extra";

import { Dependency } from "../../type/dependency";

type DependencyTarget = "--save-peer" | "--save-dev" | "--save-prod";

type InstallPackageSyncArgs = {
  packageManager?: "pnpm";
  dependencyTargets?: Array<DependencyTarget>;
  packageList: string[];
  packageRootPath: string;
};

export const installPackageSync = ({
  packageManager = "pnpm",
  dependencyTargets = ["--save-prod"],
  packageList,
  packageRootPath,
}: InstallPackageSyncArgs) => {
  return spawnSync(
    packageManager,
    ["add", ...packageList, ...dependencyTargets],
    {
      stdio: "inherit",
      cwd: packageRootPath,
    }
  );
};

export const setDependenciesToPackageJson = (
  packageJsonPath: string,
  dependencies: Dependency[]
) => {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  dependencies.forEach((dependency) => {
    // peer 의존성은 dev에도 포함
    if (dependency.targets.includes("--save-peer")) {
      if (!packageJson.peerDependencies) {
        packageJson.peerDependencies = {};
      }
      packageJson.peerDependencies[dependency.name] = dependency.version;

      if (!packageJson.devDependencies) {
        packageJson.devDependencies = {};
      }
      packageJson.devDependencies[dependency.name] = dependency.version;
    }

    // dev 의존성 처리
    if (dependency.targets.includes("--save-dev")) {
      if (!packageJson.devDependencies) {
        packageJson.devDependencies = {};
      }
      packageJson.devDependencies[dependency.name] = dependency.version;
    }

    // prod 의존성 처리
    if (dependency.targets.includes("--save-prod")) {
      if (!packageJson.dependencies) {
        packageJson.dependencies = {};
      }
      packageJson.dependencies[dependency.name] = dependency.version;
    }
  });

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};
