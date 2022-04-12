import { ClientStorage } from "@/lib/storage";
import { composeStorageKey } from "@/modules";
import { loadDefaultJapaneseParser, Parser } from "budoux";

export const applyWordwrapOptionTypes = ["seperator", "wrapper"] as const;
export type ApplyWordwrapOptionType = typeof applyWordwrapOptionTypes[number];

export interface ApplyWordwrapOptions {
  type: ApplyWordwrapOptionType;
  seperator: string;
  wrapper: [string, string];
}

export interface ApplyWordwrapHistoryItem {
  text: string;
  options: ApplyWordwrapOptions;
}

export type ApplyWordwrapHistory = ApplyWordwrapHistoryItem[];

const defaultSeperator = "#";
const defaultWrapper: [string, string] = [
  `<span style="display:inline-block;">`,
  `</span>`,
];
const historyMaxLength = 20;

export interface JapaneseWordwrapServiceInit {
  parser: Parser;
  optionStorage: ClientStorage<ApplyWordwrapOptions>;
  historyStorage: ClientStorage<ApplyWordwrapHistory>;
}
export class JapaneseWordwrapService {
  private parser: Parser;
  private optionStorage: ClientStorage<ApplyWordwrapOptions>;
  private historyStorage: ClientStorage<ApplyWordwrapHistory>;
  defaultSeperator = defaultSeperator;
  defaultWrapper = defaultWrapper;

  constructor({
    historyStorage,
    optionStorage,
    parser,
  }: JapaneseWordwrapServiceInit) {
    this.parser = parser;
    this.optionStorage = optionStorage;
    this.historyStorage = historyStorage;
  }

  analyzeText(text: string, threshold = 1000): string[] {
    const words = this.parser.parse(text, threshold);

    return words;
  }

  applyWordwrap(
    text: string,
    { type, seperator, wrapper }: ApplyWordwrapOptions,
    shouldUpdateHistory = true
  ): string {
    const words = this.analyzeText(text);

    if (shouldUpdateHistory) {
      this.addHistory({
        options: {
          seperator,
          type,
          wrapper,
        },
        text,
      });
    }

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

  addHistory(item: ApplyWordwrapHistoryItem) {
    this.historyStorage.update([item, ...this.historyStorage.get()]);
  }

  getHistory() {
    return this.historyStorage.get();
  }

  getOptions() {
    return this.optionStorage.get();
  }

  updateOptions(options: ApplyWordwrapOptions) {
    this.optionStorage.update(options);
  }
}

export const japaneseWordWrapService = new JapaneseWordwrapService({
  parser: loadDefaultJapaneseParser(),
  optionStorage: new ClientStorage<ApplyWordwrapOptions>({
    key: composeStorageKey("japanese-wordwrap-options"),
    defaultValue: {
      type: "wrapper",
      wrapper: defaultWrapper,
      seperator: defaultSeperator,
    },
  }),
  historyStorage: new ClientStorage<ApplyWordwrapHistory>({
    key: composeStorageKey("japanese-wordwrap-history"),
    defaultValue: [],
    beforeUpdate: (history) => history.slice(0, historyMaxLength),
  }),
});
