import { createSlice } from "@reduxjs/toolkit";

const viewerSlice = createSlice({
  name: "viewer",
  initialState: {
    post: {
      postId: null,
      albumId: null,
      data: {},
      showViewer: false,
    },
    project: {
      projectId: null,
      albumId: null,
      data: {},
      showViewer: false,
    },
  },
  reducers: {
    // Post actions
    updatePostData: (state, action) => {
      state.post.data = action.payload;
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
  },
});

export const {
  updatePostData,
  updateProjectData,
  addPostAlbumId,
  addProjectAlbumId,
  resetPostAlbumId,
  resetProjectAlbumId,
  updateShowPostViewer,
  updateShowProjectViewer,
} = viewerSlice.actions;
export default viewerSlice.reducer;
