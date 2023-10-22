import styled from "styled-components";
import { useGetJobsQuery } from "../features/job/jobApi";
import Loading from "../pages/Loading";
import { CustomError } from "../types";
import Alert from "./Alert";
import Job from "./Job";

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
  const { data, isLoading, isError, error, isSuccess } = useGetJobsQuery(
    undefined,
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      skip: false,
    }
  );
  const { jobs = [], totalJobs, page } = data || {};

  console.log(jobs);

  return isLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      {isError && (
        <Alert
          type="error"
          message={(error as CustomError).data.message.toString()}
        />
      )}

      {isSuccess && (
        <>
          <h5>
            {totalJobs} job{jobs.length > 1 && "s"} found
          </h5>
          <div className="jobs">{jobs.map(Job)}</div>
        </>
      )}
    </Wrapper>
  );
}
