import { CustomError, Jobs } from "../../types";
import apiSlice from "../api/apiSlice";
import { clearUser } from "../auth/authSlice";

type IJobs = {
  jobs: Jobs[];
  totalJobs: number;
  page: number;
};

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
    getJobs: builder.query<IJobs, void>({
      query: () => ({
        url: "/jobs",
        method: "GET",
      }),
    }),

    getJob: builder.query({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
    }),

    updateJob: builder.mutation({
      query: ({ id, body }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedJob } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getJobs" as unknown as never,
              undefined as unknown as never,
              (draft: { jobs: Jobs[] }) => {
                const draftedJob: Jobs | undefined = draft?.jobs.find(
                  (job) => job._id === updatedJob._id
                );

                if (!draftedJob) return;
                Object.assign(draftedJob, updatedJob);
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
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetJobQuery,
  useUpdateJobMutation,
} = jobApi;
