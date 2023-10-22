import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../../types";

export const apiSlice = createSlice({
  name: "toggler",
  initialState: {
    sidebar: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
  },
});
export const { toggleSidebar } = apiSlice.actions;
export default apiSlice.reducer;
export const selectToggleSidebar = (state: rootState) => state.toggler.sidebar;
