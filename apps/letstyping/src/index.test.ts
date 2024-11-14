import LetsTyping from ".";

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
