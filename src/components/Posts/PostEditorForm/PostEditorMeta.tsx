import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormElementType, IPostForm, PostFormErrors } from "../../../types";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { PostEditorFormElement } from "./PostEditorFormElement";

interface Props {
  register: UseFormRegister<IPostForm>;
  errors: PostFormErrors;
}

export const PostEditorMeta: FC<Props> = (props) => {
  const { errors, register } = props;

  return (
    <Accordion allowToggle>
      <AccordionItem borderTop={"0px"}>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Add meta
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          pb={4}
          px={0}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          <PostEditorFormElement
            name={"metaTitle"}
            register={register}
            elementType={FormElementType.INPUT}
            placeholder={"Please enter meta title"}
            errors={errors}
          />
          <PostEditorFormElement
            placeholder={"Please enter meta keywords"}
            register={register}
            name={"metaKeywords"}
            errors={errors}
            elementType={FormElementType.TEXTAREA}
          />
          <PostEditorFormElement
            placeholder={"Please enter meta description"}
            register={register}
            name={"metaDescription"}
            errors={errors}
            elementType={FormElementType.TEXTAREA}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
