import { auth, firestore } from "@/firebase/clientApp";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CommentInput from "./CommentInput";
import {
  Timestamp,
  WriteBatch,
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { Post } from "@/atoms/PostAtom";

type CommentsProps = {
  communityId: string;
  selectedPost: Post;
};
export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};
const Comments: React.FC<CommentsProps> = ({ communityId, selectedPost }) => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [createCommentLoading, setCreateCommentLoading] = useState(false);
  const [user] = useAuthState(auth);

  const onCreateComment = async () => {
    setCreateCommentLoading(true);
    try {
      const batch = writeBatch(firestore);
      //create a comment document
      const commentDocRef = doc(collection(firestore, "comments"));
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user?.uid!,
        creatorDisplayText: user!.email!.split("@")[0],
        communityId,
        postId: selectedPost?.id,
        postTitle: selectedPost?.title!,
        text: comment,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, newComment);

      //updating post value
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, { numberOfComments: increment(1) });

      await batch.commit();
      setComment("");
      setCommentsList((prev) => [newComment, ...prev]);
    } catch (error) {
      console.log("comment creation error", error);
    }
    setCreateCommentLoading(false);
  };

  return (
    <Box bg="white" p={2} borderRadius="0px 0px 4px 4px">
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        <CommentInput
          comment={comment}
          user={user}
          onCreateComment={onCreateComment}
          setComment={setComment}
          loading={createCommentLoading}
        />
      </Flex>
    </Box>
  );
};
export default Comments;
