import { IPostViewerState, IProjectViewerState } from ".";

export interface IViewerState {
  viewer: IViewerEntity;
}

export interface IViewerEntity {
  post: IPostViewerState;
  project: IProjectViewerState;
}

export enum IViewerMode {
  POST = "blog",
  PROJECT = "projects",
}
