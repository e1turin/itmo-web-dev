import { Routes, Route, useLocation, Navigate } from "react-router";
import { AuthContextType, RequireAuth, useAuthContext } from "entities/auth";
import { LoginPage } from "./auth/login";
import { RegisterPage } from "./auth/register";
import { Main } from "./main";

export const Routing = () => {
  //we use `useAuthContext` hook to get value from setted up AuthContext
  const { isAuth } = useAuthContext()!;
  const location = useLocation();
  const pathName = location.state?.from || "/";

  return (
    <Routes>
      <Route path="/" element={<RequireAuth to={<Main />} />} />
      <Route
        path="/login"
        element={isAuth ? <Navigate to={pathName} /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuth ? <Navigate to={pathName} /> : <RegisterPage />}
      />
    </Routes>
  );
};
