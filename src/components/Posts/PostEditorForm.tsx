import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "lodash.isequal";
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
import { updatePostData } from "../../redux/slice/viewer.slice";
import { debounce } from "../../helpers";
import { useCreatePostMutation } from "../../redux/api/posts.api";
import { useRequest } from "../../hooks/useRequest";

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
});

export const PostEditorForm: FC = () => {
  const post = useSelector((state: any) => state.viewer.post.data);
  const albumId = useSelector((state: any) => state.viewer.post.albumId);
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
    },
  });

  const [createPost, { isLoading }] = useCreatePostMutation();
  const handleCreatePost = useRequest(createPost);
  const watchFormValues = watch();

  const handleSubmitForm = async () => {
    await handleCreatePost({ ...watchFormValues, albumId });
  };

  const updateViewerDataCallback = useCallback(
    debounce((data: Pick<IPost, "title" | "description" | "article">) => {
      dispatch(updatePostData(data));
    }, 500),
    [dispatch]
  );

  const handleResetForm = () => {
    reset();
    dispatch(updatePostData(null));
  };

  useEffect(() => {
    if (isEqual(post, watchFormValues)) return;
    updateViewerDataCallback(watchFormValues);
  }, [watchFormValues]);

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
              minH={"calc(100svh - 350px)"}
              placeholder={"Please enter post article"}
              {...register("article")}
            />
            <FormErrorMessage>{errors.article?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Flex justify={"space-between"} mt={"20px"}>
          <Button
            onClick={handleResetForm}
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
            isLoading={isLoading}
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
