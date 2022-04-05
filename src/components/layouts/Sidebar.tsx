import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/components/layouts/constants";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
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
        >
          <HStack width={"100%"} p={4} spacing={4} align="flex-start">
            {links.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  isFullWidth
                  isActive={currentPathname === item.href}
                  variant={"ghost"}
                  as="a"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </HStack>
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
              <HStack py={4} spacing={2}>
                {links.map((item) => (
                  <Link key={item.href} href={item.href} passHref>
                    <Button
                      isFullWidth
                      isActive={currentPathname === item.href}
                      variant={"ghost"}
                      as="a"
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
