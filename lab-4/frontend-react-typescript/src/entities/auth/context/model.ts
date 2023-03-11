import { createContext, useContext } from "react";
import { UserCredential } from "shared/api/types/auth";
import { AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType<UserCredential>>(
  null!
);

export const useAuthContext = () => useContext(AuthContext);
