import { JapaneseWordwrapService } from "@/modules/japanese-wordwrap/services";
import { useEffect, useState } from "react";

export interface UseIndexTemplate {
  isLoading: boolean;
  service: JapaneseWordwrapService | null;
}

export function useIndexTemplate(): UseIndexTemplate {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [service, setService] = useState<JapaneseWordwrapService | null>(null);

  useEffect(() => {
    async function handler() {
      const service = await JapaneseWordwrapService.build();
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
