import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import DashboardFormWrapper from "../../components/DashboardFormWrapper";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import LoaderSmall from "../../components/LoaderSmall";
import { jobStatus, jobTypes } from "../../constants";
import { selectUser } from "../../features/auth/authSlice";
import useJob from "../../hooks/useJob";

export default function AddJob() {
  const user = useSelector(selectUser);
  const { createJob, isLoading, error, isError, isSuccess } = useJob();
  const [successAlert, setSuccessAlert] = useState<boolean>(false);

  const [formState, setFormState] = useState({
    position: "",
    company: "",
    location: user?.location || "",
    jobType: "",
    status: "",
    isAlert: false,
  });
  const { position, company, location, jobType, status, isAlert } = formState;

  const navigate = useNavigate();

  function handlePostJob(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState({ ...formState, isAlert: false });
    if (!position || !company || !location) {
      return setFormState({ ...formState, isAlert: true });
    }
    createJob({ position, company, location, jobType, status });
  }

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      isAlert: false,
    });
  }

  function handleClearForm() {
    setFormState({
      position: "",
      company: "",
      location: user?.location || "",
      jobType: "full-time",
      status: "pending",
      isAlert: false,
    });
  }

  useEffect(() => {
    setSuccessAlert(true);
    const timeout = setTimeout(() => {
      isSuccess && setSuccessAlert(false);
    }, 1500);

    if (isSuccess) {
      navigate("/all-jobs");
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isSuccess, navigate]);

  return (
    <DashboardFormWrapper>
      <form className="form" onSubmit={handlePostJob}>
        <h3>Add Job</h3>

        {isAlert && <Alert />}
        {isError && <Alert message={error} type="error" />}
        {isSuccess && successAlert && <Alert type="success" message="Posted" />}

        <div className="form-center">
          <FormRow
            name="position"
            type="text"
            value={position}
            labelText="Position"
            handleChange={handleChange}
          />
          <FormRow
            name="company"
            type="text"
            value={company}
            labelText="Company"
            handleChange={handleChange}
          />
          <FormRow
            name="location"
            type="text"
            value={location}
            labelText="Location"
            handleChange={handleChange}
          />

          <FormRowSelect
            name="jobType"
            value={jobType}
            labelText="Job Type"
            handleChange={handleChange}
            options={jobTypes}
          />

          <FormRowSelect
            name="status"
            value={status}
            labelText="Job Status"
            handleChange={handleChange}
            options={jobStatus}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}>
              {isLoading ? <LoaderSmall title="Posting..." /> : "Post"}
            </button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={handleClearForm}>
              Clear
            </button>
          </div>
        </div>
      </form>
    </DashboardFormWrapper>
  );
}
