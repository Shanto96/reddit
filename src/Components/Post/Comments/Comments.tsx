import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

type CommentsProps = {};

const Comments: React.FC<CommentsProps> = () => {
  const [Comment, setComment] = useState("");
  const [createCommentLoading, setCreateCommentLoading] = useState(false);

  return (
    <Box>
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      ></Flex>
    </Box>
  );
};
export default Comments;
