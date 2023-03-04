import { UserCredential } from "../types";

/**
 * Generic type for authentication data (e.g. `UserCredential`) stored in context
 */
export type AuthContextType<U> = {
  isAuth: boolean;
  viewer: U | null;
  signIn: (data: U) => void;
  signUp: (data: U) => void;
  signOut: () => void;
};

export const DefaultAuthContextType: AuthContextType<UserCredential> = {
  isAuth: false,
  viewer: null,
  signIn: (data: UserCredential) => {},
  signUp: (data: UserCredential) => {},
  signOut: () => {},
};
