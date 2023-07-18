import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "lodash.isequal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  resetProjectState,
  updateProjectData,
  updateProjectState,
} from "../../../redux/slice/viewer.slice";
import { debounce } from "../../../helpers";
import { useRequest } from "../../../hooks";
import { FormElementType, IProjectForm, IViewerState } from "../../../types";
import { projectSchema } from "./projectSchema";
import {
  useCreateProjectMutation,
  useGetOneProjectBySlugQuery,
  useUpdateProjectMutation,
} from "../../../redux/api/projects.api";
import { ProjectEditorMeta } from "./ProjectEditorMeta";
import { ProjectEditorFormElement } from "./ProjectEditorFormElement";
import { EditorToolbar } from "../..";

export const ProjectEditorForm = () => {
  const projectSlug = useLocation().state;
  const {
    data: project,
    projectId,
    albumId,
    inDraft,
  } = useSelector((state: IViewerState) => state.viewer.project);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IProjectForm>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      article: project?.article || "",
      projectDate: project?.projectDate || "",

      metaTitle: project?.metaTitle || "",
      metaDescription: project?.metaDescription || "",
      metaKeywords: project?.metaKeywords || "",
    },
  });

  const { data, isLoading: isLoadingProject } = useGetOneProjectBySlugQuery(
    projectSlug,
    {
      skip: !projectSlug,
    }
  );
  const { project: existProject } = data ?? {};

  useEffect(() => {
    if (!existProject || isLoadingProject) return;

    dispatch(
      updateProjectState({
        projectId: existProject.id,
        albumId: existProject.album.id,
        inDraft: existProject.inDraft,
      })
    );

    setValue("title", existProject.title);
    setValue("article", existProject.article);
    setValue("metaTitle", existProject.metaTitle);
    setValue("metaKeywords", existProject.metaKeywords);
    setValue("metaDescription", existProject.metaDescription);
  }, [existProject]);

  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const handleCreateProject = useRequest(createProject);
  const handleUpdateProject = useRequest(updateProject);
  const watchFormValues = watch();

  const handleSubmitForm = async () => {
    if (projectId) {
      const projectData = {
        projectId,
        formData: {
          ...watchFormValues,
          albumId,
          inDraft,
        },
      };
      const success = await handleUpdateProject(projectData);

      if (success) {
        handleResetForm();
        navigate("/projects");
      }
    } else {
      const success = await handleCreateProject({
        ...watchFormValues,
        albumId,
        inDraft,
      });

      if (success) handleResetForm();
    }
  };

  const updateViewerDataCallback = useCallback(
    debounce((data: Pick<IProjectForm, "title" | "article">) => {
      dispatch(updateProjectData(data));
    }, 500),
    [dispatch]
  );

  const handleResetForm = () => {
    reset({
      title: "",
      article: "",
      metaDescription: "",
      platform: "",
      technology: "",
      urlDemo: "",
      urlRepository: "",
      projectDate: "",
      metaKeywords: "",
      metaTitle: "",
    });
    dispatch(resetProjectState(null));
  };

  useEffect(() => {
    if (isEqual(project, watchFormValues)) return;
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
          <ProjectEditorMeta register={register} errors={errors} />

          <ProjectEditorFormElement
            placeholder="Please enter project title"
            register={register}
            name={"title"}
            errors={errors}
            elementType={FormElementType.INPUT}
          />

          <EditorToolbar setValue={setValue}/>
          <ProjectEditorFormElement
            placeholder={"Please enter project article"}
            register={register}
            name={"article"}
            id={"article_editor"}
            elementType={FormElementType.TEXTAREA}
            errors={errors}
            textareaProps={{
              minH: {
                base: "calc(100svh - 250px)",
                lg: "calc(100svh - 520px)",
              },
            }}
          />

          <Grid templateColumns={"repeat(4, 1fr)"} gap={4}>
            <ProjectEditorFormElement
              placeholder="Date"
              register={register}
              name={"projectDate"}
              errors={errors}
              elementType={FormElementType.INPUT}
            />
            <GridItem colSpan={3}>
              <ProjectEditorFormElement
                placeholder="Please enter platforms"
                register={register}
                name={"platform"}
                errors={errors}
                elementType={FormElementType.INPUT}
              />
            </GridItem>
          </Grid>

          <ProjectEditorFormElement
            placeholder="Please enter all used technologies"
            register={register}
            name={"technology"}
            errors={errors}
            elementType={FormElementType.INPUT}
          />

          <ProjectEditorFormElement
            placeholder="Please enter link on projects"
            register={register}
            name={"urlDemo"}
            errors={errors}
            elementType={FormElementType.INPUT}
          />

          <ProjectEditorFormElement
            placeholder="Please enter link on repo"
            register={register}
            name={"urlRepository"}
            errors={errors}
            elementType={FormElementType.INPUT}
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
            Save project
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
