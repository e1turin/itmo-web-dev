import { createContext } from "react";
import { UserCredentials } from "./types";

export const AuthContext = createContext<UserCredentials | null>(null);
