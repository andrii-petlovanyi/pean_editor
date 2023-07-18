import { FC } from "react";
import { useSelector } from "react-redux";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";
import { getHeadingComponent } from "../../helpers/";
import { IViewerMode, IViewerState } from "../../types";
import { CodeHighlighter, ImageViewer, Wrapper } from "..";

interface Props {
  mode: IViewerMode;
}

export const ContentViewer: FC<Props> = ({ mode }) => {
  const viewerPostData = useSelector(
    (state: IViewerState) => state.viewer.post.data
  );
  const viewerProjectData = useSelector(
    (state: IViewerState) => state.viewer.project.data
  );

  const postViewerMode = mode === IViewerMode.POST;
  const viewerData = postViewerMode ? viewerPostData : viewerProjectData;

  return (
    <Flex
      overflowY={"scroll"}
      maxH={"calc(100vh - 35px - 41px)"}
      width={"100%"}
      direction={"column"}
      gap={"20px"}
    >
      <Heading fontSize={"26px"}>{viewerData?.title}</Heading>
      {postViewerMode && (
        <Text fontSize={"16px"} color={"gray.400"}>
          {viewerPostData?.description}
        </Text>
      )}
      {viewerData?.article && (
        <Markdown
          options={{
            wrapper: Wrapper,
            overrides: {
              code: (props) => <CodeHighlighter {...props} />,
              img: { component: ImageViewer },
              h1: getHeadingComponent(1),
              h2: getHeadingComponent(2),
              h3: getHeadingComponent(3),
              h4: getHeadingComponent(4),
              p: Text,
            },
          }}
        >
          {viewerData?.article}
        </Markdown>
      )}
    </Flex>
  );
};
