import { IAlbum } from "./album.interface";

export interface IGalleryFolder {
  id: string;
  folderName: string;
  imgPlaceholder: string;
  albums: IAlbum[];
}

export interface ICreateGalleryFolder {
  formData: FormData;
}

export interface IUpdateGalleryFolder extends ICreateGalleryFolder {
  folderId: string;
}

export interface IImage {
  id: string;
  url: string;
}

export interface IFolderFormValues {
  folderName: string;
  placeholder: FileList | null;
}

export enum IFolderActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export interface IGalleryFoldersResponse {
  folders: Omit<IGalleryFolder, "albums">[];
}

export interface IGalleryFolderResponse {
  folder: IGalleryFolder;
}
