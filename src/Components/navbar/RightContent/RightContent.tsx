import React, { useEffect } from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/Components/Modal/Auth/AuthModal";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import { User } from "firebase/auth";
import Icons from "./Icons";
import UserManu from "./UserManu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  useEffect(() => {
    if (user) {
      setAuthModalState((prev) => ({
        ...prev,
        open: false,
      }));
    }
  }, [user]);

  return (
    <>
      <AuthModal />

      {user ? <Icons /> : <AuthButtons />}
      <UserManu user={user} />
    </>
  );
};
export default RightContent;
