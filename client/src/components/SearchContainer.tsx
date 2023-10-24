import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;
export default function SearchContainer() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [formState, setFormState] = useState({
    search: searchParam.get("search") || "",
    jobType: searchParam.get("jobType") || "all",
    status: searchParam.get("status") || "all",
    sort: searchParam.get("sort") || "latest",
  });

  const { search, jobType, status, sort } = formState;

  function debounce() {
    let timeoutID: any;
    return (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setFormState({ ...formState, [e.target.name]: e.target.value });
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        if (e.target.value === "all" || !e.target.value) {
          searchParam.delete(e.target.name);
        } else {
          searchParam.set(e.target.name, e.target.value);
        }
        setSearchParam(searchParam);
      }, 500);
    };
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedDebounce = useMemo(() => debounce(), []);

  function handleClear() {
    setSearchParam("");
    setFormState({
      search: "",
      jobType: "all",
      status: "all",
      sort: "latest",
    });
  }

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="status"
            value={status}
            handleChange={optimizedDebounce}
            options={["all", "pending", "interview", "declined"]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="jobType"
            value={jobType}
            handleChange={optimizedDebounce}
            options={["all", "full-time", "part-time", "remote", "internship"]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={optimizedDebounce}
            options={["latest", "oldest", "a-z", "z-a"]}
          />
          <button
            type="reset"
            className="btn btn-block btn-danger"
            onClick={handleClear}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
