import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import LoadingSpinner from "../extra/loaders/LoadingSpinner";

export default function PrivateRoute({ children }) {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) {
    return <LoadingSpinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={{ form: location }} replace />;
}
