import _ from "lodash";
export const diffArray = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  arr2.forEach((e) => set1.delete(e));
  if (set1.size > 0) return false;
  return true;
};

export const isEqualObject = <T1 extends object, T2 extends object>(
  obj1: T1,
  obj2: T2,
): boolean => {
  return _.isEqualWith(obj1, obj2, (a, b) => {
    if (typeof a === "function" || typeof b === "function") {
      return typeof a === "function" && typeof b === "function";
    }
    return undefined;
  });
};
