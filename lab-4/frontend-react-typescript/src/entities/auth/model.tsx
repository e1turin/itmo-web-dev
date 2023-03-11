import { api, client } from "shared/api";
import { useLocalStorage } from "shared/lib";
import { AuthContextType } from "./context/types";
import { Credential } from "shared/api/types/auth";

/**
 * Hook is to setup AuthContext. It is used for managing authentication of user.
 * `viewer` stands for authorized user. Type {U} is user credentials.
 * @returns Object inmplementing `IAuthContext`.
 */
export const useAuth = <U extends Credential>(): AuthContextType<U> => {
  // debugger;
  //TODO: use specified `key`
  const [viewer, setViewer] = useLocalStorage<U | null>("user", null);
  let isAuth = false;
  validateViewer(viewer).then((res: boolean) => (isAuth = res)); //FIXME: make hook

  /**
   * Sign in hook
   * @param data is User Credential type {U}
   * @returns Promise<Error>
   */
  const signIn = async (data: U) => {
    try {
      let authresult = await client.post(api.createToken, data);
      let userObj: U = { ...authresult.data?.user };
      console.log("[useAuth:signIn] userObj= ", userObj);
      userObj.token = authresult.data?.token;
      setViewer(userObj);
      return null;
    } catch (err) {
      console.error("[useAuth::signIn]", err);
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
      return null;
    } catch (err) {
      console.error("[useAuth::signUp]", err);
      return err;
    }
  };

  const signOut = async () => {
    try {
      client.post(api.unauthorize, viewer).then((response) => {
        console.log("[useAuth::signOut]", response.status);
        setViewer(null!);
      });
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
