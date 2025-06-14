import { spawnSync } from "child_process";

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
