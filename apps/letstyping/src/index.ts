import { createLanguage as _createLanguage, Language } from "./types/language";

import ko from "./langs/ko";
import en from "./langs/en";
import fallback from "./langs/fallback";
import { timer } from "./libs/utils";

export const Languages = {
  ko,
  en,
};

export const createLanguage = _createLanguage;

export class LetsTyping {
  languages = [ko];

  constructor(opts?: { langs?: Language[]; defaultLang?: boolean }) {
    const defaultLang = opts?.defaultLang ?? true;
    const langs = opts?.langs ?? [];

    if (defaultLang) this.languages.push(en, ko);
    // push custom languages
    this.languages.push(...langs);
    this.languages.push(fallback);
  }

  // destruct characters of source into components
  disassemble(source: string) {
    const result: string[][] = [];

    for (const char of source) {
      for (const language of this.languages) {
        if (language.condition(char)) {
          result.push(language.disassemble(char));
          break;
        }
      }
    }

    return result;
  }

  // mocking typing
  async type(
    source: string,
    callback: (
      output: string,
      helper: {
        isLastComponent: boolean;
        isLastCharacter: boolean;
        timer: typeof timer;
      },
    ) => Promise<unknown> | unknown,
  ) {
    let output = "";
    const characters = this.disassemble(source);

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
  }
}
