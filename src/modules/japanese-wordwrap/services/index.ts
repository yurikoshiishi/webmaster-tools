import { loadDefaultJapaneseParser, Parser } from "budoux";

export class JapaneseWordwrapService {
  parser: Parser;

  constructor(parser: Parser) {
    this.parser = parser;
  }

  analyzeText(text: string, threshold = 1000): string[] {
    const words = this.parser.parse(text, threshold);

    return words;
  }

  applyWordwrap(
    text: string,
    wrapStart = `<span style="display:inline-block;">`,
    wrapEnd = `</span>`
  ): string {
    const words = this.analyzeText(text);

    return words.map((word) => `${wrapStart}${word}${wrapEnd}`).join("");
  }
}

export const japaneseWordWrapService = new JapaneseWordwrapService(
  loadDefaultJapaneseParser()
);
