import { Flex, Image, Stack, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  imgPlaceholder: string;
  title: string;
}

export const AlbumCard = (props: Props): JSX.Element => {
  const { id, imgPlaceholder, title } = props;
  return (
    <Stack
      as={Link}
      to={id}
      boxShadow={"md"}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={"md"}
      overflow={"hidden"}
      gap={"5px"}
      width={"100%"}
      position={"relative"}
    >
      <Image width={"100%"} src={imgPlaceholder} />
      <Flex
        color={"white"}
        position={"absolute"}
        bottom={"0"}
        left={"0"}
        right={"0"}
        p={"5px 10px"}
        fontSize={"18px"}
        fontWeight={"700"}
        backgroundColor={useColorModeValue("", "primaryDark.300.5")}
        backdropFilter={"blur(5px)"}
      >
        {title}
      </Flex>
    </Stack>
  );
};
