import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "@/components/layouts/Header";
import Sidebar, { SidebarProps } from "@/components/layouts/Sidebar";
import Loading from "@/components/ui/Loading";

const sidebarWidth = 240;
const headerTitle = "Webmaster Tools";
const links: SidebarProps["links"] = [
  {
    href: "/",
    name: "Japanese Analyzer",
  },
];

interface LayoutProps {
  title?: string;
  isLoading?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  title = headerTitle,
  children,
  isLoading,
}) => {
  return (
    <Box height="100%" sx={{ display: "flex" }}>
      <Header title={title} />
      <Sidebar width={sidebarWidth} links={links} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Toolbar />
            {children}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Layout;
