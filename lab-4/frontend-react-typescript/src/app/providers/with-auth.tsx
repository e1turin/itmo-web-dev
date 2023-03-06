import { AuthContext, useAuth, UserCredential } from "entities/auth";

export const WithAuth = (component: () => React.ReactNode) => () => {
  // const auth = {
  //   isAuth: true,
  //   viewer: { token: "kek", username: "lol" },
  //   signIn: (data: UserCredential) => {},
  //   signUp: (data: UserCredential) => {},
  //   signOut: () => {},
  // } as AuthContextType<UserCredential>;
  const auth = useAuth<UserCredential>();

  //we use `useAuth` hook to setup AuthContext: it is subscribed for auth changes
  return (
    <AuthContext.Provider value={auth}>{component()}</AuthContext.Provider>
  );
};
