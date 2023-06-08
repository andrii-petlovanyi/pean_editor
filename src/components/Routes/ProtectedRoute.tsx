import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../../redux";

export default function ProtectedRoute() {
  let isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  const location = useLocation();
  Cookies.set("privateRoute", location.pathname, { expires: 7 });

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
