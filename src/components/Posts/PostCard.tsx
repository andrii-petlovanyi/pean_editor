import { IPost } from "../../types/posts.interface";

interface Props {
  post: IPost;
}

export const PostCard = (props: Props): JSX.Element => {
  const {} = props;
  return <div>PostCard</div>;
};
