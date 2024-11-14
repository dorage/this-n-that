import ko from "./ko";

test("must destruct expectedly", async () => {
  expect(ko.disassemble("ㄱ")).toEqual(["ㄱ"]);
  expect(ko.disassemble("가")).toEqual(["ㄱ", "가"]);
  expect(ko.disassemble("각")).toEqual(["ㄱ", "가", "각"]);
  expect(ko.disassemble("갅")).toEqual(["ㄱ", "가", "간", "갅"]);
  expect(ko.disassemble("갏")).toEqual(["ㄱ", "가", "갈", "갏"]);
  expect(ko.disassemble("씞")).toEqual(["ㅆ", "쓰", "씌", "씝", "씞"]);
});
