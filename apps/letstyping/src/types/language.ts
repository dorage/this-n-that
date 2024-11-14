export type Language = {
  condition: (char: string) => boolean;
  disassemble: (char: string) => string[];
};

export const createLanguage = (lang: Language) => lang;
