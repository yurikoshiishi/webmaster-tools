import Loading from "@/components/ui/Loading";
import { Box, Container } from "@chakra-ui/react";
import React from "react";

interface MainProps {
  isLoading?: boolean;
}

const Main: React.FC<MainProps> = ({ children, isLoading }) => {
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
    >
      <Box
        height={isLoading ? "100%" : undefined}
        px={{ base: 0, md: 4 }}
        py={8}
      >
        {isLoading ? <Loading /> : children}
      </Box>
    </Container>
  );
};

export default Main;
