import { IAlbum } from "./album.interface";

export interface IPostForm {
  title: string;
  description: string;
  article: string;
  metaTitle?: string;
  metaKeywords?: string;
  albumId: string;
}

export interface IPost extends Omit<IPostForm, "albumId"> {
  id: string;
  inDraft: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  comments: string[];
  album: IAlbum[];
}

export interface IPostResponseList {
  posts: IPost[];
}

export interface IPostResponse {
  post: IPost;
  message: string;
}

export interface IPostUpdate {
  postId: string;
  formData: IPostForm;
}
