import { FC, useState } from "react";
import { Image, Stack } from "@chakra-ui/react";
import { ImageCardOptions } from "./ImageCardOptions";
import { IImage } from "../../../../types";

interface Props {
  image: IImage;
  albumId: string;
  albumName: string;
}
export const ImageCard: FC<Props> = (props) => {
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
