import { CustomError, Jobs } from "../../types";
import apiSlice from "../api/apiSlice";
import { clearUser } from "../auth/authSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<Jobs, Partial<Jobs>>({
      query: (body) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const { data: job } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getJobs" as unknown as never,
              undefined as unknown as never,
              (draft: { jobs: Jobs[] }) => {
                draft?.jobs.push(job);
              }
            )
          );
        } catch (error) {
          if ((error as CustomError).error?.status === 401) {
            dispatch(clearUser());
          }
          console.error(error);
        }
      },
    }),
    getJobs: builder.query({
      query: () => ({
        url: "/jobs",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateJobMutation, useGetJobsQuery } = jobApi;
