import axios, { AxiosResponse } from "axios";
import { API } from "shared/api";
import { useLocalStorage } from "shared/lib";
import { AuthContextType } from "./context/types";
import { Credential } from "./types";

/**
 * Hook is to setup AuthContext. It is used for managing authentication of user.
 * `viewer` stands for authorized user.
 * @type {U} Type is user credentials.
 * @returns Object inmplementing `IAuthContext`.
 */
export const useAuth = <U extends Credential>(): AuthContextType<U> => {
  //TODO: use specified `key`
  const [viewer, setViewer] = useLocalStorage<U | null>("user", null);
  const isAuth = !!viewer && validateViewer(viewer);

  const signIn = async (data: U) => {
    try {
      let authresult = await axios.post(API.authorize, data); //TODO: correct paths and object fields
      let userObj: U = { ...authresult.data?.user }; //FIXME: auth result property `foundUser`
      console.log("[DEBUG] userObj: ", userObj);
      userObj.token = authresult.data?.token;
      setViewer(userObj);
      return null;
    } catch (err) {
      console.error("[useAuth::signIn]", err);
      return err;
    }
  };

  const signUp = async (data: U) => {
    try {
      let authresult = await axios.post(API.createUser, data);
      let userObj = { ...authresult.data?.user }; //FIXME: auth result property `createdUser`
      // userObj.token = authresult.data?.token;
      setViewer(userObj);
      return null;
    } catch (err) {
      console.error("[useAuth::signUp]", err);
      return err;
    }
  };

  const signOut = async () => {
    try {
      axios.post(API.unauthorize, viewer).then((response) => {
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
const validateViewer = <U,>(viewer: U): boolean => {
  try {
    let result = false;
    axios.post(API.validate, viewer).then((response) => {
      console.log(`[DEBUG] viewer=${viewer} : ${response}`);
      result = response.data?.isValid as boolean;
    });
    return result;
  } catch (error) {
    console.log(`[DEBUG] validation failed with error: ${error}`);
    return false;
  }
};
