import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useGetJobsQuery } from "../features/job/jobApi";
import { CustomError, Jobs } from "../types";
import ErrorMsg from "./ErrorMsg";
import Job from "./Job";
import LoadingBig from "./LoadingBig";
import PageBtnContainer from "./PageBtnContainer";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
export default function JobContainer() {
  const [searchParam] = useSearchParams();

  const search = searchParam.get("search");
  const sort = searchParam.get("sort") || "latest";
  const status = searchParam.get("status") || "all";
  const jobType = searchParam.get("jobType") || "all";
  const limit = searchParam.get("limit") || "10";
  const page = searchParam.get("page") || "1";

  const { data, isLoading, isError, error, isSuccess } = useGetJobsQuery(
    {
      status,
      sort,
      jobType,
      search,
      limit,
      page,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { jobs = [], totalJobs, pages } = data || {};

  return isLoading ? (
    <LoadingBig height={20} />
  ) : (
    <>
      {isError ? (
        <ErrorMsg height={30} error={error as CustomError} />
      ) : isSuccess && jobs.length > 0 ? (
        <Wrapper>
          <h5>
            {totalJobs} job{jobs.length > 1 && "s"} found
          </h5>
          <div className="jobs">
            {jobs.map((job: Jobs) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
          {pages && pages > 1 && <PageBtnContainer pages={pages as number} />}
        </Wrapper>
      ) : (
        <ErrorMsg height={30} msg="No jobs found!" />
      )}
    </>
  );
}
