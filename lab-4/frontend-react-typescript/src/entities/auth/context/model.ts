import { createContext, useContext } from "react";
import { UserCredential } from "../types";
import { AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType<UserCredential>>(
  null!
);

export const useAuthContext = () => useContext(AuthContext);
