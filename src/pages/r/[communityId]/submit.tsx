import PageContent from "@/Components/Layout/PageContent";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@/Components/Post/NewPostForm";

type SubmitProps = {};

const Submit: React.FC<SubmitProps> = () => {
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        <NewPostForm />
      </>
      <></>
    </PageContent>
  );
};
export default Submit;
