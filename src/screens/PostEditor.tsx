import { useEffect, useState } from "react";
import { Divider, Flex, Grid, IconButton, Tooltip } from "@chakra-ui/react";
import { VscOpenPreview } from "react-icons/vsc";
import { MdOutlineClosedCaptionDisabled } from "react-icons/md";
import { PageToolbar } from "../components";
import { PostEditorForm } from "../components/Posts/PostEditorForm";
import { ContentViewer } from "../components/ContentViewer/ContentViewer";

export const PostEditor = (): JSX.Element => {
  const [showViewer, setShowViewer] = useState<boolean>(false);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === "t") {
      event.preventDefault();
      setShowViewer(!showViewer);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Flex direction={"column"} gap={"15px"}>
      <PageToolbar>
        <Tooltip label={showViewer ? "Hide viewer" : "Show viewer"}>
          <IconButton
            variant={"shadow"}
            size={"sm"}
            fontSize={"18px"}
            aria-label={"Show or hide viewer"}
            icon={
              showViewer ? (
                <MdOutlineClosedCaptionDisabled />
              ) : (
                <VscOpenPreview />
              )
            }
            onClick={() => setShowViewer(!showViewer)}
          />
        </Tooltip>
      </PageToolbar>
      <Grid
        templateColumns={
          showViewer
            ? "minmax(50px, 1fr) minmax(1px, 1px) minmax(50px, 1fr)"
            : "1fr"
        }
        gap={4}
      >
        <PostEditorForm />
        {showViewer && (
          <>
            <Divider
              width={"2px"}
              orientation={"vertical"}
              color={"gray.600"}
              minH={"100%"}
            />
            <ContentViewer />
          </>
        )}
      </Grid>
    </Flex>
  );
};
