import { ReactElement, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useGetAllGalleryFoldersQuery } from "../redux";
import { IGalleryFolder } from "../types";
import { FolderCard, ListWrapper, Search, Toolbar } from "../components";

export const Gallery = (): JSX.Element => {
  const [search, setSearch] = useState<string>();
  const { data, currentData, isFetching } = useGetAllGalleryFoldersQuery(null);

  console.log(search);

  const content = (): ReactElement | ReactElement[] => {
    if (isFetching) {
      return <Text>...loading</Text>;
    } else if (data?.length && currentData) {
      return currentData.map((folder: Omit<IGalleryFolder, "albums">) => (
        <FolderCard key={folder.id} folder={folder} />
      ));
    } else {
      return <Text>...no folders</Text>;
    }
  };

  const renderedContent = content();

  return (
    <Flex direction={"column"} gap={"15px"}>
      <Toolbar isDisabled={true}>
        <Button size={"sm"}>+</Button>
        <Search setSearch={setSearch} />
      </Toolbar>

      <ListWrapper>{renderedContent}</ListWrapper>
    </Flex>
  );
};
