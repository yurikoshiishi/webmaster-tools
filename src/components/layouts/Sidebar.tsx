import { Drawer, Toolbar, Box, List, Button } from "@mui/material";
import React, { VFC } from "react";

export interface SidebarProps {
  width: number;
  links: { name: string; href: string }[];
}

const Sidebar: VFC<SidebarProps> = ({ width, links }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", py: 1, px: 2 }}>
        <List>
          {links.map((link, i) => (
            <Button key={i} variant="text" component="a" href={link.href}>
              {link.name}
            </Button>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
