import { FC } from "react";
import { IPost } from "../../types/posts.interface";
import { Flex, IconButton } from "@chakra-ui/react";
import { useDeleteOnePostMutation } from "../../redux/api/posts.api";
import { MdDeleteOutline } from "react-icons/md";
import { useRequest } from "../../hooks/useRequest";

interface Props {
  post: IPost;
}

export const PostCard: FC<Props> = ({ post }) => {
  const { title, id } = post;
  const [deleteOnePost, { isLoading }] = useDeleteOnePostMutation();
  const deletePostRequest = useRequest(deleteOnePost);

  const deletePostHandler = async () => {
    await deletePostRequest(id);
  };

  return (
    <Flex
      padding={"20px"}
      boxShadow={"md"}
      borderRadius={"md"}
      position={"relative"}
      border={"1px solid"}
      borderColor={"gray"}
    >
      <IconButton
        icon={<MdDeleteOutline />}
        aria-label={"Delete post button"}
        isLoading={isLoading}
        size={"sm"}
        onClick={deletePostHandler}
        position={"absolute"}
        top={"5px"}
        right={"5px"}
      />
      {title}
    </Flex>
  );
};
