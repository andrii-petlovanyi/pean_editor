import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { AlbumCard, ListWrapper, Search, PageToolbar } from "../components";
import { useGetOneGalleryFolderQuery } from "../redux/api/gallery.api";
import { AlbumFormPopover } from "../components/Gallery/Album/AlbumFormPopover";
import { IAlbum, IAlbumActionType } from "../types/album.interface";
import { listOfFolderSkeletons } from "../components/Skeletons/FolderSkeleton";

export const GalleryFolder = (): JSX.Element => {
  const { folderId } = useParams<{ folderId: string | undefined }>();
  const [search, setSearch] = useState<string>("");

  console.log(search);

  const { data, isFetching } = useGetOneGalleryFolderQuery(String(folderId), {
    skip: !folderId,
  });
  const { folder } = data || {};

  const rendererContent = useMemo(() => {
    switch (true) {
      case isFetching:
        return listOfFolderSkeletons;
      case !!folder?.albums?.length:
        return folder?.albums?.map((album: IAlbum) => (
          <AlbumCard key={album.id} album={album} folderId={folderId!} />
        ));
      default:
        return <Text>...no albums</Text>;
    }
  }, [folder]);

  return (
    <Flex direction={"column"} gap={"15px"}>
      <PageToolbar>
        <AlbumFormPopover
          title={"Create album"}
          folderId={folderId!}
          actionType={IAlbumActionType.CREATE}
        />
        <Search setSearch={setSearch} />
      </PageToolbar>

      <ListWrapper>{rendererContent}</ListWrapper>
    </Flex>
  );
};
