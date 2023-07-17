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
import { MdAddAPhoto } from "react-icons/md";
import { useSelector } from "react-redux";
import { UseFormSetValue } from "react-hook-form";
import { SearchAlbum } from "./SearchAlbum/SearchAlbum";
import { ImageSelector } from "./ImageSelector/ImageSelector";
import { IPostForm } from "../../../../../types";

interface Props {
  setValue: UseFormSetValue<IPostForm>;
}

export const AddImage: FC<Props> = memo(({ setValue }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const albumId = useSelector((state: any) => state.viewer.post?.albumId);

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
              <ImageSelector setValue={setValue} />
            ) : (
              <SearchAlbum isOpen={isOpen} />
            )}
          </DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
});
