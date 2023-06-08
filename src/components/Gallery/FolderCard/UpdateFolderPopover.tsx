import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateOneGalleryFolderMutation } from "../../../redux";
import { IGalleryFolder, UpdateFolderFormValues } from "../../../types";
import { useImgPreview } from "../../../hooks";

interface Props {
  folder: Omit<IGalleryFolder, "albums">;
}

const updateFolderSchema = yup.object().shape({
  folderName: yup.string().required("Folder name is required"),
  file: yup.mixed(),
});

export const UpdateFolderPopover = (props: Props) => {
  const { folder } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateOneGalleryFolder, { isLoading: isUpdating }] =
    useUpdateOneGalleryFolderMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateFolderFormValues>({
    resolver: yupResolver(updateFolderSchema),
  });

  const file = watch("placeholder");
  const [filePreview] = useImgPreview(file);

  const onSubmit = async (data: UpdateFolderFormValues) => {
    const formData = new FormData();
    formData.append("folderName", data.folderName);
    formData.append("file", data.placeholder?.[0] || "");

    try {
      const updated = await updateOneGalleryFolder({
        folderId: folder.id,
        formData,
      });
      console.log(updated);
    } catch (error) {}
  };

  return (
    <>
      <IconButton
        variant={"shadow"}
        aria-label={"Button for editing folder"}
        icon={<AiOutlineEdit />}
        isLoading={isUpdating}
        size={"sm"}
        fontSize={"16px"}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("", "primaryDark.300")}>
          <ModalHeader>Edit folder</ModalHeader>
          <ModalCloseButton size={"sm"} />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.folderName} mb={4}>
                <Input placeholder="Folder Name" {...register("folderName")} />
                <FormErrorMessage>
                  {errors.folderName?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.placeholder} mb={4}>
                <input
                  type="file"
                  accept="image/*"
                  {...register("placeholder")}
                />
                <FormErrorMessage>
                  {errors.placeholder?.message}
                </FormErrorMessage>
              </FormControl>

              {filePreview && (
                <Image
                  src={filePreview as string}
                  alt="Preview uploaded image"
                  mb={4}
                  maxH={200}
                />
              )}

              <Flex justify={"space-between"}>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type="submit" isLoading={isUpdating}>
                  Save
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
