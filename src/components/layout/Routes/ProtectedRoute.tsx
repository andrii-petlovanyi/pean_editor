import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../../../redux/store";
import { useGetUserQuery } from "../../../redux/api/user.api";

function ProtectedRoute() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { isLoading } = useGetUserQuery(undefined, {
    skip: true,
  });

  const location = useLocation();
  Cookies.set("privateRoute", location.pathname, { expires: 7 });

  switch (true) {
    case !isLoading && isAuth:
      return <Outlet />;
    case !isLoading && !isAuth:
      return <Navigate to="/login" />;
    default:
      return null;
  }
}

export default React.memo(ProtectedRoute);
