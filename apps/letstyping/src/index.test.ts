import { LetsTyping } from ".";

test("must disassemble expectedly", async () => {
  const source = "abc012";

  const typing = new LetsTyping();

  const disassembled = typing.disassemble(source);
  expect(disassembled).toEqual(source.split("").map((char) => [char]));
});

test("must type expectedly", async () => {
  const source = "abc012";

  const typing = new LetsTyping();

  let i = 1;

  typing.type(source, (output) => {
    expect(output).toEqual(source.slice(0, i));
    i++;
  });
});

test("must work expectedly", async () => {
  const source = "abc012";
  const expectIsLastCharacter = [false, false, false, false, false, true];
  const expectIsLastComponent = [true, true, true, true, true, true];

  const typing = new LetsTyping();

  let i = 0;

  typing.type(source, (output, { isLastCharacter, isLastComponent }) => {
    expect(isLastComponent === expectIsLastComponent[i]).toEqual(true);
    expect(isLastCharacter === expectIsLastCharacter[i]).toEqual(true);
    i++;
  });
});

test("flag callback test", async () => {
  const source = "닭발";

  const typing = new LetsTyping();

  let beforeStart = false;
  let afterEnd = false;

  await typing.type(
    source,
    (output, { isLastCharacter, isLastComponent }) => {},
    {
      beforeStart() {
        beforeStart = true;
      },
      afterEnd() {
        afterEnd = true;
      },
    },
  );
  expect(beforeStart && afterEnd).toEqual(true);
});

describe("korean test", () => {
  test("must work expectedly", async () => {
    const source = "닭발";
    const expectedOutputs = ["ㄷ", "다", "달", "닭", "닭ㅂ", "닭바", "닭발"];

    const typing = new LetsTyping();

    let i = 0;

    typing.type(source, (output) => {
      expect(output === expectedOutputs[i]).toEqual(true);
      i++;
    });
  });
});
