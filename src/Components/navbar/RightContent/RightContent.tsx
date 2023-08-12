import React, { useEffect } from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/Components/Modal/Auth/AuthModal";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  const [signOut, signOutloading, signOutError] = useSignOut(auth);
  const [user, loading, error] = useAuthState(auth);
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

      {user ? (
        <Button
          variant="oauth"
          onClick={() => signOut()}
          isLoading={signOutloading}
        >
          Log Out
        </Button>
      ) : (
        <AuthButtons />
      )}
    </>
  );
};
export default RightContent;
