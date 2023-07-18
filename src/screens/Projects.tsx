import { Flex, Link } from "@chakra-ui/react";
import { ListWrapper, Search, PageToolbar } from "../components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAllProjectsListQuery } from "../redux/api/projects.api";
import { IProject } from "../types";
import { ProjectCard } from "../components/Projects/ProjectCard";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { MdOutlineAddToQueue } from "react-icons/md";

export const Projects = (): JSX.Element => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>();
  const { data, isFetching } = useAllProjectsListQuery(null);
  const { projects } = data ?? {};

  console.log(search);

  const content = useMemo(() => {
    switch (true) {
      case isFetching:
        return <>...is loading</>;
      case projects && projects.length > 0:
        return projects?.map((project: IProject) => (
          <ProjectCard key={project.id} project={project} />
        ));
      default:
        return <>...no projects</>;
    }
  }, [data, isFetching]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.key === "n") {
      event.preventDefault();
      navigate("/projects/editor");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Flex direction={"column"} gap={"15px"}>
      <PageToolbar isDisabled={true}>
        <Link as={NavLink} to={"/projects/editor"} fontSize={"20px"}>
          <MdOutlineAddToQueue />
        </Link>
        <Search setSearch={setSearch} />
      </PageToolbar>
      <ListWrapper>{content}</ListWrapper>
    </Flex>
  );
};
