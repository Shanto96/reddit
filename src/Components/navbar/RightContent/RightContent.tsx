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

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  const [signOut, signOutloading, signOutError] = useSignOut(auth);
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
    </>
  );
};
export default RightContent;
