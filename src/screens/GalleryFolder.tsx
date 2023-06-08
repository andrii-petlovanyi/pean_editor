import { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useGetOneGalleryFolderQuery } from "../redux";
import { IAlbum } from "../types";
import { AlbumCard, ListWrapper, Search, Toolbar } from "../components";

export const GalleryFolder = (): JSX.Element => {
  const { folderId } = useParams<{ folderId: string | undefined }>();
  const [search, setSearch] = useState<string>("");

  console.log(search);

  const { data, currentData, isFetching } = useGetOneGalleryFolderQuery(
    folderId || "",
    {
      skip: folderId == undefined,
    }
  );

  const content = (): ReactNode => {
    if (isFetching) {
      return <Text>...loading</Text>;
    } else if (data?.albums?.length && currentData) {
      return currentData?.albums?.map((album: IAlbum) => (
        <AlbumCard
          key={album.id}
          id={album.id}
          title={album.albumName}
          imgPlaceholder={album.images[0].url}
        />
      ));
    } else {
      return <Text>...no albums</Text>;
    }
  };

  const renderedContent = content();

  return (
    <Flex direction={"column"} gap={"15px"}>
      <Toolbar>
        <Button size={"sm"}>+</Button>
        <Search setSearch={setSearch} />
      </Toolbar>

      <ListWrapper>{renderedContent}</ListWrapper>
    </Flex>
  );
};
