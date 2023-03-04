import {
  AuthContext,
  AuthContextType,
  useAuth,
  UserCredential,
} from "entities/auth";
import { PropsWithChildren } from "react";

export const WithAuth = ({ children }: PropsWithChildren) => {
  const auth: AuthContextType<UserCredential> = useAuth<UserCredential>();

  //we use `useAuth` hook to setup AuthContext: it is subscribed for auth changes
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
