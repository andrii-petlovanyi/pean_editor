import { IAlbum } from ".";

export interface IProject {
  id: string;
  slug: string;
  title: string;
  article: string;
  projectDate: string;
  imgPlaceholder: string;
  imjPlaceholderId: string;
  technology: string[];
  platform: string;
  urlDemo: string;
  urlRepository: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  createdAt: string;
  updatedAt: string;
  album: IAlbum;
}
