import { FC } from "react";
import { IProject } from "../../types/projects.interface";

interface Props {
  project: IProject;
}

export const ProjectCard: FC<Props> = (props) => {
  const {} = props;
  return <div>ProjectCard</div>;
};
