import { useParams } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { IImage } from "../types";
import { ListWrapper, Toolbar } from "../components";
import { useGetOneAlbumQuery } from "../redux/api/gallery.api";
import { ImageCard } from "../components/Gallery/Album/Image/ImageCard";
import { useMemo } from "react";
import { listOfFolderSkeletons } from "../components/Skeletons/FolderSkeleton";

export const Album = (): JSX.Element => {
  const { albumId } = useParams();
  const { currentData, isFetching } = useGetOneAlbumQuery(albumId!);

  const content = useMemo(() => {
    switch (true) {
      case isFetching:
        return listOfFolderSkeletons;
      case !!currentData:
        return currentData?.images.map((image: IImage) => (
          <ImageCard
            key={image.id}
            albumId={albumId!}
            image={image}
            albumName={currentData.albumName}
          />
        ));
      default:
        return <Text>...no images</Text>;
    }
  }, [isFetching, currentData]);

  return (
    <Flex direction={"column"} gap={"15px"}>
      <Toolbar />
      <ListWrapper>{content}</ListWrapper>
    </Flex>
  );
};
