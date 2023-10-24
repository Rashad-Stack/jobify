import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "../../components/Alert";
import DashboardFormWrapper from "../../components/DashboardFormWrapper";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import LoaderSmall from "../../components/LoaderSmall";
import LoadingBig from "../../components/LoadingBig";
import { jobStatus, jobTypes } from "../../constants";
import { selectUser } from "../../features/auth/authSlice";
import useJob from "../../hooks/useJob";

interface AddJobProps {
  isEdit?: boolean;
}

export default function AddJob({ isEdit = false }: AddJobProps) {
  const user = useSelector(selectUser);

  const params = useParams();

  const {
    job,
    createJob,
    updateJob,
    isLoading,
    getJobIsError,
    getJobError,
    getJobLoading,
    getJobIsSuccess,
    error,
    isError,
    isSuccess,
  } = useJob(isEdit, params?.id);

  const [formState, setFormState] = useState({
    position: job?.position || "",
    company: job?.company || "",
    location: job?.location || user?.location || "",
    jobType: job?.jobType || "full-time",
    status: job?.status || "pending",
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

    isEdit
      ? updateJob({
          id: params.id,
          body: { position, company, location, jobType, status },
        })
      : createJob({ position, company, location, jobType, status });
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
    if (isSuccess) {
      toast.success(isEdit ? "Updated successfully" : "Posted successfully");
      navigate("/all-jobs");
    }
  }, [isEdit, isSuccess, navigate]);

  useEffect(() => {
    if (isEdit && getJobIsSuccess) {
      setFormState((f) => ({
        ...f,
        position: job?.position,
        company: job?.company,
        location: job?.location,
        jobType: job?.jobType,
        status: job?.status,
      }));
    }
  }, [getJobIsSuccess, isEdit, user, job]);

  return getJobLoading ? (
    <LoadingBig height={70} />
  ) : (
    <DashboardFormWrapper>
      <form className="form" onSubmit={handlePostJob}>
        <h3>{isEdit ? "Update Job" : "Add Job"}</h3>

        {isAlert && <Alert />}
        {isError && <Alert message={error} type="error" />}
        {getJobIsError && <Alert message={getJobError} type="error" />}

        <div className="form-center">
          <FormRow
            name="position"
            type="text"
            value={position}
            labelText="Position"
            disabled={isLoading || getJobIsError}
            handleChange={handleChange}
          />
          <FormRow
            name="company"
            type="text"
            value={company}
            labelText="Company"
            disabled={isLoading || getJobIsError}
            handleChange={handleChange}
          />
          <FormRow
            name="location"
            type="text"
            value={location}
            labelText="Location"
            disabled={isLoading || getJobIsError}
            handleChange={handleChange}
          />

          <FormRowSelect
            name="jobType"
            value={jobType}
            labelText="Job Type"
            disabled={isLoading || getJobIsError}
            handleChange={handleChange}
            options={jobTypes}
          />

          <FormRowSelect
            name="status"
            value={status}
            labelText="Job Status"
            disabled={isLoading || getJobIsError}
            handleChange={handleChange}
            options={jobStatus}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading || getJobIsError}>
              {isLoading ? (
                <LoaderSmall title={isEdit ? "Updating" : "Posting"} />
              ) : isEdit ? (
                "Update"
              ) : (
                "Post"
              )}
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
