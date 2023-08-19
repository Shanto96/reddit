import { authModalState } from "@/atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { setDefaultResultOrder } from "dns";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
    }
    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
      setLoading(false);
      return;
    }
    joinCommunity(communityData);
    setLoading(false);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
      console.log("My snippets are", snippets);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  const leaveCommunity = async (communityId: string) => {
    //batch write
    try {
      const batch = writeBatch(firestore);

      //delating a community from community snippet

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      //update recoil state
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item?.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("Leave community error", error);
    }
  };

  const joinCommunity = async (communityData: Community) => {
    //batch write
    try {
      const batch = writeBatch(firestore);

      //create a new community
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageUrl: communityData?.imageUrl || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      //update recoil state
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("join community error", error);
    }
  };
  return { communityStateValue, onJoinOrLeaveCommunity, loading };
};
export default useCommunityData;
