import { FC } from "react";
import { useSelector } from "react-redux";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";
import { CodeHighlighter } from "./components/CodeHighlighter";
import { ImageViewer } from "./components/ImageViewer";
import { Wrapper } from "./components/Wrapper";
import { getHeadingComponent } from "../../helpers/getHeadingComponent";

export const ContentViewer: FC = () => {
  const viewerData = useSelector((state: any) => state.viewer.post.data);

  return (
    <Flex
      overflowY={"scroll"}
      maxH={"calc(100vh - 35px - 41px)"}
      width={"100%"}
      direction={"column"}
      gap={"20px"}
    >
      <Heading fontSize={"26px"}>{viewerData?.title}</Heading>
      <Text fontSize={"16px"} color={"gray.400"}>
        {viewerData?.description}
      </Text>
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
