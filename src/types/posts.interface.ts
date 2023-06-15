import { IAlbum } from ".";

export interface IPostForm {
  title: string;
  description: string;
  article: string;
  metaTitle: string;
  metaKeywords: string;
}

export interface IPost extends IPostForm {
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  comments: string[];
  album: IAlbum[];
}
