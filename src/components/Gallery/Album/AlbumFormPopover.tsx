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
  useToast,
} from "@chakra-ui/react";
import { MdAddPhotoAlternate, MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  AlbumActionType,
  AlbumFormValues,
} from "../../../types/album.interface";
import {
  useCreateOneAlbumMutation,
  useUpdateOneAlbumMutation,
} from "../../../redux/api/gallery.api";
import { IAlbum } from "../../../types";
import { UploadWrapper } from "../../UploadWrapper/UploadWrapper";
import { useManyImagesPreview } from "../../../hooks/useManyImgsPreview";
import { messages } from "../../../config/messages";

interface Props {
  title: string;
  folderId: string;
  album?: IAlbum;
  actionType: AlbumActionType;
}

const albumSchema = yup.object().shape({
  albumName: yup.string().required("Album name is required"),
  images: yup.mixed(),
});

export const AlbumFormPopover = (props: Props): JSX.Element => {
  const { actionType, title, album, folderId } = props;

  const { onOpen, isOpen, onClose } = useDisclosure();
  const action = actionType === AlbumActionType.UPDATE;
  const toast = useToast({ variant: "custom" });

  const [createOneAlbum, { isLoading: isCreating }] =
    useCreateOneAlbumMutation();
  const [updateOneAlbum, { isLoading: isUpdating }] =
    useUpdateOneAlbumMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AlbumFormValues>({
    resolver: yupResolver(albumSchema),
  });

  const files = watch("images");
  const previewImages = useManyImagesPreview(files);

  const createFormData = (data: AlbumFormValues) => {
    const formData = new FormData();
    formData.append("albumName", data.albumName);

    if (data.images) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    return formData;
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const performAction = async (formData: FormData) => {
    if (actionType === AlbumActionType.UPDATE && album) {
      return await updateOneAlbum({
        albumId: album.id,
        formData,
      });
    } else if (actionType === AlbumActionType.CREATE) {
      return await createOneAlbum({
        folderId,
        formData,
      });
    }
  };

  const handleResponse = (res: any) => {
    if (res && "data" in res && "message" in res.data) {
      toast({ description: res.data.message });
    } else if (res && "error" in res && "message" in res.error) {
      toast({ description: res.error.message });
    }
    handleClose();
  };

  const onFormSubmit = async (data: AlbumFormValues) => {
    const formData = createFormData(data);

    try {
      const res = await performAction(formData);
      handleResponse(res);
    } catch (error) {
      toast({
        description: messages.errors.defaultError,
      });
    }
  };

  return (
    <>
      <IconButton
        variant={"shadow"}
        aria-label={
          action ? "Button for editing album" : "Button for creating album"
        }
        icon={action ? <MdEdit /> : <MdAddPhotoAlternate />}
        isLoading={action ? isUpdating : isCreating}
        size={"sm"}
        fontSize={"16px"}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("", "primaryDark.300")}>
          <ModalHeader fontSize={"18px"}>{title}</ModalHeader>
          <ModalCloseButton size={"sm"} />
          <ModalBody>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <FormControl isInvalid={!!errors.albumName} mb={4}>
                <Input placeholder="Folder Name" {...register("albumName")} />
                <FormErrorMessage>{errors.albumName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.images} mb={4}>
                <UploadWrapper>
                  <Input
                    type={"file"}
                    accept={"image/*"}
                    multiple
                    {...register("images")}
                    opacity={"0"}
                    height={"70px"}
                  />
                </UploadWrapper>
                <FormErrorMessage>{errors.images?.message}</FormErrorMessage>
              </FormControl>

              {previewImages?.length > 0 && (
                <Flex gap={"5px"} flexWrap={"wrap"}>
                  {previewImages?.map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt="Preview uploaded image"
                      width={"195px"}
                      borderRadius={"md"}
                    />
                  ))}
                </Flex>
              )}

              <Flex mt={"20px"} mb={"10px"}>
                <Button
                  width={"100%"}
                  type={"submit"}
                  size={"sm"}
                  isLoading={action ? isUpdating : isCreating}
                  bg={useColorModeValue("accentWhite.400", "accentDark.400")}
                  _hover={{
                    backgroundColor: useColorModeValue(
                      "accentWhite.300",
                      "teal.600"
                    ),
                  }}
                >
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
