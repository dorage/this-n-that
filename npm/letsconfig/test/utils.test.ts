import path from "path";
import { findFilePath } from "../src/libs/utils";

const relativePath = "./test/configs/utils/blank.config.ts";

describe("findFilePath", () => {
  test("must find file by absolute path", () => {
    const absolutePath = path.join(process.cwd(), relativePath);
    expect(findFilePath(absolutePath)).toBeTruthy();
  });

  test("must find file by relative path", () => {
    expect(findFilePath(relativePath)).toBeTruthy();
  });

  test("must find file by regex", () => {
    const regex = /.*\.config\.ts/;
    expect(findFilePath(regex)).toBeTruthy();
  });

  test("must find file by matcher", () => {
    const matcher = (filepath: string) => filepath.includes(".config.ts");
    expect(findFilePath(matcher)).toBeTruthy();
  });

  test("must return absolute path by absolute path", () => {
    const absolutePath = path.join(process.cwd(), relativePath);
    const foundPath = findFilePath(absolutePath);
    expect(foundPath[0] !== ".").toBeTruthy();
  });

  test("must return absolute path by relative path", () => {
    const foundPath = findFilePath(relativePath);
    expect(foundPath[0] !== ".").toBeTruthy();
  });

  test("must return absolute path by regex", () => {
    const regex = /.*\.config\.ts/;
    const foundPath = findFilePath(regex);
    expect(foundPath[0] !== ".").toBeTruthy();
  });

  test("must return absolute path by matcher", () => {
    const matcher = (filepath: string) => filepath.includes(".config.ts");
    const foundPath = findFilePath(matcher);
    expect(foundPath[0] !== ".").toBeTruthy();
  });
});
