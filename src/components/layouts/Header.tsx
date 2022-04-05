import { HEADER_HEIGHT } from "@/components/layouts/constants";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { VFC } from "react";

interface HeaderProps {
  title: string;
  onClickOpenSidebar: () => void;
}

const Header: VFC<HeaderProps> = ({ title, onClickOpenSidebar }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      height={`${HEADER_HEIGHT}px`}
      position="sticky"
      top={0}
      backgroundColor={colorMode === "light" ? "white" : "gray.800"}
    >
      <Flex
        height={"100%"}
        alignItems="center"
        justifyContent={"space-between"}
        px={4}
      >
        <HStack spacing={4}>
          <Button
            display={{ base: "flex", lg: "none" }}
            onClick={onClickOpenSidebar}
            variant="ghost"
          >
            <HamburgerIcon />
          </Button>
          <Text fontSize={"lg"} fontWeight={600}>
            {title}
          </Text>
        </HStack>
        <HStack spacing={2}>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>
      <Divider />
    </Box>
  );
};

export default Header;
