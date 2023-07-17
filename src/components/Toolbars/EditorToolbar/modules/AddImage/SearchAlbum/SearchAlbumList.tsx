import { FC } from "react";
import { IAlbum } from "../../../../../../types";
import { Flex } from "@chakra-ui/react";
import { SearchAlbumCard } from "./SearchAlbumCard";

interface Props {
  albums: IAlbum[] | undefined;
}

export const SearchAlbumList: FC<Props> = ({ albums }) => {
  return (
    <Flex direction={"column"} gap={"15px"}>
      {albums?.map((album: IAlbum) => (
        <SearchAlbumCard key={album.id} album={album} />
      ))}
    </Flex>
  );
};
