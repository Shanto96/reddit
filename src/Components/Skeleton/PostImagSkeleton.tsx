import React from "react";
import { Skeleton } from "@chakra-ui/react";

type PostImagSkeletonProps = {};

const PostImagSkeleton: React.FC<PostImagSkeletonProps> = () => {
  return <Skeleton height="200px" width="100%" mt={2} />;
};
export default PostImagSkeleton;
