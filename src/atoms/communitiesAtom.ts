import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  cratorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageUrl?: string;
}

interface CommunitySnippet {
  communityId: string;
  isModerator: boolean;
  imageUrl?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
};

export const communityState = atom<CommunityState>({
  key: "communitiesState",

  default: defaultCommunityState,
});
