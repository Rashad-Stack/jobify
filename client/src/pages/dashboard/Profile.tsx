import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Alert from "../../components/Alert";
import DashboardFormWrapper from "../../components/DashboardFormWrapper";
import FormRow from "../../components/FormRow";
import LoaderSmall from "../../components/LoaderSmall";
import { useUpdateUserMutation } from "../../features/auth/authApi";
import { selectUser } from "../../features/auth/authSlice";
import { CustomError, UsersType } from "../../types";

export default function Profile() {
  const user = useSelector(selectUser);
  const [updateUser, { isLoading, error, isError, isSuccess }] =
    useUpdateUserMutation();
  const [formState, setFormState] = useState<UsersType>({
    name: user?.name,
    email: user?.email,
    lastName: user?.lastName,
    location: user?.location,
    isAlert: false,
  });

  const { name, email, lastName, location, isAlert } = formState;

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    setFormState({ ...formState, isAlert: false });
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      return setFormState({ ...formState, isAlert: true });
    }
    updateUser({ name, email, lastName, location });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      isAlert: false,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (isSuccess) toast.success("Profile updated!");
  }, [isError, isSuccess]);

  return (
    <DashboardFormWrapper>
      <form className="form" onSubmit={handleUpdate}>
        <h3>Profile</h3>

        {isAlert && <Alert />}

        {isError && (
          <Alert
            message={
              (error as CustomError)?.data?.message?.toString() ||
              (error as CustomError)?.data?.toString()
            }
          />
        )}

        <div className="form-center">
          <FormRow
            name="name"
            type="text"
            value={name}
            labelText="Name"
            handleChange={handleChange}
          />

          <FormRow
            name="lastName"
            type="text"
            value={lastName || ""}
            labelText="Last Name"
            handleChange={handleChange}
          />

          <FormRow
            name="email"
            type="email"
            value={email}
            labelText="Email"
            handleChange={handleChange}
          />

          <FormRow
            name="location"
            type="text"
            value={location || ""}
            labelText="Location"
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? <LoaderSmall title="Updating..." /> : " Update"}
          </button>
        </div>
      </form>
    </DashboardFormWrapper>
  );
}
