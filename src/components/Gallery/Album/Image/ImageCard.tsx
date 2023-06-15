import { Image, Stack } from "@chakra-ui/react";
import { IImage } from "../../../../types";
import { ImageCardOptions } from "./ImageCardOptions";
import { useState } from "react";

interface Props {
  image: IImage;
  albumId: string;
  albumName: string;
}
export const ImageCard = (props: Props): JSX.Element => {
  const { image, albumId, albumName } = props;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Stack
      boxShadow={"md"}
      borderRadius={"md"}
      overflow={"hidden"}
      position={"relative"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ImageCardOptions
        albumId={albumId}
        imgId={image.id}
        isHovered={isHovered}
      />
      <Image
        src={image.url}
        alt={albumName}
        m={"0 !important"}
        loading={"lazy"}
      />
    </Stack>
  );
};
