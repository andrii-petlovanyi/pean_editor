import { FC, memo } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";
import { UseFormSetValue } from "react-hook-form";
import { SearchAlbum } from "./SearchAlbum/SearchAlbum";
import { ImageSelector } from "./ImageSelector/ImageSelector";
import {
  IPostForm,
  IProjectForm,
  IViewerMode,
  IViewerState,
} from "../../../../../types";

export type FormType = IPostForm | IProjectForm;

interface Props {
  setValue: UseFormSetValue<FormType>;
}

export const AddImage: FC<Props> = memo(({ setValue }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mode = useLocation().pathname.split("/")[1] as IViewerMode;

  const postAlbumId = useSelector(
    (state: IViewerState) => state.viewer.post.albumId
  );
  const projectAlbumId = useSelector(
    (state: IViewerState) => state.viewer.project.albumId
  );

  const isPostMode = mode == IViewerMode.POST;

  const albumId = isPostMode ? postAlbumId : projectAlbumId;

  return (
    <>
      <IconButton
        icon={<MdAddAPhoto />}
        aria-label={"Add image"}
        variant={"toolbarIB"}
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay bg={"blackAlpha.500"} backdropFilter={"blur(3px)"} />
        <DrawerContent
          bg={useColorModeValue("", "primaryDark.300")}
          borderTopLeftRadius={"xl"}
          borderBottomLeftRadius={"xl"}
        >
          <DrawerBody>
            {albumId ? (
              <ImageSelector
                setValue={setValue}
                mode={mode}
                albumId={albumId}
              />
            ) : (
              <SearchAlbum isOpen={isOpen} mode={mode} />
            )}
          </DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
});
