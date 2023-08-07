import React from "react";
import { Flex, Button } from "@chakra-ui/react";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  return (
    <Flex align="center" justify="center">
      <Button colorScheme="blue">Log In</Button>
      <Button colorScheme="blue">Sign Up</Button>
    </Flex>
  );
};
export default AuthButtons;
