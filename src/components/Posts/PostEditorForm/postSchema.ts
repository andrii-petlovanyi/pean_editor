import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Min title length is 5 symbols")
    .required("Title is required"),
  description: yup
    .string()
    .min(20, "Min description length is 20 symbols")
    .max(370, "Max description length is 370 symbols")
    .required("Description is required"),
  article: yup
    .string()
    .min(100, "Min article length is 100 symbols")
    .required("Article is required"),
  metaTitle: yup.string().optional(),
  metaDescription: yup.string().optional(),
  metaKeywords: yup.string().optional(),
});
