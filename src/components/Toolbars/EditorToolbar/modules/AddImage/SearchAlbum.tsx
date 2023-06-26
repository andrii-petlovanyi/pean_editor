import {
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { debounce } from "../../../../../helpers";
import { useSearchAlbumQuery } from "../../../../../redux/api/gallery.api";
import { IAlbum } from "../../../../../types/album.interface";

interface Props {
  isOpen: boolean;
}

export const SearchAlbum: FC<Props> = memo((props) => {
  const { isOpen } = props;
  const title = useSelector((state: any) => state.viewer.viewerData.title);
  const [searchAlbum, setSearchAlbum] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setSearchAlbum(title ?? "");
    }
  }, [isOpen]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchAlbum(e.target.value);
  }, []);

  const handleSearchDebounced = useCallback(debounce(handleSearch, 500), []);

  const { data, error, isFetching } = useSearchAlbumQuery(searchAlbum, {
    skip: !searchAlbum || !isOpen,
  });
  const { albums } = data || {};

  const renderers = {
    error: <>...something went wrong</>,
    isLoading: <>...loading</>,
    hasAlbums: albums?.map((album: IAlbum) => (
      <Text key={album.id}>{album.albumName}</Text>
    )),
    noAlbums: <>...no albums with this name</>,
  };

  const rendererAlbums = useMemo(() => {
    switch (true) {
      case !!error:
        return renderers.error;
      case isFetching:
        return renderers.isLoading;
      case albums && albums.length > 0:
        return renderers.hasAlbums;
      case albums && !albums.length:
        return renderers.noAlbums;
      default:
        return null;
    }
  }, [albums, isFetching]);

  return (
    <Flex direction={"column"} gap={"20px"} py={"10px"}>
      <InputGroup size={"sm"}>
        <Input defaultValue={searchAlbum} onChange={handleSearchDebounced} />
        <InputRightElement>
          <IconButton
            icon={<MdSearch />}
            aria-label="Search albums"
            fontSize={"16px"}
            variant={"shadow"}
            isLoading={isFetching}
            pointerEvents={"none"}
          />
        </InputRightElement>
      </InputGroup>
      <Divider />
      <Flex direction={"column"} gap={"10px"}>
        {rendererAlbums}
      </Flex>
    </Flex>
  );
});
