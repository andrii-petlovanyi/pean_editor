import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../../../redux/store";
import { useGetUserQuery } from "../../../redux/api/user.api";

function PublicRoute() {
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const path = Cookies.get("privateRoute");
  const { isLoading } = useGetUserQuery(undefined, { skip: true });

  switch (true) {
    case !isLoading && !auth:
      return <Outlet />;
    case !isLoading && auth:
      return <Navigate to={path ? path : "/"} />;
    default:
      return null;
  }
}

export default React.memo(PublicRoute);
