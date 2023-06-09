import { useMemo, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { IFolderActionType, IGalleryFolder } from "../types";
import { FolderCard, ListWrapper, Search, PageToolbar } from "../components";
import { FolderFormPopover } from "../components/Gallery/Folder/FolderFormPopover";
import { useGetAllGalleryFoldersQuery } from "../redux/api/gallery.api";
import { listOfFolderSkeletons } from "../components/Skeletons/FolderSkeleton";

export const Gallery = (): JSX.Element => {
  const [search, setSearch] = useState<string>();
  const { data, isFetching } = useGetAllGalleryFoldersQuery(null);
  const { folders } = data || {};
  console.log(search);

  const content = useMemo(() => {
    switch (true) {
      case isFetching:
        return listOfFolderSkeletons;
      case folders && folders.length > 0:
        return folders?.map((folder: Omit<IGalleryFolder, "albums">) => (
          <FolderCard key={folder.id} folder={folder} />
        ));
      default:
        return <Text>...no folders</Text>;
    }
  }, [isFetching, data]);

  return (
    <Flex direction={"column"} gap={"15px"}>
      <PageToolbar isDisabled={true}>
        <FolderFormPopover
          folder={undefined}
          title={"Create folder"}
          actionType={IFolderActionType.CREATE}
        />
        <Search setSearch={setSearch} />
      </PageToolbar>

      <ListWrapper>{content}</ListWrapper>
    </Flex>
  );
};
