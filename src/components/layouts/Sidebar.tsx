import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/components/layouts/constants";
import SidebarLink from "@/components/layouts/SidebarLink";
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  VStack,
} from "@chakra-ui/react";
import React, { VFC } from "react";

export interface SidebarProps {
  links: {
    href: string;
    name: string;
  }[];
  currentPathname: string;
  isSidebarOpen: boolean;
  onClickCloseSidebar: () => void;
}

const Sidebar: VFC<SidebarProps> = ({
  currentPathname,
  links,
  isSidebarOpen,
  onClickCloseSidebar,
}) => {
  return (
    <Box as={"nav"}>
      <Box display={{ base: "none", lg: "block" }}>
        <Flex
          position="sticky"
          width={`${SIDEBAR_WIDTH}px`}
          top={`${HEADER_HEIGHT}px`}
          left={0}
          justifyContent="space-between"
          height={`calc(100vh - ${HEADER_HEIGHT}px)`}
          overflowY="scroll"
          sx={{
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <VStack width={"100%"} p={4} spacing={2} align="flex-start">
            {links.map((item) => (
              <SidebarLink
                key={item.href}
                currentPathname={currentPathname}
                {...item}
              />
            ))}
          </VStack>
          <Divider orientation="vertical" />
        </Flex>
      </Box>
      <Box display={{ lg: "none" }}>
        <Drawer
          placement="left"
          onClose={onClickCloseSidebar}
          isOpen={isSidebarOpen}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <VStack py={4} spacing={2}>
                {links.map((item) => (
                  <SidebarLink
                    key={item.href}
                    currentPathname={currentPathname}
                    {...item}
                  />
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
