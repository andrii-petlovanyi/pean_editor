import { FC } from "react";
import {
  Flex,
  IconButton,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { IFolderActionType, IGalleryFolder } from "../../../types";
import { FolderFormPopover } from "./FolderFormPopover";
import { useDeleteOneGalleryFolderMutation } from "../../../redux/api/gallery.api";
import { messages } from "../../../config/messages";

interface Props {
  folder: Omit<IGalleryFolder, "albums">;
  isHovered: boolean;
}

const MotionFlex = motion(Flex);

export const FolderCardOptions: FC<Props> = (props) => {
  const { folder, isHovered } = props;
  const { id } = folder;
  const toast = useToast({ variant: "custom" });

  const [deleteOneGalleryFolder, { isLoading: isDeleting }] =
    useDeleteOneGalleryFolderMutation();

  const handleDeletingFolder = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await deleteOneGalleryFolder(id);
      toast({
        description: "Folder deleted successfully!",
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
        aria-label={"Button for delete folder"}
        icon={<AiOutlineDelete />}
        isLoading={isDeleting}
        size={"sm"}
        fontSize={"16px"}
        onClick={handleDeletingFolder}
      />
      <FolderFormPopover
        folder={folder}
        actionType={IFolderActionType.UPDATE}
        title={"Edit folder"}
      />
    </MotionFlex>
  );
};
