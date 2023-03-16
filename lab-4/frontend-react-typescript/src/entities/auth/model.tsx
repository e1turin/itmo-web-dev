import { api, client } from "shared/api";
import { useLocalStorage } from "shared/lib";
import { AuthContextType } from "./context/types";
import { Credential } from "shared/api/types/auth";
import { useEffect, useState } from "react";
import { config } from "shared/conftg";
import { useSelector } from "react-redux";

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
  const [isAuth, setIsAuth] = useState(!!viewer);
  // const authFailed = useSelector((state: any) => state.attempts.authFailed);

  useEffect(() => {
    if (!viewer) {
      setIsAuth(false);
      return;
    }
    validateViewer(viewer).then((isValid: boolean) => {
      setIsAuth(isValid);
    });
  }, [viewer]);

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
  viewer: U
): Promise<boolean> => {
  const result = await client
    .post(api.validateToken, null, {
      headers: {
        Authorization: viewer.token,
      },
    })
    .then((response) => {
      console.log("[validateViewer] response = ", response);
      return 200 <= response.status && response.status < 300;
    })
    .catch((error) => {
      console.log("[validateViewer] validation failed with error=", error);
      return false;
    });
  return result;
};
