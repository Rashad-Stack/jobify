import {
  useCreateJobMutation,
  useGetJobQuery,
  useUpdateJobMutation,
} from "../features/job/jobApi";
import { CustomError } from "../types";

export default function useJob(isEdit: boolean, id?: string) {
  const [
    createJob,
    {
      isLoading: createJobLoading,
      isError: createJobIsError,
      error: createJobError,
      isSuccess: createJobIsSuccess,
    },
  ] = useCreateJobMutation();

  const [
    updateJob,
    {
      isLoading: updateJobLoading,
      isError: updateJobIsError,
      error: updateJobError,
      isSuccess: updateJobIsSuccess,
    },
  ] = useUpdateJobMutation();

  const {
    data: job,
    isLoading: getJobLoading,
    isError: getJobIsError,
    error: jobError,
    isSuccess: getJobIsSuccess,
  } = useGetJobQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !isEdit,
  });

  const isLoading: boolean = createJobLoading || updateJobLoading;
  const isError: boolean = createJobIsError || updateJobIsError;
  const isSuccess: boolean = createJobIsSuccess || updateJobIsSuccess;
  const error: string =
    (createJobError as CustomError)?.data?.message.toString() ||
    (createJobError as any)?.error?.message?.toString() ||
    (updateJobError as CustomError)?.data?.message.toString() ||
    (updateJobError as any)?.error?.message?.toString() ||
    "Something went wrong!";

  const getJobError =
    (jobError as CustomError)?.data?.message.toString() ||
    (jobError as any)?.error?.message?.toString() ||
    "Something went wrong!";

  return {
    createJob,
    updateJob,
    job,
    isLoading,
    getJobLoading,
    getJobIsError,
    getJobError,
    getJobIsSuccess,
    isError,
    error,
    isSuccess,
  };
}
