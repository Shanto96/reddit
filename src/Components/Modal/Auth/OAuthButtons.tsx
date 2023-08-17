import React, { useEffect } from "react";
import { Flex, Button, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { addDoc, collection } from "firebase/firestore";
import { User } from "firebase/auth";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <Flex direction="column" pb={4} gap={2} width="100%">
      <Button
        variant="oauth"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        {" "}
        <Image src="./images/googlelogo.png" height="26px" mr={4} /> Continue
        with google{" "}
      </Button>
      <Button variant="oauth">Some Other Provider </Button>
      {error && (
        <Text fontSize="10pt" color="red" align="center">
          {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButtons;
