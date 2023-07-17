import { useParams } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { IImage } from "../types";
import { ListWrapper, PageToolbar } from "../components";
import { useGetOneAlbumQuery } from "../redux/api/gallery.api";
import { ImageCard } from "../components/Gallery/Album/Image/ImageCard";
import { listOfFolderSkeletons } from "../components/Skeletons/FolderSkeleton";

export const Album = (): JSX.Element => {
  const { albumId } = useParams();
  const { data, isFetching } = useGetOneAlbumQuery(String(albumId), {
    skip: !albumId,
  });
  const { album } = data || {};

  const content = useMemo(() => {
    switch (true) {
      case isFetching:
        return listOfFolderSkeletons;
      case !!album:
        return album?.images.map((image: IImage) => (
          <ImageCard
            key={image.id}
            albumId={albumId!}
            image={image}
            albumName={album.albumName}
          />
        ));
      default:
        return <Text>...no images</Text>;
    }
  }, [data]);

  return (
    <Flex direction={"column"} gap={"15px"}>
      <PageToolbar />
      <ListWrapper>{content}</ListWrapper>
    </Flex>
  );
};
