import { User } from "firebase/auth";
import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Icon,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRedditSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { IoSparkles } from "react-icons/io5";
type UserManuProps = {
  user?: User | null;
};

const UserManu: React.FC<UserManuProps> = () => {
  const [signOut, signOutloading, signOutError] = useSignOut(auth);
  const [user, loading, error] = useAuthState(auth);
  const setModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        {" "}
        <Flex align="center">
          {user ? (
            <Flex align="center">
              <>
                <Icon
                  fontSize={24}
                  color="gray.300"
                  mr={1}
                  as={FaRedditSquare}
                />
                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}{" "}
                  </Text>
                  <Flex align="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400"> 1 karma</Text>
                  </Flex>
                </Flex>
              </>
            </Flex>
          ) : (
            <Flex align="center">
              {" "}
              <Icon fontSize={24} color="gray.300" mr={1} as={VscAccount} />
            </Flex>
          )}
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>{" "}
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => signOut()}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontSize="10pt"
            fontWeight="700"
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={() => setModalState({ open: true, view: "login" })}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
              Log In / Sign Up
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserManu;
