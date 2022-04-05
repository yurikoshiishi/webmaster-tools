import { Box, Container } from "@chakra-ui/react";
import React from "react";

interface MainProps {}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Container
      css={{
        "&::-webkit-scrollbar, scrollbar-width, -ms-overflow-style": {
          display: "none",
        },
      }}
      overflowX={"scroll"}
      as="main"
      maxW="container.lg"
    >
      <Box px={4} py={8}>
        {children}
      </Box>
    </Container>
  );
};

export default Main;
