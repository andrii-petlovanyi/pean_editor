import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types";

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (
      state: AuthState,
      action: PayloadAction<string | null>
    ) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAuthenticated, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
