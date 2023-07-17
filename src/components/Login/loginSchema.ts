import * as yup from "yup";

export const loginSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim()
    .min(3, "Minimal username length is 3 symbols")
    .max(32, "Max username length is 32 symbols")
    .required("Username is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Minimal password length is 8 symbols")
    .max(32, "Max password length is 32 symbols")
    .required("Password is required"),
});
