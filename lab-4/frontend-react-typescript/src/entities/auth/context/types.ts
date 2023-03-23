import { UserCredential } from "../../../shared/api/types/auth";

/**
 * Generic type for authentication data (e.g. `UserCredential`) stored in context
 */
export type AuthContextType<U> = {
  isAuth: boolean;
  viewer: U | null;
  signIn: (data: U) => Promise<any | null>;
  signUp: (data: U) => Promise<any | null>;
  signOut: () => Promise<any | null>;
  // authFailed: boolean;
  // setAuthFailed: (data: boolean) => void;
  validateViewer: () => Promise<any | null>;
};
