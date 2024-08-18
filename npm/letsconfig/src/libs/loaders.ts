import fs from "fs";

export const loaders: any = {
  ".js": (configPath: string) => {
    const module = require(configPath);
    return module.default;
  },
  ".ts": (configPath: string) => {
    const module = require(configPath);
    return module.default;
  },
  ".json": (configPath: string) => {
    const fileContent = fs.readFileSync(configPath, { encoding: "utf-8" });
    return JSON.parse(fileContent);
  },
};
