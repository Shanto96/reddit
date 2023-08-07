import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/Components/Modal/Auth/AuthModal";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <AuthModal />
      <AuthButtons />
    </>
  );
};
export default RightContent;
