import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { VFC } from "react";

interface HeaderProps {
  title: string;
}

const Header: VFC<HeaderProps> = ({ title }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
