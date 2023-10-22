import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../../types";

const initialState = {
  user: null,
  token: null,
  location: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const { user, token, location } = action.payload;

      state.user = user || state.user;
      state.token = token || state.token;
      state.location = location || state.location;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.location = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state: rootState) => state.auth.user;
export const selectToken = (state: rootState) => state.auth.token;
export const selectLocation = (state: rootState) => state.auth.location;
