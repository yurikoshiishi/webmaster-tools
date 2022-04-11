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
      maxW="container.xl"
      height={"100%"}
    >
      <Box height={"100%"} px={{ base: 0, md: 4 }} py={8}>
        {children}
      </Box>
    </Container>
  );
};

export default Main;
