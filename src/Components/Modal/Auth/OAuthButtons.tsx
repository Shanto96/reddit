import React from "react";
import { Flex, Button, Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

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
    </Flex>
  );
};
export default OAuthButtons;
