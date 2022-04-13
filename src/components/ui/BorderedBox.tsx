import { useBorderColor, useSurfaceColor } from "@/theme/hooks";
import { Box, BoxProps } from "@chakra-ui/react";
import React, { VFC } from "react";

interface BorderedBoxProps extends BoxProps {}

const BorderedBox: VFC<BorderedBoxProps> = ({ children, ...props }) => {
  const borderColor = useBorderColor();
  const surfaceColor = useSurfaceColor();
  return (
    <Box
      {...props}
      borderWidth={1}
      borderRadius="2xl"
      borderColor={borderColor}
      backgroundColor={surfaceColor}
    >
      {children}
    </Box>
  );
};

export default BorderedBox;
