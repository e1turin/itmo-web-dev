import axios from "axios";
import { useLocalStorage } from "shared/util";
import { AuthContextType } from "./context/types";
import { UserCredential } from "./types";

/**
 * Hook to setup AuthContext. It is used for managing authentication of user.
 * `viewer` stands for authorized user.
 * @type {U} Type is user credentials.
 * @returns Object inmplementing `IAuthContext`.
 */
export const useAuth = <U,>(): AuthContextType<U> => {
  //TODO: use specified `key`
  const [viewer, setViewer] = useLocalStorage<U | null>("user", null);
  const isAuth = !!viewer;

  const signIn = async (data: U) => {
    try {
      let authresult = await axios.post("/api/auth/login", data); //TODO: correct paths and object fields
      let userObj = { ...authresult.data?.foundUser }; //FIXME: auth result property `foundUser`
      userObj.token = authresult.data?.encodedToken;
      setViewer(userObj);
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async (data: U) => {
    try {
      let authresult = await axios.post("/api/auth/signup", data);
      let userObj = { ...authresult.data?.createdUser }; //FIXME: auth result property `createdUser`
      userObj.token = authresult.data?.encodedToken;
      setViewer(userObj);
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = () => {
    setViewer(null!);
  };

  return { isAuth, viewer, signIn, signUp, signOut };
};
