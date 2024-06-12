import _ from "lodash";
export const diffArray = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  arr2.forEach((e) => set1.delete(e));
  if (set1.size > 0) return false;
  return true;
};

export const diffObject = <T1 extends object, T2 extends object>(
  obj1: T1,
  obj2: T2,
): boolean => {
  return _.isEqual(obj1, obj2);
};
