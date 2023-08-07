import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInputs from "../SearchInputs/SearchInputs";
import RightContent from "./RightContent/RightContent";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="reddit face" height="30" />
        <Image
          src="/images/redditText.svg"
          alt="reddit face"
          height="44px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <SearchInputs />
      <RightContent />
    </Flex>
  );
};
export default Navbar;
