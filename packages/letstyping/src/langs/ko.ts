import { KEY_SWITCH } from "../constants/sfx";

const upperConsonants = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const lowerConsonants = [
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const componentSwitches = {
  // consonants
  ㄱ: [KEY_SWITCH.R2],
  ㄲ: [KEY_SWITCH.SHIFT, KEY_SWITCH.R2],
  ㄴ: [KEY_SWITCH.R3],
  ㄷ: [KEY_SWITCH.R2],
  ㄸ: [KEY_SWITCH.R4, KEY_SWITCH.R2],
  ㄹ: [KEY_SWITCH.R3],
  ㅁ: [KEY_SWITCH.R3],
  ㅂ: [KEY_SWITCH.R2],
  ㅃ: [KEY_SWITCH.R4, KEY_SWITCH.R2],
  ㅅ: [KEY_SWITCH.R2],
  ㅆ: [KEY_SWITCH.R4, KEY_SWITCH.R2],
  ㅇ: [KEY_SWITCH.R3],
  ㅈ: [KEY_SWITCH.R2],
  ㅉ: [KEY_SWITCH.R4, KEY_SWITCH.R2],
  ㅊ: [KEY_SWITCH.R4],
  ㅋ: [KEY_SWITCH.R4],
  ㅌ: [KEY_SWITCH.R4],
  ㅍ: [KEY_SWITCH.R4],
  ㅎ: [KEY_SWITCH.R3],
  // vowels
  ㅏ: [KEY_SWITCH.R3],
  ㅐ: [KEY_SWITCH.R3],
  ㅑ: [KEY_SWITCH.R2],
  ㅓ: [KEY_SWITCH.R3],
  ㅕ: [KEY_SWITCH.R2],
  ㅗ: [KEY_SWITCH.R3],
  ㅛ: [KEY_SWITCH.R2],
  ㅜ: [KEY_SWITCH.R4],
  ㅠ: [KEY_SWITCH.R4],
  ㅡ: [KEY_SWITCH.R4],
  ㅣ: [KEY_SWITCH.R3],
};

const ㄱ = "ㄱ".charCodeAt(0);
const 가 = "가".charCodeAt(0);

// if it is ㄱ~ㅎ or ㅏ~ㅣ
const isComponent = (charCode: number) => {
  // 30 consonants
  // 21 vowels
  return charCode >= ㄱ && charCode <= ㄱ + 51;
};

// if it is 가~힣
const isWord = (charCode: number) => {
  // 28 lower consonants (includes empty)
  // 21 vowels
  // 19 upper consonants
  return charCode >= 가 && charCode <= 가 + 19 * 21 * 28;
};

const isKorean = (charCode: number) => {
  return isComponent(charCode) || isWord(charCode);
};

const getComponent = (charCode: number) => {
  if (isComponent(charCode)) return {};
};

const getSound = (componentCharCode: number) => {};

export default {
  condition: (char: string) => {
    const charCode = char.charCodeAt(0);
    return isKorean(charCode);
  },
  destruct: (char: string) => {
    const charCode = char.charCodeAt(0);

    if (isComponent(charCode)) {
      return [{ value: char, sfx: [] }];
    }

    const consonant = Math.floor((charCode - 가) / (28 * 21));
    const vowel = Math.floor((charCode - 가 - consonant * 28 * 21) / 28);

    return [
      upperConsonants[consonant],
      String.fromCharCode(가 + vowel * 28 + consonant * 28 * 21),
      char,
    ];
  },
};
