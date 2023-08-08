import React from "react";
import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import Register from "./Register";

type AuthInputProps = {};

const AuthInput: React.FC<AuthInputProps> = () => {
  const authModalValue = useRecoilValue(authModalState);
  return (
    <>
      {authModalValue.view === "login" && <Login />}
      {authModalValue.view === "signup" && <Register />}
    </>
  );
};
export default AuthInput;
