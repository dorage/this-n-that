# LetsTyping

Realistic simulation of keyboard typing

## Supported Languages

- [v] english
- [v] korean

## Features

⌨️ Implements realistic typing
⚡ Simple to use
🪴 Extend easily

## Installation

``` bash
pnpm add letstyping
```

## Cookbooks

### Simple Usage

``` typescript
const letsTyping = new LetsTyping();

letsTyping.type("닭발", (output, { timer, isLastCharacter, isLastComponent  }) => {
  console.log(output)   
  if(isLastComponent) timer(200)
  if(isLastCharacter) timer(400)
});
// it would work expectedely like below
// ㄷ (200ms)
// 다 (200ms)
// 달 (200ms)
// 닭 (400ms)
// 닭ㅂ (200ms)
// 닭바 (200ms)
// 닭발 (400ms)

```

### Extend language

``` typescript
import LetsTyping, { Languages } from 'letstyping';

const number = {
  condition: (char: string) => {
    if(char === '!') return true;
    return false;
  },
  disassemble: (char: string) => {
    return ['1', '!'];
  }
}

const letsTyping = new LetsTyping({
  langs: [ number ], // default *[ Languages.en, Languages.ko, ...(language extensions), Languages.fallback ]*
  defaultLang: false, // default *true*, only Languages.fallback would be added.
});


```

## Roadmaps

- [v] korean
- [v] english
- [] publish to npm 
- [] keymap mapping for sound

