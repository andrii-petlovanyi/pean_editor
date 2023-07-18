import { IAlbum } from "./album.interface";

export interface IProjectForm {
  title: string;
  article: string;
  projectDate: string;
  technology: string;
  platform: string;
  urlDemo: string;
  urlRepository: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  inDraft: boolean;
}

export interface IProject extends IProjectForm {
  id: string;
  slug: string;
  imgPlaceholder: string;
  imjPlaceholderId: string;
  createdAt: string;
  updatedAt: string;
  album: IAlbum;
}

export interface IUpdateProject {
  projectId: string;
  formData: FormData;
}

export interface IProjectsResponseList {
  projects: IProject[];
}

export interface IProjectResponse {
  project: IProject;
}

export interface IProjectFormState {
  title?: string;
  article?: string;
  projectDate?: string;
  technology?: string;
  platform?: string;
  urlDemo?: string;
  urlRepository?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  inDraft?: boolean;
}

export interface IProjectViewerState {
  data: IProjectFormState;
  projectId: string | null;
  albumId: string | null;
  showViewer: boolean;
  inDraft: boolean;
}
