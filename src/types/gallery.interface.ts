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

export interface IAlbum {
  id: string;
  albumName: string;
  images: IImage[];
}

export interface ICreateAlbum {
  folderId: string;
  formData: FormData;
}

export interface IUpdateAlbum {
  albumId: string;
  images?: string[];
  formData: FormData;
}

export interface IImage {
  id: string;
  url: string;
}

export interface FolderFormValues {
  folderName: string;
  placeholder: FileList | null;
}

export enum FolderActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}
