import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingBig from "./LoadingBig";

interface ProtectedRouteProps {
  children: JSX.Element;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  // 1) Load the authenticated user
  const { isLoading, currentUserIsLoading, user } = useAuth();

  // 2) If there is no authenticated user, redirect to the login page

  useEffect(
    function () {
      if (!isLoading && !currentUserIsLoading && !user) navigate("/landing");
    },
    [user, isLoading, navigate, currentUserIsLoading]
  );

  return isLoading ? <LoadingBig height={100} /> : children;
}
