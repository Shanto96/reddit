import React, { useEffect, useState } from "react";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [createUserWithEmailAndPassword, userCred, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const [error, setError] = useState("");

  const setAuthModal = useSetRecoilState(authModalState);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (registerForm.password != registerForm.confirmPassword) {
      setError("Password Don't Match");
      return;
    }

    if (registerForm.password.length <= 6) {
      setError("Password must be more than 6 characters");
      return;
    }
    await createUserWithEmailAndPassword(
      registerForm.email,
      registerForm.password
    );
    //authError && setError(authError);
  };
  //console.log(user, authError);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);
  return (
    <form onSubmit={onSubmit}>
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
        required
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
        required
      />{" "}
      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
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
        required
      />
      {error ||
        (authError && (
          <Text fontSize="10pt" color="red" align="center">
            {error ||
              FIREBASE_ERRORS[
                authError?.message as keyof typeof FIREBASE_ERRORS
              ]}
          </Text>
        ))}
      <Button
        type="submit"
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        isLoading={loading}
      >
        Sign up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={2}> Already a redditor?</Text>
        <Text
          color="blue.500"
          fontWeight="700"
          cursor="pointer"
          onClick={() => setAuthModal((prev) => ({ ...prev, view: "login" }))}
        >
          {" "}
          Log In
        </Text>
      </Flex>
    </form>
  );
};
export default Register;
