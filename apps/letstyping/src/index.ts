const timer = (ms: number) =>
  new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, ms);
  });

export const destruct = (source: string) => {
  const result: string[][] = [];

  for (const s of source) {
  }

  return result;
};

export const typing = async (
  source: string,
  callback: (
    output: string,
    helper: {
      isLastComponent: boolean;
      isLastCharacter: boolean;
      timer: typeof timer;
    },
  ) => Promise<unknown>,
) => {
  let output = "";
  const characters = destruct(source);

  for (let i = 0; i < characters.length; i++) {
    const components = characters[i];
    for (let j = 0; j < components.length; j++) {
      const component = components[j];

      await callback(output + component, {
        isLastComponent: j === components.length - 1,
        isLastCharacter: i === characters.length - 1,
        timer,
      });
    }
    output += components[components.length - 1];
  }
};
