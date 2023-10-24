import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface Api {
  getState(): any; // Replace `any` with the actual return type of `getState`
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    async prepareHeaders(headers, { getState }: { getState: Api["getState"] }) {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Job"],
  endpoints() {
    return {};
  },
});

export default apiSlice;
