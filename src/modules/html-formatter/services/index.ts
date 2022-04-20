import { ClientStorage } from "@/lib/storage";
import { composeStorageKey } from "@/modules";
import { Options } from "prettier";
import { format as prettierFormat } from "prettier/standalone";
import parserHTML from "prettier/parser-html";

export interface HTMLFormatterInit {
  formatFunction: typeof prettierFormat;
  optionStorage: ClientStorage<HTMLFormatterOptions>;
  historyStorage: ClientStorage<HTMLFormatterHistory>;
}

export interface HTMLFormatterOptions extends Options {}

export interface HTMLFormatterHistoryItem {
  originalHTML: string;
}

export type HTMLFormatterHistory = HTMLFormatterHistoryItem[];

const historyMaxLength = 1;

export class HTMLFormatterService {
  private formatFunction: typeof prettierFormat;
  private optionStorage: ClientStorage<HTMLFormatterOptions>;
  private historyStorage: ClientStorage<HTMLFormatterHistory>;

  constructor({
    formatFunction,
    historyStorage,
    optionStorage,
  }: HTMLFormatterInit) {
    this.formatFunction = formatFunction;
    this.historyStorage = historyStorage;
    this.optionStorage = optionStorage;
  }

  format(html: string, options?: HTMLFormatterOptions) {
    return this.formatFunction(html, {
      ...options,
      parser: "html",
      plugins: [parserHTML],
    });
  }

  addHistory(item: HTMLFormatterHistoryItem) {
    this.historyStorage.update([item, ...this.historyStorage.get()]);
  }

  getHistory() {
    return this.historyStorage.get();
  }

  getOptions() {
    return this.optionStorage.get();
  }

  updateOptions(options: HTMLFormatterOptions) {
    this.optionStorage.update(options);
  }
}

export const htmlFormatterService = new HTMLFormatterService({
  formatFunction: prettierFormat,
  historyStorage: new ClientStorage<HTMLFormatterHistory>({
    key: composeStorageKey("html-formatter-history"),
    defaultValue: [],
  }),
  optionStorage: new ClientStorage<HTMLFormatterOptions>({
    key: composeStorageKey("html-formatter-option"),
    defaultValue: {
      arrowParens: "always",
      singleQuote: false,
      tabWidth: 2,
      semi: true,
    },
  }),
});
