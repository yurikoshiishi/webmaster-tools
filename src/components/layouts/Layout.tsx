import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "@/components/layouts/Header";
import Sidebar, { SidebarProps } from "@/components/layouts/Sidebar";

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
}

const Layout: React.FC<LayoutProps> = ({ title = headerTitle, children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header title={title} />
      <Sidebar width={sidebarWidth} links={links} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
