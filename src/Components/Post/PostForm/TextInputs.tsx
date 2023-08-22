import React from "react";
import { Stack, Input, Textarea, Button, Flex } from "@chakra-ui/react";
type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        onChange={onChange}
        value={textInputs.title}
      />
      <Textarea
        name="body"
        fontSize="10pt"
        borderRadius={4}
        placeholder="Body"
        height="100px"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        onChange={onChange}
        value={textInputs.body}
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          isDisabled={textInputs.title.length === 0}
          onClick={handleCreatePost}
          isLoading={loading}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
