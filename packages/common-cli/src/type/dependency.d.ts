export type Dependency = {
  name: string;
  version: string;
  targets: Array<"--save-peer" | "--save-dev" | "--save-prod">;
};
