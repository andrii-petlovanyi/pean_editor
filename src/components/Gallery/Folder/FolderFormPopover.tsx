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
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdEdit } from "react-icons/md";
import {
  IGalleryFolder,
  FolderFormValues,
  FolderActionType,
} from "../../../types";
import {
  useCreateOneGalleryFolderMutation,
  useUpdateOneGalleryFolderMutation,
} from "../../../redux/api/gallery.api";
import { messages } from "../../../config/messages";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { UploadWrapper } from "../../UploadWrapper/UploadWrapper";
import { useOneImgPreview } from "../../../hooks";

interface Props {
  folder?: Omit<IGalleryFolder, "albums">;
  title: string;
  actionType: FolderActionType;
}

const folderSchema = yup.object().shape({
  folderName: yup.string().required("Folder name is required"),
  placeholder: yup.mixed(),
});

export const FolderFormPopover = (props: Props): JSX.Element => {
  const { folder, title, actionType } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({ variant: "custom" });

  const action = actionType === FolderActionType.UPDATE;

  const [updateOneGalleryFolder, { isLoading: isUpdating }] =
    useUpdateOneGalleryFolderMutation();

  const [createOneGalleryFolder, { isLoading: isCreating }] =
    useCreateOneGalleryFolderMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FolderFormValues>({
    resolver: yupResolver(folderSchema),
    defaultValues: {
      folderName: folder ? folder.folderName : "",
    },
  });

  const file = watch("placeholder");
  const filePreview = useOneImgPreview(file);

  const createFormData = (data: FolderFormValues) => {
    const formData = new FormData();
    formData.append("folderName", data.folderName);
    formData.append("imgPlaceholder", data.placeholder?.[0] || "");
    return formData;
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const performAction = async (formData: FormData) => {
    if (actionType === FolderActionType.UPDATE && folder) {
      return await updateOneGalleryFolder({
        folderId: folder.id,
        formData,
      });
    } else if (actionType === FolderActionType.CREATE) {
      return await createOneGalleryFolder({
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

  const onSubmit = async (data: FolderFormValues) => {
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
      <Tooltip label={action ? "Edit folder" : "Create new folder"}>
        <IconButton
          variant={"shadow"}
          aria-label={
            action ? "Button for editing folder" : "Button for creating folder"
          }
          icon={action ? <MdEdit /> : <AiOutlineFolderAdd />}
          isLoading={action ? isUpdating : isCreating}
          size={"sm"}
          fontSize={"18px"}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay bg={"blackAlpha.500"} backdropFilter={"blur(3px)"} />
        <ModalContent bg={useColorModeValue("", "primaryDark.300")}>
          <ModalHeader fontSize={"18px"}>{title}</ModalHeader>
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
                <UploadWrapper>
                  <Input
                    opacity={"0"}
                    type={"file"}
                    accept={"image/*"}
                    {...register("placeholder")}
                    cursor={"pointer"}
                    height={"70px"}
                  />
                </UploadWrapper>
                <FormErrorMessage>
                  {errors.placeholder?.message}
                </FormErrorMessage>
              </FormControl>

              {filePreview && (
                <Image
                  src={filePreview as string}
                  alt={"Preview uploaded image"}
                  mb={4}
                  width={"100%"}
                  borderRadius={"md"}
                />
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
