import { ClientStorage } from "@/lib/storage";
import { composeStorageKey } from "@/modules";
import { loadDefaultJapaneseParser, Parser } from "budoux";

export const applyWordwrapOptionTypes = ["seperator", "wrapper"] as const;
export type ApplyWordwrapOptionType = typeof applyWordwrapOptionTypes[number];

export interface ApplyWordwrapOptions {
  type: ApplyWordwrapOptionType;
  seperator: string;
  wrapper: [string, string];
  threshold: number;
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
const defaultThreshold = 1000;
const minThreshold = 10;
const maxThreshold = 2000;
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
  minThreshold = minThreshold;
  maxThreshold = maxThreshold;

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
    options: ApplyWordwrapOptions,
    shouldUpdateHistory = true
  ): string {
    const trimmedText = text.trim();
    const words = this.analyzeText(trimmedText, options.threshold);

    if (shouldUpdateHistory) {
      this.addHistory({
        options,
        text: trimmedText,
      });
    }

    switch (options.type) {
      case "seperator":
        return options.seperator
          ? words.join(options.seperator)
          : words.join(this.defaultSeperator);
      case "wrapper":
        return options.wrapper
          ? words
              .map(
                (word) => `${options.wrapper[0]}${word}${options.wrapper[1]}`
              )
              .join("")
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

  getThresholdInRange(threshold: number) {
    return Math.max(Math.min(maxThreshold, threshold), minThreshold);
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
      threshold: defaultThreshold,
    },
  }),
  historyStorage: new ClientStorage<ApplyWordwrapHistory>({
    key: composeStorageKey("japanese-wordwrap-history"),
    defaultValue: [],
    beforeUpdate: (history) => history.slice(0, historyMaxLength),
  }),
});
