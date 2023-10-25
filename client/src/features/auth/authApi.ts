import { CustomError } from "../../types";
import apiSlice from "../api/apiSlice";
import { clearUser, setUser } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const { data: auth } = await queryFulfilled;
          dispatch(
            setUser({
              user: auth.user,
              location: auth.location,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const { data: auth } = await queryFulfilled;

          dispatch(
            setUser({
              user: auth.user,
              location: auth.location,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(clearUser());
        } catch (error) {
          console.error(error);
        }
      },
    }),

    updateUser: builder.mutation({
      query: (body) => ({
        url: "/auth/update-user",
        method: "PATCH",
        body,
      }),
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const { data: auth } = await queryFulfilled;
          dispatch(
            setUser({
              user: auth.data.user,
              location: auth.data.location,
            })
          );
        } catch (error) {
          if ((error as CustomError).error?.status === 401) {
            dispatch(clearUser());
          }
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
} = authApi;
