import { useCallback, useEffect, useMemo, useState } from "react";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { Flex, Link, Text } from "@chakra-ui/react";
import { MdPlaylistAdd } from "react-icons/md";
import { ListWrapper, Search, PageToolbar } from "../components";
import { useAllPostsQuery } from "../redux/api/posts.api";
import { IPost } from "../types";
import { PostCard } from "../components/Posts/PostCard";

export const Blog = (): JSX.Element => {
  const [search, setSearch] = useState<string>();
  const { data, isLoading } = useAllPostsQuery(null);
  const { posts } = data ?? {};
  const navigate = useNavigate();

  console.log(search);

  const content = useMemo(() => {
    switch (true) {
      case isLoading:
        return <>...loading</>;
      case posts && posts.length > 0:
        return posts?.map((post: IPost) => (
          <PostCard key={post.id} post={post} />
        ));
      default:
        return <Text>...no posts</Text>;
    }
  }, [data, isLoading]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.key === "n") {
      event.preventDefault();
      navigate("/blog/editor");
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
        <Link as={NavLink} to={"/blog/editor"} fontSize={"20px"}>
          <MdPlaylistAdd />
        </Link>
        <Search setSearch={setSearch} />
      </PageToolbar>
      <ListWrapper>{content}</ListWrapper>
    </Flex>
  );
};
