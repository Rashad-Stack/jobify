import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface Api {
  getState(): any; // Replace `any` with the actual return type of `getState`
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Job"],
  endpoints() {
    return {};
  },
});

export default apiSlice;
