import React from "react";
import { Flex, Image } from "@chakra-ui/react";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="reddit face" height="30" />
      </Flex>
    </Flex>
  );
};
export default Navbar;
