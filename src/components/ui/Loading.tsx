import { Box, CircularProgress } from "@mui/material";
import React, { VFC } from "react";

interface LoadingProps {}

const Loading: VFC<LoadingProps> = ({}) => {
  return (
    <Box
      height="100%"
      width="100%"
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
    >
      <CircularProgress size={30} />
    </Box>
  );
};

export default Loading;
