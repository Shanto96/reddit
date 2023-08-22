import React from "react";
import { Box, SkeletonCircle, SkeletonText, Skeleton } from "@chakra-ui/react";

const PostSkeleton: React.FC = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      <Skeleton height="200px" mt={2} />
    </Box>
  );
};
export default PostSkeleton;
