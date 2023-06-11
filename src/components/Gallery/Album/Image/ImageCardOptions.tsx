import {
  Flex,
  IconButton,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useUpdateOneAlbumMutation } from "../../../../redux/api/gallery.api";
import { messages } from "../../../../config/messages";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  albumId: string;
  imgId: string;
  isHovered: boolean;
}

const MotionFlex = motion(Flex);

export const ImageCardOptions = (props: Props): JSX.Element => {
  const { albumId, imgId, isHovered } = props;
  const toast = useToast({ variant: "custom" });

  const [updateOneAlbum, { isLoading: isDeleting }] =
    useUpdateOneAlbumMutation();

  const createFormData = (imgId: string) => {
    const formData = new FormData();
    [imgId].forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    return formData;
  };

  const handleDelete = () => {
    try {
      const formData = createFormData(imgId);

      const res = updateOneAlbum({ albumId, formData });
      if ("data" in res) {
        toast({ description: "Image deleted successfully" });
      }
    } catch (error) {
      toast({ description: messages.errors.defaultError });
    }
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
      onClick={handleDelete}
    >
      <IconButton
        variant={"shadow"}
        aria-label={"Button for delete image"}
        size={"sm"}
        icon={<AiOutlineDelete />}
        isLoading={isDeleting}
        fontSize={"16px"}
      />
    </MotionFlex>
  );
};
