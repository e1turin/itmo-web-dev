import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "./context/model";

export type RequireAuthProps = {
  to: ReactNode;
};

export const RequireAuth = ({ to }: RequireAuthProps) => {
  //we use `useAuthContext` hook to get value from setted up AuthContext
  const { isAuth } = useAuthContext();
  const location = useLocation();

  return isAuth ? (
    <>children</>
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} /> //TODO: rafactor path in one place
  );
};
