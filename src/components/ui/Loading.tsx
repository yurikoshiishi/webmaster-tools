import { Box, Flex, Skeleton, SkeletonProps } from "@chakra-ui/react";
import React, { VFC } from "react";

interface LoadingProps {}

const skeletonProps: SkeletonProps = {
  speed: 1,
  borderRadius: 4,
};

const Loading: VFC<LoadingProps> = ({}) => {
  return (
    <Box height="100%" width="100%" display="flex" flexDir="column" gap={4}>
      <Skeleton {...skeletonProps} height="60px" />
      <Skeleton {...skeletonProps} height="50%" />
      <Flex gap={4} height="calc(50% - 60px)">
        <Skeleton {...skeletonProps} width="100%" height="100%" />
        <Skeleton {...skeletonProps} width="100%" height="100%" />
        <Skeleton {...skeletonProps} width="100%" height="100%" />
      </Flex>
    </Box>
  );
};

export default Loading;
