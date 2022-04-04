import { builder, IpadicFeatures, Tokenizer } from "kuromoji";

export class JapaneseAnalyzerService {
  tokenizer: Tokenizer<IpadicFeatures>;

  constructor(tokenizer: Tokenizer<IpadicFeatures>) {
    this.tokenizer = tokenizer;
  }

  static async build(): Promise<JapaneseAnalyzerService> {
    const tokenizer = await new Promise<Tokenizer<IpadicFeatures>>(
      (resolve, reject) => {
        builder({
          dicPath: "/dict",
        }).build((err, tokenizer) => {
          if (err || !tokenizer) {
            return reject("Failed to load kuromoji tokenizer");
          } else {
            return resolve(tokenizer);
          }
        });
      }
    );

    const service = new JapaneseAnalyzerService(tokenizer);

    return service;
  }

  analyzeText(text: string): IpadicFeatures[] {
    const features = this.tokenizer.tokenize(text);

    return features;
  }

  seperateTextToWords(text: string): string[] {
    const features = this.analyzeText(text);

    return features.map((feature) => feature.surface_form);
  }

  applySeperator(text: string, seperator = "#"): string {
    const words = this.seperateTextToWords(text);

    return words.join(seperator);
  }
}
