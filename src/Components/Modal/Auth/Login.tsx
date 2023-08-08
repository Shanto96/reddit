import React, { useState } from "react";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
//import { Button } from "@/chakara/Button";
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",

    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const setAuthModal = useSetRecoilState(authModalState);

  return (
    <form>
      <Input
        name="email"
        type="email"
        mb={2}
        placeholder="Email"
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Button type="submit" width="100%" height="36px" mt={2} mb={2}>
        Login
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={2}> New here ?</Text>
        <Text
          color="blue.500"
          fontWeight="700"
          cursor="pointer"
          onClick={() => setAuthModal((prev) => ({ ...prev, view: "signup" }))}
        >
          {" "}
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
