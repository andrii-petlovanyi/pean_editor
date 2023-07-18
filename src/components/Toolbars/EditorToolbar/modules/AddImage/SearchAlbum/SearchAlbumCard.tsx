import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { Flex, IconButton, Image, Text, Tooltip } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { IAlbum, IViewerMode } from "../../../../../../types";
import {
  addPostAlbumId,
  addProjectAlbumId,
} from "../../../../../../redux/slice/viewer.slice";

interface Props {
  album: IAlbum;
}

const FrameFlex = motion(Flex);

export const SearchAlbumCard: FC<Props> = ({ album }) => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();

  const mode = useLocation().pathname.split("/")[1];

  const handleSelectAlbum = () => {
    if (mode == IViewerMode.POST) {
      dispatch(addPostAlbumId(album.id));
    } else if (mode == IViewerMode.PROJECT) {
      dispatch(addProjectAlbumId(album.id));
    }
  };

  return (
    <Flex
      width={"100%"}
      position={"relative"}
      overflow={"hidden"}
      borderRadius={"md"}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <AnimatePresence>
        {show && (
          <FrameFlex
            key={album.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            position={"absolute"}
            top={"0"}
            left={"0"}
            right={"0"}
            bottom={"0"}
            backgroundColor={"primaryDark.300.5"}
            backdropFilter={"blur(5px)"}
            zIndex={"9"}
            justify={"center"}
            align={"center"}
          >
            <Tooltip label={"Select album"}>
              <IconButton
                aria-label={"Select album"}
                icon={<MdAdd />}
                fontSize={"32px"}
                variant={"shadow"}
                onClick={handleSelectAlbum}
              />
            </Tooltip>
          </FrameFlex>
        )}
      </AnimatePresence>
      <Image alt={album.albumName} src={album.images[0].url} />
      <Text
        position={"absolute"}
        bottom={"0"}
        left={"0"}
        right={"0"}
        p={"5px 10px"}
        backgroundColor={"primaryDark.300.5"}
        backdropFilter={"blur(5px)"}
      >
        {album.albumName}
      </Text>
    </Flex>
  );
};
