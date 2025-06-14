import fs from "fs-extra";

export const overwriteFile = (
  path: string,
  overwrites: { [key: string]: string }
) => {
  if (!overwrites) return;
  let fileContent = fs.readFileSync(path).toString();

  const entries = Object.entries(overwrites);
  for (const [key, value] of entries) {
    fileContent = fileContent.replace(new RegExp(`{${key}}`, "g"), value);
  }

  fs.writeFileSync(path, fileContent);
};

export const loadJsonFromFile = <T = Record<string, unknown>>(
  path: string
): T => {
  const fileContent = fs.readFileSync(path).toString();
  return JSON.parse(fileContent);
};

export const createFolder = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};
