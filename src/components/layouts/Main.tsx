import Loading from "@/components/ui/Loading";
import { useBackgroundColor } from "@/theme/hooks";
import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";

export interface MainProps {
  title?: string;
  isLoading?: boolean;
}

const Main: React.FC<MainProps> = ({ children, isLoading, title }) => {
  const bgColor = useBackgroundColor();

  return (
    <Box
      as="main"
      width="100%"
      height="100%"
      overflow="auto"
      backgroundColor={bgColor}
    >
      <Container
        css={{
          "&::-webkit-scrollbar, scrollbar-width, -ms-overflow-style": {
            display: "none",
          },
        }}
        maxW="container.xl"
        height={isLoading ? "100%" : undefined}
        pb={16}
      >
        <Box
          height={isLoading ? "100%" : undefined}
          px={{ base: 0, md: 4 }}
          py={8}
        >
          {title && (
            <Text
              as="h1"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight={600}
              mb={{ base: 4, md: 6 }}
            >
              {title}
            </Text>
          )}
          {isLoading ? <Loading /> : children}
        </Box>
      </Container>
    </Box>
  );
};

export default Main;
