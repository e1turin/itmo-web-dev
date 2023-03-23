import { api, client } from "shared/api";
import { useLocalStorage } from "shared/lib";
import { AuthContextType } from "./context/types";
import { Credential } from "shared/api/types/auth";
import { useEffect, useState } from "react";
import { config } from "shared/conftg";
import { useSelector } from "react-redux";
import { getToken } from "./lib";

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
  const [isAuth, setIsAuth] = useState(false);
  // const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    if (!viewer) {
      setIsAuth(false);
      return;
    }
    validateViewer();
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
      console.log("[useAuth::signIn]", err);
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
      if (resp.status < 300) {
        setViewer(null!);
        setIsAuth(false);
      }
    } catch (err) {
      console.error("[useAuth::signOut]", err);
      return err;
    }
  };

  //TODO: move logic to shared/api
  const validateViewer = async () => {
    try {
      const result = await client
        .post(api.validateToken, null, {
          headers: {
            Authorization: getToken(),
            // Authorization: viewer?.token,
          },
        })
        .then((response) => {
          console.log("[validateViewer] response = ", response);
          return 200 <= response.status && response.status < 300;
        })
        .then((isValid: boolean) => {
          setIsAuth(isValid);
        })
        .catch((error) => {
          console.log("[validateViewer] validation failed with error=", error);
          // return 200 <= response.status && response.status < 300;
          setIsAuth(false);
        });
      // return result;
    } catch (err) {
      console.error("[useAuth::signOut]", err);
    }
  };

  return { isAuth, viewer, signIn, signUp, signOut, validateViewer };
};
