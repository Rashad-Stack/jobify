import { useGetStatsQuery } from "../features/job/jobApi";

export default function useStats() {
  const { data, isLoading, isError, error, isSuccess } = useGetStatsQuery(
    undefined,
    {}
  );

  const stats = data?.defaultStats;
  const weeklyApplications = data?.weeklyApplications;

  return {
    stats,
    weeklyApplications,
    isLoading,
    isError,
    error,
    isSuccess,
  };
}
