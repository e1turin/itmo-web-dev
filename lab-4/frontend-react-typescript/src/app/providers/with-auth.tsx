import { AuthContext, useAuth, UserCredential } from "entities/auth";
import { PropsWithChildren, useState } from "react";

export const WithAuth = (component: () => React.ReactNode) => () => {
  const auth = useAuth<UserCredential>();

  //we use `useAuth` hook to setup AuthContext: it is subscribed for auth changes
  return (
    <AuthContext.Provider value={auth}>{component()}</AuthContext.Provider>
  );
};
