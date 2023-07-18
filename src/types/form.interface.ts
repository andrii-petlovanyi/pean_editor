import { FieldError } from "react-hook-form";
import { IPostForm } from "./posts.interface";
import { IProjectForm } from ".";

export enum FormElementType {
  INPUT = "input",
  TEXTAREA = "textarea",
}

export type PostFormErrors = {
  [K in keyof IPostForm]?: FieldError;
};

export type ProjectFormErrors = {
  [K in keyof IProjectForm]?: FieldError;
};
