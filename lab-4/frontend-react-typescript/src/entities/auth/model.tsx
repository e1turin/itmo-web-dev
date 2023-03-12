import { api, client } from "shared/api";
import { useLocalStorage } from "shared/lib";
import { AuthContextType } from "./context/types";
import { Credential } from "shared/api/types/auth";
import { useState } from "react";
import { config } from "shared/conftg";

/**
 * Hook is to setup AuthContext. It is used for managing authentication of user.
 * `viewer` stands for authorized user. Type {U} is user credentials.
 * @returns Object inmplementing `IAuthContext`.
 */
export const useAuth = <U extends Credential>(): AuthContextType<U> => {
  // debugger;
  const [viewer, setViewer] = useLocalStorage<U | null>(
    config.userLocalStorageKey,
    null
  );
  const [isAuth, setIsAuth] = useState(() => !!viewer);

  // validateViewer(viewer).then((res: boolean) => setIsAuth(res)); //FIXME: make hook

  /**
   * Sign in hook
   * @param data is User Credential type {U}
   * @returns Promise<Error>
   */
  const signIn = async (data: U) => {
    // debugger;
    try {
      let authresult = await client.post(api.createToken, data);
      let userObj: U = { ...authresult.data?.user };
      console.log("[useAuth:signIn] userObj= ", userObj);
      userObj.token = authresult.data?.token;
      setViewer(userObj);
      setIsAuth(true);
      return null;
    } catch (err) {
      console.error("[useAuth::signIn]", err);
      setIsAuth(false);
      return err;
    }
  };

  /**
   * Sign up hook
   * @param data is User Credential type {U}
   * @returns Pemise<Error>
   */
  const signUp = async (data: U) => {
    try {
      let authresult = await client.put(api.createUser, data);
      let userObj: U = { ...authresult.data?.user };
      console.log("[useAuth:signIn] userObj= ", userObj);
      setViewer(userObj);
      setIsAuth(!!viewer);
      return null;
    } catch (err) {
      console.error("[useAuth::signUp]", err);
      return err;
    }
  };

  const signOut = async () => {
    try {
      const resp = await client.delete(api.unauthorize, {
        headers: {
          Authorization: viewer!!.token,
        },
      });
      console.log("[useAuth::signOut]", resp.status);
      setViewer(null!);
      setIsAuth(false);
    } catch (err) {
      console.error("[useAuth::signOut]", err);
    }
  };

  return { isAuth, viewer, signIn, signUp, signOut };
};

//TODO: move logic to shared/api
const validateViewer = async <U extends Credential>(
  viewer: U | null
): Promise<boolean> => {
  if (!!viewer) return false;
  try {
    const resp = await client.post(api.validateToken, "", {
      headers: {
        Authorization: viewer!!.token,
      },
    });
    console.log("[validateViewer] response = ", resp);
    // result = response.data?.isValid as boolean;
    const result = resp.status < 300;
    return result;
  } catch (error) {
    console.log("[validateViewer] validation failed with error=", error);
    return false;
  }
};
