import { FieldError } from "react-hook-form";
import { IPostForm } from "./posts.interface";

export enum FormElementType {
  INPUT = "input",
  TEXTAREA = "textarea",
}

export type PostFormErrors = {
  [K in keyof IPostForm]?: FieldError;
};