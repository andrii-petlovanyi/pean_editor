import { IImage } from ".";

export enum IAlbumActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
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

export interface IAlbumFormValues {
  albumName: string;
  images: FileList | null;
}

export interface IAlbumResponse {
  album: IAlbum;
}

export interface IAlbumListResponse {
  albums: IAlbum[];
}
