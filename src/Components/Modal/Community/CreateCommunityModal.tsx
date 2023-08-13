import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [name, setName] = useState("");
  const [charRemaining, setCharRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setName(event.target.value);
    setCharRemaining(21 - event.target.value.length);
  };
  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" padding="0px 10px">
            <Text fontWeight={600} fontSize={15}>
              {" "}
              Name
            </Text>
            <Text fontSize={11} color="gray.500">
              {" "}
              Community names including capitalization cannot be changed
            </Text>

            <Text
              color="gray.400"
              position="relative"
              top="28px"
              left="10px"
              width="20px"
            >
              r/
            </Text>
            <Input
              position="relative"
              name="name"
              value={name}
              pl="22px"
              type=""
              size="sm"
              onChange={(event) => handleChange(event)}
            />
            <Text
              fontSize="9pt"
              color={charRemaining === 0 ? "red" : "gray.500"}
              pt={2}
            >
              {" "}
              {charRemaining} characters remaining
            </Text>
            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Commpunity Type
              </Text>
              <Stack spacing={2} pt={2}>
                <Checkbox
                  colorScheme="blue"
                  name="public"
                  isChecked={communityType === "public"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex alignItems="center">
                    <Icon as={BsFillPersonFill} mr={2} color="grey.500" />
                    <Text fontSize="10pt" mr={1}>
                      Public
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Anyone can view,Post and comment to this community
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  colorScheme="blue"
                  name="restricted"
                  isChecked={communityType === "restricted"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex alignItems="center">
                    <Icon as={BsFillEyeFill} mr={2} color="grey.500" />
                    <Text fontSize="10pt" mr={1}>
                      Restricted
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Anyone can view this community, but only approved user can
                      post
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  colorScheme="blue"
                  name="public"
                  isChecked={communityType === "private"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex alignItems="center">
                    <Icon as={HiLockClosed} mr={2} color="grey.500" />
                    <Text fontSize="10pt" mr={1}>
                      Private
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Only approved users can view and submit to this community
                    </Text>
                  </Flex>
                </Checkbox>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={2}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="solid" height="30px">
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
