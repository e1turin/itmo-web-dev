import { AuthContext, useAuth } from "entities/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserCredential } from "shared/api/types";

export const WithAuth = (component: () => React.ReactNode) => () => {
  const auth = useAuth<UserCredential>();

  //we use `useAuth` hook to setup AuthContext: it is subscribed for auth changes
  return (
    <AuthContext.Provider value={auth}>{component()}</AuthContext.Provider>
  );
};
