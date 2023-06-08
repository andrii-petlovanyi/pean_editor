import { useParams } from "react-router-dom";
import { Flex, Image } from "@chakra-ui/react";
import { useGetOneAlbumQuery } from "../redux";
import { IImage } from "../types";
import { Toolbar } from "../components";

export const Album = (): JSX.Element => {
  const { albumId } = useParams();
  const { currentData, isFetching } = useGetOneAlbumQuery(albumId!);
  console.log(currentData?.images[0]);
  return (
    <Flex direction={"column"} gap={"15px"}>
      <Toolbar />
      <Flex flexWrap={"wrap"} gap={"10px"}>
        {isFetching && <>loading...</>}
        {currentData?.images.map((image: IImage) => (
          <Image
            key={image.id}
            src={image.url}
            width={"300px"}
            height={"200px"}
          />
        ))}
      </Flex>
    </Flex>
  );
};
