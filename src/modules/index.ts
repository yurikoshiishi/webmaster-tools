import { htmlFormatterModule } from "@/modules/html-formatter/constants";
import { htmlMinifierModule } from "@/modules/html-minifier/constants";
import { japaneseWordWrapModule } from "@/modules/japanese-wordwrap/constants";

export type FeatureModule = {
  name: string;
  href: string;
  attributions?: Attribution[];
};

export interface Attribution {
  name: string;
  href: string;
}

export const featureModules: FeatureModule[] = [
  japaneseWordWrapModule,
  htmlMinifierModule,
  htmlFormatterModule,
];

export function composeStorageKey(key: string) {
  return `webmaster-tools_${key}`;
}
