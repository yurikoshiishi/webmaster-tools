import { GlobalStyles } from "@mui/material";
import React, { VFC } from "react";

interface BaseStyleProps {}

const BaseStyle: VFC<BaseStyleProps> = ({}) => {
  return (
    <GlobalStyles
      styles={{
        "html,body,#__next": {
          height: "100%",
        },
      }}
    />
  );
};

export default BaseStyle;
