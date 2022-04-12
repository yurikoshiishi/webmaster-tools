import { japaneseWordWrapModule } from "@/modules/japanese-wordwrap/constants";

export type FeatureModule = {
  name: string;
  href: string;
};

export const featureModules: FeatureModule[] = [japaneseWordWrapModule];

export function composeStorageKey(key: string) {
  return `webmaster-tools_${key}`;
}
