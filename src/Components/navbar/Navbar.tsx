import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInputs from "../SearchInputs/SearchInputs";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import Directory from "./Directory/Directory";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
      >
        <Image src="/images/redditFace.svg" alt="reddit face" height="30" />
        <Image
          src="/images/redditText.svg"
          alt="reddit face"
          height="44px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInputs />
      <Flex>
        <RightContent user={user} />
      </Flex>
    </Flex>
  );
};
export default Navbar;
