import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Alert from "../../components/Alert";
import FormRow from "../../components/FormRow";
import LoaderSmall from "../../components/LoaderSmall";
import { useUpdateUserMutation } from "../../features/auth/authApi";
import { selectUser } from "../../features/auth/authSlice";
import { CustomError, UsersType } from "../../types";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
      &&:disabled {
        cursor: not-allowed;
      }
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default function Profile() {
  const user = useSelector(selectUser);
  const [updateUser, { isLoading, error, isError, isSuccess }] =
    useUpdateUserMutation();
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
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
    setSuccessAlert(true);
    const timeout = setTimeout(() => {
      isSuccess && setSuccessAlert(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [isSuccess]);

  return (
    <Wrapper>
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

        {isSuccess && successAlert && (
          <Alert type="success" message="Updated!" />
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
    </Wrapper>
  );
}
