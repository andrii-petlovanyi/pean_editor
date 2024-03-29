import { Flex, IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  BsCodeSlash,
  BsTextParagraph,
  BsTypeBold,
  BsTypeItalic,
} from "react-icons/bs";
import { HeadingTagMenu } from "./modules/HeadingTagMenu";
import { wrapInTag } from "../../../helpers/";
import { AddImage } from "./modules/AddImage/AddImage";

interface Props {
  children?: ReactNode;
  setValue: UseFormSetValue<any>;
}

export const EditorToolbar: FC<Props> = (props) => {
  const { children, setValue } = props;

  const handleChangeSelectedText = (tag: string) => {
    const modifiedText = wrapInTag(tag);

    if (!modifiedText?.length) return;

    setValue("article", modifiedText);
  };

  return (
    <Flex
      minH={"35px"}
      width={"100%"}
      justify={"flex-start"}
      align={"center"}
      flexWrap={"wrap"}
      borderRadius={"md"}
      bg={useColorModeValue("accentWhite.200", "primaryDark.300")}
    >
      <Tooltip label={"Paragraph"}>
        <IconButton
          aria-label={"Text paragraph"}
          icon={<BsTextParagraph />}
          variant={"toolbarIB"}
          onClick={() => handleChangeSelectedText("p")}
        />
      </Tooltip>
      <HeadingTagMenu setTag={handleChangeSelectedText} />
      <Tooltip label={"Bold"}>
        <IconButton
          aria-label={"Bold text"}
          icon={<BsTypeBold />}
          variant={"toolbarIB"}
          onClick={() => handleChangeSelectedText("b")}
        />
      </Tooltip>
      <Tooltip label={"Italic"}>
        <IconButton
          aria-label={"Italic text"}
          icon={<BsTypeItalic />}
          variant={"toolbarIB"}
          onClick={() => handleChangeSelectedText("i")}
        />
      </Tooltip>
      <Tooltip label={"Code"}>
        <IconButton
          aria-label={"Code highlighter"}
          icon={<BsCodeSlash />}
          variant={"toolbarIB"}
          onClick={() => handleChangeSelectedText("code")}
        />
      </Tooltip>
      <AddImage setValue={setValue} />
      {children}
    </Flex>
  );
};
