import { OptionsObject, useSnackbar } from "notistack";

export interface UseNotification {
  showNotification: (message: string, options?: NotificationOptions) => void;
}

type NotificationOptions = Pick<OptionsObject, "variant">;

export function useNotification(): UseNotification {
  const { enqueueSnackbar } = useSnackbar();

  const showNotification = (message: string, options?: NotificationOptions) => {
    enqueueSnackbar(message, options);
  };

  return {
    showNotification,
  };
}
