import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Alert from "../components/Alert";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { RegisterState } from "../types";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

const initialState: RegisterState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  isAlert: false,
};

export default function Register() {
  const { register, isLoading, isError, login, error, isSuccess } = useAuth();
  const [values, setValues] = useState<RegisterState>(initialState);

  const navigate = useNavigate();

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value, isAlert: false });
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      return setValues({ ...values, isAlert: true });
    }

    values.isMember
      ? login({ email, password })
      : register({ name, email, password });
  }

  function toggleMember() {
    setValues({ ...values, isMember: !values.isMember });
  }

  useEffect(
    function () {
      if (isSuccess) navigate("/");
    },

    [isSuccess, navigate]
  );

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={submitHandler}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {values.isAlert && <Alert />}

        {isError && <Alert message={error} />}

        {!values.isMember && (
          <FormRow
            name="name"
            labelText="Name"
            type="text"
            value={values.name}
            handleChange={onChangeHandler}
          />
        )}

        <FormRow
          name="email"
          labelText="Email"
          type="email"
          value={values.email}
          handleChange={onChangeHandler}
        />

        <FormRow
          name="password"
          labelText="Password"
          type="password"
          value={values.password}
          handleChange={onChangeHandler}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {values.isMember ? "Login" : "Register"}
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
