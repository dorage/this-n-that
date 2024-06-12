import fs from "fs";
import path from "path";

// replace obj1 properties by obj2
// if there has no key in obj1, then it would be ignored
export const deepReplace = <T extends object>(obj1: T, obj2: any): T => {
  const newObj: any = {};
  const keys1 = Object.getOwnPropertyNames(obj1);
  const keys2 = new Set(Object.getOwnPropertyNames(obj2));

  for (const key1 of keys1) {
    const prop1 = obj1[key1 as keyof typeof obj1] as any;
    const prop2 = obj2[key1 as keyof typeof obj2] as any;

    // if obj2 has no 'key1' property
    if (!keys2.has(key1)) {
      newObj[key1] = prop1;
      continue;
    }
    // if type is nested object
    if (typeof prop1 === "object" && typeof prop2 === "object") {
      newObj[key1] = deepReplace(prop1, prop2);
      continue;
    }
    newObj[key1] = prop2;
  }
  return newObj;
};

export type FindFileCondition =
  | string
  | RegExp
  | ((filename: string) => boolean);

// find file recursively along directory, Bottom-Up
const findFilePathRecursive = (
  condition: FindFileCondition,
  findingPath?: string,
): string => {
  findingPath = findingPath ?? process.cwd();

  const dirs = fs.readdirSync(findingPath);

  if (typeof condition === "string") {
    const filePath = path.join(findingPath, condition);
    if (fs.existsSync(filePath)) return filePath;
  } // end if string
  else {
    for (const dir of dirs) {
      const filePath = path.join(findingPath, dir);

      // if filePath is directory, continue
      if (fs.lstatSync(filePath).isDirectory()) continue;

      // if condition is function
      if (typeof condition === "function") {
        if (condition(dir)) return filePath;
        continue;
      }

      // if condition is regex
      if (condition instanceof RegExp) {
        if (condition.test(dir)) return filePath;
        if (condition.test(filePath)) return filePath;
        continue;
      }
    } // for
  } // else

  const parentPath = path.join(findingPath, "..");
  if (parentPath === findingPath) throw new Error("Can't find a file");

  return findFilePathRecursive(condition, parentPath);
};

// find file
export const findFilePath = (condition: FindFileCondition) => {
  if (typeof condition === "string") {
    // if, condition is absolute path
    if (!condition.startsWith(".") && fs.existsSync(condition))
      return condition;
  }

  // etc.
  return findFilePathRecursive(condition);
};
