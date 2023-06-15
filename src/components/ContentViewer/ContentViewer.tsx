import { Flex, Heading, Text } from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";
import React from "react";
import { useSelector } from "react-redux";
import { CodeHighlighter } from "./components/CodeHighlighter";
import { ImageViewer } from "./components/ImageViewer";
import { Wrapper } from "./components/Wrapper";

export const ContentViewer = React.memo((): JSX.Element => {
  const viewerData = useSelector((state: any) => state.viewer.viewerData);

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
      <Markdown
        options={{
          wrapper: Wrapper,
          overrides: {
            code: (props) => <CodeHighlighter {...props} />,
            img: { component: ImageViewer },
            h1: Heading,
            h2: Heading,
            h3: Heading,
            h4: Heading,
            p: Text,
          },
        }}
      >
        {viewerData?.article}
      </Markdown>
    </Flex>
  );
});
