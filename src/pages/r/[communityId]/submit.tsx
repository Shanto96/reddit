import PageContent from "@/Components/Layout/PageContent";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@/Components/Post/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { checkIsOnDemandRevalidate } from "next/dist/server/api-utils";
import { communityState } from "./../../../atoms/communitiesAtom";
import { useRecoilValue } from "recoil";
import About from "@/Components/Community/About";
type SubmitProps = {};

const Submit: React.FC<SubmitProps> = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
  console.log(communityStateValue);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>
        {/* <About communityData={communityState?.currentCommunity} />{" "} */}
      </>
    </PageContent>
  );
};
export default Submit;
