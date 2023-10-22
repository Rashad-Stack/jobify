import { CustomError } from "../../types";
import apiSlice from "../api/apiSlice";
import { clearUser } from "../auth/authSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (body) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const { data: job } = await queryFulfilled;
          //   dispatch(
          //     apiSlice.util.updateQueryData("getJobs", undefined, (draft) => {
          //       draft.push(job);
          //     })
          //   );
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

export const { useCreateJobMutation } = jobApi;
