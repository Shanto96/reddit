import { Community } from "@/atoms/communitiesAtom";
import React, { useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Stack,
  Divider,
  Button,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import useCommunityData from "@/hooks/useCommunityData";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import useUploadFile from "@/hooks/useSelectFile";
import { FaReddit } from "react-icons/fa";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { selectedFile, setSelectedFile, onSelectFile } = useUploadFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const onUpdateImage = () => {};
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Box pt={0} position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        p={3}
        color="white"
        bg="blue.400"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          {" "}
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack>
          <Flex>
            <Flex direction="column" flexGrow="1" fontWeight="700">
              <Text>{communityData?.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow="1">
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData?.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt.seconds * 1000)
                ).format("DD MMM  YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${router.query.communityId}/submit`}>
            <Button height="28px" mt={3} width="100%">
              {" "}
              Create a Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Text>Admin</Text>
                <Flex justify="space-between" align="center">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Image
                  </Text>
                  {selectedFile || communityData.imageUrl ? (
                    <Image
                      src={selectedFile || communityData.imageUrl}
                      borderRadius="full"
                      boxSize="40px"
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize={40}
                      color="brand.100"
                      mr={2}
                    />
                  )}
                </Flex>
                {selectedFile &&
                  (uploadingImage ? (
                    <Spinner />
                  ) : (
                    <Text cursor="pointer" onClick={onUpdateImage}>
                      Save Changes{" "}
                    </Text>
                  ))}
                <input
                  type="file"
                  hidden
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={onSelectFile}
                  ref={selectedFileRef}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
