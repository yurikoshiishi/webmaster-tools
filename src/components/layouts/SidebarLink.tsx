import { Button, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React, { VFC } from "react";

interface SidebarLinkProps {
  currentPathname: string;
  href: string;
  name: string;
}

const SidebarLink: VFC<SidebarLinkProps> = ({
  currentPathname,
  href,
  name,
}) => {
  const selectedBgColor = useColorModeValue(
    "messenger.50",
    "rgba(162, 205, 255, 0.12)"
  );
  return (
    <Link href={href} passHref>
      <Button
        justifyContent="flex-start"
        px={4}
        isFullWidth
        fontSize="sm"
        backgroundColor={currentPathname === href ? selectedBgColor : undefined}
        variant="ghost"
        as="a"
        flexShrink="0"
      >
        {name}
      </Button>
    </Link>
  );
};

export default SidebarLink;
