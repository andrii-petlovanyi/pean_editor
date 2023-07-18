import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { UseFormSetValue } from "react-hook-form";
import { Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useGetOneAlbumQuery } from "../../../../../../redux/api/gallery.api";
import {
  resetPostAlbumId,
  resetProjectAlbumId,
} from "../../../../../../redux/slice/viewer.slice";
import {
  IImage,
  IPostForm,
  IProjectForm,
  IViewerMode,
} from "../../../../../../types";
import { ImageSelectorCard } from "./ImageSelectorCard";

type FormType = IPostForm | IProjectForm;

interface Props {
  albumId: string;
  mode: IViewerMode;
  setValue: UseFormSetValue<FormType>;
}

export const ImageSelector: FC<Props> = memo(({ setValue, albumId, mode }) => {
  const dispatch = useDispatch();

  const { data } = useGetOneAlbumQuery(String(albumId), {
    skip: !albumId,
  });
  const { album } = data || {};

  const handleDeleteAlbum = () => {
    if (mode === IViewerMode.POST) {
      dispatch(resetPostAlbumId(null));
    } else {
      dispatch(resetProjectAlbumId(null));
    }
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
