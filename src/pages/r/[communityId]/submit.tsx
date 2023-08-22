import PageContent from "@/Components/Layout/PageContent";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@/Components/Post/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type SubmitProps = {};

const Submit: React.FC<SubmitProps> = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContent>
  );
};
export default Submit;
