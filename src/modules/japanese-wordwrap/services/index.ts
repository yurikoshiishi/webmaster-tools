import { ClientStorage } from "@/lib/storage";
import { loadDefaultJapaneseParser, Parser } from "budoux";

export const applyWordwrapOptionTypes = ["seperator", "wrapper"] as const;
export type ApplyWordwrapOptionType = typeof applyWordwrapOptionTypes[number];

export interface ApplyWordwrapOptions {
  type: ApplyWordwrapOptionType;
  seperator: string;
  wrapper: [string, string];
}

const defaultSeperator = "#";
const defaultWrapper: [string, string] = [
  `<span style="display:inline-block;">`,
  `</span>`,
];

export class JapaneseWordwrapService {
  private parser: Parser;
  private storage: ClientStorage<ApplyWordwrapOptions>;
  defaultSeperator = defaultSeperator;
  defaultWrapper = defaultWrapper;

  constructor(parser: Parser, storage: ClientStorage<ApplyWordwrapOptions>) {
    this.parser = parser;
    this.storage = storage;
  }

  analyzeText(text: string, threshold = 1000): string[] {
    const words = this.parser.parse(text, threshold);

    return words;
  }

  applyWordwrap(
    text: string,
    { type, seperator, wrapper }: ApplyWordwrapOptions
  ): string {
    const words = this.analyzeText(text);

    switch (type) {
      case "seperator":
        return seperator ? words.join(seperator) : words.join(defaultSeperator);
      case "wrapper":
        return wrapper
          ? words.map((word) => `${wrapper[0]}${word}${wrapper[1]}`).join("")
          : words
              .map(
                (word) =>
                  `${this.defaultWrapper[0]}${word}${this.defaultWrapper[1]}`
              )
              .join("");
    }
  }

  getOptions() {
    return this.storage.get();
  }

  updateOptions(options: ApplyWordwrapOptions) {
    this.storage.update(options);
  }
}

export const japaneseWordWrapService = new JapaneseWordwrapService(
  loadDefaultJapaneseParser(),
  new ClientStorage("japanese-wordwrap-options", {
    type: "wrapper",
    wrapper: defaultWrapper,
    seperator: defaultSeperator,
  })
);
