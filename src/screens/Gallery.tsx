import { useMemo, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FolderActionType, IGalleryFolder } from "../types";
import { FolderCard, ListWrapper, Search, Toolbar } from "../components";
import { FolderFormPopover } from "../components/Gallery/Folder/FolderFormPopover";
import { useGetAllGalleryFoldersQuery } from "../redux/api/gallery.api";
import { listOfFolderSkeletons } from "../components/Skeletons/FolderSkeleton";

export const Gallery = (): JSX.Element => {
  const [search, setSearch] = useState<string>();
  const { data, isFetching } = useGetAllGalleryFoldersQuery(null);

  console.log(search);

  const content = useMemo(() => {
    switch (true) {
      case isFetching:
        return listOfFolderSkeletons;
      case data && data.length > 0:
        return data?.map((folder: Omit<IGalleryFolder, "albums">) => (
          <FolderCard key={folder.id} folder={folder} />
        ));
      default:
        return <Text>...no folders</Text>;
    }
  }, [isFetching, data]);

  return (
    <Flex direction={"column"} gap={"15px"}>
      <Toolbar isDisabled={true}>
        <FolderFormPopover
          folder={undefined}
          title={"Create folder"}
          actionType={FolderActionType.CREATE}
        />
        <Search setSearch={setSearch} />
      </Toolbar>

      <ListWrapper>{content}</ListWrapper>
    </Flex>
  );
};
