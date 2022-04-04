import { JapaneseAnalyzerService } from "@/modules/japanese-analyzer/services";
import { useEffect, useState } from "react";

export interface UseIndexTemplate {
  isLoading: boolean;
  service: JapaneseAnalyzerService | null;
}

export function useIndexTemplate(): UseIndexTemplate {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [service, setService] = useState<JapaneseAnalyzerService | null>(null);

  useEffect(() => {
    async function handler() {
      const service = await JapaneseAnalyzerService.build();
      setService(service);
      setIsLoading(false);
    }

    handler();
  }, []);

  return {
    isLoading,
    service,
  };
}
