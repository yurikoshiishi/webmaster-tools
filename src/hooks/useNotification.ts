import { useToast, UseToastOptions } from "@chakra-ui/react";

export interface UseNotification {
  showNotification: (options?: NotificationOptions) => void;
}

type NotificationOptions = Pick<
  UseToastOptions,
  "title" | "description" | "status" | "id"
>;

export function useNotification(): UseNotification {
  const toast = useToast();

  const showNotification = (options?: NotificationOptions) => {
    if (options?.id && toast.isActive(options.id)) {
      return;
    }
    toast({
      ...options,
      variant: "solid",
      position: "top-right",
      isClosable: true,
    });
  };

  return {
    showNotification,
  };
}
