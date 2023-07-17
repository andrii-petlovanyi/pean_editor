import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Image, Stack, useColorModeValue } from "@chakra-ui/react";
import { AlbumCardOptions } from "./AlbumCardOptions";
import { IAlbum } from "../../../types";

interface Props {
  album: IAlbum;
  folderId: string;
}

export const AlbumCard: FC<Props> = (props) => {
  const { album, folderId } = props;
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
      to={album.id}
      boxShadow={"md"}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={"md"}
      overflow={"hidden"}
      gap={"5px"}
      width={"100%"}
      position={"relative"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AlbumCardOptions
        album={album}
        folderId={folderId}
        isHovered={isHovered}
      />
      <Image
        width={"100%"}
        m={"0 !important"}
        src={album?.images[0]?.url}
        loading={"lazy"}
      />

      <Flex
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
        {album.albumName}
      </Flex>
    </Stack>
  );
};
