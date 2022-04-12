import * as React from "react";
import Sidebar, { SidebarProps } from "@/components/layouts/Sidebar";
import { featureModules } from "@/modules";
import { useRouter } from "next/router";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Main from "@/components/layouts/Main";
import Header from "@/components/layouts/Header";
import Head, { HeadProps } from "@/components/layouts/Head";
import { SITE_NAME } from "@/constants";
import { HEADER_HEIGHT } from "@/components/layouts/constants";

const links: SidebarProps["links"] = featureModules;

interface LayoutProps {
  headerTitle?: string;
  headProps?: HeadProps;
  isLoading?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  headerTitle = SITE_NAME,
  children,
  isLoading,
  headProps,
}) => {
  const { pathname } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Head {...headProps} />
      <Header title={headerTitle} onClickOpenSidebar={onOpen} />
      <Flex height={`calc(100% - ${HEADER_HEIGHT}px)`}>
        <Sidebar
          links={links}
          currentPathname={pathname}
          onClickCloseSidebar={onClose}
          isSidebarOpen={isOpen}
        />
        <Main isLoading={isLoading} title={headProps?.title}>
          {children}
        </Main>
      </Flex>
    </>
  );
};

export default Layout;
