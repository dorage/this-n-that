import path from "path";
import { LetsConfig } from "../src";
import { FindFileCondition } from "../src/libs/utils";
import { defaultConfig, fullyModifiedConfig } from "./const/configs";
import _ from "lodash";

// check load config is working well in various ways

// load config by condition and diff
const staticLoad = (condition: FindFileCondition) => {
  const letsconfig = LetsConfig.Load({
    file: condition,
    schema: defaultConfig,
  });

  return _.isEqualWith(letsconfig.config, fullyModifiedConfig, (a, b) => {
    if (typeof a === "function" && typeof b === "function") return true;
  });
};

const instanceLoad = (condition: FindFileCondition) => {
  const letsconfig = new LetsConfig({
    schema: defaultConfig,
  });
  letsconfig.loadConfig(condition);

  return _.isEqualWith(letsconfig.config, fullyModifiedConfig, (a, b) => {
    if (typeof a === "function" && typeof b === "function") return true;
  });
};

// find file conditions
const relativePath = "./test/configs/find-file/fully-modified.config.ts";
const absolutePath = path.join(process.cwd(), relativePath);
const regex = /find-file\.config\.ts/;
const matcher = (filename: string) => {
  return filename.includes("find-file");
};

describe("static method 'Load'", () => {
  // find by absolute path
  test("must find a config file by absolute path", async () => {
    expect(staticLoad(absolutePath)).toBeTruthy();
  });
  // find by relative path
  test("must find a config file by relative path", async () => {
    expect(staticLoad(relativePath)).toBeTruthy();
  });
  // find by regex
  test("must find a config file by regex", async () => {
    expect(staticLoad(regex)).toBeTruthy();
  });
  // find by matcher
  test("must find a config file by matcher", async () => {
    expect(staticLoad(matcher)).toBeTruthy();
  });
});

describe("instance method 'loadConfig'", () => {
  // find by absolute path
  test("must find a config file by absolute path", async () => {
    expect(instanceLoad(absolutePath)).toBeTruthy();
  });
  // find by relative path
  test("must find a config file by relative path", async () => {
    expect(instanceLoad(relativePath)).toBeTruthy();
  });
  // find by regex
  test("must find a config file by regex", async () => {
    expect(instanceLoad(regex)).toBeTruthy();
  });
  // find by matcher
  test("must find a config file by matcher", async () => {
    expect(instanceLoad(matcher)).toBeTruthy();
  });
});
