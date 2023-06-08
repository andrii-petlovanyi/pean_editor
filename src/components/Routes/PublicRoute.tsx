import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../../redux";

export default function PublicRoute() {
  let auth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const path = Cookies.get("privateRoute");

  return !auth ? <Outlet /> : <Navigate to={path ? path : "/"} />;
}
