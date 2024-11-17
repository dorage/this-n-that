import { createLanguage } from "../types/language";

export default createLanguage({
  condition() {
    return true;
  },
  disassemble(char) {
    return [char];
  },
});
