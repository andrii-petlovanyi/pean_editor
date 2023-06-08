import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { IGalleryFolder } from "../../../types";
import { useDeleteOneGalleryFolderMutation } from "../../../redux";
import { UpdateFolderPopover } from "./UpdateFolderPopover";

interface Props {
  folder: Omit<IGalleryFolder, "albums">;
  isHovered: boolean;
}

const MotionFlex = motion(Flex);

export const FolderCardOptions = (props: Props) => {
  const { folder, isHovered } = props;
  const { id } = folder;

  const [deleteOneGalleryFolder, { isLoading: isDeleting }] =
    useDeleteOneGalleryFolderMutation();

  const handleDeletingFolder = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await deleteOneGalleryFolder(id);
      console.log(res);
    } catch (error) {}
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
      <UpdateFolderPopover folder={folder} />
    </MotionFlex>
  );
};
