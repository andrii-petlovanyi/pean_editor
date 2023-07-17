import { FC, useState } from "react";
import { Flex, IconButton, Image, Tooltip } from "@chakra-ui/react";
import { UseFormSetValue } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdAdd } from "react-icons/md";
import { IImage, IPostForm } from "../../../../../../types";
import { wrapInImg } from "../../../../../../helpers/wrapInImg";

interface Props {
  img: IImage;
  alt: string;
  setValue: UseFormSetValue<IPostForm>;
}

const FrameFlex = motion(Flex);

export const ImageSelectorCard: FC<Props> = ({ img, alt, setValue }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleSelectImg = () => {
    const updatedArticle = wrapInImg(img.url, alt);

    setValue("article", updatedArticle);
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
            key={alt}
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
            <Tooltip label={"Paste this image"}>
              <IconButton
                aria-label={"Select album"}
                icon={<MdAdd />}
                fontSize={"32px"}
                variant={"shadow"}
                onClick={handleSelectImg}
              />
            </Tooltip>
          </FrameFlex>
        )}
      </AnimatePresence>
      <Image src={img.url} alt={alt} />
    </Flex>
  );
};
