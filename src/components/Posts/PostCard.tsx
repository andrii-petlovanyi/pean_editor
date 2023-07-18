import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, IconButton } from "@chakra-ui/react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { IPost } from "../../types";
import { useDeleteOnePostMutation } from "../../redux/api/posts.api";
import { useRequest } from "../../hooks";

interface Props {
  post: IPost;
}

export const PostCard: FC<Props> = ({ post }) => {
  const { title, id, slug } = post;
  const navigate = useNavigate();
  const [deleteOnePost, { isLoading }] = useDeleteOnePostMutation();
  const deletePostRequest = useRequest(deleteOnePost);

  const deletePostHandler = async () => {
    await deletePostRequest(id);
  };

  const editPostHandler = () => {
    navigate("/blog/editor", { state: slug });
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
      <Flex position={"absolute"} top={"5px"} right={"5px"} gap={"5px"}>
        <IconButton
          icon={<MdModeEditOutline />}
          aria-label={"Edit post button"}
          isLoading={isLoading}
          size={"sm"}
          onClick={editPostHandler}
        />
        <IconButton
          icon={<MdDeleteOutline />}
          aria-label={"Delete post button"}
          isLoading={isLoading}
          size={"sm"}
          onClick={deletePostHandler}
        />
      </Flex>
      {title}
    </Flex>
  );
};
