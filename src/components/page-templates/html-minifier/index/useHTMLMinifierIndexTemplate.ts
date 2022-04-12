import { log } from "@/lib/logger";
import { HTMLMinifierService } from "@/modules/html-minifier/services";
import { useEffect, useState } from "react";

export interface UseHTMLMinifierIndexTemplate {
  isLoading: boolean;
  service: HTMLMinifierService | null;
}

export function useHTMLMinifierIndexTemplate(): UseHTMLMinifierIndexTemplate {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [service, setService] = useState<HTMLMinifierService | null>(null);

  useEffect(() => {
    async function handler() {
      try {
        const service = await HTMLMinifierService.build();
        setService(service);
        setIsLoading(false);
      } catch (error) {
        log("Failed to load HTMLMinifierService");
      }
    }
    handler();
  }, []);

  return {
    isLoading,
    service,
  };
}
