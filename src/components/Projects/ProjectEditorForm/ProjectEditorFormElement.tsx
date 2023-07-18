import { FC } from "react";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { FormElementType, IProjectForm, ProjectFormErrors } from "../../../types";

interface Props {
  id?: string;
  register: UseFormRegister<IProjectForm>;
  name: keyof IProjectForm;
  errors: ProjectFormErrors;
  placeholder: string;
  elementType: FormElementType;
  inputProps?: any;
  textareaProps?: any;
}

export const ProjectEditorFormElement: FC<Props> = (props) => {
  const {
    id,
    register,
    name,
    errors,
    placeholder,
    elementType,
    inputProps,
    textareaProps,
  } = props;

  const InputElement = elementType === "input" ? Input : Textarea;

  return (
    <FormControl isInvalid={!!errors[name]}>
      <InputElement
        id={id ?? ""}
        placeholder={placeholder}
        {...register(name)}
        {...(elementType === "input" ? inputProps : textareaProps)}
      />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
