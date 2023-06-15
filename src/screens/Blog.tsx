import { Flex, Link, Text } from "@chakra-ui/react";
import { ListWrapper, Search, PageToolbar } from "../components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAllPostsQuery } from "../redux/api/posts.api";
import { IPost } from "../types/posts.interface";
import { PostCard } from "../components/Posts/PostCard";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md";

export const Blog = (): JSX.Element => {
  const [search, setSearch] = useState<string>();
  const { data, isFetching } = useAllPostsQuery(null);
  const navigate = useNavigate();

  console.log(search);

  const content = useMemo(() => {
    switch (true) {
      case isFetching:
        return <>...loading</>;
      case data && data.length > 0:
        return data.map((post: IPost) => (
          <PostCard key={post.id} post={post} />
        ));
      default:
        return <Text>...no posts</Text>;
    }
  }, [data, isFetching]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.key === "n") {
      event.preventDefault();
      navigate("/blog/create");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Flex direction={"column"} gap={"15px"}>
      <PageToolbar isDisabled={true}>
        <Link as={NavLink} to={"/blog/create"} fontSize={"20px"}>
          <MdPlaylistAdd />
        </Link>
        <Search setSearch={setSearch} />
      </PageToolbar>
      <ListWrapper>{content}</ListWrapper>
    </Flex>
  );
};
