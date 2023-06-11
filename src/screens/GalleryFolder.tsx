import { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { IAlbum } from "../types";
import { AlbumCard, ListWrapper, Search, Toolbar } from "../components";
import { useGetOneGalleryFolderQuery } from "../redux/api/gallery.api";
import { AlbumFormPopover } from "../components/Gallery/Album/AlbumFormPopover";
import { AlbumActionType } from "../types/album.interface";
import { listOfFolderSkeletons } from "../components/Skeletons/FolderSkeleton";

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
      return listOfFolderSkeletons;
    } else if (data?.albums?.length && currentData) {
      return currentData?.albums?.map((album: IAlbum) => (
        <AlbumCard key={album.id} album={album} folderId={folderId!} />
      ));
    } else {
      return <Text>...no albums</Text>;
    }
  };

  const renderedContent = content();

  return (
    <Flex direction={"column"} gap={"15px"}>
      <Toolbar>
        <AlbumFormPopover
          title={"Create album"}
          folderId={folderId!}
          actionType={AlbumActionType.CREATE}
        />
        <Search setSearch={setSearch} />
      </Toolbar>

      <ListWrapper>{renderedContent}</ListWrapper>
    </Flex>
  );
};
