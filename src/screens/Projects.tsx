import { Flex } from "@chakra-ui/react";
import { ListWrapper, Search, PageToolbar } from "../components";
import { useMemo, useState } from "react";
import { useAllProjectsListQuery } from "../redux/api/projects.api";
import { IProject } from "../types";
import { ProjectCard } from "../components/Projects/ProjectCard";

export const Projects = (): JSX.Element => {
  const [search, setSearch] = useState<string>();
  const { data, isFetching } = useAllProjectsListQuery(null);

  console.log(search);

  const content = useMemo(() => {
    switch (true) {
      case isFetching:
        return <>...is loading</>;
      case data && data.length > 0:
        return data.map((project: IProject) => (
          <ProjectCard key={project.id} project={project} />
        ));
      default:
        return <>...no projects</>;
    }
  }, [data, isFetching]);

  return (
    <Flex direction={"column"} gap={"15px"}>
      <PageToolbar isDisabled={true}>
        <Search setSearch={setSearch} />
      </PageToolbar>
      <ListWrapper>{content}</ListWrapper>
    </Flex>
  );
};
