export enum AlbumActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export interface AlbumFormValues {
  albumName: string;
  images: FileList | null;
}
