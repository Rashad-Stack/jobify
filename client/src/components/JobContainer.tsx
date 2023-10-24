import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useGetJobsQuery } from "../features/job/jobApi";
import { Jobs } from "../types";
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
  const [searchParam] = useSearchParams();

  const search = searchParam.get("search");
  const sort = searchParam.get("sort") || "latest";
  const status = searchParam.get("status") || "all";
  const jobType = searchParam.get("jobType") || "all";

  const { data } = useGetJobsQuery({ status, sort, jobType, search });
  const { jobs = [] } = data || {};

  return (
    <Wrapper>
      <h5>
        {jobs.length} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job: Jobs) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
    </Wrapper>
  );
}
