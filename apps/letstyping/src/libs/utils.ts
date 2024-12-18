export const timer = (ms: number) =>
  new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, ms);
  });
