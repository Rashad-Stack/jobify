import { useSelector } from "react-redux";
import {
  useGetCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../features/auth/authApi";
import { selectUser } from "../features/auth/authSlice";
import { CustomError } from "../types";

export default function useAuth() {
  // Check if user is logged in
  const {
    isLoading: currentUserIsLoading,
    isError: currentUserIsError,
    error: currentUserError,
  } = useGetCurrentUserQuery(undefined, {
    skip: false,
  });

  // Register mutation hook
  const [
    register,
    {
      isLoading: isRegistering,
      isSuccess: isRegistered,
      isError: isRegisterError,
      error: RegisterError,
    },
  ] = useRegisterMutation();
  // Login mutation hook
  const [
    login,
    {
      isLoading: isLogging,
      isSuccess: isLoggedIn,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();

  // Current logged in user
  const user = useSelector(selectUser);

  const isLoading = currentUserIsLoading || isRegistering || isLogging;
  const message =
    (currentUserError as CustomError)?.data?.message?.toString() ||
    (currentUserError as CustomError)?.error?.message?.toString() ||
    (RegisterError as CustomError)?.data?.message?.toString() ||
    (loginError as CustomError)?.data?.message?.toString();

  const isError = currentUserIsError || isRegisterError || isLoginError;
  const isSuccess = isRegistered || isLoggedIn;

  return {
    register,
    login,
    isLoading,
    isError,
    error: message,
    isSuccess,
    user,
  };
}
