import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../features/auth/authApi";
import LoaderSmall from "./LoaderSmall";

export default function Logout() {
  const [logout, { isLoading, isError, isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Logged out");
    if (isError) toast.error("Failed to log out");
  }, [isSuccess, isError]);

  return (
    <button className="dropdown-btn" onClick={logout} disabled={isLoading}>
      {isLoading ? <LoaderSmall title="Logging out" /> : "Logout"}
    </button>
  );
}
