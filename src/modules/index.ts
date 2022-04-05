import { japaneseWordWrapModule } from "@/modules/japanese-wordwrap/constants";

export type FeatureModule = {
  name: string;
  href: string;
};

export const featureModules: FeatureModule[] = [japaneseWordWrapModule];
