import { AuthContext } from "entities/auth";
import { useAuth } from "features/auth/hooks";
import { PropsWithChildren } from "react";

export const withAuth = ({ children }: PropsWithChildren) => {
  const auth: any = useAuth();
  //TODO:^^^: any^^^
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
