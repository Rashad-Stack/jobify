import { CustomError, Jobs } from "../../types";
import apiSlice from "../api/apiSlice";
import { clearUser } from "../auth/authSlice";

type IJobs = {
  jobs: Jobs[];
  totalJobs: number;
  pages: number;
};

type IGetJobs = {
  status: string | null;
  sort: string | null;
  search: string | null;
  jobType: string | null;
  limit: string | null;
  page: string | null;
};

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<IJobs, IGetJobs>({
      query: ({ status, sort, search, jobType, limit, page }) => ({
        url: `/jobs?status=${status}&jobType=${jobType}&search=${search}&sort=${sort}&limit=${limit}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    createJob: builder.mutation<Jobs, Partial<Jobs>>({
      query: (body) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Job"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
          if ((error as CustomError).error?.status === 401) {
            dispatch(clearUser());
          }
          console.error(error);
        }
      },
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
      invalidatesTags: ["Job"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
          if ((error as CustomError).error?.status === 401) {
            dispatch(clearUser());
          }
          console.error(error);
        }
      },
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
          if ((error as CustomError).error?.status === 401) {
            dispatch(clearUser());
          }
          console.error(error);
        }
      },
    }),
    getStats: builder.query({
      query: () => ({
        url: "/jobs/user/stats",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetJobQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetStatsQuery,
} = jobApi;
