import React, { useState } from "react";
import { BsLink, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import { Flex, Icon } from "@chakra-ui/react";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { useRouter } from "next/router";
import { User } from "firebase/auth";
import { Post } from "@/atoms/PostAtom";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "@/firebase/clientApp";

type NewPostFormProps = {
  user: User;
};
const formTabs = [
  { title: "Post", icon: IoDocumentText },
  { title: "Images & Video", icon: IoImageOutline },
  { title: "Link", icon: BsLink },
  { title: "Poll", icon: BiPoll },
  { title: "Talk", icon: BsMic },
];
export type tabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const router = useRouter();

  //new post submit
  const handleCreatePost = async () => {
    const { communityId } = router.query;

    //creating a post object
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      userDisplayText: user.email?.split("@")[0] as string,
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    try {
      //save the post on db
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      //check selected file
      if (selectedFile) {
        //store in the storage and get download URL for the image
        const imageRef = ref(storage, `post/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        //update post with image download link
        await updateDoc(postDocRef, { imageURL: downloadURL });
      }
      setLoading(false);
    } catch (error) {
      console.log("create post error", error);
    }
  };

  //handling text input data
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };

  //handling file input data
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target?.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex padding={3}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
