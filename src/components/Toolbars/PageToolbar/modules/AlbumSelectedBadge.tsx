import { FC } from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { RiGalleryLine } from "react-icons/ri";
import { useGetOneAlbumQuery } from "../../../../redux/api/gallery.api";

interface Props {
  albumId: string;
}

export const AlbumSelectedBadge: FC<Props> = ({ albumId }) => {
  const { data: albumData } = useGetOneAlbumQuery(albumId, {
    skip: !albumId,
  });
  const { album } = albumData ?? {};

  return (
    <Tooltip label={album?.albumName} size={"xs"}>
      <IconButton
        icon={<RiGalleryLine />}
        variant={"shadow"}
        colorScheme="white"
        aria-label="Selected gallery"
        size={"xs"}
        fontSize={"18px"}
      />
    </Tooltip>
  );
};
