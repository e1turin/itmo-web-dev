import { Routes, Route } from "react-router";
import { LoginPage } from "./auth/login";
import { RegisterPage } from "./auth/register";
import { Main } from "./main";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
