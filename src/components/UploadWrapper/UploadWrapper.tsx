import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface Props {
  children: ReactNode;
}

export const UploadWrapper = (props: Props): JSX.Element => {
  return (
    <Flex
      border={"1px solid"}
      borderColor={useColorModeValue("", "textColorDark.400.5")}
      borderRadius={"md"}
      position={"relative"}
      cursor={"pointer"}
    >
      <Flex
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={"5px"}
        fontWeight={"300"}
        fontSize={"16px"}
        color={useColorModeValue("", "textColorDark.400")}
      >
        <Icon as={AiOutlineCloudUpload} fontSize={"24px"} />
        Select or drag image
      </Flex>
      {props.children}
    </Flex>
  );
};
