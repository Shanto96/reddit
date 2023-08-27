import About from "@/Components/Community/About";
import PageContent from "@/Components/Layout/PageContent";
import Comments from "@/Components/Post/Comments/Comments";
import PostItem from "@/Components/Post/PostItem";
import { Post, postState } from "@/atoms/PostAtom";
import { communityState } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";

type singlePostProps = {};

const SinglePost: React.FC<singlePostProps> = () => {
  const communityStateValue = useRecoilValue(communityState);
  const post = useRecoilValue(postState)?.selectedPost;
  const setPostState = useSetRecoilState(postState);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { postStateValue, setPostSateValue, onVote, onDeletePost } = usePosts();
  const fetchPost = async (pid: string) => {
    try {
      console.log("fetching");
      const getPostRef = doc(firestore, "posts", pid);
      const postDoc = await getDoc(getPostRef);
      // console.log(postDoc.data());
      setPostState((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error) {
      console.log("fetch post Error");
    }
  };
  useEffect(() => {
    if (router.query.pid && !post) {
      fetchPost(router.query.pid as string);
    }
  }, [router.query, post?.id]);

  return (
    <>
      <PageContent>
        <>
          {" "}
          {post && (
            <PostItem
              post={post}
              key={post.id}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === post.id)
                  ?.voteValue
              }
              onVote={onVote}
              onDeletePost={onDeletePost}
            />
          )}
          {postStateValue.selectedPost && router.query.communityId && (
            <Comments
              selectedPost={postStateValue.selectedPost}
              communityId={router.query.communityId as string}
            />
          )}
        </>
        <>
          {communityStateValue.currentCommunity && (
            <About communityData={communityStateValue?.currentCommunity} />
          )}
        </>
      </PageContent>
    </>
  );
};
export default SinglePost;
