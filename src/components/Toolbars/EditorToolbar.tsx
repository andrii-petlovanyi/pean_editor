import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  BsCodeSlash,
  BsTextParagraph,
  BsTypeBold,
  BsTypeItalic,
} from "react-icons/bs";

interface Props {
  children?: ReactNode;
  setValue?: any;
}

export const EditorToolbar = (props: Props): JSX.Element => {
  const { children, setValue } = props;

  const handleChangeSelectedText = (tag: string) => {
    const articleTextarea = document.getElementById(
      "article_editor"
    ) as HTMLTextAreaElement;

    if (articleTextarea) {
      const selectedText = articleTextarea.value.substring(
        articleTextarea.selectionStart,
        articleTextarea.selectionEnd
      );

      if (selectedText) {
        const beforeText = articleTextarea.value.substring(
          0,
          articleTextarea.selectionStart
        );
        const afterText = articleTextarea.value.substring(
          articleTextarea.selectionEnd
        );

        const modifiedText =
          beforeText + `<${tag}>` + selectedText + `</${tag}>` + afterText;

        setValue("article", `${modifiedText}`);
      }
    }
  };

  return (
    <Flex
      minH={"35px"}
      width={"100%"}
      justify={"flex-start"}
      align={"center"}
      borderRadius={"md"}
      bg={useColorModeValue("accentWhite.200", "primaryDark.300")}
    >
      <IconButton
        aria-label={"Text paragraph"}
        icon={<BsTextParagraph />}
        size={"sm"}
        fontSize={"18px"}
        variant={"shadow"}
        onClick={() => handleChangeSelectedText("p")}
      />
      <IconButton
        aria-label={"Bold text"}
        icon={<BsTypeBold />}
        size={"sm"}
        fontSize={"18px"}
        variant={"shadow"}
        onClick={() => handleChangeSelectedText("b")}
      />
      <IconButton
        aria-label={"Italic text"}
        icon={<BsTypeItalic />}
        size={"sm"}
        fontSize={"18px"}
        variant={"shadow"}
        onClick={() => handleChangeSelectedText("i")}
      />
      <IconButton
        aria-label={"Code highlighter"}
        icon={<BsCodeSlash />}
        size={"sm"}
        fontSize={"18px"}
        variant={"shadow"}
        onClick={() => handleChangeSelectedText("code")}
      />
      {children}
    </Flex>
  );
};
