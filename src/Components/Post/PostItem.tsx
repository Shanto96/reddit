import { Post } from "@/atoms/PostAtom";
import React, { useState } from "react";
import { Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import moment from "moment";
import { BsChat } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import PostImagSkeleton from "../Skeleton/PostImagSkeleton";
import useCommunityData from "@/hooks/useCommunityData";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: String
  ) => void;
  onDeletePost: (post: Post) => boolean;
  onSelectPost: (post: Post) => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const [loadImage, setloadImage] = useState(true);
  const [error, setError] = useState(false);
  const singlePostPage = !onSelectPost;
  const { communityStateValue } = useCommunityData();
  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();

    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed to delete post");
      }
    } catch (error: any) {
      setError(error.message);
      console.log("Post delete error", error);
    }
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.400" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={singlePostPage ? "0px" : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor="pointer"
        />
        <Text fontSize="9pt"> {post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing={1} padding="10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            <Text>
              {" "}
              Posted by u/{post.userDisplayText}{" "}
              {moment(new Date(post?.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <>
              {loadImage && <PostImagSkeleton />}
              <Image
                src={post.imageURL}
                onLoad={() => setloadImage(false)}
                display={loadImage ? "none" : "unset"}
                maxHeight="460px"
                alt="Post Image"
              />
            </>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500">
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={BsChat} mr={2} />
            <Text mr={2} fontSize="9pt">
              {" "}
              {post.numberOfComments}
            </Text>
          </Flex>{" "}
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text mr={2} fontSize="9pt">
              {" "}
              Share
            </Text>
          </Flex>{" "}
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text mr={2} fontSize="9pt">
              {" "}
              Save
            </Text>
          </Flex>{" "}
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor={"pointer"}
              onClick={(event) => handleDelete(event)}
            >
              <Icon as={AiOutlineDelete} mr={2} />
              <Text mr={2} fontSize="9pt">
                {" "}
                Delete
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
