import { ClientStorage } from "@/lib/storage";
import { composeStorageKey } from "@/modules";
import { minify as minifyHTMLString, Options } from "html-minifier-terser";

export interface HTMLMinifierServiceInit {
  minifyHTML: typeof minifyHTMLString;
  optionStorage: ClientStorage<MinifyOptions>;
}

export interface MinifyOptions extends Options {}

export class HTMLMinifierService {
  private minifyHTML: typeof minifyHTMLString;
  private optionStorage: ClientStorage<MinifyOptions>;

  constructor({ minifyHTML, optionStorage }: HTMLMinifierServiceInit) {
    this.minifyHTML = minifyHTML;
    this.optionStorage = optionStorage;
  }

  static async build(): Promise<HTMLMinifierService> {
    const htmlMinifier = await import(
      //@ts-ignore
      "html-minifier-terser/dist/htmlminifier.esm.bundle"
    );
    return new HTMLMinifierService({
      minifyHTML: htmlMinifier.minify,
      optionStorage: new ClientStorage<MinifyOptions>({
        key: composeStorageKey("html-minifier-options"),
        defaultValue: {
          continueOnParseError: false,
          caseSensitive: false,
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: false,
          collapseWhitespace: true,
          conservativeCollapse: false,
          decodeEntities: true,
          html5: true,
          includeAutoGeneratedTags: false,
          keepClosingSlash: false,
          maxLineLength: undefined,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: false,
          noNewlinesBeforeTagClose: false,
          preserveLineBreaks: false,
          preventAttributesEscaping: false,
          processConditionalComments: true,
          processScripts: undefined,
          quoteCharacter: undefined,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeEmptyElements: false,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeTagWhitespace: true,
          sortAttributes: true,
          sortClassName: true,
          trimCustomFragments: true,
          useShortDoctype: true,
        },
      }),
    });
  }

  async minify(html: string, options: MinifyOptions) {
    return await this.minifyHTML(html, options);
  }

  getOptions() {
    return this.optionStorage.get();
  }

  updateOptions(options: MinifyOptions) {
    this.optionStorage.update(options);
  }
}
