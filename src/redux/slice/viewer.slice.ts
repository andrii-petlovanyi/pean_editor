import { createSlice } from "@reduxjs/toolkit";

const initialStatePost = {
  postId: null,
  albumId: null,
  data: {},
  showViewer: false,
  inDraft: false,
};

const initialStateProject = {
  projectId: null,
  albumId: null,
  data: {},
  showViewer: false,
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
    updateInDraft: (state, action) => {
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
  updateInDraft,
  updatePostState,
  resetPostState,
} = viewerSlice.actions;
export default viewerSlice.reducer;
