import { useCreateJobMutation } from "../features/job/jobApi";
import { CustomError } from "../types";

export default function useJob() {
  const [
    createJob,
    {
      isLoading: createJobLoading,
      isError: createJobIsError,
      error: createJobError,
      isSuccess: createJobIsSuccess,
    },
  ] = useCreateJobMutation();

  const isLoading = createJobLoading;
  const isError = createJobIsError;
  const isSuccess = createJobIsSuccess;
  const error =
    (createJobError as CustomError)?.data?.message.toString() ||
    (createJobError as any)?.error?.message.toString();

  return {
    createJob,
    isLoading,
    isError,
    error,
    isSuccess,
  };
}
