import { Button } from "@chakra-ui/react";
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
  return (
    <Link href={href} passHref>
      <Button
        justifyContent={"flex-start"}
        px={6}
        isFullWidth
        isActive={currentPathname === href}
        variant={"ghost"}
        as="a"
      >
        {name}
      </Button>
    </Link>
  );
};

export default SidebarLink;
