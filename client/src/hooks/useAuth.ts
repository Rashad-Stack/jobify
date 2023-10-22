import { useSelector } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../features/auth/authApi";
import { selectUser } from "../features/auth/authSlice";

export default function useAuth() {
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

  const isLoading = isRegistering || isLogging;
  const message =
    (RegisterError as any)?.data?.message || (loginError as any)?.data?.message;
  const isError = isRegisterError || isLoginError;
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
