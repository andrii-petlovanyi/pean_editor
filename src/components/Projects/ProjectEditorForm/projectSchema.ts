import * as yup from "yup";

export const projectSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Min title length is 5 symbols")
    .required("Title is required"),
  article: yup
    .string()
    .min(100, "Min article length is 100 symbols")
    .required("Article is required"),
  projectDate: yup.string().min(8, "Need 8 symbols"),
  technology: yup.string().min(6, "Min technology length is 6 symbols"),
  platform: yup.string().min(4, "Min platform length is 4 symbols"),
  urlDemo: yup.string().optional(),
  urlRepository: yup.string().optional(),
  metaTitle: yup.string().optional(),
  metaDescription: yup.string().optional(),
  metaKeywords: yup.string().optional(),
});
