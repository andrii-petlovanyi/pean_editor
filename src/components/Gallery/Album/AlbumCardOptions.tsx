import {
  Flex,
  IconButton,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { IAlbum } from "../../../types";
import { useDeleteOneAlbumMutation } from "../../../redux/api/gallery.api";
import { messages } from "../../../config/messages";
import { AlbumFormPopover } from "./AlbumFormPopover";
import { AlbumActionType } from "../../../types/album.interface";

interface Props {
  album: IAlbum;
  folderId: string;
  isHovered: boolean;
}

const MotionFlex = motion(Flex);

export const AlbumCardOptions = (props: Props) => {
  const { album, isHovered, folderId } = props;
  const { id } = album;
  const toast = useToast({ variant: "custom" });

  const [deleteOneAlbum, { isLoading: isDeleting }] =
    useDeleteOneAlbumMutation();

  const handleDeletingAlbum = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await deleteOneAlbum(id);
      toast({
        description: "Album deleted successfully!",
      });
    } catch (error) {
      toast({
        description: messages.errors.defaultError,
      });
    }
  };

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <MotionFlex
      position={"absolute"}
      top={"0"}
      right={"0"}
      display={"flex"}
      initial={{ opacity: 0, y: "-40px" }}
      animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: "-40px" }}
      transition={{ duration: 0.2, type: "spring" }}
      backgroundColor={useColorModeValue("", "primaryDark.300.5")}
      backdropFilter={"blur(5px)"}
      borderRadius={"md"}
      borderTopLeftRadius={"0"}
      onClick={handleOptionsClick}
    >
      <IconButton
        variant={"shadow"}
        aria-label={"Button for delete album"}
        icon={<AiOutlineDelete />}
        isLoading={isDeleting}
        size={"sm"}
        fontSize={"16px"}
        onClick={handleDeletingAlbum}
      />
      <AlbumFormPopover
        album={album}
        folderId={folderId}
        actionType={AlbumActionType.UPDATE}
        title={"Edit folder"}
      />
    </MotionFlex>
  );
};
