import { useBorderColor } from "@/theme/hooks";
import { Box, BoxProps } from "@chakra-ui/react";
import React, { VFC } from "react";

interface BorderedBoxProps extends BoxProps {}

const BorderedBox: VFC<BorderedBoxProps> = ({ children, ...props }) => {
  const borderColor = useBorderColor();
  return (
    <Box
      {...props}
      borderWidth={1}
      borderRadius={"2xl"}
      borderColor={borderColor}
    >
      {children}
    </Box>
  );
};

export default BorderedBox;
