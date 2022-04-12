import { useColorModeValue } from "@chakra-ui/react";

export function useBorderColor() {
  return useColorModeValue("gray.200", "gray.700");
}

export function useBackgroundColor() {
  return useColorModeValue("gray.50", "gray.900");
}

export function useSurfaceColor() {
  return useColorModeValue("white", "gray.800");
}
