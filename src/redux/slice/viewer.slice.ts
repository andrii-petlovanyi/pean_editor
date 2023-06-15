import { createSlice } from "@reduxjs/toolkit";

const viewerSlice = createSlice({
  name: "viewer",
  initialState: {
    viewerData: {},
  },
  reducers: {
    updateViewerData: (state, action) => {
      state.viewerData = action.payload;
    },
  },
});

export const { updateViewerData } = viewerSlice.actions;
export default viewerSlice.reducer;
