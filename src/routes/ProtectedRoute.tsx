import { FC } from "react";
import { useAppSelector } from "../redux/store/store";
import { Navigate,Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.UserSlice);
    return isAuthenticated && role === "user" ? (
      <Outlet />
    ) : (
      <Navigate to={"/user/login"} replace />
    );
  };

  export const DoctorProtectedRoute: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.DoctorSlice);
    console.log("in protected");
    console.log(role);
    return isAuthenticated && role === "doctor" ? (
      <Outlet />
    ) : (
      <Navigate to={"/doctor/login"} replace />
    );
  };
  
  export const AdminProtectedRoute: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.UserSlice);
    return isAuthenticated !== null && role === "admin" ? (
      <Outlet />
    ) : (
      <Navigate to={"/admin/login"} replace />
    );
  };
  
  export default ProtectedRoute;