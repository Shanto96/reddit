import { Post, postState } from "@/atoms/PostAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostSateValue] = useRecoilState(postState);

  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      //check and delete if the post has an image
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      //delete the post
      const postRef = doc(firestore, "posts", post.id);
      await deleteDoc(postRef);

      //setting up the global post state
      setPostSateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      return true;
    } catch (error) {
      return false;
    }
  };
  return {
    postStateValue,
    setPostSateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
