import { createLanguage } from "../types/language";

const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);
const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);

export default createLanguage({
  condition(char) {
    const charcode = char.charCodeAt(0);
    return (charcode >= a && charcode <= z) || (charcode >= A && charcode <= Z);
  },
  disassemble(char) {
    return [char];
  },
});
