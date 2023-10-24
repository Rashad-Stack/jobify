import { useEffect, useState } from "react";
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
  const currentSort = searchParam.get("sort");

  const currenSearch = searchParam.get("search");
  const currenJobType = searchParam.get("jobType");
  const currenStatus = searchParam.get("status");

  const [formState, setFormState] = useState({
    search: "",
    jobType: "all",
    status: "all",
    sort: "latest",
  });

  const { search, jobType, status, sort } = formState;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (e.target.value === "all" || !e.target.value) {
      searchParam.delete(e.target.name);
    } else {
      searchParam.set(e.target.name, e.target.value);
    }
    setSearchParam(searchParam);
  }

  function debounce(
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
    delay: number
  ) {
    let timeoutID: NodeJS.Timeout;

    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setFormState({ ...formState, search: e.target.value });

      clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        if (e.target.value === "all" || !e.target.value) {
          searchParam.delete("search");
        } else {
          searchParam.set("search", e.target.value);
        }
        setSearchParam(searchParam);

        // Call the original callback, passing the debounced event
        callback(e);
      }, delay);
    };
  }

  const handleSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Do something with the debounced search input
      console.log("Debounced Search:", e.target.value);
    },
    500
  );

  function handleClear() {
    setSearchParam("");
    setFormState({
      search: "",
      jobType: "all",
      status: "all",
      sort: "latest",
    });
  }

  useEffect(() => {
    if (!currentSort) {
      searchParam.set("sort", "latest");
      setSearchParam(searchParam);
    }
  }, [currentSort, searchParam, setSearchParam]);

  useEffect(() => {
    setFormState({
      search: currenSearch || "",
      jobType: currenJobType || "all",
      status: currenStatus || "all",
      sort: currentSort || "latest",
    });
  }, [currenJobType, currenSearch, currenStatus, currentSort]);

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
            handleChange={handleSearchChange}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="status"
            value={status}
            handleChange={handleChange}
            options={["all", "pending", "interview", "declined"]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="jobType"
            value={jobType}
            handleChange={handleChange}
            options={["all", "full-time", "part-time", "remote", "internship"]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleChange}
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
