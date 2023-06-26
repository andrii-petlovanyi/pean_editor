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
import { SearchAlbum } from "./SearchAlbum";

export const AddImage: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const albumId = useSelector((state: any) => state.viewer.viewerData.albumId);

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
            {albumId ? <>for future</> : <SearchAlbum isOpen={isOpen} />}
          </DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
});
