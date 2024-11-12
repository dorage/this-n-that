import { KEY_SWITCH } from "../constants/sfx";

// 자음 등장 순
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

// 모음 중 합성되는 경우
const vowels = [
  0, // 가
  0, // 개
  0, // 갸
  0, // 걔
  0, // 거
  0, // 게
  0, // 겨
  0, // 계
  0, // 고
  1, // 과
  2, // 괘
  3, // 괴
  0, // 교
  0, // 구
  1, // 궈
  2, // 궤
  3, // 귀
  0, // 규
  0, // 그
  1, // 긔
  0, // 기
];

// 아랫자음 중 합성되는 경우
const lowerConsonants = [
  0, //  "",
  0, //  "ㄱ",
  0, //  "ㄲ",
  2, //  "ㄳ",
  0, //  "ㄴ",
  1, //  "ㄵ",
  2, //  "ㄶ",
  0, //  "ㄷ",
  0, //  "ㄹ",
  1, //  "ㄺ",
  2, //  "ㄻ",
  3, //  "ㄼ",
  4, //  "ㄽ",
  5, //  "ㄾ",
  6, //  "ㄿ",
  7, //  "ㅀ",
  0, //  "ㅁ",
  0, //  "ㅂ",
  1, //  "ㅄ",
  0, //  "ㅅ",
  0, //  "ㅆ",
  0, //  "ㅇ",
  0, //  "ㅈ",
  0, //  "ㅊ",
  0, //  "ㅋ",
  0, //  "ㅌ",
  0, //  "ㅍ",
  0, //  "ㅎ",
];

const componentSwitches = {
  // consonants
  ㄱ: [KEY_SWITCH.R2],
  ㄲ: [KEY_SWITCH.SHIFT, KEY_SWITCH.R2],
  ㄴ: [KEY_SWITCH.R3],
  ㄷ: [KEY_SWITCH.R2],
  ㄸ: [KEY_SWITCH.SHIFT, KEY_SWITCH.R2],
  ㄹ: [KEY_SWITCH.R3],
  ㅁ: [KEY_SWITCH.R3],
  ㅂ: [KEY_SWITCH.R2],
  ㅃ: [KEY_SWITCH.SHIFT, KEY_SWITCH.R2],
  ㅅ: [KEY_SWITCH.R2],
  ㅆ: [KEY_SWITCH.SHIFT, KEY_SWITCH.R2],
  ㅇ: [KEY_SWITCH.R3],
  ㅈ: [KEY_SWITCH.R2],
  ㅉ: [KEY_SWITCH.SHIFT, KEY_SWITCH.R2],
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
      return [char];
    }

    const result: string[] = [];

    // upper consonant
    const upper = Math.floor((charCode - 가) / (28 * 21));
    result.push(upperConsonants[upper]);

    // upper consonant + lower consonant
    const vowel = Math.floor((charCode - 가 - upper * 28 * 21) / 28);
    if (vowels[vowel] !== 0) {
      result.push(
        String.fromCharCode(
          가 + (vowel - vowels[vowel]) * 28 + upper * 28 * 21,
        ),
      );
    }
    result.push(String.fromCharCode(가 + vowel * 28 + upper * 28 * 21));
    if (result[result.length - 1] === char) return result;

    // upper consonant + lower consonant
    const lower = (charCode - 가 - upper * 28 * 21) % 28;
    if (lowerConsonants[lower] !== 0) {
      result.push(
        String.fromCharCode(
          가 + vowel * 28 + upper * 28 * 21 + lower - lowerConsonants[lower],
        ),
      );
    }
    result.push(String.fromCharCode(가 + vowel * 28 + upper * 28 * 21 + lower));
    return result;
  },
};
