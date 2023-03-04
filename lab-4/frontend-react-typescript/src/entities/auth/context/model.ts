import { createContext, useContext } from "react";
import { UserCredential } from "../types";
import { AuthContextType, DefaultAuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType<UserCredential>>(
  DefaultAuthContextType
);

export const useAuthContext = () => useContext(AuthContext);
