import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../../redux/store";

export default function ProtectedRoute() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  const location = useLocation();
  Cookies.set("privateRoute", location.pathname, { expires: 7 });

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
