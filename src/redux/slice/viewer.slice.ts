import { createSlice } from "@reduxjs/toolkit";
import { IPostViewerState, IProjectViewerState } from "../../types";

const initialStatePost: IPostViewerState = {
  postId: null,
  albumId: null,
  data: {},
  showViewer: false,
  inDraft: false,
};

const initialStateProject: IProjectViewerState = {
  projectId: null,
  albumId: null,
  data: {},
  showViewer: false,
  inDraft: false,
};

const viewerSlice = createSlice({
  name: "viewer",
  initialState: {
    post: initialStatePost,
    project: initialStateProject,
  },
  reducers: {
    // Post actions
    updatePostData: (state, action) => {
      state.post.data = { ...action.payload };
    },
    addPostAlbumId: (state, action) => {
      state.post.albumId = action.payload;
    },
    resetPostAlbumId: (state, _) => {
      state.post.albumId = null;
    },
    updateShowPostViewer: (state, action) => {
      state.post.showViewer = action.payload;
    },
    updatePostInDraft: (state, action) => {
      state.post.inDraft = action.payload;
    },
    updatePostState: (state, action) => {
      state.post = { ...action.payload };
    },
    resetPostState: (state, _) => {
      state.post = initialStatePost;
    },

    // Project action
    updateProjectData: (state, action) => {
      state.project.data = action.payload;
    },
    addProjectAlbumId: (state, action) => {
      state.project.albumId = action.payload;
    },
    resetProjectAlbumId: (state, _) => {
      state.project.albumId = null;
    },
    updateShowProjectViewer: (state, action) => {
      state.project.showViewer = action.payload;
    },
    updateProjectInDraft: (state, action) => {
      state.project.inDraft = action.payload;
    },
    updateProjectState: (state, action) => {
      state.project = { ...action.payload };
    },
    resetProjectState: (state, _) => {
      state.project = initialStateProject;
    },
  },
});

export const {
  updatePostData,
  addPostAlbumId,
  resetPostAlbumId,
  updateShowPostViewer,
  updatePostState,
  updatePostInDraft,
  resetPostState,

  updateProjectData,
  addProjectAlbumId,
  resetProjectAlbumId,
  updateShowProjectViewer,
  updateProjectInDraft,
  updateProjectState,
  resetProjectState,
} = viewerSlice.actions;
export default viewerSlice.reducer;
