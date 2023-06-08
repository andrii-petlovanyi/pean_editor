export interface IGalleryFolder {
  id: string;
  folderName: string;
  imgPlaceholder: string;
  albums: IAlbum[];
}

export interface IUpdateGalleryFolder {
  folderId: string;
  formData: FormData;
}

export interface IAlbum {
  id: string;
  albumName: string;
  images: IImage[];
}

export interface ICreateAlbum {
  folderId: string;
  album: IAlbum;
}

export interface IUpdateAlbum {
  albumId: string;
  album: {
    albumName?: string;
    images?: IImage[];
  };
}

export interface IImage {
  id: string;
  url: string;
}

export interface UpdateFolderFormValues {
  folderName: string;
  placeholder: FileList | null;
}
