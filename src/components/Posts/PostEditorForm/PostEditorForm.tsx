import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "lodash.isequal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { EditorToolbar } from "../../Toolbars/EditorToolbar/EditorToolbar";
import {
  resetPostState,
  updatePostData,
  updatePostState,
} from "../../../redux/slice/viewer.slice";
import { debounce } from "../../../helpers";
import {
  useCreatePostMutation,
  useGetOnePostBySlugQuery,
  useUpdatePostMutation,
} from "../../../redux/api/posts.api";
import { useRequest } from "../../../hooks/useRequest";
import { PostEditorFormElement } from "./PostEditorFormElement";
import { PostEditorMeta } from "./PostEditorMeta";
import { FormElementType, IPost, IPostForm } from "../../../types";
import { postSchema } from "./postSchema";

export const PostEditorForm: FC = () => {
  const postSlug = useLocation().state;
  const post = useSelector((state: any) => state.viewer.post.data);
  const postId = useSelector((state: any) => state.viewer.post.postId);
  const albumId = useSelector((state: any) => state.viewer.post.albumId);
  const inDraft = useSelector((state: any) => state.viewer.post.inDraft);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      metaTitle: post?.metaTitle || "",
      metaDescription: post?.metaDescription || "",
      metaKeywords: post?.metaKeywords || "",
    },
  });

  const { data, isLoading: isLoadingPost } = useGetOnePostBySlugQuery(
    postSlug,
    {
      skip: !postSlug,
    }
  );
  const { post: existPost } = data ?? {};

  useEffect(() => {
    if (!existPost || isLoadingPost) return;

    dispatch(
      updatePostState({
        postId: existPost.id,
        albumId: existPost.album.id,
        inDraft: existPost.inDraft,
      })
    );

    setValue("title", existPost.title);
    setValue("description", existPost.description);
    setValue("article", existPost.article);
    setValue("metaTitle", existPost.metaTitle);
    setValue("metaKeywords", existPost.metaKeywords);
    setValue("metaDescription", existPost.metaDescription);
  }, [existPost]);

  const [createPost, { isLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const handleCreatePost = useRequest(createPost);
  const handleUpdatePost = useRequest(updatePost);
  const watchFormValues = watch();

  const handleSubmitForm = async () => {
    if (postId) {
      const postData = {
        postId,
        formData: {
          ...watchFormValues,
          albumId,
          inDraft,
        },
      };
      await handleUpdatePost(postData);
      handleResetForm();
      navigate("/blog");
    } else {
      await handleCreatePost({ ...watchFormValues, albumId, inDraft });
      handleResetForm();
    }
  };

  const updateViewerDataCallback = useCallback(
    debounce((data: Pick<IPost, "title" | "description" | "article">) => {
      dispatch(updatePostData(data));
    }, 500),
    [dispatch]
  );

  const handleResetForm = () => {
    reset({
      title: "",
      description: "",
      article: "",
      metaDescription: "",
      metaKeywords: "",
      metaTitle: "",
    });
    dispatch(resetPostState(null));
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
          <PostEditorMeta register={register} errors={errors} />

          <PostEditorFormElement
            placeholder="Please enter post title"
            register={register}
            name={"title"}
            errors={errors}
            elementType={FormElementType.INPUT}
          />
          <PostEditorFormElement
            placeholder={"Please enter post description"}
            register={register}
            name={"description"}
            errors={errors}
            elementType={FormElementType.INPUT}
          />
          <EditorToolbar setValue={setValue}></EditorToolbar>
          <PostEditorFormElement
            placeholder={"Please enter post article"}
            register={register}
            name={"article"}
            id={"article_editor"}
            elementType={FormElementType.TEXTAREA}
            errors={errors}
            textareaProps={{ minH: "calc(100svh - 390px)" }}
          />
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
            isLoading={isLoading || isUpdating}
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
