# LetsTyping

Realistic simulation of keyboard typing


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
import { LetsTyping } from 'letstyping';

const letsTyping = new LetsTyping();

letsTyping.type("닭발", (output, { timer, isLastCharacter, isLastComponent  }) => {
  console.log(output)   
  if(isLastComponent) timer(200)
  if(isLastCharacter) timer(400)
}, {
  beforeStart: () => {
    console.log('start typing')
  },
  afterEnd: () => {
    console.log('end typing')
  }
});
// expected output
//
// start typing
// ㄷ (200ms)
// 다 (200ms)
// 달 (200ms)
// 닭 (400ms)
// 닭ㅂ (200ms)
// 닭바 (200ms)
// 닭발 (400ms)
// end typing

```

### Extend language

``` typescript
import LetsTyping, { createLanguage, Languages } from 'letstyping';

const numberToSpecial = createLanguage({
  condition: (char: string) => {
    if(char === '!') return true;
    return false;
  },
  disassemble: (char: string) => {
    return ['1', '!'];
  }
})

const letsTyping = new LetsTyping({
  langs: [ Languages.ko ,numberToSpecial ], // default *[ Languages.en, Languages.ko, ...(language extensions), Languages.fallback ]*
  defaultLang: false, // default *true*, only Languages.fallback would be added.
});


```

## Supported Languages

- [v] english
- [v] korean

## Roadmaps

- [v] publish to npm 
- [] keymap mapping for sound

