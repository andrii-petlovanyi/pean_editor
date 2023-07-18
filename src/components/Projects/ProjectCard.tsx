import { FC } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { IProject } from "../../types";
import { useDeleteOneProjectMutation } from "../../redux/api/projects.api";
import { useRequest } from "../../hooks";

interface Props {
  project: IProject;
}

export const ProjectCard: FC<Props> = ({ project }) => {
  const { id, title } = project;

  const [deleteOneProject, { isLoading }] = useDeleteOneProjectMutation();
  const deleteProjectRequest = useRequest(deleteOneProject);

  const deleteProjectHandler = async () => {
    await deleteProjectRequest(id);
  };

  return (
    <Flex
      padding={"20px"}
      boxShadow={"md"}
      borderRadius={"md"}
      position={"relative"}
      border={"1px solid"}
      borderColor={"gray"}
    >
      <Flex position={"absolute"} top={"5px"} right={"5px"} gap={"5px"}>
        <IconButton
          icon={<MdModeEditOutline />}
          aria-label={"Edit post button"}
          isLoading={isLoading}
          size={"sm"}
          // onClick={editPostHandler}
        />
        <IconButton
          icon={<MdDeleteOutline />}
          aria-label={"Delete post button"}
          isLoading={isLoading}
          size={"sm"}
          onClick={deleteProjectHandler}
        />
      </Flex>
      {title}
    </Flex>
  );
};
