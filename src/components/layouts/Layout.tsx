import * as React from "react";
import Sidebar, { SidebarProps } from "@/components/layouts/Sidebar";
import Loading from "@/components/ui/Loading";
import { featureModules } from "@/modules";
import { useRouter } from "next/router";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Main from "@/components/layouts/Main";
import Header from "@/components/layouts/Header";

const headerTitle = "Webmaster Tools";
const links: SidebarProps["links"] = featureModules;

interface LayoutProps {
  title?: string;
  isLoading?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  title = headerTitle,
  children,
  isLoading,
}) => {
  const { pathname } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div>
      <Header title={title} onClickOpenSidebar={onOpen} />
      <Flex>
        <Sidebar
          links={links}
          currentPathname={pathname}
          onClickCloseSidebar={onClose}
          isSidebarOpen={isOpen}
        />
        <Main>{isLoading ? <Loading /> : children}</Main>
      </Flex>
    </div>
  );
};

export default Layout;
