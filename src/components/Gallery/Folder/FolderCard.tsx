import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex as MotionFlex,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { IGalleryFolder } from "../../../types";
import { FolderCardOptions } from "./FolderCardOptions";

interface Props {
  folder: Omit<IGalleryFolder, "albums">;
}

export const FolderCard = ({ folder }: Props): JSX.Element => {
  const { id, imgPlaceholder, folderName } = folder;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Stack
      as={Link}
      to={id}
      boxShadow={"md"}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={"md"}
      gap={"5px"}
      width={"100%"}
      position={"relative"}
      overflow={"hidden"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FolderCardOptions folder={folder} isHovered={isHovered} />
      <Image
        borderRadius={"md"}
        m={"0 !important"}
        width={"100%"}
        src={imgPlaceholder}
        loading={"lazy"}
      />
      <MotionFlex
        color={"white"}
        position={"absolute"}
        bottom={"0"}
        left={"0"}
        right={"0"}
        p={"5px 10px"}
        fontSize={"16px"}
        fontWeight={"700"}
        backgroundColor={useColorModeValue("", "primaryDark.300.5")}
        backdropFilter={"blur(5px)"}
      >
        {folderName}
      </MotionFlex>
    </Stack>
  );
};
