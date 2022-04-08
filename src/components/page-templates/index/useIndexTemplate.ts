import {
  japaneseWordWrapService,
  JapaneseWordwrapService,
} from "@/modules/japanese-wordwrap/services";

export interface UseIndexTemplate {
  service: JapaneseWordwrapService;
}

export function useIndexTemplate(): UseIndexTemplate {
  return {
    service: japaneseWordWrapService,
  };
}
