import { auth, firestore } from "@/firebase/clientApp";
import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CommentInput from "./CommentInput";
import {
  Timestamp,
  WriteBatch,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { Post, postState } from "@/atoms/PostAtom";
import { useSetRecoilState } from "recoil";
import CommentItem, { Comment } from "./CommentItem";
import { write } from "fs";

type CommentsProps = {
  communityId: string;
  selectedPost: Post;
};

const Comments: React.FC<CommentsProps> = ({ communityId, selectedPost }) => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [createCommentLoading, setCreateCommentLoading] = useState(false);
  const [deleteCommentLoading, setDeleteCommentLoading] = useState("");
  const [fetchLoading, setFetchLoading] = useState(true);
  const [user] = useAuthState(auth);
  const setPostState = useSetRecoilState(postState);

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
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
      setCommentsList((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost!.numberOfComments + 1,
        } as Post,
      }));
    } catch (error) {
      console.log("comment creation error", error);
    }
    setCreateCommentLoading(false);
  };

  const onDeleteComment = async (comment: Comment) => {
    setDeleteCommentLoading(comment.id);
    try {
      const batch = writeBatch(firestore);
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);

      const postDocRef = doc(firestore, "posts", selectedPost?.id);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });
      await batch.commit();
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost!.numberOfComments - 1,
        } as Post,
      }));

      setCommentsList((prev) => prev.filter((item) => item.id != comment.id));
    } catch (error) {
      console.log("comment delete error", error);
    }
    setDeleteCommentLoading("");
  };

  const getPostComments = async () => {
    console.log("post id", selectedPost?.id);
    try {
      const commetentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost.id),
        orderBy("createdAt", "desc")
      );
      const commentsDocs = await getDocs(commetentsQuery);
      const comments = commentsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(comments);
      setCommentsList(comments as Comment[]);
    } catch (error) {
      console.log("comment fetching error", error);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
    //setFetchLoading(false);
  }, [selectedPost]);
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

      {fetchLoading ? (
        <>
          {[1, 2, 3].map((item) => (
            <Box key={item} padding="6" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText mt={4} noOfLines={2} spacing="4" />
            </Box>
          ))}
        </>
      ) : (
        <>
          {commentsList.length === 0 ? (
            <Flex
              direction="column"
              justify="center"
              align="center"
              borderTop="1px solid"
              borderColor="gray.100"
              p={20}
            >
              <Text fontWeight={700} opacity="0.3">
                {" "}
                No Comments Yet
              </Text>
            </Flex>
          ) : (
            <Stack spacing={6} paddingLeft={6}>
              {commentsList.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onDeleteComment={onDeleteComment}
                  loadingDelete={deleteCommentLoading === comment.id}
                  userId={user?.uid}
                />
              ))}
            </Stack>
          )}
        </>
      )}
    </Box>
  );
};
export default Comments;
