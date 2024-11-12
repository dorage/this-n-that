import ko from "./ko";

test("must destruct expectedly", async () => {
  expect(ko.destruct("ㄱ")).toEqual(["ㄱ"]);
  expect(ko.destruct("가")).toEqual(["ㄱ", "가"]);
  expect(ko.destruct("각")).toEqual(["ㄱ", "가", "각"]);
  expect(ko.destruct("갅")).toEqual(["ㄱ", "가", "간", "갅"]);
  expect(ko.destruct("갏")).toEqual(["ㄱ", "가", "갈", "갏"]);
  expect(ko.destruct("씞")).toEqual(["ㅆ", "쓰", "씌", "씝", "씞"]);
});
