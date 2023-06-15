import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IPost, IPostForm } from "../../types/posts.interface";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditorToolbar } from "../Toolbars/EditorToolbar/EditorToolbar";
import { useDispatch } from "react-redux";
import { updateViewerData } from "../../redux/slice/viewer.slice";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { debounce } from "../../helpers";

const postSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Min title length is 5 symbols")
    .required("Title is required"),
  description: yup
    .string()
    .min(20, "Min description length is ")
    .max(370, "Max description length is 370 symbols")
    .required("Description is required"),
  article: yup
    .string()
    .min(100, "Min article length is 100 symbols")
    .required("Article is required"),

  //TODO: for future features
  // metaTitle: yup.string(),
  // metaKeywords: yup.array(),
});

export const PostEditorForm = (): JSX.Element => {
  const location = useLocation();
  const post = location.state;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IPostForm>({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      article: post?.article || "",

      //TODO: for future features
      // metaTitle: post?.metaTitle || "",
      // metaKeywords: post?.metaKeywords || "",
    },
  });

  const handleSubmitForm = () => {};

  const watchFormValues = watch();

  const updateViewerDataCallback = useCallback(
    debounce((data: Pick<IPost, "title" | "description" | "article">) => {
      dispatch(updateViewerData(data));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    updateViewerDataCallback(watchFormValues);
  }, [watchFormValues, updateViewerDataCallback]);

  return (
    <Flex
      overflowY={"scroll"}
      maxH={"calc(100vh - 35px - 41px)"}
      height={"100%"}
      width={"100%"}
      direction={"column"}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <Input
              placeholder={"Please enter post title"}
              {...register("title")}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <Textarea
              placeholder={"Please enter post description"}
              {...register("description")}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <EditorToolbar setValue={setValue}></EditorToolbar>
          <FormControl isInvalid={!!errors.article}>
            <Textarea
              id={"article_editor"}
              minH={"230px"}
              placeholder={"Please enter post article"}
              {...register("article")}
            />
            <FormErrorMessage>{errors.article?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Flex justify={"space-between"} mt={"20px"}>
          <Button
            onClick={() => reset()}
            size={"sm"}
            bg={useColorModeValue("accentWhite.400", "red.500")}
            _hover={{
              backgroundColor: useColorModeValue("accentWhite.300", "red.600"),
            }}
          >
            Clear form
          </Button>
          <Button
            type={"submit"}
            size={"sm"}
            bg={useColorModeValue("accentWhite.400", "accentDark.400")}
            _hover={{
              backgroundColor: useColorModeValue("accentWhite.300", "teal.600"),
            }}
          >
            Save post
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
