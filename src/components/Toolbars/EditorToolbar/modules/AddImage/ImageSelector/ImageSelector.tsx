import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UseFormSetValue } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useGetOneAlbumQuery } from "../../../../../../redux/api/gallery.api";
import { Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import { resetPostAlbumId } from "../../../../../../redux/slice/viewer.slice";
import { IImage, IPostForm } from "../../../../../../types";
import { ImageSelectorCard } from "./ImageSelectorCard";

interface Props {
  setValue: UseFormSetValue<IPostForm>;
}

export const ImageSelector: FC<Props> = memo(({ setValue }) => {
  const albumId = useSelector((state: any) => state.viewer.post?.albumId);
  const dispatch = useDispatch();

  const { data } = useGetOneAlbumQuery(String(albumId), {
    skip: !albumId,
  });
  const { album } = data || {};

  const handleDeleteAlbum = () => {
    dispatch(resetPostAlbumId(null));
  };

  return (
    <Flex direction={"column"} gap={"10px"}>
      <Flex align={"center"}>
        <Text>{album?.albumName}</Text>
        <IconButton
          aria-label={"Delete selected album"}
          onClick={handleDeleteAlbum}
          variant={"shadow"}
          icon={<MdDelete />}
        />
      </Flex>
      <Divider mt={"-10px"} mb={"10px"} />
      {album?.images.map((img: IImage) => (
        <ImageSelectorCard
          key={img.id}
          img={img}
          alt={album.albumName}
          setValue={setValue}
        />
      ))}
    </Flex>
  );
});
