import React from "react";
import { Flex, Button, Image } from "@chakra-ui/react";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  return (
    <Flex direction="column" pb={4} gap={2} width="100%">
      <Button variant="oauth">
        {" "}
        <Image src="./images/googlelogo.png" height="26px" mr={4} /> Continue
        with google{" "}
      </Button>
      <Button variant="oauth">Some Other Provider </Button>
    </Flex>
  );
};
export default OAuthButtons;
