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
    <Container
      css={{
        "&::-webkit-scrollbar, scrollbar-width, -ms-overflow-style": {
          display: "none",
        },
      }}
      overflowX={"scroll"}
      as="main"
      maxW="container.xl"
      height={"100%"}
      pb={16}
      backgroundColor={bgColor}
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
  );
};

export default Main;
