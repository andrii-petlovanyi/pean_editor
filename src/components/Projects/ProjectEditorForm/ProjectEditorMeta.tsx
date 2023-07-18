import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import {
  FormElementType,
  IProjectForm,
  ProjectFormErrors,
} from "../../../types";
import { ProjectEditorFormElement } from "./ProjectEditorFormElement";

interface Props {
  register: UseFormRegister<IProjectForm>;
  errors: ProjectFormErrors;
}

export const ProjectEditorMeta: FC<Props> = (props) => {
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
          <ProjectEditorFormElement
            name={"metaTitle"}
            register={register}
            elementType={FormElementType.INPUT}
            placeholder={"Please enter meta title"}
            errors={errors}
          />
          <ProjectEditorFormElement
            placeholder={"Please enter meta keywords"}
            register={register}
            name={"metaKeywords"}
            errors={errors}
            elementType={FormElementType.TEXTAREA}
          />
          <ProjectEditorFormElement
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
