import { FC } from "react";
import { IPost } from "../../types/posts.interface";

interface Props {
  post: IPost;
}

export const PostCard: FC<Props> = (props) => {
  const {} = props;
  return <div>PostCard</div>;
};
